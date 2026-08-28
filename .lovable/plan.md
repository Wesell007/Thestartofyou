# WC-1A — Global Meta Description Deduplication (verification re-run)

The agreed code change is already in place in the working tree:

- `index.html` no longer ships a static `<meta name="description">` (line 7 is now an explanatory comment).
- `src/App.tsx` renders a single Helmet-managed `BRAND_FALLBACK_DESCRIPTION`, which route-level `SeoHead` overrides instead of duplicating.

Nothing further needs editing. Approving this plan lets me leave plan mode and run the verification you asked for.

## What I will do

1. Production build (`npm run build`) and serve the preview.
2. Playwright pass over `/`, `/pregnancy`, `/trying-to-conceive`, `/first-year`, `/first-year/0-3-months`, `/toddler`, `/toddler/2-years`, `/family`, `/journal`, `/about`, `/ask`, `/account-settings`, `/trying-to-conceive/legacy`, and a 404 URL, reporting per route: description count (expect exactly 1), description content, title, canonical, robots, console errors, horizontal overflow.
3. `npm test`, `npm run lint`, `npm run typecheck`, `npm run build`.
4. Confirm grounding invariants unchanged: `AI_SOURCE_ROUTING_VERSION = 30B-source-routing-v1`, candidates 0, approvals 0, `listGroundingEligibleSlugs() = []`, Phase 30K parked at Stage 2.
5. Return the full WC-1A completion report and stop. No WC-2 work.

## Boundaries

No route, sitemap, robots.txt, design, article/content, companion, AI architecture or grounding changes. Pre-existing `previewAuthStorage.ts` lint error and react-refresh warnings stay as-is.
