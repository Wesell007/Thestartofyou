# N10.1 — 01 Guard and offline self-test

The tooling in `harness/` is derived from the accepted G3 harness.

- `n10_guard.sh`, `n10_psql.sh`:
  - exactly one target: the owner-confirmed ref in `target_ref.txt`, which must equal the caller's expected ref;
  - always refused: production `wogepxfipdipogyogced`, retired C1 `wwtcnbjhttjtklpxhrkd` and `dlftnirrnirlkhxpofoq`, retired G3 `czhopceorfqxdbfvlnap`, including when they appear inside arguments;
  - connects only to `db.<target>.supabase.co`;
  - every session is gated by the marker row, except setup;
  - hash-gated single-transaction files.
- `n10lib.py`:
  - Management API: GET `/v1/projects/<target>…` only;
  - project API: only `https://<target>.supabase.co/auth/v1/…` and `/storage/v1/…`;
  - every output is checked against all credential values, including the synthetic users' access and refresh tokens.

**Offline self-test:** 22/22, run with stub psql, a stubbed HTTP layer and fake credentials (`harness/selftest-result.txt`). It was run before the first remote call and again at evidence time.

Two harness defects were found during development and fixed before any remote call:

- Windows Python could not import from a POSIX path.
- The first version counted any non-refusal exit as "reached". "Reached" now requires exit 0 and the stub marker.

**Credentials:** kept in `C:\Users\Administrator\.n10r1\`, outside the repository: `n10r1.dbpass`, `n10r1.pat`, `n10r1.service_key`, `n10r1.anon_key`, and `n10r1.users.json` (synthetic passwords and A's pre-deletion tokens). No value was printed; the API keys were written straight to files. No G3 credential was reused (`.g3` absent).

**Disclosure:** the owner's first two messages carried an unfilled ref placeholder, and the credential files were initially 0 bytes. The run held until both were corrected. No remote call was made in the meantime.
