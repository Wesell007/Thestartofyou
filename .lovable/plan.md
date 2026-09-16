# Phase 34H.2 — readiness evidence reconciliation

Feature stays OFF. No activation, no deployment, no schema change, no shared-flag change, no consent UX.
This phase reconciles evidence and, where a genuinely isolated browser path exists, runs feature-ON
browser QA there.

## 1. Isolated browser environment — audit result

An isolated path **does** exist and will be used:

- `vite build` plus `vite preview` can run with `VITE_IVF_TIMELINE_SAVE_ENABLED=true` supplied only to
  that one command, producing a throwaway bundle on a private port (e.g. 4180).
- The shared preview on port 8080 is never touched, never rebuilt, and its flag value never changes.
- Playwright is already a devDependency, so the isolated server can be driven in a browser.

Constraints enforced during that run:

- flag TRUE only inside the isolated build output, never in `.env`, never committed;
- no deployment, no shared preview change;
- no IVF write to the shared database — signed-out only, plus feature-off regression;
- the isolated build artefacts are deleted afterwards.

Signed-in states will not be declared unavailable up front. They will first be attempted in the same
isolated browser through network-level mocking only (see section 2b).

## 2. Signed-out browser QA to run

Isolated feature-ON build at 1280 / 834 / 390:

- primary `/ivf-timeline`: calculate a timeline, confirm the signed-out save area renders with the
  agreed heading, re-entry body copy and "Sign in to save"; check no overflow, no layout collision, no
  duplicated save area, no duplicated companion, working mobile controls, zero console errors;
- confirm no persistence call and no treatment value in the URL, localStorage, sessionStorage or cookies;
- regression `/ivf`, `/ivf/before-transfer`, `/ivf/after-transfer`, `/ivf/early-pregnancy`: no save UI,
  no overflow, no console errors.

## 2b. Signed-in browser QA attempt — mocked backend, fail-closed network guard

Against the same real isolated bundle, with no application source change:

- seed a synthetic session in browser storage inside the test only (session data is not treatment data);
- expected reads: intercept and return synthetic auth, lifecycle, journey and IVF-context responses using
  synthetic transfer values;
- expected save, update and clear mutations: intercept and fulfil locally with synthetic success
  responses, so the real bundle can exercise Save success, Saved, Update success and Remove success
  without any request reaching the shared backend;
- fail-closed guard: any unexpected backend request, and any request attempting to reach the shared
  backend for a TTC insert, update or delete, IVF persistence, or an account or auth mutation, is
  blocked and fails the test. Required results: shared-database IVF QA writes = 0, shared-backend TTC
  mutations = 0, unexpected backend mutations = 0.

States to render and check at all three widths on `/ivf-timeline`: active TTC with nothing saved (Save my
timeline, supporting copy, "Calculated milestones are not stored."); Save action with the mutation
fulfilled locally, saved state rendered; saved context matching (Timeline saved, no redundant Save, no
timestamp); different current calculation (Update saved timeline, replacement copy, calculation still
displayed); Update action fulfilled locally with the updated saved state rendered; Remove (confirmation
dialog fit and focus, Cancel works, mocked clear fulfilled locally, saved state removed, current
calculation retained); no TTC journey (correct state, no implicit insert); pregnancy and first year with
saved context (historical, Remove only); old historical context (historical display, removable, never
auto-cleared).

After each test the browser context is destroyed, the synthetic session discarded and the temporary
build artefacts deleted. No shared account state changes. Treatment values never enter localStorage,
sessionStorage, cookies, the URL or auth metadata.


If this cannot be done without source changes, real auth side effects, shared-database writes or
treatment values entering forbidden storage, it stops immediately, the exact reason is recorded, and
signed-in browser QA is marked BLOCKED BY TEST ENVIRONMENT.

Results are labelled precisely: ISOLATED BROWSER QA WITH MOCKED BACKEND STATE, distinct from component
tests and from real production backend integration QA, which is recorded as NOT PERFORMED.


## 3. Evidence reconciliation

Re-run, from the current tree, and report exact figures rather than remembered ones:

- focused Phase 34H.2 tests;
- Phase 34H.1, Phase 34G persistence and TTC journey tests;
- full suite (file and test counts);
- typecheck twice;
- lint against the recorded baseline;
- production validation build with the feature OFF.

## 4. Readiness wording

- ENGINEERING LOGIC READINESS = PASS (subject to the reruns above).
- FULL ENGINEERING RELEASE READINESS = NO while any part of feature-ON browser QA is outstanding.
- FEATURE-ON BROWSER QA = recorded per state: signed-out and feature-off regression from the isolated
  browser run; signed-in states either PASS — ISOLATED / MOCKED BACKEND, or BLOCKED BY TEST ENVIRONMENT
  with the exact reason. REAL PRODUCTION BACKEND FEATURE-ON QA = NOT PERFORMED either way.

- All preserved audit values from the brief are carried through unchanged: build-time flag, injection
  point NOT VERIFIED, rebuild and redeploy required, reviewer and approvals NOT PROVIDED, privacy notice
  gap YES / change PENDING HUMAN REVIEW, retention and both deletion behaviours verified YES, backup
  retention NO, accessibility PASS, exposure violations 0, AI/Companion NO, schema and migrations 0,
  validation build PASS, deployed NO, activated NO, PUBLIC ACTIVATION READINESS NO, READY TO ACTIVATE NO.

## 5. Documentation updates

Edit only the existing 34H.2 documents plus the roadmap:

- `docs/content/phase34h2-ivf-timeline-release-evidence.md` — replace the current browser-QA limitation
  note with the isolated-environment method, the per-state browser results and the reconciled validation
  table.
- `docs/content/phase34h2-ivf-timeline-activation.md` — add the isolated build/preview method as the
  verified non-shared feature-ON QA route, and restate the readiness split.
- `roadmap.md` — update the 34H.2 line to the reconciled closure.

## 6. Closure

Outcome A — if signed-out browser QA passes, the signed-in states render safely through intercepted
mocked backend state at all three widths, validation passes and shared-database IVF writes stay 0:

```text
PHASE 34H.2 — IVF TIMELINE SAVE ACTIVATION
READINESS PASS /
BLOCKED ON HUMAN PRIVACY-LEGAL APPROVAL +
PRODUCTION FLAG INJECTION VERIFICATION /
FEATURE OFF
```

Outcome B — if only signed-out browser QA can run safely:

```text
PHASE 34H.2 — IVF TIMELINE SAVE ACTIVATION
READINESS PARTIAL PASS /
FEATURE-ON BROWSER QA PENDING /
BLOCKED ON HUMAN PRIVACY-LEGAL APPROVAL +
PRODUCTION FLAG INJECTION VERIFICATION /
FEATURE OFF
```

Either way: READY TO ACTIVATE = NO, feature activated = NO, application deployed = NO, shared flag
changed = NO, shared schema changed = NO, shared-database IVF QA writes = 0, privacy/legal approval = NO,
production flag injection point = NOT VERIFIED.


## Technical notes

The isolated run uses a separate output directory and port so it cannot collide with the running dev
server; the Playwright script lives under `/tmp`, not in `e2e/`, so no committed test depends on a
flag-true build. No source file, `.env`, CI workflow or Vite config gains the flag.
