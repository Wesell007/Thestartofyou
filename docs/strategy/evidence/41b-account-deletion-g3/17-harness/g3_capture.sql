-- G3 read-only nine-section catalogue capture in the C1 line formats (public schema, metadata only).
-- Usage: g3_psql.sh -v dir=<output dir> -f g3_capture.sql
\pset format unaligned
\pset tuples_only on
\pset footer off
\o :dir/sec_columns.txt
select table_name || '|' || column_name || '|' || data_type || '|' || udt_name || '|' || is_nullable || '|' || coalesce(column_default, '') from information_schema.columns where table_schema = 'public' order by 1;
\o :dir/sec_enums.txt
select line from (select t.typname || '|' || string_agg(e.enumlabel, ',' order by e.enumsortorder) as line from pg_type t join pg_enum e on e.enumtypid = t.oid join pg_namespace n on n.oid = t.typnamespace where n.nspname = 'public' group by t.typname) x order by 1;
\o :dir/sec_functions_def.txt
select p.proname || '|' || pg_get_function_identity_arguments(p.oid) || '|' || p.prosecdef::text || '|' || md5(pg_get_functiondef(p.oid)) from pg_proc p join pg_namespace n on n.oid = p.pronamespace where n.nspname = 'public' order by 1;
\o :dir/sec_functions_prosrc.txt
select p.proname || '|' || pg_get_function_identity_arguments(p.oid) || '|' || p.prosecdef::text || '|' || md5(p.prosrc) from pg_proc p join pg_namespace n on n.oid = p.pronamespace where n.nspname = 'public' order by 1;
\o :dir/sec_triggers.txt
select c.relname || '|' || t.tgname || '|' || md5(pg_get_triggerdef(t.oid)) from pg_trigger t join pg_class c on c.oid = t.tgrelid join pg_namespace n on n.oid = c.relnamespace where n.nspname = 'public' and not t.tgisinternal order by 1;
\o :dir/sec_rls.txt
select c.relname || '|' || c.relrowsecurity::text || case when c.relforcerowsecurity then '|forced' else '' end from pg_class c join pg_namespace n on n.oid = c.relnamespace where n.nspname = 'public' and c.relkind = 'r' order by 1;
\o :dir/sec_policies.txt
select c.relname || '|' || p.polname || '|' || case p.polcmd when 'r' then 'SELECT' when 'a' then 'INSERT' when 'w' then 'UPDATE' when 'd' then 'DELETE' else 'ALL' end || '|{' || array_to_string(array(select rolname from pg_roles where oid = any(p.polroles)), ',') || '}' || '|' || case when p.polpermissive then 'PERMISSIVE' else 'RESTRICTIVE' end || '|' || coalesce(regexp_replace(pg_get_expr(p.polqual, p.polrelid), '\s+', ' ', 'g'), '') || '|' || coalesce(regexp_replace(pg_get_expr(p.polwithcheck, p.polrelid), '\s+', ' ', 'g'), '') from pg_policy p join pg_class c on c.oid = p.polrelid join pg_namespace n on n.oid = c.relnamespace where n.nspname = 'public' order by 1;
\o :dir/sec_constraints.txt
select c.relname || '|' || k.conname || '|' || pg_get_constraintdef(k.oid) from pg_constraint k join pg_class c on c.oid = k.conrelid join pg_namespace n on n.oid = c.relnamespace where n.nspname = 'public' order by 1;
\o :dir/sec_indexes.txt
select tablename || '|' || indexname || '|' || indexdef from pg_indexes where schemaname = 'public' order by 1;
\o :dir/sec_grants.txt
select c.relname || '|' || c.relacl::text from pg_class c join pg_namespace n on n.oid = c.relnamespace where n.nspname = 'public' and c.relkind = 'r' order by 1;
\o :dir/sec_auth_users_fks.txt
select c.relname || '|' || k.conname || '|' || pg_get_constraintdef(k.oid) || '|validated=' || k.convalidated::text from pg_constraint k join pg_class c on c.oid = k.conrelid join pg_namespace n on n.oid = c.relnamespace where k.contype = 'f' and k.confrelid = 'auth.users'::regclass and n.nspname = 'public' order by 1;
\o
