# Phase 34A — IVF content coverage and journey audit

Audit only. No new articles, no edits to content, routes, discovery, grounding, AI or deployment. The only files written are the four Phase 34A documents.

## What exists today (confirmed by reading the project)

- IVF hub at `/ivf`, three stage pages (`/ivf/before-transfer`, `/ivf/after-transfer`, `/ivf/early-pregnancy`), one tool result route `/ivf-timeline`, and a TTC crossover page `/trying-to-conceive/ivf-and-treatment`.
- IVF stage and topic content in `src/data/ivfStageData.ts` and `src/data/ivfTopicData.ts`.
- IVF-tagged legacy articles in `src/data/articleData.ts` including `ivf-timeline-what-to-expect`, `emotional-impact-of-ivf` and `moving-from-ttc-to-ivf`, plus fertility articles that link into IVF.
- Contextual entry points: IVF strip above articles, IVF pathway blocks on the pregnancy and TTC hubs.

Exact counts, statuses and discoverability will be established during the audit rather than assumed.

## How the audit will run

1. **Inventory** — enumerate every IVF surface: hub, stage pages, topic/subtopic data, legacy IVF articles, the timeline tool, and IVF content living under TTC or Pregnancy. For each record capture title, slug, route, topic, template system, editorial status, whether real source provenance exists, normal discovery surface, contextual discovery surfaces, overlaps and journey role. Discovery is confirmed against the route table, the sitemap generator and the actual link graph, not filenames.
2. **Journey map** — map the UK IVF journey across the 28 audit domains (understanding IVF through to deciding whether to try again), marking each as covered, partially covered or uncovered, and merging domains where one strong page can satisfy several intents.
3. **Evidence hierarchy** — record HFEA, NHS and NICE as the primary reference hierarchy for any future IVF factual content, with reputable UK support organisations as secondary for emotional content. Competitor material is treated as demand evidence only.
4. **Search-demand audit** — a separate IVF demand assessment (Phase 31's dataset produced zero IVF rows). Intent clusters split into informational, treatment-stage, symptom/safety, emotional-support, funding/eligibility and decision-support. Demand is never treated as a proxy for clinical importance.
5. **Existing content actions** — classify every current IVF record as KEEP, EXPAND_EXISTING, MERGE, REPOSITION, INTERNAL_LINK_ONLY, REQUIRES_SOURCE_REMEDIATION, REQUIRES_HUMAN_HEALTH_REVIEW, REQUIRES_SAFETY_REVIEW or POTENTIAL_CANONICAL_OVERLAP. No rewriting.
6. **Gap register** — every opportunity classified as NEW_ARTICLE, EXPAND_EXISTING, MERGE_EXISTING, TOOL_OPPORTUNITY, JOURNEY_CONTENT, INTERNAL_LINK, NO_ACTION or DO_NOT_CREATE, each with a stated reason.
7. **Safety classification** — LOW_RISK_GENERAL, HEALTH_REVIEW_REQUIRED or SAFETY_REVIEW_REQUIRED per proposed item. No review is claimed as done; the no-provenance-no-claim rule stays binding.
8. **Product and companion opportunities** — separate the needs better served by a journey stage, companion answer, tool, checklist, tracker or timeline rather than another article.
9. **Cannibalisation audit** — for each overlapping intent nominate a primary owner, supporting page or merge candidate, with specific attention to IVF process, timeline, stimulation, transfer, implantation, two-week wait, symptoms, testing, failed cycles and emotional support.
10. **Discovery audit** — identify normal discovery gaps, orphan pages, duplicate discovery and misplaced content. Nothing is changed.

## Deliverables

- `docs/content/phase34a-ivf-content-audit.md` — full inventory, quality review, cannibalisation and discovery findings, plus the headline counts (IVF article count, topic/subtopic count, discoverable articles, orphans, new/expand/merge recommendations, tool and journey opportunities, no-action intents, health and safety review items, cannibalisation risks).
- `docs/content/phase34a-ivf-journey-map.md` — the UK journey map with coverage status per domain.
- `docs/content/phase34a-ivf-gap-register.csv` — one row per opportunity with classification and rationale.
- `docs/content/phase34a-ivf-existing-content-actions.csv` — one row per existing IVF record with its action classification.

The audit closes with one verdict (sufficient / minor gaps / material gaps / major gaps) and a deliberately small recommended next publication batch, not one article per gap.

## Boundaries

No new or edited articles, no source, route, topic, discovery, grounding, AI, journal, memory or voice changes, no imagery, no reviewer claims, no deployment. The Phase 33 deployment block stays active.
