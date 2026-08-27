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

## Phase 30E annotation — Tier 1 correction

This document remains the Phase 30D record and is not rewritten. Phase 30E adds the following corrections and findings on top of it.

- **Section 12, tier 1.** "Low-risk brand, navigation and product guidance (support journey, 12 records)" was a misclassification. In this catalogue the `support` journey tag means emotional and psychological support, not product support. All 12 records are corrected out of Tier 1, remain blocked, and are queued for **Phase 30H — Wellbeing & Sensitive Support Review**. The corrected slugs are listed individually with their audit trail in `article-grounding-tier-1-review.md`, section 7.1.
- **Section 5, editorial status.** The breakdown is 110 live, 44 draft, 52 unknown, out of 206. Draft and unknown stay separate categories. The 52 unknown records remain blocked and are recorded as an unresolved editorial and governance issue for Phase 30F.
- **Tier 1 outcome.** Six practical live articles were body-reviewed and all six were excluded (sleep safety and SIDS, car-seat and equipment safety, labour-arrival and urgency wording, birth clinical decision-making). 0 accepted Tier 1 candidates, 0 registry changes, 0 candidate records, 0 approved articles.
- **Scoped conclusion.** No purely product, journal or navigation article was identified among the 206 article-grounding registry records screened in Phase 30E. This applies only to this registry, not to the wider Start of You website, product, journal or navigation experience.
- **Governance gaps unchanged.** Owner, content version, grounding reviewer and reviewed date remain recorded as Missing for all 206 records. Source-list presence is governance metadata only.
- **Next gated step.** Phase 30F — grounding governance metadata and editorial status resolution, not Tier 2. Start of You article grounding remains blocked and the library is not grounding-ready.

## Phase 30F annotation — governance and editorial status resolution

This document remains the Phase 30D record. Phase 30F adds the following.

- **Sections 3 and 5, editorial status.** 52 unknown records were investigated on explicit repository evidence. 7 resolved to `live`, 0 to draft, 0 to archived, 0 to deprecated, 45 remain unknown. Post-30F split: **117 live, 44 draft, 45 unknown** of 206. Per-record detail and the `articleInventory.ts` evidence reconciliation are in `article-grounding-editorial-status-resolution.md`.
- **Sections 7 to 10, missing metadata.** Unchanged: owner, content version, grounding reviewer and reviewed date remain Missing for all 206. Nothing was invented to reduce the counts.
- **Section 11, source lists.** Unchanged: 31 records with no source list, now a formally defined governance gap. No sources were added or rewritten.
- **Exit criteria.** Superseded in detail by `article-grounding-governance.md`, which is now the normative contract for `blocked → candidate → approved`, including candidate authority, approval authority, the review evidence package and the sensitivity decision matrix.
- **Result.** 0 candidate records, 0 approved records, `listGroundingEligibleSlugs()` returns `[]`. Start of You article grounding remains blocked. The next gated step is Phase 30G — Tier 2 low-risk general education review, which was not started here.


## Phase 30G annotation — Tier 2 low-risk general education review

This document remains the Phase 30D record. Phase 30G adds the following.

- **Pool.** 206 total; 117 live / 44 draft / 45 unknown. Verified-live pool 117, minus the 9 verified-live support records reserved for Phase 30H and the 6 Phase 30E practical exclusions, gives **102 metadata-screened records**. The 3 unknown support records (`coping-with-the-two-week-wait`, `emotional-pressure-of-age-when-ttc`, `partner-support-when-ttc`) stay inside the 45 unknown status exclusions and are not double-counted or body-reviewed.
- **Funnel.** 102 = 92 metadata-routed exclusions + 10 Tier 2 body-review shortlist. The 10 = 5 body-reviewed exclusions + 5 accepted future Tier 2 candidates.
- **Routing of the 97 exclusions.** Phase 30I 53, Phase 30J 30, later health/safety review required 12, Phase 30H 2. Metadata-only routings are provisional, not final sensitivity classifications.
- **Accepted future Tier 2 candidates (5).** `second-time-parenting`, `staying-connected-as-parents`, `calmer-evenings-after-busy-days`, `planning-family-days-out`, `simple-family-play-ideas`. All remain `blocked` in the registry; "accepted" is a review outcome only.
- **Governance gaps.** Owner, content version, grounding reviewer, reviewed date, source list and sensitivity all Missing for the five. Nothing invented; no sensitivity written to the registry.
- **Result.** 0 registry changes, 0 candidate records, 0 approved articles, `listGroundingEligibleSlugs()` returns `[]`, `AI_SOURCE_ROUTING_VERSION` unchanged at `30B-source-routing-v1`. AI runtime unchanged. Start of You article grounding remains blocked. Detail in `article-grounding-tier-2-review.md`. Next gated step: Phase 30H, not started here.

## Phase 30H annotation — wellbeing and sensitive support review

This document remains the Phase 30D record. Phase 30H adds the following.

- **Pool.** 11 verified-live wellbeing and sensitive-support records, all body-reviewed: `emotional-wellbeing-pregnancy`, `emotional-impact-of-ivf`, `perinatal-anxiety`, `anxiety-in-pregnancy`, `pregnancy-after-loss`, `the-first-trimester-emotionally`, `when-the-joy-doesnt-arrive-yet`, `chemical-pregnancy`, `trying-again-after-miscarriage`, `preparing-emotionally-for-birth`, `two-week-wait`.
- **Still excluded on editorial status.** `coping-with-the-two-week-wait`, `emotional-pressure-of-age-when-ttc`, `partner-support-when-ttc` remain `unknown`, were not body-reviewed, and stay reserved for Phase 30H when editorial-status eligibility permits.
- **Outcome.** 0 accepted future wellbeing candidates. 4 routed to Phase 30I, 7 routed to Phase 30J, 0 recorded as later health/safety review required.
- **Source-list gaps.** 3 of the 11 have no source list: `two-week-wait`, `chemical-pregnancy`, `trying-again-after-miscarriage`. Recorded as governance gaps; no sources added, rewritten or validated.
- **Governance gaps.** Owner, content version, grounding reviewer, reviewed date, `approvedBy` and `approvedAt` remain Missing for all 11. Proposed sensitivity was recorded in documentation only, never in the registry.
- **Result.** 0 registry changes, 0 candidate records, 0 approved articles, `listGroundingEligibleSlugs()` returns `[]`, `AI_SOURCE_ROUTING_VERSION` unchanged at `30B-source-routing-v1`. AI runtime unchanged. Article grounding remains blocked. Detail in `article-grounding-wellbeing-review.md`. Next gated step: Phase 30I, not started here.

## Phase 30I annotation — health-reviewed article review

This document remains the Phase 30D record. Phase 30I adds the following.

- **Pool.** 57 unique verified-live records: 53 routed by Phase 30G (49 metadata-routed plus 4 body-reviewed exclusions) and 4 routed by Phase 30H, with no overlap. All 57 re-verified as `live`, `archived: false`, `deprecated: false`, `approvalStatus: "blocked_missing_metadata"`, and all 57 body-reviewed.
- **Counting note.** The Phase 30G "Phase 30I = 49" routing count covers the metadata-routed subset only; the same document's totals block records 53. Scope difference, not a routing conflict.
- **Outcome.** 21 accepted future health-reviewed candidates (documentation-only), 33 routed to Phase 30J, 2 returned to the wellbeing stream for lower-sensitivity reconciliation (`preparing-emotionally-for-birth`, `two-week-wait`), 1 recorded as later safety adjudication required (`trying-again-after-miscarriage`).
- **Escalated 30H routing.** `pregnancy-after-loss` was routed to 30I by Phase 30H but escalated to 30J here on body review (explicit thoughts-of-self-harm escalation route). Provenance recorded rather than the earlier decision rewritten.
- **Source-list gaps.** 11 of the 57 have `hasSourceList: false`. No source was added, rewritten or validated.
- **Medical-review metadata.** All 57 name a reviewer, 48 carry a last-updated date, none carries a `medicallyReviewed` field. Captured as context only; it is not grounding-review evidence.
- **Governance gaps.** Owner, content version, grounding reviewer, reviewed date, `approvedBy` and `approvedAt` remain Missing for all 57, including the 21 accepted candidates. Proposed sensitivity is documentation-only.
- **Result.** 0 registry changes, **0 registry candidate records**, 0 approved articles, `listGroundingEligibleSlugs()` returns `[]`, `AI_SOURCE_ROUTING_VERSION` unchanged at `30B-source-routing-v1`. AI runtime unchanged. Article grounding remains blocked. Detail in `article-grounding-health-review.md`. Next gated step: Phase 30J, not started here.
