# Family Hero — Image Carousel Upgrade

Scope: `src/components/family/FamilyHeroCarousel.tsx` and `src/components/family/FamilyHero.tsx` only. No other files change.

## 1. Rewrite `FamilyHeroCarousel.tsx`

Replace the current video implementation with an image carousel of the same visual quality.

**Props**
```ts
type FamilyHeroSlide = { src?: string; alt: string };
type Props = { slides: FamilyHeroSlide[]; variant: "desktop" | "mobile" };
```

**Behaviour when slides exist**
- Filter to slides with `src`.
- Stacked `<img>` elements, `object-cover`, `object-position: 50% 40%` for safe face crop, `loading="eager"` on first, `loading="lazy"` on rest, `decoding="async"`, `draggable={false}`, `alt` passed through.
- Opacity crossfade ~700ms, advance every 5500ms via `setInterval`.
- Respect `prefers-reduced-motion`: no autoplay, show first slide only.
- No visible controls, no dots (calm, editorial).
- Family colour overlay layered above images:
  - buttercream wash `linear-gradient(160deg, hsl(var(--stage-family)/0.28) 0%, hsl(var(--stage-family-soft)/0.18) 55%, hsl(var(--stage-family-accent)/0.16) 100%)`
  - vignette `radial-gradient(120% 90% at 50% 45%, transparent 55%, hsl(var(--stage-family-deep)/0.22) 100%)`

**Fallback when no playable slides**
Upgrade from today's plain wash into a finished abstract Family visual (CSS/SVG only, no assets):
- Outer premium frame (border, warm shadow, inner highlight) — same as today.
- Nested inner rounded frame (`inset-6` desktop / `inset-4` mobile, 22px radius, faint ochre border).
- Buttercream wash background + honey corner bloom (top-left) + soft second bloom (bottom-right) — retained.
- Subtle ochre vignette radial.
- **Family constellation motif** rendered as an inline SVG centred in the frame:
  - one larger parent circle
  - one second adult circle beside it
  - two smaller child circles below
  - faint connecting lines between them
  - a scatter of low-opacity dots as rhythm marks
  - all strokes/fills use `--stage-family-accent` / `--stage-family-deep` at low opacity (0.12–0.35) so it reads as texture, not illustration.
- Inner highlight `inset 0 1px 0 hsl(0 0% 100% / 0.7)` retained.

**Frame**
- Desktop: `aspect-[5/6]`, 28px radius, ochre border `hsl(var(--stage-family-accent)/0.28)`.
- Mobile: `height: clamp(300px, 48vh, 420px)`, 24px radius.
- Warm shadow retained from current file.

Only `--stage-family*` and neutral tokens used. No hardcoded colours.

## 2. Edit `FamilyHero.tsx`

- Remove video-specific TODO block; replace with image-asset TODO:
  ```ts
  // TODO — connect Family hero images once assets exist:
  //   src/assets/family-hero-parents.jpg.asset.json      (mum & dad calm moment)
  //   src/assets/family-hero-family-four.jpg.asset.json  (family of four)
  //   src/assets/family-hero-everyday.jpg.asset.json     (everyday family life)
  //
  //   import parents from "@/assets/family-hero-parents.jpg.asset.json";
  //   ...
  //   const familyHeroSlides: FamilyHeroSlide[] = [
  //     { src: parents.url,     alt: "" },
  //     { src: familyFour.url,  alt: "" },
  //     { src: everyday.url,    alt: "" },
  //   ];
  ```
- `const familyHeroSlides: FamilyHeroSlide[] = [];` (empty; assets don't exist).
- Desktop and mobile `<FamilyHeroCarousel />` usages unchanged (already wired).
- Everything else (copy, eyebrow, headline, CTAs, gradients, mobile stack, anchors, spacing) untouched.

## 3. Out of scope

Routes, nav, Family tokens (`src/index.css`, `tailwind.config.ts`), `aiStageStyles`, `AskPage`, `AISearchBar`, `HubAISupport`, `App.tsx`, `Navbar`, `Footer`, `FamilyQuickNav`, `FamilyAISupport`, `FamilyToolsResources`, `FamilyTopicClusters`, `FamilyCommonQuestions`, `FamilySupportNote`, `FamilyPathways`, `FamilyFinalCTA`, sibling hubs, journey logic, auth, setup, prompts, edge functions, assets.

## 4. Verification

- `tsgo` clean.
- Playwright at 1280, 1024, 390 on `/family`: screenshot hero, confirm upgraded fallback (frame + constellation motif) renders, no broken-image icons, no horizontal scroll, mobile stack (media above copy) preserved, CTAs visible and tappable.
- Console: no errors.
- Spot-check `/pregnancy`, `/first-year`, `/toddler` still render.

## 5. Return

A. Files changed
B. Assets found vs fallback active
C. Image carousel behaviour summary
D. Fallback visual summary
E. Confirm no video logic remains
F. Mobile crop + height confirmation
G. No broken imports / missing image errors
H. `/family` renders at 1280/1024/390
I. Family AI, QuickNav, topics, Q&A, final CTA untouched
J. Sibling hubs still render
K. No out-of-scope changes
