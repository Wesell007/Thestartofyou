-- N10.3A (M1) — Candidate E account-deletion foundation.
-- Implements the frozen contract in docs/strategy/n10-candidate-e-account-first-deletion-architecture.md
-- (N10.2 + N10.2A). Account first, media second: no user media is removed before the Auth/database
-- account deletion is confirmed committed.
--
-- Scope of this migration:
--   * non-exposed schema `private` with the durable request table (no FK to auth.users);
--   * dedicated least-privilege login role `account_deletion_worker` (password set out-of-band);
--   * hardened SECURITY DEFINER read helpers and a function-only request-state surface;
--   * a SECURITY INVOKER transition guard trigger;
--   * the eight media Storage policies replaced by guarded versions.
-- Supabase-managed Storage records are treated as read-only: this file never inserts, updates or
-- deletes Storage rows or buckets. Bucket configuration lives in supabase/config.toml.

SET LOCAL lock_timeout = '5s';

-- ---------------------------------------------------------------------------
-- Schema and dedicated role
-- ---------------------------------------------------------------------------
CREATE SCHEMA IF NOT EXISTS private;
REVOKE ALL ON SCHEMA private FROM PUBLIC;
ALTER DEFAULT PRIVILEGES IN SCHEMA private REVOKE ALL ON TABLES FROM PUBLIC;
ALTER DEFAULT PRIVILEGES IN SCHEMA private REVOKE EXECUTE ON FUNCTIONS FROM PUBLIC;

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_catalog.pg_roles WHERE rolname = 'account_deletion_worker') THEN
    CREATE ROLE account_deletion_worker WITH LOGIN NOSUPERUSER NOCREATEDB NOCREATEROLE NOREPLICATION NOBYPASSRLS NOINHERIT;
  END IF;
  -- Fail closed if a pre-existing role of this name is broader than the contract allows.
  IF EXISTS (
    SELECT 1 FROM pg_catalog.pg_roles
    WHERE rolname = 'account_deletion_worker'
      AND (rolsuper OR rolcreatedb OR rolcreaterole OR rolreplication OR rolbypassrls OR NOT rolcanlogin)
  ) THEN
    RAISE EXCEPTION 'n10: account_deletion_worker role attributes are broader than the frozen contract';
  END IF;
END $$;

GRANT USAGE ON SCHEMA private TO authenticated, account_deletion_worker;

-- ---------------------------------------------------------------------------
-- Durable request table (frozen N10.2A §7.2). No FK to auth.users: the row must survive Auth deletion.
-- ---------------------------------------------------------------------------
CREATE TABLE private.account_deletion_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid,
  status text NOT NULL DEFAULT 'requested',
  requested_at timestamptz NOT NULL DEFAULT now(),
  auth_deleted_at timestamptz,
  final_sweep_after timestamptz,
  purge_empty_at timestamptz,
  completed_at timestamptz,
  anonymised_at timestamptz,
  attempt_count integer NOT NULL DEFAULT 0,
  next_attempt_at timestamptz NOT NULL DEFAULT now(),
  lease_until timestamptz,
  last_error_class text,
  objects_removed integer NOT NULL DEFAULT 0,
  sweep_objects_removed integer NOT NULL DEFAULT 0,
  anomaly_count integer NOT NULL DEFAULT 0,
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT account_deletion_requests_status_check CHECK (status IN (
    'requested', 'auth_deleted', 'awaiting_final_sweep', 'completed',
    'auth_attention', 'purge_attention', 'cancelled')),
  CONSTRAINT account_deletion_requests_error_class_check CHECK (last_error_class IS NULL OR last_error_class IN (
    'auth_transient', 'auth_permanent', 'auth_unknown_outcome', 'storage_list', 'storage_remove',
    'storage_partial', 'owner_id_path_anomaly', 'db', 'timeout', 'config')),
  CONSTRAINT account_deletion_requests_counters_check CHECK (
    attempt_count >= 0 AND objects_removed >= 0 AND sweep_objects_removed >= 0 AND anomaly_count >= 0),
  CONSTRAINT account_deletion_requests_post_auth_check CHECK (
    status NOT IN ('auth_deleted', 'awaiting_final_sweep', 'completed', 'purge_attention')
    OR (auth_deleted_at IS NOT NULL AND final_sweep_after IS NOT NULL)),
  -- H1 / D13 floor: final_sweep_after = auth_deleted_at + max(W, 3600 s) + 15 min, so never earlier than 1 h 15 m.
  CONSTRAINT account_deletion_requests_sweep_floor_check CHECK (
    final_sweep_after IS NULL
    OR (auth_deleted_at IS NOT NULL AND final_sweep_after >= auth_deleted_at + interval '1 hour 15 minutes')),
  CONSTRAINT account_deletion_requests_completed_check CHECK (
    status <> 'completed'
    OR (purge_empty_at IS NOT NULL AND completed_at IS NOT NULL AND anomaly_count = 0 AND user_id IS NULL)),
  CONSTRAINT account_deletion_requests_anonymised_check CHECK ((user_id IS NULL) = (anonymised_at IS NOT NULL)),
  CONSTRAINT account_deletion_requests_anonymised_completed_check CHECK (user_id IS NOT NULL OR status = 'completed')
);

-- One active workflow per account (N10-E19).
CREATE UNIQUE INDEX account_deletion_requests_one_active_idx
  ON private.account_deletion_requests (user_id)
  WHERE status NOT IN ('completed', 'cancelled');
-- Claim / scheduling.
CREATE INDEX account_deletion_requests_claim_idx
  ON private.account_deletion_requests (status, next_attempt_at);

ALTER TABLE private.account_deletion_requests ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON TABLE private.account_deletion_requests FROM PUBLIC, anon, authenticated, service_role, account_deletion_worker;

-- ---------------------------------------------------------------------------
-- Transition guard (SECURITY INVOKER trigger; frozen §6). The database, not application code,
-- decides which transitions are valid.
-- ---------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION private.account_deletion_requests_guard()
RETURNS trigger
LANGUAGE plpgsql
SECURITY INVOKER
SET search_path = ''
AS $$
DECLARE
  v_ok boolean;
BEGIN
  IF TG_OP = 'INSERT' THEN
    IF NEW.status <> 'requested' OR NEW.user_id IS NULL
       OR NEW.auth_deleted_at IS NOT NULL OR NEW.final_sweep_after IS NOT NULL
       OR NEW.purge_empty_at IS NOT NULL OR NEW.completed_at IS NOT NULL OR NEW.anonymised_at IS NOT NULL
       OR NEW.objects_removed <> 0 OR NEW.sweep_objects_removed <> 0 OR NEW.anomaly_count <> 0 THEN
      RAISE EXCEPTION 'n10: a request must start as a clean requested row' USING ERRCODE = '23514';
    END IF;
    NEW.updated_at := now();
    RETURN NEW;
  END IF;

  IF TG_OP = 'DELETE' THEN
    IF OLD.status <> 'completed' OR OLD.user_id IS NOT NULL THEN
      RAISE EXCEPTION 'n10: only anonymised completed requests may be deleted' USING ERRCODE = '23514';
    END IF;
    RETURN OLD;
  END IF;

  -- UPDATE
  IF OLD.status IN ('completed', 'cancelled') THEN
    RAISE EXCEPTION 'n10: % is terminal', OLD.status USING ERRCODE = '23514';
  END IF;

  v_ok := CASE OLD.status
    WHEN 'requested' THEN NEW.status IN ('requested', 'auth_deleted', 'auth_attention', 'cancelled')
    WHEN 'auth_attention' THEN NEW.status IN ('auth_attention', 'requested', 'cancelled')
    WHEN 'auth_deleted' THEN NEW.status IN ('auth_deleted', 'awaiting_final_sweep', 'purge_attention')
    WHEN 'awaiting_final_sweep' THEN NEW.status IN ('awaiting_final_sweep', 'completed', 'purge_attention')
    WHEN 'purge_attention' THEN NEW.status IN ('purge_attention', 'auth_deleted')
    ELSE false
  END;
  IF NOT v_ok THEN
    RAISE EXCEPTION 'n10: invalid transition % -> %', OLD.status, NEW.status USING ERRCODE = '23514';
  END IF;

  IF NEW.id <> OLD.id OR NEW.requested_at <> OLD.requested_at THEN
    RAISE EXCEPTION 'n10: request identity is immutable' USING ERRCODE = '23514';
  END IF;

  -- user_id changes only by anonymisation on the valid completion transition.
  IF NEW.user_id IS DISTINCT FROM OLD.user_id
     AND NOT (NEW.status = 'completed' AND NEW.user_id IS NULL AND OLD.user_id IS NOT NULL) THEN
    RAISE EXCEPTION 'n10: user_id may only be nulled at completion' USING ERRCODE = '23514';
  END IF;

  -- Commit proof and the sweep window are set once.
  IF OLD.auth_deleted_at IS NOT NULL AND NEW.auth_deleted_at IS DISTINCT FROM OLD.auth_deleted_at THEN
    RAISE EXCEPTION 'n10: auth_deleted_at is set once' USING ERRCODE = '23514';
  END IF;
  IF OLD.final_sweep_after IS NOT NULL AND NEW.final_sweep_after IS DISTINCT FROM OLD.final_sweep_after THEN
    RAISE EXCEPTION 'n10: final_sweep_after is set once' USING ERRCODE = '23514';
  END IF;

  IF NEW.objects_removed < OLD.objects_removed OR NEW.sweep_objects_removed < OLD.sweep_objects_removed THEN
    RAISE EXCEPTION 'n10: removal counters never decrease' USING ERRCODE = '23514';
  END IF;

  -- Entering auth_deleted requires the Auth user to be gone (N10-E1 precondition).
  IF OLD.status = 'requested' AND NEW.status = 'auth_deleted' THEN
    IF EXISTS (SELECT 1 FROM auth.users u WHERE u.id = OLD.user_id) THEN
      RAISE EXCEPTION 'n10: auth user still exists' USING ERRCODE = '23514';
    END IF;
  END IF;

  -- Cancellation boundary (D7): Auth user still exists, deletion never committed, nothing purged.
  IF NEW.status = 'cancelled' THEN
    IF OLD.auth_deleted_at IS NOT NULL OR NEW.objects_removed <> 0
       OR NOT EXISTS (SELECT 1 FROM auth.users u WHERE u.id = OLD.user_id) THEN
      RAISE EXCEPTION 'n10: cancellation is outside the frozen boundary' USING ERRCODE = '23514';
    END IF;
  END IF;

  -- Strict completion (§12.3, enforced again here).
  IF NEW.status = 'completed' THEN
    IF now() < NEW.final_sweep_after OR NEW.anomaly_count <> 0 OR NEW.purge_empty_at IS NULL
       OR NEW.completed_at IS NULL OR NEW.user_id IS NOT NULL OR NEW.anonymised_at IS NULL
       OR EXISTS (SELECT 1 FROM auth.users u WHERE u.id = OLD.user_id) THEN
      RAISE EXCEPTION 'n10: strict completion predicate not met' USING ERRCODE = '23514';
    END IF;
  END IF;

  NEW.updated_at := now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER account_deletion_requests_guard
  BEFORE INSERT OR UPDATE OR DELETE ON private.account_deletion_requests
  FOR EACH ROW EXECUTE FUNCTION private.account_deletion_requests_guard();

-- ---------------------------------------------------------------------------
-- Read helpers (hardened SECURITY DEFINER; frozen §7.4 / §8.1)
-- ---------------------------------------------------------------------------

-- Storage RLS guard: no arguments; caller from auth.uid(); never reads storage.objects (no RLS recursion).
CREATE OR REPLACE FUNCTION private.account_media_access_allowed()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = ''
AS $$
  SELECT auth.uid() IS NOT NULL
    AND EXISTS (
      SELECT 1 FROM auth.users u
      WHERE u.id = auth.uid() AND u.deleted_at IS NULL)
    AND NOT EXISTS (
      SELECT 1 FROM private.account_deletion_requests r
      WHERE r.user_id = auth.uid() AND r.status <> 'cancelled');
$$;

CREATE OR REPLACE FUNCTION private.auth_user_exists(p_user uuid)
RETURNS boolean
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  IF p_user IS NULL THEN
    RAISE EXCEPTION 'n10: user id required' USING ERRCODE = '22023';
  END IF;
  RETURN EXISTS (SELECT 1 FROM auth.users u WHERE u.id = p_user);
END;
$$;

-- Canonical media (rule A): the two TSOY media buckets, first path segment exactly equal to the UUID.
CREATE OR REPLACE FUNCTION private.account_media_canonical(p_user uuid, p_limit integer)
RETURNS TABLE (bucket_id text, name text)
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  IF p_user IS NULL OR p_limit IS NULL OR p_limit < 1 OR p_limit > 1000 THEN
    RAISE EXCEPTION 'n10: invalid canonical media arguments' USING ERRCODE = '22023';
  END IF;
  RETURN QUERY
    SELECT o.bucket_id::text, o.name::text
    FROM storage.objects o
    WHERE o.bucket_id IN ('weekly-photos', 'first-year-memories')
      AND pg_catalog.strpos(o.name, '/') > 0
      AND pg_catalog.split_part(o.name, '/', 1) = p_user::text
    ORDER BY o.bucket_id, o.name
    LIMIT p_limit;
END;
$$;

-- OWNER_ID_PATH_ANOMALIES (rule B): count only; filenames are never returned or stored.
CREATE OR REPLACE FUNCTION private.account_media_anomaly_count(p_user uuid)
RETURNS integer
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  IF p_user IS NULL THEN
    RAISE EXCEPTION 'n10: user id required' USING ERRCODE = '22023';
  END IF;
  RETURN (
    SELECT count(*)::integer
    FROM storage.objects o
    WHERE o.bucket_id IN ('weekly-photos', 'first-year-memories')
      AND o.owner_id = p_user::text
      AND NOT (pg_catalog.strpos(o.name, '/') > 0 AND pg_catalog.split_part(o.name, '/', 1) = p_user::text));
END;
$$;

-- ---------------------------------------------------------------------------
-- Request-state surface (function-only; the worker role has no table privileges)
-- ---------------------------------------------------------------------------

-- D4 retry schedule: 1, 2, 5, 15, 30 minutes, then hourly. Internal; not granted to any role.
CREATE OR REPLACE FUNCTION private.n10_retry_delay(p_attempt integer)
RETURNS interval
LANGUAGE sql
IMMUTABLE
SET search_path = ''
AS $$
  SELECT CASE
    WHEN p_attempt <= 1 THEN interval '1 minute'
    WHEN p_attempt = 2 THEN interval '2 minutes'
    WHEN p_attempt = 3 THEN interval '5 minutes'
    WHEN p_attempt = 4 THEN interval '15 minutes'
    WHEN p_attempt = 5 THEN interval '30 minutes'
    ELSE interval '60 minutes'
  END;
$$;

-- Create or find the account's active request and lease it for synchronous processing.
CREATE OR REPLACE FUNCTION private.n10_open_request(p_user uuid, p_lease_seconds integer)
RETURNS TABLE (o_request_id uuid, o_status text, o_lease text, o_lease_acquired boolean)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
  v_row private.account_deletion_requests%ROWTYPE;
  v_lease timestamptz;
BEGIN
  IF p_user IS NULL OR p_lease_seconds IS NULL OR p_lease_seconds < 30 OR p_lease_seconds > 900 THEN
    RAISE EXCEPTION 'n10: invalid open arguments' USING ERRCODE = '22023';
  END IF;

  INSERT INTO private.account_deletion_requests (user_id)
  VALUES (p_user)
  ON CONFLICT (user_id) WHERE status NOT IN ('completed', 'cancelled') DO NOTHING;

  SELECT * INTO v_row
  FROM private.account_deletion_requests r
  WHERE r.user_id = p_user AND r.status NOT IN ('completed', 'cancelled')
  FOR UPDATE;

  IF v_row.status = 'requested' AND (v_row.lease_until IS NULL OR v_row.lease_until < now()) THEN
    v_lease := now() + pg_catalog.make_interval(secs => p_lease_seconds);
    UPDATE private.account_deletion_requests r SET lease_until = v_lease WHERE r.id = v_row.id;
    RETURN QUERY SELECT v_row.id, v_row.status, v_lease::text, true;
  ELSE
    RETURN QUERY SELECT v_row.id, v_row.status, NULL::text, false;
  END IF;
END;
$$;

-- Claim due work for the worker with SKIP LOCKED and a lease (duplicate runs never share a row).
CREATE OR REPLACE FUNCTION private.n10_claim_due(p_limit integer, p_lease_seconds integer)
RETURNS TABLE (o_request_id uuid, o_user_id uuid, o_status text, o_lease text, o_attempt_count integer)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  IF p_limit IS NULL OR p_limit < 1 OR p_limit > 50
     OR p_lease_seconds IS NULL OR p_lease_seconds < 30 OR p_lease_seconds > 900 THEN
    RAISE EXCEPTION 'n10: invalid claim arguments' USING ERRCODE = '22023';
  END IF;
  RETURN QUERY
    WITH due AS (
      SELECT r.id
      FROM private.account_deletion_requests r
      WHERE r.status IN ('requested', 'auth_deleted', 'awaiting_final_sweep', 'purge_attention')
        AND r.next_attempt_at <= now()
        AND (r.lease_until IS NULL OR r.lease_until < now())
        AND (r.status <> 'awaiting_final_sweep' OR now() >= r.final_sweep_after)
      ORDER BY r.next_attempt_at, r.id
      LIMIT p_limit
      FOR UPDATE SKIP LOCKED
    )
    UPDATE private.account_deletion_requests r
    SET lease_until = now() + pg_catalog.make_interval(secs => p_lease_seconds)
    FROM due
    WHERE r.id = due.id
    RETURNING r.id, r.user_id, r.status, r.lease_until::text, r.attempt_count;
END;
$$;

-- Internal: lock a request and verify the caller still holds a live lease in the expected state.
CREATE OR REPLACE FUNCTION private.n10_lock_leased(p_request uuid, p_lease text, p_expected text)
RETURNS private.account_deletion_requests
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
  v_row private.account_deletion_requests%ROWTYPE;
BEGIN
  IF p_request IS NULL OR p_lease IS NULL OR p_expected IS NULL THEN
    RAISE EXCEPTION 'n10: request, lease and expected state required' USING ERRCODE = '22023';
  END IF;
  SELECT * INTO v_row FROM private.account_deletion_requests r WHERE r.id = p_request FOR UPDATE;
  IF NOT FOUND OR v_row.status <> p_expected OR v_row.lease_until IS DISTINCT FROM p_lease::timestamptz
     OR v_row.lease_until < now() THEN
    RAISE EXCEPTION 'n10: lease or state mismatch' USING ERRCODE = '55000';
  END IF;
  RETURN v_row;
END;
$$;

CREATE OR REPLACE FUNCTION private.n10_release_lease(p_request uuid, p_lease text)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
  v_count integer;
BEGIN
  IF p_request IS NULL OR p_lease IS NULL THEN
    RAISE EXCEPTION 'n10: request and lease required' USING ERRCODE = '22023';
  END IF;
  UPDATE private.account_deletion_requests r
  SET lease_until = NULL
  WHERE r.id = p_request AND r.lease_until = p_lease::timestamptz
    AND r.status NOT IN ('completed', 'cancelled');
  GET DIAGNOSTICS v_count = ROW_COUNT;
  RETURN v_count = 1;
END;
$$;

-- Record a failed attempt: D4 backoff, 24 h escalation, permanent Auth failure -> auth_attention.
-- Post-Auth states never return to a pre-Auth state and never restore the account.
CREATE OR REPLACE FUNCTION private.n10_record_failure(
  p_request uuid, p_lease text, p_expected text, p_error_class text, p_permanent boolean)
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
  v_row private.account_deletion_requests%ROWTYPE;
  v_new text;
  v_attempt integer;
  v_since timestamptz;
BEGIN
  IF p_error_class IS NULL OR p_error_class NOT IN (
      'auth_transient', 'auth_permanent', 'auth_unknown_outcome', 'storage_list', 'storage_remove',
      'storage_partial', 'db', 'timeout', 'config') OR p_permanent IS NULL THEN
    RAISE EXCEPTION 'n10: invalid failure arguments' USING ERRCODE = '22023';
  END IF;
  v_row := private.n10_lock_leased(p_request, p_lease, p_expected);

  IF v_row.status = 'requested' THEN
    IF p_permanent OR now() - v_row.requested_at >= interval '24 hours' THEN
      v_new := 'auth_attention';
    ELSE
      v_new := 'requested';
    END IF;
  ELSIF v_row.status IN ('auth_deleted', 'awaiting_final_sweep', 'purge_attention') THEN
    v_since := CASE v_row.status WHEN 'auth_deleted' THEN v_row.auth_deleted_at ELSE v_row.final_sweep_after END;
    IF v_row.status = 'purge_attention' OR now() - v_since >= interval '24 hours' THEN
      v_new := 'purge_attention';
    ELSE
      v_new := v_row.status;
    END IF;
  ELSE
    RAISE EXCEPTION 'n10: failures are not recorded in state %', v_row.status USING ERRCODE = '55000';
  END IF;

  v_attempt := CASE WHEN v_new = v_row.status THEN v_row.attempt_count + 1 ELSE 0 END;

  UPDATE private.account_deletion_requests r
  SET status = v_new,
      attempt_count = v_attempt,
      next_attempt_at = now() + CASE WHEN v_new = 'purge_attention' THEN interval '60 minutes'
                                     ELSE private.n10_retry_delay(GREATEST(v_attempt, 1)) END,
      last_error_class = p_error_class,
      lease_until = NULL
  WHERE r.id = v_row.id;
  RETURN v_new;
END;
$$;

-- Confirm Auth deletion committed and fix the final-sweep window (H1 / D13).
-- final_sweep_after = auth_deleted_at + max(verified_token_window_seconds, 3600 s) + 15 minutes.
CREATE OR REPLACE FUNCTION private.n10_confirm_auth_deleted(p_request uuid, p_lease text, p_window_seconds integer)
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
  v_row private.account_deletion_requests%ROWTYPE;
  v_now timestamptz := now();
BEGIN
  -- Fail closed on a missing or out-of-range verified token window.
  IF p_window_seconds IS NULL OR p_window_seconds < 3600 OR p_window_seconds > 604800 THEN
    RAISE EXCEPTION 'n10: verified token window missing or out of range' USING ERRCODE = '22023';
  END IF;
  v_row := private.n10_lock_leased(p_request, p_lease, 'requested');
  IF EXISTS (SELECT 1 FROM auth.users u WHERE u.id = v_row.user_id) THEN
    RAISE EXCEPTION 'n10: auth user still exists' USING ERRCODE = '55000';
  END IF;
  UPDATE private.account_deletion_requests r
  SET status = 'auth_deleted',
      auth_deleted_at = v_now,
      final_sweep_after = v_now + pg_catalog.make_interval(secs => GREATEST(p_window_seconds, 3600))
                              + interval '15 minutes',
      attempt_count = 0,
      next_attempt_at = v_now,
      last_error_class = NULL
  WHERE r.id = v_row.id;
  RETURN 'auth_deleted';
END;
$$;

-- Record a purge pass. The database re-derives the remaining canonical and anomaly counts itself and
-- applies the frozen transitions, including the strict COMPLETED predicate and anonymisation.
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

-- Retention cleanup: delete anonymised completed rows older than the configured retention.
-- The proposed 30 days is D14-gated; the value is a parameter, not a constant.
CREATE OR REPLACE FUNCTION private.n10_cleanup_completed(p_retention_days integer)
RETURNS integer
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
  v_count integer;
BEGIN
  IF p_retention_days IS NULL OR p_retention_days < 1 OR p_retention_days > 3650 THEN
    RAISE EXCEPTION 'n10: invalid retention' USING ERRCODE = '22023';
  END IF;
  DELETE FROM private.account_deletion_requests r
  WHERE r.status = 'completed' AND r.user_id IS NULL
    AND r.anonymised_at < now() - pg_catalog.make_interval(days => p_retention_days);
  GET DIAGNOSTICS v_count = ROW_COUNT;
  RETURN v_count;
END;
$$;

-- ---------------------------------------------------------------------------
-- Function privileges: PUBLIC, anon, authenticated and service_role revoked everywhere; minimum grants.
-- ---------------------------------------------------------------------------
REVOKE ALL ON FUNCTION private.account_deletion_requests_guard() FROM PUBLIC, anon, authenticated, service_role, account_deletion_worker;
REVOKE ALL ON FUNCTION private.account_media_access_allowed() FROM PUBLIC, anon, authenticated, service_role, account_deletion_worker;
REVOKE ALL ON FUNCTION private.auth_user_exists(uuid) FROM PUBLIC, anon, authenticated, service_role, account_deletion_worker;
REVOKE ALL ON FUNCTION private.account_media_canonical(uuid, integer) FROM PUBLIC, anon, authenticated, service_role, account_deletion_worker;
REVOKE ALL ON FUNCTION private.account_media_anomaly_count(uuid) FROM PUBLIC, anon, authenticated, service_role, account_deletion_worker;
REVOKE ALL ON FUNCTION private.n10_retry_delay(integer) FROM PUBLIC, anon, authenticated, service_role, account_deletion_worker;
REVOKE ALL ON FUNCTION private.n10_open_request(uuid, integer) FROM PUBLIC, anon, authenticated, service_role, account_deletion_worker;
REVOKE ALL ON FUNCTION private.n10_claim_due(integer, integer) FROM PUBLIC, anon, authenticated, service_role, account_deletion_worker;
REVOKE ALL ON FUNCTION private.n10_lock_leased(uuid, text, text) FROM PUBLIC, anon, authenticated, service_role, account_deletion_worker;
REVOKE ALL ON FUNCTION private.n10_release_lease(uuid, text) FROM PUBLIC, anon, authenticated, service_role, account_deletion_worker;
REVOKE ALL ON FUNCTION private.n10_record_failure(uuid, text, text, text, boolean) FROM PUBLIC, anon, authenticated, service_role, account_deletion_worker;
REVOKE ALL ON FUNCTION private.n10_confirm_auth_deleted(uuid, text, integer) FROM PUBLIC, anon, authenticated, service_role, account_deletion_worker;
REVOKE ALL ON FUNCTION private.n10_record_purge(uuid, text, text, integer) FROM PUBLIC, anon, authenticated, service_role, account_deletion_worker;
REVOKE ALL ON FUNCTION private.n10_cleanup_completed(integer) FROM PUBLIC, anon, authenticated, service_role, account_deletion_worker;

GRANT EXECUTE ON FUNCTION private.account_media_access_allowed() TO authenticated;

GRANT EXECUTE ON FUNCTION private.auth_user_exists(uuid) TO account_deletion_worker;
GRANT EXECUTE ON FUNCTION private.account_media_canonical(uuid, integer) TO account_deletion_worker;
GRANT EXECUTE ON FUNCTION private.account_media_anomaly_count(uuid) TO account_deletion_worker;
GRANT EXECUTE ON FUNCTION private.n10_open_request(uuid, integer) TO account_deletion_worker;
GRANT EXECUTE ON FUNCTION private.n10_claim_due(integer, integer) TO account_deletion_worker;
GRANT EXECUTE ON FUNCTION private.n10_release_lease(uuid, text) TO account_deletion_worker;
GRANT EXECUTE ON FUNCTION private.n10_record_failure(uuid, text, text, text, boolean) TO account_deletion_worker;
GRANT EXECUTE ON FUNCTION private.n10_confirm_auth_deleted(uuid, text, integer) TO account_deletion_worker;
GRANT EXECUTE ON FUNCTION private.n10_record_purge(uuid, text, text, integer) TO account_deletion_worker;
GRANT EXECUTE ON FUNCTION private.n10_cleanup_completed(integer) TO account_deletion_worker;

-- ---------------------------------------------------------------------------
-- Storage policies: the eight media policies replaced by guarded versions (frozen §8.2).
-- All four commands require the owner folder AND the deletion/live-account guard.
-- These policies do not revoke previously issued signed URLs (D15 B).
-- ---------------------------------------------------------------------------
DROP POLICY IF EXISTS "Users view own weekly photos" ON storage.objects;
DROP POLICY IF EXISTS "Users upload own weekly photos" ON storage.objects;
DROP POLICY IF EXISTS "Users update own weekly photos" ON storage.objects;
DROP POLICY IF EXISTS "Users delete own weekly photos" ON storage.objects;
DROP POLICY IF EXISTS "Users read own first year memory photos" ON storage.objects;
DROP POLICY IF EXISTS "Users upload own first year memory photos" ON storage.objects;
DROP POLICY IF EXISTS "Users update own first year memory photos" ON storage.objects;
DROP POLICY IF EXISTS "Users delete own first year memory photos" ON storage.objects;

CREATE POLICY "n10 weekly photos select own" ON storage.objects FOR SELECT TO authenticated
  USING (bucket_id = 'weekly-photos' AND (SELECT auth.uid())::text = (storage.foldername(name))[1]
         AND (SELECT private.account_media_access_allowed()));
CREATE POLICY "n10 weekly photos insert own" ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'weekly-photos' AND (SELECT auth.uid())::text = (storage.foldername(name))[1]
              AND (SELECT private.account_media_access_allowed()));
CREATE POLICY "n10 weekly photos update own" ON storage.objects FOR UPDATE TO authenticated
  USING (bucket_id = 'weekly-photos' AND (SELECT auth.uid())::text = (storage.foldername(name))[1]
         AND (SELECT private.account_media_access_allowed()))
  WITH CHECK (bucket_id = 'weekly-photos' AND (SELECT auth.uid())::text = (storage.foldername(name))[1]
              AND (SELECT private.account_media_access_allowed()));
CREATE POLICY "n10 weekly photos delete own" ON storage.objects FOR DELETE TO authenticated
  USING (bucket_id = 'weekly-photos' AND (SELECT auth.uid())::text = (storage.foldername(name))[1]
         AND (SELECT private.account_media_access_allowed()));

CREATE POLICY "n10 first year memories select own" ON storage.objects FOR SELECT TO authenticated
  USING (bucket_id = 'first-year-memories' AND (SELECT auth.uid())::text = (storage.foldername(name))[1]
         AND (SELECT private.account_media_access_allowed()));
CREATE POLICY "n10 first year memories insert own" ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'first-year-memories' AND (SELECT auth.uid())::text = (storage.foldername(name))[1]
              AND (SELECT private.account_media_access_allowed()));
CREATE POLICY "n10 first year memories update own" ON storage.objects FOR UPDATE TO authenticated
  USING (bucket_id = 'first-year-memories' AND (SELECT auth.uid())::text = (storage.foldername(name))[1]
         AND (SELECT private.account_media_access_allowed()))
  WITH CHECK (bucket_id = 'first-year-memories' AND (SELECT auth.uid())::text = (storage.foldername(name))[1]
              AND (SELECT private.account_media_access_allowed()));
CREATE POLICY "n10 first year memories delete own" ON storage.objects FOR DELETE TO authenticated
  USING (bucket_id = 'first-year-memories' AND (SELECT auth.uid())::text = (storage.foldername(name))[1]
         AND (SELECT private.account_media_access_allowed()));
