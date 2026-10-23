# Gate 1: permanent TSOY staging environment

**Result: GATE 1 = PASS.** `tsoy-staging` is the permanent non-production environment. It is **ACTIVE**, and production does not exist.

| Item | Value |
|---|---|
| Project | `tsoy-staging`, ref **`aeeprivmakalcbnefwwm`**, WesellProducts (`xzickmpbmsjgkowcqpbg`), **eu-west-2** |
| PostgreSQL | **17.11.0.003** (engine 17, GA channel) |
| Created | claude.ai Supabase connector `create_project`, 23 October 2026 ≈07:31Z (API `created_at` 03:39:41Z; the instance predates the call, as also seen in D14.2). Status `ACTIVE_HEALTHY` (`raw/01-identity.txt`) |
| Baseline | 54 migrations, final `20261015053138_n10_analytics_erasure.sql` (M7); 41B.1A **not** applied; 41B.1B does not exist |
| Production | does not exist; the historical `wogepxfipdipogyogced` was not contacted |
| Lovable | intentionally unpublished; not connected to staging |

## 1. Supabase guidance checked (23 October 2026; material items only)

- **Changelog since 1 October:** scoped personal access tokens are GA (6 Oct); TLS 1.2 legacy cipher removal on 10 Nov; the status page moved. Nothing affects project creation, migrations, pooler, Edge Function secrets, Auth or RLS behaviour.
- **Database password:** the docs reset the `postgres` password only through **Dashboard → Database Settings**, which also updates the managed services. SQL `ALTER ... PASSWORD` is documented for custom roles only. The owner therefore reset it in the Dashboard and saved it outside Git (11 bytes, checked by size only). No token was created.
- **`db push` and history:** the docs confirm that `db push` (and `--dry-run`) compare `supabase/migrations` with `supabase_migrations.schema_migrations`. The session pooler is the recommended IPv4 connection.
- **`config.toml` `project_id`:** documented as *"a string used to distinguish different Supabase projects on the same host"*, i.e. a local-stack identifier. The remote project is selected with `supabase link` / `--project-ref` (CLI 2.120.0 help) or `--db-url`.
- **API keys:** the project has the modern `sb_publishable_…` key plus the legacy anon JWT. The local `.env` uses the publishable key.

## 2. Target guard

- **Committed:** `scripts/backend-environments.ts` (public refs only) and `scripts/staging-target-guard.ts`.
- **Rules:**
  - allow exactly `aeeprivmakalcbnefwwm`;
  - deny the historical ref and all seven retired rehearsal refs, including upper-case variants;
  - reject any other 20-letter ref-shaped token;
  - kept separate from any future production guard.
- **Tests:** `src/test/stagingTargetGuard.test.ts` passed in the full suite before the first remote write. The harness self-test was 5/5 (`raw/02-guard-selftest.txt`).
- **Out-of-Git harness:** the operational runner (`raw/harness/run.mts`, `lib.mjs`) imports the committed guard. It refuses the CLI verbs `link`, `reset` and `delete`, and redacts output. The password file stays in `C:\Users\Administrator\.tsoy-staging\`.

## 3. Pre-migration audit (`raw/03-pre-migration-audit.txt`)

54 files at `5d496635`. Comment lines were excluded from the counts.

| Check | Result |
|---|---|
| Hard-coded project refs / http(s) URLs / JWT or secret literals / e-mail-provider calls | **0 / 0 / 0 / 0**. The `service_role_key` matches are only the Vault secret *name* `email_queue_service_role_key` |
| `cron.schedule` | 3: M2 (N10 worker, Vault-gated), M3 (replaces it with the invocation-token job, Vault-gated), M5 (e-mail queue, Vault-gated). All are no-ops while Vault is empty |
| `net.http_post` | 4: e-mail dispatch (raises if Vault is empty), M2, M3, M5. **None runs at migration time** |
| Vault references | 10, all reads of `vault.decrypted_secrets` |
| Storage bucket SQL | 1 (`weekly-photos`, historical migration) |
| Triggers on `auth.users` | M6 `n10_forget_email_records` |
| SECURITY DEFINER | 44 occurrences (verified after migration, §5) |
| M1–M7 | present with the accepted hashes `bc73c427` / `99c42be0` / `c2f34cb3` / `63348e3a` / `b6899e9a` / `9f9acf6f` / `8dde2626` |
| 41B.1A | **not** in the push set (only in `docs/strategy/migrations-pending/`) |
| 41B.1B | no file exists |

No migration contacts the historical backend, sends e-mail or contains a privileged credential. **No HOLD condition.**

## 4. Dry run and application

- **Staging:** committed blobs were exported with `git -c core.autocrlf=false archive HEAD`: 0 CR bytes, and every staged file byte-equal to HEAD.
- **Dry run:** `db push --dry-run`: exactly the 54 audited files, no seeds (`raw/04-db-push-dry-run.txt`).
- **Push:** `db push`: **2026-10-23T08:07:45Z–08:07:49Z, exit 0**, one attempt (`raw/05-db-push.txt`). No migration was patched.

## 5. Hosted baseline after migration (`raw/06-baseline.txt`, `raw/07-data-api-exposure.txt`)

| Area | Result |
|---|---|
| History | **54**, `20260420164527` … `20261015053138` |
| Tables | public 33, private 1 (plus platform schemas) |
| RLS | **every** public/private table has RLS on (34/34); 114 public policies; `private.account_deletion_requests` has none, by design |
| SECURITY DEFINER | 29 in public/private, all owned by `postgres`, **all with a fixed `search_path`**; none in `public` executable by anon |
| `private` EXECUTE | anon 0, service_role 0, authenticated 1 (`account_media_access_allowed`, RLS helper); `account_deletion_worker` exactly **15** |
| Worker role | LOGIN, no BYPASSRLS, not superuser, NOINHERIT, no table SELECT. **No password set on staging**, so it cannot log in until a later N10 phase sets one |
| `auth.users` triggers | `n10_forget_email_records` (M6), enabled |
| Storage buckets | `weekly-photos` (private). `first-year-memories` is **not created yet** (see residuals) |
| Cron | `n10-account-deletion-worker` (every minute) and `process-email-queue` (5 s), both gated on Vault, with no credential in the command. Runs so far all succeeded as no-ops |
| Vault | **0** secret names |
| pg_net | 0.20.4; **0 requests ever queued, 0 responses**: no outbound call happened |
| Data API | `Accept-Profile: private` → **406 PGRST106** (table and RPC); anon `profiles` read → `[]` (RLS) |
| Data | 0 Auth users, 0 objects, 0 N10 requests: no real or synthetic data was needed |
| Extensions | pg_cron 1.6.4, pg_net 0.20.4, pgmq 1.5.1, supabase_vault 0.3.1, pgcrypto, uuid-ossp, pg_stat_statements |

**Advisors** (`raw/08-advisors-summary.txt`):
- Security: INFO `rls_enabled_no_policy` ×3 only (the same tables as the D14.2 baseline); no WARN or ERROR.
- Performance: WARN `auth_rls_initplan` 114 and INFO `unindexed_foreign_keys` 7, identical to the D14.2 baseline of the same 54 migrations; INFO `unused_index` 32 (13 in D14.2), expected on a fresh database with no query history.
- **No new critical or high finding.**

## 6. N10 on staging

**N10 ENGINEERING PRESENT ON STAGING / PRODUCTION NOT ACTIVATED.**

- No Edge Functions deployed and no function secrets set.
- No PostHog key; no operator-alert address; no Vault values; the worker has no password.
- D14 **OPEN**; D **OPEN**, to be resolved for the future production environment.

## 7. Environment configuration change

- **Removed** `scripts/public-backend-defaults.ts`. It existed because Lovable deployment builds ran without `.env`, so production builds took committed values for the historical backend (commit `befa00cb`, 3 Aug 2026). The 3 October change `b487c7aa` had already stopped dev sessions inheriting them. Its consumers were `vite.config.ts` and `src/test/publicBackendEnv.test.ts`; the IVF readiness test read it as text.
- **New explicit model** (`scripts/public-backend-env.ts`, `scripts/backend-environments.ts`): `VITE_TSOY_ENVIRONMENT` ∈ local | staging | production | ci.
  - A production build (`vite build`) requires `production` with the registered production project. None exists, so **every real production build fails closed**. `ci` is allowed only with non-registered placeholder values.
  - **Staging can never be a production backend.**
  - `vite build --mode staging` requires `staging` and the staging project.
  - Historical and retired refs are refused in every mode.
  - Dev/test sessions without configuration use the inert placeholder.
- **Proven by negative builds** (`raw/10-build-fail-closed.txt`): no config, production identity, staging values in a production build, staging values labelled `ci`, and the historical backend are all refused (exit 1). The CI-style build passes.
- **Other files:**
  - `.env.example` has generic placeholders;
  - CI sets `VITE_TSOY_ENVIRONMENT: ci`;
  - the local `.env` (gitignored, not committed) selects staging with the publishable key.
- **`supabase/config.toml`:** `project_id` changed from the historical ref to the neutral local identifier `thestartofyou`, matching the documented semantics. Remote targets are always explicit.

## 8. Tests and build

- **Full Vitest suite** (CI environment values): **1917 / 1919**. The 2 failures are the known Windows-only pre-existing cases (`companionEntryRemainder` backslash path, `canonicalBreadcrumbs` CRLF hash). That includes:
  - `publicBackendEnv` (rewritten);
  - `stagingTargetGuard` (new);
  - N10 and D14 pack;
  - AD-1 / 41B.1A frozen hashes;
  - `phase34h2` (updated to the new files).
- **Typecheck:** PASS. **Lint** (`--max-warnings=0`): PASS. **CI-style build:** PASS. `public/sitemap.xml` restored after the build.

## 9. Residuals (not blocking Gate 1)

1. **`first-year-memories` bucket** not created. By design it comes from `config.toml` through the Storage API (no Storage SQL), which needs the secret key or a Dashboard action. Create it before First Year media work.
2. **Access-token lifetime (`jwt_exp`)**: not readable through the connector. The owner chose to read it in the Dashboard; the value is still to be recorded.
3. **Auth on staging:** sign-up is enabled with e-mail confirmation through the default Supabase sender. Before inviting testers, consider disabling public sign-up or configuring a staging SMTP. Auth config was not changed in Gate 1.
4. **Lovable:** builds without explicit environment values now fail closed, which is intended while the site is unpublished. Hosting configuration is decided before Gate 10.
5. **N10 runtime** (functions, secrets, worker password, Vault): a later, separately authorised staging phase.

## 10. Secret scan

Before commit, run over:
- tracked files;
- the staged diff;
- this evidence directory and its raw logs and harness;
- a literal comparison with the staging DB password.

Counts are recorded in the commit report. No credential value is in Git. The publishable key is public by design and lives only in the gitignored `.env`.
