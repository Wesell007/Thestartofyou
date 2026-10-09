# N10.1 — 02 Synthetic fixture

| Object | Detail | Evidence |
|---|---|---|
| Bucket | `n10-probe`, private, created through the Storage API (`POST /storage/v1/bucket`, service role); no size or MIME limits | `raw/02a` |
| Storage RLS | four `authenticated` policies on `storage.objects` for bucket `n10-probe`: select, insert, update (with check) and delete where `auth.uid()::text = (storage.foldername(name))[1]`. This is the same folder rule the TSOY media buckets use | `raw/02-setup.sql` |
| User A | `b99b0708-6f47-474e-bab1-c546fe66fd35`, `n10r1-a@example.invalid`; created through the Auth admin API; password sign-in HTTP 200, session user matches, role `authenticated`, token lifetime 3600 s | `raw/02b` |
| Control C | `e2d9e14c-9ca2-406a-ab72-4d7d20d91e9d`, `n10r1-c@example.invalid`; same checks | `raw/02b` |
| A's object | `n10-probe/b99b0708-…/r1-original.txt`, 61 bytes, uploaded with **A's own access token** (HTTP 200, not service role) | `raw/02c` |
| C's object | `n10-probe/e2d9e14c-…/control.txt`, 63 bytes, uploaded with C's own access token | `raw/02c` |

**Pre-deletion proof (`raw/03a`):**

- A is present (admin GET 200).
- `storage.objects` row for A's object: `owner` = `owner_id` = A's id (read-only SELECT).
- Storage API download is HTTP 200, 61 bytes, SHA-256 `00e2cefc…b0da`, equal to the uploaded bytes.
- Control C's Auth row and object are recorded as the fingerprint.

Storage metadata was only ever read with SQL, never written.
