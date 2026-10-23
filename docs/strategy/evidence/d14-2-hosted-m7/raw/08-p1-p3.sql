\echo == history
select count(*) history, max(version) from supabase_migrations.schema_migrations;
\echo == new columns
select column_name, data_type, column_default, is_nullable from information_schema.columns where table_schema='private' and table_name='account_deletion_requests' and column_name like 'analytics%' order by ordinal_position;
\echo == P1 rows: old-column projection md5 (compare to 06-pre-m7-snapshot) + analytics state
select id, status, user_id is not null has_user,
  md5(((to_jsonb(r)) - array(select column_name::text from information_schema.columns where table_schema='private' and table_name='account_deletion_requests' and column_name like 'analytics%'))::text) old_cols_md5,
  analytics_status, analytics_attempt_count,
  (select count(*) from jsonb_each(to_jsonb(r)) e where e.key like 'analytics%' and e.key not in ('analytics_status','analytics_attempt_count') and e.value <> 'null'::jsonb) other_analytics_non_null
from private.account_deletion_requests r order by requested_at;
\echo == constraints
select conname, convalidated from pg_constraint where conrelid='private.account_deletion_requests'::regclass and contype='c' order by 1;
\echo == triggers
select tgname, tgenabled from pg_trigger where tgrelid='private.account_deletion_requests'::regclass and not tgisinternal order by 1;
\echo == P3 function attributes
select p.proname, p.prosecdef secdef, p.proconfig, pg_get_userbyid(p.proowner) owner from pg_proc p join pg_namespace n on n.oid=p.pronamespace
 where n.nspname='private' and p.proname in ('n10_analytics_guard','n10_analytics_due','n10_record_analytics','n10_record_purge','n10_alerts_due','n10_alerts_pending_count') order by 1;
\echo == P3 EXECUTE matrix over every private function
select p.proname,
 has_function_privilege('anon', p.oid, 'EXECUTE') anon,
 has_function_privilege('authenticated', p.oid, 'EXECUTE') authn,
 has_function_privilege('service_role', p.oid, 'EXECUTE') service,
 has_function_privilege('account_deletion_worker', p.oid, 'EXECUTE') worker,
 coalesce((select bool_or(a.grantee = 0) from aclexplode(coalesce(p.proacl, acldefault('f', p.proowner))) a where a.privilege_type='EXECUTE'), false) public_grant
from pg_proc p join pg_namespace n on n.oid=p.pronamespace where n.nspname='private' order by 1;
\echo == worker surface count
select count(*) from pg_proc p join pg_namespace n on n.oid=p.pronamespace where n.nspname='private' and has_function_privilege('account_deletion_worker', p.oid, 'EXECUTE');
\echo == worker table privileges / attributes
select has_table_privilege('account_deletion_worker','private.account_deletion_requests','SELECT') sel, has_table_privilege('account_deletion_worker','private.account_deletion_requests','UPDATE') upd, has_table_privilege('account_deletion_worker','private.account_deletion_requests','INSERT') ins, has_table_privilege('account_deletion_worker','private.account_deletion_requests','DELETE') del;
select rolname, rolcanlogin, rolbypassrls, rolsuper, rolinherit from pg_roles where rolname='account_deletion_worker';
select r.rolname member_of from pg_auth_members m join pg_roles r on r.oid=m.roleid join pg_roles u on u.oid=m.member where u.rolname='account_deletion_worker';
