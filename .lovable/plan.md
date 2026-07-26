# Phase 13.1a — Weekly Photo Captions (Build)

Schema check: `week_photos.caption text NULL` already exists in `src/integrations/supabase/types.ts`. **No migration.**

## New helper
- `src/lib/weekCaption.ts` — `CAPTION_MAX = 140`, `CAPTION_PLACEHOLDER = "Add a few words about this memory"`, `normaliseCaption` (collapse whitespace/newlines, trim), `isCaptionWithinLimit`, `captionForSave` (empty → `null`, over-limit → throw).

## `src/components/myweek/SlotPhotoMemory.tsx`
- Extend the loaded-state fetch to also `select("storage_path, caption")` and store `caption` in state.
- Only render caption UI when `state === "loaded"` and a photo exists.
- Below the existing `<figcaption>`, add a caption panel:
  - **View mode**: if caption present, render it as a quiet serif line with a small "Edit" affordance. If null, render a discreet "Add a few words about this memory" button.
  - **Edit mode**: single-line `<textarea>` (auto-resizes, 2 rows max) with live `n/140` counter. `Save` + `Cancel`. Save disabled when over 140 chars; over-limit shows inline calm error `"140 characters max"`. Newlines collapsed on save.
  - Save path: `supabase.from("week_photos").update({ caption: captionForSave(value) }).eq("user_id", userId).eq("week", week)`. On error → inline `"Couldn't save your caption"`. Cancel restores the previous caption.
- Photo upload path unchanged (no re-upload triggered by caption edits). Existing `handleRemove` unchanged — the row delete removes the caption with it.

## `src/components/myjourney/PhotoJournal.tsx`
- `PhotoItem` gains optional `caption?: string | null`.
- When present, render a second line beneath the "Week N" label, `line-clamp-1`, small tracked sans caption. Tile visually unchanged when absent.

## `src/pages/MyJourney.tsx`
- `PhotoRow` gains `caption: string | null`.
- Extend the `week_photos` select to `"week, storage_path, caption"`.
- Include `caption` in the `photoUrls` items passed to `<PhotoJournal>`.

## `src/pages/KeptChapter.tsx`
- Extend the single-week `week_photos` select to `"storage_path, caption"`.
- Add `caption: string | null` to `Loaded` alongside `photoUrl`.
- In the "A moment kept" section, when caption exists, render it as a serif italic line beneath the `<img>` inside the same figure, in the existing accent-tinted style. Section remains unchanged when no caption.

## Not touched
Routes, sitemap, robots, public pages, AI edge functions/prompts/request body, Companion Personalisation, Pregnancy Toolkit, Birth Plan, Hospital Bag, saved-journey/reflection logic, storage bucket, photo upload file rules, signed URL refresh, analytics events, TTC/IVF/First Year/Toddler/Family.

## Verification
- `bunx tsgo --noEmit` clean.
- Existing photos load unchanged; add-caption affordance appears for those without captions.
- 1–140 char save persists; page refresh renders it in all three surfaces.
- Empty save writes `NULL`.
- Over-140 blocked with inline message (no silent truncation).
- Newlines collapsed to spaces.
- Caption edit does not re-upload the photo.
- Signed URL 50-minute refresh still fires.
- Removing the photo removes the caption (row delete unchanged).
- No new route, no new bucket, no migration, no analytics change.
- Caption text absent from any AI or analytics payload.
