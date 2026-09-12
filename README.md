# Portfolio

Personal portfolio built with Next.js (App Router), TypeScript, Tailwind CSS,
and Framer Motion.

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Structure

```
src/
├── app/                  # routes (home, about, contact, projects, [slug])
├── components/
│   ├── layout/           # Navbar, Footer, PageTransition, SmoothScroll
│   ├── sections/         # Home page blocks (Hero, FeaturedProjects, etc.)
│   └── ui/                # Reusable animated primitives
├── lib/                  # project data, shared motion variants, cn()
└── hooks/                # useLenis (smooth scroll)
```