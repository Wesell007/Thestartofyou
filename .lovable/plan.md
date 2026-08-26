# Phase 30E — Tier 1 Article Grounding Review Batch

Review and candidate selection only. No article approved, no article content reaching AI runtime, no RAG/retrieval/vector search/embeddings/ingestion, no prompt, mode, safety, endpoint, source-routing, renderer, Ask, companion, schema, route, SEO or AI version-constant changes. `AI_SOURCE_ROUTING_VERSION` stays `30B-source-routing-v1` and `listGroundingEligibleSlugs()` stays `[]`.

## Findings from the pre-plan screen (drives the whole phase)

- All 206 registry records screened on metadata: 110 `live`, 44 `draft`, 52 `unknown`. Draft and unknown stay separate categories; unknown is never treated as draft, archived or deprecated. The 52 unknown records remain blocked and are recorded as an unresolved editorial/governance issue for a later phase.
- The Phase 30D Tier 1 pool (12 `support`-journey records) is emotional, loss, mental-health and fertility-pressure content, not brand or product guidance. It is corrected out of Tier 1 and recorded auditably by slug.
- Re-screening the live set produced 6 shortlisted practical articles: `preparing-for-baby-complete-guide`, `what-to-buy-for-a-new-baby`, `the-space-your-baby-will-come-home-to`, `hospital-bag-and-what-to-pack`, `writing-a-birth-plan`, `birth-preferences`.
- Body review of those 6 found sleep safety / SIDS, car seat safety, emergency and labour-arrival guidance, or birth clinical decision-making in every one. All six are excluded.
- **Expected outcome: zero accepted Tier 1 candidates, zero registry changes.** Recorded conclusion: "No purely product, journal or navigation article was identified among the 206 article-grounding registry records screened in Phase 30E." This applies only to the registry reviewed in this phase, not to the wider website, product or journal experience.

## Deliverable

New `docs/ai/article-grounding-tier-1-review.md`, metadata only, with the twelve required sections: purpose, method, inclusion rules, exclusion rules, articles reviewed, accepted future candidates (none), exclusions with concise reason categories plus the auditable Phase 30D correction table, per-candidate metadata gaps (empty by construction, with catalogue-wide gaps recorded), required human decisions, confirmation no article is approved, confirmation AI is not wired to article content, recommended next phase.

No body copy, sections, prose, takeaways, summaries, images or media are reproduced anywhere. Concise classification reasons only.

## Governance metadata

Owner, content version, reviewer and reviewed date are recorded as **Missing** for all 206 records. Nothing is inferred from git history, file dates, `lastUpdated`, author metadata, medical-review fields or contributor history. Source-list presence is recorded as governance metadata only and implies nothing about grounding readiness.

## Registry changes

None. Accepted-future-candidate is a document conclusion, not a registry state, and no record moves to `candidate` while the catalogue-wide governance gaps stand. `approved` is never set.

## Docs updates

`article-grounding-review-queue.md` (annotated with the Tier 1 correction, not rewritten), `content-grounding-readiness.md`, `release-gate.md`, `roadmap.md`, `README.md` — each records the Phase 30E result, the 30D Tier 1 correction, 206 screened / 6 body-reviewed, zero candidates, exclusion counts, governance gaps, zero registry changes, zero approved articles, AI runtime unchanged, grounding still blocked. The roadmap's existing "Phase 30E — retrieval readiness review" future entry is renumbered so the phase numbers do not collide. No document claims the library is grounding-ready.

## Tests

No registry change, so no new assertions are required. `articleGrounding.test.ts` and `articleGroundingDrift.test.ts` stay authoritative and must keep proving zero approved records, empty eligibility list, unknown slug not approved, metadata-only helper output, no dataset imports in runtime grounding modules, unchanged source routing and version constant, and unchanged answer hygiene.

## Validation

`npm test`, `npm run lint`, `npm run typecheck`, `npm run build`. The known `src/integrations/supabase/previewAuthStorage.ts` lint issue is left untouched and reported as pre-existing and out of scope.

## Report

The exact 20 requested items, with the close verdict answering all seven questions.
