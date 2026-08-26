# Phase 30E — Tier 1 Article Grounding Review Batch

Review and candidate selection only. No article is approved, no article content reaches the AI, and no AI behaviour, prompt, mode, safety rule, endpoint, source route, renderer, schema, route or version constant changes.

## Note on the Tier 1 pool

The Phase 30D queue named the 12 "support" journey records as tier 1. A pre-plan read of those records shows they are emotional and wellbeing content (perinatal anxiety, pregnancy after loss, chemical pregnancy, two-week wait, trying again after miscarriage), not brand, product or navigation guidance. Under this phase's exclusion rules they belong to a later reviewed tier, not Tier 1. Tier 1 will therefore be selected by re-screening the catalogue for genuinely non-clinical practical and product content, and the review pack will record this correction. It is possible the accepted candidate list ends up small or empty; that outcome will be reported honestly rather than padded.

## Review method

1. Build the shortlist from registry metadata: `editorialStatus: "live"`, not archived, not deprecated, and journey/topic tags suggesting practical or product content (family travel and days out, play and connection, preparing-for-baby practicals, product/journal guidance).
2. Inspect each shortlisted article's body for review purposes only, checking for any symptom, diagnosis, medication, urgency, complication, illness, feeding safety, sleep safety, milestone delay, loss, mental health, safeguarding or fertility treatment content.
3. Any article with meaningful health or safety content is excluded from Tier 1 and stays blocked.
4. Record metadata only for each reviewed article. No body copy, sections, prose, takeaways or media are copied anywhere.

## Deliverable

New `docs/ai/article-grounding-tier-1-review.md` with the twelve required sections: purpose, method, inclusion rules, exclusion rules, articles reviewed, accepted future candidates, exclusions, per-candidate metadata gaps, required human decisions before any approval, confirmation no article is approved, confirmation AI is not wired to article content, and the recommended next phase.

Per-candidate fields, using the Phase 30D template: slug, title, journey, topics, current status, proposed sensitivity, proposed content owner, proposed content version, source-list status, candidate decision, reason, reviewer notes, next action. Owner, reviewer, reviewed date and content version are not invented — where absent they are recorded as missing and the article stays blocked.

## Registry changes

Default is no registry change. If an article is clearly low-risk and its metadata is complete enough, its `approvalStatus` may move to `candidate` only. `approved` is never set. Given that all 206 records currently lack owner, content version, reviewer and reviewed date, the expected outcome is zero status changes, with candidates recorded in the document instead.

## Docs updates

`article-grounding-review-queue.md`, `content-grounding-readiness.md`, `release-gate.md`, `roadmap.md`, `README.md` — each records the Tier 1 result, candidate count, exclusion count, metadata gaps, zero approved articles, and that Start of You article grounding remains blocked.

## Tests

Existing `articleGrounding.test.ts` and `articleGroundingDrift.test.ts` stay authoritative. New tests are added only if any registry record changes; in that case an assertion pins the candidate slug set and re-asserts zero approved records. The standing guarantees must keep passing: zero approved, `listGroundingEligibleSlugs()` returns `[]`, unknown slug not approved, helpers expose no body content, runtime grounding modules import no dataset, source routing and `AI_SOURCE_ROUTING_VERSION` unchanged, answer hygiene unchanged.

## Validation

`npm test`, `npm run lint`, `npm run typecheck`, `npm run build`. The known pre-existing lint issue in `src/integrations/supabase/previewAuthStorage.ts` is left untouched and reported as pre-existing.

## Report

The 20 requested items, ending with the Phase 30E close verdict.
