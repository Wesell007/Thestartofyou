# Phase 16.3B — Final Verification Report

Verification was run in plan mode, so it is limited to read-only inspection plus non-mutating checks (typecheck, tests, lint). Two requested items were **not** run because they change state: the production build (it rewrites `public/sitemap.xml` and `dist/`) and the throwaway-account Playwright transition pass (it creates and deletes real accounts and database rows). Approve this report and I will run both immediately.

## Files changed (Phase 16.3B)

- `src/pages/firstyear/MyFirstYear.tsx` (new)
- `src/components/firstyear/journey/FirstYearHeroPanel.tsx` (new)
- `src/components/firstyear/journey/BabySummaryCard.tsx` (new)
- `src/components/firstyear/journey/SupportLane.tsx` (new)
- `src/components/firstyear/journey/PregnancyChapterKeptCard.tsx` (new)
- `src/components/firstyear/journey/WhatComesNextCard.tsx` (new)
- `src/lib/firstYearCopy.ts` (new)
- `src/lib/firstYearCopy.test.ts` (new)
- `src/App.tsx` (route registration)
- `src/lib/authIntent.ts` (protected prefix + post-login destination)
- `src/pages/MyJourney.tsx` (First Year bounce fix)
- `src/components/firstyear/setup/firstYearSetupConstants.ts` (post-save destination)

## Route and auth

Verified in code:

- `/my-first-year` is wrapped in `ProtectedRoute` (`src/App.tsx:308`) — pass.
- `/my-first-year` is in `PROTECTED_ROUTE_PREFIXES` (`src/lib/authIntent.ts:28`), so signed-out deep links preserve the return path via the existing auth-intent mechanism — pass.
- Signed-in `first_year` with journey + at least one baby renders the landing page — pass.
- Missing journey row → `/setup/first-year` — pass (`!journey` branch).
- Zero babies → `/setup/first-year` — pass (`babies.length === 0`).
- Pregnancy `given_birth` (via `canEnterFirstYearSetup`) → `/setup/first-year` — pass.
- Pregnancy active → `/my-week` — pass.
- Pregnancy sensitive states fail `canEnterFirstYearSetup` and are sent to `/my-week`, never the landing page — pass.
- TTC pointer → `/my-ttc-journey` — pass.
- No journey pointer (and any unknown lifecycle) → `/due-date-calculator` — pass.
- Errors surface the copy "We couldn't open your First Year journey just now." with a retry; no raw database messages — pass.

## Destination and bounce

- `FIRST_YEAR_POST_SAVE_DESTINATION === "/my-first-year"` — pass.
- `/setup/first-year` completion redirects via that constant — pass (code path unchanged from 16.2B, only the constant value changed).
- `src/pages/MyJourney.tsx:136` now sends `first_year` users to `/my-first-year` instead of `/due-date-calculator` — pass.
- Pregnancy and TTC branches in `MyJourney.tsx` untouched — pass.
- `resolvePostLoginDestination` returns `/my-first-year` for `first_year` (`authIntent.ts:95`), with pregnancy and TTC branches unchanged; `authIntent.test.ts` passes — pass.

## Public route links

For baby lane hrefs are exactly `/first-year/feeding`, `/first-year/sleep`, `/first-year/development`, `/first-year/care-and-safety`, `/first-year/checkups-and-warning-signs` — all registered in `App.tsx:258-262, 265` — pass.

For you lane hrefs: `/first-year/postpartum-recovery`, `/first-year/body-and-hormones`, `/first-year/emotional-wellbeing`, `/first-year/checkups-and-warning-signs` — all registered (`App.tsx:262-265`) — pass.

## Data display (helper-level, 13 tests)

Covered and passing: single baby named / unnamed, twins both named, twins one blank, twins both blank ("your two babies"), triplets, four babies, day-zero ("here today"), day/week/month boundaries, and mixed dates producing per-baby ages rather than a false shared-age sentence. Hero renders only `heroSupportLine`, so no exact date of birth appears — pass. The month guide link uses `getFirstYearAge(...).firstYearMonthIndex` — pass. Kept card renders warmer copy when `archived_pregnancy_journey_id` exists and a still-valid fallback when it does not — pass.

Minor observation (not a blocker): `monthPageSlug` clamps at index 11, so a baby at exactly 12 months links to `/first-year/11-months` even though `/first-year/12-months` exists. Worth a one-line change in a later phase.

## Visual and accessibility QA

Static review against the `/first-year` and `/postpartum` conventions: page shell and baby lane use `--stage-firstyear*`, the parent lane uses `--stage-recovery*`, the kept card uses `--stage-postpartum-accent`, and no pregnancy tokens are used by default — pass. Headings run h1 (hero) then h2 per section — pass. Lanes are `<ul>/<li>` of full-card `Link`s with visible text names, `focus-visible:ring-2` states, and a two-column grid that collapses to one column — pass on structure. Rendered 375px/desktop screenshots, overflow, layout shift and console checks require the signed-in Playwright pass, which was not run in plan mode.

## Regression QA

No files outside the list above were touched, so `/setup/first-year`, `/my-week`, pregnancy `/my-journey`, Kept Chapter, Account Settings export, TTC journey, public `/first-year`, public `/postpartum`, AI Ask and the pregnancy route guards are unchanged by inspection, and the full suite passes.

## Commands

`npx tsgo --noEmit -p tsconfig.json` — exit 0, no output.

`npx vitest run src/lib/firstYearCopy.test.ts`

```text
 ✓ src/lib/firstYearCopy.test.ts (13 tests) 12ms
 Test Files  1 passed (1)
      Tests  13 passed (13)
```

`npx vitest run`

```text
 Test Files  16 passed (16)
      Tests  99 passed (99)
   Duration  8.93s
```

Lint (`npx eslint` over the changed files) — exit 0, no findings.

Build — not run (state-changing in plan mode).

## Remaining blockers

None found in code. Two verification items are outstanding rather than failing: the throwaway-account transition pass and the production build.

## Close decision

Phase 16.3B is verified at code, type, lint and unit-test level and can be closed once the throwaway Playwright pass and the build are run. Approve and I will run exactly those two, return their output, clean up the throwaway account, and stop. No Phase 16.4 work.
