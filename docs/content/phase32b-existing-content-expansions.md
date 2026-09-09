# Phase 32B — Existing Content Expansion Proposals

Proposals only. No live article or structured page has been edited. No status has been changed. Implementation requires separate approval.

---

## 1. `baby-development-in-the-first-year` — milestone timing expansion

**Route:** `/first-year/development/baby-development-in-the-first-year` (LIVE_INDEXABLE, `status: "ready"`, medically reviewed by Jenny Joines, July 2026)

**Why expand rather than create:** the Phase 31 milestone cluster (C065, 69 keywords, directional volume 150,420) asks timing questions — when babies start crawling, sitting, walking, talking. This article already owns baby development in the first year but deliberately gives no ranges at all, so the timing question goes unanswered on a page that should own it. A third milestone article would cannibalise this one and `when-milestones-feel-uneven`.

**Review classification:** DEVELOPMENT_REVIEW_REQUIRED. The article is medically reviewed, so the existing reviewer name and date must not be reused for new content without a real re-review.

### Proposed change A — new section: "Roughly when things tend to happen"

Placed after "Movement and strength build gradually". Proposed wording:

> Parents often want a rough sense of timing, and there is nothing wrong with wanting that. It helps to hold these as broad ranges rather than dates. Babies reach skills in different orders and at different times, and the spread between two babies who are both doing perfectly well can be months rather than weeks.
>
> Rolling, sitting with support and then without it, some form of crawling or shuffling, pulling to stand, cruising and walking all appear across wide age bands, and plenty of babies skip a stage altogether. First words often arrive somewhere in the second half of the first year, but the range here is especially wide.
>
> The most useful thing to watch is the direction of travel: is your baby gradually adding new skills over weeks and months? That tells you more than any single comparison.

Sourcing note: this section deliberately avoids naming numeric ages, because the strongest UK sources describe development in broad bands rather than fixed dates. If the health reviewer wants explicit numeric ranges, they must come from NHS Start for Life age bands and be signed off during review.

### Proposed change B — new paragraph on corrected age

Placed inside the same section:

> If your baby was born prematurely, their developmental age is worked out from your original due date rather than their birth date, until they are two years old. That applies to the routine reviews too.

Source: NHS, Baby reviews — https://www.nhs.uk/baby/babys-development/height-weight-and-reviews/baby-reviews/

### Proposed change C — strengthen "Practical ideas you can try"

Add specificity to the existing review reference:

> Your health visiting team offers a new baby review at around ten to fourteen days, a physical check at six to eight weeks, a review between nine and twelve months and another at two years. Before the nine-to-twelve-month and two-year reviews you will be sent the Ages and Stages Questionnaire to complete at home. Your baby's red book is where weight, height, vaccinations and development are recorded, and it is worth taking to appointments.
>
> You do not need to wait for a review. If something about your baby's development is on your mind, contact your health visitor or GP whenever it occurs to you.

Source: NHS, Baby reviews, as above.

### Proposed key-takeaway additions

- Timing varies widely, and skills are often reached in different orders.
- For babies born prematurely, developmental age is counted from the original due date until age two.

### Not proposed

Milestone charts, month-by-month checklists, numeric deadlines, percentile framing, or any "should have by now" wording.

---

## 2. `when-milestones-feel-uneven` — escalation pathway clarification

**Route:** `/first-year/development/when-milestones-feel-uneven` (LIVE_INDEXABLE, `status: "ready"`, medically reviewed)

**Proposed change:** a short, clearly headed paragraph confirming that a concern can be raised at any time, through a health visitor, GP or local baby clinic, and does not need to wait for a scheduled review or reach any threshold first. Source: NHS, Baby reviews.

**Review classification:** DEVELOPMENT_REVIEW_REQUIRED.

**Not proposed:** any list of developmental warning signs, or wording linking a late skill to a specific condition.

---

## 3. Month pages — teething age context

**Files:** `src/data/firstYearMonthData.ts` (month guides `5-months` through `9-months`, exact months to be confirmed at implementation)

**Proposed change:** one or two sentences of age context per relevant month, plus a link to the teething article. Example shape:

> Some babies get their first tooth around now, and others are nowhere near. A little extra dribbling, chewing and unsettled sleep can come with it.

No teething symptom list, no medicines wording and no article body is duplicated into the month page. The evergreen article stays the owner.

**Review classification:** LOW_RISK_GENERAL, conditional on the wording staying at this level.

---

## 4. Month pages — sleep change age context

**Files:** `src/data/firstYearMonthData.ts` (months where new physical skills commonly emerge)

**Proposed change:** one sentence acknowledging that sleep can become unsettled while a baby is working on a new skill, plus a link to the sleep-change article. No safe-sleep instructions are restated on the month page, and no regression age is named as an expected event.

**Review classification:** LOW_RISK_GENERAL.

---

## Dependency

Items 3 and 4 depend on the teething and sleep articles existing as published pages. They cannot be implemented while those drafts remain documentation-only, so they are sequenced after human review and publication approval.
