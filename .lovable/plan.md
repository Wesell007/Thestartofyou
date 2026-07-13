
# Phase 9.6 — Other Public Pages SEO

SEO-only. No UX, layout, routes, article data, calculator, sitemap, robots, or TTC journey changes.

## Files inspected

- `src/App.tsx` — confirmed live public routes
- `src/components/seo/SeoHead.tsx` — existing shared helper (reuse, no second helper)
- `src/pages/Index.tsx`, `About.tsx`, `Product.tsx`, `Support.tsx`, `PreparingForBaby.tsx`, `StagePage.tsx`

## Confirmed public route structure

- `/` → `Index`
- `/about` → `About` (already imports `SeoHead`? — About.tsx currently has none, will add)
- `/product` → `Product` (no `/journal` route exists, so use `/product` strings)
- `/support` → `Support`
- `/preparing-for-baby` → `PreparingForBaby`
- `/:journey/:stage` → `StagePage` — generic dynamic wrapper matching any two-segment path

## Files to edit

1. `src/pages/Index.tsx` — add `SeoHead`
2. `src/pages/About.tsx` — add `SeoHead`
3. `src/pages/Product.tsx` — add `SeoHead`
4. `src/pages/Support.tsx` — add `SeoHead`
5. `src/pages/PreparingForBaby.tsx` — add `SeoHead`

## Files skipped

- `src/pages/StagePage.tsx` — mounted at wildcard `/:journey/:stage`. A single hard-coded `SeoHead` here would ship identical title/description/canonical for every dynamic path, causing duplicate metadata across many URLs. Skipped in this phase; flagged as needing a separate route-aware SEO plan (derive title/description/canonical from `useParams()` + stage data lookup) in a follow-up.

## Approved SEO strings (per page)

**Homepage `/`**
- Title: `The Start of You | Calm Guidance for Pregnancy and Parenthood`
- Description: `A calm companion for trying to conceive, pregnancy, baby's first year, toddlerhood and family life, with practical guidance and gentle support.`
- Canonical: `https://thestartofyou.com/`

**About `/about`**
- Title: `About The Start of You | Calm Support for Parenthood`
- Description: `Learn about The Start of You, a calm digital companion for pregnancy, parenting, family life and the questions that come with each stage.`
- Canonical: `https://thestartofyou.com/about`

**Product `/product`** (no `/journal` route exists)
- Title: `The Start of You Journal | Save Your Parenthood Journey`
- Description: `A gentle place to save questions, notes, memories and guidance from pregnancy, baby's first year, toddlerhood and family life.`
- Canonical: `https://thestartofyou.com/product`

**Support `/support`**
- Title: `Support | The Start of You`
- Description: `Find support, guidance and ways to get help with The Start of You, from account questions to using the site during your parenting journey.`
- Canonical: `https://thestartofyou.com/support`

**Preparing for Baby `/preparing-for-baby`**
- Title: `Preparing for Baby | Birth, Home and Newborn Planning`
- Description: `Practical guidance for preparing for birth, setting up your home, packing a hospital bag and getting ready for your baby's arrival.`
- Canonical: `https://thestartofyou.com/preparing-for-baby`

## Implementation pattern

For each of the five pages:

- Import `SeoHead` from `@/components/seo/SeoHead`.
- Add `<SeoHead title="…" description="…" canonical="…" />` as the first child inside the page's top-level wrapper (matches the existing pattern in `Family.tsx`, `IVF.tsx`, `FirstYear.tsx`).
- No layout, copy, or component changes.
- No JSON-LD.
- No `noindex`.
- Rely on `SeoHead` defaults for `ogType="website"`, `ogTitle`, `ogDescription`, `ogUrl` — matches phase spec (og:* auto-derived from title/description/canonical).

## Canonical & OG strategy

- Canonical base: `https://thestartofyou.com` (no trailing slash except homepage).
- `og:url` self-references each canonical (SeoHead default).
- `og:type` defaults to `website` (SeoHead default).
- No `og:image` set per-route — sitewide fallback in `index.html` remains authoritative.

## Guardrails

- No Article JSON-LD.
- No fake dates, authors, or reviewers.
- British English, no em dashes, calm parent-first wording (all provided strings comply).
- No sitemap/robots edits.
- No changes to Pregnancy, TTC, IVF, Family, First Year, Toddler SEO already in place.

## Verification

- `bunx tsgo --noEmit`
- Playwright at 1280×1800 and 375×812 on `/`, `/about`, `/product`, `/support`, `/preparing-for-baby`:
  - Check `document.title`, `meta[name=description]`, `link[rel=canonical]`, `meta[property=og:title|og:description|og:url|og:type]`
  - Assert no `script[type="application/ld+json"]` of `@type: Article` added
  - Screenshot to confirm layout unchanged
  - Console error check
- Regression sweep (visual + title check only): `/pregnancy`, `/pregnancy/week/12`, `/trying-to-conceive`, `/ovulation-calculator?lmp=2026-06-16&cycle=28`, `/ivf`, `/first-year`, `/toddler`, `/family`, `/articles/complete-guide-morning-sickness`.

## Deliverable summary (returned after build)

Files inspected, files edited, per-page SEO strings applied, StagePage skip rationale, canonical/OG strategy, JSON-LD absence confirmed, no fake dates/authors, desktop + mobile verification, meta assertions, tsgo result, regression result, safe-to-proceed verdict for Phase 9.7 Legacy `/articles/*` audit.
