# Phase 9.2g — Pregnancy Hub Common Questions + IVF Pathway

Bring the Pregnancy hub in line with the premium pattern now used on TTC, Family, Toddler and First Year. Pregnancy-only work — no SEO, no route changes, no article rewrites.

## Files to edit
- `src/components/pregnancy/PregnancyCommonQuestions.tsx` (new) — premium accordion, Pregnancy palette
- `src/components/pregnancy/PregnancyIVFPathway.tsx` (new) — calm "connected hub" card to `/ivf` (+ `/ivf-timeline`)
- `src/pages/Pregnancy.tsx` — insert both new sections between `WeekByWeek` and `KeepYourJourney`
- `src/pages/AskPage.tsx` — add `PREGNANCY_TOPIC_SUGGESTIONS` and extend the `topicSuggestions` selector
- `.lovable/plan.md` — mark 9.2g complete

## Placement in `Pregnancy.tsx`
```text
Hero → WhatThisCovers → AIPanel → SoftDivider → TopicMap
  → TrimesterCards → WeekByWeek
  → PregnancyIVFPathway          (new)
  → PregnancyCommonQuestions     (new)
  → KeepYourJourney (journal promo)
```
Pregnancy has no standalone "third trimester" section on the hub; trimesters live in `TrimesterCards` and week guidance ends with `WeekByWeek`. Inserting after `WeekByWeek` and before `KeepYourJourney` matches the intent "after trimester guidance, before journal promo".

## Part 1 — `PregnancyCommonQuestions`
Mirror `TTCCommonQuestions.tsx` structure exactly (accordion, chevron chip, primary "Read more" and outlined "Ask more" buttons) with Pregnancy tokens (`--stage-pregnancy`, `--stage-pregnancy-accent`).

Heading: "Questions during pregnancy". Sub: "A short answer to start with. Then read more, or ask your own question for personalised guidance."

Six items with optional `readMore`, mandatory `askHref`. Copy per spec — calm British English, no diagnosis/thresholds. Article-route audit against `articleData.ts`:

| Topic key | Read more (real slug) | Ask more |
|---|---|---|
| `early-symptoms` | `/articles/early-pregnancy-symptoms-explained` | `/ask?stage=pregnancy&topic=early-symptoms` |
| `baby-movement` | `/articles/baby-movement-in-pregnancy` | `/ask?stage=pregnancy&topic=baby-movement` |
| `anxiety` | `/articles/anxiety-in-pregnancy` | `/ask?stage=pregnancy&topic=anxiety` |
| `scans-appointments` | `/articles/tests-and-scans-in-pregnancy` | `/ask?stage=pregnancy&topic=scans-appointments` |
| `birth-preparation` | `/articles/birth-preferences` | `/ask?stage=pregnancy&topic=birth-preparation` |
| `when-to-ask-help` | none (no single warning-signs article exists) — omit Read more, keep Ask more only | `/ask?stage=pregnancy&topic=when-to-ask-help` |

## Part 2 — IVF connected pathway (`PregnancyIVFPathway`)
Single full-width standout panel, visually distinct from topic cards (soft lavender/IVF-tinted surface, `CONNECTED HUB` eyebrow), so it doesn't imply IVF is a standard pregnancy step.

- Heading: "Pregnant after IVF?"
- Sub: "If this pregnancy began through IVF or fertility treatment, you may want guidance that understands that part of the story too."
- Eyebrow: "CONNECTED HUB"
- Title: "IVF and early pregnancy support"
- Body: "A calm IVF hub covering treatment timelines, transfer preparation, the two-week wait and early pregnancy after IVF."
- Primary CTA: "Go to IVF hub" → `/ivf`
- Secondary CTA: "View IVF timeline" → `/ivf-timeline` (route exists in `App.tsx`)

Yes to including it: an IVF hub and timeline exist, and pregnancy after IVF is a real audience — but framed as optional, not a standard topic card.

## Part 3 — `AskPage.tsx`
Add `PREGNANCY_TOPIC_SUGGESTIONS` map with the six keys above and the exact chip copy from the spec. Extend the existing selector:

```ts
|| (stageKey === "pregnancy" && PREGNANCY_TOPIC_SUGGESTIONS[topic])
```
`pregnancy` is already a supported stage in `aiStageStyles.ts`, so styling, hidden generic chips and blank input are handled automatically. No other branches touched — First Year, Recovery, Family, Toddler, TTC and generic `/ask` behaviour preserved.

## Guardrails
No edits to TTC, IVF, Family, First Year, Toddler files, `articleData.ts` content, calculators, routes, SEO, sitemap or robots. No new images.

## Verification
- `bunx tsgo --noEmit`
- Playwright: `/pregnancy` at 1280×1800 and 375×812 — confirm order (IVF pathway then Common Questions, both before journal card), accordion expands, Read/Ask buttons resolve, no mobile overflow
- Ask URLs: the six `stage=pregnancy&topic=…` routes render Pregnancy styling, blank input, correct chips, no generic chips
- Regression: `/ask` (generic chips), `/ask?stage=ttc&topic=fertile-window`, `stage=first-year&topic=sleep`, `stage=recovery&topic=recovery-bleeding`, `stage=family&topic=another-baby`, `stage=toddler&topic=tantrums`; `/trying-to-conceive`, `/ivf`, `/first-year`, `/toddler`, `/family`, `/articles/complete-guide-morning-sickness`

After ship: safe to proceed to Phase 9.3 TTC SEO.

---

# Phase 9.2f.2 — TTC IVF Pathway Colour Alignment

Small visual correction: the TTC IVF connected pathway now uses IVF/lavender tokens (`--stage-ivf`, `--stage-ivf-accent`) instead of TTC green, so it reads as a connected IVF hub rather than another TTC topic card.

## Files edited
- `src/components/ttc/TTCIVFPathway.tsx` — swapped all colour tokens, borders, blur, buttons and card accents to IVF palette; kept existing copy, section placement and route targets

## Verification
- `bunx tsgo --noEmit` passed
- Playwright: `/trying-to-conceive` at 1280×1800 and 375×812 — TTC IVF pathway still appears after Fertility & health and before Common Questions; card uses IVF/lavender styling; CTAs route to `/ivf` and `/ivf-timeline`; no mobile overflow
- Regression: `/pregnancy`, `/ivf`, `/ask?stage=ttc&topic=ivf-next-step`, `/first-year`, `/toddler`, `/family` all load

After ship: safe to proceed to Phase 9.3 TTC SEO.

