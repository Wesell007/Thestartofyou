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

- `loadIVFTimelineContext()` — returns the two stored values or null.
- `saveIVFTimelineContext(context)` — validates first, then writes only those two columns.
- `clearIVFTimelineContext()` — sets both back to null, touching nothing else.

Each helper resolves the signed-in person itself and acts only on their own record; a caller cannot point them at anyone else's data, and the database's own ownership rules still apply underneath.

Only these three functions write IVF values. Picking a date, choosing 3-day or 5-day, calculating, opening the page, navigating away, signing in and loading a journey all write nothing. The existing trying-to-conceive save routine is left untouched, so a normal profile save that omits IVF values can never clear them.

Saving a new or updated timeline uses the calculator's own rules (real calendar date, not in the future, within its entry range, type 3-day or 5-day, both values supplied together). Reading back an already-saved timeline uses shape and type checks only: an older treatment date stays readable forever, is never rejected and is never silently cleared, because IVF context is meant to survive as history.

The two values are always stored as a pair: either both empty or both filled with valid values. The database itself refuses a half-filled state.

Saving only ever updates an existing trying-to-conceive journey. If the person has no such journey yet, saving returns a clear "no journey" result and writes nothing — it never invents a journey, a placeholder or a lifecycle. Clearing behaves the same way: it empties both values on an existing journey, and is a safe no-op with a "no journey" result otherwise. Reading returns an empty context when the journey exists without IVF values, and a distinguishable "no journey" result when there is no journey at all.

Success is proved, not assumed: an update that quietly matches nothing is not an error, so both saving and clearing ask the database to hand back the touched row and only report success when exactly one row came back. Nothing is ever inserted just to find out whether a journey exists, and the journey row count stays identical through save, update and clear.


## 4. Feature flag

`IVF_TIMELINE_SAVE_ENABLED` (read from `VITE_IVF_TIMELINE_SAVE_ENABLED`), default **false**, exposed through a small typed helper. While it is off, no save, update or clear control renders anywhere. No component is wired to the helper in this phase.

## 5. Sign-in return route

`/ivf-timeline` is added to the existing public return-route allow list so a future sign-in can come back to the tool. No transfer date or type is stored in local storage, session storage, cookies or account metadata; current capability is documented as "return to the route only, values not preserved".

## 6. Untouched

Companion context, AI runtime, prompts, memory, grounding, journal, voice, articles, imagery, analytics, and all other journey code. Saved journey types remain exactly trying-to-conceive, pregnancy, first year.

## 7. Technical notes

- Migration: `ALTER TABLE public.ttc_journeys ADD COLUMN ivf_transfer_date date, ADD COLUMN ivf_transfer_type text` plus one consolidated paired-state constraint — `CHECK ((ivf_transfer_date IS NULL AND ivf_transfer_type IS NULL) OR (ivf_transfer_date IS NOT NULL AND ivf_transfer_type IN ('3day','5day')))` — so a half-filled context is impossible and no completeness flag is needed. No grants or policies altered (both inherit the table's existing ones). Generated database types regenerate after it runs. Rollback: drop the constraint and the two columns.
- New neutral domain module `src/lib/ivfTimeline.ts`: owns `IVFTransferType = "3day" | "5day"`, the type guard, the save-time date rule and the lenient historical-load parse. `IVFTimelineForm.tsx` re-exports its type from there; `savedTTCJourney.ts` imports from there. Persistence never imports a React component.
- `src/lib/savedTTCJourney.ts`: new `IVFTimelineContext` type (`transfer_date: string | null`, `transfer_type: IVFTransferType | null`) plus the three helpers, each returning a discriminated result including a `no_ttc_journey` reason in the project's existing result style. Each calls `supabase.auth.getSession()`, derives the user id from the session (no caller-supplied id), and reads/updates `ttc_journeys` filtered on that id, with existing row-ownership rules as the second layer. Save and clear use `update(...).select("user_id")` only — never insert, never upsert — and treat a zero-row result as `no_ttc_journey` rather than success; a missing error is never taken as proof of a write. Save writes both columns together after validating date and type; clear sets both to null together; load validates shape and type only, distinguishes "no journey" from "journey with no IVF context", and never rewrites or clears.
- `src/lib/featureFlags.ts` (new, or extended if a shared module already exists): `IVF_TIMELINE_SAVE_ENABLED` resolved from `VITE_IVF_TIMELINE_SAVE_ENABLED`, defaulting false. Nothing is wired to it this phase.
- `src/lib/authIntent.ts`: `/ivf-timeline` added to a public tool return list used by `isSafeReturnTo`; protected-route behaviour unchanged. Documented capability: return route supported, values not yet preserved across sign-in.
- Tests, new `src/test/phase34gIvfPersistence.test.ts(x)`: null IVF values remain valid; an ordinary trying-to-conceive save without IVF payload works and preserves existing IVF values; 3-day and 5-day both persist; date round-trips with no timezone drift; invalid type rejected; a new save obeys the calculator date rules; a stored date older than 300 days still loads and is not cleared; explicit update replaces values; explicit clear is the only clear path and nulls both together, leaving the journey and unrelated answers intact; database rejects date-without-type and type-without-date, accepts both null and both complete for 3-day and 5-day; save with an existing journey succeeds; save with no journey inserts nothing and returns the typed no-journey result; clear with no journey inserts nothing; load with no journey returns the explicit no-journey result; journey row count never changes; no second journey; no IVF journey type; calculator triggers zero persistence writes; flag defaults off; no save, update or clear control renders; the domain and persistence modules have no dependency on `IVFTimelineForm.tsx`; one shared transfer-type definition; helpers derive ownership internally so a caller cannot target another person's row. Cross-user access reported as NOT FULLY TESTABLE if the harness cannot run two real sessions — query filtering alone is not claimed as an access-rule integration test.
- Deployment ordering documented: reviewed migration → verify generated types → ship persistence-capable code with the feature off → privacy and legal approval → ship approved save experience → enable the flag. Code expecting the new columns is never activated against a schema without them.
- Boundary tests reconfirm: journey types exactly ttc / pregnancy / first_year, no `/my-ivf-journey`, grounding / AI context / memory / journal / voice / article changes all zero.
- Docs: `docs/content/phase34g-ivf-timeline-persistence-foundation.md`, `...-privacy-review-pack.md`, `...-persistence-evidence.md`, plus a roadmap entry. Privacy pack records data, purpose, owner, access, no automatic collection, explicit future saving, calculator works unsaved, no AI access, no derived storage, clearing behaviour, no fourth journey, pregnancy-transition intent, and the open items (notice wording, lawful basis, retention, impact assessment, activation copy). No legal approval is claimed.
- Validation: focused Phase 34G tests, existing trying-to-conceive tests, full suite, typecheck twice, lint against baseline, production build, migration validation in the non-production project only, and browser QA of `/ivf`, `/ivf-timeline` and the three stage pages at 1280/834/390 checking calculation still works signed out, no save/update/clear controls, no sensitive address parameters, no overflow, no new console errors.
- Production deployment: none. Activation stays gated on privacy and legal review; Phase 34H is recommended but not started.
