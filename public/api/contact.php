<?php

/**
 * Range Engineering – Contact Form API
 * POST /api/contact.php
 *
 * ⚠️  REQUIRED BEFORE DEPLOYMENT
 *     Replace $adminEmail and $fromEmail with real addresses.
 *
 * Security features implemented:
 *  - POST-only restriction (405 for everything else)
 *  - JSON input parsing
 *  - Server-side field validation & length limits
 *  - Email header injection protection
 *  - Honeypot field check (rejects bots that fill hidden "website" field)
 *  - File-based rate limiting (5 submissions per IP per 10 minutes)
 *  - Failure logging (no passwords or SMTP credentials ever logged)
 *  - CORS header for same-domain use (adjust if API is on a separate domain)
 */

// ---------------------------------------------------------------------------
// Configuration – ⚠️  UPDATE THESE BEFORE DEPLOYMENT
// ---------------------------------------------------------------------------
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require __DIR__ . '/PHPMailer/src/Exception.php';
require __DIR__ . '/PHPMailer/src/PHPMailer.php';
require __DIR__ . '/PHPMailer/src/SMTP.php';

$adminEmail = 'info@rangeeng.ca';          // Where the enquiry email is delivered
$fromEmail = 'website@rangeeng.ca';       // Sender address (must belong to your domain)
$emailSubject = 'New Contact Form Submission – Range Engineering';

// SMTP Configuration 
$smtpHost = 'smtp.example.com';
$smtpPort = 587;
$smtpUser = 'website@rangeeng.ca';
$smtpPass = 'YourSmtpPassword'; // REPLACE THIS WITH YOUR REAL PASSWORD!

// Rate limiting settings
$rateLimit = 5;    // max submissions per IP
$ratePeriod = 600;  // seconds (10 minutes)
$rateLimitDir = sys_get_temp_dir() . '/range_contact_rl/';

// Log file location (server-side only; never sent to browser)
$logFile = sys_get_temp_dir() . '/range_contact_errors.log';
// ---------------------------------------------------------------------------

header('Content-Type: application/json; charset=utf-8');

// Restrict to same-domain origin (no wildcard in production)
// If your React app and PHP are on the same domain this header is optional,
// but harmless to include.
// If you move the API to a separate subdomain, set this to that domain:
// header('Access-Control-Allow-Origin: https://www.rangeeng.ca');

// ── 1. Method check ─────────────────────────────────────────────────────────
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed.']);
    exit;
}

// ── 2. Parse JSON body ───────────────────────────────────────────────────────
$raw = file_get_contents('php://input');
$input = json_decode($raw, true);

if (!is_array($input)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Invalid request format.']);
    exit;
}

// ── 3. Honeypot check ────────────────────────────────────────────────────────
// Hidden field that real users never see; bots often auto-fill it.
$honeypot = trim($input['website'] ?? '');
if ($honeypot !== '') {
    // Silently succeed so bots think the form worked.
    echo json_encode(['success' => true, 'message' => 'Your message has been sent successfully.']);
    exit;
}

// ── 4. Rate limiting (file-based) ────────────────────────────────────────────
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

// Remove timestamps outside the current window
$rlData = array_filter($rlData, fn($ts) => ($now - $ts) < $ratePeriod);
$rlData = array_values($rlData);

if (count($rlData) >= $rateLimit) {
    http_response_code(429);
    echo json_encode([
        'success' => false,
        'message' => 'Too many submissions. Please wait a few minutes and try again.',
    ]);
    exit;
}

// ── 5. Extract & trim fields ─────────────────────────────────────────────────
$name = trim($input['name'] ?? '');
$email = trim($input['email'] ?? '');
$phone = trim($input['phone'] ?? '');
$subject = trim($input['subject'] ?? '');
$message = trim($input['message'] ?? '');

// ── 6. Required-field validation ─────────────────────────────────────────────
if ($name === '' || $email === '' || $message === '') {
    http_response_code(422);
    echo json_encode(['success' => false, 'message' => 'Please complete all required fields.']);
    exit;
}

// ── 7. Email format validation ───────────────────────────────────────────────
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(422);
    echo json_encode(['success' => false, 'message' => 'Please provide a valid email address.']);
    exit;
}

// ── 8. Length limits ─────────────────────────────────────────────────────────
if (
    strlen($name) > 100 ||
    strlen($email) > 254 ||
    strlen($phone) > 50 ||
    strlen($subject) > 200 ||
    strlen($message) > 5000
) {
    http_response_code(422);
    echo json_encode(['success' => false, 'message' => 'One or more fields exceed the maximum allowed length.']);
    exit;
}

// ── 9. Header injection protection ───────────────────────────────────────────
// Strip newlines from any field that goes into email headers.
// The visitor email is ONLY used in Reply-To (already validated above).
// Name is NOT placed in From: to avoid injection.
$safeName = str_replace(["\r", "\n", '%0a', '%0d'], '', $name);
$safeEmail = filter_var($email, FILTER_SANITIZE_EMAIL);

// ── 10. Build email ───────────────────────────────────────────────────────────
$emailBody =
    "New contact form submission\n\n" .
    "Name:    " . $safeName . "\n" .
    "Email:   " . $safeEmail . "\n" .
    "Phone:   " . $phone . "\n" .
    "Subject: " . $subject . "\n\n" .
    "Message:\n" .
    $message . "\n\n" .
    "---\n" .
    "Submitted: " . date('Y-m-d H:i:s T') . "\n" .
    "IP:        " . $ip . "\n";

// Use a safe subject (strip control characters)
$safeSubject = str_replace(["\r", "\n"], '', $emailSubject);

// ── 11. Send email via SMTP ───────────────────────────────────────────────────
$mail = new PHPMailer(true);
$sent = false;

try {
    // Server settings
    $mail->isSMTP();
    $mail->Host = $smtpHost;
    $mail->SMTPAuth = true;
    $mail->Username = $smtpUser;
    $mail->Password = $smtpPass;
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port = $smtpPort;

    // Recipients
    $mail->setFrom($fromEmail, 'Range Engineering Website');
    $mail->addAddress($adminEmail);
    $mail->addReplyTo($safeEmail, $safeName);

    // Content
    $mail->isHTML(false);
    $mail->CharSet = 'UTF-8';
    $mail->Subject = $safeSubject;
    $mail->Body = $emailBody;

    $mail->send();
    $sent = true;
} catch (Exception $e) {
    $sent = false;
    // Error details are saved in $mail->ErrorInfo if you wish to log them
}

// ── 12. Record rate-limit timestamp on success ────────────────────────────────
if ($sent) {
    $rlData[] = $now;
    @file_put_contents($rlFile, json_encode($rlData), LOCK_EX);

    echo json_encode([
        'success' => true,
        'message' => 'Your message has been sent successfully.',
    ]);
} else {
    // ── 13. Log failure (server-side only) ────────────────────────────────────
    $logEntry =
        "[" . date('Y-m-d H:i:s T') . "] Contact form mail() FAILED\n" .
        "  IP:      " . $ip . "\n" .
        "  Name:    " . $safeName . "\n" .
        "  Email:   " . $safeEmail . "\n" .
        "  Subject: " . $subject . "\n" .
        "\n";
    @file_put_contents($logFile, $logEntry, FILE_APPEND | LOCK_EX);

    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Unable to send your message at this time. Please try again later or contact us directly.',
    ]);
}
