# /my-journey rebuild — final locked plan (ready to execute)

## Scope
Rebuild `/my-journey` as the **memory spine** of the product. Cumulative, reflective, structured. Visually and rhythmically distinct from `/my-week`. UK English. Calm and premium. No dashboard energy.

The current `src/pages/MyJourney.tsx` is a flat 1–42 vertical spine that mirrors `/my-week`'s rhythm too closely. Full rewrite required.

---

## Files changed

1. `src/lib/savedJourney.ts` — extend `ActivePregnancyJourney` type + reads.
2. `src/pages/MyJourney.tsx` — full rewrite.
3. `src/components/myjourney/JourneyHeader.tsx` — new.
4. `src/components/myjourney/CurrentChapterCard.tsx` — new.
5. `src/components/myjourney/JourneyGroup.tsx` — new.
6. `src/components/myjourney/KeptWeekRow.tsx` — new.
7. `src/components/myjourney/MomentCard.tsx` — new.
8. `src/components/myjourney/LookingAheadCard.tsx` — new.

No route changes. No `/my-week` changes. No migrations. No edits to `KeptChapter`, `MyWeek`, or any other page.

---

## Step 1 — Helper extension (`src/lib/savedJourney.ts`)

Minimal, additive only.

- Extend `ActivePregnancyJourney` with `started_at: string` and `startedAt: Date`.
- New-table branch reads `pregnancy_journeys.started_at`.
- Legacy fallback uses `saved_journeys.created_at` as `started_at`.
- No lifecycle widening, no migration, no other behavioural change.

---

## Step 2 — New components

### `JourneyHeader.tsx`
- Eyebrow: `Your saved journey`
- H1: `My journey`
- Stage line: `Week {currentWeek} of your pregnancy`
- Support sentence: `Your weeks, reflections, and moments are being kept here as your journey unfolds.`
- Primary CTA → `/my-week`: `Go to My Week`
- Quiet metadata row:
  - `Due {format(due, "d MMMM yyyy")}`
  - `Saving since {format(startedAt, "d MMMM yyyy")}` (hidden if startedAt missing)
- No counters, no progress ring, no stats strip.

### `CurrentChapterCard.tsx`
- Horizontal card. Uses `MyWeekBabyImage` in oval framing on the left.
- Quiet uppercase label: `Current chapter`
- Week label: `Week {currentWeek}`
- Short title from `getWeekIdentity(week).chapterTitle`
- One-line summary from `identity.theme`
- CTA → `/my-week`: `Continue this week`
- Visually the **dominant live anchor** at top.

### `JourneyGroup.tsx`
Props: `title`, `framing`, `children`.
- Group title (e.g. `First trimester`)
- One short framing line
- Slot for stacked `KeptWeekRow`s

Group definitions:
- `Beginning` — weeks 1–4 — `Where the story quietly began.`
- `First trimester` — weeks 5–13 — `The earliest weeks, mostly held in private.`
- `Second trimester` — weeks 14–27 — `Steadier weeks, finding rhythm.`
- `Third trimester` — weeks 28–42 — `The final stretch, drawing near.`

Only render groups that contain at least one kept row.

### `KeptWeekRow.tsx`
- Small oval `MyWeekBabyImage` thumbnail (~64px)
- `Week {n}` + short title (`identity.chapterTitle`)
- Single-line ellipsised reflection preview (~120 chars) when reflection exists
- If photo-only: small `Kept` micro-label, no reflection line
- Right-aligned arrow affordance
- Whole row links to `/my-week/{n}` (kept chapter view)
- Calm, browseable. No inline edit controls.

### `MomentCard.tsx`
- `Week {n}` label
- Reflection snippet (slightly longer, ~160 chars)
- Optional supporting line (week chapter title in italic)
- Links to `/my-week/{n}`

### `LookingAheadCard.tsx`
- Label: `Looking ahead`
- One-line preview of next week (`Week {n+1} · {nextIdentity.chapterTitle}` + theme)
- CTA → `/my-week`: `Return to My Week`
- Soft closing band, restrained.

---

## Step 3 — Page rewrite (`src/pages/MyJourney.tsx`)

### Single page-level effect — fetches in parallel:
- `getActivePregnancyJourney(userId)` → `lmp`, `due`, `startedAt`
- `profiles.first_name` (consistent with current behaviour: redirect to `/setup` if missing)
- `reflections` for user → `week`, `content`, `first_written_at`
- `week_photos` for user → `week`, `storage_path`, `created_at` (signed URLs only generated for the small set used in Moments + KeptWeekRow thumbnails — but since `KeptWeekRow` uses `MyWeekBabyImage` not user photos, signed URLs are NOT needed at all on this page. **Drop photo signed-URL generation entirely** — we only need to know which weeks have a photo to count them as "kept".)

`currentWeek` computed from `lmp` via the existing `computeWeek` formula already used in `MyWeek.tsx` and the current `MyJourney.tsx`.

### Kept-week selection
- A week is "kept" if `week < currentWeek` AND (it has a non-empty reflection OR a photo).
- Sort ascending by week.
- Group into Beginning / T1 / T2 / T3.

### Moments kept selection
- From kept weeks with reflections (photo-only excluded), take the most recent (descending `first_written_at`, falling back to week number).
- Render only if **≥ 2** reflection-led moments.
- Slice 3 on desktop, 2 on mobile (via two render slices behind responsive `hidden`/`block` classes — single component tree).

### Layout — single responsive Tailwind layout

Container: `max-w-[760px]` centred. Narrower than `/my-week` to reinforce the memory-spine, single-column reading rhythm — visually distinct from `/my-week`'s two-column composition.

Background: `bg-parchment-grain page-vignette` (consistent with /my-week shell).

**Source order in DOM** (single layout, no separate mobile tree):

1. `JourneyHeader`
2. `CurrentChapterCard`
3. `MomentsKept` section — wrapped in `order-3 md:order-3` container
4. `JourneySpine` (groups) — wrapped in `order-2 md:order-4` container
5. `LookingAheadCard`

Wait — for proper desktop/mobile ordering without a separate tree, I'll use `flex flex-col` on the wrapper and Tailwind `order-*` utilities on the two swappable sections (Moments and Spine), so:

- Mobile (default): Spine (`order-2`), Moments (`order-3`)
- Desktop (`md:`): Moments (`md:order-2`), Spine (`md:order-3`)

Per the locked spec:

**Desktop visual order:** Header → CurrentChapterCard → MomentsKept → Spine → LookingAhead
**Mobile visual order:** Header → CurrentChapterCard → Spine → MomentsKept → LookingAhead

(The mobile compact-header + standalone "Go to My Week" CTA is achieved within `JourneyHeader` itself by making the CTA full-width on mobile and inline on desktop — no separate mobile component needed.)

### Empty / early states (handled inside the page)

- **No journey row** → redirect to `/due-date-calculator` (consistent with current behaviour).
- **No kept weeks** (journey exists but no reflections/photos for any past week):
  - Render `JourneyHeader` + `CurrentChapterCard` + a single soft block in place of the spine: `Your journey has just begun. The weeks and reflections you keep will gather here over time.` + `LookingAheadCard`.
  - No filler sections.
- **Kept weeks present** → full structure.

### Current week handling in the spine

**Default: omit current week from the spine entirely.** The top `CurrentChapterCard` is the sole live anchor.

**Edge case:** If the current week itself already has a saved reflection or photo (i.e. user has been actively journaling this week), it will appear as a normal `KeptWeekRow` in its trimester group — because by then it is genuinely kept content, not redundant. To avoid duplication with the top anchor, when this happens the row gets a quiet `· This week` micro-label appended after the chapter title and a slightly reduced opacity (`opacity-80`), making it visually subordinate to the top `CurrentChapterCard`.

This satisfies: "If the current week also appears in the spine, it must be visually restrained and clearly subordinate to the top anchor."

### Fallback content used

- Week title missing in `myWeekContent` → fallback to `Week {n}`, summary line omitted.
- Reflection content → first ~120 chars (KeptWeekRow) / ~160 chars (MomentCard), trimmed and ellipsised on word boundary where possible.
- `Saving since` → `format(startedAt, "d MMMM yyyy")`. Line hidden if startedAt is null/undefined.
- Due date → `format(due, "d MMMM yyyy")`.
- Next-week preview (LookingAhead) → `getWeekIdentity(currentWeek + 1)`. If `currentWeek === MAX_PREGNANCY_WEEK`, render a softened variant: `Looking ahead — Your due date is near.` with the same `Return to My Week` CTA.

---

## Behavioural guarantees

- `/my-journey` ≠ `/my-week`:
  - Single narrow column rhythm vs `/my-week`'s sticky two-column composition.
  - Grouped chapter sections vs `/my-week`'s flat focused weekly experience.
  - No ritual rail, no slot composition, no live editing, no photo upload widgets.
- Top `CurrentChapterCard` is the **sole live anchor**.
- Spine is the **dominant middle section**.
- Moments kept stays secondary, hidden when threshold not met.
- No dashboard styling: no charts, no streaks, no progress rings, no completion percentages, no stats strip, no filters, no sidebar.

---

## Out of scope (will not touch)

- Routing
- `/my-week`, `KeptChapter`, `MyWeek` components
- Migrations
- Lifecycle transition logic
- Edit affordances on `/my-journey`
- Any new tables

---

## Returnables after build

1. **Changed files list** (8 files above)
2. **New components list** (6 components in `src/components/myjourney/`)
3. **Current week handling in spine:** by default omitted; only appears as a quiet `KeptWeekRow` with `· This week` micro-label and reduced opacity if it has a saved reflection/photo
4. **Fallback content used:** as specified above
5. **Items needing manual design review:**
   - Final wording of group framing lines (Beginning / T1 / T2 / T3)
   - Final wording of the early-state prompt
   - Final wording of the LookingAhead one-liner past week 41
   - Visual weight balance between `CurrentChapterCard` and the first `KeptWeekRow` directly beneath the most recent group
   - Whether 3-desktop / 2-mobile Moments slicing feels right at high kept-content volumes
6. **Preview notes** at desktop (1180px) and mobile (375px) viewports after build.

---

**Approve to switch to default mode and execute.**
