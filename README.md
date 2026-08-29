# liminal

a quiet daily companion for journaling, routines, tasks, and gentle self-reflection.

built with [astro](https://astro.build), [tailwind css v4](https://tailwindcss.com), [lucide icons](https://lucide.dev), and vanilla typescript.

## setup

```bash
npm install
npm run dev
```

the dev server starts at `http://localhost:4321`.

## build

```bash
npm run build
```

the static output is written to `dist/`.

## deploy to vercel

1. push this repo to github.
2. go to [vercel.com](https://vercel.com) → **new project** → import the repo.
3. vercel auto-detects astro. no configuration needed.
4. click **deploy**.

that's it — zero config, free tier compatible.

## features

- **journal** — write daily entries with up to 3 image attachments (compressed in-browser).
- **habits** — track daily habits, see 7-day completion dots and current streaks.
- **tasks** — day-scoped task lists with a 7-day date selector.
- **insights** — personal metrics: entry count, best streak, tasks completed, habits tracked.
- **dark / light theme** — toggle and persisted in localstorage.
- **responsive** — mobile-first with desktop adaptation.
- **offline-capable** — all data in localstorage, no server needed.

## tech

| layer | choice |
|-------|--------|
| framework | astro 5 (static output) |
| styling | tailwind css v4 + custom css |
| icons | @lucide/astro |
| data | localstorage |
| types | typescript |
| deploy | vercel (or any static host) |
