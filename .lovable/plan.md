# Phase 30I — Health-Reviewed Article Review

Review and classification only. No registry changes, no AI runtime changes, no Phase 30J work.

## Pool reconstruction (pre-verified)

`docs/ai/article-grounding-tier-2-review.md` confirms the Phase 30G routing: 49 metadata-routed records to Phase 30I plus 4 body-reviewed Tier 2 exclusions (`trying-to-conceive-explained`, `fertile-window`, `ovulation-signs`, `how-your-baby-develops-in-pregnancy`) = 53. Phase 30H adds `pregnancy-after-loss`, `trying-again-after-miscarriage`, `preparing-emotionally-for-birth`, `two-week-wait` = 4.

Expected pool: **57 unique slugs**. Before review, each slug is re-verified against `src/lib/grounding/articleGroundingRegistry.ts` for `editorialStatus === "live"`, `archived === false`, `deprecated === false`, and approval status not candidate/approved. Any deviation from 57 verified-live records halts the phase with a discrepancy report instead of substitution.

Excluded and untouched: the 44 draft records, the 45 unknown records, the three unknown support records, the five accepted future Tier 2 candidates, and the pre-existing Phase 30J backlog (30 provisional 30G routes, 12 later health/safety review records, 7 Phase 30H routes). Any genuine queue overlap stops the phase and is reported.

## Work

1. **Verification pass** — reconstruct the 57 slugs, deduplicate, verify against the registry, record `hasSourceList`, and capture existing `medicallyReviewed` / reviewer / `lastUpdated` metadata from the article datasets as contextual metadata only.
2. **Body review of all 57** — each record reviewed against the Phase 30I health standard, including those previously body-reviewed in 30G or 30H (earlier evidence preserved, not reused as a decision).
3. **Classification** — one documented outcome per slug: accepted future health-reviewed candidate, routed to Phase 30J, lower-sensitivity reconciliation required (low or wellbeing), or later safety adjudication required. Routine non-urgent GP/midwife signposting does not by itself trigger 30J; meaningful emergency, red-flag, safeguarding, dosing or urgent-decision content does.
4. **Funnel audit** — 57 = candidates + 30J routes + reconciliation + later adjudication, every slug appearing exactly once.
5. **Phase 30J backlog** — pre-30I backlog recorded separately from new 30I routing, then the expected 30J pool reported after slug-level deduplication. No 30J record is body-reviewed here.

## Deliverables

Create `docs/ai/article-grounding-health-review.md` with the twelve required sections (purpose; pool provenance and verification; inclusion rules; safety-sensitive escalation rules; articles body-reviewed; accepted candidates; 30J routes; lower-sensitivity findings; source-list and medical-review metadata; per-candidate governance gaps; confirmation nothing is approved or AI-connected; recommended next phase). Metadata only: no article paragraphs, quotations, takeaways or summaries.

Update `docs/ai/article-grounding-review-queue.md`, `docs/ai/content-grounding-readiness.md`, `docs/ai/release-gate.md`, `docs/ai/roadmap.md`, `docs/ai/README.md` with the Phase 30I annotation (pool, counts, gaps, 0 candidates, 0 approvals, runtime unchanged, grounding still blocked, expected 30J pool).

## Technical notes

- No edits to `src/lib/grounding/articleGroundingRegistry.ts` or any other source file. Registry stays 206 / 117 live / 44 draft / 45 unknown, 0 candidates, 0 approved.
- No governance metadata invented; `medicallyReviewed`, reviewer identity and `lastUpdated` are never converted into grounding reviewer, content owner, content version or reviewed date.
- Proposed sensitivity lives in documentation only.
- No new tests. `src/test/articleGrounding.test.ts` and `src/test/articleGroundingDrift.test.ts` remain authoritative.
- Validation: `npm test`, `npm run lint`, `npm run typecheck`, `npm run build`. The known `previewAuthStorage.ts` lint error stays untouched and is reported as pre-existing.
- Close with the required 20-item completion report. Phase 30J is not started.
