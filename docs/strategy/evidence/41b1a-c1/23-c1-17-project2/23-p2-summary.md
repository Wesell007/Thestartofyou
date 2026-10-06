# 41B.1A-C1 — 23 C1.17 fresh-project repeatability on Project 2 (summary)

Result: **C1.17 PASS — the complete selected C1 path reproduced identically on an independently created hosted project.** Executed 2026-10-06T00:35Z to 00:45Z (UTC) on `tsoy-41b1a-c1-run2` (`dlftnirrnirlkhxpofoq`, organisation WesellProducts, region eu-west-2, PostgreSQL 17.11.0.002, created 2026-10-03T21:31:18Z as its own project; never cloned, restored or copied from Project 1). Project 1 was not accessed in this stage; production was not accessed; C1.18 has NOT started. After C1.15 the 41B.1A foundation is NOT present on Project 2 (Project 1 keeps its validated foundation from C1.16).

## Authoritative procedure

Plan stage C1.17: on `tsoy-41b1a-c1-run2`, created clean (not cloned): C1.0, C1.1, C1.2, C1.4, C1.5, C1.7, the ★ rows of I, J and H, one refusal case (episode rows exist), C1.14, C1.15 with the empty baseline diff; C1.3, C1.3b and C1.6 not repeated because run 1 needed no runner switch. Expected: identical outcomes. Evidence mirrors the run-1 files under this folder (`23-c1-17-project2/`, numbered by stage with a `p2` tag).

## Independence and credentials

Separate wrappers `c2_psql.sh`, `c2_psql_notx.sh`, `c2_cli.sh`, `c2_driver.sh` (`99-p2-harness/`): target file `target_ref2.txt` = `dlftnirrnirlkhxpofoq`, denylist `denylist2.txt` = production `wogepxfipdipogyogced` and Project 1 `wwtcnbjhttjtklpxhrkd` (host check refuses both), password read from `run2.dbpass` (owner-created, never printed). The guard self-test refused a Project 1 target before any connection. Project 2 API keys were listed through the authenticated CLI into `run2.apikeys.json` (mode 600); synthetic users and their random passwords live only in `run2.users.json` (mode 600). No Project 1 credential, token, user id or scratch clone was reused: a second scratch clone `src2-735a07e6` (detached 735a07e6, `core.autocrlf=false`, `config.toml` project_id set to Project 2; the repository default production ref removed) with the same 47-file migration manifest hash-for-hash as run 1 (`01h`).

## Stage results

| Stage | Project 2 outcome | Evidence |
|---|---|---|
| C1.0 | psql connection as `postgres` (PG 17.11), 0 Auth users, 0 public tables, no migration history; marker `c1_rehearsal_marker` created with the run-1 definition (`project_ref` pkey, `run_label`, `created_at`, RLS on, ACL `{postgres=arwdDxtm/postgres,service_role=arwdDxtm/postgres}` identical to run 1) holding `dlftnirrnirlkhxpofoq / 41B.1A-C1-run2` | `00a`, `00b` |
| C1.1 | linked; dry run listed exactly 47; `db push` applied 47 (exit 0); history 47 (`20260420164527..20260915224603`); 34 public tables; no 41B.1A object; nine-section baseline diff against Project 1 `02-baseline-catalogue.md` **EMPTY** (289/5/25/35/34/114/141/86/34) | `01a`–`01h` |
| C1.2 | users A `f5d043b9-…`, B `1d9fc1ea-…`, C `de626f6c-…` (`@example.invalid`, confirmed, genuine password sign-in HTTP 200 with matching session user id and role `authenticated`); 21 legacy rows in the C1.2 distribution with the same deterministic row ids; structure diff against the Project 2 baseline EMPTY | `02a`–`02e` |
| C1.4 | forward `e6ad0bc8…` exit 0 in 1.07 s, one expected trigger-skip NOTICE; `pregnancy_episodes` 0 rows; 13 FKs NOT VALID RESTRICT; 13 link indexes; babies key; open unique index; 3 CHECKs; trigger; RLS; 4 policies; ACL `authenticated=r`, anon/PUBLIC SELECT false; fixture 21; history 47 | `04a`, `04b` |
| C1.5 | post-forward catalogue diff against Project 1 `11-c1-5-post-forward-catalogue.md` **EMPTY** in all nine sections (functions by prosrc and functiondef) | `05a`, `05b` |
| C1.7 | validate `8645fd67…` exit 0 in 1.01 s, 13 `ALTER TABLE`; 13/13 validated, RESTRICT; the two pre-existing account FKs remain the only unvalidated constraints; catalogue diff against the Project 1 validated reference **EMPTY** | `07a`–`07d` |
| ★ I | episode fixture E-A1 (A, active) / E-B1 (B, given_birth) with Project 2 user ids; 26 rollback-only cases over all 13 relationships: 13 same-user accepted and read back, 13 cross-user rejected with SQLSTATE 23503 naming the relationship FK; 0 unexpected | `08a`, `09a`, `09b` |
| ★ J | 7/7: one active (count 1); second active 23505 on `pregnancy_episodes_one_open_per_user_idx`; active + paused 23505; single-column `removed_at` update; removed row retained with `status active`, `ended_at` NULL, `outcome_date` NULL; A open count 0; new active accepted; rollback-only | `10a`, `10b` |
| ★ H | PostgREST on `https://dlftnirrnirlkhxpofoq.supabase.co` with a genuine JWT from signing in Project 2 user A (session user id = Project 2 A): H-1 200 only `…ea01`; H-2 200 `[]`; H-3/H-4/H-5 403 code 42501; E-A1 unchanged. psql as `authenticated` with both JWT claim GUCs = Project 2 A (`auth.uid()` = A, `row_security = on`): only E-A1, B filter 0, three SQLSTATE 42501. Channels agree. No secret stored | `11a`, `11b` |
| R1 | guards 2/0/0/0/0 before; PRE snapshot; frozen rollback `0d008955…` → `ROLLBACK REFUSED: public.pregnancy_episodes holds 2 row(s). This file never destroys history.`, exit 3, 0 statements after the refusal; POST snapshot from a fresh session; POST-vs-PRE **EMPTY**; guards unchanged | `13a`–`13f` |
| C1.14 | explicit cleanup transaction: links/pointer 0 touched, fixture episodes deleted 2, scratch none; section K set all zero (17 checks); legacy fixture 21; foundation still installed; pre-C1.15 snapshot equals the post-validation snapshot | `14a`–`14d` |
| C1.15 | rollback `0d008955…` exit 0 in 8.0 s (wall clock including connection), 0 ERROR/WARNING/NOTICE, no refusal; fresh session: every 41B.1A object class absent, scratch 0, 34 public tables, legacy constraints 12/12, baby indexes 2/2, 25 functions, 35 triggers, 114 policies; legacy fixture 21 with the same ids; users 3; history 47; marker intact; post-rollback catalogue **EMPTY** against Project 2's own baseline and **EMPTY** against Project 1 `02-baseline-catalogue.md` | `15a`–`15f` |

Cross-project matrix: `23-p2-reproducibility-matrix.md` — every row identical.

## Harness notes (recorded for completeness)

Three local, non-database mishaps occurred and were corrected before any affected step ran: the API-key capture initially included the wrapper's echo line ahead of the JSON (stripped before use; no user was created by the failed attempt); a dry-run gate miscounted a JSON summary line as a 48th migration (nothing was pushed by that attempt); and a secondary verification snippet crashed on the run-1 id file's shape (the Project 2 ids are visibly distinct from Project 1's: none reused). The C1.15 gate also tripped on the driver's trailing grep for a refusal line that was correctly absent; the rollback had already exited 0 and verification continued.

## Final state and safety

Project 2: foundation absent, legacy 21, users 3 (0 non-synthetic), history 47, marker `dlftnirrnirlkhxpofoq / 41B.1A-C1-run2`, scratch 0, idle 0, locks 0. Project 1: not connected to, not modified (its wrappers were not invoked; the Project 2 wrappers refuse its host). Production: not accessed. Customer data: none. Secrets: none in evidence (fail-closed credential-value scan on the work directory and on the staged additions).

## PASS criteria

1 Project 2 identity exact: PASS. 2 independently created: PASS. 3 no non-synthetic users: PASS. 4 same 47 migrations replay: PASS. 5 baseline equals Project 1 C1.1: PASS. 6 three Project 2 users: PASS. 7 21-row fixture: PASS. 8 forward exit 0: PASS. 9 post-forward equals Project 1 C1.5: PASS. 10 validate exit 0: PASS. 11 13 FKs validated as in Project 1: PASS. 12 ★ I: PASS. 13 ★ J: PASS. 14 ★ H with genuine Project 2 JWT: PASS. 15 psql agrees: PASS. 16 no Project 1 JWT/ids reused: PASS. 17 R1 fires: PASS. 18 R1 empty POST-vs-PRE: PASS. 19 safe state: PASS. 20 rollback exit 0: PASS. 21 post-rollback equals own baseline: PASS. 22 cross-project baselines agree: PASS. 23 fixture/users survive: PASS. 24 history 47: PASS. 25 no scratch/lock/idle: PASS. 26 Project 1 not mutated: PASS. 27 production untouched: PASS. 28 evidence secret-free: PASS.
