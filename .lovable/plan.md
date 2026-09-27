# Phase 41B.1A-R — Isolated remix and live structural baseline

The pending 41B.1A migration is not applied anywhere. 41B.1A stays IMPLEMENTATION BUILT / APPLICATION BLOCKED, and 41B.1B stays NOT STARTED.

## 1. Snapshot wording resolved
A live catalogue snapshot already exists at `docs/strategy/phase41b1a-live-catalogue-snapshot.md`. It covers the public schema: 280 columns, 5 enums, 22 functions, 35 triggers, 32 tables with RLS flags, 124 policies, 138 constraints, 84 indexes and 32 grant ACLs. The earlier request for permission was redundant.
- LIVE STRUCTURAL SNAPSHOT = ALREADY EXISTS AND REUSED
- I will re-read the file to confirm it holds catalogue metadata only and no customer rows. No duplicate baseline gets created, and no new live queries are run.
- CUSTOMER ROWS READ FROM LIVE = 0

## 2. Creating the remix (user action)
I have no tool that creates a remix, so you need to do this step:
- Open the project name (top left), then Settings, then "Remix this project". Name it "41B.1A staging rehearsal".
- A remix is a separate project. I can't query its database from this project, so the checks below run in the remix's own chat. I will give you the exact brief to paste there.

## 3. In the remix (brief I will prepare, run there)
1. Record the remix backend reference and compare it with live (`wogepxfipdipogyogced`). If they match: STOP and report STAGING ISOLATED = NO.
2. Confirm zero rows in the application tables. The remix is empty, so this reads no customer data.
3. Confirm its schema was built only from the committed `supabase/migrations/`. The pending file is not moved or applied, and nothing is seeded.
4. Capture the same catalogue snapshot using the same queries and format as the live file, then save it as `docs/strategy/phase41b1a-remix-catalogue-snapshot.md`.

## 4. Comparison (back in this project)
- Read the remix snapshot through a read-only project checkout and compare it with the live file area by area: schema, RLS, functions/triggers, constraints/indexes and grants/ownership.
- Label every difference MATERIAL PARITY DIFFERENCE or EXPECTED ENVIRONMENT DIFFERENCE, using the brief's definitions. Nothing is repaired automatically.
- Return the full section 6 output block and the complete difference list, followed by the section 7 status: production migration permitted = NO, backup verification PENDING USER, support question OPEN.

## 5. Documentation
- In `docs/strategy/phase41b1a-recovery-and-migration-environment-gate.md`, add the failed draft isolation finding, the decision to use a remix, the baseline status (reused), the remix isolation proof, the parity results, the difference list and the support question status.
- Update the 41B.1A-R entry in `roadmap.md`.
- No other files change in this project.

## Out of scope
Applying the migration, backfill, synthetic users, product, UI or AI changes, live database changes, restores and deployment.
