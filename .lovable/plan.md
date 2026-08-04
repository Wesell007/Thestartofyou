# Phase 16.1B — Final verification report and remaining work

## Read-only verification completed (results)

| Check | Result |
| --- | --- |
| Migration file created | `supabase/migrations/20260804110355_b63245a6-5730-4886-9578-1db000569e47.sql` (284 lines) |
| Migration applied cleanly | Yes — all objects present live |
| `first_year_journeys` table | Exists |
| `babies` table | Exists |
| `first_year_journey_status` enum | Exists (`active`, `paused`, `completed`) |
| `save_first_year_journey(p_babies jsonb)` | Exists, SECURITY INVOKER, EXECUTE revoked from PUBLIC/anon, granted to authenticated + service_role |
| RLS enabled | Yes on both tables |
| RLS policies | 4 each (select/insert/update/delete), all `TO authenticated`, all scoped `auth.uid() = user_id` |
| Date-of-birth validation | Trigger `babies_validate_date_of_birth` on insert and update: rejects future dates and dates older than 1826 days |
| Multiples schema | `birth_order` 1-4 check, unique `(user_id, birth_order)`, partial unique index enforcing exactly one primary per user |
| Account export | Includes `first_year_journeys` and `babies`; payload carries storage paths only, no signed or public media URLs, no AI/companion data |
| Typecheck (`npx tsgo --noEmit -p tsconfig.json`) | Clean, no output, exit 0 |
| `npx vitest run src/lib/firstYearDates.test.ts` | 9 passed |
| Full suite (`npx vitest run`) | 14 files, 75 tests, all passed |
| UI changes | None — no new routes, no First Year setup UI, no multiples UI, no dashboard, no Postpartum surface |
| AI changes | None — no AI files, prompts or companion memory consent touched |
| Files changed this phase | `firstYearDates.ts`, `firstYearDates.test.ts`, `firstYearJourney.ts`, `AccountSettings.tsx`, generated `types.ts`, the migration, plan archive |

## One blocker found

`anon` holds full table privileges (`arwdDxtm`) on both `babies` and `first_year_journeys`. The migration did not grant them; they come from the project's default privileges on the `public` schema. RLS still blocks anon (every policy is `TO authenticated`, and no policy means deny), so there is no live data exposure. But this is exactly the posture corrected in Phase 12.6e for six other tables, so the two new tables are inconsistent with the rest of the schema.

Proposed fix (one small migration, no schema change):

```sql
REVOKE ALL ON public.babies FROM anon;
REVOKE ALL ON public.first_year_journeys FROM anon;
```

## Not verifiable read-only

These require writing rows as a real signed-in user, which cannot run in plan mode:

- Multiples RPC behaviour for one, two, three and four babies
- Rejection of empty array, more than four, missing date of birth
- Optional names, `birth_order` persistence, exactly one primary
- Server-side sensitive-state rejection (`pregnancy_loss`, `paused`, `no_longer_pregnant`) and acceptance of `given_birth`
- Archive handover (`archived_journeys` row, `ended_reason = 'transitioned'`, `archived_pregnancy_journey_id` set) and `journeys.lifecycle` flip to `first_year`
- Pregnancy memories, Kept Chapter and memory film still readable after the flip

Static reading of the RPC shows each of these rules present and correct, and `canEnterFirstYearSetup` in `src/lib/firstYearJourney.ts` invites only `given_birth`, so `active` is correctly not invited.

## Plan for closing Phase 16.1B

1. Apply the `anon` revoke migration above (also revoking any `PUBLIC` table privileges on both tables using the same hardened pattern as Phase 12.6e).
2. Run a live signed-in RPC exercise against the injected session: save one, two, three and four babies in turn; assert `birth_order`, names and the single primary each time; assert the four rejection cases raise; assert the sensitive-state guard rejects and `given_birth` succeeds; assert the archive row, `ended_reason`, linkage and lifecycle flip; then re-read pregnancy memories and Kept Chapter to confirm no regression. Restore the account to its prior state afterwards.
3. Report the exact results and close the phase.

No Phase 16.2 work, no First Year setup UI, no dashboard, no Postpartum surfaces, no AI continuity work.

## Recorded design requirement for the first user-facing First Year / Postpartum phase

Not part of Phase 16.1B. Phase 16.1B stays backend-only with no UI or colour changes. This applies from Phase 16.2 or 16.3 onward.

- Signed-in First Year journey surfaces must feel visually connected to the public First Year hub, the public Postpartum hub, and the existing premium design system. They must not look like a pregnancy page with baby data added.
- Before building First Year setup or a dashboard, audit `src/pages/FirstYear.tsx`, `src/pages/Postpartum.tsx`, `src/components/firstyear/*` and `src/pages/firstyear/*`, including the postpartum recovery, emotional wellbeing, and body and hormones topic areas, and reuse the existing colours, accents, surfaces, gradients, cards and section treatments. Existing tokens in use: `--stage-firstyear` (+ `-soft`, `-accent`, `-deep`), `--stage-recovery` (+ `-soft`, `-accent`, `-deep`), `--stage-postpartum` (+ `-accent`).
- No new palette unless the existing hub colours turn out inconsistent or technically unusable.
- Two lanes, one journey: "For baby" uses the First Year language (calm, warm, practical); "For you" uses the Postpartum/recovery language (softer, emotionally supportive). No hard split that makes Postpartum feel like a separate product. Framing: one First Year journey, with two sides of support.
- Visual QA for that phase: compare against `/first-year` and `/postpartum`; colours feel connected; pregnancy colours not reused by default; the two lanes feel distinct but part of one product; mobile keeps the premium feel; no palette drift.

