## Apply approved Toddler hero video + poster swap

Temp files verified present (`/tmp/toddler-hero-final.mp4` 2.9 MB, `/tmp/toddler-hero-poster.jpg` 219 KB). QA already passed. Three actions on build mode:

### 1. Replace video asset pointer
```bash
lovable-assets create --file /tmp/toddler-hero-final.mp4 --filename toddler-hero-video.mp4 > src/assets/toddler-hero-video.mp4.asset.json
```

### 2. Create matching Black toddler poster asset
```bash
lovable-assets create --file /tmp/toddler-hero-poster.jpg --filename toddler-hero-poster.jpg > src/assets/toddler-hero-poster.jpg.asset.json
```

### 3. Update `src/components/toddler/ToddlerHero.tsx` (poster wiring + JSDoc only)
- `import toddlerHeroPoster from "@/assets/firstyear-stage-9-12.jpg"` → `import toddlerHeroPoster from "@/assets/toddler-hero-poster.jpg.asset.json"`
- `poster={toddlerHeroPoster}` → `poster={toddlerHeroPoster.url}`
- JSDoc updated to state the poster is the matching Black toddler still extracted from the approved hero video

### Untouched
Hero layout, copy, CTAs, gradients, apricot bloom, palette, base seam, object-position values, section order. No other component, page, or config touched. No new routes/pages.

### Verification
Playwright at 1280 / 1024 / 390 on `/toddler`. Capture one screenshot per breakpoint, confirm video playback, poster handoff, head/face/hands/feet framing, no horizontal scroll.

### Return A–G
A. Files changed
B. Real toddler video wired & verified
C. Poster fallback now matching Black toddler still
D. Hero layout/uplift unchanged
E. Object-position values unchanged
F. Desktop/iPad/mobile checks with one screenshot each
G. No out-of-scope work
