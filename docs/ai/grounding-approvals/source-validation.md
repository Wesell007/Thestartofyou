# Source validation — contract and template

Append-only event log. **Real source-validation events recorded: 0.**

Nothing below is a completed validation. The template is an unresolved
evidence state, structurally distinct from an immutable historical event, so a
blank template can never be mistaken for a validation that happened.

## Distinction

- **A. Template / unresolved evidence state** — the checklist and blank fields
  below. Carries no `eventId` and is never a decision.
- **B. Immutable historical event** — an entry appended to the event log only
  after an actual person completes a validation. Never silently mutated; a
  correction appends a new event referencing the one it supersedes.

## Event fields (real events only)

| Field | Meaning |
| --- | --- |
| `eventId` | stable unique id, e.g. `sv-0001` |
| `slug` | article slug |
| `contentDigest` | full 64-hex digest the validation was performed against |
| `digestSpecVersion` | digest specification version |
| `contentVersion` | authorised content version label, when one exists |
| `sourceEvidenceStateId` | the exact `source-evidence.json` state validated |
| `validationResult` | `sources_validated`, `sources_required_missing`, `no_source_required`, or `invalidated` |
| `validatedBy` | person who performed the validation |
| `decisionTimestamp` | precise ISO timestamp of the validation decision |
| `supersedes` | previous `eventId` this replaces, or null |

## Validation checklist (unresolved template, per article)

- [ ] every factual claim requiring attribution identified against the exact digest
- [ ] each identified claim mapped to a source, or explicitly recorded as needing none
- [ ] each source live, current and from an accepted publisher
- [ ] each source checked on a recorded date by a named person
- [ ] result recorded as an event bound to the digest and the source-evidence state

## Invalidation

A source becoming stale, broken, withdrawn, contradicted or superseded
invalidates the validation state even when the content digest is unchanged, and
requires a new validation event before any approval that relied on it remains
valid. See the unresolved eligibility-invalidation gate in `README.md`.

## Event log

_No real events. Stage 1 appends none._
