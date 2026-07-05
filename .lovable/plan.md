# Family Hero — Video Carousel Upgrade

Visual upgrade of the media panel inside `src/components/family/FamilyHero.tsx` only. No Family video assets exist yet, so the live page keeps the abstract buttercream/honey fallback panel — visually identical to today.

## Files

**Create** `src/components/family/FamilyHeroCarousel.tsx`
- Props: `slides: { src?: string; poster?: string; alt: string }[]` and `variant: "desktop" | "mobile"`.
- If `slides` has no playable entries → renders the current abstract panel (honey corner bloom, soft wash, inner highlight border, ochre border) so users see no unfinished state.
- If videos exist → stacked `<video>` elements, one visible at a time via opacity crossfade (~700ms), advancing every 6s. `muted`, `playsInline`, `preload="metadata"`, no controls, `aria-hidden`, `loop={false}`. Active video plays; others pause.
- Respects `prefers-reduced-motion`: no autoplay advance, first slide only.
- Family-tone overlay over video: buttercream wash + muted ochre tint + subtle vignette using only `--stage-family`, `--stage-family-soft`, `--stage-family-accent`, `--stage-family-deep`.
- Frame: 28px radius (24px mobile), ochre border `hsl(var(--stage-family-accent) / 0.28)`, warm shadow, inner highlight `inset 0 1px 0 hsl(0 0% 100% / 0.7)`.
- Desktop variant: `aspect-[5/6]`. Mobile variant: `height: clamp(300px, 48vh, 420px)`.

**Edit** `src/components/family/FamilyHero.tsx`
- Add top-of-file `familyHeroSlides: FamilyHeroSlide[] = []` with a TODO comment listing the six future asset pointer paths (`family-hero-parents.mp4.asset.json`, `family-hero-family-four.mp4.asset.json`, `family-hero-everyday.mp4.asset.json` and matching posters) and a commented example import block showing the `.asset.json` shape used by `toddler-hero-video.mp4.asset.json` — no imports actually added, so no broken build.
- Replace the desktop right-column abstract `<div aria-hidden>` block with `<FamilyHeroCarousel slides={familyHeroSlides} variant="desktop" />`.
- Replace the mobile top abstract `<div aria-hidden>` block with `<FamilyHeroCarousel slides={familyHeroSlides} variant="mobile" />`.
- Everything else unchanged: copy column, eyebrow, headline, support line, CTAs, gradients, mobile stack order, anchor links, bottom border strip.

## Out of scope (unchanged)

Routes, nav, Family tokens, `aiStageStyles`, `AskPage`, `AISearchBar`, `HubAISupport`, `App.tsx`, `Navbar`, `Footer`, `FamilyQuickNav`, `FamilyAISupport`, `FamilyToolsResources`, `FamilyTopicClusters`, `FamilyCommonQuestions`, `FamilySupportNote`, `FamilyPathways`, `FamilyFinalCTA`, sibling hubs, journey logic, auth, setup, prompts, edge functions, existing assets.

## Verification

- `tsgo` typecheck.
- Playwright screenshots of `/family` at 1280, 1024, 390 — confirm fallback panel renders identically to today, no horizontal scroll, mobile stack order preserved, CTAs visible, no missing-media icons, no console errors.
- Spot-check `/pregnancy`, `/first-year`, `/toddler`.

## Return

A. Files changed  
B. No Family video assets found — fallback active  
C. Carousel behaviour summary  
D. Mobile crop/height confirmation  
E. No broken imports or missing media errors  
F. `/family` renders at 1280/1024/390  
G. Family AI, QuickNav, topics, Q&A, final CTA untouched  
H. Sibling hubs still render  
I. No out-of-scope changes
