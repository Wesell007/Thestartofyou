## Phase 13.6c: Video Memory QA and UX Polish

Focused polish for the video memory feature shipped in 13.6b. No new features, no voice notes, no MediaRecorder, no AI, no analytics, no DB or storage changes.

## Files to edit

- `src/components/myweek/SectionKeepThisWeek.tsx` — subtle divider between photo and video slots.
- `src/components/myweek/SlotVideoMemory.tsx` — "Saving video..." copy, optional duration badge, tighten small-screen spacing, verify error dismissal, keep caption editor aligned with the photo editor.
- `src/lib/weekMedia.ts` — add pure `formatDuration` helper only.

No changes to: `useWeekMedia.ts`, `SlotPhotoMemory.tsx`, `weekCaption.ts`, `MyWeek.tsx`, migrations, storage, routes, sitemap, robots.

## Changes

### 1. Divider — `SectionKeepThisWeek.tsx`

Insert between the two slots. No wrapper heading, no "KEEP THIS WEEK", no subline.

```tsx
<div
  aria-hidden="true"
  className="mx-auto my-8 h-px w-16"
  style={{ backgroundColor: "hsl(var(--stage-pregnancy-accent) / 0.22)" }}
/>
```

### 2. Uploading copy — `SlotVideoMemory.tsx`

Change empty-state Add and loaded-state Replace from "Saving" → "Saving video..." (three ASCII dots) while `uploading`.

### 3. Duration badge — `SlotVideoMemory.tsx` + helper in `weekMedia.ts`

Add pure helper:

```ts
export const formatDuration = (seconds: number | null): string | null => {
  if (typeof seconds !== "number" || !Number.isFinite(seconds) || seconds <= 0) return null;
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
};
```

Render a small quiet badge (bottom-left overlay on the loaded video) only when the formatted value is non-null. Display only; no validation, DB, or storage change.

### 4. Small-screen spacing — `SlotVideoMemory.tsx`

- Tighten overlay padding at `<sm`.
- Hide the "Replace video" text label at `<sm` (icon-only, `aria-label="Replace video"` preserved). Text label restored at `sm:` and up.
- Ensure Private badge and control cluster don't collide at 375px.
- No desktop layout regression.

### 5. Error dismissal — `SlotVideoMemory.tsx`

Confirm both Add and Replace buttons route through `openFilePicker`, which already calls `clearError()`. No code change unless verification finds a gap.

### 6. Caption editor consistency — `SlotVideoMemory.tsx`

Keep disabled/loading styling aligned with `SlotPhotoMemory.tsx`. No changes to caption rules in `weekCaption.ts`.

## Verification

1. `bunx tsgo --noEmit`
2. Guard greps in `src/`: no new `MediaRecorder`, analytics, or AI imports; no route/sitemap/migration edits.
3. Temporary Playwright smoke test under `/tmp/browser/` (no fixtures in the repo):
   - Active `/my-week` renders both slots with divider.
   - Unsupported MIME rejected.
   - Small `video/webm` uploads → loaded state; duration badge visible when duration ≥ 1s.
   - Caption add/save round-trips.
   - Replace video works.
   - Remove video returns to empty card.
   - Non-active status hides `SectionKeepThisWeek`.
   - Photo memory + captions unchanged.
4. Manual viewport check at 375px and 1280px for overlay spacing and focus states.

## Deliverables

- Three files touched.
- QA summary with typecheck, smoke-test outcome, and photo-regression confirmation.
- No fixtures, tests, or scripts committed to the repo.