# N10.2 — Candidate E: account-first deletion with durable media purge

## 1. Status

**PAPER DESIGN, FROZEN FOR N10.3 SUBJECT TO OWNER DECISIONS (§20). NOT IMPLEMENTED.** Written 9 October 2026 by Claude Code (implementation owner).

- No migration, runtime code, Storage policy, Edge Function or cron job was created or changed. No hosted project was used, and production was not accessed.
- N10 = OPEN. N10.3 = NOT STARTED.
- The RI/account-deletion database gate stays CLOSED / PASS (G3); this design does not reopen it.
- 41B.1B = NOT STARTED / NOT AUTHORISED.

Status-consistency check (§0 of the N10.2 brief): one active roadmap item still described the original trigger-order gate as open ("no row may be bound before this closes"). It was marked SUPERSEDED / CLOSED BY G3 in a separate documentation-only commit (`9d1dd974`). No other current line contradicted the G3 / N10.1 state.

## 2. Source evidence

Claim classes used below: **OFFICIAL DOCS**, **N10.1 RUNTIME-PROVEN** (that hosted environment only), **SOURCE-PROVEN**, **ARCHITECTURAL INFERENCE**, **REQUIRES FUTURE REHEARSAL**.

| Source | Use |
|---|---|
| G3 evidence `docs/strategy/evidence/41b-account-deletion-g3/` | Hard Auth deletion removes the whole account graph atomically, independent of trigger order. One GoTrue `DELETE` on `auth.users`, no GoTrue DML on `public` (runtime-proven on that project) |
| N10.1 evidence `docs/strategy/evidence/n10-r1-storage-auth-semantics/` | R1–R4 below |
| N10.0 paper review (report of 9 October 2026) | Candidates A–D; current implementation defects |
| Current code | `supabase/functions/delete-account/index.ts`, `src/pages/AccountSettings.tsx` (`deleteAccount`), `src/components/myweek/SlotPhotoMemory.tsx`, `src/hooks/useWeekMedia.ts`, `src/lib/weekMedia.ts` (`buildMediaStoragePath`), `src/lib/firstYearMemories.ts`, `src/lib/firstYearMemoryPhoto.ts` (`buildMemoryPhotoPath`, `isMemoryPhotoPathOwned`), migrations `20260420185521` (weekly-photos bucket and policies), `20260813213029` (first-year-memories policies), `20260720110000` (internal-table pattern: `email_delivery_claims`), `20260421114636` (pg_cron/pg_net/Vault email worker; the cron job and Vault secret themselves are out-of-band, per 41B.0-R) |
| Supabase guidance (fetched 9 October 2026) | Database functions (prefer SECURITY INVOKER; definer functions need `search_path = ''`, restricted EXECUTE); RLS (initPlan wrapping; definer functions never in exposed schemas; a secret key bypasses RLS only when no user token is sent); scheduling Edge Functions (pg_cron + pg_net + Vault); sessions (access-token expiry configured in Auth > Sessions; default and recommended maximum 1 hour); Edge Function default secrets (`SUPABASE_DB_URL`, secret keys); Storage (delete limit 1,000 per `remove`; deleting rows by SQL orphans objects) |

## 3. Runtime facts (N10.1, `gbhwpzofnswlryqjoumw`, 9 October 2026)

1. Auth hard deletion **succeeded** while the user owned a Storage object uploaded with their own token (N10.1 RUNTIME-PROVEN). The official Supabase guide conflicted with this observed behaviour.
2. The object **remained**, byte-identical; Auth deletion did no Storage cleanup (N10.1 RUNTIME-PROVEN).
3. `owner` and `owner_id` **kept the deleted id** (N10.1 RUNTIME-PROVEN).
4. The deleted user's still-unexpired access token **was accepted by Storage**: an upload created a new object owned by the deleted id. Auth rejected the same token (`user_not_found`) and the refresh token was invalid (N10.1 RUNTIME-PROVEN).

Generalisation limit: facts 1–4 are proven for that project only. Production behaviour **REQUIRES FUTURE REHEARSAL** on a fresh project of the same platform generation, and production itself is never tested.

## 4. Problem statement

The current function removes Storage first and calls `auth.admin.deleteUser` second. Any failure after the Storage step leaves media permanently destroyed while the account and its database graph survive (N10).

The current function also:

- lists at most 1,000 entries per folder with no paging, and stops at a fixed depth (`depth > 3`), so extra objects are silently left behind;
- removes each bucket in one `remove` call, which fails above 1,000 objects;
- returns "Nothing else was deleted" even after the first bucket was removed;
- keeps no durable state and has no retry path;
- does not block uploads during deletion.

N10.1 adds a security finding: Storage folder rules (`auth.uid()::text = foldername[1]`) accept a deleted user's live token.

## 5. Selected architecture

```
REQUEST (durable row committed)  ── freezes user media access (Storage RLS)
   ↓
HARD AUTH DELETE (GoTrue)  ── database graph cascades atomically (G3)
   ↓  confirmed: auth.users row absent
IMMEDIATE MEDIA PURGE  ── Storage API removes, batches ≤ 1,000, re-query until empty
   ↓  retry until empty (worker)
FINAL SWEEP after auth_deleted_at + token window + margin
   ↓  empty
COMPLETED
```

**Core invariant (N10-E1):** no user media is removed by this workflow until the Auth/database account deletion is confirmed committed. Confirmation means the `auth.users` row is absent, verified directly in the database, not inferred from an HTTP status.

## 6. State machine

Retry, "in progress" and backoff are carried by lease and attempt columns, not by extra states. That keeps the transition graph small while covering every case in the brief: `auth_deleting`/`auth_retry` are `requested` with a lease or backoff; `purge_pending`/`purging`/`purge_retry` are `auth_deleted` with a lease or backoff; `final_sweep` is `awaiting_final_sweep` under a lease.

| State | Entered by | Required fields | Next valid states | Retry | Auth user exists | Media may exist | User media access | New request allowed | After a crash |
|---|---|---|---|---|---|---|---|---|---|
| `requested` | `delete-account` only (first transaction) | `user_id`, `requested_at`, `next_attempt_at` | `auth_deleted`, `requested` (retry), `auth_attention`, `cancelled` | automatic, with backoff, for transient Auth errors | yes (until delete commits) | yes, untouched | **denied** (all commands) | no: the existing row is returned | lease expires; worker re-checks `auth.users` then continues |
| `auth_deleted` | function or worker, **only after** confirming the `auth.users` row is absent | + `auth_deleted_at`, `final_sweep_after` | `awaiting_final_sweep`, `auth_deleted` (retry), `purge_attention` | automatic purge retries | **no** | yes, being purged | denied (no Auth user) | n/a (account gone) | worker resumes purge (idempotent) |
| `awaiting_final_sweep` | function or worker after a purge pass verifies 0 objects | + `purge_empty_at` | `completed`, `awaiting_final_sweep` (retry), `purge_attention` | automatic | no | none expected | denied | n/a | worker re-runs the sweep when due |
| `completed` | worker only, when `now() ≥ final_sweep_after` and a sweep verifies 0 objects | + `completed_at` | none (terminal; later anonymisation per §14) | none | no | none | denied | n/a | n/a |
| `auth_attention` | function or worker, on a permanent Auth error or exhausted transient retries | `last_error_class` | `requested` (operator retry), `cancelled` (operator) | none automatic; alert raised | yes | yes, **untouched** | denied by default (owner decision D7) | no | stays; operator acts |
| `purge_attention` | worker, after the purge escalation threshold | `last_error_class` | `auth_deleted` (operator re-arm) | **continues hourly** while alerting (owner decision D4) | no | some may remain | denied | n/a | worker keeps retrying |
| `cancelled` | operator only (owner decision D7) | — | none (terminal) | none | yes | yes, untouched | **restored** (the helper ignores `cancelled`) | yes | n/a |

**Invalid transitions,** rejected by a transition-guard trigger and by worker preconditions:

- any state back to `requested` except from `auth_attention`;
- `auth_deleted` / `awaiting_final_sweep` / `completed` / `purge_attention` to `cancelled`, `requested` or `auth_attention` (the account is already gone);
- `completed` to anything;
- `requested` straight to `awaiting_final_sweep` or `completed`;
- any Storage removal while the row is in `requested`, `auth_attention` or `cancelled`.

The last rule is a worker precondition, re-checked against `auth.users` immediately before each purge pass.

## 7. Schema (paper only)

**Placement.** A new non-exposed schema `private`:

- The Data API exposes `public` and `graphql_public`; `private` is not exposed, so a later mis-grant cannot turn the table into a user-reachable API surface.
- TSOY's existing internal pattern (a `public` table with RLS and REVOKE, plus SECURITY DEFINER RPCs with `search_path = public`) predates the current guidance. N10 does not copy it.
- Both Edge Functions reach the table through `SUPABASE_DB_URL` (OFFICIAL DOCS: a default secret). No RPC is exposed.

**`private.account_deletion_requests`** (minimum set):

| Column | Type / rule | Why |
|---|---|---|
| `id` | uuid PK, `gen_random_uuid()` | request identity; returned to the caller as an opaque id |
| `user_id` | uuid, **no FK**; NOT NULL until anonymised | must survive the `auth.users` deletion to locate media (N10.1 fact 3) |
| `status` | text, CHECK in the 7 states | state machine |
| `requested_at` | timestamptz NOT NULL default `now()` | audit and escalation clock |
| `auth_deleted_at` | timestamptz | proof of commit; starts the token window |
| `final_sweep_after` | timestamptz, CHECK ≥ `auth_deleted_at` + window + margin | prevents an early sweep (N10-E10) |
| `purge_empty_at` | timestamptz | first verified-empty pass |
| `completed_at` | timestamptz | completion proof |
| `attempt_count` | int NOT NULL default 0, reset on each state change | backoff and escalation |
| `next_attempt_at` | timestamptz NOT NULL | retry scheduling |
| `lease_until` | timestamptz | crash-safe claim (§11) |
| `last_error_class` | text, CHECK in a fixed list (`auth_transient`, `auth_permanent`, `auth_unknown_outcome`, `storage_list`, `storage_remove`, `storage_partial`, `db`, `timeout`) | observability without free text or PII |
| `objects_removed` | int NOT NULL default 0 | completion evidence |
| `sweep_objects_removed` | int NOT NULL default 0 | shows whether the final sweep caught anything |
| `anomaly_count` | int NOT NULL default 0 | objects with `owner_id` = user outside the canonical prefix (§10) |
| `updated_at` | timestamptz NOT NULL | operations |

Per-bucket found/removed counters, `auth_delete_started_at` and separate auth/purge attempt counters were considered and rejected as unnecessary: a single counter per state, plus log lines per bucket, suffices.

Consistency CHECKs:

- `status ∈ {auth_deleted, awaiting_final_sweep, completed, purge_attention}` ⇒ `auth_deleted_at` and `final_sweep_after` NOT NULL;
- `completed` ⇒ `purge_empty_at` and `completed_at` NOT NULL;
- `user_id` IS NULL only when `completed` (anonymised).

Indexes:

- unique partial index on `(user_id)` WHERE `status NOT IN ('completed','cancelled')`: one active workflow per account;
- `(status, next_attempt_at)` for claiming.

Grants: RLS on with no policies; `REVOKE ALL … FROM PUBLIC, anon, authenticated`; `USAGE ON SCHEMA private` granted only to `authenticated` (needed to call the helper in §8; gives no table access). The functions connect as the database owner role through `SUPABASE_DB_URL`. A dedicated least-privilege login role is an owner option (D9).

**Transition guard.** `private.account_deletion_requests_guard()` is a SECURITY INVOKER trigger function (BEFORE UPDATE). It rejects invalid transitions (§6) and stamps `updated_at`.

## 8. Storage authorisation (stale-token hard requirement)

**Helper `private.account_media_access_allowed()`** returns a boolean.

- SECURITY DEFINER, owned by `postgres`, `SET search_path = ''`, STABLE, every name schema-qualified, no arguments: the caller is derived from `auth.uid()` internally, so no caller-supplied UUID is trusted.
- Body, conceptually:
  - `auth.uid() IS NOT NULL`
  - AND `EXISTS (SELECT 1 FROM auth.users u WHERE u.id = auth.uid() AND u.deleted_at IS NULL)`, the **live-account check**
  - AND `NOT EXISTS (SELECT 1 FROM private.account_deletion_requests r WHERE r.user_id = auth.uid() AND r.status <> 'cancelled')`, the **pending-deletion check**
- No mutation, no rows returned, no data beyond one boolean.
- `REVOKE EXECUTE … FROM PUBLIC`; `GRANT EXECUTE … TO authenticated` only, because policy evaluation runs as the caller.
- **Why SECURITY INVOKER cannot work:** `authenticated` must not gain SELECT on `auth.users` or on the deletion table, and both reads are required. Definer is therefore the least-privileged correct form, kept in a non-exposed schema per the guidance. It must be checked with the security advisors at N10.3.

**Policies.** Replace the 8 existing media policies (4 per bucket) with policies `TO authenticated` of the form:

`bucket_id = '<bucket>' AND auth.uid()::text = (storage.foldername(name))[1] AND (SELECT private.account_media_access_allowed())`

The scalar subquery gives initPlan caching (OFFICIAL DOCS).

- **INSERT:** guarded. Closes N10.1 fact 4.
- **UPDATE:** guarded, with the same WITH CHECK. This also fixes the missing WITH CHECK on the current `weekly-photos` UPDATE policy.
- **DELETE:** guarded. A user must not change media while a deletion is pending; this preserves N10-E1 and E8 if Auth deletion then fails.
- **SELECT:** guarded. **Decision: a stale token must NOT read private pregnancy or baby media after account deletion, or while deletion is pending.** The data is sensitive, and the user has asked for it to be gone.

Residual, by design:

- Signed URLs issued **before** the freeze are bearer capabilities that keep working until their TTL (the app signs for 3,600 s) or until the object is purged. The immediate purge closes them in practice. This is recorded, and the rehearsal checks it.

Unaffected:

- Service-role purge requests send no user token, so they bypass RLS (OFFICIAL DOCS). The worker's Storage client must never carry a user session (N10-E12).

## 9. Deletion flow (synchronous part, `delete-account`)

1. Keep today's checks: method `POST`, `{confirmed: true}`, Bearer token. Resolve the caller with `auth.getUser()` using the caller's token. A `user_not_found` result returns **410 `already_deleted`** and creates nothing.
2. **One database transaction (the freeze):**
   - `INSERT` a `requested` row with `lease_until = now() + 2 min`, `ON CONFLICT` on the unique active index `DO NOTHING`;
   - then `SELECT … FOR UPDATE` the active row.
   - If another holder's lease is active, return **202** with its state.
   - Commit.
   - From this commit, every new Storage operation by this user is denied (READ COMMITTED: a later statement sees the row).
3. **Auth delete** with an admin client (secret key, no user session): `auth.admin.deleteUser(userId)`, hard delete.
4. **Confirm by database query, never by HTTP status alone:** `SELECT 1 FROM auth.users WHERE id = $1`.

   | Auth response | Database check | Outcome |
   |---|---|---|
   | 2xx or 404 | row absent | → `auth_deleted` (`auth_deleted_at = now()`, `final_sweep_after` per §12) |
   | 2xx or 404 | row present (unexpected) | → `auth_attention` (`auth_unknown_outcome`) |
   | 5xx or timeout | row absent | → `auth_deleted` (the delete committed despite the error) |
   | 5xx or timeout | row present | stay `requested`, `attempt_count += 1`, `next_attempt_at` = backoff, release the lease → **202 `deletion_in_progress`** |
   | other 4xx or unexpected error | row present | → `auth_attention` (`auth_permanent`) → **500 `deletion_failed_nothing_removed`** |

5. If `auth_deleted`: run the **immediate purge** (§10) within a time budget (proposed 20 s). If it verifies empty, move to `awaiting_final_sweep`.
6. Respond:
   - **200 `account_deleted`**, with `media: "removed"` or `"removal_in_progress"`.
   - Release the lease. The worker owns everything that remains.

**Synchronous vs 202-only.** Synchronous is chosen. G3 measured Auth deletion at about 0.2 s, so the user gets a truthful immediate answer in the common case. Correctness lives in the durable row, not in the HTTP request: a crash at any step leaves a row the worker completes. A pure "202 then worker" design adds latency and uncertainty for no safety gain.

**Response contract** (replaces today's misleading messages):

| Code | Meaning |
|---|---|
| 200 `account_deleted` | the account is gone; media removed or being removed |
| 202 `deletion_in_progress` | request recorded; account not yet deleted; retrying automatically; media frozen and untouched |
| 410 `already_deleted` | the caller's account no longer exists |
| 500 `deletion_failed_nothing_removed` | the account still exists; no media was removed; support is alerted |

Never claim "nothing was deleted" unless the database confirms the account and media are untouched.

**App behaviour** (`AccountSettings`, design only):

- On 200, 202 or 410: sign out locally, clear cached user and query state, redirect, and show the truthful message.
- On 500: show the failure message.
- Disable the delete button while a request is in flight. A repeated click is idempotent server-side anyway.
- Client sign-out is UX only; the security boundary is Storage RLS plus the deleted Auth user.

## 10. Media enumeration and purge

**Discovery: approach B.** Read-only SQL on `storage.objects` metadata, through the worker's database connection. Removal happens only through the Storage API.

Rejected: approach A (recursive Storage `list` with offset paging). It needs folder recursion, and offset paging skips entries while removals shrink the set. The flat metadata query has no depth concept and no 1,000 ceiling.

Reading Storage metadata is not documented as forbidden. Writing or deleting rows is (it orphans objects). Status of the read: ARCHITECTURAL INFERENCE, exercised in N10.1.

**Canonical ownership rule.** An object belongs to the deleted account if and only if:

- `bucket_id IN ('weekly-photos','first-year-memories')`
- AND `starts_with(name, user_id::text || '/')`

Every TSOY upload path starts with the owner's UUID folder (`buildMediaStoragePath`, `buildMemoryPhotoPath`, the weekly photo path), and RLS enforces it. UUIDs cannot collide or prefix one another, so this **cannot select another user's object**. 41B.0-R already requires that "Storage paths stay prefixed by the owner id", and 41B.1C must keep that.

**`owner_id`: detection only.** Objects with `owner_id = user_id::text` **outside** the canonical set are counted in `anomaly_count` and alerted, never auto-deleted. Objects inside the canonical prefix with `owner_id IS NULL` (service-role uploads) **are** purged, because the path is authoritative. This avoids false negatives on the path rule, and avoids deleting by `owner_id` alone, which no app path should produce.

**Purge pass** (worker or function; service role; only in `auth_deleted`, `awaiting_final_sweep` or `purge_attention`, and only after re-confirming the `auth.users` row is absent):

1. `SELECT bucket_id, name FROM storage.objects WHERE <canonical rule> ORDER BY bucket_id, name LIMIT 1000`. There is no OFFSET: removals shrink the set, so each query naturally returns the next batch.
2. For each bucket in the batch: Storage API `remove(names)` (≤ 1,000, OFFICIAL DOCS).
3. Re-select those exact names. Any still present means `storage_partial`: stop the pass, increment `attempt_count`, back off. This also prevents an infinite loop on a silently failing remove.
4. Repeat until step 1 returns 0 rows (or the time budget ends, leaving the lease to expire for the next run).
5. On 0 rows: run the anomaly count, set `purge_empty_at` and the next state.

Properties: safe for 0, 1, 1,001 and many thousands of objects; covers both buckets; no depth limit; idempotent (removing missing objects is harmless); a partial failure resumes from the remaining set.

**Bucket versioning** (Storage migrations include object versions and delete markers): the rehearsal must confirm both media buckets are unversioned, or that `remove` leaves no recoverable version (REQUIRES FUTURE REHEARSAL).

## 11. Worker and retries

**Reuse the TSOY pattern:** pg_cron calls `net.http_post` every minute with Vault-held credentials, invoking a new Edge Function `account-deletion-worker` (OFFICIAL DOCS pattern; already used for `process-email-queue`). The cron entry belongs in a migration that names Vault secrets; the secret values stay out-of-band (D10).

**Claiming:**

```
UPDATE … SET lease_until = now() + interval '5 minutes'
WHERE id IN (
  SELECT id FROM … WHERE status IN (requested, auth_deleted, awaiting_final_sweep, purge_attention)
    AND next_attempt_at <= now() AND (lease_until IS NULL OR lease_until < now())
  ORDER BY next_attempt_at LIMIT 5 FOR UPDATE SKIP LOCKED)
RETURNING …
```

- Duplicate cron fires, overlapping runs and the synchronous function never work the same row concurrently.
- A crashed holder's lease expires and the row is reclaimed.
- `awaiting_final_sweep` rows are eligible only when `now() ≥ final_sweep_after`.

**Per state:**

- `requested`: the same Auth step and database confirmation as §9.
- `auth_deleted`: a purge pass.
- `awaiting_final_sweep`: a purge pass. If it verifies empty: `completed`, with `sweep_objects_removed` recorded.

**Backoff:** `min(2^attempt minutes, 60 minutes)`.

**Escalation:**

- `requested` → `auth_attention` after 24 h of transient failures, or immediately on a permanent error.
- `auth_deleted` / `awaiting_final_sweep` → `purge_attention` after 24 h without reaching the next state.
- `purge_attention` keeps retrying hourly while alerting (D4, D5).

**Wall-clock budget:** about 50 s of work per invocation. Edge Function limits need confirming at N10.3 (REQUIRES FUTURE REHEARSAL).

## 12. Stale-token handling and the final sweep

- **Primary control:** the §8 helper denies every Storage command once the request row exists, and again once the Auth user is absent. That closes N10.1 fact 4 at the boundary.
- **Final sweep: KEEP** as defence in depth, because:
  1. an upload whose permission check passed just before the freeze can insert its row just after it;
  2. resumable or multipart uploads started before the freeze;
  3. a future policy regression or migration mistake;
  4. token-setting drift.

  The sweep is cheap: one empty query in the normal case.
- **`final_sweep_after = auth_deleted_at + W + M`**:
  - **W** is the maximum access-token lifetime in force during the preceding W period. Source: the project's Auth "JWT expiry" setting (Auth > Sessions; OFFICIAL DOCS), carried into the functions as the configuration value `ACCOUNT_DELETION_TOKEN_WINDOW_SECONDS`. The release checklist verifies W ≥ the dashboard value.
  - Governance rule: when lowering JWT expiry, keep W at the old value for one old lifetime. When raising it, raise W **before** the change.
  - **M** = 15 minutes (clock skew, in-flight and resumable uploads).
  - The value is snapshotted into the row at `auth_deleted`, and a CHECK enforces `final_sweep_after ≥ auth_deleted_at + interval '1 hour'` as a floor. Not hard-coded to N10.1's 3,600 s: the floor exists only to catch misconfiguration.
- **COMPLETED requires all of:**
  - `auth.users` row absent;
  - the account graph absent (G3 cascade; spot-checked by the rehearsal, not per request);
  - `purge_empty_at` set;
  - `now() ≥ final_sweep_after`;
  - a final sweep that verified 0 canonical objects;
  - no active lease or error.

## 13. Other data writes after deletion

No app-wide write freeze is needed:

- All 28 `public` tables holding `user_id` carry a direct FK to `auth.users` (C1/G3 catalogue). After deletion, any insert with the deleted `user_id` fails with 23503, and reads return nothing because the rows cascaded.
- Writes during `requested` (account still alive) are harmless: the single GoTrue `DELETE` removes everything committed before it, and the FK locks serialise a concurrent insert against the delete (G3 model).
- Status: ARCHITECTURAL INFERENCE; the rehearsal spot-checks it.
- Storage is the only surface with no FK, which is why §8 exists.

## 14. Security model

| Element | Trust |
|---|---|
| Browser | untrusted |
| User access token | may stay cryptographically valid after deletion (N10.1); never treated as proof of a live account |
| Storage RLS + helper | the security boundary for media |
| `delete-account`, `account-deletion-worker` | trusted backend; the only holders of the secret key and `SUPABASE_DB_URL` |
| `private.account_deletion_requests` | internal operational data; not exposed; no user grants |
| Secret / service-role key | backend only; never sent with a user session |

## 15. Failure matrix

Auth = Auth user; DB = account graph; Media = the user's objects; Row = request state; Retry = automatic; Loss = media lost while the account survives; Retention = media of a deleted account persists (privacy timing).

| Scenario | Auth | DB | Media | Row | Retry | Loss | Retention | Operator |
|---|---|---|---|---|---|---|---|---|
| No media | gone | gone | none | → completed after sweep | — | no | no | none |
| One file | gone | gone | purged | completed | — | no | until purge (seconds) | none |
| 1,001+ files | gone | gone | purged in batches | completed | yes, across runs if over budget | no | minutes | none |
| Deep nested paths | gone | gone | purged (flat query) | completed | — | no | — | none |
| Both buckets | gone | gone | both purged | completed | — | no | — | none |
| Duplicate delete request | — | — | — | single active row; 202 or the same state | — | no | — | none |
| Upload racing the request | alive → gone | — | pre-freeze object purged; post-freeze upload denied | normal | — | no | until sweep at worst | none |
| Stale token upload after deletion | gone | gone | **denied** (live check) | — | — | no | — | none |
| Stale token read after deletion | gone | gone | **denied**; pre-issued signed URLs die when the object is purged | — | — | no | — | none |
| Auth delete 500 | alive | alive | **untouched**, frozen | requested (backoff) | yes | no | n/a | after 24 h |
| Auth timeout, unknown outcome | per DB check | per DB check | untouched until confirmed | auth_deleted or requested | yes | no | — | none |
| Auth already gone | gone | gone | purged | auth_deleted → … | — | no | — | none |
| Crash before Auth deletion | alive | alive | untouched, frozen | requested (lease expires) | yes | no | — | none |
| Crash right after Auth deletion | gone | gone | present | requested → worker confirms absence → auth_deleted | yes | no | minutes | none |
| Crash halfway through purge | gone | gone | partly purged | auth_deleted | yes | no | minutes | none |
| One bucket succeeds, second fails | gone | gone | second bucket remains | auth_deleted, `storage_remove` | yes | no | until retry | after 24 h |
| Remove partial or error | gone | gone | some remain | `storage_partial` | yes | no | until retry | after 24 h |
| Worker runs twice | — | — | — | SKIP LOCKED + lease: one holder | — | no | — | none |
| Worker crashes holding a lease | — | — | — | reclaimed after lease expiry | yes | no | +5 min | none |
| Final sweep fails | gone | gone | possibly a late object | awaiting_final_sweep (backoff) | yes | no | until success | after 24 h |
| Database deletion fails | alive | alive | **untouched** | requested or auth_attention | transient: yes | no | n/a | yes |
| Object with `owner_id` = user outside prefix | gone | gone | anomaly left in place | `anomaly_count` > 0 | — | no | **yes, until operator** | review (D12) |
| Prefix object with NULL `owner_id` | gone | gone | purged (path authoritative) | normal | — | no | — | none |
| Service-role object under the user's prefix | gone | gone | purged | normal | — | no | — | none |
| Token lifetime raised after deployment | gone | gone | RLS still denies; sweep window snapshotted | normal | — | no | — | the governance rule in §12 prevents an early sweep |

No row shows media loss with a surviving account. That is N10's resolution criterion.

## 16. Privacy and retention decisions (human review; no legal conclusions)

| # | Decision | Proposal (for review only) |
|---|---|---|
| A | Expected time from Auth deletion to immediate purge | seconds in the synchronous path; worst case one worker cycle (about 1 min) plus backoff |
| B | How long the row with the deleted UUID may remain | until `completed`, plus N days for operational audit (N to be decided) |
| C | After completion | null `user_id` and keep timestamps, status and counts; or delete the row (decide) |
| D | Purge failure for 1 h / 24 h / several days | 1 h: automatic retries; 24 h: `purge_attention` + alert; days: hourly retries continue with manual investigation |
| E | When operators are alerted | any `*_attention`; `anomaly_count` > 0; `sweep_objects_removed` > 0 (a policy regression signal) |
| F | What the user is told | the truthful response contract (§9); any confirmation channel is a product decision |

Paths contain UUIDs, week numbers and memory ids, not names. The media itself is sensitive and health-adjacent.

## 17. Invariants (for automated tests)

- **N10-E1** No Storage object is removed by the workflow before the `auth.users` row is confirmed absent.
- **N10-E2** An active request denies user media INSERT, UPDATE, DELETE and SELECT.
- **N10-E3** A deleted Auth identity denies media access while an old token is unexpired.
- **N10-E4** The purge is idempotent.
- **N10-E5** Enumeration has no 1,000-object ceiling.
- **N10-E6** Enumeration has no fixed-depth ceiling.
- **N10-E7** Every object deletion uses the Storage API. There is no SQL mutation of `storage.objects`, and the workflow never writes to the `storage` schema. Bucket creation is a one-time deployment step (§18).
- **N10-E8** A failed Auth deletion leaves media byte-identical.
- **N10-E9** A failed purge leaves the account deleted and schedules a retry.
- **N10-E10** `completed` requires a verified-empty sweep at or after `final_sweep_after`.
- **N10-E11** The request row survives Auth deletion: no FK, no cascade.
- **N10-E12** Admin Storage and Auth calls never carry a user session.
- **N10-E13** The purge never touches objects outside `{user_id}/` in the two media buckets.
- **N10-E14** At most one active request per account.
- **N10-E15** `final_sweep_after` ≥ `auth_deleted_at` + configured window + margin, and is never before the 1-hour floor.
- **N10-E16** Other users' media and accounts are unchanged by any deletion.
- **N10-E17** The helper is not callable by `anon` or `PUBLIC`, takes no arguments, and lives in a non-exposed schema with `search_path = ''`.
- **N10-E18** G3 and AD-1 are unchanged: the 13 Episode FKs stay RESTRICT and the Layer 1/2 contracts stay green.

## 18. Future surface (paper only)

| Kind | Objects |
|---|---|
| Schema | `private` (new, not exposed) |
| Table | `private.account_deletion_requests` (+ unique active index, claim index, CHECKs) |
| Functions | `private.account_media_access_allowed()` (definer, as in §8); `private.account_deletion_requests_guard()` (invoker trigger) |
| Edge Functions | `delete-account` (rewritten orchestration); `account-deletion-worker` (new); `supabase/functions/_shared/accountDeletion.ts` (pure state and purge logic, unit-testable) |
| Storage policies | replace the 4 `weekly-photos` and 4 `first-year-memories` policies with guarded versions (`TO authenticated`; UPDATE with WITH CHECK) |
| Bucket | bring `first-year-memories` (today created out-of-band, per 41B.0-R) under version control idempotently. The method is to be verified at N10.3: either the `INSERT INTO storage.buckets … ON CONFLICT DO NOTHING` pattern the existing `weekly-photos` migration already uses, or the Storage API at deploy time. Never by touching `storage.objects` |
| Cron | `account-deletion-worker`, every minute (pg_cron + pg_net) |
| Vault | worker URL and secret key (values out-of-band) |
| Configuration | `ACCOUNT_DELETION_TOKEN_WINDOW_SECONDS` (function secret) |
| App | `src/pages/AccountSettings.tsx` `deleteAccount` response handling and copy |
| Migrations eventually | M1: schema, table, guard, helper, policies, bucket. M2: cron schedule referencing Vault names |
| Tests | unit (shared logic), static contracts (policies include the helper; no `storage.objects` mutation; no fixed 1,000 or depth constants), AD-1 Layer 1 unchanged |

## 19. N10.3 implementation boundary

- **Step 1 (isolated, additive, can ship first):** M1 (table, helper, guarded policies). This alone closes the stale-token Storage hole (N10.1 fact 4), while the current function keeps working. With no request rows, the pending check is inert.
  - **Ordering hazard:** while the old function remains, a deletion still runs Storage-first. Steps 1 and 2 therefore need to ship close together, or with an owner-accepted interim.
- **Step 2 (one unit):** the `delete-account` orchestration, the worker, the shared module, the caller changes and M2 (cron). These depend on each other and ship together.
- **Isolated throughout:** unit and static tests; no change to 41B.1A files or to AD-1 contracts.
- **Before any production release:** the hosted rehearsal (§20 below) PASS and owner acceptance.

## 20. Hosted rehearsal plan (not created)

- **Environment:** one disposable hosted project (owner-created; new credentials; denylist production, C1, G3 and N10.1). Hosted Storage, Auth, pg_cron, pg_net, Vault and Edge Functions are required, and Edge Functions are deployed to the rehearsal project only.
- **Baseline:** replay the 47 TSOY migrations plus M1 and M2. Whether to include frozen 41B.1A is decision D11. Production is never involved.
- **Cases, each PASS by observation:**
  1. Failed Auth deletion: inject it with a scratch RESTRICT FK, the G3 S1 technique. 0 media touched; row `requested` / `auth_attention`.
  2. Successful deletion: immediate purge; 0 canonical objects remain.
  3. A pending row blocks upload, update, delete and read.
  4. A stale token after deletion cannot INSERT, UPDATE, DELETE or SELECT (repeat of N10.1 R4, expecting denial).
  5. A pre-issued signed URL stops working after the purge.
  6. 1,001+ objects in one folder, paths 6+ levels deep, both buckets, and a service-role object under the prefix: all purged.
  7. An `owner_id` anomaly outside the prefix is counted, not deleted.
  8. Crash and retry by state seeding (expired lease in each state; no test hooks in production code): idempotent.
  9. Duplicate and concurrent requests: one active row.
  10. Worker double-fire: SKIP LOCKED holds.
  11. Final sweep only after the configured window (use a short test window with the CHECK floor relaxed only in the rehearsal migration variant, or wait the real window).
  12. Bucket versioning confirmed off, or no recoverable versions.
  13. Control user unchanged; AD-1 Layer 2 PASS; G3 graph cascade intact; secret scan clean.

## 21. Relationship to 41B

- The RI/account-deletion database gate remains **CLOSED / PASS**. N10 does not reopen G3, and Candidate E relies on G3.
- N10 is **not** a documented prerequisite for 41B.1B (N10.0). 41B.1B remains **NOT AUTHORISED** here.
- N10 must be resolved before any production release of the account-deletion redesign.
- 41B.1C changes Storage paths. The roadmap and 41B.0-R set no N10 gate before 41B.1C, but 41B.0-R §17 and §19 require paths to stay prefixed by the owner id. Candidate E's canonical rule depends on that, and it removes the depth and 1,000 limits 41B.0-R §19 warned about. **No new 41B gate is invented.**

## 22. Open owner decisions

| # | Decision |
|---|---|
| D1 | Purge time target (§16 A) |
| D2 | Retention of the UUID-bearing row (§16 B) |
| D3 | Post-completion handling of the row (§16 C) |
| D4 | Purge-failure escalation timings (§16 D) |
| D5 | Alert channel and on-call ownership (§16 E) |
| D6 | User-facing copy and any confirmation channel (§16 F) |
| D7 | After `auth_attention`: keep media frozen, or allow an operator to cancel and restore access; whether users may cancel |
| D8 | Whether to also ban the Auth user at request time (blocks new sign-ins and refreshes during `requested`) |
| D9 | `SUPABASE_DB_URL` vs a dedicated least-privilege database role for the two functions |
| D10 | Cron schedule and Vault secret names in-repo (values out-of-band) vs fully out-of-band, as today |
| D11 | Include frozen 41B.1A in the N10.3 rehearsal baseline |
| D12 | Handling of `owner_id` anomalies outside the prefix |
| D13 | The token-window value and its governance rule (§12) |
| D14 | Privacy/legal review of §16 as a whole |

## 23. Final verdict

- **N10 = OPEN.** N10.2 = PAPER DESIGN COMPLETE.
- **Candidate E = FROZEN** (architecture), subject to D1–D14, which do not change the safety ordering.
- N10.3 = NOT STARTED.
- Production accessed = NO. 41B.1A applied to production = NO. 41B.1B = NOT STARTED.
