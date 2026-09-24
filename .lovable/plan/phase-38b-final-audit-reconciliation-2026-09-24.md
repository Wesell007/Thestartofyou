# Phase 38B — Final audit reconciliation

Documentation only. No content, inventory, reviewer-field, link, source or product changes. Phase 38C is not started.

## Findings from the existing gap register

1. Cot to bed (row C7) is already recorded as P3, with no owner and an EXPAND_EXISTING treatment into `bedtime-battles-and-night-waking` (BED). The article ledger left it out. The 3 P3 expansions (BED, SPH bilingual, PLY screen time) were also missing from the ledger, even though the register assigns them to those articles.
2. The 15 prioritised rows are every row that is not COVERED. The 5 extra rows beyond the 10 coverage gaps are A8, E8, S5 and S7 (handoffs) and C5 (sharing, where the age guide is enough). Nothing is duplicated and no provenance rows are in the priority table.
3. The reviewer finding is renamed. It becomes unresolved reviewer-metadata / provenance debt, not a rendered claim violation.

## Reconciled answers

- Cot to bed: priority P3. Current owner NONE. Treatment EXPAND_EXISTING, using `bedtime-battles-and-night-waking`. Required before closure: NO.
- Prioritised rows: coverage gaps 10 (P2 3, P3 7), prioritised COVERED rows 0, provenance/governance rows 0 (tracked separately as 3 debt items), handoff rows 4 (A8 P3; E8, S5, S7 P4), other rows 1 (C5 P4). Total 15.
- Priorities stay at P1 0, P2 3, P3 8, P4 4.
- Article ledger: KEEP 10 and EXPAND_EXISTING 6. The 3 closure-level (P2) expansions are TAN, PTP and HOM. The 3 deferred (P3) expansions are BED, SPH and PLY. MERGE, REPOSITION, INTERNAL_LINK_ONLY and ARCHIVE_CANDIDATE are all 0. Total 16. The internal links (A6 from BIG, A8 from PIC), the E2 friendships decision and the Family links remain journey-level treatments, not article actions.
- Reviewer provenance debt is 3 and rendered unsupported reviewer claims are 0. The fields are left untouched.
- All other verified results stay as they are (Section 4 list).
- Outcome B still holds: P1 is 0, there are 3 P2 items, 0 candidates, 0 blockers, no structural problem, and the P3/P4 items can be deferred.

## Proposed 38C scope (not implemented)

- A. Closure level: expand TAN (hitting and biting), PTP (withholding) and HOM (food choking).
- B. Deferred: the BED, SPH and PLY expansions, PTP night dryness, HOM outdoor safety, the E2 decision, the A6 and A8 links, and C5.
- C. Repair the 16 stale inventory rows (governance).
- D. Decide what to do with the 3 reviewer-metadata records (governance).
- E. Toddler to Family: optional links from the 3-year page and S5 (P4).
- F. Cot to bed: BED expansion at P3, deferred unless 38C chooses to include it.

## Edits

- `docs/content/phase38b-toddler-content-coverage-audit.md`: rewrite the completion report, sleep and claim-risk wording, and the outcome follow-up to match the answers above.
- `docs/content/phase38b-toddler-content-inventory.md`: change rows 8 (BED), 5 (SPH) and 15 (PLY) to EXPAND_EXISTING (P3), tag rows 3, 12 and 13 as P2, recount the actions, and rename the provenance section.
- `docs/content/phase38b-toddler-journey-gap-register.md`: add a category breakdown of the priorities, and reword the candidates sentence so every expansion is mapped to an article in the ledger.
- `src/test/phase38bToddlerAudit.test.ts`: update any action-count assertion to KEEP 10 / EXPAND 6 and add the category split. Then run that test only.
- `roadmap.md`: append one reconciliation line.

Close with the restated Outcome B string. Phase 38C is not started.

## Closure terminology (final report)

- New articles required: NO.
- Closure-level existing-content remediation required: YES (TAN hitting and biting, PTP withholding, HOM food choking).
- Deferred P3/P4 remediation required for current-strategy closure: NO.
- Do not use the wording "new content required before closure = NO" anywhere in the documents.
