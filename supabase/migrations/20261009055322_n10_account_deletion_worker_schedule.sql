-- N10.3A (M2) — version-controlled schedule for the account-deletion worker (frozen D10).
-- Every minute, pg_cron asks pg_net to POST to the account-deletion-worker Edge Function, the
-- documented Supabase pattern already used for the email worker.
--
-- Secrets: only Vault secret NAMES appear here. The VALUES are created out-of-band and never in Git:
--   n10_account_deletion_worker_url          full https URL of the account-deletion-worker function
--   n10_account_deletion_worker_service_key  service-role JWT the worker verifies (role = service_role)
-- Fail safe: while either secret is missing, the scheduled statement selects no rows and sends nothing.

CREATE EXTENSION IF NOT EXISTS pg_cron;
CREATE EXTENSION IF NOT EXISTS pg_net SCHEMA extensions;
CREATE EXTENSION IF NOT EXISTS supabase_vault;

DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM cron.job WHERE jobname = 'n10-account-deletion-worker') THEN
    PERFORM cron.unschedule('n10-account-deletion-worker');
  END IF;
END $$;

SELECT cron.schedule(
  'n10-account-deletion-worker',
  '* * * * *',
  $job$
  SELECT net.http_post(
    url := s.url,
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'Authorization', 'Bearer ' || s.service_key
    ),
    body := jsonb_build_object('source', 'pg_cron'),
    timeout_milliseconds := 60000
  )
  FROM (
    SELECT
      (SELECT ds.decrypted_secret FROM vault.decrypted_secrets ds
        WHERE ds.name = 'n10_account_deletion_worker_url') AS url,
      (SELECT ds.decrypted_secret FROM vault.decrypted_secrets ds
        WHERE ds.name = 'n10_account_deletion_worker_service_key') AS service_key
  ) s
  WHERE s.url IS NOT NULL AND s.service_key IS NOT NULL;
  $job$
);
