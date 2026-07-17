# GARI — GITAM Aerospace Rocketry Initiative

Official website for GARI, the student aerospace and rocketry team at GITAM University, Hyderabad. Built with React 18, deployed on Vercel, and served at [gari.live](https://gari.live).

---

## Overview

GARI competes in IN-SPACe CAN-7USAT 2026, India's national student CanSat competition. The site covers the team's mission, CanSat project, team roster, achievements archive, and sponsorship program.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18, React Router v6 |
| Animations | Framer Motion |
| 3D Graphics | Three.js |
| Email | Brevo API (transactional + newsletter) |
| Hosting | Vercel |
| Deployment API | Vercel Serverless Functions |

---

## Project Structure

```
gari-react/
├── api/
│   └── send-email.js          # Serverless email handler via Brevo
├── public/
│   ├── achievements/          # Project media (photos, videos)
│   ├── team/                  # Team member photos
│   ├── sitemap.xml
│   └── robots.txt
├── src/
│   ├── components/
│   │   ├── common/            # SEO, Logo, SplashScreen
│   │   ├── layout/            # Navbar, Footer
│   │   ├── sections/          # Hero, About, AnimatedStats, Sponsors, etc.
│   │   └── 3d/                # StarField, Rocket3D (Three.js)
│   ├── pages/                 # Route-level page components
│   ├── data/                  # Achievements data, static content
│   └── App.js                 # Router configuration
├── vercel.json                # Vercel routing and function config
├── DEPLOY.md                  # Full deployment reference
└── DEPLOYMENT.md              # Environment and configuration reference
```

---

## Local Development

```bash
# Install dependencies
npm install

# Start development server
npm start
```

The dev server runs on `http://localhost:3000`.

---

## Deployment

The site deploys to Vercel. A full guide is in `DEPLOY.md`.

**Quick deploy:**

```bash
npm run build
npx vercel --prod
```

**Add the Brevo API key after deploying:**

```bash
npx vercel env add BREVO_API_KEY production
```

Paste the API key from [app.brevo.com/settings/keys/api](https://app.brevo.com/settings/keys/api) when prompted, then redeploy:

```bash
npx vercel --prod
```

---

## Email System

The contact form and newsletter subscription both route through Brevo.

| Function | Behavior |
|---|---|
| Newsletter signup | Sends a welcome email to the subscriber; notifies the team inbox |
| Contact form submission | Sends a confirmation to the sender; delivers the full message to the team inbox |

**Brevo list configuration:**

- List ID 2 — Newsletter subscribers
- List ID 3 — Contact form submissions

---

## Environment Variables

| Variable | Required | Description |
|---|---|---|
| `BREVO_API_KEY` | Yes | Brevo transactional email API key |

Set this in the Vercel dashboard under Project Settings > Environment Variables, or via `vercel env add BREVO_API_KEY production`.

---

## Pages

| Route | Page |
|---|---|
| `/` | Home — Hero, project overview, stats, sponsor CTA |
| `/about` | About — Team story, values, timeline, divisions |
| `/mission` | Mission — Pillars, roadmap, goals |
| `/cansat` | CanSat Project — IN-SPACe 2026 mission, subsystems, timeline |
| `/team` | Team — CanSat team, Rocket team, core members |
| `/achievements` | Achievements — Competition record, prototype archive |
| `/sponsors` | Sponsors — Tiers, why GARI, partner CTA |
| `/contact` | Contact — Contact form, social links |

---

## SEO

Structured data (JSON-LD) is implemented on every page via the `SEO` component. Schema types in use: `Organization`, `WebPage`, `AboutPage`, `ResearchProject`, `ItemList`. A sitemap is maintained at `/sitemap.xml`.

---

## Contributing

This is a closed team repository. All contributions are made by GARI members. For access or collaboration enquiries, contact the team at [contact@gari.live](mailto:contact@gari.live).

---

## Team

**Organization:** GITAM Aerospace Rocketry Initiative  
**University:** GITAM University, Hyderabad, India  
**Website:** [gari.live](https://gari.live)  
**Contact:** [contact@gari.live](mailto:contact@gari.live)
