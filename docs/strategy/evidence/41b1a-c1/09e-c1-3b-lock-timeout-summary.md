# 41B.1A-C1 — 09e C1.3b lock-timeout proof (Project 1)

Result: **C1.3b = PASS — bounded lock-timeout behaviour proven.** Executed 2026-10-04T22:09Z to 22:12Z (UTC) on `tsoy-41b1a-c1-run1` (`wwtcnbjhttjtklpxhrkd`), PostgreSQL 17.11.0.002, psql 17.11. The successful forward migration has NOT been applied; C1.4 has NOT started.

## Housekeeping (Step 2)

Working tree clean at 2373750e. The only `.gitignore` change versus 735a07e6 is the three-line scoped exception `!docs/strategy/evidence/**/*.log`; the committed blob is LF-only (byte dump shows `\n` with no `\r`), so there is no line-ending churn. Frozen forward hash in the LF scratch checkout: `e6ad0bc82b245beb03131023bb9ce122a451f40c2fe9b75cd43f047b674585cb` (matches). Frozen SQL untouched.

## Pre-state (22:09:24Z)

Marker `wwtcnbjhttjtklpxhrkd / 41B.1A-C1-run1`; history 47; 3 Auth users, 0 non-synthetic; 21 fixture rows; `pregnancy_episodes` NULL; episode link columns, constraints, indexes, policies, trigger all 0; `babies_id_user_id_key` 0; no idle-in-transaction session; no ACCESS EXCLUSIVE lock on `journeys`. Nine-section hashes identical to C1.1, C1.2 and the C1.3 post-state.

## Procedure (plan C1.3b, executed as written)

Three independent psql sessions on the direct endpoint `db.wwtcnbjhttjtklpxhrkd.supabase.co:5432` as `postgres`, password read from the owner's file and never printed:

- **Session A, blocker** (`09b-c1-3b-blocker.sql` through `09d-c1_psql_notx-wrapper.sh`, no single-transaction flag so the file's own `BEGIN … ROLLBACK` governs): `BEGIN; LOCK TABLE public.journeys IN ACCESS EXCLUSIVE MODE; … pg_sleep(25); ROLLBACK;`. PID 106342, transaction started 22:10:22.576Z, lock acquired at the same instant, released by `ROLLBACK` at 22:10:47.645Z. Nothing committed.
- **Session B, migration** (`c1_psql.sh`, hash gate `e6ad0bc8…`, `-1`, `ON_ERROR_STOP=1`, `-e`): the frozen forward file, unmodified, started 22:10:29.075Z while A held the lock.
- **Observer** (`09c-c1-3b-observer.sql`, read-only on `pg_stat_activity` and `pg_locks`) at 22:10:28Z, 22:10:31Z and 22:10:50Z (`09a-c1-3b-lock-observations.txt`).

## Lock evidence (Step 9)

| Time | Observation |
|---|---|
| 22:10:28Z (A only) | PID 106342 active in `pg_sleep`, transaction since 22:10:22.576; `pg_locks`: 106342 `AccessExclusiveLock` on `journeys`, granted `t` |
| 22:10:31Z (A and B) | PID 106345 (Session B) `active`, `wait_event_type = Lock`, `wait_event = relation`, `pg_blocking_pids = {106342}`, query `ALTER TABLE public.journeys ADD COLUMN IF NOT EXISTS current_pregnancy_episode_i…`, transaction since 22:10:27.077; `pg_locks`: 106342 granted `t`, 106345 `AccessExclusiveLock` on `journeys` granted `f` |
| 22:10:50Z (after both) | no matching session; no lock on `journeys` |

The failure therefore came from genuine lock contention on the intended relation, not from an injected exception.

## Migration session result (Step 6)

- Transcript: `09-c1-3b-sessionB-migration-transcript.log` (secret scan clean).
- Migration began: YES. Echoed and acknowledged inside the one transaction: `SET LOCAL lock_timeout = '5s'`, `CREATE TABLE IF NOT EXISTS public.pregnancy_episodes`, both episode indexes, trigger drop-and-create, `REVOKE`, grants, `ENABLE ROW LEVEL SECURITY`, the four-policy DO block.
- Blocking statement: `ALTER TABLE public.journeys ADD COLUMN IF NOT EXISTS current_pregnancy_episode_id uuid;` (frozen file line 112), exactly the statement the plan names.
- Error: `psql:…/41b1a_family_entity_foundation.sql:112: ERROR:  canceling statement due to lock timeout` (SQLSTATE 55P03 class). The 12-table loop and the babies key were never reached (0 occurrences in the transcript).
- Elapsed wall-clock for Session B: **5.82 s** from wrapper start to exit (22:10:29.075Z to 22:10:34.890Z), consistent with the 5-second `lock_timeout` plus connection, hash-gate and the statements preceding the blocked ALTER. The wait was bounded; nothing hung.
- Exit code: 3 (psql error with `ON_ERROR_STOP`). Expected and intended.
- `SET LOCAL` demonstrably applied to the later statement in the same transaction, which is the S1 property under test.

## Cleanup (Step 7)

Session A rolled back by its own `ROLLBACK` at 22:10:47.645Z, after Session B had already failed (22:10:34.890Z). Observer 3 and the integration both show 0 ACCESS EXCLUSIVE locks on `journeys`, `babies` or `reflections` and 0 idle-in-transaction sessions.

## Rollback proof (Step 8), 22:11:53Z, confirmed on a second channel (psql read-only)

| Check | After test |
|---|---|
| `public.pregnancy_episodes` (created earlier in the same failed transaction) | does not exist |
| episode link columns / journeys pointer | 0 / absent |
| ownership FKs / link indexes / episode indexes | 0 / 0 |
| `babies_id_user_id_key` | absent |
| episode policies / trigger / grants | 0 / 0 / grants hash unchanged |
| Nine-section catalogue hashes | identical to pre-state (columns 089827c5…, enums e01eb254…, functions 920ec2f6…, triggers c76db905…, rls 5c82068f…, policies e87cd992…, constraints ece1b4e9…, indexes b844916e…, grants 22bb3e64…) |
| Structural diff | **EMPTY** |
| Migration history | 47/47 |
| Auth users / non-synthetic / fixture rows | 3 / 0 / 21 |
| Marker | unchanged |

## PASS criteria

1 identity: PASS. 2 hash: PASS. 3 Session A held the intended lock: PASS (granted ACCESS EXCLUSIVE on `journeys`). 4 Session B ran the real frozen file: PASS. 5 blocked on the intended `journeys` statement: PASS (observed waiting, blocked by 106342). 6 `lock_timeout = 5s` aborted it: PASS. 7 non-zero exit caused by the lock timeout: PASS (exit 3, 55P03 message). 8 bounded wait: PASS (5.82 s). 9 preceding DDL rolled back: PASS (`pregnancy_episodes` absent). 10 empty structural diff: PASS. 11 history 47/47: PASS. 12 fixture and users intact: PASS. 13 blocker released: PASS (ROLLBACK). 14 no lingering lock or session: PASS. 15 production and Project 2 untouched: PASS. 16 no secret in evidence: PASS.

## Safety

Production accessed NO. Project 2 accessed NO. Customer data NO. Successful 41B.1A application NO. Secrets committed NO.
