# Phase 37D — First Year content remediation

Scope: implement the reconciled Phase 37C P1/P2 remediation only. No redesign, no
route architecture change, no AI runtime change, no grounding enablement, no
lifecycle or database change, no deployment.

Phase 37C remains the historical pre-remediation audit ("AUDIT COMPLETE /
OUTCOME C — FIRST YEAR CONTENT HAS MATERIAL GAPS"). Its documents and numbers
were not edited in this phase. This document records the post-remediation state.

"Published" here means a complete ready repository record that resolves through
the existing First Year article architecture and is included correctly in the
build and sitemap. It does not mean a production deployment. Deployment = NO.

## 1. New articles

| ID | Slug | Side | Topic key | Status | 37C findings resolved |
| --- | --- | --- | --- | --- | --- |
| NC-1 | `breastfeeding-problems-and-where-to-get-help` | Baby | `feeding` | ready | P1-1, P1-3, P2-13 |
| NC-2 | `postpartum-recovery-in-the-later-first-year` | Postpartum | `postpartum-recovery` | ready | P2-11, P2-12 |

- Both records live in `src/data/firstYearArticleData.ts` and resolve through the
  existing dynamic First Year article route. No route definitions were added.
- Topic values are the existing `FirstYearArticleTopic` enum members. No new
  topic identifier was created.
- Both records are `medicallyReviewed: false` with no `reviewedBy` field. No
  reviewer, review date or approval metadata was invented.
- Sources are verified NHS / NHS Start for Life / NICE / National Breastfeeding
  Helpline pages, with GP, health visitor, NHS 111 and 999 escalation wording
  where the content warrants it.

## 2. Heroes

| Measure | Value |
| --- | --- |
| Existing First Year heroes unchanged | 26 / 26 |
| New heroes created | 2 / 2 |
| Final explicit First Year heroes | 28 / 28 |
| Hero suppressions | 0 |
| Generic fallback heroes | 0 |
| Cross-article hero duplication | 0 |

Both new heroes are article-specific images generated for this phase after
confirming no suitable unused asset existed, and are wired by slug in
`src/components/firstyear/article/firstYearArticleImages.ts`. Body-image
inventory is unchanged.

## 3. EXPAND_EXISTING — 6 / 6 implemented

| Article | Added intent | 37C finding |
| --- | --- | --- |
| `bottle-and-breastfeeding-questions` | Common feeding worries; when feeding hurts or is not working (handoff to NC-1) | P2-1 |
| `baby-development-in-the-first-year` | Early sounds, babble and back-and-forth; milestone-anxiety cross link | P2-5 |
| `introducing-solid-foods` | Moving towards family meals; self-feeding, choking vs gagging | P2-4 |
| `healing-after-birth` | Recovering from a caesarean | P2-7 |
| `body-changes-after-birth` | Leaking, urgency and continence; when periods return; recovery continuing later | P2-8, P2-9, P2-10 |
| `when-to-ask-for-help-after-birth` | Intrusive thoughts | P1-2 |

## 4. INTERNAL_LINK_ONLY and discovery — 4 / 4 implemented

The four weak-discovery articles (`teething`, `colic-and-evening-crying`,
`newborn-quirks-and-reflexes`, `newborn-skin-spots-and-marks`) each gained
contextual inbound links from phase featured guidance and month related reads.
No article body was rewritten, no link stuffing was added, and First Year card
and image identity is unchanged.

Weak-discovery First Year articles after remediation: 0.

## 5. Handoffs

| Handoff | Before | After | Notes |
| --- | --- | --- | --- |
| Pregnancy → First Year | COMPLETE | COMPLETE | Unchanged |
| First Year → Toddler (content) | PARTIAL | COMPLETE | 9–12 month phase editorial acknowledges the transition; a common question and a related destination link to the existing Toddler stage. No lifecycle-routing change. |
| First Year → Family | MISSING | PARTIAL (non-blocking, P3) | A contextual related-topic link to `/family/relationships` from the 9–12 month phase. No new Family content was created; remaining Family depth stays out of scope and non-blocking. |
| Baby ↔ Postpartum | PARTIAL | COMPLETE | NC-1 and NC-2 plus the expansions connect feeding, recovery and mental-health intents across both sides. |

## 6. Legacy milestone canonical decision — RESOLVED

`/articles/baby-milestones-first-year` is retained on its legacy route and
repositioned around its distinct intent (milestone worry, comparison and when to
relax). `baby-development-in-the-first-year` is the authoritative developmental
overview: the legacy record now links to it from its answer summary and related
links, and the inventory records `canonicalRole: "supporting"` with
`canonicalTarget` pointing at the First Year article. No merge, no redirect, no
archive. MILESTONE_REPOSITION_BLOCKER = 0.

## 7. Inventory staleness

- `first-year:when-to-ask-for-help-after-birth` corrected to live / final / keep.
- `first-year:baby-development-in-the-first-year` set to primary / low duplicate
  risk / keep.
- `legacy:baby-milestones-first-year` set to supporting with a canonical target.
- NC-1 and NC-2 added as live / final / keep records, so no new stale state was
  introduced while fixing the existing one.
- Consistency check across the final First Year inventory: no further First Year
  staleness found. Any remaining staleness in other journeys is out of Phase 37D
  scope and is not a First Year closure blocker.

## 8. Grounding registry maintenance (not grounding enablement)

| Measure | Value |
| --- | --- |
| New article slugs | 2 |
| Registry metadata records required by drift guard | 2 |
| Default-deny registry records added | 2 |
| Grounding candidates added | 0 |
| Grounding approvals added | 0 |
| Grounding eligibility additions | 0 |
| AI source-routing changes | 0 |
| `AI_SOURCE_ROUTING_VERSION` changed | NO |
| Runtime grounding behaviour changed | NO |

Both records are `approvalStatus: "blocked_draft"`, added only because existing
repository governance requires every public article slug to carry a registry
record. Registry total: 233. Approved records across the whole registry: 0.
