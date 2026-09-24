# Phase 38C — Toddler remediation

38B is historical pre-remediation evidence and was not edited. Deployment: NO.

## Owners (confirmed from repository before editing)
| Code | Slug | Topic | Status | Hero |
|---|---|---|---|---|
| TAN | understanding-toddler-tantrums | behaviour-emotions | ready | explicit map, unchanged |
| PTP | potty-training-without-pressure | potty-learning | ready | explicit map, unchanged |
| HOM | toddler-home-safety | health-safety | ready | explicit map, unchanged |

Sources before: TAN 4, PTP 4, HOM 4 (all structured). After: TAN 5, PTP 5, HOM 7. Toddler total 60 to 65.

## Finding → treatment → location → source → validation
| 38B finding | 38C treatment | Location | Source (text checked) | Validation |
|---|---|---|---|---|
| TAN P2 hitting and biting | New section "Hitting and biting" + 1 takeaway | `src/data/toddlerArticleData.ts` | NHS Temper tantrums (common, may not understand it hurts, not a sign of future aggression, see health visitor or GP if seriously concerned) | 38C test, Playwright |
| PTP P2 withholding | New section "When your child holds on to poo or wee" + 1 takeaway | same | NHS Constipation in children (common during potty training at 2 to 3, pressure/interruption/worry as causes, pain and vicious circle, routine with praise, feet flat, under 3 poos a week, see a GP early) | 38C test, Playwright |
| HOM P2 food choking | New section "Food and choking" + 1 takeaway | same | NHS How to stop a child from choking (most often while playing or eating, keep coughing, silent cough means shout for help); NHS First solid foods (quarter grapes and cherry tomatoes, remove pips, stones, bones, stay with child); NHS Foods to avoid (no whole nuts under 5, ground nuts or nut butter on food) | 38C test asserts no manoeuvre steps; Playwright |
| 16 stale inventory rows | `live` / `final` / `keep` | `src/data/articleInventory.ts` | canonical dataset `status: "ready"` | 38C test, 16/16 |
| 3 reviewer-metadata debt records | Removed `medicallyReviewed` and `reviewedBy` from SPD, HOM, GP; removed reviewer and review-date defaults from `withToddlerDefaults` | `src/data/toddlerArticleData.ts` | No article-specific provenance exists | 38C test, governance test |

Emergency choking steps are not reproduced. The section tells parents to shout for help and sends them to the NHS guide for what to do next, including when to call 999. Gagging vs choking is not added: the NHS page frames it for babies starting solids, so it is not a supported toddler claim.

## `withToddlerDefaults` check
Records using the helper: 16. Records receiving reviewer metadata through it: 3 (all with explicit `medicallyReviewed: true`). Records with genuine article-specific provenance: 0. Without: 3. Valid proven metadata removed: 0. Fabricated: 0. `lastUpdated` values are explicit on every record and were unchanged.

## Carry-along
PTP night dryness: not carried along (deferred P3). HOM outdoor safety: not carried along (deferred P3). P3_CARRY_ALONG_RESOLVED = NO.

## Test adjustments
- `phase38bToddlerAudit.test.ts`: the pre-remediation figures (60 sources, 3 reviewer records, 16 stale rows) are now asserted from explicit `PHASE_38B_SNAPSHOT` constants against the locked 38B documents, not current data.
- `phase38aToddlerUx.test.ts`: the stale-row count assertion was replaced with a visibility-independence check.
- `reviewerClaimGovernance.test.tsx`: the historical metadata floor moved from 179 to 175, a documented drop of the 4 unsupported Toddler occurrences.
