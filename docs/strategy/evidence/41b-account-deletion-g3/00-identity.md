# G3 — 00 Identity and safety boundary

Pre-41B.1B account-deletion gate, stage G3 (targeted hosted runtime rehearsal). Executed 2026-10-09 (UTC) by Claude Code. The owner authorised one disposable hosted project, created it in the dashboard and supplied the ref and credential files.

| Item | Value | Evidence |
|---|---|---|
| Project name | `tsoy-ad1-g3-rehearsal` | `00a` |
| Project ref | `czhopceorfqxdbfvlnap` (owner-confirmed; the only allowed target) | `00a` |
| Organisation | id `xzickmpbmsjgkowcqpbg`. The organisation name endpoint returned 403 for the G3 token. The id equals the organisation of both C1 WesellProducts rehearsal projects (`41b1a-c1/26-c1-19-project2-pre-delete-listing.txt` lines 4–5) and the owner confirmed WesellProducts, so this is a match by id | `00a` |
| Region | `eu-west-2` | `00a` |
| PostgreSQL | `17.11.0.003` (management plane); `PostgreSQL 17.11 on x86_64-pc-linux-gnu` (server) | `00a`, `00b` |
| Status | `ACTIVE_HEALTHY` | `00a` |
| Created | 2026-10-07T19:06:00.559602Z | `00a` |
| Initial state | 0 Auth users, 0 public tables, no migration history, no `pregnancy_episodes`, no G3 objects; `pg_stat_statements` 1.11 already installed in `extensions` (track = top), default isolation read committed | `00b` |
| Marker | `public.g3_rehearsal_marker` = `czhopceorfqxdbfvlnap / 41B-AD1-G3-runtime-rehearsal`, RLS on, ACL `{postgres=arwdDxtm/postgres,service_role=arwdDxtm/postgres}` (same shape as the C1 marker) | `00c` |

## Fail-closed target boundary (`17-harness/`)

- `g3_guard.sh` is shared by every shell wrapper. `g3lib.py` applies the same rules to every HTTP call.
  - Exactly one target is allowed: the ref in `target_ref.txt`, which must equal the caller's `G3_EXPECT_REF`.
  - Always refused: production `wogepxfipdipogyogced`, and the retired C1 refs `wwtcnbjhttjtklpxhrkd` and `dlftnirrnirlkhxpofoq`, including when they appear inside arguments.
  - The owner listed no other real or user-bearing refs.
- `g3_psql.sh`:
  - connects only to `db.<target>.supabase.co`;
  - asserts the marker row equals the target before every session (only marker creation ran without that check);
  - runs `--file` inputs as one transaction (`-1`, `ON_ERROR_STOP`) after a SHA-256 gate.
- `g3_cli.sh`:
  - runs only inside the `735a07e6` scratch clone (47 migrations, `config.toml` pointed at the G3 ref, production ref removed);
  - allows only `link --project-ref <G3>`, `db push --linked [--dry-run]`, `migration list --linked` and `--version`;
  - allows teardown only when an owner-acceptance flag file exists.
- `g3lib.py`:
  - Management API: GET only, on `/v1/projects/<G3>…` or `/v1/organizations/<slug>`.
  - Auth API: only `https://<G3>.supabase.co/auth/v1/…`.
  - Every output is checked for credential values.
- Offline self-test with stub binaries and fake credentials: 26/26 (`17-harness/selftest-result.txt`).

## Credentials (values never printed, logged or committed)

All credentials are kept in `C:\Users\Administrator\.g3\`, outside the repository:

- `g3.dbpass` (owner-set database password);
- `g3.pat` (new G3-only personal access token; the owner's file was moved into place by name only);
- `g3.service_key` and `g3.anon_key` (legacy keys, fetched through the Management API straight into files);
- `g3.users.json` (synthetic-user passwords).

No C1 credential was reused. The PAT is to be revoked at teardown.
