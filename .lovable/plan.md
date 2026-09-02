# WC-2A.3-iii — Heavy Pregnancy Week Image Re-encoding

Re-encode up to five heavy week assets to the approved premium tier (JPEG q84, 4:4:4, progressive, optimize, ICC preserved where present, same pixel dimensions, same filenames, same `.jpg` extension). No component, route, loading, or architecture changes.

## Confirmed pre-work state (measured now, read-only)

All five files carry a `.jpg` extension but are **PNG by bytes**, RGB, no alpha channel, no ICC profile:

| File | Real format | Dimensions | Mode | Alpha | ICC | Bytes |
| --- | --- | --- | --- | --- | --- | --- |
| week17-biology-detail.jpg | PNG | 896x1200 | RGB | none | none | 1,407,524 |
| week34-biology-detail.jpg | PNG | 1024x1024 | RGB | none | none | 1,622,653 |
| week34-fetus.jpg | PNG | 1024x1024 | RGB | none | none | 1,657,623 |
| week35-biology-detail.jpg | PNG | 1024x1024 | RGB | none | none | 1,573,772 |
| week35-fetus.jpg | PNG | 1024x1024 | RGB | none | none | 1,609,581 |

Exact five-file total: **7,871,153 bytes**.

Consumers confirmed by import trace:

- `src/pages/Week17Page.tsx` — `week17-biology-detail.jpg`
- `src/pages/Week34Page.tsx` — `week34-fetus.jpg`, `week34-biology-detail.jpg`
- `src/pages/Week35Page.tsx` — `week35-fetus.jpg`, `week35-biology-detail.jpg`

Week pages mount through the `/pregnancy/week/:week` resolver in `src/pages/PregnancyWeekRoute.tsx`, so the reachable routes are `/pregnancy/week/17`, `/pregnancy/week/34`, `/pregnancy/week/35`. Eager/lazy status, fetchPriority state, and initial-viewport request status for each of the five will be recorded from the actual page markup and a network trace before any overwrite.

## Steps

1. **Manifest**: complete the per-file record — path, detected format, dimensions, colour mode, alpha, ICC, EXIF/orientation, original bytes, consumer component and section, eager/lazy, fetchPriority, and whether requested in the initial viewport on its week route.
2. **Suitability judgement (per asset, decisive)**: inspect each image full-size and at 1:1 crops. Biology-detail assets are checked for transparency dependence, lossless diagram edges, embedded text, and flat graphic areas. Fetus assets are checked for flat illustration / diagram / lossless-artwork character. Any image unsuitable for lossy JPEG is excluded, original left untouched, and reported as an exception.
3. **Candidate encodes**: for suitable assets only, produce q84 / 4:4:4 / progressive / optimize candidates into a scratch directory. No production file touched yet.
4. **Quality gate**: compare each candidate against its original at desktop rendered size, high-DPI, mobile rendered size, and 1:1 crop. Inspect biological detail, gradients, shadows, organic tones, edge definition, texture, tonal transitions; check for blocking, ringing, banding, softness, colour shift, chroma bleed, texture loss, artificial edges. PSNR/SSIM reported as supporting evidence only. Material degradation means the original is retained.
5. **Replace passing candidates only**, same filenames and extension. No source or data file edits.
6. **Route verification**: `/pregnancy/week/17`, `/pregnancy/week/34`, `/pregnancy/week/35` at desktop 1280x1800 and mobile 390x844. For each changed image report above-fold status, eager/lazy request, and LCP vs supporting-image classification. Loading behaviour is not changed.
7. **Production-preview measurement**: `npm run build`, serve the production preview, fresh cache-disabled Playwright context per route/viewport. Report LCP element, LCP resource, total image bytes, bytes attributable to the affected assets, image request count, indicative LCP timing, content-type, decode result, 4xx/5xx, console/page errors.
8. **Separate reporting**: FIVE-FILE ASSET WEIGHT (exact bytes before → after, saved, percentage) reported distinctly from ROUTE IMPACT (per-week image payload before/after, which assets load initially, LCP effect, critical-path vs supporting-page-weight saving).
9. **Validation**: `npm test`, `npm run lint`, `npm run typecheck`, `npm run build`. Known `previewAuthStorage.ts` prefer-const error and react-refresh warnings left unchanged.
10. **Completion report**: all 34 requested items, including the CLOSE / DO-NOT-CLOSE verdict, the updated WC-2A overall performance summary, and a recommendation on whether WC-2B is still justified after remeasurement.

## Note on the format finding

Because all five are PNG-encoded despite the `.jpg` extension, this is a genuine format conversion, not a JPEG requality. That raises the suitability bar, so step 2 is a gate rather than a formality: any asset that reads as flat illustration, diagram, or lossless artwork stays as it is.

## Preservation checks (re-confirmed in the report)

- `src/assets/logo-dark.png` 400x267, 19,165 bytes; all WC-2A.1 fetchPriority additions intact.
- `src/assets/video/journal-hero.mp4` 5,981,381 bytes; ProductHero poster-first logic untouched.
- WC-2A.3-i 28-file batch remains 5,513,604 bytes.
- WC-2A.3-ii 12-file Journal batch remains 3,768,903 bytes.
- Grounding untouched: `AI_SOURCE_ROUTING_VERSION = 30B-source-routing-v1`, candidates 0, approvals 0, `listGroundingEligibleSlugs() = []`, Phase 30K parked at Stage 2.

## Out of scope

WC-2B, WC-3; any other week asset including `week12-biology-detail.jpg`, other `week*.jpg`, `myweek-baby-week-*.png`, botanical assets; resize, crop, srcset, sizes, picture, imagetools, WebP, AVIF; lazy/eager or fetchPriority changes; week-page components; asset deletion; new image generation; routes, SEO, sitemap, robots, companion, AI architecture, grounding.

## Carry-forward (recorded, not actioned)

Final-launch real-browser H.264 Journal hero playback check; dead components `TrimesterHeroImage`, `TrimesterAbout`, `PregnancyTimeline`; the WC-2A.3-ii historical per-file "Before" manifest discrepancy (batch totals matched at 22,923,753 bytes; the cause will be stated only if determinable from existing logs, with no files altered to reconcile it).
