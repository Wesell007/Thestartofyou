# Approved Plan: Mobile Video Upload Accept Polish

## Approval note

User approved the plan to widen the video file input `accept` attribute while keeping upload validation unchanged.

## Change to apply

**File:** `src/lib/weekMedia.ts`

**Current:**

```ts
export const VIDEO_ACCEPTED_MIME = [
  "video/mp4",
  "video/webm",
  "video/quicktime",
] as const;

export const VIDEO_ACCEPT_ATTR = VIDEO_ACCEPTED_MIME.join(",");
// -> "video/mp4,video/webm,video/quicktime"
```

**Update to:**

```ts
export const VIDEO_ACCEPTED_MIME = [
  "video/mp4",
  "video/webm",
  "video/quicktime",
] as const;

export const VIDEO_ACCEPT_ATTR = [
  ...VIDEO_ACCEPTED_MIME,
  "video/*",
].join(",");
// -> "video/mp4,video/webm,video/quicktime,video/*"
```

## Why this is safe

- `VIDEO_ACCEPTED_MIME` is the source of truth for upload validation in `src/hooks/useWeekMedia.ts:125`.
- `VIDEO_ACCEPT_ATTR` is only consumed by the file input `accept` attribute in `src/components/myweek/SlotVideoMemory.tsx:106`.
- Widening the accept attribute to include `"video/*"` improves iOS Safari chooser behaviour without weakening validation.
- Unsupported file types will still hit the existing `VIDEO_ERROR_COPY.unsupported` message: "That format isn't supported yet."

## What is not changing

- No `capture` attribute added.
- No `MediaRecorder` added.
- No new upload formats allowed by validation.
- No storage changes.
- No database changes.
- No AI/analytics changes.
- No route or sitemap changes.
- Photo input remains `accept="image/*"`.

## Verification after applying

- `bunx tsgo --noEmit` passes.
- Confirm rendered video input `accept` attribute includes `video/*`.
- Confirm `VIDEO_ACCEPTED_MIME` still has only the three approved formats.
- Confirm no `capture` attribute added.

## Implementation blocker

This message thread is currently in plan mode. The system will not allow me to edit `src/lib/weekMedia.ts` until build mode is enabled. Please switch to build mode so I can make the one-line edit and run the verification.
