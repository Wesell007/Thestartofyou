# Phase 41B.1A — Family Entity Foundation (migration file only)

Recovery gate: BLOCKED. There is no verified backup or restore path, and the preview and live app share one database. So the migration is written and reviewed but NOT applied. Expected outcome: 41B.1A IMPLEMENTATION BUILT / APPLICATION BLOCKED.

## 1. Pre-implementation gate
Re-check that the five closed 41B.0 documents still agree before writing anything:
- 24 tables = 11 + 5 + 6 + 2;
- 13 episode links;
- 26 target constraints and 5 changed or removed.
If they disagree, stop with IMPLEMENTATION BLOCKED — DESIGN DOCUMENT DRIFT.

Sort the ledger (RLS plan section 2) into phases:
- **41B.1A, implement now:** rows 1 to 5 (the pregnancy record: its id, the `(id, user_id)` unique key, one active pregnancy per person, `expected_count` 1 to 4 or empty, `ended_at` consistent with status), rows 6 to 16 (11 pregnancy-table links), row 17 (babies link), row 18 (journeys pointer), row 22 (`babies (id, user_id)` unique key). 18 constraints.
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
- Written with `IF NOT EXISTS` and guarded blocks where possible, so it is safe to re-run. It contains no UPDATE, DELETE or DROP, no backfill and no triggers that reassign data. Existing policies and constraints are left alone.

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
- no UPDATE, DELETE, DROP or backfill statements (L).
Behaviour proofs for A to C, which need a real database, are marked PENDING APPLICATION. The existing Pregnancy, First Year and lifecycle tests, typecheck and build are then run, and exact counts reported.

## 5. Evidence and rollback
- `docs/strategy/phase41b1a-family-entity-foundation-implementation.md`: the file, the entity, the 13 tables, columns, indexes, constraints and policies, what is deferred, applied = NO, environment = none, gate = BLOCKED (reason stated), structural verification = NOT RUN, tests, and the rollback order (drop indexes, then the links, then the columns, then the policies, then the table). Rollback would destroy no user data, because no rows use the new structure yet.
- Roadmap entry for Phase 41B.1A, including the final report fields and closure decision: 41B.1A IMPLEMENTATION BUILT / APPLICATION BLOCKED. 41B.1B is not started.
