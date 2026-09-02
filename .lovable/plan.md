# WC-2A.1 — Logo Weight + Hero Priority

The editor is locked in plan mode, so every attempt to write `src/assets/logo-dark.png` has been blocked and no project file has changed. Press Approve on this card (or switch the composer to build mode) and I will run the whole slice in one pass. Two corrections are carried in: the React prop is spelled `fetchPriority="high"`, and the invariant is 0 or 1 high-priority image per route (never more than 1), with routes that justify none reported as NO HIGH-PRIORITY IMAGE — INTENTIONAL.

## 1. Logo optimisation (measured, not estimated)

Current: `src/assets/logo-dark.png` — 2,113,471 bytes, 1536x1024 RGBA, referenced by Navbar, Footer, MyWeekHeader, TTCJourneyHeader, PrototypeChrome. Largest rendered width in the codebase is 190 px (Footer `md:w-[190px]`); Navbar 170 px, MyWeekHeader 140 px, TTC header 120 px.

Alpha inspection: the alpha bounding box is (12, 1, 1512, 1023) — effectively the whole canvas, because the wide margin carries faint non-zero alpha rather than clean transparency. **The canvas will therefore not be cropped**: the surrounding space is part of the rendered box every component sizes against, so trimming it would visually enlarge the mark in the navbar. Proportions, transparency and layout stay identical.

Encoding candidates already generated and compared at render scale:

| Candidate | Bytes |
|---|---|
| 400x267 PNG (lossless downscale, LANCZOS) | 19,165 |
| 400x267 PNG quantised to 128 colours | 4,727 |
| 400x267 lossless WebP | 12,620 |
| 512x341 PNG | 28,851 |

**Chosen: 400x267 lossless PNG, written over `src/assets/logo-dark.png`.**
- 400 px is ~2.1x the largest rendered width (190 px), so high-DPI stays sharp.
- Same filename and format, so zero component churn and no compatibility risk.
- Quantisation to 128 colours is rejected despite being smaller: the mark uses soft sage/greige gradients where banding is a real risk on a premium brand.
- Result: 2,113,471 → 19,165 bytes, **99.1% reduction**, on every route.

`src/assets/logo.png` (byte-identical, unreferenced) is left completely untouched and reported as an unused duplicate.

## 2. Hero request priority

Decision rule applied: at most one high-priority visual per route, and only where the image is the measured or clearly-expected LCP candidate.

- **Receives `fetchpriority="high"`**: the single eager hero `<img>` in `ArticleHeroImage`, `FlagshipHero`, `HubArticleView`, `PregnancyTopicPage`, `TTCTopicPage`, `TTCSubtopicPage`, `IVFTopicPage`, `FirstYearTopicPage`, `FamilyTopicPage`, `ToddlerTopicPage`, `ToddlerAgePage` — one image each, top of the template, no competing eager image on those routes. Each template will be re-checked for a second eager image before the attribute is added; any template that turns out to have two eager images gets none until it is reviewed.
- **Deliberately NOT receiving it**: the 42 week pages (`Week1Page`–`Week42Page`). The WC-2 measurement showed the week illustration is the desktop LCP but mobile LCP is text, and the same markup serves both. Raising priority there would add mobile contention for no mobile gain, and viewport-conditional priority logic is explicitly out of scope. They keep `loading="eager"` unchanged.
- **Also excluded**: `MyWeekBabyImage`, `BabyIllustration`, `KeptChapter` — signed-in, non-indexable surfaces behind auth and data fetches, where priority hints do not change perceived load. Eager behaviour unchanged.

No eager→lazy conversions, no lazy→eager conversions. Eager count stays 56.

## 3. Measurement

Baseline is already captured from the WC-2 audit (logo appears in the top-5 heaviest requests on every route measured). After the change, the same Playwright pass re-runs against the production preview on `/`, `/pregnancy`, `/trying-to-conceive`, `/first-year`, `/toddler`, `/family`, `/journal`, `/about` at 1280x1800 and 390x844, recording per-route image bytes, LCP element/time, and a check that exactly one request per route carries high priority. Each logo surface is screenshotted for visual comparison. No Lighthouse scores will be quoted.

## 4. Validation

`npm test`, `npm run lint`, `npm run typecheck`, `npm run build`. The known pre-existing `previewAuthStorage.ts` lint error and react-refresh warnings stay untouched.

## 5. Explicitly not touched

Journal video and `ProductHero`, hero JPG re-encoding, srcset/sizes, vite-imagetools, WebP/AVIF pipelines, article imagery, asset deletions, crops, hero design, routes, SeoHead/titles/descriptions/canonicals, sitemap, robots.txt, companion, AI architecture, `src/lib/grounding/*`, `docs/ai/grounding-approvals/*`. `AI_SOURCE_ROUTING_VERSION` stays `30B-source-routing-v1`; grounding candidates 0, approvals 0, `listGroundingEligibleSlugs() = []`; Phase 30K parked at Stage 2. WC-2A.2 not started.

## Files touched

`src/assets/logo-dark.png` (re-encoded in place) and the eleven shared hero templates listed above (one attribute each).
