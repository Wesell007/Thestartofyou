# Article grounding — Phase 30H wellbeing and sensitive support review

Review and classification only. No article was approved, no registry record was changed, no article body or article-derived content reached the AI runtime, and no RAG, retrieval, vector search, embedding, ingestion or chunking exists. `AI_SOURCE_ROUTING_VERSION` remains `30B-source-routing-v1` and `listGroundingEligibleSlugs()` returns `[]`.

This document is metadata-only. It reproduces no article paragraph, section, takeaway, quotation, AI-ready summary, image or media. Classification reasons are concise and descriptive.

## 1. Purpose

Phase 30H reviews the verified-live wellbeing and sensitive-support content that earlier tiers deliberately held back, and decides for each record whether it is genuinely wellbeing-level material or must be escalated to a stricter later phase. It does not approve anything and does not connect any article to AI.

## 2. Review pool and eligibility

Registry state at execution, re-verified against `src/lib/grounding/articleGroundingRegistry.ts`: 206 total records, 117 live, 44 draft, 45 unknown. No discrepancy against the Phase 30G close.

Phase 30H review pool — 11 verified-live records, all `editorialStatus: "live"`, `archived: false`, `deprecated: false`, `approvalStatus: "blocked_missing_metadata"`:

1. `emotional-wellbeing-pregnancy`
2. `emotional-impact-of-ivf`
3. `perinatal-anxiety`
4. `anxiety-in-pregnancy`
5. `pregnancy-after-loss`
6. `the-first-trimester-emotionally`
7. `when-the-joy-doesnt-arrive-yet`
8. `chemical-pregnancy`
9. `trying-again-after-miscarriage`
10. `preparing-emotionally-for-birth`
11. `two-week-wait`

All 11 received body review. None was classified on title or topic alone.

### 2.1 Subject-matter records currently blocked by unresolved editorial status

Three support records remain `editorialStatus: "unknown"` and sit entirely outside the review pool. They were not body-reviewed, no live status was inferred, and they are not counted inside the 11:

- `coping-with-the-two-week-wait`
- `emotional-pressure-of-age-when-ttc`
- `partner-support-when-ttc`

They stay reserved for Phase 30H when editorial-status eligibility permits, and remain blocked until authoritative editorial-status evidence exists.

## 3. Wellbeing inclusion rules

A record may be recorded as an accepted future wellbeing candidate only where body review confirms its meaningful purpose is supportive, reflective or emotionally educational without crossing materially into clinical, diagnostic, crisis, treatment or high-consequence safety guidance. Potentially acceptable material: normal emotional adjustment, non-clinical reassurance, emotional preparation, reflective coping, relationship-aware support, supportive framing of difficult experiences, practical emotional self-care, and encouraging appropriate help-seeking without assessing or diagnosing the reader.

A supportive tone is not itself qualifying. Wellbeing is never used as a lower-risk label for clinically meaningful content.

## 4. Health and safety escalation rules

Route to **Phase 30I — health-reviewed article review** where meaningful content includes recognised mental-health conditions, symptom or diagnostic framing, perinatal mental-health conditions, fertility-treatment clinical information, miscarriage or pregnancy-loss medical management, clinical recovery information, investigations, medication, treatment pathways, referral thresholds or condition management.

Route to **Phase 30J — safety-sensitive / not-allowed classification** where meaningful content includes self-harm, suicide, crisis, immediate danger, crisis intervention, emergency escalation, safeguarding, abuse, serious deterioration, urgent pregnancy-loss warning signs, or other high-consequence guidance where a wrong response could materially delay urgent care. A record carrying both wellbeing support and meaningful safety-critical guidance routes to 30J, regardless of its primary topic.

Where an article is clearly beyond wellbeing but the 30I/30J distinction cannot be made confidently, the outcome is recorded as **later health/safety review required**. Nothing is guessed.

## 5. Articles body-reviewed

All 11. Current approval status for every record is `blocked_missing_metadata`; review basis for every record is body-reviewed. Next action for every record is the same: remain blocked, carry forward to the named later phase, and satisfy the Phase 30F governance requirements before any candidate consideration.

| # | Slug | Title | Journey | Topics | Editorial | Source list | Proposed sensitivity | Decision | Reason | Later phase |
|---|---|---|---|---|---|---|---|---|---|---|
| 1 | `emotional-wellbeing-pregnancy` | Emotional wellbeing in pregnancy | pregnancy, support | feelings | live | present | safety_sensitive | Excluded from wellbeing | Antenatal anxiety and antenatal depression as conditions, specialist referral, and explicit self-harm and crisis escalation routes | 30J |
| 2 | `emotional-impact-of-ivf` | The emotional impact of IVF | ivf, support | — | live | present | safety_sensitive | Excluded from wellbeing | Substantial fertility-treatment clinical framing plus explicit suicide and self-harm crisis routing | 30J |
| 3 | `perinatal-anxiety` | Perinatal anxiety | support, pregnancy, postpartum | — | live | present | safety_sensitive | Excluded from wellbeing | Named condition with diagnostic framing, treatment and medication, referral thresholds, and urgent/crisis escalation | 30J |
| 4 | `anxiety-in-pregnancy` | Anxiety in pregnancy | pregnancy, support | feelings | live | present | safety_sensitive | Excluded from wellbeing | Clinical antenatal anxiety framing, symptoms, medication and referral, plus a dedicated urgent-support section including thoughts of self-harm | 30J |
| 5 | `pregnancy-after-loss` | Pregnancy after loss | pregnancy, support | feelings | live | present | health_reviewed | Excluded from wellbeing | Loss context with scan and monitoring expectations and perinatal mental-health referral; no crisis-level escalation content identified | 30I |
| 6 | `the-first-trimester-emotionally` | The first trimester emotionally | pregnancy, support | feelings | live | present | safety_sensitive | Excluded from wellbeing | Otherwise adjustment-focused, but carries an explicit self-harm and urgent out-of-hours escalation route | 30J |
| 7 | `when-the-joy-doesnt-arrive-yet` | When the joy doesn't arrive yet | pregnancy, support | feelings | live | present | safety_sensitive | Excluded from wellbeing | Antenatal depression framing and a dedicated crisis section with emergency and urgent-care routing | 30J |
| 8 | `chemical-pregnancy` | Chemical pregnancy | trying-to-conceive, support | — | live | **absent** | safety_sensitive | Excluded from wellbeing | Early-loss medical explanation plus urgent warning signs (heavy bleeding, severe pain) where a wrong response could delay care | 30J |
| 9 | `trying-again-after-miscarriage` | Trying again after miscarriage | trying-to-conceive, support | — | live | **absent** | health_reviewed | Excluded from wellbeing | Medical timing guidance after miscarriage, recurrent-loss and later-loss caveats, specialist input; no crisis content identified | 30I |
| 10 | `preparing-emotionally-for-birth` | Preparing emotionally for birth | pregnancy | feelings | live | present | health_reviewed | Excluded from wellbeing | Severe birth fear (tokophobia) and birth trauma as recognised conditions with referral pathways into perinatal services | 30I |
| 11 | `two-week-wait` | The two-week wait | trying-to-conceive | — | live | **absent** | health_reviewed | Excluded from wellbeing | Early-pregnancy symptom and bleeding interpretation in a decision-sensitive window; not purely emotional coping | 30I |

## 6. Accepted future wellbeing candidates

**0.**

No record in the Phase 30H pool met the wellbeing inclusion standard on body review. Every one carried meaningful clinical or safety-critical material alongside its supportive framing, which the inclusion standard treats as disqualifying for the wellbeing level.

## 7. Phase 30I health-review routing

**4 records:** `pregnancy-after-loss`, `trying-again-after-miscarriage`, `preparing-emotionally-for-birth`, `two-week-wait`.

Each carries meaningful health content — pregnancy-loss context and monitoring, post-miscarriage medical timing, recognised birth-fear and trauma conditions with referral routes, or early-pregnancy symptom interpretation — without crossing into crisis or emergency-escalation material.

## 8. Phase 30J safety-sensitive routing

**7 records:** `emotional-wellbeing-pregnancy`, `emotional-impact-of-ivf`, `perinatal-anxiety`, `anxiety-in-pregnancy`, `the-first-trimester-emotionally`, `when-the-joy-doesnt-arrive-yet`, `chemical-pregnancy`.

Six carry explicit self-harm, suicide or crisis escalation routing; `chemical-pregnancy` carries urgent pregnancy-loss warning signs. Under the conservative rule, the presence of meaningful safety-critical guidance overrides the wellbeing primary topic.

## 9. Ambiguous later health/safety routing

**0 records.** No case required the "later health/safety review required" outcome: in each record the presence or absence of crisis-level material was determinable on body review.

## 10. Per-candidate governance and source gaps

There are no accepted candidates in this phase, so no per-candidate governance package is recorded. For completeness, the governance position across all 11 reviewed records is unchanged and unimproved:

- content owner — Missing for all 11
- content version — Missing for all 11
- grounding reviewer — Missing for all 11
- reviewed date — Missing for all 11
- `approvedBy` / `approvedAt` — Missing for all 11
- sensitivity — unassessed in the registry for all 11; the proposed sensitivity in section 5 is documentation-only

Source-list gaps re-verified at execution: **3 records** with `hasSourceList: false` — `two-week-wait`, `chemical-pregnancy`, `trying-again-after-miscarriage`. This matches the Phase 30E finding for the latter two and adds `two-week-wait`. The other eight have `hasSourceList: true`. No source was added, rewritten or validated in this phase, and source-list presence implies nothing about grounding readiness.

Existing `medicallyReviewed` flags, medical reviewer names, article authorship, `lastUpdated` values and git history were not treated as grounding governance evidence.

## 11. Confirmation no article is approved or AI-connected

- Registry records changed: 0. `src/lib/grounding/articleGroundingRegistry.ts` was not edited.
- Registry total 206; editorial split 117 live / 44 draft / 45 unknown.
- Candidate records: 0. Approved records: 0.
- `listGroundingEligibleSlugs()` returns `[]`.
- No article body or article-derived content reached the AI runtime. No RAG, retrieval, vector search, embeddings, ingestion, chunking or runtime summaries exist.
- No prompt, mode, safety rule, endpoint, source-routing, renderer, Ask, companion, schema, route or SEO change. No AI version constant changed; `AI_SOURCE_ROUTING_VERSION` remains `30B-source-routing-v1`.
- An accepted future wellbeing candidate would be a documentation-only outcome; this phase produced none.

## 12. Recommended next phase

**Phase 30I — health-reviewed article review** is safe to plan next, and now has a defined intake of 4 records from this phase on top of its existing Phase 30G routing. Phase 30J's intake grows by 7. Neither was started here.

Start of You article grounding remains blocked and the library is not grounding-ready.
