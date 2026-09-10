# Phase 32F — Cannibalisation register

Registered only where user intent materially overlaps. Runtime-safe
remediation only: clarify the primary owner and adjust supporting-page link
direction. No deletions, redirects, slug changes, canonical changes, merges,
noindex or draft publication.

| ID | Overlapping surfaces | Severity | Reason | Link signals before | Remediation | Runtime safe | Status |
| --- | --- | --- | --- | --- | --- | --- | --- |
| CAN-01 | `/articles/postpartum-recovery-timeline` vs `/first-year/postpartum-recovery/*` | MEDIUM | Same physical-recovery intent, split across two systems | None either way; the legacy primary was orphaned | Supporting First Year article links up to the primary guide | Yes | REMEDIATED |
| CAN-02 | `/articles/your-body-after-birth` vs `/first-year/body-and-hormones/body-changes-after-birth` | MEDIUM | Same postpartum body-change intent | None; legacy primary orphaned | Supporting article links up to the primary guide | Yes | REMEDIATED |
| CAN-03 | `/articles/baby-sleep-first-year` vs `/first-year/sleep/*` | MEDIUM | Same first-year sleep intent | None; legacy primary orphaned | Supporting article links up to the primary guide | Yes | REMEDIATED |
| CAN-04 | `/articles/baby-milestones-first-year` vs `/first-year/development/baby-development-in-the-first-year` | HIGH | Inventory marks canonical role `needs-decision` | None; legacy primary orphaned | Link direction set supporting → primary; canonical decision itself untouched | Link only | REMEDIATED (canonical decision DEFER_SEO_ARCHITECTURE) |
| CAN-05 | `/preparing-for-baby` vs `/articles/preparing-for-baby-complete-guide` | LOW | Hub surface vs long-form guide; different depth | Hub linked, guide orphaned | Both exposed in the pregnancy "getting ready" group, hub first | Yes | REMEDIATED |
| CAN-06 | `/articles/pelvic-floor-exercises-in-pregnancy` vs `/first-year/body-and-hormones/body-changes-after-birth` | LOW | Adjacent, not competing: pregnancy vs postpartum stage | No cross-route either way | Reciprocal stage-progression links | Yes | REMEDIATED |
| CAN-07 | `/articles/perinatal-anxiety` vs `/first-year/emotional-wellbeing/when-parenthood-feels-heavy` | LOW | Adjacent mental-health intents with distinct framing | Weak | Physical recovery articles now route to the mental-wellbeing owner | Yes | REMEDIATED |

Nothing in this register required new health, safety or developmental
guidance. Any wording change that would have done so was classified
`REVIEW_HOLD` and left in documentation.
