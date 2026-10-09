-- N10.4 (M4) — durable operator-alert ledger for account-deletion attention states (D5).
--
-- Real operator notification is delivered out-of-band by the account-deletion worker: after its normal
-- durable-job loop it asks the database which attention rows still need an alert, sends a minimal
-- e-mail, and records the outcome here. Deletion state never depends on notification delivery:
-- these functions only touch the alert_* columns, never status, timestamps, counters or user_id.
--
-- Policy (deduplication, no spam):
--   * first alert when a row is in auth_attention / purge_attention under a new alert key
--     (status + error class), e.g. entering attention or a meaningful error-class change;
--   * one escalation alert when the same key is still unresolved 24 hours after the first alert;
--   * nothing else on ordinary worker ticks; failed deliveries retry with backoff (5, 15, then 60 min).
-- The ledger stores no personal data: an alert key is "<status>:<error_class>".
-- M1, M2 and M3 are unchanged.

ALTER TABLE private.account_deletion_requests
  ADD COLUMN alert_key text,
  ADD COLUMN alert_sent_at timestamptz,
  ADD COLUMN alert_escalated_at timestamptz,
  ADD COLUMN alert_failure_count integer NOT NULL DEFAULT 0,
  ADD COLUMN alert_next_attempt_at timestamptz,
  ADD COLUMN alert_lease_until timestamptz,
  ADD CONSTRAINT account_deletion_requests_alert_failures_check CHECK (alert_failure_count >= 0),
  ADD CONSTRAINT account_deletion_requests_alert_key_check CHECK (alert_key IS NULL OR char_length(alert_key) <= 100);

-- Alerts that are due now, leased with SKIP LOCKED so overlapping worker runs never send the same alert.
CREATE OR REPLACE FUNCTION private.n10_alerts_due(p_limit integer, p_lease_seconds integer)
RETURNS TABLE (
  o_request_id uuid, o_kind text, o_alert_key text, o_status text, o_error_class text,
  o_attempt_count integer, o_requested_at timestamptz, o_attention_since timestamptz, o_lease text)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  IF p_limit IS NULL OR p_limit < 1 OR p_limit > 50
     OR p_lease_seconds IS NULL OR p_lease_seconds < 30 OR p_lease_seconds > 900 THEN
    RAISE EXCEPTION 'n10: invalid alert claim arguments' USING ERRCODE = '22023';
  END IF;
  RETURN QUERY
    WITH due AS (
      SELECT r.id,
             r.status || ':' || COALESCE(r.last_error_class, '-') AS k,
             CASE WHEN r.alert_key IS DISTINCT FROM r.status || ':' || COALESCE(r.last_error_class, '-')
                  THEN 'attention' ELSE 'escalation' END AS kind
      FROM private.account_deletion_requests r
      WHERE r.status IN ('auth_attention', 'purge_attention')
        AND (r.alert_lease_until IS NULL OR r.alert_lease_until < now())
        AND (r.alert_next_attempt_at IS NULL OR r.alert_next_attempt_at <= now())
        AND (r.alert_key IS DISTINCT FROM r.status || ':' || COALESCE(r.last_error_class, '-')
             OR (r.alert_escalated_at IS NULL AND r.alert_sent_at <= now() - interval '24 hours'))
      ORDER BY r.requested_at, r.id
      LIMIT p_limit
      FOR UPDATE OF r SKIP LOCKED
    )
    UPDATE private.account_deletion_requests r
    SET alert_lease_until = now() + pg_catalog.make_interval(secs => p_lease_seconds)
    FROM due
    WHERE r.id = due.id
    RETURNING r.id, due.kind, due.k, r.status, r.last_error_class, r.attempt_count, r.requested_at,
              CASE WHEN due.kind = 'escalation' THEN r.alert_sent_at END, r.alert_lease_until::text;
END;
$$;

-- Record the delivery outcome for a leased alert. Touches alert_* columns only.
CREATE OR REPLACE FUNCTION private.n10_record_alert(
  p_request uuid, p_lease text, p_kind text, p_alert_key text, p_delivered boolean)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
  v_count integer;
BEGIN
  IF p_request IS NULL OR p_lease IS NULL OR p_kind IS NULL OR p_kind NOT IN ('attention', 'escalation')
     OR p_alert_key IS NULL OR char_length(p_alert_key) > 100 OR p_delivered IS NULL THEN
    RAISE EXCEPTION 'n10: invalid alert record arguments' USING ERRCODE = '22023';
  END IF;
  UPDATE private.account_deletion_requests r
  SET alert_key = CASE WHEN p_delivered AND p_kind = 'attention' THEN p_alert_key ELSE r.alert_key END,
      alert_sent_at = CASE WHEN p_delivered AND p_kind = 'attention' THEN now() ELSE r.alert_sent_at END,
      alert_escalated_at = CASE
        WHEN p_delivered AND p_kind = 'attention' THEN NULL
        WHEN p_delivered AND p_kind = 'escalation' THEN now()
        ELSE r.alert_escalated_at END,
      alert_failure_count = CASE WHEN p_delivered THEN 0 ELSE r.alert_failure_count + 1 END,
      alert_next_attempt_at = CASE
        WHEN p_delivered THEN NULL
        WHEN r.alert_failure_count = 0 THEN now() + interval '5 minutes'
        WHEN r.alert_failure_count = 1 THEN now() + interval '15 minutes'
        ELSE now() + interval '60 minutes' END,
      alert_lease_until = NULL
  WHERE r.id = p_request
    AND r.alert_lease_until = p_lease::timestamptz
    AND r.status NOT IN ('completed', 'cancelled');
  GET DIAGNOSTICS v_count = ROW_COUNT;
  RETURN v_count = 1;
END;
$$;

-- Observability when no destination is configured: how many attention alerts are waiting.
CREATE OR REPLACE FUNCTION private.n10_alerts_pending_count()
RETURNS integer
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = ''
AS $$
  SELECT count(*)::integer
  FROM private.account_deletion_requests r
  WHERE r.status IN ('auth_attention', 'purge_attention')
    AND (r.alert_key IS DISTINCT FROM r.status || ':' || COALESCE(r.last_error_class, '-')
         OR (r.alert_escalated_at IS NULL AND r.alert_sent_at <= now() - interval '24 hours'));
$$;

REVOKE ALL ON FUNCTION private.n10_alerts_due(integer, integer) FROM PUBLIC, anon, authenticated, service_role, account_deletion_worker;
REVOKE ALL ON FUNCTION private.n10_record_alert(uuid, text, text, text, boolean) FROM PUBLIC, anon, authenticated, service_role, account_deletion_worker;
REVOKE ALL ON FUNCTION private.n10_alerts_pending_count() FROM PUBLIC, anon, authenticated, service_role, account_deletion_worker;
GRANT EXECUTE ON FUNCTION private.n10_alerts_due(integer, integer) TO account_deletion_worker;
GRANT EXECUTE ON FUNCTION private.n10_record_alert(uuid, text, text, text, boolean) TO account_deletion_worker;
GRANT EXECUTE ON FUNCTION private.n10_alerts_pending_count() TO account_deletion_worker;
