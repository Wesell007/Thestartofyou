
# Phase 4.1 — Pregnancy Cornerstone Rewrite: first-trimester-complete-guide

## Scope
Upgrade the existing legacy cornerstone article `first-trimester-complete-guide` (lines 1095–1232 of `src/data/articleData.ts`) into a full Flagship article. Only that single article object is modified. Slug, route, cornerstone status and object position are preserved. No other article, file or system is touched.

## Only file edited
- `src/data/articleData.ts` (single object only)

## Rendering trigger
`ArticlePage` routes to `ArticleFlagshipTemplate` when the article has `quickAnswer`, `editorialSections.length > 0` and `keyTakeaways.length > 0`. All three will be present after this rewrite.

## Priority: Flagship-facing fields (fully written)
These drive the flagship template and are the focus of the rewrite:
- `title` → "First trimester: a complete guide"
- `metaDescription` → the recommended calm description
- `topic: "body"` (new; safest existing PregnancyTopicSlug)
- `standfirst` (new) → the recommended warm one-paragraph dek
- `quickAnswer` → rewritten (~110 words) covering the weeks-1-to-12 window, symptom spread, appointments and safety-net
- `inThisArticle` → 8 items matching the brief
- `keyTakeaways` → 6 items matching the brief
- `editorialSections` (new) → 8 sections with `id`, `heading`, `lead`, `paragraphs`, and callouts where appropriate:
  1. What the first trimester actually covers
  2. Symptoms you may notice early on
  3. What your baby is doing in these early weeks
  4. Appointments, tests and scans
  5. Eating, medicines and everyday care
  6. Emotions, anxiety and waiting
  7. When symptoms should be checked
  8. Moving towards the second trimester
- `faq` → 6 new Qs (start/end of trimester, symptoms coming and going, when to contact midwife/GP, booking appointment, first scan, not feeling excited)
- `sources` → 5 verified structured `ArticleSource` entries: NHS (weeks 1–3), NHS (antenatal appointments), NICE NG201, Tommy's (first trimester), GOV.UK (screening tests)
- `lastUpdated` → "May 2026"
- `reviewedBy` → already `"Jenny Joines"`, unchanged
- `relatedSlugs` → `early-pregnancy-symptoms-explained`, `bleeding-in-early-pregnancy`, `tests-and-scans-in-pregnancy`, `dating-scan`, `the-first-trimester-emotionally`

## Legacy-support fields (minimal, consistency-only touches)
Kept in place with only light copy consistency edits (British English, no em dashes, calm tone). No structural changes, no large rewrite:
`slug`, `isCornerstone`, `howThisFeels`, `whatHappening`, `timing`, `whatItFeelsLike`, `whatThisMeans`, `normal`, `seekSupport`, `disclaimer`, `whatYouCanDo`, `whatHappensNext`, `relatedStage`, `aiPrompts`, `captureIntro`, `trimester`, `relatedWeeks`, `journey`, `topics`, `productPromotion`.

## Field order
Existing field order is preserved. New fields inserted in the natural flagship positions used elsewhere in the file: `topic` and `standfirst` after `isCornerstone`; `editorialSections` appended after `reviewedBy` at the end of the object.

## Guardrails
- Do not edit topic data, template files, routes, calculators, SEO files, product page, About page, AI logic, saved journey logic, design tokens, `ArticleSources.tsx`, `.lovable/plan.md`, or article inventory.
- Do not touch any other article object.
- No new files, no redirects, no noindex, no Family articles published.
- Do not relink this article into topic-page card lists.

## Tone
British English, calm and premium, short paragraphs, no em dashes, no fear-based wording, no diagnosis.

## Verification
- `tsgo` clean.
- Playwright-load `/articles/first-trimester-complete-guide` and confirm:
  - Rendered via `ArticleFlagshipTemplate` (standfirst, quick answer, in-this-article, key takeaways, ≥8 editorial sections, FAQ, structured sources with `target="_blank" rel="noopener noreferrer nofollow"`, medically reviewed line).
- Spot-check `/pregnancy`, `/pregnancy/body`, `/pregnancy/health-and-safety` to confirm no topic-card links were reintroduced.

## Return summary
- File edited
- Confirmation only `first-trimester-complete-guide` was changed
- Final counts: sections, key takeaways, FAQs, sources
- Publishers used
- `reviewedBy` status (already present, unchanged)
- Whether the page renders via `ArticleFlagshipTemplate`
- `tsgo` result
- Suggested next prompt
