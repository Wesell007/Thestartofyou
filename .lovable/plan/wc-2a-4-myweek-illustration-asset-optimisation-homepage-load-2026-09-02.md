# WC-2A.4 — MyWeek Illustration Asset Optimisation + Homepage Loading Fix

Scope is limited to the 42 MyWeek weekly-baby illustrations, their single resolver, and the one below-fold eager-loading defect. No other assets, no responsive infrastructure, no WC-2A.5, WC-2B, WC-2C or WC-3 work.

## Confirmed current state (measured this turn)

- Directory: `src/assets/myweek-weekly-babies/`, exactly **42 files**, `myweek-baby-week-01.png` … `-42.png`.
- Exact current total: **51,827,822 B** (reconciles to the audit reference).
- Weeks 01–03: 520x640, **RGBA with real transparency** (alpha extrema 0–255), 127,811 / 132,320 / 136,866 B.
- Weeks 04–42: 928x1152, **RGB, no alpha, no ICC**, ~1.0–1.56 MB each.
- Single resolver: `src/components/myweek/MyWeekBabyImage.tsx` (`import.meta.glob` over the folder, `loading="eager"`).
- Consumers: `src/components/home/JourneyPreviewSection.tsx` (four instances: 96/112px circle, 44px circle, 36px list rows) and `src/components/myweek/MyWeekChapter.tsx` (largest real presentation: `max-w-[296px]`, aspect 13/16 → ~296x364 CSS).

Maximum physical-pixel requirement at DPR 3 for the largest consumer is ~888x1092, i.e. essentially the existing 928x1152 intrinsic size. **Masters will not be resized** — this phase fixes format/encoding only.

## Plan

### 1. Manifest and reconciliation
Produce the full 42-row manifest (filename, path, format, dimensions, colour mode, alpha, ICC, bytes, consumers, route consumers, max rendered CSS size, max DPR-3 pixel need). Stop and report if the count is not exactly 42.

### 2. Suitability gate
- Weeks 01–03 carry genuine transparency and sit on gradient/circular backgrounds → **retained as PNG**, references unchanged. They contribute only ~397 KB.
- Weeks 04–42 (39 files, RGB, no alpha) are continuous-tone watercolour illustrations → JPEG candidates.

### 3. Encoding trials (scratch only, `/tmp`)
Representative set covering early (04, 06), mid (17, 22), late (34, 40), light and darker backgrounds, fine fetus/body edge detail and watercolour gradients. Generate per representative:
- current PNG (reference)
- JPEG q84 / 4:4:4 / progressive / optimise
- JPEG q88 / 4:4:4 / progressive / optimise
- optimised PNG comparison using existing tooling only (Pillow `optimize`), no new dependencies.

### 4. Premium visual gate
Inspect each candidate at full intrinsic view, 1:1 crop, homepage rendered size (36 / 44 / 96–112 px) and the 296px MyWeek chapter size at high DPI. Check watercolour texture, edges, gradients, shadows, banding, ringing, blocking, softness and colour shift. PSNR/SSIM reported as supporting evidence only. Select q84 if visually indistinguishable; escalate to q88 where q84 shows perceptible degradation; retain PNG for any file JPEG cannot carry cleanly, and report it.

### 5. Conversion and reference update
- Write correctly named `.jpg` files (no JPEG bytes inside `.png` names) at unchanged intrinsic dimensions.
- Update only the MyWeek resolver so the glob covers both `.png` and `.jpg` and resolves each week to its approved file (PNG retained for weeks 01–03 plus any quality-retained file).
- Remove only superseded, fully unreferenced MyWeek PNGs. No other asset touched.

### 6. Homepage loading fix
`MyWeekBabyImage.tsx` currently hardcodes `loading="eager"` for every instance. Add a minimal optional `priority`/`eager` prop defaulting to lazy, and keep eager only where an above-fold critical image genuinely renders. All four homepage instances are below the fold (`JourneyPreviewSection` sits after hero, value-proof and branded sections), so they become `loading="lazy"`. No IntersectionObserver, no scheduler, no shared utility, no global forcing.

### 7. Measurement gate
Production `npm run build` + `vite preview`, fresh context, cache disabled, desktop 1280x1800 DPR 1 and mobile 390x844 DPR 3, before/after on `/`. Report LCP element/resource/bytes, total image bytes, MyWeek requests and bytes in the initial window, request start times, whether below-fold MyWeek images are absent from the critical window, indicative LCP, CLS, errors. Baseline: homepage image payload 5,769,991 B, MyWeek contribution 5,126,453 B.

### 8. Consumer verification
Visually verify `/` and the largest real MyWeek consumer route (MyWeek chapter view) on desktop and mobile: correct week image, crop, dimensions, detail, colour, no broken references, no decode error, no layout shift. Confirm served content types.

### 9. Validation and preservation
`npm test`, `npm run lint`, `npm run typecheck`, `npm run build` (pre-existing warnings left unchanged). Re-verify byte-exact preservation of WC-2A.1 (19,165 B), WC-2A.2 (5,981,381 B), WC-2A.3-i (5,513,604 B), WC-2A.3-ii (3,768,903 B), WC-2A.3-iii (824,323 B) and grounding frozen at `30B-source-routing-v1` with zero candidates/approvals.

### 10. Reporting
Repository 42-file weight before → after (bytes removed, percentage) reported separately from homepage initial-load impact. Record for later, not actioned: seven decorative transparent PNGs, WC-2A.5 article hero thumbnail source selection, and the existing carry-forward register. Full 36-point completion report, then stop.

## Technical notes

- Encoder: Pillow, already in the sandbox; `quality=84|88`, `subsampling=0`, `progressive=True`, `optimize=True`, no ICC (none present in sources).
- Resolver change is the only source edit besides the loading attribute; page components pass no new props except an explicit eager flag if an above-fold critical case is found.
- Expected direction: very large reduction, no exact target claimed until measured.
