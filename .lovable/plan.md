## Toddler Section — Premium Visual + Q&A Pass

Focused polish across the Toddler hub, 8 topic pages and 5 age pages. No IA, route, asset, data-model or token changes.

### A. Shared premium card recipe (applied across all Toddler cards)

One consistent recipe used everywhere — hub topic clusters, hub age pills, what-this-covers, related topics, prev/next age cards, final CTAs, dev-area cards:

- Surface: `bg-parchment` + faint apricot top-left wash (`hsl(var(--stage-toddler) / 0.35)` blurred blob, opacity 70%).
- Border: `hsl(var(--stage-toddler-accent) / 0.22)`.
- Shadow rest: `0 14px 32px -28px rgba(70,40,20,0.22)` + `inset 0 1px 0 hsl(0 0% 100% / 0.6)`.
- Shadow hover: `0 22px 50px -30px rgba(70,40,20,0.32)` + `-translate-y-[2px]`.
- Radius: content 20–22px; hero/CTA 26–28px.
- Eyebrow: 10.5px, uppercase, tracking `[0.28em]`, accent colour.
- Title: serif 17–18px, cocoa-russet (`--stage-toddler-deep`).
- Chevron affordance: 8×8 circle, accent border + `accent/0.08` fill, translates 4px on hover.

### B. Toddler hub (`pages/Toddler.tsx` + components)

- `ToddlerTopicClusters.tsx`: apply shared card recipe + apricot wash; replace text-arrow with circular chevron chip; tighten gap; add gentle apricot top wash above the section.
- `ToddlerAgeNav.tsx`: pill fill warmed to `--stage-toddler-soft / 0.7`, stronger accent border (`/0.32`), apricot bloom inside container, deeper hover shadow.
- `ToddlerWhatThisCovers.tsx`: wrap the 8 pillars inside a parchment card with the shared recipe; replace dash bullets with apricot-tinted `Check` chips (matches topic-page pattern); add top-left apricot wash.
- `ToddlerCommonQuestions.tsx`: rebuild with the topic-page accordion treatment — left accent rule + soft apricot fill on open state, lift on hover, 18px radius, premium border colour.
- `ToddlerAISupport.tsx`: wrap in parchment card with apricot border + inner highlight + warmer shadow; soften trailing caption.
- `ToddlerFinalCTA.tsx`: warmer gradient band, parchment card with apricot bloom, refined primary button with chevron, softer secondary.
- `pages/Toddler.tsx`: leave section order untouched. (Section bands are achieved via component-level top washes — no wrapper changes needed.)

### C. Topic pages (`ToddlerTopicPage.tsx`)

Hero, image, copy structure, routes unchanged. Already strong below the hero; small polish only:
- Tighten AI panel trailing caption to match hub.
- Confirm Q&A accordion already uses the premium treatment (it does — keep as-is).
- Related topics already use the shared card recipe — keep.
- Final back-to-hub CTA: warmer gradient + accent bloom to match hub final CTA recipe.

### D. Age pages (`ToddlerAgePage.tsx`)

Hero, age pill, stage summary, prev/next strip, stage-guide feel preserved.
- Development area cards: add a small accent dot chip beside the eyebrow for a stronger eyebrow/title hierarchy; keep topic chevron affordance.
- Q&A accordion: already premium — keep.
- Gentle support panel: keep current warm chip styling; add apricot wash for depth.
- AI panel wrapper: trailing caption added for parity with hub/topic.
- Related topic & prev/next cards: already use the shared recipe — keep.

### E. Q&A copy pass

Existing Q&A across `ToddlerCommonQuestions.tsx`, `toddlerTopicData.ts` (8 sets) and `toddlerAgeData.ts` (5 sets) is already calm, UK English, 2–4 sentences, with health-visitor/GP signposting and variability language ("most", "many", "around").

Targeted polish only:
- Hub Q&A: light tightening for cadence (e.g. "still-developing toddler brain", "very few words", "for a long stretch") — no question count changes, no meaning changes.
- Topic + age Q&A: leave largely intact; soften any milestone-fixed phrasing if found during edit; no rewrites.

This avoids drift on copy that has already been reviewed and approved.

### F. AI panels

Visual integration only — same `HubAISupport` component, same props, same functionality. Apricot border, inner highlight, warmer shadow, balanced spacing, trailing caption for parity. No prop changes.

### G. Responsive verification (Playwright headless)

After build, capture screenshots at 1280 / 1024 / 390 for all 14 routes:
- `/toddler`
- 8 topic routes
- 5 age routes

Confirm: no horizontal scroll, heroes intact, images render, cards stack cleanly, accordions open, AI panels stack, no cropped faces, warmer palette visible.

### Files to be edited

```
src/components/toddler/ToddlerTopicClusters.tsx
src/components/toddler/ToddlerAgeNav.tsx
src/components/toddler/ToddlerWhatThisCovers.tsx
src/components/toddler/ToddlerCommonQuestions.tsx
src/components/toddler/ToddlerAISupport.tsx
src/components/toddler/ToddlerFinalCTA.tsx
src/components/toddler/topic/ToddlerTopicPage.tsx   (final CTA polish + trailing caption)
src/components/toddler/age/ToddlerAgePage.tsx       (dev-area eyebrow chip + trailing caption)
src/data/toddlerTopicData.ts                        (only if light Q&A wording polish surfaces)
src/data/toddlerAgeData.ts                          (only if light Q&A wording polish surfaces)
```

### Out of scope (untouched)

Routes, `App.tsx`, Navbar, Footer, TTC, Pregnancy, First Year, IVF, legacy Postpartum, Journal, saved-journey logic, auth, setup, all Toddler media assets (hero video, poster, topic and age hero images). No new tokens, pages, routes, assets or journey logic.

### Deliverable on completion

Files-changed list plus the requested summaries (B–J).
