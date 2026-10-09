# N10.1 — 09 Safety, control and secret scan

| Item | Result | Evidence |
|---|---|---|
| Remote targets | only `gbhwpzofnswlryqjoumw`, through the guarded wrappers (Management API GET for identity and API keys; project Auth/Storage API; marker-gated psql) | `harness/` |
| Production `wogepxfipdipogyogced` | never accessed; denylisted | `01` |
| Retired C1/G3 refs | never accessed; denylisted | `01` |
| Customer data | none: two synthetic `@example.invalid` users only; non-synthetic users 0 | `raw/02b`, `raw/08b` |
| TSOY schema / 41B migrations | not applied; the only `public` object is the marker table | `raw/02-setup.sql` |
| Direct Storage SQL writes | **none**. `storage.objects` was only read (SELECT). The bucket was created, objects uploaded and objects removed through the Storage API only | `raw/02a`, `raw/02c`, `raw/08a` |
| Control user C | Auth fields and object row (owner, owner_id, size) unchanged, and object bytes identical (SHA-256 `39dbcba7…a129`), from the pre-deletion fingerprint through R1, R4 and the purge | `raw/03a`, `raw/04a`, `raw/07a`, `raw/08a` |
| Cleanup of A's objects | after R4, A's two objects (`r1-original.txt`, `r4-stale-upload.txt`) were removed through the Storage API (`DELETE /storage/v1/object/n10-probe`, service role): HTTP 200, both reported removed; 0 objects remain with the deleted A's `owner_id` | `raw/08a`, `raw/08b` |
| Final hosted state | 1 Auth user (C), 1 object (C's control), 0 idle transactions, marker intact. The project is **not** torn down; it awaits owner review | `raw/08b` |

## Secret scan (fail-closed), before commit

- **Literal comparison:** 10 actual credential values (N10.1 PAT, database password, service-role key, anon key, both synthetic passwords, and A's and C's access and refresh tokens) compared against every file in this folder (27 files before this one): **0** hits. The values were read in-process and never displayed.
- **Pattern scan:** access tokens, secret and publishable keys, JWTs, PostgreSQL password environment assignments, password assignments, Bearer tokens, private keys: **0** hits.
- The staged patch is re-scanned with the same rules at commit time.

**Secret scan: CLEAN.**
