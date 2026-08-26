# Article Grounding Tier 1 Review

Phase 30E. Review and candidate selection only. Metadata only. No Start of You article is approved, no article or article-derived content reaches the AI runtime, and nothing in this document connects articles to the AI.

No article body copy, section text, prose, takeaway, AI-ready summary, image or media is reproduced here or anywhere in the grounding layer. Only slugs, registry metadata and concise classification reasons are recorded.

## 1. Purpose

Work through the lowest-risk end of the 206-record article grounding registry created in Phase 30C and queued in Phase 30D, and record which articles could later become Tier 1 grounding *candidates*.

The purpose is explicitly not approval. A Tier 1 review conclusion is a document-level finding. It does not set `approvalStatus: "candidate"`, it never sets `approvalStatus: "approved"`, and it does not make any article readable by the AI.

## 2. Method

1. Screened all 206 records in `src/lib/grounding/articleGroundingRegistry.ts` on metadata only: slug, journey tags, topics, editorial status, archived, deprecated, source-list presence, approval status.
2. Recorded the editorial-status breakdown and held draft and unknown as separate categories.
3. Re-examined the Phase 30D Tier 1 pool (the 12 `support`-journey records) against the Tier 1 definition.
4. Re-screened the `live` set for genuinely practical, non-clinical, non-emotional subject matter, producing a shortlist for body review.
5. Read the shortlisted articles' bodies once, in the editorial datasets, for the sole purpose of assigning an exclusion category. No body content was copied, summarised for AI use, stored in the registry or written into this document.
6. Recorded catalogue-wide governance metadata gaps without inferring any missing value.

### Editorial-status breakdown of the screen

| Editorial status | Records |
| --- | --- |
| live | 110 |
| draft | 44 |
| unknown | 52 |
| **Total** | **206** |

`draft` and `unknown` are distinct categories. `unknown` is not treated as draft, archived or deprecated, because no underlying metadata supports that classification. The 52 unknown-status records remain blocked and are recorded as an unresolved editorial and governance issue for Phase 30F.

## 3. Inclusion rules

An article could be considered for Tier 1 only if all of these held:

- Editorial status is `live`.
- Not archived, not deprecated.
- Subject matter is purely product, journal, navigation or practical non-clinical orientation.
- No clinical claim, dosage, symptom interpretation, diagnosis or risk judgement.
- No safety, urgency or red-flag guidance.
- No emotional, loss, mental-health or fertility-pressure content.
- Wrong or stale wording would cause practical inconvenience only, never physical or psychological harm.

## 4. Exclusion rules

An article is excluded from Tier 1 if any of these hold. The rules were not weakened at any point in order to produce candidates.

- Editorial status is `draft` or `unknown`.
- Archived or deprecated.
- Contains sleep-safety or SIDS guidance.
- Contains car-seat, equipment or home-safety guidance.
- Contains emergency, urgency, red-flag or when-to-call guidance.
- Contains labour, birth or clinical decision-making content.
- Contains feeding, medication, nutrition or symptom guidance.
- Contains emotional wellbeing, mental health, loss or fertility-pressure content.
- Sensitivity is unassessed and the subject matter is not plainly non-clinical.

## 5. Articles reviewed

**Metadata screen:** all 206 registry records.

**Phase 30D Tier 1 pool re-examined:** 12 `support`-journey records (section 7.1).

**Body-reviewed for exclusion classification:** 6 practical shortlist articles (section 7.2).

## 6. Accepted future candidates

**None. 0 accepted Tier 1 candidates.**

Scoped conclusion, recorded exactly:

> No purely product, journal or navigation article was identified among the 206 article-grounding registry records screened in Phase 30E.

This statement applies only to the article-grounding registry reviewed in this phase. It must not be read as meaning the wider Start of You website, product, journal or navigation experience contains no product, journal or navigation guidance.

## 7. Exclusions

### 7.1 Phase 30D Tier 1 correction — the 12 support-journey records

Phase 30D's suggested review order placed "low-risk brand, navigation and product guidance (support journey, 12 records)" first. That classification read the `support` journey tag as product support. It is not: in this catalogue `support` means emotional and psychological support. The 12 records are corrected out of Tier 1 here. Phase 30D history is not rewritten; this is an audit-trailed correction on top of it.

All 12 remain blocked. All 12 are expected to return under **Phase 30H — Wellbeing & Sensitive Support Review**, where the sensitivity bar is appropriate to their subject matter.

| Slug | Phase 30D classification | Phase 30E finding | Reason it no longer qualifies for Tier 1 | State | Later review |
| --- | --- | --- | --- | --- | --- |
| `emotional-wellbeing-pregnancy` | Tier 1 (support journey) | Corrected out of Tier 1 | Emotional wellbeing content, not product guidance | Blocked | Phase 30H |
| `emotional-impact-of-ivf` | Tier 1 (support journey) | Corrected out of Tier 1 | Emotional and fertility-treatment distress content | Blocked | Phase 30H |
| `perinatal-anxiety` | Tier 1 (support journey) | Corrected out of Tier 1 | Perinatal mental-health content | Blocked | Phase 30H |
| `anxiety-in-pregnancy` | Tier 1 (support journey) | Corrected out of Tier 1 | Mental-health content | Blocked | Phase 30H |
| `pregnancy-after-loss` | Tier 1 (support journey) | Corrected out of Tier 1 | Baby-loss content | Blocked | Phase 30H |
| `the-first-trimester-emotionally` | Tier 1 (support journey) | Corrected out of Tier 1 | Emotional wellbeing content | Blocked | Phase 30H |
| `when-the-joy-doesnt-arrive-yet` | Tier 1 (support journey) | Corrected out of Tier 1 | Emotional and mood-related content | Blocked | Phase 30H |
| `chemical-pregnancy` | Tier 1 (support journey) | Corrected out of Tier 1 | Early-loss content with clinical framing; also no structured source list | Blocked | Phase 30H |
| `trying-again-after-miscarriage` | Tier 1 (support journey) | Corrected out of Tier 1 | Loss and bereavement content; also no structured source list | Blocked | Phase 30H |
| `coping-with-the-two-week-wait` | Tier 1 (support journey) | Corrected out of Tier 1 | Emotional coping content; editorial status also `unknown` | Blocked | Phase 30H |
| `emotional-pressure-of-age-when-ttc` | Tier 1 (support journey) | Corrected out of Tier 1 | Fertility-pressure and emotional content; editorial status also `unknown` | Blocked | Phase 30H |
| `partner-support-when-ttc` | Tier 1 (support journey) | Corrected out of Tier 1 | Relationship and emotional support content; editorial status also `unknown` | Blocked | Phase 30H |

### 7.2 Practical shortlist — six body-reviewed articles

These six were the only `live` records whose metadata suggested purely practical orientation. Each was body-reviewed once and each failed the Tier 1 exclusion rules. Exclusion categories only.

| Slug | Exclusion category |
| --- | --- |
| `preparing-for-baby-complete-guide` | Sleep-safety / SIDS guidance; equipment safety; labour-arrival guidance |
| `what-to-buy-for-a-new-baby` | Sleep-safety / SIDS guidance; car-seat and equipment safety |
| `the-space-your-baby-will-come-home-to` | Sleep-safety / SIDS guidance; home and sleep-environment safety |
| `hospital-bag-and-what-to-pack` | Labour-arrival and when-to-go guidance; urgency wording |
| `writing-a-birth-plan` | Birth clinical decision-making; pain relief and intervention content |
| `birth-preferences` | Birth clinical decision-making; intervention and escalation content |

### 7.3 Excluded on metadata alone

| Ground | Records |
| --- | --- |
| Editorial status `draft` | 44 |
| Editorial status `unknown` | 52 |
| Live, but clinical, health, wellbeing or safety subject matter outside Tier 1 | remainder of the 110 live set |

## 8. Per-candidate metadata gaps

There are no accepted candidates, so there are no per-candidate gaps. The catalogue-wide gaps that would have blocked any candidate are recorded instead.

| Governance field | Records with a recorded value | Records recorded as Missing |
| --- | --- | --- |
| Content owner | 0 | 206 |
| Content version | 0 | 206 |
| Grounding reviewer | 0 | 206 |
| Reviewed date | 0 | 206 |
| Assessed sensitivity level | 0 | 206 |

31 records also have no structured source list. Source-list presence is governance metadata only: having one implies nothing about grounding readiness, sensitivity, review status or approval.

No missing value was inferred from git history, file timestamps, `lastUpdated`, article authorship, medical-review metadata or contributor history. Where a value is absent it is recorded as **Missing**.

## 9. Required human decisions before any approval

1. Resolve the editorial status of the 52 `unknown` records; decide the rule that assigns status when the dataset is silent.
2. Define content-owner rules and name an owner per article.
3. Define content-version rules and record a version per article.
4. Name who holds grounding-reviewer responsibility, distinct from the medical reviewer of the page.
5. Define reviewed-date rules, including the freshness window per sensitivity level.
6. Define source-list validation requirements, not merely presence.
7. Define candidate authority: who may move a record to `candidate`, and on what evidence.
8. Define approval authority: who may move a record to `approved`, and what sign-off is recorded.
9. Define the review evidence pack required per article and where it is stored.
10. Decide whether any Tier 1 category can exist in this catalogue at all, given the finding in section 6.

## 10. Confirmation no article is approved

- 0 records carry `approvalStatus: "approved"`.
- 0 records carry `approvalStatus: "candidate"`.
- 0 records were changed in Phase 30E.
- `listGroundingEligibleSlugs()` returns `[]`.
- `articleGrounding.test.ts` and `articleGroundingDrift.test.ts` remain authoritative on all of the above.

## 11. Confirmation AI is not wired to article content

- No article dataset is imported by `articleGroundingRegistry.ts` or `articleGroundingEligibility.ts`; the drift guard asserts this.
- Nothing under `supabase/functions/` imports the grounding modules.
- No RAG, retrieval, vector search, embedding or ingestion exists in this phase.
- Source routing is unchanged; `AI_SOURCE_ROUTING_VERSION` remains `30B-source-routing-v1`.
- Prompts, modes, safety rules, escalation, answer hygiene, endpoints, Ask and companion behaviour are unchanged.
- Start of You article grounding remains **blocked**.

## 12. Recommended next phase

**Phase 30F — Grounding Governance Metadata & Editorial Status Resolution.** Not Tier 2.

The Phase 30E findings make this unavoidable: 52 records have unresolved editorial status, all 206 lack owner, content version, grounding reviewer and reviewed date, source-list validation governance is undefined, candidate and approval authority are undefined, and zero articles are approved. Reviewing more sensitive tiers before that governance exists would produce findings that cannot be acted on.

Phase 30F approves no article. The reserved sequence after it is 30G (Tier 2 low-risk general education), 30H (wellbeing and sensitive support, where the 12 corrected records return), 30I (health-reviewed), 30J (safety-sensitive / not-allowed classification), 30K (human approval and initial approved corpus), 30L (retrieval readiness review) and 31A (controlled grounded knowledge implementation). None of these is started.
