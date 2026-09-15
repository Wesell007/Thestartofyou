# Phase 34G — IVF timeline persistence foundation (feature OFF)

Prepare storage and an explicit save/read/clear capability for a future "Save my timeline". Nothing visitor-facing changes: no Save button, no automatic saving, no new journey type, nothing deployed to production.

## 1. Audit result (verified in the repository)

- Storage owner: the existing trying-to-conceive journey record (`public.ttc_journeys`, one row per user, owned via `user_id` with four user-scoped access policies and an automatic updated timestamp). No second storage system will be created.
- That record has no transfer date or transfer type today, and the existing trying-to-conceive save routine never writes them.
- The calculator's existing transfer-type values are `5day` and `3day`. These stay the single representation across calculator, storage and tests; no new naming is invented.
- Feature flags in this project are environment-driven booleans read at the edge of the app (the existing companion journal flag follows this pattern).

## 2. Schema change (additive, reversible)

Two optional values added to the trying-to-conceive record:

- `ivf_transfer_date` — calendar date, nullable, no default, so no timezone drift.
- `ivf_transfer_type` — text, nullable, constrained to `3day` or `5day`.

No backfill, no existing data rewritten, no access rules changed: the new values inherit the record's existing user-only ownership. Rollback is dropping the two columns, documented in the evidence file. Nothing derived is ever stored: every milestone stays calculated from these two values.

## 3. Explicit-only persistence helper

Added to the existing trying-to-conceive persistence file, not a new service:

- `loadIVFTimelineContext(userId)` — returns the two values or null.
- `saveIVFTimelineContext(userId, { transferDate, transferType })` — validates first, then writes only those two columns.
- `clearIVFTimelineContext(userId)` — sets both back to null, touching nothing else.

Only these three functions write IVF values. Picking a date, choosing 3-day or 5-day, calculating, opening the page, navigating away, signing in and loading a journey all write nothing. The existing trying-to-conceive save routine is left untouched, so a normal profile save that omits IVF values can never clear them.

## 4. Feature flag

`IVF_TIMELINE_SAVE_ENABLED` (read from `VITE_IVF_TIMELINE_SAVE_ENABLED`), default **false**, exposed through a small typed helper. While it is off, no save, update or clear control renders anywhere. No component is wired to the helper in this phase.

## 5. Sign-in return route

`/ivf-timeline` is added to the existing public return-route allow list so a future sign-in can come back to the tool. No transfer date or type is stored in local storage, session storage, cookies or account metadata; current capability is documented as "return to the route only, values not preserved".

## 6. Untouched

Companion context, AI runtime, prompts, memory, grounding, journal, voice, articles, imagery, analytics, and all other journey code. Saved journey types remain exactly trying-to-conceive, pregnancy, first year.

## 7. Technical notes

- Migration: `ALTER TABLE public.ttc_journeys ADD COLUMN ivf_transfer_date date, ADD COLUMN ivf_transfer_type text` plus a `CHECK (ivf_transfer_type IN ('3day','5day'))` constraint tolerant of null. No grants or policies altered (both inherit the table's existing ones). Generated database types regenerate after it runs.
- `src/lib/savedTTCJourney.ts`: new `IVFTimelineContext` type (`transfer_date: string | null`, `transfer_type: IVFTransferType | null`) and the three helpers, each re-checking the session user, writing through `supabase.from("ttc_journeys").update(...).eq("user_id", userId)` so row ownership rules apply, and returning the existing `CommitResult`-style outcome. Date validated with `parseDateOnly` plus the calculator's not-future / not-older-than-300-days rules; type validated against `IVFTransferType` from `IVFTimelineForm`.
- `src/lib/featureFlags.ts` (new, or extended if a shared module already exists): `IVF_TIMELINE_SAVE_ENABLED` resolved from `import.meta.env`, defaulting false.
- `src/lib/authIntent.ts`: `/ivf-timeline` added to a public tool return list used by `isSafeReturnTo`; protected-route behaviour unchanged.
- Tests, new `src/test/phase34gIvfPersistence.test.ts(x)`: null IVF values remain valid; existing trying-to-conceive save without IVF payload still works and preserves IVF values; 3-day and 5-day both persist; date round-trips with no timezone drift; invalid type rejected; explicit update replaces values; explicit clear nulls both and leaves the journey and unrelated answers intact; no second journey; no IVF journey type; calculator triggers zero persistence writes (no journey save call, no storage write); flag defaults off; no save, update or clear control renders. Cross-user denial asserted at the query level (every helper filters by the signed-in user) and recorded as NOT FULLY TESTABLE if the harness cannot run two real sessions.
- Boundary tests reconfirm: journey types exactly ttc / pregnancy / first_year, no `/my-ivf-journey`, grounding / AI context / memory / journal / voice / article changes all zero.
- Docs: `docs/content/phase34g-ivf-timeline-persistence-foundation.md`, `...-privacy-review-pack.md`, `...-persistence-evidence.md`, plus a roadmap entry. Privacy pack records data, purpose, owner, access, no automatic collection, explicit future saving, calculator works unsaved, no AI access, no derived storage, clearing behaviour, no fourth journey, pregnancy-transition intent, and the open items (notice wording, lawful basis, retention, impact assessment, activation copy). No legal approval is claimed.
- Validation: focused Phase 34G tests, existing trying-to-conceive tests, full suite, typecheck twice, lint against baseline, production build, migration validation in the non-production project only, and browser QA of `/ivf`, `/ivf-timeline` and the three stage pages at 1280/834/390 checking calculation still works signed out, no save/update/clear controls, no sensitive address parameters, no overflow, no new console errors.
- Production deployment: none. Activation stays gated on privacy and legal review; Phase 34H is recommended but not started.
