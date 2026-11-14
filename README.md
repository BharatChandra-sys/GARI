# GARI — GITAM Aerospace Rocketry Initiative

Official website for GARI, the student aerospace and rocketry team at GITAM University, Hyderabad. Live at [gari.live](https://gari.live).

The React app lives in `GARI/gari-react/`. See that directory's [README](GARI/gari-react/README.md) for full technical documentation.

---

## Quick start

```bash
cd GARI/gari-react
npm install
npm start
```

Dev server runs on `http://localhost:3000`.

---

## Deploy

```bash
cd GARI/gari-react
npm run build
npx vercel --prod
```

Add the Brevo API key after the first deploy:

```bash
npx vercel env add BREVO_API_KEY production
```

Paste the key from [app.brevo.com/settings/keys/api](https://app.brevo.com/settings/keys/api), then redeploy:

```bash
npx vercel --prod
```

See `GARI/gari-react/DEPLOY.md` for the full deployment reference.

---

## Repository layout

```
GARI/
├── GARI/
│   └── gari-react/        # React app — source, components, pages, API
├── api/                   # Legacy email handler (superseded by gari-react/api/)
├── .env.example           # Environment variable template
├── vercel.json            # Root-level Vercel config
└── README.md              # This file
```

---

## Tech stack

| Layer | Technology |
|---|---|
| UI framework | React 19, React Router v7 |
| Animation | Framer Motion 12 |
| 3D rendering | Three.js, React Three Fiber, Drei |
| Email | Brevo transactional API |
| Hosting | Vercel |

---

## Environment variables

| Variable | Required | Description |
|---|---|---|
| `BREVO_API_KEY` | Yes | Brevo transactional email API key |

---

**Organization:** GITAM Aerospace Rocketry Initiative  
**University:** GITAM University, Hyderabad, India  
**Website:** [gari.live](https://gari.live)  
**Contact:** [contact@gari.live](mailto:contact@gari.live)
