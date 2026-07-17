# Brevo Email Integration Setup Guide

This guide explains how to set up the Brevo (formerly Sendinblue) email integration for the GARI website.

## Features

✅ **Contact Form Emails**
- Sends notification to lead member (bc833498@gmail.com)
- Sends confirmation email to user
- Stores contacts in Brevo list (List ID: 3)
- Full validation and sanitization

✅ **Newsletter Subscription**
- Sends welcome email to subscriber
- Notifies lead member of new subscription
- Stores subscribers in Brevo list (List ID: 2)
- Email validation

## Setup Instructions

### 1. Create Brevo Account

1. Go to [Brevo.com](https://www.brevo.com/)
2. Sign up for a free account
3. Verify your email address

### 2. Get API Key

1. Log in to your Brevo dashboard
2. Go to **Settings** → **SMTP & API**
3. Click on **API Keys** tab
4. Click **Generate a new API key**
5. Give it a name (e.g., "GARI Website")
6. Copy the API key (you won't be able to see it again!)

### 3. Create Contact Lists

1. Go to **Contacts** → **Lists**
2. Create two lists:
   - **Newsletter Subscribers** (will be List ID: 2)
   - **Contact Form Submissions** (will be List ID: 3)
3. Note down the List IDs (you can find them in the URL when viewing a list)

### 4. Verify Sender Email

1. Go to **Settings** → **Senders & IP**
2. Add and verify your sender email domain
3. For testing, you can use Brevo's default sender
4. For production, verify your own domain (e.g., contact@gari.live)

### 5. Configure Vercel Environment Variables

#### Option A: Via Vercel Dashboard

1. Go to your project on [Vercel Dashboard](https://vercel.com/dashboard)
2. Click on your project
3. Go to **Settings** → **Environment Variables**
4. Add the following variable:
   - **Name**: `BREVO_API_KEY`
   - **Value**: Your Brevo API key (from step 2)
   - **Environment**: Production, Preview, Development (select all)
5. Click **Save**

#### Option B: Via Vercel CLI

```bash
# Install Vercel CLI if you haven't
npm i -g vercel

# Link your project
vercel link

# Add environment variable
vercel env add BREVO_API_KEY
# Paste your API key when prompted
# Select: Production, Preview, Development
```

### 6. Update List IDs (if different)

If your Brevo list IDs are different from 2 and 3, update them in:

**File**: `api/send-email.js`

```javascript
// Line ~120 - Newsletter list
listIds: [2], // Change to your newsletter list ID

// Line ~280 - Contact form list
listIds: [3], // Change to your contact form list ID
```

### 7. Update Lead Member Email (if needed)

To change the lead member email from bc833498@gmail.com:

**File**: `api/send-email.js`

Search for `bc833498@gmail.com` and replace with your email address (appears 3 times).

### 8. Deploy to Vercel

```bash
# Build the project
npm run build

# Deploy to Vercel
vercel --prod
```

Or push to your GitHub repository if you have automatic deployments set up.

## Testing

### Test Contact Form

1. Go to your website's Contact page
2. Fill out the form with test data
3. Submit the form
4. Check:
   - Lead member receives notification email
   - User receives confirmation email
   - Contact appears in Brevo list (ID: 3)

### Test Newsletter Subscription

1. Go to your website footer
2. Enter an email address
3. Click Subscribe
4. Check:
   - Subscriber receives welcome email
   - Lead member receives notification
   - Subscriber appears in Brevo list (ID: 2)

## Validation Rules

### Email
- Required
- Valid email format
- Max 254 characters
- Automatically trimmed and lowercased

### Name (Contact Form)
- Required
- Min 2 characters
- Max 100 characters
- Only letters, spaces, hyphens, apostrophes

### Subject (Contact Form)
- Required
- Min 3 characters
- Max 200 characters

### Message (Contact Form)
- Required
- Min 10 characters
- Max 5000 characters

## Security Features

✅ Input validation (client & server)
✅ HTML sanitization (prevents XSS)
✅ API key stored in environment variables
✅ Rate limiting (via Brevo)
✅ HTTPS only (enforced by Vercel)

## Troubleshooting

### "BREVO_API_KEY is not set" Error

**Solution**: Make sure you've added the environment variable in Vercel and redeployed.

### Emails Not Sending

**Possible causes**:
1. Invalid API key
2. Sender email not verified
3. Brevo account suspended (check dashboard)
4. Daily sending limit reached (free plan: 300 emails/day)

**Solution**: Check Brevo dashboard → Logs for detailed error messages.

### Contacts Not Added to Lists

**Possible causes**:
1. Wrong list IDs in code
2. Lists deleted or archived

**Solution**: Verify list IDs in Brevo dashboard and update code if needed.

### Form Validation Errors

**Solution**: Check browser console for detailed error messages. Validation happens both client-side and server-side.

## Brevo Free Plan Limits

- **300 emails/day**
- **Unlimited contacts**
- **2,000 emails/month** (for marketing campaigns)
- **Basic email templates**

For higher limits, consider upgrading to a paid plan.

## Support

- **Brevo Documentation**: https://developers.brevo.com/
- **Brevo Support**: https://help.brevo.com/
- **GARI Team**: contact@gari.live

## File Structure

```
GARI/gari-react/
├── api/
│   └── send-email.js          # Serverless function for email handling
├── src/
│   ├── components/
│   │   └── layout/
│   │       ├── Footer.jsx     # Newsletter subscription
│   │       └── Footer.css
│   └── pages/
│       ├── ContactPage.jsx    # Contact form
│       └── ContactPage.css
└── BREVO_SETUP.md            # This file
```

## Next Steps

1. ✅ Set up Brevo account
2. ✅ Get API key
3. ✅ Create contact lists
4. ✅ Add environment variable to Vercel
5. ✅ Deploy to production
6. ✅ Test both forms
7. 🎉 Start receiving emails!
