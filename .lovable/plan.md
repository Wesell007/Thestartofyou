# Toddler Hero — Mobile/iPad redesign + woodland illustration layer

## Files
- **New:** `src/components/toddler/ToddlerIllustrations.tsx` — inline SVG marks
- **Edit:** `src/components/toddler/ToddlerHero.tsx` — breakpoint-split layout

## ToddlerIllustrations.tsx
Inline SVG exports `DeerMark`, `RabbitMark`, `ButterflyMark`, `LeafSprig`, `BirdMark`. Hand-drawn watercolour feel using a muted woodland palette (warm brown ink, fawn fur, sage, soft slate, cream highlight). Every mark is `aria-hidden`, accepts a `className`, no external assets.

## ToddlerHero.tsx — split composition

### Desktop / iPad branch (`hidden md:flex`, `min-h-[78vh]`)
- Full-bleed `<video>`, approved asset wiring untouched (autoplay/muted/loop/playsInline/preload="auto", `poster={toddlerHeroPoster.url}`).
- Object-position: iPad `object-[78%_30%]`, desktop `lg:object-[62%_center]`.
- Two parchment washes:
  - iPad: `0.98 → 0.92 → 0.5 → transparent` (stronger than desktop).
  - Desktop: existing premium balance, 0% nudged to 0.96.
- Apricot bloom retained.
- Copy column max-w 520/560, headline `text-balance`, body `text-foreground/80`.
- CTAs side-by-side, `min-h-[48px]`, min-w 220.
- Woodland accents (max 2): `LeafSprig` top-left near eyebrow (opacity 0.5), `DeerMark` lower-left of copy column (opacity 0.55). Never over subject.

### Mobile branch (`md:hidden`) — true stacked layout
1. Media zone: `height: clamp(320px, 50vh, 420px)`, video `object-cover`, `objectPosition: "62% 28%"` (tunable 58–66% / 24–32% only if needed to protect head/face/hands/feet/blocks). Soft parchment fade at bottom edge masks into the copy panel.
2. Copy panel: solid `hsl(var(--parchment))` background, px-6 pt-7 pb-12.
   - Eyebrow rule + "Toddler · 12m – 3y".
   - Headline serif 2.15rem, deep toddler colour, `text-balance`.
   - Standfirst 15.5px, `text-foreground/80`, max-w 30ch.
   - CTAs stacked `w-full`, `min-h-[48px]` — soft apricot primary + outline secondary.
3. Woodland accents (max 2): `ButterflyMark` top-left of media (w-10, opacity 0.7), `RabbitMark` bottom-right of copy panel (w-16, opacity 0.55).

### Preserved everywhere
- Video src + poster imports unchanged.
- Asset JSON pointers untouched.
- Hairline base seam.
- Every other file (other Toddler components, pages, CSS, navbar, footer) untouched.

## Verification (Playwright)
Capture `/toddler` at 1280×1800, 1024×1366, 390×844. Confirm no text over toddler, mobile stacked with full-width 48px CTAs, no horizontal scroll, iPad copy clear of subject, desktop composition essentially unchanged, woodland marks subtle.

## Return A–H after build
A. Files changed B. Video/poster assets unchanged C. Mobile stacked, no overlap D. Mobile CTAs full-width ≥48px E. iPad crop/clarity improved F. Desktop intact G. Woodland accents subtle/premium H. No out-of-scope edits.
