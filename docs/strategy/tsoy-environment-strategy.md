# TSOY environment strategy

**Status: AUTHORITATIVE CURRENT STATE (Gate 0 rebaseline, 23 October 2026).** This document supersedes earlier *current-state* descriptions of where TSOY runs. Historical phase documents and evidence keep their original wording, including every reference to `wogepxfipdipogyogced`; they describe what was true when they were written.

## 1. Current reality

| Item | State |
|---|---|
| Source of truth | **GitHub repository** (this repo): migrations, Edge Functions, tests, architecture, product, design docs and evidence. **Secrets never live in Git.** |
| Implementation owner | **Claude Code**: frontend, backend, database, AI, mobile, testing, design-system implementation |
| Lovable project "The Start of You" | **INTENTIONALLY UNPUBLISHED** by the owner. Lovable is no longer the primary builder and not the design authority. It may remain a hosting/deployment layer where useful. **No Supabase reconnection** until an owner-approved environment exists |
| `thestartofyou.com` | still attached to Lovable; **intentionally not live**. Not to be republished until the premium V1 launch gate (Gate 10) passes |
| Lovable-era visual implementation | deliberately **not** to be published; the product is being redesigned (`docs/design/journal-to-digital-design-system.md`) |
| Active production Supabase target | **NONE APPROVED** |
| `wogepxfipdipogyogced` | **HISTORICAL / FORMER / NO-LONGER-VERIFIED** target (the Lovable-managed backend used up to early October 2026). It must **not** be treated as the active production target. On 23 October 2026 its hostname did not resolve (`docs/strategy/evidence/n10-production-preflight/`). It stays on every harness denylist |
| Permanent staging | **ACTIVE (Gate 1 PASS, 23 October 2026)**: `tsoy-staging`, ref `aeeprivmakalcbnefwwm`, WesellProducts, eu-west-2, PostgreSQL 17.11.0.003, the 54-migration baseline (M1–M7, no 41B.1A). Auth access-token lifetime `jwt_exp` = 3600 s (verified by the owner in the Dashboard). Evidence `docs/strategy/evidence/gate1-permanent-staging/` |
| Permanent production | **PLANNED / NOT CREATED** (`tsoy-production`, §2D) |
| Disposable rehearsal projects | all retired: C1 run1/run2, G3, N10.1, N10.3B, N10.5, D14.2 (`jjrhizafpikmyvfapcic`, CLOSED / PASS / RETIRED). None may be recreated or restored |

**N10 production preflight (23 October 2026)**: reclassified as **HOLD / ACTIVE PRODUCTION TARGET DOES NOT CURRENTLY EXIST OR IS NOT OWNER-APPROVED**. It was not an infrastructure incident: the owner had intentionally unpublished Lovable, and no production target is approved. Its evidence is kept unchanged.

### Repository items that named the historical ref (resolved in Gate 1)

*Gate 1 update:*
- `scripts/public-backend-defaults.ts` was **removed**. Backend selection is now explicit (`scripts/public-backend-env.ts`, `scripts/backend-environments.ts`, `VITE_TSOY_ENVIRONMENT`).
- Production builds fail closed, and staging can never be a production backend.
- `supabase/config.toml` `project_id` is now the local identifier `thestartofyou`.

The Gate 0 text below is kept as written.

- `scripts/public-backend-defaults.ts`: committed public build defaults (`VITE_SUPABASE_URL` / project id). Any build without `.env` would target the historical backend. **Gate 1 must replace these** with staging values (or remove the defaults and fail closed), with `src/test/publicBackendEnv.test.ts` updated.
- `supabase/config.toml` `project_id`: never used as authority (every CLI run names its target explicitly). Gate 1 decides its value.
- `.lovable/plan*.md`: historical Lovable plans; kept as history.
- Tests that deny the historical ref (e.g. `src/test/accountDeletionInvariant.test.ts`) stay as they are.

## 2. Target environment model

```
          GitHub (source of truth) ──► Claude Code (implementation)
                     │
        tested migrations / functions, promoted forward only
                     ▼
   tsoy-staging (permanent)  ──promote──►  tsoy-production (permanent, clean)
   engineering + QA                          real users only
                     ▲                                │
          disposable rehearsal projects        Lovable / other hosting
          (one-off, retired after evidence)    (deployment layer only)
```

**A. Repository**: GitHub is the single authoritative source. Forward-only migrations; Edge Functions; tests; architecture, product and design docs; evidence. Secrets live only in platform secret stores, as local out-of-band files during rehearsals, or with the owner.

**B. Claude Code**: primary implementation owner for frontend, backend, database, AI, mobile, testing and design-system implementation. Owner approval gates every environment creation, every production step and every legal/privacy decision.

**C. Supabase staging, `tsoy-staging`** (permanent project; **ACTIVE since Gate 1**, ref `aeeprivmakalcbnefwwm`). Select it explicitly with `VITE_TSOY_ENVIRONMENT=staging` in a gitignored `.env`; there is no fallback. Operational tooling must pass `scripts/staging-target-guard.ts`. It is independent shared platform infrastructure owned by the owner's Supabase organisation, not by Lovable.

Purpose:
- ongoing engineering;
- 41B family architecture (41B.1B–1D);
- journey systems;
- Companion, memory and journal;
- multimodal media;
- proactive intelligence;
- co-parent/family;
- agentic actions;
- mobile-app backend work;
- production-like QA.

Synthetic data only. It replaces disposable projects for routine work, though disposable projects remain available for destructive rehearsals.

**D. Supabase production, `tsoy-production`** (future clean environment; **not created**, Gate 7). It is created only when the platform is stable and launch gates are near. It holds real users only, and receives only migrations and features already proven on staging.

Its activation covers:
- N10 (Gate 9);
- PostHog, Lovable Email and other provider configuration;
- secrets;
- cron and workers;
- monitoring;
- advisor checks.

The full list is in `docs/strategy/n10-production-activation-checklist.md`, which now targets `tsoy-production`.

**E. Lovable**: the current project stays unpublished. It is not the design authority and not the primary builder. It may host deployments if that remains useful; whether to keep it as host is decided before Gate 10. No Supabase reconnection in Gate 0.

**F. Domain**: `thestartofyou.com` stays attached and intentionally not live until Gate 10.

## 3. Rules that carry over unchanged

- Every remote operation names its target explicitly through a guard that allows only the approved ref and denies every retired or historical ref, including `wogepxfipdipogyogced`, until the owner re-approves it.
- Predictions before execution; evidence committed before teardown; secret scan before every evidence push; credentials checked by existence and size only.
- No restore of retired projects; no reuse of rehearsal credentials.
- Frozen 41B.1A SQL stays frozen (`docs/strategy/migrations-pending/`); it is applied first on staging at Gate 3, never directly to production.

## 4. Status board

| Item | Status |
|---|---|
| D14.2 | CLOSED / PASS / RETIRED |
| N10 engineering | substantially proven (N10.3B, N10.5, D14.2 hosted) / production activation **DEFERRED** until `tsoy-production` exists and D14 is legally cleared |
| N10 production | **NOT ACTIVATED** |
| D14 | **OPEN** |
| D (`suppressed_emails`) | **OPEN**, a requirement to resolve before final production activation (re-check on `tsoy-production`, not on the historical project) |
| Active production target | **NONE APPROVED** |
| Staging | **ACTIVE** (`aeeprivmakalcbnefwwm`; N10 engineering present / not activated) |
| Production | PLANNED / NOT CREATED |
| Lovable | INTENTIONALLY UNPUBLISHED |
| 41B.1B | NOT STARTED / NOT AUTHORISED |

Programme sequence: `docs/strategy/tsoy-v1-product-rebaseline.md`.
