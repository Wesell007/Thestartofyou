# G3 — 16 Safety and secret scan

| Item | Result |
|---|---|
| Customer data | none. 7 synthetic users created through the Auth admin API, all `@example.invalid`, each with a verified password sign-in (`05c`); non-synthetic users 0 at every check |
| Production `wogepxfipdipogyogced` | never accessed. It was denylisted in every wrapper and in the HTTP library, and is refused even inside arguments (self-test 26/26). Every remote call (Management API, psql, CLI, Auth API) targeted only `czhopceorfqxdbfvlnap` |
| Retired C1 refs | denylisted; never accessed |
| Frozen 41B.1A SQL | unchanged (three hashes as at preflight; forward and validate were SHA-gated before execution) |
| `delete-account` Edge Function | not modified, not deployed, not invoked |
| 13 Episode ownership FKs | never altered (only the 13 dependants' account FKs, and for S2 only `pregnancy_episodes_user_id_fkey`, were recreated, with identical definitions) |
| Scratch objects | `g3_scratch` schema with 2 tables created for the sensitivity control, then dropped; final scratch count 0 |
| Credentials | stored only under `C:\Users\Administrator\.g3\`, outside the repository. No value was printed. The harness checks every output against all credential values and refuses on a match |

## Secret scan (fail-closed), before commit

- **Scope:** every file under `docs/strategy/evidence/41b-account-deletion-g3/` (106 files at the final scan, including `17-harness/` and this file).
- **Literal comparison:** the 11 actual credential values (G3 PAT, database password, service-role key, anon key, 7 synthetic-user passwords) were compared byte for byte against every file. Hits: **0**. The values were read in-process and never displayed.
- **Pattern scan:** access tokens (`sbp_…`), secret and publishable keys, JWTs, PostgreSQL password environment assignments, password assignments, Bearer tokens, private keys. Hits: **0**.
- **Staged patch:** scanned with the same rules at commit time: 0 literal hits, 0 pattern hits. The first staged scan flagged this file's own description of the password-variable pattern (a documentation false positive); the wording was changed, not the scan.

**Secret scan: CLEAN.**
