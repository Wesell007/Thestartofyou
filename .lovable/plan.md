# Phase 34H.2 — IVF timeline save activation

Outcome of the audit: **the feature cannot be activated in this phase.** There is no human
privacy/legal approval anywhere in the repository, and none was supplied in the request. So this
plan covers all activation-readiness work and then stops, leaving the feature OFF.

## Audit findings (verified, not assumed)

**Feature flag mechanism — build-time.**
`src/lib/ivfTimelineFlags.ts` reads `import.meta.env.VITE_IVF_TIMELINE_SAVE_ENABLED`, defaulting to
FALSE. `vite.config.ts` only `define`s the three public backend values; the IVF flag is not in that
map, so it resolves through Vite's standard `.env` loading, which is compiled into the bundle at
build time. The variable appears in no `.env.example`, no CI workflow, and no build script.
Consequence: setting an environment variable on an already-deployed bundle changes nothing.
Activation requires a repository configuration change, a rebuild and a deployment.

**Retention and deletion behaviour.**
- Remove saved timeline clears only `ivf_transfer_date` and `ivf_transfer_type`; the TTC journey row
  and all other answers stay (Phase 34G helper, `update` only, never delete).
- TTC journey deletion runs `delete_active_journey('ttc')`, which deletes the `ttc_journeys` row, so
  both IVF values go with it.
- Account deletion calls the delete-account function, which sweeps storage then deletes the auth
  user. `ttc_journeys.user_id` is `REFERENCES auth.users(id) ON DELETE CASCADE`, so the journey row
  and both IVF values are removed by cascade.
- No automated expiry or retention job exists for these columns.
- Platform-level database backups are outside repository truth and must be answered by the reviewer
  before any backup-related retention wording is published.

**Privacy notice.**
`/privacy` (`src/pages/Privacy.tsx`) covers saved journey information, AI, analytics, user choices
and general retention. It does not mention fertility-treatment dates or embryo transfer type, and
contains no lawful-basis or special-category statement. Under the project's own AI privacy notes,
IVF context is treated as special category health data. Assessment: **privacy notice change required
= YES (reviewer to confirm)**, wording not drafted for publication in this phase.

**Approval records.** No privacy or legal approval record for this feature exists in `docs/`.

## What this phase will do

1. **No code activation.** Flag default stays FALSE. No `.env` change, no rebuild, no deploy, no
   schema change, no migration, no RLS change, no analytics, no AI or Companion access.
2. **Feature-ON verification via mocked tests and local flag only**, re-running the Phase 34H.1
   matrix plus the release checklist: signed-out, active TTC save/saved/update/remove, no-TTC,
   pregnancy and first-year historical, out-of-window historical, async load race.
3. **Privacy and security boundary re-check** with the feature on locally: no treatment values in
   URL, query, hash, localStorage, sessionStorage, cookies, auth metadata, analytics or logs.
4. **Accessibility release check**: keyboard operation, dialog focus trap and return, accessible
   names, polite status announcements, write/loading states, error association, mobile targets, no
   colour-only state.
5. **Responsive QA at 1280 / 834 / 390** on `/ivf-timeline` plus regression on `/ivf`,
   `/ivf/before-transfer`, `/ivf/after-transfer`, `/ivf/early-pregnancy`.
6. **Copy for review.** Record the Section 7 copy verbatim as the proposed final wording, adding the
   optional line "You can remove these saved details from your timeline later." for the reviewer to
   accept or reject. Nothing is published as approved.
7. **Documentation** — three new files plus the roadmap:
   - `docs/content/phase34h2-ivf-timeline-activation.md` — activation mechanism, exact release steps,
     rollback plan, activation state.
   - `docs/content/phase34h2-ivf-timeline-privacy-legal-gate.md` — the review pack, the open
     questions (privacy-notice coverage, lawful basis, special-category requirement, explicit
     consent, retention, deletion, account and journey deletion implications, DPIA need, final
     copy), and an empty approval-evidence table with every field marked NOT PROVIDED.
   - `docs/content/phase34h2-ivf-timeline-release-evidence.md` — test, accessibility, QA, boundary
     and validation evidence.
8. **Validation run**: focused 34H.2 and 34H.1 tests, 34G tests, TTC tests, full suite, typecheck
   twice, lint against baseline, production build.
9. **Rollback plan documented** (flag to FALSE, rebuild, redeploy; never drop the 34G columns, never
   delete user data, never remove the paired-state constraint).

## Technical notes

New focused tests go in `src/test/phase34h2IvfActivationReadiness.test.ts(x)`, asserting the flag
default is FALSE, that the compiled flag is the only activation switch, and re-asserting the
feature-off contract (controller not mounted, persistence helpers called zero times). No production
or shared-database writes, and no synthetic IVF values written to the shared database.

## Closure this phase will report

```text
PHASE 34H.2 — IVF TIMELINE SAVE ACTIVATION
ACTIVATION READY / BLOCKED ON HUMAN PRIVACY-LEGAL APPROVAL / FEATURE OFF
```

with the Section 23 pre-activation report, including `READY TO ACTIVATE = NO` and privacy/legal
reviewer `NOT PROVIDED`.

## What is needed from you to unblock activation

A named human privacy/legal reviewer, the review date, and explicit YES/NO decisions on: privacy
notice change and its wording, save copy, retention wording, deletion wording, lawful basis,
whether explicit consent is required, and whether further privacy-impact documentation is needed.
If explicit consent is required, that is new implementation work in a later phase.
