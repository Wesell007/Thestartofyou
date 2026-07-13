# Phase 9.4 — IVF SEO Layer

SEO-only pass on the IVF section. No UX, routing, article data, sitemap, robots, or non-IVF files touched.

## Route confirmation (from src/App.tsx)

All expected paths match live routes — no corrections needed:

- `/ivf` → `IVF`
- `/ivf-timeline` → `IVFTimeline`
- `/ivf/before-transfer` → `IVFBeforeTransfer`
- `/ivf/after-transfer` → `IVFAfterTransfer`
- `/ivf/early-pregnancy` → `IVFEarlyPregnancy`

`SeoHead` at `src/components/seo/SeoHead.tsx` is the only helper used.

## Files to edit (5)

1. `src/pages/IVF.tsx` — hub page.
2. `src/pages/IVFTimeline.tsx` — timeline tool page (has an early `<Navigate>` branch; SeoHead added inside the render branch that returns the layout).
3. `src/pages/ivf/BeforeTransfer.tsx` — 5-line wrapper.
4. `src/pages/ivf/AfterTransfer.tsx` — 5-line wrapper.
5. `src/pages/ivf/EarlyPregnancy.tsx` — 5-line wrapper.

Not edited: `ivfTopicData.ts`, `SeoHead.tsx`, `App.tsx`, all TTC / Pregnancy / Family / First Year / Toddler files, sitemap, robots.

## Implementation pattern

Per page:

1. `import SeoHead from "@/components/seo/SeoHead";`
2. Wrap the existing returned tree in a fragment if needed.
3. Insert `<SeoHead title=... description=... canonical=... />` as the first child. No `jsonLd`, default `ogType="website"`, no `ogUrl` override (falls back to canonical).

For `IVFTimeline.tsx`, SeoHead is inserted at the top of the main rendered layout (the branch that actually shows the page), so the redirect branch stays untouched.

## SEO strings

Applied verbatim from the approved list (hub, timeline, before-transfer, after-transfer, early-pregnancy), each with its self-referencing `https://thestartofyou.com/...` canonical. No JSON-LD. No publish dates, authors, or reviewer strings.

## Verification

- `bunx tsgo --noEmit`.
- Playwright at 1280×1800 and 375×812 across all 5 IVF routes, checking: 200, `document.title`, `meta[name=description]`, `link[rel=canonical]`, `og:title`, `og:description`, `og:url`, `og:type=website`, no Article JSON-LD, no console errors, no mobile overflow.
- Regression smoke: `/trying-to-conceive`, `/pregnancy`, `/pregnancy/week/12`, `/first-year`, `/toddler`, `/family`, `/articles/complete-guide-morning-sickness`, `/ask?stage=ttc&topic=ivf-next-step`, `/ask?stage=pregnancy&topic=early-symptoms`.

## Deliverable

Summary covering: files inspected, files edited, confirmed IVF route structure (no corrections), SeoHead insertion points, hub / timeline / phase-page titles and descriptions, canonical + OG strategy, JSON-LD absence, no fake dates/authors, desktop + mobile verification, tsgo result, regression result, and go/no-go for Phase 9.5 Tools SEO.
