# WC-2A.3-ii — Journal Product Photography Re-encoding

Re-encode exactly 12 Journal product photographs to the approved premium tier (JPEG q84, 4:4:4, progressive, ICC preserved, same pixel dimensions and filenames). No loading-architecture changes, no new formats, no other assets touched.

## Confirmed pre-work state (measured now, read-only)

All 12 are genuine JPEGs, RGB, ICC present, baseline (non-progressive):

| File | Dimensions | Bytes |
| --- | --- | --- |
| journal-baby-shower.jpg | 1920x1280 | 2,222,437 |
| journal-closeup.jpg | 1920x1280 | 1,415,161 |
| journal-couple.jpg | 1920x1280 | 2,051,723 |
| journal-couple-ultrasound.jpg | 1279x1920 | 2,264,696 |
| journal-cover-hand.jpg | 1920x1280 | 1,321,583 |
| journal-first-seasons.jpg | 1920x1280 | 1,920,318 |
| journal-firsts-page.jpg | 1920x1280 | 2,131,480 |
| journal-flatlay.jpg | 1920x1279 | 2,151,746 |
| journal-keepsakes.jpg | 1920x1280 | 1,529,876 |
| journal-names-planning.jpg | 1920x1280 | 1,966,171 |
| journal-nursery-planning.jpg | 1920x1279 | 2,185,724 |
| journal-ultrasound.jpg | 1920x1279 | 1,762,838 |

Measured batch total: **22,923,753 bytes**. `journal-writing.jpg` is excluded (already done in WC-2A.3-i).

Usage trace so far: `journal-cover-hand` (ProductHero poster, ProductWhatItIs), `journal-flatlay` (homepage JournalSection/JournalMoment, JournalPromotion, week pages, calculators, IVF timeline), `journal-firsts-page`, `journal-keepsakes`, `journal-baby-shower`, `journal-nursery-planning`, `journal-couple` (ProductGallery/ProductMoment/ProductInside), `journal-ultrasound` + `journal-couple-ultrasound` (flagship article image map). The full per-file consumer table will be completed and reported before any overwrite.

## Steps

1. **Manifest**: complete the per-file record (format, dimensions, ICC, original bytes, consumers, whether loaded in the initial /journal window, whether used on `/` or other routes).
2. **Candidate encodes**: produce q84 / 4:4:4 / progressive / optimize / ICC-preserved candidates into a scratch directory. No production file touched yet.
3. **Quality gate**: compare each candidate against its original — PSNR/SSIM plus visual inspection at rendered desktop size, high-DPI, mobile, and 1:1 crops. Focus on cover lettering, embossing, page edges, paper texture, ultrasound detail, skin tones, hands, fabric, gradients, dark areas. Any photograph materially damaged is excluded and the original restored, reported as an exception.
4. **Replace**: copy passing candidates over the production assets, same filenames, same extension.
5. **Critical asset check**: `journal-cover-hand.jpg` verified specifically — poster paints immediately, correct crop, no blank flash, no decode error, ProductHero gating and video deferral untouched, poster still the LCP resource where the browser selects it.
6. **Production verification**: `npm run build`, serve the production preview, fresh cache-disabled context per measurement, desktop 1280x1800 and mobile 390x844, on `/journal`, `/`, and any other route the usage trace shows loading one of the 12 in its critical window. Report LCP element/resource/bytes, total initial image bytes, request counts, indicative timings, content-type, decode result, and video bytes before activation.
7. **Full page verification**: scroll `/journal` completely at both viewports so every changed asset renders and decodes; check crop, aspect ratio, overflow, layout shift, colour, broken images.
8. **Validation**: `npm test`, `npm run lint`, `npm run typecheck`, `npm run build`. Known previewAuthStorage lint error and react-refresh warnings left as-is.
9. **Completion report**: all 33 requested items, including separate CRITICAL PATH (cover-hand bytes, /journal initial image bytes) and TOTAL ASSET WEIGHT figures — not conflated.

## Preservation checks (re-confirmed in the report)

- `src/assets/logo-dark.png` 400x267, 19,165 bytes; all WC-2A.1 fetchPriority additions intact.
- `src/assets/video/journal-hero.mp4` 5,981,381 bytes; ProductHero poster-first logic untouched.
- WC-2A.3-i 28-file batch remains 5,513,604 bytes, none re-encoded.
- Grounding untouched: `AI_SOURCE_ROUTING_VERSION = 30B-source-routing-v1`, candidates 0, approvals 0, `listGroundingEligibleSlugs() = []`, Phase 30K parked at Stage 2.

## Out of scope

WC-2A.3-iii, WC-2B, WC-3; srcset/sizes/picture, imagetools, WebP/AVIF; lazy/eager, IntersectionObserver, requestIdleCallback, preload, fetchPriority, gallery structure, DOM order; routes, SEO, sitemap, robots; PNG/botanical/week/myweek assets; any new photography. If `/journal` stays heavy because many gallery images load early, that is reported as evidence for a later defer slice, not solved here.

## Carry-forward (recorded, not actioned)

Real-browser H.264 Journal hero playback check before launch; dead components `TrimesterHeroImage`, `TrimesterAbout`, `PregnancyTimeline`.
