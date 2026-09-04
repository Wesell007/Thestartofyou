# ADR-AIC6-03 — No assistant audio before safety routing

**Status:** Proposed (AIC-6 architecture gate)

**Context.** Voice interfaces mask latency with spoken filler. In a pregnancy
and health context, "okay", "that sounds fine" or "don't worry" spoken before
the safety decision is itself a reassurance the system has not earned.

**Decision.** No assistant audio of any kind is produced before `ai-search` has
resolved the route for the current turn. Waiting feedback is visual and
non-semantic. Deterministic RED, CRISIS and safeguarding answers are spoken
verbatim from the canonical AIC-5A text and are never paraphrased by a model,
and their text remains visible even when speech fails.

**Consequence.** Speech can never become an unmediated answer, and a speech
failure can never suppress a safety answer.
