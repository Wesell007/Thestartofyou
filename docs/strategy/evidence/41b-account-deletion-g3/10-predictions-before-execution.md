# G3 — 10 Predictions written before execution

Written 2026-10-09 (UTC), before any G3 deletion was attempted. This file is committed locally before Positive A runs, so the commit timestamp shows the predictions precede the results. It follows 41B.0-R §30.3 and the G1 plan §6–11, with the owner-approved G3 clarifications: fresh users for S1 and S2; Positive B recreates only the 13 dependant account FKs; `pregnancy_episodes_user_id_fkey` may be recreated with its identical definition only for the sensitivity ordering.

Project `czhopceorfqxdbfvlnap` (`tsoy-ad1-g3-rehearsal`). Deletion path for every case: `DELETE /auth/v1/admin/users/{id}` with the service-role key and body `{"should_soft_delete": false}`, as `auth.admin.deleteUser(userId)` sends it. One attempt per user.

## Model being tested (§30.3)

Account deletion is one `DELETE FROM "auth"."users" … WHERE users.id = $1`.

- **Cycle 1:** the account cascades fire in trigger-name order.
- **Cycle 2:** the RESTRICT checks queued by the cascade delete of `pregnancy_episodes` fire.

A row blocks the delete only if it still exists in cycle 2, which can happen only when the row is removed by a second-hop cascade that sorts after the Episode cascade.

## Predictions

| Case | Setup | Order to be asserted before deleting | Prediction |
|---|---|---|---|
| Positive A | frozen 41B.1A as applied; user A full graph | natural (observed, not assumed; at G3 setup `RI_ConstraintTrigger_a_18797` for `pregnancy_episodes` sorted last of 38) | HTTP 200; A absent from `auth.users`; 0 rows owned by A in every table with `user_id`; 0 orphans; control user C fingerprint unchanged; `pg_stat_statements` +1 for `DELETE FROM "auth"."users" AS users WHERE users.id = $1` from `supabase_auth_admin`; no GoTrue-issued DML on `public` |
| Positive B | the 13 dependant tables' `user_id → auth.users` FKs dropped and re-added with byte-identical definitions (NOT VALID kept for `reflections`, `week_photos`); the 13 Episode ownership FKs untouched; user B full graph | `pregnancy_episodes` cascade trigger sorts **before all 13** dependant account cascades | **same as Positive A** |
| Sensitivity S1 | scratch `g3_scratch.y_parent` (direct `auth.users` CASCADE) and `g3_scratch.x_dependant` (RESTRICT to `pregnancy_episodes(id, user_id)`, CASCADE from `y_parent`, **no** `auth.users` FK), created after 41B.1A; fresh user S1 full graph plus one y row and one x row bound to S1's given-birth episode | `pregnancy_episodes` cascade trigger sorts **before** `y_parent`'s | **FAIL.** GoTrue returns an error (expected HTTP 500 "Database error deleting user"). The underlying PostgreSQL error is SQLSTATE **23503** on the x → `pregnancy_episodes` FK. Atomic rollback: S1 still in `auth.users`; every S1 row (13 relationship classes, babies, First Year, x, y) still present; control unchanged |
| Sensitivity S2 | `pregnancy_episodes_user_id_fkey` dropped and re-added with its identical definition, so its trigger sorts after `y_parent`'s; same scratch tables; fresh user S2 with the same graph shape plus y and x rows | `y_parent` cascade trigger sorts **before** `pregnancy_episodes`' | **SUCCEED.** HTTP 200; S2 absent; 0 S2 rows anywhere, including x and y; 0 orphans; control unchanged |

Rule: if S1 does not fail with 23503 exactly as predicted, or S2 does not succeed, G3 is INVALID and the gate stays OPEN. If Positive A or B fails, G3 stops with no workaround.
