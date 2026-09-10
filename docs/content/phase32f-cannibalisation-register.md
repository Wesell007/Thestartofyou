# Phase 32F — Cannibalisation register

Seven registered intent families. Severity before remediation: HIGH 1,
MEDIUM 3, LOW 3. Runtime-safe remediation only: clarify the primary owner and
set supporting-page link direction. No deletions, redirects, slug changes,
canonical changes, merges, noindex or draft publication.

| Intent family | Severity before | Primary owner | Supporting owner(s) | 32F action | Final status | Residual risk |
| --- | --- | --- | --- | --- | --- | --- |
| CAN-01 Postpartum physical recovery | MEDIUM | `/articles/postpartum-recovery-timeline` | `/first-year/postpartum-recovery/healing-after-birth`, `/first-year/postpartum-recovery/what-recovery-can-feel-like` | Supporting articles link up to the primary guide | RESOLVED_IN_32F | Low. Ownership may move if a 32C draft is published later |
| CAN-02 Body changes after birth | MEDIUM | `/articles/your-body-after-birth` | `/first-year/body-and-hormones/body-changes-after-birth` | Supporting article links up to the primary guide | RESOLVED_IN_32F | Low. Same future-publication caveat |
| CAN-03 Baby sleep, first year | MEDIUM | `/articles/baby-sleep-first-year` | `/first-year/sleep/newborn-sleep-expectations`, `/first-year/sleep/helping-your-baby-settle` | Supporting article links up to the primary guide | RESOLVED_IN_32F | Low. A published 32B sleep-change draft would add a sub-intent owner |
| CAN-04 Milestones and development | HIGH | Intended: `/articles/baby-milestones-first-year` | `/first-year/development/baby-development-in-the-first-year` | Link direction set supporting → primary; canonical untouched | DEFERRED_SEO_ARCHITECTURE | Material. Both routes remain self-canonical and indexed; inventory role `needs-decision` |
| CAN-05 Preparing for baby | LOW | `/preparing-for-baby` hub | `/articles/preparing-for-baby-complete-guide` | Both exposed in the pregnancy "getting ready" group, hub first | MITIGATED_KEEP_DISTINCT | Low. Hub and long-form guide serve different depth |
| CAN-06 Pelvic floor across stages | LOW | `/articles/pelvic-floor-exercises-in-pregnancy` | `/first-year/body-and-hormones/body-changes-after-birth` | Reciprocal stage-progression links | MITIGATED_KEEP_DISTINCT | Low. Adjacent stages, not competing |
| CAN-07 Perinatal and postnatal mental health | LOW | `/first-year/emotional-wellbeing/when-parenthood-feels-heavy` | `/articles/perinatal-anxiety`, `/first-year/emotional-wellbeing/feeling-like-yourself-again` | Physical recovery articles route to the mental-wellbeing owner | MITIGATED_KEEP_DISTINCT | Low. Distinct framing retained deliberately |

## Reconciliation

```text
RESOLVED_IN_32F                     3
MITIGATED_KEEP_DISTINCT             3
DEFERRED_SEO_ARCHITECTURE           1
BLOCKED_BY_UNPUBLISHED_FUTURE_OWNER 0
REVIEW_HOLD                         0
NO_MEANINGFUL_CONFLICT              0
= 7
```

CAN-04 is explicitly not described as resolved: link direction was set, but the
canonical and ownership decision remains outstanding.

Nothing in this register required new health, safety or developmental guidance.
Any wording change that would have done so was classified `REVIEW_HOLD` and
left in documentation.
