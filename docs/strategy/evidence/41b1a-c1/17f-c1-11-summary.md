# 41B.1A-C1 — 17f C1.11 RLS matrix (Project 1)

Result: **C1.11 PASS — genuine-JWT PostgREST RLS matrix proven; authenticated users see only their own Pregnancy Episodes, the psql dual-GUC channel agrees, and anon/service-role behaviour matches the approved matrix.** Executed 2026-10-05T20:58Z to 20:59Z (UTC) against `tsoy-41b1a-c1-run1` (`wwtcnbjhttjtklpxhrkd`): PostgREST at the Project 1 endpoint (authoritative) and psql 17.11 on the direct endpoint (corroborating). No policy, grant, RLS state or schema was changed; the rollback migration has NOT been run; C1.12 has NOT started.

## Authoritative procedure

Plan stage C1.11 and section H (rows H-1 to H-9; starred H-1 to H-5 must be proven through PostgREST with a genuine synthetic-user JWT; psql role switching with both claim forms is corroborating only; a disagreement between channels is a STOP; anon through PostgREST with the anon key corroborated by `set local role anon`; service_role through PostgREST with the service-role key used only from the operator's environment). Evidence names follow this directory's numbering (`17*`) rather than the plan's placeholder `13-rls-privilege-matrix.md`.

## Security structure before testing (read-only, `17d-c1-11-prestate.txt`, 20:56:38Z)

RLS enabled, not forced. Exactly four policies, all PERMISSIVE for `authenticated`: `select_own` USING `(auth.uid() = user_id)`, `insert_own` WITH CHECK, `update_own` USING + WITH CHECK, `delete_own` USING. ACL `{postgres=arwdDxtm/postgres,service_role=arwdDxtm/postgres,authenticated=r/postgres}`: `authenticated` SELECT only (no INSERT/UPDATE/DELETE), `service_role` all seven privileges, no `anon` and no PUBLIC entry. Episodes 2 (E-A1 owner A, E-B1 owner B). Marker, history 47, users 3 (0 non-synthetic), legacy fixture 21, validated FKs 13, links 0, pointers 0, idle 0, ACCESS EXCLUSIVE 0, scratch 0. Repository HEAD da9f9d8a, clean.

## Genuine sign-in (Step 4)

Synthetic user A was signed in through Supabase Auth with the password established at C1.2 (`POST /auth/v1/token?grant_type=password`, anon key as `apikey`): HTTP 200, session user id `b09cd318-8f3e-4853-8d97-fc10267b3d69`, role `authenticated`, aud `authenticated`, token type bearer. No JWT was fabricated, hand-signed or reconstructed. The access token, refresh token, password, anon key and service-role key were held only in the harness process (`17e-c1-11-postgrest-harness.py`, which reads the protected local files) and were never printed, logged or written to evidence; `17a-c1-11-postgrest.json` records only status codes, safe bodies, the token length and a 12-character digest prefix, and the harness asserts before writing that no secret string appears in the file.

## Authoritative PostgREST results (`17a-c1-11-postgrest.json`, `17b-c1-11-channel-agreement-matrix.md`)

| H | Actor | Request | Result |
|---|---|---|---|
| H-1 ★ | authenticated A | `GET /rest/v1/pregnancy_episodes?select=id,user_id,status,removed_at&order=id` | 200; exactly one row, `…ea01` owned by A |
| H-2 ★ | authenticated A | same with `&user_id=eq.<B>` | 200; `[]` (and with `&id=eq.<E-B1>`: 200; `[]`) |
| H-3 ★ | authenticated A | `POST /rest/v1/pregnancy_episodes` (non-open row for A) | 403; `code 42501`, `permission denied for table pregnancy_episodes` |
| H-4 ★ | authenticated A | `PATCH …?id=eq.<E-A1>` `{expected_count: 2}` | 403; `code 42501` |
| H-5 ★ | authenticated A | `DELETE …?id=eq.<E-A1>` | 403; `code 42501` |
| H-6 | authenticated A | same as H-1 | 200; only `…ea01` |
| H-7 | anon (anon key, no user JWT) | `GET …` | 401; `code 42501`, `permission denied for table pregnancy_episodes` |
| H-8 | service_role | `GET …` / `POST` temporary row `…ec11` for C / `PATCH` it / `DELETE` it | 200 both rows (`…ea01`, `…eb01`) / 201 / 200 (`expected_count` 3) / 200; final GET shows exactly `…ea01` and `…eb01` |

Owner isolation: positive (A retrieves E-A1) and negative (E-B1 never returned to A, by owner filter or by id) both hold; no cross-owner row was visible at any point. No authenticated write succeeded.

## Corroborating psql channel (`17-c1-11-rls-corroboration.log`, `17c-c1-11-rls-corroboration.sql`)

Connection as `postgres` (H-9: owner SELECT returns both rows). Inside one rollback-only transaction: `set local role authenticated; set_config('request.jwt.claim.sub', '<A>', true); set_config('request.jwt.claims', '{"sub":"<A>","role":"authenticated"}', true)`; read-back `current_user = authenticated`, `session_user = postgres`, `auth.uid() = b09cd318-…` (A), both GUCs = A, `row_security = on`. Then H-1: only `…ea01`; H-2: zero rows, count 0, no error; H-3/H-4/H-5: `ERROR: 42501: permission denied for table pregnancy_episodes` each, rolled back to savepoint, E-A1 unchanged afterwards. `reset role; set local role anon` → H-7: `ERROR: 42501: permission denied for table pregnancy_episodes`. Final `ROLLBACK`. 4 ERROR lines, all 42501; 0 other errors. No `row_security = off`, no SECURITY DEFINER, no owner result presented as RLS evidence.

Channel agreement: H-1, H-2, H-3, H-4, H-5 and H-7 agree exactly between PostgREST and psql; H-6/H-8 are PostgREST rows and H-9 is a psql row by plan. No disagreement, so the STOP condition never triggered.

## Post-state (20:59Z psql; 21:00Z integration)

Episode rows 2; E-A1 and E-B1 unchanged (`expected_count` 1 and 2, `updated_at` 20:01:11Z); 0 rows with the C1.11 id prefix `…ecxx` (the service_role temporary row was deleted through the same administrative path); legacy fixture 21; links 0; pointers 0; users 3; history 47. Content fingerprint `44bee7ef…` and row-identity fingerprint `a4b7ace9…` identical to the C1.7 through C1.10 post-states, so no persistent data mutation. 0 idle-in-transaction sessions, 0 ACCESS EXCLUSIVE or SHARE UPDATE EXCLUSIVE locks in `public`, 0 `c1_scratch%` objects.

## Structure

RLS `true/false` unchanged; 4 policies unchanged; ACL unchanged; nine-section catalogue hashes identical to the C1.10 post-state (columns 315\|f0281fd6…, enums 5\|e01eb254…, functions 25\|920ec2f6…, triggers 36\|a4b05c5a…, rls 35\|a02d18c7…, policies 118\|c5a61c1c…, constraints 161\|a67632e1…, indexes 104\|001b4ec0…, grants 35\|0a9026c0…); ownership FKs 13 validated, 13 RESTRICT. Permanent structural and security diff versus C1.10: **EMPTY**.

## PASS criteria

1 Project 1: PASS. 2 pre-state saved: PASS. 3 genuine A sign-in: PASS. 4 PostgREST used A's genuine JWT: PASS. 5 H-1 to H-5 through PostgREST: PASS. 6 A sees own row: PASS. 7 A cannot see B's row: PASS. 8 no cross-owner row visible: PASS. 9 no authenticated write succeeded: PASS. 10 psql role `authenticated`: PASS. 11 both GUC forms set to A: PASS. 12 `auth.uid()` = A: PASS. 13 channels agree: PASS. 14 H-7 anon on both channels: PASS. 15 H-8 service_role: PASS. 16 no bypass: PASS. 17 no permanent data mutation: PASS. 18 structural/security diff empty: PASS. 19 history 47: PASS. 20 production and Project 2 untouched: PASS. 21 evidence secret-free (harness assertion plus the fail-closed credential-value scan): PASS.

## Safety

Production (`wogepxfipdipogyogced`) accessed NO. Project 2 (`dlftnirrnirlkhxpofoq`) accessed NO. Customer data NO. Policies/grants/RLS changed NO. Rollback file run NO. C1.12 started NO. Secrets committed NO.
