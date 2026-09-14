# Phase 34A — IVF content coverage audit

Status: CLOSED PASS
Type: audit and documentation only. No articles created or edited, no runtime, route, discovery, sitemap, grounding, AI, schema or deployment change.
Global Phase 33 deployment block: ACTIVE.
Saved lifecycles unchanged: `ttc`, `pregnancy`, `first_year`. IVF remains an editorial and support domain; no IVF lifecycle is proposed.

## 1. Inventory, counted by surface type

| Surface type | Count |
| --- | --- |
| IVF hub surfaces | 1 |
| IVF stage/journey pages | 3 |
| IVF topic/subtopic data records (rendered) | 3 |
| Unique IVF articles (journey includes `ivf`) | 2 |
| TTC/Pregnancy crossover articles with IVF relevance | 9 |
| IVF tools/results | 1 |
| TTC crossover hub page | 1 |
| **Total distinct IVF-related public surfaces** | **17** |

Shared-record relationships, documented rather than double-counted:

- `src/data/ivfTopicData.ts` holds 3 topic configs; each powers exactly one of the three `/ivf/*` stage routes. The 3 topic records and 3 stage pages are the same content expressed as data and route, so total public surfaces counts them once.
- `src/data/ivfStageData.ts` holds 3 further IVF stage records keyed `before-transfer`, `after-transfer`, `early-pregnancy`, consumed only by `src/pages/StagePage.tsx` on the generic `/:journey/:stage` route. All three explicit `/ivf/*` routes are registered above that generic route in `src/App.tsx`, so these 3 records are unreachable at runtime. They are audited as content records but are not public surfaces.
- `/ivf-timeline` (tool result) and `/articles/ivf-timeline-what-to-expect` (article) are distinct records covering adjacent intent; `src/data/articleInventory.ts` already records the tool as canonical primary and the article as supporting.

### Unique IVF articles

| Field | ivf-timeline-what-to-expect | emotional-impact-of-ivf |
| --- | --- | --- |
| Title | IVF timeline: what to expect at every stage of treatment | The emotional impact of IVF: what no one prepares you for |
| Route | /articles/ivf-timeline-what-to-expect | /articles/emotional-impact-of-ivf |
| Dataset | src/data/articleData.ts | src/data/articleData.ts |
| Topic/category | timelines, body-changes, emotional-wellbeing | emotional wellbeing, support |
| Template | legacy article (editorial sections) | legacy article (editorial sections) |
| Editorial status | live | live |
| Source provenance present | NO — source list is plain labels ("HFEA", "NICE guidelines on fertility treatment (CG156)", "NHS: IVF") with no traceable URLs | NO — plain labels (HFEA, BICA, Fertility Network UK, RCOG) with no URLs |
| Normal discovery | IVF hub topic pages (before-transfer start-here and featured), TTC `ivf-and-treatment` | IVF after-transfer featured, IVF topic support groups, TTC `ivf-and-treatment` |
| Contextual discovery | `moving-from-ttc-to-ivf` related links, TTC topic and subtopic image maps | `moving-from-ttc-to-ivf`, several pregnancy/loss articles via relatedSlugs |
| Journey role | Cornerstone explainer for the whole cycle | Emotional spine of the IVF domain |
| Overlap / cannibalisation risk | Medium — adjacent to `/ivf-timeline` tool (already arbitrated in the inventory) | None material |

Reviewer metadata (`reviewedBy`, `medicallyReviewed`) is present on both records but is explicitly **not** counted as source provenance. Phase 33.5 remains binding: no provenance, no review claim. Human reviews completed = 0.

### Crossover articles with IVF relevance

`moving-from-ttc-to-ivf` (structured sources with URLs: NHS, NICE CG156, HFEA — provenance YES), `when-to-ask-for-fertility-help`, `what-happens-at-a-fertility-appointment`, `unexplained-fertility-concerns`, `fertility-tests-for-women`, `fertility-tests-for-men`, `male-fertility-when-trying-to-conceive`, `two-week-wait`, `chemical-pregnancy`.

## 2. Discovery findings

Verified against the route table (`src/App.tsx`), the sitemap generator (`scripts/generate-sitemap.ts`) and the actual link graph in `ivfTopicData.ts`, `ivfStageData.ts` and `ttcTopicData.ts`.

- Discoverable IVF articles: 2 of 2.
- Orphan IVF articles: 0.
- Orphan/unreachable data records: 3 (the shadowed `ivfStageData.ts` stage records).
- Duplicate discovery: 2 patterns — the timeline tool and the timeline article both surfaced as "IVF timeline" from the TTC crossover page, and the three IVF stages existing in two datasets.
- Misplaced content: `moving-from-ttc-to-ivf` carries `journey: ["trying-to-conceive"]` only, so it never appears on the IVF hub even though it is the entry article into IVF.
- Broken internal references: 0. All 21 `/articles/*` targets referenced from IVF data resolve to real slugs; all non-article targets (`/ivf`, the three stage routes, `/pregnancy`, `/support`, `/ask`, `/journal`) are registered routes.
- Normal discovery gap: the IVF hub itself carries only 2 article destinations; most stage-page depth is delivered as companion prompts rather than readable guidance.

Nothing was changed. All discovery items are recorded for a later phase.

## 3. Existing content quality review

20 content records audited (17 public surfaces plus the 3 shadowed stage records). Full rows in `phase34a-ivf-existing-content-actions.csv`.

Primary actions (sum = 20):

| Primary action | Count |
| --- | --- |
| KEEP | 10 |
| EXPAND_EXISTING | 3 |
| MERGE | 3 |
| REPOSITION | 0 |
| INTERNAL_LINK_ONLY | 4 |

Secondary flags (may overlap; not part of the arithmetic above):

| Secondary flag | Count |
| --- | --- |
| REQUIRES_SOURCE_REMEDIATION | 2 |
| REQUIRES_HUMAN_HEALTH_REVIEW | 3 |
| REQUIRES_SAFETY_REVIEW | 2 |
| POTENTIAL_CANONICAL_OVERLAP | 7 |

## 4. Evidence hierarchy for future IVF content

1. HFEA
2. NHS
3. NICE

Reputable UK support organisations (Fertility Network UK, BICA, Tommy's) may supplement emotional and support topics only. Competitor material is demand and intent evidence only, never factual authority, and no competitor structure or wording is to be reproduced.

## 5. Search-demand assessment

Phase 31's finding (IVF backlog rows = 0) reflects the limits of that single dataset and is not evidence of IVF completeness. No reliable UK numerical search-volume evidence was gathered inside this audit, so every demand judgement below is recorded as **QUALITATIVE DEMAND SIGNAL**, evidenced by the intent patterns already encoded in the product: the IVF stage pages, the companion prompt sets in `ivfTopicData.ts`, the TTC crossover configuration and the existing article FAQ sets.

| Intent cluster | Qualitative demand signal | Evidence |
| --- | --- | --- |
| Informational (what IVF is, how it works) | High | Hub orientation copy and TTC `ivf-and-treatment` questions all start here |
| Treatment-stage (stimulation, monitoring, collection, transfer, FET) | High | Largest block of companion prompts across all three stage pages |
| Symptoms and safety (post-transfer symptoms, OHSS, when to call the clinic) | High | Dedicated prompt groups plus `seekSupport` lists in both IVF articles |
| Emotional support | High | Owned by a dedicated article and referenced from every stage page |
| NHS funding and eligibility | Moderate | Raised in `moving-from-ttc-to-ivf` but with no destination page |
| Decision support (ICSI, fresh vs frozen, trying again) | Moderate | Appears only as companion prompts with no readable owner |

Search demand and clinical or journey importance are assessed separately. OHSS, for example, carries lower informational demand than "IVF timeline" but higher safety importance.

## 6. Journey coverage summary

28 domains audited; full detail in `phase34a-ivf-journey-map.md`.

| Status | Count |
| --- | --- |
| COVERED | 4 |
| PARTIALLY_COVERED | 10 |
| UNCOVERED | 11 |
| NOT_REQUIRED_AS_STANDALONE_CONTENT | 2 |
| BETTER_SERVED_BY_PRODUCT_OR_JOURNEY | 1 |
| **Total** | **28** |

## 7. Gap register summary

22 rows; full detail in `phase34a-ivf-gap-register.csv`.

| Primary classification | Count |
| --- | --- |
| NEW_ARTICLE | 7 |
| EXPAND_EXISTING | 8 |
| MERGE_EXISTING | 0 |
| TOOL_OPPORTUNITY | 1 |
| JOURNEY_CONTENT | 1 |
| INTERNAL_LINK | 3 |
| NO_ACTION | 1 |
| DO_NOT_CREATE | 1 |
| **Total** | **22** |

Review classification across the same 22 rows: LOW_RISK_GENERAL = 8, HEALTH_REVIEW_REQUIRED = 12, SAFETY_REVIEW_REQUIRED = 2. No human review is recorded as completed.

## 8. Cannibalisation findings

| Intent | Classification | Arbitration |
| --- | --- | --- |
| IVF process | PRIMARY OWNER | `/articles/ivf-timeline-what-to-expect`; `/ivf` hub is orientation only |
| IVF timeline | PRIMARY OWNER | `/ivf-timeline` tool owns the interactive intent; the article owns the explainer intent (already recorded in `articleInventory.ts`) |
| Stimulation / injections | SUPPORTING PAGE | Belongs inside the timeline article; do not create a standalone page |
| Monitoring | SUPPORTING PAGE | Timeline article section plus before-transfer stage page |
| Egg collection | SUPPORTING PAGE | Timeline article section |
| Fertilisation and IVF vs ICSI | MERGE CANDIDATE | One decision-support guide should own both; splitting them would cannibalise |
| Embryo development, grading, blastocysts | MERGE CANDIDATE | One lab-stage guide should own all three |
| Embryo transfer | SUPPORTING PAGE | `/ivf/before-transfer` owns the stage; the timeline article owns the explanation |
| Implantation | NO MATERIAL OVERLAP | Owned by existing `implantation-bleeding` and `how-long-implantation-takes` |
| Two-week wait | PRIMARY OWNER | `/ivf/after-transfer` owns the IVF framing; `/articles/two-week-wait` owns the general TTC framing |
| Symptoms after transfer | SUPPORTING PAGE | `/ivf/after-transfer`, with the `compare` block in the timeline article |
| Pregnancy testing | SUPPORTING PAGE | Existing testing articles own the mechanics; IVF adds the trigger-shot nuance |
| Positive result | PRIMARY OWNER | `/ivf/early-pregnancy` |
| Unsuccessful IVF | MERGE CANDIDATE | "Cycle did not work" and "deciding whether to try again" should be one guide |
| Emotional impact | PRIMARY OWNER | `/articles/emotional-impact-of-ivf` |

Cannibalisation risks recorded: 15 intents assessed, of which 4 merge candidates and 4 primary-owner arbitrations are material.

## 9. Product versus article opportunities

- Questions to ask a fertility clinic — checklist, not an article.
- Cycle sequencing and "where am I now" — editorial journey content on the existing stage pages, not a new lifecycle.
- Day-by-day medication rhythm — the existing `/ivf-timeline` tool already carries this intent; extend rather than write.
- Stage-specific nuance already expressed as companion prompts should stay in the companion unless the same question recurs across stages.

## 10. Headline counts

- Unique IVF articles: 2
- IVF topic/subtopic records (rendered): 3
- IVF stage/journey surfaces: 3
- IVF tools/results: 1
- TTC/Pregnancy crossover articles with IVF relevance: 9
- TTC crossover hub page: 1
- Total distinct IVF-related public surfaces: 17
- Discoverable IVF articles: 2
- Orphan IVF articles: 0 (plus 3 unreachable stage data records)
- Broken internal references: 0

## 11. Final verdict

**IVF COVERAGE HAS MATERIAL GAPS.**

The IVF domain has a sound spine (hub, three stages, one cornerstone explainer, one emotional guide, one timeline tool) and no broken or orphaned articles, but 11 of 28 journey domains have no readable owner, the two IVF articles lack traceable source provenance, and most treatment-stage depth exists only as companion prompts.

### Smallest sensible next batch

CREATE (4 articles only):
1. What IVF is and how treatment works in the UK — closes domain A and anchors the hub.
2. NHS funding and eligibility for IVF — closes domain C, the single largest UK-specific gap.
3. OHSS and treatment side effects — closes domain T; highest safety importance.
4. When an IVF cycle does not work, and deciding whether to try again — merges domains U and AA.

EXPAND: the timeline article, to absorb stimulation, monitoring, trigger, egg collection and sperm preparation as sections rather than new pages; `/ivf/after-transfer` for testing nuance and post-transfer symptoms.

MERGE: the 3 shadowed `ivfStageData.ts` records into the rendered topic data.

LINK: embryo freezing and storage (HFEA), loss after treatment (existing loss articles), multiple pregnancy (existing pregnancy content); surface `moving-from-ttc-to-ivf` on the IVF hub.

PRODUCT/JOURNEY: clinic-questions checklist; editorial stage sequencing.

DO NOT CREATE: donor eggs and sperm (HFEA-regulated, outside current editorial scope); standalone pages for blastocysts, stimulation, trigger, egg collection or sperm preparation.

Source remediation for the two IVF articles and the four new pieces must precede publication, and all six sit behind health or safety review. Nothing in this batch is implemented in Phase 34A.

---

## Implementation status (recorded after Phase 34B)

Phase 34A audit counts above are historical and unchanged. Implementation outcome only:

- Source remediation for both IVF articles: COMPLETE (Phase 34B).
- EXPAND: timeline article and `/ivf/after-transfer`: COMPLETE. `/ivf/before-transfer` DEFERRED FROM 34B SMALL BATCH.
- MERGE: 3 shadowed `ivfStageData.ts` records: RESOLVED (file deleted, registry entry removed); shadowed records now 0; public IVF stage routes 3 -> 3.
- LINK: freezing/storage signpost, loss (chemical pregnancy, pregnancy after loss) and multiple pregnancy implemented as contextual links; `moving-from-ttc-to-ivf` surfaced on the IVF hub exactly once.
- CREATE (4 articles) and the clinic-questions checklist: NOT STARTED, held for a later phase.
- Human reviews completed: still 0. Deployment: still 0.

See `docs/content/phase34b-ivf-remediation-report.md`.
