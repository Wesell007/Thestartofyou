# ADR-AIC6-04 — Raw audio is ephemeral by default

**Status:** Proposed (AIC-6 architecture gate)

**Context.** Speech recognition requires audio to be transmitted to a
processor. Saying "we do not store audio" hides that distinction.

**Decision.** The application keeps no durable raw audio: no Supabase audio
objects, no voice archive, no voice history. Microphone audio exists in memory
or in a live stream, is transmitted only for the active voice session through
the approved transport, and is discarded afterwards. External provider
processing and retention is a separate matter and must be established
contractually before production, not assumed.

**Consequence.** The privacy claim the product makes is exactly the claim it can
prove, and provider retention becomes an explicit release gate rather than an
implied guarantee.
