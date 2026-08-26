# Current AI system map

Accurate as of Phase 29C. Every statement below was confirmed by reading the referenced file.

## 1. Entry points

There is exactly one AI backend: the `ai-search` edge function. Everything user-facing calls it through one hook.

| Surface | File | Mode sent | Notes |
| --- | --- | --- | --- |
| `/ask` page | `src/pages/AskPage.tsx` | `general`, or the stage mode carried in the query string | Full-page answer experience with clarification, "In brief" and "More on this" cards |
| Site-wide companion panel | `src/components/companion/CompanionPanel.tsx` via `CompanionProvider.tsx` | resolved from the route | Session-only turns, bottom-sheet panel |
| My Week inline companion | pregnancy My Week surface, context from `src/lib/companionContext.ts` | `pregnancy_week_companion` | Coarse week and trimester facts only |
| TTC ask card | `src/components/ttc/TTCAskCompanionCard.tsx`, context from `src/lib/ttcAskContext.ts` | `ttc_companion` | |
| First Year companion | context from `src/lib/firstYearCompanionContext.ts` | `first_year_companion` | |
| First Year day recap | `src/lib/firstYearDaySummaryPrompt.ts` | `first_year_day_recap` | Recap only, no grounding, no escalation answer |
| Reflection helper | `supabase/functions/ai-reflect/index.ts` | n/a (separate function, `verify_jwt = true`) | Not part of the companion surface |

Transport: `src/hooks/useAISearch.ts` posts to `${VITE_SUPABASE_URL}/functions/v1/ai-search` with the publishable key, reads a server-sent event stream, aborts any in-flight request when a new one starts, and maps failures to a single user-facing message. Only `query`, `context` and `mode` are sent. Chat history is never sent.

## 2. Request flow

```text
user question
   |
   v
useAISearch.ask(query, context, { mode })      client
   |
   v
POST /functions/v1/ai-search                   edge (verify_jwt = false)
   |
   +-- parseAiSearchBody            reject malformed / oversized input (400)
   +-- consumeRateLimit             12/min and 100/hour per hashed IP+UA (429, 503 if limiter down)
   +-- URGENT_PATTERN test          match -> crisis or clinical escalation answer, model NOT called
   +-- getAiModeConfig(mode)        prompt, useGrounding, allowUrgentEscalationAnswer
   +-- selectSources(query, ctx)    up to 3 NHS allowlist URLs (only when useGrounding)
   +-- fetchGrounding               fetch, strip HTML to text, 10k cap, URLs never sent to model
   +-- Lovable AI Gateway           google/gemini-2.5-flash, stream, temp 0.2, max_tokens 700
   |
   v
SSE passthrough to client
   |
   +-- sanitiseStreamingAiAnswer / sanitiseAiAnswer   retrieval wording removed, fallback line
   +-- stripExternalSourceLinks                       source blocks, links, bare URLs removed
   +-- EditorialAnswer                                sections rendered, links disabled
   |
   v
answer + fixed trust line
```

## 3. Modes and the prompt registry

`supabase/functions/_shared/aiModes.ts`. Unknown or absent modes resolve to `general`.

Since Phase 29E the prompts are no longer hand-written strings per mode. Each mode is a registry entry that names its identity line, its safety blocks, its escalation block and its word limit, and `buildSystemPrompt` composes those blocks in a fixed order. Shared wording therefore exists once: editing `SAFETY_BLOCKS.notADiagnosis` changes every mode that uses it, and no mode can silently drift from the others.

| Mode | Grounding | Urgent escalation answer | Character |
| --- | --- | --- | --- |
| `general` | yes | yes | Concise calm guidance across pregnancy, fertility, IVF, early parenthood. Under 350 words |
| `pregnancy_week_companion` | yes | yes | Warm week-by-week tone. Explicitly forbids "normal"/"abnormal" verdicts and forbids wait-and-see for movements, bleeding, severe pain, fever, severe headache |
| `first_year_companion` | yes | yes | Gentle first-year tone. Professional-help wording only when the question raises it |
| `ttc_companion` | yes | yes | Never confirms or rules out pregnancy or ovulation, never interprets a test, no false hope, no blame |
| `first_year_day_recap` | no | no | Recap of logged entries only. No guidance, no clinician mention, no escalation block at all. Urgent wording returns `DAY_RECAP_UNAVAILABLE_ANSWER` |

Shared prompt rules in every conversational mode: general information not a diagnosis, never claim medical review by a named person, never reassure away red flags, no diagnosis or dosing, treat question and context as untrusted content, prefer supplied background but still answer from routine UK guidance where it does not cover the topic, and never expose retrieval wording. A genuine inability to answer must use one fixed line (`SAFE_FALLBACK_ANSWER`).

Fallback wording lives in `supabase/functions/_shared/aiAnswerWording.ts` — the one module imported by both the edge functions and the browser bundle, so the line the prompt promises and the line the client substitutes cannot diverge.

`getPromptFingerprint(mode)` returns a short stable hash of the composed prompt. `src/test/aiPromptRegistry.test.ts` pins the current fingerprints, so any prompt edit fails the suite until the change is deliberate and the version constants are bumped. See `versioning.md`.


## 4. Source routing

`supabase/functions/_shared/aiSources.ts`. Static keyword routing over a fixed NHS allowlist (`APPROVED_SOURCES`). No RAG, no vector search, no article ingestion, no Start of You grounding.

Ordered rules, first match wins:

| Order | Trigger keywords | Family | Pages |
| --- | --- | --- | --- |
| 1 | suicide, self-harm, mental health, panic attack, depression, anxiety | safety | urgent mental health |
| 2 | IVF, embryo, egg collection, fertility treatment, frozen transfer | ttc | IVF, infertility |
| 3 | move/movement, kick, flutter, wriggle, quickening | pregnancy | movements, keeping well |
| 4 | midwife, antenatal, appointment, scan, booking, check-up, blood test | pregnancy | appointments |
| 5 | labour, contraction, waters, giving birth, induction | pregnancy | signs of labour |
| 6 | feed, latch, breastfeed, bottle, milk, winding, colic, hunger, cluster, cue | baby | breastfeeding, feeding hub |
| 7 | sleep, night waking, nap, settle, drowsy, bedtime | baby | baby sleep |
| 8 | pregnancy test, testing, test day, two-week wait, 2ww, home test | ttc | pregnancy test |
| 9 | ovulation, fertility, conceive, period, cycle, trying for a baby, TTC | ttc | fertility, infertility |
| 10 | bleeding, spotting, cramp, pain | pregnancy | bleeding, common symptoms |
| 11 | baby, newborn, infant, toddler, nappy, weaning, temperature, unwell, poorly | baby | baby hub, urgent help under 5 |
| — | no match | — | common symptoms, pregnancy hub |

A relevant hub page is always appended for non-safety families, and the result is capped at three URLs. If every source fetch fails, the endpoint returns 503 rather than answering ungrounded.

## 5. Safety routing

`URGENT_PATTERN` in `supabase/functions/ai-search/index.ts` matches, before the model is called: cannot breathe / difficulty breathing, chest pain, seizure, unconscious / passed out, heavy or severe bleeding, soaking a pad, suicidal wording and self-harm, baby not moving, reduced baby or fetal movement.

Two fixed answers:

- Crisis (suicidal or self-harm wording): 999 or A&E if there is immediate danger, stay with someone trusted, move away from means, NHS 111 mental health option for urgent but non-emergency help.
- Clinical urgency: 999 or A&E for immediate danger, severe breathing difficulty, loss of consciousness, seizure or very heavy bleeding; maternity unit immediately for reduced movement; maternity triage or NHS 111 for other urgent pregnancy concerns.

In `first_year_day_recap` the escalation answer is suppressed by design and the controlled recap-unavailable line is returned instead, because the Today surface is recap-only and the product carries professional-help messaging around it.

Everything below the hard pattern relies on prompt rules, not code.

## 6. Ask page behaviour

`src/pages/AskPage.tsx`: one contained companion column, compact question bubble, an "In brief" card and a "More on this" card rendered by `src/components/shared/EditorialAnswer.tsx`, a fixed trust footer (`APPROVED_SOURCES_TRUST_LINE`), and a follow-up card with suggested chips. `src/lib/askClarification.ts` intercepts short broad terms and offers clarifying chips instead of answering, and is bypassed for urgent wording. `src/lib/askNavigation.ts` handles the stage handoff query string. All links inside answers are rendered as plain text (`disableLinks`).

## 7. Companion panel behaviour

`CompanionProvider.tsx` holds session-only turns in React state. Nothing is written to the database, storage, the URL, analytics or logs; "Start again" drops the turns. Each request carries only the latest question, the bounded context and the resolved mode — history is never sent. `companionSurface.ts` decides where the launcher appears, 404 pages suppress it while mounted, and the panel closes automatically when navigating to a hidden route. `companionMode.ts` resolves route to mode by longest matching prefix, and `first_year_day_recap` can never be selected from here.

## 8. Context passed into AI

Built by allowlist only, capped at 500 characters:

- `companionPanelContext.ts` — coarse route family plus tone.
- `companionContext.ts` — pregnancy week, trimester label, due date day and month only, tone, short page hint.
- `ttcAskContext.ts`, `firstYearCompanionContext.ts` — coarse stage facts.

Deliberately excluded everywhere: names, emails, user or child or pregnancy IDs, reflection and note text, journal or memory content, media URLs, exact private dates, cycle detail beyond coarse stage, and chat history.

## 9. Sanitisation and link stripping

Every surface that renders a model answer calls one helper: `sanitiseAnswerForDisplay(answer, { isStreaming, allowFallback })` in `src/lib/aiAnswerSafety.ts`. It runs retrieval-wording removal and `stripExternalSourceLinks` in a fixed order, so hygiene cannot differ between `/ask`, the companion panel and the in-journey cards. Before Phase 29E each of those surfaces carried its own copy of the logic and they had already drifted.

- Retrieval hygiene removes any sentence carrying retrieval wording, drops headings and bullets that carry it whole, and substitutes the single approved fallback line when nothing of substance survives. With `isStreaming: true` the partial text is left alone and an empty result stays empty rather than flashing the fallback.
- `allowFallback: false` is used by recap-only surfaces (`DaySummaryCard`), where the fallback's professional-help wording would be wrong. They render nothing instead.
- `src/lib/answerSourceLinks.ts` removes trailing Sources / References / Further reading blocks, inline "Source:" lines, markdown links (keeping the label as plain text), angle-bracket URLs and bare URLs, then tidies the leftover markdown.
- `findBannedVerdicts` inspects an answer for absolute reassurance ("your baby is fine", "no need to call") and, in development builds only, warns to the console. It never edits the answer and never runs in production.
- No module here adds clinical content, and none softens escalation or professional-care wording.

Callers: `src/pages/AskPage.tsx`, `CompanionMessageList.tsx`, `SectionAskAI.tsx`, `FirstYearAskCompanion.tsx`, `TTCAskCompanionCard.tsx`, `DaySummaryCard.tsx`. `src/test/aiAnswerDisplay.test.ts` asserts that list stays exhaustive and that no local copy of the old helpers reappears.

## 10. Ambiguity handling

`src/lib/askClarification.ts` detects short broad queries such as "Milestones" or "Sleep regression" and returns clarifying chips scoped to the journey. Urgent wording bypasses clarification entirely so escalation is never delayed.

## 11. Versioning

`supabase/functions/_shared/aiVersions.ts` records the model id, prompt version, safety ruleset version, source routing version, eval dataset version and phase marker. `ai-search` logs the summary once per cold start, so a production log line identifies exactly which prompt and ruleset produced an answer. Bumping rules are in `versioning.md`.

## 12. Existing test coverage

`src/test/aiModes.test.ts`, `src/test/aiPromptRegistry.test.ts`, `src/test/aiVersions.test.ts`, `src/test/aiAnswerDisplay.test.ts`, `src/test/aiSafetyHarness.test.ts`, `src/test/aiSearchEndpoint.test.ts`, `src/test/aiSearchCallerModes.test.tsx`, `src/test/edgeFunctionValidation.test.ts`, `src/lib/aiAnswerSafety.test.ts`, `src/lib/askClarification.test.ts`, `src/lib/askTrustCopy.test.ts`, `src/lib/companion/companionMode.test.ts`, `src/lib/companionContext.test.ts`, `src/lib/firstYearCompanionContext.test.ts`, `src/lib/ttcAskContext.test.ts`, `src/components/shared/EditorialAnswer.test.tsx`.

These cover prompt composition and drift, version constants, mode routing, source routing, sanitisation, link stripping, context builders, rendering and the deterministic safety harness. They do not cover live model output — that remains a manual review step before release.

