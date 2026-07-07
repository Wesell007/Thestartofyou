## Phase 7.9 — First Year Final QA (verification run)

Static inspection is already complete (see prior report). This step runs the executable verification and produces the final QA report. No code edits planned.

### Static inspection recap

- 16 articles, all `status: "ready"`, 0 drafts.
- Every article: `intro`, 7 sections, 5–6 key takeaways, 3–5 source URLs, `medicallyReviewed: true`, `reviewedBy: "Jenny Joines"`, `lastUpdated: "July 2026"`.
- `firstYearArticleImageMap` covers all 16 slugs; each has hero (src+alt) and one body image with `afterSectionIndex: 1`, src, alt and caption. No unused imports.
- All `relatedSlugs` resolve to existing ready First Year slugs; none point to drafts or cross-hub routes.
- `FirstYearArticleCard` only shows "Coming soon" when `!isReady`; all 16 are ready, so no card shows it.
- `App.tsx` mounts `/first-year/:topic/:slug`; `FirstYearArticle.tsx` returns `NotFound` only when the slug is missing.
- No em dashes in any article copy or topic data (only in JSX comments).
- No US spellings detected.
- Safety scan clean; the single "diagnosis" mention reassures the reader they do not need one.

### Verification to execute

1. `bunx tsgo --noEmit` — already run: clean.
2. Playwright at 1280×1800 and 375×812 against: `/first-year`, all 8 topic pages, all 16 article routes, and regression routes `/family`, `/family/relationships/staying-connected-as-parents`, `/articles/complete-guide-morning-sickness`, `/articles/anxiety-in-pregnancy`, `/toddler`, `/pregnancy`, `/trying-to-conceive`, `/ivf`. Capture per-route HTTP status, NotFound detection, console errors, loaded image count, broken images, and horizontal overflow (`documentElement.scrollWidth > innerWidth`).
3. Image-duplication summary from the map (bespoke Emotional Wellbeing heroes used once each; reused body assets counted).
4. Cross-hub regression: confirm regression routes render without errors.

### Fixes

None planned. If verification reveals a verified issue, fix the smallest necessary file and report it.

### Deliverable

Single QA report covering: files inspected, files edited (expected none), article counts, per-route results for 16 articles and 8 topics, card / image mapping / related guidance / source / medical review / sensitive-content / British-English / em-dash results, desktop QA, mobile QA, horizontal-overflow, image-duplication, `tsgo` result, cross-hub regression, and a Phase 7.10 SEO go/no-go recommendation.

### Out of scope

SEO, article rewrites, new articles, route/topic structure changes, and edits to Pregnancy / TTC / IVF / Family / Toddler content unless a First-Year-caused regression is verified.