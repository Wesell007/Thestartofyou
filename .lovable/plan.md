# WC-2A.3-i — Critical Hero JPG Re-encoding (Implementation)

Approve this to switch me into build mode so I can run the batch.

## Scope

Exactly 28 files, no more:

- 3 Class A confirmed-LCP assets: `topic-body-hero.jpg`, `flagship-heartburn-hero.jpg`, `journal-writing.jpg`
- 25 Class B primary hero assets at 1264x848: 16 `article-hero-*`, 3 `flagship-heartburn-*` (call/pillows/anatomy), 3 `guidance-card-*` (body/comfort/quiet), 3 `trimester-*`

Excluded from this phase: the remaining 12 Journal photographs (WC-2A.3-ii), the 5 heavy week assets, the 315 already-light JPGs, PNG illustrations, botanical assets, myweek-baby assets.

## Encoding contract

JPEG, quality 84, 4:4:4 chroma, progressive, optimize, ICC preserved where present, identical pixel dimensions, identical filename and `.jpg` extension. No resize, crop, or composition change.

## Steps

1. Record an exact pre-overwrite manifest for all 28 files: filename, source format, dimensions, original bytes, q84 candidate bytes.
2. Encode candidates to a temp folder, then replace the 28 production files in place.
3. Visual verification (desktop and mobile) on `/pregnancy/body`, `/articles/heartburn-in-pregnancy`, `/pregnancy`, a trimester route, a representative ArticleHeroImage route, a representative FlagshipHero route, `/journal` — checking sharpness, skin tones, gradients, texture, colour, crop, layout, sizing. Any image that looks materially worse gets its original restored and reported individually.
4. Re-measure LCP element, LCP image bytes, total initial image bytes and indicative LCP timing before vs after, focusing on `/pregnancy/body`, `/articles/heartburn-in-pregnancy`, `/journal`.
5. Run `npm test`, `npm run lint`, `npm run typecheck`, `npm run build`, leaving the known pre-existing lint error and react-refresh warnings untouched.

## Preserved

- WC-2A.1: `src/assets/logo-dark.png` 400x267, 19,165 bytes; all `fetchPriority` changes intact.
- WC-2A.2: `src/assets/video/journal-hero.mp4` 5,981,381 bytes; ProductHero poster-first logic unchanged.
- No changes to srcset/sizes, vite-imagetools, WebP/AVIF infrastructure, routes, SEO, sitemap, robots.txt, companion, AI architecture or grounding.
- `AI_SOURCE_ROUTING_VERSION = 30B-source-routing-v1`, grounding candidates 0, approvals 0, `listGroundingEligibleSlugs() = []`, Phase 30K parked at Stage 2.

## Completion report

The 26-point report requested, ending with: WC-2A.3-ii remaining Journal batch = 12 files (`journal-writing.jpg` not to be reprocessed), and whether WC-2A.3-ii is safe to plan. WC-2A.3-ii, -iii, WC-2B and WC-3 are not started in this phase.
