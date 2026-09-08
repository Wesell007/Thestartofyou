# Journal Awareness — Human Review Package (documentation only)

Documentation only. No application code, no tests, no flags, no deployment, no activation, no production QA, no media, no voice.

## Deliverable

Create `docs/ai/journal-awareness-human-review-package.md`, written for a non-engineering legal/privacy reviewer, drawn only from verified repository behaviour.

## Contents

1. **Plain-language summary** — what journal awareness does in its two modes: automatic recent-journal personalisation (permission-based, default off) and explicit "ask about this entry" (deliberate, one request only).
2. **Exactly what data can reach the AI model** — allowlisted user-written text only: pregnancy reflections, First Year notes and memories, TTC notes. No titles, tags, tracker values, care events, appointments, captions, photos, video, audio, file paths, ids or URLs.
3. **Limits** — at most 5 recent entries, 300 characters each, 1,200 total; one selected entry up to 1,800 characters.
4. **Permission and user control** (not "consent"; no legal conclusion) — factual behaviour only: background personalisation is default OFF, the person deliberately turns it ON, can turn it OFF again, and future background retrieval stops when OFF. Explicit "ask about this entry" is separate from the background setting, a deliberate action applying to one request via a transient typed reference consumed after the accepted request. No UK GDPR lawful-basis, special-category, explicit-consent, legitimate-interest or DPIA conclusions — those are the reviewer's decisions.
5. **Retention** — precise, qualified wording: the source journal entry remains stored normally in the journal; JA2/JA3 create no separate persistent copy of journal text for AI personalisation; journal text is not written to AI memory, persistent journal-specific conversation metadata, analytics, or (intentionally) application logs; selected references are request-scoped; background context is freshly retrieved when permitted; revoking permission affects future retrieval and does not rewrite past answers; completed answers follow the platform's existing conversation/session behaviour and are not described as auto-deleted.
6. **Access control — narrow and provable** — scoped to the JA2/JA3 AI processing path only: bearer-token verification, server-side identity resolution, PostgREST under the caller's token, RLS as the data boundary, request-body user id has no authority, no service-role journal reads, wrong-user/wrong-baby/wrong-lifecycle fails closed. No broad claim that administrators can never access journal data.
7. **Separation guarantees** — pregnancy episodes, individual babies and TTC journeys kept apart; ambiguity dropped rather than guessed.
8. **Safety** — urgent and crisis wording unchanged and takes priority; journal text can never instruct the AI.
9. **Transparency shown to the person after a completed answer** — the exact note strings.
10. **AI processing pathway** (new) — plain-English trace: journal record → authorised server retrieval → safety/bounding → existing ai-search pathway → the existing model pathway (Lovable AI Gateway chat completions endpoint; declared model identifier `google/gemini-2.5-flash`) → answer. No keys, tokens or credentials. Where an operational fact (processor terms, processing region, contractual retention) cannot be verified from repository evidence, state exactly: "Operational confirmation required before legal/privacy approval." Explicitly state AssemblyAI is for the paused future voice/STT programme and is NOT part of JA2/JA3 text journal awareness.
11. **Current state** — exact status block:
    - AIC-JA4 — ENGINEERING RELEASE GATE CLOSED PASS / PRODUCTION HOLD
    - Journal Text Awareness — TECHNICALLY RELEASE READY / PRODUCTION OFF
    - AI_JOURNAL_CONTEXT_ENABLED — OFF
    - VITE_COMPANION_JOURNAL_ENABLED — OFF
    - Legal/privacy activation gate — OPEN
    - Schema readiness — APPLIED / INERT
    - Journal AI production processing — NOT ACTIVE
    - Media journal processing — NOT IMPLEMENTED
    - Voice — PAUSED
    - Note: creating this document performs no deployment or activation.
12. **Decisions requested from the reviewer** — two primary questions: (1) is the described text-journal AI processing approved for production activation from a legal/privacy perspective; (2) is the customer-facing journal-awareness and privacy wording approved, or what changes are required. Allowed outcomes: APPROVED / APPROVED WITH CONDITIONS OR COPY CHANGES / NOT APPROVED / MORE INFORMATION REQUIRED. State that legal/privacy approval does NOT itself activate the feature — technical activation remains a separate controlled release step.
13. **Stop/rollback summary** — server switch off is the immediate authoritative stop; interface switch off is the follow-up; no schema drop, no preference deletion, no journal deletion, no historical answer deletion.

## Roadmap

Add one factual line: `Journal Awareness Human Review Package — PREPARED / AWAITING HUMAN LEGAL-PRIVACY REVIEW`. Do not change the AIC-JA4 status or `Legal/privacy activation gate — OPEN`. Name no reviewer.

## Return report

15 fields: document path; created; behaviour re-verified; exact customer-facing wording captured; AI processing pathway documented; unverified operational facts explicitly marked; legal conclusions invented (must be NO); roadmap line added; application code changes; test changes; flag changes; deployments; legal/privacy gate state; journal production state; voice state.

## Out of scope

No code, tests, flags, deployment, publish, QA, media, voice, or claim of approval.
