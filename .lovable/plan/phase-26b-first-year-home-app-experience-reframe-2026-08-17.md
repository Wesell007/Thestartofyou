# Phase 26B — First Year Home App Experience Reframe

Reframe `/my-first-year` from a private article hub into a personal app home. Presentation and hierarchy only. No schema, routes, sitemap, robots, save logic or AI backend changes. Today and Memories pages are out of scope.

## 1. Visual system tokens (`src/index.css`)

Add to `:root`, beside the existing First Year and recovery tokens:

- `--stage-firstyear-cream`, `--stage-firstyear-cream-soft` — warm cream personal band
- `--stage-firstyear-peach`, `--stage-firstyear-peach-soft`, `--stage-firstyear-peach-accent` — memories and keepsake accents
- `--gradient-firstyear-today` — baby blue to cream
- `--gradient-firstyear-companion` — sage to cream
- `--gradient-firstyear-memories` — peach to cream

Existing tokens reused unchanged: `--stage-firstyear*` (baby blue), `--sage*` (companion), `--stage-recovery*` (parent recovery), `--lavender*` (emotional wellbeing). No hex in components; all colour via `hsl(var(--token))` or the gradient vars. `tailwind.config.ts` only touched if a utility class is genuinely needed.

Card weights:

- Primary (Today, Ask Cindy): gradient surface, stronger shadow, pill CTA
- Secondary (Memories, For this stage, For you): tinted surface, icon pill kicker
- Tertiary (Explore guidance, What comes next): plain rows, hairline divider, no fill

## 2. New home order (`src/pages/firstyear/MyFirstYear.tsx`)

```text
1  FirstYearHeroPanel      baby age + companion presence
2  TodayCard               primary
3  FirstYearAskCompanion   primary (new)
4  RecentlySavedCard       tied visually under Today
5  MemoriesCard            secondary keepsake strip
6  StageGuidanceSection    For this stage, max 3 cards
7  SupportLane "For you"   3 cards
8  PregnancyChapterKeptCard  conditional
9  ExploreGuidance         tertiary (new)
10 WhatComesNextCard       light tail
```

`BabySummaryCard` content (name, age sentence, month guide link) folds into the hero so the top of the page reads as one panel rather than two stacked cards; the component is removed from the page, not deleted.

The two-column baby/you lane grid is dropped. The baby lane's four article links move into Explore guidance.

## 3. Ask Cindy card

New `src/components/firstyear/journey/FirstYearAskCompanion.tsx`, modelled on the proven `SectionAskAI` pattern (streaming answer, chips, error copy, "Ask something else", "Continue in Ask").

- Uses `useAISearch`, `useCompanionIdentity`, existing `ai-search` function
- Heading "Ask {name}" with fallback name **Cindy**, never "Ask AI"
- Tone chip when a tone is saved
- Age-aware chips: "What can I expect around this age?", "What could I ask at the next check-up?", "How do I look after myself this week?"
- Boundary line: "Cindy does not replace your midwife, GP or health visitor."
- Sage-to-cream gradient surface, shared focus ring

## 4. Companion context (privacy boundary)

New pure `src/lib/firstYearCompanionContext.ts` plus `firstYearCompanionContext.test.ts`.

Input: date of birth, baby count, companion tone, optional page hint. Output: a single string under 500 characters containing only:

1. page context ("First Year home, signed in")
2. coarse age band (newborn, around 1 to 3 months, 3 to 6, 6 to 9, 9 to 12, past twelve months)
3. stage label from the existing `resolveFirstYearStage`
4. tone hint
5. general product hint

Never included: baby or parent names, exact dates of birth, daily note text, memory text, photo data, pregnancy chapter content. Tests assert the exclusions, the band boundaries and the length cap. Only a question the user types or a chip they tap is sent as the query.

## 5. Today home card

`TodayCard.tsx` upgraded to the main daily touchpoint: baby wording, age or stage line, today's date, blue-to-cream gradient, stronger shadow and a clearer pill CTA. Existing saved-count copy and the `/my-first-year/today` link behaviour stay as they are. No change to the Today page or its data logic.

## 6. Memories home card

`MemoriesCard.tsx` moves to a peach-to-cream keepsake treatment: recent memory title, a small rounded thumbnail when a signed photo URL is already available from the data already loaded, warmer invitation copy, clear CTA. If no thumbnail is available without new fetching, the card renders text only. No gallery, no save/edit/photo logic change.

## 7. For this stage, For you, Explore guidance

- `StageGuidanceSection.tsx` restyled as secondary: icon pill kicker, tinted cards, max three, still age-aware, unchanged data source.
- `SupportLane.tsx` used once for "For you" with three cards: Recovery after birth, Body and hormones, Emotional wellbeing. Warmer rose/lavender framing.
- New `ExploreGuidance.tsx`: compact, always visible, tertiary rows for Development, Nappies and care, Check-ups and questions, Questions to bring up.
- `WhatComesNextCard.tsx` stays light, copy unchanged apart from spacing.

Result: public guide links above the Explore block drop from eleven to six, and the Explore block itself is visually the quietest section on the page.

## 8. Files changed

`src/index.css`; `src/pages/firstyear/MyFirstYear.tsx`; journey components `FirstYearHeroPanel`, `TodayCard`, `RecentlySavedCard`, `MemoriesCard`, `StageGuidanceSection`, `SupportLane`, `WhatComesNextCard`; new `FirstYearAskCompanion.tsx`, `ExploreGuidance.tsx`, `src/lib/firstYearCompanionContext.ts` and its test.

Untouched: migrations, edge functions, generated Supabase files, all First Year data libs, `src/App.tsx`, sitemap script, robots, public guide pages and article data.

## 9. Verification

Typecheck, targeted tests, `npx vitest run`, `npm run build`, sitemap checksum unchanged, plus a Playwright pass at 390px and 1440px checking order, overflow, focus rings and console errors. Copy checked against the banned word list and for em dashes.
