# 14 — OWNER_ID_PATH_ANOMALY — N (§28)

**Result: PASS — anomaly REPRODUCED through supported Storage APIs.** No SQL touched `storage.*`. Raw: `raw/28a-anomaly-fixture-N.txt`, `raw/28b-anomaly-delete-N.txt`, `raw/28c-function-logs-N.json`.

| Fixture step | Observed |
|---|---|
| N's JWT: move own object to `misfiled/…` | **refused** (RLS: destination not in own folder) |
| Service-role `POST /storage/v1/object/move` canonical → `weekly-photos/misfiled/n103b-moved-<8>.jpg` | 200; **`owner_id` preserved = N** at a non-canonical path |
| Service-role `POST /storage/v1/object/copy` canonical → `misfiled/n103b-copied-<8>.jpg` | 200; new object with `owner_id` NULL (not N's anomaly) |

| N deletion (`delete-account`, 10:11:43Z) | Observed |
|---|---|
| Response | **200** `{"status":"account_deleted","cleanup":"continuing"}` |
| State | **`purge_attention`**, `anomaly_count = 1`, `last_error_class = owner_id_path_anomaly`, next attempt +60 min |
| Canonical media (rule A) | removed (3) |
| Anomaly object | **not auto-deleted** — still present with `owner_id = N` |
| Alert hook | function log `{"event":"n10_operator_notification_required","kind":"purge_attention","request_id":"<opaque>"}` — opaque id only, no user id or path |
| Completion | blocked (`completed_at`/`anonymised_at` NULL; strict predicate requires `anomaly_count = 0`) |

Operator handling of the anomaly (review and supported-API removal) is the D5 path; the alert destination is still NOT CONFIGURED (production activation blocker). The anomaly object remains on the rehearsal project for owner review.
