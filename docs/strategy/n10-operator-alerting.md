# N10 — Operator alerting (D5)

**Status: IMPLEMENTED LOCALLY (N10.4, M4 + worker). Operator-alert blocker = OPEN** until a real destination and sender are configured and the production smoke test (§8) passes. No production change has been made.

## 1. Design

- **Out-of-band.** No deletion transition sends e-mail or waits for it. After the worker's normal durable-job loop, `dispatchOperatorAlerts` asks the database which attention rows need an alert, sends a minimal message, and records the outcome in the M4 ledger. If sending fails, the deletion state is untouched and stays in its attention state; the alert is retried later.
- **Ledger (M4 `20261009140726_n10_operator_alert_ledger.sql`).** Additive `alert_*` columns on `private.account_deletion_requests` and three hardened SECURITY DEFINER functions (`search_path = ''`, EXECUTE only for `account_deletion_worker`): `n10_alerts_due` (SKIP LOCKED + lease), `n10_record_alert`, `n10_alerts_pending_count`. They never change status, timestamps, counters or `user_id`. M1/M2/M3 are unchanged. The worker role still cannot read the table directly.
- **Provider.** The project's existing Lovable Email integration (`npm:@lovable.dev/email-js@0.3.1`, exactly pinned; `LOVABLE_API_KEY`, a backend-only project secret) called **directly from the worker's Edge runtime**. Deliberately **not** through `enqueue_email` / `process-email-queue`: that queue's dispatcher (`public.email_queue_dispatch`) authenticates with a service-role key sent through pg_net, which N10.3B §11 showed is readable by every database login role. The N10 scheduler remains M3 (invocation-only secret); no credential is added to pg_net.
- **Interface.** `OperatorNotifier` (`sendN10OperatorAlert` equivalent) is injected; the provider adapter (`createLovableOperatorNotifier`) lives only in the Deno runtime, returns `{ ok } | { ok: false, reason }`, and never propagates provider messages.

## 2. Configuration (all backend-only Edge Function secrets; nothing hardcoded)

| Variable | Meaning | If missing / invalid |
|---|---|---|
| `N10_OPERATOR_ALERT_EMAIL` | destination operator inbox | nothing sent; `n10_operator_alert_unconfigured {reason, pending}` logged each run while alerts are pending; alerts stay pending |
| `N10_OPERATOR_ALERT_FROM` | sender address on a verified Lovable Email sender domain | same, `reason = sender_unconfigured` |
| `LOVABLE_API_KEY` | existing project secret | same, `reason = provider_unconfigured` |
| `N10_ENVIRONMENT` | label in the subject/body (`[a-z0-9-]{1,32}`, e.g. `production`) | `unspecified` |

**No existing operational/admin inbox was found in the repository** (no ops/admin/support address or alert variable anywhere). Both the destination and the sender therefore need owner input.

## 3. Event matrix

| Situation | Database state | Alert |
|---|---|---|
| Normal deletion (any path that ends `awaiting_final_sweep` / `completed`) | — | **none** |
| Transient Auth failure before 24 h | `requested` with backoff | **none** (no spam) |
| Permanent Auth failure | `auth_attention` (`auth_permanent`) | first alert |
| Unknown/transient Auth failure unresolved at 24 h | `auth_attention` (`auth_transient` / `auth_unknown_outcome`) | first alert |
| Missing/unverified token-window configuration persisting 24 h | `auth_attention` (`config`) | first alert |
| Storage purge failing for 24 h after Auth deletion | `purge_attention` (`storage_*`) | first alert |
| OWNER_ID_PATH_ANOMALY | `purge_attention` (`owner_id_path_anomaly`) immediately | first alert |
| Same attention key unresolved 24 h after the first alert | unchanged | **one** escalation alert |
| Error class changes within an attention state | new key | new first alert |
| Alert delivery fails | attention state unchanged | retried after 5, 15, then every 60 min; each failure logged (`n10_operator_alert_delivery_failed`, no secret) |
| No destination configured | attention state unchanged | none; pending count logged every run |
| Late object found by the final sweep | completes normally | log only (`final_sweep_regression`), no e-mail |

Residual: if the worker or cron itself stops running, no alert can be sent; uptime monitoring of the worker is outside N10 (recommended at activation).

## 4. Payload (exactly these fields)

Environment · alert class · opaque deletion request id · status · error class · attempt count · first requested (UTC) · age (hours) · first-alerted time (escalations) · alert time (UTC). Subject: `[TSOY <env>] [ESCALATION: ]<class> — request <first 8 chars>`.

Never included: user id, e-mail, name, journey/pregnancy/TTC data, health data, Storage filenames or paths, treatment information, tokens, JWTs, secrets. The operator finds the row by request id (privileged access); the user id is not needed in the e-mail. Provider idempotency key: `n10-alert-<request>-<kind>-<key>`.

## 5. Deduplication

Alert key = `<status>:<error_class>`. First alert when the row's current key differs from the last delivered key; one escalation when the same key is still present 24 h after the first alert; otherwise silence on every worker tick. Overlapping worker runs cannot send the same alert (SKIP LOCKED + 120 s lease; `n10_record_alert` requires the lease).

## 6. Security

Backend-only secrets; fail closed on missing configuration; provider errors reduced to a status code; no credential in pg_net; M3 unchanged (wrong token → 401 before any alert work); the worker role gains EXECUTE on three ledger functions only; deletion success never depends on notification.

## 7. Tests (`src/test/n10OperatorAlerts.test.ts`, real M1 + M4 in PGlite, fake provider)

Static M4 contract; no hardcoded address; provider only in the runtime, exactly pinned, no pg_net; configuration fail-closed cases; normal deletion → no alert; pre-threshold transient failure → no alert; `auth_attention` → one minimal alert with the opaque id and no user id/e-mail/bucket/path; repeat ticks → no duplicate; ledger touches alert columns only; `purge_attention` / `owner_id_path_anomaly` → alert, no path; 24 h → exactly one escalation; error-class change → new alert; provider throw/reject → deletion state intact, failure logged without secrets, backoff, retry, delivery; no destination → nothing sent, pending logged, alert delivered later; lease prevents a second dispatcher; worker cannot read the table; rendered field set exact; wrong invocation token → 401 and no alert, correct token → alert sent and response still exactly `{"ok":true}`. Mutation checks: removing the M4 dedup condition fails 7 tests; recording failed deliveries as delivered fails the provider-failure test.

## 8. Production verification (prepared — execute only during controlled activation, with owner approval)

1. Set `N10_OPERATOR_ALERT_EMAIL`, `N10_OPERATOR_ALERT_FROM`, `N10_ENVIRONMENT=production` as Edge Function secrets; confirm `LOVABLE_API_KEY` exists (names only).
2. Create one **synthetic, non-user** attention row by privileged setup in a single transaction: insert a request for a random UUID that is not an Auth user, set `status = 'auth_attention'`, `last_error_class = 'config'` (guard-permitted transition), commit.
3. Wait for the next worker tick (≤ 1 min). Confirm exactly **one** e-mail arrives at the destination, with the synthetic request id and none of the forbidden fields; confirm a second tick sends nothing.
4. Remove the synthetic row by privileged cleanup in one transaction (guard trigger disabled only inside it, re-enabled and verified), and confirm `n10_alerts_pending_count() = 0`.
5. Record the evidence; only then may the operator-alert blocker be closed.
