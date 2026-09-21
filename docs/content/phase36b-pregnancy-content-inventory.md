# Phase 36B — Pregnancy content inventory

Audit only. No content, route, week-data, source-record, reviewer, grounding, AI or deployment changes were made while producing this document. Every count below is taken from repository truth (route registration in `src/App.tsx`, the data modules under `src/data/`, the week page components, and `scripts/generate-sitemap.ts`), not from filenames.

## 1. Surface inventory

| Surface | Route | Registered in | Classification |
| --- | --- | --- | --- |
| Pregnancy hub | `/pregnancy` | `src/App.tsx` → `src/pages/Pregnancy.tsx` | HUB |
| Your body | `/pregnancy/body` | shared `PregnancyTopicPage` | TOPIC_PAGE |
| Your baby | `/pregnancy/baby` | shared `PregnancyTopicPage` | TOPIC_PAGE |
| Your feelings | `/pregnancy/feelings` | shared `PregnancyTopicPage` | TOPIC_PAGE |
| Health & safety | `/pregnancy/health-and-safety` | shared `PregnancyTopicPage` | TOPIC_PAGE |
| Diet & exercise | `/pregnancy/diet-and-exercise` | shared `PregnancyTopicPage` | TOPIC_PAGE |
| Preparing for baby | `/pregnancy/preparing-for-baby` | shared `PregnancyTopicPage` | TOPIC_PAGE |
| First trimester | `/pregnancy/first-trimester` | `trimesterData.ts` | TRIMESTER_PAGE |
| Second trimester | `/pregnancy/second-trimester` | `trimesterData.ts` | TRIMESTER_PAGE |
| Third trimester | `/pregnancy/third-trimester` | `trimesterData.ts` + `components/thirdtri/*` | TRIMESTER_PAGE |
| Weeks 1–42 | `/pregnancy/week/:week` | 42 dedicated page components + `weekData.ts` | WEEK_PAGE (42) |
| Due-date calculator | `/due-date-calculator` | `src/App.tsx` | TOOL |
| Due-date results | `/due-date-results` | `src/App.tsx` (reached by navigation, not by href) | TOOL |
| Preparing for baby hub | `/preparing-for-baby` | `src/App.tsx` | SUPPORT_SURFACE |
| Journey support | `/journey-support` | `src/App.tsx`, protected | JOURNEY_SURFACE |
| Pregnancy toolkit + sub-routes | `/pregnancy-toolkit/*` | `src/App.tsx`, protected | JOURNEY_SURFACE |
| Pregnancy setup | `/setup/pregnancy` | `src/App.tsx` | JOURNEY_SURFACE |
| IVF early pregnancy | `/ivf/early-pregnancy` | `src/App.tsx` | IVF_CROSSOVER |
| Pregnancy tests (TTC side) | `/trying-to-conceive/pregnancy-tests` | `src/App.tsx` | REDIRECT-free crossover entry (JOURNEY_SURFACE) |
| Pregnancy articles | `/articles/:slug` | `articleData.ts` | ARTICLE (104) |

Legacy or duplicate indexable Pregnancy surfaces: **0**. Pregnancy redirects: **0** (the three live client-side redirects are TTC-only and unchanged from Phase 35C). Draft or preview Pregnancy routes: **0**.

### Required surface counts

- Hub routes: **1**
- Canonical topic routes: **6**
- Trimester routes: **3**
- Week modules: **42 / 42** (none missing, all indexable, all with baby size, symptoms, seek-support, disclaimer)
- Tool routes/surfaces: **2** (`/due-date-calculator`, `/due-date-results`)
- Support surfaces: **1** public (`/preparing-for-baby`), 3 protected journey surfaces
- Crossover surfaces: **2** (`/ivf/early-pregnancy`, `/trying-to-conceive/pregnancy-tests`)
- Indexable legacy or duplicate surfaces: **0**

## 2. Article inventory summary

| Metric | Count |
| --- | --- |
| Article records in the repository (all hubs) | 171 |
| Pregnancy-specific or Pregnancy-crossover records | 104 |
| Status live | 85 |
| Status draft | 0 |
| Status unknown (no explicit status field) | 19 |
| Indexed as articles | 104 |
| Duplicate or shadowed records | 0 |
| Articles with zero in-site inbound links (orphans) | 2 |
| Articles with exactly one inbound reference | 25 |
| Articles whose only inbound reference is another article's related list | 1 |
| Articles with no hero image | 92 |
| Articles with no body imagery | 89 |
| Articles with no source records at all | 5 |
| Articles with at least one structured source | 69 |
| Articles with sources but none structured (label-only only) | 30 |
| Records carrying historical `reviewedBy` metadata | 95 (renders nothing — provenance registry is empty) |

The 19 unknown-status records are: hair-dye-and-beauty-treatments-in-pregnancy, caffeine-in-pregnancy, hydration-in-pregnancy, cravings-and-aversions-in-pregnancy, pelvic-floor-exercises-in-pregnancy, exercise-safety-by-trimester, safe-sleep-basics, car-seat-basics, baby-clothes-and-newborn-essentials, preparing-siblings-for-a-new-baby, maternity-leave-planning, itching-in-pregnancy, caesarean-birth, gestational-diabetes, diarrhoea-and-tummy-bugs-in-pregnancy, leg-cramps-in-pregnancy, hcg-levels-explained, sex-during-pregnancy, dizziness-and-feeling-faint-in-pregnancy. All 19 render publicly and are indexed; the field is simply absent from the record. Recommendation for all 19: KEEP (status normalisation is a records hygiene item, not a content gap).

### Article action classification

| Action | Count | Notes |
| --- | --- | --- |
| KEEP | 96 | Adequate coverage, adequate discovery |
| EXPAND_EXISTING | 5 | complete-guide-morning-sickness (hyperemesis), stages-of-labour (pain relief options), swelling-in-pregnancy (pre-eclampsia), eating-well-in-pregnancy (travel/flying), preparing-for-baby-complete-guide (antenatal classes) |
| MERGE | 2 | writing-a-birth-plan and birth-preferences share one visitor intent |
| REPOSITION | 0 | — |
| INTERNAL_LINK_ONLY | 1 | low-lying-placenta-in-pregnancy (orphan with good content) |
| ARCHIVE_CANDIDATE | 0 | — |

Total: 96 + 5 + 2 + 1 = **104**.

## 3. Week-module inventory

All 42 modules were checked individually for trimester assignment, indexability, baby and maternal guidance, seek-support block, disclaimer, symptom list, imported illustration, article destinations and source attachment.

- WEEK MODULES AUDITED = **42**
- WEEK MODULES WITH MATERIAL CONTENT GAP = **0** (every module has baby development, maternal body, emotional content, a symptom list, a seek-support block, a disclaimer, an imported illustration and at least one article destination)
- SOURCE/CLAIM ISSUE = **42** (see below — provenance is hub-level, not claim-level)
- BROKEN LINKS = **0**

Week sources come from `weekSupportContent.ts` and resolve to trimester-level NHS, Tommy's, NICE NG201, RCOG and GOV.UK landing pages. Those URLs are real and structurally verified, but they provide hub-level rather than claim-level provenance. Week pages carry 47 prose percentage statements, 18 population risk statements ("around 1 in 5…") and 201 measurement statements (baby size in cm/g). Under the phase rule — a claim is supported only where current repository evidence genuinely establishes provenance for that claim — these are classified UNRESOLVED_PROVENANCE, not unsupported inventions. No week content was rewritten.

Trimester split: weeks 1–12 (12 modules), 13–27 (15 modules), 28–42 (15 modules).

## 4. Trimester surfaces

| Surface | Unique value | Duplicate week navigation? | Verdict |
| --- | --- | --- | --- |
| First trimester | Chapter orientation, early-pregnancy emotional framing, symptom grouping, article discovery | No — it groups, weeks narrate | Keep as discovery + orientation |
| Second trimester | Scan and screening chapter, movement onset, body-change grouping | No | Keep |
| Third trimester | Richest surface: dedicated components including a deeper-reading strip and the only Pregnancy → First Year editorial link | No | Keep |

None of the three is a content destination that duplicates a week page, and none should be removed. Trimester prose contains 0 percentage claims, 0 measurement claims and 0 population-risk claims.

## 5. Tool inventory

| Tool | Route | Working | Discoverable | Duplicated | Placement | Source/claim notes |
| --- | --- | --- | --- | --- | --- | --- |
| Due-date calculator | `/due-date-calculator` | Yes | Yes (5 inbound links plus hub placement) | No | Correct — entry-point orientation | Estimate wording intact, no diagnostic claim |
| Due-date results | `/due-date-results` | Yes | Reached by navigation from the calculator, 0 hrefs — intentional per the decoupled-calculator pattern | No | Correct | Estimate wording intact |

Unmet needs assessed as tool or checklist opportunities (assessment only, nothing built):

| Opportunity | Classification |
| --- | --- |
| Hospital bag checklist | CHECKLIST_OPPORTUNITY (P3 — an article already covers it, and a protected toolkit equivalent exists) |
| Questions for your midwife | CHECKLIST_OPPORTUNITY (P3 — protected toolkit equivalent exists) |
| Birth-preferences helper | TOOL_OPPORTUNITY (P3 — two articles already cover the intent; merge first) |
| Appointment checklist | ARTICLE_SUFFICIENT |
| Baby-preparation checklist | ARTICLE_SUFFICIENT |

## 6. Companion and editorial boundary

- Hub Companion surfaces: 1. Topic contextual handoffs: 6 (two suggestions each). FAQ AI entry points: 0.
- MATERIAL PREGNANCY NEEDS COVERED ONLY BY AI = **0**
- Repeated AI starter prompts with no underlying editorial destination = **0**

## 7. Image and presentation completeness

- Pregnancy articles expected to have a hero image: 104
- Missing an explicit hero: **92** (the flagship template passes `data.hero?.src` and renders its standard fallback treatment when absent; no broken images observed in Phase 36A.1 QA)
- Using a fallback hero: **92**
- Expected body imagery: 104; missing expected body imagery: **89**
- Week modules missing required illustration or media: **0**

## 8. Governance boundaries held in this phase

- Reviewer claims added = **0** (`REVIEW_PROVENANCE_REGISTRY` remains empty; no medical-review claim renders on any Pregnancy surface)
- Grounding changes = **0** (registry remains empty: approvals 0, candidates 0, eligible slugs 0, routing version unchanged; no drift found)
- Source behaviour changes = **0**
- Content, route, week-data, image, AI, analytics, database and lifecycle changes = **0**
- Deployment = **NO**
