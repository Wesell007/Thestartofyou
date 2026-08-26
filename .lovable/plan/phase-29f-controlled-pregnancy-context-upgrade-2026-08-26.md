# Phase 29F - Controlled Pregnancy Context Upgrade

Give the pregnancy companion a small, safe sense of where someone is in their journey, without any personal or private data reaching the AI.

## What changes for the reader

Ask a question from a pregnancy page and the answer lands closer to the mark: it knows the stage (week and trimester where the app already has it), the surface being used (My Week, Toolkit, Journey, week detail, due date, Ask) and the page topic. Nothing else. No names, no dates, no journal or note content, no logs, no appointments.

## 1. Safe pregnancy context contract

New pure module `src/lib/pregnancyAiContext.ts` defining the only fields a pregnancy AI call may carry:

- `journey: "pregnancy"`
- `weekNumber` (1-42, only when already known from route or existing app state)
- `trimester` (derived from `weekNumber`, never from a date)
- `pageFamily`: `my-week` | `week-detail` | `journey` | `toolkit` | `due-date` | `pregnancy-guidance` | `ask`
- `pageTopic` (short public label, cleaned and truncated)
- `toneHint`: `calm` | `practical` | `reassuring`
- `contextSource`: `route` | `savedJourney` | `page`

The module file header lists the excluded fields explicitly (due date, LMP, names, IDs, journal, notes, reflections, symptoms, media, logs, appointments, medical history) so future edits inherit the rule. The type has no index signature, so no extra field can be smuggled in.

### Mandatory safeguards

- **Runtime allowlist.** The builder picks `journey`, `weekNumber`, `trimester`, `pageFamily`, `pageTopic`, `toneHint` and `contextSource` one field at a time, validating each against its allowed values. The raw input object is never spread, stringified, serialised or forwarded, so unknown keys cannot pass through even when supplied by mistake.
- **`pageTopic` is a public page label only** (for example "baby movements", "hospital bag", "week detail"). Never the user's question, symptoms, notes, journal content, reflections, appointment content, logs, medical history or any free-text record. The question is already sent separately as the prompt and is never duplicated into the context object.
- **Excluded fields never reach the built string**, and tests prove they are ignored even when passed as extra properties.


## 2. Context builder

`buildPregnancyAiContext(input)` returns a bounded single-paragraph string in the existing house style:

```text
Journey: pregnancy. Current stage: week 18, second trimester. Surface: My Week. Topic: baby movements. Tone: calm and practical. Answer the question that was asked; the page is background only.
```

Rules:

- Pure function. No Supabase reads, no localStorage reads, no network, no side effects.
- Degrades gracefully: missing week drops the stage sentence, missing topic drops the topic sentence, an empty input still yields a valid journey line.
- Week is clamped to 1-42 and rejected when not a finite number; trimester reuses the existing `trimesterLabel` logic from `src/lib/companionContext.ts` (imported, not duplicated).
- Output is capped at the existing shared 500-character limit; the cap constant is re-exported so the ceiling stays in one place.
- Also exports `resolvePregnancyPageFamily(pathname)` — a pure route mapper for `/my-week`, `/my-week/:week`, `/my-journey`, `/pregnancy-toolkit`, `/pregnancy/week/:week`, `/due-date-calculator`, `/due-date-results`, `/pregnancy`.

## 3. Wiring the existing surfaces

No UI redesign, no new components, no route changes.

- `src/lib/companion/companionPanelContext.ts`: when the resolved mode is `pregnancy_week_companion`, delegate to the pregnancy builder so the panel gains page family plus week when it is present. Other modes are untouched.
- `src/components/companion/CompanionProvider.tsx`: pass the current pathname-derived page family and, where the route already carries a week (`/my-week/:week`, `/pregnancy/week/:week`), that week number. Tone continues to come from the existing companion identity. No new data source is introduced.
- `src/components/myweek/SectionAskAI.tsx`: switch from `buildCompanionContext` to the pregnancy builder, passing the week it already receives as a prop and dropping the due-date day/month it currently sends — the new contract excludes it.
- `src/pages/AskPage.tsx`: unchanged behaviour; it keeps forwarding the context string it is handed.

Backend, prompts, modes, versions and hygiene are untouched apart from a version note (below).

## 4. Versioning and docs

- `supabase/functions/_shared/aiVersions.ts`: bump the context-contract marker and phase marker to 29F. No model, prompt or safety ruleset change, so prompt fingerprints stay identical.
- `docs/ai/system-map.md`: add the pregnancy context contract to the context-builder section.
- `docs/ai/privacy-notes.md`: record that due date day/month is no longer sent from the My Week card, and list the new allowlist.
- `docs/ai/roadmap.md`: mark 29F as in progress / pending validation during implementation, and only mark it closed once tests, lint, typecheck and build all pass.

## 5. Tests

New `src/lib/pregnancyAiContext.test.ts` covering, with synthetic input only:

- week to trimester boundaries (12/13, 27/28, 40/41), clamping and invalid input
- page family resolution for every pregnancy route, including trailing slashes and unknown paths
- graceful degradation with empty input and partial input
- output never exceeds the 500-character cap, with a long topic forced through
- a leak guard asserting the built string contains no due date, no year, no name-like field, and none of the excluded keys when they are passed as extra properties

Plus an update to the companion panel context test to cover the pregnancy delegation.

## Out of scope

Voice, memory, RAG, article grounding, vector search, persisted chat, proactive nudges, partner mode, agentic actions, Ask/companion redesign, schema, RLS, auth, routes, SEO, sitemap, and any access to real user data.
