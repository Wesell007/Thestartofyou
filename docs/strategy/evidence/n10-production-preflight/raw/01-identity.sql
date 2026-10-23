select current_database() db, current_user, version() pg_version, pg_postmaster_start_time() started,
  current_setting('transaction_read_only') tx_read_only, current_setting('default_transaction_read_only') default_ro,
  (select count(*) from cron.job where position('wogepxfipdipogyogced' in command) > 0) cron_jobs_naming_prod_ref,
  (select count(*) from cron.job where command ~ '[a-z]{20}\.supabase\.co' and position('wogepxfipdipogyogced' in command) = 0) cron_jobs_naming_other_ref,
  (select count(*) from vault.secrets where name ilike '%url%') vault_url_secret_names,
  (select count(*) from auth.users) auth_users_count
