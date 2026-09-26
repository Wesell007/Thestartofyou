# Phase 40A — Product thesis alignment audit

Thesis tested: "a calm, context-aware continuity system for parenthood". Audit only; see companion documents for the capability map, moat map, claims registry and priorities. Capability numbers (#) refer to the capability map.

## 4. Six-layer alignment

| Layer | Rating | Current strength | Current gap | Future opportunity |
|---|---|---|---|---|
| A Journey continuity | PARTIAL | three saved lifecycles; pregnancy → first year transition with archived chapter and loss-aware statuses (#34, #37); Family handled as cross cutting | TTC → pregnancy needs re-entry; no concurrent pregnancy while parenting (#44); no saved context after 12 months (#45); IVF is content only (by design) | handoffs that reuse saved dates with confirmation |
| B Context | PARTIAL | page area (#16), saved stage/week/age (#14), session thread (#17) kept as separate layers | no article-level context; context invisible to the user | show what was used |
| B Permissioned memory | WEAK | explicit, confirmable, reversible design built (#21, #23) | OFF; settings only a prototype | release after trust surface |
| C Trust | PARTIAL | deterministic RED/CRISIS (#12), sanitisation (#13), approved source list (#18), strict reviewer gate | grounding 0 approved (#27), reviews 0 (#28), no freshness (#30), provenance not visible per answer | visible source type and context |
| D Action | WEAK | toolkit tools exist (#38, #39) | answers and articles never become actions (#43) | answer → existing tool |
| E Journal / memory continuity | PARTIAL | physical journal on sale (#10); private digital reflections and photos (#32, #33) | no bridge, export or print (#35, #36); journal awareness blocked (#26) | export first, bridge later |
| F Companion orchestration | PARTIAL | one runtime, two surfaces; journey next actions; safety composition | no tool, journal or history awareness in production | narrow orchestration into tools |

Other contexts: ACCOUNT context (profile, companion name) live; JOURNAL-DERIVED context blocked; INFERRED context deliberately none (content pages never infer personal stage, AIC-R1). "Tell us once": not supported today beyond the pregnancy → first year transition.

Future user control over memory (see, why, use, correct, delete, temporary, sensitive, journal permission): designed in AIC-3/JA2 documents; dependencies are privacy/legal approval, retention policy and the trust surface.

### Trust by answer class

| Class | Truth owner | Current behaviour | Provenance visible | Freshness matters | Escalation |
|---|---|---|---|---|---|
| Medical / health | NHS, NICE, RCOG | model answer, UK guidance rule, RED routing | source links only | medium | yes |
| Safety / first aid | NHS, St John, Red Cross | RED routing for listed patterns | no | low | yes, urgent |
| Mental wellbeing | NHS, Mind, PANDAS | CRISIS routing, emotional guidance | no | low | yes |
| Development | NHS, health visitor | model answer | links | low | when concerned |
| Parenting | editorial | model answer | no | low | rarely |
| Relationships | editorial; safety services | abuse subtype routing | no | low | abuse yes |
| Financial / policy | GOV.UK | model answer, general | no | HIGH | signpost |
| Practical family life | editorial | model answer | no | low | no |
| Reflection / decision | the person | model answer | not applicable | no | no |

Can a user answer today: "Why trust this?" partly; "Where from?" partly (links); "How current?" no; "Talk to a person?" yes for listed red flags, inconsistently otherwise.

### Action layer

| Output | Status |
|---|---|
| Checklist | PARTIAL (hospital bag, birth plan only as tools) |
| Small plan | ABSENT |
| Saved action | ABSENT |
| Reminder | PARTIAL (First Year reminders only) |
| Preparation item | PARTIAL (appointments tool) |
| Appointment question | PARTIAL (tool exists, no path from answers) |
| Conversation prompt | ABSENT |
| Journal reflection | PARTIAL (weekly reflections, not from answers) |
| Saved answer | ABSENT |
| Calculator / tool action | LIVE (next actions link to tools) |
| Later follow-up | BETTER NOT BUILT as automated nudges |

### Journal thesis: "Guidance helps you live the journey. The journal helps you keep it."
TRUE TODAY: guidance part; a physical pregnancy journal exists. PARTLY TRUE: private digital keeping (pregnancy reflections, first year memories). FUTURE VISION ONLY: the two connected, export, print, Companion awareness. The physical product is a credible brand advantage, not yet a product-system advantage.

## 5. Calm technology audit

| Mechanism | Class |
|---|---|
| Contraction timer | USEFUL_SIGNAL |
| Symptom notes with "mention at appointment" | USEFUL_SIGNAL |
| Baby movement notes (never delays calling) | USEFUL_SIGNAL |
| Hospital bag packing | USEFUL_SIGNAL |
| TTC cycle estimate inputs | USEFUL_SIGNAL |
| Birth plan completion percentage | OPTIONAL (mild progress-score risk) |
| First Year care event logging (feeds, nappies, sleep) | MENTAL_LOAD_RISK (little given back) |
| TTC daily logs | MENTAL_LOAD_RISK |
| First Year reminders / browser notifications | OPTIONAL (opt-in) |
| Streaks, scores, gamification | REMOVE_FROM_VISION (none exist) |

Tracking mechanisms 8 (first eight excluding reminders); with clear value return 5; mental-load risks 4 (care logging, TTC logs, completion percentage, notifications if multiplied); tracking recommended against expanding 2 (care logging, TTC logs). No streaks found; `firstYearEntries` states it never scores.

## 9. Parent problem map

| Problem | Current response | Weakness | Best future response | Layer |
|---|---|---|---|---|
| Don't know what to trust | sourced guidance, safety routing | provenance invisible | visible source type | Trust |
| Already explained this | saved journey | TTC → pregnancy re-entry, no memory | handoff, permissioned memory | Continuity |
| What applies to me | saved week/age next actions | only when signed in | context line | Context |
| Know it, don't know what to do | links to tools | no conversion | answer → tool | Action |
| Overwhelmed by tracking | no streaks | some logs give little back | track only with value | Calm |
| Want to remember this | reflections, memories, physical journal | disconnected, no export | export, bridge | Journal |
| Preparing for something | pregnancy toolkit | not reachable from answers | answer → appointment question | Action |
| Need to decide | general answers | no decision support | reflection prompt | Companion |
| When an app is not enough | RED/CRISIS routing | amber OFF | consistent "talk to someone" | Trust |
| Moving stage, don't restart | pregnancy → first year | TTC gap, toddler unsaved | handoffs | Continuity |

## 10. Continuity moments (15)

| Moment | Today | Ideal | Memory needed | Safety | Automate? | Smallest version |
|---|---|---|---|---|---|---|
| TTC → positive test | new setup | offer pregnancy start from saved dates | none | loss-aware | no, confirm | handoff offer |
| Pregnancy → birth | status change, archive | same, gentle | none | loss outcomes | no | exists |
| Preparing siblings | one Family link | contextual | none | low | no | exists |
| Birth → First Year | transition live | same | none | low | no | exists |
| Early feeding → later feeding | none | recall with consent | yes | medical | no | history release |
| Sleep revisited | none | recall | yes | low | no | history release |
| Return to work | guidance only | plan | optional | low | no | checklist |
| Pregnant while parenting | not supported | two contexts | none | medium | no | defer |
| Baby → Toddler | saved journey ends at 12 months | guidance continues | none | low | no | link |
| Toddler issue → Family | links | links | none | low | no | exists |
| Article → Companion | page area mode | article aware | none | low | no | article context |
| Companion → tool | next action links | add to tool | none | GREEN only | no | #43 |
| Companion → Journal | none | save as reflection | none | privacy | no | defer |
| Journal → reflection later | none | revisit | journal | privacy | no | defer |
| Appointment preparation | tool only | answers feed it | none | GREEN only | no | #43 |

## 11. Trust moments

| Moment | Source | Type | Last checked | Uncertainty | Escalation | Why seeing | Based on context |
|---|---|---|---|---|---|---|---|
| Symptom | yes | yes | no | yes | yes | no | yes |
| Medication | yes | yes | yes | yes | yes | no | no |
| First aid | yes | yes | no | no | yes, first | no | no |
| Pregnancy safety | yes | yes | no | yes | yes | no | yes |
| Development concern | yes | yes | no | yes | yes | no | yes |
| Mental-health escalation | no | no | no | no | yes, only | no | no |
| Childcare entitlement | yes | yes | YES | yes | signpost | no | no |
| Financial / policy | yes | yes | YES | yes | signpost | no | no |
| Relationship safety | no | no | no | no | yes, only | no | no |

## 12. Action-conversion candidates (10)

| Candidate | Value | Complexity | Dependencies | Safety | Reuse |
|---|---|---|---|---|---|
| Answer → question for midwife/GP/HV | H | L | midwife_questions | GREEN only | H |
| Article → checklist | M | M | content | low | H |
| Preparing for baby → hospital bag | H | L | hospital_bag_items | low | M |
| Answer → remember this (memory) | M | M | #21 | privacy | H |
| Symptom answer → symptom note | M | L | symptom notes | never replaces calling | M |
| Guidance → partner conversation prompt | M | L | none | relationship safety | M |
| Return to work → plan | M | M | new list | low | M |
| Travel → packing list | L | L | none | low | L |
| Decision → journal reflection | M | M | reflections | privacy | M |
| Appointment → preparation summary | H | M | appointments | GREEN only | H |

## 13. Journal / physical opportunity
- Brand: a real, physical keepsake gives warmth and credibility few digital-only rivals have (HYP).
- Product: QR into a matching digital chapter; optional backup; print/export of digital chapters.
- Commercial: physical sales and cross-sell; a second volume for the first year.
- Technical: account link, storage, export pipeline.
- Privacy: photos and reflections are sensitive; no AI reading of journal text without the blocked approval.
- Uniquely coherent: guided prompts that match the stage content already on the site, kept private by default; not a photo-book printer clone.

## 14. Commercial role

| Capability | Role |
|---|---|
| Editorial guidance | FREE ACQUISITION, TRUST |
| Calculators | FREE ACQUISITION |
| Companion | RETENTION |
| Visible trust | TRUST / BRAND VALUE |
| Answer → action | RETENTION, PAID SUBSCRIPTION candidate |
| Continuity / memory | PAID SUBSCRIPTION candidate, RETENTION |
| Journal continuity | PHYSICAL PRODUCT SALES, CROSS-SELL |
| Voice | NO MATERIAL COMMERCIAL ROLE now |

## 16. Differentiation statements

| Statement | True now | Aspirational | Distinctive | Too generic | Too technical |
|---|---|---|---|---|---|
| A content platform with AI | yes | no | no | yes | no |
| B AI parenting companion | partly | no | no (E1) | yes | no |
| C Connected parenting platform | partly | yes | weak | yes | no |
| D Calm, context-aware continuity system | no | yes | yes | no | yes (internal use) |
| E One relationship with support that evolves with your family | partly | yes | yes | no | no |

Use D internally as the north star; E is the candidate public expression once priorities 1 and 3 ship.

## 19. Product principles
1. Context before cleverness: show what an answer used before adding more AI capability.
2. Trust before automation: no action, memory or proactive feature ships ahead of a visible trust surface.
3. Continuity without surveillance: carry forward only what the person saved or confirmed; never infer from reading.
4. Track only when tracking gives value back: every log must return a summary, preparation or appointment use.
5. AI when useful, human help when needed: RED/CRISIS answers carry no ordinary actions.
6. The Companion connects the product; it is not the product: prefer routing into guidance and tools over longer answers.

## 20. About-page implications
- Current About claims still true: 23 of 36
- Outdated: 0
- Too feature-led: 9 (the Ecosystem list)
- Undersell: 3 (saved journey continuity, safety escalation, private reflections and photos are not mentioned)
- Overstate: 3 ("Physical and digital", "work as one system", "connected across every stage")
- Sections to keep: 4 (Problem, Adaptive, Mission, CTA)
- Sections to reframe: 4 (Hero, Approach, Ecosystem, Different)
- Sections to remove: 1 (Journal connection "Physical and digital", fold the physical journal into the ecosystem)
- New concepts: 5 (continuity across saved stages; what the Companion knows and does not; trust and when to talk to someone; calm, no tracking pressure; the journal as keeping)

Named ideas: "Most guidance ... is noise" soften; "What we built" reframe as outcomes; "The journey rarely feels guided" keep; "So we built something connected" qualify; "One journey, connected across every stage" qualify to saved stages; "Support that adapts to where you are" qualify; "Some moments need somewhere offline to live" keep; "Designed differently" keep, weak; "Why this exists" keep.

## Final verdict
1. Today: a calm, well-governed UK editorial guidance product across five stages, with a journey-aware Companion, strong deterministic safety routing, three saved lifecycles, private pregnancy and first year keeping tools, and a separate physical journal.
2. Should become: one relationship with support that evolves with the family, carrying forward only what people choose.
3. Gap: context is invisible, answers never become actions, continuity breaks at TTC → pregnancy, memory is off, and journal keeping is disconnected.
4. Defensible: not AI or memory (commodity/expected, E1–E4) but the combination of honest trust governance, consented longitudinal continuity and calm design (HYP).
5. Next smallest phase: Visible context and trust, smallest version (priority 1). Not started.
