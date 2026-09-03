# ADR-AIC4-01 — Conversation continuity is a separate layer from memory

**Status:** Accepted

**Context.** People expect a companion to follow a thread. The temptation is to
let the thread quietly become long-term memory.

**Decision.** Continuity and memory are separate systems. A conversation turn
is never written to `companion_memories`, and permissioned memory is never
inferred from what was said. Memory stays explicit, confirmed and reversible.

**Consequence.** Continuity can be ephemeral by default and still feel natural,
because remembering across conversations is a deliberate, visible act.
