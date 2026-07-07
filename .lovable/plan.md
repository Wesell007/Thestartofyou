
# Phase 5.12 — Family Hub SEO Metadata Layer

Wire per-route head metadata for `/family`, the six Family topic pages, and every `/family/:topic/:slug` article, consuming existing `seoTitle` / `seoDescription`. Sitewide `index.html` metadata stays as fallback for other routes.

## Baseline (from inspection)
- `react-helmet-async` is NOT installed. No `Helmet` usage anywhere in `src`.
- No `HelmetProvider` in `src/main.tsx` or `src/App.tsx`.
- No existing SEO helper under `src/components/seo/`.
- Project uses bun (bun.lockb present) — install with `bun add react-helmet-async`. No npm/yarn lockfile edits.
- Family route wrappers (`FamilyArticle.tsx`, six topic pages) are thin — the right place to mount `<SeoHead>`.

## Files to edit
1. `package.json` — add `react-helmet-async` via `bun add`.
2. `src/main.tsx` — wrap the app root in `<HelmetProvider>` (imported from `react-helmet-async`).
3. `src/components/seo/SeoHead.tsx` — NEW helper.
4. `src/pages/Family.tsx` — mount `<SeoHead>` with hub metadata.
5. `src/pages/family/GrowingFamilies.tsx`
6. `src/pages/family/Relationships.tsx`
7. `src/pages/family/FamilyBasics.tsx`
8. `src/pages/family/HealthSafety.tsx`
9. `src/pages/family/TravelDaysOut.tsx`
10. `src/pages/family/PlayConnection.tsx` — each mounts `<SeoHead>` with its topic title/description/canonical from the brief.
11. `src/pages/family/FamilyArticle.tsx` — mount `<SeoHead>` with article title/description/canonical, `og:type="article"`, and Article JSON-LD.

No other files touched. No new routes. No article copy edits. No design changes.

## SeoHead helper behaviour

Props: `title`, `description`, `canonical`, `ogTitle?`, `ogDescription?`, `ogType?`, `ogUrl?`, `jsonLd?`.

Rendering rules (avoids duplicate/empty tags):
- `<title>{title}</title>` and `<meta name="description" content={description}>` always render.
- `<link rel="canonical" href={canonical}>` always renders.
- `og:title` renders once, using `ogTitle ?? title` — never both.
- `og:description` renders once, using `ogDescription ?? description`.
- `og:url` renders once, using `ogUrl ?? canonical`.
- `og:type` renders once, defaulting to `website`.
- `jsonLd` renders one `<script type="application/ld+json">` only when provided.

No empty-string fallbacks; each tag emits exactly one element with a non-empty value.

## Canonical base
`https://thestartofyou.com`, no trailing slash. Routes:
- Hub: `/family`
- Topics: `/family/{topicSlug}`
- Articles: `/family/{article.topic}/{article.slug}`

## Hub metadata (`/family`)
- Title: `Family life guidance for growing families | The Start of You`
- Description: `Calm, practical guidance for family routines, relationships, safety, travel, play and growing together.`
- `og:type`: `website`.

## Topic metadata
Hardcoded per the brief (topic data has no equivalent SEO fields today):
- growing-families, relationships, family-basics, health-safety, travel-days-out, play-connection — each with the exact title + description from the brief, `og:type="website"`, canonical `https://thestartofyou.com/family/{slug}`.

## Article metadata
- Title: `article.seoTitle || \`${article.title} | The Start of You\``
- Description: `article.seoDescription || article.description`
- Canonical: `https://thestartofyou.com/family/${article.topic}/${article.slug}`
- `og:type`: `article`.

## Article JSON-LD
Built inside `FamilyArticle.tsx`:
```ts
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": article.title,
  "description": article.seoDescription || article.description,
  "mainEntityOfPage": canonical,
  "url": canonical,
  "publisher": {
    "@type": "Organization",
    "name": "The Start of You",
    "url": "https://thestartofyou.com",
  },
};
```
- `dateModified`: OMITTED. `lastUpdated` is a display string like "July 2026" (not ISO).
- `citation`: added only when `article.sources?.length` is truthy, mapped to `source.url`. Never emitted as an empty array.
- No fake author, reviewer, published date, or image fields.

## Noindex
No noindex added. Family has 0 drafts. `FamilyArticle.tsx` keeps existing NotFound behaviour when a slug does not resolve — no `<SeoHead>` mounted in that branch.

## Guardrails
No edits to Pregnancy, TTC, IVF, First Year, Toddler data or components; no touch of article copy, image maps, product, About, AI, saved-journey logic, design tokens, or `.lovable/plan.md`. Sitewide `<title>` / `<meta name="description">` / `og:*` in `index.html` stay untouched as fallback for all non-Family routes and for non-JS social crawlers.

## Verification
- `tsgo` (typecheck).
- Playwright the 10 target Family routes, dump `document.head` and confirm: title, meta description, canonical, og:title/description/url/type (each present exactly once, no empty values). Confirm Article JSON-LD present on the 3 article routes, with `citation` on `making-your-home-safer` and `managing-childcare-costs`, and NO `citation` key on `simple-family-play-ideas`.
- Regression: load `/articles/complete-guide-morning-sickness`, `/pregnancy/body`, `/first-year`, `/toddler` and confirm sitewide `index.html` metadata still shows unchanged.

## Return summary will include
Files edited; package/provider status; helper created; hub/topic/article metadata; JSON-LD summary; citation handling; `tsgo` result; per-route head verification; cross-site regression; issues; suggested next prompt.
