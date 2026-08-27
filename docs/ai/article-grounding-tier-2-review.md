# Phase 30G — Tier 2 Low-Risk General Education Review

Status: review and classification only. 0 registry changes, 0 candidate records, 0 approved articles, AI runtime unchanged. Start of You article grounding remains **blocked**.

Governance authority: `article-grounding-governance.md` (Phase 30F contract).

## 1. Purpose

Identify whether any genuinely low-risk, general educational Start of You article is a reasonable *future* Tier 2 grounding candidate, using verified-live registry records only. Nothing here approves, promotes or connects any article to the AI. A small or zero result is a valid outcome; criteria were not relaxed to produce candidates.

## 2. Review pool, funnel arithmetic and method

### 2.1 Locked funnel arithmetic

```text
A. Total registry                       = 206
B. Status-ineligible                    = 44 draft + 45 unknown
C. Verified-live pool                   = 117
D. Prior/reserved verified-live exclusions
   - verified-live support records (30H) = 9
   - Phase 30E practical exclusions      = 6
E. Metadata-screened population         = 117 - 9 - 6 = 102

E (102) = metadata-routed exclusions (92) + Tier 2 body-review shortlist (10)
Tier 2 body-review shortlist (10) = body-reviewed Tier 2 exclusions (5) + accepted future Tier 2 candidates (5)
```

Re-verified at execution against `src/lib/grounding/articleGroundingRegistry.ts`: 206 records parsed, 117 live / 44 draft / 45 unknown, 9 support slugs live, 6 practical exclusions live, pool after subtraction = 102. No overlap and no registry discrepancy was found, so the expected arithmetic holds exactly. Every slug appears once, at one funnel stage only.

### 2.2 The 9 verified-live support records reserved for Phase 30H

`emotional-wellbeing-pregnancy`, `emotional-impact-of-ivf`, `perinatal-anxiety`, `anxiety-in-pregnancy`, `pregnancy-after-loss`, `the-first-trimester-emotionally`, `when-the-joy-doesnt-arrive-yet`, `chemical-pregnancy`, `trying-again-after-miscarriage`.

### 2.3 The 3 unknown support records

`coping-with-the-two-week-wait`, `emotional-pressure-of-age-when-ttc`, `partner-support-when-ttc`.

These remain `editorialStatus: "unknown"`, are already counted inside the 45 status exclusions, are **not** double-counted against the live pool, remain status-blocked, and were **not** body-reviewed in Phase 30G. All 12 support records are reserved for Phase 30H *when editorial-status eligibility permits*; that is not a statement that all 12 are currently eligible.

### 2.4 Method

1. Metadata pass over the 102 (journey, topics, slug semantics) to route out anything clearly clinical, wellbeing, loss, fertility-treatment, medication, safety or urgency related, without body review.
2. Body review of the remaining shortlist only, reading article datasets purely for human classification. No article body content, paragraph, section, takeaway, quotation or AI-ready summary is recorded here or anywhere in code.
3. Per-record decision captured as metadata only, with the review basis (`metadata-only` or `body-reviewed`) always distinguished.
4. Anything accepted is recorded as an **accepted future Tier 2 candidate**, which explicitly does not mean `approvalStatus: "candidate"`.

## 3. Inclusion rules (all must hold)

- `editorialStatus: "live"` in the registry, verified at execution.
- General educational, relational, routine or organisational purpose.
- No symptom interpretation, clinical thresholds, medication guidance, screening or test interpretation, fertility physiology, urgency triage or red-flag wording.
- Not emotionally sensitive support content (loss, anxiety, mental health, fertility distress).
- Body-reviewed by hand. Metadata alone can never accept an article.
- Conservative on any doubt: doubt means exclude.

## 4. Exclusion rules (any one excludes)

- Draft, unknown, archived or deprecated editorial status.
- Wellbeing, mental-health, loss or fertility-distress content → Phase 30H.
- Clinical or health education, symptoms, development, screening, tests, conditions → Phase 30I.
- Safety, medication, urgency, labour-onset, safe sleep or feeding safety → Phase 30J.
- Metadata insufficient to separate 30I from 30J confidently → `later health/safety review required`.
- Already reviewed in Phase 30E → excluded, evidence preserved unchanged.

## 5. Metadata-routed exclusions (92 records, provisional)

Routing counts: Phase 30I = 49, Phase 30J = 30, later health/safety review required = 12, Phase 30H = 1. Total 92.

Every row below is a **metadata-only** decision. It is a routing decision, not a final sensitivity classification, and stays provisional until the receiving phase body-reviews it.

| Slug | Journey | Topics | Source list | Review basis | Routed to | Status |
| --- | --- | --- | --- | --- | --- | --- |
| `preparing-emotionally-for-birth` | pregnancy | feelings | yes | metadata-only | Phase 30H (wellbeing / emotional support) | provisional until that phase |
| `20-week-anomaly-scan` | pregnancy | health-and-safety | yes | metadata-only | Phase 30I (health-reviewed clinical education) | provisional until that phase |
| `amh-test-explained` | trying-to-conceive | - | yes | metadata-only | Phase 30I (health-reviewed clinical education) | provisional until that phase |
| `anterior-placenta` | pregnancy | baby | yes | metadata-only | Phase 30I (health-reviewed clinical education) | provisional until that phase |
| `baby-hiccups-in-the-womb` | pregnancy | baby | yes | metadata-only | Phase 30I (health-reviewed clinical education) | provisional until that phase |
| `baby-movement-in-pregnancy` | pregnancy | baby | yes | metadata-only | Phase 30I (health-reviewed clinical education) | provisional until that phase |
| `back-pain-in-pregnancy` | pregnancy | body | yes | metadata-only | Phase 30I (health-reviewed clinical education) | provisional until that phase |
| `braxton-hicks-contractions` | pregnancy | body | yes | metadata-only | Phase 30I (health-reviewed clinical education) | provisional until that phase |
| `can-you-get-pregnant-on-your-period` | trying-to-conceive | - | no | metadata-only | Phase 30I (health-reviewed clinical education) | provisional until that phase |
| `combined-screening-test` | pregnancy | health-and-safety | yes | metadata-only | Phase 30I (health-reviewed clinical education) | provisional until that phase |
| `complete-guide-morning-sickness` | pregnancy | - | yes | metadata-only | Phase 30I (health-reviewed clinical education) | provisional until that phase |
| `constipation-in-pregnancy` | pregnancy | body | yes | metadata-only | Phase 30I (health-reviewed clinical education) | provisional until that phase |
| `dating-scan` | pregnancy | health-and-safety | yes | metadata-only | Phase 30I (health-reviewed clinical education) | provisional until that phase |
| `early-pregnancy-symptoms-explained` | pregnancy | body | yes | metadata-only | Phase 30I (health-reviewed clinical education) | provisional until that phase |
| `eating-well-in-pregnancy` | pregnancy | diet-and-exercise | yes | metadata-only | Phase 30I (health-reviewed clinical education) | provisional until that phase |
| `endometriosis-and-trying-to-conceive` | trying-to-conceive | - | yes | metadata-only | Phase 30I (health-reviewed clinical education) | provisional until that phase |
| `fatigue-in-early-pregnancy` | pregnancy | - | no | metadata-only | Phase 30I (health-reviewed clinical education) | provisional until that phase |
| `fertility-tests-for-men` | trying-to-conceive | - | yes | metadata-only | Phase 30I (health-reviewed clinical education) | provisional until that phase |
| `fertility-tests-for-women` | trying-to-conceive | - | yes | metadata-only | Phase 30I (health-reviewed clinical education) | provisional until that phase |
| `first-trimester-complete-guide` | pregnancy | body | yes | metadata-only | Phase 30I (health-reviewed clinical education) | provisional until that phase |
| `glucose-tolerance-test` | pregnancy | health-and-safety | yes | metadata-only | Phase 30I (health-reviewed clinical education) | provisional until that phase |
| `growth-scans-in-pregnancy` | pregnancy | baby | yes | metadata-only | Phase 30I (health-reviewed clinical education) | provisional until that phase |
| `hand-expressing-colostrum` | pregnancy | preparing-for-baby | yes | metadata-only | Phase 30I (health-reviewed clinical education) | provisional until that phase |
| `heartburn-in-pregnancy` | pregnancy | body | yes | metadata-only | Phase 30I (health-reviewed clinical education) | provisional until that phase |
| `how-long-implantation-takes` | trying-to-conceive | - | no | metadata-only | Phase 30I (health-reviewed clinical education) | provisional until that phase |
| `how-long-to-try-before-getting-help` | trying-to-conceive | - | yes | metadata-only | Phase 30I (health-reviewed clinical education) | provisional until that phase |
| `irregular-periods-and-trying-to-conceive` | trying-to-conceive | - | yes | metadata-only | Phase 30I (health-reviewed clinical education) | provisional until that phase |
| `ivf-timeline-what-to-expect` | ivf | - | yes | metadata-only | Phase 30I (health-reviewed clinical education) | provisional until that phase |
| `key-nutrients-in-pregnancy` | pregnancy | diet-and-exercise | yes | metadata-only | Phase 30I (health-reviewed clinical education) | provisional until that phase |
| `moving-your-body-in-pregnancy` | pregnancy | diet-and-exercise | yes | metadata-only | Phase 30I (health-reviewed clinical education) | provisional until that phase |
| `nausea-in-early-pregnancy` | pregnancy | - | no | metadata-only | Phase 30I (health-reviewed clinical education) | provisional until that phase |
| `nipt-in-pregnancy` | pregnancy | health-and-safety | yes | metadata-only | Phase 30I (health-reviewed clinical education) | provisional until that phase |
| `pcos-and-trying-to-conceive` | trying-to-conceive | - | yes | metadata-only | Phase 30I (health-reviewed clinical education) | provisional until that phase |
| `pelvic-pain-in-pregnancy` | pregnancy | body | yes | metadata-only | Phase 30I (health-reviewed clinical education) | provisional until that phase |
| `postpartum-recovery-timeline` | postpartum | - | yes | metadata-only | Phase 30I (health-reviewed clinical education) | provisional until that phase |
| `round-ligament-pain` | pregnancy | body | yes | metadata-only | Phase 30I (health-reviewed clinical education) | provisional until that phase |
| `second-trimester-complete-guide` | pregnancy | body | yes | metadata-only | Phase 30I (health-reviewed clinical education) | provisional until that phase |
| `shortness-of-breath-in-pregnancy` | pregnancy | body | yes | metadata-only | Phase 30I (health-reviewed clinical education) | provisional until that phase |
| `signs-of-ovulation` | trying-to-conceive | - | no | metadata-only | Phase 30I (health-reviewed clinical education) | provisional until that phase |
| `sleep-in-pregnancy` | pregnancy | body | yes | metadata-only | Phase 30I (health-reviewed clinical education) | provisional until that phase |
| `swelling-in-pregnancy` | pregnancy | body | yes | metadata-only | Phase 30I (health-reviewed clinical education) | provisional until that phase |
| `tests-and-scans-in-pregnancy` | pregnancy | health-and-safety | yes | metadata-only | Phase 30I (health-reviewed clinical education) | provisional until that phase |
| `the-36-week-appointment` | pregnancy | health-and-safety | yes | metadata-only | Phase 30I (health-reviewed clinical education) | provisional until that phase |
| `third-trimester-complete-guide` | pregnancy | body | yes | metadata-only | Phase 30I (health-reviewed clinical education) | provisional until that phase |
| `weight-changes-in-pregnancy` | pregnancy | health-and-safety | yes | metadata-only | Phase 30I (health-reviewed clinical education) | provisional until that phase |
| `what-happens-at-a-fertility-appointment` | trying-to-conceive | - | yes | metadata-only | Phase 30I (health-reviewed clinical education) | provisional until that phase |
| `what-happens-at-booking-appointment` | pregnancy | health-and-safety | yes | metadata-only | Phase 30I (health-reviewed clinical education) | provisional until that phase |
| `when-to-take-a-pregnancy-test` | trying-to-conceive | - | no | metadata-only | Phase 30I (health-reviewed clinical education) | provisional until that phase |
| `when-you-cant-face-food-in-pregnancy` | pregnancy | diet-and-exercise | yes | metadata-only | Phase 30I (health-reviewed clinical education) | provisional until that phase |
| `your-body-after-birth` | postpartum | - | no | metadata-only | Phase 30I (health-reviewed clinical education) | provisional until that phase |
| `antacids-in-pregnancy` | pregnancy | health-and-safety | yes | metadata-only | Phase 30J (safety / urgency-sensitive) | provisional until that phase |
| `anti-d-injection-in-pregnancy` | pregnancy | health-and-safety | yes | metadata-only | Phase 30J (safety / urgency-sensitive) | provisional until that phase |
| `antibiotics-in-pregnancy` | pregnancy | health-and-safety | yes | metadata-only | Phase 30J (safety / urgency-sensitive) | provisional until that phase |
| `baby-sleep-first-year` | first-year,postpartum | - | yes | metadata-only | Phase 30J (safety / urgency-sensitive) | provisional until that phase |
| `bleeding-in-early-pregnancy` | pregnancy | health-and-safety | yes | metadata-only | Phase 30J (safety / urgency-sensitive) | provisional until that phase |
| `cold-and-flu-in-pregnancy` | pregnancy | health-and-safety | yes | metadata-only | Phase 30J (safety / urgency-sensitive) | provisional until that phase |
| `external-cephalic-version` | pregnancy | baby | yes | metadata-only | Phase 30J (safety / urgency-sensitive) | provisional until that phase |
| `family-sick-days-at-home` | family | health-safety | yes | metadata-only | Phase 30J (safety / urgency-sensitive) | provisional until that phase |
| `feeding-your-baby-complete-guide` | postpartum,first-year | - | yes | metadata-only | Phase 30J (safety / urgency-sensitive) | provisional until that phase |
| `foods-to-avoid-in-pregnancy` | pregnancy | diet-and-exercise | yes | metadata-only | Phase 30J (safety / urgency-sensitive) | provisional until that phase |
| `group-b-strep-in-pregnancy` | pregnancy | health-and-safety | yes | metadata-only | Phase 30J (safety / urgency-sensitive) | provisional until that phase |
| `hay-fever-in-pregnancy` | pregnancy | health-and-safety | yes | metadata-only | Phase 30J (safety / urgency-sensitive) | provisional until that phase |
| `induction-of-labour` | pregnancy | body | yes | metadata-only | Phase 30J (safety / urgency-sensitive) | provisional until that phase |
| `laxatives-in-pregnancy` | pregnancy | health-and-safety | yes | metadata-only | Phase 30J (safety / urgency-sensitive) | provisional until that phase |
| `leaking-fluid-in-pregnancy` | pregnancy | health-and-safety | yes | metadata-only | Phase 30J (safety / urgency-sensitive) | provisional until that phase |
| `medicines-in-pregnancy` | pregnancy | health-and-safety | yes | metadata-only | Phase 30J (safety / urgency-sensitive) | provisional until that phase |
| `membrane-sweep` | pregnancy | body | yes | metadata-only | Phase 30J (safety / urgency-sensitive) | provisional until that phase |
| `mucus-plug` | pregnancy | health-and-safety | yes | metadata-only | Phase 30J (safety / urgency-sensitive) | provisional until that phase |
| `paracetamol-in-pregnancy` | pregnancy | health-and-safety | yes | metadata-only | Phase 30J (safety / urgency-sensitive) | provisional until that phase |
| `reduced-movements-in-pregnancy` | pregnancy | baby | yes | metadata-only | Phase 30J (safety / urgency-sensitive) | provisional until that phase |
| `show-in-pregnancy` | pregnancy | health-and-safety | yes | metadata-only | Phase 30J (safety / urgency-sensitive) | provisional until that phase |
| `signs-of-labour` | pregnancy | body | yes | metadata-only | Phase 30J (safety / urgency-sensitive) | provisional until that phase |
| `stages-of-labour` | pregnancy | body | yes | metadata-only | Phase 30J (safety / urgency-sensitive) | provisional until that phase |
| `symptoms-stopping-early-pregnancy` | pregnancy | - | no | metadata-only | Phase 30J (safety / urgency-sensitive) | provisional until that phase |
| `thrush-in-pregnancy` | pregnancy | health-and-safety | yes | metadata-only | Phase 30J (safety / urgency-sensitive) | provisional until that phase |
| `uti-in-pregnancy` | pregnancy | health-and-safety | yes | metadata-only | Phase 30J (safety / urgency-sensitive) | provisional until that phase |
| `vaccinations-in-pregnancy` | pregnancy | health-and-safety | yes | metadata-only | Phase 30J (safety / urgency-sensitive) | provisional until that phase |
| `what-happens-if-labour-doesnt-start` | pregnancy | body | yes | metadata-only | Phase 30J (safety / urgency-sensitive) | provisional until that phase |
| `when-to-go-in-for-labour` | pregnancy | body | yes | metadata-only | Phase 30J (safety / urgency-sensitive) | provisional until that phase |
| `when-to-worry-about-cramps-in-pregnancy` | pregnancy | health-and-safety | yes | metadata-only | Phase 30J (safety / urgency-sensitive) | provisional until that phase |
| `baby-milestones-first-year` | first-year | - | no | metadata-only | later health/safety review required | provisional until that phase |
| `breech-baby` | pregnancy | baby | yes | metadata-only | later health/safety review required | provisional until that phase |
| `cord-around-the-neck-in-pregnancy` | pregnancy | baby | yes | metadata-only | later health/safety review required | provisional until that phase |
| `discharge-in-pregnancy` | pregnancy | health-and-safety | yes | metadata-only | later health/safety review required | provisional until that phase |
| `faint-positive-pregnancy-test` | trying-to-conceive | - | no | metadata-only | later health/safety review required | provisional until that phase |
| `implantation-bleeding` | pregnancy,trying-to-conceive | body | yes | metadata-only | later health/safety review required | provisional until that phase |
| `low-lying-placenta-in-pregnancy` | pregnancy | baby | yes | metadata-only | later health/safety review required | provisional until that phase |
| `measuring-big-or-small-in-pregnancy` | pregnancy | baby | yes | metadata-only | later health/safety review required | provisional until that phase |
| `spotting-in-pregnancy` | pregnancy | health-and-safety | yes | metadata-only | later health/safety review required | provisional until that phase |
| `twins-and-multiples-in-pregnancy` | pregnancy | baby | yes | metadata-only | later health/safety review required | provisional until that phase |
| `watery-discharge-in-pregnancy` | pregnancy | health-and-safety | yes | metadata-only | later health/safety review required | provisional until that phase |
| `what-if-a-scan-shows-something-unexpected` | pregnancy | health-and-safety | yes | metadata-only | later health/safety review required | provisional until that phase |

## 6. Tier 2 body-review shortlist (10 records)

| Slug | Journey | Topics | Source list | Outcome |
| --- | --- | --- | --- | --- |
| `second-time-parenting` | family | growing-families | no | accepted future Tier 2 candidate |
| `staying-connected-as-parents` | family | relationships | no | accepted future Tier 2 candidate |
| `calmer-evenings-after-busy-days` | family | family-basics | no | accepted future Tier 2 candidate |
| `planning-family-days-out` | family | travel-days-out | no | accepted future Tier 2 candidate |
| `simple-family-play-ideas` | family | play-connection | no | accepted future Tier 2 candidate |
| `trying-to-conceive-explained` | trying-to-conceive | - | yes | body-reviewed exclusion |
| `fertile-window` | trying-to-conceive | - | no | body-reviewed exclusion |
| `ovulation-signs` | trying-to-conceive | - | no | body-reviewed exclusion |
| `two-week-wait` | trying-to-conceive | - | no | body-reviewed exclusion |
| `how-your-baby-develops-in-pregnancy` | pregnancy | baby | yes | body-reviewed exclusion |

## 7. Accepted future Tier 2 candidates (5)

All five are family-journey, relational or organisational education with no clinical, symptom, medication or urgency content. Proposed sensitivity is recorded here only and is **not** written to the registry.

| Slug | Proposed sensitivity | Reason accepted | Registry status |
| --- | --- | --- | --- |
| `second-time-parenting` | routine | Adjustment and family-life education; no clinical or safety guidance | `blocked`, unchanged |
| `staying-connected-as-parents` | routine | Relationship and communication education, not mental-health support | `blocked`, unchanged |
| `calmer-evenings-after-busy-days` | routine | Household routine and rhythm education | `blocked`, unchanged |
| `planning-family-days-out` | routine | Practical outing planning; no travel-safety or equipment-safety instruction | `blocked`, unchanged |
| `simple-family-play-ideas` | routine | Play and connection ideas; no developmental milestone assessment | `blocked`, unchanged |

"Accepted future Tier 2 candidate" means: eligible to be *proposed* for candidate status in a later phase, by the authority defined in `article-grounding-governance.md`, once the governance gaps in section 9 are closed. It confers nothing at runtime.

## 8. Body-reviewed Tier 2 exclusions (5) and later-tier routing

| Slug | Reason excluded | Routed to |
| --- | --- | --- |
| `trying-to-conceive-explained` | Fertility physiology, timing guidance and when-to-seek-help thresholds | Phase 30I |
| `fertile-window` | Cycle physiology and conception-timing guidance | Phase 30I |
| `ovulation-signs` | Physical symptom interpretation and tracking guidance | Phase 30I |
| `two-week-wait` | Symptom interpretation combined with emotionally sensitive fertility support | Phase 30H |
| `how-your-baby-develops-in-pregnancy` | Fetal development education with reassurance around worry about development | Phase 30I |

Exact reconciliation across all 102 screened records:

```text
Metadata-routed exclusions          = 92  (30I 49, 30J 30, later review 12, 30H 1)
Body-reviewed Tier 2 exclusions     =  5  (30I 4, 30H 1)
Accepted future Tier 2 candidates   =  5
Total                               = 102

Combined later-phase routing of the 97 exclusions:
  Phase 30I                         = 53
  Phase 30J                         = 30
  later health/safety review required = 12
  Phase 30H                         =  2
```

## 9. Per-candidate governance gaps

Identical for all five accepted candidates, per the Phase 30F contract:

| Governance field | State |
| --- | --- |
| Content owner | Missing |
| Content version | Missing |
| Grounding reviewer | Missing |
| Reviewed date | Missing |
| Structured source list | Missing (`hasSourceList: false` for all five) |
| Sensitivity in registry | Not set (proposed only, in this document) |
| `approvedBy` / `approvedAt` | Missing |

Nothing was invented to close these gaps.

## 10. Required human decisions before any of the five can move to candidate

1. Assign a named content owner and a content version to each of the five records.
2. Decide whether family-journey general education requires a structured source list at all, and if so, supply verified sources.
3. Confirm the proposed `routine` sensitivity, or override it, under the Phase 30F decision matrix.
4. Name the grounding reviewer and record a reviewed date.
5. Confirm that relationship and family-life education is not treated as wellbeing-sensitive content for grounding purposes.
6. Confirm the candidate authority and approval authority signatories for a Tier 2 batch.

## 11. Confirmation: nothing approved, nothing AI-connected

- `src/lib/grounding/articleGroundingRegistry.ts` was **read only**; no record was edited.
- 0 records at `approvalStatus: "candidate"`. 0 approved articles.
- `listGroundingEligibleSlugs()` returns `[]`.
- No article body or article-derived content reaches the AI runtime, prompts, modes, source routing or any bundle.
- `AI_SOURCE_ROUTING_VERSION` remains `30B-source-routing-v1`.
- No RAG, retrieval, embeddings, vector search, ingestion or chunking exists or was added.
- No prompt, mode, safety, endpoint, renderer, Ask, companion, schema, route or SEO change.

## 12. Recommended next phase

**Phase 30H — Wellbeing and Sensitive Support Review**, scoped to the 9 verified-live support records plus `preparing-emotionally-for-birth` and `two-week-wait`. The 3 unknown support records stay status-blocked until editorial status is resolved. Phase 30H was not started here.
