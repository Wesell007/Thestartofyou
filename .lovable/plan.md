# Phase 19B - Signed-in visual QA (Memories page)

No code changes planned. This is a verification-only pass, run once a signed-in preview session is available.

## Blocker

The sandbox reports the preview as signed out, so `/my-first-year/memories` redirects to `/auth` before rendering. Sign in to the preview with a test account (not your personal one) and send any message; the session injects on the next turn.

## What I will check

Signed in, at 390px and 1440px:

1. "Memories" title fully clears the fixed header and is not tucked under the logo
2. Save-a-moment form renders correctly (fields, scope selector, buttons)
3. "What you have kept" section: empty state or saved list renders correctly
4. Remove-memory confirmation modal renders correctly (390px), if a removable memory exists
5. No horizontal overflow at either width
6. No console errors, page errors, or failed app network requests

## Screenshots

- 390px Memories page
- 1440px Memories page
- 390px remove-memory modal (if a memory exists)

## Report back

Browser auth status, account used, 390px and 1440px title spacing results, form result, list/empty-state result, modal result, overflow result, console/page/network result, whether any code changes were needed, remaining blockers, and whether Phase 19B can be closed.

If QA exposes a real visual defect, I will report it and propose a fix rather than editing straight away.
