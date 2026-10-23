select id, status, user_id is not null has_user, md5((to_jsonb(r))::text) row_md5, attempt_count, next_attempt_at, last_error_class from private.account_deletion_requests r order by requested_at;
select count(*) users from auth.users;
select bucket_id, count(*) from storage.objects group by 1 order by 1;
select jobname, schedule, active from cron.job order by 1;
select name, (decrypted_secret is not null and decrypted_secret <> '') as has_value from vault.decrypted_secrets order by 1;
