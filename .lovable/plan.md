## Phase 11.8a.2 — First Year Month Guide Premium Visual Upgrade

Make the four live month guides (Newborn, 1m, 2m, 3m) feel premium, image-rich and editorial. No new routes, no 4–12m pages, no content rewrites.

### Files to edit
- `src/data/firstYearMonthData.ts` — extend `MonthGuide` with an `images` field and add hero/baby/parent image references + short captions for the 4 months.
- `src/components/firstyear/month/FirstYearMonthPage.tsx` — restructure sections into an image-led editorial layout.
- `src/pages/firstyear/MonthPage.tsx` — only if needed for image import wiring (not expected).

### Assets to create (12 total)
Generate JPGs in `src/assets/first-year/months/` matching the Start of You visual system (soft natural light, warm cream/sage/rose, editorial calm, safe framing):

- Newborn: `first-year-newborn-hero.jpg`, `first-year-newborn-baby.jpg`, `first-year-newborn-parent.jpg`
- 1 month: `first-year-1-month-hero.jpg`, `first-year-1-month-baby.jpg`, `first-year-1-month-parent.jpg`
- 2 months: `first-year-2-month-hero.jpg`, `first-year-2-month-baby.jpg`, `first-year-2-month-parent.jpg`
- 3 months: `first-year-3-month-hero.jpg`, `first-year-3-month-baby.jpg`, `first-year-3-month-parent.jpg`

Each image follows the direction described in the brief (hero = intimate age-appropriate moment, baby = development detail, parent = quiet care/recovery moment). No unsafe sleep, no fear or clinical imagery, no fake text, no brand names.

### Data model changes
Extend `MonthGuide`:

```text
images: {
  hero:   { src, alt }
  baby:   { src, alt, caption? }
  parent: { src, alt, caption? }
}
```

Add short (≤10 word) UK-English captions with no dashes and no milestone pressure. No other content rewrites.

### Component changes (`FirstYearMonthPage.tsx`)

New section rhythm (order preserved from 11.8a.1):

1. **Hero — split editorial**
   - Left: overline, age label, serif title, standfirst, phase pill, back to hub, prev/next rail.
   - Right: large rounded hero image with soft shadow, hairline border, small floating age badge.
   - Mobile: image stacks below text, tight spacing so the first screen stays sane.

2. **The short version** — premium panel, soft gradient background, stronger row labels, dot markers, generous spacing. Still 5 rows.

3. **Story image band** ("The feel of this month") — two side-by-side rounded image cards on desktop (baby + parent) with their captions, stacked on mobile.

4. **What your baby may be doing** — main editorial section: serif h2, intro, subsections with serif h3s, hairline dividers, `max-w-3xl`, generous line height.

5. **Feeding this month** — soft firstyear-tinted feature panel, left accent stripe, richer padding, calm point rows, distinct "When to ask" mini callout.

6. **Sleep this month** — soft recovery-tinted feature panel with the same treatment plus a clear-but-calm safe sleep callout.

7. **You this month** — warmer parent-focused editorial panel, serif h2, subsections with breathing room.

8. **What often feels hard** and **What can help** — two larger cards, gradient background, elegant numbered markers, subtle shadow, equal desktop heights.

9. **When to ask for support** — full-width premium panel, soft rose/parchment background, support rows as spaced mini cards with calm urgency chips.

10. **Common questions** — richer card shadows, warmer background, larger question titles, refined pill CTAs, hover lift. Links and Ask behaviour unchanged.

11. **Related guidance** — polished card styling, stronger category labels and CTA. No new images unless existing article thumbnails slot in trivially.

12. **References and guidance** — quiet panel background, cleaner publisher hierarchy, subtle external link glyph, refined disclaimer.

13. **Foot rail prev/next** — preserved.

Backgrounds alternate parchment / white to break long text blocks. Section spacing tightened for consistent rhythm.

### Guardrails
- UK English, no em/en dashes in any new captions or copy.
- No content rewrites beyond captions.
- Only existing First Year article slugs in Read links; no `href="#"`.
- No changes to routes, sitemap, robots, redirects, SEO infra, other stages, calculators, journey, auth, DB, RLS, or 4–12m routing.
- No 4–12m pages.
- Hub heading and age pill grid remain as set in 11.8a.1.

### Verification
- `bunx tsgo --noEmit` passes.
- Load `/first-year/newborn`, `/1-month`, `/2-months`, `/3-months`; confirm ≥3 distinct images per page, premium hero, story band, upgraded feeding/sleep/support panels, working questions, correct Ask CTAs, resolving Read links, rendered references.

### Deliverable
Report files inspected/edited, assets created, hero result, story band result, per-month result, baby vs parent balance, feeding + sleep, questions, Ask CTAs, article links, references, visual premium result, preservation checks, typecheck result, and readiness to continue with 4–12 months.
