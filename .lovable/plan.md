## Toddler Age Pages — image-led hero

Scope locked to: `src/data/toddlerAgeData.ts`, `src/components/toddler/age/ToddlerAgePage.tsx`, plus 5 new `.asset.json` pointers.

### Steps
1. Upload 5 prepared JPGs from `/tmp/tage/` via `lovable-assets create` (subjects already verified). Write pointers:
   - `src/assets/toddler-age-12-17-months.jpg.asset.json`
   - `src/assets/toddler-age-18-23-months.jpg.asset.json`
   - `src/assets/toddler-age-2-years.jpg.asset.json`
   - `src/assets/toddler-age-30-months.jpg.asset.json`
   - `src/assets/toddler-age-3-years.jpg.asset.json`
2. `toddlerAgeData.ts`: add optional `heroImage?: string` on `ToddlerAgeConfig`, import the 5 pointers, assign to each matching config. No copy / slug / route / section changes.
3. `ToddlerAgePage.tsx`: keep breadcrumb, eyebrow, H1, standfirst, age pill, stage summary card, parchment card, apricot wash, bloom backdrop, tokens, section order. Add image panel inside the hero card.
   - Desktop (lg+): 12-col grid, copy 7 cols (left-aligned), image 5 cols (right). `aspect-[4/5]`, `object-cover`, `object-position: center 30%`, 22–24px radius, soft apricot border, inset white highlight, warm shadow.
   - iPad (md, <lg): stack image above copy.
   - Mobile: stacked, full-width, `aspect-[5/4]`.
   - Fallback: parchment placeholder, same aspect, `{/* TODO: upload age hero image */}`. No woodland marks.
   - Only existing `--stage-toddler*` / `--parchment` tokens.
4. Playwright check at 1280 / 1024 / 390 on all 5 age routes + `/toddler` and `/toddler/development-milestones`.

### Out of scope
`App.tsx`, routes, `ToddlerAgeNav.tsx`, all topic pages/data/images, hub video/poster, Navbar, Footer, every other journey.
