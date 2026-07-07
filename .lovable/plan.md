## Phase 8.2b — Toddler Batch 1 Image Mappings (Play + Food)

Single-file edit to `src/components/toddler/article/toddlerArticleImages.ts`, plus 6 new bespoke images generated into `src/assets/`. No other files changed.

### Approach

Each article gets one hero + one body image (body placed at `afterSectionIndex: 1`, i.e. between section 2 and section 3). To avoid two Play articles or two Food articles sharing the same hero, I reuse the topic asset once per topic and generate fresh bespoke work for the rest. Every image is unique across the batch.

### Mapping

| Article | Hero | Body |
|---|---|---|
| `simple-play-ideas-for-toddlers` | **reuse** `src/assets/toddler-topic-play.jpg` | **new** `src/assets/toddler-article-simple-play-body.jpg` |
| `building-connection-through-everyday-play` | **new** `src/assets/toddler-article-connection-hero.jpg` | **new** `src/assets/toddler-article-connection-body.jpg` |
| `picky-eating-in-toddlers` | **reuse** `src/assets/toddler-topic-food.jpg` | **new** `src/assets/toddler-article-picky-eating-body.jpg` |
| `making-mealtimes-feel-calmer` | **new** `src/assets/toddler-article-calm-mealtime-hero.jpg` | **new** `src/assets/toddler-article-calm-mealtime-body.jpg` |

### Alt text and captions

**1. `simple-play-ideas-for-toddlers`**
- Hero alt: "A toddler playing with simple toys in a calm home setting"
- Body alt: "A parent and toddler sharing a simple everyday play moment"
- Body caption: "Simple play does not need to be complicated. Toddlers often learn most through repeated, ordinary moments."
- `// bespoke future: toddler exploring simple play at home with a parent nearby in warm natural light`

**2. `building-connection-through-everyday-play`**
- Hero alt: "A parent and toddler sharing a gentle play moment at home"
- Body alt: "A toddler leading play while a parent joins in nearby"
- Body caption: "Connection is often built through small repeated moments, not perfect activities."
- `// bespoke future: parent and toddler connecting through simple everyday play in a calm home setting`

**3. `picky-eating-in-toddlers`**
- Hero alt: "A toddler sitting calmly at the table during a simple mealtime"
- Body alt: "A small toddler meal served calmly without pressure"
- Body caption: "Picky eating can feel stressful, but calm repetition and low pressure can help mealtimes feel more manageable."
- `// bespoke future: calm toddler mealtime with simple food and no pressure in a warm home setting`

**4. `making-mealtimes-feel-calmer`**
- Hero alt: "A parent and toddler sharing a calm mealtime at home"
- Body alt: "A toddler exploring food during a relaxed family meal"
- Body caption: "A calmer mealtime is not about a perfect plate. It is about reducing pressure and finding a rhythm that works for your family."
- `// bespoke future: relaxed parent and toddler mealtime at home, warm and realistic without pressure`

### New image generation prompts (fast tier, JPG, 1536×1024)

All prompts share: **calm, premium, warm natural light, realistic photography, parent-centred, toddler-centred, emotionally grounded, not clinical, not staged, no logos, no on-image text.**

1. `toddler-article-simple-play-body.jpg` — "A parent and toddler on a soft rug at home playing with simple wooden blocks and a couple of everyday household objects, warm natural window light, calm, unposed, real family home."
2. `toddler-article-connection-hero.jpg` — "A parent sitting cross-legged on the living room floor at eye level with their toddler, sharing a gentle play moment, warm morning light, quiet and connected, real home setting."
3. `toddler-article-connection-body.jpg` — "A toddler leading pretend play with a soft toy while a parent joins in nearby on the floor, soft daylight, warm neutral home, unstaged."
4. `toddler-article-calm-mealtime-hero.jpg` — "A parent and toddler sharing a calm mealtime at a wooden kitchen table with simple everyday food, natural light, warm and unposed, realistic family setting."
5. `toddler-article-picky-eating-body.jpg` — "A small toddler-sized plate with simple everyday food on a wooden table beside a small cup of water, calm, no hands in frame, warm daylight, uncluttered."
6. `toddler-article-calm-mealtime-body.jpg` — "A toddler in a high chair calmly exploring a piece of food with their fingers, parent's hand resting gently on the table nearby, warm natural light, quiet and unhurried."

### File shape

Extend `toddlerArticleImageMap` in `src/components/toddler/article/toddlerArticleImages.ts` with 4 entries in the pattern already established (mirrors First Year). Add clean imports at the top of the file, one per used asset, no duplicates, no unused. Helper `getToddlerArticleImages` and interface types stay untouched.

### Untouched

Article copy, sources, status, related slugs, cards, topic pages, routes, SEO, all Pregnancy / TTC / IVF / Family / First Year files.

### Verification

- `bunx tsgo --noEmit` clean.
- Playwright desktop 1280×1800 + mobile 375×812 on all 4 ready routes:
  - 200 status; exactly 1 hero image and 1 body image with correct alt text.
  - No horizontal overflow on mobile (measure `scrollWidth <= clientWidth`).
  - No broken images (`naturalWidth > 0` on all `<img>` in the article body).
  - "Medically reviewed" pill absent.
  - Sources block renders.
  - Related grid shows only ready siblings.
- 2 sampled draft routes still NotFound.
- Regression sweep: `/toddler`, `/toddler/play-connection`, `/toddler/food-feeding`, `/first-year`, `/articles/complete-guide-morning-sickness`, `/pregnancy`, `/trying-to-conceive`, `/ivf` → all 200.

### Deliverable summary

Files edited, assets reused (2), new assets added (6, listed with prompts), per-article hero + body paths + alt + caption, desktop + mobile verification, mobile-overflow result, sources + related + draft-gating status, tsgo result, regression result, and go/no-go for Phase 8.3 (Batch 2).
