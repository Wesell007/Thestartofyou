## Phase 14.4 — My Week Default Realism Wiring

Wire the approved 42-week neutral realism set into the Baby This Week card only. Preserve the old 3-stage system and DB preference.

### Changes

**1. `src/components/myweek/SectionBabyThisWeek.tsx`**
- Replace `useBabyIllustrationStyle` + `resolveBabyIllustrationForWeek` + `babyIllustrationAlt` with `resolveDefaultRealismForWeek(week)` and `defaultRealismAltForWeek(week)` from `@/lib/myWeekRealismIllustrations`.
- Remove the hook import and the resolver import for the old 3-stage system.
- Keep the entire visual shell unchanged: section spacing, glow, rounded frame, radial gradient wrapper, aspect box, blur/border decorative spans, `data-baby-week`, size cue area, figcaption, `developmentCue`, `babyNote`, `whatThisMeans`, mobile/desktop grid.
- The `<img>` swaps its `src` to `resolved.src` and `alt` to `defaultRealismAltForWeek(week)`. Keep `loading="eager"`, `decoding="async"`, and existing classes.

**2. `src/components/settings/BabyIllustrationStyleField.tsx`**
- Add a small helper note (new `<p>`) beneath the existing preface copy:
  > "We are upgrading My Week to a neutral week-by-week illustration set first. Your saved illustration preference is kept for the personalised version coming next."
- Do not remove the field, the radio group, save/reset buttons, or DB writes. The preference remains editable and persisted.

### Preservation (unchanged)
- `profiles.baby_illustration_style` column, enum, and RLS
- `useBabyIllustrationStyle`, `src/lib/myWeekBabyIllustrations.ts`, `src/assets/myweek-baby-styles/`
- `MyWeekBabyImage.tsx`, `WeekIllustration.tsx`, WeekHero, WeekTimeline, Kept Chapter, Journey preview imagery
- Public/editorial week pages, `src/assets/myweek-weekly-babies/`
- Routes, sitemap, analytics, AI prompts, migrations

### Validation
- Run `npm run typecheck` (fall back to `bunx tsgo --noEmit`); report the exact command and result.
- Playwright visit `/my-week` at an early, mid, and late week if a signed-in session is available; verify image loads from Lovable Assets URL and alt text matches `defaultRealismAltForWeek`. If session injection is not available, verify via component render/typecheck and confirm resolver returns a URL for each week.
- Confirm Account Settings still loads and the new copy renders.

### Out of scope
No personalised Light/Medium/Deep variants, no deletions, no Phase 14.5 work.
