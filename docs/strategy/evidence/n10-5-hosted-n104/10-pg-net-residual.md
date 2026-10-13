# 10 — pg_net

**Platform residual (accepted, unchanged): PRESENT.** As the real `account_deletion_worker` login through the pooler, `net.http_request_queue` is readable and `net.http_get` can enqueue (rolled back). The hosted pg_net docs now state that `net` grants USAGE to PUBLIC.

**Privileged credential transit through pg_net: NONE (separately proven).**

- N10 cron and e-mail cron queued requests carry only their invocation-only token, `Content-Type` and `{}` — no service-role JWT, `sb_secret_`, anon JWT, DB password, worker password, `N10_DB_URL` or credential shape (04).
- No Lovable provider key exists in the project.
- `net._http_response` at the end: 11 responses, all **HTTP 200** with body exactly `{"ok":true}`; queue empty; 0 literal credential hits and 0 credential patterns (13-secret-audit).
- The invocation secrets have no Supabase API authority (401 "Invalid API key" on the Data API).

Classification: **PLATFORM RESIDUAL — NO PRIVILEGE ESCALATION THROUGH THE N10 OR E-MAIL SCHEDULER CREDENTIALS.** The pre-M5 service-role-over-pg_net pattern is replaced.
