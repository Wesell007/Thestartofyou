## Phase 14.10: Wire Personalised Realism Variants into My Week

Wire the saved `baby_illustration_style` preference into the new week-by-week realism system on `/my-week`, and refresh the Account Settings previews to reflect the new realism variants. Preserve all layout, old assets, DB behaviour, and the old 3-stage system.

### File 1: `src/components/myweek/SectionBabyThisWeek.tsx`

Swap the image source in the Baby This Week card from default-only to tone-aware:

- Add imports: `useBabyIllustrationStyle` from `@/hooks/useBabyIllustrationStyle`, and `normaliseRealismTone`, `resolveRealismForWeek` from `@/lib/myWeekRealismIllustrations` (keep `defaultRealismAltForWeek`).
- Remove the `resolveDefaultRealismForWeek` import.
- Inside the component: read `const { style } = useBabyIllustrationStyle();`, compute `const tone = normaliseRealismTone(style);` and `const resolved = resolveRealismForWeek(week, tone);`.
- Continue rendering `resolved.src` with `defaultRealismAltForWeek(week)` (tone-agnostic alt).
- No changes to spacing, glow, wrapper, gradients, aspect box, decorative spans, `data-baby-week`, size cue area, figcaption, `developmentCue`, `babyNote`, `whatThisMeans`, or mobile/desktop layout.

Weeks 1–8 and missing tone assets fall back to default automatically via the resolver's existing logic.

### File 2: `src/components/settings/BabyIllustrationStyleField.tsx`

Replace the old 3-stage preview thumbnails and transition note with previews of the new realism system, keeping the DB write behaviour and radio-group interactions unchanged:

- Replace imports from `@/lib/myWeekBabyIllustrations` (kept: `BABY_ILLUSTRATION_STYLES`, `isBabyIllustrationStyle`, `BabyIllustrationStyle`). Drop `babyIllustrationAlt` and `resolveBabyIllustration` from usage in this file.
- Add imports: `resolveRealismForWeek`, `defaultRealismAltForWeek` from `@/lib/myWeekRealismIllustrations`.
- Precompute a `PREVIEW_WEEK = 20` and a per-style preview URL map via `resolveRealismForWeek(20, style)` (tone-agnostic; `default` uses `"default"`).
- Update the tile `<img>` to use the new preview URL, with `alt={defaultRealismAltForWeek(20)}` (no mention of skin tone). Adjust `object-cover` → `object-contain` and background as needed so the framed illustration reads clearly at ~64px; keep the same tile structure, focus states, and keyboard/`radiogroup` behaviour.
- Replace the "coming next" transition paragraph with:  
  *"Your illustration style now applies to My Week from around Week 9 onward. Earlier weeks stay neutral because early development illustrations do not show visible baby skin tone."*
- Keep the existing symbolic disclaimer line and Save / Reset buttons unchanged.

### Out of scope (unchanged)

- `MyWeekBabyImage.tsx`, `WeekIllustration.tsx`, public/editorial week pages, routes, sitemap, analytics, AI prompts, migrations.
- `profiles.baby_illustration_style`, the enum, `useBabyIllustrationStyle`, old 3-stage assets/resolver, existing DB write behaviour — all preserved.
- No new image generation, no asset imports, no deletions.

### QA

- `npm run typecheck` (must pass; return exact command and result).
- Manual verification via Playwright / preview:
  - Settings still saves each of `default`, `light`, `medium`, `deep`.
  - Settings tiles show new realism previews (Week 20), not the old 3-stage assets.
  - `/my-week` at Week 36 changes image across all four preferences.
  - `/my-week` at Weeks 1–8 stays on default regardless of preference.
  - No broken images, no layout shift in Baby This Week.

### Stop point

Stop after wiring, Settings preview update, and typecheck. Do not begin another phase.
