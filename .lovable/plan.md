# Phase 34D — IVF final coverage refinement

Two new IVF guides, one existing stage page strengthened. Preview only, no deployment.

## Verified starting position

- Phase 34A gap register rows located and unchanged:
  - Row 8 "Fertilisation and IVF versus ICSI" — NEW_ARTICLE, decision support, before transfer, HEALTH_REVIEW_REQUIRED, destination "new article on the IVF hub", merged so fertilisation and ICSI cannot cannibalise each other.
  - Row 9 "Embryo development grading and blastocysts" — NEW_ARTICLE, informational, before transfer, HEALTH_REVIEW_REQUIRED. Deferred in 34D; historical classification untouched.
  - Row 10 "Fresh versus frozen embryo transfer" — NEW_ARTICLE, decision support, before transfer, HEALTH_REVIEW_REQUIRED, the guide owns explanation while the before-transfer stage owns sequence.
  - Row 11 "Embryo freezing and storage" — INTERNAL_LINK, LOW_RISK_GENERAL, to be covered briefly inside row 10 with an HFEA signpost.
- Grounding registry today: 229 records. Sitemap today: 354 URLs. No existing ICSI or fresh/frozen content anywhere in the article data.

## What gets built

### 1. IVF vs ICSI (`/articles/ivf-vs-icsi`)

Standalone guide owning the comparison: what IVF and ICSI each mean, exactly where ICSI changes the fertilisation step, why a clinic may discuss it, that it is not automatically better or an upgrade, limitations where evidence supports them, and questions to ask the clinic. No success-rate promises, no recommendation of a route.

Ownership boundary: definition stays with "What IVF is", chronological sequence stays with the timeline article.

### 2. Fresh vs frozen embryo transfer (`/articles/fresh-vs-frozen-embryo-transfer`)

Standalone guide owning the transfer-route comparison: what each route means, why either may be used, how timing differs, a short freezing and storage section signposting HFEA (row 11), high-level cycle differences, clinic decision factors where authoritative evidence supports them, and questions to discuss. Neither route framed as universally right; no invented or unsourced success-rate comparisons.

### 3. `/ivf/before-transfer` expansion

Strengthened in place, no new route. Adds: what the clinic is monitoring, fertilisation and early embryo development at orientation depth, why embryos develop differently, embryo selection and grading at a high level, fresh versus frozen decision context linking to the new guide, storage signposting, practical questions before transfer, and the emotional uncertainty of the wait. Kept at orientation depth, not an embryology reference.

### 4. Deferred, not built

Standalone embryo-development article — recorded DEFERRED, REASSESS AFTER BEFORE-TRANSFER EXPANSION. Clinic-questions checklist — remains a deferred product opportunity. Neither is created.

## Sources and presentation

HFEA first, then NHS, then NICE, with reputable UK professional bodies only where genuinely needed. Every URL verified live before use; year recorded only where genuinely supported. Citations render visible and plain text with zero clickable anchors, per Phase 33.4. No reviewer name, badge or structured reviewer data, per Phase 33.5.

## Discovery and links

Each new guide appears exactly once in normal discovery, added to the existing IVF hub "Understanding the treatment" section (no new section, no new hub). Contextual links: What IVF is → IVF vs ICSI; timeline → IVF vs ICSI at the fertilisation step; before transfer → fresh vs frozen; fresh vs frozen → before transfer and timeline. Actual occurrences counted and reported separately from the two discovery placements.

## Imagery

Six new assets minimum: one hero and two body images per guide. Editorial, warm, calm, realistic, UK-appropriate, no text or branding, no graphic clinical imagery. IVF vs ICSI imagery avoids implying either route is superior; fresh vs frozen avoids literal ice metaphors.

## Technical notes

- Two records added to `src/data/articleData.ts` using the existing flagship renderer; no new renderer, aliases or redirects. Slug and route collisions checked at 0.
- Two rows added to `src/data/articleInventory.ts` and two default-deny rows to `src/lib/grounding/articleGroundingRegistry.ts` (`editorialStatus: "draft"`, `approvalStatus: "blocked_draft"`, `archived: false`, `deprecated: false`). Registry 229 → 231; approvals 0, candidates 0, eligible slugs [], `AI_SOURCE_ROUTING_VERSION` unchanged at `30B-source-routing-v1`; grounding runtime changes 0.
- Before-transfer expansion edits the `before-transfer` config in `src/data/ivfTopicData.ts` plus its stage template only where new blocks are required.
- Sitemap 354 → 356, delta +2, duplicates 0.
- Review classification preserved as HEALTH_REVIEW_REQUIRED for both guides and the expansion, escalated only if safety-sensitive wording is introduced. Human reviews completed = 0.
- New `src/test/phase34dIvfRefinement.test.ts` covering record count, routes, collisions, ownership boundaries, expansion present, embryo-development article absent, discovery = 1 each with 0 duplicates, contextual links resolve, structured sources with stored URLs and 0 clickable citations, ≥3 images per guide, reviewer claims 0, JSON-LD reviewedBy 0, grounding approvals/candidates/eligibility, routing version, and saved lifecycles still exactly ttc, pregnancy, first_year.
- Documentation: `phase34d-ivf-final-coverage-refinement.md`, `phase34d-ivf-evidence-pack.md`, `phase34d-ivf-frontend-report.md`. Gap register annotated for implemented and deferred outcomes only; historical counts untouched.

## Validation

Focused 34D tests, grounding drift and approval tests, full suite, typecheck twice, lint against baseline, production build, sitemap, route and internal-link validation, then desktop, tablet and mobile QA of both guides, `/ivf/before-transfer`, `/ivf` and the contextual-link source pages.

## Boundaries

Exactly two new articles, exactly one stage expansion. No new hub, stage page, lifecycle, schema, RLS, AI, grounding-runtime, journal, memory or voice change. The global Phase 33 deployment block stays active and nothing is deployed. Closes with the final IVF coverage verdict, A or B, and no further IVF phase started.
