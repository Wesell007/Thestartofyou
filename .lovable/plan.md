# Phase 16.5D — Final Live Verification Pass

A throwaway-account live pass through the real `/setup` UI before Phase 16.5D closes. Verification only: no product code changes unless a defect is found, and any fix would be reported back before it is applied.

## Scope

Four disposable accounts, each driven through the real signed-in UI with Playwright, screenshots captured at each step.

1. **Pregnancy, no name** — seed a pregnancy journey, open `/setup`, confirm helper reads "…greet you each week", CTA reads "Continue to my week", save first name, confirm landing on `/my-week`.
2. **First Year, no name** — seed a First Year lifecycle, open `/setup`, confirm helper reads "…in your First Year space", CTA reads "Continue to my First Year", save first name, confirm landing on `/my-first-year`.
3. **TTC, no name** — seed a TTC journey, open `/setup`, confirm helper reads "…in your journey", CTA reads "Continue to my journey", save first name, confirm landing on `/my-ttc-journey`.
4. **Named First Year** — seed First Year lifecycle plus a profile `first_name`, open `/setup`, confirm immediate redirect to `/my-first-year` and explicitly assert it never passes through `/my-week`.

Console errors, page errors and failed network requests are collected for every run.

## Seeding and cleanup

- Accounts created through the normal sign-up path; lifecycle state seeded via the existing save RPCs (`save_pregnancy_journey`, `save_ttc_journey`, `save_first_year_journey`) rather than direct table writes, so the data matches real users.
- After the pass, every disposable account and its rows (journeys, babies, profiles, auth user) are deleted, and the deletion is verified with a follow-up read.
- The live personal account is never touched.

## Technical notes

- Test scripts live under `/tmp/browser/`, not in the project checkout.
- `resolveSetupLifecycle` reads the `journeys.lifecycle` pointer first, with pending/saved pregnancy and saved TTC journeys as fallbacks — the seeding must produce a real pointer so the pass exercises the primary path, not only the fallback.
- No schema, migration, RLS, route guard, auth intent or sitemap changes.

## Report returned

Disposable accounts used, per-scenario pass/fail with observed copy, CTA text and final URL, console/page error result, cleanup confirmation, whether any code change was needed, remaining blockers, and a close/no-close recommendation for Phase 16.5D. The next phase will not be started.
