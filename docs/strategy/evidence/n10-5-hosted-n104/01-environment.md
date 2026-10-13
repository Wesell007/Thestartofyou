# 01 — Environment, identity, guard, docs check

| Item | Value |
|---|---|
| Project | `tsoy-n10-5-rehearsal`, ref `mwlryyionkpjbecnbsiq`, WesellProducts (`xzickmpbmsjgkowcqpbg`), eu-west-2 |
| PostgreSQL | 17.11.0.003 (engine 17) |
| Created | 2026-10-13T20:41:10Z by the claude.ai Supabase connector (`create_project`, organisation level only); identity read with the connector's `get_project` for this ref only (the scoped PAT lacks `project_admin_read`) |
| Credentials | owner-saved DB password + project-scoped PAT in `.n105` (read by size only); legacy anon/service-role JWTs from the non-reveal key listing (claims verified); worker password, two invocation secrets generated locally. **No Lovable credential** (owner: Lovable-managed, not available to a disposable project) |
| Source | sealed clone of `945677ec` (clean, no stored link, 53 migrations byte-equal); M1–M3 byte-identical to N10.3B-proven; M4/M5/M6 = committed N10.4 (`63348e3a…`, `b6899e9a…`, `9f9acf6f…`); 41B.1A frozen hashes unchanged |
| Guard | `.n105` (derived from N10.3B): only `mwlryyionkpjbecnbsiq`; denylist production `wogepxfipdipogyogced` + retired `wwtcnbjhttjtklpxhrkd`, `dlftnirrnirlkhxpofoq`, `czhopceorfqxdbfvlnap`, `gbhwpzofnswlryqjoumw`, `toqeefrwnsjuhjmobodg`. Offline self-test **44/44** (`raw/01-guard-selftest*.log`) |
| Production | **not contacted** |

Baseline (psql): empty database (0 users, no migration history, 0 public tables, 0 buckets).

**Supabase docs check (14 October 2026):** changelog since 1 October has no change to Auth deletion, pg_net, pg_cron or Vault (scoped PATs GA 6 Oct; `@supabase/server` framework adapters deprecated; TLS 1.2 cipher deprecation from 10 Nov). The pg_net page now states the `net` schema grants USAGE to PUBLIC and argues safety because anon/authenticated are NOLOGIN — this does not cover custom LOGIN roles such as `account_deletion_worker` (the N10.3B §11 finding, still present, see 10). The Auth guide still says a user who owns Storage objects cannot be deleted; this conflicted with behaviour observed on the hosted rehearsal environment in N10.1 (9 October 2026). It also warns that a failing `auth.users` trigger blocks the operation — for M6 this is the **intended** behaviour, proven in 07.
