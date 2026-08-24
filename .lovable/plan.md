# Phase 29A — Site-wide AI Companion Audit and Architecture

Audit only. No code, schema, prompt, route, SEO, analytics or file changes made.

## 1. Executive summary

The AI system is already well shaped for a site-wide companion. One streaming backend (`ai-search`) with mode-aware prompts, NHS grounding, urgent-wording interception, IP-fingerprint rate limiting and bounded input validation. One client hook (`useAISearch`), one full-page surface (`/ask`), and one shared navigation helper (`askNavigation`) used by roughly 50 call sites.

The gap is the interface, not the brain. Today every "ask" surface is a hand-built section that navigates away to `/ask`. There is no persistent in-page chat, no multi-turn conversation, no chat history, and no voice code anywhere. Companion naming is read from `profiles` through `useCompanionIdentity`, but the literal "Cindy" is hardcoded as a default in at least eight files, including one backend fallback string.

Recommendation: keep the backend as-is, add a shared companion shell plus a floating chat panel that calls the existing hook with a page-derived mode and a bounded context string, keep `/ask` as the full-page fallback, and retire nothing until the panel is stable.

## 2. Current AI system map

```text
UI call sites (~50)
  AskLink / AISearchBar / HubAISupport / journey cards
        |  navigate("/ask?stage=&journey=&topic=", state:{question, context})
        v
  /ask  -> AskPage.tsx -> useAISearch()
        |  POST {query, context, mode}
        v
  supabase/functions/ai-search  (verify_jwt = false)
        rate limit -> validate -> urgent check -> NHS grounding -> model -> SSE
        model: google/gemini-2.5-flash
  supabase/functions/ai-reflect (verify_jwt = true)  separate, editor-only
```

## 3. Current Ask routes and components

- Routes: `/ask` only (`src/pages/AskPage.tsx`). No other AI route.
- Shared: `AskLink.tsx`, `AISearchBar.tsx`, `HubAISupport.tsx`, `EditorialAnswer.tsx`, `aiStageStyles.ts`, `askNavigation.ts`.
- Journey (signed-in): `ttc/journey/TTCAskCompanionCard.tsx`, `firstyear/journey/FirstYearAskCompanion.tsx`, `myweek/SectionAskAI.tsx`, `firstyear/today/DaySummaryCard.tsx`, plus TTC `TTCTodayCard`/`TTCSupportMomentCard`/`TTCJourneyFocusCard` ask actions.
- Public hub/stage: TTC, Pregnancy, First Year, Postpartum, Toddler, Family, IVF, Week and Support "Common questions" / "AI support" sections (about a dozen near-identical files), trimester support strips and week bridges, calculator results, Navbar, Footer, JourneyBottomNav, CTASection.

## 4. Current AI modes

`supabase/functions/_shared/aiModes.ts`: `general`, `pregnancy_week_companion`, `first_year_companion`, `first_year_day_recap`, `ttc_companion`. Unknown or absent resolves to `general`.

- Journey-specific: `first_year_day_recap` (recap only, no grounding, no escalation), `ttc_companion`, `first_year_companion`, `pregnancy_week_companion` (currently reuses the general prompt).
- Public-site suitable: `general` everywhere; `ttc_companion`, `first_year_companion` and `pregnancy_week_companion` are safe on public stage pages too since they carry no private data of their own.
- Not public-suitable: `first_year_day_recap`, which is meaningless without a logged day.

## 5. Current backend and edge functions

- `ai-search` (public, `verify_jwt = false`): CORS allowlist, `Cache-Control: no-store`, rate limits 12/min and 100/hour on a salted SHA-256 of IP plus user agent via `consume_ai_rate_limit`, `parseAiSearchBody` bounds query to 1,000 and context to 500 chars, urgent-wording pattern short-circuits the model, NHS-only source allowlist fetched as grounding, SSE passthrough.
- `ai-reflect` (JWT required): private reflection tidy-up, unrelated to Ask.
- No chat, thread, message or conversation table exists. No audio or speech code exists anywhere in the repo.

## 6. Current context flow

`useAISearch.ask(query, context, { mode })` posts to `ai-search` with the anon key. Context is a short prose string built by pure helpers: `companionContext.ts` (pregnancy week, trimester, due day/month, tone hint, page hint) and `ttcAskContext.ts` (stage label, cycle day, test/period day and month, booleans for recent negative test and period, moment hint). Both cap at 500 chars and both explicitly exclude note text, names, emails, identifiers, media and raw rows. First Year uses `firstYearCompanionContext.ts` and `firstYearDaySummaryPrompt.ts` in the same style.

Navigation carries `question` and `context` in router state, never in the URL. URLs carry only `stage`, `journey`, `topic`. `AskPage` reads a legacy `q`/`ctx` query pair and clears it from history.

## 7. Current companion naming flow

`useCompanionIdentity()` reads `profiles.companion_name` and `companion_tone` for the signed-in user, display-only. Hardcoded `"Cindy"` defaults exist in `MyFirstYear.tsx`, `DaySummaryCard.tsx`, `FirstYearAskCompanion.tsx`, `FirstYearSetup.tsx`, `firstYearSetupConstants.ts`, `StepCompanion.tsx`, `WhatComesNextCard.tsx`, `firstYearEntry.ts`, `firstYearDaySummaryPrompt.ts`, `ttcSupportMoment.ts` ("Ask Cindy"), and in the backend string `DAY_RECAP_UNAVAILABLE_ANSWER`. Public pages have no name and no neutral fallback pattern yet.

## 8. Current privacy and safety findings

Privacy: no private context in URLs; context builders are bounded and non-identifying; analytics has one `"ask"` value and no AI payloads. Risks for a site-wide panel: an always-present composer invites users to type identifying free text into a public unauthenticated endpoint; a shared panel could easily pick up richer page state than the current per-surface builders allow; any future chat history would create the first store of user-authored health questions; the legacy `q` param path still accepts free text in a URL.

Safety already present: non-diagnostic prompts, no medically-reviewed claims, urgent interception before the model, NHS-only sources, no invented citations, and in `ttc_companion` explicit bans on pregnancy or ovulation confirmation, symptom or test interpretation, blanket reassurance, fear or pressure wording, and on discouraging professional advice.

Gaps: `pregnancy_week_companion` still uses the general prompt, so it lacks pregnancy-specific bans on symptom interpretation and reassurance. `general` and `first_year_companion` lack the TTC-style explicit no-risk-scoring and no-blanket-reassurance clauses. There is no multi-turn safety rule (history could be used to walk the model into diagnosis). Rate limiting is per fingerprint, not per conversation length, so a chat panel multiplies request volume.

## 9. Current duplication or old UI surfaces

About a dozen near-identical "Common questions" sections (TTC, Pregnancy, First Year, Postpartum, Toddler, Family, IVF, Week), three trimester support strips plus three week bridges, and two overlapping input components (`AISearchBar` and the bespoke input inside `FirstYearCommonQuestions`). `AskPage` holds five large hardcoded topic-suggestion maps that belong in `src/data/`.

## 10. What to keep

`ai-search`, `ai-reflect`, `aiModes.ts`, `validation.ts`, rate limiter, NHS allowlist, urgent interception, `useAISearch`, `askNavigation`, all three context builders, `useCompanionIdentity`, `aiStageStyles`, `EditorialAnswer`.

## 11. What to reuse

`useAISearch` unchanged as the transport. `EditorialAnswer` for rendering. `aiStageStyles` for per-stage tone. The context-builder pattern for a new page-aware builder. `AskLink` as the handoff into `/ask`. Suggestion lists as data for the panel's starter chips.

## 12. What not to delete yet

Nothing. Keep `/ask`, every `AskLink` call site, `AISearchBar`, `HubAISupport`, all journey ask cards and all hub question sections until the panel ships and is verified on both public and signed-in routes.

## 13. What can later be retired

After the panel is stable: the per-hub "Common questions" duplicates collapse into one data-driven section; `FirstYearCommonQuestions`'s bespoke input folds into `AISearchBar`; trimester strips and week bridges converge; `AskPage`'s suggestion maps move to `src/data/`. `/ask` itself stays.

## 14. Recommended site-wide companion architecture

1. Backend unchanged.
2. `CompanionProvider` context: open/close state, current mode, current context string, message list, delegates to `useAISearch`.
3. `CompanionLauncher` (floating pill) plus `CompanionPanel` (sheet on mobile, right panel on desktop), mounted once in the app shell and respecting `navInset` so it never collides with `JourneyBottomNav`.
4. `useCompanionSurface()` resolves mode, stage styling, placeholder and starter chips from the current route.
5. `buildPageCompanionContext()` composes a bounded, allowlisted context; journey pages pass their existing builder's output instead.
6. `/ask` stays: "Open the full page" carries the current question and context in router state.
7. Header and empty state use `useCompanionIdentity().name`, falling back to "your companion" / "Ask about this" with no hardcoded name.
8. Text chat first: in-memory turns for the session only, no persistence.
9. Voice output, voice input and real-time voice deferred behind provider flags.
10. Old surfaces retired only after the panel is verified.

## 15. Recommended mode-routing strategy

Single pure resolver mapping pathname to mode: `/trying-to-conceive*`, `/my-ttc-journey*`, ovulation tools to `ttc_companion`; `/pregnancy*`, `/my-week`, `/my-journey`, toolkit and week routes to `pregnancy_week_companion`; `/first-year*`, `/my-first-year*` to `first_year_companion`; everything else to `general`. `first_year_day_recap` stays owned by the Today card and is never selectable from the panel. Unknown routes fall to `general` by default.

## 16. Recommended context strategy

One builder, allowlist in and nothing else: mode, coarse stage or week or cycle day, day-and-month dates only, tone hint, one short page hint, plus article slug or title where it helps grounding. Never notes, reflections, media, names, emails, ids or rows. Reuse the existing 500-char cap and the existing unit-test style so the boundary is provable. URLs keep only `stage`, `journey`, `topic`.

## 17. Recommended `/ask` fallback strategy

`/ask` remains a real, linkable, SEO-safe page and the destination when the panel cannot render (narrow viewports, panel error, deep link, "read the full answer"). Handoff passes question and context via router state only. Existing `AskLink` call sites keep working untouched.

## 18. Voice roadmap (audit only, nothing added)

- Listen to answer: gateway text-to-speech in a new JWT-protected edge function returning audio; needs a play/stop control, no autoplay, a per-user cost cap, and a rule that urgent or recap answers are not spoken.
- Voice style selection: a display-only preference alongside companion tone; would need a profile column later.
- Speech-to-text input: microphone permission prompt, explicit press-to-talk, audio never stored, transcript shown for confirmation before sending; browser support and background-noise accuracy are the main risks.
- Real-time conversation: a realtime session token minted server-side, WebRTC or WebSocket, plus streaming safety filtering. Highest risk: urgent-wording interception is currently text-and-request based, so realtime speech could bypass it. Not viable until the guardrails move into a stream-aware layer.

## 19. Risks and blockers

An always-visible composer on a public unauthenticated endpoint raises abuse and cost exposure; the panel must reuse the existing rate limiter and surface 429s calmly. Multi-turn history is the main new safety and privacy surface. `pregnancy_week_companion` prompt parity is a real gap. Hardcoded "Cindy" strings will read wrongly for users who chose another name. Panel z-index and inset must not regress the Phase 26L/27C navigation fixes.

## 20. Recommended Phase 29B scope

Text-only, presentation-first, no schema and no backend change:

1. `CompanionProvider`, `CompanionLauncher`, `CompanionPanel` mounted in the app shell.
2. Pure route-to-mode resolver plus the bounded page-context builder, both unit tested.
3. Companion-name-aware header with a neutral fallback and zero hardcoded names in the new code.
4. Streaming answers via `useAISearch`, session-only turns, calm error and rate-limit states.
5. "Open the full page" handoff to `/ask` via router state.
6. No deletions of existing Ask surfaces.

Deferred: prompt parity for `pregnancy_week_companion`, persisted chat history, analytics events, hardcoded-name cleanup, and all voice work.
