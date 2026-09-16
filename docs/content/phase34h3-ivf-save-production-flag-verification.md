# Phase 34H.3 — production feature-flag verification (audit only)

Scope: establish where a production build would receive
`VITE_IVF_TIMELINE_SAVE_ENABLED`. Audit only. Nothing was changed, set, built,
deployed or activated. No secret values were read, copied or recorded; only
configuration locations and variable names appear below.

## What was inspected

| Source | Inspectable | Evidence |
| --- | --- | --- |
| Build scripts (`package.json`) | YES | `build` = `vite build`, preceded by `prebuild` sitemap generation |
| Vite configuration (`vite.config.ts`) | YES | Injects a `define` map built from `resolvePublicBackendEnv`, which covers only the three public Supabase variables. The IVF flag is not in the define map. |
| Flag resolution (`src/lib/ivfTimelineFlags.ts`) | YES | Build-time `import.meta.env.VITE_IVF_TIMELINE_SAVE_ENABLED`, defaults FALSE. No runtime configuration source. |
| CI workflow (`.github/workflows/ci.yml`) | YES | Sets only test Supabase values; does not set the IVF flag; builds for verification, does not deploy. |
| Repository environment files | YES | `.env` present locally and gitignored, containing only the three public Supabase variable names. `.env.example` does not list the IVF flag. No `.env.production` exists. |
| Committed backend defaults (`scripts/public-backend-defaults.ts`) | YES | Public Supabase values only; no feature flags. |
| Project runtime secrets configuration | YES (metadata only) | One managed platform key exists; runtime secrets serve server-side functions and are not injected into the client build. |
| Publish settings | YES (metadata only) | The project is published with public visibility through Lovable hosting. |
| Hosting build runner / deployment pipeline internals | NO | Not inspectable from the project. |
| Platform build-time environment-variable UI for this project | NO | Not inspectable from the project; workspace-level build secrets are documented as workspace-admin configuration and could not be confirmed as reaching the client build for this project. |

## Required findings

Production hosting/deployment provider =
**Lovable hosting** (project published; custom domain `thestartofyou.com`)

Production build mechanism =
**`npm run build` / `vite build` executed by the Lovable publish pipeline** (the
build command is verified from the repository; the pipeline's own runner
internals are NOT VERIFIED)

Production environment-variable configuration location =
**NOT VERIFIED** (no project-level build-time environment-variable surface was
inspectable; the only verified client-build injection path is the repository
itself, through `vite.config.ts` / an environment file consumed by Vite)

Can `VITE_IVF_TIMELINE_SAVE_ENABLED` be supplied at build time =
**NOT VERIFIED** for a platform-managed variable.
**YES** for a repository-supplied value, since Vite reads `import.meta.env` at
build time and the config already injects build-time defines. This path is
verified as a mechanism but has never been exercised for this flag.

Exact value-setting workflow =
**NOT VERIFIED.** No confirmed platform workflow exists. The only verified
candidate is a repository change that supplies the variable to the Vite build,
which would itself need review before use.

Repository code/config change required =
**YES** on the only verified mechanism; **NOT VERIFIED** whether a
platform-managed variable could avoid it.

Application rebuild required = **YES**

Application redeploy required = **YES**

Rollback through FALSE + rebuild + redeploy =
**NOT VERIFIED** in production, because the forward mechanism is not verified.
Logically equivalent to the forward path: the flag is build-time only, so a
FALSE value plus rebuild plus redeploy removes the feature entirely.

Flag changed during Phase 34H.3 = **NO**

## Behaviour when the flag is FALSE

The save controller does not mount, the save hook never runs, no persistence
helper is called, and no save, update or remove control renders. This is
asserted by automated tests.

Turning the feature OFF does **not** delete existing saved IVF data; the two
columns retain whatever a person previously chose to save.

## Future controlled release sequence (documented only; not executed)

1. Receive genuine human privacy/legal approval.
2. Publish any approved privacy-notice changes.
3. Implement any additional requirements arising from the review.
4. Complete final release QA.
5. Verify and then set the production build-time flag TRUE.
6. Build the application.
7. Deploy the application.
8. Run a synthetic production smoke test.
9. Remove the synthetic saved IVF values.
10. Confirm production synthetic IVF values remaining = 0.

Rollback:

1. Set the flag FALSE.
2. Rebuild.
3. Redeploy.

None of these steps were performed in this phase.

## Outcome

Production flag injection point = **NOT VERIFIED** (Outcome B). The verified
build-time resolution and the repository-side mechanism are recorded above, but
no confirmed production configuration location exists, so activation remains
blocked on this gate as well as on human privacy/legal approval.
