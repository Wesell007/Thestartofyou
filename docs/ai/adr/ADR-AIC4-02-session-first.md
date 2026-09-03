# ADR-AIC4-02 — Session-first, persistence gated

**Status:** Accepted

**Context.** Most people asking about pregnancy, loss or fertility are not
signed in, and would not expect a permanent record of a private question.

**Decision.** Session continuity is the default for everyone and writes nothing
to the database. Persistent history requires an authoritative server flag, an
independent client flag, an explicit persistent-mode request and a verified
session. Both flags default off.

**Consequence.** Anonymous use produces zero stored rows, and a server flag
left on cannot silently store conversations behind a disabled interface.
