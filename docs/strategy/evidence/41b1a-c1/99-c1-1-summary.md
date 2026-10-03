# 41B.1A-C1 — C1.1 Baseline reconstruction: summary (Project 1)

Result: **C1.1 = PASS**. Project 1 (`tsoy-41b1a-c1-run1`, `wwtcnbjhttjtklpxhrkd`) now holds the exact pre-41B.1A application schema built from the 47 committed migrations at `735a07e6`. Nothing from 41B.1A has been applied. No fixture exists yet (C1.2 not started).

Executed 2026-10-03T23:26Z to 2026-10-04T00:00Z (UTC) by Claude Code on the owner's workstation. Owner inputs: Supabase CLI login (OAuth, token in the CLI's own store), PostgreSQL 17.11 accepted (**OWNER VERSION DECISION = PostgreSQL 17.11 accepted for rehearsal; live backend version unavailable for comparison**; parity not asserted).

## PASS criteria

| # | Criterion | Result | Evidence |
|---|---|---|---|
| 1 | Source exactly `735a07e6` | PASS: scratch clone detached at 735a07e6, `core.autocrlf=false`, files byte-identical to the commit blobs | `01-hashes.txt`, `01a-baseline-migration-manifest.txt` |
| 2 | Exactly 47 migrations identified | PASS | manifest sha256 `01fbe1f8…` |
| 3 | Authorised target exactly `wwtcnbjhttjtklpxhrkd` | PASS: wrapper asserts target before every CLI command; `link` recorded that ref; project listing shows only run1 linked | `06-c1_cli-wrapper.sh`, `00-identity.md` |
| 4 | Production ref denylisted | PASS: `wogepxfipdipogyogced` in the denylist; wrapper self-test refused a command naming it (exit 92) | `00-identity.md` |
| 5 | Project 2 untouched | PASS: `dlftnirrnirlkhxpofoq` denylisted for C1.1; listing shows it unlinked; no command targeted it | `00-identity.md` |
| 6 | Identity marker before replay | PASS: `wwtcnbjhttjtklpxhrkd / 41B.1A-C1-run1`, 0 users, 0 non-synthetic, 1 public table, no migration history (checked twice, last at 23:37:31Z immediately before the push) | `00-identity.md` |
| 7 | Dry run exactly 47 | PASS: 47 would-push entries equal to the manifest set; `seeds: []`, `roles: []` | `03-dry-run.log` |
| 8 | No pending 41B.1A file included | PASS: 0 matches for `41b1a` in the dry run or push; none in the scratch migrations folder | `03-dry-run.log` |
| 9 | All 47 apply | PASS: exit 0, 4 s, no error line | `04-baseline-push.log` |
| 10 | Remote history 47/47 | PASS: LOCAL 47, REMOTE 47, matched 47, DIFF 0, no 41B.1A version | `05-migration-list-after.log` |
| 11 | Marker survives | PASS: unchanged after replay | `00-identity.md` |
| 12 | Auth users remain 0 | PASS: 0 users, 0 non-synthetic after replay (no migration creates a user) | `00-identity.md` |
| 13 | 41B.1A dependencies present | PASS: all 13 link tables with `user_id uuid NOT NULL`; `set_updated_at()` ×1, byte-identical to live; enum values exact; `pg_cron 1.6.4, pg_net 0.20.4, pgcrypto 1.3, pgmq 1.5.1, supabase_vault 0.3.1, uuid-ossp 1.1` | `02-baseline-catalogue.md`, `02a-…classification.md` |
| 14 | `pregnancy_episodes` absent; no 41B.1A columns, FKs, indexes, policies, `babies_id_user_id_key` | PASS: all zero / NULL | `00-identity.md` |
| 15 | Full baseline catalogue captured | PASS: nine sections, 289 columns, 5 enums, 25 functions, 35 triggers, 34 RLS flags, 114 policies, 141 constraints, 86 indexes, 34 grants | `02-baseline-catalogue.md`, `02c-…` |
| 16 | No unexplained application-schema drift | PASS: every difference classified as rehearsal artefact, known §14 drift, platform role, or format | `02a-…classification.md`, `02b-…diff.json` |

## Notes for later stages

- The CLI connected through a temporary "login role" provisioned by the management API, so no database password was needed or stored; the planned `run1.dbpass` file was never created and is not required for CLI operations. The psql runner for C1.3 onward still needs a connection credential; that is a C1.3 prerequisite.
- The first scratch clone checked files out with CRLF endings; it was discarded and re-cloned with `core.autocrlf=false` so the files hash identically to the commit. The pattern must be kept for the 41B.1A files at C1.3+ (byte-identity gate).
- The baseline includes the email delivery objects that live does not have (41B.0-R §14). They are outside the 41B surface and are not touched by any C1 stage.
- `supabase_migrations.schema_migrations` now holds 47 rows; the plan's C1.15 exclusions already cover this bookkeeping.

## Safety

Production accessed NO. Project 2 accessed NO. Customer data accessed NO. 41B.1A applied NO. Seed run NO. Secrets committed NO (logs scanned for token, password and connection-string patterns before copying).

## Gates

C1.0 = PASS. C1.1 = PASS. READY FOR C1.2 = YES. READY FOR 41B.1A FORWARD MIGRATION = NO (C1.2 and C1.3 first). READY FOR 41B.1B = NO.
