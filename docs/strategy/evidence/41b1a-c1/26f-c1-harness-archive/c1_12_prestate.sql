\pset format aligned
\pset footer off
\echo === C1.12 pre-state (read-only, owner session)
select now() as checked_at, current_user, session_user, (select project_ref || ' / ' || run_label from public.c1_rehearsal_marker) as marker;
select (select count(*) from supabase_migrations.schema_migrations) as history, (select count(*) from auth.users) as users, (select count(*) from auth.users where email is null or email not like '%@example.invalid') as non_synthetic,
 (select count(*) from public.pregnancy_episodes) as episodes,
 (select user_id from public.pregnancy_episodes where id='00000000-0000-4c10-8000-00000000ea01') as ea1_owner,
 (select user_id from public.pregnancy_episodes where id='00000000-0000-4c10-8000-00000000eb01') as eb1_owner,
 (select count(*) from pg_constraint where contype='f' and confrelid='public.pregnancy_episodes'::regclass) as ownership_fks,
 (select count(*) from pg_constraint where contype='f' and confrelid='public.pregnancy_episodes'::regclass and convalidated) as validated,
 (select (select count(*) from public.reflections where pregnancy_episode_id is not null)+(select count(*) from public.week_photos where pregnancy_episode_id is not null)+(select count(*) from public.week_media_memories where pregnancy_episode_id is not null)+(select count(*) from public.pregnancy_appointments where pregnancy_episode_id is not null)+(select count(*) from public.pregnancy_symptom_notes where pregnancy_episode_id is not null)+(select count(*) from public.baby_movement_notes where pregnancy_episode_id is not null)+(select count(*) from public.birth_plans where pregnancy_episode_id is not null)+(select count(*) from public.hospital_bag_items where pregnancy_episode_id is not null)+(select count(*) from public.midwife_questions where pregnancy_episode_id is not null)+(select count(*) from public.contraction_sessions where pregnancy_episode_id is not null)+(select count(*) from public.contraction_events where pregnancy_episode_id is not null)+(select count(*) from public.babies where pregnancy_episode_id is not null)) as links_non_null,
 (select count(*) from public.journeys where current_pregnancy_episode_id is not null) as pointers_non_null,
 (select count(*) from pg_stat_activity where state='idle in transaction') as idle_in_tx,
 (select count(*) from pg_locks l join pg_class c on c.oid=l.relation join pg_namespace n on n.oid=c.relnamespace where n.nspname='public' and l.mode='AccessExclusiveLock') as access_exclusive,
 (select count(*) from pg_class c join pg_namespace n on n.oid=c.relnamespace where n.nspname='public' and c.relname like 'c1\_scratch%') as scratch;
\echo === E-A1 / E-B1 full rows (pre-test reference)
select id, user_id, status, lmp_date, due_date, ended_at, outcome_date, removed_at, expected_count, status_changed_at, created_at, updated_at from public.pregnancy_episodes order by id;
\echo === RLS state
select relrowsecurity, relforcerowsecurity from pg_class where oid='public.pregnancy_episodes'::regclass;
\echo === raw ACL (pg_class.relacl)
select relacl from pg_class where oid='public.pregnancy_episodes'::regclass;
select unnest(relacl)::text as acl_item from pg_class where oid='public.pregnancy_episodes'::regclass;
\echo === information_schema.role_table_grants
select grantee, privilege_type, is_grantable from information_schema.role_table_grants where table_schema='public' and table_name='pregnancy_episodes' order by grantee, privilege_type;
\echo === has_table_privilege predicates
select r.rolname, has_table_privilege(r.rolname, 'public.pregnancy_episodes', 'SELECT') as can_select, has_table_privilege(r.rolname, 'public.pregnancy_episodes', 'INSERT') as can_insert, has_table_privilege(r.rolname, 'public.pregnancy_episodes', 'UPDATE') as can_update, has_table_privilege(r.rolname, 'public.pregnancy_episodes', 'DELETE') as can_delete, has_table_privilege(r.rolname, 'public.pregnancy_episodes', 'TRUNCATE') as can_truncate from pg_roles r where r.rolname in ('authenticated','anon','service_role','postgres') order by r.rolname;
select has_table_privilege('public', 'public.pregnancy_episodes', 'SELECT') as public_can_select;
\echo === four owner policies (live definitions)
select polname, case polcmd when 'r' then 'SELECT' when 'a' then 'INSERT' when 'w' then 'UPDATE' when 'd' then 'DELETE' else 'ALL' end as cmd, polpermissive, array(select rolname from pg_roles where oid = any(polroles)) as roles, pg_get_expr(polqual, polrelid) as using_expr, pg_get_expr(polwithcheck, polrelid) as with_check_expr from pg_policy where polrelid='public.pregnancy_episodes'::regclass order by polname;
select count(*) as policy_count from pg_policy where polrelid='public.pregnancy_episodes'::regclass;
