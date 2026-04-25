# Final Homepage/Navigation Refinement Pass

## Summary
Remove About from top navigation and update hero copy to the final agreed language.

## Changes

### 1. Navbar.tsx — Remove About from navigation
- Remove `{ label: "About", href: "/about" }` from the `navLinks` array
- Affects both desktop nav (line 60-72) and mobile drawer (line 117-128)
- About remains accessible via footer

### 2. NewHeroSection.tsx — Update hero copy

**Headline change (lines 121-124):**
- From: "A calmer way through pregnancy"
- To: "Week by week. Stage by stage. Yours to keep."
- Layout: Add `<br />` after first sentence for rhythmic pacing:
  ```
  Week by week. Stage by stage.<br />Yours to keep.
  ```

**Supporting line change (lines 127-128):**
- From: "Week-by-week guidance, made for how this really feels."
- To: "Start with your due date. Weekly guidance that changes with your pregnancy and stays with you as you go."
- Layout: Expand `max-w-[25rem]` to `max-w-[28rem]` to accommodate longer text without excessive wrapping

## Unchanged
- Hero video (remains `home-hero-video-new.mp4`)
- Nav structure otherwise (6 items remain: Pregnancy, Trying to conceive, IVF, Postpartum, First year, Journal)
- CTA destination (`/due-date-calculator`)
- Sign-in line text and destination
- All visual composition, gradients, spacing

## Final Navigation State

**Desktop nav (6 items):**
```
[Pregnancy] [Trying to conceive] [IVF] [Postpartum] [First year] [Journal]
```

**Mobile drawer (6 items):**
Same labels, stacked vertically.

**Footer:** About remains (not part of this change).

## Files Changed
- `src/components/layout/Navbar.tsx` — 1 line removed from navLinks array
- `src/components/home/NewHeroSection.tsx` — headline text, supporting line text, one `<br />` added, `max-w` adjusted

## Manual Review Notes
- Verify 6-item nav spacing on 1024–1200px range (was previously 7 items)
- Check hero readability: new headline breaks cleanly across mobile sizes
- Confirm supporting line doesn't feel cramped at `max-w-[28rem]`