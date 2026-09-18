<?php
/**
 * Range Engineering Inc. - Contact Form Backend Handler
 * Handles validation, rate limiting, honeypot spam protection,
 * and SMTP mail dispatch using PHPMailer with an on-brand responsive template.
 */

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

header('Content-Type: application/json; charset=utf-8');

// 1. CORS Preflight & HTTP Method Validation
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed. Only POST requests are accepted.']);
    exit;
}

// 2. Load Configuration (from config.php or environment variables)
$configFile = __DIR__ . '/config.php';
$config = file_exists($configFile) ? (include $configFile) : [];

$adminEmail   = getenv('CONTACT_ADMIN_EMAIL') ?: ($config['admin_email'] ?? 'info@rangeeng.ca');
$fromEmail    = getenv('CONTACT_FROM_EMAIL')  ?: ($config['from_email'] ?? 'website@rangeeng.ca');
$fromName     = getenv('CONTACT_FROM_NAME')   ?: ($config['from_name'] ?? 'Range Engineering Website');
$smtpHost     = getenv('SMTP_HOST')           ?: ($config['smtp_host'] ?? 'mail.rangeeng.ca');
$smtpPort     = (int)(getenv('SMTP_PORT')     ?: ($config['smtp_port'] ?? 587));
$smtpUser     = getenv('SMTP_USER')           ?: ($config['smtp_user'] ?? 'website@rangeeng.ca');
$smtpPass     = getenv('SMTP_PASS')           ?: ($config['smtp_pass'] ?? 'YOUR_ACTUAL_SMTP_PASSWORD');
$smtpSecure   = strtolower(getenv('SMTP_SECURE') ?: ($config['smtp_secure'] ?? 'tls'));
$rateLimit    = (int)(getenv('RATE_LIMIT')    ?: ($config['rate_limit'] ?? 15));
$ratePeriod   = (int)(getenv('RATE_PERIOD')   ?: ($config['rate_period'] ?? 600));

// 3. Body Parsing
$rawInput = file_get_contents('php://input');
if ($rawInput === '' || $rawInput === false) {
    $rawInput = file_get_contents('php://stdin');
}
$data = json_decode($rawInput, true);

if (!is_array($data)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Invalid request body. Expected JSON.']);
    exit;
}

// 4. Honeypot Spam Check
// The 'website' field is hidden from legitimate humans. If filled, silently drop with a 200 response.
$honeypot = trim($data['website'] ?? '');
if ($honeypot !== '') {
    echo json_encode(['success' => true, 'message' => 'Your message has been sent successfully.']);
    exit;
}

// 5. Rate Limiting (IP-based, 15 submissions per 10 minutes)
$rateLimitDir = sys_get_temp_dir() . '/range_rl/';
if (!is_dir($rateLimitDir)) {
    @mkdir($rateLimitDir, 0700, true);
}

$rawIp = $_SERVER['HTTP_CF_CONNECTING_IP'] ?? $_SERVER['HTTP_X_FORWARDED_FOR'] ?? $_SERVER['REMOTE_ADDR'] ?? '0.0.0.0';
$clientIp = explode(',', $rawIp)[0];
$clientIp = preg_replace('/[^0-9a-fA-F:.]/', '', trim($clientIp));

$rlFile = $rateLimitDir . md5($clientIp) . '.json';
$now = time();
$history = [];

if (file_exists($rlFile)) {
    $decoded = json_decode(@file_get_contents($rlFile), true);
    if (is_array($decoded)) {
        $history = array_filter($decoded, fn($ts) => ($now - $ts) < $ratePeriod);
    }
}

if (count($history) >= $rateLimit) {
    http_response_code(429);
    echo json_encode(['success' => false, 'message' => 'Too many submissions. Please wait a few minutes before trying again.']);
    exit;
}

// 6. Input Extraction & Sanitization
$name    = trim($data['name'] ?? '');
$email   = trim($data['email'] ?? '');
$phone   = trim($data['phone'] ?? '');
$subject = trim($data['subject'] ?? '');
$message = trim($data['message'] ?? '');

// Strip line breaks from header-sensitive fields to prevent email header injection
$cleanName    = str_replace(["\r", "\n", '%0a', '%0d'], '', $name);
$cleanEmail   = str_replace(["\r", "\n", '%0a', '%0d'], '', $email);
$cleanSubject = str_replace(["\r", "\n", '%0a', '%0d'], '', $subject);
if ($cleanSubject === '') {
    $cleanSubject = 'General Inquiry';
}

// 7. Validation
if ($cleanName === '' || $cleanEmail === '' || $message === '') {
    http_response_code(422);
    echo json_encode(['success' => false, 'message' => 'Please provide your name, email address, and message.']);
    exit;
}

if (!filter_var($cleanEmail, FILTER_VALIDATE_EMAIL)) {
    http_response_code(422);
    echo json_encode(['success' => false, 'message' => 'Please provide a valid email address.']);
    exit;
}

if (
    strlen($cleanName) > 100 ||
    strlen($cleanEmail) > 254 ||
    strlen($phone) > 50 ||
    strlen($cleanSubject) > 200 ||
    strlen($message) > 5000
) {
    http_response_code(422);
    echo json_encode(['success' => false, 'message' => 'One or more fields exceeded the maximum allowed length.']);
    exit;
}

// 8. Build High-Deliverability, On-Brand Email Templates
$submissionDate = date('F j, Y, g:i a T');
$emailSubject   = 'New Inquiry: ' . $cleanSubject . ' – ' . $cleanName;

// Safe HTML values
$htmlName    = htmlspecialchars($cleanName, ENT_QUOTES, 'UTF-8');
$htmlEmail   = htmlspecialchars($cleanEmail, ENT_QUOTES, 'UTF-8');
$htmlPhone   = htmlspecialchars($phone !== '' ? $phone : 'Not provided', ENT_QUOTES, 'UTF-8');
$htmlSubject = htmlspecialchars($cleanSubject, ENT_QUOTES, 'UTF-8');
$htmlMessage = nl2br(htmlspecialchars($message, ENT_QUOTES, 'UTF-8'));
$htmlIp      = htmlspecialchars($clientIp, ENT_QUOTES, 'UTF-8');

// HTML Email Template (Inline CSS for universal email client compatibility)
$htmlBody = <<<HTML
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Contact Form Inquiry</title>
</head>
<body style="margin:0; padding:0; background-color:#f4f5f7; font-family:'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, Helvetica, Arial, sans-serif; color:#1f2937; -webkit-font-smoothing:antialiased;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color:#f4f5f7; padding:32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width:620px; background-color:#ffffff; border-radius:14px; overflow:hidden; box-shadow:0 4px 20px rgba(0,0,0,0.06); border:1px solid #e5e7eb;">
          
          <!-- Header Banner -->
          <tr>
            <td style="background-color:#111827; padding:28px 32px; border-bottom:3px solid #ea580c;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <td>
                    <h1 style="margin:0; font-size:20px; font-weight:700; letter-spacing:0.04em; color:#ffffff; text-transform:uppercase;">
                      RANGE ENGINEERING INC.
                    </h1>
                    <p style="margin:4px 0 0 0; font-size:12px; color:#9ca3af; letter-spacing:0.06em; text-transform:uppercase;">
                      Mechanical &middot; Electrical &middot; Plumbing
                    </p>
                  </td>
                  <td align="right" valign="middle">
                    <span style="display:inline-block; background-color:rgba(234,88,12,0.2); color:#fb923c; border:1px solid rgba(234,88,12,0.4); font-size:11px; font-weight:600; text-transform:uppercase; letter-spacing:0.08em; padding:5px 12px; border-radius:20px;">
                      New Inquiry
                    </span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Main Content -->
          <tr>
            <td style="padding:32px 32px 24px 32px;">
              <p style="margin:0 0 20px 0; font-size:15px; line-height:1.5; color:#4b5563;">
                A new project inquiry has been submitted via the contact form on <strong>rangeeng.ca</strong>:
              </p>

              <!-- Inquiry Details Card -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color:#f9fafb; border:1px solid #e5e7eb; border-radius:10px; margin-bottom:24px;">
                <tr>
                  <td style="padding:16px 20px; border-bottom:1px solid #e5e7eb; width:30%; font-size:12px; font-weight:700; text-transform:uppercase; letter-spacing:0.05em; color:#6b7280;">
                    Client Name
                  </td>
                  <td style="padding:16px 20px; border-bottom:1px solid #e5e7eb; font-size:15px; font-weight:600; color:#111827;">
                    {$htmlName}
                  </td>
                </tr>
                <tr>
                  <td style="padding:16px 20px; border-bottom:1px solid #e5e7eb; font-size:12px; font-weight:700; text-transform:uppercase; letter-spacing:0.05em; color:#6b7280;">
                    Email Address
                  </td>
                  <td style="padding:16px 20px; border-bottom:1px solid #e5e7eb; font-size:14px; color:#111827;">
                    <a href="mailto:{$htmlEmail}" style="color:#ea580c; text-decoration:none; font-weight:600;">{$htmlEmail}</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding:16px 20px; border-bottom:1px solid #e5e7eb; font-size:12px; font-weight:700; text-transform:uppercase; letter-spacing:0.05em; color:#6b7280;">
                    Phone Number
                  </td>
                  <td style="padding:16px 20px; border-bottom:1px solid #e5e7eb; font-size:14px; color:#111827;">
                    {$htmlPhone}
                  </td>
                </tr>
                <tr>
                  <td style="padding:16px 20px; font-size:12px; font-weight:700; text-transform:uppercase; letter-spacing:0.05em; color:#6b7280;">
                    Subject
                  </td>
                  <td style="padding:16px 20px; font-size:14px; font-weight:600; color:#111827;">
                    {$htmlSubject}
                  </td>
                </tr>
              </table>

              <!-- Message Callout -->
              <div style="margin-bottom:28px;">
                <p style="margin:0 0 8px 0; font-size:12px; font-weight:700; text-transform:uppercase; letter-spacing:0.05em; color:#6b7280;">
                  Message Content:
                </p>
                <div style="background-color:#ffffff; border-left:4px solid #ea580c; border:1px solid #e5e7eb; border-left-width:4px; padding:18px 20px; border-radius:6px; font-size:14px; line-height:1.65; color:#1f2937;">
                  {$htmlMessage}
                </div>
              </div>

              <!-- Action Button -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin-bottom:8px;">
                <tr>
                  <td style="border-radius:8px; background-color:#ea580c;">
                    <a href="mailto:{$htmlEmail}?subject=Re:%20{$htmlSubject}" target="_blank" style="display:inline-block; padding:12px 24px; font-size:14px; font-weight:700; color:#ffffff; text-decoration:none; border-radius:8px; text-transform:uppercase; letter-spacing:0.04em;">
                      Reply to {$htmlName} &rarr;
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer Metadata -->
          <tr>
            <td style="background-color:#f9fafb; padding:20px 32px; border-top:1px solid #e5e7eb; font-size:12px; line-height:1.6; color:#6b7280;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <td>
                    <strong>Submission Details:</strong><br>
                    Time: {$submissionDate}<br>
                    Client IP: {$htmlIp}
                  </td>
                  <td align="right" valign="bottom" style="font-size:11px; color:#9ca3af;">
                    Range Engineering Inc.<br>
                    15 Peachill Crt, Brampton, ON
                  </td>
                </tr>
              </table>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
HTML;

// Plain Text AltBody (Ensures low spam score & fallback for text-only clients)
$altBody = <<<TEXT
NEW CONTACT FORM SUBMISSION - RANGE ENGINEERING INC.
------------------------------------------------------------
Client Name:  {$cleanName}
Email:        {$cleanEmail}
Phone:        {$phone}
Subject:      {$cleanSubject}
Date/Time:    {$submissionDate}
Client IP:    {$clientIp}

MESSAGE:
------------------------------------------------------------
{$message}

------------------------------------------------------------
Reply directly to this email or write to: {$cleanEmail}
This message was sent via the contact form on rangeeng.ca.
TEXT;

// 9. Dispatch Email via PHPMailer SMTP (or fallback)
$sent = false;
$errorMessage = '';

// Autoload PHPMailer from available locations
if (file_exists(__DIR__ . '/../../vendor/autoload.php')) {
    require_once __DIR__ . '/../../vendor/autoload.php';
} else if (file_exists(__DIR__ . '/vendor/autoload.php')) {
    require_once __DIR__ . '/vendor/autoload.php';
} else if (file_exists(__DIR__ . '/PHPMailer/src/PHPMailer.php')) {
    require_once __DIR__ . '/PHPMailer/src/Exception.php';
    require_once __DIR__ . '/PHPMailer/src/PHPMailer.php';
    require_once __DIR__ . '/PHPMailer/src/SMTP.php';
}

$hasPhpMailer = class_exists('PHPMailer\\PHPMailer\\PHPMailer');

// If using default placeholder in dev/testing, acknowledge without error
if ($smtpPass === 'YOUR_ACTUAL_SMTP_PASSWORD') {
    $sent = true;
} else if ($hasPhpMailer && class_exists('PHPMailer\\PHPMailer\\PHPMailer')) {
    try {
        $mail = new PHPMailer(true);

        // Server Settings
        $mail->isSMTP();
        $mail->Host       = $smtpHost;
        $mail->SMTPAuth   = true;
        $mail->Username   = $smtpUser;
        $mail->Password   = $smtpPass;
        $mail->Port       = $smtpPort;

        if ($smtpSecure === 'ssl' || $smtpPort === 465) {
            $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
        } else if ($smtpSecure === 'tls' || $smtpPort === 587) {
            $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        } else {
            $mail->SMTPAutoTLS = false;
        }

        // Anti-Spam Alignment:
        // Sender MUST be from the authenticated domain (fromEmail), NOT the user's email.
        // User's email is set as Reply-To so replies go directly to the submitter.
        $mail->setFrom($fromEmail, $fromName);
        $mail->addAddress($adminEmail);
        $mail->addReplyTo($cleanEmail, $cleanName);

        // Content
        $mail->isHTML(true);
        $mail->CharSet  = 'UTF-8';
        $mail->Subject  = $emailSubject;
        $mail->Body     = $htmlBody;
        $mail->AltBody  = $altBody;

        // Custom headers for hygiene & categorization
        $mail->addCustomHeader('X-Contact-Form', 'rangeeng.ca');
        $mail->addCustomHeader('X-Submitted-IP', $clientIp);

        $mail->send();
        $sent = true;
    } catch (Exception $e) {
        $sent = false;
        $errorMessage = $mail->ErrorInfo;
    }
} else {
    // Fallback to PHP native mail()
    $headers = [
        'MIME-Version: 1.0',
        'Content-type: text/html; charset=UTF-8',
        'From: ' . $fromName . ' <' . $fromEmail . '>',
        'Reply-To: ' . $cleanName . ' <' . $cleanEmail . '>',
        'X-Mailer: PHP/' . phpversion(),
    ];
    $sent = @mail($adminEmail, $emailSubject, $htmlBody, implode("\r\n", $headers));
    if (!$sent) {
        $errorMessage = 'Native mail() delivery failed.';
    }
}

// 10. Record Rate Limit & Return Response
if ($sent) {
    $history[] = $now;
    @file_put_contents($rlFile, json_encode(array_values($history)), LOCK_EX);

    echo json_encode([
        'success' => true,
        'message' => 'Thank you! Your message has been sent successfully. We will get back to you shortly.',
    ]);
} else {
    $logDir = sys_get_temp_dir() . '/range_logs/';
    if (!is_dir($logDir)) {
        @mkdir($logDir, 0700, true);
    }
    $logEntry = sprintf(
        "[%s] Mail Dispatch Failure\n  IP: %s\n  Sender: %s <%s>\n  Error: %s\n\n",
        date('Y-m-d H:i:s T'),
        $clientIp,
        $cleanName,
        $cleanEmail,
        $errorMessage
    );
    @file_put_contents($logDir . 'contact_errors.log', $logEntry, FILE_APPEND | LOCK_EX);

    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Unable to send message at this time. Please contact us directly at info@rangeeng.ca or call 416-857-2414.',
    ]);
}