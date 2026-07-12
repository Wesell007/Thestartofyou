# Phase 9.2c — Toddler Hub & Article UX Polish

Toddler-only visual/navigation polish. No SEO, article-copy, data-shape or non-Toddler changes.

## 1. Replace "A few quiet places to start" with real article cards
File: `src/components/toddler/ToddlerToolsResources.tsx`

- Remove the four generic resource entries pointing to `/ask?q=...`.
- Render four real ready Toddler articles by importing `toddlerArticles` from `@/data/toddlerArticleData` and `getToddlerArticleImages` from `./article/toddlerArticleImages`, picking these slugs:
  - `what-toddler-development-can-look-like`
  - `signs-your-child-may-be-ready-for-potty-training`
  - `supporting-toddler-speech-at-home`
  - `toddler-sleep-rhythms`
- Each card: hero image (from `getToddlerArticleImages(slug).hero`), article `title`, `description`, `readTime`, links to `/toddler/{topic}/{slug}`.
- Keep existing warm gradient/panel wrapper, section eyebrow "Tools & resources" replaced by "Guidance", heading "A few quiet places to start" retained, subtitle kept.
- Reuse card visual language (image-forward, arrow chip, warm palette). Keep 2-column responsive grid.
- No new image assets — the four target articles already have bespoke heros in `toddlerArticleImages.ts`.

## 2. Image-forward Toddler related guidance
Files: `src/components/toddler/article/ToddlerArticleCard.tsx`, (no change to `ToddlerArticlePage.tsx` — it already renders `ToddlerArticleCard` in a responsive grid).

- Add an image header to `ToddlerArticleCard` using `getToddlerArticleImages(article.slug)?.hero`.
- Card layout becomes: top `aspect-[16/10]` image (rounded top, `object-cover`, lazy) → existing badges/title/description/readTime footer below.
- Fallback: if no mapped image, fall back to the topic image via a small map (`toddler-topic-{topic}.jpg.asset.json` already imported once). Guarantees no image-less ready cards.
- Preserve `Coming soon` and `Medically reviewed` badges, hover-lift, focus ring, warm Toddler gradient. Keep clickable-full-card behaviour and existing draft (non-ready) handling.

## 3. "Where to next" rework
File: `src/components/toddler/ToddlerPathways.tsx`

Replace the three pathways with:
- Back to First Year → `/first-year` (eyebrow "Previous stage")
- Continue to Family life → `/family` (eyebrow "What's next")
- Keep your journey → `/my-journey` (eyebrow "Journal") — this is the live journal route in `App.tsx`.

Remove "Explore Toddler topics". Preserve existing card visuals and grid.

## 4. Final CTA — fix, don't remove
File: `src/components/toddler/ToddlerFinalCTA.tsx`

Keep the section but make both buttons work:
- "Ask a toddler question" → change `Link to="/ask?q=toddler"` to `Link to="/ask"` so the Ask page opens with a blank search bar (Ask page already themes per context via its own logic; we pass no forced query). Toddler-branded surround remains via section styling.
- "Go to your toddler's age" → replace `<Link to="#toddler-age">` with a native `<a href="#toddler-age">` that also calls `document.getElementById('toddler-age')?.scrollIntoView({ behavior: 'smooth' })` on click. The anchor `id="toddler-age"` already exists on `ToddlerAgeNav`. This fixes the current no-op behaviour caused by react-router `Link` swallowing hash-only navigation on same route.

No copy changes to headings/subtext beyond button targets.

## 5. Guardrails
- Do not touch: `toddlerArticleData.ts` (only read), SeoHead, routes, article body copy, other stage files.
- No new image assets generated.
- `HubArticleView` unchanged.

## Verification
- `bunx tsgo --noEmit`.
- Playwright at 1280×1800 and 375×812: `/toddler`, four article routes from step 1, plus `/toddler/development-milestones/what-toddler-development-can-look-like`, `/toddler/speech-language/when-to-ask-about-speech-delay`, `/toddler/sleep/toddler-sleep-rhythms`, `/toddler/behaviour-emotions/understanding-toddler-tantrums`, `/toddler/development-milestones/when-milestones-feel-different`.
- Confirm: four real image-forward article cards on hub, related guidance cards on article pages show images, "Where to next" links resolve, Ask button lands on `/ask` blank state, "Go to your toddler's age" scrolls to `#toddler-age`.
- Regression: `/family`, `/family/growing-families/preparing-for-another-baby`, `/pregnancy`, `/pregnancy/week/12`, `/first-year`, `/trying-to-conceive`, `/ivf`, `/articles/complete-guide-morning-sickness`.

## Files
- Edit: `ToddlerToolsResources.tsx`, `ToddlerPathways.tsx`, `ToddlerFinalCTA.tsx`, `article/ToddlerArticleCard.tsx`.
- Read-only: `toddlerArticleData.ts`, `toddlerArticleImages.ts`, `Toddler.tsx`, `HubArticleView.tsx`, `App.tsx`.
