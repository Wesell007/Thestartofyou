\pset footer off
\set ON_ERROR_STOP 0
select 'whoami', current_user;
\echo '== denied: Auth / Storage / private / app / e-mail / vault / cron'
select count(*) from auth.users;
select count(*) from storage.objects;
select count(*) from private.account_deletion_requests;
select count(*) from public.profiles;
select count(*) from public.email_send_log;
select count(*) from public.email_unsubscribe_tokens;
select count(*) from public.suppressed_emails;
begin; delete from public.email_send_log where false; rollback;
select count(*) from vault.decrypted_secrets;
select cron.schedule('n105-probe','* * * * *','select 1');
select private.n10_lock_leased(gen_random_uuid(), 'x', 'requested');
select private.n10_forget_email_records();
select public.email_queue_dispatch();
\echo '== pg_net (documented platform residual; rolled back)'
select count(*) as visible_queue_rows from net.http_request_queue;
begin;
select net.http_get(url := 'https://example.invalid/n105-privilege-probe') is not null as enqueued_in_txn;
rollback;
\echo '== allowed N10 surface'
select private.auth_user_exists('00000000-0000-0000-0000-000000000000'::uuid) as auth_user_exists_zero;
select private.n10_alerts_pending_count() as alerts_pending;
