# Phase 37C — Final outcome and remediation-scope reconciliation

Documentation reconciliation only. No content, route, link, image, AI, grounding, reviewer, database, lifecycle or UX changes. Deployment NO. Only the three Phase 37C documents and the Phase 37C roadmap record are edited.

## Documentation error found during reconciliation

The gap register's priority summary table does not reconcile with its own row-level priorities. Recounted directly from the register rows (excluding the two new-article-candidate rows):

| Priority | Documented | Measured from rows |
| --- | ---: | ---: |
| P1 | 2 | 3 |
| P2 | 9 | 13 |
| P3 | 14 | 19 |
| P4 | 10 | 4 |
| Total | 35 | 39 |

The 39 prioritised rows comprise 34 PARTIALLY_COVERED + 1 UNCOVERED (the 35-item gap population) plus 4 COVERED rows carrying discovery-gap priorities (colic, teething, newborn quirks, newborn skin). Coverage, moment, article and action arithmetic are unchanged and still reconcile (84 moments; 44/34/1/1/4; 26 records; 17/5/0/0/4/0).

Consequence: the requested "9 / 9 P2" ledger is corrected to a 13 / 13 P2 ledger, and P1 is 3 not 2. The third P1 is "Breastfeeding practical support" (Baby, newborn and early weeks), which shares NC-1 as its treatment.

## What the reconciliation will produce

1. **Corrected priority ledger** in the gap register: P1 3, P2 13, P3 19, P4 4 = 39 prioritised rows, with the 35 gap rows plus 4 discovery-gap rows stated explicitly so both totals reconcile.
2. **P1 ledger (3/3)** — for each: classification, current owner, recommended treatment, whether existing content honestly owns the intent, required before closure.
   - P1-1 feeding-related physical recovery (mastitis, nipple pain, tongue tie) — UNCOVERED, owner NONE, NEW_ARTICLE (NC-1), owned NO, required YES.
   - P1-2 intrusive thoughts — PARTIALLY_COVERED, owner when-to-ask-for-help-after-birth, EXPAND_EXISTING plus internal links, owned partially (one article mention against 11 month-page mentions), required YES.
   - P1-3 breastfeeding practical support — PARTIALLY_COVERED, owner bottle-and-breastfeeding-questions, NEW_ARTICLE (NC-1) with internal links, owned NO, required YES.
3. **P2 ledger (13/13)** — ID, side, intent, coverage, owner, issue category (CONTENT / DISCOVERY / HANDOFF), treatment, required-before-closure, covering: feeding worries, crying and colic, teething, family meals and self-feeding, language and babble, transition toward toddler, caesarean recovery, early pelvic floor, ongoing pelvic floor and continence, return of periods, long-tail recovery 6–12 months, ongoing pelvic floor later in the year, shared feeding support.
4. **New article candidates revalidated** against the strict five-part test: NC-1 and NC-2 both re-tested and, on current evidence, both remain valid (no existing article owns 6–12 month recovery; phase `parentRecovery` blocks of 667–699 bytes are not an owner).
5. **Action-to-gap mapping** — all 5 EXPAND_EXISTING records (bottle-and-breastfeeding-questions, baby-development-in-the-first-year, introducing-solid-foods, healing-after-birth, body-changes-after-birth) and all 4 INTERNAL_LINK_ONLY records (teething, colic-and-evening-crying, newborn-quirks-and-reflexes, newborn-skin-spots-and-marks) mapped to gap, priority and closure requirement.
6. **Handoffs** — Pregnancy → First Year COMPLETE; Toddler lifecycle COMPLETE; Baby ↔ Postpartum COMPLETE; Toddler content PARTIAL and Family MISSING each given priority, exact missing visitor need, whether content already exists, whether internal-link-only suffices, and closure requirement.
7. **AI-only needs (2/2)** mapped to an owner: mastitis / nipple pain / latch → NC-1; postpartum recovery at 6–12 months → NC-2.
8. **Milestone overlap** — verified from the repository: `baby-milestones-first-year` lives in `src/data/articleData.ts` as a legacy article at `/articles/baby-milestones-first-year`, tracked in `articleInventory.ts` as `legacy:baby-milestones-first-year`, system `legacy-article`, `canonicalRole: "needs-decision"`, `recommendedAction: "needs-review"`. It is **NOT** one of the 26 First Year hub records (those come from `firstYearArticleData.ts`).
   - Milestone record inside the 26-record inventory = NO
   - Therefore the 26-record action arithmetic is preserved unchanged: KEEP 17 + EXPAND_EXISTING 5 + MERGE 0 + REPOSITION 0 + INTERNAL_LINK_ONLY 4 + ARCHIVE_CANDIDATE 0 = 26
   - The milestone overlap is tracked separately as an ADJACENT / LEGACY EDITORIAL OVERLAP DECISION: technical duplicate NO, editorial overlap YES, canonical owner `baby-development-in-the-first-year`, secondary treatment REPOSITION plus internal link on the legacy record, priority P2. Decision input only, no merge, not counted in the 26-record denominator or the 9-record non-KEEP mapping.
9. **Outcome reclassified to OUTCOME C — FIRST YEAR CONTENT HAS MATERIAL GAPS**, justified by 3 P1 gaps, 13 P2 gaps, 2 material AI-only editorial needs, 2 valid new-article candidates, Toddler content PARTIAL and Family MISSING. Architecture, discovery and public UX remain sound, so not Outcome D.
10. **Corrected smallest remediation scope** accounting for every P1/P2 finding, the 9 mapped article actions, both candidates, both handoff gaps and the milestones decision, with P3/P4 excluded unless carried by a shared implementation.
11. **Final reconciled report** in the requested field list, closing as:
    `PHASE 37C — FIRST YEAR CONTENT COVERAGE & JOURNEY AUDIT — AUDIT COMPLETE / OUTCOME C — FIRST YEAR CONTENT HAS MATERIAL GAPS`

## Files touched

- `docs/content/phase37c-first-year-journey-gap-register.md` — corrected priority table, P1/P2 ledgers, candidate revalidation
- `docs/content/phase37c-first-year-content-coverage-audit.md` — outcome section, handoff detail, milestone decision input, corrected follow-up scope
- `docs/content/phase37c-first-year-content-inventory.md` — action-to-gap mapping for the 9 non-KEEP records
- `roadmap.md` — Phase 37C record updated to OUTCOME C; locked 37A / 37A.1 / 37B / 37B.1 history untouched

## Validation

Documentation-only change: full test suite, typecheck twice, lint against the established baseline (1 pre-existing error, 10 warnings) and a production validation build, all re-run to confirm nothing moved. No deployment. Remediation is not started; the proposed scope is returned for review.
