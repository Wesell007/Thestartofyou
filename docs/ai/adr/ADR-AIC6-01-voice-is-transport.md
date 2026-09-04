# ADR-AIC6-01 — Voice is a transport, not a separate brain

**Status:** Proposed (AIC-6 architecture gate; not accepted until AIC-7 proves it)

**Context.** Voice products are usually built as a second assistant, with their
own model, their own prompt and their own idea of what is safe. That would
duplicate every system the AIC-5 programme just closed.

**Decision.** Speech is an input and output transport for the existing
companion. A finalised spoken transcript enters `ai-search` exactly as typed
text does, and the answer it produces is the answer that is spoken. Voice
introduces no second model, no second safety stack, no second conversation, no
second memory system, no second grounding path and no second emotional layer.

**Consequence.** Provider changes affect presentation only. Safety, grounding,
memory and continuity keep a single implementation and a single audit surface.
