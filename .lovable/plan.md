# WC-2 — Asset Weight & LCP (Audit + Plan Only)

Measured on the current repository and the running app (Vite dev serves the same source assets byte-for-byte, so file weights below are exact; timings are indicative, not Lighthouse scores). No assets were changed.

## 1. Inventory summary

- `src/assets` total: **215 MB** across 360 JPG, 90 PNG, 1 MP4, 1 SVG, plus 245 CDN `.asset.json` pointers (already off-repo and not part of initial weight unless referenced above the fold).
- `public`: 433 KB. No locally served font files (fonts are external).
- No WebP, no AVIF, no `<picture>`, **no `srcset`/`sizes` anywhere in `src`** (0 matches).
- `loading="eager"`: **56 occurrences**. `loading="lazy"`: 264. `fetchpriority`: **0 occurrences**.
- All CSS/inline `backgroundImage` uses are **gradients only** — no large background image files. Nothing to fix in section 8.

## 2. Twenty largest user-facing assets (measured)

| # | File | Size | Dimensions |
|---|---|---|---|
| 1 | src/assets/video/journal-hero.mp4 | 36.5 MB | 1920x1080 |
| 2 | journal-couple-ultrasound.jpg | 2.26 MB | 1279x1920 |
| 3 | journal-baby-shower.jpg | 2.22 MB | ~ |
| 4 | journal-nursery-planning.jpg | 2.19 MB | ~ |
| 5 | journal-flatlay.jpg | 2.15 MB | ~ |
| 6 | journal-firsts-page.jpg | 2.13 MB | ~ |
| 7 | logo.png | 2.11 MB | 1536x1024 RGBA |
| 8 | logo-dark.png | 2.11 MB | 1536x1024 RGBA |
| 9 | journal-couple.jpg | 2.05 MB | ~ |
| 10 | journal-names-planning.jpg | 1.97 MB | ~ |
| 11 | journal-first-seasons.jpg | 1.92 MB | ~ |
| 12 | guidance-card-body.jpg | 1.87 MB | ~ |
| 13 | article-hero-second-sleep.jpg | 1.83 MB | 1264x848 |
| 14 | guidance-card-quiet.jpg | 1.81 MB | ~ |
| 15 | guidance-card-comfort.jpg | 1.80 MB | ~ |
| 16 | flagship-heartburn-hero.jpg | 1.80 MB | ~ |
| 17 | article-hero-third-emotional.jpg | 1.77 MB | ~ |
| 18 | journal-ultrasound.jpg | 1.76 MB | ~ |
| 19 | trimester-second.jpg | 1.75 MB | 1264x848 |
| 20 | trimester-third / article-hero-fatigue / trimester-first / ask-direction-board.png | 1.71–1.74 MB | 1264x848 / 1536x1024 |

Pattern: hero and article JPGs are only ~1264x848 but weigh 1.6–1.8 MB — that is roughly **10x heavier than needed for those dimensions**. The waste is encoder quality/chroma, not resolution.

## 3. Journal hero video (`/journal`, `src/components/product/ProductHero.tsx`)

- Size **36,508,225 bytes (36.5 MB)**; H.264 + AAC; 1920x1080; 15.05 s; **19.4 Mbit/s** average bitrate (roughly 10x a sensible web bitrate for this content).
- Attributes: `autoPlay loop muted playsInline preload="metadata"`, poster `journal-cover-hand.jpg`.
- Because `autoPlay` is set and the element is in the initial viewport, `preload="metadata"` is overridden in practice: Chrome begins fetching the full file immediately on both desktop and mobile. Mobile receives the identical 36.5 MB desktop file — there is no mobile variant and no reduced-motion fallback.
- A poster already exists, so poster-first is achievable without new imagery.
- LCP on `/journal`: desktop LCP resolved to an image (`journal-writing.jpg`), mobile LCP to text — the video is not the measured LCP element, but it dominates total transferred weight and competes for bandwidth with the real LCP asset.

Recommended strategy (not yet implemented): re-encode the existing footage at ~2.5–4 Mbit/s 1080p H.264 (plus optional WebM/VP9), keep the same crop, duration and visual grade; switch to poster-first with `preload="none"` and start playback on intersection; skip video entirely for `prefers-reduced-motion`. No new video generated, no visual redesign.

## 4. Logos

- `logo.png` and `logo-dark.png` are **byte-identical duplicates** (2,113,471 bytes each, 1536x1024 RGBA).
- Only `logo-dark.png` is imported — in `Navbar`, `Footer`, `MyWeekHeader`, `TTCJourneyHeader`, `PrototypeChrome`. `logo.png` is currently **unreferenced**.
- Rendered at roughly 120–200 px wide in the navbar, so the browser downloads 2.1 MB and scales it down by ~10x. It loads on **every route** — it appears in the top-5 heaviest requests on every page measured.
- Fix: emit a properly sized, trimmed PNG (or SVG/WebP) at 2x rendered size. Expected 2.11 MB → 15–60 KB with no visible change. Duplicate `logo.png` reported, not deleted.

## 5. Large-image categorisation

- **A. Critical hero/LCP**: `pregnancy-hero-booties.jpg` (`/pregnancy`, LCP both viewports), `ttc-hero-lifestyle.jpg` (`/trying-to-conceive`, LCP both), week `*-biology-detail.jpg` (`/pregnancy/week/20` desktop LCP), `home-hero-premium.jpg` (mobile home LCP via video poster).
- **B. Above-the-fold supporting**: article hero JPGs via `ArticleHeroImage`/`FlagshipHero`, week fetus PNG/JPGs on the 42 week pages.
- **C. Below-the-fold**: trimester cards, guidance cards, journal gallery imagery on `/journal` (7 images at 1.9–2.3 MB each render below the hero).
- **D. Decorative/background**: botanical PNG accents, wash textures (`ttc-wash-sage.png`, 1.59 MB) — decorative, currently not lazy in several places.
- **E. Article imagery**: the bulk of the 360 JPGs; mostly below the fold and already lazy.
- **F. Currently unused**: `logo.png` at minimum; a fuller unused sweep is proposed as WC-2D (report only, no deletions).

No responsive variants exist for any of these; mobile downloads the desktop file everywhere.

## 6. Eager-loading classification (56 sites)

- 42 of the 56 are the per-week fetus illustration in `Week1Page`–`Week42Page` (one each) — above the fold, genuinely the visual focus: **KEEP EAGER**, and add `fetchpriority="high"` to that single image only.
- Shared templates (`ArticleHeroImage`, `FlagshipHero`, `HubArticleView`, `PregnancyTopicPage`, `TTCTopicPage`, `TTCSubtopicPage`, `IVFTopicPage`, `FirstYearTopicPage`, `FamilyTopicPage`, `ToddlerTopicPage`, `ToddlerAgePage`): one eager hero each, above the fold — **KEEP EAGER** (+ `fetchpriority="high"`).
- `MyWeekBabyImage`, `BabyIllustration`, `KeptChapter`: signed-in surfaces, above the fold — **KEEP EAGER**, but they are not indexable/critical-path pages: **NEEDS HUMAN REVIEW** on priority.
- No route was found with two eager images competing above the fold. The real problem is not eager count — it is that each eager image is 1.6–2.3 MB.

## 7. Route measurements (dev build; desktop 1280x1800 / mobile 390x844, no throttling available in-sandbox)

| Route | Desktop LCP element | Mobile LCP element | Images | Notes |
|---|---|---|---|---|
| / | H1 (text) | video poster (`home-hero-premium.jpg`, 178 KB) | 8 | `journal-flatlay.jpg` 2.15 MB + logo 2.11 MB load early |
| /pregnancy | `pregnancy-hero-booties.jpg` | same | 9 | `trimester-second.jpg` 1.75 MB below fold |
| /pregnancy/week/20 | `week20-biology-detail.jpg` | text | 7 | |
| /trying-to-conceive | `ttc-hero-lifestyle.jpg` | same | 4 | |
| /first-year | H1 | H1 | 2 | light |
| /toddler | H1 | text | 4 | light |
| /family | H1 | H1 | 2 | light |
| /journal | `journal-writing.jpg` | text | 11 | heaviest route; 7 multi-MB gallery JPGs + 36.5 MB video |
| /about | text | text | 2 | light |
| /ask | text | text | — | light |

Layout stability: week and template images carry explicit `width`/`height` or fixed aspect containers, and the journal video sits in an `aspect-[16/10] md:aspect-[21/9]` box, so no obvious media-driven CLS was observed. Lazy-loading additions below must keep the existing aspect wrappers.

## 8. Proposed implementation slices (nothing implemented yet)

### WC-2A — Critical-path wins
1. Journal hero video: re-encode existing footage to ~2.5–4 Mbit/s; poster-first with `preload="none"` + play on intersection; static poster for reduced motion. 36.5 MB → ~4–7 MB, and ~0 bytes before the hero is seen. Routes: `/journal`. Initial load + total. Visual risk low, complexity medium.
2. Logo: correctly sized asset for `logo-dark.png`. 2.11 MB → 15–60 KB, **every route**, initial load. Visual risk low, complexity low.
3. Re-encode the ~40 hero/LCP and above-the-fold JPGs at their existing dimensions with sane quality (mozjpeg q78–82). ~1.7 MB → ~180–320 KB each (80–90% reduction). Visual risk low-medium (spot-check each hero), complexity medium.
4. Add `fetchpriority="high"` to the single hero image per template (no eager/lazy flips).

### WC-2B — Responsive delivery
5. Introduce `vite-imagetools` and emit WebP (+ optional AVIF) plus 2–3 widths with `srcset`/`sizes` for hero images only, via one small shared `<HeroImage>` wrapper — avoids a sprawling pipeline. Mobile hero cost roughly 60–75% below the optimised JPEG. Complexity medium, visual risk low.

### WC-2C — Deferred loading
6. `/journal` gallery: lazy + explicit aspect ratios for the 7 below-fold multi-MB JPGs; trimester and guidance cards likewise where still eager/undeclared. Total weight only, complexity low, visual risk low.
7. Decorative botanical/wash PNGs: lazy + `decoding="async"`.

### WC-2D — Optional deeper work
8. Full unused-asset report (starting with `logo.png`) — report only, deletions need explicit approval.
9. Bulk re-encode of the remaining ~300 below-fold article JPGs.
10. Route-level code splitting for the large JS chunks observed (lucide-react, supabase, react-markdown) — flagged for a later phase, out of WC-2 asset scope.

## 9. Estimated savings

- Logo: 2.11 MB → ~0.04 MB per route, ~98%, initial load, all routes.
- Journal video: 36.5 MB → ~4–7 MB encoded, and deferred so ~0 MB pre-interaction on `/journal`.
- Hero/above-fold JPGs: ~1.7 MB → ~0.2–0.3 MB each, 80–88%.
- `/journal` total page weight: ~32 MB of images/video → estimated ~4–6 MB.
- Typical content route: ~2–4 MB of image bytes → ~0.3–0.6 MB.
Ranges are used because no re-encoding has been tested yet.

## 10. Guardrails and boundaries

- Files likely touched later: `src/components/product/ProductHero.tsx`, `src/components/layout/Navbar.tsx`, `src/components/layout/Footer.tsx`, `src/components/myweek/MyWeekHeader.tsx`, `src/components/ttc/journey/TTCJourneyHeader.tsx`, the shared hero templates listed in section 6, journal gallery components, `vite.config.ts` (WC-2B only), and re-encoded files under `src/assets`.
- Not to touch: `SeoHead`, titles/descriptions/canonicals/robots/sitemap, routes, article data, design/crops/layout, companion and AI architecture, `src/lib/grounding/*`, `docs/ai/grounding-approvals/*`. `AI_SOURCE_ROUTING_VERSION` stays `30B-source-routing-v1`; grounding candidates 0, approvals 0, `listGroundingEligibleSlugs() = []`; Phase 30K parked at Stage 2.
- **Nano Banana / image generation: NO.** Every optimisation reuses existing media.
- Recommended first slice: **WC-2A items 2 and 4** (logo weight + hero priority) — smallest change, site-wide benefit, near-zero visual risk — then the journal video.
