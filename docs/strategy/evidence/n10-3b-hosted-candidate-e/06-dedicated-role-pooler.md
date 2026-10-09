# 06 — Dedicated role credential and pooler connectivity (§12, §13)

**Result: PASS.**

## Credential (§12)

- A 40-character password was generated locally (`secrets` CSPRNG) and saved only in `.n103b`.
- It was set through psql as a **locally computed SCRAM-SHA-256 verifier** (`ALTER ROLE account_deletion_worker PASSWORD 'SCRAM-SHA-256$4096:…'`), so the plaintext never reached the server or its logs. Role attributes unchanged afterwards.
- `N10_DB_URL` saved locally only; set as a function secret (02).

## Pooler format

`GET /v1/projects/{ref}/config/database/pooler` needs `database_pooling_config_read`, which the PAT did not have; the PgBouncer endpoint shows only the dedicated PgBouncer (`db.<ref>:6543`, user `postgres`, transaction mode; `raw/12-pgbouncer-config.json`, password omitted). The Supavisor format was therefore proven empirically with a real login: `account_deletion_worker.toqeefrwnsjuhjmobodg` @ `aws-0-eu-west-2.pooler.supabase.com:6543` (transaction pooler port) → connected, `current_user = account_deletion_worker`, server 17.11. The deployed functions then used exactly this URL from the Edge runtime (worker 200 responses require the database claim to run).

## Probes as the real worker over the pooler (§13) — `raw/13-worker-probes.txt`, re-run after M3 `raw/M3-05-worker-probes-after.txt` (identical)

| Probe | Result |
|---|---|
| SELECT / UPDATE / DELETE `auth.users` | denied (`permission denied for schema auth`) |
| SELECT / INSERT / UPDATE / DELETE `storage.objects`; SELECT `storage.buckets` | denied (`permission denied for schema storage`) |
| SELECT / INSERT `private.account_deletion_requests` | denied |
| SELECT / INSERT `public.profiles`; SELECT `public.journeys` | denied |
| `vault.decrypted_secrets`, `vault.create_secret` | denied |
| `cron.schedule`, `cron.job`, `cron.job_run_details` | denied (`permission denied for schema cron`) |
| `n10_lock_leased`, `n10_retry_delay`, `account_media_access_allowed` (not granted) | denied |
| trigger function called directly | error |
| terminate another role's backend | denied |
| `auth_user_exists`, `account_media_canonical`, `account_media_anomaly_count`, `n10_claim_due` | work |
| open / claim / release a real request | work (P2, S1, D1–D3 in 08, 09, 12) |
| pg_net queue/response, `net.http_get` | **possible** — platform residual (05) |

The worker could not read its own request table even for a lookup (a harness step in 12 that tried to was refused), confirming the function-only surface.
