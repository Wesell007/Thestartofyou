-- C1.16 — starred rows H-1..H-5, corroborating psql channel (authenticated with both JWT claim GUCs = A). Rollback-only.
\set ON_ERROR_STOP 0
\set VERBOSITY verbose
\pset footer off
\echo === C1.16 star H psql start
BEGIN;
SET LOCAL lock_timeout = '5s';
set local role authenticated;
select set_config('request.jwt.claim.sub', 'f5d043b9-a04c-4195-8d94-ed0f0c487516', true);
select set_config('request.jwt.claims', '{"sub":"f5d043b9-a04c-4195-8d94-ed0f0c487516","role":"authenticated"}', true);
select current_user, session_user, auth.uid() as auth_uid, current_setting('row_security') as row_security;
\echo ### CASE H-1|authenticated A|SELECT own episodes|OK
select id, user_id, status from public.pregnancy_episodes order by id;
\echo ### CASE H-2|authenticated A|SELECT where user_id = B|OK
select count(*) as rows_visible_for_b_filter from public.pregnancy_episodes where user_id = '1d9fc1ea-2b56-4d1f-acbb-357dc92dbc00';
\echo ### CASE H-3|authenticated A|INSERT episode for A|42501
savepoint s3;
insert into public.pregnancy_episodes (id, user_id, lmp_date, due_date, status, ended_at, outcome_date) values ('00000000-0000-4c10-8000-00000000ec16', 'f5d043b9-a04c-4195-8d94-ed0f0c487516', date '2025-01-01', date '2025-10-08', 'given_birth', timestamptz '2025-10-01T10:00:00Z', date '2025-10-01');
rollback to savepoint s3;
\echo ### CASE H-4|authenticated A|UPDATE own episode|42501
savepoint s4;
update public.pregnancy_episodes set expected_count = 2 where id = '00000000-0000-4c10-8000-00000000ea01';
rollback to savepoint s4;
\echo ### CASE H-5|authenticated A|DELETE own episode|42501
savepoint s5;
delete from public.pregnancy_episodes where id = '00000000-0000-4c10-8000-00000000ea01';
rollback to savepoint s5;
reset role;
ROLLBACK;
\echo === C1.16 star H psql end
