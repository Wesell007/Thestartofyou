
# Toddler Hub — Premium Correction Pass

Apply the approved muted apricot / pumpkin clay palette **and** lift the live hub closer to Pregnancy hub quality through hierarchy, rhythm, and richer section treatments. Tight scope.

## 1. Token swap — `src/index.css`

Replace existing Toddler tokens with the exact approved values:

```css
/* Toddler ecosystem — muted apricot / pumpkin clay / warm russet.
   Dusty, warm, premium. Not bright/CTA-like, not nursery, and
   visibly distinct from the main site terracotta CTA. */
--stage-toddler: 28 58% 94%;        /* soft apricot cream surface */
--stage-toddler-soft: 26 52% 86%;   /* muted peach-clay */
--stage-toddler-accent: 22 48% 45%; /* muted pumpkin clay accent */
--stage-toddler-deep: 20 40% 23%;   /* grounded cocoa-russet text */
```

All Toddler components already consume these tokens, so colour repaints automatically.

Use the cocoa-russet `--stage-toddler-deep` for readable text and fine details. Reserve the pumpkin-clay accent for small marks, hairlines, eyebrows and quiet link colour — never as large heavy filled blocks.

## 2. Section reorder — `src/pages/Toddler.tsx`

Hero → Age nav → **AI support** → What this covers → Tools & resources → Topic clusters → Common questions → Reflection → Pathways → Final CTA.

AI support stays calm and embedded — soft apricot panel, generous whitespace, no loud fill.

## 3. Targeted polish (only where the live page still feels flat)

- **Hero (`ToddlerHero.tsx`)** — keep `<video>` element with `firstyear-stage-9-12.jpg` as temporary poster fallback. Tighten hierarchy: eyebrow → balanced tracking-tight headline → standfirst → primary + secondary CTAs. Add a soft apricot halo wash behind the headline. Confirm subject framing is safe on desktop / iPad / mobile. Future-video comment block stays.
- **Age nav (`ToddlerAgeNav.tsx`)** — raise presence: small eyebrow + one-line standfirst above the pill row, pill height ≥44px, quiet hover lift, clearer current-state ring. Horizontal scroll-safe on mobile, wraps on iPad+.
- **AI support (`ToddlerAISupport.tsx`)** — premium calm frame: soft apricot panel, generous padding, cocoa-russet text, three example chips. Embedded, not a CTA block.
- **Topic clusters (`ToddlerTopicClusters.tsx`)** — keep 2-col desktop+iPad, 1-col mobile. Enrich each card: small eyebrow, headline, one-sentence standfirst, 3 bullet links, quiet arrow CTA. Hairline border + low-elevation hover. No leaf motifs.
- **Tools & resources (`ToddlerToolsResources.tsx`)** — editorial cards (label, title, one-line description, quiet arrow link). Consistent card height, 4-up desktop / 2-up iPad / 1-up mobile.
- **What this covers / Common questions / Reflection / Pathways / Final CTA** — pass only for spacing rhythm, type scale, and restrained apricot accent use so they don't sag next to the upgraded sections.

## 4. Responsive sanity

Manual check at 1280 / 1024 / 390:
- no horizontal scroll
- hero subject never cropped at head/face
- age pills tap-target ≥44px and wrap cleanly
- AI support not cramped at iPad
- topic + tools cards: 2-col desktop+iPad, 1-col mobile, equal heights

## Files touched

- `src/index.css` (tokens only)
- `src/pages/Toddler.tsx` (reorder only)
- `src/components/toddler/ToddlerHero.tsx`
- `src/components/toddler/ToddlerAgeNav.tsx`
- `src/components/toddler/ToddlerAISupport.tsx`
- `src/components/toddler/ToddlerTopicClusters.tsx`
- `src/components/toddler/ToddlerToolsResources.tsx`
- `src/components/toddler/ToddlerWhatThisCovers.tsx`
- `src/components/toddler/ToddlerCommonQuestions.tsx`
- `src/components/toddler/ToddlerReflection.tsx`
- `src/components/toddler/ToddlerPathways.tsx`
- `src/components/toddler/ToddlerFinalCTA.tsx`

## Out of scope (will not touch)

Toddler topic / month / article pages. Family or Parent hub. Nav / routing / `App.tsx` / `Navbar` / `Footer`. TTC, Pregnancy, First Year, IVF, legacy Postpartum, Journal. No real toddler video asset created or faked.

## Return after build (A–H)

A. Files changed
B. Tokens replaced with the exact approved muted apricot / pumpkin clay values (28/26/22/20), staying dusty, warm, premium, and visibly distinct from CTA terracotta
C. Hero remains video-led in structure; `firstyear-stage-9-12.jpg` is a temporary poster fallback only — final toddler video still pending
D. AI support moved directly after age navigation, kept calm and embedded (soft panel, cocoa-russet text, no heavy filled blocks)
E. Targeted polish applied to hero, age nav, AI support, topic cards, tools/resources, and overall rhythm — hub reads closer to Pregnancy hub standard
F. Desktop / iPad / mobile checked: no crops, no horizontal scroll, 2-col topic+tools on desktop+iPad, 1-col mobile, age pills ≥44px
G. No out-of-scope edits (no new pages, no nav/routing, no other journeys touched, no faked video)
H. Required asset to finish the hero = a calm 6–10s home-light clip of a true 18–30 month toddler (walking / playing / reading / stacking blocks), warm daylight, safe head/face composition; once supplied as `src/assets/toddler-hero-video.mp4` and registered via its `.asset.json`, wire it at the marked slot in `ToddlerHero.tsx` and remove the temporary poster note.
