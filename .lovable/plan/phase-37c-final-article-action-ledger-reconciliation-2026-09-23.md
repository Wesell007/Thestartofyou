# Phase 37C — Final article-action ledger reconciliation

Documentation and roadmap correction only. No article, link, route, AI, grounding, reviewer, database or lifecycle changes. No deployment. Phase 37D is not started.

## What the repository shows

`when-to-ask-for-help-after-birth` is defined as a record inside `src/data/firstYearArticleData.ts` (line 1751). That file contains exactly 26 article records, and this is one of them, so it sits **inside** the 26 First Year records. Its entry in `src/data/articleInventory.ts` is stale (`currentStatus: "draft"`, `recommendedAction: "publish"`), which is the known inventory-staleness finding already recorded in the audit, not a separate outcome.

Because P1-2 (intrusive thoughts) requires a section-level expansion of this article, its record action must be EXPAND_EXISTING rather than KEEP. No other record recommendation changes.

## Corrected ledger

| Action | Before | After |
| --- | --- | --- |
| KEEP | 17 | 16 |
| EXPAND_EXISTING | 5 | 6 |
| MERGE | 0 | 0 |
| REPOSITION | 0 | 0 |
| INTERNAL_LINK_ONLY | 4 | 4 |
| ARCHIVE_CANDIDATE | 0 | 0 |
| Total | 26 | 26 |

EXPAND_EXISTING denominator (6): `bottle-and-breastfeeding-questions`, `baby-development-in-the-first-year`, `introducing-solid-foods`, `healing-after-birth`, `body-changes-after-birth`, `when-to-ask-for-help-after-birth`.

## Document edits

1. `docs/content/phase37c-first-year-content-inventory.md`
   - Change the `when-to-ask-for-help-after-birth` record action from KEEP to EXPAND_EXISTING.
   - Update the action arithmetic line to KEEP 16 + EXPAND_EXISTING 6 + MERGE 0 + REPOSITION 0 + INTERNAL_LINK_ONLY 4 + ARCHIVE_CANDIDATE 0 = 26.
   - Add the sixth row to the EXPAND_EXISTING action-to-gap mapping table (gap P1-2 intrusive thoughts, priority P1, required for closure YES) and remove the closing note that treated it as a KEEP-level exception.

2. `docs/content/phase37c-first-year-journey-gap-register.md`
   - In the P1 ledger, keep P1-2 unchanged in substance but note that the treatment is now carried in the record-level action ledger as EXPAND_EXISTING.

3. `docs/content/phase37c-first-year-content-coverage-audit.md`
   - Update the outcome section's remediation scope so the expansion count reads 6 First Year article expansions (the five previous plus `when-to-ask-for-help-after-birth`), removing the separately listed "intrusive-thoughts expansion" bullet so it is not double-counted.

4. `roadmap.md`
   - Update the Phase 37C record's action arithmetic to KEEP 16 / EXPAND_EXISTING 6 / INTERNAL_LINK_ONLY 4 = 26.

## Counts preserved

Journey moments 84 (44 / 34 / 1 / 1 / 4); prioritised rows 39 (P1 3, P2 13, P3 19, P4 4); coverage-gap rows 35; discovery-priority covered rows 4; unique new candidates 2 (NC-1 serves P1-1, P1-3, P2-13; NC-2 serves P2-11, P2-12); milestone legacy article stays outside the 26. Outcome stays OUTCOME C.

## Validation

Full test suite, typecheck twice, lint against the established baseline of 11 problems, and a production build, even though the changes are documentation only.
