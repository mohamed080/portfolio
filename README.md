<div align="center">

# Mohamed Ayman — Portfolio

**Full Stack Engineer · Frontend Developer · Open Source Contributor**

[![Live Demo](https://img.shields.io/badge/🌐_Live_Demo-portfolio--ma--rouge.vercel.app-7c3aed?style=for-the-badge&labelColor=020817)](https://portfolio-ma-rouge.vercel.app)
[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![License](https://img.shields.io/badge/License-MIT-06b6d4?style=for-the-badge)](LICENSE)

A high-performance, bilingual (English/Arabic RTL) personal portfolio built with Next.js 15, TypeScript, and GSAP animations. Fully SEO-optimized with JSON-LD structured data, dynamic sitemap, and PWA support.

</div>

---

## ✨ Features

- 🌍 **Bilingual** — Full English & Arabic (RTL) support via `next-intl`
- 🎨 **Dark / Light Mode** — Seamless theme switching with `next-themes`
- 🚀 **GSAP Animations** — Scroll-triggered reveals, parallax, and typewriter effects
- 🔍 **SEO Optimized** — JSON-LD structured data, hreflang, sitemap, robots.txt
- 📱 **PWA Ready** — Installable with Web App Manifest
- ⚡ **Core Web Vitals** — AVIF/WebP images, Brotli compression, immutable asset caching
- ✉️ **Contact Form** — Working email delivery via Resend API

---

## 🖥️ Sections

| Section | Description |
|---|---|
| **Hero** | Animated intro with typewriter role effect |
| **About** | Bio, stats counter, and social links |
| **Projects** | 6 featured projects with live demo & GitHub links |
| **Skills** | Categorized skill bars with proficiency levels |
| **Experience** | Timeline of professional work history |
| **Contact** | Working contact form + contact info |

---

## 🛠️ Tech Stack

### Core
- **[Next.js 15](https://nextjs.org)** — App Router, SSR, Image Optimization
- **[TypeScript](https://www.typescriptlang.org)** — Full type safety
- **[React 19](https://react.dev)** — Latest concurrent features

### Styling & Animation
- **[Tailwind CSS v4](https://tailwindcss.com)** — Utility-first styling
- **[GSAP](https://greensock.com/gsap)** + **ScrollTrigger** — Premium animations
- **[Framer Motion](https://www.framer.com/motion)** — Card micro-interactions

### Internationalization & SEO
- **[next-intl](https://next-intl-docs.vercel.app)** — i18n routing & translations
- **JSON-LD** — Person, WebSite & BreadcrumbList schemas
- **Dynamic sitemap.xml** & **robots.txt** via Next.js route handlers

### Infrastructure
- **[Vercel](https://vercel.com)** — Deployment & Edge Network
- **[Resend](https://resend.com)** — Transactional email API

---

## 🚀 Getting Started

### Prerequisites

- Node.js **18+**
- npm / yarn / pnpm

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/mohamed080/portfolio.git
cd portfolio

# 2. Install dependencies
npm install

# 3. Create environment variables
cp .env.example .env.local
```

### Environment Variables

Create a `.env.local` file at the project root:

```env
RESEND_API_KEY=your_resend_api_key_here
```

> Get a free API key at [resend.com](https://resend.com) to enable the contact form.

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — the app auto-redirects to `/en`.

### Build & Preview

```bash
npm run build
npm run start
```

---

## 📁 Project Structure

```
src/
├── app/
│   ├── [locale]/          # Locale-scoped layout & page
│   │   ├── layout.tsx     # Root layout with metadata & fonts
│   │   └── page.tsx       # Home page (all sections)
│   ├── api/               # API routes (contact form)
│   ├── manifest.ts        # PWA manifest
│   ├── robots.ts          # robots.txt generator
│   └── sitemap.ts         # sitemap.xml generator
├── components/
│   ├── layout/            # Header, Footer, Cursor, PageLoader
│   ├── about/             # StatCard component
│   └── seo/               # JsonLd structured data
├── sections/              # Page sections (Hero, About, Projects…)
├── i18n/                  # Routing & request config
└── hooks/                 # Custom React hooks
messages/
├── en.json                # English translations
└── ar.json                # Arabic translations
public/
├── cv/                    # Downloadable resume PDF
└── images/                # Profile & project screenshots
```

---

## 🌐 Internationalization

The portfolio supports two locales:

| Locale | URL | Direction |
|---|---|---|
| English | `/en` | LTR |
| Arabic | `/ar` | RTL |

Translations live in [`messages/en.json`](messages/en.json) and [`messages/ar.json`](messages/ar.json). Switch languages via the navbar toggle.

---

## 🔍 SEO Implementation

| Feature | File |
|---|---|
| Metadata (title, description, OG, Twitter) | `src/app/[locale]/layout.tsx` |
| Hreflang alternates | `src/app/[locale]/layout.tsx` |
| JSON-LD (Person + WebSite + Breadcrumb) | `src/components/seo/JsonLd.tsx` |
| Dynamic Sitemap | `src/app/sitemap.ts` |
| Robots.txt | `src/app/robots.ts` |
| PWA Manifest | `src/app/manifest.ts` |
| Google Verification | `public/googled867061e4a7d905b.html` |

---

## 📬 Contact

**Mohamed Ayman**
- 🌐 Portfolio: [portfolio-ma-rouge.vercel.app](https://portfolio-ma-rouge.vercel.app)
- 💼 LinkedIn: [linkedin.com/in/mohamedayman13](https://www.linkedin.com/in/mohamedayman13/)
- 🐙 GitHub: [github.com/mohamed080](https://github.com/mohamed080)
- 📧 Email: mohayman080@gmail.com

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

<div align="center">
  <sub>Built with ❤️ using Next.js & TypeScript · Deployed on Vercel</sub>
</div>
