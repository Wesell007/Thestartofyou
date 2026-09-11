# Phase 33.3 — Remaining 17 Articles: Frontend Preview Implementation

Bring the remaining 17 Phase 33 drafts onto the existing frontend so they can be
reviewed visually in preview. No deployment. No human review claims.

## Authoritative reconciliation first

Rebuild the exact 17 from `docs/content/phase33-publication-register.md`
(rows 1–19 minus rows 7 and 11, already implemented), cross-checked against the
32A–32D draft documents and the human review pack. The register controls exact
titles, slugs, topics, descriptions, copy, classification and target system.
Prompt wording never overrides register slugs (e.g. `hcg-levels-explained`,
`diarrhoea-and-tummy-bugs-in-pregnancy`, `stitches-tears-and-perineal-healing`).

Expected split: Legacy 8 into `src/data/articleData.ts`; First Year 9 into
`src/data/firstYearArticleData.ts`.

## Implementation groups

Work in four internal groups, continuing without pausing:

1. Legacy pregnancy/TTC records (8) — itching, caesarean birth, gestational
   diabetes, diarrhoea and tummy bugs, leg cramps, hCG levels, sex during
   pregnancy, dizziness and faintness.
2. First Year records (9) — teething, colic, introducing solid foods, perineal
   healing, separated tummy muscles, sex and intimacy after birth, newborn
   quirks and reflexes, newborn skin, common illnesses.
3. Imagery: 51 Nano Banana assets (17 heroes + 34 body images) with
   section-anchored placement, plus QA and alt text.
4. Discovery, tests, documentation and validation.

Copy is converted, not rewritten: field mapping into the existing schemas only,
meaning preserved.

## Discovery and link migrations

- Each article gets exactly one normal category discovery entry through the
  existing mechanism: `src/data/pregnancyTopicData.ts` groups for legacy
  pregnancy topics, First Year topic pages for First Year records.
- Thumbnails come from each article's own approved hero via the existing
  `HREF_IMAGE_MAP` / First Year image resolver. No new card components.
- Apply only the Phase 32F migrations already recorded as
  `CHANGES_LINK_OR_INTENT_OWNERSHIP` (caesarean birth, teething, introducing
  solid foods, perineal healing, separated tummy muscles). Rows marked
  `NO_LINK_MIGRATION_REQUIRED` get category discovery only.
- Audit for duplicate discovery entries after wiring.

## Imagery rules

Hero plus two body images per article, each body image tied to a named section
(early/middle and middle/late) for editorial rhythm matching the Cervical mucus
benchmark. Contextual lifestyle treatment for every health/safety subject: no
wounds, incisions, exposed anatomy, graphic skin conditions, unsafe sleep or
feeding setups, no text, logos or staged expressions. Alt text describes only
what is visible, never a medical or safety claim. Rejected variants are deleted
and reported separately from approved totals.

## Governance

All 19 stay `HOLD_HUMAN_REVIEW`, human review required and not completed,
production deployment eligible NO, global Phase 33 deployment block ACTIVE.
First Year `status: "ready"` is used only as the existing renderability value.
No new status fields, flags, guards, draft routes or renderers.

## Documentation

- Create `docs/content/phase33-remaining17-frontend-report.md` with the full
  per-article record set required by the phase brief.
- Update `docs/content/phase33-publication-register.md` and the Batch 1 report
  only where cross-phase status accuracy requires it.
- Human review pack updated only to point at runtime copy locations.

## Verification

Extend `src/test/phase33Batch1ImageIntegrity.test.ts` (and a companion Phase
33.3 integrity test) to assert all 19 records, exact slugs and systems, First
Year topic paths, single discovery entries with exact destinations, and hero
plus two body images per article. Then verify all 19 direct routes, the
discovery matrix, sitemap 333 + 17 = 350 with no duplicates, responsive QA at
desktop/tablet/mobile, full test suite, typecheck twice, lint against baseline
(1 error, 10 warnings) and production build. Report actual numbers.

## Boundaries

No deployment, no new hub, navigation, renderer, template, design tokens,
database/schema/RLS/AI/grounding/journal/memory/voice changes. Saved lifecycles
remain `ttc`, `pregnancy`, `first_year`.

## Binding safeguard — review metadata (approved addition)

Repository truth confirmed: in `src/data/firstYearArticleData.ts` both
`medicallyReviewed` and `reviewedBy` are optional, and `HubArticleView` renders
the "Medically reviewed by ..." badge only when both are present. So omitting
them is truthful and still renders — no architecture blocker.

- New Phase 33 First Year records omit `medicallyReviewed` and `reviewedBy`
  (or set `medicallyReviewed: false`). No fabricated affirmative value.
- Legacy records add no `reviewedBy` and no medical-review claim.
- `status: "ready"` stays purely a renderability value.
- No renderer change to bypass governance. If any record could only render by
  asserting a false review claim, that record stops as a genuine blocker and is
  reported; unaffected records continue.
- Integrity tests assert, across all 19: zero visitor-facing review badges
  without genuine review, zero fabricated `medicallyReviewed: true`, and both
  Batch 1 pages remain consistent with the same rule.
