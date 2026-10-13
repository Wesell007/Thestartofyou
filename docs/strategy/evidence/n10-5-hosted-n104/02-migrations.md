# 02 — Migrations, bucket, secrets, deployment

| Step | Result |
|---|---|
| `db push --dry-run` | exactly 53 pending (47 historical + M1–M6), no 41B.1A, no seeds (`raw/02-db-push-dry-run.txt`) |
| `db push` | 2026-10-13T23:38:32Z–23:38:36Z, exit 0, unmodified; history 53, max `20261011050647` (`raw/02-history.txt`) — this includes M6's `CREATE TRIGGER … AFTER DELETE ON auth.users`, which a `postgres`-run migration **can** create on hosted Supabase |
| Extensions | pg_cron 1.6.4, pg_net 0.20.4, pgmq 1.5.1, supabase_vault 0.3.1 |
| Buckets | `weekly-photos` (migration) + `first-year-memories` (Storage API `POST /storage/v1/bucket`, `public:false`, as in N10.3B); both private |
| `jwt_exp` | 3600 (Management API `config/auth`; only this field extracted — the response contains credential-shaped values and the guard refused to print it) |
| Function secrets | `N10_DB_URL`, `N10_VERIFIED_TOKEN_WINDOW_SECONDS=3600`, `N10_TOKEN_WINDOW_VERIFICATION=management-api:2026-10-14`, `N10_WORKER_INVOKE_SECRET`, `N10_COMPLETED_ROW_RETENTION_DAYS=30`, `N10_OPERATOR_ALERT_EMAIL`, `N10_OPERATOR_ALERT_FROM`, `N10_ENVIRONMENT=rehearsal`, `EMAIL_QUEUE_INVOKE_SECRET` (9; names only). `LOVABLE_API_KEY` **not set** |
| Deploy (sealed `945677ec`, `--use-api`) | `delete-account` v1 `verify_jwt` **true**; `account-deletion-worker` v1 `verify_jwt` **false**; `process-email-queue` v1 `verify_jwt` **false** (`raw/05-*`) |
| Worker login | SCRAM verifier set locally (plaintext never sent); Supavisor `aws-0-eu-west-2.pooler.supabase.com:6543` as `account_deletion_worker.<ref>` → connected |
| N10 cron | Vault `n10_account_deletion_worker_url` + `_invoke_secret` set at 2026-10-13T23:41:24Z → live every minute. E-mail-queue Vault left empty (no Lovable credential) |
