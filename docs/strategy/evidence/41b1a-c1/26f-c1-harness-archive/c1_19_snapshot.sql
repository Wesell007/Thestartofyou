\pset footer off
select now() as checked_at, current_user, version(), (select project_ref || ' / ' || run_label from public.c1_rehearsal_marker) as marker,
 (select count(*) from supabase_migrations.schema_migrations) as history, (select count(*) from auth.users) as users,
 (select count(*) from auth.users where email is null or email not like '%@example.invalid') as non_synthetic,
 coalesce(to_regclass('public.pregnancy_episodes')::text, 'ABSENT') as foundation_table,
 (select count(*) from information_schema.columns where table_schema='public' and column_name in ('pregnancy_episode_id','current_pregnancy_episode_id')) as link_columns,
 (select count(*) from pg_constraint where conname like '%pregnancy_episode_owner_fkey' and convalidated) as validated_ownership_fks,
 (select count(*) from pg_constraint where conname like '%pregnancy_episode_owner_fkey' and confdeltype='r') as restrict_ownership_fks,
 (select count(*) from pg_constraint where conname='babies_id_user_id_key') as babies_key,
 (select count(*) from pg_class c join pg_namespace n on n.oid=c.relnamespace where n.nspname='public' and c.relname like 'c1\_scratch%') as scratch,
 (select count(*) from pg_stat_activity where state='idle in transaction') as idle_in_tx,
 (select count(*) from pg_locks l join pg_class c on c.oid=l.relation join pg_namespace n on n.oid=c.relnamespace where n.nspname='public' and l.mode='AccessExclusiveLock') as access_exclusive;
select email from auth.users order by email;
