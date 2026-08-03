CREATE TABLE IF NOT EXISTS public.ai_rate_limits (
  rate_key TEXT PRIMARY KEY,
  window_started_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  request_count INTEGER NOT NULL DEFAULT 0 CHECK (request_count >= 0),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT ALL ON TABLE public.ai_rate_limits TO service_role;

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

REVOKE ALL ON TABLE public.ai_rate_limits FROM PUBLIC;
REVOKE ALL ON TABLE public.ai_rate_limits FROM anon;
REVOKE ALL ON TABLE public.ai_rate_limits FROM authenticated;
REVOKE EXECUTE ON FUNCTION public.consume_ai_rate_limit(TEXT, INTEGER, INTEGER) FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.consume_ai_rate_limit(TEXT, INTEGER, INTEGER) FROM anon;
REVOKE EXECUTE ON FUNCTION public.consume_ai_rate_limit(TEXT, INTEGER, INTEGER) FROM authenticated;
GRANT EXECUTE ON FUNCTION public.consume_ai_rate_limit(TEXT, INTEGER, INTEGER) TO service_role;