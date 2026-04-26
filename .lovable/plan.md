## Implement `/pregnancy/baby` topic landing

Build the second pregnancy topic page using the existing `PregnancyTopicPage` template. No template changes. No edits to `/pregnancy/body`, `/pregnancy`, or article pages.

### Inventory constraint (shapes the whole page)

The current article catalogue offers genuine baby-development destinations only via:

- `first-trimester-complete-guide`
- `second-trimester-complete-guide`
- `third-trimester-complete-guide`

There are no existing articles for twins/multiples, cord blood, fetal development by week, kick counts, or birth decisions. Per the carry-forward honesty rule, those groups are **omitted**, not padded with `/guidance?...` filler.

Result: a deliberately quieter page — 2 honest groups + Week-by-week bridge.

### Files to change

1. **`src/data/pregnancyTopicData.ts`** — replace the `baby: null` entry with the full config below; add `"baby"` to `LIVE_TOPIC_SLUGS`.
2. **`src/pages/pregnancy/BabyTopic.tsx`** *(new)* — thin wrapper mirroring `BodyTopic.tsx`.
3. **`src/App.tsx`** — add `<Route path="/pregnancy/baby" element={<BabyTopic />} />` next to the body route, plus the import.
4. **`src/components/pregnancy/PregnancyTopicMap.tsx`** — change the Baby topic's `mainHref` from `/guidance?topic=development` to `/pregnancy/baby`. Nothing else in the map changes.

### Page content

**Eyebrow:** `Your baby`
**Title:** `Your baby in pregnancy`

**Intro:**
> From a cluster of cells to a small person who turns toward your voice — your baby's growth across pregnancy is quieter and more astonishing than most week-by-week summaries let on. This is a steady place to follow what's developing, when the big shifts happen, and what you might start to feel along the way.

**What this topic covers** — lead + 4 bullets:
- Lead: `What this topic covers:`
- How your baby develops from the earliest weeks onward.
- The major shifts that tend to define each trimester.
- When movement begins, and how it changes as pregnancy goes on.
- The broader picture of growth, rather than a chase of weekly milestones.

**Start here (3 anchors):**
1. *First trimester: complete guide* — Where the foundations are laid, often before you can feel anything at all.
2. *Second trimester: complete guide* — The window where movement, growth, and the sense of a real person tend to arrive.
3. *Third trimester: complete guide* — How your baby finishes growing, settles, and prepares for birth.

**Subtopic groups (2 honest groups — no third invented):**

- **Early development**
  - First trimester: complete guide
- **Growing and moving** *(description: How your baby unfolds across the middle and later weeks.)*
  - Second trimester: complete guide
  - Third trimester: complete guide

Start Here intentionally overlaps with grouped links — three honest articles only, so editorial framing (Start here) and structural browse (groups) reuse them. As more baby articles ship, Start Here will diverge.

**Week-by-week bridge:**
- Line: *Your baby grows in steady, sometimes startling jumps.*
- Label: `See the week-by-week view`
- Href: `/pregnancy#week-by-week`

**Sibling topics:** included via existing template behaviour. With `"baby"` added to `LIVE_TOPIC_SLUGS`, the Body sibling page will show Baby as a live link, and Baby will show Body as a live link. The remaining four topics stay as muted "soon" labels.

**AI block:** **omitted** — `showAI: false`. The template already only renders the AI block when configured, so omission collapses cleanly with no reserved space.

**Footer:** template default `← Back to the Pregnancy Map`.

### Weak spots flagged for the next pass

- Sparser than `/pregnancy/body` — correct under the honesty rule, worth noting.
- Missing articles before this page feels fully resolved: twins/multiples, movement & kicks, cord blood / birth decisions, and fetal development by week.
- "Early development" has only one link — visually thin but honest. The next baby article should land here.

### Returns after implementation

Summary covering changed files, final intro copy, Start Here choices and rationale, final group labels, the deliberate Start Here / group overlap, AI omission, and the weak spots above.