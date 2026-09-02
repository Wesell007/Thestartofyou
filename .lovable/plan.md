# WC-3 — Navigation & Information Architecture (Audit + Plan)

Read-only audit against the current codebase. No production files changed.

## 1. Route/IA inventory (current, from `src/App.tsx`)

- Public hubs: `/`, `/pregnancy`, `/trying-to-conceive` (TTCHub), `/ivf`, `/first-year`, `/toddler`, `/family`, `/journal` (Product).
- Pregnancy depth: 6 topic routes, 3 trimester routes, `/pregnancy/week/:week`, legacy `/articles/:slug`.
- TTC depth: 10 explicit subtopics, plus 3 slugs resolved by the generic `/:journey/:stage`.
- IVF depth: 3 topic routes + `/ivf-timeline`.
- First Year: 4 phase pages, 13 month pages, 8 topic pages, `/first-year/:topic/:slug`.
- Toddler: 8 topic pages, 5 age pages, `/toddler/:topic/:slug`.
- Family: 6 topic pages, `/family/:topic/:slug`.
- Utility: `/about`, `/support`, `/privacy`, `/terms`, `/ask`, `/preparing-for-baby`, calculators.
- Redirects: `/product`→`/journal`, `/postpartum`→`/first-year#recovery-topics`, 3 postpartum stage redirects, `/trying-to-conceive/ovulation-calculator`→`/ovulation-calculator`, one article slug redirect.
- Hidden/noindex: `/journal-start`, `/trying-to-conceive/legacy`, `/postpartum/legacy`, `/prototype/memory-settings`.
- Protected: `/my-week*`, `/my-journey`, `/my-first-year*`, `/my-pregnancy-chapter`, `/my-ttc-journey`, `/journey-support`, `/pregnancy-toolkit*` (9 tools), `/account*`, `/setup*`.
- Sitemap: 330 URLs; includes the 3 generic TTC stage URLs and both calculators; excludes `/ask`, all legacy/orphan and protected routes.

## 2-4. Breadcrumb coverage and architecture

Present with `aria-label="Breadcrumb"` + `<ol>`: TTC topic/subtopic, IVF topic, Toddler topic/age, Family topic, HubArticleView, ArticleHeader, FlagshipHero.
Present but inconsistent (no `aria-label`, no list semantics): `WeekHero` (div-level `<nav>`, `›` separators not hidden), `TrimesterHero`.
Absent and should exist: all First Year phase / month / topic pages, First Year articles via their template, Pregnancy topic pages (`PregnancyTopicPage`), `/ivf-timeline`, generic TTC StagePage routes.
Intentionally unnecessary: `/`, all 8 hubs, `/about`, `/support`, `/privacy`, `/terms`, `/ask`, calculators, all protected/account surfaces.

No shared breadcrumb component exists. `src/components/ui/breadcrumb.tsx` (shadcn) is unused by pages; every implementation is hand-rolled and duplicated (~10 copies) with two visual styles: parchment uppercase micro-crumb (articles) and 12.5px sentence-case crumb (topic/age pages).

Recommendation: **C — introduce one small shared component**, `src/components/shared/Breadcrumbs.tsx`, taking `items: { label, href? }[]` and an optional `tone` variant reproducing the two existing styles exactly. Migrate existing consumers to it; do not add a third visual style.

## 5. Breadcrumb hierarchy (canonical)

- Pregnancy topic: Home → Pregnancy → {Topic}
- Trimester: Home → Pregnancy → {First/Second/Third} trimester
- Week: Home → Pregnancy → {Trimester} → Week N
- Legacy article: Home → Pregnancy → {Topic} → {Article}
- TTC: Home → Trying to conceive → {Subtopic}
- IVF: Home → IVF → {Topic}; `/ivf-timeline`: Home → IVF → IVF timeline
- First Year: Home → First year → {Phase|Month|Topic}; article adds → {Article}
- Toddler: Home → Toddler → {Topic|Age}; article adds → {Article}
- Family: Home → Family → {Topic} → {Article}

Article parents come from the existing typed datasets (`familyArticles`, First Year/Toddler topic data, `articleData` topic fields), not pathname parsing.

## 6-9. Structured data

`SeoHead` already accepts a single `jsonLd` object; no `BreadcrumbList` exists anywhere today (confirmed). Plan: derive both the visible crumbs and the JSON-LD from one `items` array via a helper `buildBreadcrumbJsonLd(items)` producing absolute `https://thestartofyou.com/...` URLs with `position` starting at 1 and the current page as the last item. Only pages that get visible breadcrumbs get JSON-LD. Where a page already passes `jsonLd` (FAQ/Article schema), merge into an `@graph` so only one script is emitted.

## 10-15. Orphans and generic routes

- `/journal-start` (`JournalStart`): zero inbound links, noindex, not in sitemap, unique onboarding content. → **B, retain hidden/noindex** (entry point for the journal flow; revisit in WC-4).
- `/trying-to-conceive/legacy` (`TTC`): zero inbound links, noindex, superseded by TTCHub. → **C, redirect to `/trying-to-conceive`** (implementation deferred to the WC-3 slice).
- `/postpartum/legacy` (`Postpartum`): zero inbound links, noindex, retained for the First Year rebuild. → **B, retain hidden/noindex**, flagged for removal once First Year recovery content is final.
- Newly discovered: `/prototype/memory-settings` (intentional, noindex) and `/preparing-for-baby` (indexed, linked from data/CTAs only, no hub placement) — retain and surface `/preparing-for-baby` from the Pregnancy hub's Preparing topic.
- Three TTC StagePage routes still resolve via `/:journey/:stage`, are in the sitemap and carry an explicit SEO allowlist in `StagePage.tsx`. They are intentional canonical pages but have no breadcrumb and no visible parent. → **Retain the generic resolver**; add breadcrumbs (Home → Trying to conceive → {Stage}) inside `StagePage` for allowlisted routes only.

## 16-20. Discoverability

`/ask`: linked from navbar (desktop + mobile), footer Resources, many in-content AskLinks and the companion surface; NOT linked from the homepage; not in the sitemap. Recommendation: **E — combination (keep nav + footer, add one quiet homepage discovery line)** inside an existing homepage section, plus add `/ask` to the sitemap in the WC-3 slice. No new section, no tools grid.

Public tools: `/due-date-calculator` well surfaced (hero, navbar CTA, footer, hubs); `/ovulation-calculator` surfaced from TTC hub/pathways and footer but absent from the homepage — acceptable, keep journey-contextual. `/due-date-results` is a result surface, not a destination.

Protected tools: `/pregnancy-toolkit` and its 9 tools are reachable only from signed-in surfaces; TTC and First Year tools likewise. Correct — do not promote to signed-out users. No change.

Homepage recommendation: no tools grid. Only one companion discovery line and keep Guidance → keepsake → companion order intact.

## 21-24. Navigation, footer, mobile

Navbar covers TTC, Pregnancy, First year, Toddler, Family, Journal + Ask + CTA. IVF is intentionally excluded and reachable from TTC/IVF content — retain, but ensure the TTC hub links IVF prominently. Labels are consistent; signed-in swaps the CTA for a lifecycle-aware account link. No structural nav change recommended.

Footer: all 14 links resolve; groupings (Journey / Resources / About) are sound; IVF is present in Journey. Gap: no `/first-year`-adjacent recovery link and no `/preparing-for-baby`; both optional. No orphan/legacy route is surfaced. Recommend leaving the footer unchanged.

Mobile (390x844): existing crumbs already use `flex-wrap`, so they wrap rather than overflow; the shared component must keep `flex-wrap`, min 44px tap targets via vertical padding, and truncate only the final (current-page) label with `line-clamp-1` on very long article titles. Shallow pages keep no breadcrumb, avoiding noise.

## 25. Accessibility contract

`<nav aria-label="Breadcrumb">` → `<ol>` → `<li>`; links are React Router `Link`s; current page rendered as `<span aria-current="page">` and never self-linked; separators are `<li aria-hidden="true">` or CSS; focus uses existing focus styles only (no WC-7 work).

## 26-28. Implementation slices

Files likely to change: new `src/components/shared/Breadcrumbs.tsx` + `src/lib/seo/breadcrumbs.ts`; the ~10 existing breadcrumb consumers; First Year phase/month/topic/article templates; `PregnancyTopicPage`, `IVFTimeline`, `StagePage`; `App.tsx` (one legacy redirect); `scripts/generate-sitemap.ts` (`/ask`); one homepage section component.

1. **WC-3a** — shared `Breadcrumbs` component + JSON-LD helper + unit tests. No page changes.
2. **WC-3b** — migrate existing 10 consumers to the shared component (visual parity, accessibility fixes for WeekHero/TrimesterHero).
3. **WC-3c** — add breadcrumbs where absent: First Year phase/month/topic/article, Pregnancy topic pages, `/ivf-timeline`, allowlisted StagePage routes.
4. **WC-3d** — wire BreadcrumbList JSON-LD through `SeoHead` for every breadcrumbed route, merging with existing schema.
5. **WC-3e** — IA fixes: `/trying-to-conceive/legacy` → `/trying-to-conceive` redirect, homepage Ask discovery line, `/ask` added to the sitemap, `/preparing-for-baby` surfaced from the Pregnancy hub.

## 29-35. Risk and confirmations

Visual risk: low — parity migration, existing tokens only; no Nano Banana/design direction needed. Regression risk: medium-low, concentrated in slice b (10 templates) and slice d (duplicate JSON-LD); mitigated by per-slice tests, typecheck, build and a single-script assertion. WC-2 carry-forward items untouched and preserved as backlog. Grounding untouched: `AI_SOURCE_ROUTING_VERSION = 30B-source-routing-v1`, 0 candidates, 0 approvals, `listGroundingEligibleSlugs() = []`, Phase 30K parked at Stage 2. No companion/WC-4 work included. Recommended order: a → b → c → d → e.
