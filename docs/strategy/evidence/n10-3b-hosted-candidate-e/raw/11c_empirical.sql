\pset footer off
\set ON_ERROR_STOP 0
\echo '== T1 worker: read pg_net request queue columns (structure only)'
begin; set local role account_deletion_worker;
select current_user, count(*) queued from net.http_request_queue;
select column_name, data_type from information_schema.columns where table_schema='net' and table_name='http_request_queue' order by ordinal_position;
rollback;
\echo '== T2 worker: enqueue an outbound HTTP request (rolled back; never sent)'
begin; set local role account_deletion_worker;
select net.http_get(url := 'https://example.invalid/n103b-privilege-probe') is not null as enqueued;
select count(*) queued_in_txn from net.http_request_queue;
rollback;
select count(*) queued_after_rollback from net.http_request_queue;
\echo '== T3 worker: tamper with queue/response rows (rolled back)'
begin; set local role account_deletion_worker;
update net.http_request_queue set url = url where false;
delete from net._http_response where false;
select 'update/delete on net tables permitted' as t3;
rollback;
\echo '== T4 worker: cron history delete (rolled back)'
begin; set local role account_deletion_worker;
delete from cron.job_run_details where false;
select 'delete on cron.job_run_details permitted' as t4;
rollback;
\echo '== T5 worker: cron.job read'
begin; set local role account_deletion_worker;
select jobname, schedule from cron.job;
rollback;
\echo '== T6 worker: direct auth/storage/private/public access (expect denied each)'
begin; set local role account_deletion_worker; select count(*) from auth.users; rollback;
begin; set local role account_deletion_worker; select count(*) from storage.objects; rollback;
begin; set local role account_deletion_worker; select count(*) from private.account_deletion_requests; rollback;
begin; set local role account_deletion_worker; select count(*) from public.profiles; rollback;
begin; set local role account_deletion_worker; select vault.create_secret('x','y'); rollback;
begin; set local role account_deletion_worker; select count(*) from vault.decrypted_secrets; rollback;
begin; set local role account_deletion_worker; select cron.schedule('x','* * * * *','select 1'); rollback;
\echo '== T7 worker: call a trigger function directly (expect error)'
begin; set local role account_deletion_worker; select public.set_updated_at(); rollback;
\echo '== T8 worker: pg_terminate_backend on another role backend (expect permission error)'
begin; set local role account_deletion_worker;
select pg_terminate_backend(pid) from pg_stat_activity where usename='postgres' and pid <> pg_backend_pid() limit 1;
rollback;
\echo '== T9 worker: net.worker_restart / wake (rolled back txn; C functions)'
begin; set local role account_deletion_worker; select net.wake(); rollback;
\echo '== T10 can a postgres-run migration revoke PUBLIC on net? (rolled back)'
begin;
revoke all on net.http_request_queue from public;
revoke usage on schema net from public;
select c.relacl::text from pg_class c where c.oid='net.http_request_queue'::regclass;
select nspacl::text from pg_namespace where nspname='net';
rollback;
