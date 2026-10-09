# N10.3B — Hosted Candidate E rehearsal — summary

**Verdict: N10.3B = HOLD — OWNER CLASSIFICATION REQUIRED for one D15-class finding (authenticated-download CDN residual, 08). Every other required property was proven on hosted Supabase.** Evidence committed locally only; not pushed. Project, PAT and `.n103b` retained for owner review.

## Environment

| | |
|---|---|
| Project | `tsoy-n10-3b-rehearsal` — `toqeefrwnsjuhjmobodg` — WesellProducts — eu-west-2 — PostgreSQL 17.11.0.003 (00) |
| Source | `0007797c` (49 migrations) → security patch `2dcab66f` (M3, worker, tests, docs; pushed) |
| Guard | fresh `.n103b`, 60/60 offline self-test (01) |
| Production accessed | **NO** |

## What happened

1. 49 migrations applied unmodified; catalogue matched the frozen contract (02, 04). `first-year-memories` created through the Storage API because `seed buckets` needs secret-key reveal (owner-closed deviation).
2. **§11 HOLD:** hosted pg_net grants its request queue to PUBLIC and `postgres` cannot revoke it, so M2's service-role scheduler credential was exposed to every login role, including the worker (05).
3. **Owner decision → N10.3A security patch M3** (pushed `0007797c..2dcab66f`): invocation-only scheduler secret, `verify_jwt = false` worker with in-function timing-resistant auth, no caller-selected target, `{"ok":true}` responses. Hosted proof A–F PASS → §11 **PASS WITH DOCUMENTED SUPABASE PG_NET PLATFORM RESIDUAL** (no privilege escalation through the N10 scheduler credential).
4. Remaining rehearsal executed after the predictions commit `24df06d5` (09:37:14Z; first destructive action 09:41:59Z).

## PASS criteria

| # | Criterion | Result |
|---|---|---|
| 1 | Correct disposable identity | PASS (00) |
| 2 | Production zero access | PASS |
| 3 | Guard | PASS 60/60 (01) |
| 4 | All normal migrations applied cleanly | PASS — 49, then M3 → 50 (02) |
| 5 | No 41B.1A | PASS |
| 6 | M1 hosted catalogue | PASS (04) |
| 7 | Worker effective-privilege gate | PASS WITH DOCUMENTED PG_NET PLATFORM RESIDUAL after M3 (05) |
| 8 | Dedicated role via real pooler | PASS — Supavisor `aws-0-eu-west-2…:6543`, `account_deletion_worker.<ref>` (06) |
| 9 | No direct Auth/Storage/app access | PASS — 24 denials, identical before/after M3 (06) |
| 10 | Real W verified | PASS — `jwt_exp = 3600` via Management API (07) |
| 11 | Edge Functions deploy and execute | PASS (02) |
| 12 | Worker auth boundary | PASS — 18/18 (05) |
| 13 | Pending blocks SELECT/INSERT/UPDATE/DELETE/signing | PASS at the origin; **same-credential CDN copies of pre-freeze downloads keep serving until purge — owner classification (08)** |
| 14 | Stale deleted-user JWT blocked | PASS at the origin; same CDN note (09) |
| 15 | Account-first delete-account | PASS — 200 `removed`, Auth absent before purge, graph cascaded, not falsely completed (10) |
| 16 | Forced Auth failure removes ZERO media | PASS — 202, three failed attempts, 0 removed, byte-identical (11) |
| 17 | Duplicate / lease | PASS — one row, one lease, SKIP LOCKED, expiry reclaim, 410 replay (12) |
| 18 | >1,000 / deep / both buckets | PASS — 1,112 objects, 3 remove calls ≤ 1,000, 9-segment paths, NULL-owner service-role objects (13) |
| 19 | Signed URLs under D15 | PASS — new signing denied after freeze; pre-issued URLs end at purge (≤ 3 s measured for A) (15) |
| 20 | Final sweep cannot run early | PASS — 0 early completions; real P/S completed by live cron at the first tick after the window (16) |
| 21 | Due final sweep completes + anonymises | PASS — SYNTHETIC seeded Q case (16) |
| 22 | Cron / Vault | PASS — every minute, pg_net 200 `{"ok":true}`, no-op while Vault empty (17) |
| 23 | N10-introduced advisor security errors | **0** (18) |
| 24 | Secret scan | CLEAN — 0 literal hits (19) |
| 25 | Control user unchanged | PASS (20) |
| 26 | Frozen 41B evidence unchanged | PASS — hashes unchanged |

Also: OWNER_ID_PATH_ANOMALY **reproduced through supported APIs** (service-role move preserves `owner_id`) → `purge_attention`, alert, not auto-deleted, completion blocked (14). Retention cleanup behaves as specified (16).

## Items for the owner

1. **Authenticated-download CDN residual (08)** — Storage's CDN serves a frozen/deleted user's *own* previously downloaded bytes back to the *same* credential until purge (cache keyed on `Authorization`; other callers denied; ends at purge; ≥ 25 min measured while purge was withheld; behaviour after JWT expiry unmeasured). Decide whether D15 is extended to cover it, whether a post-expiry measurement is required, and whether any origin cache-control change is wanted (outside the frozen N10 scope).
2. **PG_NET platform residual (05)** — accepted only under the six §25 conditions, all proven here.
3. Rehearsal data left in place for review (20), including N's `purge_attention` anomaly object.
4. Harness issues recorded honestly (10, 11, 12, 22): missing confirmation body, a comment-encoding error, a cron/test timing collision, a worker-side lookup refused by least privilege — none changed product state outside the intended tests.

## Status (unchanged blockers)

G3 = CLOSED PASS · RI/account-deletion database gate = CLOSED / PASS · N10 = OPEN · N10.3A = LOCAL IMPLEMENTATION COMPLETE (+ M3 security patch) · N10.3B = HOLD (owner classification) · Candidate E hosted-runtime proven = YES, subject to item 1 · Production ready = NO (D14 privacy/legal release gate OPEN; operator-alert destination NOT CONFIGURED) · Production accessed = NO · 41B.1A applied to production = NO · 41B.1B = NOT STARTED / NOT AUTHORISED.
