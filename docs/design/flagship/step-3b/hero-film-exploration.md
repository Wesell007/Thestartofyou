# Homepage brand film: Higgsfield draft exploration (Step 3B)

**All clips here are AI-GENERATED BRAND-FILM CONCEPTS / DESIGN PROTOTYPES. They are not production footage, not a TSOY shoot, and the people and journals in them are not real.** Their job is to settle shot structure, cinematography, movement, lighting, pacing, composition and crop behind the HTML hero, and to brief a future real shoot.

Date: 24 October 2026. Workspace: the founder's private Higgsfield workspace (Plus plan). Shot plan written before generation: `hero-film-shot-plan.md`.

## 1. Tools and models inspected

Tools used: `models_explore` (list video; search "seedance"; search "kling"; recommend for the brief), `generate_video` with `get_cost: true` (seven preflights, nothing submitted), `media_upload` plus curl PUT plus `media_confirm` (one new reference), `generate_video_batch` (three jobs), `jobs_wait`, `balance`. No Marketing Studio, no presets, no Soul, no upscale.

Video catalogue on the day (relevant entries): Seedance 2.5 (`seedance_2_5`: t2v, omni_reference, video_edit, video_extension; 4 to 30 s; 480p/720p/1080p; `draft` 480p mode), Seedance 2.0 and 2.0 Mini, Seedance 1.5 Pro, Kling 4.0 (`kling4_0`: text/image/reference-to-video, 3 to 30 s), Kling 3.0 Omni (`kling_o3_image_reference`: up to seven image references, multi-shot with ordered prompts and durations, silent option), Kling 3.0 Omni Frames, Kling 3.0, Kling 3.0 Turbo, Kling 2.6, Cinema Studio 3.0 and Video v2, FLUX 3 Video, MiniMax H3 and H3 Max, Hailuo, Grok Video 1.5, Wan 2.6, Gemini Omni Flash. The tool's own recommendation for the brief ranked Kling 3.0, Grok Video 1.5 and Seedance 2.5.

## 2. Cost preflights (16:9, silent)

| Model and setting | Credits |
|---|---|
| Seedance 2.5, t2v, draft 480p, 12 s | 36 |
| Seedance 2.5, omni_reference, draft 480p, 10 s | 30 |
| Seedance 2.5, t2v, 1080p final, 12 s | 192 |
| Kling 3.0 Omni, std, multi-shot, 1 image reference, 12 s | 12 |
| Kling 3.0 Omni, std, multi-shot, 1 image reference, 10 s | 10 |
| Kling 4.0, reference-to-video, 720p, 10 s | 5 |

## 3. Model decision

Seedance 2.5 was the expected first candidate and was inspected first. A single 10 second Seedance draft (30 credits) would have consumed nearly the whole remaining authorised exploration allowance (35 credits) and three drafts (90) would have exceeded it, which the brief says to report rather than spend. Kling 3.0 Omni provides exactly what the brief needs for a first pass: explicit ordered shots with per-shot durations (coherent sequential storytelling), restrained motion, image-reference adherence for palette and material, silent output, 1280 by 720, at 10 credits per clip. It was therefore used for all three concepts (30 credits, inside the allowance). Seedance 2.5 remains the recommended model for a finalised clip of the chosen direction once the founder authorises the spend. No flashy VFX model was considered.

## 4. Concepts generated

| Concept | Job ID | Model as served | Duration | Frame | File (outside Git) | Size |
|---|---|---|---|---|---|---|
| A field / human / lifecycle atmosphere | `742ce922-e4cf-4d54-ad95-48c405fc550e` | kling_o3_image_reference, std, silent, 3 shots (4+3+3 s) | 10.04 s | 1280 × 720 | `higgsfield-explorations/hero-film/concept-A-field-lifecycle-kling-o3.mp4` | 10.8 MB |
| B home / journal / intimate detail | `781d8895-18fe-49e6-8aa4-b7bd4ee4cdc7` | same | 10.04 s | 1280 × 720 | `concept-B-home-journal-kling-o3.mp4` | 5.9 MB |
| C mixed quiet-life progression | `9cf23c7d-24e7-4e6b-9754-0d2547dbadd0` | same | 10.04 s | 1280 × 720 | `concept-C-progression-kling-o3.mp4` | 4.8 MB |

References passed: A used the old homepage poster (field, golden light) as atmosphere only; B and C used the real shoot photograph of someone writing in the journal (palette and material), with legible print forbidden in the prompt. Frame strips (eight frames each) are in `review/hero-film-concept-*-frames.jpg`. Copies of the three MP4s also sit in the design folder at `flagship-prototypes/3b/media/` so the homepage prototype can switch between them; none are committed.

Credits: expected 30, actual 30 (balance 1,186.88 before, 1,156.88 after). Static exploration credits spent this round: 0.

## 5. Critique

Criteria from the brief: brand fit, lifecycle inclusivity, tone, realism, suitability behind headline text, desktop crop, mobile crop, looping, distracting movement, fake-product risk, AI artefacts, sensitivity, performance.

**A. Field / human / lifecycle.** Shot 1 is the old hero reborn: a pregnant woman cradling her bump in golden meadow light, subject right of centre, slow lateral move. The reference pulled the model to pregnancy although the prompt asked for a woman in a linen dress, so the opening is Pregnancy-led, exactly the limitation the founder named. Shot 2 (adult and child hand in hand at hip height, backlit grass) is the best single shot of the round: human, observational, two chapters in one frame, no faces. Shot 3 (wide meadow, figures distant, low sun) is the quietest and the best bed for copy, but the sun flare is a bright blob top right and the composition does not match shot 1, so the loop point cuts. Realism high; skin and fabric good; no text or product. Desktop crop works with left copy; mobile centre-right crop keeps the subject. Movement is calm. Performance: 10.8 MB at 720p is the heaviest draft (a production encode at 1080p/720p WebM would be far smaller).

**B. Home / journal / intimate detail.** Shot 1 (closed cream journal, two mugs, steam, window light) is beautifully quiet and the only shot in the round that is ideal behind a headline. Shot 2 opens the book; shot 3 shows an open spread with dense printed text and a photograph, then a resting hand. The print is pseudo-legible and the spread does not resemble the real journal, so fake-product risk is real if anyone reads it as the product; the plain cream cover avoids reproducing cover artwork, which is good. No lifecycle, no people beyond hands; emotionally intimate but narrow. Mobile crop of shots 2 and 3 is busy behind text. Loop fair (table to table).

**C. Mixed progression.** Shot 1 (dawn bedroom, blue cast) is off-palette and cold; shot 2 (pregnant at the kitchen window, journal and phone on the counter) is warm, real and well composed; shot 3 (parent with newborn asleep, journal on the sofa arm) is tender but renders an AI baby face, and the toddler hand did not appear. Three hard cuts between different colour temperatures in 10 seconds read as a montage and are distracting behind copy. Sensitivity: the newborn is fine in tone but a generated infant should not stand in for a real one on a trust-first health product.

## 6. Recommended direction

**A, revised.** Keep the meadow, the light and the hand-holding shot. Rewrite the opening as the wide meadow with the figures distant (shot 3 material) so the master film is not bump-first, then the hands, then a return to grass for a clean loop; remove the direct sun from frame; keep the subject right of centre for the desktop copy and centre-right for the 9:16 crop. Borrow B's opening table shot as an optional cutaway only if a second scene is wanted. Do not use C's montage structure.

For the prototype, A is the live hero background and its first frame is the poster; the wide frame (t = 7.5 s) is kept as an alternative poster in `3b/media/hero-poster-alt-wide.jpg`. The review bar on the homepage switches films A, B, C and the poster fallback.

Next steps, all awaiting founder authorisation: a Seedance 2.5 draft of the revised plan (30 credits for 10 s), then a 1080p finalisation (about 192 credits) only if the design needs it; or proceed straight to a real shoot brief built from this plan.

## 7. Production requirements (documented, not implemented)

Muted autoplay only; no automatic sound; short seamless loop (10 to 15 s); dedicated poster image; separate desktop (16:9) and mobile (9:16) crops; reduced-motion static fallback; all copy as real HTML above the video; no meaning carried only by motion; lazy, performance-conscious delivery (`preload="metadata"`, poster first, video deferred); compressed WebM plus MP4 at 720p and 1080p; the hero must remain finished if the video never loads (the prototype's poster mode demonstrates this). No public deployment of any generated clip.
