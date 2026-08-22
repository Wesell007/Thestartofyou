# Phase 27G — Pregnancy Media Capture and Film Polish

Presentation and UX polish only across the weekly media slots, the photo journal preview and the pregnancy film. No storage, upload, limits, schema, RLS, AI, auth or route changes.

## What discovery already confirmed

Read this turn: `SlotPhotoMemory.tsx`, `SlotVideoMemory.tsx`, `SlotVoiceMemory.tsx`, `SectionKeepThisWeek.tsx`, `PhotoJournal.tsx`, `MediaLightbox.tsx`, `MemoryFilmEntry.tsx`, `MemoryFilmBuilder.tsx`, `pregnancyStyles.ts`.

- The three weekly slots exist with full upload, replace, remove, caption and record flows, each with loading, empty, uploading, loaded and error states. Photo and video already have corner-tick or held-frame empty states; voice has an idle/record/preview/saved sequence.
- `SectionKeepThisWeek` already groups the four slots under one heading with hairline dividers, and already wraps photo and video in `TapedFrame`. Voice sits in a `pregnancy-paper` card, reflection sits bare, so the group reads as four different surface treatments rather than one set.
- Each slot styles itself with inline `style={{ ... }}` raw HSL strings and one-off radii instead of the shared constants in `pregnancyStyles.ts` (`PG_PAPER_CARD`, `PG_PHOTO_FRAME`, `PG_EYEBROW`, `PG_HELPER`, `PG_FOCUS_RING`, `PG_SOFT_PILL`). Several small action pills are under 44px tall (`py-1` / `py-1.5` chips for Replace, Remove, Caption, Discard, Record again).
- Overlay chips on loaded photo/video use `bg-foreground/40` plus `text-background` and `text-white` with literal `hsl(222 14% 8% / 0.65)` values; these are not tokens.
- `PhotoJournal` is a square grid with hard-edged tiles and dark gradient captions, not a taped keepsake stack. Its empty state is reasonable but reads as a utility frame.
- `MediaLightbox` uses the Radix dialog at `z-50`, traps focus, closes on Esc and cycles with arrows. Bottom nav sits below it. Likely fine; verify only.
- The verification checklist items (console errors, overflow, nav and consent banner overlap) have not been observed yet and will be checked live before any related fix.

## What will change

### Weekly slots (photo, video, voice)
- Move each slot onto the shared style constants: `PG_PAPER_CARD` surfaces, `PG_EYEBROW` labels, `PG_HELPER` hints, `PG_PHOTO_FRAME` for the print treatment, `PG_FOCUS_RING` on every control.
- Replace overlay chips and literal HSL/`text-white` values with pregnancy tokens; keep contrast readable over media by using a token-based scrim.
- Raise every action control (add, replace, remove, caption, record, discard, play) to a minimum 44px target while keeping the quiet pill look.
- Soften empty-state copy into the keepsake register: "One image to keep this week.", "A little clip to keep.", "Say it out loud.", "Private to you." No banned terms, British English, no dashes.
- Keep every handler, state machine, limit and Supabase call exactly as-is; only markup, classes and visible strings change.

### Media group rhythm on `/my-week`
- Give the photo, video and voice cards one consistent surface, padding and action row placement inside `SectionKeepThisWeek`, with the existing hairline dividers kept as the journal-inspired separator. No reordering, no logic change.

### Photo journal preview on `/my-journey`
- Restyle tiles as small taped prints on a warm paper shelf: paper card container, slight alternating rotation on the frames, caption in the quiet keepsake style rather than a dark gradient bar. Video and voice tiles keep their existing badges, restyled to tokens.
- Warm the empty state copy and keep the existing "Add a memory" link and destination.

### Pregnancy film card
- Restyle `MemoryFilmEntry` onto a watercolour paper surface with a quiet film mark, calm private copy, and a clear low-key state when there is not enough kept media yet. Film generation, selection and playback logic untouched.

### Media lightbox
- Verify layering above the bottom nav, Esc close, focus behaviour and mobile overflow. Fix only what fails; otherwise leave as is.

## Assets

No new assets planned. Existing `PregnancyDecor` sprigs, washes and `TapedFrame` cover the treatment. If a gap appears during implementation it will be reported, not silently generated.

## Testing and verification

- New or extended component tests: media empty states render, action labels present, film empty state renders, photo journal empty state renders, copy guardrail assertions on new strings.
- Playwright pass at 390px and 1440px on `/my-week` and `/my-journey`, with smoke checks on `/pregnancy-toolkit`, `/journal-start`, `/journal`, one public pregnancy route and one signed-in First Year route.
- `npx tsgo --noEmit -p tsconfig.json`, targeted vitest, `npx vitest run`, `npm run build`.

Report follows the 26-point format requested. Stop after the report.
