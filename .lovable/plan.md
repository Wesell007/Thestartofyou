# Phase 22A — First Year Photo Memories Strategy

Audit and recommendation only. Nothing is built in this phase.

## 1. Recommended product approach

One optional photo per memory, attached to the words a parent already chose to keep. The photo is a companion to the note, never the subject. No gallery, no feed, no grid wall: the memories page stays a written page with the occasional small image beside an entry.

## 2. Should photo memories proceed?

Yes, and it is the right next feature.

- Parent and emotional value: the highest-value addition to a keepsake space; a first smile is remembered in a picture more than a paragraph.
- Privacy: already solvable. The project has a private bucket, owner-scoped storage policies, signed URLs only, and a working account-deletion sweep.
- Cost: modest with a client-side downscale and one photo per memory.
- Complexity: low. `SlotPhotoMemory` (weekly photo) is a proven pattern to follow.
- Mobile: a single file input with camera capture is the whole interaction.
- Export and deletion: both have precedent (paths in JSON, storage sweep on account delete), but deletion needs one gap closed (see section 10).
- Brand: fits. Private, calm, parent-led, no comparison or scoring.

## 3. Version one scope

In: one optional photo per memory; add during save; add, replace or remove on an existing memory; small preview in the memory list; a tap-to-open larger view of that one photo.

Out for v1: albums, gallery feed, sharing, filters, editing, AI captions, video, multiple photos.

## 4. Database approach

Recommended: **add photo fields directly to `first_year_memories`**.

- `photo_path text null`, `photo_mime text null`, `photo_size_bytes bigint null`, `photo_width int null`, `photo_height int null`.
- A check constraint keeping the photo columns all-null or all-present.
- Existing RLS, grants, ownership trigger and the `auth.users` cascade already cover the row, so no new policy surface is created.

Rejected: a separate `first_year_memory_media` table (only earns its keep with multiple media per memory, which is explicitly out of scope) and a general private media table (premature; `week_media_memories` already showed that a per-feature table stays simpler).

If multiple photos per memory is ever wanted, the columns migrate cleanly into a child table later.

## 5. Storage approach

- Bucket: a new **`first-year-memories`**, private. Not reusing `weekly-photos`, whose name, path shape (`{user}/{week}/…`) and deletion sweep are pregnancy-week specific.
- Path: `{user_id}/{memory_id}/{uuid}.{ext}` so the first segment is the user id, matching the existing policy pattern.
- Types: `image/jpeg`, `image/png`, `image/webp`, `image/heic`/`heif` accepted at the input where the browser offers it.
- Size: 8MB before downscale, matching the weekly photo limit.
- Compression: client-side canvas downscale to a long edge of about 1600px, re-encoded to JPEG at ~0.82 quality. HEIC that the browser cannot decode is uploaded as-is within the size limit.
- Thumbnails: none in v1. The list preview renders the same signed URL in a small box.
- Signed URLs: one hour, generated on read, held in component state only, refreshed on a timer. Never stored in a table, never in a URL, never in the export file.
- Deletion: removing a photo deletes the object then nulls the columns; removing a memory deletes the object first, then the row.

## 6. RLS and storage policy approach

Four owner-scoped policies on `storage.objects` for the new bucket, mirroring the weekly-photos migration exactly: select, insert, update, delete, each `bucket_id = 'first-year-memories' AND auth.uid()::text = (storage.foldername(name))[1]`. No `anon` access. No public bucket. Table-side RLS is unchanged because the photo lives on the existing memory row.

## 7. UX direction

- Save form: a quiet "Add a photo (optional)" control under the note. Selecting shows a small preview with "Replace" and "Remove".
- Existing memory: the edit flow gains the same control; a memory with no photo shows the same quiet add affordance.
- List: a small rounded thumbnail to the left of, or above, the note on narrow screens. One per entry, modest size, never a grid.
- Larger view: tapping opens a simple dialog with the one photo and the memory's words. No swipe-through gallery.
- Errors reuse the established warm copy shape ("That file is a little too big.").

## 8. Multiples handling

The existing `memory_scope` (family, all babies, one baby) is enough. The photo inherits the memory's scope; there is no separate per-photo baby tag. No extra selector, no per-baby photo lanes.

## 9. Export

Metadata and storage path only, consistent with the current export note. The JSON gains `photo_path`, `photo_mime`, `photo_size_bytes` and dimensions on each memory row. No signed URLs, no base64 image data, no permanent URLs. The existing explanatory line in the export file is extended to mention First Year photos. A future zip export stays out of scope.

## 10. Account deletion

`supabase/functions/delete-account/index.ts` currently sweeps only the `weekly-photos` bucket. Phase 22B must extend it to sweep `first-year-memories` under the same `{user_id}/` prefix with the existing recursive walk, and fail closed the same way if the sweep errors. Row deletion continues to happen through the `auth.users` cascade.

## 11. Files likely to change in Phase 22B

- New migration: photo columns plus check constraint on `first_year_memories`; storage policies for the new bucket (bucket itself created with the storage tool, not SQL).
- `src/lib/firstYearMemories.ts`, `src/lib/firstYearMemoriesSchema.ts`
- `src/pages/firstyear/FirstYearMemories.tsx`
- `src/components/firstyear/memories/*` (memory form, `MemoryList.tsx`, a new photo field component and a new viewer dialog)
- `src/pages/AccountSettings.tsx` (export fields and wording)
- `supabase/functions/delete-account/index.ts`
- `src/integrations/supabase/types.ts` (regenerated)
- Co-located tests for the new validation helpers.

## 12. Files that must not change

`scripts/generate-sitemap.ts`, `public/robots.txt`, all public First Year, pregnancy, TTC, toddler and family pages, article data, the pregnancy toolkit, `week_photos` / `week_media_memories` and their components, `src/integrations/supabase/client.ts`, the Daily Check-in save logic, and AI or analytics definitions.

## 13. QA plan

Disposable accounts only, live account untouched. Cover: upload, replace, remove, memory delete removing the object, oversize and wrong-type rejection, HEIC on iOS Safari, signed URL expiry and refresh, a second account being unable to read the first account's object path, anon access denied, export contents containing paths and no URLs, account deletion leaving no objects in either bucket, keyboard and screen reader flow on the photo control and dialog, 390px and 1440px layout, and a clean console and network. All disposable rows, objects and auth users removed afterwards.

Commands: `npx tsgo --noEmit -p tsconfig.json`, targeted tests, `npx vitest run`, `npm run build`.

## 14. Risks and open questions

- HEIC files cannot be downscaled or rendered by some browsers; the fallback is to upload as-is and, if it will not render, show a warm "we couldn't open that one" rather than failing silently.
- Storage growth is unbounded per account. No quota is proposed for v1; worth revisiting once real usage exists.
- Orphaned objects if a delete succeeds in storage but the row update fails, or the reverse. Ordering (object first, then row) keeps the worst case a harmless orphan rather than a broken image.
- Open question: should a photo be addable to a memory created from "Keep this as a memory" in the same step, or only after saving? Recommendation is the same step, for one flow rather than two.

## 15. Should Phase 22B proceed?

Yes. Scope is small, the patterns exist, and the one real gap (deletion sweep for a second bucket) is identified and cheap to close.
