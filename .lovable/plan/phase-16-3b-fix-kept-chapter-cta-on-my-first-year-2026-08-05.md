# Phase 16.3B fix — kept-chapter CTA on /my-first-year

## What the audit found

- The card's CTA links to `/my-journey`. `src/pages/MyJourney.tsx` (line 136) redirects users whose lifecycle pointer is `first_year` to `/my-first-year`, so the CTA is a dead loop.
- The only other pregnancy memory surface is the kept chapter route `/my-week/:week` (`src/pages/KeptChapter.tsx`). It loads through `getActivePregnancyJourney`, which returns `null` whenever the lifecycle pointer is not `pregnancy` (`src/lib/savedJourney.ts` lines 175-180). With no journey the page redirects to `/due-date-calculator`.

So there is currently **no First Year-compatible route** that opens kept pregnancy memories. The preferred fix is not available, so the fallback applies.

## The fix

Fallback fix, presentation only, one file: `src/components/firstyear/journey/PregnancyChapterKeptCard.tsx`.

- Remove the `Link` to `/my-journey` and its `react-router-dom` import.
- Keep the card as reassurance copy only, with the same layout, tokens and spacing. No dead CTA, no placeholder button, no disabled control.
- Keep both copy variants (kept chapter present vs absent) unchanged; only the trailing link block goes.

No changes to schema, migrations, RPCs, RLS, AI, tracking, Postpartum, First Year memories, companion memory, public pages, routes or the sitemap.

## Follow-up logged (not built here)

A First Year-compatible entry point into kept pregnancy memories (either a read-only memories browser, or relaxing the kept-chapter read so archived pregnancy journeys still resolve) is a later phase. It needs data-access work beyond this fix.

## Verification

- Re-check with a disposable First Year account driven through Playwright: `/my-first-year` renders, the kept card shows no link, `/my-journey` still bounces First Year users to `/my-first-year`, pregnancy `/my-journey` behaviour unchanged, zero console and page errors. Clean up the throwaway account afterwards.
- `npx tsgo --noEmit -p tsconfig.json`
- `npx vitest run src/lib/firstYearCopy.test.ts`
- `npx vitest run`
- No build rerun: the change touches one presentational component, no routing or build-relevant files.

Stop after reporting. No Phase 16.4 work.
