# Truthful product-preview homepage section

Replace the current `DashboardGlimpse` (which depicts a generic "Your Dashboard" with invented progress bars and metrics) with a calm, editorial, **static product-preview section** that visually mirrors the actual product surfaces: `/my-week`, `/my-journey`, and `/my-week/:week` (Kept Chapter).

## Files

**Rewrite (rename for honesty):**
- `src/components/home/DashboardGlimpse.tsx` → **delete**
- New: `src/components/home/JourneyPreviewSection.tsx`

**Update import:**
- `src/pages/Index.tsx` — replace `DashboardGlimpse` with `JourneyPreviewSection`. Keep section order unchanged (sits between `JourneyBrandedSection` and `LifecycleEcosystemSection`).

No nav, hero, CTA, route, or analytics changes.

## Section copy (final)

- **Eyebrow:** `Inside your journey`
- **Heading:** `Your week, your journey, and the moments you return to`
- **Body:** `Follow your pregnancy week by week, keep reflections and photos, and return to the chapters that matter as your journey grows.`
- **Optional quiet section-level link** beneath the composition: `See how the journey works` → `/product` (single, restrained link, matches existing tertiary link style). Final call: include it because the homepage rhythm already accepts a quiet trailing link in adjacent sections (`DashboardPreviewSection` precedent).

## Visual composition

Static, editorial — no fake widgets, no progress bars, no SaaS chrome.

### Desktop (md+)

12-col grid, max-w ~5xl, centred:
- **Left col-span-7 (dominant):** My Week preview
- **Right col-span-5 (stacked):** My Journey preview, then Kept Chapter preview

```text
┌─────────────────────────────┬──────────────────┐
│                             │  My Journey      │
│        My Week              │  (secondary)     │
│        (primary)            ├──────────────────┤
│                             │  Kept chapter    │
│                             │  (tertiary)      │
└─────────────────────────────┴──────────────────┘
```

### Mobile

Stacked, in order: My Week → My Journey → Kept Chapter. Generous spacing, no overflow.

## What each preview shows (truthful crops)

All three use the existing system tokens: `bg-card`, `keepsake-surface`, `hsl(var(--stage-pregnancy-accent))` accents, `MyWeekBabyImage`, parchment background, soft borders, restrained type. Each card has a small uppercase eyebrow label inside, mirroring the real surfaces.

### 1. My Week — primary
Mirrors `MyWeekChapter` + a hint of the ritual rail.
- Eyebrow inside card: `Current week` · `Week 18`
- `Good afternoon, Anna` greeting (serif), trimester label (`Second trimester`), due-date meta (`14 October · 22 weeks to go`)
- Chapter title: pulled from `getWeekIdentity(18).chapterTitle`
- Oval baby image (`MyWeekBabyImage week={18}`) in the existing radial-gradient halo
- One faithful guidance block: short `lead` paragraph from `getMyWeekContent(18)`
- A single muted ritual-rail strip beneath showing two slot labels only — `One focus` · `Reflection` — as small uppercase rows with hairline dividers (no inputs, no fake content)
- Tiny caption underneath card: `Where you are right now`

### 2. My Journey — secondary
Mirrors `JourneyHeader` + `CurrentChapterCard` + 2 `KeptWeekRow` items.
- Eyebrow inside card: `Your journey`
- Compact journey header line (Week 18 · Started 12 June)
- Miniature current-chapter row: small oval baby image + `Current chapter · Week 18` + chapter title
- Group label `Second trimester · Steadier weeks, finding rhythm`
- Two kept-week rows (Week 14, Week 16): tiny baby-image circle + `Week N` + chapter title + truncated reflection italic line
- Tiny caption underneath card: `The weeks you keep, gathered over time`

### 3. Kept Chapter — tertiary
Mirrors the `KeptChapter` page header + reflection block.
- Eyebrow inside card: `Kept chapter`
- `Week 12` heading (serif, large within the small card)
- Chapter title + `First trimester · [theme]` italic meta
- Small oval baby image
- A short italic reflection excerpt in the tinted reflection surface (`tint(0.16)` background, accent border) — using a faithful sample sentence in keeping with brand voice (e.g. *"The week the news became real. Quieter than I expected, and steadier."*) followed by `Kept · 24 March` meta
- Tiny caption underneath card: `A week you can return to later`

> Sample reflection text is illustrative editorial copy — clearly framed as a preview, not user data. This avoids needing live screenshot assets while remaining visually grounded in the real Kept Chapter surface.

## Visual rules followed

- Parchment section background (`bg-parchment` or `bg-background` to match adjacent sections — match the section it replaces: `bg-background`)
- Editorial rule + uppercase eyebrow header, matching pattern of `DashboardGlimpse`/`ValueProofSection`
- All three cards use `rounded-[20px]`/`rounded-[24px]`, `keepsake-surface`, hairline pregnancy-accent borders
- Pregnancy stage accent only (no other stage colours — homepage is stage-neutral, but these previews depict the pregnancy product surface specifically, which is consistent with the rest of the homepage hero/journey framing)
- No progress bars, no metric grids, no browser chrome, no app-nav row, no avatar bubble
- Type scale restrained — previews are smaller-scale crops, not full reproductions

## Acceptance check

1. First-time visitor reads: weekly product · saved/cumulative · returnable
2. Visuals match real `/my-week`, `/my-journey`, `/my-week/:week` patterns (same baby image system, same accent, same keepsake surface, same eyebrow conventions)
3. Reads as one calm editorial composition, not a dashboard
4. Section copy makes no "dashboard" claim
5. No new routes, IA, analytics, or signed-in work

## Notes for visual review after build

- Confirm right-column stack heights balance the dominant My Week card on `lg` (may need `min-h` tuning)
- Confirm mobile stacking spacing matches `JourneyBrandedSection` rhythm
- Confirm baby image halo isn't overpowering at small sizes inside Journey/Kept cards
