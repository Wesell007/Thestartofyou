# Phase 33.3 — Finish the remaining work

Verified current repository state: all 17 remaining records are already in the
runtime datasets (Legacy 8 in `src/data/articleData.ts`, First Year 9 in
`src/data/firstYearArticleData.ts`), the 51 new images exist in `src/assets`,
the 27 First Year images are wired to named sections, the 8 Legacy hero and 16
Legacy body images are attached in their records, and the 8 Pregnancy discovery
entries are added.

What is left is the closing work.

## 1. Phase 32F approved migrations (5)

Apply only the five already-approved ownership links, in the existing
`crossLinks` / editorial link fields, nothing new invented:

- Caesarean birth — from the labour and recovery surfaces that carry caesarean
  asides.
- Teething — from the month pages that carry teething context.
- Introducing solid foods — from the weaning section of the feeding guide.
- Stitches, tears and perineal healing — from `healing-after-birth`.
- Separated tummy muscles — from `your-body-after-birth`.

Normal category discovery is not counted as a migration.

## 2. Duplicate discovery clean-up

Caesarean birth currently appears in two Pregnancy discovery lists. Reduce it to
exactly one entry, and audit all 19 for duplicates.

## 3. Integrity tests

Add a Phase 33.3 integrity test alongside the existing Batch 1 test asserting:
19 records exist with exact slugs and correct system; First Year topic paths are
right; one hero plus two body images per article with resolvable references and
factual alt text; exactly one discovery entry each with the exact destination;
the five migrations present and no others; zero `medicallyReviewed: true` and
zero reviewer names on the new records, so zero visitor-facing review badges.

## 4. Validation

Focused tests, full suite, typecheck twice, lint against the 1 error / 10
warnings baseline, production build, and the generated sitemap count with
duplicate check (expected 350 if repository output agrees).

## 5. Responsive QA

Walk every new article at desktop, tablet and mobile: hero crop, image
distribution and placement, spacing, stacking, overlap, overflow, broken images.

## 6. Documentation

Create `docs/content/phase33-remaining17-frontend-report.md` with the full
per-article record (title, slug, system, runtime file, route, topic, discovery
location and count, migration state, review classification and state, hero and
both body images with alt text and section titles, generation and rejected
attempts, approved count, QA result, deployment eligibility). Update the
publication register and Batch 1 report only for cross-phase truth, and point
the human review pack at the new runtime copy locations.

## Governance

All 19 stay `HOLD_HUMAN_REVIEW`, human reviews completed 0, deployment eligible
0, global Phase 33 deployment block ACTIVE. No deployment. No new hub,
navigation, renderer, template, tokens, database, schema, RLS, AI, grounding,
journal, memory or voice change. Saved lifecycles unchanged.
