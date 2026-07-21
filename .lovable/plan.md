## Phase 11.5 — Launch Readiness Small Fixes

### Goal
Replace the 5 remaining `href="#"` launch-facing CTAs with real destinations so the Journal and Support pages are launch-ready.

### Files to edit

1. `src/components/product/ProductHero.tsx` — CTA "Get the journal"
2. `src/components/product/ProductInlineCTA.tsx` — CTA "Get the journal on Amazon"
3. `src/components/product/ProductFinalCTA.tsx` — CTA "Get the journal on Amazon"
4. `src/components/product/ProductWhatItIs.tsx` — CTA "Get the journal"
5. `src/components/support/SupportCapture.tsx` — CTA "Explore the journal"

### Change details

**Journal purchase CTAs (4 files)**
- Replace `href="#"` with `https://www.amazon.co.uk/dp/B0FMJTJGQR`
- Add `target="_blank"`
- Add `rel="noopener noreferrer"`
- Keep existing copy, styling, icons, and layout untouched.

**Support page CTA**
- Replace `href="#"` with `/journal`
- Keep label "Explore the journal"
- Keep existing styling and layout.

### Preserved

Page layout, copy beyond link destinations, article data, topic data, calculators, TTC Journey, auth logic, setup logic, routes, redirects, sitemap generator, robots, SEO infrastructure, images, and all unrelated files.

### Verification

- `bunx tsgo --noEmit`
- `rg 'href="#"' src` returns zero launch-facing CTA placeholders
- Confirm all four Journal CTAs point to `https://www.amazon.co.uk/dp/B0FMJTJGQR` with `target="_blank"` and `rel="noopener noreferrer"`
- Confirm `SupportCapture.tsx` "Explore the journal" points to `/journal`
- Confirm `/journal` and `/support` still render
- Confirm no route, sitemap, robots, redirect or SEO infrastructure files changed

### Deliverable

Phase 11.5 summary report and recommendation to proceed to Phase 11.6 Final Sign Off QA.