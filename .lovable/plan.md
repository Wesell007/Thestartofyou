# Phase 20A — Signed-in First Year Audit Report

Audit only. No files were changed.

## Current structure

```text
/my-first-year        Hero > Baby summary > Today card > Recently saved > Memories card
                      > (Kept pregnancy chapter) > Support lanes (baby | you) > What comes next
/my-first-year/today  Title > Baby lane > Parent lane > Saved today > Recent notes
/my-first-year/memories  Title > Save a moment form > What you have kept (month grouped)
/my-pregnancy-chapter    Read-only kept chapter, reached from the home card only
```

## What is working well

- Today is visually dominant (largest card, filled CTA, deep stage colour); Memories is a quiet outlined card, so the hierarchy you asked for holds.
- Memories reads as a warm second surface, not a duplicate: no counts, no feed, "Keep a moment" / "Look back at your memories".
- Recently saved renders only when notes exist, so a new parent sees a calm home.
- Copy is largely already on-tone: "notice", "rhythm", "nothing to keep up with", "skipping days is completely fine".
- Memories and Today both use `role="status"` `aria-live="polite"` regions, labelled radiogroups and `htmlFor`-linked fields.

## Copy issues found

1. `MyFirstYear.tsx` support card: "Safer sleep, wake windows and what is normal at this age." Two banned terms in one line.
2. `MyFirstYear.tsx` support card title "Development and milestones" plus detail "without the pressure of a checklist" — the reassurance admits the comparison pressure the title creates.
3. `MyFirstYear.tsx` "Check-ups and questions" detail "signs worth asking about" is fine, but the For you duplicate card points to the same route with a much longer title; the two lanes both end on the same destination.
4. `TodayCard.tsx` "Nothing here is tracked, scored or compared" names tracker language in order to deny it. Softer to state the positive.
5. `WhatComesNextCard.tsx` "More First Year support will arrive a little at a time" is roadmap-ish for a keepsake product; low priority.

No occurrences of risk, diagnosis, delayed, behind, advanced, "baby is fine", "no need to call" anywhere in the signed-in surfaces.

## Spacing and fixed-header issues

`MyWeekHeader` is `fixed top-0`, `h-14` (56px) mobile, `sm:h-16` (64px) desktop.

| Route | Top clearance | Verdict |
|---|---|---|
| `/my-first-year/memories` | `main pt-16 sm:pt-20` | Correct (Phase 19B fix) |
| `/my-first-year/today` | `main` has no top padding, inner `header pt-8` (32px) | Fails: 32px under a 56px header. Same defect as the one fixed on Memories |
| `/my-first-year` | `main` has no top padding, hero `pt-12 sm:pt-16` (48px / 64px) | Marginal: the "YOUR FIRST YEAR" kicker sits inside the last 8px of the mobile header band |
| `/my-pregnancy-chapter` | `main pt-10 sm:pt-14` (40px / 56px) | Marginal on mobile, same class of issue |

Reference good pattern: `MyWeek.tsx` uses `pt-16 sm:pt-20` on `<main>`; `KeptChapter.tsx` uses `pt-12 sm:pt-16 lg:pt-20`.

No horizontal overflow risks found: all three surfaces use `max-w` + `px-4 sm:px-8` containers, cards use `rounded-[22px]` with no fixed widths, and the support lanes collapse to one column below `lg`.

## Desktop

- `/my-first-year` is `max-w-[880px]` at `lg` with a two-column support grid — balanced.
- `/my-first-year/today` and `/memories` are capped at `720px` with no `lg` widening. Correct for writing surfaces; leave as is.

## Accessibility

- Heading order is sound on all three routes (single `h1`, `h2` sections, `h3` group labels).
- Focus rings are present on the Today CTA, Memories link and pill buttons. The Memories page `h1` link and the hero "Browse the First Year guide" link use `focus-visible:ring-2` without a named ring colour, so they inherit the default ring rather than the sage ring used elsewhere — cosmetic inconsistency only.
- Tap targets use `min-h-11` on links and buttons.
- Remove-memory uses the shared `ConfirmDialog` (Radix), so focus trap and Escape are handled.

## Recommended Phase 20B changes (small, copy and spacing only)

Spacing
- `FirstYearToday.tsx`: move top padding to `<main>` as `pt-16 sm:pt-20`, drop `pt-8` from the inner header.
- `FirstYearHeroPanel.tsx`: raise hero top padding to `pt-16 sm:pt-20` (or add it to `<main>` in `MyFirstYear.tsx` and drop it from the hero — one owner only).
- `MyPregnancyChapter.tsx`: `pt-10 sm:pt-14` to `pt-16 sm:pt-20`.

Copy
- Sleep card detail to: "Rest rhythms, wake windows and what babies often do at this age."
- Development card to title "Development" with detail "What babies often do, at their own pace."
- `TodayCard.tsx` reassurance to: "Write as much or as little as you like. Skipping days is completely fine."
- Optional: shorten the For you "Questions for your midwife, GP or health visitor" card title to "Questions to bring up" so the two lanes visually balance.

## Files that would change in 20B

- `src/pages/firstyear/FirstYearToday.tsx`
- `src/pages/firstyear/MyFirstYear.tsx`
- `src/components/firstyear/journey/FirstYearHeroPanel.tsx`
- `src/components/firstyear/journey/TodayCard.tsx`
- `src/pages/firstyear/MyPregnancyChapter.tsx`

## Files that must not change

Shared header/footer (`MyWeekHeader`, `MyWeekFooter`), `FirstYearMemories.tsx`, all memories and today sub-components, `src/lib/firstYear*`, schema, migrations, RLS, routes, sitemap, public First Year pages.

## Product answers

- `/my-first-year` is the right signed-in home; it is close to busy but not over it. Today, Recently saved and Memories are three note-adjacent blocks in a row.
- Today is still clearly the main action. Memories does not compete.
- Support lanes are balanced; parent recovery has fair presence but sits below three baby-leaning blocks.
- What comes next still makes sense, though its roadmap line is the weakest copy on the page.
- Check-in and Memories feel connected through the "Keep this as a memory" action and the shared quiet tone.

## QA plan for 20B

Typecheck, tests, build; signed-in visual check at 390px and 1440px on all four routes; confirm title clearance under the fixed header; banned wording grep; sitemap unchanged.

## Risks and open questions

- Only one spacing owner per page: if padding is added to `<main>` in `MyFirstYear.tsx`, the hero's own `pt-12` must be removed, otherwise the home drifts too low.
- Copy edits touch support card labels that may be referenced by tests or analytics labels; verify with a grep before editing.

## Recommendation

Phase 20B should proceed, scoped to the spacing and copy fixes above.
