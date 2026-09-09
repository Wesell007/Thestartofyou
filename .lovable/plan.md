# Journey Setup Experience — TTC, Pregnancy, First Year

## Audit findings (confirmed in the repository)

**Trying to Conceive** — `/setup/trying-to-conceive` is public (it is listed as a protected return-to target but is not wrapped in the protected route). One long form, Zod validated, saved by `commitPendingTTCJourneyToDB`. Supported fields: last period date, cycle length, period length, cycle regularity, actively trying, ovulation tests, symptom tracking, support status, IVF consideration. Signed out it keeps only the three cycle-date values on the device and sends the person to sign in with a return route; signed in it saves and lands on `/my-ttc-journey`. An active pregnancy journey blocks setup. The page is already non-indexed.

**Pregnancy** — `/due-date-calculator` is the public indexed utility using the shared calculator form (last period, conception, IVF transfer, ultrasound) and `pregnancyDates.ts`. It navigates to `/due-date-results?lmp=<timestamp>`, where the result panel saves: signed out it stores the pending date and sends to sign in; signed in it saves and lands on `/my-week`. `/due-date-results` is already non-indexed.

**First Year** — `/setup/first-year` is wrapped in the protected route, so signed-out visitors hit sign-in before seeing anything. Behind it is a six-step flow (intro, babies, stage, value, companion, review). Supported fields: baby count one to four, one shared date of birth, optional name per baby, plus optional companion name and tone written to the profile. Saving uses `save_first_year_journey` and lands on `/my-first-year`. Age comes from existing date logic.

**Existing First Year guard behaviour** (in `resolveFirstYearSetupGuard`): signed out sends to sign-in; First Year goes to `/my-first-year`; TTC goes to `/my-ttc-journey`; active pregnancy goes to `/my-week`; pregnancy marked as given birth renders transition mode; other pregnancy statuses go to `/my-journey`; no journey renders direct mode. Every branch except "signed out" is preserved exactly; only the signed-out branch changes, to render the pre-save setup instead of bouncing to sign-in. The save function repeats these guards server-side.

**No backend gap.** No new fields, migrations or policy changes are needed.

**Reportable finding on pending storage:** the existing pregnancy pending journey is written to device storage with no expiry and is only removed on successful save. The TTC pending record carries a saved-at timestamp but no expiry either. So the pattern as it stands is indefinite retention until save. The new First Year pending record will follow the same bounded, single-purpose pattern but with an explicit age limit, so it self-clears rather than lingering indefinitely.

## What gets built

### Shared setup design language
Reusable setup pieces: a two-column desktop shell (form one side; stage photography, "where you are", "why we're asking", "what this shapes" and a static product glimpse the other), a restrained editorial step indicator, paper-like form surfaces, fine rules, subtle botanicals, terracotta actions. Mobile is one column, form first, progress visible, supporting material below the form, no shrunken split, no launcher collision.

### Trying to Conceive
Same route, same questions, same validation, same save, same pregnancy-active and error states. Reorganised into: Your cycle; How you're trying; Ready to save, with a summary and a static My TTC Journey glimpse.

Privacy boundary unchanged: nothing sensitive is added to device storage, URLs, analytics or logs. Before sign-in the page says plainly which details carry through and that the remaining personal answers are asked again after signing in, naming the actual count. After signing in the resumed step is framed as "Finish shaping your TTC journey" and only asks for the answers that were deliberately not carried: cycle regularity, actively trying, ovulation tests, symptom tracking, support status and IVF consideration. The three cycle values that were preserved are not asked again.

### Pregnancy
New route `/setup/pregnancy`, non-indexed, with no sitemap entry and no search-oriented metadata. It reuses the existing calculator input components and `pregnancyDates.ts` directly, so there is exactly one calculation implementation and no fork. Three steps: choose a method; enter your dates; your starting point, showing estimated due date, current week and trimester from existing logic, the line that this is where the journey begins, a static My Week glimpse and the existing estimate wording.

The setup flow does not route through `/due-date-results` and puts no dates or derived values in the URL: the result is held in local component state and, where sign-in is needed, in the existing approved pending-journey mechanism. Signed out it goes through sign-in continuation and then the authorised save; signed in it saves directly; both land on `/my-week`. IVF transfer keeps its existing timeline behaviour. `/due-date-calculator` and its existing public results behaviour are untouched apart from any small shared-component refactor strictly needed to reuse the same calculation safely.

Only pregnancy-committed entry points move to `/setup/pregnancy` (for example "Start my Pregnancy journey" on the Start Your Journey page). Generic entry points are unchanged: signed out generic start and signed in with no active journey both stay on `/start-your-journey`, and the TTC, Pregnancy and First Year signed-in destinations stay exactly as they are. The public calculator's own links stay as they are.

### Setup route SEO boundary
`/setup/trying-to-conceive`, `/setup/pregnancy` and `/setup/first-year` are all non-indexed and none appears in the sitemap, including after First Year becomes viewable signed out. `/due-date-calculator` remains the indexed public utility and `/start-your-journey` keeps its existing public treatment. No sitemap changes are made in this phase.


### First Year

The protected wrapper is removed and every existing signed-in guard branch is applied inside the page unchanged, so the public route cannot become a way to create a conflicting journey. The signed-out steps are: about your baby (count, shared date of birth, optional names, existing validation); what your First Year space will support (explanatory only, no new preference fields); ready to save, with current age from existing date logic and a static Today glimpse.

The existing authenticated steps are kept, not replaced. After signing in, the person returns to `/setup/first-year`, the valid pending minimum is restored, and the existing optional companion name and tone step and the existing review step run before the authorised save, exactly as they do today, including the option not to name the companion. Signed-in people go through the existing guards, setup, companion and review sequence with no extra sign-in. No profile preference is written while signed out and no second preference implementation is created.

Pre-auth pending state holds only baby count, the shared date of birth, any names actually typed, and a creation timestamp. Nothing else: no companion name or tone, no notes, memories, care events, feeding, sleep, development or journal content. It never enters URLs, query strings, analytics, logs or AI, and is never written to the account before an authorised save. It expires after exactly 24 hours: any read of an older record clears it and reports no pending setup, and reading never extends the expiry. It is also cleared immediately on a successful First Year save and on explicit cancel or reset. The existing pregnancy and TTC pending retention behaviour is left untouched in this phase and noted as technical debt.

### Sign-in handoff
All three use the existing intent and return-to mechanism and resume on the same route. Signed-in people are never asked to sign in again. The sign-in page gains a short line derived only from the safe return route ("Sign in to save your First Year journey" and equivalents); if that cannot be done safely with existing state it stays generic and is reported.

## Technical notes

- New: `src/pages/setup/PregnancySetup.tsx`, setup shell and step-indicator components under `src/components/setup/`, a bounded First Year pending helper mirroring the existing pending-journey pattern.
- Changed: `SetupTTC.tsx` (composition and copy only), `FirstYearSetup.tsx` (public entry, pre-auth steps, in-page guards), `App.tsx` routes, journey-led pregnancy links, the auth contextual line.
- Unchanged: `pregnancyDates.ts`, `ttcDerived.ts`, `firstYearDates.ts`, all schemas and validation, `save_first_year_journey`, save and commit helpers, lifecycle model and authority, database, RLS, AI, journal, memory, voice, sitemap.
- Previews reuse existing static preview compositions; no protected components, no private reads.

## Tests and validation

Confirm the exact baseline first (113 files, 1277 tests, 1277 passing, 0 timeouts; lint 1 existing error and 10 warnings) and stop with the precise difference if it has drifted.

Focused tests: TTC inputs, validation and save unchanged, privacy boundary intact, only the non-carried answers re-asked after sign-in; pregnancy calculation, methods and result unchanged, setup handoff intact, route non-indexed and absent from the sitemap; First Year minimum setup visible signed out, age derived by existing logic, pending fields limited to the allowed list, nothing persisted to the account before authorised save, every existing guard branch preserved, post-sign-in continuation works. Plus: no new lifecycle states, no sensitive data in URLs, no private reads for previews, no repeat sign-in for signed-in people.

Then full suite, typecheck twice, lint against baseline with zero new findings, production build, and runtime QA of all six combinations at about 1440px and 390px. No deployment. Ends with the 30-point report plus the additional statements requested.
