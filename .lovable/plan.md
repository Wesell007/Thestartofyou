## Phase 11.7b — First Year Phase Page Premium Visual Polish

Scope: styling and layout only. Single component edit: `src/components/firstyear/phase/FirstYearPhasePage.tsx`. Applies to all four phase routes via shared component. Hero, routes, data, and content untouched. No new assets.

### 1. Paired Baby / Parent cards (`PairedSection`)
- Increase padding to `p-8 md:p-10`, radius `rounded-[28px]`, stronger border opacity (~0.35), premium layered shadow (`0_30px_80px_-40px` plus a soft inner highlight).
- Add a subtle diagonal gradient background (soft blue-cream for baby, rose-cream for parent) using existing stage tokens instead of flat tint.
- Add a visible left accent stripe (4px wide, full-height, rounded) using stage accent, replacing the small pill next to overline.
- Card header: overline stronger (increase weight, opacity, add small filled dot marker), h2 up to `text-2xl sm:text-3xl`.
- Body: category labels get more visual weight (medium weight, accent color at higher opacity). Body text up to `text-[15px]` with `leading-[1.75]`. Add hairline divider (`border-t border-border/40`) between items and increase spacing to `space-y-5`.

### 2. Editorial section (`PhaseEditorial`)
- Wrap in a centered parchment-deeper panel: `rounded-[28px]`, subtle border, soft ambient shadow, `p-10 md:p-14`, max-w-2xl centered.
- Small decorative rule (10px sage bar) above overline.
- Overline centered; h2 up to `text-2xl sm:text-3xl`, italic serif variant.
- Body text `text-[17px] md:text-[18px]`, `leading-[1.9]`, foreground/75, centered.
- Increase section vertical rhythm to `py-16 md:py-24`.

### 3. What often feels hard / What can help (`FeelsAndHelps`)
- Cards: `rounded-[24px]`, `p-8 md:p-9`, stronger borders, soft shadow matching paired cards.
- Warmer background tints (recovery-soft/0.3, firstyear-soft/0.32).
- Header hierarchy: overline + h3 up to `text-xl sm:text-2xl`.
- Each item becomes a guidance row: small numbered marker (01, 02) in accent serif on the left, label medium weight, body `text-[14.5px] leading-[1.75]`, thin divider between rows, `space-y-5`.

### 4. When to ask for support (`WhenToAskForSupport`)
- Wrap list in a bordered parchment panel (`rounded-[24px]`, border, soft shadow, `p-8 md:p-10`).
- Each item becomes a row with a small circular accent marker (dot in accent color) on the left, label larger (`text-[17px]`), `when` chip becomes a pill with border, body foreground/75.
- Replace `QuietRule` between items with cleaner spacing + hairline divider inside the panel.

### 5. Common Questions (`CommonQuestions`)
- Each QA becomes a card: `bg-card`, `rounded-2xl`, `border-border/40`, `shadow-[0_8px_24px_-16px_rgba(0,0,0,0.08)]`, `p-6 md:p-7`, hover lift (translate + shadow bump).
- Question `text-[18px] md:text-[19px]` serif, answer `text-[14.5px] leading-[1.8]`.
- CTA row unchanged in behaviour; pill styling refined for consistency with new card. Remove trailing `QuietRule`.
- `space-y-4` between cards.

### 6. Featured guidance
- Light touch: verify section spacing (`py-16 md:py-20`), add consistent shadow/border to existing cards if flat. No content changes.

### 7. Related topics
- Minor: increase top margin and pill spacing so section breathes after larger blocks.

### 8. References (`PhaseSources`)
- Wrap in subtle `bg-parchment-dark` panel with `rounded-2xl`, thin border, `p-8`.
- Numeric marker slightly stronger (accent color, tabular-nums).
- Publisher label medium weight, source label muted; keep type small.
- Disclaimer kept subtle at bottom.

### 9. Overall rhythm
- Standardise section padding across new sections: `py-16 md:py-22` for major blocks, `py-14 md:py-18` for lighter ones.
- Confirm `max-w-5xl` for grid sections, `max-w-3xl` for editorial/sources, `max-w-4xl` for questions/support.
- Ensure mobile stacking: all grids already `grid-cols-1 md:grid-cols-2`, verify padding scales down cleanly.

### Preservation
No changes to: routes, SEO, sitemap, robots, redirects, `firstYearPhaseData.ts` (unless a tiny label tweak surfaces), hero section, article data, other hubs, assets, auth, DB, RLS. No new `href="#"`. UK English, no em/en dashes.

### Verification
- `bunx tsgo --noEmit`
- Manual visual check on all four phase routes at desktop + mobile widths via Playwright screenshots.
- Confirm no broken article links (existing `qa.readMore.href` values unchanged).