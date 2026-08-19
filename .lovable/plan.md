# Phase 26E — Cindy Daily Rhythm Summary

Add an explicit, consent-based "look back with Cindy" card to `/my-first-year/today` that turns the day's logged care events into a short warm recap. No schema, routes, storage or care-event logic changes.

## Discovery findings (AI reuse path)

- Shared AI endpoint: `supabase/functions/ai-search` (SSE streaming), called through `src/hooks/useAISearch.ts` (`ask(query, context)`, plus `answer`, `isLoading`, `error`, `reset`, abort on unmount). This is the only AI path for signed-in companion surfaces.
- Existing companion cards: `src/components/firstyear/journey/FirstYearAskCompanion.tsx` (First Year home) and `src/components/myweek/SectionAskAI.tsx` (pregnancy week). Both use `useAISearch` plus `useCompanionIdentity` for the companion name/tone, and render streamed markdown-ish lines with calm loading and error copy. Today's card will follow the same pattern.
- Context builder: `src/lib/firstYearCompanionContext.ts` deliberately excludes names, notes, memories, photos and pregnancy chapter content. The new payload builder will sit beside it and follow the same rules.
- Privacy boundaries already enforced server side: `supabase/functions/_shared/validation.ts` caps `query` at 1000 characters and `context` at 500.

Reuse decision: no new AI backend, no edge function change. The Today card calls the existing `useAISearch` hook only on button press.

## What gets built

1. New pure helper `src/lib/firstYearDaySummaryPrompt.ts`
   - `buildDayRhythmDigest(events, { babyLabels, now })` turns today's care events into a compact, name-free line list: event type, local time, completed sleep duration, running sleep state, breast left/right/total minutes, bottle type and amount, nappy type and descriptive details, moment text (trimmed and capped), the selected day, and `Baby 1` / `Baby 2` neutral labels for multiples.
   - `buildDaySummaryQuery(digest)` wraps the digest with the Cindy guardrail instruction (summarise only what is provided, no outside knowledge, no advice, no prediction, no comparison to ranges, no banned words, keep it 80 to 140 words, note lightly when little was logged) and fits the whole thing inside the 1000 character query limit. The guardrail instruction is never truncated: only digest content is trimmed, in this priority order, keeping (1) the guardrails, (2) the selected day and event counts, (3) event type and time, (4) structured details such as sleep duration, bottle amount and nappy type, then trimming (5) moment text first, (6) dropping the oldest moment snippets before any structural care-event detail is dropped.
   - Context comes from the existing `buildFirstYearCompanionContext` with a Today page hint, so it stays inside the 500 character cap and carries only the coarse age band, baby count and tone.

2. New component `src/components/firstyear/today/DaySummaryCard.tsx`
   - Placed after `TodaySoFar` and before `RhythmTimeline` in `src/pages/firstyear/FirstYearToday.tsx`.
   - Title "Look back with Cindy"; helper copy "Cindy can use today's logged feeds, sleep, nappies and moments to write a short recap."; privacy line "Nothing is sent until you ask."; primary pill button "Summarise today".
   - Uses the scoped events already computed on the page (respects the multiples selector) so nothing from other days is ever included.

3. States
   - No logs: card visible, button disabled, quiet line "Add a feed, sleep, nappy or moment first, then Cindy can help you look back."
   - Ready: privacy line plus enabled button.
   - Loading: "Cindy is looking over today's rhythm…" with the existing calm spinner treatment.
   - Success: cream card with a Cindy label, the streamed recap, "Generated just now", and a quiet "Try again" action. Nothing is saved.
   - Error: "Cindy could not summarise today just now. Try again in a moment." Rest of Today stays usable.

4. Visual direction
   - Reuses the Today tokens in `src/components/firstyear/journey/firstYearStyles.ts` (26px radius, warm soft shadow, focus ring, cream card on the parchment page) with a soft sage companion accent, kept quieter than the Active card.

## Consent and privacy behaviour

No AI call on mount, no effect-triggered call, no background retry. The digest is only built and sent inside the button handler. Excluded from the payload: parent name, baby names, photos, photo URLs, memories, pregnancy chapter content, account details, other days' logs and the private day note.

## Testing

- New `src/lib/firstYearDaySummaryPrompt.test.ts`: digest includes allowed fields, uses neutral baby labels, excludes names, respects the character cap.
- New component test with `useAISearch` mocked: no call on render, button disabled with no events, one call carrying only today's scoped events after click, success render, error render.
- Then `npx tsgo --noEmit -p tsconfig.json`, targeted Vitest, `npx vitest run`, `npm run build`, plus signed-in Playwright checks at 390px and 1440px (placement, states, overflow, console, focus rings), a hex colour scan and a banned word scan on the new copy.

## Notes

The `ai-search` system prompt is shared and may append a sources block; the card strips any trailing sources section the same way `FirstYearAskCompanion` already does, so the recap stays a plain gentle summary. No edge function edits are planned.
