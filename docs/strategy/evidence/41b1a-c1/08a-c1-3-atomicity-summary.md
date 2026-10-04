# 41B.1A-C1 — 08a C1.3 forced-failure atomicity proof (Project 1)

Result: **C1.3 = PASS — forced-failure transaction atomicity proven.** Executed 2026-10-04T21:57Z to 22:00Z (UTC) on `tsoy-41b1a-c1-run1` (`wwtcnbjhttjtklpxhrkd`). The successful forward migration has NOT been applied; C1.3b has NOT started.

## Runner

| Field | Value |
|---|---|
| psql client | `C:\Program Files\PostgreSQL\17\bin\psql.exe`, PostgreSQL 17.11 |
| Server | PostgreSQL 17.11 (`17.11.0.002`) |
| Connection | direct endpoint `db.wwtcnbjhttjtklpxhrkd.supabase.co:5432`, role `postgres` (table owner), over IPv6; the session pooler `aws-0-eu-west-2.pooler.supabase.com:5432` as `postgres.wwtcnbjhttjtklpxhrkd` was also verified as the fallback. Transaction-mode port 6543 not used. Connection details taken from the authenticated CLI's linked-project record and the project record. |
| Password handling | read by the wrapper from `C:\Users\Administrator\.c1\run1.dbpass` into `PGPASSWORD` for the duration of each psql call; never printed, logged or committed; no connection URI with a password exists anywhere |
| Wrapper | `08b-c1_psql-wrapper.sh`: asserts target ref and denylist, refuses denylisted hosts, enforces an expected SHA-256 on any `-f` file, then runs `psql -h … -p 5432 -U … -d postgres -w -X -1 -v ON_ERROR_STOP=1 -e` |
| Frozen forward SHA-256 (scratch, LF checkout of 735a07e6) | `e6ad0bc82b245beb03131023bb9ce122a451f40c2fe9b75cd43f047b674585cb` (matches the authoritative value; the committed bytes carry CRLF line endings and the hash covers them) |
| Harness | `C:\Users\Administrator\.c1\C1_3_FORCED_FAILURE__DO_NOT_SHIP.sql`, outside the repository: byte copy of the forward file (verified by `cmp` over the forward file's length) plus the plan's appended `DO $$ BEGIN RAISE EXCEPTION 'C1.3 forced failure after all DDL'; END $$;`; SHA-256 `8be50998d72b025214294ac785d94b9e4a505ca34c7048b6e14ce6b938f13448`, deliberately different from the authoritative hash; the wrapper was given exactly this hash |

Connection test (read-only) returned `current_database = postgres`, `current_user = postgres`, `server_version = 17.11`, marker `wwtcnbjhttjtklpxhrkd / 41B.1A-C1-run1`.

## Pre-state (21:58:54Z)

Marker unchanged; migration history 47; 3 Auth users, 0 non-synthetic; 21 fixture rows; `pregnancy_episodes` NULL; episode link columns 0; episode constraints 0; episode indexes 0; episode policies 0; episode trigger 0; `babies_id_user_id_key` 0. Nine-section catalogue hashes identical to the C1.1 and C1.2 captures: columns 289|089827c5…, enums 5|e01eb254…, functions 25|920ec2f6…, triggers 35|c76db905…, rls 34|5c82068f…, policies 114|e87cd992…, constraints 141|ece1b4e9…, indexes 86|b844916e…, grants 34|22bb3e64….

## Forced-failure run (21:59:21Z to 21:59:22Z)

Transcript: `08-c1-3-forced-failure-transcript.log` (136 lines; secret scan clean).

- External single transaction: YES (`-1`); psql issued the transaction implicitly and never sent COMMIT. The four `BEGIN` lines in the transcript are the PL/pgSQL `BEGIN` keywords of the echoed `DO $$ … $$` blocks, not transaction statements.
- `ON_ERROR_STOP=1`: YES; psql stopped at the first error.
- Forward migration began and ran to its end: the echoed statements include `SET LOCAL lock_timeout`, `CREATE TABLE IF NOT EXISTS public.pregnancy_episodes`, the unique open-episode index, the user index, the trigger drop-and-create (NOTICE: trigger does not exist, skipping, as expected on first run), `REVOKE`, three `GRANT`s, `ENABLE ROW LEVEL SECURITY`, the four-policy DO block, `ALTER TABLE public.journeys ADD COLUMN`, the pointer FK and index, the 12-table `FOREACH` loop, and the `babies_id_user_id_key` block, each followed by its server response (`SET`, `CREATE TABLE`, `CREATE INDEX`, `DO`, `ALTER TABLE`, …).
- Intended failure reached: YES. Final echoed statement is the harness `DO`, followed by `psql:C1_3_FORCED_FAILURE__DO_NOT_SHIP.sql:181: ERROR:  C1.3 forced failure after all DDL` with `CONTEXT: PL/pgSQL function inline_code_block line 1 at RAISE`. Line 181 is the appended statement; the authoritative file has 177 lines.
- Exit code: 3 (psql: error in script with `ON_ERROR_STOP`). Expected and intended.
- Not a connection, authentication, path or syntax failure: the connection test succeeded minutes earlier on the same wrapper, the hash gate passed, and 130 lines of echoed statements and responses precede the error.

## Rollback proof (22:00:05Z, integration) and second channel (psql, read-only)

| Check | After failure |
|---|---|
| `public.pregnancy_episodes` | does not exist (both channels) |
| `journeys.current_pregnancy_episode_id` and the 12 `pregnancy_episode_id` columns | 0 (both channels) |
| 13 ownership FKs (`%pregnancy_episode%` constraints) | 0 (both channels) |
| 13 link indexes and the two episode indexes (`%pregnancy_episode%` indexes) | 0 (both channels) |
| `babies_id_user_id_key` | 0 (both channels) |
| `pregnancy_episodes_*` policies | 0 (both channels) |
| `pregnancy_episodes_set_updated_at` trigger | 0 |
| Grants | unchanged (grants hash identical) |
| Nine-section catalogue hashes | identical to pre-state, every section |
| Structural diff versus pre-C1.3 state | **EMPTY** |
| Migration history | 47 (both channels) |
| Auth users / non-synthetic | 3 / 0 |
| Fixture rows | 21 |
| Sessions idle in transaction | 0 |
| Leftover ACCESS EXCLUSIVE locks on `journeys`, `babies`, `reflections` | 0 |
| Marker | `wwtcnbjhttjtklpxhrkd / 41B.1A-C1-run1` |

## PASS criteria

1 target identity Project 1: PASS. 2 frozen hash matches: PASS. 3 psql connects to Project 1: PASS (direct and pooler). 4 single external transaction: PASS. 5 `ON_ERROR_STOP=1` active: PASS. 6 migration execution began: PASS. 7 intended failure occurred: PASS. 8 psql non-zero: PASS (3). 9 whole attempt rolled back: PASS. 10 structural diff empty: PASS. 11 history 47/47: PASS. 12 fixture intact: PASS. 13 no secret in evidence: PASS (fail-closed value-pattern scan). 14 production and Project 2 untouched: PASS.

## Safety

Production accessed NO. Project 2 accessed NO. Customer data accessed NO. Successful 41B.1A application NO. Secrets committed NO. The harness file stays outside the repository and is not shipped.
