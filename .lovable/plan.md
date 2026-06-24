
# /first-year — hero media correction (video)

Surgical pass on the hero only. Nothing from `FYWhatThisCovers` downward changes.

## 1. Generate the hero video

Use `videogen--generate_video` to create one premium 10s loopable clip.

- target_path: `src/assets/firstyear-hero-video.mp4`
- resolution: `1080p`, aspect_ratio: `16:9`, duration: `10`, camera_fixed: `true`
- Prompt:
  > A parent and baby in a calm home moment, soft daylight interior. Quiet closeness on a bed, chair, or soft blanket, with small nearby signs of care such as tea, a muslin cloth, a notebook, or a feeding cloth. Gentle natural light across neutral cream and sage textures. Subtle documentary stillness. Premium, calm, editorial. No faces in focus, no text, no logos, no fast cuts, no walking, no advertising energy.

Then upload via the Lovable Assets CLI so the binary is CDN-hosted:

```bash
lovable-assets create --file src/assets/firstyear-hero-video.mp4 \
  --filename firstyear-hero-video.mp4 \
  > src/assets/firstyear-hero-video.mp4.asset.json
rm src/assets/firstyear-hero-video.mp4
```

The committed pointer (`firstyear-hero-video.mp4.asset.json`) mirrors the shape of `home-hero-video-new.mp4.asset.json`.

## 2. `FYHero.tsx` — swap still → video

Mirror the proven pattern in `src/components/home/NewHeroSection.tsx`, trimmed.

- Remove `import firstyearScene from "@/assets/firstyear-scene.jpg"`.
- Add `import firstyearHeroVideo from "@/assets/firstyear-hero-video.mp4.asset.json"`.
- Replace the `<img>` with:
  ```tsx
  <video
    ref={videoRef}
    autoPlay muted loop playsInline preload="auto"
    onError={() => setVideoState("paused")}
    className="absolute inset-0 w-full h-full object-cover object-center"
  >
    <source src={firstyearHeroVideo.url} type="video/mp4" />
  </video>
  ```
- Port the trimmed `useEffect` from `NewHeroSection` that listens for `canplay` / `playing`, attempts `video.play()`, and flips `videoState` between `"loading" | "playing" | "paused"`. No poster image.
- If `videoState === "paused"`, render a small parchment play affordance (same button styling pattern as `NewHeroSection`, centered, `bg-parchment/60 backdrop-blur-sm rounded-full p-4`). No full still-image takeover.

## 3. Overlay rebalance — let the footage live

Inside the hero, restructure the absolute-fill veil layers:

- Delete the flat `bg-parchment/15` base wash.
- Desktop veil: `hidden md:block bg-gradient-to-r from-parchment/80 via-parchment/40 to-parchment/0`.
- Mobile veil: `md:hidden bg-gradient-to-b from-parchment/65 via-parchment/35 to-parchment/5`.
- New soft bottom vignette: `absolute inset-x-0 bottom-0 h-40 pointer-events-none bg-gradient-to-t from-parchment/55 via-parchment/15 to-transparent`.
- Keep the dual-tone first-year / recovery wash at the bottom, lowered to `0.35` / `0.3` opacity (reads as temperature, not fog).
- No darkening filter, no `mix-blend-multiply`, no heavy blur added.

## 4. Copy + CTAs (unchanged)

- Eyebrow: "First year"
- Headline: *Their first year, and **your postpartum recovery**.* (italic in `--stage-recovery-deep`)
- Support: *Your baby is changing quickly. You're healing after birth. Both belong here.*
- CTAs unchanged, equal weight: "Baby's first year" → `#baby-topics` (`--stage-firstyear-deep`); "Your postpartum recovery" → `#recovery-topics` (`--stage-recovery-deep`); `min-w-[220px]`.

## 5. Files touched

- `src/components/firstyear/new/FYHero.tsx` — video swap, play-fallback handler, overlay rebalance.
- `src/assets/firstyear-hero-video.mp4.asset.json` — new asset pointer (CLI output, not hand-written).

Untouched: `FYWhatThisCovers`, `FYTopicClusters`, `FYStickyTrackNav`, `FYAISupport`, everything below. No TTC / IVF / Pregnancy / Postpartum files. No routes. Step 3 not started.

## Return after build
A. Changed files · B. Confirm video, not still · C. How video was sourced (`videogen--generate_video` + `lovable-assets`) · D. Overlay tuning · E. Confirm rest of hub untouched.
