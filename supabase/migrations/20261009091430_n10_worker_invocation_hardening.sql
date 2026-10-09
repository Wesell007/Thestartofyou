-- N10.3A security patch (M3) — invocation-only scheduler credential.
--
-- N10.3B §11 found that hosted pg_net grants net.http_request_queue / net._http_response and the net
-- schema to PUBLIC, and those grants are owned by supabase_admin, so a postgres-run migration cannot
-- revoke them. Every database login role (including account_deletion_worker) can therefore read and
-- alter queued pg_net requests, headers included. M2 put the service-role JWT in that queue; that design
-- is rejected and superseded here. M1 and M2 are left byte-for-byte unchanged (applied history).
--
-- After M3 the N10 scheduler request carries ONLY:
--   * the worker URL                      (Vault: n10_account_deletion_worker_url)
--   * Content-Type: application/json
--   * X-N10-Worker-Token: <invocation-only secret> (Vault: n10_account_deletion_worker_invoke_secret)
--   * a fixed empty JSON body {}
-- The invocation-only secret lets a caller start the worker's normal durable-job loop and nothing else:
-- the worker accepts no target, and due work is chosen only by private.n10_claim_due (lease + SKIP LOCKED).
-- The M2 Vault name n10_account_deletion_worker_service_key is superseded and must never be populated.
-- Secret VALUES are created out-of-band and never in Git. While either secret is missing the scheduled
-- statement selects no rows and sends nothing.

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
      'X-N10-Worker-Token', s.invoke_token
    ),
    body := '{}'::jsonb,
    timeout_milliseconds := 60000
  )
  FROM (
    SELECT
      (SELECT ds.decrypted_secret FROM vault.decrypted_secrets ds
        WHERE ds.name = 'n10_account_deletion_worker_url') AS url,
      (SELECT ds.decrypted_secret FROM vault.decrypted_secrets ds
        WHERE ds.name = 'n10_account_deletion_worker_invoke_secret') AS invoke_token
  ) s
  WHERE s.url IS NOT NULL AND s.invoke_token IS NOT NULL;
  $job$
);

-- Fail the migration if the effective job is not exactly the hardened form.
DO $$
DECLARE
  v_jobs integer;
  v_command text;
BEGIN
  SELECT count(*), max(command) INTO v_jobs, v_command FROM cron.job WHERE jobname = 'n10-account-deletion-worker';
  IF v_jobs <> 1
     OR v_command NOT LIKE '%n10_account_deletion_worker_invoke_secret%'
     OR v_command NOT LIKE '%X-N10-Worker-Token%'
     OR v_command LIKE '%service_key%'
     OR v_command ILIKE '%Authorization%'
     OR v_command ILIKE '%apikey%' THEN
    RAISE EXCEPTION 'n10: hardened worker schedule was not installed as expected';
  END IF;
END $$;
