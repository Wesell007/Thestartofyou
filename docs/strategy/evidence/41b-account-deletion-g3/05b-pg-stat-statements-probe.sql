\pset footer off
select r.rolname, count(*) as stmts, count(*) filter (where s.query like '<insufficient%') as hidden
from extensions.pg_stat_statements s join pg_roles r on r.oid = s.userid group by r.rolname order by 1;
select pg_has_role('postgres','pg_read_all_stats','member') as postgres_reads_all_stats;
select s.calls, left(regexp_replace(s.query,'\s+',' ','g'),120) as query from extensions.pg_stat_statements s join pg_roles r on r.oid=s.userid where r.rolname='supabase_auth_admin' and s.query ilike '%delete%' order by 2 limit 10;
select t.tgname, t.oid, t.tgfoid::regproc::text as fn, k.conrelid::regclass::text as child, k.conname
from pg_trigger t join pg_constraint k on k.oid=t.tgconstraint
where t.tgrelid='auth.users'::regclass and t.tgisinternal and t.tgfoid::regproc::text like '%del%' order by t.tgname;
