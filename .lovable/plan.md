# Phase 30H — Wellbeing & Sensitive Support Review

Review and classification only. No registry edits, no approvals, no AI connection.

## Pre-verification already done

All 11 nominated records were checked against `src/lib/grounding/articleGroundingRegistry.ts` before writing this plan:

- All 11 are `editorialStatus: "live"`, `archived: false`, `deprecated: false`, `approvalStatus: "blocked_missing_metadata"`. No discrepancy, the review pool stands at 11.
- Source-list gaps confirmed present today: `two-week-wait`, `chemical-pregnancy`, `trying-again-after-miscarriage` all have `hasSourceList: false`. The other 8 have `hasSourceList: true`.
- The three support records `coping-with-the-two-week-wait`, `emotional-pressure-of-age-when-ttc`, `partner-support-when-ttc` are still `editorialStatus: "unknown"`, so they stay excluded and are recorded separately.

## What happens in this phase

1. Body-read each of the 11 articles from their existing datasets, for human classification only. No body text, quotation, section, takeaway or summary is copied anywhere.
2. Classify each against the wellbeing inclusion standard, with conservative escalation:
   - meaningful clinical/diagnostic/treatment/loss-management content routes to Phase 30I
   - meaningful crisis, urgency, safeguarding or emergency-warning content routes to Phase 30J
   - genuinely undecidable cases are recorded as "later health/safety review required"
   - special scrutiny applied to the loss/fertility set and the perinatal mental-health set as specified
3. Record one proposed sensitivity per article in the review document only.
4. Re-record current source-list status per article, flagging the three known gaps as governance gaps.
5. Record governance gaps (no owner, no content version, no grounding reviewer, no reviewed date, no approvedBy/approvedAt) for every accepted candidate. Nothing is invented.

## Files created

- `docs/ai/article-grounding-wellbeing-review.md` — the twelve required sections, with a per-article table carrying slug, title, journey, topics, editorial status, approval status, source-list status, review basis (body-reviewed), proposed sensitivity, decision, concise reason, later phase, governance gaps, next action.

## Files modified (documentation only)

- `docs/ai/article-grounding-review-queue.md`
- `docs/ai/content-grounding-readiness.md`
- `docs/ai/release-gate.md`
- `docs/ai/roadmap.md`
- `docs/ai/README.md`

Each records the Phase 30H purpose, the 11-record pool, the 3 excluded unknown records, body-reviewed count, accepted candidate count, 30I/30J/ambiguous routing counts, source-list and governance gaps, 0 candidates, 0 approvals, AI runtime unchanged, grounding still blocked.

## Explicitly not touched

`src/lib/grounding/articleGroundingRegistry.ts`, grounding helpers, `supabase/functions/**`, prompts, modes, safety rules, source routing, answer rendering, Ask, companion, schema, routes, SEO, and every AI version constant. `AI_SOURCE_ROUTING_VERSION` stays `30B-source-routing-v1`. If a genuine registry defect surfaces, the phase stops and reports it instead of fixing it.

## Tests

No new tests. `src/test/articleGrounding.test.ts` and `src/test/articleGroundingDrift.test.ts` stay authoritative and must keep proving 206 total, 117 live / 44 draft / 45 unknown, 0 candidates, 0 approved, `listGroundingEligibleSlugs() === []`.

## Validation

`npm test`, `npm run lint`, `npm run typecheck`, `npm run build`. The known `prefer-const` issue in `src/integrations/supabase/previewAuthStorage.ts` is left untouched and reported as pre-existing if it is the sole lint error.

## Output

The 20-item Phase 30H completion report, including the close verdict answering all thirteen questions. Phase 30I is not started.
