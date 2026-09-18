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

## Phase 34H.3 — IVF save release gate resolution — PRIVACY REVIEW PACK READY / BLOCKED ON HUMAN PRIVACY-LEGAL APPROVAL + PRODUCTION FLAG INJECTION VERIFICATION / FEATURE OFF
- [x] Track A: `docs/content/phase34h3-ivf-save-privacy-legal-review-pack.md` created for a real human reviewer, sections 1–12 complete
- [x] Verified facts recorded: two stored values, explicit-action-only writes, TTC-only eligibility, storage owner, user control, deletion/cascade behaviour, no expiry, no retention job, backup retention NOT ESTABLISHED
- [x] Exposure boundaries recorded as NO for URL, query, hash, localStorage, sessionStorage, cookies, auth metadata, analytics, logs, Companion, AI and grounding
- [x] Proposed visitor copy included and marked PROPOSED / NOT YET HUMAN-APPROVED; reviewer decision table A–J left blank
- [x] Track B: `docs/content/phase34h3-ivf-save-production-flag-verification.md` created; audit only, no secret values recorded
- [x] Verified: build-time flag resolution, `vite build` build command, CI does not set or deploy the flag, no `.env.production`, flag absent from the Vite define map, runtime secrets are server-side only, project published through Lovable hosting
- [ ] BLOCKER A — human privacy/legal approval: reviewer NOT PROVIDED; all decisions outstanding
- [ ] BLOCKER B — production environment-variable configuration location NOT VERIFIED; only a repository-side build-time mechanism is verified and has never been exercised
- [x] Future controlled release and rollback sequences documented only; turning the feature OFF never deletes saved user IVF data
- [ ] Flag changed = NO; application deployed = NO; feature activated = NO; schema changes = 0; migrations = 0; AI/Companion access = NO; READY TO ACTIVATE = NO

## Phase 35A — TTC hub and topic UX, discovery and AI separation — CLOSED PASS / TTC PUBLIC EXPERIENCE REFINED / NO NEW CONTENT
- [x] Canonical TTC hub refined in the locked nine-section order; unsupported statistics and static current-stage claim removed
- [x] Repository-backed three-stage journey used; primary pathways 3; supporting destinations 7; duplicate library destinations 0
- [x] Six shared topic-template consumers audited; narrow presentation enabled for 3 in-scope consumers; out-of-scope presentation changes 0
- [x] Existing destinations remain authoritative; presentation-only kinds added; duplicate route source of truth NO; incorrect labels 0
- [x] Preconception `/ask` Start Here removed; in-scope library cap removed; AMH rendered; hidden configured destinations 0
- [x] Six editorial questions retained with 0 direct AI actions; one Companion follows editorial discovery on each scoped surface
- [x] `TTCFinalCTA` consumer audited and unchanged; five distinct journey user states tested, four unique destinations, incorrect routes 0, writes 0
- [x] Responsive QA at 1280/834/390 on four canonical surfaces: no overflow, no console errors, keyboard accordion PASS
- [x] Focused tests 4 files / 33 tests; full suite 130 files / 1,497 tests; typecheck x2; production validation build PASS
- [x] Lint matches baseline: 1 pre-existing generated-file error and 10 warnings
- [x] New articles 0; routes 0; sitemap entries 0; database and journey-schema changes 0; analytics/AI/grounding/memory/reviewer changes 0; deployment NO

## Phase 35A.1 — TTC Explore topic card imagery — CLOSED PASS / VISUAL REFINEMENT COMPLETE
- [x] Added seven unique, relevant approved images to the seven existing supporting cards on the canonical TTC hub
- [x] Preserved existing card data, hrefs, grouping, order, copy and `Explore topic` action language
- [x] Kept deeper TTC topic-page compact libraries and the shared topic template unchanged
- [x] Focused coverage passed: 4 files / 35 tests; full suite passed: 130 files / 1,499 tests
- [x] Typecheck passed twice; production validation build passed with 356 sitemap entries
- [x] Responsive QA passed at 1280, 834 and 390 pixels: 3 / 2 / 1 columns, seven images loaded, zero horizontal overflow, zero console errors, visible keyboard focus
- [x] New content 0; new routes 0; new destinations 0; new images generated 0; database 0; grounding 0; analytics 0; deployment NO

## Phase 35B — TTC content coverage and journey audit — AUDIT COMPLETE / OUTCOME B — MOSTLY SUFFICIENT / SMALL GAPS / NO CURRENT TTC BLOCKERS
- [x] Audit only: content 0, routes 0, UX 0, AI runtime 0, grounding 0, analytics 0, reviewer claims 0, database 0, source behaviour changes 0, deployment NO
- [x] Surfaces inventoried: 1 hub, 3 pillars, 7 subtopics, 3 legacy stage routes, 1 TTC tool plus 1 treatment-context tool, 3 redirects, 5 adjacent IVF routes
- [x] Records inventoried: 56 TTC-journey articles (49 TTC-specific, 7 crossover), 8 adjacent IVF records; live 55, draft 0, unknown 0, shadow 1
- [x] Link integrity: 87 distinct internal links across 47 TTC surface files, broken links 0, wrong-destination links 0, broken routes 0
- [x] Discoverability separated into in-site navigation, internal findability and sitemap indexability: orphaned articles 0, weak-discovery articles 2 (each with a documented reason), orphaned non-article surfaces 3
- [x] Journey moments audited 83: covered 75, partially covered 1, uncovered 0, not required standalone 2, better served elsewhere 5 (corrected in Phase 35C from an incorrect 62 / 53 summary; the matrix rows and the strategic conclusion are unchanged)
- [x] Classifications: KEEP 51, EXPAND_EXISTING 0, MERGE 0, REPOSITION 0, INTERNAL_LINK_ONLY 4, ARCHIVE_CANDIDATE 1; new article candidates 0; tool/checklist opportunities 2 (P3)
- [x] Male fertility coverage SUFFICIENT; age and fertility coverage SUFFICIENT; TTC to IVF handoff COMPLETE; TTC to Pregnancy content handoff PARTIAL
- [x] Unsupported numerical or medical claims 8 across 7 label-only-source articles; legacy ~85% statistics confined to unmounted code; material needs covered only by AI 0
- [x] Imagery: 48 of 56 articles carry an explicit hero, 8 resolve to a fallback; Phase 35A.1 hub card imagery unchanged
- [x] Full suite 130 files / 1,499 tests PASS; typecheck x2 PASS; lint matches baseline at 11 problems (1 pre-existing error, 10 warnings)
- [x] Current TTC release blockers 0; smallest justified follow-up recorded (G1 legacy stage-route disposition, G2 positive-test handoff link, G6 structured-source normalisation) and not started

## Phase 35C — TTC final cleanup and workstream closure — CLOSED PASS / TTC COMPLETE FOR CURRENT STRATEGY / NO CURRENT TTC BLOCKERS
- [x] Phase 35B journey count reconciled by re-counting the matrix rows: 83 moments (covered 75, partially covered 1, uncovered 0, not required standalone 2, better served elsewhere 5); sum equals total; no moment invented; 35B conclusion unchanged
- [x] Three legacy TTC stage routes retired as client-side canonical route redirects: understanding-your-cycle to ovulation, timing-and-tracking to cycle-tracking, waiting-and-testing to two-week-wait; removed from the sitemap and from the stage SEO and breadcrumb allowlists; redirect loops 0; orphaned legacy stage routes 0; indexable duplicates 0
- [x] TTC to Pregnancy positive-result editorial handoff added once, on the pregnancy testing topic page, pointing at the existing /pregnancy hub; new article 0, new route 0, lifecycle logic changes 0; handoff COMPLETE
- [x] Source normalisation with exact repository provenance only: label-only articles before 20, normalised 17, still label-only 3, total 20; 23 individual source records converted; no URL, publisher, year or reviewer invented
- [x] Flagged unsupported claims 8: supported with verified source 0, safely removed 1, safely reworded 7, unresolved 0
- [x] Discoverability recheck: orphaned articles 0, broken routes 0, broken internal links 0, wrong-destination links 0, weak-discovery records unchanged at 2 with documented reasons and no artificial links added
- [x] Boundaries: grounding changes 0, approvals 0, candidates 0, eligible-slug changes 0, routing-version changes 0, reviewer claims 0, source rendering behaviour unchanged, AI runtime 0, analytics 0, database 0
- [x] Full suite 131 files / 1,511 tests PASS; typecheck x2 PASS; lint 11 problems matching baseline; production build PASS with 353 sitemap entries; browser sanity QA at 1280, 834 and 390 with zero overflow; deployment NO
- [x] P3 tool and checklist opportunities recorded as future optional enhancements; TTC WORKSTREAM CLOSED FOR CURRENT STRATEGY; next workstream PREGNANCY

## Phase 36A — Pregnancy hub and topic UX, discovery and AI separation — IMPLEMENTATION COMPLETE / CLOSURE BLOCKED BY PRE-EXISTING TTC LINK-INTEGRITY FAILURE / PREVIEW ONLY
- [x] Refined the Pregnancy hub in the locked nine-section order with no new content or routes
- [x] Refined all six canonical Pregnancy topic pages and added one contextual Companion handoff to each
- [x] Preserved three trimester and 42 week destinations, calculator behaviour and the `/ivf` crossover
- [x] Added focused regression coverage, three evidence documents and responsive QA at 1280/834/390: 21 checks, 0 overflow, 0 console errors
- [x] Focused validation: 6 files / 46 tests PASS; five journey states PASS; typecheck x2 PASS; lint unchanged at 1 pre-existing error and 10 warnings; production build PASS with 353 sitemap entries
- [ ] Full-suite gate: 131 files / 1,521 tests PASS, but 1 unrelated legacy TTC link-integrity assertion FAILS on four `src/data/stageData.ts` references to the three Phase 35C redirects
- [ ] Smallest follow-up, not started: separately approve reconciliation of those dormant TTC stage-data references; TTC is outside Phase 36A scope
- [ ] Final closure patch approved: canonicalise only the four stale `stageData.ts` href values, rerun every closure gate, and close Phase 36A only on full PASS
- [x] New content 0; routes 0; sitemap additions 0; calculator/week model/lifecycle/database/analytics/AI/grounding/memory/reviewer changes 0; deployment NO
