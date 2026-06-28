## Toddler Hub — Premium Uplift + Video Hero Wiring

**Quality gate result: PASS.** The generated video (`src/assets/toddler-hero-video.mp4.asset.json`, 1920×1088, 5s, 24fps, 6.9MB) was reviewed via ffmpeg stills + a 4×4 motion contact sheet. Real-looking ~24m toddler on a soft wool rug in warm window light, gently handling wooden blocks. Face natural and consistent across frames, eyes calmly downcast, hands correctly formed (one on a block, one relaxed), motion subtle. No uncanny features, no distortion, no chaotic toys, no bright nursery colours, no staged smile. Subject framed right-of-centre with safe head/hand/foot clearance. → wire in; poster (`firstyear-stage-9-12.jpg`) kept as fallback only.

### Files to edit
1. **`ToddlerHero.tsx`** — import the asset JSON, add `<source src={toddlerHeroVideo.url} type="video/mp4" />`, `preload="auto"`, poster fallback only. Tighten min-h, copy on the left, stronger parchment→transparent left wash (readable copy without darkening the toddler), apricot bloom under copy column, hairline base seam. `object-position` tuned per breakpoint (mobile 72%, md 68%, lg 62%) so head/hands/feet stay safe. Eyebrow upgraded to "Toddler · 12 months to 3 years". Tactile CTAs with cocoa shadow + inner highlight.
2. **`ToddlerAgeNav.tsx`** — wrap pills in a layered parchment card on a soft apricot wash; centred hairline + eyebrow + serif heading + supporting line; pills get inner highlight + lift-on-hover shadow; ≥44px tap targets; five groupings preserved.
3. **`ToddlerAISupport.tsx`** — frame `HubAISupport` inside an editorial parchment panel on a warm apricot→parchment band; add eyebrow ("Ask The Start of You") + serif heading + quiet supporting line beneath. Position unchanged (directly after age nav).
4. **`ToddlerTopicClusters.tsx`** — deeper card padding, 22px radius, inner top highlight, hairline + numbered cluster eyebrow, chip border refinement, arrow CTA slides on hover, equal heights. 2-col desktop/iPad, 1-col mobile.
5. **`ToddlerToolsResources.tsx`** — matched card system; hairline + eyebrow + arrow CTA; parchment-on-apricot gradient band; supporting line under heading.
6. **`ToddlerWhatThisCovers.tsx`** — stronger section header rhythm (rule + eyebrow + serif heading + supporting line); increased gaps; slightly larger pillar titles.
7. **`ToddlerCommonQuestions.tsx`** — matched section header rhythm + soft hover shadow on accordion items.
8. **`ToddlerReflection.tsx`** — italic note wrapped in a quiet parchment card with hairline + eyebrow ("A quiet note") on a soft apricot band.
9. **`ToddlerPathways.tsx`** — editorial cards matching topic-card depth; per-card eyebrow ("Previous stage" / "This hub" / "What's next") + arrow CTA.
10. **`ToddlerFinalCTA.tsx`** — framed panel on layered apricot gradient; hairline + eyebrow + larger serif heading; primary CTA gains cocoa shadow + hover lift; secondary link refined.

### Out of scope (untouched)
- No toddler topic / month / article pages, no Family or Parent hub.
- No edits to `index.css`, `pages/Toddler.tsx`, `App.tsx`, Navbar, Footer.
- No edits to TTC / Pregnancy / First Year / IVF / legacy Postpartum / Journal.

### Verify
Build + Playwright screenshots at 1280 / 1024 / 390 — no horizontal scroll, toddler head/hands/feet safe, ≥44px pills, AI panel breathing, 2/2/1 card grids, framed bottom sections balanced.

### Return A–H
Files changed · video wired (PASS) · poster fallback only · hero premium uplift · AI strengthened in place after age nav · hub lifted to Pregnancy quality · desktop/iPad/mobile checked · no out-of-scope work.
