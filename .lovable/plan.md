## Phase 8.4 — Toddler Batch 3 Publishing (Behaviour + Potty)

Publish four Toddler articles by replacing their draft objects in `src/data/toddlerArticleData.ts`. No other files touched.

### Scope

Only edit: `src/data/toddlerArticleData.ts`.

Do not touch: image mappings, components, routes, topic pages, cards, SEO, or any non-Toddler stage files.

### Articles to publish (status: draft → ready)

1. **understanding-toddler-tantrums** (topic: behaviour-emotions)
2. **helping-your-toddler-with-big-feelings** (topic: behaviour-emotions)
3. **signs-your-child-may-be-ready-for-potty-training** (topic: potty-learning)
4. **potty-training-without-pressure** (topic: potty-learning)

Keep existing `slug`, `topic`, `title`, `description`. Adjust `readTime` only if the final length clearly requires it. `medicallyReviewed: false` unless the current draft is already flagged true.

### Shared article standard

- 7 sections, 2 short paragraphs each
- 5–6 key takeaways
- 3 related slugs (only pointing to Batch 1, 2 or 3 ready slugs)
- 2–4 credible UK-first sources with URLs (NHS, NHS Start for Life, NSPCC, BBC Tiny Happy People, Family Lives, ERIC where suitable)
- British English, no em dashes, calm and parent-first
- No diagnosis, no medication advice, no invented stats, no invented reviewer, no fear or shame-based wording, no punishment framing
- Careful "ask health visitor / GP / local service" wording included in the final section of: `understanding-toddler-tantrums`, `helping-your-toddler-with-big-feelings`, `potty-training-without-pressure`

### Section outlines

**understanding-toddler-tantrums**: what tantrums can be about, why toddlers struggle with big feelings, triggers (tired/hungry/transitions), staying close without giving in, what helps during a tantrum, what helps after, when behaviour worries you (careful wording).

**helping-your-toddler-with-big-feelings**: big feelings are part of toddlerhood, naming feelings simply, staying close and steady, helping without fixing everything, routines/sleep/hunger, repair after hard moments, when to ask for support (careful wording).

**signs-your-child-may-be-ready-for-potty-training**: readiness is not just age, staying dry for longer, awareness of wees and poos, interest in the toilet/potty, following simple instructions, emotional readiness and cooperation, starting gently.

**potty-training-without-pressure**: why pressure makes it harder, creating a simple routine, keeping language calm, handling accidents without shame, pausing if not ready, nursery/childcare/days out, when to ask for advice (careful wording).

### Related slug map

- understanding-toddler-tantrums → helping-your-toddler-with-big-feelings, building-connection-through-everyday-play, when-milestones-feel-different
- helping-your-toddler-with-big-feelings → understanding-toddler-tantrums, building-connection-through-everyday-play, toddler-sleep-rhythms
- signs-your-child-may-be-ready-for-potty-training → potty-training-without-pressure, what-toddler-development-can-look-like, making-mealtimes-feel-calmer
- potty-training-without-pressure → signs-your-child-may-be-ready-for-potty-training, helping-your-toddler-with-big-feelings, making-mealtimes-feel-calmer

### Verification

- `bunx tsgo --noEmit` clean
- Counts: 16 total, 12 ready, 4 draft
- Playwright 200 on all four new ready routes with correct H1; NotFound on two sampled remaining drafts
- Topic pages: four new cards render as clickable ready cards; remaining drafts still show "Coming soon"
- Related grids only reference ready slugs
- Regression sweep: `/first-year`, `/family`, `/pregnancy`, `/trying-to-conceive`, `/ivf` still 200
- Only `src/data/toddlerArticleData.ts` changed

### Deliverable summary returned

Files edited, four slugs published, total/ready/draft counts, per-article section and takeaway counts, per-article sources with URLs, per-article related slugs, careful-wording check on the three support-oriented articles, draft-gating result, route verification, topic card verification, tsgo result, and go/no-go for Phase 8.4b image mappings.
