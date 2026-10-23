# 13 — Analytics attention in the M4 operator-alert ledger (P10)

Raw: `raw/12-p10-alert-ledger.txt`, `raw/11-function-logs-p9.json`. Result **16/16**.

**No e-mail was sent and no delivery is claimed.** As in N10.5, the provider outcome was simulated only by the recorded ledger outcome (`n10_record_alert(..., delivered => true/false)`). Every call ran as `account_deletion_worker` over the pooler.

| Check | Result |
|---|---|
| Hosted worker without alert configuration: logged `n10_operator_alert_unconfigured {reason: destination_unconfigured, pending: 3}`, `alerts_sent: 0`; H's ledger stayed `alert_key NULL`, failures 0, `sent_at NULL` (nothing falsely recorded as sent) | PASS |
| First claim `n10_alerts_due(10,30)` returns exactly E, H, I | PASS |
| H: kind `attention`, key **`analytics_attention:analytics_config`**, class `analytics_config`, status = its media status `awaiting_final_sweep` | PASS |
| I (`purge_attention`, with analytics attention **also** set): key stays **`purge_attention:owner_id_path_anomaly`** | PASS |
| E: key stays **`auth_attention:auth_permanent`** | PASS |
| A concurrent second claim during the lease returns nothing | PASS |
| `delivered=false` → failure count 1, next attempt ≈ **+5.00 min**, no key, no `sent_at` | PASS |
| Not claimable before the backoff; claimable after it (time-shifted), as `attention` again | PASS |
| `delivered=true` → key and `sent_at` set, failures reset; three further claims return nothing for H (dedup) | PASS |
| Pending count 3 → 2 (H only; E and I remain pending) | PASS |
| `alert_sent_at` shifted −25 h → exactly **one** `escalation` (same key); after it is recorded: silence | PASS |
| H's deletion and analytics columns (status, `user_id`, media, counters, all `analytics_*`) untouched by the ledger throughout | PASS |

**P10 / goal H: PASS.** Analytics attention integrates with the M4 ledger, and `auth_attention` / `purge_attention` keys are unchanged. Real operator e-mail delivery is still not tested (no Lovable credential in a disposable project), as already recorded in N10.5. That does not affect D14.2.
