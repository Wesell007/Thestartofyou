# WC-3c — Canonical Breadcrumb Coverage & Hierarchy

Pre-implementation audit is complete. Two findings change the shape of this slice.

## Audit finding 1 — the week system

- `/pregnancy/week/:week` is owned by `src/pages/PregnancyWeekRoute.tsx`, which lazily resolves `Week1Page…Week42Page` via `import.meta.glob`. Those 42 pages are the live week experience.
- `src/components/week/WeekHero.tsx` is imported by no file in `src` (only `MyWeekHero.tsx` matches the name search, a different component). It is unreachable/dead.

Decision: canonicalise the week hierarchy inside the 42 live pages only, and record `WeekHero.tsx` in the dead-component carry-forward register without deleting it.

## Audit finding 2 — legacy article mapping gate FAILS

`/articles/:slug` renders 156 articles from `src/data/articleData.ts`.

Primary journey (first entry of `journey[]`):

- pregnancy 91, trying-to-conceive 54, postpartum 3, preparing-for-baby 3, ivf 2, first-year 2, support 1

Authoritative topic parent (`topic: PregnancyTopicSlug`) exists on 87 articles only. 69 articles have no authoritative topic field: 54 TTC, 4 pregnancy, 3 postpartum, 3 preparing-for-baby, 2 IVF, 2 first-year, 1 support.

`ttcTopicData.ts` and `ivfTopicData.ts` contain link lists, not an article-to-topic ownership model: the same article slug appears under several topics, so they cannot resolve a single canonical parent.

Result: unresolved journey/topic mappings = 69, not 0. Per the WC-3c hard gate, **ArticleHeader and FlagshipHero are NOT migrated in this slice**. They stay byte-identical and carry forward.

Smallest safe resolution (proposed for a later slice, not done here): add one additional optional authoritative field to `ArticleData` (e.g. `journeyTopic: { journey; topicSlug }`) populated per article, mirroring the existing `topic` pattern the repository already establishes. Also needs a product decision for the 9 articles whose journey is postpartum / preparing-for-baby / first-year / support, since only Pregnancy, TTC and IVF journey parents are approved.

## What WC-3c will implement

All items use `src/components/shared/Breadcrumbs.tsx`; no new abstraction, no JSON-LD, no `SeoHead` change.

Canonical hierarchies (all crumbs including the current page carry a canonical href from route/config/data, never `window.location`):

1. `PregnancyTopicPage` — new breadcrumb: Home → Pregnancy → {Topic}, `tone="section"`. Nothing else on that page touched.
2. Week pages (42 live files) — Home → Pregnancy → {Trimester} → Week N, trimester taken from each page's existing authoritative trimester data/href, replacing the current "Week by week" parent.
3. Trimester heroes (`TrimesterHero`, `FirstTriHero`, `SecondTriHero`, `ThirdTriHero`) — add Home; hierarchy Home → Pregnancy → {Trimester}. Reachability of each hero is checked; duplicates are recorded, not deleted.
4. TTC topic / subtopic — journey label becomes "Trying to conceive" (`/trying-to-conceive`), plus Home. Subtopic parent taken from `TTCPageConfig.parent`; every parent href verified to exist.
5. TTC StagePage — breadcrumbs only for the three allowlisted stage URLs confirmed in `StagePage.tsx` (`understanding-your-cycle`, `timing-and-tracking`, `waiting-and-testing`): Home → Trying to conceive → {Stage}. Generic resolver otherwise unchanged; no new App.tsx routes.
6. IVF topic — Home → IVF → {Topic}. `/ivf-timeline` gains Home → IVF → IVF timeline; timeline content/layout untouched.
7. First Year — 4 phase pages, 13 month pages, 8 topic pages: Home → First year → {Current}, from route/config values. First Year article view: Home → First year → {Topic} → {Article}.
8. Toddler topic/age and Family topic — add Home crumb, canonical labels Toddler / Family, existing stage palette, `showHomeIcon` and section tone preserved.
9. `HubArticleView` (Toddler, Family and First Year articles) — canonicalise to Home → {Hub} → {Topic} → {Article} using its existing `hubLabel/hubHref/topicLabel/topicHref/article` props, no duplicated Home crumb where the Home icon already sits on the Home crumb.

Untouched by design: `/`, journey hubs, `/journal`, `/about`, `/support`, `/privacy`, `/terms`, `/ask`, calculators and result surfaces, protected/tool/setup pages, hidden legacy and prototype surfaces, `ArticleHeader`, `FlagshipHero`, `App.tsx`, sitemap, robots, navbar, footer, WC-2 assets, grounding files.

## Technical notes

- Helper: at most one small derivation helper, only if the Home crumb plus journey-root constants would otherwise be duplicated across families (e.g. `src/lib/seo/journeyCrumbs.ts` exposing canonical journey roots). Any helper created is reported. No global registry.
- `Breadcrumbs.tsx` API is expected to stay unchanged (`tone`, `colors`, `showHomeIcon` already cover every case).
- Tests: focused hierarchy tests added for Pregnancy topic, week, trimester, TTC subtopic, allowlisted StagePage, IVF timeline, First Year phase/month/topic/article, Toddler and Family articles. Legacy-article journey-mapping tests are deferred with the article migration.
- Validation: `npm test`, `npm run lint`, `npm run typecheck`, `npm run build`; lint must stay at the 1 pre-existing `prefer-const` error and 10 `react-refresh` warnings. Desktop plus 390x844 mobile visual checks and breadcrumb link-integrity crawl (target: 0 broken links, 0 self-links).
- Completion report returns all 56 points, with the article-mapping gate reported as FAILED-BY-DATA and items 11 and 12 as deferred.
