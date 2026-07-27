## Phase 13.7g — My Week Rendering Wire-Up

Verified: `profiles` is keyed by `user_id` (matches Account Settings, Setup, useCompanionIdentity, and BabyIllustrationStyleField). The new hook will use `.eq("user_id", user.id)`.

### Files created

- `src/hooks/useBabyIllustrationStyle.ts`
  - Gets session via `supabase.auth.getSession()`.
  - Reads `profiles.baby_illustration_style` with `.eq("user_id", user.id).maybeSingle()`.
  - Normalises via `isBabyIllustrationStyle`; anything else → `"default"`.
  - Returns `{ style: BabyIllustrationStyle, isLoading: boolean }`.
  - Signed-out / NULL / unknown / error → `"default"`. Never throws, never toasts, never logs, never sent to AI or analytics.

### Files edited

- `src/components/myweek/SectionBabyThisWeek.tsx`
  - Remove the `MyWeekBabyImage` import.
  - Call `useBabyIllustrationStyle()` inside the component.
  - Replace the `<MyWeekBabyImage …/>` element (line 129) with an `<img>` whose `src` = `resolveBabyIllustrationForWeek(style, week).src` and `alt` = `babyIllustrationAlt(resolved.style)`. Preserve the exact wrapper div, sizing, `relative z-10 h-full w-full`, `object-contain select-none`, `loading="eager"`, `decoding="async"`.
  - Keep all surrounding layout, glow, ring, gradients, `figcaption`, spacing, size cue, `babyNote`, `whatThisMeans` unchanged.

### Files not changed

- `src/pages/MyWeek.tsx`, `MyWeekBabyImage.tsx` (file preserved, just unused by this slot), Account Settings, Setup, week article pages, per-week fetus assets, size cues, biology detail images, article images, Weekly Reads, Journey Support, uploaded photos/videos, routes, sitemap, analytics files, AI files.

### Behaviour

- NULL / `default` / unknown / loading / error → default symbolic set.
- `light` / `medium` / `deep` → matching symbolic set.
- Stage from week via resolver (1–13 early, 14–27 mid, 28–42 late).
- Reset in Account Settings returns `/my-week` to default on next load.

### Verification

- `bunx tsgo --noEmit`.
- Manual: toggle each of the four preferences in Account Settings, then load `/my-week` at early, mid, late weeks; confirm image and alt update.
- `rg` sweep to confirm no analytics / AI / route / sitemap files touched, and per-week fetus assets untouched.
