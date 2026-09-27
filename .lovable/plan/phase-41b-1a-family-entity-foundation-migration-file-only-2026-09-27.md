# Phase 41B.1A — Family Entity Foundation (migration file only)

Recovery gate: BLOCKED. There is no verified backup or restore path, and the preview and live app share one database. So the migration is written and reviewed but NOT applied. Expected outcome: 41B.1A IMPLEMENTATION BUILT / APPLICATION BLOCKED.

## 1. Pre-implementation gate
Re-check that the five closed 41B.0 documents still agree before writing anything:
- 24 tables = 11 + 5 + 6 + 2;
- 13 episode links;
- 26 target constraints and 5 changed or removed.
If they disagree, stop with IMPLEMENTATION BLOCKED — DESIGN DOCUMENT DRIFT.

Sort the ledger (RLS plan section 2) into phases:
- **41B.1A, implement now = 19 target controls:** rows 1 to 5 (5: the pregnancy record's id, the `(id, user_id)` unique key, one active pregnancy per person, `expected_count` 1 to 4 or empty, `ended_at` consistent with status), rows 6 to 16 (11 pregnancy-table links), row 17 (1: babies link), row 18 (1: journeys pointer) and row 22 (1: `babies (id, user_id)` unique key).
- **Deferred target rows = 7:** row 19 (1), rows 20 and 21 (2), rows 23 to 26 (4). Full ledger: 19 + 7 = 26. The 5 legacy constraints to be changed or removed are outside the 26.
- **Deferred:**
  - rows 20 and 21, reflections unique split (41B.1D, because it needs the old unique rule removed);
  - row 19, journeys pointer check (41B.1D, because legacy pregnancy rows have no pointer yet);
  - rows 23 to 26, baby composite links (41B.1D);
  - all 5 changed or removed constraints (41B.1D);
  - `babies.archived_at` (41B.1C, the First Year write path).

## 2. Migration SQL (additive only)
One SQL file, held outside the auto-applied migrations folder so it cannot run by accident: `docs/strategy/migrations-pending/41b1a_family_entity_foundation.sql`. It is moved into `supabase/migrations/` only when you approve application later. Contents:
- `pregnancy_episodes`: `id`, `user_id`, `lmp_date`, `due_date`, `status pregnancy_journey_status` (default active), `status_changed_at`, `outcome_date`, `expected_count`, `started_at`, `ended_at`, `created_at`, `updated_at`. Named constraints for rows 1 to 5, the `set_updated_at` trigger, grants for authenticated and service_role, and RLS switched on.
- Four owner policies for authenticated users (view, add, edit, delete), each `auth.uid() = user_id`, with an explicit new-row check on add and edit.
- Nullable `pregnancy_episode_id` on the 11 pregnancy tables and on `babies`. Nullable `active_pregnancy_episode_id` on `journeys`.
- 13 named composite links to `pregnancy_episodes (id, user_id)`, each ON DELETE RESTRICT, with no CASCADE. Each gets a matching index.
- Named unique key on `babies (id, user_id)`.
- Written with `IF NOT EXISTS` and guarded blocks where possible, so it is safe to re-run. The forward migration contains 0 UPDATE statements, 0 DELETE FROM, 0 TRUNCATE, 0 destructive DROP and 0 backfill statements, and no triggers that reassign data. `ON DELETE RESTRICT` is expected. Existing policies and constraints are left alone.

## 3. Everything else stays as it is
No client write paths, UI, Companion, memory, grounding or lifecycle changes. `pregnancy_journeys` stays as it is. Generated types are NOT regenerated, because the schema is not live. Customer rows read: 0.

## 4. Tests
New focused Vitest file that checks the SQL text for tests A to L:
- composite links and the unique key are present (D, E, F);
- the partial unique index on active status (B, C);
- no NOT NULL on the new links (G);
- no required child row (H);
- no unique on babies' pregnancy link (I);
- `expected_count` CHECK (J);
- no destructive statements (L). The test matches whole statements, not bare words: it rejects `UPDATE <table>`, `DELETE FROM`, `TRUNCATE`, `DROP TABLE`, `DROP COLUMN` and `DROP CONSTRAINT`. `ON DELETE RESTRICT` passes.

These are static contract checks of the SQL text only, not runtime proof. The following stay PENDING APPLICATION: adding several pregnancies for one person, rejecting a second active pregnancy, separate people each holding an active pregnancy, and the links actually rejecting another person's records. The existing regression tests, typecheck and build are reported separately.

## 5. Evidence and rollback
- `docs/strategy/phase41b1a-family-entity-foundation-implementation.md` records:
  - the file, the entity, the 13 tables, columns, indexes, constraints and policies, and what is deferred;
  - applied = NO, environment = none, gate = BLOCKED (with the reason), live structural verification = NOT RUN;
  - the tests;
  - the dependency-aware rollback, documented but not run. For existing tables: (1) drop the new composite links; (2) drop the new standalone indexes; (3) drop the `babies (id, user_id)` unique rule by name; (4) drop the new columns. For the new table: (5) drop its policies; (6) drop its trigger; (7) drop `pregnancy_episodes`. Key and unique backing indexes are never dropped separately.
  - New-model rows = 0; current rollback data-loss risk = NONE. If the migration is applied later, row counts are checked before any rollback.
- Roadmap entry for Phase 41B.1A, including the final report fields and closure decision: 41B.1A IMPLEMENTATION BUILT / APPLICATION BLOCKED. 41B.1B is not started.
