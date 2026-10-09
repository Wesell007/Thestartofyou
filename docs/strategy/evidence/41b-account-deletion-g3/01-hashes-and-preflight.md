# G3 — 01 Repository preflight and hashes

| Check | Result |
|---|---|
| Branch | `feat/41b1a-family-entity-foundation` |
| HEAD (start) | `26e36308`, equal to `origin`; working tree clean |
| AD-1 Layer 1 (`src/test/accountDeletionInvariant.test.ts`) | 30/30 PASS |
| Forward `41b1a_family_entity_foundation.sql` | `e6ad0bc82b245beb03131023bb9ce122a451f40c2fe9b75cd43f047b674585cb` (expected; also gated by `g3_psql.sh --sha256` before execution) |
| Validate `41b1a_family_entity_foundation_validate.sql` | `8645fd67f0b0211beb613b9d440e1f964d50e737f31862c11292c0103781b508` (expected; gated) |
| Rollback `41b1a_family_entity_foundation_rollback.sql` | `0d00895514b4e2dc623383436952fd534d5f879cdf4011024596dae303a36077` (expected; not run in G3) |
| Layer 2 `docs/strategy/rehearsal-support/ad1-catalogue-contract.sql` | `a164c31671ca2d6e8f2be7637cd24d0dea2df9a46286f09d25d6db405042dd30` (gated at both runs) |
| Baseline source | scratch clone detached at `735a07e68ec269ed48c10f4cffb859c3d126a8ee`, `core.autocrlf=false`; 47-file migration manifest identical to C1 `01a` (`02e`) |
| Frozen hashes after the run | unchanged (same three values) |

## Baseline replay (`02a`–`02g`)

- `link` was run against the G3 ref only.
- The dry run listed exactly 47 migrations, in the same order as C1's manifest.
- `db push` applied 47/47 (exit 0).
- Post-replay state: marker intact, 0 Auth users, history 47 (`20260420164527..20260915224603`), 34 public tables (33 application tables plus the marker, as in C1), `pregnancy_episodes` absent, no G3 scratch schema, 0 idle transactions.
- The nine-section baseline catalogue equals C1.1 `02-baseline-catalogue.md` in every section (`02g`: EMPTY). The only normalisation is the marker table name.

## 41B.1A application (`03a`–`03e`)

- **Forward:** exit 0 in 1.51 s (one transaction, hash-gated), with the one expected NOTICE (`trigger "pregnancy_episodes_set_updated_at" … does not exist, skipping`), as recorded in C1.
- **Validate:** exit 0, 13 `VALIDATE CONSTRAINT` statements.
- **Post-validate state:**
  - 13 Episode FKs, all RESTRICT, all validated, 0 deferrable, 0 initially deferred;
  - 0 episode rows;
  - ACL `{postgres=arwdDxtm/postgres,service_role=arwdDxtm/postgres,authenticated=r/postgres}`;
  - 4 policies, RLS on, history 47.
- **Catalogue:** equals the C1.16 validated state `22f-c1-16-post-validate-catalogue.md` in all nine sections (`03d`: EMPTY), so RLS, grants and policies match the C1 reference.
