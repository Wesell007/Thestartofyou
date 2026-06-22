# TTC Hub — Final Refinement (pre-Pass 3)

Scope: `src/pages/TTCHub.tsx` only. No other files. No image treatment. No changes to topic/subtopic pages, IVF, Pregnancy, articles, navbar, weeks, or shared components.

---

## 1. TTC AI card — premium uplift (`AISupport`, ~lines 423–472)

- Outer band: parchment `py-16 md:py-24` with a soft radial sage wash at top so the card feels seated.
- Inner editorial card (`max-w-3xl`, centred): layered gradient surface (card → stage-ttc/0.22), sage hairline border, multi-layer shadow (inset top highlight + soft outer sage drop). TTC sprig top-right at ~45% opacity, hidden on mobile.
- Inner hierarchy:
  - Eyebrow stays **"AI support"**.
  - Serif h2 unchanged. Sub-copy tightened: *"Calm, practical guidance on ovulation, cycle tracking, testing, fertility — and what to do next."*
  - Thin centred hairline divider beneath sub-copy.
  - Small uppercase tracked label **"Ask the guide"** above the input — frames the action zone.
- Search input: shared `AISearchBar` reused as-is. Wrapped in a soft framed parchment well. Pass `suggestions={[]}` and render TTC chips below ourselves.
- Premium TTC chip row — **all 5 prompts kept** (per guardrail): two-tone gradient pills (card → sage tint), hairline sage border, inset highlight + soft shadow, 6px sage dot, min-height 36px, hover deepens gradient/border + 1px lift. Each chip navigates to `/ask?q=…&ctx=Trying%20to%20conceive`.
- Footer disclaimer kept quiet, unchanged copy.

## 2. Supporting guides — premium text-led refinement (~lines 839–930)

Still secondary to pillars but warm and curated, never flat. No images.

- Section header: stacks on tablet to avoid cramped header. Eyebrow + serif h3 + lead description.
- **Two clusters** with small italic serif sub-labels:
  - **Timing & testing** → `cycle-tracking`, `two-week-wait`, `pregnancy-tests`
  - **Fertility & health** → `age-and-fertility`, `male-fertility`, `ivf-and-treatment`, `conditions`
- Card chrome (demoted but warm):
  - Replace medallion + generic "GUIDE" eyebrow with a small uppercase **topical tag** per cluster (TIMING / TESTING / HEALTH / SUPPORT) in sage accent, plus a tiny 12–14px inline icon next to the title.
  - Remove corner radial tint (currently echoes pillar cards).
  - Surface: `bg-card/70`, hairline sage border, soft single-layer shadow. Hover: border deepens, 1px lift, subtle title underline reveal.
  - Replace bottom-divider "Read guide →" row with an inline hover arrow next to the title.
- Typography uplift: title serif `text-[1.05rem]` leading-snug; description bumped to `text-[13px]` `leading-[1.7]`, no `line-clamp`.
- Spacing: section `mt-24 md:mt-28`, card padding `p-6 sm:p-7`, grid gap `gap-5 md:gap-6`.
- **Understated bridge line** between Core topics and Supporting guides: small centred italic serif: *"and a wider library to go deeper"*.
- **Understated closing line** below the grid: italic serif *"More routes will be added as the guide grows."*.

## 3. Small TTC hub refinements (audit)

- Standardise non-hero sections to `py-16 md:py-24` (currently mixed).
- Tiny spacing/seam adjustment between Hero and WhatThisCovers — done from TTCHub side only.
- Reassurance: light typographic polish only (leading, italic weight) — no layout change.
- Mobile JourneyTimeline: small sage gradient stripe on the left of stacked nodes so the "you are here" pulse doesn't feel orphaned without the desktop dotted line.

## 4. Desktop / iPad / mobile

- Desktop ≥1024px: Supporting guides 3-col with cluster sub-labels above each row. AI card centred `max-w-3xl` with full layered treatment + sprig.
- Tablet 768–1023px: Supporting guides 2-col, cluster sub-labels stack above each pair, header stacks vertically. AI card padding `px-10 py-12`, sprig at lower opacity, chips wrap to 2 rows.
- Mobile <768px: single-col supporting guides at `p-5`, cluster labels left-aligned. AI card: sprig hidden, edge-padded, chips full-wrap with 8px gaps and ≥36px tap targets. No images = no clarity risk.

## 5. Files touched

- `src/pages/TTCHub.tsx` only. Shared `AISearchBar` untouched.

## 6. Out of scope

No Pass 3. No TTC topic/subtopic page edits. No IVF, Pregnancy, articles, navbar, weeks, shared component changes. Pause for review after implementation.
