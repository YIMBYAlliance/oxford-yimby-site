# Oxford YIMBY Site

The campaign website for the Oxford chapter of the YIMBY Alliance. It makes the case that Oxford has a housing crisis and asks visitors to join a Mailchimp mailing list so the chapter can rally supporters when things matter (consultations, council decisions, press moments). It's a single-page site at **oxfordyimby.org** with a privacy page at `/privacy`.

**Live at:** https://oxfordyimby.org · **Repo:** https://github.com/YIMBYAlliance/oxford-yimby-site · **Stack (one line, jargon-light):** A static website (no backend) built with Vite, hosted on Vercel.

## What this project does

The site has one job: **convert Oxford residents into mailing-list subscribers** so the chapter has a base of supporters to mobilise. Everything on the page is in service of that — the case for the crisis (charts on rent and housebuilding), the principles (build up, build out, build well), and the signup form at the bottom.

Some vocabulary you'll hear:

- **YIMBY** — "Yes In My Back Yard". A pro-housebuilding movement, the opposite of NIMBY ("Not In My Back Yard"). Always spelled YIMBY, never YIMBI.
- **Mailchimp** — the email tool that runs the mailing list. The signup form on the site posts directly to Mailchimp.
- **Vite** — the build tool that turns the source files into the optimised website that ships to visitors. (`npm run dev` to preview locally, `npm run build` to produce a production version.)
- **Chart.js** — the library that draws the rent/affordability/housebuilding charts.
- **Tailwind** — the CSS toolkit used for styling. You'll mostly see it as classes like `text-lg` or `bg-teal` directly on HTML elements.

The page is a single `index.html` plus a `privacy.html` policy page. Source JavaScript and CSS live in `src/`. Images live in `img/` and `public/`. Chart data (rent over time, city comparisons, homes built) is **hardcoded inline** in `src/main.js` — there's no database or live data feed.

## How to make changes

You'll mostly do this by asking Claude Code in this folder. A typical flow:

1. Open the `oxford-yimby-site` folder in Claude Code
2. Describe the change in plain English ("update the rent chart with 2026 data", "swap the hero photo for this new image", "fix the typo in the second principle card")
3. Claude reads `CLAUDE.md` and follows the conventions there
4. Review the diff Claude shows you
5. Ask Claude to commit and push — Vercel auto-deploys within ~1–2 minutes of the push reaching `main`

### Good things to ask Claude

- "Show me where the rent chart's numbers come from and update 2026 to £1,950"
- "Add a new section under the principles called 'What we're calling for'"
- "The signup form isn't working — investigate"
- "Run the site locally so I can see my changes before we push"
- "Update the city comparison chart with new affordability ratios from this list"

### Things to be careful about

- **Don't change the Mailchimp form URL** (the long `oxfordyimby.us2.list-manage.com/subscribe/post?u=…&id=…` in `index.html`). Editing or breaking that string sends signups into the void. If you ever need a new list, replace the URL in *one* place and test that an email arrives in Mailchimp before pushing.
- **Push access to `main` goes through a YIMBY Alliance central admin.** The Oxford chapter doesn't merge directly — open a PR and ping the YA admin to review and merge. Vercel does the rest.
- **Chart numbers are stored as plain arrays inside `src/main.js`.** Updating them requires editing JavaScript by hand (Claude can do this). There's no spreadsheet or pipeline behind them.
- **The `brief.md` file in the root is paused.** It describes a Phase 1 redesign (Oxford photography + bolder CTA section) that was scoped but not shipped. Don't treat it as a live spec — if someone asks you to revive that work, re-read the brief, but don't assume it's still authoritative.

## Running it locally

You need [Node.js](https://nodejs.org) installed (version 20 or newer is fine).

From this folder:

```
npm install      # one-off, downloads dependencies
npm run dev      # starts a local preview at http://localhost:5173
```

Open the URL it prints in your browser. Edits to files in `src/` or `index.html` reload automatically.

To produce the production version (rarely needed — Vercel does this on every push):

```
npm run build    # writes optimised output to dist/
npm run preview  # serves dist/ locally so you can sanity-check
```

No environment variables or API keys are needed for local development.

## Deployment

When a change lands on `main` on GitHub, **Vercel automatically rebuilds and deploys within 1–2 minutes**. There's no manual deploy step.

- **Where to see deploy status:** Vercel dashboard (ask the YA central admin for access if you don't have it). Each push gets a preview URL.
- **How to roll back:** In the Vercel dashboard, find a previous successful deploy and click "Promote to Production". This is the safest fix for a broken deploy — don't try to revert by force-pushing.
- **Preview deploys:** Every PR opened against `main` gets its own preview URL automatically. Use those to review visual changes before merge.

## Keys, secrets & accounts

| Service | What it's for | Account owner | Key location | Notes |
|---|---|---|---|---|
| **Vercel** | Hosting and auto-deploy | YIMBY Alliance central account | n/a (no env vars in this repo) | Ask YA central admin for access |
| **GitHub** (`YIMBYAlliance/oxford-yimby-site`) | Source repo | YIMBY Alliance org | n/a | Merging to `main` goes through a YA central admin |
| **Mailchimp** (`oxfordyimby.us2`) | Mailing list and signup form | Oxford YIMBY chapter Mailchimp account | URL hardcoded in `index.html` | Multiple chapter admins should have access — verify before the current owner leaves |
| **Domain** `oxfordyimby.org` | The public URL | YIMBY Alliance central registrar | DNS managed by YA central | Points at Vercel |

There are no `.env` files or secrets in the repo. Everything the site needs at runtime is either bundled at build time or hardcoded in HTML.

**When the current owner leaves:**

1. **Vercel:** confirm at least two YA central admins are listed as project members for `oxford-yimby-site`.
2. **GitHub:** confirm the Oxford chapter still has at least one person with write access on the repo, or a clear point of contact at YA central.
3. **Mailchimp:** add a second chapter admin to the Oxford YIMBY Mailchimp account if there isn't one already. The list URL in `index.html` does not need to change.
4. **Domain:** no action needed — sits on the YA central registrar.

## When something breaks

- **Signups silently failing:** open `index.html`, find the `<form action="…list-manage.com…">` line, and check the URL hasn't been edited. Then submit the form on the live site with a test email and check whether it appears in Mailchimp. The signup uses a JSONP call (`src/signup.js`) which can fail silently if the URL is wrong.
- **Site is down or showing an old version:** check the Vercel dashboard for the latest deploy status. If a deploy failed, the previous version stays live — promote a known-good deploy if needed.
- **A chart isn't rendering:** look at the browser's developer console for errors. The chart code is in `src/main.js`. Charts are drawn with Chart.js and use IntersectionObserver to lazy-load on scroll, so they won't appear until you scroll near them.
- **Mobile menu won't open:** the toggle wires up in `src/main.js` (search for `nav-toggle`). The HTML must include the `#nav-toggle` and `#mobile-menu` elements for it to work.

If you're stuck, ask Claude Code: "investigate why X isn't working in this project". Paste any console errors verbatim.

## Open questions / known issues

- **`brief.md` Phase 1 is deferred.** Oxford photography integration and the redesigned CTA section described in that file were scoped but not shipped. Decide whether to revive or delete the brief.
- **Chart data is manual.** Rent figures, city comparisons, and housebuilding numbers all need updating by hand each year. There's no upstream pipeline.
- **No analytics.** The site doesn't track visitors. If signup-rate measurement matters, that needs adding.
- **No automated tests.** Every change is reviewed by eye.
