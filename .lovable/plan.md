# Phase 16.0 — First Year and Postpartum Readiness Audit

Audit and planning only. No code changes in this phase. The output is a readiness assessment plus a staged build order, including the AI Companion Continuity and Memory Choice direction.

---

## Current state (verified)

| Area | State today |
| --- | --- |
| First Year hub | Rich public editorial system: hub, phases (0-3, 3-6, 6-9, 9-12), month pages 0-12, eight topic areas, article dataset. No signed-in First Year journey surface. |
| Postpartum hub | Public editorial page composed of 14 sections (`src/pages/Postpartum.tsx`). No signed-in surface, no recovery tools. |
| Signed-in journey | Pregnancy only: `/my-week`, `/my-journey`, `/kept-chapter`, `/pregnancy-toolkit/*`. `journeys` and `pregnancy_journeys` carry lifecycle and status; `archived_journeys` stores completed snapshots. |
| Companion identity | `profiles.companion_name` and `profiles.companion_tone`, read by `useCompanionIdentity`. Display only. |
| Companion AI | `SectionAskAI` on `/my-week` plus `HubAISupport` on the First Year and Postpartum hubs. Both call the same `ai-search` function. Context is a short, non-identifying string built by `buildCompanionContext` (week, trimester, due day/month, tone, page hint), capped at 500 characters. |
| Memory privacy | Reflections, photos, videos, voice notes, toolkit notes and birth plan answers are never sent to the AI. `companionContext.test.ts` asserts this. |
| Birth transition | `SectionPregnancyComplete` routes a user who marks "given birth" to First Year, My Journey and Account Settings. No baby record, no date of birth, no handover, no First Year journey to land in. |

**Core gap:** at the moment a pregnancy ends, the product hands the user from a personal, signed-in weekly experience to a public editorial hub. Continuity of identity, stage and companion all stop at birth.

---

## AI Companion Continuity and Memory Choice

**Emotional goal: same companion, new chapter.** The companion should feel like it moved with the user, not like a new AI surface appeared.

### Language rules

Never describe this as machine learning, training or model memory. Approved product language:

- Companion memory
- Personal context
- What Cindy can use
- Carry my pregnancy journey forward

Copy must never imply private pregnancy data trains a model. The companion uses only what the user hands it, at the moment they ask.

### Transition screen (explored, not built in this phase)

Shown once when pregnancy is marked complete or given birth. Three choices, no default pre-selected:

1. **Continue gently** — Cindy supports First Year and Postpartum using baby age, stage and page context only. No pregnancy memories or private notes are used.
2. **Personalise Cindy with my pregnancy journey** — Cindy can use selected details the user approves: baby date of birth, birth story summary, pregnancy stage history, selected memories. Viewable, editable and switchable off at any time.
3. **Decide later** — user enters First Year without memory-aware AI. The choice remains available in Account Settings.

### Birth Story Handover (future concept)

A short optional form, user-authored, never auto-extracted:

- Baby date of birth
- Baby name, optional
- Birth story summary, optional
- How the parent wants this chapter remembered
- Anything they want Cindy to know
- Anything they do not want Cindy to use

The AI must not automatically read pregnancy reflections, photos, videos, voice notes, toolkit notes or birth plan notes. Carry-forward is opt-in, item by item.

### First safe AI version (recommended default)

The version to actually ship first:

- Same companion identity (`companion_name`)
- Same companion tone (`companion_tone`)
- First Year and Postpartum stage context
- Baby age, derived from a date of birth the user gives directly
- Page context
- No automatic access to private memories

This is the existing `buildCompanionContext` pattern extended to a new lifecycle, with the same 500-character cap and the same memory-blind tests. Low risk, and it already delivers "same companion, new chapter".

### Future conversational direction (assessed, gated)

Later possibilities across pregnancy, first year and postpartum: a fuller chat interface, voice note input, spoken replies, night-time companion mode, memory summaries, user-selected memory context.

Full memory-aware AI should not be built until all of the following ship with it:

- Clear opt-in
- View what the companion remembers
- Delete companion memory
- Turn memory off
- Sensitive content controls
- No hidden use of private notes
- No automatic use of loss, mental health or birth trauma content
- Clear privacy copy

### Benchmarks

Huckleberry for baby rhythm and tracking. Beacon for postpartum emotional support and night-time reassurance. The Start of You goes further by keeping the *same* companion across pregnancy, first year and postpartum. No copying of either product's UI, wording, branding, screenshots, feature names, layouts or flows.

---

## Readiness gaps beyond AI

1. **No baby record.** No date of birth, so no baby age, no First Year week or month resolution, no age-aware content. This blocks everything else.
2. **No First Year lifecycle.** `journeys.lifecycle` supports the concept but nothing writes or reads a first-year journey.
3. **No signed-in First Year surface.** No equivalent of `/my-week` for months 0-12.
4. **No postpartum recovery surface.** The recovery window (0-12 weeks) has editorial content but no personal tracking or reassurance surface.
5. **Memory continuity.** Pregnancy memories live in `week_media_memories` and `week_photos` keyed by pregnancy week. First Year memories need their own keying, and the kept pregnancy chapter must stay reachable and read-only.
6. **Sensitive states.** `pregnancy_loss`, `no_longer_pregnant` and `paused` must never be routed into a First Year or baby-age flow. The existing reveal gates set the pattern to follow.

---

## Recommended build order

| Phase | Scope |
| --- | --- |
| 16.1 | Baby record foundation: date of birth, optional name, first-year lifecycle, age derivation helpers, sensitive-state guards. Migration phase. |
| 16.2 | Birth transition screen with the three companion choices and the consent record. Copy-led, no memory reading. |
| 16.3 | Signed-in First Year surface: month-aware personal page, memory capture, kept-chapter link back to pregnancy. |
| 16.4 | Postpartum recovery surface for the 0-12 week window, including night-time reassurance framing. |
| 16.5 | Companion continuity, safe version: extend `buildCompanionContext` to first-year and postpartum stages with baby age and page context only, plus memory-blind tests. |
| 16.6 | Optional Birth Story Handover and user-selected memory context, only with the full consent controls listed above. |

---

## Technical notes

- Extend `buildCompanionContext` with a lifecycle discriminator rather than adding a second context builder, so the 500-character cap and the memory-blind test suite cover both chapters.
- Companion consent should be a stored, explicit record (choice, timestamp, and the specific items approved), not a boolean inferred from other data.
- Baby age derivation belongs in a pure helper alongside `pregnancyDates.ts`, unit tested at week and month boundaries.
- Every new table follows the existing pattern: `auth.uid()` scoping, explicit grants for `authenticated` and `service_role`, no `anon` CRUD.
- No changes to the `ai-search` function contract in the safe version; only the client-built context string changes.

---

## Out of scope for Phase 16.0

No migrations, no new routes, no AI prompt changes, no content generation. This phase ends with this document.
