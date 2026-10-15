-- N10 D14.1 (M7) — durable analytics-identity erasure (owner decision E, 15 October 2026).
--
-- Account deletion must also remove the user's server-side analytics identity (currently PostHog:
-- the person whose distinct id is the Supabase user UUID, plus a request to delete that person's
-- events). The provider call is made by the account-deletion worker runtime, never through pg_net,
-- and its credential never enters the database. This migration only adds the durable bookkeeping and
-- the completion gate:
--
--   * analytics_* columns: a sub-state next to the frozen deletion state machine (no new status);
--   * n10_analytics_due / n10_record_analytics: lease-protected claim and outcome recording, separate
--     from the media lease, so media purge never waits for the analytics provider and vice versa;
--   * completion gate: a request cannot reach COMPLETED (and so cannot be anonymised) until analytics
--     erasure is resolved. Enforced three times: n10_record_purge (gate), a CHECK constraint, and the
--     n10_analytics_guard trigger;
--   * operator alerts: a persistent analytics failure is a durable attention condition
--     (analytics_attention_since) delivered through the existing M4 ledger under its own alert key.
--
-- Account-first is unchanged: analytics erasure is never claimed before auth_deleted_at is set, and
-- it can only be marked resolved while the Auth user is absent. The user id needed for erasure is kept
-- until erasure is resolved because anonymisation happens only at COMPLETED.
--
-- Earlier migration files (M1–M6) are unchanged. This file replaces the bodies of three functions they
-- created: n10_record_purge (M1; identical except for the analytics gate), n10_alerts_due and
-- n10_alerts_pending_count (M4; identical for auth/purge attention rows, plus analytics attention).

SET LOCAL lock_timeout = '5s';

-- ---------------------------------------------------------------------------
-- Columns. Rows that already exist when this runs predate analytics erasure: terminal rows are marked
-- 'not_tracked' (they are never reprocessed); every non-terminal row becomes 'pending'.
-- ---------------------------------------------------------------------------
ALTER TABLE private.account_deletion_requests
  ADD COLUMN analytics_status text NOT NULL DEFAULT 'not_tracked',
  ADD COLUMN analytics_attempt_count integer NOT NULL DEFAULT 0,
  ADD COLUMN analytics_next_attempt_at timestamptz,
  ADD COLUMN analytics_lease_until timestamptz,
  ADD COLUMN analytics_last_error text,
  ADD COLUMN analytics_attention_since timestamptz,
  ADD COLUMN analytics_resolved_at timestamptz,
  ADD COLUMN analytics_persons_found integer;

ALTER TABLE private.account_deletion_requests ALTER COLUMN analytics_status SET DEFAULT 'pending';

UPDATE private.account_deletion_requests r
SET analytics_status = 'pending'
WHERE r.status NOT IN ('completed', 'cancelled');

ALTER TABLE private.account_deletion_requests
  ADD CONSTRAINT account_deletion_requests_analytics_status_check
    CHECK (analytics_status IN ('pending', 'resolved', 'not_tracked')),
  ADD CONSTRAINT account_deletion_requests_analytics_not_tracked_check
    CHECK (analytics_status <> 'not_tracked' OR status IN ('completed', 'cancelled')),
  -- Strict completion now also requires resolved analytics erasure (legacy rows: not_tracked).
  ADD CONSTRAINT account_deletion_requests_analytics_completed_check
    CHECK (status <> 'completed' OR analytics_status IN ('resolved', 'not_tracked')),
  ADD CONSTRAINT account_deletion_requests_analytics_resolved_check
    CHECK ((analytics_status = 'resolved') = (analytics_resolved_at IS NOT NULL)),
  ADD CONSTRAINT account_deletion_requests_analytics_error_check
    CHECK (analytics_last_error IS NULL OR analytics_last_error IN (
      'analytics_config', 'analytics_transient', 'analytics_permanent')),
  ADD CONSTRAINT account_deletion_requests_analytics_counters_check
    CHECK (analytics_attempt_count >= 0 AND (analytics_persons_found IS NULL OR analytics_persons_found >= 0));

-- ---------------------------------------------------------------------------
-- Guard (SECURITY INVOKER trigger, next to the M1 transition guard).
-- ---------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION private.n10_analytics_guard()
RETURNS trigger
LANGUAGE plpgsql
SECURITY INVOKER
SET search_path = ''
AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    IF NEW.analytics_status <> 'pending' OR NEW.analytics_attempt_count <> 0
       OR NEW.analytics_resolved_at IS NOT NULL OR NEW.analytics_attention_since IS NOT NULL
       OR NEW.analytics_persons_found IS NOT NULL OR NEW.analytics_last_error IS NOT NULL THEN
      RAISE EXCEPTION 'n10: a request must start with analytics erasure pending' USING ERRCODE = '23514';
    END IF;
    RETURN NEW;
  END IF;

  -- The only analytics status change is pending -> resolved, after Auth deletion, while the user id is
  -- still known and the Auth user is absent.
  IF NEW.analytics_status IS DISTINCT FROM OLD.analytics_status THEN
    IF NOT (OLD.analytics_status = 'pending' AND NEW.analytics_status = 'resolved') THEN
      RAISE EXCEPTION 'n10: invalid analytics transition % -> %', OLD.analytics_status, NEW.analytics_status
        USING ERRCODE = '23514';
    END IF;
    IF OLD.auth_deleted_at IS NULL OR OLD.user_id IS NULL
       OR EXISTS (SELECT 1 FROM auth.users u WHERE u.id = OLD.user_id) THEN
      RAISE EXCEPTION 'n10: analytics erasure resolves only after Auth deletion' USING ERRCODE = '23514';
    END IF;
  END IF;

  IF OLD.analytics_resolved_at IS NOT NULL AND NEW.analytics_resolved_at IS DISTINCT FROM OLD.analytics_resolved_at THEN
    RAISE EXCEPTION 'n10: analytics_resolved_at is set once' USING ERRCODE = '23514';
  END IF;

  -- The user id (the analytics distinct id) is never cleared while erasure is unresolved.
  IF OLD.user_id IS NOT NULL AND NEW.user_id IS NULL AND NEW.analytics_status <> 'resolved' THEN
    RAISE EXCEPTION 'n10: user_id kept until analytics erasure is resolved' USING ERRCODE = '23514';
  END IF;
  IF NEW.status = 'completed' AND OLD.status <> 'completed' AND NEW.analytics_status <> 'resolved' THEN
    RAISE EXCEPTION 'n10: completion requires resolved analytics erasure' USING ERRCODE = '23514';
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER n10_analytics_guard
  BEFORE INSERT OR UPDATE ON private.account_deletion_requests
  FOR EACH ROW EXECUTE FUNCTION private.n10_analytics_guard();

-- ---------------------------------------------------------------------------
-- n10_record_purge: the M1 body unchanged except for the analytics completion gate.
-- ---------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION private.n10_record_purge(p_request uuid, p_lease text, p_expected text, p_removed integer)
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
  v_row private.account_deletion_requests%ROWTYPE;
  v_canonical integer;
  v_anomalies integer;
  v_now timestamptz := now();
BEGIN
  IF p_removed IS NULL OR p_removed < 0 OR p_removed > 1000000 THEN
    RAISE EXCEPTION 'n10: invalid removed count' USING ERRCODE = '22023';
  END IF;
  IF p_expected NOT IN ('auth_deleted', 'awaiting_final_sweep', 'purge_attention') THEN
    RAISE EXCEPTION 'n10: purge is not allowed in state %', p_expected USING ERRCODE = '55000';
  END IF;
  v_row := private.n10_lock_leased(p_request, p_lease, p_expected);
  IF EXISTS (SELECT 1 FROM auth.users u WHERE u.id = v_row.user_id) THEN
    RAISE EXCEPTION 'n10: auth user still exists; purge forbidden' USING ERRCODE = '55000';
  END IF;

  UPDATE private.account_deletion_requests r
  SET objects_removed = r.objects_removed + p_removed,
      sweep_objects_removed = r.sweep_objects_removed
        + CASE WHEN v_row.status = 'awaiting_final_sweep' THEN p_removed ELSE 0 END
  WHERE r.id = v_row.id;

  SELECT count(*)::integer INTO v_canonical
  FROM storage.objects o
  WHERE o.bucket_id IN ('weekly-photos', 'first-year-memories')
    AND pg_catalog.strpos(o.name, '/') > 0
    AND pg_catalog.split_part(o.name, '/', 1) = v_row.user_id::text;

  IF v_canonical > 0 THEN
    -- Pass incomplete (budget or partial): state unchanged; the caller releases or records a failure.
    RETURN v_row.status;
  END IF;

  v_anomalies := private.account_media_anomaly_count(v_row.user_id);
  IF v_anomalies > 0 THEN
    UPDATE private.account_deletion_requests r
    SET status = 'purge_attention',
        anomaly_count = v_anomalies,
        last_error_class = 'owner_id_path_anomaly',
        attempt_count = 0,
        next_attempt_at = v_now + interval '60 minutes',
        lease_until = NULL
    WHERE r.id = v_row.id;
    RETURN 'purge_attention';
  END IF;

  IF v_row.status = 'purge_attention' THEN
    -- Re-arm only once the attention cause is gone (frozen edge purge_attention -> auth_deleted).
    UPDATE private.account_deletion_requests r
    SET status = 'auth_deleted', anomaly_count = 0, last_error_class = NULL
    WHERE r.id = v_row.id;
    v_row.status := 'auth_deleted';
  END IF;

  IF v_row.status = 'auth_deleted' THEN
    UPDATE private.account_deletion_requests r
    SET status = 'awaiting_final_sweep',
        anomaly_count = 0,
        purge_empty_at = COALESCE(r.purge_empty_at, v_now),
        attempt_count = 0,
        next_attempt_at = r.final_sweep_after,
        last_error_class = NULL,
        lease_until = NULL
    WHERE r.id = v_row.id;
    RETURN 'awaiting_final_sweep';
  END IF;

  -- awaiting_final_sweep: complete only when the window has been reached (strict predicate §12.3).
  IF v_now < v_row.final_sweep_after THEN
    UPDATE private.account_deletion_requests r
    SET next_attempt_at = r.final_sweep_after, lease_until = NULL
    WHERE r.id = v_row.id;
    RETURN 'awaiting_final_sweep';
  END IF;

  -- D14.1 gate: no COMPLETED (and so no anonymisation) until analytics erasure is resolved. The final
  -- sweep is re-run later; n10_record_analytics brings it forward as soon as erasure resolves.
  IF v_row.analytics_status <> 'resolved' THEN
    UPDATE private.account_deletion_requests r
    SET next_attempt_at = v_now + interval '15 minutes', lease_until = NULL
    WHERE r.id = v_row.id;
    RETURN 'awaiting_final_sweep';
  END IF;

  UPDATE private.account_deletion_requests r
  SET status = 'completed',
      completed_at = v_now,
      user_id = NULL,
      anonymised_at = v_now,
      anomaly_count = 0,
      last_error_class = NULL,
      lease_until = NULL
  WHERE r.id = v_row.id;
  RETURN 'completed';
END;
$$;

-- ---------------------------------------------------------------------------
-- Analytics erasure work queue (its own lease; independent of the media lease).
-- First attempt 15 minutes after Auth deletion so the provider has ingested the last client events;
-- the provider deletes only events captured before the request.
-- ---------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION private.n10_analytics_due(p_limit integer, p_lease_seconds integer)
RETURNS TABLE (o_request_id uuid, o_user_id uuid, o_lease text, o_attempt_count integer)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  IF p_limit IS NULL OR p_limit < 1 OR p_limit > 50
     OR p_lease_seconds IS NULL OR p_lease_seconds < 30 OR p_lease_seconds > 900 THEN
    RAISE EXCEPTION 'n10: invalid analytics claim arguments' USING ERRCODE = '22023';
  END IF;
  RETURN QUERY
    WITH due AS (
      SELECT r.id
      FROM private.account_deletion_requests r
      WHERE r.analytics_status = 'pending'
        AND r.status IN ('auth_deleted', 'awaiting_final_sweep', 'purge_attention')
        AND r.auth_deleted_at IS NOT NULL
        AND r.user_id IS NOT NULL
        AND COALESCE(r.analytics_next_attempt_at, r.auth_deleted_at + interval '15 minutes') <= now()
        AND (r.analytics_lease_until IS NULL OR r.analytics_lease_until < now())
      ORDER BY COALESCE(r.analytics_next_attempt_at, r.auth_deleted_at + interval '15 minutes'), r.id
      LIMIT p_limit
      FOR UPDATE SKIP LOCKED
    )
    UPDATE private.account_deletion_requests r
    SET analytics_lease_until = now() + pg_catalog.make_interval(secs => p_lease_seconds)
    FROM due
    WHERE r.id = due.id
    RETURNING r.id, r.user_id, r.analytics_lease_until::text, r.analytics_attempt_count;
END;
$$;

-- Record one erasure attempt. 'resolved' = the provider accepted the person/event deletion request (or
-- found no person for the id). 'failed' = retry: config and permanent errors become attention at once,
-- transient errors after 24 hours since Auth deletion; attention keeps retrying hourly.
CREATE OR REPLACE FUNCTION private.n10_record_analytics(
  p_request uuid, p_lease text, p_outcome text, p_error_class text, p_persons_found integer)
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
  v_row private.account_deletion_requests%ROWTYPE;
  v_attempt integer;
  v_attention boolean;
BEGIN
  IF p_request IS NULL OR p_lease IS NULL OR p_outcome IS NULL OR p_outcome NOT IN ('resolved', 'failed')
     OR (p_outcome = 'resolved' AND (p_error_class IS NOT NULL OR p_persons_found IS NULL
                                     OR p_persons_found < 0 OR p_persons_found > 1000))
     OR (p_outcome = 'failed' AND (p_persons_found IS NOT NULL OR p_error_class IS NULL OR p_error_class NOT IN (
           'analytics_config', 'analytics_transient', 'analytics_permanent'))) THEN
    RAISE EXCEPTION 'n10: invalid analytics record arguments' USING ERRCODE = '22023';
  END IF;
  SELECT * INTO v_row FROM private.account_deletion_requests r WHERE r.id = p_request FOR UPDATE;
  IF NOT FOUND OR v_row.analytics_status <> 'pending'
     OR v_row.status NOT IN ('auth_deleted', 'awaiting_final_sweep', 'purge_attention')
     OR v_row.analytics_lease_until IS DISTINCT FROM p_lease::timestamptz OR v_row.analytics_lease_until < now() THEN
    RAISE EXCEPTION 'n10: analytics lease or state mismatch' USING ERRCODE = '55000';
  END IF;

  IF p_outcome = 'resolved' THEN
    UPDATE private.account_deletion_requests r
    SET analytics_status = 'resolved',
        analytics_resolved_at = now(),
        analytics_persons_found = p_persons_found,
        analytics_attempt_count = r.analytics_attempt_count + 1,
        analytics_last_error = NULL,
        analytics_attention_since = NULL,
        analytics_next_attempt_at = NULL,
        analytics_lease_until = NULL,
        -- A final sweep held back only by the gate becomes due now.
        next_attempt_at = CASE WHEN r.status = 'awaiting_final_sweep'
                               THEN LEAST(r.next_attempt_at, GREATEST(now(), r.final_sweep_after))
                               ELSE r.next_attempt_at END
    WHERE r.id = v_row.id;
    RETURN 'resolved';
  END IF;

  v_attempt := v_row.analytics_attempt_count + 1;
  v_attention := p_error_class IN ('analytics_config', 'analytics_permanent')
                 OR now() - v_row.auth_deleted_at >= interval '24 hours'
                 OR v_row.analytics_attention_since IS NOT NULL;
  UPDATE private.account_deletion_requests r
  SET analytics_attempt_count = v_attempt,
      analytics_last_error = p_error_class,
      analytics_attention_since = CASE WHEN v_attention THEN COALESCE(r.analytics_attention_since, now()) END,
      analytics_next_attempt_at = now() + CASE WHEN v_attention THEN interval '60 minutes'
                                                ELSE private.n10_retry_delay(v_attempt) END,
      analytics_lease_until = NULL
  WHERE r.id = v_row.id;
  RETURN CASE WHEN v_attention THEN 'attention' ELSE 'pending' END;
END;
$$;

-- ---------------------------------------------------------------------------
-- Operator alerts (M4 ledger): the M4 bodies unchanged for auth/purge attention rows; a row whose
-- analytics erasure is in attention (and that is not itself in auth/purge attention) alerts under the
-- key "analytics_attention:<error class>". No personal data enters the ledger.
-- ---------------------------------------------------------------------------
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
    WITH keyed AS (
      SELECT r.id,
             CASE WHEN r.status IN ('auth_attention', 'purge_attention')
                  THEN r.status || ':' || COALESCE(r.last_error_class, '-')
                  ELSE 'analytics_attention:' || COALESCE(r.analytics_last_error, '-') END AS k,
             CASE WHEN r.status IN ('auth_attention', 'purge_attention')
                  THEN r.last_error_class ELSE r.analytics_last_error END AS cls,
             CASE WHEN r.status IN ('auth_attention', 'purge_attention')
                  THEN r.attempt_count ELSE r.analytics_attempt_count END AS attempts
      FROM private.account_deletion_requests r
      WHERE r.status IN ('auth_attention', 'purge_attention')
         OR (r.status IN ('auth_deleted', 'awaiting_final_sweep')
             AND r.analytics_status = 'pending' AND r.analytics_attention_since IS NOT NULL)
    ),
    due AS (
      SELECT r.id, keyed.k, keyed.cls, keyed.attempts,
             CASE WHEN r.alert_key IS DISTINCT FROM keyed.k THEN 'attention' ELSE 'escalation' END AS kind
      FROM private.account_deletion_requests r
      JOIN keyed ON keyed.id = r.id
      WHERE (r.alert_lease_until IS NULL OR r.alert_lease_until < now())
        AND (r.alert_next_attempt_at IS NULL OR r.alert_next_attempt_at <= now())
        AND (r.alert_key IS DISTINCT FROM keyed.k
             OR (r.alert_escalated_at IS NULL AND r.alert_sent_at <= now() - interval '24 hours'))
      ORDER BY r.requested_at, r.id
      LIMIT p_limit
      FOR UPDATE OF r SKIP LOCKED
    )
    UPDATE private.account_deletion_requests r
    SET alert_lease_until = now() + pg_catalog.make_interval(secs => p_lease_seconds)
    FROM due
    WHERE r.id = due.id
    RETURNING r.id, due.kind, due.k, r.status, due.cls, due.attempts, r.requested_at,
              CASE WHEN due.kind = 'escalation' THEN r.alert_sent_at END, r.alert_lease_until::text;
END;
$$;

CREATE OR REPLACE FUNCTION private.n10_alerts_pending_count()
RETURNS integer
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = ''
AS $$
  SELECT count(*)::integer
  FROM (
    SELECT r.alert_key, r.alert_sent_at, r.alert_escalated_at,
           CASE WHEN r.status IN ('auth_attention', 'purge_attention')
                THEN r.status || ':' || COALESCE(r.last_error_class, '-')
                ELSE 'analytics_attention:' || COALESCE(r.analytics_last_error, '-') END AS k
    FROM private.account_deletion_requests r
    WHERE r.status IN ('auth_attention', 'purge_attention')
       OR (r.status IN ('auth_deleted', 'awaiting_final_sweep')
           AND r.analytics_status = 'pending' AND r.analytics_attention_since IS NOT NULL)
  ) a
  WHERE a.alert_key IS DISTINCT FROM a.k
     OR (a.alert_escalated_at IS NULL AND a.alert_sent_at <= now() - interval '24 hours');
$$;

-- ---------------------------------------------------------------------------
-- Function privileges (same pattern as M1/M4: worker-only EXECUTE on the surface).
-- ---------------------------------------------------------------------------
REVOKE ALL ON FUNCTION private.n10_analytics_guard() FROM PUBLIC, anon, authenticated, service_role, account_deletion_worker;
REVOKE ALL ON FUNCTION private.n10_record_purge(uuid, text, text, integer) FROM PUBLIC, anon, authenticated, service_role, account_deletion_worker;
REVOKE ALL ON FUNCTION private.n10_analytics_due(integer, integer) FROM PUBLIC, anon, authenticated, service_role, account_deletion_worker;
REVOKE ALL ON FUNCTION private.n10_record_analytics(uuid, text, text, text, integer) FROM PUBLIC, anon, authenticated, service_role, account_deletion_worker;
REVOKE ALL ON FUNCTION private.n10_alerts_due(integer, integer) FROM PUBLIC, anon, authenticated, service_role, account_deletion_worker;
REVOKE ALL ON FUNCTION private.n10_alerts_pending_count() FROM PUBLIC, anon, authenticated, service_role, account_deletion_worker;
GRANT EXECUTE ON FUNCTION private.n10_record_purge(uuid, text, text, integer) TO account_deletion_worker;
GRANT EXECUTE ON FUNCTION private.n10_analytics_due(integer, integer) TO account_deletion_worker;
GRANT EXECUTE ON FUNCTION private.n10_record_analytics(uuid, text, text, text, integer) TO account_deletion_worker;
GRANT EXECUTE ON FUNCTION private.n10_alerts_due(integer, integer) TO account_deletion_worker;
GRANT EXECUTE ON FUNCTION private.n10_alerts_pending_count() TO account_deletion_worker;
