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

## Phase 36A — Pregnancy hub and topic UX, discovery and AI separation — CLOSED PASS / PREGNANCY PUBLIC EXPERIENCE REFINED / NO NEW CONTENT
- [x] Refined the Pregnancy hub in the locked nine-section order with no new content or routes
- [x] Refined all six canonical Pregnancy topic pages and added one contextual Companion handoff to each
- [x] Preserved three trimester and 42 week destinations, calculator behaviour and the `/ivf` crossover
- [x] Added focused regression coverage, three evidence documents and responsive QA at 1280/834/390: 21 checks, 0 overflow, 0 console errors
- [x] Focused validation: 6 files / 46 tests PASS; five journey states PASS; final closure regressions 3 files / 27 tests PASS; typecheck x2 PASS; lint unchanged at 1 pre-existing error and 10 warnings; production build PASS with 353 sitemap entries
- [x] Pre-existing stale TTC internal references discovered during Phase 36A validation and canonicalised to the already-approved Phase 35C destinations: before 4, after 0, canonical replacements 4
- [x] Full-suite gate: 132 files / 1,522 tests PASS; broken TTC routes 0; broken Pregnancy routes 0; broken internal links 0; wrong-destination links 0
- [x] All three Phase 35C redirects preserved unchanged and in their existing order; TTC WORKSTREAM CLOSED FOR CURRENT STRATEGY
- [x] New content 0; routes 0; sitemap additions 0; calculator/week model/lifecycle/database/analytics/AI/grounding/memory/reviewer changes 0; deployment NO

## Phase 36A.1 — Pregnancy visual QA and premium polish — CLOSED PASS / PREGNANCY UX VISUALLY APPROVED
- [x] Applied the single evidence-backed mobile breadcrumb spacing and contrast correction across the six shared Pregnancy topic pages; breadcrumb text, links, semantics, structured data, tablet and desktop breakpoint rules unchanged
- [x] Rechecked all seven Pregnancy surfaces at 1280, 834 and 390 pixels: 21 combinations PASS; overflow 0; console errors 0; broken images 0; broken Pregnancy destinations 0; excessive unexplained vertical gaps 0
- [x] Reconfirmed six pathways with six distinct approved images, three trimester destinations, 42 week destinations, six FAQ rows, zero FAQ AI actions, one hub Companion and six topic handoffs
- [x] Focused regressions 11 files / 114 tests PASS; full suite 132 files / 1,523 tests PASS; typecheck x2 PASS; lint unchanged at 1 pre-existing error and 10 warnings; production build PASS with 353 sitemap entries
- [x] New content, guidance, routes, images, calculator, week model, lifecycle, database, schema, analytics, AI runtime, prompts, context builder, grounding, memory, reviewer, TTC and deployment changes: 0

## Phase 36B — Pregnancy content coverage and journey audit — AUDIT COMPLETE / MOSTLY SUFFICIENT / SMALL GAPS
- [x] Audit only: content, route, week-data, image, source-record, reviewer, grounding, AI, analytics, database and lifecycle changes 0; deployment NO
- [x] Surfaces inventoried from route registration: hub 1, topic routes 6, trimester routes 3, week modules 42/42, tool routes 2, public support surface 1, crossover surfaces 2, legacy or duplicate indexable Pregnancy surfaces 0, broken routes 0
- [x] Article inventory: 104 Pregnancy-specific and crossover records (live 85, unknown status 19, draft 0, duplicates 0); actions KEEP 96, EXPAND_EXISTING 5, MERGE 2, REPOSITION 0, INTERNAL_LINK_ONLY 1, ARCHIVE_CANDIDATE 0
- [x] Week audit: 42 modules audited, material content gaps 0, broken links 0, missing illustrations 0; week numerical statements classified UNRESOLVED_PROVENANCE because week sources are hub-level
- [x] Journey matrix reconciled by row count: 64 moments — covered 45, partially covered 9, uncovered 0, not required standalone 2, better served elsewhere 8; new article candidates 0
- [x] Discovery: orphaned articles 2, weak-discovery 1 with a written reason, orphaned non-article surfaces 0, rendered broken links 0, wrong-destination links 0, stale related references silently dropped 4
- [x] Claims and sources: unsupported medical or numerical claims 14 (all in articles), medication-safety wording concerns 0, material needs covered only by AI 0, source records 351 (structured 225, label-only 126, 5 articles with none)
- [x] Handoffs: TTC to Pregnancy unchanged; IVF to Pregnancy COMPLETE; Pregnancy to IVF COMPLETE; Pregnancy to Loss support PARTIAL; Pregnancy to First Year content PARTIAL; Pregnancy to First Year lifecycle routing COMPLETE
- [x] Reviewer claims added 0; grounding changes 0 with no registry drift found; source behaviour changes 0; current Pregnancy release blockers 0
- [x] Three audit documents created; one smallest justified follow-up recorded (Phase 36C Pregnancy closure cleanup) and not started

## Phase 36C — Pregnancy final cleanup and workstream closure — CLOSED PASS / PREGNANCY COMPLETE FOR CURRENT STRATEGY / NO CURRENT PREGNANCY BLOCKERS
- [x] Stale related references 4 to 0: three first-trimester-symptoms occurrences canonicalised to early-pregnancy-symptoms-explained, the paracetamol headaches-in-pregnancy reference repointed to medicines-in-pregnancy; rendered broken links 0, wrong-destination links 0
- [x] Orphans 2 to 0: symptoms-stopping-early-pregnancy linked once from early-pregnancy-symptoms-explained, low-lying-placenta-in-pregnancy linked once from anterior-placenta; new routes 0, artificial links 0
- [x] Pregnancy to Loss support handoff COMPLETE with one editorial link from bleeding-in-early-pregnancy to the existing pregnancy-after-loss article; new loss content 0, loss lifecycle 0
- [x] Pregnancy to First Year content handoff COMPLETE with one late-pregnancy transition group on the preparing-for-baby topic page into existing after-birth and first-year guidance; lifecycle routing COMPLETE and unchanged
- [x] Birth-plan overlap resolved: birth-preferences is the single canonical owner, writing-a-birth-plan retired by the established client-side redirect and sitemap de-indexing; internal references to the retired route 0, broken links 0, redirect loops 0, third birth-plan article 0
- [x] Expansions: hyperemesis, labour pain relief, pre-eclampsia and antenatal classes implemented in their verified existing owners; valid expansion mappings 4 of 4, addressed 4 of 4, remaining owner mismatches 0; new articles 0
- [x] Final evidence reconciliation (documentation and classification only): the travel and flying mapping to eating-well-in-pregnancy was invalid and withdrawn; that article restored to KEEP; moment 46 recorded as UNCOVERED, priority P3, treatment FUTURE EDITORIAL DECISION with no current valid owner, non-blocking; corrected Phase 36B counts KEEP 97, EXPAND_EXISTING 4, MERGE 2, REPOSITION 0, INTERNAL_LINK_ONLY 1, ARCHIVE_CANDIDATE 0 (104) and journey 45 covered, 8 partially covered, 1 uncovered, 2 not required standalone, 8 better served elsewhere (64); article dataset changes 0, deployment NO
- [x] Claims 14 resolved: supported 0, safely removed 2, safely reworded 12, unresolved 0; sources added 0, source records edited 0, reviewer claims 0, grounding changes 0
- [x] Governance debt carried forward unchanged: 126 label-only source records, 5 articles with no source records, 311 week statements at UNRESOLVED_PROVENANCE, 19 unknown-status records, one accepted weak-discovery record; week modules modified 0, week-model changes 0
- [x] Validation: new Phase 36C regression suite 8 tests PASS; full suite 133 files / 1,531 tests PASS first run; typecheck x2 PASS; lint unchanged at 1 pre-existing error and 10 warnings; production build PASS with 352 sitemap entries; browser QA of 10 changed public surfaces PASS; deployment NO
- [x] PREGNANCY WORKSTREAM — CLOSED FOR CURRENT STRATEGY; next major lifecycle workstream FIRST YEAR

## Phase 37A — First Year hub, phase and topic UX, visual system and AI separation — CLOSED PASS / FIRST YEAR PUBLIC EXPERIENCE REFINED / VISUAL SYSTEM ALIGNED / NO NEW CONTENT
- [x] Nano Banana direction board created and approved before production replacement; not rendered in production; infant-care, safer-sleep, feeding-positioning, anatomy, postpartum-sensitivity and crop-space gates PASS
- [x] Audited 99 of 99 original placements plus the hub video: KEEP 92, RECROP 0, existing replacement 0, Nano Banana replacement 4, body removal 0, removed with discovery card 3; new image-backed presentation placements 0
- [x] Replaced four duplicated Baby topic heroes with distinct safe Feeding, Sleep, Development and Care imagery; accidental phase-to-topic hero duplication after 0; article imagery and copy unchanged
- [x] Rebuilt the hub in the locked ten-section order with one final read-only lifecycle-aware action; five states, four destinations, incorrect routes 0, writes 0
- [x] Topic Start Here reconciled 24 = 21 mapped + 3 removed; phase guidance reconciled 12 = 11 converted + 1 removed; duplicate destinations within a section 0; empty sections, placeholders, AI-filled slots and artificial symmetry destinations 0
- [x] Hub question AI actions 6 to 0 and phase question AI actions 20 to 0; six hub questions, 20 phase questions and 15 valid phase reads preserved; Companion remains after editorial discovery
- [x] Preserved 4 phase, 13 month and 8 topic destinations; month data, route behaviour and page presentation unchanged; First Year to Toddler transition preserved
- [x] Browser QA 13 surfaces × 3 widths = 39 checks PASS with overflow 0, console errors 0 and broken images 0; focused checks 5 files / 50 tests PASS; full suite 134 files / 1,543 tests PASS; typecheck x2 PASS; lint at established baseline; production validation build PASS
- [x] New articles, routes, lifecycle, database, schema, AI runtime, grounding, memory, history, reviewer, TTC and Pregnancy changes 0; deployment NO; visual review and content-coverage audit not started

## Phase 37A.1 — First Year image quality correction — CLOSED PASS / IRRELEVANT AND LOW QUALITY IMAGERY REMOVED / FIRST YEAR VISUAL SYSTEM APPROVED
- [x] Canonical still placements reconciled at 96 exactly: KEEP 50, RECROP 0, REPLACE WITH EXISTING APPROVED ASSET 0, REPLACE WITH NEW JUSTIFIED ASSET 0, REMOVE 46; new generated images 0
- [x] Pathway presentation still placements 0 and hub video audited separately; 26 of 26 article heroes, 37 of 37 body placements and 21 of 21 featured discovery placements audited
- [x] Explicit First Year image suppression implemented without fallback photography, placeholders, blank image ratios or leakage outside First Year; Bottle and breastfeeding questions is intentionally image-free
- [x] Shared asset safety check complete: one newly unreferenced weak asset deleted, shared assets retained, broken asset references 0, non First Year asset-reference changes 0
- [x] Browser QA 13 hub, phase and topic surfaces plus 26 articles at 1280, 834 and 390 = 117 checks PASS; overflow 0, broken images 0, heading failures 0, console errors 0
- [x] Article copy, sources, reviewer, grounding, AI runtime, lifecycle, TTC, Pregnancy, routes, database and deployment changes 0; First Year content coverage audit not started

## Phase 37B — First Year pathway pages, phase visual storytelling and premium hub enhancement — CLOSED PASS / BABY AND POSTPARTUM PATHWAYS ESTABLISHED / FIRST YEAR PHASE EXPERIENCE VISUALLY UPGRADED / NO NEW ARTICLE CONTENT
- [x] Added exactly two editorial discovery routes, `/first-year/baby` and `/first-year/postpartum`, before generic matching; dead pathway actions 0; canonicals, breadcrumbs and BreadcrumbList data 2 of 2; sitemap 352 to 354 unique entries
- [x] Pathway ownership reconciled exactly: Baby 4 Start Here + 11 grouped = 15; Postpartum 4 Start Here + 7 grouped = 11; missing and duplicate owned articles 0; new records and duplicated body copy 0
- [x] Upgraded both equal-weight hub pathway cards, the four image-led phase cards and `Everything, side by side`; Nano Banana direction board retained as non-production direction only
- [x] Added one justified image break per phase, 4 of 4; new production images 0; inherited intentional image-free count 15; 37A.1 overrides and fallback restoration 0
- [x] Added exactly one embedded contextual Companion after editorial discovery on each pathway, 2 of 2; duplicate modules 0; hub remains 1 and phase handoffs remain 4 of 4; AI runtime, prompts, context-builder and grounding changes 0
- [x] Browser QA 29 checks PASS across hub, pathways, phases and topics; overflow, broken images, h1 failures and console errors 0; full suite 136 files / 1,559 tests PASS; typecheck and production build PASS; lint at established baseline
- [x] New article content, medical guidance, lifecycle, database, TTC, Pregnancy and deployment changes 0; deployment NO; First Year content-coverage audit not started

## Phase 37B.1 — First Year article hero and card image completion — CLOSED PASS / ALL FIRST YEAR ARTICLES VISUALLY COMPLETE / ARTICLE DISCOVERY IMAGERY CONSISTENT / NO CONTENT CHANGES
- [x] Existing heroes reviewed 11 of 11: preserved 11 + defect replaced 0 = 11
- [x] Suppressed articles remediated 15 of 15: approved existing assignments 0 + accepted article specific Nano Banana assets 15 = 15
- [x] Final heroes 26 of 26 explicit and distinct; fallback 0, duplication 0, current suppressions 0, unsafe or implausible accepted imagery 0, unresolved quality gaps 0
- [x] Pathway, all 8 topic, all 4 phase useful read, related guidance and article surfaces use destination article identity; conflicting independent topic imagery 0; redesign 0
- [x] Focused regressions 4 files / 45 tests PASS; full suite 137 files / 1,576 tests PASS; typecheck x2 PASS; production build PASS; sitemap 354 unique; lint unchanged at its established baseline
- [x] Responsive QA covered 40 routes at 1280, 834 and 390 = 120 checks PASS; overflow, broken images, heading failures, nested controls and console errors 0
- [x] Body images generated 0, restored 0, changed 0; content, routes, sources, reviewers, AI, grounding, lifecycles, database, TTC and Pregnancy changes 0; deployment NO; content coverage audit not started

## Phase 37C — First Year content coverage and journey audit — AUDIT COMPLETE / OUTCOME C — FIRST YEAR CONTENT HAS MATERIAL GAPS / NO CONTENT CREATED / NO UX CHANGES / NO DEPLOYMENT
- [x] Surface inventory measured: 29 canonical route definitions serving 54 concrete public URLs — 1 hub, 2 pathways, 8 topics, 4 phases, 13 month destinations (all distinct public URLs), 26 article URLs; route patterns never counted as visitor-facing surfaces
- [x] Legacy ledger kept separate: 5 legacy `/postpartum*` routes, indexable legacy surfaces 0, legacy routes in sitemap 0, inbound internal links to legacy routes 0, redirect loops 0, broken legacy destinations 0, canonical duplicate surfaces 0
- [x] Article inventory reconciled at 26 (Baby 15, Postpartum 11, ready 26, draft 0, unknown 0): KEEP 16 + EXPAND_EXISTING 6 + MERGE 0 + REPOSITION 0 + INTERNAL_LINK_ONLY 4 + ARCHIVE_CANDIDATE 0 = 26 (corrected from the superseded KEEP 17 / EXPAND_EXISTING 5 split after confirming `when-to-ask-for-help-after-birth` is one of the 26 records in `src/data/firstYearArticleData.ts`); none implemented
- [x] Journey matrices reconciled at 84 moments (Baby 40, Postpartum 36, Shared 8): COVERED 44 + PARTIALLY_COVERED 34 + UNCOVERED 1 + NOT_REQUIRED_STANDALONE 1 + BETTER_SERVED_ELSEWHERE 4 = 84; coverage-gap rows 35 plus 4 COVERED discovery-priority rows = 39 prioritised rows at P1 3, P2 13, P3 19, P4 4 (corrected from the superseded P1 2 / P2 9 / P3 14 / P4 10 summary)
- [x] Final reconciliation: OUTCOME C recorded on the evidence (3 P1, 13 P2, 2 material AI-only needs, 2 unique candidates, Toddler content PARTIAL, Family MISSING); milestone record `/articles/baby-milestones-first-year` confirmed OUTSIDE the 26 as a legacy record, so REPOSITION stays 0 and the 26-record arithmetic is unchanged; smallest remediation scope proposed, not started
- [x] Discovery audit: orphaned articles 0, weak discovery 4, orphaned non-article surfaces 0, broken rendered internal links 0, wrong-destination links 0, stale references 0; 80 related-guidance links, 108 month hrefs and 42 phase hrefs all valid
- [x] Source and claim audit: unsupported medical or numerical claims 0, NEEDS_SOURCE 0, structured source records 176, label-only 0, articles without sources 0, UNRESOLVED_PROVENANCE 16 (retained reviewer data fields, 0 rendered claims); milestone safety failures 0
- [x] Duplication: technical duplicates 0, editorial overlap groups 7 (6 KEEP BOTH, 1 canonical decision required); new article candidates 2 (NC-1 P1, NC-2 P2); tool or support-surface opportunities 3; material needs covered only by AI 2
- [x] Handoffs: Pregnancy to First Year COMPLETE, First Year to Toddler content PARTIAL and routing COMPLETE, First Year to Family MISSING, Baby to Postpartum COMPLETE
- [x] Validation: focused First Year regressions 4 files / 45 tests PASS; full suite 137 files / 1,576 tests PASS; typecheck x2 PASS; lint at its established baseline; production validation build PASS; sitemap 354 unique; flaky tests 0
- [x] Grounding changes 0, reviewer claims added 0, provenance invented 0, AI source-routing changes 0, AI_SOURCE_ROUTING_VERSION unchanged, content, route, image, database, lifecycle, analytics and visual changes 0; deployment NO; remediation not started

## Phase 37D — First Year content remediation and workstream closure — CLOSED PASS / MATERIAL GAPS REMEDIATED / FIRST YEAR WORKSTREAM CLOSED / NO DEPLOYMENT
- [x] Closure-level 37C findings implemented: P1 3 of 3 resolved, P2 13 of 13 resolved, EXPAND_EXISTING 6 of 6, INTERNAL_LINK_ONLY 4 of 4, material AI-only editorial needs now editorially owned 2 of 2; each finding accounted for individually
- [x] NC-1 `breastfeeding-problems-and-where-to-get-help` (Baby, topic `feeding`, resolves P1-1, P1-3, P2-13) and NC-2 `postpartum-recovery-in-the-later-first-year` (Postpartum, topic `postpartum-recovery`, resolves P2-11, P2-12) published as ready records through the existing dynamic article route; new route definitions 0, new topic identifiers 0, invented reviewer or review-date metadata 0
- [x] Heroes: existing unchanged 26 of 26, new article-specific heroes 2 of 2, final explicit heroes 28 of 28, suppressions 0, generic fallback 0, cross-article duplication 0; body-image inventory unchanged
- [x] Discovery: weak-discovery articles 4 to 0 via contextual phase and month links; orphaned First Year articles 0; article bodies rewritten 0; link stuffing 0; card and image identity unchanged
- [x] Handoffs: First Year to Toddler content PARTIAL to COMPLETE (9–12 month editorial, question and destination link; lifecycle-routing changes 0); Baby to Postpartum COMPLETE; First Year to Family MISSING to PARTIAL via one contextual link, remaining depth explicitly P3 and non-blocking
- [x] Legacy milestone canonical decision RESOLVED: `/articles/baby-milestones-first-year` retained and repositioned on milestone worry and comparison, `baby-development-in-the-first-year` authoritative, inventory canonicalRole supporting with canonical target; merges 0, redirects 0, archives 0
- [x] Inventory staleness corrected (`when-to-ask-for-help-after-birth` live/final/keep, development article primary, legacy milestone supporting, both new records live/final/keep); new stale state introduced 0; no further First Year staleness found
- [x] Grounding registry maintenance only: new slugs 2, drift-guard records required 2, default-deny records added 2, candidates 0, approvals 0, eligibility additions 0, AI source-routing changes 0, AI_SOURCE_ROUTING_VERSION unchanged, runtime grounding behaviour unchanged
- [x] Measured final state: First Year articles 28 (Baby 16, Postpartum 12), First Year public article URLs 28, concrete canonical First Year public URLs 56, sitemap 356 unique; all measured counts match the expected post-remediation arithmetic
- [x] Validation: focused Phase 37D suite 13 of 13 PASS; full suite 137 files / 1,576 tests PASS; typecheck x2 PASS; lint 11 problems at its established baseline; production build PASS; flaky tests 0; responsive QA at 1280, 834 and 390 with overflow, heading failures and console errors 0
- [x] Phase 37C documents and numbers unchanged; redesign, route architecture, lifecycle, journey-routing, database, RLS, auth, analytics, AI runtime, prompt, context-builder, reviewer-governance, TTC and Pregnancy changes 0; deployment NO; no further phase started

## Phase 38A — Toddler hub, age guide and topic experience premium rebuild — CLOSED PASS / NO DEPLOYMENT
- [x] Baseline measured: 1 hub, 5 age routes, 8 topic routes, 16 ready articles, 30 Toddler sitemap URLs including the hub
- [x] Visual direction selected: Premium editorial journey; existing Toddler imagery remains the default
- [x] Hub hierarchy rebuilt exactly as approved; duplicate topic navigation consolidated into one canonical system
- [x] All 5 age guides and all 8 topic pages upgraded through shared templates; routes, metadata and content preserved
- [x] Discovery verified: 16 ready articles, exactly 2 per topic, hidden ready articles 0; one late Companion per hub, age and topic surface
- [x] Validation: focused 6 of 6, full suite 139 files and 1,595 tests, typecheck twice and build PASS; lint unchanged at baseline; 1280, 834 and 390 overflow 0
- [x] Responsive evidence records inherited local asset-pointer delivery failure; image replacements 0 and image campaign 0
- [x] Locked changes 0; deployment NO; Toddler content coverage audit NOT STARTED
- [x] Known inventory drift recorded: 16 stale rows, 0 ready articles hidden, inventory rows changed in Phase 38A = 0

## Phase 38A.1 — Toddler hub section-order correction — CLOSED PASS / EDITORIAL START HERE MOVED AHEAD OF TOPIC EXPLORATION / NO OTHER TODDLER CHANGES
- [x] "A few quiet places to start" moved above Toddler topics in the hub; measured order at 1280, 834 and 390 is Hero, Age pathways, Start Here, Toddler topics, Common questions, one late Companion, Where to next
- [x] Sections redesigned 0; copy, articles, topic order, imagery, routes, sitemap, Companion behaviour, AI, grounding, age pages and topic pages changed 0; inventory rows changed 0
- [x] Validation: focused 6 of 6, full suite 139 files and 1,595 tests PASS; overflow 0, console errors 0 and 24 unchanged main links at every width; docs updated
- [x] Locked changes 0; deployment NO; Toddler content coverage audit NOT STARTED

## Phase 38B — Toddler content coverage & journey audit — AUDIT COMPLETE / OUTCOME B / NO DEPLOYMENT
- [x] Measured: 1 hub, 5 ages, 8 topics, 16 ready articles, 30 sitemap URLs, 60 structured sources
- [x] Articles: KEEP 13, EXPAND_EXISTING 3; journey 55 moments; P1 0, P2 3, P3 8, P4 4; new candidates 0
- [x] Inventory drift 16 stale rows recorded, 0 repaired; 3 dormant reviewer-provenance findings recorded
- [x] Docs and read-only audit test added; no remediation started, Phase 38C not begun
- [x] Final reconciliation: KEEP 10, EXPAND_EXISTING 6 (P2 TAN/PTP/HOM, P3 BED/SPH/PLY); 15 prioritised = 10 gaps + 4 handoff + 1 other; cot to bed P3 via BED; reviewer-metadata provenance debt 3, rendered claims 0; new articles NO, closure-level existing-content remediation YES; Phase 38C not begun

## Phase 38C — Toddler content remediation, governance cleanup and workstream closure — CLOSED PASS / NO DEPLOYMENT
- [x] P2 3/3 resolved: TAN hitting and biting, PTP withholding, HOM food choking (NHS sourced)
- [x] Inventory 16/16 corrected to live/final/keep
- [x] Reviewer-metadata debt 3/3 removed; helper no longer defaults reviewer or date
- [x] Deferred and non-blocking: BED, SPH, PLY, night dryness, outdoor safety, friendships, A6/A8, sharing, Toddler to Family
- [x] Validation: 141 files / 1,608 tests, typecheck x2, lint baseline, build, responsive 9/9
- Toddler workstream CLOSED for current strategy

## Phase 39A — Family hub and topic experience premium rebuild — CLOSED PASS / NO DEPLOYMENT
- [x] Baseline measured before product changes: 1 hub, 6 topics, 18 ready guides, 25 sitemap URLs, 7 embedded Companion sections, 7 question surfaces
- [x] Premium editorial folio direction selected; existing imagery remains the default
- [x] Rebuilt the hub in the approved eight-part hierarchy with one primary Family-area navigation system
- [x] Upgraded all six topic experiences through the shared template
- [x] Strengthened editorial discovery and corrected two confirmed hub question destinations
- [x] Completed focused 6/6, full 142 files and 1,614 tests, typecheck, build and 21-page-width browser validation; lint unchanged at baseline
- [x] Closed Phase 39A without a content sufficiency classification; Phase 39B identified as the next safe step and not started

## Phase 39A.1 — Family hub orientation section — CLOSED PASS / NO DEPLOYMENT
- [x] Added one concise editorial orientation section after the Family hero and before Start Here
- [x] Made the wider, cross stage purpose of Family explicit without adding navigation, imagery or another Companion surface
- [x] Focused 6/6 and full 142 files / 1,614 tests passed; typecheck and build passed; lint unchanged at baseline
- [x] Review at 1280, 834 and 390 passed with clean wrapping, controlled height, zero overflow and zero console errors
- [x] Closed Phase 39A.1 without changing the Phase 39A closure record; Phase 39B remains unstarted

## Phase 39B — Family Content Coverage & Journey Audit (AUDIT COMPLETE / OUTCOME B)
- [x] Measured 1 hub, 6 areas, 18 ready guides, 25 Family site map URLs, 0 broken links
- [x] Article actions KEEP 16 / INTERNAL_LINK_ONLY 2; 58 moments, P1 0 / P2 0 / P3 12 / P4 12
- [x] Governance drift recorded, not repaired: 12 stale plus 6 missing inventory rows; 2 unsupported reviewer defaults (0 rendered); grounding 18/18 default deny
- [x] No content, inventory, reviewer, grounding, route or UX changes; no deployment; Phase 39C not started

## Phase 39C — Family Governance Cleanup, Pregnancy Handoff & Workstream Closure (CLOSED PASS)
- [x] Inventory: 12/12 stale rows corrected, 6/6 missing rows created, 18/18 matching
- [x] Unsupported reviewer metadata 2/2 removed, including the Family helper default; reviewer count test set to measured 174
- [x] One Pregnancy → Family link on the Preparing for baby topic
- [x] Validation passed; no deployment; no further phase started

## Phase 40A — Product Thesis Alignment & Future Capability Audit (AUDIT COMPLETE)
- [x] Evidence safeguards applied: fresh repository checks, dated market sources, production truth split, strict claims registry
- [x] Claims accounting kept in two sets: current About claims (36) and strategic statements (16)
- [x] Capability map 50 records; six-layer, calm, moat, claims, priorities documented in docs/strategy
- [x] No product, UI, AI, flag, database or About changes; no deployment; next phase not started

## Phase 40B — About / Our Story Truth-Led Narrative Rebuild (CLOSED PASS)
- [x] /about rebuilt as 10-section editorial narrative from the Phase 40A claims registry
- [x] Feature counts and unsupported memory, grounding and journal-integration claims removed; future direction in a labelled band
- [x] Claims test checks specific false claims, not keywords; full suite, typecheck ×2, lint baseline, build PASS; no deployment

## Phase 41A — Pregnancy Multiples & Multi-Child Readiness Audit (CLOSED / OUTCOME D)
- [x] Four strategy docs and read-only test created; no product, schema or deployment changes
- [x] Outcome D: reachable cross-pregnancy and baby-replacement integrity risks before further continuity work
- [x] Final evidence reconciliation: 6 groups, 30 unique files / 249 unique tests / 249 PASS; 8 database claims verified or corrected; risks P0 4 / P1 1 / P2 3 / P3 0 + 2 safeguards
- [x] Closure evidence patch: ownership 24 objects counted (1 / 5 / 15 / other 4); measured 30 / 249 accepted as authoritative

## Phase 41B.0 — Family Entity Foundation: Architecture & Migration Design (CLOSED PASS, DESIGN ONLY)
- [x] Re-verify current-state facts (repository + catalog structure only, no customer rows)
- [x] Five design docs in docs/strategy/phase41b-*
- [x] Section 26 report and architecture decision READY FOR 41B.1
- [x] Final closure reconciliation: access rules verified per operation (0 existing to modify), baby composite ownership added, constraint ledger 26 new / 5 changed; 41B.1 NOT STARTED (awaiting approval)
- [x] Closure evidence return (2026-09-27): 18 tables, 72 coverage positions, 72 distinct policy objects (no FOR ALL, no restrictive), all BOTH; 8/8 findings DESIGN-ADDRESSED. CLOSED PASS / PREGNANCY EPISODE MODEL DESIGNED / MULTI-CHILD RELATIONSHIPS DESIGNED / DESTRUCTIVE FIRST-YEAR RESET REPLACEMENT DESIGNED / LEGACY DATA MIGRATION PATH DEFINED / RLS AND CONTEXT BOUNDARIES DEFINED / ROLLBACK AND TEST STRATEGY DEFINED / READY FOR 41B.1 IMPLEMENTATION

## Phase 41B.1A — Family Entity Foundation (AMENDED / NOT APPLIED / AWAITING 41B.1A-C1 REHEARSAL)
- [x] Pending additive migration: docs/strategy/migrations-pending/41b1a_family_entity_foundation.sql (19 of 26 target controls; 7 deferred)
- [x] Static contract tests 13/13; full suite 148 files 1661/1661; typecheck PASS; build PASS
- [x] Evidence doc: docs/strategy/phase41b1a-family-entity-foundation-implementation.md
- [x] Amended per 41B.0-R (3 October 2026): `current_pregnancy_episode_id`; one OPEN episode (`active`/`paused`, `removed_at IS NULL`); dates NOT NULL + date CHECK; `removed_at`; authenticated SELECT-only; links NOT VALID + validate file; guarded rollback file; no BEGIN/COMMIT; table-scoped guards; amendment record in the evidence doc. NOT APPLIED.
- [x] Account deletion clarification (docs only): account-level cascade INTENTIONAL; pregnancy-level delete RESTRICT; runtime compatibility PENDING APPLICATION; Account Deletion Integrity Test added as an application gate (NOT RUN)
- [ ] Apply migration — NOT AUTHORISED until the 41B.0-R §11 evidence ladder is met: isolated rehearsal passed twice from a fresh project including the rollback file; catalogue parity diff classified; rehearsed file byte-identical to the production file; `lock_timeout` set and a quiet window agreed; a platform backup observed by the owner within 24 hours with the restore procedure written down; explicit owner approval. (Point-in-time recovery is no longer a precondition; it cannot be met on this platform.)
- 41B.1B NOT STARTED

## Phase 41B.1A-R — Recovery & Migration Environment Gate (CLOSED / SUPERSEDED BY 41B.0-R §11 AND §19)
- [x] Audit recorded in `docs/strategy/phase41b1a-recovery-and-migration-environment-gate.md`. Decision E. Database changes 0, customer rows read 0, migration applied NO, 41B.1B NOT STARTED.
- [x] Isolated staging approved by the user. Draft "41B.1A staging rehearsal" created. Live catalogue snapshot recorded in `docs/strategy/phase41b1a-live-catalogue-snapshot.md`.
- [x] Draft isolation FAILED (shared live backend). Decision: use a remix. Live snapshot ALREADY EXISTS AND REUSED; customer rows read 0.
- [x] Remix path CLOSED (superseded 2 October 2026): the rehearsal environment is a new isolated hosted Supabase project in the owner's organisation, created only after the owner confirms its cost (41B.0-R §19). No remix is created.
- [ ] Parity report moves to 41B.1A-C1: diff the fresh project's catalogue against the 27 September live snapshot, classify every difference (41B.0-R §14), none may touch a 41B object. Pending migration applied = NO.
- [ ] Owner to observe the latest platform backup (date, retention) within 24 hours of any production schema step (41B.0-R §11). Not a precondition for the rehearsal.
- [ ] OPEN support question (no longer blocks 41B.1A, per 41B.0-R §11): can a backup be restored into a separate project instead of overwriting the shared database? If not, can a complete logical backup (schema and data) be produced for a restore elsewhere? Needed before any later destructive retirement, which is outside 41B.

## Phase 41B.0-R — Family Entity Architecture Reconciliation (CLOSED PASS / READY TO AMEND 41B.1A)
- [x] 41B.0 historical closure preserved. The corrective addendum supersedes only the passages listed in its §22; the five 41B.0 documents keep their original text.
- [x] Documentation and design only (2 October 2026): D1–D10 reconciled; SQL amendment ledger S1–S12; conditional S13 replaced by owner decision 6; legacy constraints changed 5 → 11 with corrected 41B.1A / 1B / 1C / 1D sequencing; write paths 17 → 74; functions 5 → 18. Database changes 0, customer rows read 0, product code changes 0.
- [x] Evidence restored to the repository (3 October 2026): `docs/strategy/phase41b0r-family-entity-architecture-reconciliation.md`, `docs/strategy/phase41b0r-write-path-inventory.md`, `docs/strategy/stabilisation-local-dev-production-safety.md`, `docs/strategy/phase41b0r-roadmap-entry-proposed.md`, each with a dated recovery addendum recording later owner decisions and repository facts.
- [x] Owner decisions 1–6 recorded: `current_pregnancy_episode_id`; episodes `SELECT`-only for authenticated clients in 41B.1A; pointer kept after Pregnancy → First Year with `babies.pregnancy_episode_id` as the durable link; no automatic 60-day rule (differing legacy dates → `needs_confirmation`); `babies.archived_at` kept and never user-facing; "Remove this journey" = closed and hidden, records retained, episode-local, no automatic widening of the shared status enum.
- [x] 41B.1A SQL AMENDED (3 October 2026: S1–S12 applied; S13 resolved as `pregnancy_episodes.removed_at`; validate and rollback files; static tests rewritten) / NOT APPLIED
- [x] 41B.1A pre-push review passed and branch pushed (commit 9dbdfa46); pre-rehearsal hardening committed separately (comment fix, structural static tests, `SUPERSEDED BY 41B.0-R` markers on the five 41B.0 documents).
- [x] 41B.1A STATIC PRE-REHEARSAL GATE = CLOSED PASS (3 October 2026). Hardening commits 68ccc6d4 and 735a07e6 independently reviewed and pushed; authoritative rehearsal source is `735a07e6` (forward e6ad0bc8…, validate 8645fd67…, rollback 0d008955…, SHA-256). No further static hardening planned.
- [x] 41B.1A-C1 rehearsal plan written, independently reviewed (PASS, no blockers) and finalised: `docs/strategy/phase41b1a-c1-rehearsal-plan.md` (refusal reachability and guard order corrected; PostgREST authoritative for RLS; diff exclusions, version-mismatch owner gate and tooling prerequisites added).
- [x] 41B.1A-C1 execution authorised by the owner (PostgreSQL 17.11 accepted; live version unknown). Two isolated projects exist in the owner's organisation: `tsoy-41b1a-c1-run1` (`wwtcnbjhttjtklpxhrkd`) and `tsoy-41b1a-c1-run2` (`dlftnirrnirlkhxpofoq`).
- [x] C1.0 PASS (identity, marker, zero users). C1.1 PASS (2026-10-04): 47 migrations from `735a07e6` replayed on Project 1 via Supabase CLI 2.119.0, history 47/47, baseline catalogue captured and classified against the live snapshot with no unexpected drift, `pregnancy_episodes` absent. Evidence: `docs/strategy/evidence/41b1a-c1/`.
- [x] C1.2 PASS (2026-10-04): three synthetic Auth users (`@example.invalid`, confirmed, sign-in verified) and 21 legacy fixture rows per plan §F on Project 1; schema hashes identical to C1.1; history 47/47. Evidence `07-c1-2-fixture-manifest.md`, `07a-synthetic-ids.json`.
- [x] C1.3 PASS — forced-failure transaction atomicity proven (2026-10-04): psql 17.11 `-1` + `ON_ERROR_STOP=1` on the direct endpoint ran every forward statement then the appended deliberate failure (exit 3); all nine catalogue hashes identical afterwards, no 41B.1A object, history 47/47, fixture intact. Evidence `08-c1-3-forced-failure-transcript.log`, `08a-c1-3-atomicity-summary.md`.
- [x] C1.3b PASS — bounded lock-timeout behaviour proven (2026-10-04): with an ACCESS EXCLUSIVE lock held on `journeys` by a second session, the frozen forward file was cancelled by `SET LOCAL lock_timeout = '5s'` at its `journeys` ALTER after 5.82 s (`canceling statement due to lock timeout`, exit 3); `pg_locks` and `pg_stat_activity` show the genuine contention; all catalogue hashes identical afterwards; blocker rolled back; no lingering lock. Evidence `09*-c1-3b-*`.
- [x] C1.4 PASS — frozen 41B.1A forward foundation successfully applied to Project 1 (2026-10-05, rehearsal only, NOT production): psql 17.11 `-1` + `ON_ERROR_STOP=1`, hash `e6ad0bc8…`, exit 0 in 1.36 s; `pregnancy_episodes` (0 rows), 13 composite RESTRICT links all NOT VALID, 13 link indexes, `babies_id_user_id_key`, 4 owner policies, authenticated SELECT-only; fixture and history 47 untouched. Evidence `10*-c1-4-*`.
- [x] C1.5 PASS — post-forward catalogue matches C1.1 baseline plus only the approved 41B.1A foundation (2026-10-05, read-only): nine sections recaptured in baseline format through psql and the integration; 0 removed lines, 52 added lines all EXPECTED 41B.1A (26 columns, 20 constraints, 18 indexes, 4 policies, trigger, RLS, grant); G-1 to G-12 all PASS; 13 RESTRICT links still NOT VALID; 0 episode rows; fixture 21; history 47. Evidence `11*-c1-5-*`.
- [x] C1.6 PASS — NOT VALID ownership-link runtime gate proven; all 13 ownership FKs remain unvalidated pending C1.7 (2026-10-05): as `postgres`, same-user links on reflections, the journeys pointer and babies accepted; every cross-user insert/update rejected immediately with SQLSTATE 23503 naming the `<table>_pregnancy_episode_owner_fkey` while `convalidated = false`; legacy rows keep NULL links; episode fixture E-A1/E-B1 inserted per plan §F and kept; test rows deleted; no bypass; structural diff versus C1.5 EMPTY; history 47. Evidence `12*-c1-6-*`.
- [x] C1.7 PASS — all 13 Pregnancy Episode ownership FKs validated successfully; no data or unrelated schema changed (2026-10-05): frozen validate file `8645fd67…` run once through the hash-gated single-transaction psql runner on Project 1, exit 0 in 0.48 s; exactly 13 constraints moved NOT VALID → validated (15 → 2 unvalidated in `public`, the remaining two being the pre-existing account FKs); eight catalogue sections unchanged, constraints section differs only by the 13 suffixes; episode fixture (2) and legacy fixture (21) untouched, no tuple rewritten; history 47. Evidence `13*-c1-7-*`.
- [x] C1.8 PASS — all 13 Pregnancy Episode ownership relationships enforce same-user linkage and reject cross-user linkage after validation (2026-10-05): plan section I executed on every relationship as `postgres` in one rollback-only transaction with savepoints (95 cases; 56 same-owner accepted and read back; 39 cross-owner rejected, all SQLSTATE 23503 naming the intended `…_pregnancy_episode_owner_fkey`; NULL links accepted; event/session episode mismatch recorded as unconstrained in 41B.1A); no bypass; nothing persisted (episodes 2, links 0, pointers 0, fixture 21, tuple fingerprint unchanged); catalogue identical to C1.7; history 47. Evidence `14*-c1-8-*`.
- [x] C1.9 PASS — one-OPEN-Pregnancy uniqueness and removed_at semantics proven; removed episodes are retained, excluded from OPEN uniqueness, and do not fabricate outcomes (2026-10-05): plan section J executed in full on Project 1 as `postgres` in one rollback-only transaction (20 cases): second active, active+paused, paused+active, paused+paused and a second open for B all rejected with SQLSTATE 23505 on `pregnancy_episodes_one_open_per_user_idx`; ended E-B1 plus new active E-B2 accepted; a single-column `removed_at` update on E-A1 left status `active`, `ended_at` and `outcome_date` NULL, advanced `updated_at`, removed E-A1 from the OPEN predicate and allowed new active E-A2; re-opening E-A1 beside E-A2 rejected (23505); removed paused + new active accepted; no delete, no function, no enum change; nothing persisted (episodes 2, fingerprints unchanged); catalogue identical to C1.8; history 47. Evidence `15*-c1-9-*`.
- [x] C1.10 PASS — Pregnancy Episode CHECK constraints accept all approved boundary states and reject invalid date, expected-count and status/ended_at combinations exactly as frozen (2026-10-05): plan stage C1.10 cases plus boundary equivalents, 25 rollback-only inserts for synthetic user C on Project 1: dates (= lmp, −1, +301 rejected by `pregnancy_episodes_dates_check`; +1, +300 accepted), NOT NULL (`lmp_date`, `due_date` NULL rejected 23502), expected_count (0, 5, −1 rejected by `pregnancy_episodes_expected_count_check`; NULL, 1, 2, 3, 4 accepted), status/ended_at (active/paused with ended_at set and given_birth/no_longer_pregnant/pregnancy_loss with ended_at NULL rejected by `pregnancy_episodes_ended_at_status_check`; the five valid pairings accepted); every rejection 23514 naming the intended CHECK, every acceptance read back, residue 0; nothing persisted; catalogue identical to C1.9; history 47. Evidence `16*-c1-10-*`.
- [x] C1.11 PASS — genuine-JWT PostgREST RLS matrix proven; authenticated users see only their own Pregnancy Episodes, the psql dual-GUC channel agrees, and anon/service-role behaviour matches the approved matrix (2026-10-05): synthetic user A signed in through Supabase Auth (real session, role authenticated); through PostgREST the A SELECT returns only E-A1, the user_id = B and id = E-B1 filters return empty 200s, INSERT/UPDATE/DELETE return 403 code 42501; anon SELECT 401 code 42501; service_role SELECT all / INSERT / UPDATE succeed (temporary row for C deleted again); psql with `set local role authenticated` + both JWT claim GUCs (`auth.uid()` = A) and `set local role anon` agrees on every corroborated row; no bypass, no policy/grant change, no secret in evidence; nothing persisted; catalogue identical to C1.10; history 47. Evidence `17*-c1-11-*`.
- [x] C1.12 PASS — grant-vs-RLS interaction proven: authenticated retains SELECT-only table privilege; INSERT/UPDATE/DELETE owner policies do not confer missing privileges, and all three direct writes are denied with PostgreSQL 42501 on PostgREST and psql (2026-10-05): raw ACL `{postgres=arwdDxtm/postgres,service_role=arwdDxtm/postgres,authenticated=r/postgres}`, `role_table_grants` authenticated SELECT only, `has_table_privilege` t/f/f/f, four owner policies intact; genuine User A JWT through PostgREST: INSERT/UPDATE/DELETE 403 code 42501 `permission denied for table pregnancy_episodes`; psql as `authenticated` with dual JWT GUCs: SQLSTATE 42501 for all three; SELECT under RLS still returns only E-A1 on both channels; zero residue; no grant, policy or RLS change; catalogue identical to C1.11; history 47. Evidence `18*-c1-12-*`.
- [x] C1.13 PASS — rollback refusal matrix proven: R1 refuses on episode history, combined all-guards state refuses on guard 1 proving frozen precedence, R2 refuses on a later-phase Pregnancy Episode FK, and R3 refuses on a babies-key dependant; every failed rollback leaves an empty per-case POST-vs-PRE catalogue diff (2026-10-05): frozen rollback `0d008955…` run four times on Project 1 through the hash-gated single-transaction runner (exit 3 each; `holds 2 row(s)` ×2, `1 foreign key(s) from a later phase reference pregnancy_episodes`, `1 foreign key(s) depend on babies_id_user_id_key`); guards 3/4 proven only inside the combined state behind guard 1, never fabricated; safe-state transition recorded separately (pointer and link unbound, E-A1/E-B1 deleted, legacy fixture 21 preserved); scratch tables removed; final catalogue equals the R1 pre-run snapshot; history 47. Successful rollback NOT run; C1.14 NOT executed. Evidence `19*-c1-13-*`.
- [x] C1.14 PASS — Project 1 is in rollback-safe state: no Pregnancy Episode rows, pointers, bound links, later-phase Pregnancy Episode FKs, babies-key dependants or C1 scratch objects remain; legacy fixture preserved and 41B.1A foundation still installed (2026-10-05): section K safe-state set run itemised as `postgres` (episodes 0, pointers 0, twelve link counts 0, later-phase FKs 0, babies-key dependants 0, scratch 0) before and after the plan's explicit cleanup transaction, which found nothing to clean (0 rows, 0 objects; no state created); legacy fixture 21 in the C1.2 shape, users 3; foundation intact (table, 13 validated RESTRICT links, 13 link columns and indexes, babies key, open unique index, 3 CHECKs, trigger, RLS, 4 policies, authenticated SELECT-only); pre-C1.15 nine-section catalogue captured and equal to the C1.13 final snapshot; history 47; rollback file not executed. Evidence `20*-c1-14-*`.
- [x] C1.15 PASS — frozen 41B.1A rollback completed successfully on Project 1; the full post-rollback structural catalogue equals the C1.1 pre-foundation baseline under the fixed exclusions, all 21 legacy fixture rows and three synthetic users survive unchanged, and no unrelated object was removed (2026-10-05): safe-state gate all zero immediately before; rollback `0d008955…` through the hash-gated single-transaction psql runner as `postgres`, exit 0 in 0.51 s, no refusal, no error/warning/notice, no CASCADE in the file; fresh session: `pregnancy_episodes`, 13 link columns, 13 ownership FKs, episode indexes/CHECKs/trigger/policies and `babies_id_user_id_key` all absent, scratch 0; nine-section diff against `02-baseline-catalogue.md` EMPTY (289/5/25/35/34/114/141/86/34 lines, functions matched by both prosrc and functiondef), no exclusion needed; legacy fixture 21 in the C1.2 shape with tuple-identity and content fingerprints unchanged; users 3; history 47; marker intact. Evidence `21*-c1-15-*`.
- [x] C1.16 PASS — frozen 41B.1A foundation successfully re-applied on Project 1 after complete rollback; the second application reproduces the original application structure exactly, with legacy fixture and migration history unchanged; the validated state reproduced exactly (2026-10-06): pre-state equal to the C1.1 baseline; forward `e6ad0bc8…` exit 0 in 0.56 s, nine-section diff versus the C1.5 post-forward catalogue EMPTY (13 links NOT VALID, ACL `authenticated=r`, 4 policies, RLS on); validate `8645fd67…` exit 0, nine-section diff versus the first validated state EMPTY (13/13 validated, RESTRICT); starred rows of sections I (26 cases), J (7 cases) and H (H-1..H-5 through PostgREST with a genuine User A JWT plus psql corroboration) re-run with identical results; episode fixture E-A1/E-B1 recreated for those rows and retained; legacy fixture 21 with unchanged tuple and content fingerprints; users 3; history 47; no scratch, lock or idle session. Evidence `22*-c1-16-*`.
- [x] C1.17 PASS — fresh-project reproducibility proven on Project 2 `tsoy-41b1a-c1-run2` (`dlftnirrnirlkhxpofoq`, independently created, own credentials and Auth users, wrappers denylisting production and Project 1) (2026-10-06): C1.0 marker; C1.1 replay of the same 47 migrations with the baseline catalogue EMPTY against Project 1 C1.1; C1.2 three synthetic users (fresh ids, genuine sign-in) and the 21-row fixture; C1.4 forward `e6ad0bc8…` exit 0 with post-forward catalogue EMPTY against Project 1 C1.5; C1.7 validate `8645fd67…` exit 0 with validated catalogue EMPTY against the Project 1 validated reference; starred I (26 cases), J (7 cases) and H (H-1..H-5 via Project 2 PostgREST with a genuine Project 2 JWT plus psql) identical; R1 refusal `holds 2 row(s)` exit 3 with empty POST-vs-PRE diff; C1.14 safe state; C1.15 rollback `0d008955…` exit 0 with post-rollback catalogue EMPTY against Project 2 own baseline and Project 1 C1.1; legacy 21, users 3, history 47; Project 1 untouched. Evidence `23-c1-17-project2/`.
- [ ] C1.18 onward NOT STARTED. Project 2 foundation NOT present after C1.15; Project 1 foundation present (validated). 41B.1A NOT applied to production.
- 41B.1B NOT STARTED (pre-41B.1B account-deletion gate still open)
- [ ] PRE-41B.1B GATE (owner decision or evidence): account deletion under the 13 `ON DELETE RESTRICT` links depends on RI-trigger firing order on `auth.users`, which is OID-based and not portable from rehearsal to production. Close by structure-only production `pg_trigger` evidence, an approved design change (e.g. deferrable `NO ACTION`), or explicit deletion ordering in `delete-account`. No row may be bound before this closes. See 41B.0-R §29.
- 41B.1A-C1 NOT STARTED
- 41B.1B NOT STARTED
- IVF-SAVE-R PARKED
- Claude Code = canonical implementation owner; the GitHub repository is the single source of truth
