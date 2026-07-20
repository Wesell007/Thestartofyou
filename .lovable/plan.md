## Pregnancy Phase 10.3 QA — findings and fix plan

### What passed
- `bunx tsgo --noEmit`: clean.
- All 10 new article slugs (5 x 10.2a, 5 x 10.2b) present exactly once in `src/data/articleData.ts`.
- All 10 have `reviewedBy: "Jenny Joines"`.
- Image mappings in `PregnancyTopicPage.tsx` include all 10 new slugs with distinct dedicated assets. Eating-well / foods-to-avoid split (10.2a.1) preserved. Hospital-bag slug is the correct `hospital-bag-and-what-to-pack`.
- Diet-and-exercise and Preparing-for-baby group placements match spec, including the Phase 10.1 collapsed structure and the new "Practical safety and planning" group.
- Phase 10.2b articles are dash-clean and dated `July 2026`.
- No duplicate article objects.

### Two rule breaches to correct (small fixes only)

**1. Phase 10.2a articles carry `lastUpdated: "April 2026"` instead of the required `"July 2026"`.**
Affects: `caffeine-in-pregnancy`, `hydration-in-pregnancy`, `cravings-and-aversions-in-pregnancy`, `pelvic-floor-exercises-in-pregnancy`, `exercise-safety-by-trimester`.

**2. Phase 10.2a articles contain em dashes in prose (~80 total across the 5 articles).** Core rule is "strictly no dashes". Phase 10.2b prose is already clean, so this is scoped to those 5 articles only.

### Fix approach

Edit `src/data/articleData.ts` only, within the line range of the 5 Phase 10.2a articles (~19485–20200):

- Replace each `lastUpdated: "April 2026"` with `lastUpdated: "July 2026"` in the 5 target objects.
- Replace em dashes (U+2014) inside string values with a comma-space, or with a full stop when the dash joins two full sentences. Preserve numeric context (e.g. rewrite `2–5mg` en-dash ranges to `2 to 5mg` if any appear).
- Do a final pass grepping the 5-article range for `—` and `–` to confirm zero remain.

No other files change. No new articles, images, or structural edits. TTC, IVF, First Year, Toddler, Family, calculators, Journey, routes, sitemap, robots, redirects and SEO layers stay untouched.

### Verification after fix

- Re-grep the 5 Phase 10.2a articles for em/en dashes: expect 0.
- Re-grep the 5 for `lastUpdated: "July 2026"`: expect 5.
- Run `bunx tsgo --noEmit`.
- Return the full QA deliverable summary requested (hub/map/topic statuses, preservation checks, image QA, link QA, editorial safety, dash-rule, typecheck, safe-to-proceed to TTC 9.16).
