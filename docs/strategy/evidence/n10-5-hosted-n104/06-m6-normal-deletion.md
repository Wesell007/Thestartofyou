# 06 — M6 normal deletion with real GoTrue (NORM)

**Result: PASS.** Raw: `raw/08-m6-normal-deletion-NORM.txt`.

Fixture: 1 `hospital_bag_items` row (inserted through the Data API with NORM's JWT; cascades from `auth.users`), 2 `email_send_log` rows (address in two letter cases), 1 unsubscribe token, 1 `suppressed_emails` row, 2 canonical media objects (both buckets, one 4 levels deep).

| | Before | After |
|---|---|---|
| Auth row | 1 | **0** |
| app row (cascade) | 1 | **0** |
| `email_send_log` (case-insensitive) | 2 | **0** |
| `email_unsubscribe_tokens` | 1 | **0** |
| `suppressed_emails` | 1 | **1 (kept)** |
| canonical media | 2 | **0** |

`delete-account` (NORM's JWT, `{confirmed:true}`, 2026-10-13T23:42:30Z) → **HTTP 200 `{"status":"account_deleted","cleanup":"removed"}`**. The real GoTrue admin delete committed with the M6 trigger in the same transaction; media was purged only after the database confirmed the Auth row absent. Request → `awaiting_final_sweep`, `final_sweep_after − auth_deleted_at = 01:15:00`. CTRL unchanged.

(A first run aborted before any deletion on a parameter-type error in the harness's own snapshot query; no request existed when it was re-run.)
