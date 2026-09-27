# Phase 41B.1A — Family Entity Foundation: Implementation Evidence

Decision: **41B.1A IMPLEMENTATION BUILT / APPLICATION BLOCKED**

## Gates
- Design drift check: the five 41B.0 docs reconcile (24 = 11 + 5 + 6 + 2; 13 links; 26 target controls; 5 changed/removed). No drift.
- Recovery gate: **BLOCKED**. There is no verified backup/restore path, and one database serves both preview and production. The user chose "create file only".

## Migration
- File: `docs/strategy/migrations-pending/41b1a_family_entity_foundation.sql`. It is held outside `supabase/migrations/` so it cannot be applied automatically.
- Applied = NO. Environment = none. Generated types updated = NO (no live schema to generate from). Live structural verification = NOT RUN.

## Ledger split
- Implemented in SQL = 19: rows 1 to 5, rows 6 to 16, row 17, row 18, row 22.
- Deferred = 7:
  - row 19 (journeys pointer CHECK), 41B.1D;
  - rows 20 and 21 (reflections unique split), 41B.1D;
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
