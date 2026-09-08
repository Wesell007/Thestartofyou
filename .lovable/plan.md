# Journal Awareness — Human Review Package (documentation only)

Prepare the legal and privacy review pack for text journal awareness (JA2 + JA3). Documentation only: no application code, no tests, no flags, no deployment, no activation, no media, no voice.

## Deliverable

Create `docs/ai/journal-awareness-human-review-package.md`, written for a non-engineering reviewer, drawn only from verified repository behaviour.

## Contents

1. Plain-language summary: what journal awareness does, in two modes — automatic recent-journal personalisation (permission required, default off) and explicit "ask about this entry" (deliberate, one request only).
2. Exactly what data can reach the AI model: allowlisted user-written text only from pregnancy reflections, First Year notes and memories, and TTC notes. No titles, tags, tracker values, care events, appointments, captions, photos, video, audio, file paths, ids or URLs.
3. Limits: at most 5 recent entries, 300 characters each, 1,200 total; a single selected entry up to 1,800 characters.
4. Consent and control: default off, explicit opt-in, reversible at any time, exact on-screen wording quoted, and what happens to past answers.
5. Retention: nothing journal-related is stored, logged or sent to analytics; text is used transiently for one answer.
6. Access control: only the signed-in person's own records, read under their own session with row-level security; no admin or service-level journal reads.
7. Separation guarantees: pregnancy episodes, individual babies, and TTC journeys are kept apart; ambiguous cases are dropped rather than guessed.
8. Safety: urgent and crisis wording is unchanged and takes priority; journal text can never instruct the AI.
9. Transparency shown to the person after an answer.
10. Current state: both switches off, nothing deployed, nothing live.
11. The two decisions requested from legal/privacy: approval to activate, and approval of the customer-facing privacy wording.
12. Open questions for the reviewer, and the stop/rollback summary (server switch off is the immediate stop; the interface switch is the follow-up; no data is deleted).

## Roadmap

Add a single line recording that the human-review package is prepared and awaiting submission. No status change to JA4 or to the legal gate.

## Out of scope

No code, tests, flags, deployment, publish, QA, media, voice, or claim of approval.
