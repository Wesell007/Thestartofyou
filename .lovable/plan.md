# Phase 41B.1A-R — Isolated staging environment and parity check

Recovery decision stays **E. APPLICATION BLOCKED — USER ACTION REQUIRED**. The pending 41B.1A migration is not applied anywhere in this phase. 41B.1A stays IMPLEMENTATION BUILT / APPLICATION BLOCKED; 41B.1B stays NOT STARTED.

## What will be done

1. **Create the staging environment**
   - Create a Lovable draft labelled "41B.1A staging rehearsal". Drafts come with their own backend.
   - Isolation is not assumed. It is checked: the draft's backend project reference must be different from the live one (`wogepxfipdipogyogced`), and a read-only row count on the draft must show no customer rows. If the draft shares the live database, stop and report staging isolated = NO.

2. **Build the staging schema from the repository only**
   - The draft's backend is built from the committed `supabase/migrations/` in order. No data is copied.
   - The pending file in `docs/strategy/migrations-pending/` is NOT applied.

3. **Parity check (read-only catalogue queries on both, output compared)**
   - Tables and columns (types, nullability, defaults), enums/types, functions (`pg_get_functiondef` hash), triggers, RLS enabled flags and `pg_policies`, constraints (`pg_constraint` definitions), indexes (`pg_indexes`), grants, and ownership behaviour (the `auth.users` foreign keys and their delete rules).
   - Each area gets PASS or FAIL. Every difference is listed, and nothing is repaired automatically. Live queries only read the catalogue, never customer rows.

4. **Synthetic data only**
   - Seed data and test users are created only if a later phase approves it. None are created now, and customer records are never copied.

5. **Record the support question** (in the recovery gate document and the roadmap, status OPEN):
   - Can a Lovable Cloud database backup be restored into a separate project or environment instead of overwriting the shared database?
   - If not, can a complete logical backup (schema and data) be produced for a full restore elsewhere?
   - Nothing is restored and no credentials are exposed.

6. **Return this report**
   - staging environment created = YES/NO
   - staging database isolated from production = YES/NO
   - schema parity = PASS/FAIL
   - RLS parity = PASS/FAIL
   - function/trigger parity = PASS/FAIL
   - pending migration applied = NO
   - live backup verification = PENDING (user)

## Documentation
- Add a section "Staging environment and parity" to `docs/strategy/phase41b1a-recovery-and-migration-environment-gate.md` with the evidence, the diff tables and the open support question.
- Update the 41B.1A-R entry in `roadmap.md`.

## Out of scope
Applying the migration anywhere, backfill, product, UI or AI changes, changes to the live database, restores, and deployment.
