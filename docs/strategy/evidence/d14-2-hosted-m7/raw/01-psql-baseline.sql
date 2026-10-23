select current_user, inet_server_addr() is not null as server, version();
select (select count(*) from auth.users) users, (select count(*) from pg_tables where schemaname='public') public_tables,
 (select count(*) from storage.buckets) buckets, to_regclass('supabase_migrations.schema_migrations') is not null has_history;
