# Memory Gate Evidence Pack — Plan

## Goal

Create a structured, documentation-only evidence pack that can be shared with a privacy/legal reviewer and an internal product reviewer before any memory implementation begins. The pack must make it clear that this is not implementation, not legal approval, and that memory is not active, written, read or passed to AI today.

## Outcome

A new review document, `docs/ai/memory-gate-evidence-pack.md`, plus minor updates to `docs/ai/README.md` and `docs/ai/roadmap.md` to reference the pack. No source, schema, migration, RLS, edge function, route, SEO, sitemap or application file will change.

## Deliverables

1. **New file:** `docs/ai/memory-gate-evidence-pack.md`
   - Product summary of the proposed explicit saved-memory MVP.
   - What memory would enable in later phases.
   - What is explicitly excluded from the MVP and the roadmap.
   - The current blockers carried forward from Phase 29J.
   - The draft consent copy, clearly labelled as draft and awaiting review.
   - The proposed consent versioning approach.
   - The data categories involved in the MVP.
   - The technical controls already designed in 29G and 29H.
   - Deletion, pause and export expectations.
   - AI usage boundary: no silent remembering, no conversation capture, no Category F, no journal content.
   - Category F structural exclusion.
   - Journal/reflection/media exclusion.
   - Service-role over-read risk and the one-access-module mitigation.
   - Reviewer questions.
   - Sign-off checklist.
   - Clear statement that implementation remains blocked until recorded sign-off is complete.

2. **Updated file:** `docs/ai/README.md`
   - Add `memory-gate-evidence-pack.md` to the contents table.
   - Fix the accidental blank line currently splitting the contents table.
   - Keep the closed phases list unchanged unless the evidence pack needs to be referenced there.

3. **Updated file:** `docs/ai/roadmap.md`
   - Add a short note under Phase 29J confirming that the evidence pack is the review artifact supporting the gate.
   - No change to phase sequencing or status.

## Scope boundaries

- No migrations, tables, RLS, edge functions, application code, routes, SEO, sitemap or AI behaviour changes.
- No memory reads, writes or persistence.
- No changes to `src/integrations/supabase/types.ts`, `.env`, `client.ts` or `previewAuthStorage.ts`.
- No tests required unless application files or JSON datasets change, which they will not.

## Validation

- `npm run typecheck`
- `npm run build`

## Report

After completion, report back:

1. Files changed.
2. Evidence pack summary.
3. Reviewer questions included.
4. Consent copy status.
5. Sign-off checklist.
6. Docs updated.
7. Validation result.
8. Whether memory implementation remains blocked.

## Risk

Low. This is a documentation-only task. The only risk is wording that could be read as pre-approving implementation; the document will repeatedly state that implementation is blocked pending recorded sign-off.
