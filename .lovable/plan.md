# Phase 12.4d — Hospital Bag MVP

Build the second Pregnancy Toolkit tool at `/pregnancy-toolkit/hospital-bag`: a calm, premium checklist backed by a new `hospital_bag_items` table with strict RLS. Defaults (**27 items**) are seeded only on first visit to the tool itself, never from the hub.

## Scope

In: DB migration + RLS, protected route, checklist UI, default seeding, custom items, packed toggle, progress + summary, toolkit hub card upgrade, My Week card from week 30+.
Out: Appointment Notes, Kick/Contraction counters, Symptoms, Midwife Questions, AI memory, My Journey toolkit progress panels.

## Database (single migration)

```sql
create table public.hospital_bag_items (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  category text not null check (category in ('parent','baby','partner','documents','comfort')),
  item_key text not null,
  label text not null,
  is_custom boolean not null default false,
  packed_at timestamptz,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (user_id, category, item_key)
);

grant select, insert, update, delete on public.hospital_bag_items to authenticated;
grant all on public.hospital_bag_items to service_role;

alter table public.hospital_bag_items enable row level security;

create policy "own rows select" on public.hospital_bag_items
  for select to authenticated using (auth.uid() = user_id);
create policy "own rows insert" on public.hospital_bag_items
  for insert to authenticated with check (auth.uid() = user_id);
create policy "own rows update" on public.hospital_bag_items
  for update to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "own rows delete" on public.hospital_bag_items
  for delete to authenticated using (auth.uid() = user_id);

create index hospital_bag_items_user_category_idx
  on public.hospital_bag_items (user_id, category);

create trigger hospital_bag_items_set_updated_at
  before update on public.hospital_bag_items
  for each row execute function public.set_updated_at();
```

No anon grants. Reuses existing `public.set_updated_at()`.

## Frontend files

Create:
- `src/lib/hospitalBagSchema.ts` — category keys + labels, the 27 default items with stable `item_key` slugs and `sort_order`, TS types (`HospitalBagCategoryKey`, `HospitalBagItemRow`, `HospitalBagStatus`), helpers `calculateProgress`, `statusFromProgress`, `statusLabel`.
- `src/hooks/useHospitalBag.ts` — load rows for `auth.uid()`; if empty, seed the 27 defaults once via a single `upsert` on `(user_id, category, item_key)` (idempotent). Exposes `togglePacked` (optimistic, rollback on error), `addCustomItem` (trim, reject empty, slug + random suffix `item_key`, `is_custom = true`, append with `sort_order = max + 1`), `deleteCustomItem` (guards `is_custom`), computed `packed / total / percent / status`, and `loadState / saveState / errorMessage / reload`. Also exports `useHospitalBagSummary` for the hub (read-only, never seeds). Casts `supabase.from("hospital_bag_items") as any` for stale generated types.
- `src/pages/PregnancyToolkitHospitalBag.tsx` — hero, safety line, `HospitalBagProgress`, five `HospitalBagCategory` sections, summary block, back links. `SeoHead` with `noindex`. Visual language mirrors Birth Plan.
- `src/components/pregnancy-toolkit/HospitalBagCategory.tsx` — keepsake card per category: item rows with checkbox toggle, delete affordance only for `is_custom`, inline add-item input at bottom.
- `src/components/pregnancy-toolkit/HospitalBagProgress.tsx` — `X of 27 packed`, percent, calm status label (Not started / A few things packed / Coming together / Nearly ready / Ready enough).

Edit:
- `src/App.tsx` — lazy-import `PregnancyToolkitHospitalBag` and register `/pregnancy-toolkit/hospital-bag` inside `ProtectedRoute`, next to the Birth Plan route.
- `src/pages/PregnancyToolkit.tsx` — Hospital Bag card becomes live `<Link>` using `useHospitalBagSummary`: Not started (no rows) → `X of 27 packed` → `Ready enough` when close to complete. No seeding from the hub.
- `src/components/myweek/SectionToolsThisWeek.tsx` — flip `hospitalBag` to `kind: "live"` with `to: "/pregnancy-toolkit/hospital-bag"`. Adjust `getWeekTools` bands so weeks 30+ surface Hospital Bag as live (Birth Plan still live from 28+, other tools unchanged).

Do NOT edit: `scripts/generate-sitemap.ts`, `src/integrations/supabase/client.ts`, `src/integrations/supabase/types.ts`, robots, `MyJourney`, or any TTC/IVF/First Year/Toddler/Family/public pregnancy files.

## Default checklist (27 items)

Mum or birthing parent (7): comfortable nightwear, going home clothes, maternity pads, toiletries, phone charger, water bottle, snacks.
Baby (7): sleepsuits, vests, nappies, wipes or cotton wool, hat, blanket, going home outfit.
Birth partner (4): snacks and drinks, phone charger, change of clothes, important contacts.
Documents (4): maternity notes, birth plan, hospital information, important phone numbers.
Comfort items (5): lip balm, hair ties, pillow if preferred, music or headphones, a small item that helps you feel calm.

Total = 27.

## Seeding behaviour

- Toolkit hub: `select` only. Never inserts. No rows → "Not started".
- Tool page mount: `select where user_id = auth.uid()`. If zero rows, run one `upsert` batch of the 27 defaults keyed by `(user_id, category, item_key)`. Idempotent by unique constraint; repeat visits never duplicate.
- Seed failure surfaces a calm inline error with a retry button; page does not collapse.

## Packed toggle

- Unchecked → `update ... set packed_at = null`.
- Checked → `update ... set packed_at = now()`.
- Optimistic update in the hook; rolled back on error.

## Custom items

- Trim label; reject empty. Generate `item_key` from slug of label + short random suffix (collision-safe against the unique constraint). `is_custom = true`. Append with `sort_order = max(existing in category) + 1`.
- Delete only allowed when `is_custom = true`. Default items have no delete affordance in MVP.

## Copy + safety

UK English, calm and optional framing, no em/en dashes in user copy. Hero standfirst plus a quieter reminder that this is a guide, hospitals differ, and users can adapt it. No medical or urgent-symptom guidance inside the tool.

## Visual direction

Parchment background, `keepsake-surface` cards, `--stage-pregnancy-accent` tokens, serif headings, soft borders, mobile-first single column — matching `/pregnancy-toolkit` and Birth Plan.

## Verification

- `bunx tsgo --noEmit`
- Manual: unauth → auth redirect; first authed visit → 27 defaults seeded, `0 of 27 packed`; toggle sets/clears `packed_at` and persists on reload; add + delete custom item; hub reflects real count without seeding; Hospital Bag card in My Week live from week 30, coming-soon before.
- Confirm `<meta name="robots" content="noindex,follow">`.
- Confirm `/pregnancy-toolkit/hospital-bag` not in `public/sitemap.xml`.
- Grep new files for `href="#"` → none.

## Recommended next phase

12.4e — Appointment Notes tool (relational notes with dates and follow-ups).
