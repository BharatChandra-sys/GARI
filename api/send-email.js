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
    background: #f9fafb;
  }
  .wrapper { max-width: 600px; margin: 0 auto; background: #ffffff; }
  .header { 
    background: #1a1a1a;
    color: #ffffff; 
    padding: 48px 32px; 
    text-align: center; 
  }
  .logo-img { 
    width: 60px; 
    height: 60px; 
    margin-bottom: 16px;
    display: inline-block;
  }
  .brand { 
    font-size: 28px; 
    font-weight: 700; 
    letter-spacing: 2px;
    margin-bottom: 8px;
  }
  .tagline { 
    font-size: 13px; 
    color: #cbd5e1;
    letter-spacing: 0.5px;
    text-transform: uppercase;
  }
  .content { padding: 48px 32px; }
  .title { 
    font-size: 24px; 
    font-weight: 700; 
    color: #1a1a1a; 
    margin-bottom: 24px;
    text-align: center;
  }
  .text { 
    color: #4b5563; 
    margin-bottom: 24px; 
    line-height: 1.7;
    font-size: 15px;
  }
  .box { 
    background: #f9fafb; 
    padding: 24px; 
    border-radius: 8px; 
    border: 1px solid #e5e7eb;
    margin: 32px 0; 
  }
  .box-title {
    font-weight: 600;
    color: #1a1a1a;
    margin-bottom: 16px;
    font-size: 16px;
  }
  .list-item { 
    margin: 12px 0; 
    padding-left: 24px; 
    position: relative;
    color: #4b5563;
    font-size: 14px;
  }
  .list-item:before { 
    content: "→"; 
    position: absolute; 
    left: 0; 
    color: #1a1a1a; 
    font-weight: bold; 
  }
  .cta { text-align: center; margin: 32px 0; }
  .button { 
    display: inline-block; 
    padding: 14px 32px; 
    background: #1a1a1a; 
    color: #ffffff !important; 
    text-decoration: none; 
    border-radius: 6px; 
    font-weight: 600;
    font-size: 15px;
  }
  .footer { 
    text-align: center; 
    padding: 32px; 
    color: #6b7280; 
    font-size: 13px; 
    background: #f9fafb;
    border-top: 1px solid #e5e7eb;
  }
  .footer-brand {
    font-weight: 600;
    color: #1a1a1a;
    margin-bottom: 8px;
  }
  .field { margin-bottom: 20px; }
  .label { font-weight: 600; color: #1a1a1a; margin-bottom: 8px; font-size: 14px; }
  .value { 
    background: white; 
    padding: 12px; 
    border-radius: 6px; 
    border: 1px solid #e5e7eb; 
    word-wrap: break-word;
    color: #4b5563;
  }
`;

function getNewsletterWelcomeEmail(email) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>${EMAIL_STYLES}</style>
    </head>
    <body>
      <div class="wrapper">
        <div class="header">
          <img src="https://gari.live/gari-logo.png" alt="GARI Logo" style="width: 80px; height: 80px; margin-bottom: 16px;" />
          <div class="brand">GARI</div>
          <div class="tagline">GITAM Aerospace rocketry Initiative</div>
        </div>
        <div class="content">
          <div class="title">Welcome Aboard!</div>
          <div class="text">
            Thank you for subscribing to the GARI newsletter. You're now part of our aerospace innovation community.
          </div>
          <div class="box">
            <div class="box-title">What you'll receive:</div>
            <div class="list-item">Latest updates on our CanSat mission</div>
            <div class="list-item">Behind-the-scenes aerospace engineering insights</div>
            <div class="list-item">Competition results and achievements</div>
            <div class="list-item">Exclusive team updates and project milestones</div>
          </div>
          <div class="text">
            We're excited to share our journey of building advanced aerospace systems and pushing the boundaries of student innovation.
          </div>
          <div class="cta">
            <a href="https://gari.live" class="button">Visit Our Website</a>
          </div>
        </div>
        <div class="footer">
          <div class="footer-brand">GARI - GITAM Aerospace rocketry Initiative</div>
          <div style="margin: 8px 0;">GITAM University, Hyderabad</div>
          <div style="margin: 8px 0;">Building the future of aerospace technology</div>
          <div style="margin-top: 16px; font-size: 12px; color: #9ca3af;">
            You're receiving this because you subscribed to our newsletter.<br>
            To unsubscribe, reply with "Unsubscribe" in the subject.
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
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>${EMAIL_STYLES}</style>
    </head>
    <body>
      <div class="wrapper">
        <div class="header">
          <img src="https://gari.live/gari-logo.png" alt="GARI Logo" style="width: 80px; height: 80px; margin-bottom: 16px;" />
          <div class="brand">GARI</div>
          <div class="tagline">GITAM Aerospace rocketry Initiative</div>
        </div>
        <div class="content">
          <div class="title">Thank You for Reaching Out!</div>
          <div class="text">Hi ${sanitizeHtml(name)},</div>
          <div class="text">
            We've received your message and our team will review it shortly. We typically respond within 24-48 hours.
          </div>
          <div class="box">
            <div class="box-title">Your message:</div>
            <div style="color: #4b5563; font-style: italic;">"${sanitizeHtml(subject)}"</div>
          </div>
          <div class="text">
            In the meantime, feel free to explore our website to learn more about our aerospace projects and innovations.
          </div>
          <div class="text">
            <strong>Best regards,</strong><br>
            The GARI Team
          </div>
        </div>
        <div class="footer">
          <div class="footer-brand">GARI - GITAM Aerospace rocketry Initiative</div>
          <div style="margin: 8px 0;">GITAM University, Hyderabad</div>
          <div style="margin: 8px 0;">contact@gari.live</div>
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
      <html>
      <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; padding: 20px; color: #0f172a;">
        <div style="max-width: 600px; margin: 0 auto;">
          <h3 style="color: #1a1a1a; margin-bottom: 20px;">New Newsletter Subscription</h3>
          <div style="background: #f9fafb; padding: 20px; border-radius: 8px; border: 1px solid #e5e7eb;">
            <p style="margin: 8px 0;"><strong>Email:</strong> ${sanitizeHtml(data.email)}</p>
            <p style="margin: 8px 0;"><strong>Subscribed:</strong> ${new Date().toLocaleString()}</p>
          </div>
          <p style="color: #6b7280; font-size: 14px; margin-top: 20px;">
            Subscriber has been added to the newsletter list.
          </p>
        </div>
      </body>
      </html>
    `;
  } else {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <style>${EMAIL_STYLES}</style>
      </head>
      <body>
        <div class="wrapper">
          <div class="header">
            <div class="brand">New Contact Form Submission</div>
            <div class="tagline">GARI Aerospace rocketry Initiative</div>
          </div>
          <div class="content">
            <div class="field">
              <div class="label">From:</div>
              <div class="value">${sanitizeHtml(data.name)}</div>
            </div>
            <div class="field">
              <div class="label">Email:</div>
              <div class="value"><a href="mailto:${sanitizeHtml(data.email)}" style="color: #1a1a1a;">${sanitizeHtml(data.email)}</a></div>
            </div>
            <div class="field">
              <div class="label">Subject:</div>
              <div class="value">${sanitizeHtml(data.subject)}</div>
            </div>
            <div class="field">
              <div class="label">Message:</div>
              <div class="value" style="white-space: pre-wrap;">${sanitizeHtml(data.message)}</div>
            </div>
          </div>
          <div class="footer">
            <p>This email was sent from the GARI website contact form.</p>
            <p>Reply directly to this email to respond to ${sanitizeHtml(data.name)}.</p>
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
