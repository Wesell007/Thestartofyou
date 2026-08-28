# WC-1A — Global Meta Description Deduplication

## Root cause (confirmed by inspection)

- `index.html` line 7 ships a static generic `<meta name="description">`.
- `SeoHead` (react-helmet-async) renders its own `<meta name="description">` per route.
- Helmet only dedupes tags it manages; it cannot replace a hand-written static tag in `index.html`, so every route ends up with two description elements.
- There is a single dynamic caller (`SeoHead`), used by ~96 pages/templates. So the duplicate is genuinely static shell + Helmet, not two dynamic callers.

## The fix (smallest safe change)

1. Remove the static `<meta name="description">` from `index.html` (line 7 only).
2. Add one app-level Helmet default in `src/App.tsx` that renders the same brand description. Because it is Helmet-managed, any route-level `SeoHead` description overrides it instead of duplicating it.

Result: exactly one `meta[name="description"]` per route after render — route-specific where `SeoHead` provides one, brand fallback on the handful of routes that don't.

Nothing else changes: titles, canonicals, robots, `og:*` (including the static `og:description`, which keeps social previews intact for non-JS crawlers), JSON-LD, routes, sitemap, robots.txt all untouched.

## SPA consequence (documented, not changed)

Before hydration the shell will have no `meta name="description"`. Non-JS social crawlers still read the static `og:description`/`og:title` in `index.html`; JS-executing crawlers (Googlebot) see the correct route description after render. No SSR or prerendering is introduced here — that stays separate architecture work.

## Verification

Playwright pass over `/`, `/pregnancy`, `/trying-to-conceive`, `/first-year`, `/first-year/0-3-months`, `/toddler`, `/toddler/2-years`, `/family`, `/journal`, `/about`, `/ask`, `/account-settings`, `/trying-to-conceive/legacy`, and a 404 URL against the production build, reporting per route: description count (expect 1), description content, title, canonical, robots, console errors, horizontal overflow.

Then `npm test`, `npm run lint`, `npm run typecheck`, `npm run build` (pre-existing `previewAuthStorage.ts` lint error and react-refresh warnings left as-is).

## Carried forward, not actioned

- Unknown SPA URLs still return HTTP 200 (soft-404) — infrastructure item for final deployment verification.
- Grounding untouched: `AI_SOURCE_ROUTING_VERSION = 30B-source-routing-v1`, candidates 0, approvals 0, `listGroundingEligibleSlugs() = []`, Phase 30K parked at Stage 2.
- WC-2 not started.
