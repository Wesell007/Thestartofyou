## Phase 4.2 — Rewrite `second-trimester-complete-guide` to Flagship standard

### Scope
Edit only the existing `second-trimester-complete-guide` article object in `src/data/articleData.ts` (lines 2116–2192). No other files, no slug change, no move.

### What changes on the article object

**Fields updated in place (existing legacy fields kept but refreshed where needed):**
- `title` → `"Second trimester: a complete guide"`
- `metaDescription` → new calm/practical version per spec
- `quickAnswer` → new ~110 word version covering week 13–27, symptom shift, 20-week scan, movement, warning signs
- `lastUpdated` → `"May 2026"`
- `reviewedBy` → confirm `"Jenny Joines"` (already present, keep)
- `topic` → add `"body"` (missing today)

**Legacy fields kept intact:** `howThisFeels`, `whatHappening`, `timing`, `whatItFeelsLike`, `whatThisMeans`, `normal`, `seekSupport`, `disclaimer`, `whatYouCanDo`, `whatHappensNext`, `relatedStage`, `aiPrompts`, `captureIntro`, `trimester`, `journey`, `topics`, `isCornerstone`, `productPromotion`. Light copy tweaks only where wording is inconsistent with the new Flagship copy; no restructuring.

**Flagship fields added/replaced:**
- `standfirst` (new) — warm one paragraph per spec
- `inThisArticle` — replaced with 8 items:
  1. What the second trimester covers
  2. Symptoms and body changes
  3. Your baby's growth and movement
  4. Appointments, tests and scans
  5. Looking after your body
  6. Emotions and relationships
  7. When to ask for help
  8. Getting ready for the third trimester
- `keyTakeaways` — replaced with 6 items per spec
- `editorialSections` (new) — 8 sections, each with `id`, `heading`, `lead`, `paragraphs`, and `callout` where useful, mirroring the first-trimester shape. Section ids:
  `what-the-second-trimester-covers`, `symptoms-and-body-changes`, `baby-growth-and-movement`, `appointments-tests-and-scans`, `looking-after-your-body`, `emotions-and-relationships`, `when-symptoms-should-be-checked`, `moving-towards-the-third-trimester`
- `faq` — replaced with 7 questions per spec (when it starts/ends, always easier?, first movement, 20-week scan, back/pelvic pain, when to contact midwife, anxiety)
- `sources` — replaced with structured `{ label, publisher, url }` array of 5 verified UK sources:
  - NHS — Second trimester week-by-week (13 to 27 weeks)
  - NHS — Your antenatal appointments
  - NICE — Antenatal care (NG201)
  - Tommy's — Baby's movements in pregnancy
  - GOV.UK — Fetal anomaly screening programme (20-week scan) handbook
- `relatedSlugs` (new) — `20-week-anomaly-scan`, `baby-movement-in-pregnancy`, `round-ligament-pain`, `heartburn-in-pregnancy`, `tests-and-scans-in-pregnancy`

### Tone
British English, no em dashes, no American spelling, calm/practical, short paragraphs, no diagnosis, no fear-based wording, careful movement wording (encourage contacting maternity unit if worried, no fear).

### Rendering
Flagship template triggers when `quickAnswer` + non-empty `editorialSections` + non-empty `keyTakeaways` are all present — all three will be set.

### Guardrails
- Only `src/data/articleData.ts` edited.
- Only the `second-trimester-complete-guide` object mutated. No other article objects, no reordering.
- No template, route, SEO, topic-data, calculator, product, About, AI, saved-journey, or design-token changes.
- No topic-page relinking (`pregnancyTopicData.ts` untouched).
- No new files, no redirects, no noindex.

### Verification
1. `tsgo` — must be clean.
2. Playwright load `/articles/second-trimester-complete-guide`:
   - Renders via `ArticleFlagshipTemplate` (hero + summary row + key takeaways strip + editorial sections + FAQ + sources).
   - "Medically reviewed by Jenny Joines" appears once in hero trust bar (badge already removed from summary row in Phase 4.1 fix).
   - 8 editorial section H2s render, 6 key takeaways, 7 FAQs, 5 sources with external links.
3. Spot check `/pregnancy`, `/pregnancy/body`, `/pregnancy/health-and-safety` — confirm no topic-card links reintroduced.

### Return summary will include
File edited, confirmation only the target object changed, final section/takeaway/FAQ/source counts, publishers used, reviewedBy status, Flagship render confirmation, single-badge confirmation, `tsgo` result, suggested next prompt (Phase 4.3 — `third-trimester-complete-guide`).
