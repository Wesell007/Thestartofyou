select count(*) history, min(version), max(version) from supabase_migrations.schema_migrations;
select version from supabase_migrations.schema_migrations where version >= '20261009' order by 1;
select rolname, rolcanlogin, rolbypassrls, rolsuper, rolinherit from pg_roles where rolname='account_deletion_worker';
select extname, extversion from pg_extension where extname in ('pg_cron','pg_net','pgmq','supabase_vault') order by 1;
select id, public from storage.buckets order by 1;
select column_name from information_schema.columns where table_schema='private' and table_name='account_deletion_requests' and column_name like 'analytics%';
select p.proname from pg_proc p join pg_namespace n on n.oid=p.pronamespace where n.nspname='private' and has_function_privilege('account_deletion_worker', p.oid, 'EXECUTE') order by 1;
