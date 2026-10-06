# 41B.1A-C1 — 22o C1.16 re-application after rollback (Project 1)

Result: **C1.16 PASS — frozen 41B.1A foundation successfully re-applied on Project 1 after complete rollback; the second application reproduces the original application structure exactly, with legacy fixture and migration history unchanged; the validated state reproduced exactly, and the starred rows of sections I, J and H gave identical results.** Executed 2026-10-06T00:02Z to 00:08Z (UTC) on `tsoy-41b1a-c1-run1` (`wwtcnbjhttjtklpxhrkd`), PostgreSQL 17.11.0.002, psql 17.11. C1.17 (Project 2) has NOT started; Project 2 and production were not touched.

## Authoritative procedure

Plan stage C1.16: "re-record hashes; forward; validate; rerun C1.5, and the critical rows of sections I, J and H (marked ★ in those sections). Expected: identical results to the first run. PASS: identical. STOP: any difference." The plan therefore requires validation and the starred behavioural rows, which in turn require the section F episode fixture (E-A1, E-B1); it was recreated with the C1.6 definitions for that reason and only for that reason. No other matrix was repeated. Evidence names follow this directory's numbering (`22*`) rather than the plan's placeholders `18-reapply.log` / `18a-catalogue-diff-reapply.txt`.

## Frozen files (re-recorded)

Forward `e6ad0bc82b245beb03131023bb9ce122a451f40c2fe9b75cd43f047b674585cb`, validate `8645fd67f0b0211beb613b9d440e1f964d50e737f31862c11292c0103781b508`, rollback `0d00895514b4e2dc623383436952fd534d5f879cdf4011024596dae303a36077`, identical in the repository and the scratch clone; no frozen file modified; every `-f` run passed the wrapper hash gate.

## Pre-reapplication (`22-c1-16-pre-reapplication-verification.log`, `22a-c1-16-pre-reapplication-diff-vs-c1-1.md`, fresh session 00:02:44Z)

Marker `wwtcnbjhttjtklpxhrkd / 41B.1A-C1-run1`; history 47; users 3, non-synthetic 0; legacy fixture 21; every 41B.1A object class absent (`pregnancy_episodes` ABSENT, 0 link columns, 0 episode constraints/indexes/policies/triggers, `babies_id_user_id_key` absent); scratch 0; idle 0; ACCESS EXCLUSIVE 0. Nine-section catalogue: EMPTY diff against the C1.15 post-rollback snapshot and EMPTY diff against the C1.1 baseline (`02-baseline-catalogue.md`). Legacy fingerprints before: tuple identity `bec17c18…`, content `5dceeb47…`. Repository HEAD f1580dca, clean.

## Second forward application (`22b-c1-16-forward-reapplication.log`, `22c-c1-16-post-forward-catalogue.md`, `22d-c1-16-post-forward-diff-vs-c1-5.md`)

Runner `c1_psql.sh` (`08b-c1_psql-wrapper.sh`): direct endpoint, `postgres`, `-1 -v ON_ERROR_STOP=1 -e`, the frozen file's own `SET LOCAL lock_timeout = '5s'`. Started 2026-10-06T00:04:35.935Z, finished 00:04:36.495Z, 0.56 s, exit 0; 0 ERROR, 0 WARNING, 1 NOTICE (the expected `trigger … does not exist, skipping` of the drop-and-create pair, exactly as in C1.4). Immediately after (fresh session): `pregnancy_episodes` present with 0 rows; ownership FKs 13, NOT VALID 13, validated 0, RESTRICT 13 (the C1.4/C1.5 checkpoint state); policies 4; RLS true; ACL `{postgres=arwdDxtm/postgres,service_role=arwdDxtm/postgres,authenticated=r/postgres}`; history 47. Nine-section diff against the first application's `11-c1-5-post-forward-catalogue.md`: **EMPTY** in every section (315/5/25/36/35/118/161/104/35 lines; functions matched by both `md5(prosrc)` and `md5(pg_get_functiondef)`). No unexpected object, no missing object, no changed definition.

## Second validation (`22e-c1-16-validate-reapplication.log`, `22f-c1-16-post-validate-catalogue.md`, `22g-c1-16-post-validate-diffs.txt`)

Before: 13 ownership FKs, 13 NOT VALID, 0 validated, 13 RESTRICT (matches the first run's pre-C1.7 state). Validate file through the same runner: started 00:05:32.930Z, finished 00:05:33.361Z, 0.43 s, exit 0, 13 `ALTER TABLE` acknowledgements, 0 ERROR/WARNING. After: 13 / 0 NOT VALID / 13 validated / 13 RESTRICT; the only unvalidated constraints in `public` are the two pre-existing account FKs (`reflections_user_id_fkey`, `week_photos_user_id_fkey`), as after C1.7. Nine-section diff against the first validated state: EMPTY against the C1.14 pre-rollback reference (`pre_c1_15`) and EMPTY against the C1.13 `r1_pre` snapshot.

## Data neutrality after forward and validate (integration fresh session, 00:05:37Z)

Legacy fixture 21; tuple-identity fingerprint `bec17c18…` and content fingerprint `5dceeb47…` unchanged from before the re-application; users 3, non-synthetic 0; episodes 0; links 0; pointers 0; `role_table_grants` authenticated SELECT only, service_role all seven; `has_table_privilege` for `anon` and PUBLIC SELECT false/false (the frozen explicit REVOKE/GRANT design, not platform defaults); history 47; scratch 0; idle 0; locks 0.

## Starred rows re-run (`22h`–`22k`, `22m-c1-16-reproducibility-matrix.md`)

Episode fixture recreated as `postgres` (`22h-c1-16-episode-fixture.log`): E-A1 (A, active, expected_count 1) and E-B1 (B, given_birth, ended 2026-06-05), committed; retained after the stage, as after C1.6.

| Section | Rows re-run | Result |
|---|---|---|
| I ★ (`22i`) | same-user insert → own episode accepted and read back; cross-user insert → other episode rejected, for all 13 relationships (rollback-only, savepoints) | 13/13 accepted, 13/13 rejected with SQLSTATE 23503 naming that relationship's `…_pregnancy_episode_owner_fkey`; 0 unexpected; nothing persisted |
| J ★ (`22j`) | one active (count 1); second active; active + paused; single-column `removed_at` update on E-A1; removed row retained with status `active`, `ended_at` NULL, `outcome_date` NULL; A open count 0; new active E-A2 accepted (rollback-only) | 7/7 as expected; both rejections SQLSTATE 23505 on `pregnancy_episodes_one_open_per_user_idx`; final `ROLLBACK` |
| H ★ (`22k`) | H-1..H-5 through PostgREST with a genuine User A JWT (Supabase Auth password grant, HTTP 200, role `authenticated`; token never stored); psql corroboration as `authenticated` with both JWT claim GUCs (`auth.uid()` = A, `row_security = on`) | PostgREST: H-1 200 only `…ea01`; H-2 200 `[]`; H-3/H-4/H-5 403 code 42501; E-A1 unchanged afterwards. psql: only E-A1 visible, B filter 0, INSERT/UPDATE/DELETE SQLSTATE 42501. Identical to C1.11/C1.12 |

A first attempt to generate the starred section I script failed in the local generator patch (a Python string-escape error) before any SQL was produced or sent; no database call was made by that attempt, and the corrected generator produced the 26-case script that ran.

## Final state (`22l-c1-16-final-state.txt`, 00:08Z)

Episodes 2 (E-A1, E-B1); links 0; pointers 0; C1.8-style residue 0; legacy fixture 21; validated 13; history 47; scratch 0; idle 0; ACCESS EXCLUSIVE 0; `journeys.updated_at` maximum unchanged since C1.13 (the rollback-only starred rows left no persistent side effect). The final nine-section catalogue diffs EMPTY against the post-validation capture. 41B.1A foundation present and validated on Project 1 again.

## PASS criteria

1 Project 1: PASS. 2 pre-state equals the C1.1 baseline: PASS. 3 all frozen hashes: PASS. 4 forward exit 0: PASS. 5 second post-forward structure equals the first: PASS. 6 `pregnancy_episodes` with 0 rows after forward: PASS. 7 13 ownership relationships: PASS. 8 RESTRICT matches original: PASS. 9 validation state matches the equivalent checkpoint before and after validate: PASS. 10 policies/RLS/grants match original: PASS. 11 CHECKs/indexes/trigger definitions match original: PASS. 12 21 legacy rows unchanged: PASS. 13 users 3: PASS. 14 non-synthetic 0: PASS. 15 history 47: PASS. 16 no lingering lock/transaction/scratch: PASS. 17 validate step succeeded and reproduced the validated state exactly; starred rows identical: PASS. 18 production untouched: PASS. 19 Project 2 untouched: PASS. 20 evidence secret-free: PASS.

## Safety

Production (`wogepxfipdipogyogced`) accessed NO. Project 2 (`dlftnirrnirlkhxpofoq`) accessed NO. Customer data NO. Frozen files modified NO. Secrets committed NO. C1.17 started NO.
