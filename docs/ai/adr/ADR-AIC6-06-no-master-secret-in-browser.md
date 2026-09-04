# ADR-AIC6-06 — Voice provider master secrets never live in the browser

**Status:** Proposed (AIC-6 architecture gate)

**Context.** Low-latency speech often tempts teams into connecting the browser
straight to a provider, which requires a credential in client code.

**Decision.** No provider master key ever ships to the browser. Where a direct
browser connection is used, the browser receives a short-lived, scoped,
server-issued session credential from an edge function. The client flag
`VITE_COMPANION_VOICE_ENABLED` decides only whether voice UI is offered and is
never a security boundary; the server flag `AI_COMPANION_VOICE_ENABLED` is the
authority and gates credential issuance and every privileged server voice
capability.

**Consequence.** Turning voice off server-side actually turns it off, and a
compromised or modified client cannot obtain provider access.
