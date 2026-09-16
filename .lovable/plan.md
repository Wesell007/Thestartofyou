# Phase 34H.2 — IVF timeline save activation

Outcome of the audit: **the feature cannot be activated in this phase.** No human privacy/legal
approval exists in the repository, and none was supplied. This plan covers all activation-readiness
work and then stops, leaving the feature OFF.

## Audit findings (verified, not assumed)

**FEATURE FLAG RESOLUTION TYPE = BUILD-TIME.**
`src/lib/ivfTimelineFlags.ts` reads `import.meta.env.VITE_IVF_TIMELINE_SAVE_ENABLED`, defaulting to
FALSE, so Vite resolves it when the bundle is built. An already-deployed bundle cannot be switched on
by changing a value afterwards. Activation requires a build-time value of TRUE, a new build and a
deployment.

Where the production value could be injected:
- REPOSITORY CURRENTLY DEFINES PRODUCTION IVF FLAG = NO. The variable appears in no `.env`, no
  `.env.example`, no CI workflow and no build script; `vite.config.ts` only `define`s the three
  public backend values.
- HOSTING/DEPLOYMENT ENVIRONMENT DEFINES IVF FLAG = NOT VERIFIABLE FROM AVAILABLE EVIDENCE. The
  repository holds no hosting or deployment configuration file at all.
- PRODUCTION FLAG INJECTION POINT = NOT VERIFIED.
- TECHNICAL ACTIVATION CONFIGURATION = NOT FULLY VERIFIED — recorded as an activation-readiness item
  alongside the human review gate.
- APPLICATION REBUILD REQUIRED = YES. APPLICATION REDEPLOY REQUIRED = YES.

**Retention and deletion behaviour.**
- Remove saved timeline clears only `ivf_transfer_date` and `ivf_transfer_type`; the TTC journey row
  and every other answer stay (Phase 34G helper updates, never deletes).
- TTC journey deletion runs `delete_active_journey('ttc')`, deleting the `ttc_journeys` row, so both
  IVF values go with it.
- Account deletion deletes the auth user through the verified account-deletion flow;
  `ttc_journeys.user_id` is `REFERENCES auth.users(id) ON DELETE CASCADE`, so the journey row and
  both IVF values are removed by cascade.
- AUTOMATED IVF EXPIRY = NO. AUTOMATED RETENTION JOB = NO.
- BACKUP RETENTION = NOT ESTABLISHED BY REPOSITORY TRUTH. No user-facing backup-deletion promise will
  be written without verified platform facts and human approval.

**Privacy notice.**
`/privacy` covers saved journey information, AI, analytics, choices and general retention. It does
not describe the two IVF treatment values or this persistence behaviour. Recorded as:
PRIVACY NOTICE COVERAGE GAP IDENTIFIED = YES;
PRIVACY NOTICE CHANGE REQUIRED = PENDING HUMAN PRIVACY/LEGAL REVIEW;
PRIVACY NOTICE WORDING APPROVED = NOT PROVIDED. No speculative legal wording will be published.

**Approval records.** No privacy or legal approval record for this feature exists in `docs/`.

## What this phase will do

1. **No activation.** Flag default stays FALSE. No `.env` change, no rebuild for release, no deploy,
   no schema change, no migration, no RLS change, no analytics, no AI or Companion access, no consent
   UX.
2. **Feature-ON verification through isolated local/mocked configuration only.** Re-run the full
   matrix: signed out (calculator usable, save prompt, re-entry limitation stated, persistence 0);
   active TTC (Save, Saved, Update, Remove, confirmation, no redundant or duplicate write); no TTC
   (no row creation); pregnancy and first year (historical only, Remove allowed, Save/Update absent);
   old historical context (readable, removable, never auto-cleared); async load race (current
   calculation always wins). No QA values written to the shared database.
3. **Privacy and security boundary check with the feature on locally**: treatment values in URL,
   query, hash, localStorage, sessionStorage, cookies, auth metadata, analytics and application logs
   all expected 0; Companion, AI context and grounding access NO; automatic persistence NO.
4. **Accessibility release check**: keyboard operation, dialog focus management, accessible names,
   polite status announcements, write/loading state accessibility, error association, mobile touch
   targets, no colour-only state communication.
5. **Responsive feature-ON QA (local/mocked) at 1280 / 834 / 390** on `/ivf-timeline`, with
   regression on `/ivf`, `/ivf/before-transfer`, `/ivf/after-transfer`, `/ivf/early-pregnancy`.
6. **Copy recorded as PROPOSED / NOT HUMAN-APPROVED**, exactly as submitted, including the proposed
   optional line "You can remove these saved details from your timeline later."
7. **Auth handoff stays locked**: full-page redirect via `/auth`, signed-out values do not survive
   auth, ACCEPTED RE-ENTRY UX. Not reopened, no new handoff storage.
8. **Documentation** — three new files plus the roadmap:
   - `docs/content/phase34h2-ivf-timeline-activation.md` — flag mechanism, injection-point findings,
     exact future release steps, rollback plan, activation state.
   - `docs/content/phase34h2-ivf-timeline-privacy-legal-gate.md` — the review pack, the open
     decisions, and an approval-evidence table where every human field reads NOT PROVIDED or PENDING
     REVIEW.
   - `docs/content/phase34h2-ivf-timeline-release-evidence.md` — test, boundary, accessibility and QA
     evidence.
9. **Validation**: focused 34H.2 tests, 34H.1 tests, 34G persistence tests, TTC tests, full suite,
   typecheck twice, lint against baseline, production build. No deployment.
10. **Rollback documented** for a future release: flag FALSE, rebuild, redeploy. Never drop the 34G
    columns, never remove the pairing constraint, never automatically delete stored IVF data, never
    rewrite TTC journeys. Turning the UI off does not delete anything already saved.

## Technical notes

New focused tests go in `src/test/phase34h2IvfActivationReadiness.test.ts(x)`: the flag default is
FALSE, the compiled flag is the only activation switch, and the feature-off contract holds
(controller not mounted, persistence helpers called zero times). No shared-database writes.

## Closure this phase will report

```text
PHASE 34H.2 — IVF TIMELINE SAVE ACTIVATION
ACTIVATION READY / BLOCKED ON HUMAN PRIVACY-LEGAL APPROVAL / FEATURE OFF
```

with the full pre-activation report, `READY TO ACTIVATE = NO`, and privacy/legal reviewer
NOT PROVIDED.

## What is needed from you to unblock activation

A named human privacy/legal reviewer with a review date, and explicit decisions on: privacy notice
change and wording, save copy, retention wording, deletion wording, lawful processing position,
special-category requirements, whether explicit consent is required, and whether further
privacy-impact documentation is needed. Plus a verified production flag injection point.
