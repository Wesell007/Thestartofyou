# Phase 26I — Stricter Cindy AI Modes

Make the shared guidance endpoint surface-aware so a Today recap gets a plain factual recap, with no advice, no NHS contact wording and no sources block.

## Discovery findings

- `supabase/functions/ai-search/index.ts` has one hardcoded `SYSTEM_PROMPT` used for every caller. It ends with an instruction to finish medical answers with a "Sources" section, and a safety rule to "clearly recommend the appropriate maternity unit, NHS 111, 999 or A&E when urgency is possible". That is exactly what leaked into the Today recap in Phase 26E.
- Before the model call, the endpoint always fetches NHS pages (`selectSources` plus `fetchGrounding`) and injects them as `<approved_evidence>`. `selectSources` matches "napp"/"feeding"/"baby", so a care digest pulls in the NHS "is your baby seriously ill" page, which pushes the answer further towards escalation wording. If those pages fail, the whole request 503s.
- `URGENT_PATTERN` short-circuits to a fixed 999/A&E answer before any model call.
- `supabase/functions/_shared/validation.ts` `parseAiSearchBody` accepts only `query` (2 to 1000 chars) and optional `context` (1 to 500). Unknown body keys are ignored, so adding `mode` is backward compatible on the wire.
- `src/hooks/useAISearch.ts` posts `{ query, context }`. Callers: `AskPage`, `PublicWeekReflectionAsk`, `SectionAskAI` (pregnancy week), `FirstYearAskCompanion`, `DaySummaryCard`.
- `DaySummaryCard.tsx` already strips a trailing sources block and contact wording client side, plus prompt guardrails in `src/lib/firstYearDaySummaryPrompt.ts`. Those stay as a defensive layer.
- `src/test/edgeFunctionValidation.test.ts` already imports the shared validation module directly, so shared function code is testable from Vitest.

## Approach

Add a small pure mode module in the edge function shared folder, imported by both the function and the tests. No new AI feature, no new UI.

### 1. `supabase/functions/_shared/aiModes.ts` (new, pure)

- `AI_MODES = ["general", "first_year_day_recap", "first_year_companion", "pregnancy_week_companion"]`.
- `resolveAiMode(value)` returns `"general"` for missing, unknown or non-string values.
- `getModeConfig(mode)` returns `{ systemPrompt, useGrounding }`.
  - `first_year_day_recap`: `useGrounding: false`, and a prompt that says summarise only the supplied day digest, no outside knowledge, no sources, no links, no citations, no medical or sleep guidance, no professional contact or emergency wording, no next steps or recommendations, no comparison to expected ranges, no judgement, warm and short at 80 to 140 words, and if little was logged say so lightly.
  - `first_year_companion`: grounded, current safety rules kept, but caution and contact wording only when the parent's own question raises symptoms, urgency or professional help, and no sources block unless a source is actually used.
  - `pregnancy_week_companion` and `general`: the current `SYSTEM_PROMPT` verbatim, so existing surfaces are unchanged.

### 2. Validation

`parseAiSearchBody` also returns `mode`, resolved through `resolveAiMode`, so an absent or unknown mode silently becomes `general` rather than a 400.

### 3. Endpoint

- Pick the config by mode.
- When `useGrounding` is false, skip `selectSources` and `fetchGrounding` entirely and send only the question and context. This removes the NHS evidence injection that was driving escalation wording, and also removes a 503 failure path for the recap.
- Keep `URGENT_PATTERN` running for every mode, including the recap. It is a safety floor and a moment note could contain genuinely urgent wording.
- Keep rate limiting, CORS, streaming and error handling unchanged.

### 4. Hook

`ask(query, context?, options?)` with `options?: { mode?: AiMode }`, included in the POST body only when present. Existing two-argument callers are untouched.

### 5. Today recap

`DaySummaryCard` calls `ask(query, context, { mode: "first_year_day_recap" })`. Existing client-side sources and contact stripping stays as a defensive final layer.

## Testing

- New `src/test/aiModes.test.ts`: unknown/absent mode falls back to `general`; recap config has grounding off; recap prompt contains no "Sources", "NHS 111", "999", "A&E", "http" or next-step instructions; companion and pregnancy prompts keep current behaviour.
- Extend `src/test/edgeFunctionValidation.test.ts`: mode parsed, unknown mode becomes `general`, existing bodies still valid, query and context caps unchanged.
- Extend `DaySummaryCard.test.tsx`: the ask call carries `mode: "first_year_day_recap"`; still no call on render.
- Existing `FirstYearAskCompanion` and `SectionAskAI` behaviour covered by existing tests plus a hook signature check.
- Then `npx tsgo --noEmit -p tsconfig.json`, targeted Vitest, `npx vitest run`, `npm run build`, redeploy the `ai-search` function, and signed-in checks of `/my-first-year/today` at 390px and 1440px covering recap output, logging, reminders, the notification control, console and overflow.

## Out of scope

No new tables, RLS, storage, routes, care-event or reminder logic, notification, service worker or push work, no sitemap or SEO changes, no UI redesign, no Memories changes.
