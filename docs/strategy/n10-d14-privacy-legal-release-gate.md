# N10 — D14 privacy / legal release gate (approval pack)

**Status: D14 = OPEN.** This pack is prepared by Claude Code (implementation owner) for a human privacy/legal decision-maker. It does not approve anything and does not state any lawful basis as fact. Items marked **LEGAL REVIEW REQUIRED** are questions for counsel or the responsible privacy decision-maker.

Phase: N10.4 — Production Readiness: Privacy/Legal + Operator Alert. Production has not been accessed; Candidate E is not active in production.

**Revision 2 (11 October 2026) — engineering changes made since the first draft (all local, not deployed; D14 still OPEN):**
- **M6 `20261011050647_n10_privacy_minimisation.sql`:** when an Auth user is deleted, the account's rows in `public.email_send_log` and `public.email_unsubscribe_tokens` (matched by e-mail address, case-insensitive) are deleted in the same transaction (rows K and M). `public.suppressed_emails` is **kept** pending your decision (row L). **Required same-database e-mail cleanup is transactional with Auth deletion (owner decision, 13 October 2026):** if the cleanup fails, the whole Auth deletion rolls back, account deletion is not considered committed, media stays untouched, and N10 retries on its normal schedule (escalating to `auth_attention` and an operator alert if it persists). *(Superseded draft wording: "the minimisation can never block the Auth deletion" — replaced because it allowed a committed deletion with e-mail records left behind.)*
- **M6 + worker:** completed-row retention now also accepts **0 days** (option C), so every option in §5 is implementable by configuration alone.
- **M5 `20261011050645_email_queue_invocation_hardening.sql`:** the e-mail queue no longer sends a service-role key through pg_net (security fix).
- **Operator alerts:** destination `contact@thestartofyou.com`, sender `contact@wesellproducts.co.uk` (owner decision); alerts contain no personal data.

## 0A. Revision 4 — owner direction recorded + D14.1 privacy hardening (15 October 2026)

**D14 = OPEN.** The owner accepted the Revision 3 packet as the decision basis and gave the direction below. **This is owner approval of engineering direction, not formal legal approval.** D14 closes only when every item marked **LEGAL REVIEW REQUIRED** has received the required human privacy/legal review and the formal block in §11 is completed. Owner acceptance on the owner's own authority does **not** clear a legal-review item (this supersedes the contrary wording previously in 0.8 and 0.11). Production accessed/modified = **NO**. 41B.1B = **NOT STARTED / NOT AUTHORISED**. Real Lovable delivery proof remains pending controlled production activation.

### 0A.1 Owner decisions (recorded 15 October 2026)

| | Item | Owner decision | State after D14.1 |
|---|---|---|---|
| A | Completed deletion record | **APPROVED** — 30 days, then automatic deletion; set `N10_COMPLETED_ROW_RETENTION_DAYS=30` at activation; described as **pseudonymous, not anonymous**; no name, e-mail, journey/health data, media path/content or durable user identifier after completion | implemented; value set at activation. LEGAL REVIEW REQUIRED remains (0.9 Q1) |
| B | `email_send_log` | **APPROVED** — deleted atomically with Auth deletion (M6) | implemented, hosted-proven (N10.5) |
| C | `email_unsubscribe_tokens` | **APPROVED** — deleted atomically with Auth deletion (M6) | implemented, hosted-proven (N10.5) |
| D | `suppressed_emails` | **OPEN / VERIFY REQUIREMENT** — retention *not* approved. Preference: if the local table is not required for enforcement, delete the account's row with account deletion; if required, keep only the minimum representation and assess a normalised/hash key | investigated (0A.3); not implemented; narrow read-only check defined for activation |
| E | PostHog | **APPROVED ENGINEERING DIRECTION** — remove the server-side analytics identity and request deletion of its events, durably, gating COMPLETED | **implemented locally (M7 + worker + adapter, 0A.2)**; not deployed; credential not created |
| F | Provider backups / logs | **APPROVED** — disclose provider-managed residual retention; exact periods only where documentation and the actual production plan prove them | wording rule applied (0A.4) |
| G | UI / Privacy wording | **APPROVED AS WORKING DRAFT / NOT PUBLISHED** — subject to legal review and to D/E | 0.7 + deltas in 0A.4; not published |

### 0A.2 E — durable analytics-identity erasure (D14.1, implemented locally)

**Mechanism (re-verified 15 October 2026 against PostHog's published OpenAPI schema, operation `persons_bulk_delete_create`):** `POST {host}/api/projects/{project_id}/persons/bulk_delete/` with body `{"distinct_ids": ["<user uuid>"], "delete_events": true, "delete_recordings": true, "keep_person": false}`, header `Authorization: Bearer <personal API key>`, required scope **`person:write`**, success **202** reporting `persons_found`, `persons_queued_for_deletion`, `events_queued_for_deletion`, `deletion_errors`. PostHog states that person records are removed in the background shortly after the request, that **only events captured before the request are deleted**, and (privacy docs) that event data is deleted **asynchronously during non-peak times**, not instantly. This replaces the 0.5 two-call design (list + `DELETE persons/<uuid>`): one call by distinct id, so no `person:read` scope is needed. The distinct id is the Supabase user UUID (`src/App.tsx` → `identify(uid)`).

**Credential and minimum permission**

| Item | Requirement |
|---|---|
| `POSTHOG_PERSONAL_API_KEY` | PostHog **personal** API key (`phx_…`) created by the owner, **scoped to the single TSOY project only**, with the **`person:write`** scope only (no other scope, no organisation-wide access). Supabase **Edge Function secret** only — never `VITE_*`, client code, Git, the database, Vault or pg_net. Do not paste it into chat |
| `POSTHOG_PROJECT_ID` | numeric project id (Edge Function secret / config) |
| `POSTHOG_API_HOST` | the private API host of the project's region: exactly `https://eu.posthog.com` or `https://us.posthog.com` (not the `*.i.posthog.com` ingestion host). Any other value fails closed. The production region is **VERIFY** at activation (the client default is US; `.env.example` shows EU) |

**Architecture (smallest auditable change; no new status).** Separate columns are enough; an explicit `privacy_attention` state is **not** required, because analytics erasure is independent of the media state machine: a new status would have to be combined with every media state (`auth_deleted`, `awaiting_final_sweep`, `purge_attention`), would change the frozen transition graph and claim predicates, and would block media work while waiting for analytics. `purge_attention` is **not** reused (its meaning stays "media purge"). Migration **M7 `20261015053138_n10_analytics_erasure.sql`** (created with `supabase migration new`; M1–M6 and frozen 41B.1A unchanged — hashes pinned in tests):

1. `analytics_*` columns on the request row: `analytics_status` (`pending` → `resolved`; `not_tracked` only for rows that were already terminal when M7 ran), attempt count, next attempt, **its own lease**, last error class (`analytics_config` / `analytics_transient` / `analytics_permanent`), `analytics_attention_since`, `analytics_resolved_at`, `analytics_persons_found` (a count; no identifier).
2. `n10_analytics_due` / `n10_record_analytics` (worker-only, hardened definer functions). Claimable only **after** `auth_deleted_at` is set and while `user_id` is still present; first attempt 15 minutes after Auth deletion so PostHog has ingested the last client events. Retry: 1, 2, 5, 15, 30 min, then hourly. `analytics_config` (missing/malformed credential) and `analytics_permanent` (provider 4xx) become **attention immediately**; transient failures (408/429/5xx/network/timeout/malformed or partial response) become attention after **24 hours** since Auth deletion; attention keeps retrying hourly.
3. **Completion gate, three independent layers:** `n10_record_purge` (M1 body unchanged except the gate) keeps the request in `awaiting_final_sweep` until erasure is resolved; a CHECK constraint forbids `completed` unless resolved; the `n10_analytics_guard` trigger forbids completing, or clearing `user_id`, while unresolved, allows only `pending → resolved`, and only while the Auth user is absent. When erasure resolves after the window, the final sweep is brought forward so completion follows on the next worker tick.
4. **Alerts:** persistent failure is the durable condition `analytics_attention_since`; the M4 ledger alerts it under the key `analytics_attention:<error class>` ("Analytics identity erasure needs operator attention"), deduplicated and escalated after 24 h exactly like auth/purge attention, with no personal data. (`n10_alerts_due` / `n10_alerts_pending_count` bodies replaced in M7; behaviour for auth/purge attention rows unchanged.)

**Runtime.** `account-deletion-worker` runs the media loop first, then the analytics loop (30 s budget, 10 s per provider call), then alerts. The provider call is made from the Edge Function runtime with `fetch` — never pg_net — through the provider-neutral `AnalyticsEraser` boundary; the PostHog adapter is isolated in `_shared/analyticsErasureProvider.ts` (swappable like the alert adapter). A missing or malformed credential produces **no eraser** and is recorded as a durable `analytics_config` failure (fails closed, request stays pending). Logs and alerts carry the opaque request id and error class only — never the user id, the credential or provider messages. `delete-account`'s synchronous path does not call PostHog.

**Invariants preserved.** Auth deletion stays account-first (erasure is never claimed before `auth_deleted_at`). **Media purge is independent of PostHog availability**: the immediate purge in `delete-account` never consults analytics, the worker's media loop runs before and separately from the analytics loop with separate leases, and an analytics failure never changes the media status. **COMPLETED / anonymisation cannot occur while erasure is unresolved**, and the user id needed for erasure is retained until then. No silent best-effort: every failure is recorded, retried and, if persistent, alerted.

**Semantics to state accurately.** "Resolved" means PostHog accepted the deletion request (person queued, event deletion requested) or found no person for the id (a user who never consented to analytics, or a retry after an earlier accepted request). It does **not** mean events are physically erased at that moment: PostHog processes event deletion asynchronously. Events captured *after* the request (for example from a stale browser tab) are not covered by that request.

**Tests** (`src/test/n10AnalyticsErasure.test.ts`, real M1+M4+M6+M7 in PGlite, fake PostHog fetch): successful cleanup; missing credential fails closed/pending; 4xx permanent; 5xx/network/timeout transient and 24 h attention; partial/malformed 202 retries; only UUIDs sent; host allow-list; no secret leakage; media purge independent and first; COMPLETED gated (worker and direct writes); user id not anonymised early; resolution refused while the Auth user exists or with a wrong lease; idempotent repeated runs and lease exclusion; persistent failure → one alert, no duplicate, new key on class change, cleared on resolution. **Mutation tests:** database gate layers removed one at a time (each remaining layer still refuses; all three removed → completes, detected); 10 TypeScript mutants (classification, fail-closed config, ordering, record mapping, alert class, request body, host allow-list) — all killed.

**Hosted rehearsal.** M7 alters the hosted request table, replaces three function bodies and adds a trigger; PGlite cannot prove hosted behaviour (hosted PostgreSQL 17 privileges, the pooler, the real worker role). A short hosted rehearsal of M7 on a disposable project (fake PostHog endpoint, or a PostHog test project with a test-only key) is **recommended before production**; the owner decides.

### 0A.3 D — suppression-table investigation (no production access)

| Evidence | Finding |
|---|---|
| Repository code | No Edge Function, trigger, migration or client code writes **or reads** `public.suppressed_emails`; `process-email-queue` sends without consulting it. The 21 April 2026 e-mail migration's comments refer to a "suppression edge function"; **no such function is in this repository** (nor `auth-email-hook`, `send-transactional-email` or an unsubscribe page) |
| Provider SDK (`@lovable.dev/email-js` 0.3.1, the version used) | Lovable Email keeps **its own** unsubscribe state per recipient and sender-domain apex (`getEmailUnsubscribe` / `setEmailUnsubscribe`); spam complaints cannot be lifted (409 `complaint_not_liftable`); unsubscribed or bounced cc/bcc recipients are dropped by the API itself. Bounce/complaint/unsubscribe events are delivered to the project only if a webhook handler (`createEmailWebhookHandler`) is deployed — the place a project-side mirror would be written |
| Lovable docs (custom emails, 15 Oct 2026) | "When a user unsubscribes, their email is added to a suppression list and future app emails to that address are blocked automatically before sending." Projects created before 9 July 2026 include the unsubscribe page in the app; none exists here, consistent with the project sending **auth e-mails only** (which carry no unsubscribe) |

**Conclusion:** the evidence indicates that the local table is **not** the enforcement point — Lovable's provider-side state is — and that nothing in this codebase populates it. It **cannot be fully established without production** whether a Lovable-managed function deployed outside Git writes or reads it, or whether it holds rows. **D stays OPEN.** Nothing was implemented.

**Narrow read-only production check (only during the later, owner-authorised activation phase):**
1. Edge Function **names** deployed in production (Management API list; names only) — is any suppression/webhook/transactional function deployed that is not in Git?
2. `select reason, count(*), min(created_at), max(created_at) from public.suppressed_emails group by reason;` (aggregates only, no addresses).
3. `select p.oid::regprocedure from pg_proc p where p.prosrc ilike '%suppressed_emails%';` and `select tgname from pg_trigger where tgrelid = 'public.suppressed_emails'::regclass and not tgisinternal;` (any in-database consumer).

**Decision rule after the check:** no external consumer → delete the account's row with Auth deletion (a new migration replacing `private.n10_forget_email_records` to add one `DELETE … WHERE lower(email) = lower(OLD.email)`, atomic like M6), and the Privacy Policy suppression sentence is removed. An external consumer that genuinely enforces suppression → keep the minimum (`email`, `reason`, `created_at`; review `metadata`), assess a keyed hash of the normalised address with that writer, and keep the disclosure. Either path is **LEGAL REVIEW REQUIRED** (0.9 Q2).

### 0A.4 F and G — wording rules after D14.1 (draft, not published)

- F: no exact period is published unless current provider documentation **and** the confirmed production plan prove it; otherwise "for a limited period under their own retention schedules". No claim of immediate deletion from Supabase backups/PITR, platform/Auth logs, Lovable Email logs, Lovable AI Gateway logs, or PostHog systems.
- G, Privacy Policy "Analytics" bullet (replaces the 0.7 bullet once M7 is activated): *"If you allowed analytics, we ask our analytics provider to delete the analytics profile linked to your account and the events recorded with it. The provider completes this deletion in the background, so it isn't instant."*
- G, the 0.7 suppression sentence stays **conditional on D**; it is removed if D resolves to deletion.
- G, confirmation dialog: no change required by E (it does not mention analytics); optional addition for legal review: *"If you allowed analytics, your analytics profile is deleted too."*

### 0A.5 Remaining privacy/legal questions (LEGAL REVIEW REQUIRED; D14 stays OPEN)

1. **A:** purpose and necessity of the 30-day pseudonymous completed record (owner-approved direction; legal review still required).
2. **D:** lawful basis for any suppression record after deletion; whether a project-side copy is necessary given provider-side suppression (after the 0A.3 check).
3. **E:** whether PostHog's asynchronous deletion (and its own backup/retention behaviour) is sufficient, and the exact Privacy Policy wording for it.
4. **F/G:** accuracy of the Privacy Policy text, including "backups aren't used to restore deleted accounts" (an operational commitment the owner must keep).
5. **Processors:** data-processing terms, regions and retention for Lovable Email, Lovable AI Gateway, PostHog and Supabase.

### 0A.6 Engineering status and what remains

Done locally in D14.1: M7, worker analytics loop, PostHog adapter, alert integration, tests and mutations, this documentation. Remaining before controlled activation: owner decision on a hosted rehearsal of M7; owner creates the PostHog key (project-scoped, `person:write`) and sets `POSTHOG_PERSONAL_API_KEY` / `POSTHOG_PROJECT_ID` / `POSTHOG_API_HOST` as Edge Function secrets at activation; the D read-only check and the resulting D change; legal review of 0A.5; implementing the approved wording (UI + Privacy page) after legal review; then controlled activation with the Lovable delivery proofs (real alert to `contact@thestartofyou.com` from `contact@wesellproducts.co.uk` with sender acceptance verified; one real e-mail-queue delivery; proof that no privileged credential passes through pg_net). If production turns out not to use PostHog at all, activation must not proceed with M7 until the owner decides how that is recorded — M7 deliberately has no bypass.

## 0. Owner decision packet — Revision 3 (15 October 2026)

*Historical decision basis, accepted by the owner on 15 October 2026. Where it differs from §0A (Revision 4), §0A governs.*

**D14 = OPEN.** This section turns the owner's proposed direction into individually approvable decisions. Approving them is an **owner decision**, not formal legal approval; items marked **LEGAL REVIEW REQUIRED** still need a qualified privacy/legal reviewer. Nothing here has been deployed; production has not been accessed. Sections 1–11 below are the earlier analysis and drafts, kept for history; where they differ, this section governs.

Evidence base: N10.3B (`docs/strategy/evidence/n10-3b-hosted-candidate-e/`) and N10.5 (`docs/strategy/evidence/n10-5-hosted-n104/`) — hosted core PASS; real Lovable e-mail delivery **HOLD** (the Lovable-managed `LOVABLE_API_KEY` cannot exist in a disposable project; not a core N10 failure — to be proven in controlled activation).

### 0.1 Decision summary

| | Item | Proposed owner decision | Implementation state | External review |
|---|---|---|---|---|
| A | Completed deletion record | **Keep 30 days after completion, then delete automatically** | implemented; set `N10_COMPLETED_ROW_RETENTION_DAYS=30` at activation | LEGAL REVIEW REQUIRED (purpose/necessity) |
| B | `email_send_log` | **Delete atomically with the account** | implemented (M6), hosted-proven (N10.5) | confirm only |
| C | `email_unsubscribe_tokens` | **Delete atomically with the account** | implemented (M6), hosted-proven (N10.5) | confirm only |
| D | `suppressed_emails` | **Keep only a minimum suppression record** (not account data) | current table kept untouched; see 0.4 finding | LEGAL REVIEW REQUIRED (basis + whether a repository copy is needed at all) |
| E | PostHog person data | **Delete server-side as part of the deletion workflow** | **NOT AUTHORISED / NOT IMPLEMENTED**; needs a backend credential (0.5) | LEGAL REVIEW REQUIRED (events retention) |
| F | Backups / platform logs / providers | **Disclose provider-managed retention; no claim of immediate deletion** | documentation only | VERIFY plan values + provider terms |
| G | UI + Privacy Policy wording | **Adopt §0.7 wording** | not published | LEGAL REVIEW REQUIRED (Privacy Policy text) |

### 0.2 A — Completed deletion record (30 days)

After completion the row contains only: random request `id`; `status = completed`; `requested_at`, `auth_deleted_at`, `final_sweep_after`, `purge_empty_at`, `completed_at`, `anonymised_at`, `updated_at`; `attempt_count`, `next_attempt_at`, `lease_until`; `last_error_class` (NULL at completion); `objects_removed`, `sweep_objects_removed`, `anomaly_count = 0`; M4 alert metadata (`alert_key` such as `purge_attention:storage_remove`, alert timestamps, failure count). **`user_id` is NULL** (enforced by CHECK constraints). No name, e-mail, hash of the user, journey/health data, Storage path or content.

It is **pseudonymous, not anonymous**: during the retention window its request id and exact timestamps could be correlated with platform/Auth logs, backups or the operator alert e-mail. Deletion after 30 days is automatic (`n10_cleanup_completed(30)`, hosted-proven; 0-day option also proven). If the variable were unset, rows would be kept indefinitely — activation must set it.

### 0.3 B and C — e-mail delivery log and unsubscribe tokens (implemented)

Wording check against the code (M6 `20261011050647_n10_privacy_minimisation.sql`, sha256 `9f9acf6f…`): the rows whose address matches the account's **current** e-mail address, case-insensitively, are deleted **inside the Auth deletion transaction**. If that cleanup fails, the Auth deletion and all its cascades roll back and N10 retries (hosted-proven: GoTrue returned 500 with the forced error; zero media removed; retry succeeded). Limitation to state accurately: rows logged under an **earlier** address (before an e-mail change) are not matched.

### 0.4 D — suppression records: what exists and what it is for

| Fact | Detail |
|---|---|
| Fields | `id` (uuid), **`email` (clear text, unique)**, `reason` (`unsubscribe` / `bounce` / `complaint`), `metadata` (jsonb — written outside this repository; contents unknown), `created_at` |
| Access | RLS on; service role may SELECT and INSERT; no UPDATE/DELETE policies (append-only by design) |
| **Who writes it** | **no code in this repository** (no Edge Function, trigger or migration inserts rows); if populated, it is by Lovable-managed e-mail tooling outside the repo — **VERIFY at activation** (read-only count and source; owner-authorised) |
| **Who enforces it** | **nothing in this repository reads it**: `process-email-queue` sends without consulting it. Suppression appears to be enforced **provider-side** by Lovable Email (the send call carries an `unsubscribe_token`; the provider SDK exposes its own unsubscribe state keyed by recipient + domain) |
| Clear e-mail required? | not by any repository code |
| Hash design feasible? | yes for equality checks (e.g. a keyed hash of the normalised address), **but** it needs a migration (hash column, backfill, drop clear column, change the uniqueness rule), every writer to compute the same keyed hash (the writer is outside the repo), and a key held server-side. Provider-side suppression lists hold clear addresses regardless |
| Options | **D1** keep the current minimal record and disclose it (owner's proposed direction); **D2** convert to a keyed hash (engineering + coordination with the external writer); **D3** delete the account's row with the account (one-line M6 change) and rely on provider-side suppression |

Proposed: **D1** for now, explicitly classified as suppression (not account/profile data), with the finding above put to the reviewer: if the repository copy does not enforce anything, its necessity is questionable. **LEGAL REVIEW REQUIRED.**

### 0.5 E — PostHog: current implementation and preferred option

**Current:** PostHog loads only after analytics consent (`autocapture`, page views, session recording and surveys disabled; `person_profiles: "identified_only"`; host default `https://us.i.posthog.com`). On sign-in the browser calls `identify(<user id>)`, creating a person profile keyed by the user's UUID; events carry no names, e-mails or health data by policy (`src/lib/analyticsEvents.ts`). Sign-out after deletion calls `posthog.reset()` (browser identity cleared). **Server-side person data and events remain today.**

**Supported mechanism (PostHog docs, checked 15 Oct 2026):** `DELETE /api/projects/<project_id>/persons/<person_uuid>` with a personal API key returns 202 and removes the person; **events are deleted only with `delete_events=true`**, asynchronously during off-peak hours (status via `persons/deletion_status`). The person is found by listing persons filtered by the user's distinct id.

*(Superseded by §0A.2: the owner approved the engineering direction; the implemented design uses one `bulk_delete` call and gates COMPLETED instead of "alert, not block".)* **Preferred option (Revision 3 text):** in the N10 worker, after Auth deletion is confirmed and **before** the request is anonymised (the user id is still on the row), look up the person by distinct id and delete it with `delete_events=true`, through a provider adapter isolated like the e-mail adapter. Failure retries on the worker schedule; whether a persistent PostHog failure should block `completed` or raise an operator alert is an owner choice (recommended: alert, not block, since analytics is not account data held by TSOY).

| Credential | Value |
|---|---|
| Name | `POSTHOG_PERSONAL_API_KEY` (plus non-secret `POSTHOG_PROJECT_ID`, `POSTHOG_API_HOST` e.g. `https://us.posthog.com`) |
| Where | Supabase **Edge Function secret** (backend-only); never `VITE_*`, never client code, never pg_net |
| Minimum permission | a personal API key **limited to the single TSOY PostHog project** with person **read + write** scopes only (exact scope names to be confirmed in PostHog at implementation) |
| Owner action | create it in PostHog yourself and save it as the Edge Function secret at activation — **do not paste it into chat** |

Historical events: if `delete_events=true` is used, events are deleted asynchronously (not instantly); if not, events remain under the UUID (pseudonymous). Privacy wording must say analytics data is deleted "after a short processing delay", not instantly. PostHog's own backup/retention terms: **VERIFY**. **LEGAL REVIEW REQUIRED** on whether event deletion is required or pseudonymous retention is acceptable.

### 0.6 F — what is deleted, what expires, what cannot be recalled

| Category | What | Retention / behaviour | Source |
|---|---|---|---|
| **A. Removed from the active application** | Auth account; all account-owned database rows (cascade); private photos/videos/voice notes; e-mail delivery log + unsubscribe tokens for the current address | at deletion (media purge may take a short time in the background; a final sweep follows after about 1 h 15 min) | N10.3B / N10.5 evidence |
| **B. Temporary provider-managed retention** | Supabase daily backups | Pro 7 days, Team 14 days, Enterprise custom; PITR add-on in 7-day steps (7/14/28, >28 on Enterprise). Individual records are not removed from backups | Supabase pricing + backups docs (15 Oct 2026) |
| | Supabase platform logs (API, database, Auth, Storage, Edge Functions) | Free 1 day, Pro 7 days, Team 28 days, Enterprise 90 days | Supabase pricing (15 Oct 2026) |
| | Supabase Auth audit trail (`auth.audit_log_entries`) | platform-managed; not deleted by N10; retention **not documented — VERIFY** | — |
| | Lovable Email delivery logs | plan-dependent retention window ("history_starts_at" in the provider SDK); exact period **not publicly documented — VERIFY with Lovable** | `@lovable.dev/email-js` 0.3.1 types |
| | Lovable AI Gateway (all AI features call `ai.gateway.lovable.dev`) | request/response retention **not publicly documented — VERIFY with Lovable** (EU inference option exists) | Lovable Cloud docs |
| | PostHog (consenting users only) | until deleted per 0.5; provider retention **VERIFY** | PostHog docs |
| | Operator alert e-mails (`contact@thestartofyou.com`) | request id + timestamps only; mailbox retention is the operator's | n10-operator-alerting.md |
| | Completed deletion record | 30 days (A) | — |
| | Suppression record | indefinite unless decided (D) | — |
| **C. Already delivered (D15)** | files the user downloaded, screenshots, browser/device caches, CDN copies already served to that browser | cannot be remotely recalled; CDN copies end when the files are purged | D15 (owner-accepted) |

The production Supabase plan determines the B values — **confirm the plan** before publishing numbers; the wording below avoids fixed numbers.

### 0.7 G — final proposed wording (not published)

**Account settings — Delete account**
> **Delete account**
> Permanently deletes your account and everything saved to it — your journeys, logs and reflections, baby details, First Year notes and memories, and every private photo, video and voice note. This can't be undone. If you'd like a copy first, download your data before you continue.

**Confirmation dialog**
> **Permanently delete your account?**
> Your account is deleted first and you'll be signed out straight away — you won't be able to sign in to it again. Your private photos, videos and voice notes are then removed in the background, usually within a few minutes.
> We keep a short technical record that the deletion happened — with no name, email address, profile or content — for 30 days so we can confirm it finished, then delete it. Our email delivery records for your address are deleted with your account.
> Copies you've already downloaded, or that your browser has saved, stay on your devices — we can't remove those.
> [Cancel] [Delete my account]

**After the request**
- *Deleted (200):* "Your account has been deleted. Any remaining photos and files are being removed in the background — you don't need to do anything."
- *In progress (202):* "We've received your request and your account is being deleted. Your photos and files are locked and can't be viewed while this finishes. You don't need to do anything."
- *Already deleted (410):* "This account has already been deleted."
- *Not started (5xx):* "We couldn't start the deletion just now. Nothing has been deleted. Please try again in a few minutes."

**Privacy Policy — Deleting your account** *(LEGAL REVIEW REQUIRED)*
> You can permanently delete your account from Account settings. When you do:
> - **Your account is removed first.** You're signed out and can no longer sign in, and the information saved to your account is deleted with it.
> - **Your private files are deleted.** Photos, videos and voice notes are removed from our storage, usually within a few minutes; a final check runs shortly afterwards to remove anything left behind.
> - **Email records.** Our record of emails we sent you, and your unsubscribe link, are deleted with your account. If you had unsubscribed from our emails, or an email to you bounced or was reported, we may keep your email address on a do-not-email list solely so we never email you again.
> - **A short technical record.** We keep a minimal record that the deletion took place — when it was requested and completed, and whether it succeeded — for 30 days, then delete it automatically. It contains no name, email address, profile or content.
> - **Analytics.** If you allowed analytics, the analytics profile linked to your account is deleted after a short processing delay. *(Include only once E is implemented and approved.)*
> - **Backups and system logs.** Our hosting and service providers keep encrypted backups and system logs for a limited period under their own retention schedules, after which they are deleted. We can't remove individual records from backups, but backups aren't used to restore deleted accounts.
> - **Copies you already have.** Deleting your account can't reach copies that already left our service, such as files you downloaded or copies saved by your browser.

*Check before publishing:* the "not used to restore deleted accounts" statement is an operational commitment the owner must be willing to keep.

### 0.8 OWNER DECISION — approve in one message (D14 stays OPEN until legal review items are cleared)

```
N10 D14 OWNER DECISION

A. Completed deletion record kept 30 days, then deleted automatically      [ ] APPROVE  [ ] CHANGE: ____ days
B. email_send_log deleted atomically with the account (M6)                 [ ] APPROVE  [ ] CHANGE
C. email_unsubscribe_tokens deleted atomically with the account (M6)       [ ] APPROVE  [ ] CHANGE
D. suppressed_emails: keep minimum suppression record (D1)                 [ ] APPROVE D1  [ ] D2 hash  [ ] D3 delete
E. PostHog: authorise server-side person + event deletion (0.5);
   I will create POSTHOG_PERSONAL_API_KEY myself                          [ ] AUTHORISE  [ ] NOT NOW
   persistent PostHog failure should:                                      [ ] ALERT ONLY  [ ] BLOCK COMPLETION
F. Disclose provider backup/log retention as in 0.6 (no immediate-deletion
   claim); production Supabase plan = ________                            [ ] APPROVE
G. Adopt the 0.7 UI copy                                                   [ ] APPROVE  [ ] CHANGE
   Adopt the 0.7 Privacy Policy text subject to legal review               [ ] APPROVE  [ ] CHANGE

Owner: ________________   Date: ________________
```

This owner block does **not** close D14. D14 closes when the owner block is approved **and** the LEGAL REVIEW REQUIRED items in 0.9 have received the required human privacy/legal review, and the formal block in §11 is completed. *(Superseded wording, withdrawn in Revision 4: an alternative allowing the owner to proceed on their own authority. Owner approval authorises engineering direction only; it does not clear a legal-review item.)*

### 0.9 Questions that genuinely need external privacy/legal review

1. Lawful basis and necessity for keeping the completed deletion record for 30 days (A).
2. Lawful basis for keeping a suppression list after account deletion, and whether a repository copy is needed when the provider enforces suppression (D).
3. Whether PostHog events must be deleted, or pseudonymous retention under the UUID is acceptable for consenting users (E).
4. Whether the Privacy Policy text in 0.7 is accurate and sufficient, including the backup statement (G).
5. Provider/processor terms: Lovable Email, Lovable AI Gateway, PostHog, Supabase (data-processing agreements, regions, retention) (F).

### 0.10 Engineering work after approval (not started)

1. Set `N10_COMPLETED_ROW_RETENTION_DAYS` to the approved value at activation.
2. If E is authorised: implement the PostHog deletion adapter in the worker (isolated adapter, backend-only secret, retries, alert or block per decision), tests with a fake provider, a hosted rehearsal of that step, and a privacy-wording toggle.
3. If D2 or D3 is chosen: a new migration (hash conversion or deletion in M6's successor) plus tests; D2 also needs coordination with the external writer.
4. Update the UI copy in `AccountSettings.tsx` and `src/lib/accountDeletion.ts` messages, and the Privacy page, to the approved wording (with tests).
5. Read-only production checks at activation: plan tier (for F), `suppressed_emails` row count/source, `LOVABLE_API_KEY` present (name only).
6. Controlled activation itself (`n10-production-activation-checklist.md`), including the **real Lovable proofs that N10.5 could not do**: one non-sensitive N10 alert to `contact@thestartofyou.com` from `contact@wesellproducts.co.uk` (sender acceptance verified), one real e-mail-queue delivery, and proof that no privileged credential passes through pg_net.

### 0.11 Readiness

Ready for the **controlled production activation phase** once: the owner block (0.8) is approved; the legal-review items (0.9) have received the required human privacy/legal review *(Revision 4: owner acceptance alone does not clear them)*; the approved wording is implemented; and — if E is authorised — the PostHog step is implemented, tested and rehearsed. **Not ready today: D14 = OPEN.**

## 1. Executive summary

- Account deletion (Candidate E) is **account-first**: the Auth account is hard-deleted and confirmed by the database **before** any media is removed; the user's database records cascade away with the Auth row; private media is then purged; a final sweep runs after the longest valid access-token lifetime; the operational deletion record is anonymised on completion.
- It was proven on a real hosted Supabase project (N10.3B, CLOSED / PASS / RETIRED).
- What remains after deletion is (a) a minimal anonymised operational record, kept for a proposed **30 days** (technically proven, **legally unapproved**), (b) platform logs/backups under their own retention, (c) several **pre-existing** e-mail and analytics records that the deletion flow does **not** currently remove (§4, rows K–N), and (d) copies the user already downloaded or cached before deletion (D15).
- **Decisions needed:** the retention period; whether the pre-existing e-mail/analytics records (K–N) must be removed or disclosed before release; the privacy and UI wording (§8).

## 2. Architecture summary

| Component | Role |
|---|---|
| `delete-account` Edge Function (user JWT, `verify_jwt = true`, explicit `{ confirmed: true }`) | opens a durable request, hard-deletes the Auth user, confirms absence in the database, starts the purge |
| `private.account_deletion_requests` | durable workflow record (no FK to Auth; survives Auth deletion) |
| `account_deletion_worker` DB role + worker Edge Function | least-privilege, function-only database surface; continues retries, purge and final sweep; invoked every minute by pg_cron with an invocation-only secret (M3) |
| Storage RLS guard | from the moment a request exists, the account's media cannot be read, written, deleted or signed at the Storage origin |
| Operator alerts (M4, `docs/strategy/n10-operator-alerting.md`) | minimal e-mail to an operator on attention states; contains no personal data |

## 3. Exact deletion sequence

1. User confirms deletion in Account settings (two-step UI) → `delete-account` with the user's JWT and `{ confirmed: true }`.
2. **Freeze:** a durable request row is created (`status = requested`). From this moment Storage denies the account's media at the origin (read, write, delete, sign).
3. **Auth hard delete** (`auth.admin.deleteUser`, not soft delete) → the database confirms the Auth row is gone. Every user-owned application table has `ON DELETE CASCADE` to `auth.users`, so the account's application rows are deleted in the same database transaction as the Auth row (verified in G3 and N10.3B).
4. **Purge:** canonical media in `weekly-photos` and `first-year-memories` (path first segment = the user id) is removed through the Storage API in batches of at most 1,000 until none remain.
5. **Response:** HTTP 200 means the account deletion is confirmed; the purge may still be continuing. HTTP 202 means accepted but Auth deletion not yet confirmed (media frozen and untouched; the worker retries).
6. **Retries/alerts:** transient failures back off 1, 2, 5, 15, 30, then 60 minutes; unresolved after 24 h → attention state + operator alert. Media is **never** removed while the Auth account exists.
7. **Final sweep:** after `final_sweep_after = auth_deleted_at + max(access-token lifetime, 1 h) + 15 min` (currently 1 h 15 min), the worker checks again for any late media and removes it.
8. **Completion:** only when no canonical media and no anomaly remain → `status = completed`; `user_id` is set to NULL and `anonymised_at` is set.
9. **Retention cleanup:** completed anonymised rows older than the configured retention are deleted by the worker (proposed 30 days).

## 4. Retained-data inventory after account deletion

Legend — *Direct*: identifies a person on its own. *Indirect*: could identify a person when combined with other data.

| # | Item | Data that exists | Direct | Indirect | Deleted / anonymised when | Proposed retention | Purpose | Configurable | Needed for | Final deletion |
|---|---|---|---|---|---|---|---|---|---|---|
| A | Auth account (`auth.users`, identities, sessions, refresh tokens) | — | — | — | step 3 (hard delete) | none | — | — | — | GoTrue hard delete |
| A2 | Auth audit trail (`auth.audit_log_entries`, Supabase-managed) | Supabase Auth records auth events; entries may include the user id and e-mail of the actor. **Not verified in N10.3B — VERIFY** | possibly yes | yes | not deleted by N10 | platform-managed | Auth security audit | not by N10 | platform security | **OPEN QUESTION** for the reviewer (§9) |
| B | Application database (journeys, logs, reflections, baby data, memories, companion data, profiles, etc.) | — | — | — | step 3 (cascade) | none | — | — | — | database cascade |
| C | Private media (`weekly-photos`, `first-year-memories`) | — | — | — | step 4 / final sweep | none | — | — | — | Storage API removal |
| C2 | Anomalous object (owner = user, non-canonical path) | the object itself | possibly | yes | **not auto-deleted**; request held in `purge_attention`, operator alerted | until operator action | safety: never delete outside the canonical prefix automatically | — | correctness | operator removal via Storage API |
| D | `private.account_deletion_requests` row | while active: `user_id`, status, timestamps, counters, last error class, alert metadata (M4). After completion: **`user_id` NULL**; no e-mail, no hash of the user, no Storage path, no journey/health data | while active: yes (user id) | after completion: **pseudonymous in practice** (see note) | anonymised at completion (step 8) | **30 days after completion (proposed)** | incident investigation, failed-deletion diagnosis, audit of the deletion itself | yes (`N10_COMPLETED_ROW_RETENTION_DAYS`) | operations/security | worker deletes rows older than the retention |
| E | Edge Function logs | N10 logs carry opaque request ids, states, counts, error classes only (never user id, path, e-mail; enforced by tests). Other functions (e.g. AI search) may log their own request data | N10: no | yes (request id + timestamps) | platform log retention | platform plan default | debugging | via Supabase plan | operations | platform expiry |
| F | Postgres logs | statements/errors; N10 functions are parameterised; Storage object paths contain the user id as a folder name in some platform logs | possibly (user id in paths) | yes | platform log retention | platform plan default | operations | via plan | operations | platform expiry |
| G | Storage / API-gateway / CDN logs | request paths, including object paths whose first folder is the user id; client IP; user agent | user id (pseudonymous), IP | yes | platform log retention | platform plan default | operations/security | via plan | operations | platform expiry |
| H | pg_cron / pg_net records | cron run history (no user data); pg_net responses (`{"ok":true}`); the N10 request carries no user data (M3) | no | no | pg_cron history / pg_net response TTL | platform default | operations | partly | operations | automatic |
| I | Database backups / PITR (Supabase-managed) | full database snapshots taken before deletion still contain the deleted account until they expire | yes | yes | backup expiry | per Supabase plan (daily backups / PITR window) | disaster recovery | via plan | resilience | backup rotation |
| J | Copies already delivered (D15) | pre-issued signed URLs, CDN-cached authenticated responses (until purge), browser/device caches, files the user downloaded | yes | yes | CDN: invalidated on purge (measured within seconds); browser/device: never recallable | — | — | no | — | outside server control |
| K | `public.email_send_log` (pre-existing e-mail infrastructure) | `recipient_email`, template, status, errors | **yes (e-mail)** | yes | **deleted atomically with the Auth user (M6; if it fails, the Auth deletion rolls back and retries)**; rows logged under an *earlier* e-mail address (before an address change) are not matched | none after deletion | e-mail delivery audit | — | — | M6 trigger — **confirm acceptable** |
| L | `public.suppressed_emails` | e-mail address + reason (unsubscribe/bounce/complaint) | **yes** | yes | **kept** (not touched by M6) | indefinite unless decided | honouring unsubscribes/bounces so the address is never e-mailed again | — | possibly legally useful to keep a suppression record — **LEGAL REVIEW REQUIRED** | **NEEDS DECISION** (keep and disclose, or delete — a one-line change to M6) |
| M | `public.email_unsubscribe_tokens` | e-mail + token | **yes** | yes | **deleted atomically with the Auth user (M6)** | none after deletion | unsubscribe links | — | — | M6 trigger — **confirm acceptable** |
| N | PostHog analytics (only for users who gave analytics consent) | events and a person profile keyed by the user id (`identify`) | pseudonymous | yes | the browser's PostHog identity is reset at sign-out after deletion; **server-side person data is not deleted** | PostHog project retention | product analytics | in PostHog | — | **NEEDS DECISION**: (a) accept PostHog retention and disclose it, (b) an operator deletes the person in PostHog per request, or (c) implement server-side deletion (needs a new PostHog personal API key — not added without your approval) |
| O | Lovable Email provider logs (third party) | recipient e-mail of past transactional/auth e-mails; operator-alert recipients | yes | yes | provider retention | provider-defined | delivery | provider | — | provider expiry — **VERIFY** |
| P | AI providers (third party, via the AI gateway) | content of past AI requests as processed by the provider | possibly | yes | provider retention | provider-defined | — | provider | — | **VERIFY** provider terms |
| Q | `public.ai_rate_limits` | salted hash of IP address + user agent, short counting window; no user id | no | weak | rolling window | short | abuse protection | — | security | overwritten |

**Note on "anonymous" (D).** Setting `user_id = NULL` removes the direct link, but the completed row keeps a stable request id and exact timestamps (`requested_at`, `auth_deleted_at`, `completed_at`). While platform logs (E–G), the Auth audit trail (A2), backups (I) or provider logs still exist, those timestamps and the request id could be correlated back to the person. **The completed row should therefore be treated as pseudonymous, not anonymous, until those other sources have expired.** The reviewer should decide whether 30 days is acceptable on that basis.

## 5. Completed-row retention (proposal)

Confirmed against the real schema (M1 + M4): after completion the row contains only `id` (random UUID), `status = completed`, `requested_at`, `auth_deleted_at`, `final_sweep_after`, `purge_empty_at`, `completed_at`, `anonymised_at`, `attempt_count`, `next_attempt_at`, `lease_until`, `last_error_class` (NULL on completion), `objects_removed`, `sweep_objects_removed`, `anomaly_count = 0`, `updated_at`, and the M4 alert metadata (`alert_key` such as `purge_attention:storage_remove`, alert timestamps, failure count). `user_id` is NULL (enforced by CHECK constraints). There is **no** e-mail, hash of the user, Storage path, journey, treatment or health data.

**30-day retention = TECHNICALLY PROVEN / LEGALLY UNAPPROVED** (functional rehearsal in N10.3B; the value is a parameter, not a constant).

| Option | Meaning | Engineering impact (no code change made now) |
|---|---|---|
| **A. APPROVE 30 days** | keep completed anonymised rows 30 days | set `N10_COMPLETED_ROW_RETENTION_DAYS = 30` at activation |
| **B. APPROVE a different number of days (1–3650)** | e.g. 7 or 90 | set the variable to the approved number; no code change; update the privacy copy (§8 E) |
| **C. REJECT post-completion retention** | delete on completion | **implemented (M6):** set `N10_COMPLETED_ROW_RETENTION_DAYS = 0`; completed anonymised rows are removed on the next worker run (about a minute). The post-incident audit trail is then limited to operator alerts and platform logs |

If the variable is **unset**, completed rows are kept **indefinitely** (cleanup skipped). Activation must therefore set an approved value.

## 6. Risk / purpose analysis (for the reviewer)

| Topic | Analysis | Determination |
|---|---|---|
| Purpose of the deletion-job record | proves the deletion ran to completion; supports user enquiries ("was my account deleted?") by request id/time | LEGAL REVIEW REQUIRED — candidate basis to consider: legitimate interests / accountability for processing; *question only* |
| Incident investigation | needed while a deletion is active or failed; after completion it supports post-incident review | reviewer to judge the window |
| Failed-deletion diagnosis | essential while active (attention states, alerts); not needed after completion except for trend analysis | — |
| Security / audit evidence | shows deletions completed and when; contains no content | LEGAL REVIEW REQUIRED (whether an audit trail is required or merely useful) |
| Duplicate / retry protection | active rows prevent duplicate workflows; completed rows are **not** needed for this (a new account gets a new id) | not a reason for post-completion retention |
| Data minimisation | completed row holds operational fields only; user id removed | reviewer to confirm fields are minimal |
| Storage limitation | retention bounded by a configured number of days; cleanup automatic | requires an approved number (unset = indefinite) |
| Access controls | table in a non-exposed `private` schema, RLS on, no grants; only `postgres` and SECURITY DEFINER functions can touch it; the worker role cannot read it directly | — |
| Confidentiality | no content; operator alerts carry no personal data | — |
| Eventual deletion | automatic after the retention period | — |
| Pre-existing e-mail records (K–M) and analytics (N) | contain e-mail addresses or a person profile and outlive the account | LEGAL REVIEW REQUIRED — whether these must be deleted at account deletion, retained (e.g. suppression list) with disclosure, or both |

## 7. D15 — pre-authorised media access residual (owner-accepted)

N10 enforces **origin access**: once deletion is requested the account's media cannot be newly read, written, deleted or signed at the Storage origin, by the user's old token or anyone else. N10 does **not** claim to recall bytes already delivered: pre-issued signed URLs (≤ 1 h), CDN copies of earlier authenticated downloads (served only back to the same credential, ended by purge within seconds), browser/device caches and downloaded files. No cross-user cache access was observed. This needs plain disclosure (§8 F).

## 8. User-facing copy (earlier DRAFT — superseded by §0.7)

**A. Account settings — Delete account section**
> **Delete account**
> Permanently deletes your account and everything saved to it: your journeys, logs and reflections, baby details, First Year notes and memories, and every private photo, video and voice note. This can't be undone. If you'd like a copy first, download your data before you continue.

**B. Final confirmation modal**
> **Permanently delete your account?**
> Your account will be deleted straight away and you'll be signed out. Your saved records are removed with it, and your private photos, videos and voice notes are deleted from our storage, usually within a few minutes. We keep a short technical record that the deletion happened, without your profile or content, for [N] days so we can make sure it finished properly.
> Copies you have already downloaded, or that your browser has saved, stay on your devices — we can't remove those.
> [Cancel] [Delete my account]

**C. After the request**
- *200 (deleted):* "Your account has been deleted. Any remaining photos and files are being removed in the background — you don't need to do anything."
- *202 (in progress):* "We've received your request and your account is being deleted. Your photos and files are locked and can't be viewed while this finishes. You don't need to do anything."
- *410:* "This account has already been deleted."
- *Error:* "We couldn't start the deletion just now. Nothing has been deleted. Please try again in a few minutes."

**D. Privacy Policy — Deleting your account**
> You can permanently delete your account from Account settings. When you do, we delete your sign-in account and the information saved to it, and we remove the private photos, videos and voice notes stored with your account. Some of this removal continues in the background for a short time after your account is gone; during that time your files can't be viewed.

**E. Retention**
> After deletion we keep a minimal technical record that a deletion took place — when it was requested and completed, and whether it succeeded — for [N] days. It doesn't include your name, email address, profile, journey details or any content you saved. Our email delivery records for your address are deleted with your account. [If approved: If you had unsubscribed from our emails, or an email to you bounced, we keep your address on a do-not-email list so we never email you again.] Our hosting provider keeps backups and system logs for a limited time under its own retention schedule, after which they are deleted.

**F. Downloaded and cached copies**
> Deleting your account can't reach copies that already left our service — for example files you downloaded, screenshots, or copies your browser saved. Links to your photos that were created before you deleted your account stop working once the files are removed.

These drafts avoid guarantees N10 cannot make (no claim of instant purge, no claim that backups/logs vanish immediately, no claim of recalling delivered copies). The bracketed parts depend on decisions in §5 and §9.

## 9. Unresolved legal / privacy questions

1. Lawful basis and necessity of keeping the completed deletion record, and for how long (§5, §6). **LEGAL REVIEW REQUIRED.**
2. `email_send_log` and `email_unsubscribe_tokens` (K, M) are now deleted with the Auth user (M6) — confirm this is acceptable. Whether `suppressed_emails` (L) may be kept to honour unsubscribes/bounces (and disclosed) or must be deleted. **LEGAL REVIEW REQUIRED.**
3. Whether PostHog person data (N) must be deleted on account deletion. **LEGAL REVIEW REQUIRED.**
4. Supabase backup/PITR and log retention for the production plan, and whether the disclosure in §8 E is sufficient. **VERIFY plan settings + LEGAL REVIEW.**
5. GoTrue audit log content and retention (A2). **VERIFY + LEGAL REVIEW.**
6. Third-party processors (Lovable Email, AI providers) retention and data-processing terms. **VERIFY + LEGAL REVIEW.**
7. Whether operator alert e-mails (request id + timestamps only) need any retention rule in the operator's mailbox.

## 10. Reviewer checklist

- [ ] Read the deletion sequence (§3) and the hosted evidence summary (`docs/strategy/evidence/n10-3b-hosted-candidate-e/99-summary.md`).
- [ ] Decide the completed-row retention (§5: A / B / C).
- [ ] Confirm K and M (now deleted with the account, M6); decide L (suppression list) and N (PostHog).
- [ ] Confirm backup/log/third-party retention statements are accurate for the production plan.
- [ ] Approve or amend the UI copy (§8 A–C) and the privacy wording (§8 D–F).
- [ ] Confirm the D15 residual disclosure is acceptable.
- [ ] Record the decision below.

## 11. D14 HUMAN DECISION

```
D14 HUMAN DECISION

[ ] APPROVED
[ ] APPROVED WITH CHANGES
[ ] NOT APPROVED

Completed-row retention:
_____ days

Privacy-policy wording approved:
[ ] YES
[ ] NO

Account-deletion UI wording approved:
[ ] YES
[ ] NO

Reviewer:
________________

Role / capacity:
________________

Date:
________________

Notes / required changes:
________________
```

**Until a human completes this block: D14 = OPEN.**
