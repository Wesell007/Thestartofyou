# ADR-AIC4-03 — The server owns persistent history

**Status:** Accepted

**Context.** A browser-supplied transcript is untrusted input: it can be
lengthened, rewritten or forged.

**Decision.** In persistent mode the backend loads history from the database
under the user's own token and discards any transcript in the request body. A
browser transcript is accepted only in session mode, where it is bounded and
escaped. Prior turns are always rendered as data, never as instructions.

**Consequence.** Continuity cannot be used to smuggle instructions, inflate
context, or read another person's conversation.
