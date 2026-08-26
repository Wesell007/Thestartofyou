# Phase 30A — AI Content Grounding Readiness Audit

Documentation only. No RAG, no embeddings, no article ingestion, no prompt, mode, safety, endpoint, schema, route or UI changes. Memory stays out of scope.

## What this phase produces

A single readiness document that states plainly what the AI is grounded in today, where that grounding is weak, and what must be true before The Start of You content or any retrieval system is allowed near the companion. It ends with a recommended sequence of future phases, each gated.

## Confirmed current state (verified by reading the code this turn)

- Grounding is static keyword routing over a fixed allowlist of 17 NHS URLs in `supabase/functions/_shared/aiSources.ts`. Eleven ordered regex topics, first match wins, a family hub page appended, capped at three URLs, with a two-page pregnancy default when nothing matches.
- `supabase/functions/ai-search/index.ts` fetches those pages live per request, strips them to `<main>` text capped at 10,000 characters, wraps each as `<background>`, and fails the request with a 503 when every fetch fails. URLs are deliberately never passed to the model.
- Grounding is per mode: four modes set `useGrounding: true`, the day-recap mode sets it to `false` and never calls out.
- Hard escalation and the kill switch run before grounding and before the model, so grounding cannot weaken safety routing.
- Output hygiene already forbids mentioning evidence, sources, retrieval or anything "provided"; `stripSourceBlocks` and `stripExternalSourceLinks` remove source blocks and external links at render time.
- Article metadata today has `journey`, `topics`, `sources`, `lastUpdated`, `reviewedBy` — but no sensitivity level, no content version, no owner record, no archived/deprecated state, and no per-article grounding approval flag. `articleInventory.ts` tracks editorial status separately from the article data itself.
- Version constants exist per concern, including `AI_SOURCE_ROUTING_VERSION` (`29B1-source-routing-v1`).

## Deliverable: `docs/ai/content-grounding-readiness.md`

Fifteen sections, in the requested order:

1. Current source-routing system — the routing table, ordering, caps, defaults, per-mode grounding flag, live-fetch model.
2. Current approved external source approach — NHS-only allowlist, why it is allowlisted rather than searched, availability failure behaviour.
3. Limits of static keyword routing — first-match ordering collisions, no relevance ranking, whole-page text with no section targeting, no freshness or change detection, no postpartum/toddler/family route, silent thin-evidence risk.
4. Well-covered questions today — movements, bleeding, appointments, labour signs, infant feeding, infant sleep, testing and two-week wait, IVF, mental-health escalation.
5. Weakly covered questions today — postpartum recovery, toddler and family stages, weaning detail, multiple-topic questions, brand and product questions, "what does this app do" questions, anything Start of You specific.
6. Why Start of You articles are not yet approved for grounding — no sensitivity level, no version, no owner, no archive state, no grounding approval flag, mixed maturity, and the risk that a draft or superseded article becomes the authority behind a health answer.
7. Requirements before Start of You content can be used — the twelve criteria (original, medically reviewed where needed, reviewed date, source list, topic tags, journey tags, sensitivity level, owner/reviewer, version, archived/deprecated support, evaluation examples, rollback), plus the rule that only explicitly approved articles are eligible and everything else is invisible to the AI by default.
8. Future source hierarchy — assessed, not implemented: urgent safety rules first, approved UK health sources for medical or safety-sensitive content, reviewed Start of You content for brand-specific guidance later, neutral fallback when evidence is thin, never unsupported diagnosis, certainty or verdict language.
9. Content tagging and versioning requirements — the field set, where it would live, and the rule that a metadata change bumps a content version and a routing change bumps `AI_SOURCE_ROUTING_VERSION`.
10. Review requirements for health-sensitive content — sensitivity levels, who signs off, what can never be grounding material regardless of review (Category F style health/safety-sensitive detail, personal user content, journal, reflections).
11. Answer rendering rules — no raw URLs, no source blocks, no retrieval wording, no citation lists; the existing hygiene block and the two strippers are the enforcement points and stay unchanged.
12. Safety escalation boundary — escalation stays ahead of grounding; no future source may soften, replace or delay an escalation answer; the recap mode stays ungrounded.
13. Evaluation requirements — what must be added to the eval dataset before any grounding change: per-source routing assertions, thin-evidence fallback prompts, brand-question prompts, stale-article prompts, and no-regression checks on Red and Crisis rows.
14. Future implementation options — assessed with trade-offs, none chosen: keep static routing and widen the allowlist; hand-curated article-to-topic mapping with approved articles only; retrieval over an approved, versioned subset; no change. Each with its own gate.
15. Recommended next phases — a gated sequence (widen external routing for postpartum and toddler → article metadata and approval model → curated brand-answer grounding → optional retrieval), each with entry and exit criteria and an explicit statement that none is authorised by this phase.

## Documentation updates

- `docs/ai/system-map.md` — add a grounding section reflecting exactly what the code does today (live fetch, caps, per-mode flag, ordering) and link the new readiness document.
- `docs/ai/privacy-notes.md` — record that grounding fetches are outbound to public NHS pages only, that no user question, context or identifier is sent to those sources, and that no user content is or may become grounding material.
- `docs/ai/release-gate.md` — add a grounding gate: routing changes require version bump, eval rows, hygiene checks and a safety no-regression run; Start of You grounding stays blocked until the section 7 criteria are recorded.
- `docs/ai/roadmap.md` — add Phase 30A as closed and register the recommended 30B onwards sequence with entry/exit criteria.
- `docs/ai/README.md` — add the new file to the contents table and Phase 30A to the closed list.

No `aiVersions.ts` bump: nothing behaviour-bearing changes in this phase.

## Validation

`npm run typecheck` and `npm run build`. No tests, since no application file or JSON dataset changes.

## Report

The fifteen requested report items, ending with the Phase 30A close verdict.
