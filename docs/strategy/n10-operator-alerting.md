# N10 — Operator alerting (D5)

**Status: IMPLEMENTED LOCALLY (N10.4, M4 + worker). Destination and sender DECIDED by the owner (11 October 2026, §2). Operator-alert blocker = OPEN** until the values are set as production secrets at controlled activation and the production smoke test (§8) passes. No production change has been made.

## 1. Design

- **Out-of-band.** No deletion transition sends e-mail or waits for it. After the worker's normal durable-job loop, `dispatchOperatorAlerts` asks the database which attention rows need an alert, sends a minimal message, and records the outcome in the M4 ledger. If sending fails, the deletion state is untouched and stays in its attention state; the alert is retried later.
- **Ledger (M4 `20261009140726_n10_operator_alert_ledger.sql`).** Additive `alert_*` columns on `private.account_deletion_requests` and three hardened SECURITY DEFINER functions (`search_path = ''`, EXECUTE only for `account_deletion_worker`): `n10_alerts_due` (SKIP LOCKED + lease), `n10_record_alert`, `n10_alerts_pending_count`. They never change status, timestamps, counters or `user_id`. M1/M2/M3 are unchanged. The worker role still cannot read the table directly.
- **Provider (current adapter).** The project's existing Lovable Email integration (`npm:@lovable.dev/email-js@0.3.1`, exactly pinned; `LOVABLE_API_KEY`, a backend-only project secret) called **directly from the worker's Edge runtime** through the adapter (§1.1). Deliberately **not** through `enqueue_email` / `process-email-queue`: when this was designed, that queue's dispatcher (`public.email_queue_dispatch`) authenticated with a service-role key sent through pg_net, which N10.3B §11 showed is readable by every database login role (fixed in the repository by M5), and alert delivery should not depend on the queue in any case. The N10 scheduler remains M3 (invocation-only secret); no credential is added to pg_net.
- **Interface.** `OperatorNotifier` (the `sendN10OperatorAlert` boundary) is injected; the provider adapter `createConfiguredOperatorNotifier()` lives only in `supabase/functions/_shared/operatorAlertProvider.ts`, returns `{ ok } | { ok: false, reason }`, and never propagates provider messages. See §1.1.

### 1.1 Portability requirement — the e-mail provider must remain swappable (owner, 11 October 2026)

Lovable Email is an **adapter**, not a dependency of the N10 deletion state machine.

- **Boundary:** `OperatorNotifier` / `OperatorAlertMessage` in `accountDeletion.ts` (`to`, `from`, `subject`, `text`, `html`, `idempotencyKey` → `{ ok: true } | { ok: false, reason }`). The core never imports provider code, types, responses or configuration.
- **Isolation:** all provider-specific code is in `supabase/functions/_shared/operatorAlertProvider.ts`, which exports one function, `createConfiguredOperatorNotifier(): OperatorNotifier | undefined` (undefined when its own credential is missing). The runtime wiring imports only that function.
- **Swapping** to Hostinger, Resend, Postmark, SES or another provider = replace that file's implementation (and its pinned import and credential). **No change** to: account-deletion state transitions, the M4 alert ledger, deduplication, escalation rules, database schema, worker orchestration, or the alert message contract.
- **Configuration stays provider-neutral:** `N10_OPERATOR_ALERT_EMAIL`, `N10_OPERATOR_ALERT_FROM`, `N10_ENVIRONMENT` are read by the core; the provider credential (today `LOVABLE_API_KEY`) is separate backend-only configuration read only by the adapter.
- **Enforced by tests** (`n10OperatorAlerts.test.ts`): no provider name in the core, runtime wiring, worker, `delete-account` or M4; the runtime uses only `createConfiguredOperatorNotifier`; the adapter does not read the neutral variables; its import is exactly pinned.
- No extra abstraction framework: one interface, one adapter file.

## 2. Configuration (all backend-only Edge Function secrets; nothing hardcoded)

| Variable | Meaning | If missing / invalid |
|---|---|---|
| `N10_OPERATOR_ALERT_EMAIL` | destination operator inbox | nothing sent; `n10_operator_alert_unconfigured {reason, pending}` logged each run while alerts are pending; alerts stay pending |
| `N10_OPERATOR_ALERT_FROM` | sender address on a verified Lovable Email sender domain | same, `reason = sender_unconfigured` |
| `LOVABLE_API_KEY` | existing project secret | same, `reason = provider_unconfigured` |
| `N10_ENVIRONMENT` | label in the subject/body (`[a-z0-9-]{1,32}`, e.g. `production`) | `unspecified` |

**Owner decision (11 October 2026) — planned production configuration** (to be set as Edge Function secrets only at controlled activation; never hardcoded in source):

| Variable | Value | Notes |
|---|---|---|
| `N10_OPERATOR_ALERT_EMAIL` | `contact@thestartofyou.com` | dedicated The Start of You brand mailbox; **receives** operational account-deletion alerts |
| `N10_OPERATOR_ALERT_FROM` | `contact@wesellproducts.co.uk` | existing Lovable-connected / verified business sender; **sends** the alerts |
| `N10_ENVIRONMENT` | `production` | |

Delivery stays on Lovable Email (not Hostinger); `thestartofyou.com` sender verification is not required for N10. Before activation, confirm in the Lovable Email settings that `contact@wesellproducts.co.uk` is a verified sender for this project (a rejected sender would surface as `n10_operator_alert_delivery_failed` and alerts would stay pending).

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
| Analytics-identity erasure (D14.1 / M7): missing/malformed PostHog credential, or provider 4xx | request stays in its media state; `analytics_attention_since` set immediately (`analytics_config` / `analytics_permanent`); COMPLETED blocked | first alert, key `analytics_attention:<class>` ("Analytics identity erasure needs operator attention") |
| Analytics erasure transient failures (408/429/5xx/network) unresolved 24 h after Auth deletion | `analytics_attention_since` set (`analytics_transient`); COMPLETED blocked | first alert; escalation and class-change rules as above |
| Analytics erasure resolves | attention cleared | none (no further alerts) |

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
