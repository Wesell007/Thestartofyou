# 02 — Migrations, bucket, secrets and deployment

## Sealed deployment copies

| Copy | Commit | Used for |
|---|---|---|
| `.n103b/src-0007797c` | `0007797c` (N10.3A) | the original 49 migrations (M1, M2) and the CLI bucket-seed attempts |
| `.n103b/src-2dcab66f` | `2dcab66f` (N10.3A + M3 security patch, pushed) | M3, function deploys, all later CLI work |

Both: `git clone` with `core.autocrlf=false`, detached, clean, no stored `project-ref`; every migration byte-equal to the committed blob. `supabase/config.toml` still contains the production-looking `project_id`; it was never used as authority — every command named the target explicitly. The CLI wrote `supabase/.temp/linked-project.json` during the seed attempt; it names only `toqeefrwnsjuhjmobodg` (gitignored) and the guard refuses any other ref there.

## Migrations

| Step | Result |
|---|---|
| `migration list` (before) | 49 local, 0 remote (`raw/02-migration-list-before.txt`) |
| `db push --dry-run` | exactly the 49 ordinary migrations; no `41b1a_*`; no seeds (`raw/02-db-push-dry-run.txt`) |
| `db push` | 07:26:37Z–07:26:43Z, exit 0, unmodified (`raw/02-db-push.txt`); history 49 rows incl. M1 `20261009055319` and M2 `20261009055322` |
| §11 HOLD → M3 security patch (05) | M3 `20261009091430_n10_worker_invocation_hardening.sql`, sha256 `c2f34cb3f1120b4c47bafee2ad93d0095b4328c5642b96ddfa4527d2671d7324`; M1/M2 unchanged |
| M3 dry-run | **only M3 pending** (`raw/M3-01-db-push-dry-run.txt`) |
| M3 `db push` | 09:31:31Z, exit 0 (`raw/M3-02-db-push.txt`); history **50** rows, max `20261009091430` |

41B.1A was not applied: its only table `public.pregnancy_episodes` is absent; no `41b1a` file was pushed.

## Bucket `first-year-memories` (deviation — CLOSED by owner)

- `supabase seed buckets --project-ref <ref>` alone: CLI flag error (`--project-ref` needs `--linked`).
- `supabase seed buckets --linked --project-ref <ref>`: `StorageAuthTokenError` with all three project-scoped PATs. Diagnosis (read-only): the CLI calls `GET /v1/projects/{ref}/api-keys?reveal=true`, which returns 403 for a project-scoped PAT that cannot reveal secret keys — the identical message. Storage and Storage Config reads themselves succeeded. **Not a Storage permission problem.**
- **CLI seed path: NOT USED** (requires secret-key reveal). **Supported Storage API path: USED SUCCESSFULLY**: `POST /storage/v1/bucket {"id":"first-year-memories","name":"first-year-memories","public":false}` → 200, matching the committed `[storage.buckets.first-year-memories] public = false` (no size or MIME limits, as configured).
- Result: `weekly-photos` (created by a historical migration) and `first-year-memories` both exist and are private; no other bucket (`raw/09-*`). No SQL touched `storage.buckets`.
- The legacy `anon` and `service_role` JWTs came from the non-reveal key listing; their claims were checked (role + `ref = toqeefrwnsjuhjmobodg`) and they were stored only in `.n103b`, never printed.

## Function secrets (§15)

Set with `supabase secrets set --project-ref <ref> --env-file <protected file>` (`raw/15-secrets-list.txt`, names and digests only): `N10_DB_URL`, `N10_VERIFIED_TOKEN_WINDOW_SECONDS = 3600`, `N10_TOKEN_WINDOW_VERIFICATION = management-api:2026-10-09`, `N10_WORKER_INVOKE_SECRET` (43-char base64url, 32 CSPRNG bytes), `N10_COMPLETED_ROW_RETENTION_DAYS = 30` (functional rehearsal value; D14-proposed, not approved). No built-in secret was overwritten; nothing production-related was set.

## Deployment (§16)

From the sealed `2dcab66f` copy with `functions deploy <name> --project-ref <ref> --use-api` (server-side bundling of the pinned `npm:` imports succeeded; `raw/16-*`):

| Function | Version | Status | `verify_jwt` | ezbr_sha256 |
|---|---|---|---|---|
| `delete-account` | 1 | ACTIVE | **true** | `6c37ab4e…0090b19` |
| `account-deletion-worker` | 1 | ACTIVE | **false** (M3 design; authenticates the invocation-only secret in-function) | `4cbea54d…2b645e4` |

No other function was deployed.
