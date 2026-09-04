# ADR-AIC6-05 — Voice and text share one conversation

**Status:** Proposed (AIC-6 architecture gate)

**Context.** People will start typing, switch to speaking, and switch back. A
separate voice thread would fragment context and create a second, invisible
history.

**Decision.** A finalised spoken transcript becomes an ordinary visible user
message, and the canonical answer becomes an ordinary visible assistant
message, in the same conversation runtime with the same AIC-4 conversation
identity. No hidden voice-only turns, no voice-specific conversation ID, no
voice-specific memory authority, and no voice transcript persistence to
compensate for persistent history being off.

Conversation context contains only canonical assistant text that was actually
committed to the visible thread; interrupting an answer discards the ungenerated
and unsurfaced remainder rather than keeping a hidden tail.

**Consequence.** Continuity is real in both directions, and the model never
reasons from words the person never received.
