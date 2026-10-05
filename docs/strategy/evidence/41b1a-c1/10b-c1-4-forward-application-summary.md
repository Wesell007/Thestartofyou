# 41B.1A-C1 — 10b C1.4 forward application (Project 1)

Result: **C1.4 PASS — frozen 41B.1A forward foundation successfully applied to Project 1.** This is a rehearsal application on the isolated project `tsoy-41b1a-c1-run1` (`wwtcnbjhttjtklpxhrkd`), NOT a production application. Executed 2026-10-05T06:52:44Z to 06:52:45Z (UTC). The validate file and the rollback file have NOT been run; C1.5 has NOT started.

## Pre-state (06:52:18Z)

Marker `wwtcnbjhttjtklpxhrkd / 41B.1A-C1-run1`; history 47; 3 Auth users, 0 non-synthetic; 21 fixture rows; no `pregnancy_episodes`; episode link columns, constraints, indexes, policies, trigger all 0; `babies_id_user_id_key` absent; 0 idle-in-transaction sessions; 0 ACCESS EXCLUSIVE locks in `public`; 0 scratch objects. Repository head 6762e2cc, clean; scratch at 735a07e6 with `core.autocrlf=false`.

## Execution

| Field | Value |
|---|---|
| File | `C:\Users\Administrator\.c1\src-735a07e6\docs\strategy\migrations-pending\41b1a_family_entity_foundation.sql` (the frozen forward file; no harness, no appended statement) |
| SHA-256 at execution (wrapper gate) | `e6ad0bc82b245beb03131023bb9ce122a451f40c2fe9b75cd43f047b674585cb` |
| Runner | `c1_psql.sh` (`08b-c1_psql-wrapper.sh`): target and denylist asserted, psql 17.11, direct endpoint `db.wwtcnbjhttjtklpxhrkd.supabase.co:5432`, role `postgres`, `-1 -v ON_ERROR_STOP=1 -e`, password read from the owner's file and never printed |
| Server | PostgreSQL 17.11.0.002 |
| Started / completed | 2026-10-05T06:52:44.518Z / 06:52:45.876Z |
| Elapsed | 1.36 s |
| Exit code | 0 |
| Transcript | `10-c1-4-forward-transcript.log` (133 lines): every statement echoed exactly once, 16 server acknowledgements, 0 WARNING, 0 ERROR, 1 NOTICE (`trigger "pregnancy_episodes_set_updated_at" … does not exist, skipping`, the expected first-run message of the drop-and-create pair) |
| Wait-event sample during the run | `10a-c1-4-observer-sample.txt`: no session matched at the 1-second sample; the run completed inside the sampling window |

## Commit proof (fresh sessions, both channels)

psql read-only session (new connection): `pregnancy_episodes` present, 0 rows, 13 ownership FKs, 13 NOT VALID, 13 link columns, 4 policies, babies key present, history 47. Integration session (06:54:02Z): identical, with the detail below.

## Foundation objects

- Columns (13): `id uuid NOT NULL`, `user_id uuid NOT NULL`, `lmp_date date NOT NULL`, `due_date date NOT NULL`, `status pregnancy_journey_status NOT NULL`, `status_changed_at timestamptz`, `outcome_date date`, `expected_count int2`, `removed_at timestamptz` (nullable), `started_at timestamptz NOT NULL`, `ended_at timestamptz`, `created_at timestamptz NOT NULL`, `updated_at timestamptz NOT NULL`.
- Constraints (6): `pregnancy_episodes_pkey PRIMARY KEY (id)`; `pregnancy_episodes_id_user_id_key UNIQUE (id, user_id)`; `pregnancy_episodes_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE`; `pregnancy_episodes_dates_check CHECK ((due_date > lmp_date) AND (due_date <= (lmp_date + 300)))`; `pregnancy_episodes_expected_count_check CHECK ((expected_count IS NULL) OR ((expected_count >= 1) AND (expected_count <= 4)))`; `pregnancy_episodes_ended_at_status_check CHECK ((status = ANY (ARRAY['active','paused'])) = (ended_at IS NULL))`.
- Indexes (4): `pregnancy_episodes_pkey`; `pregnancy_episodes_id_user_id_key`; `pregnancy_episodes_one_open_per_user_idx` UNIQUE `(user_id) WHERE ((status = ANY (ARRAY['active'::pregnancy_journey_status, 'paused'::pregnancy_journey_status])) AND (removed_at IS NULL))`, which is PostgreSQL's deparse of `status IN ('active','paused') AND removed_at IS NULL`; `pregnancy_episodes_user_id_idx (user_id)`.
- Trigger: `pregnancy_episodes_set_updated_at BEFORE UPDATE … EXECUTE FUNCTION set_updated_at()`.
- RLS: enabled, not forced. Policies (exactly 4, all PERMISSIVE, role `authenticated`): `select_own USING (auth.uid() = user_id)`; `insert_own WITH CHECK (auth.uid() = user_id)`; `update_own USING … WITH CHECK (auth.uid() = user_id)`; `delete_own USING (auth.uid() = user_id)`.
- Privileges: ACL `{postgres=arwdDxtm/postgres,service_role=arwdDxtm/postgres,authenticated=r/postgres}`; `role_table_grants` shows `authenticated: SELECT` only and `service_role: SELECT, INSERT, UPDATE, DELETE, TRUNCATE, REFERENCES, TRIGGER`; no `anon` or PUBLIC entry, so the explicit revoke took effect.

## Ownership links (13)

`journeys.journeys_current_pregnancy_episode_owner_fkey` plus `<table>_pregnancy_episode_owner_fkey` on reflections, week_photos, week_media_memories, pregnancy_appointments, pregnancy_symptom_notes, baby_movement_notes, birth_plans, hospital_bag_items, midwife_questions, contraction_sessions, contraction_events and babies. Each references `pregnancy_episodes (id, user_id)` with `confdeltype = r` (RESTRICT) and `convalidated = false`. Counts: 13 FKs, 13 RESTRICT, 13 NOT VALID. (The inspection query lists the local columns ordered by attribute number, which prints `user_id` before the link column; the constraint definitions are `(pregnancy_episode_id, user_id)` and `(current_pregnancy_episode_id, user_id)` as in the frozen file.) Link columns: 13, all nullable (`journeys.current_pregnancy_episode_id` and 12 `pregnancy_episode_id`). Link indexes: 13 (`journeys_current_pregnancy_episode_idx` and 12 `<table>_pregnancy_episode_idx`). `babies_id_user_id_key = UNIQUE (id, user_id)` present.

## Legacy data and bookkeeping

3 synthetic Auth users, 0 non-synthetic; 21 fixture rows with the same shape (journeys first_year+pregnancy+ttc, babies 1+2, reflections weeks 12+30); 0 non-null values across the 13 new link columns; 0 non-null journey pointers; 0 `pregnancy_episodes` rows (structure only, no backfill). `supabase_migrations.schema_migrations` remains at 47; no manual history record added, no `migration repair`, pending file not moved into `supabase/migrations`. Validation file not run; all 13 links left NOT VALID for C1.7.

## Anomaly checks

0 ACCESS EXCLUSIVE locks in `public`; 0 idle-in-transaction sessions; 0 `c1_scratch%` objects; marker unchanged; Project 2 and production untouched.

## PASS criteria

1 target Project 1: PASS. 2 hash: PASS. 3 one external transaction: PASS. 4 `ON_ERROR_STOP=1`: PASS. 5 exit 0: PASS. 6 committed (fresh sessions on two channels): PASS. 7 `pregnancy_episodes` exists: PASS. 8 columns, constraints, indexes: PASS. 9 pointer + 12 link columns: PASS. 10 exactly 13 composite FKs: PASS. 11 all 13 NOT VALID: PASS. 12 all 13 RESTRICT: PASS. 13 `babies_id_user_id_key`: PASS. 14 RLS, 4 policies, SELECT-only authenticated, service_role, revoke: PASS. 15 fixture intact: PASS. 16 all new links and pointers NULL: PASS. 17 0 episode rows: PASS. 18 history 47: PASS. 19 no lingering lock or idle transaction: PASS. 20 Project 2 and production untouched: PASS. 21 no secret in evidence: PASS.
