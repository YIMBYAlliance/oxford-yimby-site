# Oxford YIMBY Site — Agent Instructions

## What this is

Single-page static campaign site for the Oxford chapter of the YIMBY Alliance. Vite + vanilla JS + Tailwind v4 + Chart.js. Hosted on Vercel, deploys on push to `main`. Domain: `oxfordyimby.org`. Repo: `YIMBYAlliance/oxford-yimby-site`. Primary purpose: convert visitors to Mailchimp mailing-list subscribers.

## Architecture

- **Entry points:** `index.html` (main page) and `privacy.html` (privacy policy). Both are listed as Rollup inputs in `vite.config.js`. Adding a new HTML page requires registering it there.
- **JS:** all client logic in `src/main.js`, loaded as a module from `index.html`. Wraps everything in an IIFE. Uses vanilla DOM APIs — no framework.
- **Styles:** `src/style.css` plus Tailwind v4 (via `@tailwindcss/vite`). Brand palette: teal `#73AB96`, charcoal `#353741`, rose `#BE93A3`, light grey `#e4e9e7`.
- **Charts:** Chart.js drawn into three `<canvas>` elements (`#chart-rent`, `#chart-cities`, `#chart-supply`). Data is **hardcoded as inline arrays** in `src/main.js` (see `createRentChart`, `createCitiesChart`, `createSupplyChart`). Charts are lazy-loaded via `IntersectionObserver` when scrolled into view (see `chartObserver`).
- **Signup form:** `<form id="mc-embedded-subscribe-form">` posts to Mailchimp's `list-manage.com` endpoint. JS in `src/signup.js` intercepts submit, switches to the JSONP endpoint (`/subscribe/post-json`), and shows an inline success/error message in `#signup-message`. Without JS, the form falls back to opening Mailchimp in a new tab via `target="_blank"`.
- **Fonts:** Lato self-hosted via `@fontsource/lato` (weights 300/400/700/900) — bundled by Vite, not loaded from a CDN.
- **City builder widget:** drag-and-drop placement grid in the Solution section (`#placement-grid`). Implemented with native HTML5 drag events in `src/main.js` (~line 408 onwards).
- **Animations:** fade-in on scroll via `[data-animate]` attributes + `IntersectionObserver`. Number counters via `[data-count]`. Mouse-proximity glow on the signup form (`.form-row`).

## Conventions

- Vanilla JS, no frameworks. Don't introduce React/Vue/etc.
- IIFE wrapper at the top of `src/main.js` (`(function () { 'use strict'; … })()`). Keep new code inside it.
- `var`, `function` declarations, ES5-ish style throughout `src/main.js`. Don't reach for `const`/`let`/arrow functions just to "modernise" — match the existing style. (Newer files like `src/signup.js` do use modern JS, that's fine for new modules.)
- Brand colours referenced by hex constants at the top of each chart-creation function. Reuse them, don't introduce new colours without a reason.
- Tailwind utility classes directly on HTML for layout/typography. Custom CSS in `src/style.css` for things Tailwind can't express cleanly.
- Inline SVG for icons rather than icon-font libraries.
- File naming: lowercase, hyphenated (`signup.js`, `nav.js`).

## Non-obvious gotchas

- **Mailchimp form `action` is load-bearing.** The URL `https://oxfordyimby.us2.list-manage.com/subscribe/post?u=ed3bef3a68d92194b717fecc5&id=6c385188a0` in `index.html` is the live mailing-list endpoint. Don't edit, prettify, or refactor it. `src/signup.js` derives the JSONP URL from it via `.replace('/post?', '/post-json?')` — both forms must remain valid.
- **`vite.config.js` declares two HTML entries.** Removing `privacy.html` from the inputs (or the file from disk) breaks the build silently — you'll just get no privacy page in `dist/`.
- **Charts are lazy-loaded.** They won't render in a smoke test that doesn't scroll. If you're checking visually, scroll all the way down.
- **Chart data is duplicated between content and code.** Numbers shown in body copy near the charts must be kept in sync with the arrays in `src/main.js` by hand.
- **Mobile menu toggles `body.style.overflow`.** Setting it elsewhere can leave the page un-scrollable.
- **No router.** Navigation is anchor links (`#problem`, `#solution`, etc.) with smooth-scroll JS that offsets by `nav.offsetHeight`. Adding a section means adding the anchor and updating nav links in both desktop and mobile menus.
- **`brief.md` is a paused spec, not active work.** Don't auto-implement from it. If a task references it, confirm with the user that the brief is being revived.
- **`affordabilityratios.xlsx` and `rentsovertime.csv` in the repo root are source data the user pulled chart numbers from.** They're not loaded at runtime. Treat them as reference material.
- **Chart 3 (`createSupplyChart`) renders housebuilding by year and assumes "1300 homes needed per year" as a flat target.** That's a deliberate editorial choice from the author; check before changing.

## Deployment

- Vercel project, auto-deploys on push to `main`. Build command: default Vite (`npm run build`). Output: `dist/`.
- Every PR gets a preview deploy URL.
- **Verifying a deploy:** check the Vercel dashboard for the latest production deploy timestamp; load `https://oxfordyimby.org` and submit a test signup if the form was touched.
- **Rolling back:** promote a previous deploy in the Vercel dashboard. Don't force-push to `main`.
- **No GitHub Actions workflow** is configured in this repo — Vercel handles everything.

## Environment variables

None. The site has no runtime config — all "config" (Mailchimp URL, social links, chart data) is hardcoded in source.

## Common tasks

### Update chart data (annual refresh)

1. Open `src/main.js`.
2. Find the relevant `createXChart` function (`createRentChart`, `createCitiesChart`, `createSupplyChart`).
3. Update the `labels` array (years/categories) and the data arrays (`rentData`, `ratios`, `needed`, `built`).
4. Update any matching figures in body copy in `index.html` (e.g. "Rents have risen X% since…").
5. `npm run dev` and visually confirm the charts render and tooltips show correct numbers.

### Update copy

- Body copy lives in `index.html`. Search for the visible text and edit in place. No CMS, no translation files.

### Update the hero or other images

- Files live in `img/` (large content imagery) and `public/` (favicon, OG image). `public/` is copied to the site root at build time. `img/` is processed by Vite — references must use a path Vite can resolve (`/img/foo.jpg` from HTML, or `import` from JS).

### Replace the Mailchimp list

1. Update the `action` attribute on `<form id="mc-embedded-subscribe-form">` in `index.html` to the new list's `/subscribe/post?…` URL.
2. Test signup on a Vercel preview deploy before merging — submit a real email and verify it lands in the new list.
3. Update `og:url`, `twitter:site`, social links if the chapter identity is also changing (it usually isn't).

### Add a new section to the page

1. Add the markup to `index.html`, with an `id` for anchor linking and `data-animate` attributes for fade-in.
2. Add nav links in both the desktop nav and `#mobile-menu`.
3. If it has interactive logic, add it inside the IIFE in `src/main.js`.
4. Test on mobile (the design must work below 768px).

## Working in this repo — instructions for the agent

The Oxford chapter team using this repo is non-technical. They will mostly direct you in plain English. When you work here:

1. **Ask before making non-trivial decisions.** Copy changes, visual changes, new sections, anything affecting the signup flow — confirm with the user. Use `AskUserQuestion` with concrete options. Better one extra question than the wrong change shipped.

2. **Keep this `CLAUDE.md` and the `README.md` current as you work.** Treat docs as part of every change:
   - New feature, env var, external service, or convention → update `CLAUDE.md`
   - Human-facing change (new section, changed behaviour, new image source) → update `README.md`
   - Discover a gotcha while debugging → add it to "Non-obvious gotchas"
   - Find something in the docs that's now wrong → fix it
   Do this in the same change as the code, not as a follow-up.

3. **Test in a browser before declaring done.** Run `npm run dev` and look at the change. Charts only render after scrolling. Test mobile viewport (Chrome DevTools device toolbar). Type-checks won't catch visual or behavioural regressions because there are no type-checks.

4. **Match the existing conventions.** `src/main.js` is intentionally written in older-school vanilla JS — don't refactor to ES modules / classes / frameworks unless asked. New files (e.g. `src/signup.js`) can use modern JS.

5. **Don't add scope.** Fix what was asked. No drive-by refactors, no new dependencies, no "while I'm here" cleanups unless the user asked. Especially: do not pull from `brief.md` unless the user explicitly asks for it.

6. **Be careful with deployment, secrets, and shared state.**
   - Do not edit the Mailchimp `action` URL without explicit user confirmation and a plan to test.
   - Do not push to `main` directly — open a PR. Merging is done by a YIMBY Alliance central admin.
   - Do not commit anything that looks like a secret (Mailchimp API keys, Vercel tokens). The repo has no `.env` and should stay that way.
