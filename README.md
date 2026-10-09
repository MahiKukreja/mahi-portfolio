# Mahi Kukreja · Growth Generalist

Single-page bento portfolio. React + Vite + TypeScript, Tailwind CSS v4, Motion (Framer Motion), self-hosted Sora + Inter.

## Run locally

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # type-check + production build into dist/
npm run preview    # serve dist/ at http://localhost:4173
```

## Edit the copy

All text and links live in `src/data/` — components only render what's there.

| File | What it holds |
|---|---|
| `links.ts` | Resume, LinkedIn, Pikeazy deck, both case-study PDFs, email, phone |
| `profile.ts` | Nav name, status pill, hero name/title/about, chips, quote |
| `experience.ts` | Pikeazy + LoopLabs: row subtext, hover-preview line, modal title, chips, bullets |
| `activities.ts` | Leadership, competition wins, events, highlights |
| `caseStudies.ts` | Case-study names, one-line takeaways, thumbnails; Pikeazy deck card |
| `headed.ts` | "Where I'm headed" modal |
| `viralContent.ts` | The Viral Content row (PDF link + hover preview) |

## Swap images

- **Portrait:** replace `public/portrait.webp` (≈900px wide; the face sits around 30% from the top).
- **Deck / case-study thumbnails:** replace `public/thumbs/pikeazy-deck.webp`, `case-study-1.webp`, `case-study-2.webp` (16:9, ≈900px wide — page 1 of each PDF).
- **Viral Content:** replace `public/viral-content.pdf` (opened on click) and `public/thumbs/viral-content.webp` (hover preview, portrait ≈640×800).
- **Share image:** `public/og-image.png` (1200×630).

## Entrance animation

`src/components/EntranceChoreographer.tsx` holds the whole timeline (Web Animations API). Timings are the constants at the top of the file. It plays once per page load, is skipped by any click/key/scroll, becomes a simple fade-up below 1100px, and a single fade under `prefers-reduced-motion`.

## Deploy to Vercel

The repo includes `vercel.json` (SPA rewrite). Either:

- **Git:** push this folder to GitHub, then on vercel.com → *Add New Project* → import the repo. Vercel detects Vite automatically (build `npm run build`, output `dist`).
- **CLI:** `npx vercel` (first run links the project), then `npx vercel --prod`.

To replace the current site, deploy into the existing **mahi-kukreja** Vercel project so the `mahi-kukreja.vercel.app` URL is kept.
