# 41B.1A-C1 — 19g C1.13 rollback refusal matrix (Project 1)

Result: **C1.13 PASS — rollback refusal matrix proven: R1 refuses on episode history, combined all-guards state refuses on guard 1 proving frozen precedence, R2 refuses on a later-phase Pregnancy Episode FK, and R3 refuses on a babies-key dependant; every failed rollback leaves an empty per-case POST-vs-PRE catalogue diff.** Executed 2026-10-05T22:20Z to 22:25Z (UTC) on `tsoy-41b1a-c1-run1` (`wwtcnbjhttjtklpxhrkd`), PostgreSQL 17.11.0.002, psql 17.11, as `postgres`. Exactly four rollback executions. The successful rollback has NOT been run; C1.14 has NOT started.

## Authoritative procedure

Corrected plan stage C1.13 (commit 009b077b) and section K: R1 (fixture present → guard 1), combined-state run (all five guards true → guard 1 only, proving the frozen order), safe-state transition (setup, recorded separately), R2 (scratch later-phase FK → guard 2), R3 (scratch babies-key dependant → guard 5). Equality reference for every execution: a per-case pre-run nine-section catalogue snapshot of the current validated foundation, POST diffed against that PRE, EMPTY required with no exceptions. Guards 3 and 4 are defence in depth, proven only inside the combined state behind guard 1 and never manufactured by disabling FK integrity. Evidence names follow this directory's numbering (`19*`) rather than the plan's placeholder `14-rollback-refusals.log`.

## Frozen files and runner

Rollback SHA-256 `0d00895514b4e2dc623383436952fd534d5f879cdf4011024596dae303a36077` in the repository and in the scratch clone (wrapper hash gate on every run); forward `e6ad0bc8…` and validate `8645fd67…` unchanged. Runner `c1_psql.sh` (`08b-c1_psql-wrapper.sh`): target and denylist asserted, direct endpoint, role `postgres` (table owner), `-1 -v ON_ERROR_STOP=1 -e`, password never printed. Because the guard block is the first statement after `SET LOCAL lock_timeout`, a refusal aborts the single external transaction before any `DROP`/`ALTER`; each transcript shows zero statements after the `ERROR` line and no `DROP`/`ALTER TABLE` acknowledgement.

## Initial state (`19i-c1-13-initial-state.log`, 22:20:13Z)

Marker `wwtcnbjhttjtklpxhrkd / 41B.1A-C1-run1`; history 47; users 3, non-synthetic 0; legacy fixture 21; episodes 2 (E-A1 A active, E-B1 B given_birth); guards: G1 2, G2 0, G3 0, G4 0, G5 0; scratch 0; ownership FKs 13, validated 13, RESTRICT 13; `babies_id_user_id_key` present; 4 policies; idle 0; ACCESS EXCLUSIVE 0. Repository HEAD 009b077b, clean.

## The four rollback executions (`19-c1-13-rollback-refusals.log`, `19f-c1-13-rollback-matrix.md`, `19c-c1-13-guard-states.md`, `19d-c1-13-catalogues/`, `19e-c1-13-catalogue-diffs.md`)

| Run | Guards true before | Refusal emitted | Exit | After refusal | POST-vs-PRE |
|---|---|---|---|---|---|
| R1 (22:21:48Z) | G1 = 2; G2–G5 = 0 | `ROLLBACK REFUSED: public.pregnancy_episodes holds 2 row(s). This file never destroys history.` | 3 | 0 statements | EMPTY (315/5/25/36/35/118/161/104/35 lines, hashes identical) |
| Combined-state (22:22:57Z) | G1 = 2, G2 = 1, G3 = 1, G4 = 1, G5 = 1 | `ROLLBACK REFUSED: public.pregnancy_episodes holds 2 row(s). This file never destroys history.` (guard 1 only; no guard-2/3/4/5 message) | 3 | 0 statements | EMPTY (319/5/25/36/37/118/163/104/37 lines, scratch structures present in both snapshots) |
| R2 (22:23:20Z) | G1 = 0, G2 = 1, G3 = 0, G4 = 0, G5 = 0 | `ROLLBACK REFUSED: 1 foreign key(s) from a later phase reference pregnancy_episodes.` | 3 | 0 statements | EMPTY (317/5/25/36/36/118/162/104/36 lines) |
| R3 (22:23:26Z) | G1 = 0, G2 = 0, G3 = 0, G4 = 0, G5 = 1 | `ROLLBACK REFUSED: 1 foreign key(s) depend on babies_id_user_id_key.` | 3 | 0 statements | EMPTY (317/5/25/36/36/118/162/104/36 lines) |

Guard-state queries were re-run after every failed rollback and matched the pre-run values exactly (the refused rollback changed neither structure nor the setup rows). Fifth refusal: none.

## Combined-state setup and cleanup (`19a-c1-13-setup-cleanup-transcripts.log`)

Committed as `postgres` before the run: `c1_scratch_episode_dep (episode_id uuid, user_id uuid)` with FK `(episode_id, user_id) → pregnancy_episodes(id, user_id)` (guard 2); `c1_scratch_baby_dep (baby_id uuid, user_id uuid)` with FK `(baby_id, user_id) → babies(id, user_id)`, which `pg_constraint.conindid` shows depends on `babies_id_user_id_key` (guard 5); user A's journey pointer set to its own episode E-A1 (guard 3); user A's legacy reflection `…a101` bound to E-A1 (guard 4); episodes present (guard 1). No rows were inserted into the scratch tables; no ownership was changed; no customer data. Read-only queries before the run showed 2 / 1 / 1 / 1 / 1. After the empty diff was proven both scratch tables were dropped (scratch 0; pointer and bound row intentionally left for the safe-state transition).

## Safe-state transition (`19b-c1-13-safe-state-transition.log`, setup, not a rollback execution)

One committed transaction as `postgres`: journey pointer set back to NULL, the bound reflection link set back to NULL, E-A1 and E-B1 deleted from `pregnancy_episodes`. Read-back: all 13 link columns 0 non-null across the fixture; episode rows 0; fixture episodes remaining 0; legacy fixture 21 (no legacy row deleted); scratch 0; `pregnancy_episodes` table still exists; 13 ownership FKs still validated. Guards after: 0 / 0 / 0 / 0 / 0. This transition is persistent for R2, R3 and C1.14. Side effect recorded, not repaired: `set_updated_at` advanced `updated_at` on user A's `journeys` row and on reflection `…a101` (both 22:23:17Z) through the combined setup and its reversal.

## R2 and R3 setups and cleanups (`19a-c1-13-setup-cleanup-transcripts.log`)

R2: `c1_scratch_episode_dep` recreated (same definition, no rows), guards 0/1/0/0/0, dropped after the empty diff; later-phase FK count 0 afterwards. R3: `c1_scratch_baby_dep` recreated (same definition, no rows, `conindid` = `babies_id_user_id_key`), guards 0/0/0/0/1, dropped after the empty diff; babies-key dependant count 0 afterwards.

## Final state (22:25Z, psql `final` snapshot and integration fresh session)

Episode rows 0 (E-A1 and E-B1 absent); legacy fixture 21; pointers 0; links 0; later-phase FKs 0; babies-key dependants 0; scratch objects 0; `pregnancy_episodes` table present with 4 indexes, trigger, RLS and 4 policies; 13 link columns; 13 ownership FKs, 13 validated, 13 RESTRICT; `babies_id_user_id_key` present; users 3; history 47 (no manual record); 0 idle-in-transaction; 0 ACCESS EXCLUSIVE or SHARE UPDATE EXCLUSIVE locks. The `final` nine-section snapshot diffs EMPTY against the R1 pre-run snapshot, and the integration channel's nine-section hashes equal the C1.12 post-state (columns 315\|f0281fd6…, enums 5\|e01eb254…, functions 25\|920ec2f6…, triggers 36\|a4b05c5a…, rls 35\|a02d18c7…, policies 118\|c5a61c1c…, constraints 161\|a67632e1…, indexes 104\|001b4ec0…, grants 35\|0a9026c0…): every 41B.1A foundation object is intact and no scratch structure remains. This is the expected entry state for C1.14.

## PASS criteria

1 Project 1: PASS. 2 rollback hash: PASS. 3 R1 guard 1: PASS. 4 R1 diff empty: PASS. 5 combined setup proves all five guards true: PASS. 6 combined refuses on guard 1 only: PASS. 7 combined diff empty: PASS. 8 guards 3/4 not fabricated independently: PASS. 9 safe-state transition recorded separately: PASS. 10 transition preserves the 21 legacy rows: PASS. 11 episodes 0 before R2: PASS. 12 R2 guard 2: PASS. 13 R2 diff empty: PASS. 14 R3 guard 5: PASS. 15 R3 diff empty: PASS. 16 exactly four rollback executions: PASS. 17 no scratch object remains: PASS. 18 all 41B.1A objects intact: PASS. 19 13 FKs validated and RESTRICT: PASS. 20 history 47: PASS. 21 successful rollback not executed: PASS. 22 C1.14 not begun: PASS. 23 production and Project 2 untouched: PASS. 24 no secret in evidence: PASS.

## Safety

Successful rollback executed NO. C1.14 started NO. FK/trigger bypass NO (`session_replication_role` not used; no trigger disabled; no catalogue edit). Production (`wogepxfipdipogyogced`) accessed NO. Project 2 (`dlftnirrnirlkhxpofoq`) accessed NO. Customer data NO. Secrets committed NO.
