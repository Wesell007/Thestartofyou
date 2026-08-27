# Article grounding — Phase 30I health-reviewed article review

Review and classification only. No article was approved, no registry record was changed, no article body or article-derived content reached the AI runtime, and no RAG, retrieval, vector search, embedding, ingestion or chunking exists. `AI_SOURCE_ROUTING_VERSION` remains `30B-source-routing-v1` and `listGroundingEligibleSlugs()` returns `[]`.

This document is metadata-only. It reproduces no article paragraph, section, takeaway, quotation, AI-ready summary, image or media. Classification reasons are concise and descriptive.

## 1. Purpose

Phase 30I reviews the verified-live health and clinical-education records routed here by Phases 30G and 30H, and decides for each record whether it is routine, low-consequence health education that could later be considered as a grounding candidate, or whether it carries safety-critical material that belongs in Phase 30J. It does not approve anything, does not create candidate records and does not connect any article to AI.

## 2. Review pool and eligibility

Registry state at execution, re-verified against `src/lib/grounding/articleGroundingRegistry.ts`: 206 total records, 117 live, 44 draft, 45 unknown. No discrepancy against the Phase 30H close.

Pool reconstruction:

- Phase 30G routed **53** records to Phase 30I: 49 metadata-routed exclusions plus 4 body-reviewed exclusions (`trying-to-conceive-explained`, `fertile-window`, `ovulation-signs`, `how-your-baby-develops-in-pregnancy`). The "Phase 30I = 49" line in the Phase 30G routing-count summary counts the metadata-routed subset only; the same document's totals block records 53. This is a counting-scope difference, not a routing conflict.
- Phase 30H routed **4** records to Phase 30I: `pregnancy-after-loss`, `trying-again-after-miscarriage`, `preparing-emotionally-for-birth`, `two-week-wait`.
- Union, deduplicated: **57 unique records**, with no overlap between the two intakes.

All 57 were re-verified in the registry as `editorialStatus: "live"`, `archived: false`, `deprecated: false`, `approvalStatus: "blocked_missing_metadata"`. All 57 received body review. None was classified on title or topic alone.

The 44 draft and 45 unknown-status records stay entirely outside this pool, unreviewed and blocked.

## 3. Health inclusion rules

A record may be recorded as an **accepted future health-reviewed candidate** only where body review confirms its meaningful purpose is routine, general, low-consequence health education: what a test, scan or appointment involves, ordinary physiology, normal cycle and conception biology, what a service pathway looks like, and non-urgent "speak to your GP or midwife" signposting.

Additional requirements, all of which must hold:

- no emergency or urgent-escalation instruction (999, A&E, same-day or immediate assessment, urgent maternity contact)
- no red-flag symptom triage where a wrong or delayed response could materially affect outcome
- no dosing, medication-selection or self-medication guidance
- no self-harm, suicide, crisis or safeguarding material
- no high-consequence risk-reduction instruction (for example sleep position and stillbirth risk, preterm-labour warning signs, reduced fetal movement)

A calm tone, a reviewer name or the presence of a source list is not qualifying on its own.

## 4. Escalation rules

Route to **Phase 30J — safety-sensitive / not-allowed classification** where meaningful content includes any of the excluded categories in section 3. The conservative rule from Phase 30H is carried forward unchanged: a record that mixes routine education with meaningful safety-critical guidance routes to 30J regardless of its primary topic.

Route back for **lower-sensitivity reconciliation** where body review shows the record is really wellbeing or emotional-coping material rather than health education, so its correct home is the wellbeing stream rather than this phase.

Record **later safety adjudication required** where the record is clearly beyond routine education but the boundary between 30I-level and 30J-level cannot be settled confidently on body review. Nothing is guessed.

## 5. Articles body-reviewed

All 57. Current approval status for every record is `blocked_missing_metadata`; review basis for every record is body-reviewed. Next action for every record is the same: remain blocked, carry forward to the named outcome, and satisfy the Phase 30F governance requirements before any candidate consideration.

### 5.1 Accepted future health-reviewed candidates (21)

| # | Slug | Journey | Source list | Proposed sensitivity | Reason |
|---|---|---|---|---|---|
| 1 | `20-week-anomaly-scan` | pregnancy | present | health_reviewed | Screening-appointment education; follow-up routing is to routine maternity and fetal-medicine pathways |
| 2 | `amh-test-explained` | trying-to-conceive | present | health_reviewed | Explains a single fertility test and its limits; no triage, no treatment instruction |
| 3 | `can-you-get-pregnant-on-your-period` | trying-to-conceive | absent | health_reviewed | Cycle physiology; signposting is non-urgent GP review |
| 4 | `combined-screening-test` | pregnancy | present | health_reviewed | Screening explanation and result framing within routine antenatal pathways |
| 5 | `dating-scan` | pregnancy | present | health_reviewed | Appointment education; escalation section is follow-up scans and emotional support, not urgency |
| 6 | `eating-well-in-pregnancy` | pregnancy | present | health_reviewed | General nutrition shape; names folic acid and vitamin D without doses and defers the avoid-list to a separate article |
| 7 | `endometriosis-and-trying-to-conceive` | trying-to-conceive | present | health_reviewed | Condition-aware conception education with non-urgent GP and specialist signposting |
| 8 | `fatigue-in-early-pregnancy` | pregnancy | absent | health_reviewed | Common-symptom education; the symptoms listed route to a midwife conversation, not urgent care |
| 9 | `fertile-window` | trying-to-conceive | present | health_reviewed | Cycle-timing physiology only |
| 10 | `fertility-tests-for-men` | trying-to-conceive | present | health_reviewed | Describes tests and lifestyle factors; no treatment or dosing instruction |
| 11 | `fertility-tests-for-women` | trying-to-conceive | present | health_reviewed | Describes tests and specialist input thresholds; non-urgent throughout |
| 12 | `glucose-tolerance-test` | pregnancy | present | health_reviewed | Test-procedure education; "tell the team" wording is in-clinic process, and medication is named descriptively as a care pathway |
| 13 | `how-long-to-try-before-getting-help` | trying-to-conceive | present | health_reviewed | Referral-threshold education against standard UK timeframes |
| 14 | `irregular-periods-and-trying-to-conceive` | trying-to-conceive | present | health_reviewed | Cycle-variation education with non-urgent GP signposting |
| 15 | `nipt-in-pregnancy` | pregnancy | present | health_reviewed | Screening-test explanation, accuracy and limits |
| 16 | `ovulation-signs` | trying-to-conceive | present | health_reviewed | Ordinary cycle-symptom interpretation with no consequence-bearing triage |
| 17 | `pcos-and-trying-to-conceive` | trying-to-conceive | present | health_reviewed | Condition and pathway education; treatment named descriptively, no dosing or self-management instruction |
| 18 | `signs-of-ovulation` | trying-to-conceive | present | health_reviewed | Ordinary cycle-symptom education |
| 19 | `trying-to-conceive-explained` | trying-to-conceive | present | health_reviewed | Conception physiology and standard when-to-seek-help thresholds |
| 20 | `what-happens-at-a-fertility-appointment` | trying-to-conceive | present | health_reviewed | Service-pathway education |
| 21 | `what-happens-at-booking-appointment` | pregnancy | present | health_reviewed | Appointment-process education; medication and lifestyle appear as things the midwife asks about |

### 5.2 Routed to Phase 30J — safety-sensitive (33)

| # | Slug | Journey | Source list | Proposed sensitivity | Reason |
|---|---|---|---|---|---|
| 1 | `anterior-placenta` | pregnancy | present | safety_sensitive | Reduced fetal movement and same-day contact guidance |
| 2 | `baby-hiccups-in-the-womb` | pregnancy | present | safety_sensitive | Reassurance article carrying the reduced-movement same-day rule; a wrong response risks conflating hiccups with movement |
| 3 | `baby-movement-in-pregnancy` | pregnancy | present | safety_sensitive | Core reduced-movement escalation content |
| 4 | `back-pain-in-pregnancy` | pregnancy | present | safety_sensitive | Preterm-labour, UTI and pain-relief material |
| 5 | `braxton-hicks-contractions` | pregnancy | present | safety_sensitive | Distinguishing practice tightenings from labour, plus bleeding and reduced-movement escalation |
| 6 | `complete-guide-morning-sickness` | pregnancy | present | safety_sensitive | Hyperemesis red flags, dehydration triage and treatment framing |
| 7 | `constipation-in-pregnancy` | pregnancy | present | safety_sensitive | Laxative-safety guidance and prompt assessment for severe abdominal pain |
| 8 | `early-pregnancy-symptoms-explained` | pregnancy | present | safety_sensitive | Heavy bleeding, one-sided pain and fever red flags |
| 9 | `first-trimester-complete-guide` | pregnancy | present | safety_sensitive | Broad guide including bleeding, severe pain and fever escalation |
| 10 | `growth-scans-in-pregnancy` | pregnancy | present | safety_sensitive | Same-day reduced-movement rule and urgent pre-eclampsia symptoms |
| 11 | `hand-expressing-colostrum` | pregnancy | present | safety_sensitive | Timing restrictions plus stop-and-call instructions for tightenings, bleeding and movement change |
| 12 | `heartburn-in-pregnancy` | pregnancy | present | safety_sensitive | Medication safety plus pre-eclampsia and upper-abdominal pain escalation |
| 13 | `how-long-implantation-takes` | trying-to-conceive | present | safety_sensitive | Ectopic-pregnancy warning signs with NHS 111 routing |
| 14 | `how-your-baby-develops-in-pregnancy` | pregnancy | present | safety_sensitive | Development education carrying third-trimester movement-change and bleeding escalation |
| 15 | `ivf-timeline-what-to-expect` | ivf | present | safety_sensitive | Post-procedure complication warning signs including severe pain, swelling and heavy bleeding |
| 16 | `key-nutrients-in-pregnancy` | pregnancy | present | safety_sensitive | Specific supplement dosing and substances to avoid |
| 17 | `moving-your-body-in-pregnancy` | pregnancy | present | safety_sensitive | Stop-exercise red flags including chest pain, bleeding, calf symptoms and reduced movement |
| 18 | `nausea-in-early-pregnancy` | pregnancy | present | safety_sensitive | Dehydration and vomiting-blood triage |
| 19 | `pelvic-pain-in-pregnancy` | pregnancy | present | safety_sensitive | Same-day assessment for severe or worsening pain, pain with fever, one-sided pain |
| 20 | `postpartum-recovery-timeline` | postpartum | present | safety_sensitive | Intrusive-thoughts and self-harm material, infection signs, returning heavy bleeding |
| 21 | `pregnancy-after-loss` | pregnancy | present | safety_sensitive | Escalated from the Phase 30H 30I routing: body review found an explicit thoughts-of-self-harm escalation route |
| 22 | `round-ligament-pain` | pregnancy | present | safety_sensitive | Differentiating benign pain from conditions needing same-day assessment |
| 23 | `second-trimester-complete-guide` | pregnancy | present | safety_sensitive | Leaking fluid, fever and other mid-pregnancy red flags |
| 24 | `shortness-of-breath-in-pregnancy` | pregnancy | present | safety_sensitive | 999 and A&E routing for chest pain and severe breathlessness |
| 25 | `sleep-in-pregnancy` | pregnancy | present | safety_sensitive | Sleep-position guidance tied to stillbirth risk; high-consequence risk-reduction instruction |
| 26 | `swelling-in-pregnancy` | pregnancy | present | safety_sensitive | Pre-eclampsia and DVT urgent-assessment guidance |
| 27 | `tests-and-scans-in-pregnancy` | pregnancy | present | safety_sensitive | Carries a consolidated red-flag triage list alongside the screening overview |
| 28 | `the-36-week-appointment` | pregnancy | present | safety_sensitive | Pre-eclampsia same-day call and movement escalation |
| 29 | `third-trimester-complete-guide` | pregnancy | present | safety_sensitive | Chest pain, vision changes and late-pregnancy red flags |
| 30 | `weight-changes-in-pregnancy` | pregnancy | present | safety_sensitive | Pre-eclampsia and hyperemesis escalation |
| 31 | `when-to-take-a-pregnancy-test` | trying-to-conceive | present | safety_sensitive | Heavy bleeding with a positive test and severe one-sided pain (ectopic) |
| 32 | `when-you-cant-face-food-in-pregnancy` | pregnancy | present | safety_sensitive | Hyperemesis red flags and dehydration triage |
| 33 | `your-body-after-birth` | postpartum | present | safety_sensitive | Postnatal infection, returning heavy bleeding and severe pain |

### 5.3 Lower-sensitivity reconciliation — wellbeing stream (2)

| # | Slug | Journey | Source list | Proposed sensitivity | Reason |
|---|---|---|---|---|---|
| 1 | `preparing-emotionally-for-birth` | pregnancy | present | wellbeing (reconciliation required) | Body review found emotional preparation with referral signposting rather than health education; the earlier 30I routing was based on condition naming (tokophobia, birth trauma) alone. Not accepted here; returned to the wellbeing stream for a final sensitivity decision |
| 2 | `two-week-wait` | trying-to-conceive | **absent** | wellbeing (reconciliation required) | Predominantly emotional coping in the waiting window; the symptom-interpretation material is light. Not accepted here; returned to the wellbeing stream |

Neither record is an accepted candidate in any phase. Both remain blocked.

### 5.4 Later safety adjudication required (1)

| # | Slug | Journey | Source list | Reason |
|---|---|---|---|---|
| 1 | `trying-again-after-miscarriage` | trying-to-conceive | **absent** | Mixes post-loss medical timing and recurrent-miscarriage referral thresholds with intrusive-thoughts and hopelessness wording that sits close to, but not clearly inside, the crisis category. The 30I/30J boundary could not be settled confidently on body review |

## 6. Accepted future health-reviewed candidates

**21 accepted future candidates** (section 5.1). This is a documentation-only review outcome.

**Registry candidate records: 0.** No `approvalStatus` value was changed, no record moved to `candidate`, and "accepted" confers no eligibility, no approval and no AI access. Every one of the 21 remains `blocked_missing_metadata` and invisible to the AI runtime.

## 7. Phase 30J safety-sensitive routing

**33 records** (section 5.2). Two escalation patterns dominate: obstetric red-flag triage (reduced movement, bleeding, pre-eclampsia, preterm labour, ectopic pregnancy, dehydration) and instruction-bearing content (supplement dosing, medication safety, sleep position, stop-activity rules). `pregnancy-after-loss` is an explicit escalation of a Phase 30H routing decision, recorded here with its provenance.

## 8. Lower-sensitivity reconciliation

**2 records** (section 5.3). Both arrived from Phase 30H, and body review at health level found them below the health-education bar rather than above it. They are returned to the wellbeing stream rather than being accepted or approved here.

## 9. Later safety adjudication

**1 record** (section 5.4), `trying-again-after-miscarriage`, also a Phase 30H intake. Recorded rather than guessed.

## 10. Existing medical-review metadata (context only)

Captured from `src/data/articleData.ts` for the 57 records, as context for a future grounding reviewer. It is **not** grounding-review evidence and does not satisfy any Phase 30F governance requirement:

- reviewer named on all 57 records (Jenny Joines)
- a last-updated date on 48 records, ranging from March 2026 to May 2026; absent on 9
- no record carries a `medicallyReviewed` field in the dataset; editorial medical review is expressed through the reviewer and date fields only

Editorial medical review is a different control from grounding approval. Neither substitutes for the other.

## 11. Source-list gaps

Re-verified at execution: **11 of the 57** records have `hasSourceList: false`. Among the accepted candidates these are `can-you-get-pregnant-on-your-period` and `fatigue-in-early-pregnancy`; among the non-accepted outcomes they include `two-week-wait` and `trying-again-after-miscarriage`, both already recorded in Phase 30H. No source was added, rewritten or validated in this phase.

## 12. Governance position

Unchanged and unimproved for all 57 reviewed records, including the 21 accepted candidates:

- content owner — Missing
- content version — Missing
- grounding reviewer — Missing
- reviewed date — Missing
- `approvedBy` / `approvedAt` — Missing
- sensitivity — unassessed in the registry; the proposed sensitivity in section 5 is documentation-only

Nothing was invented to reduce these gaps.

## 13. Confirmation no article is approved or AI-connected

- 0 registry changes
- 0 registry candidate records
- 0 approved articles
- `listGroundingEligibleSlugs()` returns `[]`
- `AI_SOURCE_ROUTING_VERSION` unchanged at `30B-source-routing-v1`
- no prompt, mode, safety rule, source route or UI behaviour changed
- no RAG, retrieval, vector search, embedding, ingestion or chunking added
- no article body, extract or summary was written into any runtime file

## 14. Recommended next phase

**Phase 30J — safety-sensitive and not-allowed classification.** Intake: the 33 records routed in section 7, the 7 records routed by Phase 30H, the 30 metadata-routed records from Phase 30G, and the ambiguous records recorded in sections 9 and 5.3 for a definitive sensitivity decision. Review only; no approvals. Start of You article grounding remains blocked.
