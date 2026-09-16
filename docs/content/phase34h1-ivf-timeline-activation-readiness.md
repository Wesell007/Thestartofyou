# Phase 34H.1 — activation readiness

Status: NOT READY FOR ACTIVATION. The experience is complete and validated; the gates below are open.

## Current state

| Item | Value |
| --- | --- |
| `IVF_TIMELINE_SAVE_ENABLED` default | FALSE |
| Enabled in the shared environment | NO |
| Application code deployed or published | NO |
| Shared production-serving database schema change in this phase | 0 (Phase 34G columns already applied) |
| Saved lifecycles | ttc, pregnancy, first_year (unchanged) |
| Companion access to IVF data | NO |
| AI, grounding, memory, journal, voice changes | 0 |
| Analytics events added | 0 |
| Privacy and legal approval | NOT GRANTED |

## Gates that must close before Phase 34H.2

1. **Privacy and legal review.** Storing an embryo transfer date and transfer type is treatment
   information held against an existing TTC journey row. Review is required on lawful basis,
   retention, deletion on journey deletion or account closure, and the wording shown to the person.
2. **Auth handoff decision confirmation.** AUTH FLOW TYPE = full-page redirect via `/auth`;
   SIGNED-OUT VALUES PRESERVED THROUGH AUTH = NO; AUTH HANDOFF DECISION = ACCEPTED RE-ENTRY UX. The
   alternative (preserving values across sign-in) would require a new sensitive-data mechanism and is
   explicitly not built.
3. **Approved activation copy.** All save-experience wording is provisional and makes no consent,
   GDPR or retention claim. Final copy must be approved, including the privacy line shown next to the
   save action.
4. **Retention and deletion wording decision.** The product must state what happens to the two stored
   values when the TTC journey ends, is replaced, or the account is deleted.

## Additional activation steps (operational, not blockers)

- Feature-ON visual QA at 1280 / 834 / 390 once the flag can be enabled in a non-shared environment.
- Confirm the existing TTC journey deletion path clears the two IVF columns as expected.
- Decide whether the saved timeline should surface anywhere outside `/ivf-timeline` (currently: no).

## Recommended next phase

**Phase 34H.2 — IVF timeline save activation.** Do not start until gates 1 to 4 are closed.
