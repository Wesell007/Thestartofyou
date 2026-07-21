-- Bootstrap signatures required by the following grant-hardening migration.
--
-- Earlier environments created these functions dynamically outside source
-- control, which made a pristine migration replay fail before the later
-- repository-owned implementations could be installed. These safe no-op
-- definitions preserve the historical grant migration and are replaced by
-- 20260720110000_backend_safety_and_email_delivery.sql.

CREATE OR REPLACE FUNCTION public.email_queue_dispatch()
RETURNS BIGINT
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT 0::BIGINT;
$$;

CREATE OR REPLACE FUNCTION public.email_queue_wake()
RETURNS BIGINT
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT 0::BIGINT;
$$;

REVOKE EXECUTE ON FUNCTION public.email_queue_dispatch() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.email_queue_wake() FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.email_queue_dispatch() TO service_role;
GRANT EXECUTE ON FUNCTION public.email_queue_wake() TO service_role;
