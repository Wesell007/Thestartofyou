# Phase 30J — Safety-Sensitive / Not-Allowed Classification

Review and classification only. No code, registry, schema, prompt, routing or runtime changes. Phase 30K is not started.

## What this phase produces

A dedicated safety adjudication of every verified-live article previously routed into the safety queue, documented as metadata-only classifications.

## Pool reconstruction (closed evidence only)

Rebuild the pool from five provenance groups, then deduplicate by slug:

- Group A — Phase 30G direct 30J routes (expected 30), from `docs/ai/article-grounding-tier-2-review.md`
- Group B — Phase 30G "later health/safety review required" (expected 12), same document
- Group C — Phase 30H direct 30J routes (7 named slugs), from `docs/ai/article-grounding-wellbeing-review.md`
- Group D — Phase 30I direct 30J routes (expected 33), from `docs/ai/article-grounding-health-review.md`
- Group E — Phase 30I later safety adjudication (`trying-again-after-miscarriage`)

Pre-dedup provenance total expected: 83. The unique pool count is whatever the slug union yields; 83 is not assumed to be the answer.

Each unique slug is then verified against `src/lib/grounding/articleGroundingRegistry.ts`, requiring `editorialStatus === "live"`, `archived === false`, `deprecated === false`, and an approval status that is neither candidate nor approved. Any unreconcilable provenance or ineligible record stops the phase and is reported as a discrepancy rather than substituted.

Excluded: draft records, unknown records, unknown support records, the 5 Tier 2 accepted-future candidates, the 21 health-reviewed accepted-future candidates, `preparing-emotionally-for-birth`, `two-week-wait`, and any record not backed by closed 30G/30H/30I routing evidence. No topic-similarity expansion.

## Review method

Every verified record receives its own Phase 30J body review; earlier routing is provenance only, never a substitute. Article datasets are read for human review; no body content, quotations, summaries, media or AI-ready text enters documentation or any runtime structure. Reasons are concise classification notes only.

Each record receives exactly one proposed outcome:

- `safety_sensitive` (accepted future safety-sensitive candidate)
- `not_allowed`
- `health_reviewed` — reconciliation required
- `wellbeing` — reconciliation required
- `low` — reconciliation required

Enhanced scrutiny applies to mental-health and crisis content (the 7 Phase 30H routes plus `pregnancy-after-loss` if present), pregnancy-loss and fertility records, medication/supplement/dosing content, and safe sleep / activity / equipment safety. De-escalation is permitted where body evidence supports it; reconciliation findings stay blocked and do not join earlier accepted-future lists. Serious subject matter alone does not justify `not_allowed`; that outcome is reserved for content whose safe meaning depends on clinical context the grounding layer cannot preserve, or whose retrieval could override professional assessment. Where the boundary is unclear, the safer outcome is documented with the uncertainty stated.

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
