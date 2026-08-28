# Article Grounding Governance Policy

Phase 30F. Normative governance contract for the progression `blocked → candidate → approved` in `src/lib/grounding/articleGroundingRegistry.ts`.

This document defines **roles, evidence and rules only**. It appoints no named person, classifies no article, and approves nothing. Nothing here connects article content to the AI. At the time of writing: 0 candidates, 0 approved, `listGroundingEligibleSlugs()` returns `[]`, and Start of You article grounding is blocked.

Default position: **an article is invisible to the AI unless every requirement below is satisfied and recorded.** Absence of evidence is a block, never a pass.

---

## A. Content owner

**Responsibility.** The content owner is the single accountable person for an article's factual currency, tone, scope and withdrawal. They confirm that the article is still one the product is willing to stand behind, and they are the party who must act when a source breaks, guidance changes or the article is superseded.

**Eligible role.** Only a person holding an editorial accountability role for the relevant journey may be content owner, and they must accept the assignment explicitly. The following are **never** automatic owners: the article author, any git contributor, the last person to edit the file, and the medical reviewer.

**Assignment evidence.** Ownership is recorded in the registry `owner` field and must be traceable to an explicit, dated governance decision recorded in a review evidence package. An inferred owner is not an owner.

**Re-confirmation triggers.** Ownership must be re-confirmed when the owner leaves the role, when the article's content version changes, when the article's sensitivity classification changes, and at the routine review interval defined for its sensitivity level (section D).

**Missing owner.** No owner means the record stays blocked. Missing ownership can never be resolved by defaulting to a contributor, an author byline or a team name.

---

## B. Content version

**Meaning.** `contentVersion` identifies the exact article state that a human reviewed for grounding. Its only job is to make this question answerable at any later moment: *is the article currently stored the same content that passed review?*

**Format.** `<slug>@<n>` where `n` is a monotonically increasing integer minted by the editorial owner, recorded alongside a content digest of the reviewed article state at review time. The digest is what makes the check mechanical rather than trusting a label.

**Minting rule.** A new version is minted whenever the article's substantive content changes. Versions are never re-used, re-pointed or back-dated.

**Invalidating changes.** Any change to claims, guidance, numbers, thresholds, safety or urgency wording, escalation advice, sources, scope, or the addition or removal of sections invalidates the reviewed version immediately. Purely presentational changes (typography, image cropping, layout, link formatting) do not, but must be recorded as such by the owner.

**Relationship to review and approval.** `reviewedDate` and any approval attach to one specific content version. An approval is an approval **of that version only**.

**After content changes.** When content changes after review, the reviewed version no longer matches, the approval lapses automatically and the record returns to blocked. It cannot return to `approved` without a fresh review of the new version.

**`lastUpdated` is not a content version** and must never be substituted for one. No content versions are populated in Phase 30F.

---

## C. Grounding reviewer

**Responsibility.** The grounding reviewer decides whether an article is safe to use as *AI grounding material*, which is a different question from whether it is safe to publish. They assess how the content could be paraphrased, truncated, recombined or quoted out of context by a generative system, and whether that could produce unsafe, misleading or over-confident output.

**Competence.** The reviewer must understand both the subject matter and the failure modes of generative answers. For anything clinical, a suitably qualified clinical reviewer is required.

**Independence.** The reviewer must not be the sole author of the article. For `health_reviewed` and `safety_sensitive` content the reviewer must be independent of the article's authorship entirely.

**Specialist review.** Required for `health_reviewed` and `safety_sensitive` content, and for any content touching urgency, risk, red-flag symptoms, medication, infant safety or loss.

**Editorial review vs grounding review.** Editorial review asks "is this good, accurate, on-brand content for a reader on this page?". Grounding review asks "is this safe when a machine reuses fragments of it, out of page context, in answer to a question we did not anticipate?". Passing the first never implies passing the second.

**`medicallyReviewed` metadata vs grounding review.** Existing on-page medical review metadata is a publication trust signal. It is not grounding review evidence and does not appoint a grounding reviewer. No reviewer name may be written into the registry without an explicit human decision recorded in a review evidence package.

---

## D. Reviewed date

`reviewedDate` is the ISO date on which the **exact content version** named in the same record passed the relevant grounding review. It must never be substituted with publication date, `lastUpdated`, file modification time or a medical-review date.

Staleness and renewal by sensitivity:

| Sensitivity | Renewal interval | Also renews on |
| --- | --- | --- |
| low | 24 months | any invalidating content change |
| wellbeing | 18 months | any invalidating content change, tone or scope change |
| health_reviewed | 12 months | any invalidating change, or a change in external clinical guidance |
| safety_sensitive | 6 months | any invalidating change, any external guidance change, any incident |
| not_allowed | n/a | n/a |

A stale reviewed date blocks the record until review is renewed.

---

## E. Source-list validation

Phase 30E recorded 31 records with no source list. That gap stands and is unchanged by Phase 30F. **No sources were added or rewritten.**

**Requirement by sensitivity.**

| Sensitivity | Source list |
| --- | --- |
| low | Optional, but any factual claim must be attributable |
| wellbeing | Required where any factual or clinical-adjacent claim exists |
| health_reviewed | Required, validated |
| safety_sensitive | Required, validated, clinically signed off |
| not_allowed | n/a |

**Authority.** Sources must be recognised authoritative bodies for the claim being made. UK-relevant guidance (NHS, NICE, Best Start, Royal Colleges, UKHSA and equivalents) takes precedence where guidance differs by country; a non-UK source must be justified explicitly.

**Freshness.** Each source must be current at the reviewed date. Superseded or withdrawn guidance invalidates the validation.

**Broken or unavailable sources.** A source that no longer resolves, or that sits behind an inaccessible barrier, fails validation. The record returns to blocked until a replacement is validated.

**Conflicting sources.** Where sources disagree, the more conservative UK-authoritative position governs, and the conflict must be recorded in the review notes. An unresolved conflict on safety-sensitive content is a block.

**Stronger clinical and safety validation.** For `health_reviewed` and `safety_sensitive`, each source must be checked individually against the specific claim it supports, not accepted as a general reading list.

**Sign-off.** The grounding reviewer signs off source validation; for `safety_sensitive` a clinical reviewer must co-sign.

**Record.** The validation result, the date, who signed it, and any conflicts or exceptions are recorded in the review evidence package. Presence of a source list alone, whether counted here or in the registry `hasSourceList` flag, **never** means grounding approval.

---

## F. Sensitivity governance

Sensitivity is unassessed for all 206 records. **Phase 30F classifies no article.** These are the decision rules only; the classification work belongs to later review tiers.

| Level | Applies when | Supporting evidence |
| --- | --- | --- |
| `low` | Practical, non-clinical guidance with no health claim, no risk framing, no urgency wording | Full read confirms no clinical claim, no safety instruction, no red-flag content |
| `wellbeing` | Emotional or experiential content with no clinical claim | Full read confirms feelings-and-coping framing only, no diagnosis, no treatment advice |
| `health_reviewed` | Any health claim, physiological explanation, nutrition, medication, screening or condition content | Full read plus identification of every claim requiring clinical accuracy |
| `safety_sensitive` | Urgency, risk, red-flag symptoms, infant sleep or car safety, emergencies, loss, self-harm adjacency | Full read plus identification of every instruction where a wrong or truncated answer could cause harm |
| `not_allowed` | Content that must never be reused as generative grounding at any review level | Recorded rationale naming the specific harm |

**Who proposes.** The content owner or the grounding reviewer proposes a level, with a written rationale.

**Who confirms.** The grounding reviewer confirms `low` and `wellbeing`. A clinical reviewer must confirm `health_reviewed` and `safety_sensitive`. `not_allowed` is confirmed by the approval authority for safety-sensitive content and is recorded permanently.

**Ambiguity.** Ambiguity always resolves to the **stricter** level. A mixed article takes the level of its most sensitive passage; it is never split or averaged.

**`not_allowed`.** Permanently grounding-ineligible. It never becomes eligible automatically and no downstream process may promote it. Reclassification is possible only through an explicit, documented human governance decision that names the reason the original harm assessment no longer applies, requires the same reviewers as the original classification, and is recorded as a new decision rather than an edit of the old one. Until such a decision exists, the article is out of the queue permanently.

---

## G. Candidate authority

`approvalStatus: "candidate"` may be set only by the **grounding reviewer**, with the content owner's agreement recorded.

Minimum required before candidate status:

- editorial status is `live` (never draft, unknown, archived or deprecated);
- a confirmed sensitivity level that is not `not_allowed`;
- a recorded, accepted content owner;
- a minted `contentVersion` with its content digest;
- a completed per-article review record using `article-grounding-review-template.md`;
- source-list validation passed where the sensitivity level requires it.

Candidate means "eligible to be considered for approval". It is **not** approval and confers **no** runtime eligibility on its own. The eligibility helper rejects candidates.

---

## H. Approval authority

`approvalStatus: "approved"` is never automatic, never a side effect of adding metadata, and never inferable from any other field.

| Sensitivity | Approval requires |
| --- | --- |
| low | Grounding reviewer + content owner |
| wellbeing | Grounding reviewer + content owner, with tone and distress-handling sign-off |
| health_reviewed | The above + named clinical reviewer sign-off on the exact content version |
| safety_sensitive | The above + named clinical reviewer + product safety owner, both signing the exact content version, plus eval coverage of the article's topic |
| not_allowed | Approval is impossible |

`approvedBy` records the identity of the human who took the decision, and `approvedAt` the ISO timestamp at which they took it. Both are written by hand as part of the approval decision, alongside a rollback or replacement reference. Neither may be generated, back-filled or copied from another field. An approval attaches to one content version and lapses the moment that version is invalidated.

**No article is approved in Phase 30F.**

---

## I. Review evidence package

The minimum auditable package that must exist before approval can even be considered. Metadata and governance notes only; never article body content and never user content.

1. slug
2. exact content version, with digest
3. editorial status, with its evidence
4. confirmed sensitivity, with rationale
5. content owner, with acceptance evidence
6. grounding reviewer, with competence and independence note
7. reviewed date, tied to that content version
8. source-list validation result, with date and signatory
9. review notes, including any conflicts or exceptions
10. specialist or clinical sign-off where required
11. eval examples covering the article's topic where required
12. candidate decision, with who and when
13. approval decision, with who and when
14. `approvedBy`
15. `approvedAt`
16. rollback or replacement reference

Any missing item keeps the decision at `blocked`. **No item may be fabricated, inferred or filled in to complete the template.** An incomplete honest package is correct; a complete invented one is a governance failure.

---

## J. Governance decision matrix

| | low | wellbeing | health_reviewed | safety_sensitive | not_allowed |
| --- | --- | --- | --- | --- | --- |
| Content owner | Required | Required | Required | Required | n/a |
| Grounding reviewer | Required | Required | Required, independent | Required, independent | n/a |
| Specialist / clinical review | Not required | Not required | Required | Required, plus product safety owner | n/a |
| Source list | Optional, claims attributable | Required where claims exist | Required and validated | Required, validated, clinically signed | n/a |
| Eval examples | Recommended | Recommended | Required | Required | n/a |
| Candidate authority | Grounding reviewer + owner | Grounding reviewer + owner | Grounding reviewer + owner, post clinical sensitivity confirmation | Grounding reviewer + owner, post clinical sensitivity confirmation | Never |
| Approval authority | Grounding reviewer + owner | Grounding reviewer + owner | + named clinical reviewer | + named clinical reviewer + product safety owner | Never |
| Approval theoretically possible | Yes | Yes | Yes | Yes, highest bar | **No, never** |

No article is assigned to any level by this matrix in Phase 30F.

---

## K. Current state

- 0 candidate records, 0 approved records.
- Owner, content version, grounding reviewer, reviewed date and sensitivity are Missing for all 206 records.
- 31 records have no source list.
- 45 records have an unresolved editorial status (see `article-grounding-editorial-status-resolution.md`).
- `listGroundingEligibleSlugs()` returns `[]`. `AI_SOURCE_ROUTING_VERSION` is `30B-source-routing-v1`.
- Start of You article grounding remains blocked. This document does not make the library grounding-ready.

---

## L. Phase 30K initial batch — parked at the Stage 2 checkpoint

The five-article initial batch (`second-time-parenting`,
`staying-connected-as-parents`, `calmer-evenings-after-busy-days`,
`planning-family-days-out`, `simple-family-play-ideas`) completed Stage 1
evidence preparation and is parked at the Stage 2 human decision checkpoint.

Stage 2 is **DEFERRED PENDING HUMAN GOVERNANCE TEAM**. Content owner TBD,
grounding reviewer TBD, editorial/medical governance team not yet established.
Sensitivity confirmation, claim-attributability, source validation,
grounding-review sign-off and `contentVersion` authorisation are deferred. In
line with section I, nobody is temporarily assigned and no role is inferred
from founder, article author, developer, editor, git history or account
details; an incomplete honest package is correct.

All five remain `blocked_missing_metadata` with no sensitivity, owner,
reviewer, `contentVersion`, `reviewedDate`, `approvedBy` or `approvedAt`.
Human-decision events: 0. Completed source-validation events: 0. Evidence lives
in `grounding-approvals/`, and digests are regenerated only if substantive
article content actually changes.

Appointing the team is necessary but not sufficient: the external governance
evidence -> eligibility invalidation mechanism is still unresolved and must be
resolved before any Stage 4 approval, and Phases 30L and 31A have not started.

