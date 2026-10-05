-- 41B.1A-C1 C1.9 — Open-pregnancy uniqueness and removed_at (plan stage C1.9, section J, all ten rows; S13 semantics).
-- Rollback-only: one explicit transaction, SAVEPOINT around every statement expected to be rejected and around
-- the sub-scenarios that temporarily restate E-A1/E-A2, final ROLLBACK so nothing persists.
-- No bypass; no delete; no enum change; no function; synthetic users A/B only; valid dates throughout so that only
-- the partial unique index pregnancy_episodes_one_open_per_user_idx can reject.
-- A = b09cd318-8f3e-4853-8d97-fc10267b3d69, B = 820f49d1-2ebc-4bf1-a1e5-f6d32491bbbb
-- E-A1 = ...ea01 (A, active, open), E-B1 = ...eb01 (B, given_birth, ended)
\set ON_ERROR_STOP 0
\set VERBOSITY verbose
\pset footer off
\echo === C1.9 start
select now() as started_at, current_user, (select project_ref || ' / ' || run_label from public.c1_rehearsal_marker) as marker;

BEGIN;
SET LOCAL lock_timeout = '5s';

\echo === live index and predicate (read-only)
select indexname, indexdef from pg_indexes where schemaname = 'public' and tablename = 'pregnancy_episodes' order by indexname;
select enumlabel from pg_enum e join pg_type t on t.oid = e.enumtypid where t.typname = 'pregnancy_journey_status' order by enumsortorder;

\echo === pre-state inside the transaction
select id, user_id, status, lmp_date, due_date, ended_at, outcome_date, removed_at, expected_count, status_changed_at, updated_at from public.pregnancy_episodes order by id;
select user_id, count(*) as open_episodes from public.pregnancy_episodes where status in ('active','paused') and removed_at is null group by user_id order by user_id;

\echo ### CASE J1|one active for A already exists (E-A1): OPEN count for A is exactly 1|OK
select count(*) as a_open from public.pregnancy_episodes where user_id = 'b09cd318-8f3e-4853-8d97-fc10267b3d69' and status in ('active','paused') and removed_at is null;

\echo ### CASE J2|second active for A while E-A1 is open|UV
savepoint s1;
insert into public.pregnancy_episodes (id, user_id, lmp_date, due_date, status, expected_count)
values ('00000000-0000-4c10-8000-00000000ea0a', 'b09cd318-8f3e-4853-8d97-fc10267b3d69', date '2026-09-01', date '2027-06-08', 'active', 1);
rollback to savepoint s1;
select count(*) as residue from public.pregnancy_episodes where id = '00000000-0000-4c10-8000-00000000ea0a';

\echo ### CASE J3a|active + paused: new paused for A while E-A1 is active|UV
savepoint s2;
insert into public.pregnancy_episodes (id, user_id, lmp_date, due_date, status, expected_count)
values ('00000000-0000-4c10-8000-00000000ea0b', 'b09cd318-8f3e-4853-8d97-fc10267b3d69', date '2026-09-01', date '2027-06-08', 'paused', 1);
rollback to savepoint s2;

\echo === J3b/J3c sub-scenario inside savepoint s3: E-A1 temporarily paused (paused is an OPEN status; ended_at stays NULL so the status/ended_at CHECK holds)
savepoint s3;
\echo ### CASE J3b-setup|E-A1 status active -> paused (open status, single-column update)|OK
update public.pregnancy_episodes set status = 'paused' where id = '00000000-0000-4c10-8000-00000000ea01';
select id, status, ended_at, removed_at from public.pregnancy_episodes where id = '00000000-0000-4c10-8000-00000000ea01';
\echo ### CASE J3b|paused + active: new active for A while E-A1 is paused|UV
savepoint s4;
insert into public.pregnancy_episodes (id, user_id, lmp_date, due_date, status, expected_count)
values ('00000000-0000-4c10-8000-00000000ea0c', 'b09cd318-8f3e-4853-8d97-fc10267b3d69', date '2026-09-01', date '2027-06-08', 'active', 1);
rollback to savepoint s4;
\echo ### CASE J3c|paused + paused: new paused for A while E-A1 is paused|UV
savepoint s5;
insert into public.pregnancy_episodes (id, user_id, lmp_date, due_date, status, expected_count)
values ('00000000-0000-4c10-8000-00000000ea0d', 'b09cd318-8f3e-4853-8d97-fc10267b3d69', date '2026-09-01', date '2027-06-08', 'paused', 1);
rollback to savepoint s5;
rollback to savepoint s3;
\echo ### CASE J3-restore|E-A1 back to active after rollback to savepoint s3|OK
select id, status, ended_at, removed_at from public.pregnancy_episodes where id = '00000000-0000-4c10-8000-00000000ea01';

\echo ### CASE J4|ended (B: E-B1 given_birth) + new active E-B2 for B (plan section F)|OK
insert into public.pregnancy_episodes (id, user_id, lmp_date, due_date, status)
values ('00000000-0000-4c10-8000-00000000eb02', '820f49d1-2ebc-4bf1-a1e5-f6d32491bbbb', date '2026-09-01', date '2027-06-08', 'active');
select id, user_id, status, removed_at from public.pregnancy_episodes where user_id = '820f49d1-2ebc-4bf1-a1e5-f6d32491bbbb' order by id;
select user_id, count(*) as open_episodes from public.pregnancy_episodes where status in ('active','paused') and removed_at is null group by user_id order by user_id;

\echo ### CASE J4b|per-user independence: second open for B while E-B2 is open (A unaffected)|UV
savepoint s6;
insert into public.pregnancy_episodes (id, user_id, lmp_date, due_date, status)
values ('00000000-0000-4c10-8000-00000000eb03', '820f49d1-2ebc-4bf1-a1e5-f6d32491bbbb', date '2026-09-01', date '2027-06-08', 'paused');
rollback to savepoint s6;

\echo ### CASE J8|setting removed_at requires no other column change: single-column UPDATE on E-A1 (S13 removal)|OK
select id, status, ended_at, outcome_date, removed_at, status_changed_at, updated_at as updated_at_before from public.pregnancy_episodes where id = '00000000-0000-4c10-8000-00000000ea01';
update public.pregnancy_episodes set removed_at = now() where id = '00000000-0000-4c10-8000-00000000ea01';
\echo ### CASE J7|removed episode still exists, status unchanged (active), ended_at NULL, outcome_date NULL, removed_at set|OK
select id, user_id, status, ended_at, outcome_date, removed_at, status_changed_at, expected_count, updated_at as updated_at_after,
       (status = 'active' and ended_at is null and outcome_date is null and removed_at is not null) as s13_shape_ok
from public.pregnancy_episodes where id = '00000000-0000-4c10-8000-00000000ea01';
\echo ### CASE J10|updated_at advanced on the removal UPDATE (set_updated_at trigger)|OK
select (updated_at > timestamptz '2026-10-05T20:01:11.06538Z') as updated_at_advanced, updated_at = now() as equals_transaction_now from public.pregnancy_episodes where id = '00000000-0000-4c10-8000-00000000ea01';
\echo ### CASE J5a|removed E-A1 no longer matches the OPEN predicate: A open count is 0|OK
select count(*) as a_open from public.pregnancy_episodes where user_id = 'b09cd318-8f3e-4853-8d97-fc10267b3d69' and status in ('active','paused') and removed_at is null;

\echo ### CASE J5|set removed_at on E-A1, then insert new active E-A2 for A|OK
insert into public.pregnancy_episodes (id, user_id, lmp_date, due_date, status)
values ('00000000-0000-4c10-8000-00000000ea02', 'b09cd318-8f3e-4853-8d97-fc10267b3d69', date '2026-09-01', date '2027-06-08', 'active');
select id, user_id, status, ended_at, outcome_date, removed_at from public.pregnancy_episodes where user_id = 'b09cd318-8f3e-4853-8d97-fc10267b3d69' order by id;

\echo ### CASE J11|removed E-A1 retained alongside open E-A2 (two distinct rows, old one not reused, not deleted)|OK
select count(*) as a_rows, count(*) filter (where removed_at is not null) as a_removed, count(*) filter (where status in ('active','paused') and removed_at is null) as a_open,
       bool_and(id in ('00000000-0000-4c10-8000-00000000ea01','00000000-0000-4c10-8000-00000000ea02')) as ids_as_expected
from public.pregnancy_episodes where user_id = 'b09cd318-8f3e-4853-8d97-fc10267b3d69';

\echo ### CASE J9|clearing removed_at on E-A1 while E-A2 is open (re-opening blocked by the index on UPDATE)|UV
savepoint s7;
update public.pregnancy_episodes set removed_at = null where id = '00000000-0000-4c10-8000-00000000ea01';
rollback to savepoint s7;
select id, status, removed_at is not null as still_removed from public.pregnancy_episodes where id = '00000000-0000-4c10-8000-00000000ea01';

\echo === J6 sub-scenario inside savepoint s8: E-A2 paused then removed, new active accepted
savepoint s8;
\echo ### CASE J6-setup|E-A2 active -> paused (open), then removed_at set (single-column update)|OK
update public.pregnancy_episodes set status = 'paused' where id = '00000000-0000-4c10-8000-00000000ea02';
update public.pregnancy_episodes set removed_at = now() where id = '00000000-0000-4c10-8000-00000000ea02';
select id, status, ended_at, outcome_date, removed_at from public.pregnancy_episodes where id = '00000000-0000-4c10-8000-00000000ea02';
\echo ### CASE J6|removed paused (E-A2) + new active E-A3 for A|OK
insert into public.pregnancy_episodes (id, user_id, lmp_date, due_date, status)
values ('00000000-0000-4c10-8000-00000000ea03', 'b09cd318-8f3e-4853-8d97-fc10267b3d69', date '2026-09-01', date '2027-06-08', 'active');
select id, status, removed_at is not null as removed from public.pregnancy_episodes where user_id = 'b09cd318-8f3e-4853-8d97-fc10267b3d69' order by id;
rollback to savepoint s8;
\echo ### CASE J6-restore|after rollback to savepoint s8: E-A2 open active again, E-A3 absent|OK
select id, status, removed_at is not null as removed from public.pregnancy_episodes where user_id = 'b09cd318-8f3e-4853-8d97-fc10267b3d69' order by id;

\echo ### CASE J13|no outcome coupling: removal changed only removed_at and updated_at on E-A1 (status active, outcome_date NULL, ended_at NULL, status_changed_at NULL, expected_count 1)|OK
select (status = 'active') as status_unchanged, (outcome_date is null) as outcome_date_null, (ended_at is null) as ended_at_null, (status_changed_at is null) as status_changed_at_null, (expected_count = 1) as expected_count_unchanged, (lmp_date = date '2026-06-01' and due_date = date '2027-03-08') as dates_unchanged, (removed_at is not null) as removed
from public.pregnancy_episodes where id = '00000000-0000-4c10-8000-00000000ea01';

\echo === in-transaction summary before rollback
select user_id, count(*) as rows, count(*) filter (where removed_at is not null) as removed, count(*) filter (where status in ('active','paused') and removed_at is null) as open from public.pregnancy_episodes group by user_id order by user_id;
\echo === ROLLBACK (rollback-only harness: nothing from C1.9 persists)
ROLLBACK;
\echo === post-state (autocommit, new snapshot)
select now() as finished_at, (select count(*) from public.pregnancy_episodes) as episode_rows,
 (select string_agg(id::text || '|' || status::text || '|removed_at=' || coalesce(removed_at::text,'NULL') || '|outcome_date=' || coalesce(outcome_date::text,'NULL') || '|ended_at=' || coalesce(ended_at::text,'NULL') || '|updated_at=' || updated_at, ' ;; ' order by id) from public.pregnancy_episodes) as episodes,
 (select count(*) from public.pregnancy_episodes where user_id = 'b09cd318-8f3e-4853-8d97-fc10267b3d69' and status in ('active','paused') and removed_at is null) as a_open,
 (select count(*) from public.journeys where current_pregnancy_episode_id is not null) as pointer_non_null,
 (select count(*) from supabase_migrations.schema_migrations) as history;
\echo === C1.9 end
