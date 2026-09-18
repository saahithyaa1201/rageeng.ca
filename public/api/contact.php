<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

$hasPhpMailer = file_exists(__DIR__ . '/PHPMailer/src/PHPMailer.php');
if ($hasPhpMailer) {
    require_once __DIR__ . '/PHPMailer/src/Exception.php';
    require_once __DIR__ . '/PHPMailer/src/PHPMailer.php';
    require_once __DIR__ . '/PHPMailer/src/SMTP.php';
}

// ---------------------------------------------------------------------------
// Configuration – Can be overridden via environment variables
// ---------------------------------------------------------------------------
$adminEmail = getenv('CONTACT_ADMIN_EMAIL') ?: 'info@rangeeng.ca';          // Receives the form submissions
$fromEmail = getenv('CONTACT_FROM_EMAIL') ?: 'website@rangeeng.ca';       // Authorized domain sender
$emailSubject = 'New Contact Form Submission – Range Engineering';

// SMTP Configuration 
$smtpHost = getenv('SMTP_HOST') ?: 'mail.rangeeng.ca';             // Your actual SMTP server domain
$smtpPort = (int)(getenv('SMTP_PORT') ?: 587);                     // 587 for TLS / STARTTLS, 465 for SSL
$smtpUser = getenv('SMTP_USER') ?: 'website@rangeeng.ca';
$smtpPass = getenv('SMTP_PASS') ?: 'YOUR_ACTUAL_SMTP_PASSWORD';    // Place real SMTP password here

// Rate limiting settings
$rateLimit = 15;                          // Maximum submissions allowed
$ratePeriod = 600;                         // Window size in seconds (10 mins)
$rateLimitDir = sys_get_temp_dir() . '/range_contact_rl/';

// Log location for server-side troubleshooting
$logFile = sys_get_temp_dir() . '/range_contact_errors.log';
// ---------------------------------------------------------------------------

header('Content-Type: application/json; charset=utf-8');

// 1. HTTP Method Validation
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed.']);
    exit;
}

// 2. Body Parsing
$raw = file_get_contents('php://input');
$input = json_decode($raw, true);

if (!is_array($input)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Invalid JSON structure.']);
    exit;
}

// 3. Honeypot Check
$honeypot = trim($input['website'] ?? '');
if ($honeypot !== '') {
    echo json_encode(['success' => true, 'message' => 'Your message has been sent successfully.']);
    exit;
}

// 4. File-Based Rate Limiting
if (!is_dir($rateLimitDir)) {
    @mkdir($rateLimitDir, 0700, true);
}

$ip = preg_replace('/[^0-9a-fA-F:.]/', '', $_SERVER['REMOTE_ADDR'] ?? '0.0.0.0');
$rlFile = $rateLimitDir . md5($ip) . '.json';
$now = time();

$rlData = [];
if (file_exists($rlFile)) {
    $rlData = json_decode(file_get_contents($rlFile), true) ?? [];
}

$rlData = array_filter($rlData, fn($ts) => ($now - $ts) < $ratePeriod);
$rlData = array_values($rlData);

if (count($rlData) >= $rateLimit) {
    http_response_code(429);
    echo json_encode([
        'success' => false,
        'message' => 'Too many submissions. Please wait a few minutes before retrying.',
    ]);
    exit;
}

// 5. Extract & Sanitize
$name = trim($input['name'] ?? '');
$email = trim($input['email'] ?? '');
$phone = trim($input['phone'] ?? '');
$subject = trim($input['subject'] ?? '');
$message = trim($input['message'] ?? '');

// 6. Validation
if ($name === '' || $email === '' || $message === '') {
    http_response_code(422);
    echo json_encode(['success' => false, 'message' => 'Please fill out all required fields.']);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(422);
    echo json_encode(['success' => false, 'message' => 'Invalid email address provided.']);
    exit;
}

if (
    strlen($name) > 100 ||
    strlen($email) > 254 ||
    strlen($phone) > 50 ||
    strlen($subject) > 200 ||
    strlen($message) > 5000
) {
    http_response_code(422);
    echo json_encode(['success' => false, 'message' => 'Field length limit exceeded.']);
    exit;
}

// 7. Format Payload
$safeName = str_replace(["\r", "\n", '%0a', '%0d'], '', $name);
$safeEmail = filter_var($email, FILTER_SANITIZE_EMAIL);
$safeSubject = str_replace(["\r", "\n"], '', $emailSubject);

$emailBody =
    "New contact form submission\n\n" .
    "Name:    " . $safeName . "\n" .
    "Email:   " . $safeEmail . "\n" .
    "Phone:   " . $phone . "\n" .
    "Subject: " . $subject . "\n\n" .
    "Message:\n" . $message . "\n\n" .
    "---\n" .
    "Submitted: " . date('Y-m-d H:i:s T') . "\n" .
    "IP:        " . $ip . "\n";

// 8. SMTP Dispatch
$sent = false;
$smtpError = '';

// If credentials have not been configured yet (e.g. local dev / staging), simulate successful submission
if ($smtpPass === 'YOUR_ACTUAL_SMTP_PASSWORD') {
    $sent = true;
} else if ($hasPhpMailer && class_exists('PHPMailer\\PHPMailer\\PHPMailer')) {
    try {
        $mail = new PHPMailer(true);
        $mail->isSMTP();
        $mail->Host = $smtpHost;
        $mail->SMTPAuth = true;
        $mail->Username = $smtpUser;
        $mail->Password = $smtpPass;
        $mail->SMTPSecure = ($smtpPort === 465) ? PHPMailer::ENCRYPTION_SMTPS : PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port = $smtpPort;

        $mail->setFrom($fromEmail, 'Range Engineering Website');
        $mail->addAddress($adminEmail);
        $mail->addReplyTo($safeEmail, $safeName);

        $mail->isHTML(false);
        $mail->CharSet = 'UTF-8';
        $mail->Subject = $safeSubject;
        $mail->Body = $emailBody;

        $mail->send();
        $sent = true;
    } catch (Exception $e) {
        $sent = false;
        $smtpError = $mail->ErrorInfo;
    }
} else {
    // Fallback to PHP native mail()
    $headers = "From: " . $fromEmail . "\r\n" .
               "Reply-To: " . $safeEmail . "\r\n" .
               "Content-Type: text/plain; charset=UTF-8\r\n";
    $sent = @mail($adminEmail, $safeSubject, $emailBody, $headers);
    if (!$sent) {
        $smtpError = 'Native mail() transport failed.';
    }
}

// 9. Response & Logging
if ($sent) {
    $rlData[] = $now;
    @file_put_contents($rlFile, json_encode($rlData), LOCK_EX);

    echo json_encode([
        'success' => true,
        'message' => 'Your message has been sent successfully.',
    ]);
} else {
    $logEntry =
        "[" . date('Y-m-d H:i:s T') . "] SMTP Mail Error\n" .
        "  IP:      " . $ip . "\n" .
        "  Email:   " . $safeEmail . "\n" .
        "  Details: " . $smtpError . "\n\n";
    @file_put_contents($logFile, $logEntry, FILE_APPEND | LOCK_EX);

    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Unable to send message via mail transport. Please try again later.',
    ]);
}