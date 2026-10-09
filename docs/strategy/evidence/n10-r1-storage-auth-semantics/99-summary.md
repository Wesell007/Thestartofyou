# N10.1 — 99 Summary: hosted Storage/Auth semantics probe

**Closeout (2026-10-09): N10.1 CLOSED PASS.**

- Owner accepted; evidence remotely preserved (`a8c06aa6`, `bb6928c8`).
- Project and token retired by the owner; local credentials removed (`10-teardown-and-closeout.md`).
- N10 = OPEN. N10.2 = NOT STARTED.

**Result: N10.1 PASS. The question it was built to answer now has a decisive answer.** Executed 2026-10-09 (UTC) on disposable project `tsoy-n10-r1-rehearsal` (`gbhwpzofnswlryqjoumw`, eu-west-2, PostgreSQL 17.11.0.003). The predictions were committed locally (`a8c06aa6`, 05:07:12Z) before R1 (05:07:18Z).

| Question | Answer | Evidence |
|---|---|---|
| **R1** Can a user who owns a Storage object (uploaded with their own token; `owner_id` = their id) be hard-deleted through `auth.admin.deleteUser`? | **YES.** HTTP 200 in 0.144 s; user absent afterwards. **H2 confirmed.** The official Supabase guide (H1) conflicted with behaviour observed on this hosted rehearsal environment on 9 October 2026. The catalogue agrees: no FK from Storage to `auth.users`; migration `drop-owner-foreign-key` applied | `04` |
| **R2** Does the object remain? | **YES**, with byte-identical content. Auth deletion does no Storage cleanup | `05` |
| **R3** What happens to `owner_id`? | **Unchanged**: `owner` and `owner_id` keep the deleted user's id | `06` |
| **R4** Can the pre-deletion access token still upload to Storage? | **YES.** HTTP 200; a new object was created with `owner_id` = the deleted id. The same token gets 403 `user_not_found` from Auth, and the refresh token is rejected (400). Exposure lasts until the token expires (3600 s here) | `07` |

`08-candidate-b-probe.md` is intentionally absent: the brief runs the Candidate-B probe only if R1 fails.

## Decision (per the brief's §L and §M)

- **N10 architectural direction: CANDIDATE E — ACCOUNT-FIRST + DURABLE MEDIA PURGE.**
  - Hard-delete the account first (G3 proved the database deletion is atomic and independent of trigger order); purge media afterwards through a durable, retryable job.
  - The N10 failure (media destroyed while the account survives) becomes structurally impossible, because media is touched only after the account deletion has committed.
- **Candidate B is not required.** Owned objects do not block Auth deletion.
- **Required design constraints for N10.2:**
  1. Block media writes while deletion is pending **and** after the Auth user is gone. For example, Storage insert/update rules gain a SECURITY DEFINER check that the account exists and is not pending. R4 proves Storage alone does not refuse a deleted user's live token.
  2. Run a final purge sweep after the maximum access-token lifetime.
  3. Enumerate by folder prefix and/or the retained `owner_id`. Paginate without the current 1,000-entry and fixed-depth ceilings, and delete through the Storage API in batches of at most 1,000.
  4. Keep a durable deletion record that survives the Auth user (no FK to `auth.users`), so purge retries can run after the account is gone.
  5. Agree the retention and privacy decisions identified in N10.0.
- **Not done here:** no N10.2 design or implementation, no TSOY code or migration change, no `delete-account` change.

## Status

| Item | State |
|---|---|
| G3 | CLOSED PASS |
| RI/account-deletion database gate | CLOSED / PASS (unchanged by N10.1) |
| N10 | OPEN; direction selected (Candidate E), not implemented |
| N10.1 | CLOSED PASS: owner accepted, remotely preserved, project and token retired, local credentials removed |
| 41B.1A applied to production | NO |
| 41B.1B | NOT STARTED / NOT AUTHORISED. N10 is not a documented 41B.1B prerequisite (N10.0) |
