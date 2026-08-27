# Phase 30J — Safety-Sensitive / Not-Allowed Classification

Review and classification only. No code, registry, schema, prompt, routing or runtime changes. Phase 30K is not started.

## What this phase produces

A dedicated safety adjudication of every verified-live article previously routed into the safety queue, documented as metadata-only classifications.

## Pool reconstruction (closed evidence only)

Rebuild the pool from six provenance groups, then deduplicate by slug:

- Group A — Phase 30G direct 30J routes (expected 30), from `docs/ai/article-grounding-tier-2-review.md`
- Group B — Phase 30G "later health/safety review required" (expected 12), same document
- Group C — Phase 30H direct 30J routes (7 named slugs), from `docs/ai/article-grounding-wellbeing-review.md`
- Group D — Phase 30I direct 30J routes (expected 33), from `docs/ai/article-grounding-health-review.md`
- Group E — Phase 30I later safety adjudication (`trying-again-after-miscarriage`)
- Group F — Phase 30E practical exclusions requiring final safety adjudication (6): `preparing-for-baby-complete-guide`, `what-to-buy-for-a-new-baby`, `the-space-your-baby-will-come-home-to`, `hospital-bag-and-what-to-pack`, `writing-a-birth-plan`, `birth-preferences`. Their Phase 30E exclusion reasons (sleep safety/SIDS, equipment and car-seat safety, labour-arrival material, birth clinical decision-making) are recorded as provenance only and do not pre-set any Phase 30J outcome; all six receive the same dedicated body review and may de-escalate.

Pre-dedup provenance total expected: 89. A pre-plan extraction of the closed evidence confirms A = 30, B = 12, C = 7, D = 33, E = 1, F = 6, with zero slug overlap, giving 89 unique slugs; all 89 verify in the registry as `live`, non-archived, non-deprecated and neither candidate nor approved. These figures are re-derived during execution; if the union does not produce exactly 89 unique eligible records, the phase stops and reports the discrepancy.

Each unique slug is verified against `src/lib/grounding/articleGroundingRegistry.ts`, requiring `editorialStatus === "live"`, `archived === false`, `deprecated === false`, and an approval status that is neither candidate nor approved.

## Live-corpus reconciliation audit (before body review)

Prove every verified-live record is accounted for before Phase 30K planning:

5 Tier 2 accepted-future + 21 health-reviewed accepted-future + 2 wellbeing reconciliation (`preparing-emotionally-for-birth`, `two-week-wait`, both still blocked) + 89 Phase 30J records = 117 verified-live records. A pre-plan slug-level check reconciles exactly, with no live record unaccounted for and no extra slug. If execution does not reconcile by exact unique slug, the phase stops and reports.

Excluded: 44 draft records, 45 unknown records, the three unknown support records, the 5 Tier 2 accepted-future candidates, the 21 health-reviewed accepted-future candidates, `preparing-emotionally-for-birth`, `two-week-wait`, and anything not supported by closed 30E/30G/30H/30I evidence. No topic-similarity expansion; Group F is completion of a deferred 30E review path, not expansion.

## Review method

Every verified record receives its own Phase 30J body review; earlier routing is provenance only, never a substitute. Article datasets are read for human review; no body content, quotations, summaries, media or AI-ready text enters documentation or any runtime structure. Reasons are concise classification notes only.

Each record receives exactly one proposed outcome:

- `safety_sensitive` (accepted future safety-sensitive candidate)
- `not_allowed`
- `health_reviewed` — reconciliation required
- `wellbeing` — reconciliation required
- `low` — reconciliation required

Enhanced scrutiny applies to mental-health and crisis content (the 7 Phase 30H routes plus `pregnancy-after-loss`, which is present in the Phase 30I set), pregnancy-loss and fertility records, medication/supplement/dosing content, and safe sleep / activity / equipment safety. De-escalation is permitted where body evidence supports it; reconciliation findings stay blocked and do not join earlier accepted-future lists.

Final classification safeguard: uncertainty alone never produces `not_allowed`. A proposed `not_allowed` requires affirmative body-review evidence that the article meets the stated standard **and** that ordinary safety_sensitive governance would still be insufficient. Each proposed `not_allowed` record documents the specific criterion triggered, why safety_sensitive treatment would be insufficient, that the classification is documentation-only, and that no registry sensitivity or approval field changed. Serious subject matter, red-flag content, clinical complexity, a need for strong governance, appropriate crisis signposting, or boundary uncertainty are each insufficient on their own — those records are documented as `safety_sensitive` with later human safety/policy confirmation required.


## Per-record fields

slug, title, journey, topics, editorial status, approval status, provenance group(s), source-list status, `medicallyReviewed` / reviewer / `lastUpdated` where explicitly present (otherwise "not present"), review basis (body-reviewed), proposed sensitivity, Phase 30J decision, concise reason, governance gaps, next action.

No governance metadata is invented: no owner, contentVersion, grounding reviewer, reviewedDate, approvedBy, approvedAt. Existing medical-review metadata is never converted into grounding governance.

## Funnel audit

N (deduplicated verified pool) must equal safety-sensitive accepted + not_allowed + health_reviewed reconciliation + wellbeing reconciliation + low reconciliation, with each slug appearing exactly once. Cumulative accepted-future corpus before this phase (5 Tier 2 + 0 wellbeing + 21 health-reviewed = 26) is reported separately from Phase 30J counts.

## Files

Created:

- `docs/ai/article-grounding-safety-review.md` — twelve sections: Purpose; Review-pool provenance and verification; Safety-sensitive inclusion standard; not_allowed standard; Articles body-reviewed; Accepted future safety-sensitive candidates; not_allowed records; Lower-sensitivity reconciliation findings; Source-list and existing medical-review metadata; Per-record governance gaps; Confirmation no article is approved or AI-connected; Recommended next phase.

Updated:

- `docs/ai/article-grounding-review-queue.md`
- `docs/ai/content-grounding-readiness.md`
- `docs/ai/release-gate.md`
- `docs/ai/roadmap.md`
- `docs/ai/README.md`

No source file is edited, including `src/lib/grounding/articleGroundingRegistry.ts`.

## Expected end state

Registry: 206 total, 117 live / 44 draft / 45 unknown, 0 candidates, 0 approvals, `listGroundingEligibleSlugs()` = `[]`. `AI_SOURCE_ROUTING_VERSION` remains `30B-source-routing-v1`. No RAG, retrieval, embeddings, ingestion, prompt, mode, safety, endpoint, renderer, Ask, companion, schema, route or SEO changes. Start of You article grounding remains blocked.

## Validation

`npm test`, `npm run lint`, `npm run typecheck`, `npm run build`. No new tests are added for documentation classifications; `src/test/articleGrounding.test.ts` and `src/test/articleGroundingDrift.test.ts` remain authoritative. The pre-existing `src/integrations/supabase/previewAuthStorage.ts` prefer-const lint issue is left untouched and reported as out of scope if it remains the only error.

Closing deliverable: the 20-item completion report, including the 18-question close verdict. Phase 30K is not begun.
