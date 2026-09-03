# Permissioned memory and personalisation design

Phase 29G. **Design and specification only.** Nothing in this document is built. No schema, table, migration, RLS policy, settings screen, storage path or memory behaviour is created by this phase. Everything below is a contract that a later phase must satisfy before any memory ships.

Companion memory means facts the companion could carry between sessions. It is not chat history, not journal content and not a clinical record. Those three things stay where they are, and none of them becomes memory as a side effect of this design.

> **Superseded in part by AIC-3.** The mechanism described here as unbuilt is now
> implemented behind two feature flags — see `docs/ai/companion-memory.md` and
> `docs/ai/adr/ADR-AIC3.md`. AIC-3 changes nothing about the release gate: memory remains
> unreleased, and the outstanding legal and privacy review in `memory-mvp-readiness.md`
> is still open.

## 1. Principles

1. **The companion never silently remembers anything from a conversation.** Nothing said in a question, an answer or a recap becomes memory on its own. A memory exists only because the person turned a category on, or deliberately saved an item.
2. **Permissioned.** Memory is off by default. Each level is opted into separately, never bundled with account creation, analytics consent or a terms update.
3. **Transparent.** Everything remembered is visible in plain words the person would recognise. There is no hidden inferred profile.
4. **Editable.** Every item can be corrected. A wrong stage or a stale preference must be fixable in one place.
5. **Deletable.** Per-item delete and delete-all, immediate in effect, and joined to account deletion.
6. **Reversible.** Turning memory off, or pausing it, restores the unpersonalised companion exactly. No degraded state, no nagging to turn it back on.
7. **Minimal.** Each field earns its place with a written justification, as with the existing context allowlists. Coarse beats precise: a stage beats a date, a week number beats a due date.
8. **Journey-aware.** Memory belongs to a journey. Nothing from a trying-to-conceive chapter leaks into a first-year conversation, and stage changes are user-controlled, reversible and never inferred from silence.
9. **Sensitive memory is off by default,** and category F below is not implemented at all until a dedicated safety and privacy review.
10. **Journal content is not used by default.** It sits behind its own separate toggle, which stays off until deliberately turned on, and which can be turned off without losing the journal.
11. **Separate from chat history, journal content and clinical records.** Memory is a small set of labelled items, not a transcript, not an export of private writing, and never presented as a health record.
12. **Designed for trust, not surveillance.** If a feature would make someone feel watched, it does not ship, however useful the personalisation would be.

## 2. Memory taxonomy

| Category | Examples | Sensitivity | Default | May reach the model |
| --- | --- | --- | --- | --- |
| **A. Explicit preferences** | Companion tone, chosen companion name, short or detailed answers, British wording and units | Low to medium | Off, offered at level "Basic preferences" | Yes, once opted in. A chosen name stays in UI copy only, as today |
| **B. Journey state** | Trying to conceive, pregnant, postpartum, first year, toddler; pregnancy week or coarse baby age where already known | Sensitive | Off, offered at level "Journey context" | Yes, once opted in, at the coarseness already allowed by `pregnancyAiContext.ts` |
| **C. User-saved facts** | "Remember I prefer gentle reminders", "remember I want fewer emotional prompts", "remember I am preparing for a midwife appointment" | Depends entirely on what was typed | Off, requires an explicit save action per item | Yes, only the items saved, only when relevant |
| **D. Companion continuity** | Last topic area, a saved question thread, chosen support style, an unfinished checklist context | Medium | Off, offered at level "Journey context" | Yes, bounded and short-lived, with a hard expiry |
| **E. Private journal and reflections** | Journal entries, reflections, voice notes, video, photos | High | Off, behind its own separate toggle | No by default. Never as free text even if enabled; a later design would have to define what a derived, non-verbatim form looks like before this can be reconsidered |
| **F. Health, fertility and safety-sensitive content** | Symptoms, loss, fertility treatment, mental health, domestic abuse, baby health concerns, medication | Very high | Not implemented | No. Excluded from every level in this design |

Retention expectation by category: continuity (D) expires in days; preferences (A) and saved facts (C) carry a review date in months; journey state (B) is reviewed at every stage change and cleared when the person ends or changes a chapter. Category F is the explicit exclusion this phase is required to make. It is not "off by default"; it has no on switch to build against until a separate safety, clinical and legal review says otherwise, and that review is not part of the approved roadmap below.

## 3. Permission model

Five levels. They are cumulative in capability but each is a separate, individually revocable choice.

### 3.1 Memory off — default

- **Can save.** Nothing. No new memory is written for any category.
- **Cannot save.** Everything.
- **Consent surface.** None needed. This is the state a new person is in without doing anything.
- **Turning it off.** Not applicable; this is off.
- **Deletion.** Nothing exists to delete. Turning memory off later does not delete on its own — deletion is a separate, clearly labelled action, so nobody loses items by accident when they only meant to pause.
- **Behaviour.** Identical to today: the companion works from route-derived context only, within the existing 500-character cap.

### 3.2 Basic preferences

- **Can save.** Category A only.
- **Cannot save.** Journey state, saved facts, continuity, journal content, anything in category F.
- **Consent surface.** Memory settings section, and optionally a one-line offer the first time someone changes tone in the companion.
- **Turning it off.** One switch in memory settings. Existing preference items stay listed and can be deleted separately.
- **Deletion.** Per item and delete-all; effective immediately for the next request.
- **When off.** Default tone and answer length return.

### 3.3 Journey context

- **Can save.** Category B, plus category D continuity with a short expiry.
- **Cannot save.** Free-text facts, journal content, dates, names, IDs, anything in category F.
- **Consent surface.** Memory settings, and an in-context offer at the moment a journey is already being set up, never as an interstitial.
- **Turning it off.** One switch, independent of Basic preferences.
- **Deletion.** Per item and delete-all. Ending or changing a journey must also offer to clear the stage memory in the same step, worded gently, with no assumption about why the chapter changed.
- **When off.** The companion falls back to route-derived stage only, exactly as today.

### 3.4 Saved by me

- **Can save.** Category C, and only through a deliberate per-item save action with a visible confirmation of what will be stored.
- **Cannot save.** Anything captured automatically, anything inferred, anything in category F. If a save attempt matches a sensitive pattern, the item is not stored and the person is told plainly that this is not something the companion keeps.
- **Consent surface.** At the point of saving, plus the settings list.
- **Turning it off.** One switch. Items remain listed and individually deletable.
- **Deletion.** Per item and delete-all.
- **When off.** Saved items are not read and not sent.

### 3.5 Sensitive memory — not implemented

- **Can save.** Nothing. This level exists in the design so that a later team has to pass a named gate rather than quietly widening an existing level.
- **Requires before it can even be specified.** Separate consent, separate controls, separate deletion, a clinical and legal review, and a loss-sensitivity design.
- **Behaviour today and across the whole approved roadmap.** Category F is never written and never sent.

## 4. User controls specification

Specification only; no UI is built in this phase.

- **Memory settings section**, reachable from account settings and from the companion, with a plain summary of the current level.
- **View** every remembered item as a short, human-readable label with its category, journey, when it was added and when it expires.
- **Edit** an item's value or its label.
- **Delete one item**, with immediate effect and a single confirm.
- **Delete all memory**, including a clear statement that this does not delete the journal, journeys or account.
- **Pause memory** — stops new memory being written and stops existing memory being read, without deleting anything, with a one-tap resume.
- **Export memory** — later phase; must join the existing account export path when it exists.
- **Memory activity log** — later phase; a simple list of what was added, changed or deleted and when. Not a log of conversations.
- **A plain explanation surface** stating what is and is not remembered, in the same voice as the consent copy below.
- **Separate journal toggle**, default off, physically separate from the memory level switches so it can never be turned on by agreeing to something else.
- **Accessibility and parity.** Every control is keyboard reachable, labelled, and available on mobile at the same tap-target standard as the rest of the app.

## 5. Consent copy drafts

Plain British English, warm, no legalese, no dashes. Avoids "we know everything", "always remember", "safe", "risk-free", "medical record", "diagnosis" and "symptom checker".

**Memory off, the default**
> Right now your companion starts fresh every time. It does not keep anything you type, and it does not build a picture of you in the background. You can change that whenever you like, and change it back.

**Turning on basic memory**
> If you turn this on, your companion can keep a few small preferences, like how you want it to sound and whether you prefer short answers. That is all it keeps at this level. You can see the list, change it, or clear it at any point.

**Saving an individual memory**
> Would you like your companion to keep this? It will be saved as: "prefers gentle reminders". You will find it in your memory settings, and you can edit or remove it whenever you want.

**Using journey context**
> Your companion can use where you are in your journey, such as your week or your baby's age, so answers fit the chapter you are in. It uses the stage only. It does not keep your dates, your notes or anything you have written privately.

**Deleting memory**
> This clears everything your companion has kept. Your journal, your journeys and your account stay exactly as they are. Your companion will simply start fresh from here.

**Pausing memory**
> Pausing stops your companion adding anything new and stops it using what it already has. Nothing is deleted while it is paused, and you can pick it back up whenever you are ready.

**Journal not used by default**
> Your journal, reflections, photos and voice notes are yours. Your companion does not read them, and it will not use them in answers unless you ask it to with the separate switch below.

**Sensitive information notice**
> Some things are better not stored. Your companion does not keep details about symptoms, treatment, loss, medication or how you are coping, even if you mention them in a conversation. If you need support with any of that, it will point you towards someone who can help.

**When a save is declined**
> This is not something your companion keeps. Nothing has been saved. You can carry on talking about it here, and it will be gone when you close the conversation.

## 6. Data boundary specification

The shape a future memory record would need, as a contract. **No migration, table, column, index, grant or RLS policy is created in this phase.**

| Field | Purpose | Notes |
| --- | --- | --- |
| `memory_id` | Stable identifier | Never shown in a prompt |
| `user_id` | Owner | Every read and write owner-scoped in a later design |
| `memory_type` | Taxonomy category A to F | F is rejected at write time |
| `journey` | Journey the item belongs to | Scopes retrieval; prevents cross-journey leakage |
| `sensitivity_level` | Low, medium, high, excluded | Drives whether it may ever be sent |
| `source` | How it came to exist: user save, preference change, journey setup | Never "inferred from conversation" |
| `value` | The stored value | Short and structured where possible; free text only for category C |
| `user_visible_label` | What the person sees in settings | Must be plain and recognisable |
| `created_at`, `updated_at` | Timestamps | |
| `expires_at` / `review_at` | Retention limit | Continuity in days, preferences in months, all reviewable |
| `consent_version` | Which consent text was shown | Re-consent required when the text materially changes |
| `disabled_at` | Paused or level switched off | Disabled items are never read |
| `deleted_at` | Soft delete marker | Deleted items are never read, hard-removed on a defined schedule and on account deletion |

Non-fields, stated deliberately: no raw conversation turns, no journal or reflection text, no media references, no exact dates, no names, no child or pregnancy identifiers, no clinical values, no free-text health detail.

## 7. AI usage rules

1. Pass only memory relevant to the current journey and the current question. Relevance is decided before the request, not by the model.
2. Keep memory context bounded and inside the existing 500-character context cap, alongside route context rather than in addition to it. If the budget is exceeded, drop memory first.
3. Select fields explicitly at runtime, as `pregnancyAiContext.ts` does. Never spread, serialise or forward a raw memory record.
4. Never pass deleted, disabled or expired memory.
5. Never pass journal, reflection, note, log or media content unless the separate journal toggle is on, and even then only in a derived form defined by a future design.
6. Never pass category F content, in any mode, at any level.
7. Do not mention memory awkwardly. Personalisation shows in the fit of the answer, not in narration about remembering.
8. Never say "I remember everything", or imply a complete picture of the person.
9. Support "what do you remember about me?" with an honest, complete list of the items currently in play, or a plain statement that memory is off.
10. Support "forget that" and "that is wrong" as first-class paths that actually delete or correct the item, then confirm plainly.
11. Never infer a stage, a pregnancy, a loss or a health condition from private text or from silence. Stage changes are user-controlled only.
12. Recap and other non-clinical modes keep their existing restrictions; memory does not unlock wording those modes forbid.

## 8. Safety and privacy review gate

All of the following must be complete before any memory implementation ships. This block is mirrored into `release-gate.md`.

- Legal and privacy review of memory as special category data, recorded in writing
- Consent copy approved, with a consent version recorded
- Sensitivity taxonomy approved, including the exclusion of category F
- Deletion behaviour specified and joined to `supabase/functions/delete-account/index.ts` in the same change that creates persistence
- Export behaviour specified alongside the person's other data
- Schema and RLS design reviewed, owner-scoped, with grants written in the same migration
- Audit logging approach reviewed, with no question, answer, journal or health content in logs
- No real user data in testing; all cases synthetic
- Memory evaluation prompts added and passing
- Rollback plan defined and possible without a migration
- Memory-off kill switch defined, tested, and able to disable memory reads globally without a deploy
- Incident process in `observability-and-incidents.md` updated with memory-specific severities

## 9. Evaluation additions

Documentation only. `eval-dataset-v1.json` is unchanged by this phase; the scenarios are described in `eval-dataset-v1.md` and become real rows in the memory eval phase.

Scenarios: memory off; asking what is remembered; asking to forget something; asking to save a preference; sharing a sensitive health detail; sharing journal-like content; asking for a verdict using remembered context; asking to delete memory; cross-journey leakage; reuse of deleted memory; inferring pregnancy from private text.

## 10. Explicit exclusions

Not designed, not permitted and not to be added by a later phase without a new approval: persisted chat history, verbatim journal use, voice memory, retrieval over stored memory, vector search, article grounding via memory, proactive nudges, partner or family shared memory, agentic actions taken from memory, inferred profiling of any kind, and any use of memory to produce a verdict, a diagnosis or a risk score.
