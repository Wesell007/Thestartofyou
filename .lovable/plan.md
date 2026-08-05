# Phase 16.3B — Signed-in First Year Landing Surface (build)

Build the protected `/my-first-year` landing surface and repoint the post-transition destination. No schema, migrations, RPCs, RLS, AI, tracking or Postpartum dashboard work.

## Route and auth

- New page `src/pages/firstyear/MyFirstYear.tsx`, lazy-registered in `src/App.tsx` at `/my-first-year` inside `ProtectedRoute`, beside the other signed-in journey routes.
- `SeoHead` with `noindex`. No sitemap or robots changes.
- Add `"/my-first-year"` to `PROTECTED_ROUTE_PREFIXES` in `src/lib/authIntent.ts` so signed-out deep links go to `/auth?intent=return_to_route&return_to=%2Fmy-first-year` and return afterwards.
- `resolvePostLoginDestination` gains a lifecycle check before the pregnancy branch: pointer `first_year` returns `/my-first-year`. Pregnancy and TTC paths unchanged.

Guards on the page, pointer read first, calm loading and retry states, never a raw database message:

| State | Result |
| --- | --- |
| lifecycle `first_year` + journey row + at least one baby | Render |
| lifecycle `first_year`, missing row or no babies | `/setup/first-year` |
| lifecycle `pregnancy`, status `given_birth` | `/setup/first-year` |
| lifecycle `pregnancy`, any other status | `/my-week` |
| lifecycle `ttc` | `/my-ttc-journey` |
| no pointer | `/due-date-calculator` |

## Data access

Existing 16.1B foundation only, unchanged: `getActiveFirstYearJourney`, `getBabies`, `getPrimaryBaby` from `src/lib/firstYearJourney.ts` and `getFirstYearAge` from `src/lib/firstYearDates.ts`. The page reads the user id, the pointer, the journey row, all babies in birth order, the primary baby, each baby's own derived age, and `archived_pregnancy_journey_id`.

## Sections

1. **Welcome hero** — "Your First Year journey has begun." plus the derived age line and "You are in a new chapter too." No date of birth shown.
2. **Baby summary card** — name or fallback wording, derived age, multiples-aware, quiet link to the matching public month guide via `firstYearMonthIndex`.
3. **For baby lane** — feeding, sleep, development and milestones, nappies and care, check-ups and questions, linking to `/first-year/feeding`, `/sleep`, `/development`, `/care-and-safety`, `/checkups-and-warning-signs`.
4. **For you lane** — recovery after birth, body and hormones, emotional wellbeing, questions for your midwife, GP or health visitor, and rest and support, using existing public recovery routes only.
5. **Pregnancy chapter kept** — warm reassurance that the pregnancy chapter is kept, memories stay readable and kept weeks remain open. No archive or lifecycle language.
6. **What comes next** — subtle: more support coming, nothing is tracked yet, Cindy is still here and is not using anything private.

## Multiples copy helper

New `src/lib/firstYearCopy.ts` plus `src/lib/firstYearCopy.test.ts`, covering one baby with and without a name, twins with both, one or no names, triplets and four babies, plus day, week and month age boundaries. Each baby's own date of birth is used, so mixed ages never produce a false shared-age sentence. Also provides the month guide slug, path and label.

## Destination and bounce fix

- `FIRST_YEAR_POST_SAVE_DESTINATION` in `firstYearSetupConstants.ts` moves from `/my-journey` to `/my-first-year`, in this same phase.
- `src/pages/MyJourney.tsx`: before the existing no-active-pregnancy fallback to `/due-date-calculator`, check the pointer and redirect `first_year` users to `/my-first-year`. Narrow change only; pregnancy and TTC behaviour untouched.

## Visual direction

First Year tokens for the page shell and the baby lane, recovery and postpartum tokens for the parent lane, no pregnancy tokens. Mobile-first, `font-serif` display headings, `font-sans` interface text, existing card geometry, pill CTAs, accessible card links, visible focus states, no layout shift.

## Files changed

`src/pages/firstyear/MyFirstYear.tsx`, `src/components/firstyear/journey/*`, `src/lib/firstYearCopy.ts` and its test, `src/App.tsx`, `src/lib/authIntent.ts`, `src/pages/MyJourney.tsx`, `src/components/firstyear/setup/firstYearSetupConstants.ts`.

Must not change: migrations, schema, RPCs, RLS, `src/integrations/supabase/*`, companion context and Ask AI, edge functions, public First Year and Postpartum pages, TTC surfaces, sitemap script, robots, realism assets and resolver, pregnancy toolkit, memory storage.

## QA

Route and auth states above, data display across one to four babies and age boundaries, month link correctness, archived pregnancy card present and absent, visual comparison against `/first-year` and `/postpartum` at 375px and desktop, regression across `/setup/first-year`, `/my-week`, `/my-journey`, Kept Chapter, Account Settings, TTC, public hubs and AI Ask, and a throwaway-account Playwright transition run ending on `/my-first-year` with cleanup afterwards.

Commands: `npx tsgo --noEmit -p tsconfig.json`, `npx vitest run src/lib/firstYearCopy.test.ts`, `npx vitest run`, lint and build.
