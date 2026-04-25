# /pregnancy topic map — revised

The new topic layer **replaces `WhatToExpect`**. No section is added. Page stays at 8 sections.

## Final section order (still 8)

```text
1. Hero
2. WhatThisJourneyIs
3. PregnancyTimeline (trimesters)
4. WeekByWeek
5. PregnancyTopicMap            ← replaces WhatToExpect
6. GuidanceAndQuestions
7. KeepYourJourney
8. PregnancyFinalCTA
```

`WhatToExpect` is removed from the page. The "body / baby / emotional / uncertainty" framing is dropped here — its emotional reassurance work is already carried by `WhatThisJourneyIs` (orientation) and `KeepYourJourney` (reflection). Slot 5 becomes the structured topic architecture instead of a second emotional band.

## How WhatToExpect is replaced

- **Remove** `<WhatToExpect />` from `src/pages/Pregnancy.tsx`.
- **Delete** `src/components/pregnancy/WhatToExpect.tsx`.
- **Create** `src/components/pregnancy/PregnancyTopicMap.tsx` and place it in slot 5.

No conceptual overlap: `WhatToExpect` was experiential ("how it can feel"); `PregnancyTopicMap` is navigational ("where to read more, by topic"). The new section is the page's clear topic architecture layer.

## The 6 topic groups

Each card: topic title · support line · 3–5 article links · one main "Explore" link.

### 1. Your body
- Support: How pregnancy can feel, week to week.
- Main: Explore body & symptoms → `/guidance?topic=body-changes` *(bridge)*
- Articles:
  - `/articles/nausea-in-early-pregnancy`
  - `/articles/fatigue-in-early-pregnancy`
  - `/articles/early-pregnancy-symptoms-explained`
  - `/articles/complete-guide-morning-sickness`

### 2. Your baby
- Support: What's developing, week by week.
- Main: Explore baby development → `/guidance?topic=development` *(bridge)*
- Articles:
  - `/articles/first-trimester-complete-guide`
  - `/articles/second-trimester-complete-guide`
  - `/articles/third-trimester-complete-guide`

### 3. Your feelings
- Support: The emotional side of pregnancy, held with care.
- Main: Explore emotional wellbeing → `/guidance?topic=emotional-wellbeing` *(bridge)*
- Articles:
  - `/articles/emotional-wellbeing-pregnancy`
  - `/articles/perinatal-anxiety`
  - `/articles/symptoms-stopping-early-pregnancy`

### 4. Health and safety
- Support: Reassurance for the moments that ask a lot of questions.
- Main: Explore health & safety → `/guidance?topic=safety-and-support` *(bridge)*
- Articles:
  - `/articles/implantation-bleeding`
  - `/articles/symptoms-stopping-early-pregnancy`
  - `/articles/perinatal-anxiety`

### 5. Food and movement
- Support: Gentle ways to care for yourself day to day.
- Main: Explore everyday care → `/guidance?topic=practical-preparation` *(bridge)*
- Articles:
  - `/articles/complete-guide-morning-sickness`
  - `/articles/fatigue-in-early-pregnancy`
  - `/articles/first-trimester-complete-guide`

### 6. Preparing for birth
- Support: Steady ways to get ready, when you feel ready.
- Main: Explore preparing for birth → `/guidance?topic=practical-preparation` *(bridge)*
- Articles:
  - `/articles/third-trimester-complete-guide`
  - `/articles/writing-a-birth-plan`
  - `/articles/preparing-for-baby-complete-guide`

## Card format

```text
┌──────────────────────────────────┐
│  ▏ Topic label (uppercase, sage) │
│  Title (serif)                   │
│  Support line (sans, muted)      │
│                                  │
│  · Article link 1            ›   │
│  · Article link 2            ›   │
│  · Article link 3            ›   │
│  · Article link 4            ›   │
│  ─────────────────────────────   │
│  Explore [topic] →               │
└──────────────────────────────────┘
```

Editorial restraint: no thumbnails, no chips, no read-times. Article rows are typographic links separated by hairline dividers. Sage accent bar at top. Footer explore link is a quiet text link, not a button.

## Section layout

```text
        The Pregnancy Map (small caps, sage)
   What you might want to explore   (serif H2)
   Six gentle ways into pregnancy guidance.

   ┌─────────┐ ┌─────────┐ ┌─────────┐
   │ body    │ │ baby    │ │ feelings│
   └─────────┘ └─────────┘ └─────────┘
   ┌─────────┐ ┌─────────┐ ┌─────────┐
   │ health  │ │ food &  │ │ prep    │
   │ & safety│ │ movement│ │ for birth│
   └─────────┘ └─────────┘ └─────────┘

       Browse all guidance →
```

Grid `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`, gap-5, `max-w-6xl`. Background `bg-parchment-dark` (inheriting WhatToExpect's slot keeps page rhythm intact).

## Bridge links — explicitly temporary

Every `/guidance?topic=...` link in the cards above is a **temporary bridge**, not the final destination. Long-term, each of the 6 topics should resolve to a dedicated pregnancy topic page:

```text
/pregnancy/body
/pregnancy/baby
/pregnancy/feelings
/pregnancy/health-and-safety
/pregnancy/food-and-movement
/pregnancy/preparing-for-birth
```

Out of scope for this pass. The card data structure keeps the main link in one field so swapping routes later is a one-line change per topic.

## Technical changes

- **Create:** `src/components/pregnancy/PregnancyTopicMap.tsx`
- **Delete:** `src/components/pregnancy/WhatToExpect.tsx`
- **Edit:** `src/pages/Pregnancy.tsx` — remove `WhatToExpect` import and usage, add `PregnancyTopicMap` in slot 5.
- No new routes. No data changes (all slugs already exist in `articleData.ts`; all topic values exist in `GuidanceLibrary` filter).

## Risks before build

1. **Loss of "what to expect" reassurance.** Removing WhatToExpect deletes a calm experiential band. `WhatThisJourneyIs` and `KeepYourJourney` should hold this work — confirm visually after build that the page does not feel colder.
2. **Food & movement is thin** in current article inventory; the card will read close to "Your body". Acceptable for v1, flag for content team.
3. **Article duplication** across cards is intentional editorial routing (e.g. third-trimester guide appears under Baby and Preparing for birth). Worth eyeballing once live.
4. **Bridge links on `/guidance?topic=`** depend on `GuidanceLibrary` reading `topic` from `useSearchParams` and scrolling/filtering correctly. Confirm at QA; if broken, treat as small follow-up — do not block this section.
5. **Editorial restraint** must hold in future: no thumbnails, dates, or tag chips creeping into these cards later.
