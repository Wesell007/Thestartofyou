## Phase 8.3b — Toddler Batch 2 Image Mappings (Sleep + Development)

Only edit `src/components/toddler/article/toddlerArticleImages.ts` and add 6 new bespoke image files under `src/assets/`. No article copy, status, sources, SEO, routes, components, cards, topic pages, or non-Toddler files touched.

### Reuse vs new (mirrors Batch 1 mix)

- Reuse `toddler-topic-sleep.jpg.asset.json` as hero for `toddler-sleep-rhythms` — already reads as calm evening toddler bedroom.
- Reuse `toddler-topic-development.jpg.asset.json` as hero for `what-toddler-development-can-look-like` — already reads as a toddler exploring calmly.
- Generate 6 new bespoke images (1536×1024, warm natural light, realistic parent/toddler moments, emotionally grounded, no logos, no text, no distress).

### Per-article mapping

| Slug | Hero | Body |
|---|---|---|
| toddler-sleep-rhythms | reuse `toddler-topic-sleep.jpg.asset.json` | new `toddler-article-sleep-rhythms-body.jpg` |
| bedtime-battles-and-night-waking | new `toddler-article-bedtime-hero.jpg` | new `toddler-article-bedtime-body.jpg` |
| what-toddler-development-can-look-like | reuse `toddler-topic-development.jpg.asset.json` | new `toddler-article-development-body.jpg` |
| when-milestones-feel-different | new `toddler-article-milestones-hero.jpg` | new `toddler-article-milestones-body.jpg` |

All body entries use `afterSectionIndex: 1`.

### Alt text and captions (verbatim from brief)

- **toddler-sleep-rhythms** — hero alt: "A toddler settling calmly during a gentle bedtime routine". body alt: "A quiet toddler bedroom prepared for sleep in soft evening light". caption: "Toddler sleep can change as development, naps, routines and reassurance needs shift."
- **bedtime-battles-and-night-waking** — hero alt: "A parent gently reassuring a toddler at bedtime". body alt: "A calm bedtime moment with a toddler and parent in soft light". caption: "Bedtime can feel hard when toddlers need reassurance, boundaries and rest all at once."
- **what-toddler-development-can-look-like** — hero alt: "A toddler exploring through play in a calm home setting". body alt: "A toddler practising everyday skills with a parent nearby". caption: "Toddler development often shows up through movement, play, communication, independence and everyday curiosity."
- **when-milestones-feel-different** — hero alt: "A parent calmly watching their toddler play at their own pace". body alt: "A toddler playing quietly with support nearby". caption: "When milestones feel different, it can help to notice patterns over time and ask for advice if something worries you."

Each new map entry preceded by the exact `// bespoke future:` comment from the brief.

### Image prompts (all 1536×1024, warm natural light, realistic, calm, premium, no logos, no text, no distress)

1. **toddler-article-sleep-rhythms-body.jpg** — Quiet toddler bedroom prepared for sleep in soft evening light: small bed with a soft blanket and a comfort toy, low warm lamp glow, curtains drawn with a hint of dusk, tidy but lived-in.
2. **toddler-article-bedtime-hero.jpg** — Parent sitting on the floor beside a toddler bed reading a picture book quietly to a settled toddler in pyjamas, low warm lamp light, reassuring and calm.
3. **toddler-article-bedtime-body.jpg** — Parent's hand resting gently on a settled toddler's back in bed, soft blanket, dim warm light, peaceful reassurance, no visible distress.
4. **toddler-article-development-body.jpg** — Toddler at home stacking wooden blocks on a rug while a parent kneels nearby watching calmly, warm daylight through a window.
5. **toddler-article-milestones-hero.jpg** — Parent sitting on a sofa observing their toddler playing on the rug at their own pace, warm daylight, gentle and non-anxious.
6. **toddler-article-milestones-body.jpg** — Toddler playing quietly with a simple wooden toy on the floor, parent's legs and hands visible nearby offering quiet presence, warm home light.

### File-level changes to `toddlerArticleImages.ts`

- Add 2 new asset-pointer imports (`toddler-topic-sleep.jpg.asset.json`, `toddler-topic-development.jpg.asset.json`) plus the 2 new hero JPG imports and 4 new body JPG imports.
- Extend `toddlerArticleImageMap` with 4 new slug entries in the same shape as Batch 1.
- Leave existing Batch 1 entries, interface, and `getToddlerArticleImages` untouched.

### Verification

- `bunx tsgo --noEmit` clean.
- Playwright 1280×1800 and 375×812 on all 4 ready routes: 200 status, exactly one hero and one body image per article with correct alt text, body between section 2 and section 3, no mobile horizontal overflow, no broken image `naturalWidth = 0` for local bespoke JPGs (known `/__l5e/` false-positive tolerated for the 2 reused CDN pointers).
- Medically reviewed pill absent on all four (none flagged as reviewed).
- Sources block renders; related grid contains only ready Toddler slugs.
- Draft-gating: sample 2 remaining Toddler drafts return NotFound.
- Regression sweep: `/toddler`, `/toddler/sleep`, `/toddler/development-milestones`, `/toddler/play-connection`, `/toddler/food-feeding`, `/first-year`, `/articles/complete-guide-morning-sickness`, `/pregnancy`, `/trying-to-conceive`, `/ivf` all 200.
- Only changed files: `src/components/toddler/article/toddlerArticleImages.ts` plus the 6 new `src/assets/toddler-article-*.jpg` files.

### Deliverable summary returned

Files edited, assets reused, new assets added, per-article hero + body + alt + caption, desktop and mobile route verification, mobile overflow result, source rendering result, related guidance result, draft-gating result, tsgo result, regression result, and go/no-go for Phase 8.4 Toddler Batch 3 publishing.
