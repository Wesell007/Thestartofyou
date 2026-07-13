## Phase 9.5 — Tools SEO

Add route-level SEO to calculator/tool pages using existing `SeoHead`. SEO-only; no logic/layout changes.

### Route confirmation (from `src/App.tsx`)
- `/due-date-calculator` → `DueDateCalculator`
- `/due-date-results` → `DueDateResults`
- `/ovulation-calculator` → `OvulationCalculator`
- `/trying-to-conceive/ovulation-calculator` → `OvulationCalculator` (duplicate route, same component)
- `/ivf-timeline` → already covered in Phase 9.4, will verify only

### Files to edit
1. `src/components/seo/SeoHead.tsx` — add optional `noindex?: boolean` prop that renders `<meta name="robots" content="noindex,follow" />` when true. Default false, no impact on existing usages.
2. `src/pages/DueDateCalculator.tsx` — insert `<SeoHead>` above `<Navbar />` with tool SEO.
3. `src/pages/DueDateResults.tsx` — insert `<SeoHead noindex>` with canonical → `/due-date-calculator`.
4. `src/pages/OvulationCalculator.tsx` — insert `<SeoHead>` at top of returned tree; remove the legacy inline `document.title` / manual meta description block so tags aren't fought over. Canonical always `https://thestartofyou.com/ovulation-calculator` (dedupes both live routes to the tool canonical).

### SEO strings (applied verbatim)
- Due date calculator — Title: `Due Date Calculator | Estimate Your Baby's Due Date`; Desc: approved copy; canonical `/due-date-calculator`.
- Due date results — Title: `Your Due Date Results | The Start of You`; canonical `/due-date-calculator`; `noindex,follow`.
- Ovulation calculator — Title: `Ovulation Calculator | Estimate Your Fertile Window`; canonical `/ovulation-calculator`.

All: `og:type=website`, OG title/desc/url derived by `SeoHead`. No JSON-LD, no fake dates/authors/reviewers.

### Duplicate `/trying-to-conceive/ovulation-calculator`
Kept live (routing unchanged this phase). Because canonical is a hard-coded absolute URL in `SeoHead`, both routes emit canonical → `/ovulation-calculator`, consolidating signals to the tool page. `/trying-to-conceive/ovulation` (guidance topic) remains untouched and separate.

### IVF timeline
Verify existing SeoHead from Phase 9.4 is present in both live branches; do not edit unless a branch is missing.

### Verification
- `bunx tsgo --noEmit`
- Playwright at 1280×1800 and 375×812 for `/due-date-calculator`, `/due-date-results?lmp=...`, `/ovulation-calculator`, `/trying-to-conceive/ovulation-calculator`, `/ivf-timeline`
- Confirm per route: title, meta description, canonical, og:title/description/url/type, robots noindex on results only, no Article JSON-LD, layout unchanged, no console/overflow.
- Regression smoke: `/trying-to-conceive`, `/trying-to-conceive/ovulation`, `/pregnancy`, `/pregnancy/week/12`, `/ivf`, `/first-year`, `/toddler`, `/family`, `/articles/complete-guide-morning-sickness`.
