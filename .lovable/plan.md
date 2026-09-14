# Phase 33 — Move "Common illnesses in the first year" to Baby care and safety

Placement correction only. No content, imagery, review metadata, governance or deployment changes.

## What changes for a reader

The guide will be found under First Year → Baby care and safety → Related guidance, instead of Check-ups and warning signs. Its address becomes `/first-year/care-and-safety/common-illnesses-in-the-first-year`. Title, wording, pictures and review status stay exactly as they are.

## Changes

1. `src/data/firstYearArticleData.ts` — change the record's `topic` from `checkups-and-warning-signs` to `care-and-safety`. Nothing else in the record is touched (title, description, intro, sections, sources, status, review fields unchanged).
   - Discovery follows the topic automatically via `getFirstYearArticlesByTopic`, so the article leaves the Check-ups listing and joins the Baby care and safety listing with exactly one occurrence. No manual discovery rows exist for First Year, so no additions or removals elsewhere.
   - Existing `relatedSlugs` references to this slug from `newborn-quirks-and-reflexes` and `newborn-skin-spots-and-marks` stay as-is (contextual related reading, not normal discovery); they resolve by slug, so no href edits are needed.

2. `src/lib/grounding/articleGroundingRegistry.ts` — update only the `topics` array of the existing default-deny row to `["care-and-safety"]`. Row stays `editorialStatus: "draft"`, `approvalStatus: "blocked_draft"`, no approval metadata. Registry length stays 225; approvals 0; candidates 0; eligible slugs `[]`; `AI_SOURCE_ROUTING_VERSION` unchanged.

3. `src/test/phase33Remaining17Integrity.test.ts` — map the slug to `care-and-safety` in `FIRST_YEAR_SLUGS`, and add assertions that the route is `/first-year/care-and-safety/common-illnesses-in-the-first-year`, that it appears exactly once in the Baby care and safety topic listing, and zero times in the Check-ups and warning signs listing.

4. Documentation — update the topic/route cells for this article in:
   - `docs/content/phase33-remaining17-frontend-report.md` (First Year table row)
   - `docs/content/phase33-publication-register.md` (row 14 topic, route and discovery-surface cells)
   - `docs/content/phase33-human-review-pack.md` only if it names the old route (current text names the slug only; add the corrected route reference if present)

5. Sitemap — regenerate. The URL is derived from the record's topic, so the old URL disappears and the new one appears. Total stays 350 unique, 0 duplicates.

## Not changed

Images and alt text, section placements, review classification and human-review status, other articles, routes, navigation architecture, renderers, templates, database, RLS, AI runtime, grounding runtime behaviour, journal, memory, voice, saved lifecycles. No redirect architecture is added, since Phase 33 is preview-only.

## Validation

- Focused Phase 33 integrity tests plus grounding drift/approval tests
- Full test suite, typecheck, lint (baseline 1 error / 10 warnings), production build
- Sitemap regeneration with duplicate check (expect 350 unique, 0 duplicates; new route present, old route absent)
- Browser check of the journey: First Year → Baby care and safety → Related guidance → Common illnesses in the first year, confirming it opens at the new address

Governance unchanged: human review required and not completed, deployment eligible NO, production deployed NO, global Phase 33 deployment block ACTIVE. No deployment.
