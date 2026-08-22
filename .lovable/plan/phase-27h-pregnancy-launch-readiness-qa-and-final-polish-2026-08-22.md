# Phase 27H — Pregnancy Launch Readiness QA and Final Polish

QA, verified bug fixing and minor polish only. No new features, no redesign, no schema, RLS, storage, AI, auth or sitemap changes.

## Confirmed so far (read this turn)

From `src/App.tsx`:
- `/my-week`, `/my-week/:week`, `/my-journey`, `/pregnancy-toolkit` and its subroutes, `/my-first-year*`, `/my-pregnancy-chapter`, `/my-ttc-journey`, `/journey-support` are wrapped in `ProtectedRoute`.
- `/journal-start` is public, `/journal` renders the Product page, `/product` redirects to `/journal`.
- Public pregnancy hub, topic, trimester, week and article routes are unprotected.

Everything else below is unverified and will be checked live before any change.

## Step 1 — Discovery pass (no code changes)

Static review: bottom nav active-state logic, desktop header link resolution, journal bridge placements across My Week, My Journey and the toolkit pages, journal-owner flag reads, media slot states, `SeoHead` presence per route, decorative artwork `aria-hidden`, tap target sizes, and hardcoded colour values in the surfaces touched by Phases 27B to 27G.

Live pass with Playwright at 390px and 1440px, signed in as a pregnancy user, across every route listed in the request plus one public pregnancy article and one signed-in First Year route. For each: console errors, failed network requests, horizontal overflow, broken images, bottom nav and consent banner overlap, single H1, focus rings and accessible names.

Both journal-owner states are exercised: with the localStorage flag absent (discovery tone) and present (owner tone), including that the secondary link on `/journal-start` does not set the flag.

## Step 2 — Fix only verified issues

Permitted fix set: broken image fallback, broken link, wrong nav active state, bottom nav or consent banner overlap, horizontal overflow, spacing, tap targets under 44px, missing focus ring, missing `aria-hidden` on decoration, missing or unhelpful alt text, a route that wrongly 404s, a duplicated journal bridge, journal-owner tone not applying, copy guardrail breaches, and small token-based visual consistency fixes.

Anything outside that set is reported as a backlog item rather than fixed. If a finding needs a backend or content change, it is reported, not actioned.

## Step 3 — Tests

Targeted Vitest coverage added only where a real issue was found: nav active state, journal-owner tone, `/journal-start` routing behaviour, media empty states, toolkit cue placement, copy guardrails. Unrelated tests untouched.

## Step 4 — Verification

`npx tsgo --noEmit -p tsconfig.json`, targeted vitest, `npx vitest run`, `npm run build`.

## Report

The 30-point report format requested, including discovery findings, per-area QA results, behaviour preservation confirmation, check results, blockers, whether 27H can close, and post-launch backlog. Stop after the report.
