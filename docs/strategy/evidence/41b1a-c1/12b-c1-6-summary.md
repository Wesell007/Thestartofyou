# 41B.1A-C1 — 12b C1.6 pre-validation FK behaviour (Project 1)

Result: **C1.6 PASS — NOT VALID ownership-link runtime gate proven; all 13 ownership FKs remain unvalidated pending C1.7.** Executed 2026-10-05T20:01:10Z to 20:01:11Z (UTC) on `tsoy-41b1a-c1-run1` (`wwtcnbjhttjtklpxhrkd`), PostgreSQL 17.11.0.002, psql 17.11, as `postgres` (table owner; `rolsuper = false`, `rolbypassrls = true`, which is the role the plan names for this stage). The validate file (`8645fd67…`) was NOT run; no `VALIDATE CONSTRAINT` statement was issued; C1.7 has NOT started. 41B.1A is NOT applied to production.

## Authoritative procedure

Plan `docs/strategy/phase41b1a-c1-rehearsal-plan.md`, stage C1.6 (actions 1 to 6, cleanup rule "delete the rows inserted in (2); the fixture remains"), with the post-migration episode fixture of section F (E-A1 for user A, E-B1 for user B) and the constraint naming of section I. Evidence names follow this directory's numbering (`12*`) rather than the plan's placeholder `08-not-valid-behaviour.log`.

Two adaptations, both recorded in the script and transcript, neither changing the semantics under test:

- `journeys` has one row per user (primary key `user_id`), so the "insert" form of actions (2) and (3) becomes an update of A's pointer: to E-A1 (accepted), to E-B1 (rejected). Action (4) uses C's legacy NULL-pointer row updated to E-A1 (rejected). A's pointer was then set back to NULL to restore the legacy fixture (accepted).
- User A has no legacy baby row, so action (4) for `babies` updates B's legacy NULL-link row `…b002` to A's episode E-A1 (rejected), the mirror image of the same cross-user case.

## Pre-state gate (19:59:34Z integration)

Marker `wwtcnbjhttjtklpxhrkd / 41B.1A-C1-run1`; history 47; 3 Auth users, all `@example.invalid`, 0 non-synthetic; 21 legacy fixture rows; `pregnancy_episodes` present with 0 rows; 13 ownership FKs, 13 `convalidated = false`, 0 validated, 13 `ON DELETE RESTRICT`; 0 non-null links, 0 non-null pointers; 0 idle-in-transaction sessions; 0 ACCESS EXCLUSIVE locks in `public`; 0 `c1_scratch%` objects. Repository HEAD 06f5b6d9, clean. Frozen hashes re-verified: forward `e6ad0bc8…`, validate `8645fd67…`.

## Runner

| Field | Value |
|---|---|
| Script | `12a-c1-6-not-valid-behaviour.sql` (copy of `C:\Users\Administrator\.c1\C1_6_not_valid_behaviour.sql`), SHA-256 `19e0ad71e9543dfdf5670e971f67861ee7652b62bae7fc0bf1898e2d16fdd801`, passed to the wrapper's hash gate |
| Wrapper | `09d-c1_psql_notx-wrapper.sh` (target and denylist asserted; no `-1`, so the script's own `BEGIN … COMMIT` governs; password read from the owner's file, never printed) |
| Transaction design | one explicit transaction with `SET LOCAL lock_timeout = '5s'`; `ON_ERROR_STOP` turned off inside the script and each intended rejection wrapped in `SAVEPOINT … ROLLBACK TO SAVEPOINT`, so a rejection is observed with its exact server text while an unexpected failure would abort the transaction and turn the final `COMMIT` into a rollback (nothing would persist) |
| Bypass | none: no `session_replication_role`, no `ALTER TABLE … DISABLE TRIGGER`, no constraint drop/recreate, no catalogue write, no `VALIDATE CONSTRAINT` |
| Transcript | `12-c1-6-not-valid-behaviour.log` (238 lines, `\set VERBOSITY verbose`, exit 0, 6 ERROR lines, 0 WARNING; secret scan clean) |

## Results (plan actions 1 to 6)

| Action | Operation (as `postgres`) | Expected | Actual | SQLSTATE / message |
|---|---|---|---|---|
| (1) | `pg_constraint.convalidated` for the 13 links | 13 × `false` | 13 × `f`, all `confdeltype = r` | — |
| fixture | insert E-A1 (A, active, expected_count 1) and E-B1 (B, given_birth, ended_at and outcome_date 2026-06-05, expected_count 2) | accepted | `INSERT 0 1` twice | — |
| (2) | insert reflection `…c601` for A, week 20, bound to E-A1 | accepted | `INSERT 0 1`; row read back with link E-A1 | — |
| (3) | insert reflection `…c602` for A bound to E-B1 | rejected naming `reflections_pregnancy_episode_owner_fkey` | rejected; 0 rows with that id after `ROLLBACK TO SAVEPOINT` | `23503: insert or update on table "reflections" violates foreign key constraint "reflections_pregnancy_episode_owner_fkey"` — `DETAIL: Key (pregnancy_episode_id, user_id)=(…eb01, b09cd318-…) is not present in table "pregnancy_episodes".` |
| (4) | update legacy reflection `…a101` (A, week 12, NULL link) to E-B1 | rejected | rejected; row still NULL-linked | `23503 … "reflections_pregnancy_episode_owner_fkey"`, same DETAIL shape |
| (5) journeys | A pointer → E-A1 | accepted | `UPDATE 1`; pointer read back as E-A1 | — |
| (5) journeys | A pointer → E-B1 | rejected naming `journeys_current_pregnancy_episode_owner_fkey` | rejected | `23503: insert or update on table "journeys" violates foreign key constraint "journeys_current_pregnancy_episode_owner_fkey"` — `DETAIL: Key (current_pregnancy_episode_id, user_id)=(…eb01, b09cd318-…) is not present …` |
| (5) journeys | legacy C pointer (NULL) → E-A1 | rejected | rejected | `23503 … "journeys_current_pregnancy_episode_owner_fkey"` — `DETAIL: Key (current_pregnancy_episode_id, user_id)=(…ea01, 6e65487d-…) is not present …` |
| (5) journeys restore | A pointer → NULL | accepted | `UPDATE 1`; all three pointers NULL | — |
| (5) babies | insert baby `…c603` for A (birth_order 1, primary, DOB 2026-09-20) bound to E-A1 | accepted (FK, `validate_baby_date_of_birth`, uniqueness all satisfied) | `INSERT 0 1`; row read back with link E-A1 | — |
| (5) babies | insert baby `…c604` for A bound to E-B1 | rejected naming `babies_pregnancy_episode_owner_fkey` | rejected | `23503: insert or update on table "babies" violates foreign key constraint "babies_pregnancy_episode_owner_fkey"` — `DETAIL: Key (pregnancy_episode_id, user_id)=(…eb01, b09cd318-…) is not present …` |
| (5) babies | update legacy B baby `…b002` (NULL link) to E-A1 | rejected | rejected; both B babies still NULL-linked | `23503 … "babies_pregnancy_episode_owner_fkey"` — `DETAIL: Key (pregnancy_episode_id, user_id)=(…ea01, 820f49d1-…) is not present …` |
| (6) | non-null links per table inside the transaction; `convalidated` | only the two rows inserted in (2)/(5) carry a link; 13 × false | reflections 1, babies 1, all other eleven 0; 13 / 13 NOT VALID / 0 validated | — |
| cleanup | delete `…c601` and `…c603`; `COMMIT` | fixture remains | `DELETE 1`, `DELETE 1`, `COMMIT` | — |

All six rejections were raised by the referential-integrity trigger machinery (`LOCATION: ri_ReportViolation, ri_triggers.c:2599`), i.e. the NOT VALID constraints are enforced for every new or updated row; no cross-user link was accepted anywhere. Every outcome matches the plan: PASS condition met, STOP condition never triggered.

## Post-state (20:01:11Z psql; 20:01:42Z integration, identical)

| Check | Value |
|---|---|
| ownership FKs / NOT VALID / validated / RESTRICT | 13 / 13 / 0 / 13 |
| `pregnancy_episodes` rows | 2 (E-A1 `…ea01` A active; E-B1 `…eb01` B given_birth, ended, outcome 2026-06-05), both `removed_at` NULL — plan §F fixture, kept for C1.7+ |
| non-null links / non-null pointers | 0 / 0 |
| legacy fixture rows | 21, same ids (reflections `…a101`, `…b101`; babies `…b001`, `…b002`; journeys A/B/C pointers NULL) |
| test rows `…c601`, `…c602`, `…c603`, `…c604` | none present |
| Auth users / non-synthetic | 3 / 0 |
| history | 47; no manual record |
| idle-in-transaction / ACCESS EXCLUSIVE in `public` / `c1_scratch%` | 0 / 0 / 0 |
| nine-section catalogue hashes | identical to C1.5 (`11-c1-5-post-forward-catalogue.md`): columns 315\|f0281fd6…, enums 5\|e01eb254…, functions 25\|920ec2f6…, triggers 36\|a4b05c5a…, rls 35\|a02d18c7…, policies 118\|c5a61c1c…, constraints 161\|9c67159c…, indexes 104\|001b4ec0…, grants 35\|0a9026c0… |
| permanent structural diff versus C1.5 | **EMPTY** (and `convalidated` unchanged at false for all 13) |

One data-level side effect, recorded for completeness: the `set_updated_at` trigger advanced `updated_at` on user A's `journeys` row during the pointer update and its restoration (now 2026-10-05T20:01:11Z). The row's content is otherwise identical to the C1.2 fixture (lifecycle `pregnancy`, pointer NULL). No other legacy row was modified.

## PASS criteria

1 identity Project 1: PASS. 2 C1.5 structural state intact (hashes identical): PASS. 3 all plan actions (1) to (6) as expected: PASS. 4 exactly 13 ownership FKs: PASS. 5 exactly 13 NOT VALID: PASS. 6 0 prematurely validated: PASS. 7 runtime behaviour matches the plan (enforced on new and updated rows while unvalidated): PASS. 8 no FK, RLS or trigger bypass: PASS. 9 temporary rows deleted, episode fixture kept per plan §F / C1.6 cleanup rule: PASS. 10 permanent structural diff EMPTY: PASS. 11 history 47: PASS. 12 validate file not run: PASS. 13 production and Project 2 untouched: PASS. 14 evidence secret-free (fail-closed credential-value scan): PASS.

## Safety

Production (`wogepxfipdipogyogced`) accessed NO. Project 2 (`dlftnirrnirlkhxpofoq`) accessed NO. Customer data NO. Schema modified NO. Validate file run NO. Rollback file run NO. C1.7 started NO. Secrets committed NO.
