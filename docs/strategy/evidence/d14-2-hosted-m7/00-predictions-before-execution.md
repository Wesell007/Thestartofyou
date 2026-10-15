# 00 — D14.2 predictions (written and committed before any destructive hosted action)

Source: sealed `4b561385`. M7 `20261015053138_n10_analytics_erasure.sql` sha256 (LF) `8dde2626170055505f82734c7c54962e961ce1d0b38c8082659b3ae18efa5768`. Target: a new disposable project only (production `wogepxfipdipogyogced` and every retired rehearsal ref are denylisted). All fixtures are synthetic (`@example.invalid` users, tiny generated files).

## Plan in brief

1. Baseline = the 53 repository migrations up to and including M6 (no M7, no 41B.1A, which lives only in `docs/strategy/migrations-pending/`).
2. Pre-M7 fixtures driven through the real M1 function surface as the `account_deletion_worker` login over the shared transaction pooler, with real GoTrue deletion and real Storage API removal:
   - **A** `completed` (anonymised, `user_id` NULL);
   - **B** `auth_deleted` with media still present (purge underway);
   - **C** `awaiting_final_sweep` (media empty, window not reached);
   - **D** `requested` (Auth user still exists);
   - **E** `auth_attention` (`auth_permanent`; Auth user still exists).
3. Apply M7 alone (`db push`, dry-run first must list exactly M7).
4. Hosted proofs with the real shared TypeScript module (`createN10Db`, `runDeleteAccount`, `runWorker`, `runAnalyticsErasure`, `dispatchOperatorAlerts` ledger calls) against the hosted database through the pooler, plus the real `account-deletion-worker` Edge Function deployed **without** any `POSTHOG_*` secret.

## Predictions

**P1 — M7 backfill.** `db push` applies M7 without error. A → `analytics_status = 'not_tracked'`, still `completed`, `user_id` NULL, all other columns unchanged. B, C, D, E → `analytics_status = 'pending'`, `analytics_attempt_count = 0`, every other `analytics_*` column NULL; `status`, `user_id`, timestamps, counters and `alert_*` unchanged. All new CHECK constraints validate. No row changes status; no `user_id` is cleared.

**P2 — post-migration behaviour of the fixtures.** B: the worker purges the remaining media and B moves to `awaiting_final_sweep` (media independent of pending analytics). C: after its window (time-shifted), the worker's final sweep returns `awaiting_final_sweep` (gate) and C is **not** completed; `user_id` kept. D: unchanged until processed; it is never claimed by `n10_analytics_due` while `requested`. E: still `auth_attention`; its alert key remains `auth_attention:auth_permanent`. A: never claimed; retention cleanup can still delete it.

**P3 — catalogue/privileges.** `n10_analytics_guard` is SECURITY INVOKER with `search_path=""`; `n10_analytics_due`, `n10_record_analytics`, `n10_record_purge`, `n10_alerts_due`, `n10_alerts_pending_count` are SECURITY DEFINER, `search_path=""`, owner `postgres`. EXECUTE on every `private` function: PUBLIC/anon/authenticated/service_role **false** (authenticated true only for `account_media_access_allowed()`); `account_deletion_worker` true exactly for the 15-function worker surface (M1 10 + M4 3 + M7 2). Worker has no table privilege on `private.account_deletion_requests`, is not BYPASSRLS, and `private` is not in the Data API's exposed schemas.

**P4 — worker login/pooler.** Postgres.js (`prepare: false`, `max: 1`) connects as `account_deletion_worker.<ref>` on the shared pooler port 6543; `current_user = account_deletion_worker`; worker-surface calls succeed; `select … from private.account_deletion_requests` fails with 42501.

**P5 — media independence + completion gate.** A fresh synthetic user with media: `delete-account` flow returns 200, all canonical media removed immediately, state `awaiting_final_sweep`, `analytics_status = 'pending'`. With the window time-shifted past and analytics unresolved (including after transient analytics failures), repeated worker ticks leave the request `awaiting_final_sweep`, `user_id` present, `completed_at`/`anonymised_at` NULL; the media status never moves backwards. Direct completion/anonymisation/`not_tracked`/`resolved` writes are refused with 23514.

**P6 — analytics claim/lease.** Not claimable before `auth_deleted_at + 15 min`; claimable after. Two concurrent worker connections: exactly one receives the row (SKIP LOCKED). The media lease (`n10_claim_due`) and the analytics lease can be held on the same row at the same time. Wrong/stale lease → 55000. Resolution while an Auth user with the same id exists → 23514. Valid lease → `resolved`.

**P7 — persons_found = 1.** Recording `resolved, 1` through the neutral boundary sets `analytics_status = 'resolved'`, `analytics_resolved_at`, `analytics_persons_found = 1`, clears attention/error, brings `next_attempt_at` forward to no later than `max(now, final_sweep_after)`; the next worker tick completes: `status = completed`, `completed_at` and `anonymised_at` set, `user_id` NULL.

**P8 — persons_found = 0.** Same as P7 with `analytics_persons_found = 0`; no further analytics claims; completion follows.

**P9 — missing credential (hosted Edge Function).** With no `POSTHOG_*` secret, the deployed worker returns `{"ok":true}`; a due request records `analytics_last_error = 'analytics_config'`, `analytics_attention_since` set on the first attempt, next attempt ≈ +60 min, status/media unchanged, `user_id` kept, not completed. Function logs contain the opaque request id and error class only — no user id, no secret. No `POSTHOG_*` secret exists, so no eraser is constructed and no PostHog request is possible.

**P10 — M4 analytics alert dedup.** `n10_alerts_due` returns the analytics-attention row once with key `analytics_attention:analytics_config`, kind `attention`, status = its media status; after a recorded outcome a second call returns nothing for it; after `alert_sent_at` is shifted back 25 h it returns exactly one `escalation`, then nothing. A row in `purge_attention` keeps a `purge_attention:<class>` key even with analytics pending; E keeps `auth_attention:auth_permanent`. Without alert configuration the hosted worker logs `n10_operator_alert_unconfigured` with a pending count and sends nothing.

**P11 — advisors.** No new critical/high security finding attributable to M7 (no new exposed function, no RLS change).

**P12 — PostHog live HTTP.** No non-production PostHog project exists → **NOT RUN / DEFERRED TO CONTROLLED ACTIVATION**.

A deviation from any prediction is recorded as observed, not edited away.
