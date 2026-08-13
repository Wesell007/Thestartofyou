# Phase 21B — First Year Onboarding Upgrade Build

Approved scope from Phase 21A. No schema, migration, RLS, route, sitemap or robots changes.

## New setup flow at /setup/first-year

Six steps replace the current four:

1. **Welcome** — mode-aware. Transition: continuation, pregnancy chapter kept. Direct: no pregnancy mention, First Year framed as baby guidance, parent recovery, daily notes and memories.
2. **Who has arrived?** — One baby / Twins / Triplets / More than three. Selecting "More than three" reveals a small number control capped at four, with the quiet line: "We can set up four babies at the moment. If you have more, choose four for now and tell us — we will make room." Shared date of birth, optional names, one row per baby, existing 1-4 validation and payload shape unchanged.
3. **Your baby's stage** — read-only, derived from date of birth. Over twelve months shows: "First Year is built around the first twelve months, so some guidance may be less relevant now. You are welcome to carry on." Setup is never blocked.
4. **What your First Year home gives you** — short warm rows: a daily note for your baby's rhythm and how you are doing; memories for the small things you want to keep; guidance that follows your baby's age; support for feeding, sleep, nappies and questions; a place for your recovery too; and, for transition users only, your pregnancy chapter kept.
5. **Your companion** — Cindy stays the default. Uses the existing `profiles.companion_name` / `companion_tone` columns and the existing `SUGGESTED_NAMES`, `validateCompanionName` and `TONE_OPTIONS` helpers. A saved name is prefilled and can simply be kept. When no name is stored, a short introduction appears first: who Cindy is, the gentle plain-language support she gives, her unhurried tone, that she tracks nothing, that she does not read private notes, and that she does not replace a midwife, GP or health visitor. The current session-only companion choices are retired because they store nothing.
6. **Review and start** — summary now includes baby count, names, date of birth, derived stage and companion name. Saving still goes through `save_first_year_journey` and redirects to `/my-first-year`.

## Navigation changes

- `ScrollToTop` keeps forcing the top on PUSH navigation and skips it on POP, so browser back restores the previous scroll position. No route state, anchors or from-params.
- "Back to your First Year journey" moves fully to the bottom on `/my-first-year/today` and `/my-first-year/memories`, with no duplicate top link. `/my-pregnancy-chapter` is left as it is.

## Technical notes

- New pure helper `src/lib/firstYearStage.ts` maps date of birth to newborn (0-27 days), baby (28 days to 11 months), older baby (12-23 months) and toddler (24 months and over), built on the existing `getFirstYearAge`. Stage is derived at read time and never stored.
- New step components `StepStage.tsx` and `StepValue.tsx`; `StepIntro`, `StepBabies`, `StepCompanion` and `StepReview` are updated; `firstYearSetupConstants.ts` gains the new count options and value rows and drops `COMPANION_OPTIONS`.
- Companion name is written to `profiles` alongside the existing journey save, using the same upsert pattern as `/setup`.
- Focus continues to move to each step heading, errors stay announced, and the save error stays a calm sentence.

## Unchanged

Migrations, RLS, generated Supabase types, the `save_first_year_journey` RPC, routes in `App.tsx`, sitemap, robots, public First Year pages, Daily Check-in and Memories logic, and all Phase 20B spacing and copy other than the return-link move.

## Verification

Unit tests for stage boundaries (27/28 days, 11/12 months, 23/24 months), over-twelve-month messaging, the baby count reveal, and companion name validation reuse. Manual passes for direct and transition modes across one baby, twins, triplets and four babies, date-of-birth validation, review summary, save and redirect, scroll restoration on back, forward navigation still starting at the top, and back-link placement. Checked at 390px and 1440px for overflow, heading order, focus movement and console errors. Then typecheck, targeted tests, full `vitest run`, and `npm run build` with sitemap and dist reported.
