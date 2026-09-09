# Phase 32D — Tool Opportunities

Recorded only. No tool is designed, built, routed or deployed. Tool implementations in this phase: 0.

---

## C004 — Conception date estimation

**Terminal status:** TOOL_OPPORTUNITY. Counted exactly once in the 27-row reconciliation, and not as an article draft, expansion, skip or deferred row.

**User intent:** two related questions. "When did I conceive?" asked from a known due date or last period, usually for timeline or reassurance reasons, and "how many weeks am I?" asked from a conception or transfer date.

**Phase 31 evidence:** C004, Pregnancy, proposed page type TOOL, P2, cannibalisation MEDIUM, 5,400 top single-keyword volume, 39 unique keywords, with the note that it is distinct from due-date calculation and can reuse the existing `pregnancyDates` derivation with no new lifecycle.

**Closest current tool:** `/due-date-calculator` with its results surface at `/due-date-results`, which already accepts last period, conception and IVF transfer inputs and derives dates from one authoritative implementation. `/ovulation-calculator` covers the fertile window, not conception dating.

**Why a tool is preferable to another article:** the intent is a calculation. An explanatory article can describe how conception dating works but cannot answer the reader's actual question, and would rank against the calculator while satisfying nobody. A small tool answers in one step and hands the reader on to the week pages.

**User and product value:** modest and mostly acquisition-side. It reuses existing derivation logic, needs no stored data and no lifecycle state, and creates a natural route into pregnancy week content.

**Cannibalisation:** MEDIUM against `/due-date-calculator`, the site's largest single demand cluster. Any future build must be framed as a distinct question with its own canonical, must not duplicate the due-date results surface, and must link back to it rather than compete for due-date queries. If that separation cannot be held cleanly, the correct outcome is supporting copy inside the existing calculator rather than a second tool.

**Risk:** low technical risk, moderate editorial risk. Conception dating is an estimate. The copy must not imply it can confirm a conception date, establish paternity, or override scan dating, which remains authoritative in the UK.

**Recommended future implementation phase:** a dedicated tools phase after Phase 32E and Phase 32F, so expansion and internal-linking work is settled before a second dating surface is introduced.
