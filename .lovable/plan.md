# Phase 9.8 — Sitemap and Robots

Add a generated `sitemap.xml` covering every public canonical route and add a `Sitemap:` directive to `robots.txt`. No page, SEO, data, route, or auth changes.

## Files to create / edit
- **Create** `scripts/generate-sitemap.ts` — generator (regex-extracts slugs from data files so it needs no Vite path-alias resolution under `bunx tsx`).
- **Edit** `package.json` — add `predev` and `prebuild` hooks: `bunx tsx scripts/generate-sitemap.ts`.
- **Edit** `public/robots.txt` — append `Sitemap: https://thestartofyou.com/sitemap.xml`, preserve existing per-bot Allow blocks.
- `public/sitemap.xml` — written by the generator.

## Included route groups
- Core (5): `/`, `/about`, `/support`, `/product`, `/preparing-for-baby`
- Pregnancy (52): `/pregnancy` + 6 topic pages + 3 trimester pages + weeks 1–42
- TTC (11): `/trying-to-conceive` + 10 topic pages
- IVF (4): `/ivf`, `/ivf/before-transfer`, `/ivf/after-transfer`, `/ivf/early-pregnancy`
- Tools (3): `/due-date-calculator`, `/ovulation-calculator`, `/ivf-timeline` (single canonical mount)
- Family (7 + N ready articles from `familyArticleData.ts`, `status === "ready"`)
- First Year (13 + 16 ready articles)
- Toddler (14 + 16 ready articles) — includes 5 age guides confirmed mounted in `App.tsx`
- Legacy articles (111): every slug from `articleData.ts`

## Excluded
`/auth`, `/setup`, `/my-week`, `/my-week/:week`, `/my-journey`, `/due-date-results` (noindex), `/trying-to-conceive/legacy`, `/trying-to-conceive/ovulation-calculator` (duplicate canonical), `/postpartum` (redirect), `/postpartum/legacy`, `/ask`, `/family/community-support` (not mounted), `/:journey/:stage` wildcard `StagePage` (unsafe to enumerate — flagged for Phase 9.9), `*` catch-all.

## Generator design
- `BASE_URL = "https://thestartofyou.com"`
- Regex-extracts slugs from `src/data/articleData.ts` and `slug + topic + status` from the three hub article files.
- Filters `status === "ready"` for hub articles.
- Emits `<loc>` only. No fake `<lastmod>`, `<changefreq>`, or `<priority>`.
- Dedupes before writing (guards against `/ivf-timeline` duplication).
- Rejects any entry containing `?` or not starting with `/`.
- Order: core → pregnancy → TTC → IVF → tools → family → first-year → toddler → legacy.

## `robots.txt` change
Keep the existing per-bot `Allow: /` blocks verbatim. Append one line:
```
Sitemap: https://thestartofyou.com/sitemap.xml
```

## `package.json` change
Add to `scripts`:
```
"predev":   "bunx tsx scripts/generate-sitemap.ts",
"prebuild": "bunx tsx scripts/generate-sitemap.ts"
```

## Verification (post-build)
1. `bunx tsgo --noEmit`
2. `bunx tsx scripts/generate-sitemap.ts` — inspect entry count and per-group counts logged
3. Parse `public/sitemap.xml` (well-formed check via Node) and assert:
   - All 111 `/articles/:slug` present
   - Weeks `/pregnancy/week/1` … `/pregnancy/week/42` all present
   - `/ovulation-calculator`, `/ivf-timeline`, `/due-date-calculator` present; `/trying-to-conceive/ovulation` present
   - `/trying-to-conceive/ovulation-calculator`, `/due-date-results`, `/auth`, `/setup`, `/my-week`, `/my-journey`, `/trying-to-conceive/legacy`, `/postpartum`, `/family/community-support`, `/ask` absent
   - No duplicate `<loc>`, no `?`, all URLs absolute
4. Playwright smoke on representative URLs: `/`, `/pregnancy`, `/pregnancy/week/12`, `/trying-to-conceive`, `/trying-to-conceive/ovulation`, `/ovulation-calculator`, `/ivf`, `/ivf-timeline`, `/family`, `/first-year`, `/toddler`, `/articles/complete-guide-morning-sickness` → all 200.
5. Confirm `/sitemap.xml` served publicly and `robots.txt` contains the Sitemap directive.

## StagePage decision
`/:journey/:stage` remains excluded. It needs a route-aware canonical/redirect plan in Phase 9.9 before enumeration.

## Safe-to-proceed
On completion, safe to proceed to **Phase 9.9 Canonical and Redirect Planning**.
