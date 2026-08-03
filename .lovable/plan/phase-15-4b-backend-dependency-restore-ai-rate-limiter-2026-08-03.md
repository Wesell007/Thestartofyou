# Phase 15.4B Backend Dependency Restore: AI Rate Limiter

Plan mode blocks the migration, so this needs approval and build mode to apply. Everything below is ready to run.

## Why

All `ai-search` calls return 503 because the edge function's rate-limit check hits a missing RPC:

```text
ERROR ai-search rate limiter unavailable  Rate limiter returned 404
```

Verified against the live database: `to_regclass('public.ai_rate_limits')` is null and `pg_proc` has no `consume_ai_rate_limit`. The migration `supabase/migrations/20260720110000_backend_safety_and_email_delivery.sql` was never applied. This affects /ask and the inline companion equally.

## Email-delivery half: leave untouched

Checked the rest of that migration against the live database. The email objects are already present (`email_send_log`, `email_send_state`, `read_email_batch`, `claim_email_delivery`, `complete_email_delivery`, `release_email_delivery`, `email_queue_dispatch`, `email_queue_wake`). Only the AI rate limiter half is missing, so nothing email-related is restored or changed here. No separate restore phase is needed.

## The migration (new, forward-only)

Definitions copied verbatim from the original migration, with one addition: `GRANT ALL ON TABLE public.ai_rate_limits TO service_role` before RLS is enabled, so the table follows the required create/grant/RLS/policy ordering. The subsequent `REVOKE ALL ... FROM PUBLIC, anon, authenticated` keeps the table unreachable from the client.

Objects restored:
- `public.ai_rate_limits` — `rate_key` primary key, `window_started_at`, `request_count` with a non-negative check, `updated_at`.
- RLS enabled on the table with no policies, plus the revokes from `PUBLIC`, `anon` and `authenticated`.
- `public.consume_ai_rate_limit(TEXT, INTEGER, INTEGER)` — security definer, `search_path = public`, unchanged body.
- `EXECUTE` granted to `service_role` only; revoked from `PUBLIC`, `anon`, `authenticated`.

No prompt changes, no new AI function, no rate-limiter bypass, no route, analytics, RLS-relaxation or companion-card changes.

## Verification after it applies

1. Database: confirm `to_regclass('public.ai_rate_limits')` is non-null and `pg_proc` finds `consume_ai_rate_limit`.
2. Edge logs: confirm the 404 rate-limiter error stops.
3. Live QA on /my-week with the same signed-in active journey (week 37): prompt chip streams, typed question streams, answer renders inline, Sources block appears collapsed if returned, "Ask something else" resets, "Continue in Ask" routes with no question or context in the URL.
4. Re-capture the request bodies and confirm the payload still carries only question, week, trimester, due day and month, tone hint and page hint — no first name, companion name, reflections, photos, videos, voice notes, memory flags, media URLs or due year.
5. /ask returns an answer again.
6. Desktop 1280px and mobile 390px, console clean apart from controlled error cases.
7. 429: attempt to trigger live by exceeding 12 requests in a minute now that the limiter exists; otherwise report as code-verified.
8. Re-run `npx tsgo --noEmit -p tsconfig.json` and `npx vitest run src/lib/companionContext.test.ts` and return exact output.

Phase 15.4B closes only if inline streaming is observed end to end.
