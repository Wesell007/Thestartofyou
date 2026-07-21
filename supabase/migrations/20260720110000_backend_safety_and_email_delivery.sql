-- Backend safety, abuse controls and email delivery consistency.
-- Forward-only remediation for AI rate limiting and the email queue worker.

-- ---------------------------------------------------------------------------
-- Public AI request rate limits. Only service_role can consume counters.
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.ai_rate_limits (
  rate_key TEXT PRIMARY KEY,
  window_started_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  request_count INTEGER NOT NULL DEFAULT 0 CHECK (request_count >= 0),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.ai_rate_limits ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.consume_ai_rate_limit(
  p_key TEXT,
  p_limit INTEGER,
  p_window_seconds INTEGER
)
RETURNS TABLE(allowed BOOLEAN, retry_after_seconds INTEGER)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF length(p_key) < 8 OR length(p_key) > 256 OR p_limit < 1 OR p_window_seconds < 1 THEN
    RAISE EXCEPTION 'Invalid rate-limit arguments';
  END IF;

  RETURN QUERY
  WITH counter AS (
    INSERT INTO public.ai_rate_limits AS limits (
      rate_key, window_started_at, request_count, updated_at
    ) VALUES (
      p_key, now(), 1, now()
    )
    ON CONFLICT (rate_key) DO UPDATE SET
      window_started_at = CASE
        WHEN limits.window_started_at + make_interval(secs => p_window_seconds) <= now()
          THEN now()
        ELSE limits.window_started_at
      END,
      request_count = CASE
        WHEN limits.window_started_at + make_interval(secs => p_window_seconds) <= now()
          THEN 1
        ELSE limits.request_count + 1
      END,
      updated_at = now()
    RETURNING window_started_at, request_count
  )
  SELECT
    counter.request_count <= p_limit,
    CASE
      WHEN counter.request_count <= p_limit THEN 0
      ELSE GREATEST(
        1,
        CEIL(EXTRACT(EPOCH FROM (
          counter.window_started_at + make_interval(secs => p_window_seconds) - now()
        )))::INTEGER
      )
    END
  FROM counter;
END;
$$;

REVOKE ALL ON TABLE public.ai_rate_limits FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.consume_ai_rate_limit(TEXT, INTEGER, INTEGER)
  FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.consume_ai_rate_limit(TEXT, INTEGER, INTEGER)
  TO service_role;

-- ---------------------------------------------------------------------------
-- Email log status used by the queue worker when the provider returns 429.
-- ---------------------------------------------------------------------------
ALTER TABLE public.email_send_log
  DROP CONSTRAINT IF EXISTS email_send_log_status_check;
ALTER TABLE public.email_send_log
  ADD CONSTRAINT email_send_log_status_check
  CHECK (status IN (
    'pending', 'sent', 'suppressed', 'failed', 'rate_limited',
    'bounced', 'complained', 'dlq'
  ));

-- ---------------------------------------------------------------------------
-- Return PGMQ's enqueue timestamp so TTL remains effective when old producers
-- did not put queued_at in the JSON payload.
-- ---------------------------------------------------------------------------
DROP FUNCTION IF EXISTS public.read_email_batch(TEXT, INTEGER, INTEGER);

CREATE FUNCTION public.read_email_batch(queue_name TEXT, batch_size INT, vt INT)
RETURNS TABLE(
  msg_id BIGINT,
  read_ct INT,
  message JSONB,
  enqueued_at TIMESTAMPTZ
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pgmq
AS $$
BEGIN
  RETURN QUERY
    SELECT r.msg_id, r.read_ct, r.message, r.enqueued_at
    FROM pgmq.read(queue_name, vt, batch_size) AS r;
EXCEPTION WHEN undefined_table THEN
  PERFORM pgmq.create(queue_name);
  RETURN;
END;
$$;

REVOKE EXECUTE ON FUNCTION public.read_email_batch(TEXT, INTEGER, INTEGER)
  FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.read_email_batch(TEXT, INTEGER, INTEGER)
  TO service_role;

-- ---------------------------------------------------------------------------
-- Delivery claims close the pre-send check race. Provider requests must use a
-- stable idempotency key as the final protection against a crash after send.
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.email_delivery_claims (
  message_id TEXT PRIMARY KEY,
  status TEXT NOT NULL CHECK (status IN ('processing', 'sent')),
  lease_until TIMESTAMPTZ NOT NULL,
  claimed_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  completed_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.email_delivery_claims ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON TABLE public.email_delivery_claims FROM PUBLIC, anon, authenticated;

CREATE OR REPLACE FUNCTION public.claim_email_delivery(
  p_message_id TEXT,
  p_lease_seconds INTEGER DEFAULT 120
)
RETURNS TEXT
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  claimed_status TEXT;
  existing_status TEXT;
BEGIN
  IF length(p_message_id) < 1 OR length(p_message_id) > 200
    OR p_lease_seconds < 30 OR p_lease_seconds > 900 THEN
    RAISE EXCEPTION 'Invalid delivery claim arguments';
  END IF;

  INSERT INTO public.email_delivery_claims AS claims (
    message_id, status, lease_until, claimed_at, updated_at
  ) VALUES (
    p_message_id,
    'processing',
    now() + make_interval(secs => p_lease_seconds),
    now(),
    now()
  )
  ON CONFLICT (message_id) DO UPDATE SET
    status = 'processing',
    lease_until = EXCLUDED.lease_until,
    claimed_at = now(),
    updated_at = now()
  WHERE claims.status = 'processing' AND claims.lease_until <= now()
  RETURNING status INTO claimed_status;

  IF claimed_status = 'processing' THEN
    RETURN 'claimed';
  END IF;

  SELECT status INTO existing_status
  FROM public.email_delivery_claims
  WHERE message_id = p_message_id;
  RETURN CASE WHEN existing_status = 'sent' THEN 'sent' ELSE 'busy' END;
END;
$$;

CREATE OR REPLACE FUNCTION public.complete_email_delivery(
  p_queue_name TEXT,
  p_queue_message_id BIGINT,
  p_message_id TEXT,
  p_template_name TEXT,
  p_recipient_email TEXT
)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pgmq
AS $$
DECLARE
  deleted BOOLEAN;
BEGIN
  INSERT INTO public.email_send_log (
    message_id, template_name, recipient_email, status
  ) VALUES (
    p_message_id, p_template_name, p_recipient_email, 'sent'
  )
  ON CONFLICT (message_id) WHERE status = 'sent' DO NOTHING;

  UPDATE public.email_delivery_claims
  SET status = 'sent', completed_at = now(), lease_until = now(), updated_at = now()
  WHERE message_id = p_message_id;

  SELECT pgmq.delete(p_queue_name, p_queue_message_id) INTO deleted;
  RETURN COALESCE(deleted, FALSE);
END;
$$;

CREATE OR REPLACE FUNCTION public.release_email_delivery(p_message_id TEXT)
RETURNS VOID
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  DELETE FROM public.email_delivery_claims
  WHERE message_id = p_message_id AND status = 'processing';
$$;

REVOKE EXECUTE ON FUNCTION public.claim_email_delivery(TEXT, INTEGER)
  FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.complete_email_delivery(TEXT, BIGINT, TEXT, TEXT, TEXT)
  FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.release_email_delivery(TEXT)
  FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.claim_email_delivery(TEXT, INTEGER) TO service_role;
GRANT EXECUTE ON FUNCTION public.complete_email_delivery(TEXT, BIGINT, TEXT, TEXT, TEXT)
  TO service_role;
GRANT EXECUTE ON FUNCTION public.release_email_delivery(TEXT) TO service_role;

-- ---------------------------------------------------------------------------
-- Repository-owned queue dispatch functions. Deployments must add vault
-- secrets named email_queue_function_url and email_queue_service_role_key.
-- ---------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.email_queue_dispatch()
RETURNS BIGINT
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, vault, net
AS $$
DECLARE
  function_url TEXT;
  service_key TEXT;
  request_id BIGINT;
BEGIN
  SELECT decrypted_secret INTO function_url
  FROM vault.decrypted_secrets
  WHERE name = 'email_queue_function_url'
  ORDER BY created_at DESC
  LIMIT 1;

  SELECT decrypted_secret INTO service_key
  FROM vault.decrypted_secrets
  WHERE name = 'email_queue_service_role_key'
  ORDER BY created_at DESC
  LIMIT 1;

  IF function_url IS NULL OR service_key IS NULL THEN
    RAISE EXCEPTION 'Email queue dispatch vault secrets are not configured';
  END IF;

  SELECT net.http_post(
    url := function_url,
    headers := jsonb_build_object(
      'Authorization', 'Bearer ' || service_key,
      'Content-Type', 'application/json'
    ),
    body := '{}'::jsonb
  ) INTO request_id;
  RETURN request_id;
END;
$$;

CREATE OR REPLACE FUNCTION public.email_queue_wake()
RETURNS BIGINT
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT public.email_queue_dispatch();
$$;

REVOKE EXECUTE ON FUNCTION public.email_queue_dispatch()
  FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.email_queue_wake()
  FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.email_queue_dispatch() TO service_role;
GRANT EXECUTE ON FUNCTION public.email_queue_wake() TO service_role;
