# Phase 16.6C — First Year Hub CTA Interaction Polish

## Root cause (confirmed by reading the hero)

In `src/components/firstyear/new/FYHero.tsx`, when autoplay is blocked the tap-to-play affordance renders as:

```text
<button class="absolute inset-0 z-20 ..." aria-label="Play video">
```

It is a full-bleed button at `z-20`, while the hero content (headline, the two topic links and the new "Start your First Year" CTA) sits in a container at `z-10`. So in the blocked-autoplay state the overlay covers the entire hero and swallows every click, including the Phase 16.6B start CTA. Nothing is wrong in `FYStartFirstYearCTA.tsx` or `FYFinalCTA.tsx` — the final CTA block has no overlay and is unaffected.

## Fix (smallest safe change, hero only)

Change the overlay from a full-bleed click target to a contained, non-blocking one:

1. Keep the overlay wrapper full-bleed for positioning but make it `pointer-events-none` and drop it below the content layer conceptually.
2. Make only the round play badge itself an actual `<button>` with `pointer-events-auto`, positioned in the hero's lower-right (away from the copy and CTA column), sized to its current badge dimensions.
3. Raise the content container to `z-20` so hero links and the start CTA always sit above any video layer.
4. Keep the existing `aria-label="Play video"`, existing `handleTapToPlay` logic, focus ring behaviour and transitions so keyboard users can still reach and activate it in tab order.

No changes to markup outside the overlay/z-index, no size or spacing changes to the hero copy block, so no layout shift and no visual regression beyond the play badge no longer being centred over the whole hero.

Out of scope and untouched: onboarding logic, guards, schema, RPCs, RLS, auth intent, CTA destinations, `FYStartFirstYearCTA.tsx`, `FYFinalCTA.tsx`, article content, sitemap and robots.

## Files changed

- `src/components/firstyear/new/FYHero.tsx` (only file)

## QA

Playwright on `/first-year` at desktop and mobile widths:

- autoplay allowed: no overlay, hero links and "Start your First Year" clickable
- autoplay blocked (launch with muted-autoplay disabled / force the paused state): play badge visible, hero anchor links and start CTA still clickable, badge still starts the video
- keyboard: tab reaches hero links, start CTA and the play badge, with visible focus
- final CTA block still works
- route checks: signed-out CTA goes to `/auth?...return_to=%2Fsetup%2Ffirst-year`; signed-in no-journey goes to `/setup/first-year`; signed-in first_year goes to `/my-first-year`
- console and page errors captured

Commands: `npx tsgo --noEmit -p tsconfig.json`, `npx vitest run`, `npm run build`; report sitemap diff and dist output.
