# Journey Setup Experience — TTC, Pregnancy, First Year

## Audit findings (confirmed in the repository)

**Trying to Conceive** — `/setup/trying-to-conceive` is public (it is listed as protected for return-to purposes but is not wrapped in a protected route). It is a single long form validated by a Zod schema, saving via `commitPendingTTCJourneyToDB`. Supported fields: last period date, cycle length, period length, cycle regularity, actively trying, ovulation tests, symptom tracking, support status, IVF consideration. Signed out it stashes only dates locally and sends the person to sign in with a return route; signed in it saves and lands on `/my-ttc-journey`. An active pregnancy journey blocks setup.

**Pregnancy** — `/due-date-calculator` is a public, indexed page using the shared calculator form (last period, conception, IVF transfer, ultrasound). It navigates to `/due-date-results?lmp=<timestamp>`, where the result panel offers saving: signed out it stores the pending date locally and sends to sign in; signed in it saves and lands on `/my-week`.

**First Year** — `/setup/first-year` is wrapped in the protected route, so a signed-out visitor is sent to sign in before seeing anything. This is the main inconsistency. Behind sign-in there is already a six-step flow: intro, babies, stage, value, companion, review. Supported fields: baby count (one to four), one shared date of birth, optional baby name per baby, plus optional companion name and tone. Saving goes through the existing `save_first_year_journey` function and lands on `/my-first-year`. Baby age is derived by existing date logic.

**No backend gap.** Everything needed for a pre-sign-in First Year setup already exists. No new database fields, migrations or policy changes are required.

**One constraint worth stating up front:** TTC deliberately keeps only dates on the device before sign-in, so the more personal answers reset after the sign-in round trip. You chose to keep that behaviour, so the flow will say plainly that a couple of answers need re-confirming after signing in, rather than widening what is stored.

## What gets built

### Shared setup design language
A small set of reusable setup pieces: a two-column editorial shell (form on one side, stage photography, "what this shapes" copy and a static product glimpse on the other), a restrained step indicator ("1 of 3" with named steps), a paper-like form surface, fine rules and subtle botanicals. On mobile everything collapses to one column, form first, with contextual material beneath and comfortable tap targets. Existing tokens, type and photography only.

### Trying to Conceive
Same page, same questions, same validation, same save. Reorganised into three steps: Your cycle; How you're trying; Ready to save, with a summary and a static My TTC Journey glimpse. Signed-out ends with "Continue, sign in to save"; signed in saves directly with no extra sign-in. The existing pregnancy-active and error states are preserved.

### Pregnancy
New route `/setup/pregnancy` (not indexed), reusing the existing calculator form and date logic untouched. Three steps: choose a method; enter dates; your starting point, showing the estimated due date, current week and trimester from existing logic plus a static My Week preview and a clear note that this is an estimate, not a medical confirmation. Save reuses the existing pending-stash and save functions. `/due-date-calculator` stays exactly as it is for search. Journey-led entry points (Start Your Journey page, the no-active-journey fallback and the pregnancy setup calls to action) point at `/setup/pregnancy`; the calculator's own links are unchanged. The IVF transfer method keeps its existing timeline destination.

### First Year
Route becomes public, with the same guards applied inside the page rather than at the door. Three steps: about your baby (count, date of birth, optional names, using existing validation); what your First Year space will focus on (explanatory only, no new preferences); ready to save, showing baby's current age derived by existing logic and a static Today glimpse. Signed out, answers are held in the same style of pending device storage the pregnancy flow already uses, and the person signs in to save; nothing is written to the account before an authorised save. Signed in, the flow continues straight into the existing save. The existing companion step stays available after sign-in only, since it writes to the profile.

### Sign-in handoff
All three use the existing intent and return-to mechanism, so people come back to the same setup route and resume. Signed-in people are never asked to sign in again. The sign-in page gains a short contextual line derived from the existing return route only ("Sign in to save your First Year journey"). No setup answers in URLs, analytics or logs.

## Technical notes

- New: `src/pages/setup/PregnancySetup.tsx`, setup shell and step-indicator components under `src/components/setup/`, a First Year pending-journey helper mirroring `savedJourney.ts`.
- Changed: `SetupTTC.tsx` (presentation and step composition), `FirstYearSetup.tsx` (public entry, pre-auth steps), `App.tsx` routes, sitemap core group, journey-led pregnancy links, `Auth` contextual line.
- Unchanged: `pregnancyDates.ts`, `ttcDerived.ts`, `firstYearDates.ts`, all schemas, `save_first_year_journey`, save/commit helpers, lifecycle model, database, RLS, AI, journal, memory, voice.
- Previews reuse the existing static preview compositions; no protected components, no private reads.

## Tests and validation

Baseline recorded first (currently 113 files / 1277 tests passing; lint one pre-existing error and 10 warnings). Then focused tests for: TTC inputs, validation and save unchanged and sign-in continuation preserved; pregnancy calculation, methods and result unchanged with the setup handoff intact; First Year setup visible before sign-in, age derived by existing logic, nothing persisted to the account before authorised save, post-sign-in continuation works; plus no new lifecycle states, no sensitive data in URLs, no private reads for previews, and no repeat sign-in for signed-in people.

Full suite, typecheck twice, lint against baseline, production build, and runtime QA of all three at about 1440px and 390px. No deployment. Finishes with the 30-point report.
