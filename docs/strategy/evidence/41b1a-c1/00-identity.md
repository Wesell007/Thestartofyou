# 41B.1A-C1 — 00 Identity (Project 1)

Status: C1.0 PASS (performed by the owner through the Supabase integration). C1.1 PASS (2026-10-04T00:00Z; see `99-c1-1-summary.md`). C1.2 PASS (2026-10-04T00:26Z; see `07-c1-2-fixture-manifest.md`): 3 synthetic Auth users (all `@example.invalid`, confirmed, login verified) and 21 legacy fixture rows; schema unchanged versus C1.1. C1.3 PASS (2026-10-04T22:00Z; see `08a-c1-3-atomicity-summary.md`): forced-failure transaction atomicity proven with psql 17.11 `-1` + `ON_ERROR_STOP=1`; exit 3 at the appended failure; empty structural diff afterwards. C1.3b PASS (2026-10-04T22:12Z; see `09e-c1-3b-lock-timeout-summary.md`): bounded lock-timeout behaviour proven; the frozen forward file, blocked by an ACCESS EXCLUSIVE lock on `journeys`, was cancelled by `lock_timeout` after 5.82 s at line 112 (exit 3) and left an empty structural diff. C1.4 PASS (2026-10-05T06:53Z; see `10b-c1-4-forward-application-summary.md`): frozen 41B.1A forward foundation successfully applied to Project 1 (rehearsal only, not production): exit 0 in 1.36 s, `pregnancy_episodes` created with 0 rows, 13 NOT VALID composite RESTRICT links, 4 policies, authenticated SELECT-only, fixture intact, history 47. Validate and rollback files NOT run. C1.5 PASS (2026-10-05T19:29Z; see `11c-c1-5-summary.md`): read-only post-forward catalogue capture through two channels; 0 removed lines, 52 added lines all classified EXPECTED 41B.1A, G-1 to G-12 all PASS; 0 episode rows, 0 non-null links or pointers, fixture 21, history 47. C1.6 NOT STARTED.

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
