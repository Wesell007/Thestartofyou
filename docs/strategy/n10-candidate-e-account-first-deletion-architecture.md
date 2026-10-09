# N10.2 / N10.2A — Candidate E: account-first deletion with durable media purge

## 1. Status

**Current status (9 October 2026, after N10.3B):** Candidate E IMPLEMENTED (N10.3A + M3 security patch, §25) and HOSTED-RUNTIME PROVEN — N10.3B = CLOSED / PASS / RETIRED (§26). N10 = OPEN only for D14 human privacy/legal approval and a real operator-alert destination. Production accessed = NO. The paragraphs below record the N10.2A freeze as written at the time.

**N10.2A — IMPLEMENTATION CONTRACT FULLY FROZEN. CANDIDATE E FULLY FROZEN FOR N10.3. NOT IMPLEMENTED.** The owner confirmed holds H1 and H2 on 9 October 2026 (§24.2).

| Stage | Date | Commit | What it was |
|---|---|---|---|
| N10.2 | 9 October 2026 | `d4db73a5` | paper architecture, accepted in principle by the owner |
| N10.2A | 9 October 2026 | `443bf9f5` | owner decisions D1–D15 resolved in §24; the strict COMPLETED predicate and invariants E1–E25 integrated throughout; holds H1 and H2 raised |
| N10.2A closeout | 9 October 2026 | this revision | H1 (sweep anchor `auth_deleted_at`) and H2 (HTTP 200 = Auth deletion confirmed committed, not workflow completed) owner-confirmed and applied |
| N10.3A security patch | 9 October 2026 | M3 `20261009091430_n10_worker_invocation_hardening.sql` | N10.3B §11 found hosted pg_net exposes queued request headers to every login role; the service-role scheduler credential is rejected and replaced by an invocation-only secret (§25) |

Written by Claude Code (implementation owner). Where this revision differs from the N10.2 text, this revision governs; the N10.2 text remains in Git history.

- No migration, runtime code, Storage policy, Edge Function or cron job was created or changed. No hosted project was used, and production was not accessed.
- N10 = OPEN. N10.3 = NOT STARTED.
- The RI/account-deletion database gate stays CLOSED / PASS (G3); this design does not reopen it.
- 41B.1B = NOT STARTED / NOT AUTHORISED.
- **D14 (human privacy/legal review) is a release gate for production activation.** It does not block local implementation or disposable rehearsal.
- **The missing operator-alert destination is a PRODUCTION ACTIVATION BLOCKER (D5).**

Status-consistency check (N10.2 §0): the original trigger-order gate item in `roadmap.md` was marked SUPERSEDED / CLOSED BY G3 (`9d1dd974`).

## 2. Source evidence

Claim classes: **OFFICIAL DOCS**, **N10.1 RUNTIME-PROVEN** (that hosted environment only), **SOURCE-PROVEN**, **ARCHITECTURAL INFERENCE**, **REQUIRES N10.3 VERIFICATION / REHEARSAL**.

| Source | Use |
|---|---|
| G3 evidence `docs/strategy/evidence/41b-account-deletion-g3/` | Hard Auth deletion removes the whole account graph atomically, independent of trigger order. One GoTrue `DELETE` on `auth.users`, no GoTrue DML on `public`. All 28 `public` tables with `user_id` carry a direct FK to `auth.users` (`03e-catalogue-validated`, checked 28/28) |
| N10.1 evidence `docs/strategy/evidence/n10-r1-storage-auth-semantics/` | §3 |
| N10.0 paper review (9 October 2026) | Candidates A–D; current implementation defects |
| Current code (re-read at N10.2A) | `supabase/functions/delete-account/index.ts`; `src/pages/AccountSettings.tsx` `deleteAccount`; uploads with standard `.upload()` in `SlotPhotoMemory.tsx`, `useWeekMedia.ts` (2 calls) and `firstYearMemories.ts`; signed URLs in §8.3; path builders `weekMedia.ts buildMediaStoragePath`, `firstYearMemoryPhoto.ts buildMemoryPhotoPath` / `isMemoryPhotoPathOwned`, weekly photo `{userId}/{week}.{ext}`; bucket and policies in migrations `20260420185521` and `20260813213029`; internal-table pattern `20260720110000` (`email_delivery_claims`); email worker `20260421114636` (the cron job and Vault secret are out-of-band, per 41B.0-R) |
| Supabase guidance (fetched 9 October 2026) | Database functions (prefer SECURITY INVOKER; definer functions need `search_path = ''` and restricted EXECUTE); RLS (initPlan wrapping; definer functions never in exposed schemas; a secret key bypasses RLS only without a user token); scheduling Edge Functions (pg_cron + pg_net + Vault); sessions (JWT expiry configured in Auth > Sessions; default and recommended maximum 1 hour); Edge Function default secrets; Storage (`remove` ≤ 1,000 objects; deleting rows by SQL orphans objects) |
| Alerting | no operator-alert channel exists in `supabase/functions/` or `package.json` (checked at N10.2A) |

## 3. Runtime facts (N10.1, `gbhwpzofnswlryqjoumw`, 9 October 2026)

1. Auth hard deletion **succeeded** while the user owned a Storage object uploaded with their own token. The official Supabase guide conflicted with this observed behaviour.
2. The object **remained**, byte-identical; Auth deletion did no Storage cleanup.
3. `owner` and `owner_id` **kept the deleted id**.
4. The deleted user's unexpired access token **was accepted by Storage**: an upload created a new object owned by the deleted id. Auth rejected the token (`user_not_found`), and the refresh token was invalid.

All four are N10.1 RUNTIME-PROVEN for that project only. Production behaviour REQUIRES N10.3 REHEARSAL on a fresh project; production itself is never tested.

## 4. Problem statement

Today's function removes Storage first and calls `auth.admin.deleteUser` second. Any failure after the Storage step leaves media destroyed while the account survives (N10).

It also:

- lists at most 1,000 entries per folder without paging, and stops at a fixed depth;
- removes each bucket in one `remove` call, which fails above 1,000 objects;
- can say "Nothing else was deleted" after the first bucket was removed;
- keeps no durable state;
- does not block uploads during deletion.

N10.1 adds that Storage folder rules accept a deleted user's live token.

## 5. Selected architecture (core principle, preserved)

```
ACCOUNT DELETION REQUEST (durable row committed)
  → MEDIA ACCESS FREEZE (Storage RLS: all four commands)
  → HARD AUTH DELETE (GoTrue; graph cascades atomically per G3)
  → CONFIRM AUTH USER GONE (database check, not HTTP status)
  → IMMEDIATE MEDIA PURGE (Storage API, batches ≤ 1,000)
  → DURABLE RETRIES (worker)
  → FINAL POST-TOKEN-WINDOW SWEEP (+ anomaly scan)
  → COMPLETE (strict predicate, §12.3) → ANONYMISE
```

**Core invariant (N10-E1):** no user media is permanently removed by this workflow before the Auth/database account deletion is confirmed committed. Candidate B is not reopened.

## 6. State machine

Retries, in-progress work and backoff are carried by lease and attempt columns, not by extra states.

| State | Entered by | Next valid | Retry | Auth user | Media | User media access | New request |
|---|---|---|---|---|---|---|---|
| `requested` | `delete-account` (first transaction) only | `auth_deleted`, `requested`, `auth_attention`, `cancelled`* | automatic, D4 schedule | exists | untouched | **denied** | no (existing row returned) |
| `auth_deleted` | function or worker, only after the database confirms the `auth.users` row is absent | `awaiting_final_sweep`, `auth_deleted`, `purge_attention` | automatic | absent | being purged | denied | n/a |
| `awaiting_final_sweep` | function or worker, after a pass verifies 0 canonical objects **and** 0 anomalies | `completed`, `awaiting_final_sweep`, `purge_attention` | automatic | absent | none expected | denied | n/a |
| `completed` | worker only, under the strict predicate (§12.3) | none (row is anonymised, then deleted after retention, §7.3) | — | absent | none | denied | n/a |
| `auth_attention` | permanent Auth error, or an unresolved Auth outcome after escalation | `requested` (operator retry), `cancelled`* | none automatic; alert | exists | **byte-intact** | **denied** (D7) | no |
| `purge_attention` | purge failing beyond 24 h, **or any OWNER_ID_PATH_ANOMALY** | `auth_deleted` (operator re-arm after resolution) | continues automatically at a bounded cadence while alerting | absent | some may remain | denied | n/a |
| `cancelled` | operator only, explicitly (D7) | none | — | exists | untouched | restored | yes |

\* **Cancellation boundary (D7):** allowed only when all three hold:

1. the Auth user is confirmed to still exist;
2. Auth deletion is confirmed not to have committed;
3. no object was ever purged under this request (`objects_removed = 0`; the row never reached `auth_deleted`).

Cancellation is never automatic, and never a consequence of exhausted retries.

**Invalid transitions,** rejected by the guard trigger (§7.4) and by worker preconditions:

- any return to `requested` except from `auth_attention`;
- from any post-Auth state (`auth_deleted`, `awaiting_final_sweep`, `completed`, `purge_attention`) to `cancelled`, `requested` or `auth_attention`;
- `completed` to anything;
- `requested` straight to `awaiting_final_sweep` or `completed`;
- any Storage removal while the row is in `requested`, `auth_attention` or `cancelled`. The worker re-confirms the `auth.users` row is absent immediately before each purge pass.

## 7. Schema (paper only)

### 7.1 Placement and access

- **Schema:** a new non-exposed schema `private`. The Data API exposes `public` and `graphql_public`, so a mis-grant cannot turn the table into a user-reachable API.
- **Not copied:** TSOY's older internal pattern (SECURITY DEFINER RPCs in `public` with `search_path = public`). It predates current guidance.
- **Runtime access (D9):**
  - Both Edge Functions use a **dedicated least-privilege login role**, `account_deletion_worker`. Its connection string is an Edge Function secret (for example `N10_DB_URL`); the password is set out-of-band and never in Git.
  - They do **not** use the unrestricted `SUPABASE_DB_URL` / `postgres` credentials for normal work.
  - Verifying that a custom login role can connect from Edge Functions through the pooler is REQUIRES N10.3 VERIFICATION.

### 7.2 `private.account_deletion_requests`

| Column | Rule | Why |
|---|---|---|
| `id` | uuid PK | opaque request id |
| `user_id` | uuid, **no FK**, NOT NULL until anonymised | survives `auth.users` deletion to locate media (N10-E16) |
| `status` | text, CHECK in the 7 states | state machine |
| `requested_at` | timestamptz NOT NULL | audit; escalation clock |
| `auth_deleted_at` | timestamptz | commit proof; anchor for the sweep window (§12.2) |
| `final_sweep_after` | timestamptz, CHECK per §12.2 | prevents an early sweep |
| `purge_empty_at` | timestamptz | first verified-empty pass |
| `completed_at` | timestamptz | completion proof |
| `anonymised_at` | timestamptz | when `user_id` was nulled |
| `attempt_count` | int NOT NULL default 0, reset on each state change | backoff and escalation |
| `next_attempt_at` | timestamptz NOT NULL | scheduling |
| `lease_until` | timestamptz | crash-safe claim |
| `last_error_class` | text, CHECK in a fixed list (`auth_transient`, `auth_permanent`, `auth_unknown_outcome`, `storage_list`, `storage_remove`, `storage_partial`, `owner_id_path_anomaly`, `db`, `timeout`, `config`) | observability without free text or PII |
| `objects_removed` | int NOT NULL default 0 | evidence; the cancellation boundary |
| `sweep_objects_removed` | int NOT NULL default 0 | a non-zero value signals a policy regression |
| `anomaly_count` | int NOT NULL default 0 | current unresolved OWNER_ID_PATH_ANOMALIES (counts only; **no filenames stored**) |
| `updated_at` | timestamptz NOT NULL | operations |

- **Consistency CHECKs:**
  - post-Auth states ⇒ `auth_deleted_at` and `final_sweep_after` NOT NULL;
  - `completed` ⇒ `purge_empty_at`, `completed_at` NOT NULL and `anomaly_count = 0`;
  - `user_id` IS NULL ⇔ `anonymised_at` IS NOT NULL;
  - `user_id` IS NULL ⇒ `status = 'completed'`.
- **Indexes:** a unique partial index on `(user_id)` WHERE `status NOT IN ('completed','cancelled')`; `(status, next_attempt_at)`.
- **Security:** RLS on with no policies. `REVOKE ALL … FROM PUBLIC, anon, authenticated`. Table privileges for `account_deletion_worker` only: SELECT, INSERT, UPDATE, plus DELETE for retention cleanup of anonymised rows only (§7.3). An even narrower function-only surface may replace the direct grants at N10.3 if it creates no unsafe definer surface (D9).

### 7.3 UUID and row retention (D2/D3)

- `user_id` stays while the workflow is active, through the final sweep and any anomaly resolution.
- On `completed` (same transaction): set `user_id = NULL` and `anonymised_at = now()`. **No hash of the UUID is retained by default.** Only non-identifying operational fields remain: status, timestamps, counts, error class.
- The anonymised row is deleted after a retention period, held as a deployment parameter (`N10_COMPLETED_ROW_RETENTION_DAYS`) so it can change without redesign.
- **Proposed value: 30 days. PROPOSED / REQUIRES HUMAN PRIVACY-LEGAL APPROVAL BEFORE PRODUCTION (D14).**

### 7.4 Functions (definer surfaces minimised)

| Function | Kind | Callers (EXECUTE) | Purpose |
|---|---|---|---|
| `private.account_media_access_allowed()` | SECURITY DEFINER, owner `postgres`, `search_path = ''`, STABLE, no args | `authenticated` only (+ USAGE on `private`) | the Storage RLS guard (§8) |
| `private.auth_user_exists(p_user uuid)` | SECURITY DEFINER, same hardening | `account_deletion_worker` only | Auth commit confirmation without granting the role any access to `auth.users` |
| `private.account_media_canonical(p_user uuid, p_limit int)` | SECURITY DEFINER, same hardening; returns `(bucket_id, name)` | `account_deletion_worker` only | read-only discovery (§10) without granting any `storage.objects` privilege |
| `private.account_media_anomaly_count(p_user uuid)` | SECURITY DEFINER, same hardening; returns a count | `account_deletion_worker` only | anomaly scan (§10.3) |
| `private.account_deletion_requests_guard()` | SECURITY INVOKER trigger | (trigger) | rejects invalid transitions; stamps `updated_at` |

**Why the definer helpers:**

- The worker role must not receive table grants in the Supabase-managed `auth` and `storage` schemas.
- Whether such grants are even possible for a custom role is uncertain (REQUIRES N10.3 VERIFICATION).
- `postgres` already reads both: it did so in G3 and N10.1.

Each helper is read-only, takes only the target UUID (worker callers are trusted backend), returns minimal data, and lives in the non-exposed schema with PUBLIC execute revoked.

## 8. Storage authorisation

### 8.1 Guard helper

`private.account_media_access_allowed()` returns true only when **all** hold:

- `auth.uid() IS NOT NULL`;
- the caller's `auth.users` row exists with `deleted_at IS NULL` (the **live-account check**);
- no request row for the caller has `status <> 'cancelled'` (the **pending-deletion check**).

The caller is derived internally; no argument is accepted. The helper does not read `storage.objects`, so there is **no RLS recursion**. The requests table is owned by the definer, which bypasses its RLS.

**Why SECURITY INVOKER cannot work:** `authenticated` must never read `auth.users` or the requests table.

### 8.2 Policies

Replace the 8 existing media policies (4 per bucket) with `TO authenticated` policies:

`bucket_id = '<bucket>' AND auth.uid()::text = (storage.foldername(name))[1] AND (SELECT private.account_media_access_allowed())`

- **INSERT, UPDATE (with an identical WITH CHECK), DELETE and SELECT are all guarded.** A stale token after deletion, or any token while deletion is pending, cannot write, change, delete, list, read or sign media. This also fixes today's missing WITH CHECK on the `weekly-photos` UPDATE policy.
- Service-role purge requests carry no user token, so they bypass RLS (OFFICIAL DOCS). The worker's Storage and Auth clients must never carry a user session (N10-E17).

### 8.3 Signed URLs and caches (D15)

**Inventory of the current code** (read at N10.2A):

| Location | Mechanism | Bucket | Expiry |
|---|---|---|---|
| `SlotPhotoMemory.tsx:91`, `:164` | `createSignedUrl` | `weekly-photos` | 3,600 s |
| `useWeekMedia.ts:99`, `:198`, `:288` | `createSignedUrl` | `weekly-photos` | `SIGN_TTL_SECONDS` = 3,600 s |
| `firstYearMemories.ts:278` (`signMemoryPhotoUrl`) | `createSignedUrl` | `first-year-memories` | `MEMORY_PHOTO_SIGN_TTL_SECONDS` = 3,600 s |
| `MyPregnancyChapter.tsx:168` | `createSignedUrl` | `weekly-photos` | `SIGNED_URL_SECONDS` = 3,600 s |
| `KeptChapter.tsx:197`, `:211` | `createSignedUrl` | `weekly-photos` | 3,600 s |
| `MyJourney.tsx:180` | `createSignedUrls` (batch) | `weekly-photos` | 3,600 s |

- **Caching:** URLs are held only in component state, and `firstYearMemories.ts` documents them as never stored, exported or placed in a route. There is no persistent cache in the code.
- **Not present:** no `createSignedUploadUrl` / `uploadToSignedUrl`, no resumable/TUS upload, no `getPublicUrl` on these buckets. All uploads are standard `.upload()`.

**Frozen policy:**

- **A.** Once deletion is pending, no new signed media URL is issued for that account. Signing goes through the user's token and is governed by the SELECT policy. That this denies signing is REQUIRES N10.3 REHEARSAL.
- **B.** Changing RLS does not revoke an already-issued signed URL. **No claim is made that RLS revokes existing signed URLs.**
- **C.** The immediate purge after confirmed Auth deletion is the primary way to end access through existing URLs: deleting the object is what terminates access to the media.
- **D.** If Auth deletion fails, existing URLs keep working until they expire (≤ 3,600 s today). This is an **acknowledged residual condition**, because media must not be destroyed before Auth deletion commits.
- **E.** Any CDN or browser-cache propagation after object deletion must be documented and, where possible, rehearsed (REQUIRES N10.3 REHEARSAL).
- **F.** COMPLETED never depends on signed-URL expiry. It depends on object removal and the final sweep (§12.3).

**D15 extension — owner classification after N10.3B (9 October 2026).** D15 now covers **PRE-AUTHORISED MEDIA ACCESS RESIDUALS**, not only signed URLs:

- **G.** Residuals: (1) pre-issued signed URLs; (2) authenticated Storage downloads legitimately served before the freeze and still cached at the CDN edge; (3) browser/client/device copies already delivered before the freeze.
- **H.** The authoritative distinction is **origin access** versus **already-delivered / already-cached bytes**. After deletion is requested, N10 guarantees at the origin: Storage reads denied by policy; new signing denied; new writes denied; cross-user, anon and unauthenticated access denied; stale-JWT origin access after Auth deletion denied.
- **I.** N10's revocation boundary is authoritative origin access **plus** eventual object purge. Deletion invalidates CDN entries, subject to platform propagation. Browser and device caches cannot be guaranteed revoked, and N10 makes no claim that bytes legitimately delivered before the freeze can be recalled.
- **J.** Hosted measurement (N10.3B, `docs/strategy/evidence/n10-3b-hosted-candidate-e/08`, `15`): the Storage CDN served a frozen user's own pre-freeze authenticated downloads back to the **same credential only** (cache keyed on `Authorization`); another user's token, anon and unauthenticated requests reached the origin and were denied; purge ended the cached path within seconds (≤ 3 s measured); while purge was withheld by a forced Auth failure it served for the full 25-minute measurement. **No cross-user cache access was observed.** Classified **ACCEPTED D15 PLATFORM RESIDUAL — PRE-AUTHORISED AUTHENTICATED-DOWNLOAD CDN CACHE**. A beyond-JWT-expiry measurement was considered and deliberately **not required**: token expiry is not a cache revocation mechanism and cannot revoke delivered bytes.
- **K.** Candidate E is **not** changed for this residual: no CDN purge during the freeze, no M4, no change to `delete-account` or the worker. Non-blocking follow-up (not part of Candidate E correctness, not a production activation blocker): *Storage privacy hardening — evaluate shorter `cacheControl` values and/or targeted CDN invalidation for sensitive user media.*

## 9. Deletion flow (`delete-account`, synchronous part)

1. Keep today's checks: `POST`, `{confirmed: true}`, Bearer token. Resolve the caller with `auth.getUser()` using their token. `user_not_found` → **410** (no row created).
2. **Freeze transaction** (as `account_deletion_worker`):
   - `INSERT … ON CONFLICT` on the unique active index `DO NOTHING`;
   - `SELECT … FOR UPDATE` the active row;
   - take a 2-minute lease, or return **202** if another holder's lease is active;
   - commit. From this commit every new Storage operation by the user is denied.
3. **Auth hard delete** with an admin client (secret key, no user session).
4. **Confirm with `private.auth_user_exists`**, never by HTTP status alone:
   - absent → `auth_deleted` (`auth_deleted_at`, `final_sweep_after` per §12.2);
   - present after a 5xx or timeout → stay `requested` with D4 backoff (response **202**);
   - present after a permanent error → `auth_attention` (response **5xx**).
5. If `auth_deleted`: run the **immediate purge** under a hard **~20 s budget** (D1). Correctness never depends on finishing within the request; unfinished work belongs to the worker.
6. Respond per §9.1, then release the lease.

### 9.1 Response contract (D6)

**Fully frozen: H2 resolved, owner confirmed option (a), §24.2.**

| Code | Frozen meaning |
|---|---|
| 200 | **The Auth/account deletion is confirmed committed during this request** (`private.auth_user_exists` = false). The body states the truthful cleanup state, conceptually `{status: "account_deleted", cleanup: "removed"}` when the immediate purge verified empty, or `{status: "account_deleted", cleanup: "continuing"}` otherwise. **200 never means the durable workflow is `completed`**; that needs the final sweep, which is at least 1 h 15 m after `auth_deleted_at` |
| 202 | The request was durably accepted, but Auth/account deletion is **not yet confirmed committed**: Auth retrying, or another holder's lease is active. Media stays frozen and untouched; the worker owns continuation |
| 410 | Account already deleted, or the applicable idempotent deleted condition |
| 5xx | The request could not be safely accepted or persisted, **or** a confirmed pre-Auth permanent failure occurred (row → `auth_attention`; media byte-intact and frozen) |

- Exact production copy and body shape are finalised at implementation. The semantics above are frozen.
- Durable `completed` is governed only by the strict predicate in §12.3.
- Never claim "nothing was deleted" unless it is structurally true. It is true only for a 5xx before the freeze commits, and for a row still in `requested` or `auth_attention`.
- **After a durable request is accepted, the client signs out locally, clears cached user state and redirects.** Final wording is a later UX decision.
- Sign-out is UX only; the boundary is RLS plus the deleted Auth user.

### 9.2 Synchronous vs 202-only

Synchronous Auth deletion plus a best-effort immediate purge is retained. G3 measured Auth deletion at about 0.2 s, and the durable row, not the request lifetime, owns correctness.

## 10. Media discovery and purge

### 10.1 Discovery

Discovery is a read-only metadata query through `private.account_media_canonical` (§7.4). Removal goes only through the Storage API.

- Recursive Storage `list` with offset paging is rejected: it needs recursion, and offsets skip entries while removals shrink the set.
- Reading Storage metadata is not documented as forbidden; mutating it is. The status of reading is ARCHITECTURAL INFERENCE, exercised in N10.1.

### 10.2 Ownership rule (D12)

| Case | Rule | Action |
|---|---|---|
| **A. Canonical** | bucket ∈ {`weekly-photos`, `first-year-memories`} **and** the first path segment **exactly equals** the deleted UUID: `split_part(name, '/', 1) = user_id::text` and `strpos(name, '/') > 0`. No substring or `LIKE` matching. For index use, the query may add the range `name >= uuid || '/' AND name < uuid || '0'`, but the exact segment equality is the authority | **auto-purge**, regardless of `owner_id` (including NULL and service-role uploads) |
| **B. OWNER_ID_PATH_ANOMALY** | same two buckets, `owner_id = user_id::text`, first segment ≠ UUID | **never auto-deleted**; counted in `anomaly_count`; `last_error_class = owner_id_path_anomaly`; → `purge_attention`; alert; **blocks COMPLETED**; resolved only through the supported Storage API after investigation |
| **C. Neither** | — | **never touched** |

UUIDs cannot collide, so rule A cannot select another user's object. 41B.0-R already requires paths to stay prefixed by the owner id, and 41B.1C must keep that.

### 10.3 Purge pass

Run by the worker or function, as the service role for Storage. Allowed only in `auth_deleted`, `awaiting_final_sweep` or `purge_attention`, and only after `private.auth_user_exists` returns false.

1. `account_media_canonical(user_id, 1000)`, ordered by `(bucket_id, name)`, **no OFFSET**. Removals shrink the set, so each call returns the next batch.
2. Per bucket: Storage API `remove(names)`, ≤ 1,000.
3. Re-check those exact names. Any still present → `storage_partial`: stop the pass, back off. This prevents an infinite loop.
4. Repeat until step 1 returns 0 rows, or the time budget ends (the lease then expires to the next run).
5. On 0 canonical rows: `anomaly_count = account_media_anomaly_count(user_id)`.
   - If 0: set `purge_empty_at` → `awaiting_final_sweep`.
   - If > 0: → `purge_attention` + alert.

The pass is safe for 0, 1, 1,001 and many thousands of objects; covers both buckets; has no depth limit; and is idempotent.

**Bucket versioning:** Storage now has object versions and delete markers. The rehearsal must confirm both buckets are unversioned, or that `remove` leaves no recoverable version (REQUIRES N10.3 REHEARSAL).

## 11. Worker and retries

- **Trigger:** pg_cron calls `net.http_post` every minute, invoking `account-deletion-worker` (OFFICIAL DOCS pattern; TSOY already uses it for email). **Superseded detail (§25):** the request carries only the invocation-only secret `X-N10-Worker-Token`, never the service-role JWT or any other privileged credential.
- **D10:**
  - The **cron definition and schedule are version-controlled** (migration or infrastructure definition) and may reference **Vault secret names**.
  - **Secret values stay out-of-band**, never in migrations or Git.
  - The current Supabase-supported deployment method is to be verified at N10.3.
- **Claim:** `… FOR UPDATE SKIP LOCKED LIMIT 5` plus a 5-minute lease. Duplicate cron fires, overlapping runs and the synchronous function never work the same row. A crashed holder's lease expires and the row is reclaimed.
- **Retry schedule (D4, parametric):**
  - **Auth transient or unknown outcome:** about 1 m, 2 m, 5 m, 15 m, 30 m, then at most hourly. **Unresolved after 24 h →** `auth_attention` with escalation.
  - **Confirmed permanent Auth failure →** `auth_attention` immediately. Media stays byte-intact and access stays frozen; an operator alert is required.
  - **Purge after Auth deletion:** keep retrying automatically; **never restore the account**. After 24 h → `purge_attention`, continuing at a bounded cadence (proposed hourly) while alerting. **Never COMPLETE with media remaining.**
- **Budget:** about 50 s of work per invocation. The Edge Function wall-clock limit is REQUIRES N10.3 VERIFICATION.
- **First worker retry:** normally eligible within 1 minute (D1).

### 11.1 Alerting contract (D5)

`auth_attention`, `purge_attention` and any OWNER_ID_PATH_ANOMALY must produce all four of:

1. durable database state;
2. a structured `last_error_class`;
3. a server log line (no PII beyond the request id);
4. **a configured operator notification**.

No operator-alert channel exists in the repository today. N10.3 implements an alert interface or hook without choosing a provider.

**PRODUCTION ACTIVATION BLOCKER — OPERATOR ALERT DESTINATION REQUIRED.**

## 12. Stale token, final sweep and completion

### 12.1 Primary control

The §8 guard denies every Storage command from the moment the freeze commits, and permanently once the Auth user is absent. That closes N10.1 fact 4. **D8: no separate Auth ban is introduced**:

- the guard already freezes media;
- hard deletion is attempted immediately;
- a ban adds a lifecycle state and does not replace the stale-token RLS control.

### 12.2 Final sweep window (D13)

**Fully frozen: H1 resolved, owner confirmed, §24.2.**

- **Window W:** `verified_token_window_seconds`, a deployment configuration that **must be ≥ the project's actual Auth access-token lifetime**. Never hard-coded to N10.1's 3,600 s.
- **Authoritative formula:** `final_sweep_after = auth_deleted_at + max(W, 3600 s) + 15 min`.
  - **Why `auth_deleted_at`:** D8 introduces no Auth ban, so while a request is pending the Auth user still exists and can obtain or refresh a token. `auth_deleted_at` is the point after which no new token can legitimately be minted for the account. It is never earlier than the request time, so it only widens stale-token coverage.
- **Release invariant (N10-E14):** a production deployment **must not proceed** if W is shorter than the project's actual Auth access-token lifetime. If the value cannot be verified: **FAIL CLOSED**.
  - Candidate verification sources, to be confirmed at N10.3: the Auth "JWT expiry" setting (Auth > Sessions; OFFICIAL DOCS) and the Management API project Auth config.
  - Any later increase in the JWT lifetime requires updating and re-verifying W before release.
- **Snapshot:** the value is captured into `final_sweep_after` when the row reaches `auth_deleted`. A CHECK enforces the floor `final_sweep_after ≥ auth_deleted_at + interval '1 hour 15 minutes'` (the 3,600 s floor plus the 15-minute margin).
- **Why the sweep stays even with RLS fixed:**
  - an upload whose permission check passed just before the freeze can commit just after it;
  - policy regressions;
  - future token or configuration drift.

  It is cheap (one empty query) and is retained as defence in depth.

### 12.3 Strict COMPLETED predicate

`completed` is set only when **all** of the following hold, in one transaction:

1. The Auth user is confirmed absent (`private.auth_user_exists` = false).
2. The database deletion outcome is accepted per the G3-backed design: the single GoTrue delete cascades the graph. The rehearsal spot-checks this; it is not re-proven per request.
3. The immediate or retry purge left **zero canonical objects** in both media buckets (`purge_empty_at` set).
4. **Zero unresolved OWNER_ID_PATH_ANOMALIES** in both media buckets.
5. `now() ≥ final_sweep_after`.
6. A final sweep again finds zero canonical objects, removing and re-verifying any it found.
7. A final anomaly scan finds zero.
8. No active lease, retry or error is pending.
9. The transition is valid (the guard trigger).

Only then: `status = 'completed'`, `completed_at`, and in the same transaction `user_id = NULL` and `anonymised_at` (§7.3).

## 13. Other data writes after deletion

No app-wide write freeze is needed:

- all 28 `public` tables with `user_id` carry a direct FK to `auth.users` (checked 28/28), so post-deletion inserts fail with 23503 and reads find nothing;
- writes during `requested` are removed by the single cascading delete (G3).

Status: ARCHITECTURAL INFERENCE; the rehearsal spot-checks it.

## 14. Security model

| Element | Trust / rule |
|---|---|
| Browser | untrusted; sign-out is UX only |
| User access token | may stay cryptographically valid after deletion (N10.1); never proof of a live account |
| Storage RLS + guard | the media boundary for API access; **does not revoke pre-issued signed URLs** (§8.3) |
| `delete-account`, `account-deletion-worker` | trusted backend; the only holders of the secret key and the `account_deletion_worker` credential |
| `account_deletion_worker` role | least privilege: `private` table grants plus EXECUTE on three read-only definer helpers; **no** grants on `auth` or `storage`; **no** `public` writes; **no** BYPASSRLS |
| Secret / service-role key | backend only; never sent with a user session |
| Worker invocation secret (`N10_WORKER_INVOKE_SECRET`) | invocation-only: may start the worker's durable-job loop and nothing else; travels through pg_net (§25) |
| pg_net queue | readable and writable by every database login role on hosted Supabase (platform grants to PUBLIC); **no privileged credential may ever be placed in it** (§25) |
| Storage metadata | **read-only, through definer helpers; no SQL mutation of `storage.objects`, ever** |

## 15. Failure matrix

Auth = Auth user; DB = account graph; Loss = media lost while the account survives; Retention = media of a deleted account persists.

| Scenario | Auth | DB | Media | Row | Auto retry | Loss | Retention | Operator |
|---|---|---|---|---|---|---|---|---|
| No media | gone | gone | none | → completed after sweep | — | no | no | none |
| One file | gone | gone | purged | completed | — | no | seconds | none |
| 1,001+ files | gone | gone | batched | completed | across runs | no | minutes | none |
| Deep nested paths | gone | gone | purged (flat query) | completed | — | no | — | none |
| Both buckets | gone | gone | both purged | completed | — | no | — | none |
| Duplicate request | — | — | — | one active row; 202 | — | no | — | none |
| Upload racing the request | alive → gone | — | pre-freeze object purged; post-freeze denied | normal | — | no | until sweep at worst | none |
| Stale token upload or read after deletion | gone | gone | **denied** | — | — | no | — | none |
| Pre-issued signed URL | — | — | readable until purge (or expiry) | — | — | no | until purge | none (D15 residual) |
| Auth delete 500 | alive | alive | **byte-intact**, frozen | requested | yes (D4) | no | n/a | after 24 h |
| Auth timeout, unknown outcome | per the database check | per check | untouched until confirmed | auth_deleted or requested | yes | no | — | after 24 h if unresolved |
| Auth already gone | gone | gone | purged | auth_deleted → … | — | no | — | none |
| Crash before Auth deletion | alive | alive | intact, frozen | requested (lease expires) | yes | no | — | none |
| Crash right after Auth deletion | gone | gone | present | worker confirms → auth_deleted | yes | no | minutes | none |
| Crash halfway through purge | gone | gone | partly purged | auth_deleted | yes | no | minutes | none |
| One bucket succeeds, second fails | gone | gone | second remains | `storage_remove` | yes | no | until retry | after 24 h |
| Remove partial or error | gone | gone | some remain | `storage_partial` | yes | no | until retry | after 24 h |
| Worker runs twice | — | — | — | SKIP LOCKED + lease | — | no | — | none |
| Worker crashes holding a lease | — | — | — | reclaimed after expiry | yes | no | +5 min | none |
| Final sweep fails | gone | gone | possibly a late object | awaiting_final_sweep | yes | no | until success | after 24 h |
| Database deletion fails | alive | alive | **byte-intact** | requested or auth_attention | transient: yes | no | n/a | yes |
| `owner_id` = user outside prefix | gone | gone | anomaly left untouched | **purge_attention; COMPLETED blocked** | sweep re-checks | no | **yes, until resolved** | **required** (alert) |
| Prefix object with NULL `owner_id` | gone | gone | purged (rule A) | normal | — | no | — | none |
| Service-role object under the prefix | gone | gone | purged (rule A) | normal | — | no | — | none |
| Token lifetime changed after deployment | gone | gone | RLS still denies | W snapshotted per row | — | no | — | release blocked if W < lifetime (N10-E14) |
| Permanent Auth failure | alive | alive | byte-intact, frozen | auth_attention | no | no | n/a | **required**; explicit cancel only within the §6 boundary |

No row loses media while the account survives.

## 16. Privacy and retention (D14: human review, release gate)

| Item | Technical default (for review) |
|---|---|
| Media-purge timing | starts immediately after confirmed Auth deletion; ordinarily finishes within minutes (engineering target, not an SLA or legal claim) |
| UUID retention while active | required through the final sweep and anomaly resolution |
| After COMPLETED | UUID nulled immediately; no hash kept |
| Operational-row retention | 30 days non-identifying, then deleted (PROPOSED) |
| Persistent media when purges fail | retried at a bounded cadence and alerted; never marked complete |
| Operator access to failed records | to be defined |
| User-facing wording | to be defined (backend contract in §9.1) |
| Signed-URL residual | §8.3 D15 |

Paths contain UUIDs, week numbers and memory ids, not names; the media is sensitive and health-adjacent. **D14 stays OPEN FOR HUMAN PRIVACY/LEGAL REVIEW.** It blocks production activation, not local implementation or disposable rehearsal. No legal conclusion is made here.

## 17. Invariants (for automated tests)

- **N10-E1** No Storage object is removed by the workflow before the `auth.users` row is confirmed absent.
- **N10-E2** A pending request denies user media INSERT, UPDATE, DELETE and SELECT.
- **N10-E3** A deleted Auth identity denies media access while an old token is unexpired.
- **N10-E4** The purge is idempotent.
- **N10-E5** Enumeration has no 1,000-object ceiling.
- **N10-E6** Enumeration has no fixed-depth ceiling.
- **N10-E7** Every object deletion uses the Storage API. There is never SQL mutation of `storage.objects`, and the workflow never writes to the `storage` schema.
- **N10-E8** A failed Auth deletion leaves media byte-identical.
- **N10-E9** A failed purge leaves the account deleted and schedules a retry.
- **N10-E10** COMPLETED requires a verified-empty sweep at or after `final_sweep_after`.
- **N10-E11** COMPLETED is impossible while an owner_id/path anomaly remains unresolved.
- **N10-E12** No new signed media URL is issued once account deletion is pending.
- **N10-E13** Runtime database access uses the dedicated least-privilege role, not unrestricted `postgres` credentials.
- **N10-E14** The configured stale-token window is never shorter than the project's verified Auth access-token lifetime; unverifiable means fail closed.
- **N10-E15** `user_id` is retained only while active deletion and anomaly resolution need it, then nulled at COMPLETED, subject to the approved retention contract.
- **N10-E16** The request row survives Auth deletion: no FK, no cascade.
- **N10-E17** Admin Storage and Auth calls never carry a user session.
- **N10-E18** The purge never touches objects outside rule A (§10.2), and OWNER_ID_PATH_ANOMALIES are never auto-deleted.
- **N10-E19** At most one active request per account.
- **N10-E20** `final_sweep_after` respects the §12.2 formula and its CHECK floor.
- **N10-E21** Other users' media and accounts are unchanged by any deletion.
- **N10-E22** Definer helpers are not callable by `anon` or `PUBLIC`; each lives in `private` with `search_path = ''`, and the RLS guard takes no arguments.
- **N10-E23** Cancellation happens only within the §6 boundary and never automatically.
- **N10-E24** Anomaly and log records store counts and error classes, not filenames or PII.
- **N10-E25** G3 and AD-1 are unchanged: the 13 Episode FKs stay RESTRICT and the Layer 1/2 contracts stay green.

## 18. Future surface (paper only)

| Kind | Objects |
|---|---|
| Schema | `private` (not exposed) |
| Role | `account_deletion_worker` (LOGIN; password out-of-band; no BYPASSRLS) |
| Table | `private.account_deletion_requests` (+ indexes, CHECKs, guard trigger) |
| Functions | `private.account_media_access_allowed()`, `private.auth_user_exists(uuid)`, `private.account_media_canonical(uuid, int)`, `private.account_media_anomaly_count(uuid)` (definer, hardened); `private.account_deletion_requests_guard()` (invoker) |
| Edge Functions | `delete-account` (rewritten); `account-deletion-worker` (new); `_shared/accountDeletion.ts` (pure state, purge and backoff logic); an alert hook interface |
| Storage policies | 8 replaced (guarded, `TO authenticated`; UPDATE with WITH CHECK) |
| Bucket | `first-year-memories` brought under version control idempotently. Method to be verified at N10.3: the existing `INSERT INTO storage.buckets … ON CONFLICT DO NOTHING` pattern, or the Storage API at deploy time; never by touching `storage.objects` |
| Cron / Vault | worker schedule version-controlled; Vault secret names only |
| Configuration | `verified_token_window_seconds`, `N10_COMPLETED_ROW_RETENTION_DAYS`, `N10_DB_URL`, alert destination (all out-of-band values) |
| App | `AccountSettings` `deleteAccount`: response handling, sign-out, repeat-click guard |
| Migrations eventually | M1: schema, role grants, table, functions, policies, bucket. M2: cron (role password and Vault values out-of-band) |
| Tests | unit tests (shared logic); static contracts (policies call the guard; no `storage.objects` mutation; no fixed 1,000 or depth constants; the helper is not in an exposed schema); AD-1 Layer 1 unchanged |

## 19. N10.3 implementation boundary

1. **M1 (additive):** schema, role, table, helpers, guarded policies. This alone closes the stale-token Storage hole.
   - **Ordering hazard:** while the old Storage-first function remains live, a deletion still destroys media first. M1 and step 2 must ship close together, or with an owner-accepted interim.
2. **One unit:** the `delete-account` orchestration, the worker, the shared module, the alert hook, M2 (cron) and the caller changes.
3. **Isolated throughout:** unit and static tests; no change to 41B.1A or AD-1.
4. **Before production activation:**
   - hosted rehearsal PASS;
   - owner acceptance;
   - **D14 approval**;
   - **an operator-alert destination**;
   - W verified (N10-E14).

## 20. Hosted rehearsal plan (not created)

- **Environment:** one disposable hosted project (owner-created; new credentials; denylist production, C1, G3 and N10.1).
- **Baseline:** the 47 TSOY migrations plus M1 and M2. **Frozen 41B.1A is not replayed (D11).** G3 already owns the RI model, and keeping them separate keeps failures attributable. A later integrated pre-production rehearsal may combine both.
- **Cases (each PASS by observation):**
  1. Failed Auth deletion (scratch RESTRICT FK, the G3 S1 technique): 0 media touched; `requested` / `auth_attention`.
  2. Successful deletion: HTTP 200 with the truthful cleanup state; immediate purge; 0 canonical objects; the durable row is not `completed` until the strict predicate holds.
  3. Pending blocks upload, update, delete, read and **signing**.
  4. A stale token after deletion cannot INSERT, UPDATE, DELETE, SELECT or sign.
  5. A pre-issued signed URL stops serving after the purge, with any cache residual measured (D15).
  6. 1,001+ objects in one folder; 6+ levels deep; both buckets; a service-role object under the prefix: all purged.
  7. An OWNER_ID_PATH_ANOMALY is not deleted, is counted, leads to `purge_attention`, is alerted through the hook, and **blocks COMPLETED**.
  8. Crash and retry by state seeding (expired lease in each state): idempotent.
  9. Duplicate and concurrent requests: one active row.
  10. Worker double-fire: SKIP LOCKED holds.
  11. The final sweep is not eligible before `final_sweep_after = auth_deleted_at + max(W, 3600 s) + 15 min`, including for a request that waited in `requested` (a token refreshed during pending is covered).
  12. COMPLETED anonymises `user_id`.
  13. Retention cleanup deletes only anonymised rows past retention.
  14. The W verification fails closed when unverifiable.
  15. Bucket versioning is confirmed off, or no recoverable version remains.
  16. The `account_deletion_worker` role cannot write `storage.objects` or `auth.users`, and cannot read `public` data.
  17. Control user unchanged; AD-1 Layer 2 PASS; secret scan clean.

## 21. Relationship to 41B

- The RI/account-deletion database gate remains **CLOSED / PASS**. N10 does not reopen G3, and Candidate E relies on it.
- N10 is **not** a documented prerequisite for 41B.1B (N10.0). 41B.1B remains **NOT AUTHORISED** here.
- N10 must be resolved before any production release of the account-deletion redesign.
- No N10 gate exists before 41B.1C. 41B.0-R requires owner-id-prefixed paths, which rule A depends on. **No new 41B gate is invented.**

## 22. Decision register

| # | Decision | Status |
|---|---|---|
| D1 | Purge target: ~20 s synchronous budget; worker owns the rest; first retry within ~1 min; ordinarily minutes (engineering target) | FROZEN |
| D2/D3 | UUID kept while active; nulled at COMPLETED; no hash; 30-day non-identifying row (proposed), then deleted; duration parametric | FROZEN (30 days needs D14) |
| D4 | Backoff ~1/2/5/15/30 m then hourly; permanent → `auth_attention`; 24 h escalation; purge never restores the account and never completes with media | FROZEN |
| D5 | Durable state + error class + log + operator notification; alert hook interface | FROZEN; **destination is a PRODUCTION ACTIVATION BLOCKER** |
| D6 | 200 = Auth deletion confirmed committed (body reports cleanup state; never means `completed`); 202 = accepted, Auth not yet confirmed; 410; 5xx; client signs out after acceptance (§9.1) | **FULLY FROZEN** (H2 resolved) |
| D7 | No silent restore; `auth_attention` keeps the freeze; explicit cancel within the §6 boundary only | FROZEN |
| D8 | No Auth ban | FROZEN |
| D9 | Dedicated least-privilege role; definer helpers instead of `auth` / `storage` grants | FROZEN (connectivity: N10.3 verification) |
| D10 | Cron version-controlled; Vault names only | FROZEN (method: N10.3 verification) |
| D11 | No 41B.1A in the N10.3 rehearsal | FROZEN |
| D12 | Rule A purge / rule B anomaly blocks completion / rule C never touched | FROZEN |
| D13 | `final_sweep_after = auth_deleted_at + max(W, 3600 s) + 15 min`; W ≥ verified lifetime; fail closed; lifetime increases require re-verification (§12.2) | **FULLY FROZEN** (H1 resolved) |
| D14 | Human privacy/legal review | **OPEN: production release gate** |
| D15 | Pre-authorised media access residual policy (§8.3 A–K; G–K added by owner classification after N10.3B, 9 October 2026) | FROZEN |

## 23. Final verdict

- **N10 = OPEN.** N10.2 = COMPLETE.
- **N10.2A = IMPLEMENTATION CONTRACT FULLY FROZEN** (H1 and H2 resolved and owner confirmed).
- **Candidate E = FULLY FROZEN FOR N10.3.**
- D14 = human release gate. The alert destination is a production activation blocker.
- N10.3 = NOT STARTED.
- Production accessed = NO. 41B.1A applied to production = NO. 41B.1B = NOT STARTED.

## 24. N10.2A — implementation contract freeze record

### 24.1 Applied (owner brief, 9 October 2026)

- Core architecture preserved; Candidate B not reopened.
- OWNER_ID_PATH_ANOMALY semantics and their completion block (§10.2, §12.3).
- D15 signed-URL / cache policy, with the code inventory (§8.3).
- D1–D13 resolved (§22); D14 kept as the human release gate.
- Strict COMPLETED predicate (§12.3).
- Invariants E11–E15 as specified by the owner. The earlier N10.2 extra invariants are renumbered E16–E25.

Implementability review (§20 of the brief), each item checked against current Supabase guidance and TSOY code:

- private-schema access from Edge Functions (direct database connection; nothing exposed);
- worker connection method (dedicated role; pooler connectivity: N10.3 verification);
- helper grants (`authenticated` gets USAGE plus EXECUTE only);
- SECURITY DEFINER hardening (`postgres` owner, `search_path = ''`, PUBLIC revoked);
- no RLS recursion (the guard never reads `storage.objects`);
- exact first-segment matching;
- anomaly blocking;
- signed URLs (the inventory found no signed-upload or resumable paths);
- the cancellation boundary;
- cron/Vault reproducibility;
- the lease model.

No incompatibility with current Supabase or TSOY code was found. Two contract inconsistencies were raised as holds and are now resolved (§24.2).

### 24.2 Holds H1 and H2 — RESOLVED / OWNER CONFIRMED (9 October 2026)

**H1 — RESOLVED.** The final-sweep anchor is `auth_deleted_at`:

`final_sweep_after = auth_deleted_at + max(verified_token_window_seconds, 3600 s) + 15 minutes` (§12.2)

- An earlier proposal anchored on the request time. It was **rejected as too early**: D8 introduces no Auth ban, so while a request is pending the Auth user still exists and can obtain or refresh tokens. Auth retries can keep a request pending for 24 h or more.
- `auth_deleted_at` is the point after which no new token can legitimately be minted for the account, and it only widens coverage.
- Preserved:
  - W ≥ the verified Auth access-token lifetime;
  - an unverifiable lifetime fails release closed;
  - the 3,600 s floor;
  - the 15-minute margin;
  - later lifetime increases require N10 configuration to be updated and verified before release.

**H2 — RESOLVED, option (a).** As set out in §9.1:

- HTTP 200 means the Auth/account deletion is **confirmed committed during this request**, and the body exposes the truthful cleanup state (`removed` or `continuing`).
- 202 means durably accepted but Auth deletion not yet confirmed; media is frozen and untouched, and the worker continues.
- 410 means already deleted.
- 5xx means the request could not be safely accepted or persisted, or a confirmed pre-Auth permanent failure occurred.
- **HTTP 200 never means the durable workflow is COMPLETED.** Durable `completed` is governed only by the strict predicate in §12.3. After it holds: `status = completed`, `completed_at` set, `user_id` nulled and `anonymised_at` set.

With H1 and H2 resolved, **N10.2A is fully frozen and Candidate E is fully frozen for N10.3.**

## 25. N10.3A security patch — invocation-only scheduler credential (9 October 2026)

**Finding (N10.3B §11, hosted, `toqeefrwnsjuhjmobodg`).** Hosted Supabase pg_net grants `net.http_request_queue`, `net._http_response` and USAGE on schema `net` to PUBLIC. Those objects are owned by `supabase_admin`, so a `postgres`-run migration cannot revoke the grants (`REVOKE` returned "no privileges could be revoked"). Every database login role, including `account_deletion_worker`, can therefore queue outbound HTTP requests and read, alter or delete queued requests, headers included. M2 placed `Authorization: Bearer <service-role JWT>` in each queued scheduler request, so the dedicated worker credential could have been escalated to service-role access.

**Decision (owner, 9 October 2026).** The service-role scheduler credential is **rejected**; it is not an accepted residual. D10 still stands as pg_cron + pg_net + Vault, with this change:

- **M3** (`20261009091430_n10_worker_invocation_hardening.sql`) replaces the `n10-account-deletion-worker` job. M1 and M2 stay byte-identical (applied history). The effective request carries only the worker URL, `Content-Type: application/json`, `X-N10-Worker-Token: <invocation-only secret>` and a fixed `{}` body. M3 fails if the installed command references the service-role Vault name, `Authorization` or `apikey`.
- **Vault names:** `n10_account_deletion_worker_url` and `n10_account_deletion_worker_invoke_secret`. The M2 name `n10_account_deletion_worker_service_key` is **superseded and must never be populated**.
- **Invocation-only secret** `N10_WORKER_INVOKE_SECRET`: at least 32 cryptographically random bytes, held only in Vault and in the worker's Edge Function secrets; never committed, printed, logged or exposed to frontend code. The worker fails closed (503) when it is missing or weaker than 43 base64url characters.
- **`account-deletion-worker`: `verify_jwt = false`.** Authentication happens first inside the function: POST only; the `X-N10-Worker-Token` header is compared with the secret using a timing-resistant comparison; any mismatch returns a generic 401. Nothing (database connection, privileged client, body processing) happens before that. `delete-account` keeps `verify_jwt = true` and its user-JWT boundary.
- **No caller-controlled target.** The worker accepts only an empty body or `{}`; any key (user id, request id, email, bucket, path, status, …) is a 400. Due work is chosen exclusively by `private.n10_claim_due` (lease + SKIP LOCKED). Possessing the secret cannot create a request, choose a victim, reach Auth, Storage or application data, or read the request table.
- **Response minimisation.** Success is `{"ok":true}`; errors are generic. No user ids, request ids, states, object names or database details are returned; operational detail stays in redacted server logs.
- **Replay.** Repeated or concurrent valid calls only run the normal loop; existing leases and idempotent state transitions prevent duplicate destructive operations, and calls with no due work are harmless. No nonce protocol is added.
- The worker's backend-only Supabase admin credential is unchanged and stays inside the Edge Function runtime; it never travels through pg_net, cron command text, Vault scheduler headers, HTTP bodies, logs or evidence.

**PLATFORM RESIDUAL — NO PRIVILEGE ESCALATION THROUGH N10 SCHEDULER CREDENTIAL.** `account_deletion_worker` (like any login role) can still technically read pg_net queue rows and queue outbound HTTP. This is accepted only while all of the following hold, and N10.3B must prove them on the hosted project:

1. no privileged Supabase credential ever enters pg_net;
2. no database credential ever enters pg_net;
3. the only N10 scheduler credential visible in pg_net is the invocation-only secret;
4. that secret cannot select or create deletion work;
5. the worker database credential keeps every proven Auth, Storage and private-data denial;
6. `net` stays outside the exposed Data API schemas.

The residual is outbound pg_net capability, **not** privileged credential exposure.

Status after the patch: N10 = OPEN. D14 (privacy/legal) remains the production release gate and the unconfigured operator-alert destination remains a production activation blocker. 41B.1B = NOT STARTED / NOT AUTHORISED.

## 26. N10.3B closeout — owner decisions (9 October 2026)

- **N10.3B = CLOSED / PASS** — PASS WITH DOCUMENTED D15 CDN/BROWSER CACHE RESIDUAL and PASS WITH DOCUMENTED SUPABASE PG_NET PLATFORM RESIDUAL. **Candidate E hosted-runtime proven = YES.** Evidence: `docs/strategy/evidence/n10-3b-hosted-candidate-e/`.
- The rehearsal first returned HOLD for owner classification of the authenticated-download CDN residual; the owner accepted it as a D15-class residual (§8.3 G–K). That HOLD and its evidence remain part of the record.
- The service-role-in-pg_net scheduler design remains rejected; M3 (§25) remains authoritative.
- The 30-day retention cleanup was a **functional rehearsal** of the D14-proposed behaviour: technically proven, **legally unapproved**.
- N10 = OPEN. Production activation blockers: (1) D14 human privacy/legal approval; (2) a real operator-alert destination/configuration. PRODUCTION READY = NO. 41B.1B = NOT STARTED / NOT AUTHORISED.

## 27. N10.4 — Production readiness: privacy/legal + operator alert (IN PROGRESS, 9 October 2026)

- **D14 approval pack:** `docs/strategy/n10-d14-privacy-legal-release-gate.md` (retained-data inventory, 30-day proposal = technically proven / legally unapproved with options A/B/C, risk/purpose table, draft user copy, open legal questions, human decision block). **D14 = OPEN** until a human signs it.
- **D5 operator alerts:** `docs/strategy/n10-operator-alerting.md`. M4 `20261009140726_n10_operator_alert_ledger.sql` adds an additive alert ledger and three worker-only definer functions; the worker sends minimal alerts out-of-band after its durable-job loop through the existing Lovable Email integration called directly from its runtime (not via pg_net or the e-mail queue). Destination `N10_OPERATOR_ALERT_EMAIL` and sender `N10_OPERATOR_ALERT_FROM` need owner input. **Operator-alert blocker = OPEN** until configured and smoke-tested at activation. M1/M2/M3 unchanged; M3 boundary unchanged.
- **Platform guidance divergence (recorded):** current Supabase guidance recommends that cron/pg_net callers send a secret API key in the `apikey` header. On hosted projects pg_net's queue is readable by every login role (§25), so N10 keeps M3's invocation-only secret instead.
- **Pre-existing finding outside N10 code (owner decision before activation):** the historical e-mail queue dispatcher `public.email_queue_dispatch` (migration `20260720110000`) sends `Authorization: Bearer <service-role key>` through pg_net. If configured in production, that key passes through the same PUBLIC-readable queue, so any database login role — including `account_deletion_worker` once activated — could read it. Not changed in N10.4.
- **Retention findings for D14 (pre-existing, not changed):** `email_send_log`, `suppressed_emails`, `email_unsubscribe_tokens` (e-mail addresses, no FK to Auth) and PostHog person data (consenting users) are not removed by account deletion today.
