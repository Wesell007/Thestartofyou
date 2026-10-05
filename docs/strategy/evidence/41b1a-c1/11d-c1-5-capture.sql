-- C1.5 read-only catalogue capture (public schema, catalogue metadata only). No DDL, no DML.
\pset format unaligned
\pset tuples_only on
\pset fieldsep '|'
\o c15/sec_columns.txt
select table_name || '|' || column_name || '|' || data_type || '|' || udt_name || '|' || is_nullable || '|' || coalesce(column_default, '') from information_schema.columns where table_schema = 'public' order by 1;
\o c15/sec_enums.txt
select line from (select t.typname || '|' || string_agg(e.enumlabel, ',' order by e.enumsortorder) as line from pg_type t join pg_enum e on e.enumtypid = t.oid join pg_namespace n on n.oid = t.typnamespace where n.nspname = 'public' group by t.typname) x order by 1;
\o c15/sec_functions.txt
select p.proname || '|' || pg_get_function_identity_arguments(p.oid) || '|' || p.prosecdef::text || '|' || md5(pg_get_functiondef(p.oid)) from pg_proc p join pg_namespace n on n.oid = p.pronamespace where n.nspname = 'public' order by 1;
\o c15/sec_triggers.txt
select c.relname || '|' || t.tgname || '|' || md5(pg_get_triggerdef(t.oid)) from pg_trigger t join pg_class c on c.oid = t.tgrelid join pg_namespace n on n.oid = c.relnamespace where n.nspname = 'public' and not t.tgisinternal order by 1;
\o c15/sec_rls.txt
select c.relname || '|' || c.relrowsecurity::text || case when c.relforcerowsecurity then '|forced' else '' end from pg_class c join pg_namespace n on n.oid = c.relnamespace where n.nspname = 'public' and c.relkind = 'r' order by 1;
\o c15/sec_policies.txt
select c.relname || '|' || p.polname || '|' || case p.polcmd when 'r' then 'SELECT' when 'a' then 'INSERT' when 'w' then 'UPDATE' when 'd' then 'DELETE' else 'ALL' end || '|{' || array_to_string(array(select rolname from pg_roles where oid = any(p.polroles)), ',') || '}' || '|' || case when p.polpermissive then 'PERMISSIVE' else 'RESTRICTIVE' end || '|' || coalesce(regexp_replace(pg_get_expr(p.polqual, p.polrelid), '\s+', ' ', 'g'), '') || '|' || coalesce(regexp_replace(pg_get_expr(p.polwithcheck, p.polrelid), '\s+', ' ', 'g'), '') from pg_policy p join pg_class c on c.oid = p.polrelid join pg_namespace n on n.oid = c.relnamespace where n.nspname = 'public' order by 1;
\o c15/sec_constraints.txt
select c.relname || '|' || k.conname || '|' || pg_get_constraintdef(k.oid) from pg_constraint k join pg_class c on c.oid = k.conrelid join pg_namespace n on n.oid = c.relnamespace where n.nspname = 'public' order by 1;
\o c15/sec_indexes.txt
select tablename || '|' || indexname || '|' || indexdef from pg_indexes where schemaname = 'public' order by 1;
\o c15/sec_grants.txt
select c.relname || '|' || c.relacl::text from pg_class c join pg_namespace n on n.oid = c.relnamespace where n.nspname = 'public' and c.relkind = 'r' order by 1;
\o c15/targeted.txt
\pset tuples_only off
\pset format aligned
\pset expanded on
select now() as checked_at, current_database(), current_user, version(),
 (select project_ref || ' / ' || run_label from public.c1_rehearsal_marker) as marker,
 to_regclass('public.pregnancy_episodes') as q_absent_regclass,
 (select count(*) from information_schema.columns where table_schema='public' and ((column_name='pregnancy_episode_id') or (table_name='journeys' and column_name='current_pregnancy_episode_id'))) as q_absent_link_columns;
\echo G-1
select ordinal_position, column_name, data_type, udt_name, is_nullable, column_default from information_schema.columns where table_schema='public' and table_name='pregnancy_episodes' order by ordinal_position;
\echo G-2
select conname, contype, convalidated, pg_get_constraintdef(oid) as def from pg_constraint where conrelid='public.pregnancy_episodes'::regclass order by conname;
\echo G-3
select indexname, indexdef from pg_indexes where schemaname='public' and tablename='pregnancy_episodes' order by indexname;
\echo G-4
select tgname, tgenabled, pg_get_triggerdef(oid) as def from pg_trigger where tgrelid='public.pregnancy_episodes'::regclass and not tgisinternal;
\echo G-5
select relrowsecurity, relforcerowsecurity from pg_class where oid='public.pregnancy_episodes'::regclass;
\echo G-6
select polname, polcmd, polpermissive, array(select rolname from pg_roles where oid = any(polroles)) as roles, pg_get_expr(polqual, polrelid) as qual, pg_get_expr(polwithcheck, polrelid) as with_check from pg_policy where polrelid='public.pregnancy_episodes'::regclass order by polname;
\echo G-7
select relacl from pg_class where oid='public.pregnancy_episodes'::regclass;
select grantee, string_agg(privilege_type, ',' order by privilege_type) as privileges from information_schema.role_table_grants where table_schema='public' and table_name='pregnancy_episodes' group by grantee order by grantee;
\echo G-8
select c.relname, k.conname, k.confdeltype::text as del, k.convalidated, pg_get_constraintdef(k.oid) as def from pg_constraint k join pg_class c on c.oid=k.conrelid where k.contype='f' and k.confrelid='public.pregnancy_episodes'::regclass order by c.relname;
select count(*) as fk_total, count(*) filter (where confdeltype='r') as restrict_count, count(*) filter (where not convalidated) as not_valid_count from pg_constraint where contype='f' and confrelid='public.pregnancy_episodes'::regclass;
\echo G-9
select tablename, indexname, indexdef from pg_indexes where schemaname='public' and indexname ~ '_pregnancy_episode_idx$' order by indexname;
\echo G-10
select conrelid::regclass as tbl, conname, pg_get_constraintdef(oid) as def from pg_constraint where conname='babies_id_user_id_key';
\echo G-11
select conrelid::regclass as tbl, conname, convalidated, pg_get_constraintdef(oid) as def from pg_constraint where conname in ('reflections_user_id_week_key','week_photos_user_id_week_key','week_media_memories_user_id_week_media_type_key','birth_plans_user_id_key','hospital_bag_items_user_id_category_item_key_key','first_year_entries_baby_id_fkey','first_year_care_events_baby_id_fkey','first_year_memories_baby_id_fkey','first_year_reminders_baby_id_fkey','contraction_sessions_id_user_id_key') order by conname;
select indexname, indexdef from pg_indexes where schemaname='public' and indexname in ('babies_user_birth_order_idx','babies_one_primary_per_user_idx') order by indexname;
\echo DATA-NEUTRALITY
select (select count(*) from public.pregnancy_episodes) as episode_rows,
 (select count(*) from public.journeys where current_pregnancy_episode_id is not null) as journey_pointers_non_null,
 (select count(*) from public.reflections where pregnancy_episode_id is not null)+(select count(*) from public.week_photos where pregnancy_episode_id is not null)+(select count(*) from public.week_media_memories where pregnancy_episode_id is not null)+(select count(*) from public.pregnancy_appointments where pregnancy_episode_id is not null)+(select count(*) from public.pregnancy_symptom_notes where pregnancy_episode_id is not null)+(select count(*) from public.baby_movement_notes where pregnancy_episode_id is not null)+(select count(*) from public.birth_plans where pregnancy_episode_id is not null)+(select count(*) from public.hospital_bag_items where pregnancy_episode_id is not null)+(select count(*) from public.midwife_questions where pregnancy_episode_id is not null)+(select count(*) from public.contraction_sessions where pregnancy_episode_id is not null)+(select count(*) from public.contraction_events where pregnancy_episode_id is not null)+(select count(*) from public.babies where pregnancy_episode_id is not null) as link_values_non_null,
 (select count(*) from public.journeys)+(select count(*) from public.pregnancy_journeys)+(select count(*) from public.first_year_journeys)+(select count(*) from public.ttc_journeys)+(select count(*) from public.babies)+(select count(*) from public.reflections)+(select count(*) from public.week_photos)+(select count(*) from public.week_media_memories)+(select count(*) from public.pregnancy_appointments)+(select count(*) from public.pregnancy_symptom_notes)+(select count(*) from public.baby_movement_notes)+(select count(*) from public.birth_plans)+(select count(*) from public.hospital_bag_items)+(select count(*) from public.midwife_questions)+(select count(*) from public.contraction_sessions)+(select count(*) from public.contraction_events) as fixture_rows,
 (select count(*) from auth.users) as auth_users,
 (select count(*) from auth.users where email is null or email not like '%@example.invalid') as non_synthetic_users;
\echo BOOKKEEPING
select count(*) as history_rows, min(version) as first_version, max(version) as last_version, count(*) filter (where version > '20260915224603' or name ilike '%41b%') as rows_outside_baseline from supabase_migrations.schema_migrations;
\echo ANOMALY
select (select count(*) from pg_stat_activity where state='idle in transaction') as idle_in_transaction,
 (select count(*) from pg_locks l join pg_class c on c.oid=l.relation join pg_namespace n on n.oid=c.relnamespace where n.nspname='public' and l.mode='AccessExclusiveLock') as access_exclusive_locks_public,
 (select count(*) from pg_class c join pg_namespace n on n.oid=c.relnamespace where n.nspname='public' and c.relname like 'c1_scratch%') as scratch_objects;
\o
