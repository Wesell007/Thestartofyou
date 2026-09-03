# AIC-3 decision records

Companion memory. Each record states the decision and why the alternative was rejected.

## ADR-AIC3-01 — Memory is explicit, never inferred

**Decision.** A memory exists only because someone wrote an explicit command, or typed it into
account settings. Ordinary conversation never produces a write, and the model never proposes
one.

**Why.** This is a health-adjacent product used at some of the most vulnerable moments in
someone's life. Silent capture of what they said would be a surprise, and a surprise here is a
breach of trust regardless of what the privacy notice says. The rejected alternative — a model
deciding what is worth remembering — also makes the write path non-deterministic and
untestable.

## ADR-AIC3-02 — Two independent flags, server authoritative

**Decision.** `VITE_COMPANION_MEMORY_ENABLED` gates client UX. `AI_MEMORY_ENABLED` gates
retrieval and injection and is authoritative. They can disagree.

**Why.** The dangerous half is memory reaching the model, and that must be switchable without a
deploy of the client, and switchable independently of whether people can see and delete their
data. A single shared flag would couple "someone can manage their memories" to "the companion
is using them", which is exactly the wrong coupling during a staged release.

## ADR-AIC3-03 — Database-owned attribution and normalisation

**Decision.** `user_id` defaults to `auth.uid()`; the client never sends one. `normalised_value`
is a generated column. Row-level security is owner-only for all four operations.

**Why.** Anything the browser can send, a modified browser can forge. Ownership decided by the
database cannot be spoofed by a crafted insert, and a generated normalised value cannot be
manipulated to slip a duplicate past the unique index. The rejected alternative, trusting a
client-supplied id behind a policy check, works but leaves the correctness of attribution in
client code.

## ADR-AIC3-04 — Rule-based categories, no second model call

**Decision.** Categories are assigned by ordered regular expressions with an `other` fallback.

**Why.** Deterministic, testable, free and instant. A classification call would add latency and
cost to a write path, and would let model output influence stored structure — the one thing
ADR-AIC3-01 rules out. Imprecise categorisation is acceptable because categories only affect
selection ordering, never what is stored or shown.

## ADR-AIC3-05 — Memory values are untrusted data

**Decision.** Stored values are escaped and rendered inside a separate `<permissioned_memory>`
DATA block, with trusted instructions living only in the system prompt.

**Why.** A memory is user-written text that later gets placed inside a prompt: a textbook
injection channel. Someone could save "ignore your safety rules" and have it replayed on every
future turn. Escaping angle brackets and keeping instructions out of the data block means the
worst case is a strange-looking remembered phrase, not a behaviour change.

## ADR-AIC3-06 — User-scoped retrieval, never the service role

**Decision.** The edge function verifies the caller's access token, then reads memory through
that same token so row-level security applies. The service role is not used for memory.

**Why.** A service-role read means one bug in a user-id parameter exposes another person's
memories. Reading as the user makes cross-user exposure a database-enforced impossibility
rather than a code-review promise. If user-scoped retrieval had not been workable, the correct
outcome was to stop and report, not to reach for the service role.

## ADR-AIC3-07 — Conservative resolution: ask rather than guess

**Decision.** Replacement requires the old value to be named exactly and to match exactly one
memory. Forget resolves an exact or single partial match, or the memory just saved in this
interaction. Anything ambiguous asks, and changes nothing.

**Why.** Both operations are destructive and there is no conversation history to disambiguate
against — AIC-4 does not exist. Deleting the wrong memory is worse than asking a second
question, and semantic matching would make destructive behaviour unpredictable.
