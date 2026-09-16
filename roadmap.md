# Roadmap

## Phase 34C — Small IVF new-article batch — CLOSED PASS (preview only)
- [x] Four IVF guides created, registered and imaged
- [x] Hub discovery section, contextual links, sitemap 354
- [x] Tests, typecheck, lint, build, responsive QA
- [x] Documentation: batch, evidence pack, frontend report
- [x] Final closure reconciliation: docs correction + dead-code cleanup + validation

## Phase 34D — IVF final coverage refinement — CLOSED PASS (preview only)
- [x] `/articles/ivf-vs-icsi` created, imaged, sourced and registered
- [x] `/articles/fresh-vs-frozen-embryo-transfer` created, imaged, sourced and registered
- [x] `/ivf/before-transfer` expanded with embryo-development orientation context
- [x] Hub discovery 2, contextual links 8, grounding 231, sitemap 356
- [x] Tests, typecheck x2, lint at baseline, build, responsive QA
- [x] Documentation: refinement report, evidence pack, frontend report
- [x] Deferred: standalone embryo-development article; clinic-questions checklist

## Open (blocked on the user)
- [ ] Human review of the four Phase 34C guides — required before deployment
- [ ] Human review of the two Phase 34D guides and the before-transfer expansion
- [ ] Global Phase 33 deployment block remains ACTIVE; no application code deployed or published (the shared production-serving database already includes the additive Phase 34G schema migration)

## Phase 34E — IVF UX, article discovery and AI separation — CLOSED PASS (preview only)
- [x] Audited `/ivf` and all three IVF stage pages by destination behaviour
- [x] Separated article, tool, AI, stage, hub, support and journey actions
- [x] Consolidated hub orientation and surfaced 8/8 IVF guides
- [x] Recomposed stage pages with editorial guidance before one Companion area
- [x] Added focused tests, documentation and responsive QA
- [x] Validated full suite, typecheck x2, lint at baseline and production build; no deployment

## Phase 34F — IVF timeline routing fix and save-state design — CLOSED PASS (preview only)
- [x] Audited 5 timeline actions; fixed 3 incorrect destinations to `/ivf-timeline` (incorrect after = 0)
- [x] Extracted one shared `IVFTimelineForm`, reused on `/ivf` and `/ivf-timeline`
- [x] Made `/ivf-timeline` a standalone tool, usable signed in or signed out
- [x] Moved handoff to ephemeral navigation state; legacy `?date`/`?type` still read then stripped
- [x] No save control, no persistence write, no new lifecycle, no schema, AI or grounding change
- [x] Documented storage audit, future save flow, sign-in handoff and privacy gates
- [x] Focused tests (15), full suite, typecheck x2, lint at baseline, build, QA at 1280/834/390; no deployment

## Phase 34G — IVF timeline persistence foundation — CLOSED PASS / FEATURE OFF / SHARED-DATABASE MIGRATION APPLIED
- [x] Storage owner confirmed as existing `public.ttc_journeys`; no new table, no IVF lifecycle
- [x] Added 2 nullable columns (`ivf_transfer_date` date, `ivf_transfer_type` text) with no backfill
- [x] Paired-state CHECK constraint; partial IVF context impossible (null-safe form verified)
- [x] Neutral domain module `src/lib/ivfTimeline.ts`; persistence imports no React component
- [x] `loadIVFTimelineContext` / `saveIVFTimelineContext` / `clearIVFTimelineContext` with internal auth ownership
- [x] Update-only writes with matched-row verification; zero-row result returns `no_ttc_journey`
- [x] `IVF_TIMELINE_SAVE_ENABLED` defaults FALSE; no Save/Update/Clear UI; no visitor-facing change
- [x] `/ivf-timeline` accepted as a return route; no values preserved across sign-in
- [x] Focused tests (24), full suite, typecheck x2, lint at baseline, build, QA at 1280/834/390
- [ ] Shared production-serving database migration applied = YES; application code deployed/published = NO; feature remains OFF; privacy and legal approval remain required before activation

## Phase 34H.1 — IVF timeline save experience — CLOSED PASS / FEATURE OFF / ACTIVATION GATES REMAIN
- [x] Feature controller (`IVFTimelineSaveController`) mounts only while `IVF_TIMELINE_SAVE_ENABLED`; hook never runs while OFF
- [x] Visible save area (`IVFTimelineSaveArea`) is presentation only; state machine lives in `useIVFTimelineSave`
- [x] Feature OFF contract tested: 0 save UI, 0 persistence reads/writes, behaviour identical to Phase 34F
- [x] Signed out: calculator fully usable; sign-in CTA states values must be re-entered; no persistence before auth
- [x] Active TTC only: explicit Save / Update / Remove; remove behind a confirmation dialog; calculation survives removal
- [x] Current explicit calculation always wins; late saved-context load never overwrites a newer calculation
- [x] Historical or non-TTC saved context shown read-only with Remove; never auto-expired, never silently cleared
- [x] No TTC journey: explanatory copy only; no insert, upsert, placeholder or IVF lifecycle
- [x] No treatment data in URLs, browser storage, cookies, auth metadata, analytics or error output
- [x] Focused tests (21), 34F/34G/TTC suites, full suite (128 files / 1,484 tests), typecheck x2, lint at baseline, build, QA at 1280/834/390
- [ ] Deployed = NO; activated = NO; schema changes = 0; privacy and legal approval still required before Phase 34H.2

## Phase 34H.2 — IVF timeline save activation — READINESS PASS (LOGIC + EXPERIENCE; NOT FULL ENGINEERING RELEASE READINESS) / BLOCKED ON HUMAN PRIVACY-LEGAL APPROVAL + PRODUCTION FLAG INJECTION VERIFICATION / FEATURE OFF
- [x] Flag audited: FEATURE FLAG RESOLUTION TYPE = BUILD-TIME (`import.meta.env`); rebuild and redeploy both required to activate
- [x] Retention and deletion behaviour verified: remove clears only the two columns; TTC journey deletion removes the row; account deletion cascades
- [x] Privacy notice coverage gap identified; no independent legal conclusion drawn; no wording published
- [x] Review pack prepared with every human approval field left NOT PROVIDED or PENDING REVIEW
- [x] Feature-ON readiness matrix re-verified through isolated mocked configuration; boundary checks 0 violations
- [x] Focused tests (5), 34H.1 (21), 34F (15), full suite (129 files / 1,489 tests), typecheck x2, lint at baseline, validation production build with feature OFF
- [x] Feature-OFF browser QA on all five IVF routes at 1280/834/390: 0 save UI, 0 overflow, 0 console errors
- [ ] BLOCKER A — human privacy/legal approval: reviewer NOT PROVIDED; privacy notice, save copy, retention and deletion wording, lawful basis, special-category, consent and privacy-impact decisions all outstanding
- [ ] BLOCKER B — production flag injection point NOT VERIFIED; TECHNICAL ACTIVATION CONFIGURATION FULLY VERIFIED = NO
- [x] Feature-ON browser QA completed in an isolated hermetic environment at 1280/834/390: signed out and signed in, Save/Update/Remove/historical/no-journey states all PASS, 0 overflow, 0 console errors
- [x] Network isolation during feature-ON QA: shared-backend TTC reads 0, IVF reads 0, TTC mutations 0, shared-database IVF QA writes 0, shared auth mutations 0, unexpected shared-backend requests 0
- [ ] Real production backend feature-ON QA = NOT PERFORMED (not required for readiness)
- [ ] Application deployed = NO; feature activated = NO; shared environment flag changed = NO; schema changes = 0; migrations = 0
