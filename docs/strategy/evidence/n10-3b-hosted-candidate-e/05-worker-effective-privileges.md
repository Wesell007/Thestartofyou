# 05 — Worker effective-privilege gate (§11) and the M3 security patch

**Final result: PASS WITH DOCUMENTED SUPABASE PG_NET PLATFORM RESIDUAL** (after an initial HOLD that produced the M3 security patch).

## 1. Inventory (before M3) — `raw/11-privileges.txt`, `raw/11b-privileges.txt`

Schemas the worker can USE: `private` (explicit), `public`, `net`, `pg_catalog`, `information_schema` (via PUBLIC). Callable functions outside the system catalogs:

| Group | Count | SECURITY DEFINER | Classification |
|---|---|---|---|
| `private` N10 functions | 10 | yes (frozen) | intended surface |
| `public` functions | 10 | **no** (all INVOKER) | 9 trigger-only functions (direct call errors: "trigger functions can only be called as triggers"), 1 immutable text normaliser — **SAFE / NO EFFECT** (definitions read in full) |
| `net` (pg_net) functions | 12 | no | callable via PUBLIC — see below |
| `pg_catalog` SECURITY DEFINER | 0 | — | — |

`pg_terminate_backend`/`pg_cancel_backend`: callable but limited to own backends (proven: "permission denied to terminate process" for another role). No foreign servers; database CREATE denied; no predefined-role membership.

## 2. Finding — HOLD

`net.http_request_queue` and `net._http_response` ACL `=arwdDxtm/supabase_admin` (ALL to PUBLIC) and schema `net` USAGE to PUBLIC. Proven as the real worker login through the pooler (`raw/13-worker-probes.txt`, all mutations rolled back): the worker could queue outbound HTTP (`net.http_get` → enqueued), and SELECT/UPDATE/DELETE queue and response rows. M2 put `Authorization: Bearer <service-role JWT>` into each queued scheduler request, so a holder of `N10_DB_URL` could read or redirect the service-role key. A `postgres`-run migration **cannot** revoke those grants (`REVOKE … FROM PUBLIC` → "no privileges could be revoked"; `raw/11c-empirical.txt`). Returned: **N10.3B HOLD — WORKER EFFECTIVE PRIVILEGE SURFACE TOO BROAD.**

## 3. Owner decision and patch (pushed `0007797c..2dcab66f`)

Service-role scheduler credential **rejected** (not an accepted residual). M3 + worker change: the scheduler carries only an invocation-only secret (`X-N10-Worker-Token`), `account-deletion-worker` `verify_jwt = false` with in-function timing-resistant authentication before anything opens, no caller-selected target (body must be empty or `{}`), responses `{"ok":true}` or generic errors. Commits `6bd5561b` (fix), `c4181b1f` (21 tests), `2dcab66f` (docs; architecture §25).

## 4. Hosted proof after M3

| # | Proof | Result |
|---|---|---|
| A | cron catalogue: one job (jobid 2), command references only `n10_account_deletion_worker_url` + `n10_account_deletion_worker_invoke_secret`; has `X-N10-Worker-Token`, `'{}'::jsonb`; **no** `service_key`, `Authorization`, `apikey` (`raw/M3-03-cron-after.txt`); the M2 job (jobid 1, md5 `2678cebb…`) is gone | PASS |
| B | inside one rolled-back transaction: Vault secrets created, the effective cron command executed (`\gexec`), the queued row inspected as booleans only (`raw/M3-04-queue-credential-proof.txt`): headers exactly `Content-Type, X-N10-Worker-Token`; token = local invoke secret = Vault invoke secret; ≠ service-role JWT, ≠ anon JWT; not `sb_secret_`- or JWT-shaped; no Authorization/apikey; no service-role, anon, DB password, worker password or `N10_DB_URL` anywhere in headers/body/URL; body `{}`; after ROLLBACK 0 queue rows, 0 N10 Vault secrets. The project's `sb_secret_` key cannot be revealed with the scoped PAT, so it was not compared literally; the token is the locally generated value and not `sb_secret_`-shaped | PASS |
| C | worker boundary (deployed, `raw/17-worker-boundary.json`): no token, wrong token, one-character-changed token, user JWT only, anon only, service-role JWT only, service-role JWT as the token header, forged JWT → **401** `{"error":"Unauthorized"}`; GET → 405; correct token (empty or `{}`) → **200** `{"ok":true}`; user JWT + correct token → 200 (the token decides) | PASS (12/12) |
| D | correct token + `user_id` / `request_id` / email+bucket+path+status / old M2 body `{"source":"pg_cron"}` / array / invalid JSON → **400** `{"error":"Bad request"}`; no request row was created by any call | PASS (6/6) |
| E | §13 worker probes re-run after M3 (`raw/M3-05-worker-probes-after.txt`): **identical** to the pre-M3 run; all 24 denials hold | PASS |
| F | pg_net residual still present (queue/response access, enqueue) — the documented platform condition | as expected |

Residual acceptance conditions (architecture §25): (1)–(3) by B; (4) by D + the 21 local tests + zero rows created; (5) by E; (6) Data API exposes only `public, graphql_public` (`raw/M3-06-postgrest-config.json`; `net`, `private` not exposed). All six hold → **PLATFORM RESIDUAL — NO PRIVILEGE ESCALATION THROUGH N10 SCHEDULER CREDENTIAL.**
