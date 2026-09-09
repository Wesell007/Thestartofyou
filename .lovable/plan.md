# Phase 32B — First Year Core Gap Remediation (32B.1 evidence + ownership, then 32B.2 drafting)

Scope: exactly five Phase 31 First Year intents — teething, colic, weaning/solids, sleep regressions, milestone timing. Documentation only. No runtime records, routes, sitemap, SEO, AI, grounding, journal, memory, voice, schema or deployment changes. No publication.

## Confirmed Phase 31 records

| Cluster | Working title | Phase 31 classification | Closest owner | Top volume | Keywords | Directional volume | Priority | Cannibalisation | Review level |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| C067 | Teething | NEW_ARTICLE_GAP | none | 14,800 | 35 | 48,080 | P0 | LOW | LOW_RISK_GENERAL |
| C059 | Colic and evening crying | NEW_ARTICLE_GAP | none | 18,100 | 10 | 38,050 | P0 | LOW | HEALTH_REVIEW_REQUIRED |
| C058 | Colic remedies and gripe water | NEW_ARTICLE_GAP | none | 27,100 | 30 | 52,350 | P1 | LOW | SAFETY_REVIEW_REQUIRED |
| C072 | Starting solids and weaning | NEW_ARTICLE_GAP | none | 8,100 | 7 | 15,130 | P0 | LOW | SAFETY_REVIEW_REQUIRED |
| C062 | Sleep regressions | COVERED_PARTIAL | /first-year/sleep/helping-your-baby-settle (LIVE_INDEXABLE) | 9,900 | 35 | 50,510 | P0 | MEDIUM | LOW_RISK_GENERAL |
| C065 | Milestone timing questions | COVERED_PARTIAL | /first-year/development/baby-development-in-the-first-year (LIVE_INDEXABLE) | 14,800 | 69 | 150,420 | P0 | MEDIUM | NEEDS_HUMAN_EDITORIAL_REVIEW |

C058 and C059 are consolidated into one colic intent (gripe water is a remedy sub-intent, not a second page). Arithmetic carried into validation and the final report: Phase 31 cluster records reviewed = 6 · consolidated First Year intents reviewed = 5 · unrelated clusters = 0.

## Repository truth recomputed

- `src/data/firstYearArticleData.ts` holds **16** article records, all `status: "ready"`. No teething, colic or weaning record exists. Sleep is covered by `newborn-sleep-expectations` and `helping-your-baby-settle`; development by `baby-development-in-the-first-year` and `when-milestones-feel-uneven`.
- 13 month pages (`newborn` … `12-months`) plus phase pages and topic pages already own age-specific context.

## Draft-architecture finding (decisive)

`SAFE FIRST YEAR DRAFT CAPABILITY: NO`

- `status: "draft" | "ready"` exists and `scripts/generate-sitemap.ts` emits only `ready` articles; draft cards render unlinked in topic listings.
- But `src/pages/firstyear/FirstYearArticle.tsx` renders **any** matching record by direct URL with a self-referencing canonical and no `noindex`. A draft URL is therefore publicly reachable and indexable.
- Adding `noindex`/preview gating would be a route/SEO architecture change, which Phase 32B forbids.

So Phase 32B follows the Phase 32A pattern: all drafts live in `docs/`, runtime data untouched.

## Planned action table (to be confirmed by the evidence pack)

| Topic | Phase 31 classification | Current owner | Proposed final action | Why |
| --- | --- | --- | --- | --- |
| Teething | NEW_ARTICLE_GAP | none | NEW_ARTICLE | No owner anywhere; clean evergreen intent |
| Colic | NEW_ARTICLE_GAP | none | NEW_ARTICLE | No owner; highest unmet First Year need; absorbs gripe-water sub-intent |
| Weaning / solids | NEW_ARTICLE_GAP | none | NEW_ARTICLE | Core UK 6-month intent with no coverage |
| Sleep regressions | COVERED_PARTIAL | helping-your-baby-settle | NEW_ARTICLE | Concept is distinct from settling technique; no per-age regression pages |
| Milestone timing | COVERED_PARTIAL | baby-development-in-the-first-year, when-milestones-feel-uneven | EXPAND_EXISTING_ARTICLE | Intent substantially answered; a third milestone page would cannibalise |

The table records the PRIMARY CONTENT ACTION only. Supporting structured-page actions are recorded separately so nothing is double-counted:

| Topic | Supporting structured-page action |
| --- | --- |
| Sleep regressions | EXPAND_MONTH_PAGE — brief age-context and internal-link additions only |
| Teething | EXPAND_MONTH_PAGE — short age-context link where the evidence supports it |

The evergreen article owns the broad concept; month and phase pages own only age-specific context. No article body is duplicated into a structured page.

The milestone decision is confirmed by the section 12 A–D test recorded in the evidence pack; a new milestone article is only proposed if D (genuinely distinct uncovered intent) is YES, which the current reading says it is not.

## Review classifications

Each item carries its own evidence-derived classification, starting from Phase 31 and escalated (never downgraded) if the final proposed claims justify it:

| Topic | Starting classification | Escalation trigger |
| --- | --- | --- |
| Teething | LOW_RISK_GENERAL | HEALTH_REVIEW_REQUIRED if the draft materially covers symptom differentiation, illness or medicines |
| Colic | SAFETY_REVIEW_REQUIRED (stricter of C059/C058) | — |
| Weaning / solids | SAFETY_REVIEW_REQUIRED | — |
| Sleep regressions | LOW_RISK_GENERAL | SAFETY_REVIEW_REQUIRED if the draft makes substantive safe-sleep recommendations |
| Milestone timing | NEEDS_HUMAN_EDITORIAL_REVIEW | DEVELOPMENT_REVIEW_REQUIRED if developmental-concern wording goes beyond general ranges |

Every documentation draft carries `PUBLICATION STATUS: NOT PUBLISHED` and `REVIEW STATUS: [actual final classification]`. No item claims medically reviewed, safety reviewed or editorially reviewed.

## Deliverables

1. `docs/content/phase32b-evidence-pack.md` — the exact prescribed heading structure per topic (Phase 31 intent · existing owner · UK sources · supported factual points · safety/escalation boundaries · claims excluded · cannibalisation finding · recommended content action · `EVIDENCE SUFFICIENT TO BUILD: YES/NO`), then cross-topic overlaps, month-page ownership, evidence uncertainties, editorial/health-review requirements, publication recommendation. Also carries the action table, the draft-architecture finding and per-article image requirements.
2. `docs/content/phase32b-article-drafts.md` — full drafts only for items whose primary action is NEW_ARTICLE and whose evidence gate is YES. Each carries title, slug, description, read time, topic, body, related guidance (repository-verified routes only), source list, cannibalisation note, `PUBLICATION STATUS: NOT PUBLISHED` and `REVIEW STATUS: [that item's final classification]`.
3. `docs/content/phase32b-existing-content-expansions.md` — exact proposed expansion plan for the milestone-timing intent (and any month-page age-context additions), section by section, as a proposal only. Not created if no expansions are recommended.

## Evidence rules

UK-first sources only: NHS, NHS Start for Life, NICE where directly applicable, RCPCH where appropriate. What to Expect is demand evidence only, never a factual source. Every substantive claim maps to a named source with organisation, title, URL, checked date and claims supported. Any claim without a clear current UK source is dropped into that topic's excluded-claims register, never filled from general knowledge.

Named safety boundaries: teething must not be credited with fever, diarrhoea or significant illness beyond what UK guidance states; colic must not be diagnosed from symptoms and unproven remedies must not be presented as treatment; weaning must avoid rigid schedules, unsafe choking advice and unsupported allergy-prevention claims, and must link out for choking first aid; sleep regressions must be framed as a common parent term rather than fixed developmental events, with UK safe-sleep guidance preserved; milestone content must stay range-based and non-competitive.

## Tone and language

Calm, practical, parent-facing First Year voice, not clinical. British English and UK terminology (GP, health visitor, NHS 111, cot, introducing solids). Where local NHS pathways differ, say so. Each topic carries a brief "what this can feel like for you" beat without becoming wellbeing content.

## Images

None generated in this phase. The evidence pack records per article: hero required, body images required, reusable asset available, new asset required.

## Validation

Confirm: Phase 31 clusters reviewed = 5 · unrelated clusters = 0 · runtime records added = 0 · public articles created = 0 · existing article statuses changed = 0 · new lifecycle states = 0 · route, sitemap, SEO, AI, grounding, journal, database and deployment changes = 0 · files changed = only the Phase 32B documentation files. Run 32B.1 first and stop on any meaningful ambiguity; proceed to 32B.2 drafting only for items gated YES. Close with the 30-point return report and stop.
