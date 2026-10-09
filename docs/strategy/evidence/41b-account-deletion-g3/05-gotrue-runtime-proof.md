# G3 — 05 GoTrue hard-delete statement shape (runtime)

**Method:** `extensions.pg_stat_statements` (already installed on the project; nothing was enabled or installed). Per deletion, the harness read every statement executed by role `supabase_auth_admin` (the GoTrue database role) before and after the single `DELETE /auth/v1/admin/users/{id}` call, and recorded the per-statement `calls` delta in each case file. `postgres` is a member of `pg_read_all_stats`, and 0 statement texts were hidden (`05b`). Settings: `pg_stat_statements.track = top`, so statements GoTrue issues are recorded, while RI-internal nested SQL is not.

**Table resolution:** `supabase_auth_admin` runs with `search_path=auth`, and `auth.users` is the only relation named `users` in the database (`05a`). GoTrue's unqualified `"users"` is therefore `auth.users`.

| Case | HTTP | GoTrue statements during the call (calls delta) | Hard-delete statement | GoTrue DML on `public` |
|---|---|---|---|---|
| Positive A | 200 | 3 `SELECT` (user, identities, MFA factors), `begin`, `DELETE FROM "users" AS users WHERE users.id = $1` ×1, `commit` | exactly 1 | none |
| Positive B | 200 | same shape | exactly 1 | none |
| Sensitivity S1 | 500 | 3 `SELECT`, `begin`, `rollback`; no completed DELETE (a failed statement is not counted) | 0 completed (failed, rolled back) | none |
| Sensitivity S2 | 200 | same shape as A | exactly 1 | none |

**Conclusion: CONFIRMED at runtime.** The hard admin deletion issues one `DELETE` statement against `auth.users`, inside one GoTrue transaction, and GoTrue issues no statement against any `public` table. Every public-table effect comes from PostgreSQL's FK actions inside that one statement. This matches the upstream-source finding in G1 §5, with one difference in detail: hosted GoTrue writes the table name unqualified, without the `"auth".` prefix. No audit-log `INSERT` appeared in the transaction, so the audit log is not written to the database on this project. That has no bearing on the gate.

**Matcher correction, disclosed:** the harness first counted only the schema-qualified text `DELETE FROM "auth"."users"`, so the Positive A summary initially showed 0. The stored statement delta was unchanged. The count was recomputed from it with the corrected matcher (`("auth".)?"users"`), giving 1. The correction is recorded inside `07-positive-A.json` (`matcher_correction`, `auth_users_delete_calls_delta_initial_matcher`). Every later case used the corrected matcher.
