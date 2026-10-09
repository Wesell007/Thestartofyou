# N10.3A — Candidate E local implementation record

## Status

**Current status: N10.3A = COMPLETE + M3 SECURITY PATCH; hosted verification done in N10.3B = CLOSED / PASS / RETIRED.**

*Originally recorded 9 October 2026 (Claude Code): N10.3A = LOCAL IMPLEMENTATION COMPLETE / HOSTED VERIFICATION PENDING.*

| Item | State |
|---|---|
| N10 | OPEN |
| N10.3B (hosted rehearsal) | **CLOSED / PASS / RETIRED** (9 October 2026) on `toqeefrwnsjuhjmobodg` — PASS WITH DOCUMENTED D15 CDN/BROWSER CACHE RESIDUAL and SUPABASE PG_NET PLATFORM RESIDUAL; §11 HOLD raised the M3 patch below; a later HOLD for the CDN finding was resolved by owner classification (architecture §8.3 G–K, §26). Evidence `docs/strategy/evidence/n10-3b-hosted-candidate-e/` |
| N10.3A security patch (M3) | COMPLETE; hosted proof PASS in N10.3B |
| Candidate E hosted-runtime proven | YES |
| N10.3B infrastructure | RETIRED — disposable rehearsal infrastructure retired after the CLOSED/PASS evidence push (owner-confirmed project deletion and PAT revocation; evidence 21) |
| 30-day retention | technically proven (functional rehearsal) / legally unapproved (D14) |
| Production accessed | NO |
| Hosted rehearsal project | YES — disposable N10.3B project created, used, then retired |
| Remote Supabase accessed | YES — disposable N10.3B rehearsal only |
| Migrations applied remotely | YES — disposable N10.3B rehearsal only (49, then M3 = 50) |
| Functions deployed | YES — disposable N10.3B rehearsal only (`delete-account`, `account-deletion-worker`) |
| Production modified | NO |
| D14 (human privacy/legal review) | OPEN; production release gate |
| Operator-alert destination | none; production activation blocker |
| 41B.1A applied to production | NO |
| 41B.1B | NOT STARTED / NOT AUTHORISED |

Implements the frozen contract `docs/strategy/n10-candidate-e-account-first-deletion-architecture.md` (N10.2 + N10.2A, H1 and H2 resolved). No frozen invariant was found impossible, so the contract was not reinterpreted. One refinement that the contract explicitly allows was used: D9's "narrower function-only surface". The worker role has no table privileges at all and works only through hardened private functions.

## What was built

| Area | Files | Notes |
|---|---|---|
| **M1** foundation | `supabase/migrations/20261009055319_n10_account_deletion_foundation.sql` (created with `supabase migration new`) | details below |
| **M2** schedule | `supabase/migrations/20261009055322_n10_account_deletion_worker_schedule.sql` | details below |
| Bucket | `supabase/config.toml` `[storage.buckets.first-year-memories] public = false` | the official config mechanism; hosted activation only through `supabase seed buckets` (Storage API) at an approved step. No Storage SQL |
| Shared logic | `supabase/functions/_shared/accountDeletion.ts` | details below |
| Runtime wiring | `supabase/functions/_shared/accountDeletionRuntime.ts` | `npm:postgres@3.4.5` (`prepare: false`, one short-lived connection) through `N10_DB_URL` only, which must be the dedicated role, else fail closed. `npm:@supabase/supabase-js@2.49.4` admin client with no user session. Exact pins |
| `delete-account` | rewritten | the Storage-first sweep was removed; validate → caller via the caller's token (410 if the account no longer exists) → `runDeleteAccount`; fails closed (503) before anything durable if the token window or the dedicated database URL is missing or invalid |
| `account-deletion-worker` | new; `verify_jwt = true` plus a `service_role` claim check (the `process-email-queue` pattern) | claims with SKIP LOCKED, 5-minute leases, processes `requested` / `auth_deleted` / `awaiting_final_sweep` / `purge_attention`; never auto-processes `auth_attention`; retention cleanup only when configured |
| Caller | `src/pages/AccountSettings.tsx`, `src/lib/accountDeletion.ts` | details below |

**M1 foundation** contains:

- the non-exposed `private` schema;
- `private.account_deletion_requests` with the frozen columns only, no FK, all frozen CHECKs (including the H1 floor `final_sweep_after ≥ auth_deleted_at + 1 h 15 m` and the strict completed/anonymised CHECKs), the one-active unique index and the claim index; RLS on; no grants to PUBLIC, anon, authenticated, service_role or the worker;
- the `account_deletion_worker` LOGIN role, with no SUPERUSER, CREATEDB, CREATEROLE, REPLICATION or BYPASSRLS, and with no password in the file; the migration fails if a pre-existing role has broader attributes;
- the INVOKER transition-guard trigger (insert, update and delete);
- the definer helpers `account_media_access_allowed()`, `auth_user_exists(uuid)`, `account_media_canonical(uuid, int)` and `account_media_anomaly_count(uuid)`;
- the function-only state surface `n10_open_request`, `n10_claim_due`, `n10_release_lease`, `n10_record_failure`, `n10_confirm_auth_deleted`, `n10_record_purge` and `n10_cleanup_completed` (plus the internal `n10_lock_leased` and `n10_retry_delay`, which have no grants);
- all functions with `search_path = ''`, owner `postgres`, and EXECUTE revoked from PUBLIC, anon, authenticated and service_role; `authenticated` may execute only the guard, and the worker only its 10 functions;
- the 8 media Storage policies replaced by guarded `TO authenticated` policies; UPDATE has both USING and WITH CHECK.

**M2 schedule:** pg_cron `n10-account-deletion-worker` every minute, using `net.http_post` and Vault secret **names** `n10_account_deletion_worker_url` / `n10_account_deletion_worker_service_key`. It is a no-op while either secret is missing, and no values are committed.

**Shared logic** (pure TypeScript with injected adapters):

- constants and states;
- token-window fail-closed reader (`N10_VERIFIED_TOKEN_WINDOW_SECONDS` plus the provenance `N10_TOKEN_WINDOW_VERIFICATION`);
- the H1 formula mirror;
- dedicated-role URL check;
- rule A ownership;
- Auth error classification;
- the H2 response map;
- purge pass (re-checks `auth_user_exists` before every pass; batches ≤ 1,000; no offset; a rule-A filter as defence in depth);
- `runDeleteAccount`, `processClaimed`, `runWorker`;
- a provider-neutral alert hook that logs `n10_operator_notification_required`.

**Caller** (`AccountSettings.tsx`, `accountDeletion.ts`):

- 200, 202 and 410: local sign-out, query-cache clear, redirect, truthful toast;
- a known 5xx: "Nothing has been deleted";
- no HTTP status (a network failure): unknown, with no claim either way;
- the repeat-click guard is retained.

The six signing files (10 calls) are unchanged: new signing is denied by the guarded SELECT policy (D15).

**Defect found and fixed during N10.3A.** With an invalid token window, the first worker version released the lease and re-claimed the same row in a loop until its budget ran out. It now records a durable `config` failure (D4 backoff, then escalation with an alert), and `runWorker` never processes a request twice in one run.

## Checks run (local only)

| Check | Result |
|---|---|
| N10 database contract (`n10AccountDeletionDb.test.ts`): the **real M1 executed in PGlite** (PostgreSQL 17, WASM, in-process) against a minimal stand-in for Supabase's auth/storage schemas and roles, with the historical media policies extracted from the repository migrations | 26/26 |
| Mutation check: the live-account clause removed from the guard | exactly the 2 stale-token tests fail; then restored byte-identically |
| N10 orchestration (`n10AccountDeletionFlow.test.ts`): the shared module on the real PGlite database as `account_deletion_worker`, with fake Auth/Storage adapters that record any E1 violation | 13/13; E1 violations 0 |
| N10 pure logic (`n10AccountDeletionLogic.test.ts`) | 30/30 |
| N10 static contracts (`n10AccountDeletionContract.test.ts`) | 17/17 |
| AD-1 Layer 1 (`accountDeletionInvariant.test.ts`), which parses all migrations including M1 and M2 | 30/30 |
| 41B.1A static suite | 47/47 |
| Frozen 41B.1A hashes | `e6ad0bc8…`, `8645fd67…`, `0d008955…` unchanged |
| Full suite (final run) | **1,814 / 1,816.** The only failures are the two known Windows-only tests (`companionEntryRemainder` backslash path, `canonicalBreadcrumbs` CRLF), which fail identically on unchanged HEAD. An earlier run also showed the two intermittent phase 34H IVF tests failing under load; they pass in isolation (26/26) and passed in the final run |
| Typecheck | PASS |
| Lint `--max-warnings=0` | PASS |
| Build | PASS (sitemap restored) |
| Local Supabase stack | not available: no Docker |
| Supabase security/performance advisors | not run (need a Supabase stack) |

**LOCAL SUPABASE RUNTIME VERIFICATION = DEFERRED TO N10.3B HOSTED REHEARSAL.** PGlite proves SQL semantics, grants, RLS evaluation and the state machine. It does not prove the hosted Storage API, GoTrue, Supavisor, pg_cron, pg_net or Vault.

## Invariant test matrix

| Invariant | Test(s) | Local result | Hosted proof still needed |
|---|---|---|---|
| E1 no removal before Auth absence confirmed | Db "Auth deletion cannot be confirmed while…", "purge is forbidden while the Auth user exists"; Flow (E1 violation counter = 0 in every scenario); Contract "Storage removals happen only inside purgePass, after an auth_user_exists re-check" | PASS | real Storage API + GoTrue (N10.3B) |
| E2 pending denies all four commands | Db "a pending request denies SELECT … INSERT, UPDATE and DELETE" | PASS (database RLS) | Storage API (N10.3B) |
| E3 deleted identity denied with a live old token | Db "a stale token after Auth deletion is denied…" + mutation check | PASS (database RLS) | repeat of N10.1 R4 expecting denial (N10.3B) |
| E4 purge idempotent | Flow "partial Storage removal … worker finishes", "budget exhausted … worker completes" | PASS | — |
| E5 no 1,000 ceiling | Flow "1,001+ files" (1,005 objects); Db limit validation | PASS | volume on hosted Storage (N10.3B) |
| E6 no fixed depth | Flow deep paths (8 segments); Db canonical deep path | PASS | — |
| E7 Storage API only; no Storage SQL mutation | Contract "never mutate Storage data", "no N10 code … mutates Storage tables"; Db worker role has no Storage grants | PASS | — |
| E8 failed Auth leaves media intact | Flow "Auth 500", "permanent pre-Auth failure" | PASS (rows; bytes not modelled locally) | byte identity on hosted Storage (N10.3B) |
| E9 failed purge: account deleted, retry scheduled | Flow "partial Storage removal" (`storage_partial`, then worker retry) | PASS | — |
| E10 COMPLETED needs a verified-empty sweep at or after `final_sweep_after` | Db re-arm/window test, early-completion rejection, final-sweep test; Flow final sweep | PASS | real elapsed window (N10.3B) |
| E11 no COMPLETED with an unresolved anomaly | Db anomaly → `purge_attention`; Flow anomaly scenario | PASS | — |
| E12 no new signed URL once pending | Db SELECT denied while pending (signing needs SELECT) | PASS (database) | Storage signing endpoint behaviour (N10.3B) |
| E13 dedicated least-privilege role | Db role attributes / no grants; Logic `isDedicatedRoleUrl`; Contract no `SUPABASE_DB_URL` | PASS | pooler login as `account_deletion_worker.<ref>` (N10.3B) |
| E14 window never shorter than the verified lifetime; fail closed | Logic token-window cases; Db 22023 on missing or out-of-range W; Flow worker fail-closed | PASS (fail-closed paths) | verification against the project's real JWT expiry (N10.3B) |
| E15 `user_id` only while needed, nulled at COMPLETED | Db final-sweep completion (`user_id` NULL, `anonymised_at`); CHECKs | PASS | — |
| E16 row survives Auth deletion; no FK | Db no FK; Flow rows persist after Auth delete | PASS | — |
| E17 admin calls never carry a user session | Contract admin-client checks | PASS (static) | — |
| E18 only rule A purged; anomalies never auto-deleted | Db canonical exactness; Logic `isCanonicalMediaPath`; Flow anomaly kept | PASS | — |
| E19 one active request per account | Db "one active request…"; Flow duplicate request | PASS | true concurrency (N10.3B) |
| E20 sweep formula and floor | Db H1 formula (3,600 → 4,500 s; 7,200 → 8,100 s; anchored on `auth_deleted_at`, not `requested_at`); CHECK floor; Contract formula | PASS | — |
| E21 other users unchanged | Db other user's objects intact; Flow control user intact | PASS | — |
| E22 definer helpers hardened | Db SECURITY DEFINER / `search_path` / EXECUTE matrix | PASS | Supabase security advisors (N10.3B) |
| E23 cancellation boundary; never automatic | Db cancellation test; no code path writes `cancelled` | PASS | — |
| E24 counts and ids only, no filenames or PII in records or logs | Db `anomaly_count` only; Contract E24 log-field check (≥ 10 log calls matched) | PASS | — |
| E25 G3/AD-1 unchanged | AD-1 30/30; 41B.1A 47/47; frozen hashes | PASS | — |

## Deferred to N10.3B (hosted rehearsal) or later

*All items below were exercised in N10.3B (see the evidence package). D14 and the operator-alert destination remain open production activation blockers.*

- **Hosted runtime:** Storage API, GoTrue, Supavisor, pg_cron, pg_net and Vault behaviour; applying M1/M2 on a fresh hosted project; Supabase security/performance advisors.
- **Dedicated role:**
  - pooler login (`account_deletion_worker.<ref>`) with an out-of-band password;
  - whether `CREATE ROLE … NOSUPERUSER … NOBYPASSRLS` and the definer helpers' reads of `auth.users` / `storage.objects` behave on hosted Supabase as in PGlite.
- **W verification path:** how `N10_VERIFIED_TOKEN_WINDOW_SECONDS` / `N10_TOKEN_WINDOW_VERIFICATION` are set against the real Auth JWT expiry (dashboard or Management API) and fail closed.
- **Signed URLs:** whether signing is denied when pending or deleted, and that a pre-issued URL stops serving after purge (D15).
- **Bucket versioning:** confirm both buckets are unversioned, or that no recoverable version remains.
- **Cron/Vault:** that M2 schedules on a hosted project and is a no-op without secrets.
- **Deno type-check and lock:** no Deno runtime locally, so `deno check` and lockfile generation happen with the CLI bundling/deploy in N10.3B. Imports are exactly pinned in source.
- **Residual noted for review:** the worker role inherits PostgreSQL's default PUBLIC EXECUTE on existing `public` functions (Supabase defaults). It has no table privileges, and those RPCs gate on `auth.uid()`; to be reviewed by advisors in N10.3B.
  - **Resolved by N10.3B §11 + M3 (see below):** the hosted inventory found no callable non-N10 SECURITY DEFINER function and only SECURITY INVOKER trigger/pure functions in `public`, but did find that hosted pg_net grants its queue and schema to PUBLIC.
- **D14** human privacy/legal review (production release gate), and an **operator-alert destination** (production activation blocker).

## Security patch M3 — invocation-only scheduler credential (9 October 2026)

N10.3B §11 (hosted, `toqeefrwnsjuhjmobodg`) found that hosted pg_net grants `net.http_request_queue`, `net._http_response` and schema `net` to PUBLIC (owned by `supabase_admin`; `postgres` cannot revoke). M2 put the service-role JWT into that queue, so the dedicated worker credential could have been escalated. The owner rejected that design; the full decision is in the architecture document §25.

| Change | Where |
|---|---|
| M3 replaces the cron job: URL + `Content-Type` + `X-N10-Worker-Token` (Vault `n10_account_deletion_worker_invoke_secret`) + `{}`; fails if the installed command references the service-role name, `Authorization` or `apikey`. M1 and M2 unchanged. | `supabase/migrations/20261009091430_n10_worker_invocation_hardening.sql` |
| `account-deletion-worker` `verify_jwt = false`; `delete-account` stays `true` | `supabase/config.toml` |
| `handleWorkerInvocation`: POST only → invocation secret (fail closed if missing/weak, timing-resistant compare, generic 401) → body must be empty or `{}` (else 400) → only then open the runtime; responds `{"ok":true}` or a generic error. `isServiceRoleBearer` removed. | `supabase/functions/_shared/accountDeletion.ts`, `supabase/functions/account-deletion-worker/index.ts` |
| Tests (21): boundary (method, missing/wrong/JWT-shaped tokens, missing/weak secret, caller targets, generic errors, nothing opened before auth); real M1 in PGlite (no request creation or victim selection, minimal response, duplicate/concurrent calls → one Auth delete); real M2→M3 against stand-in cron/Vault/pg_net (only URL, Content-Type, token and `{}` are sent; nothing without the invoke secret; no service-role or `sb_secret_` value); static contracts (config, M1/M2 hashes, no hardcoded credentials, N10_DB_URL only). Mutation checks (always-true comparison; bearer header re-added to M3) made the suite fail. | `src/test/n10WorkerInvocation.test.ts` |

Platform residual (accepted only under the six conditions in architecture §25): any login role can still queue outbound HTTP and read pg_net rows; no privileged credential is ever placed there. Deployment additions for N10.3B: Vault `n10_account_deletion_worker_invoke_secret` and function secret `N10_WORKER_INVOKE_SECRET` (same value, out-of-band); never populate `n10_account_deletion_worker_service_key`.

## 41B

The RI/account-deletion database gate remains CLOSED / PASS and is not reopened. N10 is not a documented prerequisite for 41B.1B, and 41B.1B remains NOT AUTHORISED. Frozen 41B.1A files are unchanged.
