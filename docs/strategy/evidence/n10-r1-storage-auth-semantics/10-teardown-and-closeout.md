# N10.1 — 10 Teardown and closeout

Status: **N10.1 CLOSED PASS.**

## Lifecycle

| Step | Result | Reference |
|---|---|---|
| Hosted probe | PASS (2026-10-09) | `99-summary.md` |
| Predictions committed before R1 | `a8c06aa6` | `03` |
| Evidence committed | `bb6928c8` | `00`–`09`, `99`, `raw/`, `harness/` |
| Owner evidence acceptance | ACCEPTED by the owner (2026-10-09) | owner instruction |
| Remote preservation | `a8c06aa6` and `bb6928c8` pushed by normal fast-forward `12fe5c7b..bb6928c8` before teardown; verified on `origin/feat/41b1a-family-entity-foundation` | this record |
| Project retirement | the owner deleted/retired `tsoy-n10-r1-rehearsal` (`gbhwpzofnswlryqjoumw`) | owner-confirmed; no remote call was made to verify, because the project and token are intentionally gone |
| Token retirement | the owner revoked/deleted the N10.1-only personal access token `tsoy-n10-r1-rehearsal` | owner-confirmed |
| Local cleanup | complete (below) | this record |

## Local cleanup (`C:\Users\Administrator\.n10r1\`)

- **Preserved first:** the six harness files (`n10_guard.sh`, `n10_psql.sh`, `n10lib.py`, `n10_selftest.sh`, `n10_identity.py`, `n10_probe.py`) were confirmed byte-identical (SHA-256) to their committed copies in `harness/`. The 38 transient working files were already represented by the curated `raw/` evidence. No credential was copied into the repository.
- **Removed:**
  - by name, without reading: `n10r1.pat`, `n10r1.dbpass`, `n10r1.service_key`, `n10r1.anon_key`, `n10r1.users.json` (synthetic passwords and the users' access/refresh tokens) and `target_ref.txt`;
  - `work/`, `__pycache__` and the harness working copies;
  - the empty `.n10r1` directory.
- **Verified by existence only:**
  - `.n10r1`, every credential file, `work/` and the harness are ABSENT; `.g3` remains ABSENT;
  - no `SUPABASE_ACCESS_TOKEN` variable is set, and `~/.supabase` holds only its pre-existing CLI cache entries.

## Findings carried forward

- **Official guide vs observed behaviour:** the official Supabase guide conflicted with behaviour observed on the hosted rehearsal environment on 9 October 2026. Hosted runtime evidence for this project showed that Auth deletion succeeded while owned Storage objects remained. Auth deletion did not remove those objects, and their `owner` / `owner_id` kept the deleted user's id.
- **Stale-token risk: PROVEN; MUST BE SOLVED IN N10.2.** A pre-deletion access token was still accepted for a Storage upload after the Auth user was deleted, until the token expired. Auth itself rejected the token, and the session could not be refreshed.
- **Selected N10 direction: Candidate E.** Account delete, then durable media purge, then a final stale-token sweep. Candidate B (quarantine) is not required.
- **Mandatory N10.2 requirements (not implemented):**
  1. Durable deletion state that survives the Auth deletion.
  2. Storage writes blocked while deletion is pending.
  3. Storage writes blocked after the Auth user has disappeared.
  4. Complete pagination.
  5. No fixed-depth traversal.
  6. Storage removals in batches of at most 1,000.
  7. A retryable purge worker.
  8. A final sweep after the maximum access-token lifetime.
  9. An explicit completion state.
  10. A privacy/retention decision.

## Final status

- N10.1 = **CLOSED PASS**.
- Evidence: owner accepted = YES; remotely preserved = YES.
- N10.1 project retired = YES. N10.1 PAT retired = YES. N10.1 local credentials retired = YES.
- R1 hosted semantics proven = YES.
- Candidate E selected = YES. Candidate B required = NO.
- Stale-token Storage-write constraint = PROVEN / MUST BE SOLVED IN N10.2.
- **N10 = OPEN. N10.2 = NOT STARTED.**
- RI/account-deletion database gate = CLOSED / PASS.
- 41B.1A applied to production = NO. 41B.1B = NOT STARTED.
- Production accessed = NO.
