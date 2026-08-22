# Phase 28F — Ask companion inside the TTC journey

Make the AI companion feel present inside `/my-ttc-journey` with a context-aware Ask surface, using the companion name the user already chose. No schema, RLS, storage, auth or cycle-logic changes.

## Companion naming (confirmed)

The app already stores a chosen companion name and tone on the user profile, and `useCompanionIdentity()` reads it. That is the single source of truth for this phase.

- Heading: "Ask {name} about this part" when a name exists, otherwise "Ask about this part".
- Button and links: "Ask {name}", fallback "Ask your companion".
- Inline answer area and the handoff into the full Ask page use the same rule.
- No name is ever sent to the backend or to analytics; it is display copy only.
- No new setting, no schema change. A dedicated "change your companion name" surface, if wanted, is a separate personalisation phase.

## What gets built

1. **A controlled `ttc_companion` AI mode**
   A TTC-specific system prompt with strict guardrails: supportive, non-diagnostic, never confirms or rules out pregnancy or ovulation, never interprets a test result, keeps estimates framed as estimates, mentions professional help only when the person's own question raises it. Grounded like the other answer surfaces.

2. **`src/lib/ttcAskContext.ts`**
   Builds a short (500 character cap) context string from derived state only: cycle stage label, approximate cycle day, possible test day and expected period day as day-and-month, plus booleans for a recent negative/unclear test or a recent period-started note. Explicitly excludes note text, log rows, identifiers, emails, names and years. Also owns the chip list and the chip ordering rules.

3. **`src/components/ttc/journey/TTCAskCompanionCard.tsx`**
   Keepsake paper card in the TTC sage/olive world (cream paper, sage wash, botanical sprig), matching the 28B–28E direction. Contains prompt chips, a single question field, an inline streamed answer, "Ask something else", and "Continue in Ask". 44px minimum tap targets throughout.

4. **Chip ordering by support moment**
   The chip set is fixed and safe; only the order changes. Two-week wait leads with "Help me through the wait"; a possible test day leads with testing timing; after a negative or unclear test leads with the negative-test chip; period arrived leads with the new-cycle chip. Otherwise the stage decides.

5. **Placement in `/my-ttc-journey`**
   Sits after the support moment and Today area, before the deeper guidance, so it reads as a companion rather than a tool.

6. **Full Ask handoff**
   Uses the existing `/ask` route with only safe query params (`stage=ttc`, one of the existing TTC topics). The question and context travel in router state, never in the URL.

## Technical notes

- `supabase/functions/_shared/aiModes.ts`: add `ttc_companion` to `AI_MODES` and a `TTC_COMPANION_PROMPT` config entry (`useGrounding: true`, `allowUrgentEscalationAnswer: true`). The existing mode-count assertion in `src/test/aiModes.test.ts` moves from 4 to 5 and gains guardrail assertions.
- Topics restricted to those the Ask page already knows: `two-week-wait`, `pregnancy-tests`, `cycle-tracking`, `fertile-window`, `when-to-ask-help`.
- Reuses `useAISearch`, `navigateToAsk` / `askDestination`, `useCompanionIdentity`, `deriveTTCDates`, `computeTTCStage`, `cycleDayFrom` and the existing support-moment resolver. No new dependencies.
- New tests: `src/lib/ttcAskContext.test.ts` covering the privacy contract (no note text, no identifiers, no year, length cap) and the chip reordering; plus the extended AI-mode guardrail tests.
- Nano Banana composition board generated before implementation and used as the visual reference for the card.

## Verification

`npx vitest run`, `npm run build`, typecheck, and a Playwright pass over `/my-ttc-journey` at mobile and desktop widths.
