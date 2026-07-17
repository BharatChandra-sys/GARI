# GARI Website - Deployment Guide

## 🚀 Simple 5-Step Deployment

### Step 1: Build the Project

```bash
cd GARI/gari-react
npm install
npm run build
```

### Step 2: Deploy to Vercel

```bash
npx vercel --prod
```

Follow the prompts:
- **Set up and deploy?** → Yes
- **Which scope?** → Your account
- **Link to existing project?** → No
- **Project name?** → gari-website
- **Directory?** → ./
- **Override settings?** → No

You'll get a URL like: `https://gari-website.vercel.app`

### Step 3: Add Brevo API Key

```bash
npx vercel env add BREVO_API_KEY production
```

When prompted, paste your Brevo API key:


### Step 4: Redeploy with API Key

```bash
npx vercel --prod
```

### Step 5: Test

1. Visit your website
2. Subscribe to newsletter (footer)
3. Fill contact form
4. Check bc833498@gmail.com for emails

## ✅ What Happens

### Newsletter Subscription:
- ✅ User added to Brevo List ID 2
- ✅ User receives welcome email
- ✅ bc833498@gmail.com receives notification

### Contact Form:
- ✅ Contact added to Brevo List ID 3
- ✅ User receives confirmation email
- ✅ bc833498@gmail.com receives full message

## 🔑 Your Brevo API Key

Get your API key from: https://app.brevo.com/settings/keys/api

Keep it secure and never commit it to git!

## 📧 Brevo Lists

Make sure these lists exist in your Brevo account:
- **List ID 2**: Newsletter Subscribers
- **List ID 3**: Contact Form Submissions

## 🛠️ Useful Commands

### View logs:
```bash
npx vercel logs
```

### Check environment variables:
```bash
npx vercel env ls
```

### Redeploy:
```bash
npx vercel --prod
```

## ❌ Troubleshooting

### Emails not sending?

1. Check API key is set:
   ```bash
   npx vercel env ls
   ```

2. View logs:
   ```bash
   npx vercel logs --follow
   ```

3. Verify Brevo lists exist (ID 2 and 3)

### Build fails?

1. Clear cache:
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   npm run build
   ```

2. Check Node version (should be 16+):
   ```bash
   node --version
   ```

## 📱 Test Checklist

- [ ] Website loads correctly
- [ ] Newsletter subscription works
- [ ] Contact form works
- [ ] Welcome email received
- [ ] Confirmation email received
- [ ] Notifications to bc833498@gmail.com
- [ ] Mobile responsive
- [ ] All pages load

## 🎯 That's It!

Your website is now live with:
- ✅ Professional email system
- ✅ Newsletter subscriptions
- ✅ Contact form
- ✅ All emails to bc833498@gmail.com
- ✅ Clean, minimal design

**Website URL**: Check your Vercel dashboard or terminal output

**Lead Email**: bc833498@gmail.com (receives all notifications)

---

Need help? Check Vercel logs or Brevo dashboard for errors.
