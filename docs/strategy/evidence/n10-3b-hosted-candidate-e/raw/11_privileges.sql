\pset footer off
\echo '== schemas the worker can USE'
select n.nspname, pg_get_userbyid(n.nspowner) owner, n.nspacl::text from pg_namespace n
where has_schema_privilege('account_deletion_worker', n.oid, 'USAGE') order by 1;
\echo '== callable functions outside pg_catalog/information_schema (schema USAGE + EXECUTE)'
select n.nspname, p.proname, pg_get_function_identity_arguments(p.oid) args, p.prosecdef secdef, p.provolatile vol,
       pg_get_userbyid(p.proowner) owner, coalesce(p.proacl::text,'(default PUBLIC)') acl, l.lanname lang
from pg_proc p join pg_namespace n on n.oid=p.pronamespace join pg_language l on l.oid=p.prolang
where n.nspname not in ('pg_catalog','information_schema')
  and has_schema_privilege('account_deletion_worker', n.oid, 'USAGE')
  and has_function_privilege('account_deletion_worker', p.oid, 'EXECUTE')
order by n.nspname, p.proname;
\echo '== count by schema/secdef'
select n.nspname, p.prosecdef, count(*) from pg_proc p join pg_namespace n on n.oid=p.pronamespace
where n.nspname not in ('pg_catalog','information_schema')
  and has_schema_privilege('account_deletion_worker', n.oid, 'USAGE')
  and has_function_privilege('account_deletion_worker', p.oid, 'EXECUTE')
group by 1,2 order by 1,2;
\echo '== pg_catalog SECURITY DEFINER callable by worker'
select p.proname from pg_proc p where p.pronamespace='pg_catalog'::regnamespace and p.prosecdef
 and has_function_privilege('account_deletion_worker', p.oid, 'EXECUTE');
\echo '== sensitive pg_catalog functions (expect all f)'
select f, has_function_privilege('account_deletion_worker', f, 'EXECUTE') from unnest(array[
 'pg_read_file(text)','pg_read_binary_file(text)','pg_ls_dir(text)','pg_stat_file(text)','pg_reload_conf()',
 'pg_terminate_backend(integer,bigint)','pg_cancel_backend(integer)','lo_import(text)','lo_export(oid,text)',
 'pg_rotate_logfile()','pg_switch_wal()','pg_create_restore_point(text)']::text[]) f;
\echo '== predefined role memberships of worker (expect none)'
select r.rolname from pg_roles r where pg_has_role('account_deletion_worker', r.oid, 'MEMBER') and r.rolname <> 'account_deletion_worker';
\echo '== sequences/large objects/foreign servers usage'
select c.relname from pg_class c join pg_namespace n on n.oid=c.relnamespace where c.relkind='S'
 and has_sequence_privilege('account_deletion_worker', c.oid, 'USAGE,UPDATE');
select srvname from pg_foreign_server where has_server_privilege('account_deletion_worker', oid, 'USAGE');
\echo '== database privileges'
select has_database_privilege('account_deletion_worker','postgres','CONNECT') connect_, has_database_privilege('account_deletion_worker','postgres','CREATE') create_, has_database_privilege('account_deletion_worker','postgres','TEMP') temp_;
\echo '== net schema ACL & net function ACLs'
select p.proname, pg_get_function_identity_arguments(p.oid), p.prosecdef, coalesce(p.proacl::text,'(default PUBLIC)')
from pg_proc p where p.pronamespace='net'::regnamespace order by 1;
