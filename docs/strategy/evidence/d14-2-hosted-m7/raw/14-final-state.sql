\echo == history
select count(*) history, max(version) from supabase_migrations.schema_migrations;
\echo == requests (no user ids)
select left(id::text,8) req, status, user_id is not null has_user, analytics_status, analytics_attempt_count att, analytics_last_error, analytics_attention_since is not null attention, analytics_persons_found pf, alert_key, completed_at is not null completed from private.account_deletion_requests order by requested_at;
\echo == worker surface
select string_agg(p.proname, ', ' order by p.proname), count(*) from pg_proc p join pg_namespace n on n.oid=p.pronamespace where n.nspname='private' and has_function_privilege('account_deletion_worker', p.oid, 'EXECUTE');
\echo == non-worker roles with EXECUTE on any private function
select r.rolname, count(*) from pg_proc p join pg_namespace n on n.oid=p.pronamespace cross join (values ('anon'),('authenticated'),('service_role')) r(rolname) where n.nspname='private' and has_function_privilege(r.rolname, p.oid, 'EXECUTE') group by 1;
\echo == vault / cron
select count(*) vault_secrets from vault.secrets;
select jobname, active from cron.job order by 1;
\echo == auth users / storage
select count(*) auth_users from auth.users;
select bucket_id, count(*) from storage.objects group by 1 order by 1;
