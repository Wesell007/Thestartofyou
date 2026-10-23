# 03 — Pre-M7 baseline, fixtures and predictions

Predictions: `00-predictions-before-execution.md` (commit `7c10c065`, before any hosted action).

## Baseline = M1–M6 only

- `db push --dry-run`: exactly **53** pending (47 historical + M1–M6), no M7, no 41B.1A, no seeds (`raw/02-db-push-dry-run.txt`).
- `db push`: 2026-10-23T06:25:52Z–06:25:57Z, exit 0; history **53**, max `20261011050647` (`raw/02-db-push.txt`, `raw/02-history.txt`).
- Extensions: pg_cron 1.6.4, pg_net 0.20.4, pgmq 1.5.1, supabase_vault 0.3.1. Buckets: `weekly-photos` (migration) + `first-year-memories` (Storage API, `public:false`).
- Pre-M7 worker surface: **13** functions (M1 10 + M4 3); no `analytics_*` column.
- `account_deletion_worker`: LOGIN, not BYPASSRLS, not superuser, NOINHERIT; password set as a **locally computed SCRAM-SHA-256 verifier** (plaintext never sent; `raw/02-worker-role.txt`). `jwt_exp = 3600` (Management API, that field only).
- Vault: **0 secrets**, so the M2 cron job is a no-op for the whole rehearsal; every worker run below was explicit.

## Fixtures (synthetic `@example.invalid` users, 1×1 PNG media uploaded through each user's own session / RLS)

All driven by the **real sealed module** (`supabase/functions/_shared/accountDeletion.ts` at `4b561385`) against the hosted database as `account_deletion_worker` over the transaction pooler, with real GoTrue admin deletion and real Storage API removal (`raw/05-fixtures-pre-m7.txt`, 06:28:44Z–06:28:50Z).

| Fixture | Request | How | Pre-M7 state |
|---|---|---|---|
| **A** completed | `5c804027` | `runDeleteAccount` → 200 `removed` / `awaiting_final_sweep`; documented time-shift of its timestamps by −2 h; real `runWorker` tick | `completed`, `user_id` NULL, media 0 |
| **B** auth deleted, media underway | `0146f2c7` | `n10_open_request` → `deleteAuthAndConfirm` (real GoTrue) → `n10_confirm_auth_deleted` → `purgeAndRecord` with an already-expired budget (real code path `budget`) | `auth_deleted`, Auth absent, **3 media objects present** |
| **C** awaiting final sweep | `74af678e` | `runDeleteAccount` → 200 `removed` | `awaiting_final_sweep`, window not reached |
| **D** requested | `b5d15b8a` | `n10_open_request` then `n10_release_lease` | `requested`, Auth user present, 2 media |
| **E** auth attention | `29602413` | `runDeleteAccount` with the Auth adapter **injected** to return HTTP 400 (GoTrue not called); the database confirmed the user still exists and applied the transition | `auth_attention` / `auth_permanent`, Auth user + 2 media present |

Time-shift method (used only on synthetic rows, as in the local harness `src/test/support/n10Pglite.ts`): one transaction as the table owner: `ALTER TABLE … DISABLE TRIGGER USER` → one `UPDATE` of timestamp columns → `ENABLE TRIGGER USER`. Every shift is logged as `[time-shift]` in the raw logs.

Full pre-M7 snapshot (row md5, users, media, cron, Vault): `raw/06-pre-m7-snapshot.txt`. Pre-M7 advisors: see 14.
