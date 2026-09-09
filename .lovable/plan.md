# Phase 32D — Remaining New-Content Backlog Remediation

Documentation only. No runtime records, routes, navigation, sitemap, SEO, AI, grounding, journal, memory, voice or database changes. No deployment. Saved lifecycles stay exactly `ttc`, `pregnancy`, `first_year`. Phases 32A, 32B and 32C stay closed; read for duplicate checking only.

The reconciliation, ownership testing and UK evidence gathering are complete. Approval is needed to write the deliverable files, because plan mode blocks all file writes except this one.

## Reconciliation (all 27 rows, one terminal status each)

- Original rows: 27
- Pre-32D resolved: 12 — HANDLED_32A 3 (C019, C036, C037), HANDLED_32B 4 (C067, C059, C072, C062), HANDLED_32C 3 (C078, C079, C081), CONSOLIDATED 1 (C058), CONVERTED 1 (C065)
- Carried into 32D: 15 (P1 = 9, P2 = 6, P0 = 0, P3 = 0)

The 15 carried rows resolve to six disposition values totalling 15:

| Disposition | Count | Clusters |
| --- | --- | --- |
| NEW_ARTICLE_DRAFTED_32D | 9 | C068, C060, C077, C015, C012, C045, C047, C041, C022 |
| CONVERTED_TO_EXISTING_PAGE_EXPANSION | 5 | C074, C063, C028, C016, C029 |
| TOOL_OPPORTUNITY | 1 | C004 |
| NEW_ARTICLE_NOT_DRAFTED_EVIDENCE_HOLD | 0 | — |
| DEFERRED_FOR_SEPARATE_AUDIT | 0 | — |
| SKIP_AFTER_REVIEW | 0 | — |

3 + 4 + 3 + 1 + 1 + 9 + 5 + 1 = 27.

IVF sits outside this arithmetic: actual IVF backlog rows = 0, IVF completeness = `DEFERRED_FOR_SEPARATE_IVF_AUDIT`. C004 counts once, as a tool opportunity only.

## Why the five conversions

- C074 tummy time — already named across First Year month and phase data; expand the development article instead.
- C063 sleep training — HIGH cannibalisation against `helping-your-baby-settle` and the 32B sleep draft; expand the settling article.
- C028 brown discharge — intent splits across `spotting-during-the-two-week-wait` and `discharge-in-pregnancy`, both strong owners.
- C016 rhinitis — one section inside `cold-and-flu-in-pregnancy`; a third page in that symptom family would compete.
- C029 subchorionic haematoma — a named-diagnosis page becomes a fear page; expand `bleeding-in-early-pregnancy`.

## The nine drafts

Each passed the three-part ownership test (closest owner, why it is insufficient, why a separate URL) and an evidence gate of YES against UK sources fetched live: NHS common health problems in pregnancy, NHS getting to know your newborn (reviewed 22 April 2024), NHS rashes in babies and children, NHS cradle cap, NHS fever in children, NHS diarrhoea and vomiting, NHS hair dye in pregnancy, NHS Inform sex in pregnancy, NHS ectopic pregnancy and miscarriage, plus NHS trust early-pregnancy hCG monitoring leaflets.

Batches: 32D.2 low risk — C041. 32D.3 health and safety P1 — C068, C060, C077, C015, C012, C045. 32D.4 selected P2 — C047, C022.

Review levels: LOW_RISK_GENERAL for C041; HEALTH_REVIEW_REQUIRED for C068, C060, C015, C012, C045, C047, C022; SAFETY_REVIEW_REQUIRED for C077 (escalated from Phase 31).

## Publication architecture

Legacy records render at their direct URL, are self-canonical and are emitted to the sitemap; First Year drafts also render at their direct URL with no `noindex`. Safe non-public draft capability = NO for every target dataset, so runtime insertion stays 0 and every draft lives in documentation under a publication hold.

## Files to write on approval

- `docs/content/phase32d-backlog-reconciliation.md` — executive answer, full 27-row table, priority sections, current-owner and cannibalisation tests, publication architecture, final remaining-pages table with evidence gates.
- `docs/content/phase32d-article-drafts.md` — nine drafts, each headed `PUBLICATION STATUS: NOT PUBLISHED` with its own review status, UK sources, excluded claims and image and link metadata. No images generated.
- `docs/content/phase32d-converted-expansions.md` — the five conversions, each with original proposal, current owner, why no new URL, exact expansion and review classification. Feeds Phase 32E.
- `docs/content/phase32d-tool-opportunities.md` — C004 only.

No other file is touched. Then the full 30-point report, with zero counts for runtime, publication, routes, navigation, sitemap, SEO, AI, grounding, journal, memory, voice, database and deployments. Stop before Phase 32E.
