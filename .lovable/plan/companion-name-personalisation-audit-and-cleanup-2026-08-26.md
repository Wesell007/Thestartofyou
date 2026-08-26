# Companion Name Personalisation Audit and Cleanup

Audit result: "Cindy" is currently hardcoded as a default in the live experience across the First Year surfaces, one TTC action label, First Year setup copy, and two AI prompt/wording strings. TTC Ask, the site-wide companion shell, the pregnancy week card and the Ask page already fall back to neutral wording and need no behaviour change.

## Confirmed hardcoded references

Live user-facing defaults:
- `src/pages/firstyear/MyFirstYear.tsx` — `DEFAULT_COMPANION = "Cindy"`, passed to the hero panel.
- `src/components/firstyear/journey/FirstYearHeroPanel.tsx` — renders that name in the hero sentence.
- `src/components/firstyear/journey/FirstYearAskCompanion.tsx` — `DEFAULT_COMPANION`, used in heading, body, placeholder and safety line.
- `src/components/firstyear/today/DaySummaryCard.tsx` — `DEFAULT_COMPANION`, used in kicker, heading, body, empty state, loading and error copy.
- `src/components/firstyear/journey/WhatComesNextCard.tsx` — "Cindy is still here…".
- `src/lib/firstYearEntry.ts` — setup copy headings and companion notes name Cindy (both transition and direct modes).
- `src/components/firstyear/setup/firstYearSetupConstants.ts` — `COMPANION_INTRO_POINTS` opens with Cindy.
- `src/components/firstyear/setup/StepCompanion.tsx` — "You can keep Cindy…".
- `src/pages/setup/FirstYearSetup.tsx` — companion draft prefilled with `name: "Cindy"` when no name is saved.
- `src/lib/ttcSupportMoment.ts` — a support-moment action labelled "Ask Cindy".

Prompt/wording strings (not display copy, but they assert the name):
- `src/lib/firstYearDaySummaryPrompt.ts` — guardrail line "You are Cindy…" and the export name `CINDY_DAY_SUMMARY_GUARDRAILS`.
- `supabase/functions/_shared/aiAnswerWording.ts` — "Cindy cannot turn this entry into a simple day recap…".

Legitimate, kept as-is: `SUGGESTED_NAMES` in `src/lib/companion.ts` and the `cindy` option pill in `src/pages/Setup.tsx` and `src/pages/AccountSettings.tsx`. Both default to `skip`, so Cindy is only ever a user choice.

## What changes

1. Extend `src/lib/companion/companionName.ts` (the existing source of truth) with small helpers for the copy shapes the First Year surfaces need: a sentence-start subject ("Your companion" / chosen name) and an "Ask X" label, reusing `companionDisplayName` and `companionSubject`.
2. Remove every `DEFAULT_COMPANION = "Cindy"` constant and route the First Year hero, Ask card, Day Summary card and What Comes Next card through those helpers, so copy reads "Ask your companion", "Your companion can use today's logged feeds…", "Your companion does not replace your midwife, GP or health visitor" when no name is set, and the chosen name when one is.
3. Rewrite the First Year setup copy in `firstYearEntry.ts`, `firstYearSetupConstants.ts` and `StepCompanion.tsx` to neutral wording ("your companion", "it") and drop the gendered "she/her" that only made sense alongside a fixed name.
4. In `FirstYearSetup.tsx`, prefill the companion draft with an empty name instead of "Cindy". Naming stays optional: Cindy remains one of the offered suggestions only.
5. Relabel the TTC support-moment action to "Ask your companion" (the surface that renders it already personalises headings via the identity hook).
6. Neutralise the two prompt strings: guardrail becomes "You are a gentle First Year companion inside The Start of You", export renamed to `DAY_SUMMARY_GUARDRAILS`, and the edge-function wording becomes "Your companion cannot turn this entry into a simple day recap…". No rule, mode, safety or escalation logic is touched.
7. Sweep `docs/ai/*` for stale "Cindy" naming statements and align them with "the companion" phrasing.

No schema, migration, RLS, route, sitemap, SEO, memory, grounding or voice change. No new storage for names, no new settings UI, no new AI context fields.

## Tests

Extend existing suites and add focused unit tests:
- `src/lib/companion/companionMode.test.ts` — new helpers return neutral copy for `null` and the chosen name when provided.
- New `src/components/firstyear/journey/FirstYearAskCompanion.test.tsx` and updates to `src/components/firstyear/today/DaySummaryCard.test.tsx` — with no chosen name, rendered text contains "your companion" and no `/cindy/i`; with a chosen name, that name appears.
- New assertions for the First Year hero panel, `FIRST_YEAR_SETUP_COPY`, `COMPANION_INTRO_POINTS` and the TTC support-moment action labels: no `/cindy/i`.
- TTC (`ttcAskContext.test.ts`), pregnancy (`pregnancyAiContext.test.ts` fixture rename away from Cindy where it implies a default) and an Ask page starter/empty-state assertion that no `/cindy/i` string is emitted by default.

## Validation

`npm test`, `npm run lint`, `npm run typecheck`, `npm run build`, plus a Playwright smoke pass over the launcher, companion panel, `/ask`, the TTC journey card and the First Year home and Today surfaces at mobile and desktop widths. The known generated-file lint warning in `src/integrations/supabase/previewAuthStorage.ts` will be reported as pre-existing and left untouched.

## Report

The closing report will cover: files searched, hardcoded references found, files changed, fallback behaviour, chosen-name behaviour, tests added or updated, manual smoke result, lint, typecheck, test and build results, and whether the cleanup can close.
