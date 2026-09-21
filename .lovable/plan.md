# Phase 36C — Final evidence reconciliation (travel and flying)

Documentation and classification reconciliation only. No new articles, no new routes, no UX, week-model, AI, grounding, database, lifecycle or analytics changes. No deployment. No Phase 36D.

## What the repository actually shows

Checks run before writing this plan:

- `eating-well-in-pregnancy` contains no travel or flying guidance of any kind. Its inventory record is `recommendedAction: keep`, `canonicalRole: primary`, `contentState: final`.
- The words "flying", "air travel" and "airline" appear **zero** times across `articleData.ts`, `weekData.ts` and `pregnancyTopicData.ts`.
- The Phase 36B evidence for moment 46 ("40 article and 33 week mentions") is keyword-count noise: nearly every match is the verb "travel" in unrelated sentences (an embryo travelling down the tube, pain that travels, infection travelling to the kidneys, nerve signals travelling). The only genuine travel references are travel-vaccine asides in `vaccinations-in-pregnancy`.

So the mapping fails on both halves: the owner is wrong, and the "partially covered" evidence that produced the treatment does not exist.

## Disposition

**Outcome A on the owner, with an honest residual note.**

- Travel/flying → `eating-well-in-pregnancy` mapping valid = **NO**.
- `eating-well-in-pregnancy` is reclassified to its true evidence-backed action, **KEEP** (matching its own inventory record), and removed from EXPAND_EXISTING.
- Moment 46 coverage classification becomes **UNCOVERED**, priority **P3**, treatment **FUTURE EDITORIAL DECISION / NO CURRENT VALID OWNER**. Release blocker = NO; new article required before closure = NO. No existing Pregnancy surface can absorb travel/flying guidance without inventing content, so nothing is implemented.
- Phase 36B's Outcome B conclusion, the 64-moment total, blockers = 0 and new article candidates = 0 all stand. `UNCOVERED = 0` is not preserved; the record reflects repository truth.

## Corrected counts

- Article records 104 — KEEP **97**, EXPAND_EXISTING **4**, MERGE 2, REPOSITION 0, INTERNAL_LINK_ONLY 1, ARCHIVE_CANDIDATE 0 (97+4+2+0+1+0 = 104)
- Valid expansion mappings: **4 / 4**; addressed **4 / 4**; remaining owner mismatches **0**
- Journey moments 64 — covered 45, partially covered **8**, uncovered **1**, not required standalone 2, better served elsewhere 8 (45+8+1+2+8 = 64); arithmetic reconciled YES
- Remaining genuine P1/P2 gap: **NO** (one uncovered P3 item, non-blocking)
- Current Pregnancy release blockers: **0**


## Documentation edits (targeted only)

1. `docs/content/phase36b-pregnancy-journey-gap-register.md` — row 46 treatment and evidence corrected; treatment-summary row 46 updated; P3 line kept with the corrected wording. No other rows touched.
2. `docs/content/phase36b-pregnancy-content-inventory.md` — EXPAND_EXISTING row 5 → 4 with `eating-well-in-pregnancy` removed; KEEP count adjusted.
3. `docs/content/phase36b-pregnancy-content-coverage-audit.md` — only the dependent counts in the action line and the partial-moment arithmetic.
4. `docs/content/phase36c-pregnancy-final-cleanup.md` and `phase36c-pregnancy-final-closure.md` — replace the "EXPANSION OWNER MISMATCH = 1, unresolved" record with the reconciled account: the original mapping, why it failed repository verification, the corrected classification, that no implementation was required, and the final 4/4 counts. Keeps the explicit statement that content was not forced into an unrelated article to satisfy a count.
5. `roadmap.md` — append the reconciliation to the existing 36C entry. Phase 36A, 36A.1, 36B and Phase 35 records preserved.

## Preserved and untouched

Stale references 0, orphans 0, loss handoff COMPLETE, First Year handoff COMPLETE, birth-plan canonical owner `birth-preferences`, unsupported claims after 0, broken/wrong-destination links 0, AI-only needs 0, grounding 0, AI runtime 0, reviewer claims 0, database 0, lifecycle 0. No article dataset edits at all in this reconciliation.

## Validation

Documentation/classification only, so: the Phase 36C closure regression suite, the Phase 36A Pregnancy suite, the link-integrity sweep, full suite, typecheck ×2, lint against the 1 error + 10 warnings baseline, and a production build. Flaky failures reported with first-run and rerun evidence. Deployed = NO.

## Closure

If the above holds, record: **PHASE 36C — PREGNANCY FINAL CLEANUP & WORKSTREAM CLOSURE — CLOSED PASS / PREGNANCY COMPLETE FOR CURRENT STRATEGY / NO CURRENT PREGNANCY BLOCKERS**, then lock **PREGNANCY WORKSTREAM — CLOSED FOR CURRENT STRATEGY**. Next workstream: FIRST YEAR.
