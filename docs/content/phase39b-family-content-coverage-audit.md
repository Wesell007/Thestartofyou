# Phase 39B — Family Content Coverage & Journey Audit

Status: AUDIT COMPLETE / OUTCOME B. Audit only. No content, inventory, reviewer, source, link, route, sitemap, UX, AI, grounding, database or lifecycle change. Deployment NO. Phase 39C not started.

Companion documents: `phase39b-family-content-inventory.md` and `phase39b-family-journey-gap-register.md`.

## 1. Repository truth
- Family hub routes 1 (`/family`). Topic destinations 6: growing-families, relationships, family-basics, health-safety, travel-days-out, play-connection.
- Article records 18: ready 18, draft 0, unknown 0. Ownership 3 per area.
- Canonical public URLs 25 (1 + 6 + 18). Sitemap URLs 25, duplicates 0.
- Broken Family routes 0. Legacy / redirect Family routes 0. Broken internal links 0 (related slugs 54/54 resolve; hub questions use corrected slugs from 39A).
- Embedded Companion surfaces 7 (hub 1, one late per topic page 6).
- Article discovery surfaces per article: canonical topic page (18/18), related guidance from 3 siblings (18/18 have 3 related slugs), hub Start Here (4 guides).
- Image placements: hub hero, 6 area images, 18/18 article hero mappings. Unchanged.

## 2. Article actions
KEEP 16, EXPAND_EXISTING 0, MERGE 0, REPOSITION 0, INTERNAL_LINK_ONLY 2 (preparing-for-another-baby, second-time-parenting), ARCHIVE_CANDIDATE 0. Total 18.

## 3. Governance drift ledger (kept separate)
**Inventory governance drift**: canonical ready articles 18; matching inventory rows 12; stale status 12 (draft); stale contentState 12 (placeholder); stale recommendedAction 12 (publish); ready articles with no inventory row 6 (second-time-parenting, staying-connected-as-parents, calmer-evenings-after-busy-days, family-sick-days-at-home, planning-family-days-out, simple-family-play-ideas). Stale rows total 18 (12 stale + 6 missing). Ready articles incorrectly hidden publicly 0. Public availability source of truth = dataset `status`.
**Reviewer provenance**: articles with reviewer metadata 2 (making-your-home-safer, when-to-ask-for-help carry `medicallyReviewed: true`, and `withFamilyDefaults` defaults `reviewedBy` to a named reviewer and `lastUpdated` to 2026-07). Genuine article-specific provenance 0. Unsupported reviewer metadata 2. Rendered unsupported reviewer claims 0: the Phase 33.5 gate (`hasReviewClaim`) blocks rendering because the provenance registry is empty.
**Grounding registry state**: records 18; default deny 18 (blocked_draft 12, blocked_missing_metadata 6); candidate 0; approved 0; eligible 0; missing records 0. `AI_SOURCE_ROUTING_VERSION` unchanged.

## 4. Coverage matrix
58 moments. Growing 8, Relationships 10, Practical 10, Health 8, Travel 8, Play 8, Shared 6.
COVERED 30, PARTIALLY_COVERED 16, UNCOVERED 0, NOT_REQUIRED_STANDALONE 5, BETTER_SERVED_ELSEWHERE 7. Reconciled.
P1 0, P2 0, P3 12, P4 12. 24 prioritised rows plus 34 unprioritised = 58. Reconciled.
Partial coverage sits in existing guides (sibling bonding, parenting disagreements, mornings, work balance, home hazards, flights, play when tired, time pressure). None is a material blocker.

## 5. Hub audit (39A / 39A.1 as built)
The orientation section explains what Family is and that it sits across stages. Entry through Start Here, then six areas, then questions, then the late Companion, then cross-stage pathways and Journal. Family not being a saved lifecycle is implied through the orientation copy but not stated as such; that is acceptable. No UX change.

## 6. Topic audit (6/6)
Each area: orientation from `intro`, Start Here from `startHere` (2 guides), a library of 1 further guide, situations from `areasInside`, accordion questions, one late Companion, related areas. Ownership is honest, and no area duplicates another's intent. Health and safety carries sourced escalation. Relationships carries the supported escalation lines for unsafe situations. Thin libraries (3 per area) are sufficient for current strategy because partial moments sit inside existing guides.

## 7. Relationship safety boundary
Conflict and boundary guides include escalation lines ("If a relationship ever feels unsafe, coercive or harmful..."). when-to-ask-for-help cites GOV.UK child abuse reporting and gives an immediate danger line. Decision: a supported escalation line is sufficient for now. A specialist support surface is a P3 future option. No editorial gap.

## 8. Money / financial claims
managing-childcare-costs states it is not a financial guide. It contains no figures, thresholds or eligibility statements, and points to current official guidance plus a qualified adviser. Its sources are GOV.UK, including Tax-Free Childcare. Classification: SUPPORTED. Time-sensitive: the Tax-Free Childcare and funded hours references are policy links that need periodic link checks. Financial/policy claims requiring review 0.

## 9. Health & safety claims
Sourced guides (home safety, ask for help, sick days) use calm wording, with 111 and emergency escalation. Absolute wordings found ("always turning pan handles inwards", "reaching out ... is always the right choice") are supportive, not clinical. Unsupported medical/numerical claims 0. NEEDS_SOURCE 0. UNRESOLVED_PROVENANCE 2 (the reviewer metadata above).

## 10. Duplication
Technical duplicates 0. Editorial overlap groups 2:
- Group 1: preparing-for-another-baby, helping-your-child-adjust-to-a-new-sibling, second-time-parenting. Recommendation: KEEP BOTH plus INTERNAL_LINK_ONLY.
- Group 2: building-family-routines, calmer-evenings-after-busy-days. Recommendation: KEEP BOTH.

## 11. Cross-workstream ownership
- Another baby: SHARED / DIFFERENT INTENT (TTC owns conception, Family owns household preparation).
- Postpartum relationships and intimacy: OTHER WORKSTREAM IS CANONICAL OWNER (First Year).
- Toddler behaviour, feeding and sleep: OTHER WORKSTREAM IS CANONICAL OWNER.
- Screen time: SHARED / DIFFERENT INTENT.
- Home safety: FAMILY IS CANONICAL OWNER.

Conflicts 0.

## 12. Discovery
Ready 18, well discovered 18, weak 0, orphaned 0. Broken rendered links 0, wrong destinations 0, stale slugs 0.

## 13. Sources
- Structured source records: 14 (childcare 3, home safety 4, ask for help 4, sick days 3).
- Label-only: 0.
- Articles with no source records: 14 (every Family article except the four listed above).
- Topic provenance concerns: 0. Hub provenance concerns: 0.

The source-less guides are practical or wellbeing guidance without clinical claims. This is recorded, not a blocker.

## 14. AI-only needs
Material Family needs covered only by AI: 0. Age gap concerns are BETTER SERVED BY AI (P4).

## 15. Tool / support opportunities
- Family schedule PLANNER (P4)
- TRAVEL CHECKLIST (P4)
- Specialist SUPPORT SURFACE for unsafe relationships (P3)
- JOURNAL for memory keeping and priorities

Nothing built.

## 16. Handoffs
- Pregnancy → Family: MISSING. There is no editorial link beyond the global navigation.
- First Year → Family: PARTIAL. One phase-page link goes to /family/relationships.
- Toddler → Family: COMPLETE (ToddlerPathways "Continue to Family life").
- Family → Pregnancy, Family → First Year, Family → Toddler: COMPLETE (FamilyPathways).
- Family → Journal: COMPLETE.

These are editorial discovery only. Family saved lifecycle: NO. Lifecycle routing addition required: NO.

## 17. Reflection
Priorities, gratitude and memory keeping are served by the Journal. Overwhelm and decisions are served by when-to-ask-for-help plus the Companion. No article needed.

## 18. New article candidates
0. No intent passes all five strict tests, because every partial moment can be met by expanding an existing guide or by other formats.

## 19. Outcome
**OUTCOME B — FAMILY CONTENT MOSTLY SUFFICIENT / SMALL GAPS.** No P1/P2 content gaps and no uncovered moments. The remaining work is governance: 18 inventory rows and 2 unsupported reviewer metadata defaults, plus one missing Pregnancy → Family handoff and P3/P4 enrichment.

Release blockers: 0. New articles required before current-strategy closure: NO. Existing-content remediation required before closure: NO. Governance cleanup is recommended as the smallest follow-up (inventory rows plus reviewer default removal). It has not been started.
