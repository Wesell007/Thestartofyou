
## Phase 13.4b — Weekly Reads Image Polish

Add a small top image to each `/my-week` weekly reads card, sourced from the article's existing hero image so the card matches what the user sees on the article page. No new images, no mapping changes, no AI/analytics/SEO changes.

### 1. Extract shared hero resolver

**New file:** `src/lib/articleHeroImage.ts`

Move the following out of `src/components/article/ArticleHeroImage.tsx`:
- All hero asset imports
- `heroImageMap` (slug → asset)
- `topicFallbackMap` (topic → asset)
- `resolveArticleHero(data: ArticleData)` (same 4-step priority: per-article hero → slug map → topic fallback → final `pregnancyJourney` fallback)

Add:
- `resolveArticleHeroBySlug(slug: string): { src: string; alt: string } | null`
  - Looks up the article via `getArticle(slug)`; returns `null` if missing, otherwise delegates to `resolveArticleHero`.

### 2. Refactor `ArticleHeroImage`

**Edit:** `src/components/article/ArticleHeroImage.tsx`

Replace the inline map and `resolveHero` with an import from `@/lib/articleHeroImage`. Rendering, alt text, credit handling, and vignette overlay unchanged.

### 3. Add image slot to weekly cards

**Edit:** `src/components/myweek/SectionWeeklyReads.tsx`

- For each card, call `resolveArticleHeroBySlug(card.slug)`.
- Restructure the card so the image sits flush to the top:

```text
<article rounded-[20px] keepsake-surface overflow-hidden>
  {hero && (
    <img
      src={hero.src}
      alt=""                        // decorative; title conveys meaning
      loading="lazy"
      className="w-full aspect-[16/9] max-h-[140px] object-cover"
    />
  )}
  <div className="px-5 py-6 flex flex-col flex-1">
    <h3>…title…</h3>
    <p>…reason…</p>
    <span>Read</span>
  </div>
</article>
```

- Keep existing border colour, hover shadow, grid (single column on mobile, 2 columns from `sm`), eyebrow, H2, sub-line, and Read CTA.
- If `hero` is `null`, render the card body with no image and no placeholder — layout stays intact.

### 4. Guardrails (not doing)

- No changes to `weeklyArticleSuggestions.ts`.
- No changes to `articleData.ts` or article routes.
- No new image assets, no Nano Banana generation.
- No SEO / sitemap / robots / AI / analytics changes.
- No touching Journey Support or pregnancy-loss surfaces.
- Section still gated to `active` pregnancy journey by its existing mount in `MyWeek.tsx`.

### 5. Image coverage note

Every mapped slug resolves to either a direct article hero (15 slugs) or an existing topical fallback (10 slugs like `nipt-in-pregnancy`, `dating-scan`, `induction-of-labour` → topic hub hero). No missing-image list to report; no generated assets needed.

### 6. Verification

- `bunx tsgo --noEmit`
- Visual pass on `/my-week` (mobile + desktop): weekly cards show topical images, no broken icons, single-card and two-card grids both look clean.
- Spot-check any article page (e.g. `/articles/nausea-in-early-pregnancy`) to confirm hero rendering is unchanged after the refactor.

### Return summary will include

- Files edited / created
- Image source used (shared `resolveArticleHeroBySlug`)
- Fallback behaviour (topic hero → final pregnancy fallback → null render if article missing)
- Missing image slugs: none (all covered by existing map + topic fallbacks)
- Mobile + desktop visual result
- `bunx tsgo --noEmit` result
- Any defects
