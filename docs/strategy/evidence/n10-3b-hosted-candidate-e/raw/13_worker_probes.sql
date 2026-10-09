\pset footer off
\set ON_ERROR_STOP 0
select 'whoami', current_user, session_user;
\echo '== NEGATIVE: direct Auth / Storage / private / app data (expect permission denied each)'
select count(*) from auth.users;
begin; update auth.users set email = email where false; rollback;
begin; delete from auth.users where false; rollback;
select count(*) from storage.objects;
begin; insert into storage.objects(bucket_id, name) values ('weekly-photos', 'x'); rollback;
begin; update storage.objects set name = name where false; rollback;
begin; delete from storage.objects where false; rollback;
select count(*) from storage.buckets;
select count(*) from private.account_deletion_requests;
begin; insert into private.account_deletion_requests(user_id) values (gen_random_uuid()); rollback;
select count(*) from public.profiles;
begin; insert into public.profiles(id) values (gen_random_uuid()); rollback;
select count(*) from public.journeys;
select count(*) from vault.decrypted_secrets;
begin; select vault.create_secret('x','y'); rollback;
begin; select cron.schedule('n103b-probe','* * * * *','select 1'); rollback;
\echo '== NEGATIVE: internal N10 functions not granted (expect permission denied)'
select private.n10_lock_leased(gen_random_uuid(), 'x', 'requested');
select private.n10_retry_delay(1);
select private.account_media_access_allowed();
\echo '== NEGATIVE: trigger function called directly (expect error)'
select public.set_updated_at();
\echo '== NEGATIVE: signal another role backend (expect permission error / no-op)'
select pg_terminate_backend(pid) from pg_stat_activity where usename = 'postgres' and pid <> pg_backend_pid() limit 1;
\echo '== PG_NET SURFACE (inherited from PUBLIC; rolled back)'
select count(*) as visible_queue_rows from net.http_request_queue;
select count(*) as visible_response_rows from net._http_response;
begin;
select net.http_get(url := 'https://example.invalid/n103b-privilege-probe') is not null as enqueued_in_txn;
select count(*) as queue_rows_in_txn from net.http_request_queue;
rollback;
begin; update net.http_request_queue set url = url where false; select 'net queue UPDATE permitted' t; rollback;
begin; delete from net._http_response where false; select 'net response DELETE permitted' t; rollback;
\echo '== CRON SURFACE'
select jobname, schedule from cron.job;
begin; delete from cron.job_run_details where false; select 'cron.job_run_details DELETE permitted' t; rollback;
\echo '== POSITIVE: intended N10 functions'
select private.auth_user_exists('00000000-0000-0000-0000-000000000000'::uuid) as auth_user_exists_zero;
select count(*) as canonical_rows from private.account_media_canonical('00000000-0000-0000-0000-000000000000'::uuid, 10);
select private.account_media_anomaly_count('00000000-0000-0000-0000-000000000000'::uuid) as anomalies;
select count(*) as claimed from private.n10_claim_due(5, 120);
