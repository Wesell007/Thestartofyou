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

`article-grounding-review-queue.md` (annotated with the Tier 1 correction, not rewritten), `content-grounding-readiness.md`, `release-gate.md`, `roadmap.md`, `README.md` — each records 206 screened / 110 live / 44 draft / 52 unknown, the 12 corrected 30D support records, 6 body-reviewed practical articles, zero accepted candidates, governance metadata gaps, zero registry changes, zero approved articles, AI runtime unchanged, grounding still blocked. No document claims the library is grounding-ready.

## Roadmap correction

The existing future "Phase 30E — retrieval readiness review" moves to **Phase 30L — retrieval readiness review**, scope unchanged. Recorded mapping: old `Phase 30E — retrieval readiness review` → new `Phase 30L — retrieval readiness review`. No completed historical phase is renumbered; cross-references are updated consistently. Reserved post-30E sequence:

- Phase 30F — Grounding Governance Metadata & Editorial Status Resolution (content-owner, content-version, grounding-reviewer, reviewed-date, source-list validation, candidate authority, approval authority, review evidence, resolution of the 52 unknown statuses; no approvals)
- Phase 30G — Tier 2 Low-Risk General Education Review
- Phase 30H — Wellbeing & Sensitive Support Review (where the 12 corrected support records return)
- Phase 30I — Health-Reviewed Article Review
- Phase 30J — Safety-Sensitive / Not-Allowed Classification
- Phase 30K — Human Approval & Initial Approved Corpus
- Phase 30L — Retrieval Readiness Review
- Phase 31A — Controlled Grounded Knowledge Implementation (only after 30L passes)

## Recommended next phase

Phase 30F, on the Phase 30E findings: 52 unresolved editorial statuses and catalogue-wide missing owner, version, reviewer and reviewed date must be settled, along with source-list validation, candidate authority and approval authority, before any more sensitive tier is reviewed. Not Tier 2. No later phase is started in 30E.

## Tests

No registry change, so no new assertions are required. `articleGrounding.test.ts` and `articleGroundingDrift.test.ts` stay authoritative and must keep proving zero approved records, empty eligibility list, unknown slug not approved, metadata-only helper output, no dataset imports in runtime grounding modules, unchanged source routing and version constant, and unchanged answer hygiene.

## Validation

`npm test`, `npm run lint`, `npm run typecheck`, `npm run build`. The known `src/integrations/supabase/previewAuthStorage.ts` lint issue is left untouched and reported as pre-existing and out of scope.

## Report

The exact 20 requested items, with the close verdict answering all seven questions.
