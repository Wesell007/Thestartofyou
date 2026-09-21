# Phase 36B — Pregnancy journey gap register

Audit only. Nothing in this register has been implemented.

## 1. Journey-moment matrix

Each moment carries exactly one primary classification. Arithmetic is reconciled in section 2.

| # | Journey moment | Classification | Current surface | Problem | Recommended treatment | Sensitivity | Priority |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | Positive test, what now | COVERED | TTC pregnancy-tests handoff → `/pregnancy` | — | NO_ACTION | Medium | — |
| 2 | Working out a due date | BETTER_SERVED_BY_TOOL | `/due-date-calculator` | — | NO_ACTION | Low | — |
| 3 | Booking appointment | COVERED | what-happens-at-booking-appointment | — | NO_ACTION | Low | — |
| 4 | Early pregnancy symptoms | COVERED | early-pregnancy-symptoms-explained | — | NO_ACTION | Medium | — |
| 5 | Implantation bleeding | COVERED | implantation-bleeding | — | NO_ACTION | Medium | — |
| 6 | Pregnant after IVF | COVERED | `/ivf/early-pregnancy` + hub IVF pathway | — | NO_ACTION | Medium | — |
| 7 | Morning sickness | COVERED | complete-guide-morning-sickness | — | NO_ACTION | Medium | — |
| 8 | Severe sickness (hyperemesis) | PARTIALLY_COVERED | Mentioned 29 times in articles, 12 in weeks; no owning section | EXPAND_EXISTING (morning sickness guide) | High | P2 |
| 9 | Fatigue in early pregnancy | COVERED | fatigue-in-early-pregnancy | — | NO_ACTION | Low | — |
| 10 | Bleeding in early pregnancy | COVERED | bleeding-in-early-pregnancy | — | NO_ACTION | High | — |
| 11 | Symptoms disappearing | COVERED | symptoms-stopping-early-pregnancy | Orphaned (see section 4) | INTERNAL_LINK | High | P1 |
| 12 | hCG levels | COVERED | hcg-levels-explained | — | NO_ACTION | Medium | — |
| 13 | Dating scan | COVERED | tests-and-scans-in-pregnancy, week 12 | — | NO_ACTION | Medium | — |
| 14 | First trimester emotionally | COVERED | the-first-trimester-emotionally | — | NO_ACTION | Medium | — |
| 15 | Deciding when to tell people | PARTIALLY_COVERED | Prose inside emotional articles and week pages | TOPIC_PAGE_COPY (feelings) | Medium | P3 |
| 16 | Week-by-week early orientation | BETTER_SERVED_BY_WEEK_PAGE | Weeks 4–12 | — | NO_ACTION | Low | — |
| 17 | 20-week anomaly scan | COVERED | 20-week-anomaly-scan | — | NO_ACTION | High | — |
| 18 | First movements | COVERED | baby-movement-in-pregnancy | — | NO_ACTION | Medium | — |
| 19 | Reduced movements | COVERED | reduced-movements-in-pregnancy + 42 week seek-support blocks | — | NO_ACTION | High | — |
| 20 | Anterior placenta | COVERED | anterior-placenta | — | NO_ACTION | Medium | — |
| 21 | Mid-pregnancy aches and body change | COVERED | pelvic-pain, heartburn, swelling, shortness-of-breath | — | NO_ACTION | Low | — |
| 22 | Gestational diabetes and the GTT | COVERED | gestational-diabetes | — | NO_ACTION | High | — |
| 23 | Mid-pregnancy chapter orientation | BETTER_SERVED_BY_TRIMESTER_PAGE | `/pregnancy/second-trimester` | — | NO_ACTION | Low | — |
| 24 | Finding out the sex | BETTER_SERVED_BY_WEEK_PAGE | Weeks 16 and 20 | — | NO_ACTION | Low | — |
| 25 | Signs of labour | COVERED | signs-of-labour | — | NO_ACTION | High | — |
| 26 | When to go in | COVERED | when-to-go-in-for-labour | — | NO_ACTION | High | — |
| 27 | Stages of labour | COVERED | stages-of-labour | — | NO_ACTION | High | — |
| 28 | Pain relief options in labour | PARTIALLY_COVERED | 20 article mentions, 13 week mentions; epidural named 6 times, no owning section | EXPAND_EXISTING (stages-of-labour) | High | P2 |
| 29 | Birth preferences | COVERED | birth-preferences | Duplicate intent with writing-a-birth-plan | MERGE | Medium | P2 |
| 30 | Hospital bag | COVERED | hospital-bag-and-what-to-pack | — | NO_ACTION | Low | — |
| 31 | Caesarean birth | COVERED | caesarean-birth | — | NO_ACTION | High | — |
| 32 | Induction | COVERED | induction-of-labour | — | NO_ACTION | High | — |
| 33 | Going past your dates | COVERED | what-happens-if-labour-doesnt-start, weeks 40–42 | — | NO_ACTION | Medium | — |
| 34 | Membrane sweep, ECV, breech | COVERED | membrane-sweep, external-cephalic-version, breech-baby | — | NO_ACTION | High | — |
| 35 | Group B Strep | COVERED | group-b-strep-in-pregnancy | — | NO_ACTION | High | — |
| 36 | Antenatal classes | PARTIALLY_COVERED | 4 article mentions; no owning section or destination | INTERNAL_LINK | Low | P3 |
| 37 | Medicines in pregnancy | COVERED | medicines-in-pregnancy | — | NO_ACTION | High | — |
| 38 | Paracetamol and pain relief at home | COVERED | paracetamol-in-pregnancy | Broken related link (see section 4) | INTERNAL_LINK | High | P1 |
| 39 | Vaccinations | COVERED | vaccinations-in-pregnancy | — | NO_ACTION | High | — |
| 40 | Alcohol | NOT_REQUIRED_STANDALONE | 57 article and 28 week mentions inside diet and safety guidance | NO_ACTION | High | — |
| 41 | Smoking and vaping | NOT_REQUIRED_STANDALONE | 47 article and 7 week mentions | NO_ACTION | High | — |
| 42 | Pre-eclampsia and blood pressure | PARTIALLY_COVERED | 31 article and 35 week mentions; no owning section | EXPAND_EXISTING (swelling-in-pregnancy) | High | P2 |
| 43 | Itching and cholestasis | COVERED | itching-in-pregnancy | — | NO_ACTION | High | — |
| 44 | Iron and anaemia | BETTER_SERVED_BY_TOPIC_PAGE | `/pregnancy/diet-and-exercise` + key-nutrients-in-pregnancy | — | NO_ACTION | Medium | — |
| 45 | Infections, colds, food risks | COVERED | cold-and-flu-in-pregnancy, eating-well-in-pregnancy | — | NO_ACTION | Medium | — |
| 46 | Travel and flying | UNCOVERED | No Pregnancy surface carries travel or flying guidance. The earlier "40 article and 33 week mentions" figure was a false positive: almost every match is the verb "travel" in unrelated sentences, and "flying", "air travel" and "airline" appear zero times in the audited article, week and topic datasets. The only real references are travel-vaccine asides in `vaccinations-in-pregnancy` | FUTURE EDITORIAL DECISION / NO CURRENT VALID OWNER (not a release blocker; no new article required before closure) | Medium | P3 |
| 47 | Eating well | COVERED | eating-well-in-pregnancy | — | NO_ACTION | Medium | — |
| 48 | Foods to avoid | COVERED | eating-well-in-pregnancy | — | NO_ACTION | High | — |
| 49 | Key nutrients and supplements | COVERED | key-nutrients-in-pregnancy | — | NO_ACTION | Medium | — |
| 50 | Caffeine | COVERED | caffeine-in-pregnancy | — | NO_ACTION | Medium | — |
| 51 | Exercise safety | COVERED | moving-your-body, exercise-safety-by-trimester | — | NO_ACTION | Medium | — |
| 52 | Hydration, cravings, appetite loss | COVERED | hydration, cravings-and-aversions, when-you-cant-face-food | — | NO_ACTION | Low | — |
| 53 | Anxiety in pregnancy | COVERED | anxiety-in-pregnancy | — | NO_ACTION | High | — |
| 54 | Low mood in pregnancy | COVERED | when-the-joy-doesnt-arrive-yet + anxiety guidance | — | NO_ACTION | High | — |
| 55 | Pregnancy after loss | COVERED | pregnancy-after-loss | — | NO_ACTION | High | — |
| 56 | Partner and support-person role in pregnancy | PARTIALLY_COVERED | Partner guidance exists on the TTC side only; pregnancy-side coverage is prose | TOPIC_PAGE_COPY (feelings) | Medium | P3 |
| 57 | Body image and identity | BETTER_SERVED_BY_TOPIC_PAGE | `/pregnancy/feelings` | — | NO_ACTION | Medium | — |
| 58 | Open-ended emotional questions | BETTER_SERVED_BY_COMPANION | Hub Companion + 6 topic handoffs | — | NO_ACTION | Medium | — |
| 59 | Urgent symptoms, when to seek help | COVERED | 42 week seek-support blocks, topic safety copy, hub question 6 | — | NO_ACTION | High | — |
| 60 | Miscarriage support during pregnancy | PARTIALLY_COVERED | Mentioned 51 times in articles and 25 in weeks; the only dedicated records sit on the TTC side | LOSS_HANDOFF | High | P1 |
| 61 | Late loss and stillbirth | BETTER_SERVED_BY_SUPPORT_SURFACE | Week seek-support and clinical-escalation wording | Keep as escalation, not editorial | High | — |
| 62 | IVF to Pregnancy boundary | COVERED | Hub IVF pathway + `/ivf/early-pregnancy` two-way links | — | NO_ACTION | Medium | — |
| 63 | Pregnancy to First Year content handoff | PARTIALLY_COVERED | One editorial link in the whole Pregnancy surface (third-trimester deeper strip → `/first-year#recovery-topics`); weeks 40–42 end inside Pregnancy | FIRST_YEAR_HANDOFF | Medium | P1 |
| 64 | Pregnancy to First Year lifecycle routing | COVERED | `resolvePublicAccountLink` + `/setup/pregnancy`, three lifecycles unchanged | NO_ACTION | Low | — |

## 2. Matrix arithmetic

| Classification | Count |
| --- | --- |
| COVERED | 45 |
| PARTIALLY_COVERED | 8 |
| UNCOVERED | 1 |
| NOT_REQUIRED_STANDALONE | 2 |
| BETTER_SERVED_BY_WEEK_PAGE | 2 |
| BETTER_SERVED_BY_TOPIC_PAGE | 2 |
| BETTER_SERVED_BY_TRIMESTER_PAGE | 1 |
| BETTER_SERVED_BY_TOOL | 1 |
| BETTER_SERVED_BY_SUPPORT_SURFACE | 1 |
| BETTER_SERVED_BY_COMPANION | 1 |
| BETTER_SERVED_BY_IVF | 0 |
| BETTER_SERVED_BY_FIRST_YEAR | 0 |
| **Better served elsewhere subtotal** | **8** |
| **Total moments audited** | **64** |

45 + 8 + 1 + 2 + 8 = 64. Reconciled (corrected in the Phase 36C final evidence reconciliation: moment 46 moved from PARTIALLY_COVERED to UNCOVERED).

## 3. Gap-treatment classification

Each PARTIALLY_COVERED moment, plus the single UNCOVERED moment, receives exactly one treatment. No moment defaults to NEW_ARTICLE.

| Moment | Treatment |
| --- | --- |
| 8 Hyperemesis | EXPAND_EXISTING |
| 11 Symptoms disappearing (orphan) | INTERNAL_LINK |
| 15 Telling people | TOPIC_PAGE_COPY |
| 28 Labour pain relief | EXPAND_EXISTING |
| 29 Birth preferences duplication | MERGE |
| 36 Antenatal classes | INTERNAL_LINK |
| 42 Pre-eclampsia | EXPAND_EXISTING |
| 46 Travel and flying | FUTURE EDITORIAL DECISION / NO CURRENT VALID OWNER (UNCOVERED, P3, non-blocking) |
| 56 Partner in pregnancy | TOPIC_PAGE_COPY |
| 60 Miscarriage support | LOSS_HANDOFF |
| 63 First Year handoff | FIRST_YEAR_HANDOFF |

NEW_ARTICLE = **0**. No candidate met all six shortlist tests: every thin area is already owned by an existing article, topic page or week module, and creating a new record would cannibalise that owner.

## 4. Orphan, weak-discovery and link register

- ORPHANED PREGNANCY ARTICLES = **2** — `symptoms-stopping-early-pregnancy` (no in-site inbound path; still indexable and searchable), `low-lying-placenta-in-pregnancy` (same).
- WEAK-DISCOVERY = **1** — `nausea-in-early-pregnancy`: its single inbound reference is another article's related list, its parent topic page does not list it, and the stronger `complete-guide-morning-sickness` owns the same intent at hub and topic level.
- ORPHANED NON-ARTICLE SURFACES = **0** (`/due-date-results` and `/journey-support` have no hrefs by design — both are reached by navigation after an action).
- BROKEN INTERNAL LINKS = **0** rendered. **4** stale related-article references are silently dropped by `getRelatedArticles` before render: `nausea-in-early-pregnancy`, `fatigue-in-early-pregnancy` and `symptoms-stopping-early-pregnancy` each point at a non-existent `first-trimester-symptoms`; `paracetamol-in-pregnancy` points at a non-existent `headaches-in-pregnancy`. Visitors see fewer related reads than intended, not a broken link.
- WRONG-DESTINATION LINKS = **0**
- INDEXABLE LEGACY OR DUPLICATE SURFACES = **0**

## 5. Duplication and cannibalisation register

| Pair or cluster | Verdict |
| --- | --- |
| birth-preferences vs writing-a-birth-plan | MERGE |
| preparing-for-baby-complete-guide vs `/preparing-for-baby` hub vs `/pregnancy/preparing-for-baby` topic | KEEP_SEPARATE (hub orients, topic groups, article narrates) |
| Topic pages vs trimester pages | KEEP_SEPARATE (theme vs chapter) |
| Week pages vs trimester pages | KEEP_SEPARATE (narration vs orientation) |
| Pregnancy vs IVF early pregnancy | KEEP_SEPARATE (two-way crossover works) |
| Pregnancy vs loss content (TTC-side records) | INTERNAL_LINK |
| Pregnancy vs First Year (`recovery-topics`) | INTERNAL_LINK |
| Companion prompts masking missing guidance | NO_ACTION (0 found) |

## 6. Claim and source register

| Claim location | Percentage claims | Population-risk claims | Measurement claims | Certainty-language flags |
| --- | --- | --- | --- | --- |
| Hub and topic surfaces | 0 | 0 | 0 | 0 |
| Trimester surfaces | 0 | 0 | 0 | 0 |
| Articles | 32 | 24 | 23 | 2 |
| Week pages and week data | 49 | 19 | 243 | 0 |

Article claims map to 27 records. 68 of their 82 numerical claims sit in articles carrying structured source records; 12 sit in articles whose sources are label-only (complete-guide-morning-sickness, measuring-big-or-small-in-pregnancy, hydration-in-pregnancy, early-pregnancy-symptoms-explained, how-your-baby-develops-in-pregnancy, hand-expressing-colostrum) and 2 sit in articles with no source records.

- UNSUPPORTED PREGNANCY MEDICAL / NUMERICAL CLAIMS = **14** — Hub/topic surfaces **0**, Trimester surfaces **0**, Articles **14**, Week pages **0**.
- UNRESOLVED_PROVENANCE claims = **311** (all week-page numerical statements, backed by real but hub-level sources).
- Certainty-language concerns = **2** article phrasings using "completely normal" about implantation bleeding.
- Medication-safety wording: reviewed across medicines-in-pregnancy, paracetamol-in-pregnancy, hay-fever, cold-and-flu and the diet guidance. All observed phrasing defers to a midwife, GP or pharmacist and avoids instruction to start, stop or dose. MEDICATION-SAFETY WORDING CONCERNS = **0**.

Source record classification (Pregnancy records only): total **351** — STRUCTURED_VERIFIED **225**, LABEL_ONLY **126**, MISSING **5 articles with no records at all**, UNRESOLVED_PROVENANCE **42 week modules at hub level**.

## 7. Blockers versus enhancements

CURRENT PREGNANCY RELEASE BLOCKERS = **0**. No broken public route, no unsafe live medical claim, no material health or safety gap, no broken IVF handoff, no major week-page defect, no critical guidance available only through AI.

Future enhancements, in priority order:

- P1 — restore the 4 stale related-article references, give the 2 orphans one honest inbound path, add one loss-support handoff from a Pregnancy surface, add one Pregnancy → First Year handoff at the end of the week journey.
- P2 — expand hyperemesis, labour pain relief and pre-eclampsia inside their existing owners; merge the two birth-plan records.
- P3 — travel and flying, antenatal classes, telling people, partner role; optional checklists; article status-field normalisation; label-only source normalisation.
