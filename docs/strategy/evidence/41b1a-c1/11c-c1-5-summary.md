# 41B.1A-C1 — 11c C1.5 post-forward catalogue verification (Project 1)

Result: **C1.5 PASS — post-forward catalogue matches C1.1 baseline plus only the approved 41B.1A foundation.** Read-only stage executed 2026-10-05T19:21Z to 19:29Z (UTC) on `tsoy-41b1a-c1-run1` (`wwtcnbjhttjtklpxhrkd`), PostgreSQL 17.11.0.002. No DDL, no DML, no schema change. The validate file and the rollback file have NOT been run; C1.6 has NOT started. 41B.1A is NOT applied to production.

## Identity (19:21:55Z integration, 19:28:31Z psql)

Marker `wwtcnbjhttjtklpxhrkd / 41B.1A-C1-run1`; `current_database`/`current_user` `postgres`/`postgres`; 3 Auth users, 0 non-synthetic; 21 fixture rows; history 47 (`20260420164527..20260915224603`), none outside the baseline range; `pregnancy_episodes` present with 0 rows; 0 ACCESS EXCLUSIVE locks in `public`; 0 idle-in-transaction sessions; 0 `c1_scratch%` objects. Repository HEAD 92143c6b, clean; frozen forward hash `e6ad0bc82b245beb03131023bb9ce122a451f40c2fe9b75cd43f047b674585cb` unchanged; scratch clone untouched.

## Catalogue capture

`11-c1-5-post-forward-catalogue.md`: nine sections captured with the same queries, ordering and line formats as `02-baseline-catalogue.md`, through two channels (psql wrapper, read-only, direct endpoint; and the integration, three minutes earlier) with identical counts and hashes.

| Section | C1.1 baseline | C1.5 post-forward | Delta |
|---|---|---|---|
| columns | 289 \| `089827c5…` | 315 \| `f0281fd6…` | +26 |
| enums | 5 \| `e01eb254…` | 5 \| `e01eb254…` | 0 (identical) |
| functions | 25 \| `920ec2f6…` | 25 \| `920ec2f6…` | 0 (identical; prosrc method also identical, `c4a01c43…`) |
| triggers | 35 \| `c76db905…` | 36 \| `a4b05c5a…` | +1 |
| rls | 34 \| `5c82068f…` | 35 \| `a02d18c7…` | +1 |
| policies | 114 \| `e87cd992…` | 118 \| `c5a61c1c…` | +4 |
| constraints | 141 \| `ece1b4e9…` | 161 \| `9c67159c…` | +20 |
| indexes | 86 \| `b844916e…` | 104 \| `001b4ec0…` | +18 |
| grants | 34 \| `22bb3e64…` | 35 \| `0a9026c0…` | +1 |

## Diff and classification (`11a-c1-5-catalogue-diff-classification.md`, `11a-c1-5-catalogue-diff.json`)

- Removed lines: 0 in every section. Every baseline line is present unchanged.
- Added lines: 52, every one EXPECTED 41B.1A. Columns 26 = 13 `pregnancy_episodes` columns + `journeys.current_pregnancy_episode_id` + 12 `pregnancy_episode_id`. Constraints 20 = 6 on `pregnancy_episodes` + 13 composite `… REFERENCES pregnancy_episodes(id, user_id) ON DELETE RESTRICT NOT VALID` + `babies_id_user_id_key`. Indexes 18 = 4 on `pregnancy_episodes` + 13 link indexes + `babies_id_user_id_key`. Trigger 1, RLS 1, policies 4, grant row 1.
- UNEXPECTED: NONE. PRE-EXISTING ALLOWED objects (`c1_rehearsal_marker`, the 41B.0-R §14 repo/live drift) are identical in both captures and therefore absent from the diff.
- Enums unchanged (no `removed` value; `pregnancy_journey_status` = `active,given_birth,no_longer_pregnant,pregnancy_loss,paused`). Functions unchanged under both hashing methods; `set_updated_at` functiondef md5 `79bdd57c…` as in C1.1.

## Targeted queries (`11b-c1-5-targeted-queries.md`, raw `11b-c1-5-targeted-queries.txt`)

Q1 (G-1) PASS; Q2 (G-2) PASS; Q3 (G-3) PASS; Q4 (G-4) PASS; Q5 (G-5) PASS; Q6 (G-6) PASS; Q7 (G-7) PASS; Q8 (G-8) PASS; Q9 (G-9) PASS; Q10 (G-10) PASS; Q11 (G-11) PASS; Q12 (G-12) PASS. Q-ABSENT reports the table present and 13 link columns, which is the required post-forward state.

## Ownership foundation

13 composite ownership FKs, all `(…, user_id) REFERENCES pregnancy_episodes(id, user_id)`, all `confdeltype = r` (RESTRICT), all `convalidated = false` (left for C1.7); 13 link columns, all nullable; 13 link indexes; `babies_id_user_id_key UNIQUE (id, user_id)` present; `pregnancy_episodes_id_user_id_key UNIQUE (id, user_id)` present as the referenced key.

## Security structure

RLS enabled, not forced; exactly 4 permissive policies for `authenticated`, each `(auth.uid() = user_id)`; ACL `{postgres=arwdDxtm/postgres,service_role=arwdDxtm/postgres,authenticated=r/postgres}`: `authenticated` SELECT only, `service_role` all, no `anon`, no PUBLIC. Structural facts only; behavioural RLS proof remains for C1.8–C1.12 through PostgREST per the plan.

## Data neutrality

0 `pregnancy_episodes` rows; 0 non-null journey pointers; 0 non-null link values; 21 fixture rows unchanged (max `updated_at` 2026-10-04T00:24:28Z, the C1.2 insert time); 3 synthetic users, 0 non-synthetic.

## Bookkeeping

History 47/47, range unchanged; no manual 41B.1A record; no `migration repair`; pending file not moved into `supabase/migrations`; frozen SQL untouched (hash gate at every psql `-f`).

## Safety

Production (`wogepxfipdipogyogced`) accessed NO. Project 2 (`dlftnirrnirlkhxpofoq`) accessed NO. Customer data NO. Schema modified NO. Validate file run NO. Rollback file run NO. C1.6 started NO. Secrets in evidence NO (fail-closed value-pattern scan before commit).

## PASS criteria

1 identity Project 1: PASS. 2 frozen hash unchanged: PASS. 3 read-only (no DDL/DML): PASS. 4 nine sections captured in baseline format: PASS. 5 two channels agree: PASS. 6 zero removed lines: PASS. 7 every added line classified EXPECTED 41B.1A: PASS. 8 `pregnancy_episodes` 13 columns as designed: PASS. 9 6 constraints: PASS. 10 4 indexes incl. open-episode predicate with `removed_at IS NULL`: PASS. 11 trigger: PASS. 12 RLS + 4 policies: PASS. 13 grants (authenticated SELECT only, service_role all, no anon/PUBLIC): PASS. 14 13 RESTRICT FKs all NOT VALID: PASS. 15 13 link columns + 13 link indexes + `babies_id_user_id_key`: PASS. 16 legacy constraints/indexes unchanged: PASS. 17 data neutrality (0 episodes, 0 pointers/links, 21 rows, 3 users): PASS. 18 history 47, no manual record, Project 2/production untouched, no secret: PASS.

## Evidence files added

`11-c1-5-post-forward-catalogue.md`, `11a-c1-5-catalogue-diff-classification.md`, `11a-c1-5-catalogue-diff.json`, `11b-c1-5-targeted-queries.md`, `11b-c1-5-targeted-queries.txt`, `11c-c1-5-summary.md`, `11d-c1-5-capture.sql`. Updated: `00-identity.md` status line, `roadmap.md`.
