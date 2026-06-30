## Toddler Subtopic + Age Pages — Premium Body/Card System Pass

Visual polish only. Lift the 8 Toddler topic pages and 5 Toddler age pages to the upgraded Toddler hub card standard. No route, IA, copy, data, asset, nav, or hero-image changes.

### Files to edit
- `src/components/toddler/topic/ToddlerTopicPage.tsx`
- `src/components/toddler/age/ToddlerAgePage.tsx`
- Data files (`toddlerTopicData.ts`, `toddlerAgeData.ts`) — only if a visible label is clearly wrong. Expected: no edits.

All other files (App.tsx, routes, Navbar, Footer, other journeys, all assets) are off-limits.

### Shared premium card recipe (reused from hub)
- Parchment → `--stage-toddler-soft` warm linear gradient at ~165°
- Border: `--stage-toddler-accent` at 0.22–0.32 alpha (`accentBorderStrong`)
- Subtle top-right or top-left apricot bloom (blurred span, ~60% opacity, ~0.18 accent alpha)
- Warm rest shadow `0 14px 32px -28px rgba(70,40,20,0.22)` + inner highlight `inset 0 1px 0 hsl(0 0% 100% / 0.6–0.75)`
- Hover lift `-translate-y-[2px]` + richer shadow `0 22px 50px -30px rgba(70,40,20,0.32)`
- Radius: 20–22px cards, 26–28px panels/CTAs
- Headings in `--stage-toddler-deep` (cocoa-russet), eyebrows preceded by an accent rule
- Chevron chips: 32px round, accent-soft fill, accent border, accent icon, translate-x on hover

### Topic page upgrades (`ToddlerTopicPage.tsx`)
Keep hero, image, copy, structure, section order. Upgrade visual treatment only:
1. **Section body rhythm** — add restrained vertical apricot washes (`parchment → --stage-toddler` low-alpha) behind What this covers, More toddler topics, and CTA sections so the body is no longer flat parchment.
2. **What this covers card** — apply premium recipe (gradient bg, accent corner bloom, stronger accent border, inner highlight, deeper shadow). Check chips already strong; keep.
3. **AI panel wrapper** — already on premium recipe; tighten border to `accentBorderStrong` and verify subtle corner bloom present.
4. **Common questions accordion** — 18px radius preserved; warmer open-state fill (accent-soft band visible), accent left-rule on open, stronger border, subtle hover lift, mobile-safe padding. Accent chevron preserved via accordion default.
5. **More toddler topics cards** — gradient bg + accent corner bloom; chevron chip enlarged feel; equal heights; clean mobile stack.
6. **Back-to-hub CTA panel** — already strong; bump border to `accentBorderStrong` and keep apricot top bloom.

### Age page upgrades (`ToddlerAgePage.tsx`)
Keep hero, image, age pill, stage summary character, section order, prev/next IA, and copy. Upgrade visual treatment:
1. **Section body rhythm** — subtle apricot washes behind Common questions, Gentle support, Related topics, and Prev/Next bands. Keep the page calm.
2. **What changes around this age card** — premium recipe (gradient, bloom, stronger border).
3. **Development area cards** — gradient bg, top-left corner bloom, stronger border, richer hover.
4. **AI panel wrapper** — matches topic page (stronger border, subtle bloom).
5. **Common questions accordion** — same upgraded accordion as topic pages.
6. **Gentle support note** — warmer parchment surface with a soft bloom and stronger accent border; Heart chip refined.
7. **Related toddler topic cards** — match topic page More-topics cards.
8. **Prev / Next age cards** — gradient bg + bloom + chevron chip styling parity with hub navigation.
9. **Back-to-hub link** — preserved.

Age pages retain visual distinction: age range pill, stage summary card, development grid, gentle support panel, and prev/next remain prominent age-specific affordances.

### Q&A visual system (topic + age)
Warm open-state fill via `--stage-toddler-accent` at low alpha, stronger accent border, accent left-rule when open, Toddler-accent chevron, subtle hover lift, calm answer spacing, mobile-safe padding, consistent 18px radius. Copy untouched.

### AI panel consistency (topic + age)
Wrapper uses parchment card treatment with `accentBorderStrong` border and a soft corner bloom. `stageAccent="--stage-toddler-accent"` continues to drive input focus, "Ask now" button, and searching/loading state via `HubAISupport` → `AISearchBar`. No functional or prompt changes.

### Constraints reaffirmed
- Only Toddler tokens: `--stage-toddler`, `--stage-toddler-soft`, `--stage-toddler-accent`, `--stage-toddler-deep`, `--parchment`.
- No new CSS tokens, assets, routes, or pages.
- Not bright orange, not childish, not busy.
- Hero images, copy, data, and structure preserved.

### Verification (Playwright headless)
Viewports: 1280×1800, 1024×1800, 390×1800.
Routes:
- `/toddler` (spot-check)
- 8 topic: `/toddler/development-milestones`, `/behaviour-emotions`, `/speech-language`, `/sleep`, `/food-feeding`, `/potty-learning`, `/health-safety`, `/play-connection`
- 5 age: `/toddler/12-17-months`, `/18-23-months`, `/2-years`, `/30-months`, `/3-years`

Confirm: all routes render, no horizontal scroll, hero images render, no face crops, cards stack cleanly, accordions toggle, AI panels stack on mobile, warmth visibly increased, hub unaffected.

### Return summary
A. Files changed · B. Topic improvements · C. Age improvements · D. Card-recipe parity with hub · E. Body warmth parity · F. Q&A visually improved + functional · G. AI panels accent + unchanged behaviour · H. Desktop/iPad/mobile passes · I. All routes render · J. No out-of-scope changes.