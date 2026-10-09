\pset footer off
\echo '== sequences usable by worker'
select n.nspname, c.relname from pg_class c join pg_namespace n on n.oid=c.relnamespace
where c.relkind='S' and case when c.relkind='S' then has_sequence_privilege('account_deletion_worker', c.oid, 'USAGE,UPDATE') else false end;
\echo '== foreign servers usable'
select srvname from pg_foreign_server where has_server_privilege('account_deletion_worker', oid, 'USAGE');
\echo '== database privileges'
select has_database_privilege('account_deletion_worker','postgres','CONNECT') connect_, has_database_privilege('account_deletion_worker','postgres','CREATE') create_, has_database_privilege('account_deletion_worker','postgres','TEMP') temp_;
\echo '== effective table privileges in ANY schema the worker can use (incl. via PUBLIC)'
select n.nspname, c.relname, c.relkind,
  has_table_privilege('account_deletion_worker', c.oid, 'SELECT') sel,
  has_table_privilege('account_deletion_worker', c.oid, 'INSERT') ins,
  has_table_privilege('account_deletion_worker', c.oid, 'UPDATE') upd,
  has_table_privilege('account_deletion_worker', c.oid, 'DELETE') del
from pg_class c join pg_namespace n on n.oid=c.relnamespace
where c.relkind in ('r','p','v','m','f')
  and n.nspname not in ('pg_catalog','information_schema')
  and (has_table_privilege('account_deletion_worker', c.oid, 'SELECT') or has_table_privilege('account_deletion_worker', c.oid, 'INSERT')
       or has_table_privilege('account_deletion_worker', c.oid, 'UPDATE') or has_table_privilege('account_deletion_worker', c.oid, 'DELETE'));
\echo '== net table ACLs'
select c.relname, c.relacl::text from pg_class c where c.relnamespace='net'::regnamespace and c.relkind='r';
\echo '== public callable function definitions'
select p.proname, pg_get_functiondef(p.oid) from pg_proc p where p.pronamespace='public'::regnamespace
 and has_function_privilege('account_deletion_worker', p.oid, 'EXECUTE') order by 1;
\echo '== net C function symbols'
select p.proname, p.prosrc, p.probin from pg_proc p where p.pronamespace='net'::regnamespace and p.prolang=(select oid from pg_language where lanname='c');
