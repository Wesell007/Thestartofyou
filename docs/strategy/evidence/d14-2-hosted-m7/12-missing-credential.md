# 12 — Missing credential: deployed real worker without `POSTHOG_*` (P9)

Raw: `raw/10-secrets.txt`, `raw/10-deploy-worker.txt`, `raw/10-p9-hosted-worker.txt`, `raw/11-function-logs-p9.json`.

## Deployment

- `supabase functions deploy account-deletion-worker --project-ref jjrhizafpikmyvfapcic --use-api` from the sealed export. Assets: `account-deletion-worker/index.ts`, `_shared/accountDeletionRuntime.ts`, `_shared/analyticsErasureProvider.ts`, `_shared/accountDeletion.ts`, `_shared/operatorAlertProvider.ts`. The function is `ACTIVE`, version 1, `verify_jwt = false` (as committed in `config.toml`).
- Function secrets (names only): `N10_DB_URL` (worker over the transaction pooler), `N10_VERIFIED_TOKEN_WINDOW_SECONDS=3600`, `N10_TOKEN_WINDOW_VERIFICATION=management-api:2026-10-23`, `N10_WORKER_INVOKE_SECRET`, `N10_COMPLETED_ROW_RETENTION_DAYS=30`, `N10_ENVIRONMENT=rehearsal`. **0** `POSTHOG_*` secrets; no `LOVABLE_API_KEY` and no `N10_OPERATOR_ALERT_*`.
- `delete-account` was not deployed: the real `runDeleteAccount` was driven directly against the hosted database, Auth and Storage, and N10.5 already proved the deployed `delete-account` function.

## Fixtures

H (`b2794a2b`): real delete → `awaiting_final_sweep`, `auth_deleted_at` shifted −16 min. I (`c071b441`): one canonical object moved to `misfiled/…` with the supported Storage API, which keeps `owner_id`; real delete → **200 `continuing`** → `purge_attention` / `owner_id_path_anomaly`; then shifted −16 min.

## Invocation (2026-10-23T06:38:04Z)

| Check | Result |
|---|---|
| Without the token → **401** `{"error":"Unauthorized"}` | as designed |
| With the invocation token, body `{}` → **200 `{"ok":true}`** (966 ms); runtime booted normally | PASS |
| H: `analytics_last_error = analytics_config`, `analytics_attention_since` set on the **first** attempt, attempts 1, `analytics_next_attempt_at` ≈ **+60.0 min**, `analytics_status = pending`, status `awaiting_final_sweep`, media unchanged, `user_id` kept, not completed | PASS |
| I: the same with status `purge_attention` unchanged | PASS |
| B and D were not yet due (`auth_deleted_at` + 15 min in the future) and were not touched | as designed |

## Logs (`raw/11-function-logs-p9.json`, hosted function logs 06:37–06:40Z)

`n10_retention_cleanup {removed_rows:0}` · `n10_analytics_erasure_failed {request_id: b2794a2b…, error_class: analytics_config, attention: true}` · the same for `c071b441…` · `n10_operator_alert_unconfigured {reason: destination_unconfigured, pending: 3}` · `n10_worker_run {processed:0, token_window_ok:true, retention_configured:true, analytics_resolved:0, analytics_failed:2, alerts_sent:0, alerts_failed:0}`.

A scan of the saved log lines finds **0** fixture user ids and **0** fixture e-mails. There are no secrets, URLs or provider messages.

**No PostHog request:** with no `POSTHOG_*` secret, `createAnalyticsEraserFromEnv` returns `null` (fail closed) and `runAnalyticsErasure` records `analytics_config` **without** calling an eraser. The only `fetch` that targets PostHog lives inside `createPosthogEraser`, which is never constructed. This follows from the deployed code path together with the recorded `analytics_config` outcome; outbound traffic was not captured at the network level.

**P9: PASS.**
