# Phase 35B — TTC Content Inventory

Audit-only. No application source, article, route, SEO, sitemap, AI, grounding, analytics or database file was changed while producing this document.

Evidence base: `src/App.tsx` (route table), `src/data/articleData.ts` + `src/data/ttcFlagshipOverrides.ts` (merged article records via `getArticle`), `src/data/ttcTopicData.ts` (topic page configuration), `src/data/stageData.ts` + `src/pages/StagePage.tsx` (legacy TTC stage routes), `src/lib/articleHeroImage.ts` (hero resolution), `public/sitemap.xml`, `scripts/generate-sitemap.ts`.

## 1. Public surface inventory

### 1.1 Hub

| Route | Component | Status | Indexable | Sitemap |
| --- | --- | --- | --- | --- |
| `/trying-to-conceive` | `src/pages/TTCHub.tsx` | LIVE | YES | YES |

Live hub section order (repository truth, `TTCHub.tsx` lines 975–982): Hero → WhatThisCovers → JourneyTimeline → TopicLibrary → `TTCIVFPathway` → `TTCCommonQuestions` → AISupport → `TTCHubJourneyAction`.

### 1.2 Pillar and subtopic routes (10)

| Route | Kind | Component | Status | Sitemap |
| --- | --- | --- | --- | --- |
| `/trying-to-conceive/ovulation` | pillar | `TTCOvulation` | LIVE | YES |
| `/trying-to-conceive/preconception-health` | pillar | `TTCPreconceptionHealth` | LIVE | YES |
| `/trying-to-conceive/fertility` | pillar | `TTCFertility` | LIVE | YES |
| `/trying-to-conceive/cycle-tracking` | subtopic | `TTCCycleTracking` | LIVE | YES |
| `/trying-to-conceive/two-week-wait` | subtopic | `TTCTwoWeekWait` | LIVE | YES |
| `/trying-to-conceive/pregnancy-tests` | subtopic | `TTCPregnancyTests` | LIVE | YES |
| `/trying-to-conceive/age-and-fertility` | subtopic | `TTCAgeAndFertility` | LIVE | YES |
| `/trying-to-conceive/male-fertility` | subtopic | `TTCMaleFertility` | LIVE | YES |
| `/trying-to-conceive/ivf-and-treatment` | subtopic | `TTCIVFAndTreatment` | LIVE | YES |
| `/trying-to-conceive/conditions` | subtopic | `TTCConditions` | LIVE | YES |

### 1.3 Legacy TTC stage routes (3)

Served by the generic `/:journey/:stage` route through `StagePage` + `ttcStages` in `src/data/stageData.ts`. All three are on the explicit `stageSeoAllowlist` and `breadcrumbStageAllowlist`, carry self-referencing canonicals and appear in the sitemap.

| Route | Stage record | Indexable | Sitemap | In-site navigation |
| --- | --- | --- | --- | --- |
| `/trying-to-conceive/understanding-your-cycle` | `understanding-your-cycle` | YES | YES | NO |
| `/trying-to-conceive/timing-and-tracking` | `timing-and-tracking` | YES | YES | NO |
| `/trying-to-conceive/waiting-and-testing` | `waiting-and-testing` | YES | YES | NO |

Their only in-repository inbound links are `src/components/ttc/TTCStages.tsx` and `src/components/ttc/TTCFinalCTA.tsx`, whose sole consumer is `src/pages/TTC.tsx`. `src/pages/TTC.tsx` is **not imported by `src/App.tsx`** and is therefore unmounted legacy code. These three routes are technically discoverable (sitemap + canonical) but navigationally orphaned from the current public experience.

### 1.4 Tools

| Tool | Route | Working | Discoverable | Placement |
| --- | --- | --- | --- | --- |
| Ovulation / fertile-window calculator | `/ovulation-calculator` | YES | YES — hub date input, `ovulation`, `preconception-health`, `cycle-tracking` Start Here | Correct |
| IVF timeline calculator | `/ivf-timeline` | YES | YES — `ivf-and-treatment` subtopic | Correct (treatment context, not a TTC lifecycle) |
| Due date calculator | `/due-date-calculator` (results at `/due-date-results`) | YES | Pregnancy surface | Out of TTC scope |

### 1.5 Redirects (3)

| From | To | Behaviour |
| --- | --- | --- |
| `/trying-to-conceive/legacy` | `/trying-to-conceive` | Replace |
| `/trying-to-conceive/ovulation-calculator` | `/ovulation-calculator` | Replace, query string preserved |
| `/articles/signs-of-ovulation` | `/articles/ovulation-signs` | Replace |

### 1.6 Adjacent IVF surfaces reached from TTC

`/ivf`, `/ivf/before-transfer`, `/ivf/after-transfer`, `/ivf/early-pregnancy`, `/ivf-timeline`. All live, indexable, in the sitemap.

### 1.7 Journey / account surfaces

`/setup/trying-to-conceive`, `/my-ttc-journey` (protected). No `ivf` lifecycle and no `/my-ivf-journey` exist. Saved lifecycles remain exactly `ttc | pregnancy | first_year`.

## 2. Article record inventory

56 records carry `trying-to-conceive` in `journey`: 49 single-journey TTC, 7 multi-journey crossover (`implantation-bleeding`, `hcg-levels-explained` with pregnancy; `chemical-pregnancy`, `trying-again-after-miscarriage`, `coping-with-the-two-week-wait`, `emotional-pressure-of-age-when-ttc`, `partner-support-when-ttc` with support). A further 8 IVF records sit adjacent to the TTC→IVF handoff.

`articleData.ts` carries no draft or preview flag (confirmed in Phase 31 and unchanged): every record resolving through `/articles/:slug` is live. `src/data/articleInventory.ts` is planning-only and is imported by no route.

Legend — Src: `structured` = source objects with URLs (emitted as JSON-LD citations); `label-only` = named authority strings shown to readers but excluded from citations by `ArticlePage.tsx`. Hero: `yes` = explicit `hero.src`; `fallback` = resolved through `topicFallbackMap` / journey default in `resolveArticleHero`.

| Slug | Topic placement (in-site nav) | Src | Hero | Sections | Class |
| --- | --- | --- | --- | --- | --- |
| implantation-bleeding | pregnancy-tests, two-week-wait (+ pregnancy topic) | label-only | yes | 3 | KEEP |
| trying-to-conceive-explained | hub (`TTCHub.tsx`) | label-only | yes | 5 | KEEP |
| signs-of-ovulation | none — route redirects to `ovulation-signs` | label-only | yes | 4 | ARCHIVE_CANDIDATE (shadow record) |
| two-week-wait | two-week-wait | label-only | yes | 5 | KEEP |
| ovulation-signs | ovulation, cycle-tracking | label-only | yes | 5 | KEEP |
| fertile-window | ovulation | label-only | yes | 5 | KEEP |
| how-long-implantation-takes | none — related guidance only (4 inbound) | label-only | yes | 5 | INTERNAL_LINK_ONLY |
| when-to-take-a-pregnancy-test | pregnancy-tests | label-only | yes | 5 | KEEP |
| faint-positive-pregnancy-test | pregnancy-tests | label-only | yes | 5 | KEEP |
| chemical-pregnancy | none — related guidance only (5 inbound) | label-only | yes | 5 | INTERNAL_LINK_ONLY |
| trying-again-after-miscarriage | conditions | label-only | yes | 5 | KEEP |
| can-you-get-pregnant-on-your-period | none — related guidance only (1 inbound) | label-only | yes | 5 | INTERNAL_LINK_ONLY |
| how-long-to-try-before-getting-help | fertility, age-and-fertility, conditions | label-only | fallback | 4 | KEEP |
| pcos-and-trying-to-conceive | conditions | label-only | fallback | 4 | KEEP |
| endometriosis-and-trying-to-conceive | conditions | label-only | fallback | 4 | KEEP |
| irregular-periods-and-trying-to-conceive | ovulation, fertility, cycle-tracking, conditions | label-only | fallback | 4 | KEEP |
| fertility-tests-for-women | fertility, conditions | label-only | fallback | 4 | KEEP |
| fertility-tests-for-men | fertility, male-fertility, conditions | label-only | fallback | 4 | KEEP |
| what-happens-at-a-fertility-appointment | fertility, male-fertility, age-and-fertility, conditions | label-only | fallback | 4 | KEEP |
| amh-test-explained | fertility, age-and-fertility | label-only | fallback | 4 | KEEP |
| how-to-know-when-you-are-ovulating | ovulation, cycle-tracking | structured | yes | 5 | KEEP |
| understanding-your-fertile-window | ovulation, cycle-tracking | structured | yes | 5 | KEEP |
| using-ovulation-tests | ovulation, cycle-tracking | structured | yes | 5 | KEEP |
| cervical-mucus-and-fertility | ovulation, cycle-tracking | structured | yes | 6 | KEEP |
| late-ovulation-and-ttc | ovulation, cycle-tracking | structured | yes | 6 | KEEP |
| when-ovulation-is-hard-to-predict | ovulation, cycle-tracking | structured | yes | 6 | KEEP |
| timing-sex-when-trying-to-conceive | ovulation | structured | yes | 7 | KEEP |
| basal-body-temperature-tracking | ovulation, cycle-tracking | structured | yes | 7 | KEEP |
| what-to-do-before-trying-to-conceive | preconception-health | structured | yes | 7 | KEEP |
| folic-acid-before-pregnancy | preconception-health | structured | yes | 6 | KEEP |
| preconception-vitamins | preconception-health | structured | yes | 6 | KEEP |
| preconception-gp-appointment | preconception-health, fertility, age-and-fertility | structured | yes | 7 | KEEP |
| stopping-contraception-when-ttc | preconception-health | structured | yes | 7 | KEEP |
| medication-review-before-pregnancy | preconception-health | structured | yes | 7 | KEEP |
| lifestyle-before-pregnancy | preconception-health, male-fertility | structured | yes | 6 | KEEP |
| mental-wellbeing-before-pregnancy | preconception-health | structured | yes | 6 | KEEP |
| partner-health-before-pregnancy | preconception-health, male-fertility | structured | yes | 7 | KEEP |
| sperm-health-basics | preconception-health, fertility, male-fertility | structured | yes | 7 | KEEP |
| when-to-ask-for-fertility-help | fertility, age-and-fertility, conditions | structured | yes | 6 | KEEP |
| unexplained-fertility-concerns | fertility | structured | yes | 6 | KEEP |
| age-and-trying-to-conceive | fertility, age-and-fertility | structured | yes | 6 | KEEP |
| male-fertility-when-trying-to-conceive | fertility, male-fertility | structured | yes | 6 | KEEP |
| moving-from-ttc-to-ivf | fertility | structured | yes | 6 | KEEP |
| testing-too-early | pregnancy-tests | structured | yes | 5 | KEEP |
| negative-test-but-no-period | pregnancy-tests | structured | yes | 5 | KEEP |
| evaporation-line-or-faint-positive | pregnancy-tests | structured | yes | 5 | KEEP |
| two-week-wait-symptoms | two-week-wait | structured | yes | 5 | KEEP |
| spotting-during-the-two-week-wait | two-week-wait | structured | yes | 5 | KEEP |
| coping-with-the-two-week-wait | two-week-wait | structured | yes | 6 | KEEP |
| tracking-without-overthinking | cycle-tracking | structured | yes | 5 | KEEP |
| thyroid-and-fertility | conditions | structured | yes | 6 | KEEP |
| ttc-in-your-30s | age-and-fertility | structured | yes | 6 | KEEP |
| ttc-after-35 | age-and-fertility | structured | yes | 6 | KEEP |
| emotional-pressure-of-age-when-ttc | age-and-fertility | structured | yes | 6 | KEEP |
| partner-support-when-ttc | male-fertility | structured | yes | 6 | KEEP |
| hcg-levels-explained | none in TTC — pregnancy topic data only | structured | yes | 6 | INTERNAL_LINK_ONLY |

Classification totals: KEEP 51, EXPAND_EXISTING 0, MERGE 0, REPOSITION 0, INTERNAL_LINK_ONLY 4, ARCHIVE_CANDIDATE 1.

## 3. Discoverability evidence

Definition applied: an **orphaned TTC article** has no meaningful in-site navigation path from the current public experience. Internal search / sitemap findability is recorded separately.

| Article | In-site navigation | Internal search / findability | Sitemap / indexability | Verdict |
| --- | --- | --- | --- | --- |
| 51 topic-placed articles | YES (topic page Start Here or group link) | YES | YES | Discoverable |
| `trying-to-conceive-explained` | YES (hub) | YES | YES | Discoverable |
| `how-long-implantation-takes` | YES — related guidance from 4 relevant TTC articles | YES | YES | Discoverable, related-guidance only |
| `chemical-pregnancy` | YES — related guidance from 5 relevant articles, including IVF | YES | YES | Discoverable, related-guidance only |
| `can-you-get-pregnant-on-your-period` | YES — one related-guidance link from `fertile-window` (a directly relevant ovulation article) | YES | YES | Discoverable but thin: only one inbound, from one sibling article, with no topic-page placement on `ovulation` or `cycle-tracking` where a visitor would expect it → **weak discovery** |
| `hcg-levels-explained` | YES via Pregnancy topic data only; NO path from any TTC surface | YES | YES | **Weak discovery within TTC** — crossover record whose only navigation home is the Pregnancy journey |
| `signs-of-ovulation` | NO — `/articles/signs-of-ovulation` redirects to `/articles/ovulation-signs` | NO (record unreachable) | Excluded from sitemap | Shadow duplicate, correctly redirected |

- ORPHANED TTC ARTICLES = 0
- TTC ARTICLES WITH WEAK DISCOVERY = 2 (`can-you-get-pregnant-on-your-period`, `hcg-levels-explained`) — reasons recorded above, not derived from inbound-link count alone
- SHADOW / DUPLICATE RECORDS = 1 (`signs-of-ovulation`)
- ORPHANED TTC SURFACES (non-article) = 3 (the legacy stage routes in §1.3)

## 4. Link integrity

All internal links appearing in 47 TTC surface files (`src/components/ttc/**`, `src/pages/TTCHub.tsx`, `src/data/ttcTopicData.ts`, `src/data/ttcFlagshipOverrides.ts`) were resolved against the `src/App.tsx` route table and `getArticle`.

- Distinct internal links checked: 87
- Resolving: 87
- BROKEN TTC INTERNAL LINKS = 0
- WRONG DESTINATION LINKS = 0 (every Start Here and group link resolves to the destination its label describes; `destinationKind` from Phase 35A remains presentation metadata only)
- BROKEN TTC ROUTES = 0

## 5. Imagery state

- Articles with an explicit hero: 48 / 56
- Articles resolving to a topic or journey fallback hero: 8 — `how-long-to-try-before-getting-help`, `pcos-and-trying-to-conceive`, `endometriosis-and-trying-to-conceive`, `irregular-periods-and-trying-to-conceive`, `fertility-tests-for-women`, `fertility-tests-for-men`, `what-happens-at-a-fertility-appointment`, `amh-test-explained` (all from the same May 2026 batch). These render an image, but a generic one.
- Articles with body imagery inside `editorialSections`: 13 / 56. The remaining 43 use the flagship text template, which is the established pattern for that template rather than a defect.
- Phase 35A.1 hub card imagery is unchanged and remains locked.

## 6. Sources and claims

- Articles with zero sources: 0
- Articles with structured (URL-bearing) sources: 36
- Articles with label-only sources: 20 — named UK authorities (NHS, NICE with guideline numbers, RCOG, HFEA, Tommy's, WHO, ESHRE, Miscarriage Association, Endometriosis UK) rendered to readers but excluded from JSON-LD citation output by design (`ArticlePage.tsx` line 57).
- Numerical or time-based claims inside label-only-source articles, where exact provenance cannot be established from repository evidence: **8** across 7 articles — `implantation-bleeding` ("around 6"), `trying-to-conceive-explained` ("about 12"), `fertile-window` ("about 12"), `how-long-implantation-takes` ("around 6"), `faint-positive-pregnancy-test` ("about 48"), `how-long-to-try-before-getting-help` ("About 80" per cent), `irregular-periods-and-trying-to-conceive` ("around 12"), `fertility-tests-for-men` ("roughly 10"). Each article carries relevant named authorities, so these are partially supported rather than unsourced. Not repaired in this phase.
- `~85%` statistics exist in `src/components/ttc/TTCHero.tsx` and `src/components/ttc/TTCFinalCTA.tsx`. Both components are only consumed by the unmounted `src/pages/TTC.tsx` and render on no live route, so no unsupported statistic is visible on the current public TTC experience.
- Reviewer / medical-review claims added in this phase: 0. No `reviewedBy` provenance was created, altered or asserted.
