# N10.1 — 05 R2: Storage object after Auth deletion

After R1 (`raw/04a`):

- `storage.objects` still holds `b99b0708-…/r1-original.txt`.
- Storage API download (service role) is HTTP 200, 61 bytes, SHA-256 `00e2cefc…b0da`, **identical** to the bytes before deletion.

**Result: the object is retained.** Auth deletion performs no Storage cleanup. Without an explicit purge, a deleted user's media stays in the bucket indefinitely.
