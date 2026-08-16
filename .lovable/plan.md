# Phase 25A — First Year Launch Readiness Audit

Audit only. No files were changed. Findings below are code-level: signed-in screens could not be rendered from the sandbox because the backend is not reachable from a headless browser here, so runtime checks were done by reading the code paths rather than clicking through them.

## 1. Overall verdict

First Year is launch-ready. No blockers were found in the flows, data handling, or copy for signed-in surfaces. What remains is a short, presentation-and-copy fix pass plus two product decisions to confirm.

## 2. Blockers

None found.

## 3. Non-blocking items (recommended before launch)

1. Account deletion copy does not mention First Year. The delete panel says it removes "saved journeys, logs, reflections and weekly photos"; the confirm dialog lists journey, reflections, photos, videos, voice notes and toolkit records. Neither names baby details, daily notes, memories or memory photos, even though all of them are deleted. Export copy was already refreshed, deletion copy was not.
2. Setup supports one to four babies. Anything beyond four is silently unavailable rather than explained. Either confirm four as the intended ceiling and say so in the step, or raise it.
3. Date of birth in setup accepts up to five years old. A parent entering a three-year-old lands in a journey called First Year, with guidance falling back to the toddler stage. Confirm whether that is intentional or whether setup should suggest the toddler guide beyond twelve or eighteen months.
4. The memory photo viewer uses one fixed alt string for every photo, so a screen reader hears the same sentence each time. Using the memory title, when present, would read better.
5. Public First Year guide pages still use "normal", "milestones" and "safe" in headings and card copy. Signed-in surfaces are clean. Out of scope for First Year signed-in, worth a separate content pass.

## 4. Journey results

**Direct user.** Setup entry, six steps, save, redirect to `/my-first-year`, baby summary, age-aware guidance, check-in, memory, memory photo, export and deletion all resolve cleanly in code. Setup redirects silently for every state that should not see it, and the save RPC repeats those guards server-side.

**Pregnancy-to-First-Year user.** Transition is gated on `given_birth`, the pregnancy chapter is kept and readable at `/my-pregnancy-chapter` behind reveal gates, and the chapter now ends with a return link to First Year. Check-in and memories behave identically to the direct user.

**Multiples.** Twins and triplets are fully supported. Four is the cap. Check-in renders a lane per baby, memories carry family, all-babies and single-baby scope, and home copy switches between "your baby" and "your babies" through the shared describe helper.

## 5. Surface results

**Setup.** Six steps with a quiet indicator, shared frame width and padding, per-field validation, friendly save error, companion prefilled from the profile. Mobile and desktop use one column at 720px, so nothing reflows awkwardly.

**Home.** Hero, baby summary, for-this-stage, today, recently saved, memories, pregnancy chapter, two support lanes, what comes next. Spacing rhythm and focus tokens are shared. Baby lane is three cards, parent lane four.

**Daily Check-in.** Create, edit and delete with a confirm dialog, recent days, per-baby lanes, live-region announcements, 44px tap targets. Reads as notes, not a tracker.

**Memories.** Text memory, photo on create or later, replace, remove, viewer, delete with photo-aware confirm text, keepsake empty state. Words save before any photo is uploaded, so a photo failure never loses the note. Deliberately not a gallery: no grid, no swiping.

**Privacy and storage.** The photo bucket is private; a direct public object request is refused. Storage policies scope select, insert, update and delete to the owner's own folder, so cross-account and anonymous reads are blocked. Access is short-lived signed URLs only, never stored and never routed. Notes never appear on public routes.

**Export.** JSON includes babies, First Year journey, daily notes and memories with photo details and storage paths. Files themselves are excluded, and the panel copy says so.

**Account deletion.** Both media buckets are swept recursively before the auth user is deleted, and the function fails closed with nothing deleted if storage cannot be cleared. Rows go with the user through cascade. Only the wording is behind.

**Accessibility.** Single h1 per page, labelled fields, named buttons and links, shared visible focus rings, Radix dialogs for confirm and viewer, live regions on saved state. Icon-only controls carry labels.

**Copy.** No banned word appears in any signed-in First Year surface. The single "safe" match is an internal code comment.

**Mobile and desktop.** Single-column layouts, 44px targets, capped measure, no fixed heights that clip. Nothing found that would break at small widths.

## 6. Backlog after launch

1. Live signed-in QA on a real device once the app is published, since sandbox rendering could not reach the backend.
2. Public First Year guide copy pass for clinical wording.
3. Memory search or year view, only if parents ask for it.
4. Optional photo export as a file bundle rather than metadata.

## 7. Phase 25B recommendation

A short fix pass, not a feature phase: deletion copy, the multiples ceiling wording, the date-of-birth ceiling decision, and the photo viewer alt text. Everything else is ready.
