# Phase 26B Revision — Stronger First Year App Home Design

Presentation and hierarchy only, for `/my-first-year`. No schema, migrations, RLS, storage, routes, sitemap, robots, public pages, public article data, save/edit/delete logic, AI backend, export or deletion logic.

## 1. Typography and contrast pass

Shared scale applied across the home components, defined once in `firstYearStyles.ts` as exported class constants so every card stays consistent:

- Section headings: serif, 1.45 to 1.7rem, `text-foreground` (was `foreground/90`)
- Card titles: serif 1.08rem, `text-foreground`, medium weight
- Descriptions: 13.5 to 14.5px, `text-foreground/75` (was `/60` to `/65`)
- Kickers: 11px, tracking 0.22em, stage accent colour at full strength on a tinted pill
- Buttons and CTAs: medium weight, pill, `shadow-cta`, token background not tint
- Explore rows: 14.5px title at `foreground/85`, detail at `foreground/65`

## 2. Stage section becomes personalised app guidance

`src/lib/firstYearStageGuidance.ts` gains an insight-led shape while keeping the existing banned-word filter, existing month data and existing helpers. No new medical claims: all copy comes from `shortVersion` fields already published (`baby`, `feeding`, `sleep`, `you`), with the current fallbacks.

New output shape (additive fields, existing `cards` retained for tests and fallback):

```text
heading      "Around three months"        (existing monthHeading)
intro        one stronger sentence         (shortVersion.baby)
insights[]   What may be changing          (shortVersion.baby)
             Feeding and sleep             (shortVersion.feeding + sleep)
             For you around now            (shortVersion.you)
readMore     month guide link              (monthPagePath)
```

`StageGuidanceSection.tsx` renders the insights as tinted baby-blue insight tiles with an icon pill and no link chrome, followed by a single quiet "Read more" row carrying the month hero thumbnail from `firstYearMonthImages`. The three article-style cards are removed from this section; Feeding and Sleep links move into Explore guidance. Tests in `firstYearStageGuidance.test.ts` extended for the new fields and the banned-word filter.

## 3. Images on the remaining guide links

Use existing assets only, no new images, no external URLs:

- Month guide link: `firstYearMonthImages[slug].hero.src`
- Explore guidance rows and For you cards: `firstYearTopicConfigs[slug].heroImage`
- Any link without an asset falls back to a gradient tile with a lucide icon, built from tokens

A small shared `GuideThumb` component (rounded 12px, 56px square, `object-cover`, `aria-hidden` when the label repeats the title, `loading="lazy"`).

## 4. More colour

Existing Phase 26B tokens used more visibly, plus rose and lavender tokens already in `index.css` reused for the postpartum lane:

- page band: warm cream instead of the current near-white wash
- Today: baby blue gradient, stronger
- Cindy: sage gradient with a filled avatar disc
- Memories: peach gradient with a peach date chip
- For you: rose/mauve tinted cards, lavender accent on Emotional wellbeing
- Stage insights: baby blue tiles

All colour via `hsl(var(--token))` or the gradient vars. No hex in components.

## 5. Cindy card

`FirstYearAskCompanion.tsx` keeps its logic and the existing privacy context builder unchanged. Visual only: solid sage avatar disc with `Sparkles`, larger serif heading, stronger sage border and shadow, filled chips with sage hairline, answer area on a cream surface with a left sage rule, solid sage pill CTA. Calm error state and the working page on stream failure stay exactly as they are.

## 6. Today card

Strongest card on the page: deeper blue-to-cream gradient, larger serif line, date and age as two distinct chips, solid CTA pill with arrow, more internal padding, stronger shadow. `RecentlySavedCard` tucks directly beneath it as a connected lighter panel. No change to `/my-first-year/today`.

## 7. Memories card

Peach-to-cream keepsake treatment strengthened: peach date chip, recent memory title in serif, existing thumbnail path only when a signed URL is already present in loaded data, warmer CTA pill. No extra fetching, no gallery, no logic change.

## 8. Postpartum lane

`SupportLane.tsx` `side="you"` restyled with rose/peach/lavender tints, per-card accent (recovery, body, emotional wellbeing), topic hero thumbnails, and a warmer intro line. Still exactly three cards.

## 9. Article dominance

Above Explore guidance the only article-style links left are the single month-guide "Read more" row and the three For you cards. Everything else in the top half is personal, age-aware, companion-led or action-led. Explore guidance stays tertiary, gains Feeding and Sleep rows plus thumbnails, and keeps the hairline divider treatment.

## 10. Files changed

`src/index.css` (cream page band value only if needed), `src/components/firstyear/journey/firstYearStyles.ts`, `TodayCard`, `RecentlySavedCard`, `MemoriesCard`, `StageGuidanceSection`, `SupportLane`, `ExploreGuidance`, `FirstYearAskCompanion`, `FirstYearHeroPanel`, new `GuideThumb.tsx`, `src/lib/firstYearStageGuidance.ts` and its test, and `src/pages/firstyear/MyFirstYear.tsx` for the page band and ordering.

## 11. Verification

`npx tsgo --noEmit -p tsconfig.json`, targeted tests, `npx vitest run`, `npm run build`, sitemap checksum unchanged, and a Playwright pass at 390px and 1440px for overflow, focus rings, contrast and console errors. Copy checked against the banned word list and for em dashes.
