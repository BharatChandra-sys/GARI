# GARI React App - Vercel Deployment Guide

## 🚀 Quick Deployment Steps

### Prerequisites
- Git installed on your system
- GitHub account
- Vercel account (free tier works perfectly)

---

## Method 1: Deploy via Vercel Dashboard (Recommended)

### Step 1: Push to GitHub

1. **Initialize Git repository** (if not already done):
```bash
cd GARI/gari-react
git init
```

2. **Add all files**:
```bash
git add .
```

3. **Commit changes**:
```bash
git commit -m "Initial commit - GARI Aerospace website"
```

4. **Create a new repository on GitHub**:
   - Go to https://github.com/new
   - Name it: `gari-aerospace` (or any name you prefer)
   - Don't initialize with README (we already have files)
   - Click "Create repository"

5. **Push to GitHub**:
```bash
git remote add origin https://github.com/YOUR_USERNAME/gari-aerospace.git
git branch -M main
git push -u origin main
```

### Step 2: Deploy on Vercel

1. **Go to Vercel**: https://vercel.com

2. **Sign in** with your GitHub account

3. **Import Project**:
   - Click "Add New..." → "Project"
   - Select your GitHub repository (`gari-aerospace`)
   - Click "Import"

4. **Configure Project**:
   - **Framework Preset**: Create React App (auto-detected)
   - **Root Directory**: `./` (leave as default)
   - **Build Command**: `npm run build` (auto-filled)
   - **Output Directory**: `build` (auto-filled)
   - **Install Command**: `npm install` (auto-filled)

5. **Deploy**:
   - Click "Deploy"
   - Wait 2-3 minutes for build to complete
   - Your site will be live at: `https://your-project-name.vercel.app`

---

## Method 2: Deploy via Vercel CLI

### Step 1: Install Vercel CLI
```bash
npm install -g vercel
```

### Step 2: Login to Vercel
```bash
vercel login
```

### Step 3: Deploy
```bash
cd GARI/gari-react
vercel
```

Follow the prompts:
- **Set up and deploy**: Yes
- **Which scope**: Select your account
- **Link to existing project**: No
- **Project name**: gari-aerospace (or your choice)
- **Directory**: `./` (press Enter)
- **Override settings**: No

### Step 4: Deploy to Production
```bash
vercel --prod
```

---

## 📋 Build Configuration (Auto-detected by Vercel)

Vercel automatically detects Create React App and uses these settings:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "build",
  "installCommand": "npm install",
  "framework": "create-react-app"
}
```

**No vercel.json needed!** Vercel handles everything automatically for Create React App.

---

## 🔧 Environment Variables (if needed in future)

If you need to add environment variables:

1. Go to your project on Vercel Dashboard
2. Click "Settings" → "Environment Variables"
3. Add variables like:
   - `REACT_APP_API_URL`
   - `REACT_APP_ANALYTICS_ID`

---

## 🌐 Custom Domain Setup

### Add Custom Domain:

1. Go to your project on Vercel
2. Click "Settings" → "Domains"
3. Add your domain (e.g., `gari.aerospace`)
4. Follow DNS configuration instructions
5. Vercel provides automatic HTTPS

---

## 🔄 Automatic Deployments

Once connected to GitHub:
- **Every push to `main`** → Automatic production deployment
- **Every pull request** → Preview deployment with unique URL
- **Instant rollbacks** available from dashboard

---

## ✅ Pre-Deployment Checklist

Before deploying, ensure:

- [x] All imports are correct (already fixed)
- [x] Build runs successfully locally: `npm run build`
- [x] No console errors in production build
- [x] All images and assets are in `/public` folder
- [x] Logo files are present: `gari-logo.png`, `favicon.png`
- [x] `.gitignore` includes `/build` and `.vercel`

---

## 🧪 Test Build Locally

Before deploying, test the production build:

```bash
# Build the app
npm run build

# Serve the build locally (install serve if needed)
npx serve -s build
```

Visit `http://localhost:3000` to test the production build.

---

## 📊 Vercel Features You Get

✅ **Automatic HTTPS** - Free SSL certificates
✅ **Global CDN** - Fast loading worldwide
✅ **Automatic Deployments** - Push to deploy
✅ **Preview Deployments** - Test before production
✅ **Analytics** - Built-in performance monitoring
✅ **Zero Configuration** - Works out of the box

---

## 🐛 Troubleshooting

### Build Fails on Vercel

1. **Check build logs** in Vercel dashboard
2. **Test locally**: `npm run build`
3. **Common issues**:
   - Missing dependencies: Run `npm install`
   - Import errors: Check file paths are correct
   - Environment variables: Add in Vercel settings

### 404 on Page Refresh

Create React App handles routing automatically. If you get 404s:
- Vercel auto-detects CRA and configures routing
- No additional configuration needed

### Slow Build Times

- Vercel caches `node_modules` automatically
- First build: ~2-3 minutes
- Subsequent builds: ~30-60 seconds

---

## 📞 Support

- **Vercel Docs**: https://vercel.com/docs
- **Vercel Support**: https://vercel.com/support
- **Community**: https://github.com/vercel/vercel/discussions

---

## 🎉 You're Done!

Your GARI Aerospace website will be live at:
- **Vercel URL**: `https://your-project-name.vercel.app`
- **Custom Domain**: Configure in Vercel settings

**Deployment time**: ~2-3 minutes
**Cost**: $0 (Free tier is perfect for this project)
