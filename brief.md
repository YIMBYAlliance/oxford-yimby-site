# Oxford YIMBY Website — Improvement Brief

**Date:** February 2026
**Status:** Ready to build

---

## 1. Project Overview

Oxford YIMBY is a campaign site for the Oxford chapter of the YIMBY Alliance, calling for more homes to be built in Oxford to tackle the city's housing crisis. The site already exists and is well-structured. This brief covers a focused round of improvements to make it feel more polished and more compelling — specifically targeting the Solution section and the signup CTA.

The primary goal is conversion: getting more people to sign up to the mailing list. The improvements should also make the site feel more credibly local, grounded in Oxford specifically rather than generic campaigning.

---

## 2. Goals & Success Metrics

- **More email signups** — the redesigned CTA section should increase Mailchimp signup rate
- **More credible first impression** — local Oxford photography makes the campaign feel real and rooted
- **No structural changes** — all improvements are on the existing single-page site

---

## 3. Out of Scope

- No new pages or multi-page navigation
- No blog, news feed, or content management system
- No changes to the hero, stats bar, or Problem/charts section (these are working well)
- No login, accounts, or backend infrastructure
- No major content rewrites — copy stays largely as-is

---

## 4. Target Users

| Audience | What they need from these improvements |
|---|---|
| Oxford residents | To feel the campaign is genuinely local, not generic |
| Potential supporters | To be moved to act — to sign up or share |
| Press & decision-makers | To see a credible, professionally-designed campaign |

All three audiences benefit from the same two improvements: authentic local imagery and a CTA that signals momentum.

---

## 5. Improvements

### Improvement 1: Solution Section — Local Oxford Photography

**Problem:** The Solution section's three principle cards feel generic. The icons are abstract, the descriptions are short, and nothing signals "this is Oxford" rather than any UK city.

**Fix:** Source high-quality Creative Commons photographs of Oxford terraces and residential streets — the kind of human-scale, attractive housing that YIMBY wants more of. Integrate these images into or around the principle cards.

**Why this works:** Showing beautiful existing Oxford terraces makes the argument visually. "We want more of this, and it fits right in" is more persuasive than "Build up & out" in the abstract.

**Image sourcing:**
- Source: Wikimedia Commons, Geograph.org.uk (reliably CC-BY-SA), Flickr (check per image)
- Target areas: Jericho, East Oxford terraces, Cowley Road area, Iffley Road
- Criteria: attractive terraced streets, human scale, clearly Oxford, not tower blocks or countryside
- Licence: CC-BY or CC-BY-SA only — credit must appear on the site
- Quantity: 2–3 strong images

**Integration options (pick one):**
- A) Replace card icons with cropped, rounded Oxford terrace photos
- B) Add a full-width image strip between the principle cards and the YIMBY Alliance callout
- C) Use a single large hero-style image as a background for the whole Solution section

Recommendation: Option B — an image strip. It adds visual interest without redesigning the card layout.

---

### Improvement 2: Signup / CTA Section — Bold Redesign

**Problem:** The current "Join the movement" section is clean but forgettable. A plain centred form on a light gradient background doesn't create a moment of action — it just sits there.

**Fix:** Redesign this section to feel like the emotional climax of the page. Dark background, big bold copy, social proof counter, and a subtle interactive element.

**Recommended direction:**

- **Background:** Full-width dark section (charcoal `#353741` or near-black) — contrasts with the light sections above and creates a visual stop
- **Headline:** Keep "Join the movement" or upgrade to something more urgent: *"Oxford needs you."*
- **Social proof counter:** *"Join [X] people demanding change"* — animated count-up when the section enters view. Hardcode a believable number initially (e.g. 340), update manually when the list grows.
- **Form:** Single email input + "Sign up" button. Large, centred, high-contrast (white input on dark bg).
- **Subtext:** "No spam. Unsubscribe anytime." — keep this, it reduces friction.
- **Animated background:** Subtle particle or gradient pulse effect — tasteful, not distracting. Should degrade gracefully on mobile (disable or reduce on small screens).
- **Secondary actions (optional):** Two small text links below the form: "Follow us on X →" and "Share this page →"

**Interactive elements to implement:**
1. Animated number counter that ticks up when section scrolls into view (extend the existing counter logic)
2. Subtle CSS or canvas-based background animation
3. Inline form success state — friendly confirmation message without page reload

---

## 6. Phase 1 (Do Now)

1. Find and verify 2–3 Creative Commons Oxford terrace images
2. Add image credits to the footer
3. Integrate images into the Solution section (image strip approach)
4. Redesign the CTA/Join section with dark background, counter, and animated elements

**Do not touch:** hero, stats bar, charts, footer structure, nav.

---

## 7. Phase 2+ (Future, Not Now)

Deliberately deferred:

- **Local stories / testimonials** — real quotes from Oxford residents; high impact but requires collecting content
- **Team / About section** — faces and names build trust, but needs photos and bios
- **Specific policy asks** — sharper demands ("rezone X", "support Y development") need political sign-off
- **Blog / news section** — good for SEO but requires ongoing content effort
- **Live Mailchimp subscriber count** — would require API integration; hardcoded number is fine for now

---

## 8. Risks & Open Questions

| Risk | Mitigation |
|---|---|
| Image licensing | Verify CC licence on every image before use. Geograph is reliably CC-BY-SA. Flickr requires checking per image. Keep a record of source URLs and licences. |
| Subscriber counter accuracy | Hardcode a number for now. Don't claim a higher number than the actual Mailchimp list. |
| Animations on mobile | All animation must degrade gracefully. Test on real devices. Parallax and canvas effects should be disabled or simplified below 768px. |
| Hero image | `img/radcliffe-1.jpg` is referenced in the HTML — confirm this file exists and loads correctly before deploying. |

---

## 9. Practical Notes

- **Stack:** Vanilla JS + Vite + Chart.js. Keep all improvements within this stack — no new frameworks.
- **Brand colours:** Teal `#73AB96`, Charcoal `#353741`, Rose `#BE93A3`. All new elements must use these.
- **Font:** Lato (already loaded) — no new fonts needed.
- **Image credits:** Add a small "Photo credits" line in the footer footer for CC images, with links to original sources as required by licence.
- **Deployment:** Static site on GitHub Pages. Push to `main` to deploy.
- **Maintenance:** No server or CMS. Content updates require editing HTML/CSS/JS directly. Image credits may need updating if images are changed.
