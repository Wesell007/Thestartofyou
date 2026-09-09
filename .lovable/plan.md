# Phase 32D — Remaining New-Content Backlog Remediation

Documentation only. No runtime records, routes, navigation, sitemap, SEO, AI, grounding, journal, memory, voice or database changes. No deployment. Phases 32A, 32B and 32C stay closed; their content is reopened only for duplicate checking.

## Pre-plan reconciliation (read from `phase31-new-content-backlog.csv`, 27 data rows confirmed)

| Status | Count | Clusters |
| --- | --- | --- |
| HANDLED_32A | 3 | C019 itching, C036 caesarean birth, C037 gestational diabetes |
| HANDLED_32B | 4 | C067 teething, C059 colic, C072 weaning, C062 sleep regressions |
| HANDLED_32C | 3 | C078 diastasis, C079 sex after birth, C081 perineal care |
| CONSOLIDATED_INTO_ANOTHER_PAGE | 1 | C058 gripe water into the colic draft |
| CONVERTED_TO_EXISTING_PAGE_EXPANSION | 1 | C065 milestone timing into `baby-development-in-the-first-year` |
| Carried into 32D for disposition | 15 | see below |

3 + 4 + 3 + 1 + 1 + 15 = 27. No Phase 31 new-page row carries an IVF domain, so 32D creates no IVF pages; IVF is recorded as `DEFERRED_FOR_SEPARATE_IVF_AUDIT` with Phase 31's weak-evidence caveat preserved.

Carried forward, none of them P0 (P0 remaining before 32D = 0):

P1 (9): C068 newborn quirks and reflexes; C060 newborn skin; C077 common illnesses in babies; C074 tummy time; C063 sleep training methods; C015 digestive upset in pregnancy; C012 leg cramps in pregnancy; C028 brown discharge instead of period; C045 hCG levels.

P2 (6): C016 pregnancy rhinitis; C047 sex during pregnancy; C041 hair dye and beauty safety; C029 subchorionic haematoma; C022 dizziness and faintness; C004 conception date estimation (proposed as a tool, not an article).

P3: 0.

Every disposition below is provisional. Each row is re-tested against current repository truth and the 32A–32C drafts in stage 32D.1 before anything is drafted, and a row can move to expansion, consolidation, deferral or skip on that evidence.

## Stage 32D.1 — reconciliation and ownership

Create `docs/content/phase32d-backlog-reconciliation.md` with the requested structure: executive answer, full 27-row reconciliation table (cluster, title, domain, priority, original page type, current status, owner if covered, remediation phase, reason, remaining action), remaining P0 / P1 / P2, deferred P3, converted work, consolidated intents, deferred IVF items, skipped items, final pages worth drafting.

For each of the 15 carried rows, search `src/data/`, the hub/topic/week/month/age/phase surfaces and the 32A–32C documentation for the exact topic and its synonyms, then answer in writing: closest current owner, why that owner is insufficient, why a new URL must exist. Rows that cannot answer all three are not drafted.

Each row also carries cannibalisation risk (LOW/MEDIUM/HIGH) with the closest existing owner named, a final page-type decision (ARTICLE / TOOL / TOPIC EXPANSION / STRUCTURED PAGE EXPANSION / PILLAR UPDATE / DEFER / SKIP), a content-risk classification no lower than Phase 31's, and a skip reason from the fixed list where rejected.

Domain rules applied: TTC and Pregnancy are targeted top-ups only, so weak-demand or partly-owned rows prefer expansion or skip. Toddler and Family remain complete for current strategy and have no rows here anyway. Preparing for Baby stays a supporting editorial surface. Saved journeys remain exactly ttc, pregnancy, first_year.

Also record publication architecture per target dataset (legacy, First Year, Toddler, Family): status model, direct URL behaviour, noindex, sitemap, preview. Unless a genuinely safe non-public draft mechanism is demonstrated, runtime insertion stays 0.

Finish 32D.1 with the final remaining-pages table: Cluster | Domain | Intent | Priority | Current owner | Final action | Review level | Evidence gate, each NEW_ARTICLE ending `EVIDENCE SUFFICIENT TO BUILD: YES / NO`.

## Stages 32D.2 to 32D.4 — drafting, only for YES gates

Batched so evidence quality is not traded for volume:

- 32D.2 — remaining low-risk P1 drafts.
- 32D.3 — remaining health/safety P1 drafts.
- 32D.4 — selected P2 supporting drafts, only where they clear the ownership and cannibalisation gates.

All drafts go into `docs/content/phase32d-article-drafts.md`, each headed `PUBLICATION STATUS: NOT PUBLISHED` and its own evidence-derived `REVIEW STATUS`. Sources are UK-first and fetched live with checked dates: NHS, NHS Start for Life, NICE, RCOG, RCPCH, GOV.UK, and HFEA only if genuinely needed. What to Expect stays demand evidence only. Every substantive high-risk claim maps to a source.

Quality floor: answer the question quickly, real human usefulness, a genuine hub home, meaningful addition beyond existing content, British English, no keyword stuffing, no FAQ padding, no invented statistics, no forced length. Anything answerable inside an existing page becomes an expansion instead.

For each final new-article recommendation, record hero image needed, body image needed, existing reusable asset, new asset needed. No images are generated. Suggested parent links are recorded only; systematic cross-linking stays with Phase 32F.

## Conditional deliverables

- `docs/content/phase32d-converted-expansions.md` — created only if rows convert to expansion work, recording the original proposal, current owner, why a new page is no longer appropriate, the exact expansion required, and the review classification. Feeds Phase 32E. No live page is edited.
- `docs/content/phase32d-tool-opportunities.md` — created only if tool opportunities remain (C004 is the current candidate), recording user intent, Phase 31 evidence, why an article is insufficient, closest current tool, product value, risk and recommended future phase. No tool is built.

No empty files are created.

## Then

Report the full 30-point return with arithmetic reconciling to 27, all zero counts for runtime, publication, routes, navigation, sitemap, SEO, AI, grounding, journal, memory, voice, database and deployments, and stop before Phase 32E.
