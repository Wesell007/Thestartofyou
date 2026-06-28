## Toddler hero — Black toddler video, quality gate PASSED

### Verification result
Generated `/tmp/toddler-hero-black.mp4` (1920×1088, 24fps, 5.04s) and ran the same QA pipeline as the previous approved clip:
- 10 stills @ 2fps + 4×4 motion contact sheet via ffmpeg
- **Natural face**, consistent features across all 16 contact-sheet frames
- **Skin tone** rendered naturally and respectfully in warm golden window daylight
- **Hands** clean and correctly articulated (toddler's and parent's)
- **Motion** slow, unhurried, realistic block-stacking
- **Lighting** warm, soft, editorial — not dark, not harsh
- **Crop safety**: subject weighted right-of-center, full head/hands/feet in frame, parent's hand softly framed left — identical framing weighting to the previous clip, so existing `object-[72%/68%/62%]` settings still protect the subject across desktop/iPad/mobile

**Verdict: PASS.** Ready to swap.

### Single action on approval
Overwrite `src/assets/toddler-hero-video.mp4.asset.json` with the new CDN pointer:

```bash
lovable-assets create --file /tmp/toddler-hero-black.mp4 --filename toddler-hero-video.mp4 > src/assets/toddler-hero-video.mp4.asset.json
```

That's the only file write. The import in `ToddlerHero.tsx` resolves through the same pointer path, so the new video activates immediately with zero code changes.

### Not changing
- `ToddlerHero.tsx` — layout, gradients, copy, CTAs, object-position values all untouched (framing matches previous clip)
- `firstyear-stage-9-12.jpg` poster fallback — unchanged
- Any other Toddler component, `pages/Toddler.tsx`, `index.css`, `App.tsx`, Navbar, Footer
- TTC, Pregnancy, First Year, IVF, legacy Postpartum, Journal
- No toddler topic / month / article pages, no Family or Parent hub, no nav or routing changes

### Return after build
A. PASS — verified via stills + contact sheet
B. Confirmation `toddler-hero-video.mp4.asset.json` was replaced
C. Confirmation hero layout and premium uplift unchanged
D. Confirmation desktop / iPad / mobile crop checks still safe (framing matches previous approved clip)
E. Confirmation no out-of-scope files changed
