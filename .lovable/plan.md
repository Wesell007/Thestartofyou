# Phase 26J — Memories Photo URL Cleanup

Narrow reliability fix for signed photo URLs on `/my-first-year/memories`. No design, copy, schema, storage or RLS changes.

## Discovery findings

1. Photo paths are stored on `first_year_memories.photo_path`, one optional photo per memory.
2. Signed URLs are created in `createMemoryPhotoUrl` in `src/lib/firstYearMemories.ts` (1 hour TTL), which logs `first year memory photo url failed <message>` on any error.
3. Signing happens in a page effect in `src/pages/firstyear/FirstYearMemories.tsx`, keyed off `[memories, photoUrls]`, writing into a `photoUrls` record keyed by path. Cards and the viewer both read from that same record, so the viewer makes no separate request.
4. Add: photo held as a local draft, uploaded after the words save via `attachMemoryPhoto`, then the whole list is refetched.
5. Replace: same path, with `previousPath` passed so the old object is deleted after the row update.
6. Remove: `clearMemoryPhoto` nulls the columns then deletes the old object.
7. Old objects are deleted from storage on replace, remove and memory delete.
8. Delete memory prunes only that one path from `photoUrls`.
9. The console 400 comes from the `console.error` in `createMemoryPhotoUrl`.
10. Yes — requests can resolve after `photo_path` has changed, and nothing checks whether the path is still current.

## Root cause

Two related gaps, both in the page-level signing effect:

- **Stale paths.** During replace and remove, the old object is deleted from storage while `memories` in React state still holds the old `photo_path`. The effect can fire (or a request already in flight can land) for a path that no longer exists, producing `Object not found`.
- **Retry loop on failure.** When signing fails, nothing is written into `photoUrls`, so the path stays "missing" and the effect re-runs on the next state change, re-requesting and re-logging the same failing path repeatedly. This is what turns one expected miss into console noise.

## Fix

Extract the signing logic out of the page into one small hook, `src/hooks/useMemoryPhotoUrls.ts`, driven by the current list of memories:

- Derives the set of paths that are current. Never requests a URL for a null, empty or non-current path.
- Tracks per-path state (`pending`, `ready`, `failed`) so a path is attempted once. A failed path is remembered and not retried in a loop.
- Prunes cache and status entries for paths that have dropped out of the current list, so replace, remove and delete clear their URL state immediately.
- Ignores a resolved response whose path is no longer current when it lands (late-arriving stale request).

Alongside it:

- `createMemoryPhotoUrl` gains a quiet option (or an `{ url, missing }` result) so an expected missing object during refresh resolves to no photo without a console error, while unexpected storage failures still log through the existing pattern.
- `FirstYearMemories.tsx` swaps its inline effect and `photoUrls` state for the hook. Everything downstream (`MemoryList`, `MemoryPhotoViewer`, edit prefill, delete pruning) keeps reading the same shaped map, so no component markup or styling changes.
- The viewer only opens for a memory whose `photo_path` is still current, so a removed photo cannot be opened.
- Cards without a resolvable URL keep the existing quiet behaviour: the memory renders as text, with no placeholder added.

## Tests

New `src/hooks/useMemoryPhotoUrls.test.ts(x)` covering: no request for null/empty paths; state cleared when a path leaves the list; stale responses ignored after a path change; replace signs the new path only; remove signs nothing; a missing-object response resolves without crashing and without repeated attempts. Existing memories tests updated where the page wiring changed.

## Verification

Signed-in `/my-first-year/memories` at 390px and 1440px: create text memory, create with photo, open and close the viewer, replace, remove, delete with photo. Watch the network panel for signed URL calls on removed paths and the console for `Object not found`. Then typecheck, targeted tests, `npx vitest run`, and `npm run build`.
