# WC-2A.3 — Hero & LCP JPG Optimisation (Audit + Candidate Plan)

Audit and candidate plan only. No production image was changed. All candidate encodes were written to a temporary sandbox folder.

## Headline finding

The heavy "JPGs" are mostly not JPEGs. Of 360 files named `*.jpg` in `src/assets`, **32 are actually PNG files with a `.jpg` filename** (53.8 MB). Every one of the previously reported "1264x848 hero JPGs at 1.6–1.8 MB" is a mislabelled PNG. A further **13 are true JPEGs saved at near-maximum quality** (24.4 MB, all the `journal-*` product photography).

So the waste is encoder/format, not resolution, exactly as suspected — but more extreme than assumed. Re-encoding those 45 files as real JPEG at the same pixel dimensions gives **78.17 MB → 10.11 MB, a 87.1% reduction (68.06 MB saved)**.

Equally important: three of the assets the earlier audit named as problems are already small and need no work — `pregnancy-hero-booties.jpg` (93,157 B), `ttc-hero-lifestyle.jpg` (171,854 B), `home-hero-premium.jpg` (177,634 B).

## 1. Measured baselines (desktop 1280x1800, local production preview, dev server)

| Route | LCP element | LCP asset | LCP bytes | Total image bytes | LCP time |
|---|---|---|---|---|---|
| `/` | H1 (text) | — | — | 7,568,811 | 2180 ms |
| `/pregnancy` | IMG | pregnancy-hero-booties.jpg | 93,157 | 5,775,654 | 1388 ms |
| `/trying-to-conceive` | IMG | ttc-hero-lifestyle.jpg | 171,854 | 332,288 | 1320 ms |
| `/pregnancy/week/34` | P (text) | — | — | 3,715,244 | 1384 ms |
| `/pregnancy/week/12` | IMG | week12-biology-detail.jpg | 51,472 | 549,368 | 1496 ms |
| `/journal` | IMG | journal-writing.jpg | 1,470,647 | 15,027,689 | 1540 ms |
| `/pregnancy/body` | IMG | topic-body-hero.jpg | 1,673,547 | 32,696,331 | 2244 ms |
| `/articles/heartburn-in-pregnancy` | IMG | flagship-heartburn-hero.jpg | 1,795,296 | 6,846,391 | 2624 ms |
| `/first-year/0-3-months` | IMG | firstyear-stage-0-3.jpg | 36,074 | 150,136 | 1300 ms |
| `/trimester/second` | IMG | botanical-branch-bl.png | 94,897 | 114,062 | 1052 ms |

Mobile (390x844) differences: `/` LCP becomes the hero video poster region; `/pregnancy` and `/trying-to-conceive` keep the same image LCP; week pages and `/journal` fall back to text LCP because the heavy images sit lower. No route showed a mobile-only heavy LCP image that desktop did not already expose.

No Lighthouse scores are claimed; these are PerformanceObserver LCP entries and summed image response bytes on a local dev server.

## 2. Classification

**A — Confirmed LCP (measured):** `topic-body-hero.jpg` (1,673,547), `flagship-heartburn-hero.jpg` (1,795,296), `journal-writing.jpg` (1,470,647). Also measured as LCP but already small and excluded from work: pregnancy-hero-booties, ttc-hero-lifestyle, week12-biology-detail, firstyear-stage-0-3.

**B — Strong LCP candidate (above-fold primary hero, unmeasured or text-beaten):** the remaining 1264x848 hero set used by `ArticleHeroImage`, `ArticleHero`, `PregnancyTopicPage`, flagship image map and the trimester templates — `trimester-first/second/third`, `article-hero-nausea`, `-fatigue`, `-implantation`, `-implantation-bleeding`, `-early-symptoms`, `-discharge`, `-bleeding-reassurance`, `-second-body`, `-second-eating`, `-second-sleep`, `-second-movement-exercise`, `-third-sleep`, `-third-emotional`, `-third-movement`, `-third-signs-of-labour`, `-third-hospital-bag`, `guidance-card-body/quiet/comfort`, `flagship-heartburn-call/pillows/anatomy`. Plus the `journal-*` gallery/product photography that dominates `/journal` and `/` initial bytes.

**C — Above-fold supporting:** `week34-fetus`, `week34-biology-detail`, `week35-fetus`, `week35-biology-detail`, `week17-biology-detail` (large, eagerly fetched on their week route, but text won LCP).

**D — Not critical:** everything else. The remaining 315 `.jpg` files total ~25.5 MB and are already 30–300 KB each; the botanical PNG accents and `myweek-baby-week-*.png` illustrations are PNG and out of scope for WC-2A.3.

Recommendation: because A, B and C are the *same* single defect (wrong container / max-quality encode) and the fix is byte-identical in method, treat A+B as the implementation batch and include the five C week-detail files in the same slice only if you want the full 87% number; otherwise they defer cleanly.

## 3. Encoder and candidate settings

Encoder: Pillow / libjpeg-turbo, `quality=q, optimize=True, progressive=True, subsampling="4:4:4"`, ICC profile preserved where present, other metadata dropped. Sources are 8-bit sRGB RGB with no EXIF orientation flag, so orientation cannot be lost. Originals that are true JPEG are 4:4:4 — keeping 4:4:4 avoids any chroma/skin-tone shift; 4:2:0 saves a further ~20% but visibly softens colour edges and is **not** recommended for premium hero photography.

## 4. Candidate sizes (representative sample, same dimensions)

| Asset | Class | Original | q76 | q80 | q84 | q84 reduction | PSNR @q84 |
|---|---|---|---|---|---|---|---|
| article-hero-third-emotional.jpg (skin tones) | B | 1,770,719 | 132,977 | 149,698 | 199,545 | −88.7% | 39.39 |
| flagship-heartburn-hero.jpg (confirmed LCP) | A | 1,795,296 | 133,521 | 150,761 | 200,368 | −88.8% | 38.79 |
| topic-body-hero.jpg (confirmed LCP) | A | 1,673,547 | — | — | 183,951 | −89.0% | 39.93 |
| trimester-second.jpg (pregnancy imagery) | B | 1,750,463 | 141,256 | 158,557 | 220,262 | −87.4% | 39.45 |
| guidance-card-quiet.jpg (soft gradients) | B | 1,813,369 | 142,690 | 160,197 | 212,030 | −88.3% | 38.80 |
| journal-flatlay.jpg (product detail) | B | 2,151,746 | 262,350 | 300,154 | 350,294 | −83.7% | 39.79 |
| journal-couple-ultrasound.jpg (darker) | B | 2,264,696 | 284,428 | 324,185 | 376,033 | −83.4% | 39.87 |
| week34-biology-detail.jpg (high detail) | C | 1,622,653 | 118,392 | 134,546 | 180,282 | −88.9% | 39.21 |

(q76/q80 figures for the PNG-sourced rows were generated at 4:2:0 and are shown only as a lower bound; the q84 column is the recommended 4:4:4 setting.)

## 5. Visual-quality verdict and recommended tier

Across the sample, q84 4:4:4 holds PSNR 38.6–44.3 with no blocking, ringing or banding in gradients, no measurable colour shift (ICC preserved, no chroma subsampling), and no visible skin-tone or texture loss at rendered desktop, 2x desktop or mobile size. q80 remains good but starts showing faint gradient stepping in the softest backgrounds; q76 is visibly softer on fine product texture at 1:1. Given the brand position, q76 is rejected.

**Recommendation: a single site-wide tier of q84, progressive, 4:4:4, ICC preserved.** One tier is safe here because the defect is uniform and q84 clears every content type tested; a second "supporting" class would save under 5% of total and add maintenance cost. No per-image tuning.

## 6. Proposed first implementation batch

45 files (32 PNG-in-jpg + 13 max-quality JPEG), all A+B+C:

- **Total before:** 78,165,720 bytes
- **Total after (actual candidate encodes, not estimates):** 10,106,830 bytes
- **Saving:** 68,058,890 bytes, **−87.1%**

Critical-path saving (bytes on the LCP request itself):
- `/pregnancy/body`: 1,673,547 → 183,951 (−89.0%)
- `/articles/heartburn-in-pregnancy`: 1,795,296 → 200,368 (−88.8%)
- `/journal`: 1,470,647 → 211,988 (−85.6%)

Total-page-weight saving on measured routes:
- `/pregnancy/body`: 32.70 MB → ~4.6 MB
- `/journal`: 15.03 MB → ~2.4 MB
- `/`: 7.57 MB → ~5.6 MB (rest is `myweek-baby-week-*.png`, out of scope)
- `/articles/heartburn-in-pregnancy`: 6.85 MB → ~0.85 MB
- `/pregnancy`: 5.78 MB → ~0.85 MB
- `/pregnancy/week/34`: 3.72 MB → ~0.6 MB

## 7. Pregnancy week pages

The 42 week routes were judged separately. 126 `week*` assets total 15.6 MB, and all but five are already 15–210 KB. Only `week34-fetus`, `week34-biology-detail`, `week35-fetus`, `week35-biology-detail` and `week17-biology-detail` are heavy, and all five are PNG-in-jpg (7.87 MB → 824,323 bytes at q84). Week 12 and similar weeks are already correctly encoded, which is why `/pregnancy/week/12` totals only 549 KB. Fetus illustration PNGs (`myweek-baby-week-*.png`) and botanical accents are **not** touched in this phase; they belong to a later measured slice.

## 8. Files that would change

Only the 45 binary files under `src/assets/`. Filenames and pixel dimensions stay identical, so **zero source files change** — no imports, no image maps, no article data, no templates. Browsers content-sniff, and Vite serves by extension, so a `.jpg` name holding real JPEG bytes is strictly more correct than today.

Deliberately excluded: `src/assets/logo-dark.png`, `src/assets/video/journal-hero.mp4`, all PNG illustration/botanical assets, all 315 already-light JPGs, everything below the fold in the article image library.

## 9. Boundaries confirmed

- No responsive-image infrastructure required — simple re-encoding delivers 87%; srcset/picture/AVIF/WebP/vite-imagetools stay in WC-2B.
- Nano Banana / image generation not required. No new imagery, no crop, dimension, composition or layout change.
- WC-2A.1 intact: `logo-dark.png` remains 400x267 / 19,165 B, all `fetchPriority` changes untouched.
- WC-2A.2 intact: `journal-hero.mp4` remains 5,981,381 B, `ProductHero` poster-first logic untouched. Its carry-forward (real-browser H.264 playback confirmation) remains open and is not reopened here.
- Grounding untouched: `AI_SOURCE_ROUTING_VERSION = 30B-source-routing-v1`, candidates 0, approvals 0, `listGroundingEligibleSlugs() = []`, Phase 30K parked at Stage 2. No change to `src/lib/grounding/*` or `docs/ai/grounding-approvals/*`.
- Routes, SEO, sitemap, robots, companion and AI architecture untouched.

## 10. Visual-risk assessment

Low. Risk is confined to perceptible quality loss, mitigated by q84 4:4:4 with ICC preserved and no resizing. The one structural note: the 32 PNG-sourced files move from lossless to lossy for the first time, so their loss is entirely from this single generation — acceptable at PSNR ~39 for photographic content, and they are photography, not flat graphics or text-bearing artwork (verified by inspection of the sample).

## 11. Recommended controlled implementation slice

**WC-2A.3-i (first slice, recommended):** the 3 confirmed-LCP A assets plus the 20 remaining 1264x848 B heroes — 23 files, ~38.6 MB → ~4.5 MB. Verify visually on `/pregnancy/body`, `/articles/heartburn-in-pregnancy`, `/pregnancy`, and a trimester route, then re-measure LCP.

**WC-2A.3-ii:** the 13 `journal-*` product photographs (24.4 MB → ~3.98 MB) after a close 1:1 review of product texture, since these are the brand's product imagery.

**WC-2A.3-iii:** the 5 heavy week detail/fetus images (7.87 MB → ~0.82 MB).

Stopping here as instructed. No production JPG has been replaced and WC-2B has not been started.
