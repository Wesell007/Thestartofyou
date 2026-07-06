## Plan: Remove Duplicate At a Glance Card

### Goal
Eliminate the duplicate intro/standfirst surface from hub articles. The hero already renders `article.intro`; the "At a glance" card below it repeats the same text and clutters the page.

### Change
Edit **only** `src/components/shared/HubArticleView.tsx`.

1. **Remove the "At a glance" card** — Delete the conditional block that renders when `hasSummary` is true (intro/description summary card with Sparkles icon).
2. **Simplify the parent section** — The section that previously wrapped both cards used `(hasSummary || showInThisArticle)`. Reduce this to just `showInThisArticle`, since the remaining card is the "In this article" TOC.
3. **Remove unused variables** — Delete `summaryText` and `hasSummary` declarations because they are no longer referenced.
4. **Single-card layout** — With only the "In this article" card remaining, remove the two-column grid wrapper. Render the card in a calm, centred `max-w-3xl` container so it feels intentional rather than stretched across the full page.

### What is preserved
- Hero intro text
- Read time / last updated / medically reviewed meta row
- Hero image (two-column layout when present)
- "In this article" TOC card (centred, max-w-3xl)
- Key takeaways section
- Article body, ch body body body body, section numbering, body images
- Related guidance
- Return CTA

### What is untouched
- Data files (`familyArticleData.ts`, `firstYearArticleData.ts`, `toddlerArticleData.ts`, etc.)
- Pregnancy Flagship templates
- Routes, SEO, design tokens, AI logic, saved journey logic
- `.lovable/plan.md`

### Verification steps
1. `tsgo`
2. Load four published Family article routes and confirm no "At a glance" card, hero intro still present, "In this article" present, key takeaways present, images present.
3. Load one First Year and one Toddler `HubArticleView` route — confirm they render correctly.
4. Load `/articles/complete-guide-morning-sickness` — confirm Pregnancy Flagship unaffected.
5. Mobile viewport check for horizontal overflow.