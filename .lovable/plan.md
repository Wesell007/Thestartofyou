# Phase 30C — Article Grounding Metadata and Approval Model

Data and governance model only. No article is connected to the AI, no ingestion, no retrieval, no embeddings. AI prompts, modes, safety rules, endpoint, source routing, answer rendering, Ask and companion UI, schema, RLS, auth, routes, SEO and sitemap all stay untouched.

## Principle

Default deny. Every Start of You article is invisible to AI unless an explicit registry entry marks it approved, and no article is marked approved in this phase.

## What gets built

### 1. Type model — `src/lib/grounding/articleGroundingTypes.ts`

Types only, no article body content anywhere in the model:

- `GroundingSensitivity`: `low | wellbeing | health_reviewed | safety_sensitive | not_allowed`
- `GroundingApprovalStatus`: `not_approved | blocked_missing_metadata | blocked_draft | blocked_review_required | candidate | approved | deprecated | archived`
- `ArticleGroundingRecord`: slug, journey, topics, sensitivity, contentVersion, owner, reviewer, reviewedDate, hasSourceList, editorialStatus, archived, deprecated, approvalStatus, approvedBy, approvedAt, approvalNotes, replacementSlug/rollbackRef. Every review or approval field is optional in the type so that "missing" is representable and must be rejected at runtime rather than assumed.

### 2. Registry — `src/lib/grounding/articleGroundingRegistry.ts`

- Explicit records derived from the existing article datasets (legacy `articleData.ts` plus the Family, First Year and Toddler datasets) and cross-checked against `articleInventory.ts` editorial status. Every entry is written with `approvalStatus` in a blocked state: `blocked_draft` for drafts/placeholders, `blocked_missing_metadata` where owner/version/reviewer/reviewed date are absent (which is all of them today), `blocked_review_required` for health or safety-sensitive topics.
- Lookup returns `undefined` for unknown slugs; the eligibility helper treats that as not approved. Explicit coverage and default deny both apply.

### 3. Eligibility helpers — `src/lib/grounding/articleGroundingEligibility.ts`

- `getGroundingRecord(slug)`
- `evaluateGroundingEligibility(slug | record)` returns `{ eligible: false, reasons: string[] }` style result listing every failed requirement.
- `isGroundingEligible(slug)` boolean wrapper.

Eligible only when: editorial status ready, not draft, not archived, not deprecated, content version present, owner present, reviewer present where sensitivity requires it, reviewed date present, source list present where sensitivity requires it, sensitivity present and not `not_allowed`, approval status `approved`, approvedBy and approvedAt present. Safety-sensitive additionally requires reviewer, source list and a fresh reviewed date. Personal user content (journal, notes, reflections, logs, media) is never representable in the registry — the record type has no field for it.

Helpers return metadata verdicts only; they never read or return article body content.

### 4. Tests — `src/test/articleGrounding*.test.ts`

Covering: no article approved by default; registry scan asserts zero `approved` entries; synthetic approved fixture flips to ineligible when each required field is removed in turn (version, owner, reviewer, reviewed date, source list, approvedBy, approvedAt); draft, archived, deprecated and `not_allowed` sensitivity all return not approved; unknown slug returns not approved; helper output contains no article body text; plus assertions that `AI_SOURCE_ROUTING_VERSION` and the existing source-routing behaviour are unchanged (the existing `aiSourceRouting`, `aiVersions` and answer-hygiene suites keep passing untouched).

### 5. Docs

- `docs/ai/content-grounding-readiness.md` — record the metadata model, statuses, sensitivity levels, default-deny rule and eligibility rules as now specified in code.
- `docs/ai/release-gate.md` — the Start of You grounding block stays; note that the metadata model now exists but no article satisfies it.
- `docs/ai/system-map.md` — add the registry as a non-AI-path module, explicitly not wired to `ai-search`.
- `docs/ai/roadmap.md` — Phase 30C closed; next gated step is per-article review and approval.
- `docs/ai/README.md` — contents and closed-phase list.

## Versioning

No version constants change. `AI_SOURCE_ROUTING_VERSION`, prompt, model, safety, context and eval dataset versions all stay as they are. The eval JSON dataset is not touched.

## Validation

`npm test`, `npm run lint`, `npm run typecheck`, `npm run build`. The known generated-file lint issue in `src/integrations/supabase/previewAuthStorage.ts` is reported as pre-existing and left alone.

## Report

The 18 requested items, ending with the Phase 30C close verdict.
