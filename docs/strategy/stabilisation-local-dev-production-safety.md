# Stabilisation task — local development must not reach production silently

Status: DOCUMENTED / PROPOSED FIX AWAITING APPROVAL. Separate from the family-entity data model. Nothing changed.

Principle: no local development session should silently connect to production.

## Current behaviour

| Field | Finding |
|---|---|
| CURRENT FALLBACK PATH | `vite.config.ts` builds the public backend config as `resolvePublicBackendEnv({ ...PUBLIC_BACKEND_DEFAULTS, ...env }, mode)`. The committed defaults sit underneath real environment variables in every mode. |
| FILES RESPONSIBLE | `scripts/public-backend-defaults.ts` (committed production URL, publishable key and project id); `vite.config.ts` (spreads them for every mode); `scripts/public-backend-env.ts` (its placeholder fallback is only reached when no value is present, which never happens once the defaults are spread in). |
| WHY IT CAN REACH PRODUCTION | On a fresh clone with no `.env`, `npm run dev` receives the production URL and key from the committed defaults. The app starts normally. Signing in on localhost signs in to the live backend, and every save is a production write under that account. Nothing warns the developer. |
| What bounds the damage | The key is the publishable key, so row-level security still applies. The risk is real writes to real accounts and test data in production, not a data breach. |
| Who is affected | `npm run dev`, `npm run build:dev`, `npm run preview`, and Playwright's local web server (`npm run dev -- --port 4173`). |
| Not affected | Vitest (own config, mocked backend). CI (sets a placeholder URL and key explicitly). |
| Test that hides it | `src/test/publicBackendEnv.test.ts` asserts the placeholder fallback for development, but it calls the resolver directly with `{}`. The real config never passes `{}`. |

## Why the defaults exist

The file's own comment: `.env` is gitignored, so deployment builds run without it. The published site is built by Lovable hosting with no `.env`, so the committed defaults are how the production build finds its backend. Removing them outright would break the published build.

| Field | Finding |
|---|---|
| CI / BUILD IMPACT | CI sets both variables explicitly, so any change to the fallback leaves CI unchanged. |
| CURRENT HOSTING / DEPLOYMENT IMPACT | The production build depends on the committed defaults. How the Lovable preview is started (dev server or build, with or without injected variables) is not visible from the repository and must be checked before the fallback is narrowed. |

## Safe target behaviour

- A production build keeps working exactly as today.
- A local dev server with no `.env` either refuses to start or starts against a placeholder backend, with a clear message.
- Connecting a local session to production is possible only by an explicit, visible choice.

## Proposed fix (two steps, smallest first)

**Step 1 — make it loud. No hosting risk.**
When the dev server starts and the backend URL came from the committed defaults rather than from real environment variables, print a prominent terminal warning naming the production project, and show a fixed "Connected to PRODUCTION" strip in the app during development only. Nothing about resolution changes, so the Lovable preview and the published build cannot break. This already satisfies the principle: the connection is no longer silent.

**Step 2 — make it explicit. Needs one check first.**
Apply the committed defaults only when Vite's command is `build`. For `serve` (the dev server), require real variables or an explicit `VITE_BACKEND_TARGET=production` opt-in; otherwise fall back to the placeholder. Before doing this, confirm how the Lovable preview starts. If it uses the dev server without injected variables, step 2 would break the preview and must instead key on an environment marker that only Lovable sets.

Also:
- Fix the unit test so it exercises the real merge (`{ ...defaults, ...env }`), not the bare resolver.
- Add a line to the README and `AGENTS.md`: create `.env` before running the app locally.

## Interim rule (in force now)

Do not run the application locally without a `.env` that points away from production. The 41B rehearsal is database-only and does not need the app running at all.

---

## Recovery addendum (3 October 2026)

Provenance. Sections above are the original 41B.0-R text, authored on 2 October 2026 in a Claude session that had read access to the repository but no write path to it. The files were staged in that session's handover folder and never committed. On 3 October 2026 the text was restored into this repository by replaying the session's recorded Write and Edit operations in order; the restored content is byte-identical to the final staged version. Nothing above this addendum has been rewritten.

Status update, recorded without rewriting the original: the proposed fix has since landed on `main` as commit `b487c7aa` (LOCAL-0, "chore(dev): prevent silent production backend fallback"). Per that commit, `vite.config.ts` merges the committed production defaults only in production mode; every other mode uses the explicit local environment and otherwise falls back to the non-production placeholder; the resolver fails closed when a non-production session points at the production URL unless `VITE_ALLOW_PRODUCTION_BACKEND=true` is set, in which case the dev server prints a loud warning; Playwright's web server receives the same placeholder values CI uses; `src/test/publicBackendEnv.test.ts` was extended and `.env.example` was added. Status: FIX LANDED (LOCAL-0). The interim rule above remains good practice.
