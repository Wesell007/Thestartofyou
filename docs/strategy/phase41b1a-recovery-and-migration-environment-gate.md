# Phase 41B.1A-R — Recovery & Migration Environment Gate

Decision: **E. APPLICATION BLOCKED — USER ACTION REQUIRED**

Operational audit only. Nothing in the database was changed, no migration was applied, no secrets or settings were changed, and nothing was deployed. `docs/strategy/migrations-pending/41b1a_family_entity_foundation.sql` is untouched. 41B.1B is NOT STARTED.

## Evidence sources (read-only)
- Repo config: `supabase/config.toml` (project_id), `scripts/public-backend-defaults.ts`, `.env.example`, `.github/workflows/ci.yml`, repo root listing.
- Backend health tool: auth and database reachable; no backup data is returned by this tool.
- Lovable product documentation on Cloud database backups. This is cited as platform documentation, NOT as verification of this project.
- Customer rows read: 0. No SQL was run.

## 1. Topology
- LIVE DATABASE = Lovable Cloud project ref `wogepxfipdipogyogced` (custom domain thestartofyou.com; the committed public defaults point here).
- PREVIEW DATABASE = the same ref (`supabase/config.toml`; the project states one instance serves preview and live).
- PREVIEW AND LIVE SHARE DATABASE = **YES**
- Separate dev / preview / production projects = NO
- EXISTING STAGING DATABASE = **NO** (no second project referenced anywhere in the repo or config)
- LOCAL / DISPOSABLE DATABASE AVAILABLE = **NO** (no Docker, local Supabase setup or test Postgres in the repo; the sandbox has no Supabase CLI stack configured)
- CI DATABASE AVAILABLE = **NO** (CI uses the placeholder `https://ci-test.supabase.co` and mocks backend boundaries)

## 2. Backup capability
| Item | Status | Basis |
|---|---|---|
| AUTOMATIC BACKUP | NOT VERIFIED | Docs describe daily backups; the backup list for this project could not be inspected from here |
| POINT-IN-TIME RECOVERY | VERIFIED UNAVAILABLE (platform documentation) | Docs: daily snapshots only, no arbitrary-moment restore |
| MANUAL LOGICAL BACKUP | VERIFIED UNAVAILABLE (from Lovable) | No database password or service-role key on Lovable Cloud, so a full `pg_dump` cannot be produced here |
| RESTORE TO SAME PROJECT | NOT VERIFIED | Docs: More → Cloud → Database → Backups; not observed for this project |
| RESTORE TO NEW PROJECT | NOT VERIFIED | No documented mechanism found |
| BACKUP RETENTION | NOT VERIFIED | Docs say about 14 days; not confirmed for this project |
| MOST RECENT VERIFIED BACKUP | NOT VERIFIED | |

Listed or documented backups are not treated as a recovery path.

## 3. Restore path
Mechanism: Lovable Cloud daily backup restore (documented).
- BACKUP SOURCE = daily snapshot of the shared database
- RESTORE DESTINATION = the same (shared live and preview) database; this is an in-place rollback
- WHO CAN INITIATE IT = the project owner, in the Lovable interface
- REQUIRED USER ACTION = open More → Cloud → Database → Backups, confirm that a recent backup is listed, and note its date
- ESTIMATED OPERATION TYPE = FULL DATABASE (snapshot)
- WHAT WOULD BE LOST = every customer write and every schema change made after the snapshot, in both preview and live
- WHAT WOULD BE PRESERVED = the database state at the snapshot time; app code is unchanged (and may then mismatch the schema)
- HAS RESTORE BEEN REHEARSED = **NO**

Restore path = **NOT VERIFIED**. A real backup has not been observed, the permissions are only known from documentation, and a restore cannot be validated without rolling back live customer data. Validation of the restored database is only possible afterwards, on production.

## 4. Logical backup option
A full logical backup (schema, data, roles, extensions, `auth` schema, storage metadata, functions and triggers, RLS policies, enums and types, migration history) needs a direct Postgres connection with owner credentials. Lovable Cloud does not expose these, so this is VERIFIED UNAVAILABLE from Lovable. Per-table exports are not an adequate recovery path. The only substitute is the platform snapshot above. If a logical dump is required, the user would need to ask Lovable support whether one can be provided.

## 5. Isolated rehearsal environment
Options, in order:
1. Existing staging project: none.
2. New dedicated staging project: a separate Lovable Cloud project remixed from this codebase gets its own backend, and the current migrations then build the schema. It needs no production data.
3. Disposable/local Supabase: not available in this sandbox.
4. Temporary Postgres: lacks `auth`, roles and RLS parity, so it is insufficient for tests D to F and account deletion.

A Lovable draft with its own isolated backend (the platform supports draft backends separate from production) is an equivalent option to option 2.

- RECOMMENDED REHEARSAL ENVIRONMENT = a Lovable draft with an isolated backend, or failing that a remixed staging Lovable Cloud project
- WHY = full Supabase parity (auth, RLS, roles, triggers) built from the same migrations, with no route to live data
- CAN LOVABLE CONFIGURE IT DIRECTLY = NO. It needs the user's approval to create the draft or remix.
- USER ACTION REQUIRED = approve creating the isolated draft or staging project
- PRODUCTION DATA REQUIRED = **NO**

## 6. Parity requirements
The environment must contain: all current `supabase/migrations/` applied, with enums, functions, triggers, RLS, constraints, auth ownership, synthetic users, and synthetic Pregnancy and First Year records.
- SCHEMA PARITY METHOD = compare structure-only catalog queries (information_schema columns, pg_constraint, pg_indexes, pg_type enums) between production and staging, as a diff of names and definitions only
- RLS PARITY METHOD = diff `pg_policies` (table, command, roles, qual, with_check, permissive) and `relrowsecurity` flags
- FUNCTION/TRIGGER PARITY METHOD = diff `pg_proc` definitions (via `pg_get_functiondef`) and `pg_trigger` definitions for the public schema
- SYNTHETIC TEST DATA PLAN = two synthetic auth users (A and B), each with a legacy pregnancy journey, journeys row, reflections, babies (one with two babies) and First Year entries. No customer content.

## 7. Future rehearsal sequence (none of it run in this phase)
1. Verify the environment ref is NOT `wogepxfipdipogyogced`.
2. Capture a pre-migration structure snapshot.
3. Record fixture row-count baseline.
4. Apply `41b1a_family_entity_foundation.sql` byte-for-byte.
5. Regenerate types in that environment only.
6. Structural checks (13 FKs, unique keys, partial index, 4 policies, trigger).
7. Runtime integrity tests A to L.
8. Regression suite.
9. Account Deletion Integrity Test.
10. Rollback rehearsal (documented 7-step order).
11. Reapply the migration.
12. Confirm final clean state against the post-migration snapshot.

## 8. Runtime tests (PENDING APPLICATION)
- A. several episodes per person;
- B. a second active episode is rejected;
- C. different users can each have an active episode;
- D. pregnancy records cannot reference another user's episode;
- E. babies cannot reference another user's episode;
- F. journeys cannot point to another user's episode;
- G. null links still support legacy rows;
- H. an episode with zero babies is valid;
- I. multiple babies can link to one episode;
- J. `expected_count` is limited to 1 to 4 or empty;
- K. app regression tests stay green;
- L. no historical ownership is guessed (no backfill).

## 9. Account Deletion Integrity Test
Status: **NOT RUN**. Synthetic users only. Fixture and checks 1 to 4 are as in `phase41b1a-family-entity-foundation-implementation.md`. Stop rule: if RESTRICT prevents whole-account deletion (`supabase/functions/delete-account`), STOP, do not apply to production, and redesign the deletion order.

## 10. Production application gate
All of the following are required before the file moves to `supabase/migrations/`:
- backup created and verified (date observed);
- restore path documented;
- isolated environment available;
- staging schema parity confirmed;
- staging migration PASS;
- runtime tests A to L PASS;
- Account Deletion Integrity Test PASS;
- regression suite PASS;
- typecheck PASS;
- build PASS;
- rollback and recovery procedure documented;
- production SQL reviewed byte-for-byte against the rehearsed file;
- explicit human approval.

Production application: **FORBIDDEN** until every gate passes.

## 11. Decision
**E. APPLICATION BLOCKED — USER ACTION REQUIRED**

Exact required actions:
1. In Lovable, open More → Cloud → Database → Backups and confirm a recent backup is listed. Report the date and the retention shown. Do not restore.
2. Approve creating an isolated Lovable draft backend (or a remixed staging project) for the 41B.1A rehearsal, using synthetic data only.
3. Accept the known limitation that any production restore is an in-place, whole-database rollback that loses all later writes in both preview and live, or ask Lovable support about restoring to a separate project or a logical dump.

## 12. Change accounting
- Database changes: 0
- Migration applications: 0
- Customer rows read: 0
- Customer rows copied: 0
- RLS changes: 0
- Product changes: 0
- UI changes: 0
- Companion changes: 0
- Memory changes: 0
- Grounding changes: 0
- Secrets changed: 0
- Environment switched: NO
- Deployment: NO
- 41B.1B: NOT STARTED

## 13. Final report
- Live and preview share database = YES
- Existing staging environment = NO
- Automatic backup = NOT VERIFIED
- PITR = VERIFIED UNAVAILABLE (platform documentation)
- Logical backup capability = VERIFIED UNAVAILABLE
- Restore path = NOT VERIFIED
- Restore rehearsed = NO
- Isolated rehearsal environment = REQUIRES SETUP
- Recommended rehearsal environment = Lovable draft with isolated backend (fallback: remixed staging project)
- User action required = the three actions in section 11
- Production application permitted = NO
- 41B.1A migration applied = NO
- 41B.1B started = NO
- Decision = E. APPLICATION BLOCKED — USER ACTION REQUIRED

## Closure
PHASE 41B.1A-R — RECOVERY & MIGRATION ENVIRONMENT GATE: BLOCKED / USER ACTION REQUIRED. The pending migration is not applied automatically.
