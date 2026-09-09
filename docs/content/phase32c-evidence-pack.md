# Phase 32C — Postpartum / Recovery Evidence Pack

Documentation only. No runtime records, routes, navigation, sitemap, SEO architecture, AI, grounding, journal, memory, voice or database changes. No deployment. Phases 32A and 32B remain closed.

Sources checked: 9 September 2026.

---

## Phase 31 recovery findings

Exactly six records in `docs/content/phase31-opportunity-clusters.csv` carry `domain = Postpartum`. No cluster IDs are inferred.

| Cluster | Working title | Phase 31 classification | Representative keyword | Highest volume | Unique keywords | Directional volume | Closest owner in Phase 31 | Priority | Cannibalisation risk | Phase 31 review level | Recommended page type |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| C080 | Lochia and postnatal bleeding | COVERED_PARTIAL | lochia | 4,400 | 12 | 17,720 | `/first-year/postpartum-recovery/healing-after-birth` | P0 | LOW | not backlogged (existing action) | expand existing article |
| C078 | Diastasis recti | NEW_ARTICLE_GAP | divarication of rectus abdominis muscles exercises | 3,600 | 24 | 29,080 | none | P0 | LOW | HEALTH_REVIEW_REQUIRED | article |
| C081 | Perineal care after birth | NEW_ARTICLE_GAP | sitz bath | 12,100 | 1 | 12,100 | none | P1 | LOW | HEALTH_REVIEW_REQUIRED | article |
| C079 | Sex and recovery after birth | NEW_ARTICLE_GAP | sexual intercourse after c section | 1,300 | 27 | 19,440 | none | P1 | LOW | HEALTH_REVIEW_REQUIRED | article |
| C046 | Pelvic floor exercises | COVERED_STRONG | kegel exercises | 22,200 | 4 | 28,020 | `/articles/pelvic-floor-exercises-in-pregnancy` | P1 | LOW | not backlogged (linking action) | internal linking |
| C082 | Postnatal mental health | COVERED_STRONG | sitz bath | 12,100 | 158 | 109,690 | `/first-year/emotional-wellbeing/when-parenthood-feels-heavy` | P1 | LOW | not backlogged (linking action) | internal linking |

Arithmetic: records reviewed = 6; consolidated intents represented = 6; physical remediation intents = 5; mental-health intent reviewed and out of physical scope = 1; P0 = 2; P1 = 4; P2 = 0; unrelated = 0.

Repository cross-checks carried out during this phase — hair loss and night sweats, generic recovery ownership, caesarean recovery — are **not** Phase 31 cluster records and are reported separately from the arithmetic above.

---

## Current Start of You recovery inventory

Publication state and review state are reported separately per dataset, and never inferred from being live, old, health-related or present in the sitemap.

### First Year dataset — `src/data/firstYearArticleData.ts` (explicit `status` and `medicallyReviewed` fields exist)

| Route | `status` | `medicallyReviewed` | `reviewedBy` | Recovery intent currently owned |
| --- | --- | --- | --- | --- |
| `/first-year/postpartum-recovery/healing-after-birth` | ready | true | Jenny Joines | Physical healing across both birth routes; bleeding, soreness, stitches, scars, pelvic floor and core at overview depth |
| `/first-year/postpartum-recovery/what-recovery-can-feel-like` | ready | true | Jenny Joines | The felt experience of early recovery |
| `/first-year/body-and-hormones/body-changes-after-birth` | ready | true | Jenny Joines | Body change after birth |
| `/first-year/body-and-hormones/hormones-sweat-and-hair-loss` | ready | true | Jenny Joines | Hormonal shift, night sweats, hair shedding, breast change |
| `/first-year/checkups-and-warning-signs/postnatal-checks-and-appointments` | ready | true | Jenny Joines | Six-to-eight-week check and appointment pathway |
| `/first-year/checkups-and-warning-signs/when-to-ask-for-help-after-birth` | ready | true | Jenny Joines | Escalation and asking for help |
| `/first-year/emotional-wellbeing/feeling-like-yourself-again` | ready | true | Jenny Joines | Identity and adjustment |
| `/first-year/emotional-wellbeing/when-parenthood-feels-heavy` | ready | true | Jenny Joines | Postnatal mental health (C082 owner) |

### Legacy dataset — `src/data/articleData.ts` (no editorial-status field on records)

Publication state resolved from behaviour: record exists, route resolves under `/articles/:slug`, publicly accessible with no auth gate, self-canonical, no `noindex`, present in `public/sitemap.xml`, no redirect entry.

| Route | Publication state | Review state | Recovery intent currently owned |
| --- | --- | --- | --- |
| `/articles/postpartum-recovery-timeline` | LIVE_INDEXABLE (in sitemap) | Reviewer recorded (`reviewedBy: "Jenny Joines"`, `lastUpdated: "March 2026"`). No explicit `medicallyReviewed` field exists in this dataset — treat as REVIEWER RECORDED / NO EXPLICIT REVIEW FLAG | Broad cornerstone: postpartum recovery timeline, lochia at overview depth, hormones, pelvic floor |
| `/articles/your-body-after-birth` | LIVE_INDEXABLE (in sitemap) | Reviewer recorded; no explicit review flag | Broad body-change owner; names night sweats, hair loss, diastasis recti and pelvic floor at one-line depth |
| `/articles/pelvic-floor-exercises-in-pregnancy` | LIVE_INDEXABLE | Reviewer recorded; no explicit review flag | Pelvic floor exercises, pregnancy-framed |
| `/articles/pelvic-pain-in-pregnancy` | LIVE_INDEXABLE | Reviewer recorded; no explicit review flag | PGP/SPD in pregnancy |

### Structured surfaces

`/first-year/postpartum-recovery` topic page, First Year phase pages and early month pages already link to `healing-after-birth` and `what-recovery-can-feel-like`. No new structured surface is required by this phase.

### Metadata drift

`src/data/articleInventory.ts` still describes `healing-after-birth` and `what-recovery-can-feel-like` as `currentStatus: "draft"` / `contentState: "placeholder"`, while the authoritative First Year dataset records `status: "ready"`. Recorded as stale inventory documentation drift only. The runtime dataset wins. Nothing changed in Phase 32C.

---

## Intent ownership map

| Intent | Current owner | Coverage status | Primary action | Supporting action | Review level |
| --- | --- | --- | --- | --- | --- |
| Lochia / postnatal bleeding (C080) | `healing-after-birth` | Partial — bleeding described gently, no explicit pattern and no named red flags | EXPAND_EXISTING_ARTICLE | none | SAFETY_REVIEW_REQUIRED |
| Perineal care, stitches, tears (C081) | none dedicated | Missing | NEW_ARTICLE | Internal link from `healing-after-birth` | SAFETY_REVIEW_REQUIRED |
| Diastasis recti / abdominal recovery (C078) | one line in `/articles/your-body-after-birth` | Mentioned, not owned | NEW_ARTICLE | Internal link from `body-changes-after-birth` | HEALTH_REVIEW_REQUIRED |
| Sex and intimacy after birth (C079) | none | Missing | NEW_ARTICLE | Internal link from `postnatal-checks-and-appointments` | HEALTH_REVIEW_REQUIRED |
| Postnatal pelvic floor, bladder and bowel (C046) | `/articles/pelvic-floor-exercises-in-pregnancy` (pregnancy-framed) | Pregnancy context strong, postnatal context thin | EXPAND_EXISTING_ARTICLE (`body-changes-after-birth`) | INTERNAL_LINK_ACTION to the pelvic-floor article | HEALTH_REVIEW_REQUIRED |
| Postnatal mental health (C082) | `when-parenthood-feels-heavy` | COVERED_STRONG | INTERNAL_LINK_ACTION only | none | n/a — outside physical remediation |
| Hair loss, night sweats, body change (cross-check, not a Phase 31 record) | `hormones-sweat-and-hair-loss`, `body-changes-after-birth` | Covered | NO_NEW_PAGE_REQUIRED | none | n/a |
| Generic recovery (cross-check) | `/articles/postpartum-recovery-timeline` | Covered as cornerstone | NO_NEW_PAGE_REQUIRED | none | n/a |
| Caesarean recovery (cross-check, boundary) | `healing-after-birth` covers both routes; 32A `caesarean-birth` owns the birth route | Adequate for now | NO_NEW_PAGE_REQUIRED in 32C — FUTURE CONTENT VALIDATION REQUIRED | none | SAFETY_REVIEW_REQUIRED if ever created |

Each Phase 31 record has exactly one primary owner and action. No double counting.

---

## Lochia and postnatal bleeding (C080)

#### Phase 31 evidence
COVERED_PARTIAL, P0, representative keyword `lochia`, highest volume 4,400, 12 unique keywords, directional 17,720. Phase 31 note: "Safety-critical; ensure red flags are explicit."

#### Current Start of You owner
`/first-year/postpartum-recovery/healing-after-birth` (`status: "ready"`, `medicallyReviewed: true`). Its bleeding section says bleeding is expected, eases over weeks, colour and flow change, and pads are more comfortable than tampons. It does not name lochia, does not describe the pattern in sequence, and does not name postpartum haemorrhage, infection or clot symptoms.

#### UK authoritative sources
| Organisation | Page | URL | Checked | Page last reviewed |
| --- | --- | --- | --- | --- |
| NHS | Your body after the birth | https://www.nhs.uk/pregnancy/labour-and-birth/your-body/ | 9 Sep 2026 | 25 April 2024, next due 25 April 2027 |
| NHS | Caesarean section — Recovery | https://www.nhs.uk/tests-and-treatments/caesarean-section/recovery/ | 9 Sep 2026 | 4 January 2023, next due 4 January 2026 (overdue) |

#### Supported factual points
- Bleeding from the vagina after birth is expected; it is heavy at first and super-absorbent maternity or period pads are needed.
- Bleeding can be redder and heavier during breastfeeding because feeding makes the womb contract, and period-like cramps can come with it.
- Bleeding continues for a few weeks, gradually turning brownish and decreasing until it stops.
- Tampons and other internal period products should be avoided until after the six-week postnatal check because of infection risk while the placental wound heals.
- After a caesarean there may also be vaginal bleeding; pads rather than tampons, and medical advice if bleeding is heavy.

#### Safety / escalation boundaries
- Losing blood in large clots: tell your midwife; treatment may be needed.
- Sudden or very heavy blood loss, possibly with feeling faint or a rapid heartbeat: tell midwife, health visitor or GP straight away — possible postpartum haemorrhage.
- High temperature with a sore, tender tummy: possible infection.
- Calf pain, swelling or redness in one leg; chest pain or difficulty breathing: possible DVT or pulmonary embolism.
- Headache with vision changes and vomiting: possible pre-eclampsia.

#### Claims intentionally excluded
Numeric millilitre thresholds; pad-count self-diagnosis rules; any promise that bleeding stops by a fixed week; reassurance that heavy bleeding is "usually nothing".

#### Cannibalisation finding
`/articles/postpartum-recovery-timeline` mentions lochia at overview depth and stays the broad cornerstone. Expanding `healing-after-birth` deepens an owner that Phase 31 already names, rather than creating a competing bleeding page.

#### Recommended primary action
EXPAND_EXISTING_ARTICLE — `healing-after-birth`.

#### Supporting action if any
None.

#### Review classification
SAFETY_REVIEW_REQUIRED.

#### Evidence sufficient to build: YES

---

## Perineal care, stitches and tears (C081)

#### Phase 31 evidence
NEW_ARTICLE_GAP, P1, representative keyword `sitz bath`, highest volume 12,100, 1 unique keyword, directional 12,100. Phase 31 note: "UK framing: stitches, perineal care, not sitz-bath product intent."

#### Current Start of You owner
None dedicated. `healing-after-birth` gives two sentences on stitches; `/articles/your-body-after-birth` mentions soreness. No page owns tears, episiotomy healing or perineal care.

#### UK authoritative sources
| Organisation | Page | URL | Checked | Page last reviewed |
| --- | --- | --- | --- | --- |
| NHS | Episiotomy and perineal tears | https://www.nhs.uk/pregnancy/labour-and-birth/episiotomy-and-perineal-tears/ | 9 Sep 2026 | 9 June 2023, next due 9 June 2026 (overdue) |
| NHS | Your body after the birth | https://www.nhs.uk/pregnancy/labour-and-birth/your-body/ | 9 Sep 2026 | 25 April 2024 |
| NHS | Your 6-week postnatal check | https://www.nhs.uk/baby/support-and-services/your-6-week-postnatal-check/ | 9 Sep 2026 | listed on page |

#### Supported factual points
- Up to 9 in 10 first-time mothers having a vaginal birth have some tear, graze or episiotomy.
- Tears and episiotomies are repaired with dissolvable stitches; stitches usually heal within about a month and do not normally need removing.
- Bathe or shower the area daily with plain warm water and pat dry.
- Pain is common; paracetamol is safe while breastfeeding, ibuprofen is generally considered safe but check first, aspirin is not recommended. Pain lasting beyond two to three weeks should be discussed with a professional.
- An ice pack wrapped in a towel can ease pain; ice should not touch skin directly. Exposing stitches to fresh air can help.
- Pouring warm water while peeing, and pressing a clean pad against the area while pooing, can ease discomfort. Wipe front to back.
- Constipation should be avoided; fibre, fluids and if needed a gentle laxative. It is very unlikely stitches will break.
- Pelvic floor exercises support healing and reduce pressure on the area.
- Raised or itchy scar tissue affects a few people and should be raised with a doctor.

#### Safety / escalation boundaries
- Call midwife or GP if stitches get more painful, there is smelly discharge, or the skin around the cut or tear is red and swollen — these may mean infection.
- Also contact a professional for pus or unusual smell, persistent pain, real difficulty peeing, leaking poo or pooing without meaning to, and constipation that will not resolve.
- Tell the GP at the postnatal check about painful sex, or trouble holding in wind, pee or poo.

#### Claims intentionally excluded
Sitz-bath products or protocols as a recommended UK treatment; salt baths, tea-tree or herbal additions; witch hazel and other unsupported remedies; degree-by-degree tear classification presented as self-assessment; timings for resuming exercise; any procedural or wound-dressing manual.

#### Cannibalisation finding
Nothing owns this intent. The new page absorbs the sitz-bath demand under UK framing and links back to `healing-after-birth` rather than repeating general recovery. It also covers the perineal side of bowel and bladder discomfort at symptom level, while C046's expansion owns pelvic floor recovery.

#### Recommended primary action
NEW_ARTICLE — First Year, `postpartum-recovery` topic, proposed slug `stitches-tears-and-perineal-healing`. One coherent page for soreness, tears, episiotomy and stitches. No fragmentation.

#### Supporting action if any
Internal link from `healing-after-birth`; documented in the expansions file.

#### Review classification
SAFETY_REVIEW_REQUIRED.

#### Evidence sufficient to build: YES

---

## Diastasis recti and abdominal recovery (C078)

#### Phase 31 evidence
NEW_ARTICLE_GAP, P0, representative keyword `divarication of rectus abdominis muscles exercises`, highest volume 3,600, 24 unique keywords, directional 29,080. Phase 31 note: "Recovery hub covers feelings and checks but not abdominal separation."

#### Current Start of You owner
One line in `/articles/your-body-after-birth`: "Abdominal muscle separation is common and may need specific exercises to resolve." That is a mention, not ownership.

#### UK authoritative sources
| Organisation | Page | URL | Checked | Page last reviewed |
| --- | --- | --- | --- | --- |
| NHS | Your post-pregnancy body | https://www.nhs.uk/baby/support-and-services/your-post-pregnancy-body/ | 9 Sep 2026 | 20 July 2026, next due 20 July 2029 |
| NHS | Your body after the birth | https://www.nhs.uk/pregnancy/labour-and-birth/your-body/ | 9 Sep 2026 | 25 April 2024 |

#### Supported factual points
- It is common for the two muscles running down the middle of the tummy to separate during pregnancy, usually by about two finger widths. This is called diastasis recti or divarication.
- It happens because the growing womb pushes the muscles apart, making them longer and weaker. The amount of separation varies.
- The separation usually returns to normal by the time the baby is about eight weeks old.
- If the gap is still obvious eight weeks after the birth, contact the GP, as there may be a risk of back problems. Some people also have abdominal pain or discomfort. The GP can refer to a physiotherapist for specific exercises.
- Regular pelvic floor and deep tummy muscle exercises can help reduce the separation; posture matters.
- Sit-ups, planks, high-impact exercise, straining on the toilet and heavy lifting are best avoided early on.

#### Safety / escalation boundaries
GP contact if the gap is still obvious at eight weeks, or if there is abdominal pain or discomfort; referral to physiotherapy is the supported route.

#### Claims intentionally excluded
Finger-width measurements presented as a diagnostic grading system or severity scale; prescribed repetitions or programmes beyond the general NHS description; any claim that a gap will always close; surgical framing; "flat tummy" or bounce-back language.

#### Cannibalisation finding
`/articles/your-body-after-birth` stays the broad body-change owner; the new page owns the specific intent and links back. No competing generic body page is created.

#### Recommended primary action
NEW_ARTICLE — First Year, `body-and-hormones` topic, proposed slug `separated-tummy-muscles`.

#### Supporting action if any
Internal link from `body-changes-after-birth`; documented in the expansions file.

#### Review classification
HEALTH_REVIEW_REQUIRED.

#### Evidence sufficient to build: YES

---

## Sex and intimacy after birth (C079)

#### Phase 31 evidence
NEW_ARTICLE_GAP, P1, representative keyword `sexual intercourse after c section`, highest volume 1,300, 27 unique keywords, directional 19,440.

#### Current Start of You owner
None. No First Year or legacy article owns sex after birth.

#### UK authoritative sources
| Organisation | Page | URL | Checked | Page last reviewed |
| --- | --- | --- | --- | --- |
| NHS | Sex and contraception after birth | https://www.nhs.uk/baby/support-and-services/sex-and-contraception-after-birth/ | 9 Sep 2026 | 7 February 2024, next due 7 February 2027 |
| NHS | Episiotomy and perineal tears | https://www.nhs.uk/pregnancy/labour-and-birth/episiotomy-and-perineal-tears/ | 9 Sep 2026 | 9 June 2023 (overdue) |
| NHS | Caesarean section — Recovery | https://www.nhs.uk/tests-and-treatments/caesarean-section/recovery/ | 9 Sep 2026 | 4 January 2023 (overdue) |
| NHS | Your 6-week postnatal check | https://www.nhs.uk/baby/support-and-services/your-6-week-postnatal-check/ | 9 Sep 2026 | listed on page |

#### Supported factual points
- There are no rules about when to start having sex again after birth.
- Soreness and tiredness are common; hormonal change can make the vagina drier, and a water-based lubricant from a pharmacy can help. Oil-based lubricants can irritate and damage latex condoms and diaphragms.
- After a tear or episiotomy, pain during sex is very common in the first few months.
- Closeness without penetration is a legitimate option; saying so when penetration hurts matters.
- After a caesarean, sex is among the activities to resume only when it feels comfortable, which may not be for around six weeks.
- Pregnancy is possible from three weeks after birth, including while breastfeeding and before periods return; contraception should be started within 21 days.
- Some methods can start straight after birth (implant, injection, progestogen-only pill, condoms, internal condoms, IUD or IUS if fitted within 48 hours, otherwise from four weeks). Combined pill, ring and patch from three weeks if not breastfeeding and no clot risk factors, usually from six weeks if breastfeeding. Diaphragm or cap from around six weeks, with refitting.
- LAM only holds while exclusively breastfeeding, baby under six months, and periods have not returned.
- Painful sex should be raised at the postnatal check or with a GP.

#### Safety / escalation boundaries
Persistent or painful sex, or pain still present at the postnatal check, goes to the GP. Contraception suitability, especially the combined methods and clot risk, is a healthcare decision.

#### Claims intentionally excluded
Any universal "wait six weeks" rule as a medical instruction; libido expectations; a normal frequency; treatment advice for painful sex beyond seeking help; personalised contraception recommendations.

#### Cannibalisation finding
No existing owner. The page links to `healing-after-birth`, the perineal page and `postnatal-checks-and-appointments` rather than restating recovery generally.

#### Recommended primary action
NEW_ARTICLE — First Year, `body-and-hormones` topic, proposed slug `sex-and-intimacy-after-birth`.

#### Supporting action if any
Internal link from `postnatal-checks-and-appointments`; documented in the expansions file.

#### Review classification
HEALTH_REVIEW_REQUIRED.

#### Evidence sufficient to build: YES

---

## Postnatal pelvic floor, bladder and bowel (C046)

#### Phase 31 evidence
COVERED_STRONG, P1, representative keyword `kegel exercises`, highest volume 22,200, 4 unique keywords, directional 28,020. Phase 31 action: IMPROVE_INTERNAL_LINKING, with the note that postpartum users need this from First Year recovery too.

#### Current Start of You owner
`/articles/pelvic-floor-exercises-in-pregnancy` — LIVE_INDEXABLE, reviewer recorded, pregnancy-framed. `healing-after-birth` and `body-changes-after-birth` touch the pelvic floor in a sentence each. No page carries the after-birth bladder and bowel context.

#### UK authoritative sources
| Organisation | Page | URL | Checked | Page last reviewed |
| --- | --- | --- | --- | --- |
| NHS | Your post-pregnancy body | https://www.nhs.uk/baby/support-and-services/your-post-pregnancy-body/ | 9 Sep 2026 | 20 July 2026 |
| NHS | Your body after the birth | https://www.nhs.uk/pregnancy/labour-and-birth/your-body/ | 9 Sep 2026 | 25 April 2024 |
| NHS | Your 6-week postnatal check | https://www.nhs.uk/baby/support-and-services/your-6-week-postnatal-check/ | 9 Sep 2026 | listed on page |

#### Supported factual points
- Leaking a bit of pee when laughing, coughing or moving suddenly is quite common after birth. Pelvic floor exercises can help; if they do not, tell the GP at the postnatal check, who may refer to a physiotherapist.
- A leaky bladder or a heavy feeling between vagina and anus points to strengthening the muscles around the bladder.
- Pelvic floor exercises: squeeze and draw in as if holding wind, squeeze around vagina and bladder, long squeezes held up to ten seconds, short quick squeezes, building to ten repeats of each, at least three times a day, breathing normally and without pulling the stomach in.
- Constipation should be avoided with fibre and fluids; a gentle laxative may help; straining makes piles worse.
- Piles are very common after birth and usually settle within days or weeks; a midwife or pharmacist can recommend soothing treatment.
- Leaking poo, or pooing without meaning to, should be reported to a midwife or GP, and raised at the postnatal check along with trouble holding in wind or pee.
- A GP or health visitor can help with a physical problem at any time and can refer to a specialist.

#### Safety / escalation boundaries
Persistent leaking, any bowel incontinence, a heavy or dragging feeling, and real difficulty passing urine all warrant professional assessment rather than being lived with.

#### Claims intentionally excluded
Cure timelines; device or trainer product recommendations; prolapse self-diagnosis; a claim that leaking is simply part of motherhood.

#### Cannibalisation finding
Creating a separate postnatal pelvic-floor page would compete with the strong pregnancy pelvic-floor article on the same core keyword. Creating separate constipation, piles, bladder and leaking pages would fragment one coherent family. The correct action is an expansion of `body-changes-after-birth` plus internal linking.

#### Recommended primary action
EXPAND_EXISTING_ARTICLE — `body-changes-after-birth`, adding a postnatal pelvic floor, bladder and bowel section.

#### Supporting action if any
INTERNAL_LINK_ACTION — link from the First Year recovery articles to `/articles/pelvic-floor-exercises-in-pregnancy` for the exercise technique itself.

#### Review classification
HEALTH_REVIEW_REQUIRED.

#### Evidence sufficient to build: YES

---

## Postnatal mental health (C082)

#### Phase 31 evidence
COVERED_STRONG, P1, 158 unique keywords, directional 109,690. Action: IMPROVE_INTERNAL_LINKING. The legacy `/postpartum` hub redirects into First Year, which Phase 31 recorded as correct, and `/postpartum/legacy` is noindex and must stay non-owning.

#### Current Start of You owner
`/first-year/emotional-wellbeing/when-parenthood-feels-heavy` (`status: "ready"`, `medicallyReviewed: true`).

#### Recommended primary action
INTERNAL_LINK_ACTION only. Reviewed for ownership and confirmed strongly owned. Outside the physical remediation scope of Phase 32C.

#### Review classification
Not applicable — no content change proposed.

#### Evidence sufficient to build: not applicable (no build proposed)

---

## Caesarean recovery — boundary check only

Not one of the six Phase 31 Postpartum records. No Phase 31 evidence record demonstrates a distinct caesarean-recovery intent inside the Postpartum domain; C036 sits in the Pregnancy domain and was drafted in Phase 32A as the birth-route page. Competitor research was not widened to manufacture a case.

Repository truth: `healing-after-birth` explicitly covers both birth routes, including caesarean scars, and cites the NHS caesarean recovery page. Phase 32A `caesarean-birth` owns caesarean as a birth route.

Finding: **NO_NEW_PAGE_REQUIRED in Phase 32C — FUTURE CONTENT VALIDATION REQUIRED.** If a future phase validates a distinct recovery-after-surgery intent, the boundary stays: `caesarean-birth` = birth route; a future page = recovery after the operation. Review floor if ever created: SAFETY_REVIEW_REQUIRED.

---

## Cross-intent overlaps

- Perineal healing and sex after birth both touch pain during sex. The perineal page notes it briefly and links across; the sex page owns it.
- Perineal healing and the pelvic-floor expansion both touch bowel comfort. The perineal page owns wound-related discomfort; the expansion owns pelvic floor, bladder and bowel recovery.
- Diastasis and the pelvic-floor expansion both reference deep tummy and pelvic floor work. The diastasis page owns abdominal separation; the expansion links to it rather than repeating it.
- Bleeding is referenced on the caesarean side of `healing-after-birth`; the lochia expansion sits in that one article, so no split occurs.

## Existing-page cannibalisation risks

Prevented in this phase: a generic "postpartum recovery" page competing with `/articles/postpartum-recovery-timeline`; a generic "your body after birth" page competing with `/articles/your-body-after-birth`; a standalone caesarean-recovery page competing with `healing-after-birth` and the 32A `caesarean-birth` draft; a standalone postnatal pelvic-floor page competing with `/articles/pelvic-floor-exercises-in-pregnancy`. Count: 4.

## First Year ownership

All three proposed new pages sit inside the existing First Year editorial world: `postpartum-recovery` for perineal healing, `body-and-hormones` for separated tummy muscles and sex after birth. Discovery would come from the existing `/first-year/postpartum-recovery` topic page, existing phase pages and the existing recovery articles. No new hub, no new lifecycle, no navigation change and no route registration is proposed in this phase. Systematic internal-link implementation remains a Phase 32F matter.

## Evidence conflicts / uncertainties

- NHS "Episiotomy and perineal tears" was last reviewed 9 June 2023 with a next review due 9 June 2026 — currently overdue. Content is live and consistent with "Your body after the birth" (reviewed 25 April 2024).
- NHS "Caesarean section — Recovery" was last reviewed 4 January 2023 with next review due 4 January 2026 — currently overdue. Used only for corroborating points also present in in-date pages where possible.
- NHS gives finger-width descriptions for abdominal separation. These are deliberately not turned into a self-grading system.
- No conflicts were found between sources on bleeding, contraception timing or escalation routing.

## Human review requirements

| Item | Review classification | Human review completed |
| --- | --- | --- |
| Lochia expansion of `healing-after-birth` | SAFETY_REVIEW_REQUIRED | 0 |
| Perineal healing new article | SAFETY_REVIEW_REQUIRED | 0 |
| Separated tummy muscles new article | HEALTH_REVIEW_REQUIRED | 0 |
| Sex and intimacy after birth new article | HEALTH_REVIEW_REQUIRED | 0 |
| Pelvic floor, bladder and bowel expansion | HEALTH_REVIEW_REQUIRED | 0 |

No human review has occurred. No reviewer name or review date may be attached to this content until a real review happens.

## Image requirements

No imagery generated in this phase.

| Page | Hero required | Body image required | Reusable asset available | New asset needed |
| --- | --- | --- | --- | --- |
| Stitches, tears and perineal healing | YES | NO | Unknown — First Year recovery imagery to be checked at implementation | Likely YES |
| Separated tummy muscles | YES | NO | Unknown | Likely YES |
| Sex and intimacy after birth | YES | NO | Unknown | Likely YES |
| Expansions to existing articles | NO | NO | n/a | NO |

Imagery must avoid clinical procedure shots, body-shaming framing, bounce-back fitness imagery and unrealistic perfect-parent stock scenes. Warm, human, editorial recovery imagery is preferred later.

## Publication recommendation

Publication architecture reconfirmed: the legacy dataset has no editorial-status field and any record added renders publicly and enters the sitemap, so safe non-public draft capability is NO. The First Year dataset has a `status` field and suppresses drafts from cards and the sitemap, but a direct article URL still renders a draft record self-canonically with no `noindex`, so safe non-public draft capability is also NO.

Therefore all Phase 32C copy stays documentation-only in `docs/content/phase32c-article-drafts.md` and `docs/content/phase32c-existing-content-expansions.md`. Publication hold applies until human review is genuinely completed.
