# Family Hero — 4 real family images carousel

Four warm editorial family photos have already been generated to `/tmp/`. Next steps below.

## 1. Upload the 4 generated images as CDN assets

```
lovable-assets create --file /tmp/family-hero-parents.jpg       --filename family-hero-parents.jpg       > src/assets/family-hero-parents.jpg.asset.json
lovable-assets create --file /tmp/family-hero-family-four.jpg   --filename family-hero-family-four.jpg   > src/assets/family-hero-family-four.jpg.asset.json
lovable-assets create --file /tmp/family-hero-everyday.jpg      --filename family-hero-everyday.jpg      > src/assets/family-hero-everyday.jpg.asset.json
lovable-assets create --file /tmp/family-hero-diverse-family.jpg --filename family-hero-diverse-family.jpg > src/assets/family-hero-diverse-family.jpg.asset.json
```

## 2. `FamilyHeroCarousel.tsx` tweaks
- Add optional `objectPosition?: string` to `FamilyHeroSlide`; use `objectPosition ?? "50% 40%"`.
- Soften Family overlay so real photos read clearly: buttercream wash 0.28→0.18, ochre 0.16→0.10, vignette 0.22→0.18.
- Keep 5500ms/700ms, reduced-motion, frame, blooms, inner highlight, ochre border, warm shadow, abstract fallback for missing assets.

## 3. `FamilyHero.tsx` wiring
Add four `@/assets/family-hero-*.jpg.asset.json` imports and populate `familyHeroSlides` with the 4 slides and the specified alt text. No other changes.

## 4. Out of scope
Routes, nav, Family tokens, `aiStageStyles`, `AskPage`, `AISearchBar`, `HubAISupport`, `App.tsx`, `Navbar`, `Footer`, other Family components, sibling hubs, journey logic, auth, setup, prompts, edge functions.

## 5. Verification
`tsgo`; Playwright at 1280/1024/390 on `/family` (crossfade, no broken images, no horizontal scroll, mobile stack, CTAs visible); spot-check `/pregnancy`, `/first-year`, `/toddler`.
