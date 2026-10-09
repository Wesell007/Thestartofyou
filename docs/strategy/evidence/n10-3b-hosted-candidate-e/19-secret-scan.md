# 19 — Secret and log audit (§34)

**Result: CLEAN — 0 literal credential hits.** Method: every local credential value was compared literally (never printed) — PAT, `postgres` password, worker password, `N10_DB_URL`, service-role JWT, anon JWT, invocation-only secret, and every synthetic user's password, access token and refresh token — plus credential patterns (`sbp_…`, `sb_secret_…`, JWT shape, DB URL with password, `Bearer …`). Raw: `raw/34-secret-audit.txt`.

| Source (09:25Z → end of run) | Rows | Literal hits | Pattern matches |
|---|---|---|---|
| Edge Function runtime logs (`function_logs`) | 296 | 0 | 0 |
| Edge Function invocation logs (`function_edge_logs`) | 66 | 0 | 0 |
| Postgres logs | 178 | 0 | 0 |
| Supavisor logs | 157 | 0 | 0 |
| PgBouncer logs | 746 | 0 | 0 |
| Storage logs | 1,883 | 0 | 0 |
| API gateway logs (`edge_logs`) | 1,586 | 0 | JWT-shaped: only the **6 Storage signed-URL tokens** the harness itself fetched (decoded kind only; platform access log, not N10 output; all those URLs stopped serving after purge) |
| `net._http_response` (all) | — | 0 | 0; every body exactly `{"ok":true}` |
| `cron.job_run_details`, `cron.job` command | — | 0 | 0 |
| Local raw evidence (63 files at audit time) | — | 0 | one shape match: the guard's own redacted placeholder in the PgBouncer connection string; the evidence copy was restructured so it contains no password field at all |

Repository: every commit of this stage passed the fail-closed pre-commit scan (patterns + literal comparison of all 7 local credential values and, for evidence, the user tokens) with 0 hits; the M3 tests build their fake credential-shaped strings at runtime so no such literal exists in the repository.

Logs were read through the current Management API logs endpoint `GET /v1/projects/{ref}/analytics/endpoints/logs` (the older `logs.all` endpoint now returns 410 with a migration notice); the log table is `logs`, filtered by `source`.
