-- N10.4 (M6) — account-deletion privacy minimisation (prepared for the D14 decision; D14 = OPEN).
--
-- 1. Retention option C: n10_cleanup_completed accepts 0 days, meaning completed, anonymised rows are
--    removed on the next worker run after completion. 1–3650 days behave exactly as before.
-- 2. E-mail records keyed only by address (no FK to auth.users) are minimised when the Auth user is
--    deleted: rows in public.email_send_log and public.email_unsubscribe_tokens for that address are
--    deleted in the same transaction as the Auth deletion (account-first ordering is unchanged).
--    public.suppressed_emails is deliberately KEPT (it prevents e-mailing an address that unsubscribed,
--    bounced or complained); keeping or removing it is a D14 decision.
--    ATOMIC (owner decision, 13 October 2026): this cleanup is part of the Auth deletion transaction.
--    If it cannot complete, the trigger raises, the whole Auth deletion (including every database
--    cascade) rolls back, and N10 treats it like any other Auth deletion failure: the Auth user remains,
--    media is untouched, the request retries on the D4 schedule and escalates to auth_attention.
--    (Superseded design, never applied anywhere: an earlier local draft downgraded errors to a WARNING
--    so the Auth deletion could commit with e-mail records left behind.)
-- M1–M5 are unchanged.

CREATE OR REPLACE FUNCTION private.n10_cleanup_completed(p_retention_days integer)
RETURNS integer
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
  v_count integer;
BEGIN
  IF p_retention_days IS NULL OR p_retention_days < 0 OR p_retention_days > 3650 THEN
    RAISE EXCEPTION 'n10: invalid retention' USING ERRCODE = '22023';
  END IF;
  DELETE FROM private.account_deletion_requests r
  WHERE r.status = 'completed' AND r.user_id IS NULL
    AND r.anonymised_at <= now() - pg_catalog.make_interval(days => p_retention_days);
  GET DIAGNOSTICS v_count = ROW_COUNT;
  RETURN v_count;
END;
$$;

REVOKE ALL ON FUNCTION private.n10_cleanup_completed(integer) FROM PUBLIC, anon, authenticated, service_role, account_deletion_worker;
GRANT EXECUTE ON FUNCTION private.n10_cleanup_completed(integer) TO account_deletion_worker;

CREATE OR REPLACE FUNCTION private.n10_forget_email_records()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  -- No exception handler: any failure aborts the Auth deletion transaction (see header).
  IF OLD.email IS NOT NULL AND OLD.email <> '' THEN
    DELETE FROM public.email_send_log l WHERE lower(l.recipient_email) = lower(OLD.email);
    DELETE FROM public.email_unsubscribe_tokens t WHERE lower(t.email) = lower(OLD.email);
  END IF;
  RETURN OLD;
END;
$$;

REVOKE ALL ON FUNCTION private.n10_forget_email_records() FROM PUBLIC, anon, authenticated, service_role, account_deletion_worker;

-- The cleanup runs inside every Auth deletion transaction, so keep its lookup indexed.
CREATE INDEX IF NOT EXISTS email_send_log_recipient_lower_idx ON public.email_send_log (lower(recipient_email));
CREATE INDEX IF NOT EXISTS email_unsubscribe_tokens_email_lower_idx ON public.email_unsubscribe_tokens (lower(email));

DROP TRIGGER IF EXISTS n10_forget_email_records ON auth.users;
CREATE TRIGGER n10_forget_email_records
  AFTER DELETE ON auth.users
  FOR EACH ROW EXECUTE FUNCTION private.n10_forget_email_records();
