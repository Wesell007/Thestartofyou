# Phase 27D — Pregnancy Weekly Rhythm and Visual Polish

Presentation-only polish of the signed-in weekly experience, plus the decorative overflow fix logged in 27C.

## Discovery findings

Current `/my-week` order (from `src/pages/MyWeek.tsx`): hero, baby this week, body this week, emotionally this week, one focus card, Ask Cindy, tools this week, weekly reads, keep this week (reflection, photo, video, voice), journal bridge, next chapter, footer.

Decorative overflow root cause (confirmed by reading the files):

- `src/components/myjourney/JourneyHero.tsx` line 35 and `src/pages/PregnancyToolkit.tsx` line 226 both wrap a watercolour wash in `absolute -inset-x-6 ...`, which pushes the decorative layer 24px past the main column on each side.
- Both also place a `BotanicalSprig` at `-right-4 / -right-8`.
- `src/pages/MyWeek.tsx` has `overflow-x-hidden` on its page wrapper, so the same pattern is clipped there. `src/pages/MyJourney.tsx` (line 348) and `src/pages/PregnancyToolkit.tsx` (line 213) do not, so the bleed becomes a horizontal scroll at 390px.

## What will change

### 1. Overflow fix

- Add `overflow-x-hidden` to the page wrappers on `/my-journey` and `/pregnancy-toolkit`, matching `/my-week`.
- Tighten the decorative wrappers themselves so they do not rely on page clipping: use `-inset-x-3 sm:-inset-x-6` and `max-w-full` on the wash layer, and pull the hero sprigs inside the column on mobile.
- Re-check `/my-week` decor for any layer that still measures wider than the viewport.

### 2. Weekly rhythm

Adjust spacing and section headers only, no restructure:

- One consistent section rhythm (same top/bottom padding scale) across baby, body, emotional, focus, Ask Cindy, tools, reads.
- Group the three "this week" reading cards (baby, body, emotional) more tightly, then use a slightly wider gap and a hairline rule before the capture area, so the page reads as "read this week" then "keep this week".
- Standardise every eyebrow label on `PG_EYEBROW` from `pregnancyStyles.ts` instead of repeated inline styles.
- Reduce wash/sprig opacity where decoration currently sits behind body copy.

### 3. Weekly action clarity

- In `SectionKeepThisWeek`, give each slot a short, consistent label line (reflect, photo, video, voice note) and keep the existing captured indicator.
- Keep all save, upload and recording behaviour untouched.

### 4. Reflection, media, toolkit, journal bridge

- Reflection: warmer paper surface, more writing room, keep the existing private cue and prompt copy, ensure bottom-nav clearance on mobile.
- Photo and video keep the taped frame; voice note gets the same paper card treatment so it reads as a private audio memory; empty states get calmer copy spacing (no new prompts unless awkward).
- Toolkit cards on `/my-week`: even spacing, 44px+ targets, softer decoration behind labels.
- Journal bridge moves to sit directly after the capture area, before Next chapter, using existing approved copy.

## Technical notes

- Files expected to change: `src/pages/MyWeek.tsx`, `src/pages/MyJourney.tsx`, `src/pages/PregnancyToolkit.tsx`, `src/components/myjourney/JourneyHero.tsx`, and the `src/components/myweek/Section*` / `Slot*` files touched for rhythm.
- No changes to data loading, week calculation, Supabase calls, storage, AI, routes, schema, sitemap or SEO.
- HSL tokens and `pregnancyStyles.ts` only, no hex.
- Decorative images stay `alt=""` and `aria-hidden`.
- Verification: Playwright at 390px and 1440px on `/my-week`, `/my-journey`, `/pregnancy-toolkit`, one toolkit sub-route, one public pregnancy route and one First Year route; then `npx tsgo --noEmit -p tsconfig.json`, `npx vitest run`, `npm run build`.

## Later-phase notes (not in this phase)

Pregnancy Memories route, journal ownership state, insert-card flow, Fable visual upgrade.
