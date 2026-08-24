# Phase 28I — TTC Launch Readiness QA and Final Polish

QA, verified bug fixing and minor polish only. No new features, no redesign, no new routes, no schema, RLS, storage, auth, AI, cycle maths, calculator, handover, SEO or sitemap changes unless a verified bug needs a very small fix.

## Confirmed so far (read this turn)

From `src/App.tsx`:
- Public: `/trying-to-conceive`, `/trying-to-conceive/legacy`, `/ovulation-calculator`, and the ten TTC topic routes mounted under `/trying-to-conceive/*` (ovulation, preconception-health, fertility, ivf-and-treatment, male-fertility, age-and-fertility, cycle-tracking, pregnancy-tests, two-week-wait, conditions).
- `/trying-to-conceive/ovulation-calculator` redirects to `/ovulation-calculator` and passes `search` through, so query params are preserved by design.
- `/my-ttc-journey` is wrapped in `ProtectedRoute`. `/setup/trying-to-conceive` is public.

Note: the topic routes live under `/trying-to-conceive/<topic>`, not the bare `/ovulation`, `/fertility` style paths listed in the request. Bare paths will be probed during discovery and reported as 404s rather than new routes being added.

Everything else below is unverified and will be checked live before any change.

## Step 1 — Discovery pass (no code changes)

Static review across the TTC surfaces: bottom nav active-state and public/signed-in visibility, TTC header behaviour, Today card stage copy, support moment priority, Ask companion chips and context builder, notes composer and grouping, calendar state map and legend, reading card assets and alt text, handover raise conditions, setup flow and calculator behaviour, `SeoHead` presence per public route, decorative artwork `aria-hidden`, tap target sizes, and hardcoded colour values.

Live pass with Playwright at 390px and 1440px over every route in the request plus a sample TTC article, the five `/ask?stage=ttc&topic=...` entries, one signed-in pregnancy route, one signed-in First Year route, `/journal` and `/journal-start`. For each: console errors, failed requests, horizontal overflow, broken images, bottom nav and consent banner overlap, single H1, focus rings, accessible names.

Signed-in TTC states exercised with QA/test data only, by seeding a test account's own journey dates and logs: neutral, fertile window, two-week wait, near test day, negative or unclear test, period started, current-cycle positive test, active pregnancy pointer, no logs, with notes, companion name set and unset. Any state that cannot be reached without touching real user data is reported as a QA limitation, not accessed.

## Step 2 — Fix only verified issues

Permitted fix set, exactly as scoped in the request: broken route or redirect, broken image, missing alt text, console error, horizontal overflow, nav or consent overlap, tap targets under 44px, missing focus ring, wrong nav active state, duplicate or missing section, confusing legend, calendar colour mismatch, support moment or handover firing in the wrong state, Ask chip topic mismatch, private context in the URL, hardcoded companion name, copy guardrail breach, and small token-based visual consistency fixes.

Any visual fix is guided by a Nano Banana reference against the existing TTC direction (cream paper, sage and olive, botanical) before implementation. No new visual direction.

Anything larger is reported as post-launch backlog, not actioned.

## Step 3 — Tests

Targeted Vitest coverage added only where a real issue is found: route smoke, copy guardrail scan, Ask context privacy, handover priority, calendar state mapping, notes grouping, support moment priority, companion name fallback. Unrelated tests untouched.

## Step 4 — Verification

`npx tsgo --noEmit -p tsconfig.json`, targeted vitest, `npx vitest run`, `npm run build`.

## Report

The 32-point report requested, including discovery findings, per-area QA results, behaviour preservation confirmation, check results, blockers, accepted QA limitations, backlog, and whether 28I can close. Stop after the report.
