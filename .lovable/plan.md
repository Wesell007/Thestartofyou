# Today Background Colour Polish

## Goal
Make the `/my-first-year/today` page background feel warmer, softer and closer to the Nano Banana reference — a gentle warm parchment/cream app surface behind the content.

## Scope
- **Only** the page background / shell styling for `src/pages/firstyear/FirstYearToday.tsx`.
- **Not** layout, spacing, cards, quick-add tiles, Today so far, active card, timeline, sheets, forms, copy, logic, schema, validation, RLS, routes, sitemap, Cindy, AI, reminders, notifications, Memories, or First Year home.

## Current state
The page shell is:

```tsx
<div
  className="min-h-screen bg-parchment-grain page-vignette"
  style={{ backgroundColor: "hsl(var(--stage-firstyear) / 0.35)" }}
>
```

This layers a cool blue-grey tint (`--stage-firstyear`) over the parchment grain. The reference shows a solid, warm cream/parchment app surface with no grain or vignette.

## Proposed change
1. **Add a warm First Year background token** in `src/index.css` near the existing First Year tokens, e.g.:
   `--stage-firstyear-today-bg: 38 30% 95%;`
2. **Add a utility class** in `src/index.css` `@layer utilities`:
   `.bg-fy-today { background-color: hsl(var(--stage-firstyear-today-bg)); }`
3. **Update the page shell** in `FirstYearToday.tsx` to use the new class, removing the cool blue-grey inline style and the grain/vignette classes:
   ```tsx
   <div className="min-h-screen bg-fy-today">
   ```

This changes only the shell background colour, leaving every card, tile, and component untouched.

## Verification
- Check `/my-first-year/today` at 390px and 1440px.
- Confirm background matches the warm reference feel.
- Confirm cards and existing UI remain unchanged.
- Confirm no horizontal overflow.
- Confirm no console errors.
- Confirm no hardcoded hex colours in touched files.
- Run `npx tsgo --noEmit -p tsconfig.json`.
- Run `npm run build`.
- Report files changed, token/style changed, screenshots, overflow, console, colour check, typecheck, and build results.

## Stop after report
No further phases.