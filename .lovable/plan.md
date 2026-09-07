# AIC-JA1 — Journal-Aware Companion: audit and architecture

Read-only audit. Nothing implemented, nothing deployed, voice untouched.

## 1. What journal data actually exists (repository truth)

Pregnancy / My Week
- `reflections` — id, user_id, `week`, `content`, `first_written_content`, `first_written_at`, created/updated. Free text per week. Edited in place (`SlotReflection`), read by `SlotCompanionRecall`, `MyJourney`, `KeptChapter`. `content` may be AI-shaped text the user accepted; `first_written_content` is her original. This is the only persistent AI-derived artefact in the journal today.
- `week_photos` — user_id, week, `storage_path`, `caption`. Bucket `weekly-photos` (private).
- `week_media_memories` — user_id, week, `media_type` (`video` | `voice_note`), storage_path, mime, size, `duration_seconds`, `caption`. Same private bucket, path `{user}/{week}/{type}/{uuid}`. No transcripts exist for voice notes or video.
- Trackers, separate from the diary: `pregnancy_symptom_notes` (symptom_label, personal_severity, notes, follow_up), `baby_movement_notes` (pattern_label, notes), plus appointments, midwife questions, birth plan, hospital bag, contractions.

First Year
- `first_year_entries` — Today check-ins: baby_id, entry_date, `lane` (baby | you), `kind`, `note`, `tags[]`, `answered`.
- `first_year_memories` — memory_scope, baby_id, memory_date, title, `note`, source_entry_id, `photo_path` (+ mime/size/dimensions). Bucket `first-year-memories` (private), path enforced by trigger as `{user}/{memory_id}/…`.
- `first_year_care_events` — structured feed/sleep/nappy plus free-text `note` (event_type `note`).

TTC
- `ttc_logs` only — log_date, log_type (period, tests, mood, cramps, discharge, energy, note), `value`, `notes`. No reflections, no media, no Today surface. Journal coverage is genuinely thinner; do not invent any.

Ownership, RLS, deletion, editing
- Every table above: four `auth.uid() = user_id` policies (select/insert/update/delete), authenticated role. Storage objects gated on first path segment = uid for both buckets (`weekly-photos` policies are still granted to `public` role rather than `authenticated` — cosmetic, uid check still applies; worth tightening separately).
- Deletion is a hard row delete; `delete-account` walks both buckets and removes objects, then deletes the auth user. No soft delete, no shadow copies, no derived summaries — so deletion propagation is trivially correct **provided journal context is never persisted**.
- Editing is in-place update; a fresh read always returns the newest value.

## 2. Current AI access to journal data

- `ai-reflect` (separate function, separate prompt, no Supabase access, no persistence, no safety router): receives raw reflection/note text plus week, returns a shaped draft. Persisted only if the user accepts, into `reflections.content`. Used by `SlotReflectionAssistant` and `NoteShapingSuggestion`. Keep separate; do not merge into the companion.
- `ai-search` day recap mode already receives First Year care events for one chosen day, including `note` snippets (≤90 chars), on an explicit button press. No names, no photos, no memory text.
- No other journal text, and **no image, video or audio content, reaches any model today**. Zero transcripts exist.

## 3. Safety finding (the one real blocker)

`decideSafety(query)` in `ai-search` inspects **only the current question**, before rate limiting and before any enrichment. Journal context would be assembled far later and only on the GREEN path, so:
- Journal content can never escalate or downgrade a safety decision.
- Serious journal material (self-harm wording, bleeding, abuse) could sit inside an ordinary answer's context while the deterministic classifier has never seen it. The model would be reasoning over risk text the safety system does not know exists.

Blocker count: 1. AIC-5 change required: yes, but the smallest possible one — a deterministic pre-flight scan of the *rendered journal context string* using the existing `urgentPatterns`/`safetyRouter` primitives, whose only permitted outcome is **drop the journal context** (never a new answer, never a new category, never a second classifier). That extension must be approved as its own phase before JA2 ships.

## 4. Recommended architecture (for approval, not built here)

- **Server-resolved only.** The browser must never send journal text. Mirror the proven `loadPermissionedMemory` pattern: verify the bearer token at `/auth/v1/user`, then read through the user's own token so RLS is the boundary. No service role, no user id from the body.
- **Request contract unchanged for JourneyContextV1.** `ai-search` gains one optional field: `journalEntryRef` (an id the server re-authorises and loads) for the explicit hand-off. No client-authored journal payload.
- **JournalContextV1 (runtime only)**: `{ journey, entries: [{ date, kind, stageLabel?, provenance: "user_wrote" | "user_wrote_ai_shaped", text }] }`. No ids, no storage paths, no ownership metadata, no raw rows.
- **Bounds**: max 5 entries; recency window 21 days for Pregnancy/TTC and 14 days for First Year; ≤300 chars per entry (truncated, never summarised by a model); ≤1,200 chars total; newest first; dedupe identical text; skip empty/whitespace; deleted and edited entries handled implicitly because every request reads fresh.
- **Lifecycle isolation**: retrieve only the tables belonging to the current saved lifecycle. No cross-lifecycle retrieval, ever, including after TTC → Pregnancy or Pregnancy → First Year transitions.
- **Multiple babies**: entries carry `baby_id`; retrieval filters to the primary/selected baby only, and an entry with a null baby_id is treated as "about you", never attributed to a baby. Ambiguity resolves to exclusion.
- **Provenance in the prompt**: a distinct `<journal_context>` block plus trusted system-layer rules stating these are the person's own words, not verified facts, never medical evidence, and never a source of lifecycle truth. Placed after the structured journey block and before conversation history. Grounding stays entirely separate.
- **Quoting rule**: no verbatim quoting beyond eight words; prefer "you've mentioned…" phrasing; never repeat sensitive diary text back unprompted.
- **Failure behaviour**: any retrieval error yields zero journal context and a normal answer. No cache of journal text at all (bounded query is a single indexed read; latency risk is one extra round trip, resolvable in parallel with grounding).

## 5. Permission model

Recommendation: **A + D**. An account-level opt-in ("Use my journal to personalise your companion", default **OFF**, mirroring the memory settings pattern) for background context, plus an explicit per-entry "Ask about this entry" hand-off that works even when the toggle is off and carries only that one entry. Reject per-entry permissioning (B) as unusable. Creating a journal entry must never imply AI consent — storage consent is not processing consent, and this needs the same legal sign-off gate that memory is still waiting on. Turning the toggle off means journal reads drop to zero immediately; past assistant answers are never rewritten, and the settings copy should say so plainly. Transparency: one quiet line under an answer, "Based partly on your recent journal", shown only when context was actually used.

## 6. Scope decision

- **Text first: YES.** JA2 = text journal awareness (Pregnancy reflections + First Year entries/memory notes + TTC log notes). JA3 = selected images (explicit, one image, user-initiated). JA4 = video/audio, and only via explicit transcription with no persisted derived artefact. No multimodal in V1.
- Deterministic retrieval (lifecycle + saved week/month + recency + limit) is sufficient for V1. No second retrieval model.
- Unchanged by JA: J3 starters, J5 next actions, AIC-3 memory (journal never creates memory), AIC-4 history (no journal text persisted, no hidden user turns), analytics (zero new journal events), grounding, voice.

## 7. Changes required summary

JourneyContextV1: NO. ai-search schema: YES (one optional entry ref). Backend resolver: YES. DB/schema: YES (one preference column or row for the opt-in). New RLS: only for that preference. Memory/history/analytics: NO. AIC-5: YES, minimum drop-context extension. J3/J4/J5: NO.

## 8. Proposed phases

JA1 (this audit) → **AIC-5 journal-safety micro-extension approval** → JA2 text awareness (server resolver, permission toggle, transparency line, explicit entry hand-off) → JA3 images → JA4 media transcripts.

Test matrix for JA2: permission off → zero reads; on → bounded context; signed out → zero; wrong user → zero; deleted → absent; edited → newest; cross-lifecycle → zero; multiple babies → correct baby only; explicit entry → that entry only; retrieval failure → ordinary answer; no hidden turns; no memory rows; no history writes; no analytics; bounds enforced; safety pre-flight drops risky context.

## 9. Verdict

AIC-JA1 — CLOSED PASS. AIC-JA — SAFE TO BUILD, conditional on two gates: legal/privacy approval of journal AI processing, and approval of the minimal AIC-5 journal pre-flight. Unresolved blockers: 1 (safety visibility).
