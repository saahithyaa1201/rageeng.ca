# Contact Form & SMTP Mailer Setup

This document explains the contact form backend, SMTP configuration, anti-spam architecture, and responsive email template for Range Engineering Inc.

---

## 1. Quick Setup & Configuration

You can configure SMTP credentials via a config file or environment variables.

### Option A: Via Configuration File (Recommended for cPanel / Web Hosting)

1. Make a copy of `public/api/config.sample.php` named `public/api/config.php`:
   ```bash
   cp public/api/config.sample.php public/api/config.php
   ```
2. Open `public/api/config.php` and set your credentials:
   ```php
   <?php
   return [
       'admin_email' => 'info@rangeeng.ca',         // Recipient of contact submissions
       'from_email'  => 'website@rangeeng.ca',      // Must match your domain/SMTP account
       'from_name'   => 'Range Engineering Website',
       'smtp_host'   => 'mail.rangeeng.ca',         // SMTP hostname (e.g. mail.rangeeng.ca or smtp.gmail.com)
       'smtp_port'   => 587,                        // 587 (TLS/STARTTLS) or 465 (SSL)
       'smtp_user'   => 'website@rangeeng.ca',      // SMTP username
       'smtp_pass'   => 'YOUR_ACTUAL_PASSWORD',     // Real SMTP password
       'smtp_secure' => 'tls',                      // 'tls' or 'ssl'
       'rate_limit'  => 15,                         // Submissions allowed per IP
       'rate_period' => 600,                        // Time window in seconds (10 mins)
   ];
   ```

### Option B: Via Environment Variables (Docker / VPS / Cloud Hosting)

The handler automatically reads the following environment variables if set:
- `CONTACT_ADMIN_EMAIL`
- `CONTACT_FROM_EMAIL`
- `CONTACT_FROM_NAME`
- `SMTP_HOST`
- `SMTP_PORT`
- `SMTP_USER`
- `SMTP_PASS`
- `SMTP_SECURE` (`tls` or `ssl`)

> **Development Mode:** When `SMTP_PASS` is set to the default placeholder (`YOUR_ACTUAL_SMTP_PASSWORD`), submissions simulate a successful delivery so you can test frontend UX without triggering connection errors.

---

## 2. Anti-Spam & Deliverability Features

To ensure inquiries reach your inbox rather than the Spam/Junk folder:

- **SPF / DKIM / DMARC Alignment**: The `From` header uses an authorized domain address (`website@rangeeng.ca`). The client's email is set in `Reply-To`, allowing you to reply directly with one click while keeping the sender envelope authenticated.
- **Multipart MIME (HTML + Plain-Text AltBody)**: Both a styled HTML email and an alternative plain-text version are sent simultaneously, reducing spam scores across mail filters (SpamAssassin, Barracuda, Gmail).
- **Honeypot Protection**: A hidden `website` field traps automated spam bots and silently drops their submissions without sending emails.
- **Rate Limiting**: IP-based rate limiting prevents flood attacks (max 15 submissions per 10 minutes per IP).
- **Header Injection & XSS Protection**: All user inputs are sanitized; line breaks are stripped from header fields, and HTML special characters are escaped in template rendering.

---

## 3. Email Template Design

The HTML email template is styled to match Range Engineering's brand identity:
- **Header**: Dark modern banner (`#111827`) with primary orange accent line (`#ea580c`) and status pill.
- **Client Metadata Card**: Structured grid for Client Name, Email (clickable `mailto:`), Phone (clickable `tel:`), and Subject.
- **Callout Message Box**: Highlighted quote block with line-break preservation.
- **One-Click Reply Button**: Direct CTA button pre-populating a reply email with subject.
- **Audit Footer**: Submission timestamp and client IP address.

---

## 4. Troubleshooting & Logs

- If SMTP dispatch fails in production, errors are logged with timestamp, IP, and reason to:
  ```
  /tmp/range_logs/contact_errors.log
  ```
- Make sure outbound port 587 (TLS) or 465 (SSL) is not blocked by your hosting provider's firewall.
