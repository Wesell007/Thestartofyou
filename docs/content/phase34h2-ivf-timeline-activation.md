# Phase 34H.2 — IVF timeline save activation

Status: READINESS PASS / BLOCKED ON HUMAN PRIVACY-LEGAL APPROVAL + PRODUCTION FLAG INJECTION
VERIFICATION / FEATURE OFF

The feature was not activated in this phase. Two independent blockers remain open.

## Feature state

| Item | Value |
| --- | --- |
| `IVF_TIMELINE_SAVE_ENABLED` default | FALSE |
| Shared/public environment flag changed | NO |
| Feature activated | NO |
| Application release deployed | NO |
| Schema changes in 34H.2 | 0 |
| Migrations in 34H.2 | 0 |
| RLS changes | 0 |
| New analytics | 0 |
| AI / Companion access | NO |
| Consent UX added | NO |

## Feature flag mechanism

FEATURE FLAG RESOLUTION TYPE = **BUILD-TIME**.

`src/lib/ivfTimelineFlags.ts` reads `import.meta.env.VITE_IVF_TIMELINE_SAVE_ENABLED` and compares it
to `"true"`, defaulting to FALSE. Vite resolves `import.meta.env` values when the bundle is built, so
an already-built and deployed bundle cannot be activated by changing an environment value afterwards.

Future activation therefore requires, in order:

1. a verified production build-time injection point;
2. the value TRUE during the production build;
3. a new application build;
4. a production deployment.

### Injection-point audit

| Question | Finding |
| --- | --- |
| PRODUCTION FLAG INJECTION POINT | NOT VERIFIED |
| REPOSITORY CURRENTLY DEFINES PRODUCTION IVF FLAG | NO |
| HOSTING/DEPLOYMENT ENVIRONMENT DEFINES IVF FLAG | NOT VERIFIABLE FROM AVAILABLE EVIDENCE |
| APPLICATION REBUILD REQUIRED TO ACTIVATE | YES |
| APPLICATION REDEPLOY REQUIRED TO ACTIVATE | YES |
| TECHNICAL ACTIVATION CONFIGURATION FULLY VERIFIED | NO |

Evidence: the variable appears in no `.env`, no `.env.example`, no CI workflow (`.github/workflows/ci.yml`
sets only the two public Supabase values) and no build script. `vite.config.ts` `define`s only the
three public backend values from `scripts/public-backend-defaults.ts`. The repository contains no
hosting or deployment configuration file, so the production build environment cannot be inspected
from repository truth.

The eventual injection point is **not assumed**. It may be the hosting build environment, a CI/build
environment, a repository environment file, or another verified release mechanism. It must be
confirmed before activation.

## Validation build vs release build

| Item | Value |
| --- | --- |
| VALIDATION PRODUCTION BUILD | YES (feature OFF) |
| FEATURE-ON PRODUCTION BUILD | NO |
| PRODUCTION RELEASE BUILD | NO |
| PRODUCTION RELEASE BUILD DEPLOYED | NO |

The production build run in this phase is a validation build only, carrying the real release feature
state (OFF). It is not a release and was not deployed.

Feature-ON verification was confined to an isolated environment: a temporary build with
`VITE_IVF_TIMELINE_SAVE_ENABLED=true` written to a throwaway directory and served on a private local
port, with the entire shared backend origin intercepted deny-by-default. Expected reads and IVF
save/update/clear mutations were fulfilled locally with synthetic data; anything else was aborted.
Results: shared-backend TTC reads 0, shared-backend IVF reads 0, shared-backend TTC mutations 0,
shared-database IVF QA writes 0, shared auth/account mutations 0, unexpected shared-backend requests 0.
Signed-out and signed-in feature-ON browser QA passed at 1280 / 834 / 390 with 0 overflow and 0 console
errors. All temporary artefacts were destroyed. The shared preview, `.env`, CI, Vite config, deployment
configuration and shared database were unchanged.

FEATURE-ON BROWSER QA (ISOLATED) = PASS.
REAL PRODUCTION BACKEND FEATURE-ON QA = NOT PERFORMED.
LOGIC AND EXPERIENCE READINESS = PASS.
FULL ENGINEERING RELEASE READINESS = NO (production flag injection point still unverified).
HUMAN PRIVACY/LEGAL READINESS = NO.

## Retention and deletion — verified technical behaviour

| Action | Behaviour |
| --- | --- |
| Remove saved timeline | Clears only `ivf_transfer_date` and `ivf_transfer_type`. TTC journey remains = YES. Other TTC answers remain = YES. |
| TTC journey deletion | `delete_active_journey('ttc')` deletes the `ttc_journeys` row; IVF values deleted with the row = YES. |
| Account deletion | The verified account-deletion flow deletes the auth user; `ttc_journeys.user_id` is `REFERENCES auth.users(id) ON DELETE CASCADE`, so the journey row and both IVF values are removed through the cascade = YES. |
| Automated IVF expiry | NO |
| Automated retention job | NO |
| Backup retention | NOT ESTABLISHED BY REPOSITORY TRUTH |

No backup-retention promise is made to visitors. Any such wording needs verified platform facts and
human privacy/legal approval.

## Auth handoff (locked, Phase 34H.1)

- AUTH FLOW TYPE = full-page redirect via `/auth`.
- SIGNED-OUT VALUES SAFELY SURVIVE AUTH = NO.
- AUTH HANDOFF DECISION = ACCEPTED RE-ENTRY UX.

Not an open engineering blocker. No treatment value is placed in a URL, query string, hash,
localStorage, sessionStorage, cookie, auth metadata or analytics.

## Rollback plan (for a future activation)

1. Set the build-time flag value to FALSE at the verified injection point.
2. Rebuild the application.
3. Redeploy.

Never: drop the Phase 34G columns, remove the paired-state constraint, automatically delete stored
IVF values, or rewrite TTC journeys. If people have saved IVF context before a rollback, turning the
UI off does not delete those values; any later deletion is a separate governed decision.

## Activation blockers

1. **HUMAN REVIEW BLOCKER** — see `phase34h2-ivf-timeline-privacy-legal-gate.md`.
2. **PRODUCTION ACTIVATION CONFIGURATION BLOCKER** — production flag injection point NOT VERIFIED.
