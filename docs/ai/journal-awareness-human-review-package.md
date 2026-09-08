# Journal awareness — human legal/privacy review package

Audience: a non-engineering legal/privacy reviewer. Every statement below
describes behaviour verified in the repository, not aspiration. Creating this
document performs no deployment, no activation and no configuration change.

## 1. Plain-language summary

The product has one AI companion, reachable from two places in the interface.
Journal awareness adds two optional ways the companion may draw on the person's
own private journal writing when composing an answer:

1. **Background personalisation** — while answering an ordinary question, the
   server may include a small amount of the person's own recent journal text,
   but only when the person has deliberately turned this on in their account.
2. **Explicit "ask about this entry"** — the person picks one specific journal
   entry and asks about it. That entry is used for that one request only.

Both are off today. Nothing is live in production.

## 2. Exactly what data can reach the AI model

Only plain text the person wrote themselves, from four sources:

- Pregnancy weekly reflections (the reflection text)
- First Year daily notes (the note text)
- First Year memories (the note text)
- TTC notes (notes on entries explicitly logged as notes)

Never included: titles, tags, symptom or tracker values, feed/sleep/nappy care
events, appointments, birth-plan or hospital-bag content, photo/video/audio of
any kind, captions, storage paths, database identifiers or URLs.

## 3. Limits on how much

- Background personalisation: at most 5 recent entries, at most 300 characters
  per entry, at most 1,200 characters in total, within a fixed recent window
  (3 weeks in pregnancy, 14 days in the first year, 21 days in TTC). Anything
  over the limit is dropped whole, never silently shortened mid-entry.
- A single explicitly selected entry: at most 1,800 characters, and the exact
  final visible string is the one checked before use.

## 4. Permission and user control

This section describes repository behaviour only. It makes no legal conclusion
about consent, lawful basis (including under UK GDPR), special-category-data
conditions, legitimate interests or DPIA outcomes — those are decisions for
this review.

**Background journal personalisation**

- The setting is OFF by default for every account, including existing ones.
- The person deliberately turns it ON in account settings.
- The person can turn it OFF again at any time.
- When it is OFF, no background journal retrieval happens on any future
  request, full stop; a second, server-side master switch can also stop all
  journal processing regardless of any person's setting.

The exact on-screen wording, quoted from the implemented interface:

- Section heading: "Journal-aware companion"
- Setting label: "Use my journal to personalise the companion"
- Supporting copy: "Allow the companion to draw on a small amount of your
  recent journal text automatically when it answers."
- Control copy: "You can turn this off at any time. Future answers will stop
  drawing on your recent journal automatically. You can still choose a single
  entry to ask about whenever you want, and previous answers are not rewritten."
- If a change fails to save: "That could not be saved. Your setting has not
  changed. Please try again." — the switch then reverts to the stored state.

**Explicit "ask about this entry"**

- Separate from the background setting: it does not require, and is not
  affected by, the background toggle.
- Each use is a deliberate action by the person on one entry.
- The choice applies to one request only, via a typed reference (which kind of
  record, and its identifier) that the server re-verifies and then discards
  once the request is accepted.
- On-screen, the pending choice is shown only as "Asking about: {generic
  source label}" (for example "Pregnancy reflection", "First Year note",
  "Memory", "TTC note") with a "Remove" control. The person's own words are
  never displayed in that indicator.

The companion panel's disclosure line, quoted exactly, differs by state:

- Journal awareness unavailable: "{Name/Your companion} is AI. It can share
  general guidance and help you find the right support, and it does not read
  your private notes. It does not replace your midwife, GP, health visitor or
  urgent care."
- Journal awareness available: the same sentence, with the clause "it only
  uses your own journal writing when you allow it or choose an entry to ask
  about".

## 5. Retention

- The source journal entry stays stored normally in the person's journal;
  journal awareness does not move, alter or copy it.
- Journal awareness creates no separate persistent copy of journal text for AI
  personalisation.
- Journal text is not written to the companion's long-term memory feature.
- Journal text is not added to any persistent journal-specific conversation
  metadata.
- Journal text is not sent to analytics.
- Journal text is not intentionally written to application logs by these
  features; error handling records only that an error occurred, never content.
- A selected-entry reference exists only for the duration of that request.
- Background journal text is freshly retrieved per request, only while the
  person's permission is on.
- Turning background permission off affects future retrieval; it does not
  rewrite past assistant answers.
- A completed assistant answer then follows the platform's existing
  conversation/session behaviour; it is not automatically deleted merely
  because the journal context was transient.

## 6. Access control (scoped to the journal-awareness AI processing path)

What is verified for these features specifically:

- Every request verifies the signed-in person's bearer token server-side.
- User identity is resolved on the server; a user id supplied in a request
  body carries no authority.
- Journal reads run under the person's own token, so row-level security is the
  data boundary.
- These features never use elevated service-level credentials to retrieve
  journal content.
- Material belonging to another user, another baby or a different life stage
  is excluded and any doubt fails closed (nothing is used).

This section describes the AI journal-awareness processing path only. It is
not a claim about every possible operational or database administration
capability of the hosting platform.

## 7. Keeping journeys apart

- Pregnancy: reflections are matched to the current pregnancy episode using the
  record's original creation date against the current journey; editing history
  is never used as evidence, and anything that cannot be proved to belong to
  the current pregnancy is excluded rather than guessed. The pregnancy week
  shown to the model always comes from saved journey details, never from a
  journal entry.
- First Year: material is tied to the one authoritative child (the primary, or
  only, baby). If that cannot be determined, baby-related material is excluded
  entirely. Memories shared across all children are out of scope.
- TTC: only notes attached to the person's current journey are eligible.

## 8. Safety

- The existing urgent and crisis wording is unchanged and always takes
  priority; nothing about journal awareness can weaken or suppress it.
- Journal text is treated as untrusted user-provided data, not as trusted
  instructions. It cannot override system or safety instructions, and it
  cannot establish or change the person's authoritative journey state.
- In practice: structural delimiters in journal text are neutralised; journal
  material is placed inside a bounded context block; the safety instructions
  retain authority; saved journey state retains authority; and urgent/crisis
  handling takes priority.
- On any urgent, crisis, rate-limited, switched-off, clarification,
  unsupported or cautious-review path, no background journal is retrieved at
  all, and an urgent selected entry produces the standard urgent response with
  no model call.

## 9. Transparency shown after an answer

When journal material was actually used, one short line appears under that one
completed answer, quoted exactly:

- Background only: "Your recent journal was included as context."
- Selected entry only: "The journal entry you selected was included as
  context."
- Both: "The journal entry you selected, and your recent journal, were
  included as context."

The line never appears while the answer is being written, on a failed or
abandoned answer, or on an urgent/clarification/unsupported answer, and it
never describes what the journal contained.

## 10. AI processing pathway

Verified from the application configuration:

journal record → authorised server retrieval (under the person's own token,
row-level security applied) → bounding and safety checks → the existing
ai-search pathway → the Lovable AI Gateway chat-completions endpoint →
configured model identifier: google/gemini-2.5-flash → answer.

This is the verified application/configuration pathway. The configured model
identifier alone does not establish the contractual processor identity, any
subprocessor chain, the processing geography, provider-side retention,
training/data-use terms, or contractual safeguards.

For every such fact not verifiable from repository or configuration evidence:
**Operational confirmation required before legal/privacy approval.**

AssemblyAI is unrelated to this text journal awareness work. It is reserved
for the paused future voice/speech-to-text programme and plays no part in the
pathway above.

## 11. Current state

- AIC-JA4 — ENGINEERING RELEASE GATE CLOSED PASS / PRODUCTION HOLD
- Journal Text Awareness — TECHNICALLY RELEASE READY / PRODUCTION OFF
- AI_JOURNAL_CONTEXT_ENABLED — OFF
- VITE_COMPANION_JOURNAL_ENABLED — OFF
- Legal/privacy activation gate — OPEN
- Schema readiness — APPLIED / INERT
- Journal AI production processing — NOT ACTIVE
- Media journal processing — NOT IMPLEMENTED
- Voice — PAUSED

## 12. Decisions requested

1. Is the described text-journal AI processing approved for production
   activation from a legal/privacy perspective?
2. Is the customer-facing journal-awareness and privacy wording quoted above
   approved, or what changes are required?

Allowed outcomes for each: APPROVED · APPROVED WITH CONDITIONS / COPY CHANGES
· NOT APPROVED · MORE INFORMATION REQUIRED.

A legal/privacy approval does not itself activate the feature. Technical
activation remains a separate controlled release step.

## 13. Stop / rollback summary

- Immediate authoritative stop: turn the server switch
  (`AI_JOURNAL_CONTEXT_ENABLED`) off. All journal processing stops on the next
  request.
- Follow-up: turn the interface switch (`VITE_COMPANION_JOURNAL_ENABLED`) off
  to remove the journal controls from the customer interface.
- No schema drop. No preference deletion. No journal deletion. No historical
  answer deletion.
