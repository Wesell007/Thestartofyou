# Phase 16.2B — Final end-to-end save verification (throwaway account)

Verification only. No schema, migration, RLS, RPC, AI, companion memory, dashboard, Postpartum or public page changes. Code is touched only if this run exposes a real UI wiring defect.

## Throwaway account setup

1. Create a disposable signed-in account (email such as `qa-fy-<timestamp>@example.com`), confirmed so it can sign in immediately. The live pregnancy journey account is not used at any point.
2. Seed it directly in the database so the flow starts from a realistic state:
   - `pregnancy_journeys` row with an LMP/due date pair and `status = 'given_birth'`
   - `journeys` row with `lifecycle = 'pregnancy'`
   - one or two small pregnancy memories (a reflection and a week photo/caption row) so post-save readability can be confirmed
3. Record the user id so every post-save check can be scoped to it.

## The UI run

Drive the real interface with Playwright, signing in as the throwaway user — no direct RPC calls.

- Open `/setup/first-year`
- Step 1: Begin
- Step 2: one baby, valid date of birth, name left blank on the first run
- Step 3: pick a companion option
- Step 4: press **Start my First Year journey**

Captured during the run: the outbound `save_first_year_journey` request from the client, the redirect, the toast, all console output, and screenshots at each step.

## Post-save checks

Queried against the throwaway user id:

- `babies` — exactly one row, `birth_order = 1`, `is_primary = true`, `name` is null when left blank
- `first_year_journeys` — one row, `status = 'active'`, `archived_pregnancy_journey_id` populated
- `archived_journeys` — one snapshot, `lifecycle = 'pregnancy'`, `ended_reason = 'transitioned'`
- `journeys` — `lifecycle = 'first_year'`, single row, no duplicate journey
- Pregnancy memories seeded earlier still readable
- Redirect landed on `FIRST_YEAR_POST_SAVE_DESTINATION` and `/my-journey` rendered without error
- Success toast observed
- Zero console errors

## Optional twins run

If the first run is clean, repeat on a second throwaway account choosing Twins with one name filled and one blank, then confirm two `babies` rows with birth orders 1 and 2 and exactly one primary.

## Commands

```text
npx tsgo --noEmit -p tsconfig.json
npx vitest run src/components/firstyear/setup/firstYearSetupSchema.test.ts
npx vitest run
```

## Report returned

Throwaway account used, UI save result, baby row result, first year journey result, archived journey result, lifecycle result, redirect result, toast result, console result, typecheck output, targeted test output, full suite output, whether any code changes were needed, and whether Phase 16.2B can be closed.

Stop after this verification. Phase 16.3 is not started.
