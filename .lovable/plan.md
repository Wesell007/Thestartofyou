## Phase 9.12b.1 — Ovulation Topic Visual Polish

Two visual issues on `/trying-to-conceive/ovulation`:
1. Multiple cards and article heroes reuse the same ovulation illustration (`week2-ovulation.jpg` / `ttcStageCycle` / `ttcStageTiming`) via `HREF_IMAGE_MAP` in `src/components/ttc/TTCTopicPage.tsx` and `flagshipHeroMap` in `src/components/article/flagship/flagshipImageMap.ts`.
2. Start here section grid leaves a single calculator card left-aligned.

### 1. Add 11 distinct topic-matched images to `src/assets/` (already generated this turn)

- `ttc-ovulation-know.jpg`
- `ttc-ovulation-signs-journal.jpg`
- `ttc-fertile-window-highlighted.jpg`
- `ttc-fertile-window-calendar.jpg`
- `ttc-ovulation-tests-strips.jpg`
- `ttc-cervical-mucus-botanical.jpg`
- `ttc-bbt-thermometer.jpg`
- `ttc-late-ovulation-clock.jpg`
- `ttc-hard-to-predict-notebook.jpg`
- `ttc-timing-sex-mugs.jpg`
- `ttc-irregular-periods-calendar.jpg`

All calm/premium, sage/cream/muted palette, botanical + journal-led, no clinical or explicit imagery.

### 2. Wire images

**`src/components/ttc/TTCTopicPage.tsx`** — import the 11 new assets and extend/replace entries in `HREF_IMAGE_MAP` for: how-to-know-when-you-are-ovulating, ovulation-signs, signs-of-ovulation, understanding-your-fertile-window, fertile-window, using-ovulation-tests, cervical-mucus-and-fertility, basal-body-temperature-tracking, late-ovulation-and-ttc, when-ovulation-is-hard-to-predict, timing-sex-when-trying-to-conceive, irregular-periods-and-trying-to-conceive. Keep `cycle-tracking` on `ttc-stage-cycle.jpg` and calculator card on `ttc-stage-timing.jpg`.

**`src/components/article/flagship/flagshipImageMap.ts`** — import the same 11 assets and update `flagshipHeroMap` for the same 12 slugs (replace existing entries for `ovulation-signs`, `signs-of-ovulation`, `fertile-window`, `irregular-periods-and-trying-to-conceive`; add entries for the 8 new flagship slugs). Keep alt text descriptive and topic-specific.

### 3. Centre single Start here card

In `TTCTopicPage.tsx` Start here section, branch on `config.startHere.length === 1` to render `flex justify-center` with a max-width card wrapper (`max-w-md`); otherwise keep the existing `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3` grid. This applies to any TTC topic page with a single Start here card (currently ovulation, fertility, cycle-tracking; pregnancy-tests has one item too). All will render centred and intentional; multi-card pages unchanged.

### 4. Verify

- `bunx tsgo --noEmit` clean
- Ovulation groups unchanged (Understanding / Tracking / When timing feels unclear)
- Each ovulation-cluster card and article hero shows a distinct topic image
- Single Start here cards centred; multi-card sections unchanged
- No article copy, slugs, routes, calculator, TTC Journey, SEO/sitemap/robots changes

### Files edited

- `src/components/ttc/TTCTopicPage.tsx`
- `src/components/article/flagship/flagshipImageMap.ts`
- 11 new `src/assets/ttc-*.jpg` files (added this turn)
