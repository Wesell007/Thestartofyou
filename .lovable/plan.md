## Phase 8.7 — Toddler SEO Layer

Add per-route `SeoHead` to the Toddler hub, all 8 topic pages and all 16 article pages, mirroring the existing First Year / Family pattern. No content, data, image, layout, or route changes.

### Files to edit (10)
- `src/pages/Toddler.tsx` — hub `SeoHead`
- `src/pages/toddler/DevelopmentMilestones.tsx`
- `src/pages/toddler/BehaviourEmotions.tsx`
- `src/pages/toddler/SpeechLanguage.tsx`
- `src/pages/toddler/Sleep.tsx`
- `src/pages/toddler/FoodFeeding.tsx`
- `src/pages/toddler/PottyLearning.tsx`
- `src/pages/toddler/HealthSafety.tsx`
- `src/pages/toddler/PlayConnection.tsx`
- `src/pages/toddler/ToddlerArticle.tsx` — article `SeoHead` + Article JSON-LD

Not edited: article data, topic data, image maps, cards, layouts, routes, other hubs.

### Hub SEO (`/toddler`)
- Title: `Toddler Guide | Development, Sleep, Food, Behaviour & Safety`
- Description: `Calm, practical guidance for the toddler years, from development and speech to sleep, food, behaviour, potty learning, play and safety.`
- Canonical: `https://thestartofyou.com/toddler`
- ogType: `website` (SeoHead default)

### Topic SEO (unique title/description/canonical per topic)
Using titles/descriptions from the spec verbatim; canonicals are `https://thestartofyou.com/toddler/<slug>` for each of:
`development-milestones`, `behaviour-emotions`, `speech-language`, `sleep`, `food-feeding`, `potty-learning`, `health-safety`, `play-connection`. ogType `website`. No JSON-LD on topic pages.

### Article SEO (`/toddler/:topic/:slug`, all 16)
Edit only `src/pages/toddler/ToddlerArticle.tsx`. Wrap the existing render in a fragment that adds `SeoHead` above `ToddlerArticlePage`, mirroring `FirstYearArticle.tsx`:

```tsx
const canonical = `https://thestartofyou.com/toddler/${article.topic}/${article.slug}`;
const title = article.seoTitle || `${article.title} | The Start of You`;
const description = article.seoDescription || article.description;

const jsonLd: Record<string, unknown> = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: article.title,
  description,
  mainEntityOfPage: canonical,
  url: canonical,
  publisher: {
    "@type": "Organization",
    name: "The Start of You",
    url: "https://thestartofyou.com",
  },
};
if (article.sources && article.sources.length > 0) {
  jsonLd.citation = article.sources.map((s) => s.url);
}
```

Render: `<SeoHead title={title} description={description} canonical={canonical} ogType="article" jsonLd={jsonLd} />` then `<ToddlerArticlePage article={article} />`.

`seoTitle` / `seoDescription` already exist as optional fields on the Toddler article type, so this needs no data changes.

### JSON-LD rules
- Article schema on article pages only; none on hub or topic pages.
- No `datePublished`, `dateModified`, `author`, or `reviewedBy` in schema (no fabrication).
- `publisher` is the shared The Start of You Organization block.
- `citation` populated only from `article.sources[].url`; omitted when sources are empty.

### Canonical strategy
Absolute production URLs under `https://thestartofyou.com`. `og:url` defaults to canonical via `SeoHead`. British English, no em dashes, no keyword stuffing.

### Verification
- `bunx tsgo --noEmit`
- Playwright at 1280×1800 and 375×812 on the hub, all 8 topic routes and 6 sample article routes; assert `<title>`, `meta[name=description]`, `link[rel=canonical]`, `meta[property=og:title|og:description|og:url|og:type]`, and (on articles only) presence of a single `script[type="application/ld+json"]` whose `@type === "Article"` with correct `url`, `mainEntityOfPage`, and `citation` matching `article.sources[].url`.
- Confirm no JSON-LD Article block on hub/topic pages.
- Regression sweep (200 + no console errors): `/first-year`, `/first-year/emotional-wellbeing/when-parenthood-feels-heavy`, `/family`, `/articles/complete-guide-morning-sickness`, `/articles/anxiety-in-pregnancy`, `/pregnancy`, `/trying-to-conceive`, `/ivf`.

### Out of scope
No article copy, source, image, route, card, layout, or cross-hub edits. No sitemap or robots changes. No SEO scan trigger in this phase.

### Done criteria
All Toddler routes ship correct title / description / canonical / og:* tags; article routes additionally ship a clean Article JSON-LD with real citations only; tsgo clean; no regressions.