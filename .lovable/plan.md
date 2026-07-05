
## Journal Page — Light Card Colour Polish

Small visual refinement pass. No structural or logic changes.

### Files to edit
1. `src/components/product/ProductJournalAI.tsx`
2. `src/components/product/ProductWhoFor.tsx`
3. `src/components/product/ProductHowToUse.tsx`
4. `src/components/product/ProductDetailStrip.tsx`

### Changes

**ProductJournalAI.tsx**
- Card wrapper: `bg-card` → `bg-gradient-to-br from-white via-[#FBF8F1] to-[#F4EFE4]`
- Add quiet italic line after the `AISearchBar` block:
  *"Use these as a starting point, then write in your own words."*
  Classes: `font-sans text-xs italic text-muted-foreground/80 text-center mt-5`
- Sage top border, badge, chips, `stage="pregnancy"`, layout: unchanged.

**ProductWhoFor.tsx**
- Card: `bg-card` → `bg-gradient-to-br from-white via-[#FBF8F1] to-[#F4EFE4]`
- Icon container: `bg-sage/10` → `bg-sage/15 border border-sage/20`
- Copy, grid, 5 cards, icons: unchanged.

**ProductHowToUse.tsx**
- Step card: `bg-parchment/60` → `bg-gradient-to-br from-white via-[#FBF8F1] to-[#F4EFE4]`
- Numeral 01–04 → sage pill: `inline-flex items-center bg-sage/10 border border-sage/20 rounded-full px-2.5 py-0.5 font-sans text-[10px] font-medium tracking-[0.2em] text-sage`
- Title/description reflowed to sit under the pill; drop `pl-9` indent.
- Same 4 steps, same copy.

**ProductDetailStrip.tsx**
- Band: `bg-parchment/60` → `bg-gradient-to-r from-[#FBF8F1] via-[#F7F2E8] to-[#F4EFE4]`
- Chips: `bg-sage/8 border-sage/15` → `bg-sage/10 border-sage/20`
- Same 6 pills, same copy, same compact layout.

### Preserved
Page structure, section order, copy (except the one new AI support line), images, Amazon href, routes, tokens, shared AI logic, article system, sibling hubs, Navbar, Footer, auth, setup, saved journey logic. No new assets, no new sections.

### Verification
- `tsgo` typecheck
- Playwright `/product` at 1280, 1024, 390 — screenshot each
- Confirm AI chips still route to `/ask?q=...&stage=pregnancy`
- Confirm Amazon href in `ProductFinalCTA` untouched
- Spot-check `/pregnancy`, `/family`, `/first-year`, `/toddler` render
