# Phase 38B — Toddler content coverage & journey audit

Audit only. No content, UX, route, sitemap, inventory, image, AI, grounding, reviewer, database, lifecycle or analytics changes. Deployment: NO. Detail: see `phase38b-toddler-journey-gap-register.md` and `phase38b-toddler-content-inventory.md`.

## Measured repository truth

- Hub routes 1. Age destinations 5. Topic destinations 8. Article records 16: ready 16, draft 0, unknown 0.
- Canonical public Toddler URLs 30. Sitemap Toddler URLs 30: hub 1, age 5, topic 8, article 16. Duplicates 0.
- Broken routes 0. Legacy Toddler redirects 0.
- Ownership: 2 articles per topic across all 8 topics.
- Embedded Companion surfaces: 14 (hub 1, age 5, topic 8), one on each page.
- Article discovery surfaces: 8 topic pages, hub Start Here (4 articles), hub common questions links, and related guidance (48 links, 3 per article).
- Image placements: hub hero and age journey, 5 age heroes, 8 topic heroes, and 16 article heroes (explicit map).

## Age pages (5/5)

Every age page has its own summary, changes, development areas, questions, gentle support, previous and next navigation, and related topics.
- Potty is mentioned only from 2 years onwards (12-17m and 18-23m: 0 mentions). That fits the stages, though 18-23m could mention early readiness awareness (P4).
- The later stages are not noticeably thinner: page sizes run from about 4.3k to 4.6k characters of data.
- Age pages have no source records. As orientation copy they make no clinical thresholds, so this is 0 provenance concerns, noted only.
- They carry no rigid milestone deadlines.

## Topic pages (8/8)

Each topic shows both of its articles, the five-age strip, FAQs and a late Companion.
- Gaps in coverage depth: behaviour (hitting and biting), potty (withholding, night dryness), health and safety (food choking, outdoor), sleep (cot to bed), play (screen time) and speech (bilingual). Each is recorded in the register. No topic needs a structural rework.

## Specialist audits

- Development: patterns-over-time framing, no rigid deadlines, and clear routes to seek support. Findings 0.
- Speech: everything covered except bilingual depth (content gap, P3). No invented thresholds.
- Behaviour: no shaming language. Hitting and biting lack an owner (P2).
- Sleep: no rigid schedules and no overconfident nap ages. Cot to bed is uncovered (P3, owner NONE, EXPAND_EXISTING BED, deferred).
- Food: covered in practice. Food choking safety sits only briefly in home safety (P2).
- Potty: readiness is framed as not just age. Withholding (P2) and night dryness (P3) are thin.
- Health and safety: GP escalation and home safety are covered. Outdoor safety is thin (P3).
- Play: covered, except screen time (P3).

## Claim and source risk

- Unsupported medical or numerical claims: 0. Numeric age claims appear only in the age-range framing.
- NEEDS_SOURCE: 0.
- UNRESOLVED REVIEWER-METADATA / PROVENANCE DEBT: 3. Rendered unsupported reviewer claims: 0. These are dormant `medicallyReviewed`/`reviewedBy` data on three articles plus a reviewer default in `withToddlerDefaults`. The Toddler renderer does not display them. This is not a rendered claim violation; the fields are unchanged and the decision belongs to the next phase.
- Source records: structured 60, label-only 0, articles without sources 0.

## Duplication

Technical duplicates: 0. Editorial overlap groups: 5, all KEEP BOTH.

## AI, journal and handoffs

- Material needs covered only by AI: 0. The editorial, Companion and journal surfaces are clearly separate after 38A.
- First Year to Toddler content: COMPLETE. First Year pathways and phase data link to /toddler, and 12-17 months is the first age.
- First Year to Toddler routing: COMPLETE.
- Toddler to Family: PARTIAL. The only link is hub Where to next; no link appears on the 3-year page or in articles. Family content exists, so internal linking alone would solve this (P4). It is not required for closure.

## Tool and support opportunities

- CHECKLIST: potty readiness and home safety.
- AGE GUIDE: sharing and friendships.
- COMPANION: individual sleep patterns.
- FAMILY CONTENT: parent depletion.
Nothing was built.

## Governance

Grounding changes, approvals, candidates and eligibility changes: 0. Reviewer changes: 0. AI runtime and source-routing changes: 0; `AI_SOURCE_ROUTING_VERSION` unchanged. Database, lifecycle, 38A visual, TTC, Pregnancy and First Year changes: 0. Deployment: NO.

## Completion report

- Articles: KEEP 10, EXPAND_EXISTING 6 (closure P2: TAN, PTP, HOM; deferred P3: BED, SPH, PLY), MERGE 0, REPOSITION 0, INTERNAL_LINK_ONLY 0, ARCHIVE_CANDIDATE 0. Total 16/16.
- Journey moments: 55. By age: 12-17m 10, 18-23m 9, 2y 12, 30m 8, 3y 8, shared 8.
- Classifications: COVERED 40, PARTIALLY 9, UNCOVERED 1, NOT_REQUIRED 2, ELSEWHERE 3. Reconciled YES.
- Coverage-gap rows 10. Priorities: P1 0, P2 3, P3 8, P4 4 (15 rows): coverage gaps 10, COVERED 0, provenance 0, handoff 4, other 1. Reconciled YES.
- Cot to bed: owner NONE, treatment EXPAND_EXISTING (`bedtime-battles-and-night-waking`), P3, not required before closure.
- Reviewer provenance debt 3; rendered unsupported reviewer claims 0.
- New candidates 0. Discovery: well 16, weak 0, orphaned 0. Broken links 0, wrong destinations 0, stale references 0.
- Stale inventory rows 16, repaired 0. Release blockers 0.
- New articles required: NO. Closure-level existing-content remediation required: YES (TAN hitting and biting, PTP withholding, HOM food choking). Deferred P3/P4 remediation required for current-strategy closure: NO.

## Outcome

OUTCOME B — TODDLER CONTENT MOSTLY SUFFICIENT / SMALL GAPS. Reassessed after final reconciliation: P1 is 0, there are 3 closure-level P2 items, 0 candidates, 0 blockers and no structural problem, and the P3/P4 items can be deferred.

Proposed 38C scope (not started):
- A. Closure-level P2 expansions: TAN (hitting and biting), PTP (withholding), HOM (food choking).
- B. Deferred P3/P4: the BED, SPH and PLY expansions, PTP night dryness, HOM outdoor safety, the E2 decision, the A6/A8 links, and C5.
- C. Repair the 16 stale inventory rows (governance).
- D. Decide on the 3 reviewer-metadata / provenance debt records (governance).
- E. Toddler to Family PARTIAL: optional links from the 3-year page and S5 (P4).
- F. Cot to bed: BED expansion at P3, deferred unless 38C includes it.

Phase 38C was not started.
