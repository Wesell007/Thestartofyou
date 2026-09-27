# Phase 41B.1A-R — Recovery & Migration Environment Gate

Operational audit only. The database is not changed, no migration is applied, no secrets or settings change, and nothing is deployed. The pending 41B.1A file stays where it is. 41B.1B is not started.

## 1. Evidence gathering (read-only)
- **Topology:** check the committed backend defaults, `.env.example`, `supabase/config.toml`, the CI workflow and the Playwright/Vitest configs for database references. Check backend status using read-only project info tools. Record only the project ref, and never keys or connection strings.
- **Backups:** use the read-only backend status and project info tools to look for backup, point-in-time and retention details. Anything these tools cannot show is marked NOT VERIFIED rather than assumed.
- **Local or disposable database:** check the repo for a local Supabase setup, Docker files or a test Postgres, and check whether CI uses a database (current CI points at a fake URL and mocks the backend).
- **Customer rows read:** 0. Catalog or row-count queries are not needed and will not be run.

## 2. Expected findings (confirmed during the audit, never asserted beforehand)
- Live and preview use one database (ref `wogepxfipdipogyogced`), so they share it: YES.
- No staging project, and CI mocks the backend.
- Lovable Cloud gives no dashboard access and no service-role key or database password, so a full logical backup (`pg_dump`) and a restore cannot be run or rehearsed from here. The restore path is expected to be NOT VERIFIED.
- The likely decision is **E. APPLICATION BLOCKED — USER ACTION REQUIRED**, falling back to D if no backup capability can be confirmed at all. The document states the final decision from the evidence.

## 3. Rehearsal environment recommendation
Options are assessed in the brief's order: existing staging, new staging project, local/disposable Supabase, temporary Postgres. The recommendation is expected to be a **separate Lovable Cloud project (or a Lovable draft branch with its own isolated backend, if available)** built from the current migrations plus synthetic data only. The document names the exact user action needed (for example, creating or approving that environment, or getting backup confirmation from Lovable support) and states whether Lovable can set it up directly.

## 4. Document to create
`docs/strategy/phase41b1a-recovery-and-migration-environment-gate.md`, with:
- topology fields (section 1 of the brief);
- backup table (7 items, each VERIFIED AVAILABLE / VERIFIED UNAVAILABLE / NOT VERIFIED);
- restore-path record per mechanism, with rehearsed = NO;
- logical backup assessment (schema, data, roles, extensions, auth, storage, functions, RLS, enums, migration history) and the user action it would need;
- staging options and recommendation;
- parity methods: schema, RLS, function/trigger, and a synthetic data plan;
- the 12-step future rehearsal sequence;
- runtime tests A to L plus the Account Deletion Integrity Test (NOT RUN);
- the production application gate (13 items);
- change accounting (all 0 / NO);
- final report fields and decision, plus closure or blocked wording with the exact next action.

## 5. Roadmap
Append one Phase 41B.1A-R entry with its decision to `roadmap.md`.

## Technical notes
- Tools used are read-only: file reads, `supabase--project_info` / `cloud_status`, and possibly a docs search for Lovable Cloud backup behaviour (cited as documentation, never as verification of this project).
- No `run_sql`, no migrations, no secret tools, no draft creation.
