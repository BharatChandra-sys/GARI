// Vercel Serverless Function - GARI Email System
// Sends emails via Brevo to bc833498@gmail.com
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { type, name, email, subject, message } = req.body;
  const BREVO_API_KEY = process.env.BREVO_API_KEY;
  
  if (!BREVO_API_KEY) {
    console.error('BREVO_API_KEY is not set');
    return res.status(500).json({ error: 'Server configuration error' });
  }

  try {
    if (type === 'newsletter') {
      return await handleNewsletter(email, BREVO_API_KEY, res);
    } else if (type === 'contact') {
      return await handleContact({ name, email, subject, message }, BREVO_API_KEY, res);
    } else if (type === 'application') {
      return await handleApplication(req.body, BREVO_API_KEY, res);
    } else {
      return res.status(400).json({ error: 'Invalid request type' });
    }
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: 'Failed to process request', message: error.message });
  }
}

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

// Validation functions
function validateEmail(email) {
  if (!email || typeof email !== 'string') return { valid: false, error: 'Email is required' };
  const trimmedEmail = email.trim().toLowerCase();
  if (trimmedEmail.length > 254) return { valid: false, error: 'Email is too long' };
  if (!EMAIL_REGEX.test(trimmedEmail)) return { valid: false, error: 'Invalid email format' };
  return { valid: true, email: trimmedEmail };
}

function validateName(name) {
  if (!name || typeof name !== 'string') return { valid: false, error: 'Name is required' };
  const trimmedName = name.trim();
  if (trimmedName.length < 2) return { valid: false, error: 'Name must be at least 2 characters' };
  if (trimmedName.length > 100) return { valid: false, error: 'Name is too long' };
  if (!/^[a-zA-Z\s'-]+$/.test(trimmedName)) return { valid: false, error: 'Name contains invalid characters' };
  return { valid: true, name: trimmedName };
}

function validateSubject(subject) {
  if (!subject || typeof subject !== 'string') return { valid: false, error: 'Subject is required' };
  const trimmedSubject = subject.trim();
  if (trimmedSubject.length < 3) return { valid: false, error: 'Subject must be at least 3 characters' };
  if (trimmedSubject.length > 200) return { valid: false, error: 'Subject is too long' };
  return { valid: true, subject: trimmedSubject };
}

function validateMessage(message) {
  if (!message || typeof message !== 'string') return { valid: false, error: 'Message is required' };
  const trimmedMessage = message.trim();
  if (trimmedMessage.length < 10) return { valid: false, error: 'Message must be at least 10 characters' };
  if (trimmedMessage.length > 5000) return { valid: false, error: 'Message is too long' };
  return { valid: true, message: trimmedMessage };
}

function validatePhone(phone) {
  if (!phone || typeof phone !== 'string') return { valid: false, error: 'Phone is required' };
  const trimmedPhone = phone.trim();
  if (trimmedPhone.length < 10) return { valid: false, error: 'Phone number is too short' };
  if (trimmedPhone.length > 15) return { valid: false, error: 'Phone number is too long' };
  return { valid: true, phone: trimmedPhone };
}

function validateStudentId(studentId) {
  if (!studentId || typeof studentId !== 'string') return { valid: false, error: 'Student ID is required' };
  const trimmedId = studentId.trim();
  if (trimmedId.length < 3) return { valid: false, error: 'Student ID is too short' };
  if (trimmedId.length > 50) return { valid: false, error: 'Student ID is too long' };
  return { valid: true, studentId: trimmedId };
}

function validateSelect(value, fieldName) {
  if (!value || typeof value !== 'string') return { valid: false, error: `${fieldName} is required` };
  const trimmedValue = value.trim();
  if (!trimmedValue) return { valid: false, error: `${fieldName} is required` };
  return { valid: true, value: trimmedValue };
}

function validateTextarea(text, fieldName, minLength = 10, maxLength = 2000) {
  if (!text || typeof text !== 'string') return { valid: false, error: `${fieldName} is required` };
  const trimmedText = text.trim();
  if (trimmedText.length < minLength) return { valid: false, error: `${fieldName} must be at least ${minLength} characters` };
  if (trimmedText.length > maxLength) return { valid: false, error: `${fieldName} is too long (max ${maxLength} characters)` };
  return { valid: true, text: trimmedText };
}

function sanitizeHtml(text) {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}



// Email Templates - Matching website's minimal aerospace theme
const EMAIL_STYLES = `
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { 
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; 
    line-height: 1.6; 
    color: #0f172a; 
    background: #f1f5f9;
  }
  .wrapper { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.08); }
  .header { 
    background: #0f172a;
    color: #ffffff; 
    padding: 40px 32px 36px; 
    text-align: center; 
  }
  .header-logo {
    width: 72px;
    height: 72px;
    margin: 0 auto 16px;
    display: block;
  }
  .brand { 
    font-size: 26px; 
    font-weight: 800; 
    letter-spacing: 3px;
    color: #ffffff;
    margin-bottom: 6px;
  }
  .tagline { 
    font-size: 11px; 
    color: #94a3b8;
    letter-spacing: 1.5px;
    text-transform: uppercase;
  }
  .content { padding: 40px 32px; }
  .badge {
    display: inline-block;
    background: #f0f9ff;
    color: #1e40af;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    padding: 5px 12px;
    border-radius: 50px;
    border: 1px solid #bfdbfe;
    margin-bottom: 16px;
  }
  .title { 
    font-size: 22px; 
    font-weight: 700; 
    color: #0f172a; 
    margin-bottom: 8px;
    line-height: 1.3;
  }
  .subtitle {
    font-size: 15px;
    color: #64748b;
    margin-bottom: 28px;
    line-height: 1.6;
  }
  .divider {
    height: 1px;
    background: #e2e8f0;
    margin: 28px 0;
  }
  .text { 
    color: #475569; 
    margin-bottom: 20px; 
    line-height: 1.75;
    font-size: 15px;
  }
  .box { 
    background: #f8fafc; 
    padding: 24px; 
    border-radius: 10px; 
    border: 1px solid #e2e8f0;
    margin: 24px 0; 
  }
  .box-title {
    font-weight: 700;
    color: #0f172a;
    margin-bottom: 16px;
    font-size: 14px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
  .list-item { 
    margin: 10px 0; 
    padding-left: 20px; 
    position: relative;
    color: #475569;
    font-size: 14px;
    line-height: 1.6;
  }
  .list-item:before { 
    content: "–"; 
    position: absolute; 
    left: 0; 
    color: #94a3b8;
  }
  .highlight-box {
    background: #0f172a;
    color: #ffffff;
    padding: 20px 24px;
    border-radius: 10px;
    margin: 24px 0;
    font-size: 14px;
    line-height: 1.7;
  }
  .highlight-box strong {
    color: #93c5fd;
  }
  .cta { text-align: center; margin: 32px 0 8px; }
  .button { 
    display: inline-block; 
    padding: 14px 36px; 
    background: #1e40af; 
    color: #ffffff !important; 
    text-decoration: none; 
    border-radius: 8px; 
    font-weight: 700;
    font-size: 14px;
    letter-spacing: 0.3px;
  }
  .footer { 
    text-align: center; 
    padding: 28px 32px; 
    color: #94a3b8; 
    font-size: 12px; 
    background: #f8fafc;
    border-top: 1px solid #e2e8f0;
  }
  .footer-brand {
    font-weight: 700;
    color: #475569;
    margin-bottom: 6px;
    font-size: 13px;
    letter-spacing: 0.5px;
  }
  .footer-links {
    margin-top: 12px;
  }
  .footer-links a {
    color: #94a3b8;
    text-decoration: none;
    margin: 0 8px;
    font-size: 12px;
  }
  .field { margin-bottom: 16px; }
  .label { 
    font-weight: 600; 
    color: #64748b; 
    margin-bottom: 4px; 
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
  .value { 
    background: #ffffff; 
    padding: 10px 14px; 
    border-radius: 6px; 
    border: 1px solid #e2e8f0; 
    word-wrap: break-word;
    color: #0f172a;
    font-size: 14px;
    line-height: 1.6;
  }
  .value a { color: #1e40af; text-decoration: none; }
  .applicant-header {
    background: #f8fafc;
    border: 1px solid #e2e8f0;
    border-radius: 10px;
    padding: 20px 24px;
    margin-bottom: 24px;
    display: flex;
    align-items: center;
    gap: 16px;
  }
  .applicant-avatar {
    width: 48px;
    height: 48px;
    background: #1e40af;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    font-weight: 700;
    color: #ffffff;
    flex-shrink: 0;
  }
  .applicant-name {
    font-size: 17px;
    font-weight: 700;
    color: #0f172a;
    margin-bottom: 3px;
  }
  .applicant-meta {
    font-size: 13px;
    color: #64748b;
  }
  .section-divider {
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 1px;
    color: #94a3b8;
    margin: 24px 0 16px;
    padding-bottom: 8px;
    border-bottom: 1px solid #f1f5f9;
  }
`;

function getNewsletterWelcomeEmail(email) {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>${EMAIL_STYLES}</style>
    </head>
    <body style="background:#f1f5f9; padding: 32px 16px;">
      <div class="wrapper">
        <div class="header">
          <img class="header-logo" src="https://gari.live/gari-logo-new.png" alt="GARI" />
          <div class="brand">GARI</div>
          <div class="tagline">GITAM Aerospace Rocketry Initiative</div>
        </div>
        <div class="content">
          <div class="badge">Newsletter</div>
          <div class="title">You're on the list.</div>
          <div class="subtitle">Thanks for subscribing — we'll keep you in the loop on everything happening at GARI.</div>
          <div class="divider"></div>
          <div class="text">
            You'll hear from us when there's something worth saying — mission updates, competition results, and behind-the-scenes looks at how we build aerospace hardware from scratch.
          </div>
          <div class="box">
            <div class="box-title">What to expect</div>
            <div class="list-item">CanSat mission updates and flight data</div>
            <div class="list-item">Competition results and achievements</div>
            <div class="list-item">Engineering deep-dives and build logs</div>
            <div class="list-item">Team news and upcoming events</div>
          </div>
          <div class="cta">
            <a href="https://gari.live" class="button">Visit gari.live</a>
          </div>
        </div>
        <div class="footer">
          <div class="footer-brand">GARI — GITAM Aerospace Rocketry Initiative</div>
          <div>GITAM University, Hyderabad</div>
          <div class="footer-links">
            <a href="https://gari.live">Website</a>
            <a href="mailto:contact@gari.live">contact@gari.live</a>
          </div>
          <div style="margin-top: 16px; color: #cbd5e1; font-size: 11px;">
            To unsubscribe, reply with "Unsubscribe" in the subject line.
          </div>
        </div>
      </div>
    </body>
    </html>
  `;
}

function getContactConfirmationEmail(name, subject) {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>${EMAIL_STYLES}</style>
    </head>
    <body style="background:#f1f5f9; padding: 32px 16px;">
      <div class="wrapper">
        <div class="header">
          <img class="header-logo" src="https://gari.live/gari-logo-new.png" alt="GARI" />
          <div class="brand">GARI</div>
          <div class="tagline">GITAM Aerospace Rocketry Initiative</div>
        </div>
        <div class="content">
          <div class="badge">Message Received</div>
          <div class="title">We got your message.</div>
          <div class="subtitle">Hi ${sanitizeHtml(name)}, our team will review it and get back to you within 24–48 hours.</div>
          <div class="divider"></div>
          <div class="box">
            <div class="box-title">Your subject</div>
            <div style="color: #475569; font-size: 15px; line-height: 1.6;">${sanitizeHtml(subject)}</div>
          </div>
          <div class="text">
            While you wait, feel free to explore our work — from our active CanSat mission to past achievements.
          </div>
          <div class="cta">
            <a href="https://gari.live" class="button">Explore GARI</a>
          </div>
          <div class="divider"></div>
          <div class="text" style="font-size: 14px; color: #94a3b8;">
            The GARI Team<br>
            GITAM Aerospace Rocketry Initiative
          </div>
        </div>
        <div class="footer">
          <div class="footer-brand">GARI — GITAM Aerospace Rocketry Initiative</div>
          <div>GITAM University, Hyderabad</div>
          <div class="footer-links">
            <a href="https://gari.live">Website</a>
            <a href="mailto:contact@gari.live">contact@gari.live</a>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;
}

function getApplicationConfirmationEmail(name, domain) {
  const firstName = sanitizeHtml(name.split(' ')[0]);
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>${EMAIL_STYLES}</style>
    </head>
    <body style="background:#f1f5f9; padding: 32px 16px;">
      <div class="wrapper">
        <div class="header">
          <img class="header-logo" src="https://gari.live/gari-logo-new.png" alt="GARI" />
          <div class="brand">GARI</div>
          <div class="tagline">GITAM Aerospace Rocketry Initiative</div>
        </div>
        <div class="content">
          <div class="badge">Application Received</div>
          <div class="title">We've got your application, ${firstName}.</div>
          <div class="subtitle">You applied for <strong>${sanitizeHtml(domain)}</strong>. Our recruitment team will review your application carefully.</div>
          <div class="divider"></div>
          <div class="box">
            <div class="box-title">What happens next</div>
            <div class="list-item">Application review within 5–7 business days</div>
            <div class="list-item">Shortlisted candidates contacted for an interview</div>
            <div class="list-item">Selected candidates receive an offer to join GARI</div>
            <div class="list-item">Onboarding and team orientation</div>
          </div>
          <div class="highlight-box">
            We build real aerospace hardware — not slides. If selected, you'll work on our active <strong>CanSat mission for IN-SPACe CAN-7USAT 2026</strong> alongside engineers who care deeply about getting it right.
          </div>
          <div class="cta">
            <a href="https://gari.live/cansat" class="button">See Our Current Mission</a>
          </div>
          <div class="divider"></div>
          <div class="text" style="font-size: 14px; color: #94a3b8;">
            GARI Recruitment Team<br>
            GITAM Aerospace Rocketry Initiative
          </div>
        </div>
        <div class="footer">
          <div class="footer-brand">GARI — GITAM Aerospace Rocketry Initiative</div>
          <div>GITAM University, Hyderabad</div>
          <div class="footer-links">
            <a href="https://gari.live">Website</a>
            <a href="mailto:contact@gari.live">contact@gari.live</a>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;
}

function getLeadNotificationEmail(type, data) {
  if (type === 'newsletter') {
    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <style>${EMAIL_STYLES}</style>
      </head>
      <body style="background:#f1f5f9; padding: 32px 16px;">
        <div class="wrapper">
          <div class="header">
            <div class="brand">GARI</div>
            <div class="tagline">Newsletter Subscription</div>
          </div>
          <div class="content">
            <div class="badge">New Subscriber</div>
            <div class="title">Newsletter signup</div>
            <div class="divider"></div>
            <div class="field">
              <div class="label">Email</div>
              <div class="value"><a href="mailto:${sanitizeHtml(data.email)}">${sanitizeHtml(data.email)}</a></div>
            </div>
            <div class="field">
              <div class="label">Subscribed at</div>
              <div class="value">${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST</div>
            </div>
          </div>
          <div class="footer">
            <div class="footer-brand">GARI Website Notification</div>
          </div>
        </div>
      </body>
      </html>
    `;
  } else if (type === 'application') {
    const initials = data.fullName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <style>${EMAIL_STYLES}</style>
      </head>
      <body style="background:#f1f5f9; padding: 32px 16px;">
        <div class="wrapper">
          <div class="header">
            <div class="brand">GARI</div>
            <div class="tagline">New Recruitment Application</div>
          </div>
          <div class="content">
            <div class="badge">Application</div>
            <div class="title">${sanitizeHtml(data.fullName)}</div>
            <div class="subtitle">Applied for <strong>${sanitizeHtml(data.domain)}</strong> &nbsp;·&nbsp; ${sanitizeHtml(data.year)}${data.year === '1' ? 'st' : data.year === '2' ? 'nd' : data.year === '3' ? 'rd' : 'th'} Year &nbsp;·&nbsp; ${sanitizeHtml(data.branch)}</div>
            <div class="divider"></div>

            <div class="section-divider">Contact</div>
            <div class="field">
              <div class="label">Email</div>
              <div class="value"><a href="mailto:${sanitizeHtml(data.email)}">${sanitizeHtml(data.email)}</a></div>
            </div>
            <div class="field">
              <div class="label">Phone</div>
              <div class="value">${sanitizeHtml(data.phone)}</div>
            </div>
            <div class="field">
              <div class="label">Student ID</div>
              <div class="value">${sanitizeHtml(data.studentId)}</div>
            </div>

            <div class="section-divider">Skills</div>
            <div class="field">
              <div class="label">Technical Skills</div>
              <div class="value" style="white-space: pre-wrap;">${sanitizeHtml(data.skills)}</div>
            </div>
            ${data.experience ? `
            <div class="field">
              <div class="label">Previous Experience</div>
              <div class="value" style="white-space: pre-wrap;">${sanitizeHtml(data.experience)}</div>
            </div>
            ` : ''}

            <div class="section-divider">Motivation</div>
            <div class="field">
              <div class="label">Why join GARI?</div>
              <div class="value" style="white-space: pre-wrap;">${sanitizeHtml(data.motivation)}</div>
            </div>
            <div class="field">
              <div class="label">Time Commitment</div>
              <div class="value">${sanitizeHtml(data.availability)}</div>
            </div>

            <div class="divider"></div>
            <div class="cta">
              <a href="mailto:${sanitizeHtml(data.email)}" class="button">Reply to Applicant</a>
            </div>
          </div>
          <div class="footer">
            <div class="footer-brand">GARI Website Notification</div>
            <div>Submitted ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST</div>
          </div>
        </div>
      </body>
      </html>
    `;
  } else {
    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <style>${EMAIL_STYLES}</style>
      </head>
      <body style="background:#f1f5f9; padding: 32px 16px;">
        <div class="wrapper">
          <div class="header">
            <div class="brand">GARI</div>
            <div class="tagline">New Contact Form Submission</div>
          </div>
          <div class="content">
            <div class="badge">Contact Form</div>
            <div class="title">${sanitizeHtml(data.subject)}</div>
            <div class="subtitle">From ${sanitizeHtml(data.name)}</div>
            <div class="divider"></div>
            <div class="field">
              <div class="label">Name</div>
              <div class="value">${sanitizeHtml(data.name)}</div>
            </div>
            <div class="field">
              <div class="label">Email</div>
              <div class="value"><a href="mailto:${sanitizeHtml(data.email)}">${sanitizeHtml(data.email)}</a></div>
            </div>
            <div class="field">
              <div class="label">Subject</div>
              <div class="value">${sanitizeHtml(data.subject)}</div>
            </div>
            <div class="field">
              <div class="label">Message</div>
              <div class="value" style="white-space: pre-wrap;">${sanitizeHtml(data.message)}</div>
            </div>
            <div class="divider"></div>
            <div class="cta">
              <a href="mailto:${sanitizeHtml(data.email)}" class="button">Reply to ${sanitizeHtml(data.name)}</a>
            </div>
          </div>
          <div class="footer">
            <div class="footer-brand">GARI Website Notification</div>
            <div>Submitted ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST</div>
          </div>
        </div>
      </body>
      </html>
    `;
  }
}



async function handleNewsletter(email, apiKey, res) {
  const emailValidation = validateEmail(email);
  if (!emailValidation.valid) return res.status(400).json({ error: emailValidation.error });
  
  const validatedEmail = emailValidation.email;

  try {
    // Add to Brevo
    await fetch('https://api.brevo.com/v3/contacts', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'api-key': apiKey,
      },
      body: JSON.stringify({
        email: validatedEmail,
        listIds: [2],
        updateEnabled: true,
        attributes: { SUBSCRIBED_DATE: new Date().toISOString() },
      }),
    });

    // Send welcome email
    await fetch('https://api.brevo.com/v3/smtp/email', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'api-key': apiKey,
        },
        body: JSON.stringify({
          sender: { name: 'GARI Team', email: 'contact@gari.live' },
          to: [{ email: validatedEmail }],
          subject: 'Welcome to GARI Newsletter',
          htmlContent: getNewsletterWelcomeEmail(validatedEmail),
        }),
      });

      // Notify lead
      await fetch('https://api.brevo.com/v3/smtp/email', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'api-key': apiKey,
        },
        body: JSON.stringify({
          sender: { name: 'GARI Website', email: 'contact@gari.live' },
          to: [{ email: 'bc833498@gmail.com', name: 'GARI Lead' }],
          subject: 'New Newsletter Subscription',
          htmlContent: getLeadNotificationEmail('newsletter', { email: validatedEmail }),
        }),
      });

    return res.status(200).json({ 
      success: true, 
      message: 'Successfully subscribed to newsletter'
    });

  } catch (error) {
    console.error('Newsletter error:', error);
    return res.status(500).json({ error: 'Failed to process subscription', message: error.message });
  }
}

async function handleContact({ name, email, subject, message }, apiKey, res) {
  const nameValidation = validateName(name);
  if (!nameValidation.valid) return res.status(400).json({ error: nameValidation.error });
  
  const emailValidation = validateEmail(email);
  if (!emailValidation.valid) return res.status(400).json({ error: emailValidation.error });
  
  const subjectValidation = validateSubject(subject);
  if (!subjectValidation.valid) return res.status(400).json({ error: subjectValidation.error });
  
  const messageValidation = validateMessage(message);
  if (!messageValidation.valid) return res.status(400).json({ error: messageValidation.error });
  
  const validatedName = nameValidation.name;
  const validatedEmail = emailValidation.email;
  const validatedSubject = subjectValidation.subject;
  const validatedMessage = messageValidation.message;

  try {
    // Add to Brevo
    await fetch('https://api.brevo.com/v3/contacts', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'api-key': apiKey,
        },
        body: JSON.stringify({
          email: validatedEmail,
          attributes: {
            FIRSTNAME: validatedName.split(' ')[0],
            LASTNAME: validatedName.split(' ').slice(1).join(' ') || '',
            LAST_CONTACT_DATE: new Date().toISOString(),
          },
          listIds: [3],
          updateEnabled: true,
        }),
      });

      // Send to lead
      await fetch('https://api.brevo.com/v3/smtp/email', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'api-key': apiKey,
        },
        body: JSON.stringify({
          sender: { name: 'GARI Website', email: 'contact@gari.live' },
          to: [{ email: 'bc833498@gmail.com', name: 'GARI Lead' }],
          replyTo: { email: validatedEmail, name: validatedName },
          subject: `[GARI Contact] ${validatedSubject}`,
          htmlContent: getLeadNotificationEmail('contact', {
            name: validatedName,
            email: validatedEmail,
            subject: validatedSubject,
            message: validatedMessage
          }),
        }),
      });

      // Send confirmation to user
      await fetch('https://api.brevo.com/v3/smtp/email', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'api-key': apiKey,
        },
        body: JSON.stringify({
          sender: { name: 'GARI Team', email: 'contact@gari.live' },
          to: [{ email: validatedEmail, name: validatedName }],
          subject: 'We received your message - GARI',
          htmlContent: getContactConfirmationEmail(validatedName, validatedSubject),
        }),
      });

    return res.status(200).json({ 
      success: true, 
      message: 'Message sent successfully'
    });

  } catch (error) {
    console.error('Contact error:', error);
    return res.status(500).json({ error: 'Failed to process contact form', message: error.message });
  }
}

async function handleApplication(data, apiKey, res) {
  // Validate all fields
  const nameValidation = validateName(data.fullName);
  if (!nameValidation.valid) return res.status(400).json({ error: nameValidation.error });
  
  const emailValidation = validateEmail(data.email);
  if (!emailValidation.valid) return res.status(400).json({ error: emailValidation.error });
  
  const phoneValidation = validatePhone(data.phone);
  if (!phoneValidation.valid) return res.status(400).json({ error: phoneValidation.error });
  
  const studentIdValidation = validateStudentId(data.studentId);
  if (!studentIdValidation.valid) return res.status(400).json({ error: studentIdValidation.error });
  
  const branchValidation = validateSelect(data.branch, 'Branch');
  if (!branchValidation.valid) return res.status(400).json({ error: branchValidation.error });
  
  const yearValidation = validateSelect(data.year, 'Year');
  if (!yearValidation.valid) return res.status(400).json({ error: yearValidation.error });
  
  const domainValidation = validateSelect(data.domain, 'Domain');
  if (!domainValidation.valid) return res.status(400).json({ error: domainValidation.error });
  
  const skillsValidation = validateTextarea(data.skills, 'Technical Skills', 10, 2000);
  if (!skillsValidation.valid) return res.status(400).json({ error: skillsValidation.error });
  
  const motivationValidation = validateTextarea(data.motivation, 'Motivation', 50, 2000);
  if (!motivationValidation.valid) return res.status(400).json({ error: motivationValidation.error });
  
  const availabilityValidation = validateSelect(data.availability, 'Time Commitment');
  if (!availabilityValidation.valid) return res.status(400).json({ error: availabilityValidation.error });
  
  // Experience is optional
  let validatedExperience = '';
  if (data.experience && data.experience.trim()) {
    const experienceValidation = validateTextarea(data.experience, 'Experience', 0, 2000);
    if (!experienceValidation.valid) return res.status(400).json({ error: experienceValidation.error });
    validatedExperience = experienceValidation.text;
  }
  
  const validatedData = {
    fullName: nameValidation.name,
    email: emailValidation.email,
    phone: phoneValidation.phone,
    studentId: studentIdValidation.studentId,
    branch: branchValidation.value,
    year: yearValidation.value,
    domain: domainValidation.value,
    skills: skillsValidation.text,
    experience: validatedExperience,
    motivation: motivationValidation.text,
    availability: availabilityValidation.value
  };

  try {
    // Add to Brevo contacts
    await fetch('https://api.brevo.com/v3/contacts', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'api-key': apiKey,
      },
      body: JSON.stringify({
        email: validatedData.email,
        attributes: {
          FIRSTNAME: validatedData.fullName.split(' ')[0],
          LASTNAME: validatedData.fullName.split(' ').slice(1).join(' ') || '',
          PHONE: validatedData.phone,
          APPLICATION_DATE: new Date().toISOString(),
        },
        listIds: [4],
        updateEnabled: true,
      }),
    });

    // Send to lead
    await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'api-key': apiKey,
      },
      body: JSON.stringify({
        sender: { name: 'GARI Website', email: 'contact@gari.live' },
        to: [{ email: 'bc833498@gmail.com', name: 'GARI Lead' }],
        replyTo: { email: validatedData.email, name: validatedData.fullName },
        subject: `[GARI Application] ${validatedData.fullName} - ${validatedData.domain}`,
        htmlContent: getLeadNotificationEmail('application', validatedData),
      }),
    });

    // Send confirmation to applicant
    await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'api-key': apiKey,
      },
      body: JSON.stringify({
        sender: { name: 'GARI Team', email: 'contact@gari.live' },
        to: [{ email: validatedData.email, name: validatedData.fullName }],
        subject: 'Application Received - GARI',
        htmlContent: getApplicationConfirmationEmail(validatedData.fullName, validatedData.domain),
      }),
    });

    return res.status(200).json({ 
      success: true, 
      message: 'Application submitted successfully'
    });

  } catch (error) {
    console.error('Application error:', error);
    return res.status(500).json({ error: 'Failed to process application', message: error.message });
  }
}
