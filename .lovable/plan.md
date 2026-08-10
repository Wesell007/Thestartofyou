# Phase 18B — First Year signed-in home polish

Presentation, copy and layout only. No schema, routes, guards, exports or data-model changes.

## Page order

`MyFirstYear.tsx` renders:

```text
hero
baby summary
Today card  (primary action)
recently saved preview   (only when notes exist)
kept pregnancy chapter   (transition users only)
baby guidance lane
parent recovery lane     (side by side with baby lane at lg)
what comes next
```

## Changes per file

**FirstYearHeroPanel.tsx**
- Heading becomes "Your First Year home"; support line "A gentle place for your baby, your recovery, and the notes you want to remember" (plural variant for multiples).
- Drop `heroSupportLine` usage so the age appears only in the baby summary. `firstYearCopy.ts` itself stays unchanged.
- Filled hub button becomes a quiet underlined text link, "Browse the First Year guide".
- Top padding reduced from `pt-20 sm:pt-24` to `pt-12 sm:pt-16`.

**BabySummaryCard.tsx**
- Softer surface (tinted stage wash, thinner border) instead of the keepsake surface, so the Today card carries more weight.
- Reduced padding and bottom spacing so it visually pairs with the Today card.
- Month-guide pill becomes a quiet text link with a 44px tap target.

**TodayCard.tsx**
- Keeps the keepsake surface; CTA becomes the filled stage button (`--stage-firstyear-deep`), making it the page's primary action.
- Accepts a `subject` string so multiples read "A note for Ada and Bo".
- Empty state names what can be saved: something noticed, a rhythm, a recovery note, a question to remember.
- Existing "nothing tracked, scored or compared" reassurance retained.

**RecentlySavedCard.tsx** (new, small)
- Shows up to three lines: kind label plus a truncated note snippet (~90 chars).
- Uses today's notes; falls back to the most recent day that has notes, with a quiet "Saved on Friday" style label.
- Whole card links through to `/my-first-year/today`. No counts, no dates arithmetic, no streaks, no feed styling.
- Renders nothing when there are no notes.

**PregnancyChapterKeptCard.tsx**
- Unchanged in content; moved above the support lanes by the page.

**SupportLane.tsx**
- Accepts an optional class so the page can place the two lanes in a `lg:grid-cols-2` container; cards inside switch to a single column when the lane is half width.
- Parent lane intro names recovery directly: "Your recovery matters as much as your baby's. This side of the journey is yours."

**MyFirstYear.tsx**
- Reordered sections as above.
- Reads recent notes with the existing `getRecentEntries` helper (no new query code in libs) alongside the existing `countEntriesForDate` call, and passes a small derived preview list down.
- Computes the multiples subject with the existing `describeBabies` helper.
- Section spacing pass: tighter gaps on mobile, lanes side by side at `lg`.

**WhatComesNextCard.tsx**
- Rewritten: acknowledges the Daily Check-in exists, removes "there is nothing to log or track here yet", keeps future additions soft.

## Files that will not change

`src/lib/firstYearEntries.ts`, `firstYearEntriesSchema.ts`, `firstYearJourney.ts`, `firstYearDates.ts`, `firstYearCopy.ts`, `FirstYearToday.tsx`, everything in `src/components/firstyear/today/`, `App.tsx`, `authIntent.ts`, sitemap, robots, migrations, RLS, grants, export code, generated types, public First Year pages.

## QA

- Playwright at 390px and 1440px: single baby, twins, transition user with kept chapter, direct-start user, no-notes and notes-saved states.
- Tab order reaches the Today CTA before the support links; visible focus everywhere.
- Banned wording grep across changed files.
- `npx tsgo --noEmit -p tsconfig.json`, `npx vitest run`, `npm run build`, sitemap and dist check.

## Open question

If the recently saved preview makes the page read as a dashboard once rendered, it is dropped and the Today card keeps a single summary line instead.
