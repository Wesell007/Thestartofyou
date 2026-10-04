# 41B.1A-C1 — 00 Identity (Project 1)

Status: C1.0 PASS (performed by the owner through the Supabase integration). C1.1 PASS (2026-10-04T00:00Z; see `99-c1-1-summary.md`). C1.2 PASS (2026-10-04T00:26Z; see `07-c1-2-fixture-manifest.md`): 3 synthetic Auth users (all `@example.invalid`, confirmed, login verified) and 21 legacy fixture rows; schema unchanged versus C1.1. C1.3 NOT STARTED.

Post-replay identity (2026-10-03T23:38:31Z): marker unchanged; `auth.users` 0; non-synthetic 0; `supabase_migrations.schema_migrations` 47 rows (`20260420164527..20260915224603`); public base tables 34; public policies 114; public functions 25; `pregnancy_episodes` NULL; episode link columns 0; episode constraints 0; episode indexes 0; episode policies 0; `babies_id_user_id_key` 0.

| Field | Value |
|---|---|
| Rehearsal source commit | `735a07e6` |
| Source branch | `feat/41b1a-family-entity-foundation` (local HEAD d4ba5617 at execution time; the scratch clone is detached at 735a07e6) |
| Scratch clone | `C:\Users\Administrator\.c1\src-735a07e6` (outside the repository; `core.autocrlf=false`; only `supabase/config.toml` `project_id` changed, to the Project 1 ref) |
| Supabase organisation | WesellProducts (`xzickmpbmsjgkowcqpbg`) |
| Project 1 | `tsoy-41b1a-c1-run1`, ref `wwtcnbjhttjtklpxhrkd`, region `eu-west-2`, created 2026-10-03T21:30:09Z, status ACTIVE_HEALTHY |
| Database | `db.wwtcnbjhttjtklpxhrkd.supabase.co`, PostgreSQL 17.11.0.002 (`PostgreSQL 17.11 on x86_64-pc-linux-gnu`), release channel ga |
| Project 2 (NOT touched in C1.1) | `tsoy-41b1a-c1-run2`, ref `dlftnirrnirlkhxpofoq` |
| Denylisted refs | `wogepxfipdipogyogced` (live), `dlftnirrnirlkhxpofoq` (Project 2, out of scope for C1.1) — file `C:\Users\Administrator\.c1\denylist.txt`, enforced by `c1_cli.sh` before every CLI command |
| **OWNER VERSION DECISION** | **PostgreSQL 17.11 accepted for rehearsal; live backend version unavailable for comparison.** This does not assert production-version parity. |

## Identity checks before baseline replay (read-only, via the Supabase integration)

| Check | Result |
|---|---|
| `public.c1_rehearsal_marker` | `wwtcnbjhttjtklpxhrkd / 41B.1A-C1-run1` |
| `auth.users` count | 0 |
| non-synthetic users (email null or not `@example.invalid`) | 0 |
| `current_database()` / `current_user` | `postgres` / `postgres` |
| public tables | 1 (`c1_rehearsal_marker`) |
| `to_regclass('public.pregnancy_episodes')` | NULL |
| remote migration history (`list_migrations`) | empty |

No credential, password, token or key appears in this evidence.
