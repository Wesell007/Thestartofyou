# 10 — Normal end-to-end delete — A (§24) and stale app-write spot check (§32)

**Result: PASS.** Raw: `raw/24-end-to-end-A.txt`; earlier refused attempts `raw/24a-end-to-end-A-unconfirmed-attempt.txt`.

## Harness note (no product defect)

The first two `delete-account` calls from the harness sent `{}` instead of the app's `{ confirmed: true }` (`src/pages/AccountSettings.tsx`). The deployed function correctly answered **400 "Deletion must be explicitly confirmed."** and created **no request** (A's Auth user, 4 objects and app rows were verified untouched afterwards). The first attempt also appeared as a client read timeout because the harness then polled the still-valid pre-issued paths for 600 s. The harness was fixed to send exactly the app's body.

## Run (10:01:09Z)

| Check | Observed |
|---|---|
| Fixture | 4 objects (both buckets, one 6-level path), app rows `profiles` + `hospital_bag_items` (inserted through the Data API with A's JWT), one pre-issued 3,600 s signed URL, one CDN-seeded download |
| `delete-account` (A's JWT, `verify_jwt = true`) | **HTTP 200** in 2.5 s, body exactly `{"status":"account_deleted","cleanup":"removed"}` |
| Order | freeze committed (request row) → Auth hard delete → database confirms Auth row absent (`n10_confirm_auth_deleted` raises if present) → purge (`n10_record_purge` raises if the Auth user exists) |
| Auth user | absent |
| Account graph | `profiles`, `hospital_bag_items` for A: 0, 0 (cascade) |
| Canonical media | 0 (`objects_removed = 4`) |
| Durable state | `awaiting_final_sweep`; `completed_at`, `anonymised_at` NULL — **not** falsely completed |
| H1 | `final_sweep_after - auth_deleted_at = 01:15:00`; `next_attempt_at = final_sweep_after` (11:16:10.998Z) |
| U1 (15) | both pre-issued paths stopped serving ≤ 3 s after the call started |
| Control C | media, Auth, app rows unchanged |

## §32 — stale JWT against public application tables

| Attempt with A's deleted-user JWT | Result |
|---|---|
| `POST /rest/v1/hospital_bag_items` with `user_id = A` | **409** `23503` "Key is not present in table users" |
| `POST /rest/v1/profiles` with `user_id = A` | **409** `23503` |
| `GET /rest/v1/hospital_bag_items?user_id=eq.A` | 200 `[]` |
| A's rows after the attempts | 0, 0 — nothing resurrected |

G3 remains authoritative for referential integrity; this is a spot check only.
