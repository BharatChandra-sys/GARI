# GARI — GITAM Aerospace Rocketry Initiative

Official website for GARI, the student aerospace and rocketry team at GITAM University, Hyderabad. Live at [gari.live](https://gari.live).

---

## What the site covers

GARI competes in two IN-SPACe 2026 national competitions: CAN-7USAT (CanSat) and the Model Rocketry India Student Competition (1 km altitude). The site presents the team mission, both competition programs, team roster, achievements archive, sponsorship program, and a membership application form.

---

## Tech stack

| Layer | Technology |
|---|---|
| UI framework | React 19, React Router v7 |
| Animation | Framer Motion 12 |
| 3D rendering | Three.js 0.184, React Three Fiber 9, Drei 10 |
| Email | Brevo transactional API |
| Hosting | Vercel (Serverless Functions for email) |

---

## Project structure

```
gari-react/
├── api/
│   └── send-email.js          # Vercel serverless function — Brevo email handler
├── public/
│   ├── achievements/          # Project photos and media
│   ├── models/                # rocket.glb / rocket.gltf (Three.js scene)
│   ├── team/                  # Team member photos
│   ├── sitemap.xml
│   └── robots.txt
├── src/
│   ├── components/
│   │   ├── common/            # Boot splash, SEO/JSON-LD, Logo
│   │   ├── layout/            # Navbar, Footer
│   │   ├── home/              # Hero, StatusStrip, Process sections
│   │   ├── sections/          # Shared page sections
│   │   └── 3d/                # RocketScene (Three.js)
│   ├── data/                  # milestones.js and other static content
│   ├── pages/                 # Route-level page components
│   ├── App.js                 # Router, animated page wipe transitions
│   └── index.css              # Global styles
├── vercel.json                # Vercel build config, headers, rewrites, redirects
├── DEPLOY.md                  # Step-by-step deployment reference
└── DEPLOYMENT.md              # Environment variable and config reference
```

---

## Pages

| Route | Description |
|---|---|
| `/` | Home — hero, project overview, stats, sponsor CTA |
| `/about` | About — team story, values, timeline, divisions |
| `/mission` | Mission — pillars, roadmap, goals |
| `/competitions` | Competition programs — CanSat and Rocket for IN-SPACe 2026 |
| `/team` | Team — CanSat team, Rocket team, core members |
| `/achievements` | Achievements — competition record and prototype archive |
| `/achievements/:slug` | Individual project detail page |
| `/apply` | Membership application form |
| `/sponsors` | Sponsorship tiers, value proposition, partner CTA |
| `/contact` | Contact form and social links |

`/cansat` permanently redirects to `/competitions`.

---

## Local development

```bash
npm install
npm start
```

The dev server runs on `http://localhost:3000`.

---

## Deployment

The site deploys to Vercel. See `DEPLOY.md` for the full reference.

**Quick deploy:**

```bash
npm run build
npx vercel --prod
```

**Add the Brevo API key after the first deploy:**

```bash
npx vercel env add BREVO_API_KEY production
```

Paste the key from [app.brevo.com/settings/keys/api](https://app.brevo.com/settings/keys/api), then redeploy:

```bash
npx vercel --prod
```

---

## Environment variables

| Variable | Required | Description |
|---|---|---|
| `BREVO_API_KEY` | Yes | Brevo transactional email API key |

Set this in the Vercel dashboard under Project Settings > Environment Variables, or with `vercel env add`.

---

## Email system

Contact form submissions and newsletter signups both route through the `/api/send-email` serverless function using Brevo.

| Trigger | Behavior |
|---|---|
| Newsletter signup | Sends a welcome email to the subscriber; notifies the team inbox |
| Contact form submission | Sends a confirmation to the sender; delivers the full message to the team inbox |

Brevo list IDs:
- List 2 — newsletter subscribers
- List 3 — contact form submissions

---

## SEO

Every page uses the `SEO` component to inject structured data (JSON-LD). Schema types in use: `Organization`, `WebPage`, `AboutPage`, `ResearchProject`, `ItemList`. A sitemap is at `/sitemap.xml` and crawl rules are in `/robots.txt`.

---

## Security headers

All responses include the following headers, configured in `vercel.json`:

- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: SAMEORIGIN`
- `X-XSS-Protection: 1; mode=block`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Strict-Transport-Security` with two-year max-age and preload
- `Permissions-Policy` blocking camera, microphone, and geolocation

Static assets under `/static/` are served with a one-year immutable cache header.

---

## Contributing

This is a closed team repository. Contributions are made by GARI members only. For access or collaboration enquiries, contact [contact@gari.live](mailto:contact@gari.live).

---

**Organization:** GITAM Aerospace Rocketry Initiative  
**University:** GITAM University, Hyderabad, India  
**Website:** [gari.live](https://gari.live)  
**Contact:** [contact@gari.live](mailto:contact@gari.live)
