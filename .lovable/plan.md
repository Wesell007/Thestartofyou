# Journal Page — Premium Strategy Polish

Focused polish of `/product`. Preserves visuals, images, Amazon href and all shared systems.

## Files to create

- `src/components/product/ProductJournalAI.tsx` — parchment card with sage top border. Reuses `AISearchBar` with `stage="pregnancy"`, `context="Pregnancy journalling"`, `placeholder="Ask for a journalling prompt…"`, and the 5 provided prompt chips. Eyebrow "Journalling support", H2 "Not sure what to write? Start here." Chip clicks route to `/ask?q=…&stage=pregnancy`.
- `src/components/product/ProductWhoFor.tsx` — eyebrow "Made for", H2 "The moments you want somewhere to hold.", supporting copy, 5 cards (First-time mums, Parents who want to remember, When pregnancy feels emotional, Baby shower gifting, Keepsakes and scan photos) using `bg-card border-border/30` with sage icon dots, grid 1 / 2 / 3 columns.
- `src/components/product/ProductHowToUse.tsx` — eyebrow "A gentle rhythm", H2 "Use it weekly, or whenever you need somewhere to land.", 4 numbered steps on parchment cards with serif titles and sage numerals (01–04).
- `src/components/product/ProductDetailStrip.tsx` — soft parchment band, horizontal chip row: Hardcover A5 · 144 pages · Weekly prompts · Keepsake pocket · Gift-ready · Available on Amazon, using existing `bg-sage/8 border-sage/15 rounded-pill` styling.

## Files to edit

- `src/pages/Product.tsx` — sections in this exact order:
  1. ProductHero
  2. ProductGallery
  3. ProductJournalAI
  4. ProductInlineCTA
  5. ProductInside
  6. ProductDetailStrip
  7. ProductMoment
  8. ProductWhoFor
  9. ProductHowToUse
  10. ProductEcosystem
  11. ProductFinalCTA
- `src/components/product/ProductFinalCTA.tsx` — copy-only changes:
  - Headline → "Start holding the moments before they pass." (removes the italic split span)
  - Support paragraph → "For yourself, or for someone you love at the beginning of their journey."
  - Small line under button → "A guided pregnancy journal for thoughts, feelings, scan photos and first memories."
  - Button label, `href`, star row, product image, value anchors, spec pills, gift card and layout unchanged.

## Shared systems

- Reuses existing `AISearchBar` unchanged. `stage="pregnancy"` guarantees chip and Ask submissions land on `/ask?q=…&stage=pregnancy`.
- No edits to `AISearchBar`, `HubAISupport`, `AskPage`, edge functions, auth, setup, saved journey, article system, sibling hubs (Pregnancy / Family / First Year / Toddler), Navbar, Footer, tokens, routes, or assets.

## Verification

- `tsgo` typecheck.
- Playwright at 1280 / 1024 / 390 on `/product`: each new section renders, AI chip navigates to `/ask?q=…&stage=pregnancy`, Amazon button retains existing `href`, existing images still load, no horizontal scroll, mobile stacks cleanly.
- Spot-check `/pregnancy`, `/family`, `/first-year`, `/toddler` render unchanged.
