# Phase 22B — First Year Photo Memories Build

One optional private photo per First Year memory. Not a gallery, feed, album or sharing surface. The photo supports the written memory and never replaces it.

Plan mode is still active, so nothing below has been applied. Approving this plan lets me run the migration, create the bucket and build the rest.

## Database migration

`public.first_year_memories` gains `photo_path text`, `photo_mime text`, `photo_size_bytes bigint`, `photo_width integer`, `photo_height integer`, all nullable.

Constraints:

- path, mime and size are all null or all present; width and height stay independently nullable because some HEIC files expose no dimensions in the browser
- path length 1 to 512
- mime limited to jpeg, png, webp, heic, heif
- size greater than zero and at most 8MB
- width and height positive when present

The existing `validate_first_year_memory` trigger is extended so a stored `photo_path` must begin with `{user_id}/{memory_id}/`, meaning a photo can never point at another account's object.

No new table. Existing RLS, grants, ownership trigger and the `auth.users` cascade already cover the row, so no policy changes on the table. Types are regenerated after the migration.

## Storage

New private bucket `first-year-memories`, created with the storage tool. `weekly-photos` is left untouched.

Path shape `{user_id}/{memory_id}/{uuid}.{ext}` so the first segment is the authenticated user id.

Four owner-scoped policies on `storage.objects` (select, insert, update, delete), each `bucket_id = 'first-year-memories' AND auth.uid()::text = (storage.foldername(name))[1]`. No anon access, no public bucket.

Client rules: 8MB before upload, canvas downscale to a long edge of about 1600px re-encoded to JPEG at ~0.82 where the browser can decode, HEIC uploaded as-is within the limit when it cannot. No thumbnails. Signed URLs only, one hour, held in component state, never written to a table or an export.

## Save, replace, remove, delete

Create with a photo: save the text memory first, use the returned id for the path, upload, then update the row with photo metadata. If the upload fails after the text saved, the memory is kept and the message is "Your memory was saved, but the photo didn't attach. You can try adding it again."

Replace: upload the new object, update the row, then delete the old object. Remove: clear the row fields, then delete the object. Delete a memory: capture the path, delete the row, then best-effort delete the object. Cleanup failures are logged clearly; a private orphaned object is preferable to a row pointing at a missing image.

## Account deletion

`supabase/functions/delete-account/index.ts` currently sweeps only `weekly-photos`. It gains the same recursive `{user_id}/` sweep for `first-year-memories`, failing closed exactly as the current flow does.

## UX

Memory form: a quiet "Add a photo (optional)" control, then a small preview with Replace and Remove. The edit flow offers add, replace and remove on existing memories.

Memory list: one small rounded preview per entry, modest, no grid, month grouping unchanged.

Larger view: click or tap opens a simple dialog with the single photo plus the memory's date, title and note. No carousel, no swiping.

Warm error copy ("That file is a little too big."). Banned words avoided throughout: milestone, normal, safe, unsafe, tracker, score, progress, gallery, album, share.

## Multiples

The photo inherits the existing `memory_scope` (family, all babies, one baby). No separate baby selector for photos.

## Export

Account Settings export includes `photo_path`, `photo_mime`, `photo_size_bytes`, `photo_width`, `photo_height` on each memory row. No signed URLs, no public URLs, no base64, no files. The export explanation is updated to say photo files are not embedded in the JSON.

## Files changing

Migration; storage bucket and policies; `src/integrations/supabase/types.ts`; `src/lib/firstYearMemories.ts`; `src/lib/firstYearMemoriesSchema.ts`; `src/pages/firstyear/FirstYearMemories.tsx`; `src/components/firstyear/memories/*` including a new photo field component and a new photo viewer dialog; `src/pages/AccountSettings.tsx`; `supabase/functions/delete-account/index.ts`; co-located tests for validation and photo helpers.

Not changing: sitemap generation, robots, public First Year, pregnancy, TTC, toddler and family pages, article data, the pregnancy toolkit, `week_photos`, `week_media_memories`, weekly photo components, Daily Check-in save logic, AI and analytics definitions.

## QA

Disposable accounts only. Covers create without and with a photo, add, replace, remove, delete a memory with a photo, oversize and wrong-type rejection, HEIC where possible, signed URL generation and refresh, cross-account and anon access denial, export contents, account deletion sweeping the new bucket, 390px and 1440px layout, keyboard flow, screen reader labels, dialog focus handling, no overflow, and a clean console.

Commands: `npx tsgo --noEmit -p tsconfig.json`, targeted tests, `npx vitest run`, `npm run build`, with sitemap and dist results reported.
