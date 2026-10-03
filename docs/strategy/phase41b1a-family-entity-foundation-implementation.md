# Phase 41B.1A — Family Entity Foundation: Implementation Evidence

## Amendment record (3 October 2026) — 41B.0-R applied

Decision: **41B.1A SQL AMENDED / NOT APPLIED / READY FOR 41B.1A REVIEW**

This record describes the pending files as they now are. The 27 September record below it is kept as history; where the two disagree, this record governs. Nothing has been applied to any database. No customer row was read. No product code changed.

### Files

| File | Role |
|---|---|
| `docs/strategy/migrations-pending/41b1a_family_entity_foundation.sql` | Foundation schema (amended) |
| `docs/strategy/migrations-pending/41b1a_family_entity_foundation_validate.sql` | `VALIDATE CONSTRAINT` for the 13 `NOT VALID` links (S1, second step) |
| `docs/strategy/migrations-pending/41b1a_family_entity_foundation_rollback.sql` | Guarded reversal (S7) |
| `src/test/phase41b1aMigration.test.ts` | Static contract tests over all three files (S8) |

### S1–S13 incorporation

| # | Decision in 41B.0-R §12 | In the amended SQL |
|---|---|---|
| S1 | FKs `NOT VALID`, validate in a second file, `SET LOCAL lock_timeout`, `journeys` before the loop | All 13 links `ON DELETE RESTRICT NOT VALID`; validate file with 13 `VALIDATE CONSTRAINT`; `SET LOCAL lock_timeout = '5s'` in all three files; `journeys` pointer block precedes the loop |
| S2 | Explicit revoke | `REVOKE ALL ON TABLE public.pregnancy_episodes FROM PUBLIC, anon, authenticated` before the grants |
| S3 | Keep `(user_id)` index and composite child indexes | Unchanged |
| S4 | Dates `NOT NULL`, date rule as CHECK, `SELECT` only for `authenticated` | `lmp_date`/`due_date` `NOT NULL`; `pregnancy_episodes_dates_check` = `due_date > lmp_date AND due_date <= lmp_date + 300` (the rule in `save_pregnancy_journey`, migration `20260803231512`); `GRANT SELECT` only; four policies kept |
| S5 | One open episode | Partial unique index predicate `status IN ('active','paused')` (combined with S13 below) |
| S6 | No transaction control | `BEGIN`/`COMMIT` removed from the forward file; none in the companion files |
| S7 | Real rollback file, guarded | Created; refuses when any episode row, any non-null link, any later-phase FK on episodes, or any dependant of `babies_id_user_id_key` exists |
| S8 | Static test must be able to fail | Rewritten: table list parsed from the SQL, RESTRICT + NOT VALID asserted on every episode link, account CASCADE counted once, all three CHECKs, revoke-before-grant, SELECT-only grant list, open-episode predicate, no transaction control, DML detectors that also see inside `EXECUTE` strings (with a self-test), validate file covers exactly the 13 links, rollback names every created object in dependency order and drops only its own |
| S9 | Pointer rename | `journeys.current_pregnancy_episode_id`, `journeys_current_pregnancy_episode_owner_fkey`, `journeys_current_pregnancy_episode_idx` |
| S10 | Table-scoped guards | Every `pg_constraint` guard filters on `conrelid` |
| S11 | `CREATE OR REPLACE TRIGGER` needs PG 14 | Replaced by `DROP TRIGGER IF EXISTS` + `CREATE TRIGGER`; no version dependency; rehearsal still records the version |
| S12 | Keep `contraction_events` link | Kept; server-filled from the session in 41B.1C |
| S13 | Conditional `removed` status | **Replaced by the owner's final resolution:** `pregnancy_episodes.removed_at timestamptz NULL`. No enum change. See 41B.0-R §28. |

### Owner decisions 1–6

1. `current_pregnancy_episode_id` — applied (S9).
2. `SELECT`-only for signed-in clients; no direct `INSERT`/`UPDATE`/`DELETE` — applied by privilege. The three write policies exist but are inert until 41B.1C grants `INSERT` and `UPDATE`; `DELETE` is never granted.
3. Pointer kept after Pregnancy → First Year; `babies.pregnancy_episode_id` is the durable link — nothing in 41B.1A clears or constrains the pointer by lifecycle (row 19 stays in 41B.1D and is `NOT VALID` there).
4. No automatic 60-day rule — not a schema matter; recorded for the 41B.1C save function (result code `needs_confirmation`).
5. `babies.archived_at` kept, internal, never user-facing — not in 41B.1A (41B.1C with the two `babies` index replacements).
6. "Remove this journey" — `removed_at`, episode-local, orthogonal to status, no outcome, not deletion. OPEN = `status IN ('active','paused') AND removed_at IS NULL`, which is exactly the one-open index predicate. The 41B.1C removal transition is recorded in 41B.0-R §28 and is **not** implemented here.

### Ledger split after amendment

- Prepared in 41B.1A = 19 of the 26 target controls: rows 1–5, rows 6–16, row 17, row 18, row 22. Plus, from 41B.0-R: `NOT NULL` on both dates, `pregnancy_episodes_dates_check`, and `removed_at`.
- Deferred = 7: row 19 (pointer CHECK, 41B.1D, added `NOT VALID`); rows 20–21 (reflections unique split, now 41B.1C per 41B.0-R §18 step 3); rows 23–26 (baby composite RESTRICT links, 41B.1D).
- Legacy constraints changed or removed = 11, none in 41B.1A:

| # | Constraint | Subphase |
|---|---|---|
| 1 | `reflections_user_id_week_key` | 41B.1C |
| 2 | `week_photos_user_id_week_key` | 41B.1C |
| 3 | `week_media_memories_user_id_week_media_type_key` | 41B.1C |
| 4 | `birth_plans_user_id_key` | 41B.1C |
| 5 | `hospital_bag_items_user_id_category_item_key_key` | 41B.1C |
| 6 | `babies_user_birth_order_idx` | 41B.1C |
| 7 | `babies_one_primary_per_user_idx` | 41B.1C |
| 8 | `first_year_entries_baby_id_fkey` | 41B.1D |
| 9 | `first_year_care_events_baby_id_fkey` | 41B.1D |
| 10 | `first_year_memories_baby_id_fkey` | 41B.1D |
| 11 | `first_year_reminders_baby_id_fkey` | 41B.1D |

Rows 1–7 are relaxations the 41B.1C write paths depend on; they land in 41B.1C step 3, after readers (step 1) and singleton writers (step 2). Rows 8–11 are tightenings and stay in 41B.1D.

### Final objects

- Table `public.pregnancy_episodes`: `id`, `user_id`, `lmp_date NOT NULL`, `due_date NOT NULL`, `status` (`pregnancy_journey_status`, default `active`), `status_changed_at`, `outcome_date`, `expected_count`, `removed_at`, `started_at`, `ended_at`, `created_at`, `updated_at`.
- Constraints: `pregnancy_episodes_pkey`; `pregnancy_episodes_id_user_id_key`; `pregnancy_episodes_user_id_fkey` (→ `auth.users`, CASCADE, intentional); `pregnancy_episodes_dates_check`; `pregnancy_episodes_expected_count_check`; `pregnancy_episodes_ended_at_status_check`.
- Indexes: `pregnancy_episodes_one_open_per_user_idx` UNIQUE `(user_id) WHERE status IN ('active','paused') AND removed_at IS NULL`; `pregnancy_episodes_user_id_idx`.
- Trigger `pregnancy_episodes_set_updated_at` (drop-and-create). Privileges: revoke from `PUBLIC`, `anon`, `authenticated`; `SELECT` to `authenticated`; `ALL` to `service_role`. RLS enabled; four owner policies.
- 13 ownership links, all `(…, user_id) → pregnancy_episodes (id, user_id) ON DELETE RESTRICT NOT VALID`, each with a composite index: `journeys.current_pregnancy_episode_id` and `pregnancy_episode_id` on reflections, week_photos, week_media_memories, pregnancy_appointments, pregnancy_symptom_notes, baby_movement_notes, birth_plans, hospital_bag_items, midwife_questions, contraction_sessions, contraction_events, babies.
- `babies_id_user_id_key` UNIQUE `(id, user_id)`.

### Rollback review

- Reversibility: every created object is dropped by name; every `DROP` is `IF EXISTS`, so a partially applied forward file can still be reversed. No `CASCADE`.
- Dependency order: `journeys` pointer, then the 12 looped links (constraint, index, column), then `babies_id_user_id_key`, then policies, trigger, indexes, table.
- No customer-history destruction: the guard aborts if `pregnancy_episodes` has any row or any link column is non-null. Only aggregate counts are read.
- No assumption about later phases: the guard also aborts on any foreign key to `pregnancy_episodes` outside the 13 it owns, and on any dependant of `babies_id_user_id_key`.
- Run inside one explicit transaction at rehearsal (test Q in 41B.0-R §19 covers the refusal path).

### Validation performed (3 October 2026)

Recorded in the 41B.1A report for this amendment: focused static test file, lint (`--max-warnings=0`), typecheck. Build not run (no application code or asset changed). Nothing executed against a database.

### Account deletion under RESTRICT — mandatory pre-41B.1B gate

Recorded by the 3 October 2026 pre-push review. Not resolved in 41B.1A, by instruction.

- **What the files do.** `pregnancy_episodes.user_id` cascades from `auth.users`. The 13 ownership links are `ON DELETE RESTRICT`. All 13 linked tables also cascade from `auth.users` (live snapshot: every one carries `REFERENCES auth.users(id) ON DELETE CASCADE`).
- **Why it is not proven.** When an account is deleted, Postgres fires the `auth.users` cascade triggers one at a time, in alphabetical order of trigger name. The cascade into `pregnancy_episodes` runs a nested `DELETE`, and the RESTRICT checks queued by that nested statement fire at its end, before the remaining sibling cascades (reflections, babies, journeys, …) have run. Whether a bound row still exists at that moment therefore depends on the firing order. RI trigger names embed OIDs, and OIDs differ between a rehearsal project and production, so the order observed at 41B.1A-C1 is **not portable** to production. The earlier wording "Postgres runs the restrict checks after the first round of cascades" is withdrawn as overstated.
- **Why it cannot bite in 41B.1A.** RESTRICT only acts when a referencing row exists. 41B.1A binds nothing and populates no pointer, so whole-account deletion is unchanged until 41B.1B backfills links.
- **Gate.** Before any 41B.1B row is bound, the owner must close this with one of: (1) a structure-only read of production's RI trigger order on `auth.users` (`pg_trigger` names, 0 customer rows) showing the episode cascade fires after every dependant cascade, plus the same check repeated after any later FK; (2) an owner-approved design change such as `NO ACTION DEFERRABLE INITIALLY DEFERRED` on the 13 links; or (3) explicit deletion ordering in the account-deletion function. No option is chosen here. The rehearsal still runs the real deletion path with populated links and records the trigger order it observes.

### Still open before 41B.1A-C1

- The five 41B.0 documents still carry the passages listed in 41B.0-R §22 without a "SUPERSEDED BY 41B.0-R" marker.
- Generated Supabase types are regenerated only after the schema exists somewhere (rehearsal project), never from this file.
- Postgres version and default privileges on new tables: rehearsal evidence, not static.
- Account deletion with populated links: see the mandatory pre-41B.1B gate below. Rehearsal evidence alone does not close it.

---

## Historical record (27 September 2026, file-only build)

Decision at the time: **41B.1A IMPLEMENTATION BUILT / APPLICATION BLOCKED** (superseded by the amendment record above)

## Gates
- Design drift check: the five 41B.0 docs reconcile (24 = 11 + 5 + 6 + 2; 13 links; 26 target controls; 5 changed/removed). No drift.

> **SUPERSEDED BY 41B.0-R** §12 — ten architecture drift items (D1–D10) and thirteen SQL amendments (S1–S13) were found; see the amendment record above.

- Recovery gate: **BLOCKED**. There is no verified backup/restore path, and one database serves both preview and production. The user chose "create file only".

## Migration
- File: `docs/strategy/migrations-pending/41b1a_family_entity_foundation.sql`. It is held outside `supabase/migrations/` so it cannot be applied automatically.
- Applied = NO. Environment = none. Generated types updated = NO (no live schema to generate from). Live structural verification = NOT RUN.

## Ledger split
- Implemented in SQL = 19: rows 1 to 5, rows 6 to 16, row 17, row 18, row 22.
- Deferred = 7:
  - row 19 (journeys pointer CHECK), 41B.1D;
  - rows 20 and 21 (reflections unique split), 41B.1D; *(SUPERSEDED BY 41B.0-R §18: 41B.1C step 3)*
  - rows 23 to 26 (baby composite FKs), 41B.1D.
- 19 + 7 = 26. The 5 legacy changed/removed constraints are also deferred to 41B.1D, and are outside the 26.
- Also deferred: `babies.archived_at` (41B.1C).

## Objects
- Table `pregnancy_episodes`: id, user_id, lmp_date, due_date, status (`pregnancy_journey_status`, default active), status_changed_at, outcome_date, expected_count, started_at, ended_at, created_at, updated_at.
- Constraints on the new table:
  - `pregnancy_episodes_pkey`;
  - `pregnancy_episodes_id_user_id_key`;
  - `pregnancy_episodes_expected_count_check` (empty, or 1 to 4);
  - `pregnancy_episodes_ended_at_status_check` (ended_at is empty only when active or paused).
- One active pregnancy per person: partial unique index `pregnancy_episodes_one_active_per_user_idx` on (user_id) WHERE status = 'active'.
- Other objects on the new table: index `pregnancy_episodes_user_id_idx`; trigger `pregnancy_episodes_set_updated_at`; grants for authenticated and service_role; RLS enabled.
- Policies (all for authenticated, all `auth.uid() = user_id`):
  - `pregnancy_episodes_select_own`;
  - `pregnancy_episodes_insert_own` (WITH CHECK);
  - `pregnancy_episodes_update_own` (USING + WITH CHECK);
  - `pregnancy_episodes_delete_own`.
- 13 ownership links, all to `pregnancy_episodes (id, user_id)` with ON DELETE RESTRICT:
  - On reflections, week_photos, week_media_memories, pregnancy_appointments, pregnancy_symptom_notes, baby_movement_notes, birth_plans, hospital_bag_items, midwife_questions, contraction_sessions, contraction_events and babies: nullable column `pregnancy_episode_id`, FK `<table>_pregnancy_episode_owner_fkey` on (pregnancy_episode_id, user_id), and index `<table>_pregnancy_episode_idx`.
  - On journeys: nullable column `active_pregnancy_episode_id`, FK `journeys_active_pregnancy_episode_owner_fkey`, and index `journeys_active_pregnancy_episode_idx`.
- `babies_id_user_id_key` UNIQUE (id, user_id).

## Deletion semantics
- ACCOUNT DELETION CASCADE = **INTENTIONAL**. `pregnancy_episodes.user_id` references `auth.users` ON DELETE CASCADE and is not replaced with RESTRICT. Purpose: when a person explicitly deletes their entire account, pregnancy episodes belonging to that account must also be eligible for deletion under the platform's account-deletion process.
- PREGNANCY-LEVEL DEPENDENCY DELETE = **RESTRICT**. Purpose: deleting an individual pregnancy episode must never silently cascade into children, pregnancy history or episode-bound records.
- ACCOUNT DELETION WITH NEW PREGNANCY STRUCTURE = **PENDING APPLICATION / RUNTIME VERIFICATION**.

> **SUPERSEDED (3 October 2026 review)** — runtime verification in a rehearsal project is necessary but not sufficient; see "Account deletion under RESTRICT — mandatory pre-41B.1B gate" in the amendment record above.

- The target design preserves account-deletion semantics. Runtime compatibility with the new RESTRICT relationships must be verified after application.

## Future application-gate test: ACCOUNT DELETION INTEGRITY TEST
Status: NOT RUN. Never run against customer data.

Fixture (non-customer test data only): a user; a pregnancy episode; an episode-bound pregnancy record; a baby linked to the pregnancy; a First Year child-bound record where applicable.

Verify:
1. normal deletion of the pregnancy episode alone is blocked where protected dependants exist;
2. the approved whole-account deletion workflow successfully removes or processes all owned data in the required order;
3. no orphaned pregnancy, child or journey records remain;
4. no other user's data is touched.

Stop rule: if whole-account deletion fails because RESTRICT dependencies prevent the existing account deletion flow, stop the release and redesign the deletion transaction or order before production.


## Scope held
- Backfilled 0; customer rows read 0; customer rows changed 0.
- Existing constraints removed 0; existing policies modified 0; baby FK delete behaviour unchanged.
- Client write paths 0; UI, Companion, memory and grounding 0.
- `pregnancy_journeys` preserved. Deployment NO. 41B.1B NOT STARTED.

## Tests
- Focused test: `src/test/phase41b1aMigration.test.ts`, 13/13 PASS. These are static SQL-contract checks only.
  - Destructive-statement checks match whole statements (UPDATE <table>, DELETE FROM, TRUNCATE, DROP TABLE/COLUMN/CONSTRAINT and similar).
  - ON DELETE RESTRICT passes.
- PENDING APPLICATION (no runtime proof yet):
  - several episodes can be added for one person;
  - a second active episode is rejected;
  - separate people can each hold an active episode;
  - the composite FKs reject records belonging to another person.
- Full regression run: 148 files, 1661/1661 PASS. Typecheck PASS. Build PASS.

## Rollback (documented, not run)
Existing tables:
1. drop the 13 composite FKs;
2. drop the 13 `*_pregnancy_episode_idx` / `journeys_active_pregnancy_episode_idx` indexes;
3. drop `babies_id_user_id_key` by constraint name;
4. drop the nullable `pregnancy_episode_id` / `active_pregnancy_episode_id` columns.

New table:

5. drop its 4 policies;
6. drop trigger `pregnancy_episodes_set_updated_at`;
7. drop `pregnancy_episodes`.

Primary key, unique and check backing indexes go with the table and are not dropped separately.

New-model rows = 0. Current rollback data-loss risk = NONE, because nothing has been created. If the migration is applied later, check row counts before any rollback.
