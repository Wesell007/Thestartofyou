-- C1.16 — starred rows of section J re-run after re-application (rollback-only). As postgres. User A, E-A1 = ...ea01.
\set ON_ERROR_STOP 0
\set VERBOSITY verbose
\pset footer off
\echo === C1.16 star J start
select now() as started_at, current_user, (select project_ref || ' / ' || run_label from public.c1_rehearsal_marker) as marker;
BEGIN;
SET LOCAL lock_timeout = '5s';
\echo ### CASE J1|one active for A already exists (E-A1): OPEN count for A is exactly 1|OK
select count(*) as a_open from public.pregnancy_episodes where user_id = 'f5d043b9-a04c-4195-8d94-ed0f0c487516' and status in ('active','paused') and removed_at is null;
\echo ### CASE J2|second active for A while E-A1 is open|UV
savepoint s1;
insert into public.pregnancy_episodes (id, user_id, lmp_date, due_date, status, expected_count) values ('00000000-0000-4c10-8000-00000000ea0a', 'f5d043b9-a04c-4195-8d94-ed0f0c487516', date '2026-09-01', date '2027-06-08', 'active', 1);
rollback to savepoint s1;
select count(*) as residue from public.pregnancy_episodes where id = '00000000-0000-4c10-8000-00000000ea0a';
\echo ### CASE J3a|active + paused: new paused for A while E-A1 is active|UV
savepoint s2;
insert into public.pregnancy_episodes (id, user_id, lmp_date, due_date, status, expected_count) values ('00000000-0000-4c10-8000-00000000ea0b', 'f5d043b9-a04c-4195-8d94-ed0f0c487516', date '2026-09-01', date '2027-06-08', 'paused', 1);
rollback to savepoint s2;
\echo ### CASE J8|single-column removal UPDATE on E-A1 (setup for the starred removal rows)|OK
update public.pregnancy_episodes set removed_at = now() where id = '00000000-0000-4c10-8000-00000000ea01';
\echo ### CASE J7|removed episode still exists, status unchanged (active), ended_at NULL, outcome_date NULL, removed_at set|OK
select id, user_id, status, ended_at, outcome_date, removed_at, expected_count, (status = 'active' and ended_at is null and outcome_date is null and removed_at is not null) as s13_shape_ok from public.pregnancy_episodes where id = '00000000-0000-4c10-8000-00000000ea01';
\echo ### CASE J5a|removed E-A1 no longer matches the OPEN predicate: A open count is 0|OK
select count(*) as a_open from public.pregnancy_episodes where user_id = 'f5d043b9-a04c-4195-8d94-ed0f0c487516' and status in ('active','paused') and removed_at is null;
\echo ### CASE J5|set removed_at on E-A1, then insert new active E-A2 for A|OK
insert into public.pregnancy_episodes (id, user_id, lmp_date, due_date, status) values ('00000000-0000-4c10-8000-00000000ea02', 'f5d043b9-a04c-4195-8d94-ed0f0c487516', date '2026-09-01', date '2027-06-08', 'active');
select id, user_id, status, ended_at, outcome_date, removed_at from public.pregnancy_episodes where user_id = 'f5d043b9-a04c-4195-8d94-ed0f0c487516' order by id;
\echo === ROLLBACK (rollback-only harness)
ROLLBACK;
\echo === post-state (autocommit)
select now() as finished_at, (select count(*) from public.pregnancy_episodes) as episode_rows, (select string_agg(id::text || '|' || status::text || '|removed_at=' || coalesce(removed_at::text,'NULL'), ' ;; ' order by id) from public.pregnancy_episodes) as episodes;
\echo === C1.16 star J end
