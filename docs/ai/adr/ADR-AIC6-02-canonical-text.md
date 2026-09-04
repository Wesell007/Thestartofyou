# ADR-AIC6-02 — Canonical text is the assistant response; speech renders it

**Status:** Proposed (AIC-6 architecture gate)

**Context.** Raw model tokens are not what the reader sees. `sanitiseAnswerForDisplay`
removes retrieval wording, links and bare URLs, and can substitute the approved
fallback line. Speaking raw tokens would let the companion say things it never
displays.

**Decision.** The canonical assistant response is the sanitised text the
companion displays and commits. Speech is a presentation of that canonical
text. Raw SSE tokens are never sent to text-to-speech. For low-latency chunked
speech, a completed sentence is canonicalised first and only then spoken, with
the final canonicalisation reconciled at the end of the stream.

**Consequence.** Text and voice cannot diverge. Auditability, accessibility,
provider portability and a safe fallback when speech fails all follow from one
rule.
