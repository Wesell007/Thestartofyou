# N10.5 — predictions before destructive execution

Committed locally **before** the first hosted Auth deletion or forced-failure test. Disposable project `tsoy-n10-5-rehearsal` (`mwlryyionkpjbecnbsiq`), sealed source `945677ec`, 53 migrations applied (M1–M6), functions `delete-account` (`verify_jwt` true), `account-deletion-worker` and `process-email-queue` (`verify_jwt` false). N10 cron live (Vault set); e-mail-queue Vault empty; no Lovable credential (owner: unavailable in a disposable project). `jwt_exp` = 3600.

Already completed (non-destructive): identity, guard 44/44, migrations, catalogue/privilege gate, M5 old-shape replacement + rolled-back credential proofs (N10 cron and e-mail cron carry only their invocation token), invocation boundary, user/fixture creation.

| # | Scenario | Prediction |
|---|---|---|
| P1 | **NORM** real `delete-account` (user JWT → GoTrue admin delete → M6 trigger in the same transaction) | HTTP 200 `{"status":"account_deleted","cleanup":"removed"}`; Auth row gone; `hospital_bag_items` row cascaded; both `email_send_log` rows (mixed case) and the unsubscribe token deleted; suppression row **kept**; media purged only after Auth absence is confirmed; request `awaiting_final_sweep`, `final_sweep_after − auth_deleted_at = 01:15:00` |
| P2 | **FAIL** with a test-only BEFORE DELETE trigger on `public.email_send_log` that raises; real `delete-account` | GoTrue returns an error (500 "Database error deleting user" class) → HTTP **202** `deletion_in_progress`; Auth row **exists**; app row, both e-mail log rows, token and suppression row unchanged; both media objects present and byte-identical; Storage remove calls for FAIL = **0**; request `requested`, `last_error_class = auth_transient`, backoff; never `completed` |
| P3 | Live cron retries while the blocker is in place | each retry fails the same way; still 0 removals; attempts increase per D4 (1, 2, … min) |
| P4 | Remove only the blocker; next live cron retry | Auth deletion commits; app row cascades; e-mail log rows + token deleted; suppression kept; media purged only now; `awaiting_final_sweep` |
| P5 | **ANOM** (service-role `move` keeps `owner_id` at `misfiled/…`), real `delete-account` | 200 `continuing`; `purge_attention` (`owner_id_path_anomaly`); next worker tick: no provider credential → `n10_operator_alert_unconfigured` with pending ≥ 1, ledger unchanged (no false "sent") |
| P6 | M4 ledger driven directly as the worker role (provider-independent) | `n10_alerts_due` claims ANOM once (lease); an immediate second claim returns 0; `record_alert(delivered=false)` → failure count 1, next attempt +5 min, status unchanged; after the backoff a successful record sets `alert_key`; further claims 0 (dedup); with `alert_sent_at` shifted 25 h → exactly one `escalation`, then 0 |
| P7 | M5 queue delivery and real operator e-mail | **HOLD — LOVABLE MANAGED PROJECT CREDENTIAL UNAVAILABLE IN DISPOSABLE PROJECT** (no delivery attempted/claimed) |
| P8 | Final sweep / retention sanity | no early `completed`; a synthetic completed anonymised row is removed by `n10_cleanup_completed(0)`; `n10_cleanup_completed(30)` keeps a fresh one; `-1` rejected |
| P9 | Worker role probes (§12/§13) | Auth/Storage/vault/cron/private/e-mail tables denied; pg_net queue/enqueue still possible (documented platform residual); no privileged credential in any queued request |
| P10 | Advisors | N10.4-introduced security errors = 0 |
| P11 | CTRL | unchanged throughout |
