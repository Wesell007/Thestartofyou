-- 41B.1A-C1 C1.6 — Pre-validation FK behaviour ("NOT VALID" is not "not enforced").
-- Plan: docs/strategy/phase41b1a-c1-rehearsal-plan.md, stage C1.6, section F (episode fixture), section I (naming).
-- Runner: c1_psql_notx.sh (no -1) so this file controls the transaction; ON_ERROR_STOP is turned off below so the
-- intended rejections are observed and isolated with SAVEPOINTs. One explicit transaction: if any statement that is
-- expected to succeed fails, the transaction is aborted and the final COMMIT becomes a ROLLBACK (nothing persists).
-- No FK, RLS or trigger bypass: no session_replication_role, no ALTER ... DISABLE, no VALIDATE CONSTRAINT.
-- Synthetic users only: A = b09cd318-8f3e-4853-8d97-fc10267b3d69, B = 820f49d1-2ebc-4bf1-a1e5-f6d32491bbbb,
-- C = 6e65487d-ddb0-43b6-a623-fb24b5318dab. Episodes (plan section F): E-A1 = ...ea01, E-B1 = ...eb01.
\set ON_ERROR_STOP 0
\set VERBOSITY verbose
\pset footer off
\echo === C1.6 start
select now() as started_at, current_user, (select project_ref || ' / ' || run_label from public.c1_rehearsal_marker) as marker;

BEGIN;
SET LOCAL lock_timeout = '5s';

\echo === (1) convalidated flag of the 13 ownership links (expect 13 x false)
select c.relname, k.conname, k.convalidated, k.confdeltype::text as del
from pg_constraint k join pg_class c on c.oid = k.conrelid
where k.contype = 'f' and k.confrelid = 'public.pregnancy_episodes'::regclass order by c.relname;

\echo === fixture: post-migration episodes E-A1 (A, active) and E-B1 (B, given_birth), plan section F; these persist for C1.7+
insert into public.pregnancy_episodes (id, user_id, lmp_date, due_date, status, expected_count)
values ('00000000-0000-4c10-8000-00000000ea01', 'b09cd318-8f3e-4853-8d97-fc10267b3d69', date '2026-06-01', date '2027-03-08', 'active', 1);
insert into public.pregnancy_episodes (id, user_id, lmp_date, due_date, status, status_changed_at, outcome_date, expected_count, ended_at)
values ('00000000-0000-4c10-8000-00000000eb01', '820f49d1-2ebc-4bf1-a1e5-f6d32491bbbb', date '2025-09-01', date '2026-06-08', 'given_birth', timestamptz '2026-06-05T10:00:00Z', date '2026-06-05', 2, timestamptz '2026-06-05T10:00:00Z');
select id, user_id, status, lmp_date, due_date, ended_at, outcome_date, removed_at, expected_count from public.pregnancy_episodes order by id;

\echo === (2) reflections: insert A row bound to E-A1 (expect success)
insert into public.reflections (id, user_id, week, content, pregnancy_episode_id)
values ('00000000-0000-4c10-8000-00000000c601', 'b09cd318-8f3e-4853-8d97-fc10267b3d69', 20, 'C1 synthetic c1.6 reflection', '00000000-0000-4c10-8000-00000000ea01');
select id, user_id, week, pregnancy_episode_id from public.reflections where id = '00000000-0000-4c10-8000-00000000c601';

\echo === (3) reflections: insert A row bound to E-B1 (expect FK violation naming reflections_pregnancy_episode_owner_fkey)
savepoint s3;
insert into public.reflections (id, user_id, week, content, pregnancy_episode_id)
values ('00000000-0000-4c10-8000-00000000c602', 'b09cd318-8f3e-4853-8d97-fc10267b3d69', 21, 'C1 synthetic c1.6 cross-user', '00000000-0000-4c10-8000-00000000eb01');
rollback to savepoint s3;
select count(*) as c602_rows_present from public.reflections where id = '00000000-0000-4c10-8000-00000000c602';

\echo === (4) reflections: update legacy NULL-link A row a101 (week 12) to E-B1 (expect FK violation)
savepoint s4;
update public.reflections set pregnancy_episode_id = '00000000-0000-4c10-8000-00000000eb01' where id = '00000000-0000-4c10-8000-00000000a101';
rollback to savepoint s4;
select id, week, pregnancy_episode_id from public.reflections where id = '00000000-0000-4c10-8000-00000000a101';

\echo === (5-journeys-2) journeys: set A pointer to E-A1 (expect success; journeys has one row per user, so the insert form becomes an update)
update public.journeys set current_pregnancy_episode_id = '00000000-0000-4c10-8000-00000000ea01' where user_id = 'b09cd318-8f3e-4853-8d97-fc10267b3d69';
select user_id, lifecycle, current_pregnancy_episode_id from public.journeys where user_id = 'b09cd318-8f3e-4853-8d97-fc10267b3d69';

\echo === (5-journeys-3) journeys: set A pointer to E-B1 (expect FK violation naming journeys_current_pregnancy_episode_owner_fkey)
savepoint s5j3;
update public.journeys set current_pregnancy_episode_id = '00000000-0000-4c10-8000-00000000eb01' where user_id = 'b09cd318-8f3e-4853-8d97-fc10267b3d69';
rollback to savepoint s5j3;

\echo === (5-journeys-4) journeys: legacy NULL-pointer C row to E-A1 (cross-user; expect FK violation)
savepoint s5j4;
update public.journeys set current_pregnancy_episode_id = '00000000-0000-4c10-8000-00000000ea01' where user_id = '6e65487d-ddb0-43b6-a623-fb24b5318dab';
rollback to savepoint s5j4;

\echo === (5-journeys-cleanup) journeys: A pointer back to NULL (expect success; restores the legacy fixture state)
update public.journeys set current_pregnancy_episode_id = null where user_id = 'b09cd318-8f3e-4853-8d97-fc10267b3d69';
select user_id, lifecycle, current_pregnancy_episode_id from public.journeys order by lifecycle;

\echo === (5-babies-2) babies: insert A baby bound to E-A1 (expect success)
insert into public.babies (id, user_id, name, date_of_birth, birth_order, is_primary, pregnancy_episode_id)
values ('00000000-0000-4c10-8000-00000000c603', 'b09cd318-8f3e-4853-8d97-fc10267b3d69', 'C1 synthetic c1.6 baby', date '2026-09-20', 1, true, '00000000-0000-4c10-8000-00000000ea01');
select id, user_id, birth_order, is_primary, pregnancy_episode_id from public.babies where id = '00000000-0000-4c10-8000-00000000c603';

\echo === (5-babies-3) babies: insert A baby bound to E-B1 (expect FK violation naming babies_pregnancy_episode_owner_fkey)
savepoint s5b3;
insert into public.babies (id, user_id, name, date_of_birth, birth_order, is_primary, pregnancy_episode_id)
values ('00000000-0000-4c10-8000-00000000c604', 'b09cd318-8f3e-4853-8d97-fc10267b3d69', 'C1 synthetic c1.6 cross-user', date '2026-09-20', 2, false, '00000000-0000-4c10-8000-00000000eb01');
rollback to savepoint s5b3;

\echo === (5-babies-4) babies: update legacy NULL-link row to the other user's episode (A has no legacy baby, so B's legacy row b002 -> E-A1; expect FK violation)
savepoint s5b4;
update public.babies set pregnancy_episode_id = '00000000-0000-4c10-8000-00000000ea01' where id = '00000000-0000-4c10-8000-00000000b002';
rollback to savepoint s5b4;
select id, user_id, birth_order, pregnancy_episode_id from public.babies order by user_id, birth_order;

\echo === (6) existing rows: every legacy row keeps its NULL link (only the two rows inserted in (2) carry a link) and the 13 flags are still false
select 'journeys' as t, count(*) filter (where current_pregnancy_episode_id is not null) as non_null from public.journeys
union all select 'reflections', count(*) filter (where pregnancy_episode_id is not null) from public.reflections
union all select 'babies', count(*) filter (where pregnancy_episode_id is not null) from public.babies
union all select 'week_photos', count(*) filter (where pregnancy_episode_id is not null) from public.week_photos
union all select 'week_media_memories', count(*) filter (where pregnancy_episode_id is not null) from public.week_media_memories
union all select 'pregnancy_appointments', count(*) filter (where pregnancy_episode_id is not null) from public.pregnancy_appointments
union all select 'pregnancy_symptom_notes', count(*) filter (where pregnancy_episode_id is not null) from public.pregnancy_symptom_notes
union all select 'baby_movement_notes', count(*) filter (where pregnancy_episode_id is not null) from public.baby_movement_notes
union all select 'birth_plans', count(*) filter (where pregnancy_episode_id is not null) from public.birth_plans
union all select 'hospital_bag_items', count(*) filter (where pregnancy_episode_id is not null) from public.hospital_bag_items
union all select 'midwife_questions', count(*) filter (where pregnancy_episode_id is not null) from public.midwife_questions
union all select 'contraction_sessions', count(*) filter (where pregnancy_episode_id is not null) from public.contraction_sessions
union all select 'contraction_events', count(*) filter (where pregnancy_episode_id is not null) from public.contraction_events;
select count(*) as ownership_fks, count(*) filter (where not convalidated) as not_valid, count(*) filter (where convalidated) as validated
from pg_constraint where contype = 'f' and confrelid = 'public.pregnancy_episodes'::regclass;

\echo === cleanup: delete the rows inserted in (2) and (5-babies-2); the fixture (21 legacy rows + E-A1 + E-B1) remains
delete from public.reflections where id = '00000000-0000-4c10-8000-00000000c601';
delete from public.babies where id = '00000000-0000-4c10-8000-00000000c603';

COMMIT;

\echo === post-state (autocommit, new snapshot)
select now() as finished_at,
 (select count(*) from public.pregnancy_episodes) as episode_rows,
 (select count(*) from public.journeys where current_pregnancy_episode_id is not null) as pointer_non_null,
 (select (select count(*) from public.reflections where pregnancy_episode_id is not null)+(select count(*) from public.week_photos where pregnancy_episode_id is not null)+(select count(*) from public.week_media_memories where pregnancy_episode_id is not null)+(select count(*) from public.pregnancy_appointments where pregnancy_episode_id is not null)+(select count(*) from public.pregnancy_symptom_notes where pregnancy_episode_id is not null)+(select count(*) from public.baby_movement_notes where pregnancy_episode_id is not null)+(select count(*) from public.birth_plans where pregnancy_episode_id is not null)+(select count(*) from public.hospital_bag_items where pregnancy_episode_id is not null)+(select count(*) from public.midwife_questions where pregnancy_episode_id is not null)+(select count(*) from public.contraction_sessions where pregnancy_episode_id is not null)+(select count(*) from public.contraction_events where pregnancy_episode_id is not null)+(select count(*) from public.babies where pregnancy_episode_id is not null)) as links_non_null,
 (select (select count(*) from public.journeys)+(select count(*) from public.pregnancy_journeys)+(select count(*) from public.first_year_journeys)+(select count(*) from public.ttc_journeys)+(select count(*) from public.babies)+(select count(*) from public.reflections)+(select count(*) from public.week_photos)+(select count(*) from public.week_media_memories)+(select count(*) from public.pregnancy_appointments)+(select count(*) from public.pregnancy_symptom_notes)+(select count(*) from public.baby_movement_notes)+(select count(*) from public.birth_plans)+(select count(*) from public.hospital_bag_items)+(select count(*) from public.midwife_questions)+(select count(*) from public.contraction_sessions)+(select count(*) from public.contraction_events)) as legacy_fixture_rows,
 (select count(*) from pg_constraint where contype = 'f' and confrelid = 'public.pregnancy_episodes'::regclass) as ownership_fks,
 (select count(*) from pg_constraint where contype = 'f' and confrelid = 'public.pregnancy_episodes'::regclass and not convalidated) as not_valid,
 (select count(*) from pg_constraint where contype = 'f' and confrelid = 'public.pregnancy_episodes'::regclass and convalidated) as validated,
 (select count(*) from supabase_migrations.schema_migrations) as history,
 (select count(*) from auth.users) as auth_users;
select id, user_id, status, ended_at is not null as ended, outcome_date, removed_at, expected_count from public.pregnancy_episodes order by id;
\echo === C1.6 end
