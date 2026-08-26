# Article Grounding Review Queue

Phase 30D. Governance document only. No Start of You article is approved for AI grounding, and nothing in this document connects articles to the AI.

Counts are taken from `src/lib/grounding/articleGroundingRegistry.ts` and are held true by the drift guard in `src/test/articleGroundingDrift.test.ts`, which fails if any article is missing a record or any record has no article.

## 1. Total article count

206 articles, 206 registry records, 0 missing, 0 orphaned, 0 duplicates.

## 2. Count by journey

Journey tags overlap, so the total exceeds 206.

| Journey | Articles |
| --- | --- |
| pregnancy | 94 |
| trying-to-conceive | 55 |
| first-year | 19 |
| family | 18 |
| toddler | 16 |
| support | 12 |
| postpartum | 5 |
| preparing-for-baby | 4 |
| ivf | 2 |

## 3. Count by current approval status

| Status | Articles |
| --- | --- |
| blocked_missing_metadata | 162 |
| blocked_draft | 44 |
| candidate | 0 |
| approved | 0 |
| deprecated | 0 |
| archived | 0 |

## 4. Count by sensitivity level

| Sensitivity | Articles |
| --- | --- |
| unassessed (blocks) | 206 |
| low | 0 |
| wellbeing | 0 |
| health_reviewed | 0 |
| safety_sensitive | 0 |
| not_allowed | 0 |

No article has been assessed. Unassessed sensitivity is a blocking condition, so this alone keeps the whole catalogue ineligible.

## 5. Draft or placeholder count

44 records carry editorial status `draft` and are `blocked_draft`. Editorial status across the registry: 110 live, 52 unknown, 44 draft. Unknown status is treated as not live and blocks.

## 6. Health or safety-sensitive article count

Formally 0, because sensitivity is unassessed for every article. Informally, the pregnancy, trying-to-conceive, postpartum and IVF journeys (roughly 156 tagged records) contain the bulk of the clinically relevant material and should be assumed health-reviewed or safety-sensitive until a reviewer says otherwise.

## 7. Articles missing owner

206.

## 8. Articles missing content version

206.

## 9. Articles missing reviewer

206. Existing on-page "medically reviewed by Jenny Joines" trust signals are not recorded in the grounding registry and are not treated as grounding-grade review evidence.

## 10. Articles missing reviewed date

206.

## 11. Articles missing source list where needed

31 records have no structured source list. The remaining 175 do. Because every article is currently unassessed, the review-required rule applies to all 206, so all 31 of those are hard blocked on this ground alone and the other 175 still need their source lists verified rather than merely counted.

## 12. Suggested review order

Cautious, lowest clinical consequence first. Each tier must fully clear before the next opens.

1. Low-risk brand, navigation and product guidance (support journey, 12 records).
2. Low-risk general education with no clinical claims (parts of family, preparing-for-baby, toddler play and routine content).
3. Wellbeing and emotional content, no clinical claims.
4. Health-reviewed content requiring a named medical reviewer (pregnancy, trying-to-conceive, first-year health).
5. Safety-sensitive content covering urgency, risk or red-flag symptoms (reviewed last, strongest evidence bar).
6. Anything assessed `not_allowed` stays permanently blocked and never enters the queue again.

Drafts, placeholders, archived and deprecated content are excluded from every tier until they are made live.

## Exit criteria

**Blocked to candidate**, per article: a completed review template, an assessed sensitivity level that is not `not_allowed`, an editorial status of live, a recorded owner, a recorded content version, and a verified source list where sensitivity requires one.

**Candidate to approved**, per article: a named reviewer with a reviewed date, recorded `approvedBy` and `approvedAt`, a rollback or replacement reference, and evaluation examples added to the eval dataset covering that article's topic. Approval is a separate, explicitly gated phase and cannot happen as a side effect of adding metadata.

## Status

Start of You article grounding remains blocked. The next gated step is per-article review using `article-grounding-review-template.md`, starting at tier 1.
