# WC-3d — BreadcrumbList Structured Data Integration

Add BreadcrumbList JSON-LD to the resolved breadcrumb families closed in WC-3c, derived from the exact same visible crumb arrays. No visible UI change. Legacy articles (ArticleHeader / FlagshipHero) stay excluded.

## Pre-implementation JSON-LD inventory (verified)

How JSON-LD works today:

- `SeoHead` accepts a single optional `jsonLd?: Record<string, unknown>` and renders one `<script type="application/ld+json">` inside `Helmet`.
- Only four files pass `jsonLd`: `src/pages/firstyear/FirstYearArticle.tsx`, `src/pages/toddler/ToddlerArticle.tsx`, `src/pages/family/FamilyArticle.tsx`, `src/pages/ArticlePage.tsx` (all Article-type objects, optionally with `citation`).
- JSON-LD emitted outside `SeoHead`: `src/components/article/ArticleFAQ.tsx` and `src/components/article/flagship/FlagshipFAQ.tsx` (FAQPage, legacy article families only — excluded from WC-3d).
- No page emits a `@graph`. No page emits more than one schema entity except legacy articles (Article via SeoHead + FAQPage via the FAQ component).

Ownership split that shapes the approach: `SeoHead` is mounted by thin route wrapper pages (e.g. `pages/pregnancy/BodyTopic.tsx`, `pages/ttc/Ovulation.tsx`, `pages/trimester/*.tsx`, `components/seo/PregnancyWeekSeo.tsx`), while the visible `BreadcrumbItem[]` arrays live one level down in the shared templates (`PregnancyTopicPage`, `TTCTopicPage`, week pages, `HubArticleView`, etc.). The crumb data is not available where `SeoHead` is called.

Classification of the 17 resolved families:

- A. No JSON-LD at all: Pregnancy topic, Pregnancy trimester, Pregnancy week, TTC topic, TTC subtopic, allowlisted TTC StagePage, IVF topic, IVF timeline, First Year phase, First Year month, First Year topic, Toddler topic, Toddler age, Family topic.
- B. One existing schema object (Article, via `SeoHead`): First Year article, Toddler article, Family article.
- C. Multiple entities / graph: none in the resolved set (only legacy articles, excluded).
- D. JSON-LD outside `SeoHead`: only legacy article FAQ components, excluded.

## Approach

1. New component `src/components/seo/BreadcrumbJsonLd.tsx` — takes `items: BreadcrumbItem[]`, calls the existing `buildBreadcrumbJsonLd(items)`, renders one `<script type="application/ld+json">` via `Helmet`. Returns `null` for an empty array.
2. In each resolved template, lift the inline crumb array into a single local `const breadcrumbItems: BreadcrumbItem[] = [...]` and pass it to both `<Breadcrumbs items={breadcrumbItems} …/>` (unchanged props otherwise) and `<BreadcrumbJsonLd items={breadcrumbItems} />`. One hierarchy source, zero duplicated labels/hrefs.
3. `StagePage` renders `BreadcrumbJsonLd` inside the same `showBreadcrumbs` allowlist condition, so non-allowlisted `/:journey/:stage` output gains nothing.
4. Week pages: each of the 42 live pages already declares its crumb array inline; each gets the same lift-and-pass treatment with its established trimester crumb. `WeekHero.tsx` (dead) is untouched.

Why not merge into `SeoHead`/`@graph`: the crumb data and `SeoHead` live in different components, and BreadcrumbList as its own top-level script is valid, standard, and keeps existing Article/FAQ schema byte-identical. So `SeoHead` is not modified, `buildBreadcrumbJsonLd` is not modified, and no `composeJsonLd` helper is created. Duplicate risk is controlled by the rule "exactly one `BreadcrumbJsonLd` per rendered route", asserted in tests and verified in the rendered DOM.

## Coverage

Enabled (schema mirrors the WC-3c visible trail exactly):

- Pregnancy topic (6), trimester (3 route pages), week (42)
- TTC topic, TTC subtopic (`Home → Trying to conceive → Parent → Current`), allowlisted StagePage (3 routes only)
- IVF topic, IVF timeline
- First Year phase, month, topic, article
- Toddler topic, age, article; Family topic, article (articles via `HubArticleView`)

Excluded: `ArticleHeader`, `FlagshipHero` and all `/articles/:slug` output (byte-identical, reconfirmed by hash); every page with no visible breadcrumb (hubs, `/`, `/journal`, `/ask`, calculators, result and account surfaces).

## Tests

New `src/lib/seo/breadcrumbJsonLd.test.tsx` plus source-level assertions extending `canonicalBreadcrumbs.test.ts`:

- resolved families emit exactly one BreadcrumbList; ordering, `position` starting at 1, names and absolute `https://thestartofyou.com` URLs match the visible items
- current page present as final `ListItem`
- Article schema still present on First Year / Toddler / Family articles alongside the BreadcrumbList; legacy FAQPage untouched
- ArticleHeader/FlagshipHero families and non-breadcrumb hubs emit no BreadcrumbList
- non-allowlisted StagePage emits none

Rendered verification across the 17 representative routes at desktop and mobile: visible crumbs present, exactly one BreadcrumbList, hierarchy parity, existing schema preserved.

## Boundaries

No visible UI change; no sitemap, robots, navbar, footer, redirect or WC-3e work; no legacy metadata population; WC-2 assets and grounding files untouched. Validation: `npm test`, lint (expect baseline 1 error / 10 warnings, 0 new), typecheck, build. Report the 49-point completion list and stop.
