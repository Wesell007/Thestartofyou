## Phase 4.3 — Rewrite `third-trimester-complete-guide` to Flagship standard

### Scope
Edit only the existing `third-trimester-complete-guide` article object in `src/data/articleData.ts` (lines 2356–2432). No other files, no slug change, no move.

### Field changes on the object

**Updated in place:**
- `title` → `"Third trimester: a complete guide"`
- `metaDescription` → new calm/practical wording per spec
- `quickAnswer` → new ~110-word version covering week 28 to birth, movements, common symptoms, more frequent appointments, birth prep, and warning signs
- `lastUpdated` → `"May 2026"`
- `reviewedBy` → keep `"Jenny Joines"` (already present)
- `topic` → add `"body"` (currently missing)

**Legacy fields kept intact (with only light copy touch-ups where needed for consistency):** `howThisFeels`, `whatHappening`, `timing`, `whatItFeelsLike`, `whatThisMeans`, `normal`, `seekSupport`, `disclaimer`, `whatYouCanDo`, `whatHappensNext`, `relatedStage`, `aiPrompts`, `captureIntro`, `trimester`, `journey`, `topics`, `isCornerstone`, `productPromotion`.

**Flagship fields added/replaced:**
- `standfirst` (new) — warm one-paragraph per spec
- `inThisArticle` — 8 items: What the third trimester covers · Symptoms and body changes · Your baby's growth and movements · Appointments and checks · Preparing for birth · Emotions and waiting · When to ask for help · What happens as labour gets closer
- `keyTakeaways` — 6 items per spec
- `editorialSections` (new) — 8 sections with `id`, `heading`, `lead`, `paragraphs`, plus `callout` where useful. Ids: `what-the-third-trimester-covers`, `symptoms-and-body-changes`, `baby-growth-and-movements`, `appointments-and-checks`, `preparing-for-birth`, `emotions-and-waiting`, `when-symptoms-should-be-checked`, `what-happens-as-labour-gets-closer`
- `faq` — 8 questions per spec (start/end, movements near end, Braxton Hicks, when to call, late-pregnancy appointments, hospital bag, anxiety, going overdue)
- `sources` — structured `{ label, publisher, url }` array of 5 verified UK sources:
  - NHS — You and your baby at 28 to 40+ weeks pregnant
  - NHS — Your antenatal appointments
  - RCOG — Your baby's movements in pregnancy (patient info)
  - Tommy's — Signs of labour
  - NICE — Antenatal care (NG201)
- `relatedSlugs` — `reduced-movements-in-pregnancy`, `the-36-week-appointment`, `signs-of-labour`, `braxton-hicks-contractions`, `birth-preferences` (kept per spec; these are referenced only from this article's related list, no topic-card relinking)

### Tone
British English, no em dashes, no American spelling, short paragraphs, calm and practical, no diagnosis, no fear-based wording, careful movement wording ("if movements slow down, feel different, or you are worried, contact your maternity unit or midwife straight away" — never "babies move less at the end").

### Rendering
Flagship template triggers on `quickAnswer` + non-empty `editorialSections` + non-empty `keyTakeaways` — all three will be set.

### Guardrails
- Only `src/data/articleData.ts` edited.
- Only the `third-trimester-complete-guide` object mutated. No other articles, no reordering.
- No templates, routes, SEO, topic-data, calculators, product, About, AI, saved-journey, or design-token changes.
- No topic-page relinking (`pregnancyTopicData.ts` untouched).
- No new files, redirects or noindex.

### Verification
1. `tsgo` — must be clean.
2. Playwright load `/articles/third-trimester-complete-guide`:
   - Renders via `ArticleFlagshipTemplate` (hero + summary row + key takeaways strip + 8 editorial sections + FAQ + sources).
   - "Medically reviewed by Jenny Joines" appears once in hero trust bar (summary-row duplicate already removed in Phase 4.1 fix).
   - 8 editorial H2s, 6 key takeaways, 8 FAQs, 5 sources with external links.
3. Spot check `/pregnancy`, `/pregnancy/body`, `/pregnancy/health-and-safety` — no topic-card links reintroduced.

### Return summary will include
File edited, single-object confirmation, section/takeaway/FAQ/source counts, publishers used, reviewedBy status, Flagship render confirmation, single-badge confirmation, `tsgo` result, and suggested next prompt.
