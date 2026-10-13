# 07 — M6 forced cleanup failure with real GoTrue (FAIL)

**Result: PASS — the real Auth deletion rolled back; ZERO media removed.** Raw: `raw/09-m6-fail-inject.txt`, `raw/09-m6-fail-observe.txt`, `raw/09-fail-log-evidence.json`.

**TEST-ONLY failure mechanism:** `n105_rehearsal.block_m6_cleanup()` + `BEFORE DELETE` trigger `n105_block_m6_cleanup` on `public.email_send_log`, raising `N10.5 TEST-ONLY forced e-mail cleanup failure`. Same fixture categories as NORM.

| Evidence | Observed |
|---|---|
| `delete-account` (FAIL's JWT, 23:42:54Z) | **HTTP 202 `{"status":"deletion_in_progress"}`** (never 200) |
| **GoTrue's own log** (`auth_logs`) | `DELETE /admin/users/<uuid>` → **500**, `error: "ERROR: N10.5 TEST-ONLY forced e-mail cleanup failure (SQLSTATE P0001)"` at 23:42:54 |
| State after the failed attempt | Auth row **1**; app row **1**; `email_send_log` **2**; token **1**; suppression **1**; media **2, byte-identical** — identical to before |
| Request | `requested`, `last_error_class = auth_transient`, attempts 1, retry +1 min; `completed_at` NULL |
| Live cron retry (23:44:00) | GoTrue again **500** with the same error; state unchanged; attempts 2, next +2 min (D4 backoff) |
| **Storage logs, 23:42:50–23:46:00** | **0** `ObjectRemoved` events for FAIL's prefix; **0** Storage `DELETE` calls project-wide |
| Completion | impossible (pre-Auth state; purge functions refuse while the Auth row exists) |

The cleanup failure inside GoTrue's transaction rolled back the Auth deletion and every cascade; N10 treated it exactly as an Auth deletion failure.
