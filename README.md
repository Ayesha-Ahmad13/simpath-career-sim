# SimPath — AI-Powered Career Simulation Platform

> Don't just choose your career. Experience it first.

SimPath helps students make better career decisions by letting them *experience* careers
through interactive, AI-style simulations before committing to one — a flight simulator,
but for careers.

**Live site:** https://simpath-career-sim.lovable.app

## Features

- **Landing page** — animated hero of career paths converging, Discover → Experience → Decide flow, featured simulations, gamification (XP, levels, badges, streaks), Coming Soon labs.
- **Career Explorer** — 20 careers across Medicine, Technology, Business, Law and Creative, with live search and category filters.
- **Simulations** — playable scenario engine (Doctor, Software Engineer, AI Engineer, Lawyer, Entrepreneur) with mission briefs, context data, scored decisions, progress bar and decision history.
- **Results** — animated score ring, career fit, skill breakdown, strengths and areas to improve.
- **Assessment** — multi-question quiz returning top career matches with % compatibility.
- **Dashboard** — KPIs, skill radar chart, progress journey, badges, recommendations.
- **Compare** — side-by-side comparison of 2–3 careers.
- **AI Mentor** — chat interface with suggested question chips.
- **Light / dark theme**, responsive layout, 404 and error pages.

All data is currently mock data held in `src/data/`, structured so a real backend or AI API
can be connected later without changing the UI.

## Tech stack

- TanStack Start v1 (React 19, file-based routing, SSR)
- Vite 7
- TypeScript
- Tailwind CSS v4 (design tokens in `src/styles.css`)
- TanStack Query, Recharts, lucide-react

## Getting started

```sh
git clone <this-repository-url>
cd simpath
bun install     # or: npm install
bun run dev     # or: npm run dev
```

The dev server runs at http://localhost:8080.

```sh
bun run build   # production build
```

## Environment variables

SimPath needs no environment variables to run — it is fully front-end with mock data.
Copy `.env.example` to `.env` when you start connecting real services. Browser-visible
values must be prefixed with `VITE_`; everything else stays server-only and is read inside
server functions. `.env` is git-ignored and must never be committed.

## Project structure

```
src/
  routes/       file-based pages (index, explore, simulations, results, assessment,
                dashboard, compare, mentor) plus __root.tsx app shell
  components/   navbar, footer, cards, charts, hero animation
  data/         careers.ts, simulations.ts (mock content)
  lib/          theme, simulation run storage, utils
  styles.css    Tailwind v4 theme tokens (light + dark)
```

## Deployment

The app is deployed from Lovable to `https://simpath-career-sim.lovable.app`.
Because it is a TanStack Start SSR app, any host that supports Node/edge server
rendering (Lovable, Cloudflare Workers, Netlify, Vercel) will also work.

## License

All rights reserved © SimPath.
