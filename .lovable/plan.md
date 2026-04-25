# /pregnancy hub refinement — revised

Tighter structure. Less segmented middle. Guidance and journal each consolidated into a single band. Trimester-first, week-second preserved.

---

## Final section order (8 sections)

```text
1. Hero (refined)                       — orientation + due-date entry
2. What this journey is                 — single tightened orientation block
3. Pregnancy timeline (trimesters)      — primary structural entry
4. Week-by-week                         — secondary deep navigation
5. What to expect                       — body / baby / emotional / uncertainty
6. Guidance & questions                 — merged CommonQuestions + AI support
7. Keep your journey                    — merged reflection + journal bridge
8. Final CTA                            — restate due-date primary
```

Down from 13 → 8.

---

## What to merge

- **`FocusRightNow` + `WhatMakesDifferent` → into `WhatThisJourneyIs`.** One decisive orientation block. Preserve the "one week at a time" pull-quote and the "interpretation over certainty" framing.
- **`CommonQuestions` + `PregnancyAISupport` → into one `GuidanceAndQuestions` section.** A single calm band: short header on the left, a list of 5 common questions, and beneath them the quiet "Ask anything about your pregnancy" AI entry with 2–3 suggestion chips. One section, one rhythm.
- **`ReflectionSection` + `EmotionalReminder` + `JournalPromotion` → into one `KeepYourJourney` section.** A single quieter bridge: one reflection line at top, one supportive sentence, one calm CTA into the journal. Removes three consecutive emotional bands that currently dilute each other.

## What to cut

- Standalone `FocusRightNow` section (absorbed).
- Standalone `WhatMakesDifferent` section (absorbed).
- Standalone `EmotionalReminder` section (absorbed).
- Standalone `ReflectionSection` (absorbed into `KeepYourJourney`).
- Standalone `JournalPromotion` (absorbed into `KeepYourJourney`).
- Duplicated trimester italic sub-labels under the timeline track inside `PregnancyTimeline`.

## What to demote

- `WeekByWeek` — quieter background and smaller header so trimesters remain primary.
- `WhatToExpect` background tint — reduce so it does not compete with the timeline.

---

## Hero — tightened

Two-column layout preserved. Still image / restrained treatment. No video.

- **Eyebrow:** `Pregnancy`
- **Heading:** `Pregnancy support, week by week.`
- **Sub:** `Calm, structured guidance from the first uncertain weeks through to birth — shaped to where you are.`
- **Trust markers:** `40+ weeks · 3 trimesters · Free to start`
- **Right card:** keep the due-date calculator. Label `Start with your due date`. Sub `We'll place you in the right week and trimester.` Remove the duplicate inner H2.

## CTA hierarchy

- **Primary:** Enter due date (hero card + Final CTA).
- **Secondary:** Browse trimesters (`PregnancyTimeline` cards).
- **Tertiary:** Browse weeks (`WeekByWeek` grid).
- **Quiet:** Ask a question (inside `GuidanceAndQuestions`).
- **Bridge:** Begin your journal (inside `KeepYourJourney`).

`FinalCTA` restates the primary: one calm card `Enter your due date`, with a quiet `Or browse by trimester` link beneath. No competing buttons.

## Trimester vs week

Unchanged from prior plan. Trimesters primary (`PregnancyTimeline`), weeks secondary (`WeekByWeek`), in that order, with `WeekByWeek` visually quieter.

---

## Technical notes

- **Edit:** `src/pages/Pregnancy.tsx`, `src/components/pregnancy/PregnancyHero.tsx`, `src/components/pregnancy/WhatThisJourneyIs.tsx`, `src/components/pregnancy/PregnancyTimeline.tsx`, `src/components/pregnancy/WeekByWeek.tsx`, `src/components/pregnancy/WhatToExpect.tsx`, `src/components/pregnancy/PregnancyFinalCTA.tsx`.
- **Create:** `src/components/pregnancy/GuidanceAndQuestions.tsx`, `src/components/pregnancy/KeepYourJourney.tsx`.
- **Delete:** `FocusRightNow.tsx`, `WhatMakesDifferent.tsx`, `EmotionalReminder.tsx`, `ReflectionSection.tsx`, `CommonQuestions.tsx`, `PregnancyAISupport.tsx`, and remove the `JournalPromotion` usage from this page (component itself stays for other hubs).
- **Out of scope:** trimester/week subpages, navbar, footer, brand tokens, analytics, signed-in product.

## Risks / manual review

1. Merging three emotional sections into one risks losing texture — keep `KeepYourJourney` to three short beats max (reflection line, supportive sentence, journal CTA).
2. `GuidanceAndQuestions` must not become a double-column wall — keep questions as a single vertical list, AI bar beneath, separated by a hairline rule.
3. `WhatThisJourneyIs` is now carrying three previous sections' essence — copy must stay short or it becomes the new bloat.
4. `FinalCTA` may feel duplicative of hero on short viewports; reviewable after build.
5. UK English sweep across all rewritten copy.
