# Phase 34G — IVF timeline persistence: privacy review pack

Prepared for a later activation decision. **No legal approval is claimed or
implied. Human privacy and legal review remains required before activation.**

## Summary

| Item | Position |
| --- | --- |
| DATA | IVF embryo transfer date (calendar date) and transfer type (`3day` / `5day`) |
| PURPOSE | Allow a person to return to their IVF timeline without re-entering the source information |
| STORAGE OWNER | The person's existing authenticated trying-to-conceive journey record (`public.ttc_journeys`) |
| ACCESS | Existing user-owned access model; the helpers resolve the signed-in person internally, and row-level security remains the second enforcement layer |
| AUTOMATIC COLLECTION | NO — calculating, opening the page, navigating away or signing in never writes anything |
| SAVING | Future explicit user action only; no Save control exists today and the feature flag is off |
| CALCULATOR WITHOUT SAVING | Continues to work exactly as in Phase 34F, signed in or signed out |
| AI / COMPANION ACCESS | NO — the values are not in Companion context, prompts, memory, grounding or source routing |
| DERIVED MILESTONES STORED | NO — only the two source values; all output is recalculated |
| CLEARING | Supported: an explicit clear sets both values to null together, leaving the journey intact |
| LIFECYCLE | Not a fourth saved journey; IVF is a treatment context within trying to conceive |
| PREGNANCY TRANSITION | Prior IVF context is intended to remain historical on the trying-to-conceive record; no automatic deletion in this phase |
| ANALYTICS / LOGS | No IVF values in events, telemetry, logs, error messages or URLs |
| PARTIAL STATE | Impossible — the database rejects a date without a type and a type without a date |

## Open review items

1. Privacy notice wording for storing treatment dates.
2. Lawful basis and any consent wording, as advised by privacy and legal review.
3. Retention expectations, including how long historical IVF context should
   remain after a pregnancy or a journey change.
4. Whether an additional impact assessment or record of processing is required.
5. Exact activation copy for the save, update and clear experience, including
   what the person is told about deletion.

## Notes for reviewers

- The stored data is health-adjacent treatment information and should be treated
  as sensitive.
- Nothing is written without a future, explicit user action; this phase only
  establishes the boundary.
- Saving can never create a journey record: if the person has no trying-to-
  conceive journey, saving is refused with a typed `no_ttc_journey` result.
