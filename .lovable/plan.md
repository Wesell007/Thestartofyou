## Phase 8.3 — Toddler Batch 2 Publishing (Sleep + Development)

Publish four Toddler articles by replacing their draft objects in `src/data/toddlerArticleData.ts`. No other files touched.

### Scope

Only edit: `src/data/toddlerArticleData.ts`.

Do not touch: image mappings, components, routes, topic pages, cards, SEO, or any non-Toddler stage files.

### Articles to publish (status: draft → ready)

1. **toddler-sleep-rhythms** (topic: sleep)
2. **bedtime-battles-and-night-waking** (topic: sleep)
3. **what-toddler-development-can-look-like** (topic: development-milestones)
4. **when-milestones-feel-different** (topic: development-milestones)

Keep existing `slug`, `topic`, `title`, `description`. Only adjust `readTime` if final length clearly requires it. `medicallyReviewed: false` unless the current draft is already flagged true.

### Shared article standard

- 7 sections, 2 short paragraphs each
- 5–6 key takeaways
- 3 related slugs (only pointing to Batch 1 + Batch 2 ready slugs)
- 2–4 credible UK-first sources with URLs (NHS, NHS Start for Life, The Sleep Charity, NCT, BBC Tiny Happy People, NSPCC; CDC only if UK source insufficient)
- British English, no em dashes, calm and parent-first
- No diagnosis, no medication advice, no invented stats, no invented reviewer, no fear or shame-based wording
- Sleep and "when milestones feel different" articles include the careful "ask health visitor / GP / local service" wording in the final section

### Section outlines

**toddler-sleep-rhythms**: why sleep changes, naps and daily rhythm, bedtime cues and wind-down, separation and reassurance, early waking and unsettled nights, keeping routines gentle, when to ask for support.

**bedtime-battles-and-night-waking**: why bedtime becomes difficult, separation at night, boundaries without harshness, night waking and reassurance, over/undertiredness, keeping bedtime realistic, when sleep feels unmanageable (careful wording). Avoid sleep-training prescriptions, controlled-crying instructions, rigid rules, quick-fix promises.

**what-toddler-development-can-look-like**: development is broad, movement, communication, play and problem-solving, independence and everyday skills, emotions and social development, watching patterns over time.

**when-milestones-feel-different**: why milestones can feel different, uneven development is common, patterns not moments, comparison with other peers, trusting concern without panic, what to note before asking for advice, when to ask for support (careful wording). Avoid diagnosis, autism/ADHD speculation, fixed deadlines, "wait and see" dismissal.

### Related slug map (all point to Batch 1 or Batch 2 ready slugs only)

- toddler-sleep-rhythms → bedtime-battles-and-night-waking, building-connection-through-everyday-play, what-toddler-development-can-look-like
- bedtime-battles-and-night-waking → toddler-sleep-rhythms, building-connection-through-everyday-play, simple-play-ideas-for-toddlers
- what-toddler-development-can-look-like → when-milestones-feel-different, simple-play-ideas-for-toddlers, building-connection-through-everyday-play
- when-milestones-feel-different → what-toddler-development-can-look-like, simple-play-ideas-for-toddlers, building-connection-through-everyday-play

### Verification

- `bunx tsgo --noEmit` clean
- Counts: 16 total, 8 ready, 8 draft
- Playwright 200 on all four new ready routes; NotFound on 2 sampled remaining drafts
- Topic pages: 4 new cards clickable; other drafts still show "Coming soon" and non-clickable
- Related grids only reference ready slugs
- Regression sweep: /first-year, /family, /pregnancy, /trying-to-conceive, /ivf, /pregnancy/[known article] still 200
- Only `src/data/toddlerArticleData.ts` changed

### Deliverable summary returned to user

Files edited, four slugs published, total/ready/draft counts, per-article section and takeaway counts, per-article sources with URLs, per-article related slugs, careful-wording check for the two support-oriented articles, draft-gating result, route verification, topic card verification, tsgo result, and go/no-go for Phase 8.3b image mappings.
