# Phase 32B — First Year Core Gap Evidence Pack

Stage 32B.1. Documentation only. No runtime record, route, sitemap, SEO, AI, grounding, journal, memory, voice, database or deployment change was made while producing this pack.

## Scope arithmetic

Phase 31 cluster records reviewed = 6 · consolidated First Year intents reviewed = 5 · unrelated clusters reviewed = 0.

| Record | Working title | Consolidated intent |
| --- | --- | --- |
| C067 | Teething | Teething |
| C059 | Colic and evening crying | Colic |
| C058 | Colic remedies and gripe water | Colic (sub-intent) |
| C072 | Starting solids and weaning | Weaning / solids |
| C062 | Sleep regressions | Sleep regressions |
| C065 | Milestone timing questions | Milestone timing |

C059 and C058 are deliberately consolidated into one colic owner. No separate gripe-water page is proposed.

## Repository truth (recomputed)

`src/data/firstYearArticleData.ts` contains **16** article records, every one `status: "ready"`. No record covers teething, colic or introducing solids. Sleep is held by `newborn-sleep-expectations` and `helping-your-baby-settle`; development by `baby-development-in-the-first-year` and `when-milestones-feel-uneven`. Thirteen month pages (`newborn` through `12-months`), phase pages and eight topic pages already carry age-specific context. No legacy Pregnancy record answers these First Year intents.

## Publication architecture finding

`SAFE FIRST YEAR DRAFT CAPABILITY: NO`

- `status: "draft" | "ready"` exists; `scripts/generate-sitemap.ts` only emits `ready` articles, and topic/related listings suppress draft links.
- However `src/pages/firstyear/FirstYearArticle.tsx` renders **any** matching record at its direct URL with a self-referencing canonical and no `noindex`. A draft record is therefore publicly reachable and indexable.
- Adding noindex or preview gating would be SEO/route architecture change, which this phase forbids.

Consequence: runtime records added = 0, and all new copy stays in `docs/content/phase32b-article-drafts.md`.

---

## Teething

### Phase 31 intent
C067 · NEW_ARTICLE_GAP · representative keyword "when do babies start teething" (14,800) · 35 keywords · directional cluster volume 48,080 · P0 · cannibalisation LOW · Phase 31 review level LOW_RISK_GENERAL. Competitor owner `/first-year/teething`.

### Existing Start of You owner
None. No teething record exists in any dataset; month pages mention teeth only in passing. Coverage classification NOT_PRESENT is confirmed.

### UK sources

| Organisation | Title | URL | Checked | Claims supported |
| --- | --- | --- | --- | --- |
| NHS | Baby teething symptoms | https://www.nhs.uk/baby/babys-development/teething/baby-teething-symptoms/ | 9 Sep 2026 (page last reviewed 14 May 2026) | Wide timing range including before 4 months and after 12 months; symptom list; temperature below 38C wording; no evidence teething causes diarrhoea; order teeth typically appear; advice to seek medical advice for concerning symptoms |
| NHS | Tips for helping your teething baby | https://www.nhs.uk/baby/babys-development/teething/tips-for-helping-your-teething-baby/ | 9 Sep 2026 (page last reviewed 23 Oct 2025) | Teething rings and chilling rather than freezing; never tie a ring around the neck; supervised chewing on healthy foods from 6 months; paracetamol from 2 months and ibuprofen from 3 months, no aspirin under 16; lack of evidence for teething gels; homeopathic teething products not recommended; comfort measures; dribble-rash care; registering with a dentist and brushing with fluoride toothpaste from the first tooth |

### Supported factual points
Teething timing varies widely. Symptoms may be absent, mild or short-lived. Recognised signs include sore red gum, slightly raised temperature under 38C, one flushed cheek, facial rash, ear rubbing, extra dribbling, chewing, fretfulness and unsettled sleep. Comfort options are teething rings, gum rubbing, distraction and, for pain, sugar-free paracetamol or ibuprofen within the stated age limits. Tooth care begins with the first tooth.

### Safety / escalation boundaries
Teething is not an explanation for illness. NHS wording supports only a slightly raised temperature below 38C; a fever of 38C or above is a separate matter and follows NHS fever guidance for under-5s. There is no evidence teething causes diarrhoea. Parents are told to get medical advice from NHS 111 or a GP for any symptom that concerns them. Teething gels are second choice at best; homeopathic teething products are not recommended; never freeze a teething ring or tie one around the neck; always supervise chewing because of choking risk.

### Claims excluded
Fixed teething timetables presented as deadlines; teething as a cause of fever, diarrhoea, vomiting, nappy rash or significant illness; amber teething necklaces or other unlicensed products; dosing figures for paracetamol or ibuprofen; claims that any remedy reliably relieves teething pain.

### Cannibalisation finding
LOW. No existing owner. Month pages may later carry a one-line age-context link only.

### Recommended content action
PRIMARY CONTENT ACTION: NEW_ARTICLE (`/first-year/care-and-safety/teething`).
SUPPORTING STRUCTURED-PAGE ACTION: EXPAND_MONTH_PAGE — brief age-context sentence plus link on the months where teeth commonly appear.

Review classification: escalated from LOW_RISK_GENERAL to **HEALTH_REVIEW_REQUIRED**, because the draft materially distinguishes teething signs from illness and refers to pain-relief medicines and age limits.

### Evidence sufficient to build: YES

---

## Colic

### Phase 31 intent
C059 · NEW_ARTICLE_GAP · "colic" (18,100) · 10 keywords · directional volume 38,050 · P0 · LOW · HEALTH_REVIEW_REQUIRED. Consolidated with C058 · NEW_ARTICLE_GAP · "gripe water" (27,100) · 30 keywords · directional volume 52,350 · P1 · LOW · SAFETY_REVIEW_REQUIRED.

### Existing Start of You owner
None. Crying is touched on inside settling and newborn content but no record owns colic or the remedies question.

### UK sources

| Organisation | Title | URL | Checked | Claims supported |
| --- | --- | --- | --- | --- |
| NHS | Colic | https://www.nhs.uk/conditions/colic/ | 9 Sep 2026 (page last reviewed 26 Apr 2022, stated next review 26 Apr 2025 has passed; page live) | Description of colic including crying more than 3 hours a day, 3 days a week, for at least a week in an otherwise healthy baby; associated signs; typical onset in the first weeks and easing by 3 to 4 months; other possible reasons for crying; soothing measures; anti-colic drops, herbal and probiotic remedies not recommended and no evidence they help; avoid spinal manipulation and cranial osteopathy; non-urgent NHS 111/GP triggers; 999/A&E triggers; Cry-sis helpline; cause unknown, possibly digestion or cows' milk allergy |
| NHS | Soothing a crying baby | https://www.nhs.uk/baby/caring-for-a-newborn/soothing-a-crying-baby/ | 9 Sep 2026 (page last reviewed 22 Apr 2026) | Afternoon and evening crying peaks; crying tends to increase around 2 weeks and reduce around 3 months; calming approaches; crying during feeds and reflux; crying that differs from normal can signal illness; emergency signs |

### Supported factual points
Crying commonly peaks in the afternoon and evening, increases around two weeks and eases around three months. Colic describes frequent, hard-to-soothe crying in an otherwise healthy baby, often with clenched fists, a red face, drawn-up knees or wind, usually starting in the first weeks and settling by three to four months. The cause is not known. Comfort measures include holding, upright feeding, winding, gentle rocking, a warm bath and quiet background noise. Feeding continues as usual and a breastfeeding parent does not need to change their diet.

### Safety / escalation boundaries
NHS 111 or a GP if you are worried about the crying, nothing is working, you are finding it hard to cope, your baby is not growing or gaining weight as expected, or colic symptoms continue after four months. 999 or A&E for a weak or high-pitched cry, or a cry that does not sound like their normal cry, and for the NHS emergency signs of serious illness. Trust-your-instincts wording is retained. Cry-sis is named as UK support.

### Claims excluded
Diagnosing colic from a symptom list; presenting gripe water, anti-colic drops, herbal preparations or probiotics as treatment; cranial osteopathy or spinal manipulation; claims about a specific cause; advice to change a breastfeeding parent's diet; any soothing technique outside the NHS list, and anything that conflicts with safe-sleep guidance.

### Cannibalisation finding
LOW, and one owner absorbs the gripe-water sub-intent. Creating a second remedies page would split one intent and risk foregrounding products the NHS does not recommend.

### Recommended content action
PRIMARY CONTENT ACTION: NEW_ARTICLE (`/first-year/care-and-safety/colic-and-evening-crying`). No supporting structured-page action required.

Review classification: **SAFETY_REVIEW_REQUIRED** (stricter of the two consolidated records, and appropriate given the remedies and escalation content).

### Evidence sufficient to build: YES

---

## Weaning / introducing solid foods

### Phase 31 intent
C072 · NEW_ARTICLE_GAP · "baby led weaning" (8,100) · 7 keywords · directional volume 15,130 · P0 · LOW · SAFETY_REVIEW_REQUIRED. UK meaning applies: introducing complementary solid foods, not stopping breastfeeding.

### Existing Start of You owner
None. `newborn-feeding-rhythms` and `bottle-and-breastfeeding-questions` cover milk feeding only. Month pages mention the six-month point without owning the intent.

### UK sources

| Organisation | Title | URL | Checked | Claims supported |
| --- | --- | --- | --- | --- |
| NHS | Your baby's first solid foods | https://www.nhs.uk/baby/weaning-and-feeding/babys-first-solid-foods/ | 9 Sep 2026 (page last reviewed 19 Feb 2026) | Start around 6 months alongside breast milk or first infant formula; reasons for waiting; the three readiness signs shown together; behaviours commonly mistaken for readiness; solids do not make a baby sleep through; start with small amounts before a milk feed; texture progression; no added salt or sugar; go at the baby's pace and do not force; repeated exposure to new foods; premature babies should ask a health visitor or GP |
| NHS | Food allergies in babies and young children | https://www.nhs.uk/baby/weaning-and-feeding/food-allergies-in-babies-and-young-children/ | 9 Sep 2026 (page last reviewed 22 Oct 2024) | Introduce allergenic foods one at a time from around 6 months; the listed allergenic foods and safe forms (ground nuts, no raw or lightly cooked egg without a red lion stamp); speak to a GP or health visitor first where there is existing allergy, eczema or family history; keep tolerated foods in the diet; delaying peanut and hen's egg beyond 6 to 12 months may increase risk; signs of allergic reaction and timing; anaphylaxis is a medical emergency; do not cut out a major food group without advice |

### Supported factual points
Solids begin around six months alongside milk, which remains a major source of energy and nutrients. Readiness is judged on three signs appearing together: sitting with a steady head, coordinating eyes, hands and mouth, and swallowing rather than spitting food out. Chewing fists, extra night waking and wanting more milk are not readiness signs. Textures progress from purée or soft pieces towards mashed, lumpy and finger foods. Allergenic foods are introduced one at a time from around six months in safe forms and kept in the diet once tolerated. No added salt or sugar. Appetite varies day to day.

### Safety / escalation boundaries
Always supervise a baby who is eating. Choking first aid is linked out to the NHS page rather than reproduced. Nuts are served ground or as butters; eggs without a red lion stamp are not eaten raw or lightly cooked; shellfish is not served raw or lightly cooked. Existing allergy, eczema or a family history of allergic conditions means speaking to a GP or health visitor before introducing allergenic foods. Signs of a reaction warrant medical advice; anaphylaxis is an emergency needing 999. Premature babies need individual advice. Major foods are never cut out without professional advice.

### Claims excluded
Meal plans, portion charts and schedules presented as rules; a definitive gagging-versus-choking checklist (the draft describes the difference only in the general terms NHS supports and links to choking first aid); claims that any approach prevents allergy; claims that solids improve sleep; baby-led weaning presented as safer or better than spoon feeding, which the NHS does not state; supplement or product recommendations.

### Cannibalisation finding
LOW. Distinct from milk-feeding articles. The article owns the concept; month pages around six months may later carry a short age-context link.

### Recommended content action
PRIMARY CONTENT ACTION: NEW_ARTICLE (`/first-year/feeding/introducing-solid-foods`).
SUPPORTING STRUCTURED-PAGE ACTION: none required in this phase; optional month-page linking is deferred to Phase 32F.

Review classification: **SAFETY_REVIEW_REQUIRED**.

### Evidence sufficient to build: YES

---

## Sleep regressions

### Phase 31 intent
C062 · COVERED_PARTIAL · "sleep regression ages" (9,900) · 35 keywords · directional volume 50,510 · P0 · cannibalisation MEDIUM · LOW_RISK_GENERAL. Closest owner `/first-year/sleep/helping-your-baby-settle`, LIVE_INDEXABLE.

### Existing Start of You owner
`helping-your-baby-settle` owns settling technique and `newborn-sleep-expectations` owns newborn sleep. Neither answers "why has my baby's sleep suddenly changed at this age", which is the searched intent.

### UK sources

| Organisation | Title | URL | Checked | Claims supported |
| --- | --- | --- | --- | --- |
| NHS | Helping your baby to sleep | https://www.nhs.uk/baby/caring-for-a-newborn/helping-your-baby-to-sleep/ | 9 Sep 2026 | Sleep patterns vary from birth and change; day and night distinction; bedtime routine; typical sleep amounts vary by age; baby sleeps in the same room as you for at least the first 6 months to reduce the risk of SIDS; sling safety and Lullaby Trust reference |
| NHS | Your baby's first solid foods | https://www.nhs.uk/baby/weaning-and-feeding/babys-first-solid-foods/ | 9 Sep 2026 | Extra night waking is not a readiness sign for solids, and starting solids will not make a baby sleep through the night |
| NHS | Baby development in the first year (existing repository source set) | https://www.nhs.uk/start-for-life/baby/baby-development/ | 9 Sep 2026 | New skills and development progress across a wide range of ages, supporting the "development and change can disturb settled sleep" framing at a general level |

### Supported factual points
Sleep needs and patterns vary between babies and change through the year. Consistent, calm routines and a clear day/night distinction support sleep. Room-sharing for at least the first six months reduces SIDS risk. Starting solids does not make a baby sleep through the night. Illness, teething discomfort, unfamiliar surroundings and new skills are ordinary reasons a settled pattern can change.

### Safety / escalation boundaries
Safe-sleep guidance is preserved without alteration and the article points to NHS safe-sleep and Lullaby Trust guidance rather than restating it as advice of its own. Persistent worry about sleep, feeding or a baby who seems unwell goes to a health visitor, GP or NHS 111.

### Claims excluded
"Sleep regression" presented as a diagnosis or an established developmental stage; guaranteed regressions at 4, 6, 8, 10 or 12 months; fixed durations such as "lasts two to six weeks"; "every baby goes through this"; sleep-training methods presented as recommended; any settling suggestion that would conflict with safe-sleep guidance.

### Evidence uncertainty recorded
No NHS, NICE or RCPCH source uses the term "sleep regression" or supports fixed regression ages. The draft therefore owns the term explicitly as a common parent phrase and answers the underlying question — why sleep changes — from sourced material. This is a framing constraint, not an evidence gap, so the gate remains YES.

### Cannibalisation finding
MEDIUM, managed. The new article owns the concept only; `helping-your-baby-settle` keeps settling technique and `newborn-sleep-expectations` keeps newborn patterns. Cross-links go both ways. No per-age regression articles are created.

### Recommended content action
PRIMARY CONTENT ACTION: NEW_ARTICLE (`/first-year/sleep/when-sleep-suddenly-changes`).
SUPPORTING STRUCTURED-PAGE ACTION: EXPAND_MONTH_PAGE — brief age-context sentence and internal link on relevant month pages, no duplicated body.

Review classification: **LOW_RISK_GENERAL**, held rather than escalated because the draft references safe-sleep guidance rather than issuing substantive safe-sleep instructions of its own.

### Evidence sufficient to build: YES

---

## Milestone timing

### Phase 31 intent
C065 · COVERED_PARTIAL · "when do babies start crawling" (14,800) · 69 keywords · directional volume 150,420 · P0 · cannibalisation MEDIUM · NEEDS_HUMAN_EDITORIAL_REVIEW. Closest owner `/first-year/development/baby-development-in-the-first-year`, LIVE_INDEXABLE.

### Existing Start of You owner
Two live, indexable, medically reviewed articles: `baby-development-in-the-first-year` and `when-milestones-feel-uneven`, both in the Development and Milestones topic, plus 13 month pages and the phase pages.

### Section 12 cannibalisation test
- **A. Is the intent substantially answered?** Yes in substance. `baby-development-in-the-first-year` covers movement, senses, play, communication, overlap with feeding and sleep, and routine reviews. `when-milestones-feel-uneven` covers uneven progress and when to raise a concern.
- **B. Are the pages live and indexable?** Yes. Both are `status: "ready"`, routed, self-canonical and in the sitemap.
- **C. Does one need expansion rather than another page?** Yes. The searched question is timing — "when do babies start crawling, sitting, walking, talking" — and the existing article deliberately avoids naming any ranges at all.
- **D. Is there a genuinely distinct uncovered intent?** No. The timing question is a missing section inside an existing owner, not a separate subject.

D = NO, so no third milestone article is created. One cannibalising page prevented.

### UK sources

| Organisation | Title | URL | Checked | Claims supported |
| --- | --- | --- | --- | --- |
| NHS | Baby reviews: height, weight and development reviews | https://www.nhs.uk/baby/babys-development/height-weight-and-reviews/baby-reviews/ | 9 Sep 2026 | The UK review pathway: new baby review at 10 to 14 days, 6 to 8 week check, 9 to 12 month review, 2 year review; ASQ-3 questionnaire; the red book (PCHR); you can contact a health visitor or GP at any time with a concern; for babies born prematurely, developmental age is calculated from the original due date until age 2 |
| NHS Start for Life | Baby development | https://www.nhs.uk/start-for-life/baby/baby-development/ | 9 Sep 2026 | Development described in broad age bands rather than fixed dates; babies develop at different rates |

### Supported factual points
Development is described in ranges, not dates. Babies reach skills in different orders and at different times. The UK offers scheduled reviews at defined points, the red book records progress, and concerns can be raised with a health visitor or GP at any time, not only at a review. Corrected age applies for babies born prematurely until age 2.

### Safety / escalation boundaries
Encourage raising concerns early and without waiting for a review; never imply a concern must reach a threshold first. No screening, scoring or reassurance that would substitute for a professional assessment.

### Claims excluded
Fixed milestone deadlines; milestone charts or checklists framed as pass or fail; percentile-style ranking; "should have by now" phrasing; any statement that a specific late skill indicates a specific condition.

### Cannibalisation finding
HIGH if a new article were built; resolved by expansion instead.

### Recommended content action
PRIMARY CONTENT ACTION: EXPAND_EXISTING_ARTICLE — add a broad-ranges section and a corrected-age note to `baby-development-in-the-first-year`, and strengthen the escalation pathway in `when-milestones-feel-uneven`. New milestone articles = 0.
SUPPORTING STRUCTURED-PAGE ACTION: none in this phase.

Review classification: escalated from NEEDS_HUMAN_EDITORIAL_REVIEW to **DEVELOPMENT_REVIEW_REQUIRED**, because the proposed expansion adds age-range and developmental-concern wording to live, medically reviewed articles.

### Evidence sufficient to build: YES (as an expansion proposal only)

---

## Cross-topic overlaps

- Teething and sleep: teething discomfort is one reason sleep changes. The sleep article names it in a clause and links to the teething article; the teething article does not restate sleep guidance.
- Colic and sleep: colic sits in the newborn window and links to newborn sleep expectations, not to the sleep-change article.
- Solids and sleep: NHS wording that solids do not make babies sleep through appears in both drafts, sourced identically, and is the single point of intentional overlap.
- Milestones and everything else: the development articles keep all ranges; no other draft states a developmental age range.

## Month-page ownership

Evergreen articles own the concepts. Month pages own only "what this may look like around this age" plus a link. No article body is duplicated into a structured page. Proposed month-page touches are limited to teething and sleep change and are recorded as proposals in `phase32b-existing-content-expansions.md`.

## Evidence uncertainties

1. The NHS colic page states a next review date of 26 April 2025, which has passed, while remaining live. Its claims are corroborated by the NHS soothing page reviewed 22 April 2026. Flagged for human review.
2. No UK authority uses the term "sleep regression" or endorses fixed regression ages. Handled by framing, recorded above.
3. Gagging versus choking is described only in general supported terms with a link to NHS choking first aid; no UK source was used to build a detailed differentiation checklist.
4. Search volumes are directional figures from a single historical competitor export and are not Start of You performance data.

## Editorial / health-review requirements

| Item | Final review classification |
| --- | --- |
| Teething | HEALTH_REVIEW_REQUIRED (escalated) |
| Colic | SAFETY_REVIEW_REQUIRED |
| Weaning / solids | SAFETY_REVIEW_REQUIRED |
| Sleep regressions | LOW_RISK_GENERAL |
| Milestone timing expansion | DEVELOPMENT_REVIEW_REQUIRED (escalated) |

No human review has taken place. No item may be described as medically reviewed, safety reviewed or editorially reviewed, and no reviewer name or review date may be added, until a real review happens.

## Image requirements

| Item | Hero required | Body images required | Reusable asset available | New asset required |
| --- | --- | --- | --- | --- |
| Teething | Yes | No | Topic fallback only | Yes |
| Colic | Yes | No | Topic fallback only | Yes |
| Solids | Yes | Optional (one) | Topic fallback only | Yes |
| Sleep change | Yes | No | Topic fallback only | Yes |
| Milestone expansion | No | No | Existing hero retained | No |

No imagery was generated in this phase. Any later imagery should be warm, human, editorial and realistic, not staged clinical stock.

## Publication recommendation

Hold. Four drafts and one expansion proposal are complete and evidence-backed, but safe draft capability is NO, so nothing enters the runtime datasets. Recommended order for human review: colic and solids first (both safety), then teething, then the milestone expansion, then the sleep article. Publication is a separate, explicitly approved step.
