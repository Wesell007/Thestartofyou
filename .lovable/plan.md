
# Phase 6.1 — SEO metadata for `/articles/:slug` (revised)

## Files edited
- `src/pages/ArticlePage.tsx` (only)

No edits to templates, article data, other hubs, routes, tokens, or `.lovable/plan.md`.

## Field mapping (real `ArticleData` fields)
`ArticleData` has no `seoTitle` / `seoDescription` / `description`. I will use the fields that actually exist, no data edits:
- Title: `` `${article.title} | The Start of You` ``
- Description priority: `article.metaDescription` → `article.quickAnswer` → fallback `"Calm, practical guidance from The Start of You."`

## Implementation in `ArticlePage.tsx`
1. Import `SeoHead` from `@/components/seo/SeoHead`.
2. Keep the existing NotFound branch untouched. Do not mount `SeoHead` when `getArticle` returns nothing.
3. After the article is resolved and before the template dispatch, compute:
   - `canonical = \`https://thestartofyou.com/articles/${data.slug}\``
   - `title = \`${data.title} | The Start of You\``
   - `description = data.metaDescription || data.quickAnswer || "Calm, practical guidance from The Start of You."`
4. Build Article JSON-LD:
   ```ts
   const jsonLd: Record<string, unknown> = {
     "@context": "https://schema.org",
     "@type": "Article",
     headline: data.title,
     description,
     mainEntityOfPage: canonical,
     url: canonical,
     publisher: {
       "@type": "Organization",
       name: "The Start of You",
       url: "https://thestartofyou.com",
     },
   };
   ```
5. **Citation — structured sources only (per user directive):**
   ```ts
   const citation = (data.sources ?? [])
     .map((source) => (typeof source === "string" ? null : source.url))
     .filter((url): url is string => Boolean(url));
   if (citation.length > 0) jsonLd.citation = citation;
   ```
   Plain string source labels are never emitted as `citation`. Articles whose `sources` are all strings simply omit `citation`.
6. ReviewedBy (only when present):
   ```ts
   if (data.reviewedBy) {
     jsonLd.reviewedBy = { "@type": "Person", name: data.reviewedBy };
   }
   ```
7. Date: only set `dateModified` when `data.lastUpdated` matches strict ISO `^\d{4}-\d{2}-\d{2}`. All current `lastUpdated` values are display strings ("March 2026", "May 2026"), so `dateModified` will be omitted. No dates fabricated.
8. Mount `<SeoHead>` once, immediately before the existing template dispatch. Template selection logic is unchanged:
   ```tsx
   const seo = (
     <SeoHead
       title={title}
       description={description}
       canonical={canonical}
       ogType="article"
       jsonLd={jsonLd}
     />
   );
   // og:title / og:description / og:url fall back cleanly inside SeoHead.

   if (hasFlagshipShape && !LEGACY_FORCED_SLUGS.has(data.slug)) {
     return (<>{seo}<ArticleFlagshipTemplate data={data} /></>);
   }
   if (LEGACY_FORCED_SLUGS.has(data.slug) || !hasMinimumDeepShape) {
     return (<>{seo}<ArticleLegacyPage data={data} /></>);
   }
   return (<>{seo}<ArticleDeepTemplate data={data} /></>);
   ```

## Verification
- `tsgo`.
- Playwright over `/articles/complete-guide-morning-sickness`, `/articles/first-trimester-complete-guide`, `/articles/anxiety-in-pregnancy`, one TTC-oriented slug, one IVF-oriented slug: dump `document.head` and assert `<title>`, meta description, canonical, `og:title|description|url|type=article`, one Article JSON-LD block. Assert `citation` is present **only** when structured `ArticleSource` objects supplied URLs, and absent when `sources` is missing or entirely strings. Assert no `dateModified` on any current article.
- Regression: `/family`, `/family/health-safety/making-your-home-safer`, `/pregnancy`, `/trying-to-conceive`, `/ivf` heads unchanged from Phase 5.12 baseline.

## Guardrails
No edits to article data, templates, other hubs, routes, design tokens, or `.lovable/plan.md`. No new routes. No noindex. No invented reviewers or dates. No non-URL citation values.

## Suggested next prompt
> Phase 6.2 — Add `SeoHead` to Pregnancy hub, six Pregnancy topic pages and three trimester pages using the Family topic pattern.
