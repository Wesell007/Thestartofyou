# 16 — Retirement

Evidence was pushed first (`4072bf27`, fast-forward to `origin/feat/41b1a-family-entity-foundation`).

| Step | Result |
|---|---|
| Pause | connector `pause_project(jjrhizafpikmyvfapcic)` at ≈06:46Z → `PAUSING` → **`INACTIVE`** at 06:48:00Z |
| Delete (guarded: `assertTarget` + exact ref) | `supabase projects delete jjrhizafpikmyvfapcic --yes` (CLI 2.120.0) at 06:48:05Z → **refused**: *Missing required permission(s): `project_admin_write`* (`raw/16-delete.txt`). The project-scoped PAT cannot delete projects, and the claude.ai connector has no delete operation. As the brief requires, no broader credential was requested. |
| Local derived secrets | worker password, worker invocation secret, local copy of the anon/service-role keys and the fixture registry (synthetic ids/e-mails) **deleted** from `C:\Users\Administrator\.d142\`; staging tree deleted. Harness code (no secrets) and the sealed clone remain. |
| Owner-held files | `C:\Users\Administrator\.d142\d142.dbpass` and `d142.pat` left in place for the owner (see below) |

## Owner manual steps (shortest path)

1. Supabase Dashboard → project **`tsoy-d14-2-m7-rehearsal`** (ref `jjrhizafpikmyvfapcic`, currently Paused) → **Project Settings → General → Delete project** → type the project name → confirm. Check the ref before confirming. Never touch `wogepxfipdipogyogced` (production).
2. Dashboard → **Account → Access Tokens** (`https://supabase.com/dashboard/account/tokens`) → revoke the project-scoped token created for D14.2.
3. Delete `C:\Users\Administrator\.d142\d142.dbpass` and `C:\Users\Administrator\.d142\d142.pat`. The whole `C:\Users\Administrator\.d142\` folder can go once you no longer need the harness.

Until step 1 is done, the paused project still holds synthetic fixtures only (no real user data), its function secrets and the worker role. Its database password, worker password and invocation secret are useless outside it.

## Teardown confirmation (23 October 2026)

**D14.2 = CLOSED / PASS / RETIRED.**

The owner confirmed:
- project `tsoy-d14-2-m7-rehearsal` (`jjrhizafpikmyvfapcic`) was **deleted manually**;
- the D14.2 scoped PAT was **revoked**;
- `d142.dbpass` and `d142.pat` were **deleted**.

Independent checks:
- the connector's `get_project(jjrhizafpikmyvfapcic)` now returns a permission error, consistent with the project being gone;
- `C:\Users\Administrator\.d142\` no longer contains the credential files. The rest of that folder (harness, raw copies, sealed clone; no secrets) was then removed entirely.

Production was not contacted at any point. D14.2 must not be repeated. D = OPEN / VERIFY REQUIREMENT; D14 = OPEN; 41B.1B = NOT STARTED / NOT AUTHORISED.
