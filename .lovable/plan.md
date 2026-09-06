# AIC-J1 — Journey-aware companion: audit and architecture gate

Voice stays paused exactly where it is: AIC-6, AIC-7A and the AIC-7B provider gate are untouched, AssemblyAI remains the selected provider, no bootstrap endpoint, no microphone, no TTS, both voice flags OFF. Nothing below changes AIC-5, grounding (`30B-source-routing-v1` / 0 / 0 / []), memory or persistent history.

## Audit findings

**1. Journey inventory (what actually exists).** Saved, authenticated journeys: pregnancy (`pregnancy_journeys`, plus legacy `saved_journeys`), trying to conceive (`ttc_journeys`), first year (`babies`, `first_year_journeys`, `archived_journeys`). Content-only families with no personal state: IVF, toddler, family, postpartum (now redirected into First Year, legacy route kept), preparing for baby, support.

**2. Architecture.** One pointer, `journeys.lifecycle` (`pregnancy | ttc | first_year`), written atomically with the payload by SECURITY DEFINER RPCs. One resolver, one prompt renderer, one endpoint. Both surfaces (panel, `/ask`) share `useCompanionConversation` → `useAISearch` → `ai-search`.

**3. JourneyContextV1.** Version 1 envelope with three separate layers. `personal` is a discriminated union limited to the three saved journeys (pregnancy week 1–42 and trimester; TTC stage plus `ivfInTreatment`; first-year month 0–11). `page` and `entry` use the broader content taxonomy with bounded page types, topics and titles. Every string is capped at 80 characters and stripped of control characters and angle brackets, so a title cannot forge the prompt block. The server re-validates and rejects unknown keys, wrong versions, bad enums and out-of-range numbers; an empty envelope is dropped entirely.

**4. Resolver and provenance.** Session → lifecycle pointer → one column-scoped read of the relevant table. Non-active pregnancy statuses (given birth, loss, no longer pregnant, paused) never produce a stage. Multiple babies with no unique primary produce no age rather than a guess. Every failure path fails open to null. Page and entry are built from the route and from the authoritative `stage`/`journey`/`topic` query parameters only, and structurally cannot write into `personal`.

**5–6. Unknown handling.** Unknown is already a first-class state everywhere: no stage is fabricated, and the prompt block simply omits absent lines.

**7. Page coverage.** Mapped: TTC and its tools, IVF, pregnancy and its tools/weeks, preparing for baby, first year, postpartum, toddler, family, support. Unmapped (no page context at all): the homepage, about, product, account settings, privacy, terms, journal start, and any article not under a mapped prefix.

**8–9. Entry points and suggestions.** Entry points: global launcher/panel, `/ask`, and `HubAISupport`/`AskLink` affordances on hubs, topic pages, article pages and week pages. Suggested questions come from at least four parallel systems: mode-based starters (four modes only), per-topic `config.aiPrompts`, content-driven `data.aiPrompts` for articles and weeks, and two large suggestion maps written inline inside `/ask`. Several hubs pass an empty array and show no chips.

**10–11. Page versus journey precedence.** Already correct in principle: saved details, page content and entry are rendered as three labelled sections, and the trusted system-prompt rules state that the current message outranks saved details and that page/entry are content, never identity. Recommended explicit order, matching what the code already does: current message > `personal` > `entry` > `page` > unknown. Reassurance and safety rules are appended last so they outrank all of it.

**12–13. Transitions and refresh.** The pointer is single-valued, so a transition flips context wholesale with no lingering old-journey state and no inferred lifecycle memory. Journey context is re-resolved at send time from a live route ref, so a new question after navigation carries current context while past turns stay untouched. Personal resolution is cached per session and invalidated on auth change; it is not invalidated when someone changes their journey in-app.

**14–15. Gaps and duplication.** IVF has rich content and a timeline but only a single boolean of personal state. Toddler and family have no personal state at all, which is correct today because the product stores none. Unmapped routes give the companion nothing. Four suggestion systems can drift between a hub page and `/ask`. Starters exist for only four modes.

**16–18. Privacy, safety, inference risks.** No leak found: no names, dates, notes, identifiers or free user text enter the context; only derived enums and numbers. Residual risks are (a) content titles from sensitive support articles echoing into the prompt as page context, mitigated only by prompt instruction, (b) a stale primary-baby flag misattributing age, (c) the temptation to let journey data imply urgency. Journey data must never influence GREEN/AMBER/RED/CRISIS; today it only passes the journey family label to the gated AMBER classifier.

**19–21. Frozen systems interaction.** Journey awareness needs no grounding, memory or persistent history change. Session continuity under existing semantics is sufficient.

**30–32. Verdict.** The hypothesis holds: the companion is already mature enough to become journey-aware before voice, and voice will inherit it unchanged because transcripts will enter the same `send()` path. No blocker requires voice first. **AIC-J1 — SAFE TO BUILD.**

## Recommended architecture (for approval, not yet built)

- **Contract:** keep JourneyContextV1 as-is for personal. Extend only `page` coverage and, if approved later, add an IVF personal shape once the product actually stores IVF stage. No new hidden fields, no inference.
- **Prompt strategy:** no prompt rewrite. Optionally strengthen the fixed rules so the model names the current stage only when it is known, and offers navigation rather than open-ended conversation.
- **Suggested prompts:** one registry keyed by journey family plus optional stage, consumed by hubs, topic pages and `/ask` alike, replacing the inline maps in `/ask`. Journey-aware, never medical assertions, never prescriptive.
- **Next actions:** only real destinations — journey section, calculators, toolkit checklists, journal, week/month pages, guidance pages, ask the companion. No booking, messaging, records or clinician contact; AIC-5C boundaries untouched.
- **Entry points:** contextual affordances only, all opening the existing companion runtime. No third chat, no journey chat route, no new endpoint or store.
- **Evaluation matrix:** no context, broad context, precise context, conflicting page versus journey, unknown stage, recent transition — scored for relevance, stage appropriateness, safety, unsupported assumptions, repetition, clarification behaviour, across pregnancy, TTC and first year.

## Proposed slices (each separately approved)

1. **J2 — page-context coverage:** map the unmapped routes, add tests. No prompt change.
2. **J3 — suggestion registry:** single journey-aware source, remove the `/ask` inline duplicates.
3. **J4 — contextual entry points:** consistent "ask about this stage" affordances that hand off into the existing companion.
4. **J5 — next-action layer:** stage-appropriate real destinations surfaced alongside answers.
5. **J6 — journey evaluation pass:** run the matrix and report before any prompt tuning.
6. **J7 — resolver freshness:** invalidate cached personal context when journey state changes in-app.

Files likely to change: journey context builders, the shared suggestion source and its consumers, hub/topic Ask components, `/ask`, focused tests, docs, roadmap. Files that must remain untouched: everything under AIC-5 (safety router, urgent patterns, AMBER, clarification, boundaries, emotional guidance), grounding and source routing, memory and history gating, all voice modules, ADRs and provider docs, and `ai-search` prompt assembly beyond what a slice explicitly approves.
