# Phase 37C — First Year content coverage and journey audit

Audit only. No content creation, editing, merging or archiving. No route, redirect, topic, phase, month, image, Companion, AI, prompt, context-builder, grounding, reviewer, database, lifecycle or analytics changes. No deployment. Phases 37A, 37A.1, 37B and 37B.1 remain visually locked and untouched.

Companion documents: `phase37c-first-year-content-inventory.md` (surfaces, routes, legacy ledger, article and source inventory), `phase37c-first-year-journey-gap-register.md` (journey matrices, gap register, candidates).

## 1. Measured baseline

| Field | Expected | Measured | Match |
| --- | --- | --- | --- |
| Hub | 1 | 1 | YES |
| Pathways | 2 | 2 | YES |
| Topics | 8 | 8 (4 Baby, 4 Postpartum) | YES |
| Phase pages | 4 | 4 | YES |
| Month destinations | 13 | 13 distinct public URLs | YES |
| Ready articles | 26 | 26 (15 Baby, 11 Postpartum) | YES |
| Heroes | 26/26 | 26/26, 0 suppressions | YES |
| Sitemap unique URLs | 354 | 354 (54 attributable to First Year) | YES |

Status split: ready 26, draft 0, unknown 0. Duplicate or shadowed article records 0.

## 2. Month-by-month audit (13 destinations)

All 13 month destinations were individually checked: route resolves, page renders meaningful stage-specific content, each carries 1 guide block, 5 common questions, 3–5 related links, 3–5 structured sources and 3 support routes. Internal links across the 13 months: 108 rendered hrefs, 0 broken, 0 wrong-destination, 0 stale. Baby guidance is present on all 13; parent and postpartum context is present on all 13. Stage progression is coherent newborn → 12 months. Visuals unchanged from Phase 37B.1.

Findings: month pages carry no explicit parent-key field linking them to their phase; the association is derived by order. Recorded as a structural observation only, no change proposed in this phase.

## 3. Phase-page audit (4 pages)

Each phase page provides 5 baby-change items, 5 parent-recovery items, 5 common questions, 4 support routes, 5 structured sources, 2–3 featured guidance entries, 4 related topics and 1 cross-link to the opposite pathway. Internal links across the 4 phases: 42 rendered hrefs, 0 broken. Companion separation is intact: one embedded contextual Companion per pathway, none duplicated onto phase pages. Safety escalation wording (111 / 999) is present on 3 of 4 phases.

Finding: `parentRecovery` content shrinks monotonically across the four phases (840 → 729 → 699 → 667 bytes). This is the measured basis for the later-postpartum thinness recorded in the gap register, and it corresponds to early-postpartum overrepresentation relative to months 6–12 recovery.

## 4. Topic audit (8 pages)

| Topic | Side | Library | Featured | Start Here quality | Finding |
| --- | --- | --- | --- | --- | --- |
| Feeding | Baby | 3 | 3 | strong | Breastfeeding-problem intent has no owner (P1) |
| Sleep | Baby | 3 | 3 | strong | Balanced; no gap |
| Development and milestones | Baby | 2 | 2 | adequate | Language, play and bonding intents thin |
| Care and safety | Baby | 7 | 3 | adequate | 4 of 7 articles are not featured anywhere: weak discovery |
| Physical recovery | Postpartum | 3 | 3 | strong | Caesarean recovery has no owner section |
| Emotional wellbeing | Postpartum | 2 | 2 | strong | Intrusive thoughts under-owned at article level |
| Body and hormones | Postpartum | 4 | 3 | strong | Cycle return and pelvic floor thin |
| Check-ups and warning signs | Postpartum | 2 | 2 | strong | Strongest escalation surface in First Year |

Article counts per topic are unequal by design and were measured, not assumed. Every topic exposes 3 AI prompts; no topic depends on AI alone for its core intent. Orphaned relevant articles: 0 — every article is listed on both its pathway and its topic page.

## 5. Discovery and orphan audit

Inbound discovery was measured across pathway placement, topic library, topic featured cards, phase useful reads, month related links and article-to-article related guidance.

| Field | Measured |
| --- | --- |
| WELL_DISCOVERED articles | 22 |
| WEAK_DISCOVERY articles | 4 |
| ORPHANED articles | 0 |
| Orphaned non-article surfaces | 0 |
| Broken rendered internal links | 0 |
| Wrong-destination links | 0 |
| Stale references silently dropped | 0 |
| Related-guidance links | 80 configured, 0 invalid |

Weak discovery: colic-and-evening-crying (0 inbound beyond listing), newborn-quirks-and-reflexes (2), newborn-skin-spots-and-marks (2), teething (2). All four sit in Care and safety and none appear as a topic featured card or phase useful read. This is a DISCOVERY GAP, not uncovered content.

## 6. Duplication audit

Technical duplicates inside First Year: 0. Editorial overlap groups: 7.

| Group | Members | Recommendation |
| --- | --- | --- |
| Recovery timeline | `/articles/postpartum-recovery-timeline` + healing-after-birth, what-recovery-can-feel-like | KEEP BOTH + INTERNAL_LINK_ONLY |
| Baby sleep | `/articles/baby-sleep-first-year` + newborn-sleep-expectations, helping-your-baby-settle | KEEP BOTH + INTERNAL_LINK_ONLY |
| Feeding guide | `/articles/feeding-your-baby-complete-guide` + First Year feeding set | KEEP BOTH + INTERNAL_LINK_ONLY |
| Body after birth | `/articles/your-body-after-birth` + body-changes-after-birth | KEEP BOTH + INTERNAL_LINK_ONLY |
| Milestones | `/articles/baby-milestones-first-year` + baby-development-in-the-first-year | REPOSITION (canonical decision required; legacy record already flagged `needs-decision`, high risk) |
| Early recovery voice | healing-after-birth + what-recovery-can-feel-like | KEEP BOTH (distinct intents: physical healing vs lived experience) |
| Newborn sleep | newborn-sleep-expectations + helping-your-baby-settle | KEEP BOTH (expectations vs settling technique) |

No merge, reposition or archive action has been implemented.

## 7. Source, claim and provenance audit

| Field | Measured |
| --- | --- |
| Unsupported numerical claims | 0 |
| Unsupported medical, timing or frequency claims | 0 |
| Unsupported developmental certainty claims | 0 |
| Feeding, sleep or postpartum-recovery claims requiring reword | 0 |
| Warning-sign or medication claims requiring removal | 0 |
| Absolute wording instances reviewed ("always", "never", "every baby") | 40 across 10 articles — all SUPPORTED safety or reassurance phrasing |
| NEEDS_SOURCE | 0 |
| UNRESOLVED_PROVENANCE | 16 |
| Structured / verified source records | 176 (93 article, 63 month, 20 phase) |
| Label-only source records | 0 |
| Records with no sources | 0 |

UNRESOLVED_PROVENANCE = 16: sixteen articles carry `medicallyReviewed: true` with `reviewedBy: "Jenny Joines"` in the data layer. Per the standing Phase 33.5 rule, no medical-review claim renders on any First Year surface and the reviewer name is not displayed anywhere. The unresolved item is the retained data field, not a rendered claim. Recorded explicitly, not converted, not remediated.

Milestone safety: milestone wording was reviewed across baby-development-in-the-first-year, when-milestones-feel-uneven, the 13 month pages and 4 phase pages. 0 instances imply a fixed timetable, 0 imply variation is automatically abnormal, 0 state precise deadlines without evidence, 0 offer reassurance without a caveat. `when-milestones-feel-uneven` is the explicit variation-safety owner.

Feeding audit: breastfeeding, bottle, mixed, early patterns, solids, weaning and refusal are covered or partially covered; the single uncovered feeding intent is feeding-related physical recovery for the parent (mastitis, nipple pain, tongue tie), which is a CONTENT GAP, not a discovery gap.

Sleep audit: newborn expectations, safe sleep, night waking, naps, regressions, settling and routine are covered. 0 unrealistic expectations, 0 unsafe implications, 0 overconfident schedules. Safe-sleep sourcing is Lullaby Trust and NHS.

Care and safety audit: everyday care, illness signs, fever escalation, bathing, home safety, babyproofing and safer sleep are covered; travel and car-seat safety are BETTER_SERVED_ELSEWHERE. The care and safety weakness is discovery, not absence.

Postpartum safety audit: heavy bleeding, severe pain, fever, wound concerns, mental-health escalation, persistent low mood and anxiety, urgent support and GP / midwife / health-visitor navigation are all repository-supported and owned by when-to-ask-for-help-after-birth and postnatal-checks-and-appointments. Intrusive thoughts are the one escalation-adjacent intent with thin article-level ownership (P1).

## 8. Handoff audit

| Handoff | State | Evidence |
| --- | --- | --- |
| Pregnancy → First Year | COMPLETE | 33 First Year destinations linked from the late-pregnancy surface; redirects intact |
| First Year → Toddler (content) | PARTIAL | 3 references to `/toddler` (pathway footer, stage stepper, phase 9-12 data); no editorial transition content |
| First Year → Toddler (lifecycle routing) | COMPLETE | `src/lib/firstYearStage.ts` resolves the toddler stage; breadcrumb crumb present; lifecycle unchanged |
| First Year → Family | MISSING | 0 internal links from any First Year surface to Family |
| Baby ↔ Postpartum | COMPLETE | Reciprocal pathway cross-links plus hub anchor navigation between `#baby-topics` and `#recovery-topics` |

## 9. Governance

| Field | Measured |
| --- | --- |
| Grounding changes / approvals / candidates | 0 (27 `first_year` registry entries unchanged) |
| Reviewer claims added | 0 |
| Provenance invented | 0 |
| AI source-routing changes | 0 |
| AI_SOURCE_ROUTING_VERSION | unchanged |
| Article copy, routes, sources, reviewers changes | 0 |
| AI runtime, prompts, context-builder changes | 0 |
| Database, lifecycle, analytics changes | 0 |
| Visual changes | 0 |
| Deployment | NO |

Publication quality and grounding eligibility were assessed separately; no article was promoted or demoted for grounding on the basis of editorial quality.

## 10. Validation

| Check | Result |
| --- | --- |
| First Year route checks (54 canonical URLs) | PASS |
| Article / topic / phase / month inventory checks | PASS |
| Related-guidance and link-integrity checks (80 related, 108 month hrefs, 42 phase hrefs) | PASS, 0 broken |
| Source and provenance checks | PASS, 176 structured records |
| Journey arithmetic checks | PASS, reconciled |
| Sitemap consistency | PASS, 354 total / 354 unique |
| Focused First Year regressions | PASS, 4 files / 45 tests |
| Full suite | PASS, 137 files / 1,576 tests |
| Typecheck run 1 | PASS |
| Typecheck run 2 | PASS |
| Lint | 11 problems (1 error, 10 warnings) — identical to the established baseline |
| Production validation build | PASS |
| Flaky tests | none; no rerun required |

## 11. Handoff detail for the two incomplete editorial handoffs

| Handoff | Priority | Exact missing visitor need | Content already exists | Internal-link-only sufficient | Required for First Year closure |
| --- | --- | --- | --- | --- | --- |
| First Year → Toddler (content) | P2 | "My baby is nearly one — what changes next and where do I go now?" No editorial transition passage exists; only three bare `/toddler` references | Partially: Toddler hub content exists, First Year transition copy does not | NO — a short transition passage in phase 9-12 plus links is required | YES |
| First Year → Family | P3 | "Where does wider family life, returning to work and childcare live?" Two shared journey moments (returning to work and childcare, wider family life) are BETTER_SERVED_ELSEWHERE with no route to Family | YES, on the Family hub | YES — internal links only | NO |

## 12. Milestone overlap decision input (adjacent / legacy record)

| Field | Measured |
| --- | --- |
| Record | `/articles/baby-milestones-first-year` (`src/data/articleData.ts`, inventory id `legacy:baby-milestones-first-year`, system `legacy-article`) |
| Inside the 26-record First Year article inventory | NO — the 26 records come from `src/data/firstYearArticleData.ts` |
| Current inventory owner | `src/data/articleInventory.ts`, legacy `/articles/*` ledger |
| Current `recommendedAction` | `needs-review` |
| Current `canonicalRole` | `needs-decision` |
| Technical duplicate | NO |
| Editorial overlap | YES (high duplicate risk against `baby-development-in-the-first-year`) |
| Recommended canonical owner | `baby-development-in-the-first-year` |
| Secondary treatment | REPOSITION + internal link on the legacy record |
| Priority | P2 |

Because the record sits outside the 26, the First Year action arithmetic is unaffected by it: KEEP 16 + EXPAND_EXISTING 6 + MERGE 0 + REPOSITION 0 + INTERNAL_LINK_ONLY 4 + ARCHIVE_CANDIDATE 0 = 26 (the KEEP / EXPAND split corrected after confirming `when-to-ask-for-help-after-birth` is one of the 26 records in `src/data/firstYearArticleData.ts`). The milestone decision is tracked separately as an ADJACENT / LEGACY EDITORIAL OVERLAP DECISION and is not counted in that denominator. Nothing has been merged, repositioned or linked.

## 13. Outcome

Coverage is broad and safe: 44 of 84 journey moments fully covered, 0 broken links, 0 unsupported claims, 0 orphaned articles, 0 indexable legacy surfaces. Architecture, discovery and public UX remain sound. The remaining gaps sit in the editorial content layer and, on the corrected priority ledger, are material rather than small: 3 P1 gaps (one of them UNCOVERED and escalation-bearing), 13 P2 gaps, 2 material AI-only editorial needs, 2 valid new-article candidates, Toddler content PARTIAL and Family MISSING.

**OUTCOME C — FIRST YEAR CONTENT HAS MATERIAL GAPS.**

This is not Outcome D: no structural rework is required. Routes, pathways, topics, phases, months, imagery and discovery architecture stand.

Current release blockers: 0. New content required before current-strategy closure: YES.

### Smallest evidence-backed remediation scope (proposed, not started)

Accounts for 3/3 P1, 13/13 P2, 2/2 material AI-only needs, 6/6 EXPAND_EXISTING, 4/4 INTERNAL_LINK_ONLY, 2/2 candidates, both incomplete handoffs and the milestone decision.

1. NC-1, breastfeeding problems and where to get help — resolves P1-1, P1-3, P2-13 and AI-only need 1.
2. NC-2, postpartum recovery in the later first year — resolves P2-11, P2-12 and AI-only need 2.
3. Expand the 6 EXPAND_EXISTING records — resolves P1-2 (`when-to-ask-for-help-after-birth`, intrusive thoughts) and P2-1, P2-4, P2-5, P2-7, P2-8, P2-9, P2-10. First Year article expansions required in 37D = 6. The intrusive-thoughts expansion is counted here only, not as a separate step.
5. Internal-link pass on the 4 INTERNAL_LINK_ONLY records — resolves P2-2, P2-3 and the two P3 discovery rows carried by the same pass.
6. Phase 9-12 toddler transition passage plus links — resolves P2-6 and the Toddler content handoff.
7. First Year → Family internal links — resolves the Family handoff (P3, carried because it shares step 6's linking work).
8. Milestone canonical decision, then REPOSITION plus internal link on the legacy record.

P3 and P4 improvements are otherwise excluded from the closure phase.

PHASE 37C — FIRST YEAR CONTENT COVERAGE & JOURNEY AUDIT — AUDIT COMPLETE / OUTCOME C — FIRST YEAR CONTENT HAS MATERIAL GAPS
