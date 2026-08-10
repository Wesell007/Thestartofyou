# Phase 20B — First Year Signed-in Copy and Spacing Polish

Copy and spacing only. No schema, migrations, RLS, routes, auth, export, sitemap, robots, public pages, or Daily Check-in / Memories behaviour.

## Spacing fixes

1. `src/pages/firstyear/FirstYearToday.tsx` — add `pt-16 sm:pt-20` to `<main>`, remove `pt-8` from the inner `<header>` (matches the MyWeek and Memories pattern).
2. `src/components/firstyear/journey/FirstYearHeroPanel.tsx` — raise the hero from `pt-12 sm:pt-16` to `pt-16 sm:pt-20`. Spacing stays owned by the hero only; `MyFirstYear.tsx` `<main>` keeps no top padding, so there is no double padding.
3. `src/pages/firstyear/MyPregnancyChapter.tsx` — `<main>` top clearance from `pt-10 sm:pt-14` to `pt-16 sm:pt-20`.
4. `FirstYearMemories.tsx` untouched.

## Copy fixes

Support lane data in `src/pages/firstyear/MyFirstYear.tsx` (stays where it lives):

- Sleep card detail to "Rest rhythms, wake windows and what babies often do at this age."
- Development card title to "Development", detail to "What babies often do, at their own pace."
- Parent lane card title to "Questions to bring up", detail keeps "What is worth raising with your midwife, GP or health visitor."

`src/components/firstyear/journey/TodayCard.tsx`:

- Reassurance line to "Write as much or as little as you like. There is nothing to keep up with."

## Files changed

- `src/pages/firstyear/FirstYearToday.tsx`
- `src/pages/firstyear/MyFirstYear.tsx`
- `src/components/firstyear/journey/FirstYearHeroPanel.tsx`
- `src/components/firstyear/journey/TodayCard.tsx`
- `src/pages/firstyear/MyPregnancyChapter.tsx`

## QA

Typecheck, `npx vitest run`, `npm run build`; banned wording grep across the changed files; visual check of `/my-first-year`, `/my-first-year/today`, `/my-first-year/memories` and `/my-pregnancy-chapter` at 390px and 1440px for header clearance, no double padding, no horizontal overflow, Today still primary, Memories still secondary; report sitemap URL count and dist result.
