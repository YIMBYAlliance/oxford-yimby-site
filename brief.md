# Oxford YIMBY Website — Project Brief

## Project Overview

A complete rebuild of the Oxford YIMBY website (oxfordyimby.org) — replacing the current bare-bones WordPress site with a modern, bold, single-page static site that makes a compelling data-driven case for building more homes in Oxford and converts visitors into mailing list subscribers.

The current site has broken pages, no navigation, a generic WordPress theme, and almost no content. The new site will be a sharp, professional campaign page with interactive data visualisations that tell the story of Oxford's housing crisis.

## Goals & Success Metrics

- **Primary goal:** Grow the mailing list. Every section of the page should ultimately drive toward the email signup.
- **Secondary goal:** Educate visitors on why Oxford needs more housing, using data — not just rhetoric.
- **Success looks like:**
  - Significant increase in mailing list signups (track via Mailchimp)
  - Visitors spending more time on the page (engaged with data viz)
  - A site that looks credible enough to share with councillors, journalists, and potential allies

## Out of Scope

- Blog or news section (not needed for a rarely-updated campaign site)
- The three outdated campaign projects (North Oxford Golf Club, Bayswater Brook, Oxford Science Park) — remove these
- Donation functionality
- User accounts or login
- CMS or admin panel — content is updated by editing HTML/code directly
- Party-political affiliations (mention YIMBY Alliance only, not Labour Club)

## Target Users

1. **Oxford residents frustrated by housing costs** — renters and would-be buyers priced out of the city. They feel the pain but may not understand why it's happening. The site needs to give them the "aha" moment: we don't build enough homes.

2. **Potential supporters & volunteers** — people sympathetic to the cause who might sign up, share on social media, or attend events. They need to feel like Oxford YIMBY is credible and effective.

3. **Decision-makers who get sent the link** — councillors, journalists, planners. The site needs to look professional enough that sharing it strengthens rather than undermines the argument.

## Key User Flow

There is one flow, and it's simple:

1. Visitor lands on the page (from social media, a link in an email, or search)
2. Hero section immediately communicates what Oxford YIMBY is and hooks them emotionally
3. They scroll through data visualisations that tell the story of Oxford's housing crisis
4. They reach a clear call-to-action: join the mailing list
5. They sign up via an embedded Mailchimp form
6. They optionally follow Oxford YIMBY on social media via links

## Screens / Pages

**Single scrollable page with these sections (top to bottom):**

### 1. Hero Section
- Bold headline (e.g., "Oxford has a housing crisis. We're here to fix it.")
- One-sentence subheading explaining what Oxford YIMBY is
- Prominent "Join us" button that scrolls to the signup form
- Clean, impactful — no clutter

### 2. The Problem — Data Visualisation Section
Three interactive/animated data visualisations that build the case:

**Viz 1: Rent & House Price Trends**
- Show how Oxford rents and house prices have risen over the last 10-20 years
- Animated line chart that draws on scroll or on load
- Key stat callout (e.g., "Rent has risen 50% in 10 years")

**Viz 2: Oxford vs Other Cities**
- Compare Oxford's affordability against comparable UK cities
- Bar chart or dot plot showing price-to-income ratios
- Makes the point: Oxford is an outlier, and it doesn't have to be

**Viz 3: The Housing Supply Gap**
- Show the gap between homes needed and homes actually built each year
- Area chart or stacked bar showing the cumulative deficit growing
- The emotional hook: "Every year we fall further behind"

Each viz should have a short, punchy heading and 1-2 sentences of context. The data tells the story — the text just frames it.

### 3. The Solution — What Is YIMBY?
- Brief, plain-language explanation: we support building more homes
- 2-3 key principles (e.g., "Build up and out", "Homes for everyone", "Beautiful density is possible")
- Mention affiliation with YIMBY Alliance as a national movement
- Keep it short — this isn't a manifesto, it's a pitch

### 4. Call to Action — Join Us
- Embedded Mailchimp signup form (name + email, nothing more)
- Compelling copy: why joining matters, what they'll get (campaign updates, ways to help)
- This should feel like the natural conclusion of the page

### 5. Footer
- Social media links (X/Twitter, others as applicable)
- Link to YIMBY Alliance
- Privacy policy link
- Simple, clean — no bloat

## Information Architecture

This is a simple site — no complex data model. The "things" in the system are:

- **The page itself** — static HTML, updated by editing code
- **Data for visualisations** — likely JSON or CSV files stored alongside the code, sourced from ONS, Land Registry, or similar public datasets
- **Mailing list** — managed entirely by Mailchimp, not on the site itself

## Integrations

- **Mailchimp** — embedded signup form using their existing account (list ID: `6c385188a0`, user ID: `ed3bef3a68d92194b717fecc5`)
- **GitHub Pages** — hosting and deployment (push to `main` branch to deploy)
- **Social media** — outbound links to X/Twitter (@OxfordYIMBY) and any other active profiles

## Design Direction

**Bold + clean, but not corporate.**

- **Typography:** One strong sans-serif font. Big, confident headings. Think campaign poster meets data journalism.
- **Colors:** A striking primary color (suggest a deep teal, bold blue, or warm orange — something that pops against white but feels trustworthy, not garish). High contrast. Dark text on light backgrounds for readability.
- **Layout:** Generous whitespace. Full-width sections with alternating backgrounds. Data visualisations should breathe — don't crowd them.
- **Data viz style:** Clean, modern charts. No 3D effects, no chart junk. Think Financial Times data journalism — minimal, precise, impactful. Subtle animations on scroll.
- **Imagery:** Minimal. Let the data and typography do the work. If photos are used, they should be real photos of Oxford — not stock photography.
- **Mobile:** Must work beautifully on phones. Data visualisations should be responsive and still readable on small screens.
- **Overall feel:** "A serious campaign backed by evidence" — not "a student project" and not "a corporate rebrand."

**Reference sites for inspiration:**
- Shelter (shelter.org.uk) — bold activist energy
- Our World in Data — clean data presentation
- Generation Rent — campaign clarity

## Phase 1 (MVP) — What We're Building

Everything described above is Phase 1. It's intentionally small:

- Single static HTML page with CSS and vanilla JavaScript
- 3 data visualisations using a lightweight charting library (recommend Chart.js or D3.js — Chart.js is simpler and sufficient for these chart types)
- Embedded Mailchimp form
- Social media links
- Hosted on GitHub Pages
- Fully responsive (mobile-first)
- New visual identity (logo, colors, typography)

**This is the whole site.** No blog, no CMS, no backend. Keep it lean.

## Phase 2+ (Future)

Features deliberately deferred — revisit only when there's a clear need:

1. **Campaign-specific pages** — when Oxford YIMBY takes on specific projects again, add dedicated subpages
2. **Blog / news section** — if regular content publishing becomes a priority, consider a static site generator (11ty, Hugo) to add markdown-based posts
3. **Event listings** — if in-person events become regular
4. **"Write to your councillor" tool** — high impact but significant build effort
5. **Interactive map** — showing proposed development sites or housing density across Oxford
6. **Donation integration** — if fundraising becomes a priority

## Risks & Open Questions

1. **Data sourcing** — Where exactly will the data for the visualisations come from? Need to identify specific datasets (ONS, Land Registry, Oxford City Council) and confirm they're publicly available and up to date. **This is the biggest blocker — resolve before building.**

2. **Data accuracy** — The current site claims "rent has risen 50% in 10 years." Need to verify this and all stats used. Getting data wrong would undermine credibility.

3. **Logo & brand design** — Starting fresh means someone needs to design a new logo. Options:
   - Commission a designer (cost: probably a few hundred pounds)
   - Use a strong typographic logo (just the name in a distinctive font — free and often more effective)
   - **I'd recommend the typographic approach for Phase 1** — fast, cheap, and avoids the risk of a bad logo

4. **Mailchimp form styling** — Mailchimp's default embedded forms look ugly. Will need custom CSS to match the site's design.

5. **Chart library choice** — Chart.js is simpler but less flexible. D3.js is more powerful but harder to maintain for non-developers. **Recommend Chart.js** unless you need highly custom visualisations.

6. **Domain & DNS** — oxfordyimby.org needs to point to GitHub Pages instead of the current WordPress host. This is straightforward but needs to be coordinated so there's no downtime.

## Practical Notes

- **Budget:** Near zero. Static hosting on GitHub Pages is free. The only potential costs are a domain name (already owned) and optionally a logo designer.
- **Team:** Assuming one developer (you) building and maintaining the site.
- **Maintenance:** Minimal. Data visualisations may need updating annually with new figures. Mailchimp form is self-maintaining. No server, no database, no CMS to patch.
- **Timeline:** This is a small site. The main time investment is sourcing and cleaning the data for visualisations, and designing the visual identity.
- **Deployment:** Push to `main` branch on GitHub, GitHub Pages auto-deploys. Anyone with repo access can update the site.
