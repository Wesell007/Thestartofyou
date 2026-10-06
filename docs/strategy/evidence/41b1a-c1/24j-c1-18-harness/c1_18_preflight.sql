\pset footer off
select now() as checked_at, current_user, version(), (select project_ref || ' / ' || run_label from public.c1_rehearsal_marker) as marker,
 (select count(*) from supabase_migrations.schema_migrations) as history,
 (select count(*) from pg_stat_activity where state='idle in transaction') as idle_in_tx,
 (select count(*) from pg_locks l join pg_class c on c.oid=l.relation join pg_namespace n on n.oid=c.relnamespace where n.nspname='public' and l.mode='AccessExclusiveLock') as access_exclusive,
 (select count(*) from pg_class c join pg_namespace n on n.oid=c.relnamespace where n.nspname='public' and c.relname like 'c1\_scratch%') as scratch;
select to_regclass('public.pregnancy_episodes')::text as episodes_table,
 (select count(*) from pg_constraint where contype='f' and confrelid='public.pregnancy_episodes'::regclass) as ownership_fks,
 (select count(*) from pg_constraint where contype='f' and confrelid='public.pregnancy_episodes'::regclass and convalidated) as validated,
 (select count(*) from pg_constraint where contype='f' and confrelid='public.pregnancy_episodes'::regclass and confdeltype='r') as restrict_fks,
 (select count(*) from pg_constraint where conname='babies_id_user_id_key') as babies_key,
 (select count(*) from information_schema.columns where table_schema='public' and table_name='journeys' and column_name='current_pregnancy_episode_id') as pointer_col,
 (select count(*) from information_schema.columns where table_schema='public' and column_name='pregnancy_episode_id') as link_cols,
 (select relrowsecurity::text from pg_class where oid='public.pregnancy_episodes'::regclass) as rls,
 (select count(*) from pg_policy where polrelid='public.pregnancy_episodes'::regclass) as policies,
 (select string_agg(privilege_type, ',') from information_schema.role_table_grants where table_schema='public' and table_name='pregnancy_episodes' and grantee='authenticated') as authenticated_priv;
select id, email, created_at from auth.users order by email;
select id, user_id, status, removed_at from public.pregnancy_episodes order by id;
