# Phase 18A — Audit of the signed-in First Year home (/my-first-year)

Audit only. No code changed in this phase.

## Current page structure

Order rendered by `MyFirstYear.tsx` (max width 720px, 880px on large screens):

```text
1. FirstYearHeroPanel        "A new chapter" + "Your First Year journey has begun." + CTA to public hub
2. BabySummaryCard           "Your baby" + age sentence + link to month guide
3. TodayCard                 daily note entry point + count saved today
4. SupportLane (baby)        5 links into public First Year guidance
5. SupportLane (you)         4 links into recovery and wellbeing guidance
6. PregnancyChapterKeptCard  only when a kept pregnancy chapter exists
7. WhatComesNextCard         three "coming soon" lines
```

Data loaded: lifecycle pointer with redirects, babies, kept-chapter flag, and a count of notes saved today.

## What is working well

- Route guarding is thorough: TTC, pregnancy, missing journey and missing babies all redirect sensibly.
- Age copy is derived, never stores the date of birth on screen, and handles multiples honestly.
- Two-lane split (baby and you) already gives parent recovery real presence.
- Tone is calm and non-clinical; no banned wording found.
- Kept-chapter card only links out when there is something to open, so no dead ends.

## What feels unclear or off-balance

- Three stacked full-width keepsake cards (hero, baby summary, Today) repeat the same visual weight before any real action appears. The page reads as a stack of cards rather than a home.
- The hero's only action sends the parent away to the public hub, which competes with the Daily Check-in as the page's primary action.
- The Today card sits third, below two informational cards, so the one thing a parent can actually do today is not the first thing they meet.
- Baby summary and hero say the age twice in different words (`heroSupportLine` and `babyAgeSentence` both open with the age).
- Nothing on the home shows what was written recently, so the Daily Check-in feels disconnected from the home once notes exist.
- `WhatComesNextCard` promises unspecified future features and closes the page on a slightly hollow note.
- Desktop at 880px leaves the single column tall and airy; the two support lanes could sit better side by side.

## Copy issues

- Hero: "Your First Year journey has begun." reads like an announcement rather than a welcome back on the tenth visit.
- Hero secondary paragraph is long and abstract ("Take what you need, and leave the rest for another day").
- Baby summary heading is only the baby's name, with the age repeated underneath the hero's age line.
- Today card empty state ("Whenever you have a moment, jot down how the day is going") is warm but does not say what kind of note is possible.
- "What comes next" line "There is nothing to log or track here yet" undersells the Daily Check-in that now exists.
- Support lane intros are fine; the "you" lane intro could name recovery more directly.

## UX issues

- Primary action ambiguity: two pill buttons of similar prominence (hub link, month guide) outrank the Today link.
- After notes exist, the home gives only a count, with no way to see or reach today's writing beyond one link.
- Empty state and saved state look nearly identical apart from one sentence.
- Direct-start users see the same hero as transition users; nothing acknowledges they arrived without a pregnancy chapter.
- Transition users get the kept-chapter card near the bottom, after nine support links.
- Multiples work correctly, but the home never names the babies in the Today card, so the fan-out behaviour is only discovered inside the check-in.

## Mobile and desktop

- Mobile: consistent 40px section gaps make the page long; hero top padding of 80–96px pushes content below the fold.
- Mobile: card paddings are generous and stack to roughly six screens of scrolling.
- Desktop: everything stays one column, so the support lanes' two-column grid is the only wide element and the page looks unbalanced.

## Recommended Phase 18B polish (small, presentation-only)

1. Reorder: hero, baby summary, Today, then baby lane, you lane, kept chapter, what comes next — with the kept-chapter card moved above the support lanes for transition users.
2. Make Today the clear primary action: promote its CTA styling to the filled stage button and demote the hero CTA to a quiet text link.
3. Trim hero copy; remove the duplicated age line so the age lives only in the baby summary.
4. Merge the baby summary and Today into a tighter visual pairing (shared card group or reduced spacing) so the top of the page reads as one "where you are, what you can do" block.
5. Add a small "recently saved" preview: up to three short lines of what was saved today or on the last day written, each linking to `/my-first-year/today`. Text only, no counts, no streaks.
6. Name the babies in the Today card for multiples ("A note for Ada and Bo").
7. Improve empty state copy to hint at what a note can be (something noticed, a rhythm, a question to remember).
8. Rewrite `WhatComesNextCard` so it acknowledges the Daily Check-in exists and softens future promises.
9. Mobile spacing pass: reduce hero top padding and section gaps.
10. Desktop: allow the two support lanes to sit side by side at `lg`.

## Files that would change

- `src/pages/firstyear/MyFirstYear.tsx`
- `src/components/firstyear/journey/FirstYearHeroPanel.tsx`
- `src/components/firstyear/journey/BabySummaryCard.tsx`
- `src/components/firstyear/journey/TodayCard.tsx`
- `src/components/firstyear/journey/SupportLane.tsx`
- `src/components/firstyear/journey/WhatComesNextCard.tsx`
- `src/components/firstyear/journey/PregnancyChapterKeptCard.tsx`
- possibly a new small `RecentlySavedCard.tsx` under the same folder
- copy tests only if wording under test changes

## Files that must not change

- `src/lib/firstYearEntries.ts`, `firstYearEntriesSchema.ts`, `firstYearJourney.ts`, `firstYearDates.ts`
- `src/pages/firstyear/FirstYearToday.tsx` and everything in `src/components/firstyear/today/`
- routes in `src/App.tsx`, sitemap script, robots
- any migration, RLS policy, grant or export code
- `src/integrations/supabase/*`

## QA plan

- Playwright at 390px and 1440px: signed-in home with no notes, with notes saved today, single baby, twins, direct-start user, transition user with kept chapter.
- Keyboard pass: tab order reaches Today CTA first among actions; visible focus on every link.
- Banned wording grep across changed files.
- `npx tsgo --noEmit -p tsconfig.json`, targeted Vitest, `npm run build`.

## Risks and open questions

- The "recently saved" preview is the only item that touches note content on the home. It reads existing data through `getRecentEntries`, adds no schema, but it is the one change that could tip the page towards feeling like a dashboard. It can be dropped if you prefer.
- Should the hero greet returning parents differently from first visit, or stay constant? Constant is simpler and avoids state.

## Recommendation

Proceed with a small Phase 18B build limited to the ten items above.
