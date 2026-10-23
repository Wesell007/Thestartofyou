\echo == migration history
select count(*) history, min(version), max(version) from supabase_migrations.schema_migrations;
\echo == schemas with user objects (tables / functions)
select n.nspname, (select count(*) from pg_class c where c.relnamespace=n.oid and c.relkind in ('r','p')) tables, (select count(*) from pg_proc p where p.pronamespace=n.oid) functions
from pg_namespace n where n.nspname in ('public','private','pgmq','cron','net','vault','storage','auth') order by 1;
\echo == RLS: public/private tables without RLS (expect 0)
select n.nspname||'.'||c.relname from pg_class c join pg_namespace n on n.oid=c.relnamespace where n.nspname in ('public','private') and c.relkind='r' and not c.relrowsecurity;
\echo == RLS summary
select n.nspname, count(*) tables, count(*) filter (where c.relrowsecurity) rls_on, (select count(*) from pg_policies p where p.schemaname=n.nspname) policies from pg_class c join pg_namespace n on n.oid=c.relnamespace where n.nspname in ('public','private') and c.relkind='r' group by 1 order by 1;
\echo == SECURITY DEFINER in public/private without a fixed search_path (expect 0)
select n.nspname||'.'||p.proname from pg_proc p join pg_namespace n on n.oid=p.pronamespace where n.nspname in ('public','private') and p.prosecdef and not exists (select 1 from unnest(coalesce(p.proconfig,'{}')) c where c like 'search_path=%');
\echo == SECURITY DEFINER count / owners
select n.nspname, count(*) secdef, string_agg(distinct pg_get_userbyid(p.proowner), ',') owners from pg_proc p join pg_namespace n on n.oid=p.pronamespace where n.nspname in ('public','private') and p.prosecdef group by 1;
\echo == SECURITY DEFINER in public executable by anon (review list)
select p.proname from pg_proc p join pg_namespace n on n.oid=p.pronamespace where n.nspname='public' and p.prosecdef and has_function_privilege('anon', p.oid, 'EXECUTE') order by 1;
\echo == private function EXECUTE (non-worker roles; worker surface count)
select r.rolname, count(*) from pg_proc p join pg_namespace n on n.oid=p.pronamespace cross join (values ('anon'),('authenticated'),('service_role')) r(rolname) where n.nspname='private' and has_function_privilege(r.rolname, p.oid, 'EXECUTE') group by 1;
select count(*) worker_surface from pg_proc p join pg_namespace n on n.oid=p.pronamespace where n.nspname='private' and has_function_privilege('account_deletion_worker', p.oid, 'EXECUTE');
\echo == worker role
select rolname, rolcanlogin, rolbypassrls, rolsuper, rolinherit, rolpassword is null as no_password_visible from pg_roles where rolname='account_deletion_worker';
select has_table_privilege('account_deletion_worker','private.account_deletion_requests','SELECT') worker_table_select;
\echo == triggers on auth.users
select tgname, tgenabled from pg_trigger where tgrelid='auth.users'::regclass and not tgisinternal order by 1;
\echo == storage buckets
select id, public from storage.buckets order by 1;
\echo == cron jobs (no command text)
select jobname, schedule, active, command ilike '%vault.decrypted_secrets%' as gated_on_vault, command ilike '%service_role%' or command ilike '%Bearer%' as privileged_cred_in_command from cron.job order by 1;
\echo == Vault secret NAMES (count)
select count(*) vault_secrets from vault.secrets;
\echo == pg_net: version, outbound requests ever queued / responses
select extversion from pg_extension where extname='pg_net';
select (select count(*) from net.http_request_queue) queued, (select count(*) from net._http_response) responses;
\echo == cron run history (last 10 min): runs and failures per job
select j.jobname, count(*) runs, count(*) filter (where d.status <> 'succeeded') not_succeeded from cron.job_run_details d join cron.job j on j.jobid=d.jobid where d.start_time > now() - interval '10 minutes' group by 1 order by 1;
\echo == data
select (select count(*) from auth.users) auth_users, (select count(*) from storage.objects) objects, (select count(*) from private.account_deletion_requests) n10_requests;
\echo == extensions
select string_agg(extname||' '||extversion, ', ' order by extname) from pg_extension;
