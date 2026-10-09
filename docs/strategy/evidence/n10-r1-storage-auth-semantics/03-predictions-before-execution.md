# N10.1 — 03 Predictions written before execution

Written 2026-10-09 (UTC) and committed locally before the R1 deletion attempt. Target: `tsoy-n10-r1-rehearsal` (`gbhwpzofnswlryqjoumw`).

**Precondition (observed):**

- User A `b99b0708-6f47-474e-bab1-c546fe66fd35` exists.
- A's object `n10-probe/b99b0708-…/r1-original.txt` was uploaded with A's own access token: HTTP 200, 61 bytes, SHA-256 matches.
- `storage.objects.owner` = `owner_id` = A's id.

**Catalogue fact (observed read-only before R1):**

- `storage.objects` has no foreign key to `auth.users`; its only FK is `bucket_id → storage.buckets`.
- `owner_id` is `text`, nullable.
- No non-internal trigger exists on `auth.users`.
- Storage migration `drop-owner-foreign-key` is applied (73 Storage migrations in total).

**Not certain:** the official guide and the current source/catalogue disagree, so both hypotheses are stated.

| Hypothesis | Basis | Prediction for R1 |
|---|---|---|
| **H1 (official docs)** | "You cannot delete a user if they are the owner of any objects in Supabase Storage." | Hard delete fails (non-2xx); A remains in `auth.users`; the object remains |
| **H2 (current source and this project's catalogue)** | Storage migration 0017 dropped `objects_owner_fkey`; no FK or trigger links Storage ownership to `auth.users` | Hard delete succeeds (HTTP 200); A absent from `auth.users` |

Weighting: H2 is favoured by the catalogue observed above. R1 decides.

**If R1 succeeds:**

- **R2:** the object is still present through the Storage API, with the same bytes, unless Auth or Storage performs undocumented cleanup.
- **R3:** `owner_id` (text) probably still equals A's deleted id. `owner` (uuid, no FK) is probably unchanged too.
- **R4:** A's pre-deletion access token is probably still cryptographically valid until it expires. Whether Storage accepts an upload with it is **an empirical question, deliberately not predicted**: Storage verifies the token's signature and claims, and the folder rule compares `auth.uid()` with the folder name.
- **Supplementary:**
  - `getUser` with the stale token is expected to fail, since the user no longer exists.
  - Refreshing the session with A's refresh token is expected to fail, because the sessions cascade-delete with the user.

**If R1 fails:** record the exact error. Then run one Candidate-B probe:

1. a service-role copy to a quarantine path;
2. verify the copy;
3. read its `owner_id`, predicted NULL/unset;
4. remove the original through the Storage API;
5. verify A owns nothing;
6. retry the hard delete exactly once.

**Control C** must be unchanged throughout.
