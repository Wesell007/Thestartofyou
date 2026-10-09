\pset footer off
\echo '== schema private'
select nspname, pg_get_userbyid(nspowner) owner, nspacl::text from pg_namespace where nspname='private';
\echo '== table'
select c.relname, pg_get_userbyid(c.relowner) owner, c.relrowsecurity rls, c.relforcerowsecurity force_rls, coalesce(c.relacl::text,'(null acl)') acl
from pg_class c join pg_namespace n on n.oid=c.relnamespace where n.nspname='private' and c.relkind in ('r','p') order by 1;
\echo '== FKs on request table (expect 0)'
select count(*) fk_count from pg_constraint where conrelid='private.account_deletion_requests'::regclass and contype='f';
\echo '== constraints'
select conname, contype, pg_get_constraintdef(oid) from pg_constraint where conrelid='private.account_deletion_requests'::regclass order by conname;
\echo '== indexes'
select indexname, indexdef from pg_indexes where schemaname='private' order by 1;
\echo '== policies on request table (expect none; RLS on, no grants)'
select count(*) from pg_policies where schemaname='private';
\echo '== triggers'
select tgname, pg_get_triggerdef(t.oid) from pg_trigger t where tgrelid='private.account_deletion_requests'::regclass and not tgisinternal;
\echo '== role'
select rolname, rolcanlogin login, rolsuper super, rolcreatedb createdb, rolcreaterole createrole, rolreplication repl, rolbypassrls bypassrls, rolinherit inherit, rolconnlimit, (rolpassword is not null) has_password_shadow_visible
from pg_roles where rolname='account_deletion_worker';
\echo '== worker role memberships (expect none)'
select r.rolname member_of from pg_auth_members m join pg_roles r on r.oid=m.roleid join pg_roles u on u.oid=m.member where u.rolname='account_deletion_worker';
\echo '== roles that are members of worker'
select u.rolname, m.admin_option from pg_auth_members m join pg_roles r on r.oid=m.roleid join pg_roles u on u.oid=m.member where r.rolname='account_deletion_worker';
\echo '== worker table privileges anywhere (expect 0)'
select table_schema, table_name, privilege_type from information_schema.role_table_grants where grantee='account_deletion_worker' order by 1,2,3;
\echo '== worker effective table privilege on auth.users / storage.objects / storage.buckets'
select t, has_table_privilege('account_deletion_worker', t, 'SELECT') sel, has_table_privilege('account_deletion_worker', t, 'INSERT') ins,
       has_table_privilege('account_deletion_worker', t, 'UPDATE') upd, has_table_privilege('account_deletion_worker', t, 'DELETE') del
from unnest(array['auth.users','storage.objects','storage.buckets','private.account_deletion_requests']) t;
\echo '== worker effective DML on any public table (expect 0 rows)'
select c.relname, has_table_privilege('account_deletion_worker', c.oid, 'SELECT') sel, has_table_privilege('account_deletion_worker', c.oid, 'INSERT,UPDATE,DELETE,TRUNCATE') dml
from pg_class c join pg_namespace n on n.oid=c.relnamespace where n.nspname='public' and c.relkind in ('r','p','v','m','f')
 and (has_table_privilege('account_deletion_worker', c.oid, 'SELECT') or has_table_privilege('account_deletion_worker', c.oid, 'INSERT,UPDATE,DELETE,TRUNCATE'));
\echo '== worker schema usage'
select nspname, has_schema_privilege('account_deletion_worker', oid, 'USAGE') usage, has_schema_privilege('account_deletion_worker', oid, 'CREATE') create_
from pg_namespace where nspname in ('public','private','auth','storage','extensions','vault','cron','net','graphql','graphql_public','realtime','supabase_functions','pgbouncer','n103b_rehearsal') order by 1;
\echo '== private functions'
select p.proname, pg_get_function_identity_arguments(p.oid) args, p.prosecdef secdef, pg_get_userbyid(p.proowner) owner, p.proconfig::text config,
       coalesce(p.proacl::text,'(null = default PUBLIC)') acl
from pg_proc p join pg_namespace n on n.oid=p.pronamespace where n.nspname='private' order by 1;
\echo '== private functions executable by role (expected grants)'
select p.proname,
  has_function_privilege('public', p.oid, 'EXECUTE') pub_dummy_unused,
  has_function_privilege('anon', p.oid, 'EXECUTE') anon, has_function_privilege('authenticated', p.oid, 'EXECUTE') authn,
  has_function_privilege('service_role', p.oid, 'EXECUTE') svc, has_function_privilege('account_deletion_worker', p.oid, 'EXECUTE') worker
from pg_proc p join pg_namespace n on n.oid=p.pronamespace where n.nspname='private' order by 1;
\echo '== storage.objects policies'
select policyname, cmd, roles::text, (qual is not null) has_using, (with_check is not null) has_check,
       (coalesce(qual,'')||coalesce(with_check,'')) like '%account_media_access_allowed%' guarded
from pg_policies where schemaname='storage' and tablename='objects' order by policyname;
\echo '== storage.buckets policies'
select policyname, cmd, roles::text from pg_policies where schemaname='storage' and tablename='buckets' order by 1;
\echo '== cron'
select jobid, jobname, schedule, username, active, database, md5(command) cmd_md5, length(command) cmd_len from cron.job order by jobid;
\echo '== vault secrets by name (names only)'
select name from vault.secrets order by name;
\echo '== cron runs so far for n10'
select status, count(*), min(start_time), max(start_time) from cron.job_run_details d join cron.job j on j.jobid=d.jobid where j.jobname='n10-account-deletion-worker' group by status;
\echo '== net requests so far'
select count(*) from net.http_request_queue;
select count(*) net_responses from net._http_response;
