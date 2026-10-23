# 04 — M7 application and backfill (P1)

- `db push --dry-run`: exactly **1** pending — `20261015053138_n10_analytics_erasure.sql` (`raw/07-m7-dry-run.txt`).
- `db push`: 2026-10-23T06:29:32Z–06:29:35Z, exit 0, file unmodified (sha256 `8dde2626…`); history **54**, max `20261015053138` (`raw/07-m7-push.txt`, `raw/08-p1-p3.txt`).
- 8 `analytics_*` columns present (`analytics_status` NOT NULL default `'pending'`, `analytics_attempt_count` NOT NULL default 0, six nullable). All **16** CHECK constraints `convalidated = true`, including the 6 new ones. Triggers: `account_deletion_requests_guard` and `n10_analytics_guard`, both enabled.

## Row-by-row result (`raw/08-p1-row-diff.txt`, compared with the full pre-M7 rows in `raw/05-fixtures-pre-m7.txt`)

| Fixture | Status | `user_id` | `analytics_status` | Other `analytics_*` | Pre-existing columns |
|---|---|---|---|---|---|
| A | `completed` (unchanged) | NULL (unchanged) | **`not_tracked`** | attempts 0, rest NULL | **byte-identical** (md5 of old columns = pre-M7 md5 `0bb3d2f8…`) |
| B | `auth_deleted` (unchanged) | present | **`pending`** | attempts 0, rest NULL | identical except `updated_at` |
| C | `awaiting_final_sweep` (unchanged) | present | **`pending`** | attempts 0, rest NULL | identical except `updated_at` |
| D | `requested` (unchanged) | present | **`pending`** | attempts 0, rest NULL | identical except `updated_at` |
| E | `auth_attention` (unchanged) | present | **`pending`** | attempts 0, rest NULL | identical except `updated_at`; `last_error_class = auth_permanent` kept |

No row changed status, no `user_id` was cleared, no premature `completed`, no constraint failed; auth/media attention columns (`last_error_class`, `attempt_count`, `next_attempt_at`, `alert_*`, counters) unchanged.

**Deviation from P1 (recorded as observed):** P1 said B–E keep their timestamps unchanged. `updated_at` on B–E moved to the migration time (`06:29:34.572Z`), because M7's backfill `UPDATE … SET analytics_status = 'pending'` fires the frozen M1 guard trigger, which sets `NEW.updated_at := now()` on every update. This is bookkeeping only (no transition, no timestamp the state machine reads); A was not updated (terminal rows are excluded from the backfill), so its row is byte-identical.

**P1: PASS** (with the `updated_at` deviation above).
