-- 41B.1A-C1 C1.11 — corroborating psql channel (plan section H). Connection starts as postgres (owner); inside one
-- transaction the role is switched to authenticated with BOTH JWT claim forms set to synthetic user A, then to anon.
-- Rollback-only (final ROLLBACK). No row_security change, no policy/grant change, no bypass.
\set ON_ERROR_STOP 0
\set VERBOSITY verbose
\pset footer off
\echo === C1.11 psql corroboration start
select now() as started_at, current_user, session_user, (select project_ref || ' / ' || run_label from public.c1_rehearsal_marker) as marker;
BEGIN;
SET LOCAL lock_timeout = '5s';
\echo === security structure (owner, read-only)
select relrowsecurity, relforcerowsecurity from pg_class where oid = 'public.pregnancy_episodes'::regclass;
select grantee, string_agg(privilege_type, ',' order by privilege_type) as privileges from information_schema.role_table_grants where table_schema='public' and table_name='pregnancy_episodes' group by grantee order by grantee;
select polname, polcmd, array(select rolname from pg_roles where oid = any(polroles)) as roles from pg_policy where polrelid='public.pregnancy_episodes'::regclass order by polname;
\echo ### CASE H-9|postgres owner|SELECT all|OK
select id, user_id, status from public.pregnancy_episodes order by id;

\echo === switch to authenticated as A (dual GUC)
set local role authenticated;
select set_config('request.jwt.claim.sub', 'b09cd318-8f3e-4853-8d97-fc10267b3d69', true);
select set_config('request.jwt.claims', '{"sub":"b09cd318-8f3e-4853-8d97-fc10267b3d69","role":"authenticated"}', true);
select current_user, session_user, auth.uid() as auth_uid, current_setting('request.jwt.claim.sub', true) as claim_sub, current_setting('request.jwt.claims', true) as claims, current_setting('row_security') as row_security;
\echo ### CASE H-1|authenticated A|SELECT own episodes|OK
select id, user_id, status from public.pregnancy_episodes order by id;
\echo ### CASE H-2|authenticated A|SELECT where user_id = B|OK
select id, user_id, status from public.pregnancy_episodes where user_id = '820f49d1-2ebc-4bf1-a1e5-f6d32491bbbb' order by id;
select count(*) as rows_visible_for_b_filter from public.pregnancy_episodes where user_id = '820f49d1-2ebc-4bf1-a1e5-f6d32491bbbb';
\echo ### CASE H-3|authenticated A|INSERT episode for A|42501
savepoint s3;
insert into public.pregnancy_episodes (id, user_id, lmp_date, due_date, status, ended_at, outcome_date) values ('00000000-0000-4c10-8000-00000000ec03', 'b09cd318-8f3e-4853-8d97-fc10267b3d69', date '2025-01-01', date '2025-10-08', 'given_birth', timestamptz '2025-10-01T10:00:00Z', date '2025-10-01');
rollback to savepoint s3;
\echo ### CASE H-4|authenticated A|UPDATE own episode|42501
savepoint s4;
update public.pregnancy_episodes set expected_count = 2 where id = '00000000-0000-4c10-8000-00000000ea01';
rollback to savepoint s4;
\echo ### CASE H-5|authenticated A|DELETE own episode|42501
savepoint s5;
delete from public.pregnancy_episodes where id = '00000000-0000-4c10-8000-00000000ea01';
rollback to savepoint s5;
\echo ### CASE H-1-after|authenticated A|own row still present and unchanged|OK
select id, user_id, status, expected_count from public.pregnancy_episodes order by id;

\echo === switch to anon
reset role;
set local role anon;
select current_user, session_user;
\echo ### CASE H-7|anon|SELECT|42501
savepoint s7;
select id, user_id from public.pregnancy_episodes;
rollback to savepoint s7;

reset role;
select current_user as back_to, (select count(*) from public.pregnancy_episodes) as episode_rows_owner_view;
\echo === ROLLBACK
ROLLBACK;
\echo === C1.11 psql corroboration end
