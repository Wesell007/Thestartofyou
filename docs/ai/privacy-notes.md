# Privacy and data protection notes

## 1. Sensitivity

This product handles pregnancy, fertility, IVF, loss, infant health and mental health information. In UK data protection terms this is special category health data, and fertility and loss context is among the most sensitive material a person will ever type into an app. Every AI decision is made on that basis: the default is not to send it.

## 2. What the AI receives today

Per request, only:

- the latest question, as typed
- a bounded context string, capped at 500 characters, built by allowlist
- the resolved mode

The context builders (`pregnancyAiContext.ts`, `companionPanelContext.ts`, `ttcAskContext.ts`, `firstYearCompanionContext.ts`) derive their values from the route and coarse stage facts: route family, pregnancy week and trimester, coarse first-year age, tone preference, a short public page label.

Phase 29F narrowed the pregnancy surfaces to a single contract in `pregnancyAiContext.ts`. Allowed: `journey`, `weekNumber`, `trimester`, `pageFamily`, `pageTopic`, `toneHint`, `contextSource`. Two safeguards hold it: the builder picks each approved field explicitly at runtime and never spreads or serialises the input object, and `pageTopic` may only be a short public page label, never the person's question or any private record. The My Week card no longer sends the due date day and month; no pregnancy context now contains a date of any kind.

Deliberately excluded by construction: names, emails, user IDs, child IDs, pregnancy IDs, journal and reflection text, note and log content, memory entries, photo, video and voice data, media URLs, exact private dates, cycle detail beyond coarse stage, and chat history.

## 3. What is not persisted

- Companion turns live in React state only and are dropped on unmount or "Start again".
- No chat history is written to the database, storage, the URL, analytics or logs.
- No AI answer is stored against a user.
- The `ai-search` function logs only failure categories and statuses, never question content, context or answers.

## 4. Rules to hold

1. **Data minimisation.** A new AI surface starts with no context and earns each field with a written justification.
2. **No private content by default.** Journal, log, note, memory and media content is never sent, in any mode, unless a future permissioned-memory design explicitly allows it.
3. **No identifiers.** Names and IDs never go into a prompt. A chosen companion name is used only in UI copy, never sent as context.
4. **Log hygiene.** No question text, context, answer text, or personal or health data in logs, error messages or analytics properties.
5. **No real user data in QA.** All evaluation and manual testing uses synthetic prompts. Production tables are not read to build test cases.
6. **Rate limiting stays pseudonymous.** The limiter fingerprints a salted hash of IP and user agent; it must not become an identity.
7. **Third-party flow.** Requests go to the Lovable AI Gateway from server-side code only. The API key never reaches the browser.

## 5. Preconditions for future memory work

The full design is in `memory-design.md` (Phase 29G, specification only), and the table, policy, deletion and validation shape it implies is reviewed in `memory-schema-rls-design.md` (Phase 29H, design review only). Nothing in either is built: no schema, table, migration, RLS policy, settings screen or memory behaviour exists today. This section is the privacy summary of that design and the list of things that must exist before memory ships.

Governing rules from the design:

- the companion never silently remembers anything from a conversation; memory exists only because a category was turned on or an item was deliberately saved
- memory is permissioned, transparent, editable, deletable and reversible
- memory is off by default; sensitive memory (category F: symptoms, loss, fertility treatment, mental health, abuse, baby health, medication) is excluded entirely and has no on switch
- journal, reflection and media content is not used by default, and sits behind its own separate toggle
- memory is separate from chat history, journal content and clinical records
- memory belongs to a journey and must not cross into another one

Memory must not ship until all of the following exist:

- explicit opt-in per level, separate from account creation and from analytics consent, with the consent version recorded
- a plain description of exactly what is remembered, in the person's own words where possible
- a visible list of remembered items with per-item edit, per-item delete, delete-all and pause
- a strict allowlist of what can be remembered, with sensitive categories excluded rather than merely defaulted off
- retention limits and automatic expiry: continuity in days, preferences and saved facts on a monthly review date, journey state cleared on stage change
- export and deletion behaviour joined up with the existing account deletion flow
- a documented answer to what memory is written to, where it lives, and who can read it, including owner-scoped RLS and grants; the reviewed answer is `memory-schema-rls-design.md`, which also blocks category F structurally rather than by flag, withholds anon and client delete grants, and confines service-role reads to one narrow access module
- a memory-off kill switch that disables memory reads globally without a deploy
- an evaluation set covering memory-specific failure modes: stale facts, wrong stage, wrong child, loss-insensitive recall, cross-journey leakage, and reuse of deleted memory


## 6. Loss and stage transitions

Any future personalisation must handle a pregnancy or TTC journey ending badly. A companion that keeps referring to a stage a person has left is a serious harm, not a cosmetic bug. Stage changes must be user-controlled, reversible, and never inferred from silence.

## 7. Deletion and export

Nothing AI-related is persisted today, so account deletion already covers it. If any AI artefact becomes persistent (memory, saved answers, feedback reports), it must be included in the deletion path in `supabase/functions/delete-account/index.ts` in the same change that creates it, and be exportable alongside the person's other data.
