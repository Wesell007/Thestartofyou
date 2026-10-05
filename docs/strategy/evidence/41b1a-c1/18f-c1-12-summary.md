# 41B.1A-C1 — 18f C1.12 grant and RLS interaction proof (Project 1)

Result: **C1.12 PASS — grant-vs-RLS interaction proven: authenticated retains SELECT-only table privilege; INSERT/UPDATE/DELETE owner policies do not confer missing privileges, and all three direct writes are denied with PostgreSQL 42501 on PostgREST and psql.** Executed 2026-10-05T21:46Z to 21:48Z (UTC) against `tsoy-41b1a-c1-run1` (`wwtcnbjhttjtklpxhrkd`). No grant, policy, RLS state or schema was changed; the service-role key was not used; the rollback migration has NOT been run; C1.13 has NOT started.

## Authoritative procedure

Plan stage C1.12: capture the exact outcome for authenticated INSERT, UPDATE and DELETE on both channels (PostgREST HTTP 401/403 carrying PostgreSQL error 42501; psql `permission denied for table pregnancy_episodes`), demonstrating that the INSERT, UPDATE and DELETE policies do not confer a privilege the role lacks; record the ACL from `pg_class.relacl` and `information_schema.role_table_grants` alongside; record why four policies exist. This stage re-executes the checks directly rather than renaming the C1.11 results (which it also agrees with: C1.11 H-3/H-4/H-5 were 403/42501 on PostgREST and 42501 on psql). Evidence names follow this directory's numbering (`18*`).

## Pre-state and privilege inspection (read-only, `18d-c1-12-prestate.log`, 21:46:22Z, psql as owner)

Marker `wwtcnbjhttjtklpxhrkd / 41B.1A-C1-run1`; history 47; users 3, non-synthetic 0; episodes 2 (E-A1 owner A, `active`, expected_count 1; E-B1 owner B, `given_birth`, expected_count 2; both updated_at 20:01:11Z); ownership FKs 13, validated 13; links 0; pointers 0; idle 0; ACCESS EXCLUSIVE 0; scratch 0. RLS `t`, forced `f`.

| Source | Result |
|---|---|
| `pg_class.relacl` | `{postgres=arwdDxtm/postgres,service_role=arwdDxtm/postgres,authenticated=r/postgres}` (three items: owner all; `service_role` all; `authenticated` `r` = SELECT only; no `anon`, no PUBLIC item) |
| `information_schema.role_table_grants` | `authenticated`: SELECT (not grantable); `service_role`: DELETE, INSERT, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE; `postgres`: all seven (grantable); no `anon` row |
| `has_table_privilege(role, 'public.pregnancy_episodes', …)` | `authenticated`: SELECT **t**, INSERT **f**, UPDATE **f**, DELETE **f**, TRUNCATE f; `anon`: f/f/f/f/f; PUBLIC SELECT f; `service_role` and `postgres`: all t |
| policies (4) | `pregnancy_episodes_select_own` SELECT USING `(auth.uid() = user_id)`; `pregnancy_episodes_insert_own` INSERT WITH CHECK `(auth.uid() = user_id)`; `pregnancy_episodes_update_own` UPDATE USING and WITH CHECK `(auth.uid() = user_id)`; `pregnancy_episodes_delete_own` DELETE USING `(auth.uid() = user_id)`; all PERMISSIVE, role `{authenticated}` |

## Authoritative PostgREST channel (`18a-c1-12-postgrest.json`, harness `18e-c1-12-postgrest-harness.py`)

Genuine sign-in of synthetic user A through Supabase Auth (password grant, HTTP 200, user `b09cd318-8f3e-4853-8d97-fc10267b3d69`, role `authenticated`, aud `authenticated`); no token fabricated; password, keys and tokens never printed or stored (the harness asserts no secret string is present before writing the JSON; request headers are never recorded).

| Operation | Request | HTTP | PostgreSQL code | Message |
|---|---|---|---|---|
| SELECT (pre) | `GET /rest/v1/pregnancy_episodes?select=…&order=id` | 200 | — | exactly one row: `…ea01`, user A, `expected_count` 1 |
| INSERT | `POST /rest/v1/pregnancy_episodes` with an otherwise valid non-open row for A (`given_birth`, `ended_at` set, dates valid, `expected_count` 1) | 403 | `42501` | `permission denied for table pregnancy_episodes` |
| UPDATE | `PATCH …?id=eq.<E-A1>` `{expected_count: 2}` (same change as C1.11 H-4) | 403 | `42501` | `permission denied for table pregnancy_episodes` |
| DELETE | `DELETE …?id=eq.<E-A1>` | 403 | `42501` | `permission denied for table pregnancy_episodes` |
| SELECT (post) | same as pre | 200 | — | exactly `…ea01`, row identical to the pre read |
| SELECT B filter | `…&user_id=eq.<B>` | 200 | — | `[]` |
| residue | `…&id=eq.<attempted insert id>` | 200 | — | `[]` |

The denied row was valid in every other respect, so no CHECK, FK, unique-index or RLS condition could be the reason; the failure is the missing table privilege.

## Corroborating psql channel (`18-c1-12-grant-rls-corroboration.log`, `18c-c1-12-grant-rls-corroboration.sql`)

Connection as `postgres`; inside one rollback-only transaction: `set local role authenticated`, both `request.jwt.claim.sub` and `request.jwt.claims` set to A; read-back `current_user = authenticated`, `session_user = postgres`, `auth.uid() = b09cd318-…`, `row_security = on`; `has_table_privilege` evaluated as the switched role: SELECT t, INSERT f, UPDATE f, DELETE f. SELECT (pre) returned only E-A1. INSERT → `ERROR: 42501: permission denied for table pregnancy_episodes`; UPDATE → `42501`, same message; DELETE → `42501`, same message; each rolled back to its savepoint. SELECT (post): only E-A1 with `expected_count` 1; `b_rows_visible = 0`; `residue = 0`; `reset role` owner view: 2 rows, E-A1 `expected_count` 1. Final `ROLLBACK`. 3 ERROR lines, all 42501; 0 other errors. No `row_security = off`, no SECURITY DEFINER, no service_role impersonation.

## Three-operation matrix (`18b-c1-12-grant-rls-matrix.md`)

| Operation | ACL privilege | Policy exists | PostgREST | psql | Reason | PASS |
|---|---|---|---|---|---|---|
| INSERT | NO | YES (`insert_own`) | 403 / 42501 | 42501 | table privilege denied | PASS |
| UPDATE | NO | YES (`update_own`) | 403 / 42501 | 42501 | table privilege denied | PASS |
| DELETE | NO | YES (`delete_own`) | 403 / 42501 | 42501 | table privilege denied | PASS |

Channels agree on all three; neither channel allowed a write; neither reported an RLS policy violation in place of the missing privilege. SELECT remains usable and owner-scoped on both channels (E-A1 visible, E-B1 invisible).

## Why four policies exist (plan C1.12)

The INSERT, UPDATE and DELETE policies are not accidental exposure. They are the row-level rules prepared for the later controlled write architecture: 41B.1C may deliberately grant INSERT and UPDATE under its transition trigger, at which point `insert_own` and `update_own` become the effective owner conditions. At 41B.1A the `authenticated` role holds SELECT only, so `insert_own` is inert because INSERT is not granted, `update_own` is inert because UPDATE is not granted, and `delete_own` is inert because DELETE is not granted; DELETE is never intended to be granted directly. Policy existence does not equal privilege. No future write grant was added in C1.12.

## Post-state (21:48Z psql owner view inside the test; 21:49Z integration, fresh session)

Episodes 2; E-A1 and E-B1 field-for-field identical to the pre-state (`expected_count` 1 and 2, `updated_at` 20:01:11Z); 0 rows with the C1.12 id prefix; legacy fixture 21; links 0; pointers 0; users 3; history 47. Content fingerprint `44bee7ef…` and row-identity fingerprint `a4b7ace9…` identical to every post-state since C1.7: no application-data mutation. 0 idle-in-transaction sessions, 0 ACCESS EXCLUSIVE or SHARE UPDATE EXCLUSIVE locks in `public`, 0 `c1_scratch%` objects.

## Structure

ACL, RLS state (`true/false`), 4 policies and `has_table_privilege` t/f/f/f unchanged after the tests; nine-section catalogue hashes identical to the C1.11 post-state (columns 315\|f0281fd6…, enums 5\|e01eb254…, functions 25\|920ec2f6…, triggers 36\|a4b05c5a…, rls 35\|a02d18c7…, policies 118\|c5a61c1c…, constraints 161\|a67632e1…, indexes 104\|001b4ec0…, grants 35\|0a9026c0…); ownership FKs 13 validated, 13 RESTRICT. Permanent structural diff versus C1.11: **EMPTY**.

## PASS criteria

1 Project 1: PASS. 2 pre-state captured: PASS. 3 authenticated SELECT privilege: PASS. 4 no INSERT privilege: PASS. 5 no UPDATE privilege: PASS. 6 no DELETE privilege: PASS. 7 four policies present: PASS. 8 PostgREST INSERT 42501: PASS. 9 PostgREST UPDATE 42501: PASS. 10 PostgREST DELETE 42501: PASS. 11 message `permission denied for table pregnancy_episodes`: PASS. 12 psql INSERT 42501: PASS. 13 psql UPDATE 42501: PASS. 14 psql DELETE 42501: PASS. 15 channels agree: PASS. 16 SELECT still works under owner RLS: PASS. 17 no residue: PASS. 18 no grant/policy/RLS change: PASS. 19 structural diff empty: PASS. 20 history 47: PASS. 21 no lingering lock/transaction: PASS. 22 production and Project 2 untouched: PASS. 23 evidence secret-free: PASS.

## Safety

Production (`wogepxfipdipogyogced`) accessed NO. Project 2 (`dlftnirrnirlkhxpofoq`) accessed NO. Customer data NO. GRANT/REVOKE issued NO. Policies changed NO. RLS changed NO. Service-role key used NO. Rollback file run NO. C1.13 started NO. Secrets committed NO.
