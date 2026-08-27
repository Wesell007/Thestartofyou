# Article grounding — Phase 30J safety-sensitive and not-allowed classification

Review and classification only. No article was approved, no registry record was changed, no article body or article-derived content reached the AI runtime, and no RAG, retrieval, vector search, embedding, ingestion or chunking exists. `AI_SOURCE_ROUTING_VERSION` remains `30B-source-routing-v1` and `listGroundingEligibleSlugs()` returns `[]`.

This document is metadata-only. It reproduces no article paragraph, section, takeaway, quotation, AI-ready summary, image or media. Classification reasons are concise and descriptive.

## 1. Purpose

Phase 30J adjudicates the verified-live records routed here by Phases 30E, 30G, 30H and 30I. For each record it records a **documentation-only proposed sensitivity**: `safety_sensitive`, `not_allowed`, or a reconciliation outcome (`health_reviewed`, `wellbeing`, `low`) where the record's real character does not match the queue it arrived from. It approves nothing, creates no candidate record and changes no registry field.

`not_allowed` is a permanent block proposal. It is only used where body review provides affirmative evidence that ordinary safety-sensitive governance would be insufficient. Uncertainty alone never produces `not_allowed`; uncertainty produces `safety_sensitive`.

## 2. Terminology carried forward

The two lower-sensitivity findings from Phase 30I (`preparing-emotionally-for-birth`, `two-week-wait`) are **not** accepted future wellbeing candidates. They remain **wellbeing reconciliation required** and stay blocked for later governance and human reconciliation. They sit outside the Phase 30J pool and are unchanged by this phase.

## 3. Pool reconstruction from closed evidence only

| Group | Provenance | Slugs |
| --- | --- | --- |
| A | Phase 30G, routed directly to 30J | 30 |
| B | Phase 30G, later health/safety review required | 12 |
| C | Phase 30H, routed directly to 30J | 7 |
| D | Phase 30I, routed directly to 30J | 33 |
| E | Phase 30I, later safety adjudication (`trying-again-after-miscarriage`) | 1 |
| F | Phase 30E practical exclusions requiring final safety adjudication | 6 |

Pre-deduplication provenance total: 30 + 12 + 7 + 33 + 1 + 6 = **89**. Overlap between groups: **0**. Final unique pool: **89 records**.

All 89 were re-verified against `src/lib/grounding/articleGroundingRegistry.ts` as `editorialStatus: "live"`, `archived: false`, `deprecated: false`, `approvalStatus: "blocked_missing_metadata"`, not candidate and not approved. All 89 received dedicated body review. None was classified on title, topic or provenance alone.

The 44 draft and 45 unknown-status records stay entirely outside this pool, unreviewed and blocked.

## 4. Live-corpus reconciliation audit

| Bucket | Records |
| --- | --- |
| Accepted future Tier 2 candidates (Phase 30G, documentation-only) | 5 |
| Accepted future health-reviewed candidates (Phase 30I, documentation-only) | 21 |
| Wellbeing reconciliation required (Phase 30I) | 2 |
| Phase 30J adjudication records | 89 |
| **Total verified-live records** | **117** |

117 matches the registry `live` count exactly. Every verified-live record is accounted for in exactly one bucket, so Phase 30K inherits a complete corpus with no orphaned records.

## 5. Adjudication rules applied

A record is proposed `not_allowed` only where at least one of the following is affirmatively evidenced in the body:

1. Crisis, self-harm or suicide pathway content, including named crisis services and harm-to-self or harm-to-baby wording.
2. Pregnancy loss, adverse scan findings and post-loss decision content, where sequencing and tone are inseparable from safety.
3. Medication selection, dosing, dose-frequency or self-treatment thresholds.
4. Time-critical triage rules where a softened, partial or reordered answer could delay same-day, maternity-triage or emergency care.
5. Infant safe sleep and SIDS risk-reduction guidance, where an incomplete restatement is directly hazardous.

Everything else that carries health-reviewed clinical explanation with embedded escalation wording is proposed `safety_sensitive`. Records whose meaningful purpose is routine physiology, testing explanation or explicitly non-clinical practical preparation are proposed as reconciliation outcomes and remain blocked pending human reconciliation.

Enhanced scrutiny was applied to crisis, pregnancy-loss, fertility, medication and safe-sleep content throughout.

## 6. Outcome summary

| Proposed sensitivity | Records |
| --- | --- |
| `not_allowed` | 35 |
| `safety_sensitive` | 41 |
| `health_reviewed` reconciliation required | 9 |
| `low` reconciliation required | 4 |
| **Total** | **89** |

`not_allowed` sub-grounds: crisis and mental health 8, pregnancy loss and adverse findings 4, medication and dosing 8, time-critical triage 11, infant safe sleep 4.

## 7. Outcome by provenance group

| Group | not_allowed | safety_sensitive | health_reviewed recon. | low recon. | Total |
| --- | --- | --- | --- | --- | --- |
| A | 14 | 14 | 1 | 1 | 30 |
| B | 4 | 5 | 3 | 0 | 12 |
| C | 7 | 0 | 0 | 0 | 7 |
| D | 6 | 22 | 5 | 0 | 33 |
| E | 1 | 0 | 0 | 0 | 1 |
| F | 3 | 0 | 0 | 3 | 6 |
| **Total** | **35** | **41** | **9** | **4** | **89** |

## 8. Per-record adjudication

### not_allowed (35)

| Slug | Provenance | Source list | Last updated | Proposed sensitivity | Basis |
| --- | --- | --- | --- | --- | --- |
| `antacids-in-pregnancy` | A (30G direct) | yes | May 2026 | not_allowed | Medication selection, dosing or self-treatment thresholds. Any drift produces actionable medicines advice. |
| `antibiotics-in-pregnancy` | A (30G direct) | yes | May 2026 | not_allowed | Medication selection, dosing or self-treatment thresholds. Any drift produces actionable medicines advice. |
| `anxiety-in-pregnancy` | C (30H direct) | yes | May 2026 | not_allowed | Crisis and self-harm pathway content (999/A&E/111/Samaritans, harm-to-self or baby wording). Partial retrieval could omit or reshape a crisis instruction. |
| `baby-movement-in-pregnancy` | D (30I direct) | yes | April 2026 | not_allowed | Time-critical triage rules where a softened or partial answer could delay same-day or emergency care. |
| `baby-sleep-first-year` | A (30G direct) | yes | March 2026 | not_allowed | Infant safe sleep / SIDS risk-reduction guidance. Incomplete restatement is directly hazardous. |
| `bleeding-in-early-pregnancy` | A (30G direct) | yes | May 2026 | not_allowed | Time-critical triage rules where a softened or partial answer could delay same-day or emergency care. |
| `chemical-pregnancy` | C (30H direct) | none | not recorded | not_allowed | Pregnancy loss and adverse-finding content. Tone and sequencing are inseparable from safety; paraphrase risk is unacceptable. |
| `cold-and-flu-in-pregnancy` | A (30G direct) | yes | May 2026 | not_allowed | Medication selection, dosing or self-treatment thresholds. Any drift produces actionable medicines advice. |
| `emotional-impact-of-ivf` | C (30H direct) | yes | March 2026 | not_allowed | Crisis and self-harm pathway content (999/A&E/111/Samaritans, harm-to-self or baby wording). Partial retrieval could omit or reshape a crisis instruction. |
| `emotional-wellbeing-pregnancy` | C (30H direct) | yes | May 2026 | not_allowed | Crisis and self-harm pathway content (999/A&E/111/Samaritans, harm-to-self or baby wording). Partial retrieval could omit or reshape a crisis instruction. |
| `hay-fever-in-pregnancy` | A (30G direct) | yes | May 2026 | not_allowed | Medication selection, dosing or self-treatment thresholds. Any drift produces actionable medicines advice. |
| `laxatives-in-pregnancy` | A (30G direct) | yes | May 2026 | not_allowed | Medication selection, dosing or self-treatment thresholds. Any drift produces actionable medicines advice. |
| `leaking-fluid-in-pregnancy` | A (30G direct) | yes | May 2026 | not_allowed | Time-critical triage rules where a softened or partial answer could delay same-day or emergency care. |
| `low-lying-placenta-in-pregnancy` | B (30G later health/safety) | yes | April 2026 | not_allowed | Time-critical triage rules where a softened or partial answer could delay same-day or emergency care. |
| `medicines-in-pregnancy` | A (30G direct) | yes | April 2026 | not_allowed | Medication selection, dosing or self-treatment thresholds. Any drift produces actionable medicines advice. |
| `paracetamol-in-pregnancy` | A (30G direct) | yes | May 2026 | not_allowed | Medication selection, dosing or self-treatment thresholds. Any drift produces actionable medicines advice. |
| `perinatal-anxiety` | C (30H direct) | yes | March 2026 | not_allowed | Crisis and self-harm pathway content (999/A&E/111/Samaritans, harm-to-self or baby wording). Partial retrieval could omit or reshape a crisis instruction. |
| `postpartum-recovery-timeline` | D (30I direct) | yes | March 2026 | not_allowed | Crisis and self-harm pathway content (999/A&E/111/Samaritans, harm-to-self or baby wording). Partial retrieval could omit or reshape a crisis instruction. |
| `pregnancy-after-loss` | D (30I direct) | yes | April 2026 | not_allowed | Pregnancy loss and adverse-finding content. Tone and sequencing are inseparable from safety; paraphrase risk is unacceptable. |
| `preparing-for-baby-complete-guide` | F (30E practical) | yes | March 2026 | not_allowed | Infant safe sleep / SIDS risk-reduction guidance. Incomplete restatement is directly hazardous. |
| `reduced-movements-in-pregnancy` | A (30G direct) | yes | April 2026 | not_allowed | Time-critical triage rules where a softened or partial answer could delay same-day or emergency care. |
| `shortness-of-breath-in-pregnancy` | D (30I direct) | yes | April 2026 | not_allowed | Time-critical triage rules where a softened or partial answer could delay same-day or emergency care. |
| `spotting-in-pregnancy` | B (30G later health/safety) | yes | May 2026 | not_allowed | Time-critical triage rules where a softened or partial answer could delay same-day or emergency care. |
| `swelling-in-pregnancy` | D (30I direct) | yes | April 2026 | not_allowed | Time-critical triage rules where a softened or partial answer could delay same-day or emergency care. |
| `the-first-trimester-emotionally` | C (30H direct) | yes | April 2026 | not_allowed | Crisis and self-harm pathway content (999/A&E/111/Samaritans, harm-to-self or baby wording). Partial retrieval could omit or reshape a crisis instruction. |
| `the-space-your-baby-will-come-home-to` | F (30E practical) | yes | April 2026 | not_allowed | Infant safe sleep / SIDS risk-reduction guidance. Incomplete restatement is directly hazardous. |
| `thrush-in-pregnancy` | A (30G direct) | yes | May 2026 | not_allowed | Medication selection, dosing or self-treatment thresholds. Any drift produces actionable medicines advice. |
| `trying-again-after-miscarriage` | E (30I later safety) | none | not recorded | not_allowed | Pregnancy loss and adverse-finding content. Tone and sequencing are inseparable from safety; paraphrase risk is unacceptable. |
| `watery-discharge-in-pregnancy` | B (30G later health/safety) | yes | May 2026 | not_allowed | Time-critical triage rules where a softened or partial answer could delay same-day or emergency care. |
| `what-if-a-scan-shows-something-unexpected` | B (30G later health/safety) | yes | May 2026 | not_allowed | Pregnancy loss and adverse-finding content. Tone and sequencing are inseparable from safety; paraphrase risk is unacceptable. |
| `what-to-buy-for-a-new-baby` | F (30E practical) | none | not recorded | not_allowed | Infant safe sleep / SIDS risk-reduction guidance. Incomplete restatement is directly hazardous. |
| `when-the-joy-doesnt-arrive-yet` | C (30H direct) | yes | April 2026 | not_allowed | Crisis and self-harm pathway content (999/A&E/111/Samaritans, harm-to-self or baby wording). Partial retrieval could omit or reshape a crisis instruction. |
| `when-to-go-in-for-labour` | A (30G direct) | yes | April 2026 | not_allowed | Time-critical triage rules where a softened or partial answer could delay same-day or emergency care. |
| `when-to-worry-about-cramps-in-pregnancy` | A (30G direct) | yes | May 2026 | not_allowed | Time-critical triage rules where a softened or partial answer could delay same-day or emergency care. |
| `your-body-after-birth` | D (30I direct) | none | not recorded | not_allowed | Crisis and self-harm pathway content (999/A&E/111/Samaritans, harm-to-self or baby wording). Partial retrieval could omit or reshape a crisis instruction. |

### safety_sensitive (41)

| Slug | Provenance | Source list | Last updated | Proposed sensitivity | Basis |
| --- | --- | --- | --- | --- | --- |
| `anti-d-injection-in-pregnancy` | A (30G direct) | yes | May 2026 | safety_sensitive | Health-reviewed clinical explainer with embedded escalation wording; safe only under full safety-sensitive governance. |
| `back-pain-in-pregnancy` | D (30I direct) | yes | April 2026 | safety_sensitive | Health-reviewed clinical explainer with embedded escalation wording; safe only under full safety-sensitive governance. |
| `braxton-hicks-contractions` | D (30I direct) | yes | April 2026 | safety_sensitive | Health-reviewed clinical explainer with embedded escalation wording; safe only under full safety-sensitive governance. |
| `breech-baby` | B (30G later health/safety) | yes | April 2026 | safety_sensitive | Health-reviewed clinical explainer with embedded escalation wording; safe only under full safety-sensitive governance. |
| `complete-guide-morning-sickness` | D (30I direct) | yes | March 2026 | safety_sensitive | Health-reviewed clinical explainer with embedded escalation wording; safe only under full safety-sensitive governance. |
| `constipation-in-pregnancy` | D (30I direct) | yes | April 2026 | safety_sensitive | Health-reviewed clinical explainer with embedded escalation wording; safe only under full safety-sensitive governance. |
| `discharge-in-pregnancy` | B (30G later health/safety) | yes | May 2026 | safety_sensitive | Health-reviewed clinical explainer with embedded escalation wording; safe only under full safety-sensitive governance. |
| `early-pregnancy-symptoms-explained` | D (30I direct) | yes | March 2026 | safety_sensitive | Health-reviewed clinical explainer with embedded escalation wording; safe only under full safety-sensitive governance. |
| `external-cephalic-version` | A (30G direct) | yes | May 2026 | safety_sensitive | Health-reviewed clinical explainer with embedded escalation wording; safe only under full safety-sensitive governance. |
| `feeding-your-baby-complete-guide` | A (30G direct) | yes | March 2026 | safety_sensitive | Health-reviewed clinical explainer with embedded escalation wording; safe only under full safety-sensitive governance. |
| `first-trimester-complete-guide` | D (30I direct) | yes | March 2026 | safety_sensitive | Health-reviewed clinical explainer with embedded escalation wording; safe only under full safety-sensitive governance. |
| `foods-to-avoid-in-pregnancy` | A (30G direct) | yes | April 2026 | safety_sensitive | Health-reviewed clinical explainer with embedded escalation wording; safe only under full safety-sensitive governance. |
| `group-b-strep-in-pregnancy` | A (30G direct) | yes | May 2026 | safety_sensitive | Health-reviewed clinical explainer with embedded escalation wording; safe only under full safety-sensitive governance. |
| `growth-scans-in-pregnancy` | D (30I direct) | yes | April 2026 | safety_sensitive | Health-reviewed clinical explainer with embedded escalation wording; safe only under full safety-sensitive governance. |
| `hand-expressing-colostrum` | D (30I direct) | yes | May 2026 | safety_sensitive | Health-reviewed clinical explainer with embedded escalation wording; safe only under full safety-sensitive governance. |
| `heartburn-in-pregnancy` | D (30I direct) | yes | April 2026 | safety_sensitive | Health-reviewed clinical explainer with embedded escalation wording; safe only under full safety-sensitive governance. |
| `how-your-baby-develops-in-pregnancy` | D (30I direct) | yes | April 2026 | safety_sensitive | Health-reviewed clinical explainer with embedded escalation wording; safe only under full safety-sensitive governance. |
| `implantation-bleeding` | B (30G later health/safety) | yes | March 2026 | safety_sensitive | Health-reviewed clinical explainer with embedded escalation wording; safe only under full safety-sensitive governance. |
| `induction-of-labour` | A (30G direct) | yes | May 2026 | safety_sensitive | Health-reviewed clinical explainer with embedded escalation wording; safe only under full safety-sensitive governance. |
| `ivf-timeline-what-to-expect` | D (30I direct) | yes | March 2026 | safety_sensitive | Health-reviewed clinical explainer with embedded escalation wording; safe only under full safety-sensitive governance. |
| `key-nutrients-in-pregnancy` | D (30I direct) | yes | April 2026 | safety_sensitive | Health-reviewed clinical explainer with embedded escalation wording; safe only under full safety-sensitive governance. |
| `measuring-big-or-small-in-pregnancy` | B (30G later health/safety) | yes | April 2026 | safety_sensitive | Health-reviewed clinical explainer with embedded escalation wording; safe only under full safety-sensitive governance. |
| `membrane-sweep` | A (30G direct) | yes | May 2026 | safety_sensitive | Health-reviewed clinical explainer with embedded escalation wording; safe only under full safety-sensitive governance. |
| `moving-your-body-in-pregnancy` | D (30I direct) | yes | April 2026 | safety_sensitive | Health-reviewed clinical explainer with embedded escalation wording; safe only under full safety-sensitive governance. |
| `mucus-plug` | A (30G direct) | yes | May 2026 | safety_sensitive | Health-reviewed clinical explainer with embedded escalation wording; safe only under full safety-sensitive governance. |
| `pelvic-pain-in-pregnancy` | D (30I direct) | yes | April 2026 | safety_sensitive | Health-reviewed clinical explainer with embedded escalation wording; safe only under full safety-sensitive governance. |
| `round-ligament-pain` | D (30I direct) | yes | April 2026 | safety_sensitive | Health-reviewed clinical explainer with embedded escalation wording; safe only under full safety-sensitive governance. |
| `second-trimester-complete-guide` | D (30I direct) | yes | May 2026 | safety_sensitive | Health-reviewed clinical explainer with embedded escalation wording; safe only under full safety-sensitive governance. |
| `show-in-pregnancy` | A (30G direct) | yes | May 2026 | safety_sensitive | Health-reviewed clinical explainer with embedded escalation wording; safe only under full safety-sensitive governance. |
| `signs-of-labour` | A (30G direct) | yes | April 2026 | safety_sensitive | Health-reviewed clinical explainer with embedded escalation wording; safe only under full safety-sensitive governance. |
| `sleep-in-pregnancy` | D (30I direct) | yes | April 2026 | safety_sensitive | Health-reviewed clinical explainer with embedded escalation wording; safe only under full safety-sensitive governance. |
| `stages-of-labour` | A (30G direct) | yes | April 2026 | safety_sensitive | Health-reviewed clinical explainer with embedded escalation wording; safe only under full safety-sensitive governance. |
| `tests-and-scans-in-pregnancy` | D (30I direct) | yes | April 2026 | safety_sensitive | Health-reviewed clinical explainer with embedded escalation wording; safe only under full safety-sensitive governance. |
| `the-36-week-appointment` | D (30I direct) | yes | May 2026 | safety_sensitive | Health-reviewed clinical explainer with embedded escalation wording; safe only under full safety-sensitive governance. |
| `third-trimester-complete-guide` | D (30I direct) | yes | May 2026 | safety_sensitive | Health-reviewed clinical explainer with embedded escalation wording; safe only under full safety-sensitive governance. |
| `twins-and-multiples-in-pregnancy` | B (30G later health/safety) | yes | April 2026 | safety_sensitive | Health-reviewed clinical explainer with embedded escalation wording; safe only under full safety-sensitive governance. |
| `uti-in-pregnancy` | A (30G direct) | yes | May 2026 | safety_sensitive | Health-reviewed clinical explainer with embedded escalation wording; safe only under full safety-sensitive governance. |
| `vaccinations-in-pregnancy` | A (30G direct) | yes | April 2026 | safety_sensitive | Health-reviewed clinical explainer with embedded escalation wording; safe only under full safety-sensitive governance. |
| `weight-changes-in-pregnancy` | D (30I direct) | yes | April 2026 | safety_sensitive | Health-reviewed clinical explainer with embedded escalation wording; safe only under full safety-sensitive governance. |
| `what-happens-if-labour-doesnt-start` | A (30G direct) | yes | May 2026 | safety_sensitive | Health-reviewed clinical explainer with embedded escalation wording; safe only under full safety-sensitive governance. |
| `when-you-cant-face-food-in-pregnancy` | D (30I direct) | yes | April 2026 | safety_sensitive | Health-reviewed clinical explainer with embedded escalation wording; safe only under full safety-sensitive governance. |

### health_reviewed_reconciliation (9)

| Slug | Provenance | Source list | Last updated | Proposed sensitivity | Basis |
| --- | --- | --- | --- | --- | --- |
| `anterior-placenta` | D (30I direct) | yes | April 2026 | health_reviewed_reconciliation | Routine explanatory physiology or testing content; safety wording is secondary. Requires human health reconciliation before any candidacy. |
| `baby-hiccups-in-the-womb` | D (30I direct) | yes | April 2026 | health_reviewed_reconciliation | Routine explanatory physiology or testing content; safety wording is secondary. Requires human health reconciliation before any candidacy. |
| `baby-milestones-first-year` | B (30G later health/safety) | none | not recorded | health_reviewed_reconciliation | Routine explanatory physiology or testing content; safety wording is secondary. Requires human health reconciliation before any candidacy. |
| `cord-around-the-neck-in-pregnancy` | B (30G later health/safety) | yes | April 2026 | health_reviewed_reconciliation | Routine explanatory physiology or testing content; safety wording is secondary. Requires human health reconciliation before any candidacy. |
| `faint-positive-pregnancy-test` | B (30G later health/safety) | none | not recorded | health_reviewed_reconciliation | Routine explanatory physiology or testing content; safety wording is secondary. Requires human health reconciliation before any candidacy. |
| `how-long-implantation-takes` | D (30I direct) | none | not recorded | health_reviewed_reconciliation | Routine explanatory physiology or testing content; safety wording is secondary. Requires human health reconciliation before any candidacy. |
| `nausea-in-early-pregnancy` | D (30I direct) | none | not recorded | health_reviewed_reconciliation | Routine explanatory physiology or testing content; safety wording is secondary. Requires human health reconciliation before any candidacy. |
| `symptoms-stopping-early-pregnancy` | A (30G direct) | none | not recorded | health_reviewed_reconciliation | Routine explanatory physiology or testing content; safety wording is secondary. Requires human health reconciliation before any candidacy. |
| `when-to-take-a-pregnancy-test` | D (30I direct) | none | not recorded | health_reviewed_reconciliation | Routine explanatory physiology or testing content; safety wording is secondary. Requires human health reconciliation before any candidacy. |

### low_reconciliation (4)

| Slug | Provenance | Source list | Last updated | Proposed sensitivity | Basis |
| --- | --- | --- | --- | --- | --- |
| `birth-preferences` | F (30E practical) | yes | May 2026 | low_reconciliation | Practical, explicitly non-clinical preparation content. Requires human reconciliation before any candidacy. |
| `family-sick-days-at-home` | A (30G direct) | yes | July 2026 | low_reconciliation | Practical, explicitly non-clinical preparation content. Requires human reconciliation before any candidacy. |
| `hospital-bag-and-what-to-pack` | F (30E practical) | yes | April 2026 | low_reconciliation | Practical, explicitly non-clinical preparation content. Requires human reconciliation before any candidacy. |
| `writing-a-birth-plan` | F (30E practical) | none | not recorded | low_reconciliation | Practical, explicitly non-clinical preparation content. Requires human reconciliation before any candidacy. |

## 9. Source-list gaps

Eleven records in the pool carry no source list in the registry. This is recorded as a governance gap, not a reason to soften a sensitivity proposal, and each remains blocked regardless: `baby-milestones-first-year`, `chemical-pregnancy`, `faint-positive-pregnancy-test`, `how-long-implantation-takes`, `nausea-in-early-pregnancy`, `symptoms-stopping-early-pregnancy`, `trying-again-after-miscarriage`, `when-to-take-a-pregnancy-test`, `your-body-after-birth`, `what-to-buy-for-a-new-baby`, `writing-a-birth-plan`.

Eleven records also carry no `lastUpdated` value, which blocks the staleness evaluation required by `article-grounding-governance.md`.

## 10. Reconciliation records carried forward

- **9 `health_reviewed` reconciliation records.** Routine physiology, early-testing and normal-variation explainers whose safety wording is secondary. They are not accepted candidates. They require human health reconciliation before any candidacy can be considered.
- **4 `low` reconciliation records.** Explicitly non-clinical practical preparation content. They are not accepted candidates. They require human reconciliation before any candidacy can be considered.
- **0 new `wellbeing` reconciliation records.** The two Phase 30I wellbeing reconciliation records are unchanged and remain outside this pool.

## 11. Funnel audit

89 records entered. 89 records received a proposed sensitivity. Each slug appears in exactly one outcome table in section 8, verified programmatically against the reconstructed pool: 35 + 41 + 9 + 4 = 89, unique slug count 89, no slug omitted and no slug duplicated.

## 12. Verification

- Registry unchanged: 206 records, 117 live, 44 draft, 45 unknown. `approvalStatus` untouched for all records; every pool record remains `blocked_missing_metadata`.
- 0 approvals, 0 candidates, 0 eligible slugs. `listGroundingEligibleSlugs()` returns `[]`.
- AI runtime unchanged. `AI_SOURCE_ROUTING_VERSION` remains `30B-source-routing-v1`. No prompt, mode, safety or UI change.
- No article body content is imported, stored, returned, bundled or reproduced by this phase.

## 13. Status

Phase 30J is complete. Start of You article grounding remains **blocked**. Nothing here authorises Phase 30K, which requires the full per-article candidate authority evidence defined in `article-grounding-governance.md`, plus a human decision on the 35 proposed permanent blocks and the 13 reconciliation records.
