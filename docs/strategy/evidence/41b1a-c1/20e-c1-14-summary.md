# 41B.1A-C1 — 20e C1.14 rollback success-path preparation (Project 1)

Result: **C1.14 PASS — Project 1 is in rollback-safe state: no Pregnancy Episode rows, pointers, bound links, later-phase Pregnancy Episode FKs, babies-key dependants or C1 scratch objects remain; legacy fixture preserved and 41B.1A foundation still installed.** Executed 2026-10-05T22:30Z to 22:31Z (UTC) on `tsoy-41b1a-c1-run1` (`wwtcnbjhttjtklpxhrkd`), PostgreSQL 17.11.0.002, psql 17.11, as `postgres`. The rollback file was NOT executed in any form during C1.14 (no refusal run either); C1.15 has NOT started.

## Authoritative procedure

Plan stage C1.14: run the section K safe-state query set and the explicit cleanup sequence inside one transaction as `postgres` (null the 12 link columns and the journeys pointer on fixture rows, delete fixture episodes, drop the scratch tables created for refusal cases, confirm no later-phase FK and no dependant of `babies_id_user_id_key`); expected: every safe-state query returns 0. Evidence names follow this directory's numbering (`20*`) rather than the plan's placeholder `15-safe-state-queries.txt`.

## Identity gate (22:30:26Z)

Marker `wwtcnbjhttjtklpxhrkd / 41B.1A-C1-run1`; `current_user`/`session_user` `postgres`; history 47; users 3, non-synthetic 0; idle-in-transaction 0; ACCESS EXCLUSIVE 0. Target-ref and denylist checks enforced by the wrapper on every connection (production `wogepxfipdipogyogced` and Project 2 `dlftnirrnirlkhxpofoq` denylisted). Repository HEAD d1b2c966, clean. The C1.13 ending state (`19g-c1-13-summary.md`) was reconfirmed live before any action.

## Safe-state query set, itemised (`20-c1-14-safe-state-queries-before-cleanup.log`, then `20b-…-after-cleanup.log`)

| Check (section K) | Before cleanup | After cleanup |
|---|---|---|
| G1 `count(*) from pregnancy_episodes` | 0 | 0 |
| G3 `journeys where current_pregnancy_episode_id is not null` | 0 | 0 |
| G4 `reflections` links | 0 | 0 |
| G4 `week_photos` | 0 | 0 |
| G4 `week_media_memories` | 0 | 0 |
| G4 `pregnancy_appointments` | 0 | 0 |
| G4 `pregnancy_symptom_notes` | 0 | 0 |
| G4 `baby_movement_notes` | 0 | 0 |
| G4 `birth_plans` | 0 | 0 |
| G4 `hospital_bag_items` | 0 | 0 |
| G4 `midwife_questions` | 0 | 0 |
| G4 `contraction_sessions` | 0 | 0 |
| G4 `contraction_events` | 0 | 0 |
| G4 `babies` | 0 | 0 |
| G2 FKs referencing `pregnancy_episodes` outside the 13 owned links | 0 | 0 |
| G5 FKs depending on `babies_id_user_id_key` | 0 | 0 |
| scratch `pg_class` relname like `c1_scratch%` | 0 | 0 |

All seventeen values 0 on both passes.

## Cleanup transaction (`20a-c1-14-cleanup-transaction.log`)

One committed transaction as `postgres` (`SET LOCAL lock_timeout = '5s'`) executing the plan's sequence with per-statement row counts: journeys pointer nulled 0; links nulled 0 on each of the 12 tables; fixture episodes deleted 0 (E-A1/E-B1 had already been removed by the C1.13 safe-state transition); `pregnancy_episodes` rows remaining 0; `drop table if exists` for `c1_scratch_episode_dep` and `c1_scratch_baby_dep` both reported "does not exist, skipping"; later-phase FKs 0; babies-key dependants 0; scratch objects 0; `COMMIT`. The cleanup was therefore a no-op by design: nothing was created in order to be cleaned, no legacy fixture row and no Auth user was deleted, and no schema object was altered.

## Legacy fixture preservation

Total 21 in the C1.2 distribution: journeys 3, pregnancy_journeys 2, babies 2, reflections 2 (`…a101`, `…b101`), week_photos 1, week_media_memories 1, pregnancy_appointments 2, pregnancy_symptom_notes 1, baby_movement_notes 1, birth_plans 1, hospital_bag_items 1, midwife_questions 1, contraction_sessions 1, contraction_events 2; first_year_journeys and ttc_journeys 0 as in C1.2; babies `…b001`, `…b002`. The two episode fixtures were never part of the 21 and were not recreated.

## 41B.1A foundation still installed (before C1.15)

`pregnancy_episodes` present; ownership FKs 13, validated 13, RESTRICT 13; 13 link columns (12 `pregnancy_episode_id` + `journeys.current_pregnancy_episode_id`); 13 link indexes; `babies_id_user_id_key` present; `pregnancy_episodes_one_open_per_user_idx` present; 3 CHECK constraints; `pregnancy_episodes_set_updated_at` trigger; RLS `true`, not forced; 4 owner policies; ACL `{postgres=arwdDxtm/postgres,service_role=arwdDxtm/postgres,authenticated=r/postgres}` with `authenticated` SELECT only.

## Pre-C1.15 catalogue (`20c-c1-14-pre-c1-15-catalogue.md`, `20d-c1-14-catalogue-diff-vs-c1-13-final.txt`)

Nine sections captured at 22:30:41Z after the cleanup: columns 315, enums 5, functions 25, triggers 36, rls 35, policies 118, constraints 161, indexes 104, grants 35 (file hashes in the catalogue header). Diff against the C1.13 `final` snapshot: EMPTY, so C1.14 changed no structure. Integration-channel hashes (fresh session, 22:31Z) equal the C1.12 post-state: columns 315\|f0281fd6…, enums 5\|e01eb254…, functions 25\|920ec2f6…, triggers 36\|a4b05c5a…, rls 35\|a02d18c7…, policies 118\|c5a61c1c…, constraints 161\|a67632e1…, indexes 104\|001b4ec0…, grants 35\|0a9026c0…. This capture is the authoritative immediately-before-successful-rollback state; it is intentionally not equal to the C1.1 baseline.

## Data-state handoff into C1.15

Users 3, non-synthetic 0; legacy fixture 21; Pregnancy Episodes 0; journey pointers 0; episode links 0; later-phase FKs 0; babies-key dependants 0; scratch objects 0; history 47 (no manual record); idle-in-transaction 0; ACCESS EXCLUSIVE or SHARE UPDATE EXCLUSIVE locks in `public` 0.

## PASS criteria

1 Project 1: PASS. 2 episodes 0: PASS. 3 pointers 0: PASS. 4 twelve link counts 0: PASS. 5 later-phase FKs 0: PASS. 6 babies-key dependants 0: PASS. 7 scratch 0: PASS. 8 legacy fixture 21: PASS. 9 users 3: PASS. 10 13 ownership FKs exist: PASS. 11 13 validated: PASS. 12 13 RESTRICT: PASS. 13 `babies_id_user_id_key` present: PASS. 14 complete foundation present: PASS. 15 history 47: PASS. 16 no lingering locks: PASS. 17 no idle transaction: PASS. 18 successful rollback not executed: PASS. 19 production and Project 2 untouched: PASS. 20 evidence secret-free: PASS.

## Safety

Rollback file executed NO (neither success nor refusal run). C1.15 started NO. Episode fixtures recreated NO. Legacy fixture or Auth users deleted NO. Schema changed NO. Production (`wogepxfipdipogyogced`) accessed NO. Project 2 (`dlftnirrnirlkhxpofoq`) accessed NO. Customer data NO. Secrets committed NO.
