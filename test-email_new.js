// Test script to send emails via Brevo
require('dotenv').config();

const BREVO_API_KEY = process.env.BREVO_API_KEY;

if (!BREVO_API_KEY) {
  console.error('❌ BREVO_API_KEY not found in .env file');
  process.exit(1);
}

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
  .footer { 
    text-align: center; 
    padding: 32px; 
    color: #6b7280; 
    font-size: 13px; 
    background: #f9fafb;
    border-top: 1px solid #e5e7eb;
  }
`;

function getTestEmail() {
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
          <img src="https://raw.githubusercontent.com/chandu1234678/GARI/main/GARI/gari-react/public/gari-logo.png" alt="GARI Logo" style="width: 80px; height: 80px; margin-bottom: 16px;" />
          <div class="brand">GARI</div>
          <div class="tagline">GITAM Aerospace rocketry Initiative</div>
        </div>
        <div class="content">
          <div class="title">Test Email - System Working! ✅</div>
          <div class="text">
            This is a test email from the GARI email system using the new verified sender address: <strong>contact@gari.live</strong>
          </div>
          <div class="text">
            If you're receiving this email, it means:
          </div>
          <div class="text">
            ✓ Brevo API integration is working<br>
            ✓ Sender email (contact@gari.live) is verified<br>
            ✓ Email templates are rendering correctly<br>
            ✓ System is ready for production use
          </div>
          <div class="text">
            <strong>Test Details:</strong><br>
            Sent at: ${new Date().toLocaleString()}<br>
            From: contact@gari.live<br>
            System: GARI Email Service
          </div>
        </div>
        <div class="footer">
          <div style="font-weight: 600; color: #1a1a1a; margin-bottom: 8px;">GARI - GITAM Aerospace rocketry Initiative</div>
          <div style="margin: 8px 0;">GITAM University, Hyderabad</div>
          <div style="margin: 8px 0;">contact@gari.live</div>
        </div>
      </div>
    </body>
    </html>
  `;
}

async function sendTestEmail() {
  console.log('🚀 Sending test email...\n');

  try {
    const response = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'api-key': BREVO_API_KEY,
      },
      body: JSON.stringify({
        sender: { 
          name: 'GARI Team', 
          email: 'contact@gari.live' 
        },
        to: [{ 
          email: 'bc833498@gmail.com', 
          name: 'GARI Lead' 
        }],
        subject: '✅ Test Email - GARI Email System',
        htmlContent: getTestEmail(),
      }),
    });

    const data = await response.json();

    if (response.ok) {
      console.log('✅ Test email sent successfully!');
      console.log('📧 Message ID:', data.messageId);
      console.log('📬 Sent to: bc833498@gmail.com');
      console.log('📤 From: contact@gari.live');
      console.log('\n✨ Check your inbox at bc833498@gmail.com');
    } else {
      console.error('❌ Failed to send email');
      console.error('Status:', response.status);
      console.error('Error:', data);
    }
  } catch (error) {
    console.error('❌ Error sending test email:', error.message);
  }
}

// Run the test
sendTestEmail();
