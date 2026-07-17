# GARI Aerospace Website

Modern, minimal aerospace website for GITAM Aerospace rocketry Initiative.

## 🚀 Quick Deploy

```bash
cd GARI/gari-react
npm install
npm run build
npx vercel --prod
```

Then add your Brevo API key:
```bash
npx vercel env add BREVO_API_KEY production
```

Paste your Brevo API key when prompted (get it from https://app.brevo.com/settings/keys/api).

Redeploy:
```bash
npx vercel --prod
```

## 📧 Email System

- **Newsletter**: Users subscribe → Welcome email sent → Notification to bc833498@gmail.com
- **Contact Form**: User submits → Confirmation email sent → Full message to bc833498@gmail.com
- **Brevo Lists**: List ID 2 (Newsletter), List ID 3 (Contacts)

## 📁 Structure

```
gari-react/
├── api/
│   └── send-email.js       # Email handler (Brevo)
├── src/
│   ├── components/         # React components
│   ├── pages/              # All pages
│   └── App.js              # Main app
├── public/                 # Static files
└── DEPLOY.md               # Deployment guide
```

## 🛠️ Tech Stack

- React 18
- React Router v6
- Three.js (3D graphics)
- Brevo (emails)
- Vercel (hosting)

## 📝 Documentation

See **DEPLOY.md** for complete deployment instructions.

## 👥 Team

**Lead**: bc833498@gmail.com  
**Organization**: GITAM Aerospace rocketry Initiative  
**University**: GITAM University, Hyderabad

---

**Built with ❤️ by GARI Team** 🚀
