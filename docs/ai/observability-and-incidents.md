# Observability and incident plan

Nothing in this document is implemented in Phase 29C. It defines what to build later and how to respond when the AI misbehaves.

## 1. What to track later

Analytics in this product is consent-gated and must never carry names, emails, dates, free-text questions, reflections, notes, cycle detail, AI context or any health content. Every signal below must therefore be an aggregate, a category or a coarse counter, added through `src/lib/analyticsEvents.ts` and `src/lib/analytics.ts`.

| Signal | Shape | Why |
| --- | --- | --- |
| AI answer failures | count by HTTP status and mode | Detect provider, grounding and limiter outages |
| Unsafe answer reports | count, plus a user-initiated report action | The only sanctioned route for a person to flag a bad answer |
| Escalation failures | count of Red or Crisis category matches that produced no escalation wording | The single most important safety metric |
| Repeated fallback patterns | count of `SAFE_FALLBACK_ANSWER` per mode | High rates mean routing or prompt drift, not user error |
| Hallucinated source wording | count of sanitiser interventions | Rising counts mean prompt regression |
| Link leakage | count of stripped links and URLs | Should trend to zero |
| Urgent query handling | count of hard-pattern matches by branch | Confirms the short-circuit is firing |
| Clarification usage | count of clarifications offered and chips chosen | Tunes the ambiguity resolver |
| Rate-limit events | count of 429s per window | Capacity and abuse signal |
| Cost and latency | tokens, duration, cost per request from AI Gateway logs | Budget and experience |
| Model and prompt version | a version string attached to every request | Attribution during incidents |

Gateway-side detail (status, model, duration, tokens, credit cost) is already available through the AI Gateway request logs, so app-side tracking should stay minimal and additive.

Free-text question content must never be stored to build these metrics. Where a failing prompt needs review, it is reproduced synthetically from the category, not retrieved from a user's session.

## 2. Missing today

- No kill switch: the companion cannot be disabled without a code deploy.
- No prompt or model version string in requests.
- No user route to report an unsafe answer.
- No escalation-failure detection anywhere.

These are the first candidates for Phase 29D and 29E.

## 3. Kill switch design (to build)

- A single server-side flag consulted by the `ai-search` function, defaulting to on.
- When off: the endpoint returns a controlled, non-alarming unavailable message; the companion launcher hides; `/ask` shows a calm unavailable state with links to guidance and support routes, and keeps every emergency signpost visible.
- Granularity: whole companion, and per mode, so one bad surface does not take down the rest.
- Flipping the switch must not require a migration or a rebuild.

## 4. Incident response plan

1. **Contain.** Disable the affected surface with the kill switch. If no switch exists yet, revert the last AI-affecting deploy.
2. **Redirect.** Route people to full guidance and support pages, keeping urgent-care signposting prominent.
3. **Roll back.** Return the prompt, model choice or source list to the last known-good version. Record which value changed.
4. **Assess.** Classify the incident: wrong answer, missing escalation, exposed retrieval wording, link leakage, crisis mishandling, outage, cost spike. Missing escalation and crisis mishandling are always highest severity.
5. **Reproduce.** Rebuild the failing prompt synthetically and confirm the failure. Never use a real user's stored content.
6. **Fix at the category level.** Ask which sibling cases share the same assumption (other journeys, other modes, other red flags) and fix those too.
7. **Extend the eval set.** Add the failing prompt and its siblings to `eval-dataset-v1.json` with the correct expected category.
8. **Retest.** Full evaluation set, typecheck, tests, build, plus the release gate in `release-gate.md`.
9. **Re-release.** Re-enable the surface, then watch the relevant signal for a defined window.
10. **Write it up.** Cause, blast radius, fix, prevention, and any framework document that needs updating.

## 5. Severity ladder

| Severity | Example | Response |
| --- | --- | --- |
| S1 | Crisis or Red question answered without escalation; harmful instruction given | Kill switch immediately, then full incident process |
| S2 | Verdict wording ("your baby is fine"), confirmed pregnancy claim, dose given | Kill switch for the affected mode, same-day fix |
| S3 | Retrieval wording exposed, link leakage, wrong source family | Fix in the next release, add a test |
| S4 | Outage, rate-limit noise, latency or cost regression | Monitor and fix, no safety impact |
