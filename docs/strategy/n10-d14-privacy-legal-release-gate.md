# N10 — D14 privacy / legal release gate (approval pack)

**Status: D14 = OPEN.** This pack is prepared by Claude Code (implementation owner) for a human privacy/legal decision-maker. It does not approve anything and does not state any lawful basis as fact. Items marked **LEGAL REVIEW REQUIRED** are questions for counsel or the responsible privacy decision-maker.

Phase: N10.4 — Production Readiness: Privacy/Legal + Operator Alert. Production has not been accessed; Candidate E is not active in production.

**Revision 2 (11 October 2026) — engineering changes made since the first draft (all local, not deployed; D14 still OPEN):**
- **M6 `20261011050647_n10_privacy_minimisation.sql`:** when an Auth user is deleted, the account's rows in `public.email_send_log` and `public.email_unsubscribe_tokens` (matched by e-mail address, case-insensitive) are deleted in the same transaction (rows K and M). `public.suppressed_emails` is **kept** pending your decision (row L). **Required same-database e-mail cleanup is transactional with Auth deletion (owner decision, 13 October 2026):** if the cleanup fails, the whole Auth deletion rolls back, account deletion is not considered committed, media stays untouched, and N10 retries on its normal schedule (escalating to `auth_attention` and an operator alert if it persists). *(Superseded draft wording: "the minimisation can never block the Auth deletion" — replaced because it allowed a committed deletion with e-mail records left behind.)*
- **M6 + worker:** completed-row retention now also accepts **0 days** (option C), so every option in §5 is implementable by configuration alone.
- **M5 `20261011050645_email_queue_invocation_hardening.sql`:** the e-mail queue no longer sends a service-role key through pg_net (security fix).
- **Operator alerts:** destination `contact@thestartofyou.com`, sender `contact@wesellproducts.co.uk` (owner decision); alerts contain no personal data.

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

## 8. User-facing copy (DRAFT — not published)

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
