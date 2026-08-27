# Phase 30G — Tier 2 Low-Risk General Education Review

Review and classification only. No article is approved, no registry record moves to candidate, and no article content reaches the AI runtime.

## What this phase does

Takes the 117 verified-live registry records from Phase 30F, narrows them with metadata to a conservative shortlist of genuinely low-risk general education, body-reviews only that shortlist by hand, and records a metadata-only decision for each. Everything that fails is routed to a later review phase (30H wellbeing, 30I health-reviewed, 30J safety-sensitive) or marked "later health/safety review required" where the evidence does not yet allow a confident split.

A small or zero Tier 2 result is a valid outcome. The criteria will not be relaxed to produce candidates.

## Review pool

- Start: 117 records with `editorialStatus: "live"`.
- Excluded before review: 44 draft, 45 unknown, any archived or deprecated, the 12 support records reserved for Phase 30H, and the 6 Phase 30E practical exclusions (preparing-for-baby-complete-guide, what-to-buy-for-a-new-baby, the-space-your-baby-will-come-home-to, hospital-bag-and-what-to-pack, writing-a-birth-plan, birth-preferences), whose earlier review evidence is preserved unchanged.

## Method

1. Metadata pass over the live set (journey, topics, slug semantics) to drop anything clearly wellbeing, clinical, loss, fertility-treatment, safety or urgency related, without body review.
2. Body review of the remaining shortlist only, reading article datasets purely for human classification.
3. Record per-article: slug, title, journey, topics, editorial status, current approval status, source-list status, proposed sensitivity, Tier 2 decision, concise reason, later review phase if excluded, governance gaps, next action. Metadata only — no paragraphs, sections, takeaways, quotations or AI-ready summaries.
4. Any accepted item is recorded as an "accepted future Tier 2 candidate", which explicitly does not mean `approvalStatus: "candidate"`.

## Deliverables

New document `docs/ai/article-grounding-tier-2-review.md` with the required twelve sections (purpose; review pool and method; inclusion rules; exclusion rules; shortlisted; body-reviewed; accepted future candidates; exclusions and later-tier routing; per-candidate governance gaps; required human decisions; confirmation nothing is approved or AI-connected; recommended next phase).

Annotations appended to `docs/ai/article-grounding-review-queue.md`, `docs/ai/content-grounding-readiness.md`, `docs/ai/release-gate.md`, `docs/ai/roadmap.md`, and `docs/ai/README.md`, recording pool counts (117 live / 44 draft / 45 unknown), shortlisted count, body-reviewed count, accepted count, exclusion and routing counts, governance gaps, 0 candidates, 0 approvals, AI runtime unchanged, grounding still blocked. The locked 30G→31A roadmap sequence is preserved.

## Technical notes

- No registry changes. `src/lib/grounding/articleGroundingRegistry.ts` is not edited. If a genuine registry-data defect surfaces, execution stops and reports it rather than correcting it here.
- No governance metadata is invented: owner, content version, grounding reviewer, reviewed date, approvedBy and approvedAt stay Missing. Sensitivity is recorded in the review document as "proposed" only, never written to the registry.
- No new tests. `src/test/articleGrounding.test.ts` and `src/test/articleGroundingDrift.test.ts` remain authoritative and must continue to pass unchanged (206 total, 117/44/45 split, 0 candidate, 0 approved, empty eligibility, metadata-only guards).
- No changes to prompts, modes, safety rules, the AI endpoint, source routing, rendering, Ask, companion behaviour, schema, routes or SEO. `AI_SOURCE_ROUTING_VERSION` stays `30B-source-routing-v1`; `listGroundingEligibleSlugs()` stays `[]`.
- Source lists are recorded as governance status only; none are added, rewritten or validated. Missing lists are logged as future governance gaps.

## Validation

Run `npm test`, `npm run lint`, `npm run typecheck`, `npm run build`. The known lint issue in `src/integrations/supabase/previewAuthStorage.ts` is left untouched and reported as pre-existing and outside scope.

## Close

Finish with the 20-item Phase 30G completion report, including the explicit close verdict on live-only review, draft/unknown exclusion, invented metadata, candidate/approval status, AI runtime exposure, source routing, AI behaviour, blocked status, and whether Phase 30H is safe to plan next. Phase 30H is not started.
