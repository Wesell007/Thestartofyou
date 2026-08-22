# Phase 28F — Ask Cindy as a TTC Companion

Presentation plus one controlled AI mode addition. No schema, RLS, storage, auth, cycle maths, calculator, logging, handover, SEO, sitemap or route changes.

## Discovery findings (verified)

1. `/ask` is `src/pages/AskPage.tsx`, a full public page with `SeoHead ... noindex`. It reads `stage`, `topic`, `journey` from the query string and takes the question from router `location.state` (legacy `?q=` is stripped into state so private text never stays in the URL).
2. `/ask?stage=ttc&topic=...` already works: `TTC_TOPIC_SUGGESTIONS` covers `fertile-window`, `cycle-tracking`, `pregnancy-tests`, `two-week-wait`, `when-to-ask-help`. Unknown topics simply render no suggestions, so params are effectively allowlisted at render time.
3. Reusable Ask surfaces today: `src/components/shared/AskLink.tsx`, `HubAISupport.tsx`, `AISearchBar.tsx`, and the inline pregnancy card `src/components/myweek/SectionAskAI.tsx`.
4. Pregnancy passes context through `src/lib/companionContext.ts`, a pure builder capped at 500 characters that deliberately excludes names, reflection text and media. `SectionAskAI` answers inline and offers `navigateToAsk` for the full page.
5. `supabase/functions/_shared/aiModes.ts` holds `AI_MODES` (`general`, `first_year_day_recap`, `first_year_companion`, `pregnancy_week_companion`), per-mode prompt, grounding and escalation flags. `resolveAiMode` falls back to `general` for unknown values, so an older client stays safe.
6. Payload is `{ query, context?, mode? }`, validated in `supabase/functions/_shared/validation.ts` with bounded lengths.
7. No TTC mode exists.
8. Ask accepts a prefilled question via router state, and context via state or `?ctx=`.
9. Context can be a short built string; no schema change is needed.

## What will be built

**New AI mode `ttc_companion`** in `supabase/functions/_shared/aiModes.ts`
- New `TTC_COMPANION_PROMPT`: supportive, non-diagnostic. Explicitly forbids diagnosing, predicting or confirming pregnancy or ovulation, reading symptoms as proof, saying the person is or is not pregnant, claiming test accuracy, blanket reassurance, discouraging medical advice, fear or pressure wording. Requires "may", "could", "possible", "based on the dates you saved", dates are estimates, and pointing to a GP or clinician when the question warrants it.
- Config: grounding on, urgent escalation answer allowed. `general` and the existing modes stay byte-identical.

**New helper `src/lib/ttcAskContext.ts`**
- Pure builder returning a short capped string from existing derived state only: stage label, cycle day, active support moment id, possible test date, expected period date (day and month only), whether a recent negative or unclear test exists, whether a recent period-started log exists, and a page hint.
- Never includes note text, log notes, names, emails or raw log rows. Booleans only for the log-derived facts.
- Also exports the chip set: each chip has a label, a prompt, and a topic drawn only from the five existing safe topics.

**New component `src/components/ttc/journey/TTCAskCindyCard.tsx`**
- Replaces the current static Ask block in `MyTTCJourney.tsx` (lines around 387 to 412), placed after the support moment and "What may be useful today", before the lower guidance and cycle-details sections.
- Heading "Ask Cindy about this part", body "Ask about timing, testing, the wait or what may help today."
- Prompt chips reorder by the active Phase 28E support moment (wait, possible test day, after a test result, period arrived). With a positive test noted, the card stays quiet and defers to the existing pregnancy handover, offering only a careful pregnancy guidance prompt.
- Inline answering mirrors `SectionAskAI`: `useAISearch` with `mode: "ttc_companion"` and the built context, plus a persistent link to `/ask?stage=ttc&topic=...` carrying the question in router state.
- Styling from `ttcStyles.ts` tokens, `ttc-paper-warm`, sage wash and botanical accents. No hex values, 44px targets, visible focus rings.

## Tests

New `src/lib/ttcAskContext.test.ts`: context excludes note text and raw log values, uses derived stage and cycle day, chips map only to the five existing topics, support moment reorders chips, banned-copy scan over new strings.
New assertions in the aiModes test area: `ttc_companion` resolves, and its prompt contains the non-diagnostic instructions. No existing tests rewritten.

## Verification

Playwright at 390px and 1440px across `/my-ttc-journey`, `/ask?stage=ttc&topic=two-week-wait`, `/ask?stage=ttc&topic=pregnancy-tests`, `/setup/trying-to-conceive`, `/ovulation-calculator`, `/trying-to-conceive`, one TTC topic page, one TTC article, one signed-in pregnancy route and one signed-in First Year route. Then `npx tsgo --noEmit -p tsconfig.json`, `npx vitest run`, `npm run build`. Report the 28 requested items and stop.

Nano Banana will be used inside Lovable to refine the Ask companion surface before implementation.
