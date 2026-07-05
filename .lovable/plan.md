## Legacy Article Standard Audit — plan (v3)

Inspection and reporting only. No code, data, template, route, SEO, calculator, product, About, AI, saved-journey or design-token changes.

### Benchmark
The screenshot set for `how-your-baby-develops-in-pregnancy`:

- Eyebrow + strong H1 + italic standfirst + meta line (medically reviewed / updated)
- Contained hero image with alt
- At a glance card + In this article TOC
- Key takeaways strip
- 6+ numbered editorial sections, some with images/callouts
- Usually normal / worth a check panel
- Common questions FAQ
- Sources and references
- Continue reading + bottom nav
- Renders through `ArticleFlagshipTemplate`

"Full premium" = renders through Flagship AND has real editorial depth in every non-image block.

### Hero-image scoring rule
Hero is a polish signal, never a depth signal.
- Strong depth + missing hero → **good but needs polish** with note: `Hero image needed to fully match screenshot standard.`
- **Thin** is reserved for weak body depth: too few sections, too little paragraph content, missing takeaways, weak structural content.

### Method
1. Read `src/data/articleData.ts` end-to-end and extract each of the 111 article objects into an audit row.
2. Compute per row: presence of `quickAnswer`, `metaDescription`, `standfirst`, `hero`, `topic`, `isCornerstone`; counts for `editorialSections`, paragraphs (incl. subsections), estimated words, `keyTakeaways`, `faq`, `sources`, `relatedSlugs`, `inThisArticle`; medical/safety inferred from slug/topic/sources.
3. Re-run the routing predicate from `src/pages/ArticlePage.tsx` to record actual template: Flagship / Deep / Legacy.
4. Cross-check `relatedSlugs` and every topic-card link across `pregnancyTopicData`, `ttcTopicData`, `ivfTopicData`, `firstYearTopicData`, `toddlerTopicData`, `familyTopicData` to find orphans, topic-page links pointing at sub-standard articles, and broken related refs.
5. Score with fixed thresholds (hero excluded from depth):
   - **Full premium**: Flagship AND ≥6 sections AND ≥5 takeaways AND ≥3 FAQs AND (≥3 sources if medical) AND standfirst. Hero present → full match; hero missing → close match + polish note.
   - **Good but needs polish**: Flagship AND ≥4 sections AND ≥3 takeaways, missing 1–2 of {standfirst, FAQs, sources}, or otherwise strong but hero missing.
   - **Thin**: <4 sections OR avg <150 words per section OR <3 takeaways OR (medical AND 0 sources) OR (question-led AND 0 FAQs). Hero absence alone never triggers this.
   - **Placeholder / weak**: no `editorialSections` or no `keyTakeaways` (Deep or Legacy template).
   - **Duplicate / merge candidate**: same primary intent as another slug.
6. Infer hub from `topic`, journey tags, slug pattern: Pregnancy / TTC / IVF / First Year / Toddler / Other.

### Delivery format — multi-response, all 111 rows guaranteed

The report is posted back in chat only (no files written). Because 111 rows exceed one response comfortably, delivery is split — no article is skipped.

- **Response 1 — Headline + Worst-first**
  - Headline numbers: total audited, split by quality bucket, split by rendered template, sub-count of "strong depth, hero missing".
  - Per-hub summary counts (Pregnancy / TTC / IVF / First Year / Toddler / Other).
  - **Worst/weakest section first**: every article scored Placeholder, Thin or Duplicate — full row, regardless of hub.
  - Hidden-issues list: orphans, topic pages linking to sub-standard articles, medical without sources, question-led without FAQs, duplicate pairs, broken `relatedSlugs`, remove-from-links list, merge/redirect list, hold-back list.
  - Explicit "continued in next response" marker with a running row counter (`Rows shown: X / 111`).

- **Response 2..N — Remaining rows, grouped by hub**
  Continues with **good but needs polish** and **full premium** rows, grouped Pregnancy → TTC → IVF → First Year → Toddler → Other. Each response opens with the running counter and closes with either "continued" or "complete".

- **Final response — Verdicts**
  - Which hubs already have enough screenshot-standard articles
  - Which do not
  - Articles that should not be treated as proper published articles yet
  - Whether weak legacy articles should be cleaned up before publishing the Family batch
  - Recommended next step: SEO metadata infrastructure · article cleanup · duplicate merge planning · Family batch publishing · other
  - Final `Rows shown: 111 / 111 — complete` confirmation.

Table columns used throughout:
title · slug · route · hub · topic · template rendered · sections · takeaways · FAQs · sources · hero · standfirst · medical? · screenshot match · quality category · recommended action · notes.

### Known starting inputs (re-verified during the pass)
- 111 article objects in `articleData.ts`.
- Field coverage: `quickAnswer` 111, `metaDescription` 111, `faq` 111, `editorialSections` 85, `keyTakeaways` 94, `sources` 94, `relatedSlugs` 95, `topic` 73, `standfirst` 92, `hero` 5, `isCornerstone` 15, `inThisArticle` 13.
- Flagship-eligible ≈ 85 (bounded by editorialSections). Remaining ~26 fall to Deep or Legacy — immediate weak-page candidates.
- Only 5 articles carry a `hero`; under the hero rule this expands the good-polish bucket, not the thin bucket.

### Out of scope
No file writes. No edits to `articleData.ts`, `articleInventory.ts`, templates, topic data, routes, `ArticlePage.tsx`, SEO helpers, calculators, product page, About page, AI, saved-journey logic, or design tokens.