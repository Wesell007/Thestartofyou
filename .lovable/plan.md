# Phase 23B — First Year Age-Aware Guidance Build

Approved scope. No schema, migrations, RLS, routes, sitemap or public article changes.

## What gets built

A single calm "For this stage" section on `/my-first-year`, placed directly after the baby summary card and before the Today card, so Today stays the primary action.

Section contents: kicker "For this stage", an age-based heading, one short orientation sentence, two or three guidance cards, and one quiet parent line with a single onward link.

## Stage logic (derived only, never stored)

Uses `getFirstYearAge` on the first baby's date of birth.

- 0 to 27 days: heading "Your first weeks", month index 0, parent link `/first-year/postpartum-recovery`.
- 28 days to under 12 completed months: heading "Around two months", "Around five months", "Around eleven months" and so on, using that month's guide. Parent link is postpartum recovery while in the early postpartum window, then `/first-year/emotional-wellbeing`.
- 12 completed months or more: heading "Past the first year", clamped to the 12 months guide, showing the approved line "First Year is built around the first twelve months, so some guidance may be less relevant now. You are welcome to carry on." Only two cards: "The 12 months guide" and "Check-ups and questions".
- Missing or unusable date of birth: render nothing at all.

## Cards and links

Under twelve months: "This month's guide" to `/first-year/<month-slug>`, "Feeding right now" to `/first-year/feeding`, "Sleep right now" to `/first-year/sleep`. Over twelve months: `/first-year/12-months` and `/first-year/checkups-and-warning-signs`. All routes already exist.

Card captions reuse `shortVersion` feeding and sleep copy from the existing month data, passed through a banned-word guard. Any string containing milestone, normal, safe, unsafe, tracker, score, progress, diagnosis, symptom checker or risk is replaced with a short local home-page sentence. The public data files are not edited.

Newborn orientation sentence: "Feeding, sleeping and healing can take up a lot of the day just now, and that belongs here."

## Multiples

One shared section, first baby's date of birth, copy phrased for "your babies" where a plural reads better. No switcher, no per-baby cards, no ordering UI.

## Support lanes

Trim the baby lane from five cards to three: Development, Nappies and care, Check-ups. Feeding and sleep move into the new section. The "For you" lane is untouched.

## Files

New: `src/lib/firstYearStageGuidance.ts`, `src/lib/firstYearStageGuidance.test.ts`, `src/components/firstyear/journey/StageGuidanceSection.tsx`.
Edited: `src/pages/firstyear/MyFirstYear.tsx` only.
`SupportLane.tsx` stays unchanged.

Must not change: the four First Year data files, public First Year pages and templates, `src/App.tsx`, `scripts/generate-sitemap.ts`, `public/robots.txt`, `firstYearDates.ts`, `firstYearStage.ts`, memories and check-in code, migrations, types, edge functions.

## QA

Unit tests at 3 days, 27 days, 28 days, 6 weeks, 5 months, 11 months, exactly 12 months, 13 months, 24 months, 30 months, unusable date, multiples with shared and differing dates of birth. Rendered checks for placement, heading order, three-card baby lane, unchanged "For you" lane, banned-word grep on the rendered section, focus rings, no overflow at 390px, desktop at 1440px, no console errors. Then `npx tsgo --noEmit -p tsconfig.json`, targeted tests, `npx vitest run`, `npm run build`, and confirmation that the sitemap output is unchanged.
