# Jakka Uma Surya Teja — Portfolio.

A production-grade AI/ML engineer portfolio built with **Next.js 14 (App Router)**, **Tailwind CSS v3**, and **Framer Motion v11**.

## ✨ Features

- 🌌 Neural network canvas background with mouse parallax
- 🎭 Animated role cycling and gradient name reveal
- 📦 6-tab skills grid with Devicon icons and proficiency dots
- 🚀 5 fully detailed project cards (AI/ML + Data Engineering)
- 📅 Animated timeline experience section
- 🎓 4 certifications with shimmer hover effects
- 📬 Validated contact form with success toast
- 🔝 Back-to-top button + sticky frosted glass navbar
- ♿ Fully accessible: ARIA labels, keyboard nav, `prefers-reduced-motion`
- 📱 Responsive 320px–2560px
- 🔒 Vercel security headers (CSP, X-Frame-Options)

---

## 🛠 Tech Stack

| Layer | Tech |
|-------|------|
| Framework | Next.js 14 (App Router) |
| Styling | Tailwind CSS v3 |
| Animation | Framer Motion v11 |
| Icons | Lucide React + Devicons |
| Fonts | Inter + JetBrains Mono (next/font) |
| Language | TypeScript (strict mode) |
| Deployment | Vercel |

---

## 🚀 Setup & Development

### Prerequisites
- Node.js >= 18.17.0
- npm >= 9

### Install dependencies
```bash
npm install
```

### Run development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for production
```bash
npm run build
npm start
```

### Lint
```bash
npm run lint
```

---

## 📁 Project Structure

```
/
├── app/
│   ├── layout.tsx        # Root layout, fonts, SEO metadata
│   ├── page.tsx          # Main page (composes all sections)
│   └── globals.css       # Design tokens + global styles
├── components/
│   ├── NeuralBackground.tsx
│   ├── Navbar.tsx
│   ├── Hero.tsx
│   ├── About.tsx
│   ├── Skills.tsx
│   ├── Projects.tsx
│   ├── Experience.tsx
│   ├── Certifications.tsx
│   ├── Contact.tsx
│   ├── Footer.tsx
│   └── ui/
│       ├── Button.tsx
│       ├── Badge.tsx
│       ├── Card.tsx
│       ├── SectionHeader.tsx
│       └── TabSwitcher.tsx
├── public/
│   └── resume.pdf        # ← Replace with actual resume
├── tailwind.config.ts
├── next.config.js
├── vercel.json           # Security headers
└── .env.example
```

---

## 🚢 Deploy to Vercel

### Option 1: Vercel CLI
```bash
npm install -g vercel
vercel login
vercel --prod
```

### Option 2: GitHub Integration
1. Push this repo to GitHub
2. Import in [vercel.com/new](https://vercel.com/new)
3. Vercel auto-detects Next.js — click Deploy

---

## 🎨 Customization Guide

### Colors
Edit `tailwind.config.ts` → `theme.extend.colors` to change the design system tokens.

### Projects
Edit `components/Projects.tsx` → `AI_PROJECTS` and `DATA_PROJECTS` arrays.

### Skills
Edit `components/Skills.tsx` → `SKILL_TABS` array. Add/remove skills per tab.

### Resume
Replace `public/resume.pdf` with your actual PDF file.

### Contact form
To enable real email sending, integrate [Formspree](https://formspree.io) or [Resend](https://resend.com):
- Set `NEXT_PUBLIC_FORMSPREE_ENDPOINT` in `.env.local`
- Update `handleSubmit` in `Contact.tsx` to `fetch` the endpoint.

### OG Image
Replace `public/og-image.png` (1200×630px) for social media previews

---

## 📄 License

MIT — feel free to use and adapt.
