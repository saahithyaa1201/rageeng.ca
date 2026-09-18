<?php
/**
 * Range Engineering Inc. - Contact API Configuration
 * 
 * Copy this file to `config.php` in the same directory (`public/api/config.php`)
 * and update with your real SMTP credentials.
 * 
 * Alternatively, you can set these as server environment variables (e.g. in cPanel,
 * Docker, .env, or Apache/Nginx vhost).
 */

return [
    // Where customer inquiries will be delivered
    'admin_email' => 'info@rangeeng.ca',

    // The sender address from your domain (must match your SMTP domain for SPF/DKIM alignment)
    'from_email'  => 'website@rangeeng.ca',
    'from_name'   => 'Range Engineering Website',

    // Outgoing SMTP server details
    'smtp_host'   => 'mail.rangeeng.ca', // e.g. mail.rangeeng.ca, smtp.gmail.com, or smtp.office365.com
    'smtp_port'   => 587,                 // 587 for TLS/STARTTLS (recommended), 465 for SSL
    'smtp_user'   => 'website@rangeeng.ca',
    'smtp_pass'   => 'YOUR_ACTUAL_SMTP_PASSWORD',
    'smtp_secure' => 'tls',               // 'tls' (port 587), 'ssl' (port 465), or 'none'

    // Rate limiting
    'rate_limit'  => 15,                  // Max submissions allowed per IP
    'rate_period' => 600,                 // In seconds (600s = 10 minutes)
];
