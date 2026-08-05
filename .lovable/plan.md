# Phase 16.2B — Birth to First Year Transition Build

Build the first user-facing transition from Pregnancy into the First Year journey. No schema, migration, RPC, AI or public content changes.

## Route and auth

- New page `src/pages/setup/FirstYearSetup.tsx`, registered in `src/App.tsx` as a lazy protected route at `/setup/first-year`.
- Add `/setup/first-year` to `PROTECTED_ROUTE_PREFIXES` in `src/lib/authIntent.ts` so signed out users return to the flow after sign in.
- `SeoHead` with `noindex`. No sitemap or robots changes.

## Status guard

On mount the page reads the `journeys` pointer and the pregnancy status, then applies `canEnterFirstYearSetup(status)`:

- lifecycle already `first_year` → redirect to `FIRST_YEAR_POST_SAVE_DESTINATION`
- `given_birth` → flow renders
- `active` → silent redirect to `/my-week`
- `pregnancy_loss`, `no_longer_pregnant`, `paused`, or no journey → silent redirect to `/my-journey`

No explanatory "you cannot access this" block, no baby age copy in sensitive states. The RPC guard stays untouched.

Note: `getActivePregnancyJourney` returns null once the lifecycle is no longer `pregnancy`, so the page reads the `journeys` pointer first to tell "already in First Year" apart from "no journey".

## Entry points

- `src/components/myweek/SectionPregnancyComplete.tsx`: takes a `status` prop from `MyWeek`, and when `canEnterFirstYearSetup(status)` passes the primary CTA becomes "Start your First Year journey" to `/setup/first-year`, replacing the generic public First Year link.
- `src/pages/MyJourney.tsx`: in the existing `given_birth` chip row, the quiet link points to `/setup/first-year` with the same guard. No second panel.
- Nothing added to Account Settings, `ChangeStatusDialog`, Kept Chapter or the signed in nav. No redirect after choosing "I've given birth".

## Four step flow

One route, one step visible at a time, quiet "Step 2 of 4" line, no progress bar. Focus moves to the step heading on each change. Back, Edit and Cancel always available; the container reserves height so there is no layout shift.

1. **Gentle intro.** "Your pregnancy chapter is kept. Your First Year can begin when you are ready." plus "Everything you saved stays exactly where it is." Actions: Begin, and Not right now which returns to `/my-week`.
2. **Baby or babies.** Radio group: One baby, Twins, Triplets, Four babies, plus a quiet "I'll set up one baby for now". One shared date of birth, required. Optional name per baby, labelled First baby, Second baby, Third baby, Fourth baby. Birth order is row position, first row is primary. Nothing asked about birth story, birth type, feeding, mental health or trauma.
3. **Companion choice.** "Cindy is still here. Same companion, new chapter." Options: Continue gently, Personalise Cindy with my pregnancy journey, Decide later. Session state only. The Personalise option says plainly that nothing is shared yet, that Cindy will not use private pregnancy memories yet, and that a later step will let the user choose exactly what she can use.
4. **Review and start.** Read only summary of baby count, date of birth, names and companion choice, with Edit links to each step. States that the pregnancy chapter is kept and saved memories stay readable. Primary action "Start my First Year journey" calls `saveFirstYearJourney`, then redirects to `FIRST_YEAR_POST_SAVE_DESTINATION` with a brief success toast.

## Validation

Pure logic in `src/components/firstyear/setup/firstYearSetupSchema.ts`: required and valid date of birth, future dates blocked client side, sensible earliest date matching the existing database trigger, 60 character name limit, one to four babies only. Errors are gentle inline sentences tied to fields with `aria-describedby`; RPC failures map to a calm message, never a raw Postgres error.

## Visual tokens

First Year frame: `--stage-firstyear` background, `--stage-firstyear-accent` kickers, `--stage-firstyear-deep` headings. For baby content on `--stage-firstyear-soft`. For you content on `--stage-recovery-soft` with `--stage-recovery-accent` and `--stage-recovery-deep`. `--stage-postpartum-accent` reserved for any recovery link. No pregnancy stage tokens. Existing pill CTAs, card styling, `font-serif` display and 15px body text.

## Files changed

- `src/pages/setup/FirstYearSetup.tsx` (new)
- `src/components/firstyear/setup/firstYearSetupSchema.ts` (new, includes `FIRST_YEAR_POST_SAVE_DESTINATION`)
- `src/components/firstyear/setup/StepIntro.tsx`, `StepBabies.tsx`, `StepCompanion.tsx`, `StepReview.tsx` (new)
- `src/components/firstyear/setup/firstYearSetupSchema.test.ts` (new)
- `src/App.tsx`, `src/lib/authIntent.ts`
- `src/components/myweek/SectionPregnancyComplete.tsx`, `src/pages/MyWeek.tsx` (pass status prop), `src/pages/MyJourney.tsx`

Unchanged: migrations, schema, RLS, RPC logic, Supabase client and types, `companionContext.ts`, `SectionAskAI.tsx`, `ai-search`, toolkit, memory components, realism assets and resolver, sitemap script, robots, public First Year and Postpartum pages. `src/lib/firstYearJourney.ts` and `firstYearDates.ts` stay as built in 16.1B.

## Verification

- `npx tsgo --noEmit -p tsconfig.json`
- Unit tests for validation, count changes and the guard predicate, plus the existing suite
- Live QA with Playwright across sensitive states, multiples one to four, handover records (`archived_journeys` reason `transitioned`, `archived_pregnancy_journey_id` set, lifecycle flipped, no duplicate journey), accessibility at 375px and desktop, and regression on `/my-week`, `/my-journey`, Kept Chapter, Account Settings, toolkit, AI Ask and the public hubs
