-- N10.4 (M5) — e-mail queue invocation hardening.
--
-- Hosted pg_net exposes queued request headers to every database login role (N10.3B §11). The e-mail
-- queue was invoked with `Authorization: Bearer <service-role key>` through pg_net, both by the
-- repository dispatcher public.email_queue_dispatch() and by the 'process-email-queue' cron job that
-- Lovable's email setup creates dynamically. That exposed a service-role key to every login role,
-- including account_deletion_worker. This migration applies the N10 M3 model to the e-mail queue:
--
--   * the request carries only the function URL, Content-Type, X-Email-Queue-Token and a fixed {} body;
--   * Vault names: email_queue_function_url (existing) and email_queue_invoke_secret (new, out-of-band);
--   * process-email-queue (verify_jwt = false) authenticates that token in-function before anything else;
--   * the 'process-email-queue' cron job is replaced by a repository-owned form that is a no-op while
--     either Vault value is missing, while the provider cool-down is active, or while both queues are empty.
--
-- The old Vault secret email_queue_service_role_key is no longer read by anything; remove it out-of-band
-- after activation. Re-running Lovable's email setup would recreate the old job and must not be done.

CREATE OR REPLACE FUNCTION public.email_queue_dispatch()
RETURNS BIGINT
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
  v_url TEXT;
  v_token TEXT;
  v_request BIGINT;
BEGIN
  SELECT ds.decrypted_secret INTO v_url
  FROM vault.decrypted_secrets ds
  WHERE ds.name = 'email_queue_function_url'
  ORDER BY ds.created_at DESC
  LIMIT 1;

  SELECT ds.decrypted_secret INTO v_token
  FROM vault.decrypted_secrets ds
  WHERE ds.name = 'email_queue_invoke_secret'
  ORDER BY ds.created_at DESC
  LIMIT 1;

  IF v_url IS NULL OR v_token IS NULL THEN
    RAISE EXCEPTION 'Email queue dispatch vault secrets are not configured';
  END IF;

  SELECT net.http_post(
    url := v_url,
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'X-Email-Queue-Token', v_token
    ),
    body := '{}'::jsonb
  ) INTO v_request;
  RETURN v_request;
END;
$$;

REVOKE ALL ON FUNCTION public.email_queue_dispatch() FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.email_queue_dispatch() TO service_role;

DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM cron.job WHERE jobname = 'process-email-queue') THEN
    PERFORM cron.unschedule('process-email-queue');
  END IF;
END $$;

SELECT cron.schedule(
  'process-email-queue',
  '5 seconds',
  $job$
  SELECT public.email_queue_dispatch()
  WHERE EXISTS (SELECT 1 FROM vault.decrypted_secrets WHERE name = 'email_queue_function_url')
    AND EXISTS (SELECT 1 FROM vault.decrypted_secrets WHERE name = 'email_queue_invoke_secret')
    AND NOT EXISTS (SELECT 1 FROM public.email_send_state WHERE retry_after_until > now())
    AND (EXISTS (SELECT 1 FROM pgmq.q_auth_emails WHERE vt <= now())
         OR EXISTS (SELECT 1 FROM pgmq.q_transactional_emails WHERE vt <= now()));
  $job$
);

-- Fail the migration unless the installed dispatcher and job are the hardened forms.
DO $$
DECLARE
  v_fn TEXT := pg_catalog.pg_get_functiondef('public.email_queue_dispatch()'::regprocedure);
  v_cmd TEXT;
  v_jobs INTEGER;
BEGIN
  SELECT count(*), max(command) INTO v_jobs, v_cmd FROM cron.job WHERE jobname = 'process-email-queue';
  IF v_fn ILIKE '%service_role%' OR v_fn ILIKE '%Authorization%' OR v_fn ILIKE '%Bearer%'
     OR v_fn NOT LIKE '%X-Email-Queue-Token%' OR v_fn NOT LIKE '%email_queue_invoke_secret%'
     OR v_jobs <> 1 OR v_cmd ILIKE '%service_role%' OR v_cmd ILIKE '%Authorization%' OR v_cmd ILIKE '%Bearer%'
     OR v_cmd NOT LIKE '%public.email_queue_dispatch()%' THEN
    RAISE EXCEPTION 'email queue dispatch was not hardened as expected';
  END IF;
END $$;
