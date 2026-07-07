## Phase 8.2 — Toddler Batch 1 Publishing (Play + Food)

Scope: single-file edit to `src/data/toddlerArticleData.ts`. Replace the 4 draft objects for Play + Food slugs with full ready articles. No component, route, image, or SEO changes. Other 12 drafts untouched.

### Slugs to publish (topic / slug unchanged)

1. `play-connection` / `simple-play-ideas-for-toddlers`
2. `play-connection` / `building-connection-through-everyday-play`
3. `food-feeding` / `picky-eating-in-toddlers`
4. `food-feeding` / `making-mealtimes-feel-calmer`

### Shared shape (per article)

- `status: "ready"`
- `medicallyReviewed: false` for all four (none of these four drafts were flagged for review)
- `title`, `description`, `slug`, `topic` kept
- `readTime` kept unless final length clearly warrants a bump (target: keep as-is)
- `intro`: 1 short paragraph, calm and parent-first
- `sections`: exactly 7, each with 2 short paragraphs in `body: string[]`
- `keyTakeaways`: 5–6 items
- `relatedSlugs`: only the other 3 slugs from this batch (all 4 become ready together, so every article can safely have 3 in-batch ready siblings)
- `sources`: 2–4 credible UK sources per article (see per-article list)
- `lastUpdated: "2026-07"`
- No `reviewedBy` (not medically reviewed)

### Tone and safety rules applied to all four

British English. Calm, premium, emotionally grounded. Simple human writing. Parent-first. No em dashes anywhere. No invented stats, no diagnosis, no treatment instructions, no shame, no fear framing, no strict feeding rules, no calorie/portion targets, no reward/punishment framing. Keyword themes woven in naturally where they fit — never stuffed.

### Article 1 — `simple-play-ideas-for-toddlers` (play-connection)

Section headings (in order):
1. Why simple play matters
2. Everyday objects and safe exploring
3. Movement play at home and outside
4. Imagination and pretend play
5. Music, rhythm and repeated games
6. Play when you have very little time
7. Following your toddler's lead

Related: `building-connection-through-everyday-play`, `making-mealtimes-feel-calmer`, `picky-eating-in-toddlers`.

Sources (2–3): NHS Start for Life (play and learning), BBC Tiny Happy People (toddler activity guidance), Play Scotland (value of play).

### Article 2 — `building-connection-through-everyday-play` (play-connection)

Section headings:
1. Connection does not need perfect play
2. Getting down to their level
3. Letting your toddler lead
4. Repeated games and shared jokes
5. Play woven into daily routines
6. Repairing after hard moments
7. When play feels difficult

Related: `simple-play-ideas-for-toddlers`, `making-mealtimes-feel-calmer`, `picky-eating-in-toddlers`.

Sources (2–3): NHS Start for Life (bonding and communication), BBC Tiny Happy People (chat, play, read), NSPCC (secure attachment / responsive care).

### Article 3 — `picky-eating-in-toddlers` (food-feeding)

Section headings:
1. Why picky eating can happen
2. Appetite changes in toddlerhood
3. Keeping pressure low
4. Repeated exposure without force
5. Offering safe variety
6. Mealtime emotions
7. When to ask for support

The final section includes the required safety line, worded exactly:

> If your toddler is losing weight, seems unwell, has feeding difficulties, has very restricted eating or you are worried about their growth, ask your health visitor, GP or appropriate local service for advice.

Related: `making-mealtimes-feel-calmer`, `simple-play-ideas-for-toddlers`, `building-connection-through-everyday-play`.

Sources (3–4): NHS (fussy eating in toddlers), NHS Start for Life (toddler eating), First Steps Nutrition Trust (eating well: the toddler years), British Dietetic Association (food fact sheet: toddlers).

### Article 4 — `making-mealtimes-feel-calmer` (food-feeding)

Section headings:
1. Why toddler mealtimes can feel hard
2. Lowering pressure around food
3. Simple routines that help
4. Sitting together when you can
5. Managing mess and short attention spans
6. What to do when food is refused
7. Keeping perspective

Final section includes the required safety line, worded exactly:

> If mealtimes are becoming very stressful, your toddler is eating a very limited range, growth is a concern or feeding feels difficult to manage, ask your health visitor, GP or appropriate local service for advice.

Related: `picky-eating-in-toddlers`, `building-connection-through-everyday-play`, `simple-play-ideas-for-toddlers`.

Sources (3–4): NHS (help your child develop healthy eating habits / fussy eaters), NHS Start for Life (toddler meals), First Steps Nutrition Trust, British Dietetic Association.

### Implementation detail

In `src/data/toddlerArticleData.ts`, locate each of the 4 raw objects and replace with the full expanded object (intro, 7 sections, 5–6 takeaways, related, sources, lastUpdated, `status: "ready"`). The `withToddlerDefaults` wrapper stays untouched — since these objects now carry `intro`, `sections`, `keyTakeaways`, `relatedSlugs`, the `??` fallbacks are skipped for them. The 12 other drafts continue to receive placeholder defaults exactly as today.

### Verification

- `bunx tsgo --noEmit` clean.
- Playwright, localhost:8080, 1280×1800:
  - 4 ready article routes → 200 and render full body (no "placeholder while the full article is being written" text).
  - 2+ sampled draft routes (e.g. `/toddler/health-safety/when-to-call-the-gp`, `/toddler/speech-language/when-to-ask-about-speech-delay`) → NotFound.
  - `/toddler/play-connection` and `/toddler/food-feeding`: 2 cards each are now clickable `<a>` (no "Coming soon"), other topics still show "Coming soon" on their drafts.
- Diff scope: only `src/data/toddlerArticleData.ts` changed.

### Summary deliverable

Files edited (1), 4 slugs published, Toddler totals (16 / 4 ready / 12 draft), per-article section counts (7 each), takeaway counts (5–6), source counts (2–4), related slugs listing, safety-line presence for both food articles, draft-gating still enforced, route + topic-card verification, tsgo result, and go/no-go for Phase 8.2b image mappings.
