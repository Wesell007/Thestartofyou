# Phase 9.3 — TTC SEO Layer

SEO-only pass. No UX, routing, sitemap, robots, article data, or non-TTC files touched.

## Route confirmation (from src/App.tsx)

- `/trying-to-conceive` → `TTCHub` (live canonical hub)
- `/trying-to-conceive/legacy` → `TTC` (legacy, not canonical) — **skip**
- `/trying-to-conceive/ovulation-calculator` → `OvulationCalculator` — **out of scope (Phase 9.5)**
- 10 subtopic routes → subtopic wrappers under `src/pages/trying-to-conceive/`

`SeoHead` already exists at `src/components/seo/SeoHead.tsx` and is the only helper used.

## Files to edit (11)

1. `src/pages/TTCHub.tsx`
2. `src/pages/trying-to-conceive/AgeAndFertility.tsx`
3. `src/pages/trying-to-conceive/Conditions.tsx`
4. `src/pages/trying-to-conceive/CycleTracking.tsx`
5. `src/pages/trying-to-conceive/Fertility.tsx`
6. `src/pages/trying-to-conceive/IVFAndTreatment.tsx`
7. `src/pages/trying-to-conceive/MaleFertility.tsx`
8. `src/pages/trying-to-conceive/Ovulation.tsx`
9. `src/pages/trying-to-conceive/PreconceptionHealth.tsx`
10. `src/pages/trying-to-conceive/PregnancyTests.tsx`
11. `src/pages/trying-to-conceive/TwoWeekWait.tsx`

Not edited: `src/pages/TTC.tsx` (legacy), `src/pages/OvulationCalculator.tsx` (Phase 9.5), all non-TTC pages, `SeoHead.tsx`, `ttcTopicData.ts`, `App.tsx`, sitemap, robots.

## Implementation pattern

In each page:

1. `import SeoHead from "@/components/seo/SeoHead";`
2. Wrap the existing returned tree in a fragment if needed.
3. Insert `<SeoHead title=... description=... canonical=... />` as the first child. No `jsonLd`, default `ogType="website"`, no explicit `ogUrl` (falls back to canonical).

No visible layout changes. No JSON-LD. No dates, authors, or reviewer strings.

## SEO strings

Applied verbatim from the approved list in the request (hub + 10 topics), each with its self-referencing `https://thestartofyou.com/...` canonical. Ovulation topic canonical self-references `/trying-to-conceive/ovulation`; the `/ovulation-calculator` route is left untouched and deferred to Phase 9.5 (tool intent vs guidance intent distinction preserved).

## Verification

- `bunx tsgo --noEmit`
- Playwright at 1280×1800 and 375×812 across the hub + 10 topic routes, checking: 200 response, `document.title`, `meta[name=description]`, `link[rel=canonical]`, `og:title`, `og:description`, `og:url`, `og:type=website`, no Article JSON-LD, no console errors, no mobile overflow.
- Confirm `/ovulation-calculator` still returns 200 (no edits).
- Regression smoke: `/pregnancy`, `/pregnancy/week/12`, `/articles/complete-guide-morning-sickness`, `/first-year`, `/toddler`, `/family`, `/ivf`, `/ask?stage=ttc&topic=fertile-window`.

## Deliverable

Summary covering: files inspected, files edited, route confirmation (TTCHub vs legacy TTC), SeoHead insertion points, hub + topic titles/descriptions, ovulation vs calculator distinction, canonical + OG strategy, JSON-LD absence, no fake dates/authors, desktop + mobile verification, meta tag verification, tsgo result, regression result, and go/no-go for Phase 9.4 IVF SEO.
