# Memory settings UI prototype

Phase 29I. **Front-end prototype only.** No memory exists. Nothing on the prototype is saved, read, sent or remembered.

## Where it lives

`/prototype/memory-settings`, rendered by `src/pages/MemorySettingsPrototype.tsx` with supporting components in `src/components/memory-prototype/`.

The route is:

- not linked from any navigation surface
- mounted above `/:journey/:stage` and above the catch-all in `src/App.tsx`
- `noindex` through `SeoHead`
- absent from the sitemap allowlists in `scripts/generate-sitemap.ts`
- labelled "Prototype only" in the header, the page introduction and every confirmation

## Guards

1. **Companion suppressed.** `/prototype` is in `COMPANION_HIDDEN_PREFIXES` (`src/lib/companion/companionSurface.ts`), so the floating launcher and the panel never appear here. The prototype can never imply a live memory connection, and no AI request can originate from the page.
2. **No auth or Supabase chrome.** `MyWeekHeader` runs `useLifecycle`, reads the saved journey and calls Supabase sign-out, so it is not reused. `PrototypeChrome.tsx` provides a static header and footer with no auth, journey or user data.
3. **No persistence of any kind.** Local React state only: no Supabase read or write, no `fetch`, no `localStorage` or `sessionStorage`.

## Sections

1. Header and explanation — "Memory is off for now".
2. Memory status card — memory off, three levels not enabled, journal content off, sensitive memory not available.
3. Permission levels — the five levels from `memory-design.md`. Four carry a prototype switch; sensitive memory has no switch and is marked "Not available".
4. Remembered items preview — three synthetic examples only: "Prefers shorter companion answers", "Likes practical next steps", "Prefers gentle reminders". Edit and review announce that they are not built; delete removes the row from component state.
5. Pause and delete controls — pause and resume, delete one item, delete all, each through the shared `ConfirmDialog`. Copy states that clearing everything is separate from switching memory off.
6. Journal boundary card — journal entries, reflections, photos, videos and voice notes are not used for companion memory. No toggle.
7. Sensitive information boundary — health, fertility and safety-sensitive information is not available for memory in this version. No toggle, no promise that it will change.
8. "What does my companion remember?" — a viewer across the memory-off, empty and example-items states.

## Data

Only the synthetic values in `src/components/memory-prototype/memoryPrototypeData.ts`. No pregnancy week, due dates, baby names, symptoms, fertility treatment, medication, loss, journal text, emotional disclosures, child details or medical information appear anywhere in the prototype.

## Tests

`src/pages/MemorySettingsPrototype.test.tsx` holds eleven guards: default off, sensitive memory unavailable and switchless, journal content not used and without a toggle, only the approved synthetic items, pause and delete confined to local state, no Supabase or `fetch` or storage access, `noindex` present, companion suppressed on the route, and the route absent from navigation and the sitemap generator.

## Outstanding

Consent copy sign-off and a recorded copy version are still to come; they carry into the memory gate in `release-gate.md` for Phase 29J.
