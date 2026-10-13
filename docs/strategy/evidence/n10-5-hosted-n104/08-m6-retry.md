# 08 — Retry after removing the failure (FAIL)

**Result: PASS — hosted atomicity proof closed.** Raw: `raw/09-m6-fail-release.txt`, `raw/09-m6-fail-verify.txt`, `raw/09-fail-log-evidence.json`.

Only the test trigger and function were dropped (23:44:24Z; 0 remaining). The next **live cron** retry ran at 23:46:00:

| Evidence | Observed |
|---|---|
| GoTrue log | `DELETE /admin/users/<uuid>` → **200** at 23:46:00 |
| Auth row / app row | **0 / 0** (cascade committed) |
| `email_send_log` / token | **0 / 0** (deleted atomically) |
| `suppressed_emails` | **1 (kept)** |
| Media | **0** — Storage logs 23:46:00–23:47:30: exactly **2** `ObjectRemoved` events for FAIL's prefix, 2 DELETE calls (the purge ran only now) |
| Request | `awaiting_final_sweep`, `auth_deleted_at` 23:46:01, window 01:15:00 |
