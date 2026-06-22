
# TTC Pass 3 — Topic + Subtopic Page Premium Uplift (approved)

Scope strictly limited to:
- `src/components/ttc/TTCTopicPage.tsx`
- `src/components/ttc/TTCSubtopicPage.tsx`

No edits to TTC hub, IVF, Pregnancy, articles, navbar, weeks, shared components, or `ttcTopicData.ts` (schema + copy untouched). No new image assets — existing `src/assets/ttc-*.jpg`, `week*.jpg`, and the two sprig PNGs only.

Benchmark: Pregnancy topic-page system. Identity: cooler, greener, lighter, earlier-stage, more exploratory.

---

## 1. Shared TTC theme + image system (local to each template)

Inside both templates:
- `TTC_THEME` map keyed by all 10 TTC slugs. Each entry: cool `accentHsl` (greens / sages / slate-sages — overrides any warm terracotta/rose values currently in `ttcTopicData.ts`), softer `tintHsl`, two sprigs (`topic-mini-sprig.png`, `topic-wildflower-sprig.png`), and a lucide sibling icon (Sun, Leaf, Heart, ShieldCheck, Users, Clock, Calendar, TestTube, Hourglass, Activity).
- `HREF_IMAGE_MAP`: hrefs → existing TTC photography (cycle, timing, waiting, pregnancy-tests, faint-positive, chemical, trying-again, preconception, fertility-hero, ivf-treatment, male, age, conditions, lifestyle, journey, tests-women, tests-men, fertility-appointment, week2-ovulation, week1-cycle, week3-fertilisation).
- `TOPIC_FALLBACK` per slug.
- `resolveImage(href, explicit?)` helper.

## 2. Topic-page hero
- Eyebrow `The TTC Guide · {eyebrow}`, serif headline `text-[2rem] sm:text-[2.5rem] md:text-[3rem] lg:text-[3.4rem]`.
- Square hero image `aspect-1/1 rounded-[2rem]`, cooler radial halo at `tintHsl/0.65`, top wash `tintHsl/0.40`.
- Two restrained per-theme sprigs (sprigA bottom-left visible from sm+, sprigB top-right md+ only).
- Vertical rhythm `pt-8 sm:pt-12 md:pt-16 pb-20 md:pb-32`.

## 3. Subtopic-page hero (clearly nested, lighter)
- Eyebrow `TTC · {parent.eyebrow}`, serif `text-[1.85rem] sm:text-[2.25rem] md:text-[2.6rem]`.
- Right column narrower (`md:col-span-5`), `rounded-[1.75rem]` with hairline border, single small sprigB only.
- Lower halo opacity and top wash (`tintHsl/0.35`).

## 4. "What this topic covers" card
- Topic: overlapping pull-up `-mt-12 md:-mt-20`, `rounded-[2rem]`, padded `p-6 sm:p-10 md:p-14`, single sprig top-left, `LeafDivider`, optional italic lead, 2-col check bullets.
- Subtopic: same composition at `rounded-[1.75rem]`, `p-6 sm:p-8 md:p-10`, single subtle top-right sprig.

## 5. Start here cards — editorial w/ photo
- `Link` card: `rounded-2xl overflow-hidden border`, photo top at `aspect-[4/3]`, accent mix-blend tint `opacity-[0.05]` (cooler than Pregnancy's 0.06), hover image `scale-105` + 1px lift on card.
- Title serif, sub-copy, "Read the guide →" in accent.
- Grid: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`.

## 6. Grouped clusters — curated, not busy
- Outer cluster surface card. Each cluster header: small sprig icon (24–28px, alternating per-theme) + serif label; optional italic description indented under the icon.
- Each row: 40–44px rounded thumb (border in `accentSoft`) + label + chevron in accent.
- **Caps & dedupe**: max 4 links per cluster; any link present in Start here is filtered out of clusters on that page; if a cluster empties after filtering, it's omitted.
- Topic clusters in 3-col on `lg`, 2-col on `sm`; subtopic in 2-col on `md`, 1-col below.
- Curation note (italic serif) preserved when present.

## 7. Sibling / supporting navigation
- Topic: chip row of pillar siblings — per-sibling icon disc + italic serif label + chevron, hover lift + brand shadow.
- Subtopic: keeps the existing "Continue in the wider {parent}" CTA on top, followed by a chip row of other subtopics using the same chip system (icon disc + label + chevron). Smaller chip sizing than topic page.

## 8. AI bridge & back link
- AI bridge kept; rhythm standardised to `py-14 md:py-20`, tint `tintHsl/0.45`.
- Back link unchanged.

## 9. TTC identity guardrails (throughout)
- All accents constrained to greens / sages / slate-sages / soft teal. No terracotta, rose, amber.
- Tints cooler and lighter than Pregnancy (lower saturation, mid-90s lightness).
- One main decorative gesture per section (single sprig per card; halo + sprigs only on hero).
- Topic/subtopic pages stay quieter than the TTC hub overall — same family, no extra ornament.

## 10. Responsive

- **Desktop ≥1024px**: 12-col hero, Start here 3-col, clusters 3-col (topic) / 2-col (subtopic), sprigs visible.
- **Tablet 768–1023px**: Start here drops to 2-col, clusters to 2-col (topic) / 2-col (subtopic), thumbs 40px, hero still side-by-side via existing `md:` grid, sprigs softened/hidden where they'd crowd (sprigB hidden until `md`, halo opacity reduced).
- **Mobile <768px**: image-first stacking via `order-` pattern, Start here 1-col, clusters 1-col, thumbs 40px, sibling chips wrap, sprigs hidden below `sm`, hero halo dialled down to avoid heaviness.

## 11. Duplication guardrail
- Start here = 3 cards (already the shape in data).
- Clusters capped at 4 links each.
- Any href in Start here is filtered out of all clusters on the same page.
- Sibling chip rows never include the current page.

## 12. Files touched
- `src/components/ttc/TTCTopicPage.tsx`
- `src/components/ttc/TTCSubtopicPage.tsx`

Nothing else. No data changes. No new assets.

## 13. Return after build
A. Changed files
B. Topic-page hero changes
C. Subtopic-page hero changes
D. "What this topic covers" changes
E. Start here card changes
F. Grouped cluster changes
G. Sibling navigation changes
H. New TTC image/thumbnail/illustration system
I. Desktop handling
J. iPad/tablet handling
K. Mobile handling
L. Confirmation TTC matches Pregnancy-level premium quality while staying clearly TTC
