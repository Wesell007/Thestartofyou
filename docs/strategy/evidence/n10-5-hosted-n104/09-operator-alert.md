# 09 — M4 operator alerts

**Database / ledger / fail-closed behaviour: PASS. Real delivery to `contact@thestartofyou.com`: HOLD — LOVABLE MANAGED PROJECT CREDENTIAL UNAVAILABLE IN DISPOSABLE PROJECT. Sender `contact@wesellproducts.co.uk`: NOT TESTED (same reason).** Raw: `raw/11-m4-anom-*.txt`, `raw/11-function-logs-anom.json`, `raw/11b-m4-ledger-worker.txt` (and `…-run1-assertion-bug.txt`).

## Real attention state (ANOM)

Service-role Storage `move` of a canonical object to `misfiled/…` (supported API) preserved `owner_id = ANOM`. `delete-account` → **200 `continuing`** → `purge_attention` / `owner_id_path_anomaly`; the anomaly object was not auto-deleted. The immediate log hook emitted `n10_operator_notification_required {kind: purge_attention, request_id: <opaque>}`.

## Worker with no provider credential (fail closed)

Every live worker tick (23:49, 23:50) logged `n10_worker_run {… alerts_sent: 0, alerts_failed: 0}` and **`n10_operator_alert_unconfigured {reason: "provider_unconfigured", pending: 1}`**; the ledger stayed `alert_key NULL / failures 0 / sent_at NULL` (nothing falsely recorded as sent); the request stayed `purge_attention`.

## Ledger semantics as the real worker role (provider simulated by the recorded outcome; no delivery claimed) — 14/14

first claim = exactly ANOM's `attention` alert (`purge_attention:owner_id_path_anomaly`) · concurrent second claim = nothing · `record(delivered=false)` → failure count 1, next attempt ≈ +5 min, no key · not claimable before the backoff · claimable after it · `record(delivered=true)` → key + `sent_at`, failures reset · three further claims = nothing (dedup) · pending count 0 · `alert_sent_at` shifted 25 h → exactly one `escalation` · then silence · deletion columns (status, class, attempts, `auth_deleted_at`, `user_id`) untouched throughout · worker still cannot read the table.

A first run reported two FAILs caused by the harness comparing boolean text as `t` instead of `true`; the values were correct. The alert columns of that one row were reset (deletion columns untouched) and the full sequence re-run: 14/14.

## Payload minimisation

No message was rendered on the hosted project (no provider). The exact field set and the absence of user id, e-mail, paths, tokens and secrets are proven by the local suite (`src/test/n10OperatorAlerts.test.ts`) and must be confirmed on the real e-mail at activation.
