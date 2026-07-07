# Phase 8.4b — Toddler Batch 3 Image Mappings (Behaviour + Potty)

## Scope
Add image mappings for the 4 ready Batch 3 articles. Only `src/components/toddler/article/toddlerArticleImages.ts` is edited; 8 new image assets are added under `src/assets/`. No article data, components, routes, topic pages, cards, SEO, or non-Toddler files touched. No mappings added for the remaining 4 drafts.

## Asset strategy
Existing Toddler article assets (Batch 1 + 2) are topic-specific to play/food/sleep/development and don't fit behaviour or potty themes. The two behaviour-topic and potty-topic hero JPGs already exist as topic assets, but using each on both articles of a topic would be visible duplication on adjacent related-guidance grids. Decision: generate 8 fresh bespoke images (4 hero + 4 body), one pair per article, matching The Start of You visual style (calm, warm natural light, premium, parent-centred, non-clinical, no text/logos, no distress or shame framing).

## New assets (8)
Saved as `.jpg` under `src/assets/`:

1. `toddler-article-tantrums-hero.jpg` — parent sitting calmly on the floor near a toddler after a hard moment, soft home light, gentle expressions, no distress close-up.
2. `toddler-article-tantrums-body.jpg` — parent and toddler in a quiet reconnection moment, warm living room, low key emotion.
3. `toddler-article-big-feelings-hero.jpg` — parent gently comforting a toddler with a hand on their back, calm home setting.
4. `toddler-article-big-feelings-body.jpg` — toddler sitting close to a parent with a soft comfort object, warm neutral tones.
5. `toddler-article-potty-readiness-hero.jpg` — simple child potty on a bathroom floor in warm daylight, tidy calm bathroom, no child undressed.
6. `toddler-article-potty-readiness-body.jpg` — parent preparing a gentle potty learning corner (potty, small basket, book), no child exposed.
7. `toddler-article-potty-pressure-free-hero.jpg` — child potty set up calmly at home with a folded towel and small book nearby, warm light.
8. `toddler-article-potty-pressure-free-body.jpg` — relaxed home bathroom potty learning moment, parent hand offering support, fully clothed toddler, no accidents.

All prompts explicitly exclude: text, logos, distressed close-ups, shame, punishment framing, undressed child, accidents, chaotic mess, staged stock look.

## File edit — `src/components/toddler/article/toddlerArticleImages.ts`
Add 8 new imports alongside existing ones (no removals, no reordering of current mappings). Extend `toddlerArticleImageMap` with 4 new entries following the existing pattern (hero + one body at `afterSectionIndex: 1`, plus the required `// bespoke future:` comment above each).

Alt text and captions use the suggestions in the brief verbatim:

- `understanding-toddler-tantrums`
  - hero alt: "A parent sitting calmly near their toddler during a difficult moment"
  - body alt: "A gentle parent and toddler moment after big feelings"
  - caption: "Tantrums are often about feelings toddlers cannot yet manage, not proof that anyone has failed."
- `helping-your-toddler-with-big-feelings`
  - hero alt: "A parent gently comforting a toddler with big feelings"
  - body alt: "A toddler sitting close to a parent in a calm supportive moment"
  - caption: "Big feelings are part of toddlerhood. Support often starts with staying close, using simple words and repairing after hard moments."
- `signs-your-child-may-be-ready-for-potty-training`
  - hero alt: "A simple potty set up in a calm toddler bathroom"
  - body alt: "A parent preparing a gentle potty learning space for a toddler"
  - caption: "Potty readiness is not only about age. It is about noticing a mix of physical, communication and interest signs."
- `potty-training-without-pressure`
  - hero alt: "A toddler potty set up calmly at home for toilet learning"
  - body alt: "A relaxed potty learning moment in a warm home bathroom"
  - caption: "Potty training does not need to become a battle. Accidents and pauses can be part of learning."

## Verification
- `bunx tsgo --noEmit` — must be clean.
- Playwright at 1280×1800 and 375×812 on all 4 ready Batch 3 routes: 200, one hero, one body between section 2 and 3, no mobile overflow, no medical-review pill (none flagged), sources render, related grid links only to ready slugs.
- Draft-gating: sample 2 remaining drafts still return NotFound.
- Topic pages `/toddler/behaviour-emotions` and `/toddler/potty-learning` still show the 2 published + 2 "Coming soon" (non-clickable) cards.
- Regression sweep (200 each): `/toddler`, `/toddler/behaviour-emotions`, `/toddler/potty-learning`, `/toddler/sleep`, `/toddler/development-milestones`, `/toddler/play-connection`, `/toddler/food-feeding`, `/first-year`, `/articles/complete-guide-morning-sickness`, `/pregnancy`, `/trying-to-conceive`, `/ivf`.
- Final diff scope: only `toddlerArticleImages.ts` + the 8 new `src/assets/toddler-article-*.jpg` files.

## Go/no-go
On green verification, safe to proceed to Phase 8.5 Toddler Batch 4 publishing.
