# Phase 16.1B — Final hardening and live verification

Backend-only. No schema change, no RLS/RPC logic change, no UI, routes, AI or consent work.

## 1. Privilege hardening (one forward-only migration)

```sql
REVOKE ALL ON public.babies FROM anon;
REVOKE ALL ON public.first_year_journeys FROM anon;
REVOKE ALL ON public.babies FROM PUBLIC;
REVOKE ALL ON public.first_year_journeys FROM PUBLIC;
```

Same hardened pattern as Phase 12.6e. Existing `authenticated` and `service_role` grants stay untouched, so app behaviour is unchanged. After applying, re-read `relacl` on both tables and report the exact `anon` and `PUBLIC` result.

Current state already read (`pg_class.relacl`):

- `babies` and `first_year_journeys` both show `anon=arwdDxtm/postgres` — full table privileges held by `anon`.
- Neither table has any `PUBLIC` entry, so the `PUBLIC` revokes are no-ops kept in the migration for consistency with the Phase 12.6e pattern.

Default privileges (`pg_default_acl`), reported not changed: the Supabase-managed defaults for `postgres` and `supabase_admin` on the `public` schema still grant `arwdDxtm` on future tables to `anon`, `authenticated` and `service_role`. That is why every new table starts with `anon` privileges and must be revoked per table. Altering those platform-level defaults is outside the Phase 12.6e pattern and outside this phase's scope, so this phase only reports it; the per-table revoke stays the working convention.

## 2. Live signed-in verification

Run against the injected signed-in test session. Capture the prior state first (`journeys`, `pregnancy_journeys`, `first_year_journeys`, `babies`, `archived_journeys`) and restore it exactly afterwards.

- Multiples: one, two, three and four baby arrays each succeed; `birth_order` persists; exactly one primary; names optional.
- Rejections: empty array, five babies, missing date of birth, future date of birth, absurdly old date of birth.
- Sensitive-state guard: `pregnancy_loss`, `paused`, `no_longer_pregnant` rejected server-side; `given_birth` succeeds; `canEnterFirstYearSetup` does not invite `active`.
- Handover: `archived_journeys` snapshot exists with `ended_reason = 'transitioned'`; `first_year_journeys.archived_pregnancy_journey_id` set; `journeys.lifecycle` flips to `first_year`.
- No regression: pregnancy memories still readable, Kept Chapter still opens, memory film still reaches pregnancy memories, TTC and pregnancy flows unaffected.
- Export: `first_year_journeys` and `babies` present in the Account Settings export; no signed or public media URLs, no AI data, no companion memory data.

## 3. Checks

`npx tsgo --noEmit -p tsconfig.json`, `npx vitest run src/lib/firstYearDates.test.ts`, `npx vitest run` — exact output reported.

## 4. Recorded design requirement (not built in 16.1B)

The first user-facing First Year / Postpartum phase (16.2 or 16.3) must visually connect to `/first-year` and `/postpartum`, reusing `--stage-firstyear(-soft/-accent/-deep)`, `--stage-recovery(-soft/-accent/-deep)` and `--stage-postpartum(-accent)`. Not a pregnancy page with baby data added. One First Year journey, two sides of support: "For baby" uses First Year language, "For you" uses postpartum and recovery language.

## Stop point

Stop after hardening and verification. No Phase 16.2, no First Year setup UI, no multiples UI, no dashboard, no Postpartum surfaces, no AI continuity, no companion memory consent.
