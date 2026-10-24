# Gate 2 Step 3B: isolated prototypes (end-of-round report)

**Status: STEP 3B PROTOTYPES DELIVERED FOR FOUNDER REVIEW (24 October 2026). Design artefacts only. No runtime code, no Supabase change, 41B.1B not started, Lovable unpublished, Article and Activation not redesigned, no further hubs.**

Review locally: run `C:\Users\Administrator\.tsoy-design\flagship-prototypes\tools\serve.cmd` and open `http://localhost:4310/3b/` (index), `3b/my-week.html`, `3b/homepage.html`, `3b/companion.html`. Localhost only, fully offline. Compressed captures are in `review/`; the reproducible source (DESIGN-ONLY / NON-RUNTIME) is in `prototype-source/`.

Companion documents: `hero-film-exploration.md`, `hero-film-shot-plan.md`, `journey-colour-tokens.md`, `logo-evidence.md`, `higgsfield-exploration-round.md` (the static round).

## 1. Step 3A to Step 3B: what changed

| Area | 3A | 3B |
|---|---|---|
| Colour | one palette everywhere | one master system plus six controlled journey families (TTC, Pregnancy, First Year, Postpartum secondary, Toddler, Family) and three TTC cycle states, scoped by `[data-journey]`; journey colour on chapter bands, strips, active states, dividers, plates and selected washes only |
| Brand mark | text wordmark | the actual supplied logo as an image layer (see `logo-evidence.md`) |
| Primary action | signature blue-green button | master-brand ink button (15.5:1), lifecycle-neutral, works over imagery |
| My Week | journal week template, static week 12, "scanned page" feel | living weekly progression: week strip (10 to 14, 12 active), peach chapter band with chapter title and countdown, baby growth plate with scale bar and five-stage ladder, four short journey-ruled sections, memory objects as paper, journal bridge, Companion, appointment object; weeks 8/12/20/30/40 switchable with real repository copy |
| Baby growth | fruit line only | signature device: one line language at five canonical stages, scale bar against full term, fruit secondary and hideable, suppressed outside an active pregnancy |
| Homepage | manifesto hero on blush with a product photo | cinematic brand-film hero (AI concept draft, labelled) with poster fallback, controlled left-anchored readability treatment, chapter dots, three headline candidates, ink CTA, Companion entry; then chapter spine, "every page knows your week" object, Companion excerpt, print and screen pair with memories, lifecycle ribbon and honest availability list |
| Companion | answer column, trust line | context strip, "What the Companion knows" collapsible rail (desktop; collapsed first on mobile), bordered provenance panel split into what it used and what it did not access, Companion mark, journey-wash dock with a primary Ask, listening state, owner cue with real photograph |
| Cards | avoided | reserved for meaningful objects: photo memory, voice note, appointment, saved questions, journal page object, mini week object, safety notice |
| Motion | none | strip and section fade on week change, chapter band hover lift, hero film; all honour `prefers-reduced-motion` |

## 2. Actual TSOY logo

`Start of you dark logo.png` (founder-supplied; found in the flattened Downloads folder and copied unchanged to `C:\Users\Administrator\.tsoy-design\journal-audit\raw\`). PNG, RGBA, 1536 by 1024, transparent background, byte-identical (SHA-256 `d17a5535…3860`) to the tracked `src/assets/logo.png`. Used in every 3B header as an `<img>` layer, never redrawn, proportions untouched; the prototype copy crops only the fully transparent margin (artwork box 721 by 304). Full evidence in `logo-evidence.md`.

## 3 to 8. Homepage hero film

Summarised here; full detail, prompts, critique and costs in `hero-film-exploration.md`.

- **Tools and catalogue inspected:** `models_explore` (list, search "seedance", search "kling", recommend), `generate_video` cost preflights, `generate_video_batch`, `jobs_wait`, `balance`, `media_upload` and `media_confirm`. Video models present on 24 October 2026 included Seedance 2.5 (t2v, omni_reference, draft mode), Seedance 2.0 and 2.0 Mini, Seedance 1.5 Pro, Kling 4.0, Kling 3.0 Omni (image references, multi-shot), Kling 3.0 Omni Frames, Kling 3.0, Kling 2.6, Cinema Studio 3.0, FLUX 3 Video, MiniMax H3, Grok Video 1.5, Wan 2.6, Gemini Omni Flash.
- **Model chosen:** Kling 3.0 Omni (`kling_o3_image_reference`, std, silent, multi-shot with per-shot durations, one image reference). Reason: Seedance 2.5 was the expected first candidate, but one 10 second draft costs 30 credits, close to the whole remaining 35 credit exploration allowance, and three would be 90; Kling 3.0 Omni gave the exact capability needed (ordered shots, restrained motion, reference adherence, silent output) at 10 credits per clip, so all three concepts fit the allowance. Seedance 2.5 remains the recommended model for a finalised clip if authorised.
- **Concepts generated:** A field / human / lifecycle; B home / journal / intimate detail; C mixed quiet-life progression. Each 10.04 seconds, 1280 by 720, silent, MP4.
- **Credits:** expected 30, actual 30 (balance 1,186.88 to 1,156.88). No static credits spent. Cumulative Higgsfield spend this programme: about 53.
- **Recommended direction:** A, revised (open on the wide meadow with the figures distant, keep the hand-holding shot, reduce the bump-first opening so the master film is not Pregnancy-specific, soften the flare, loop on grass). A is the hero background in the prototype; B and C are switchable from the review bar.

## 9 to 14. Screenshots

All in `review/` (compressed) and full size in the working folder `3b/review/`.

- Homepage desktop `homepage-desktop.jpg`, hero `homepage-hero-desktop.jpg`, poster fallback `homepage-hero-poster-desktop.jpg`, headline candidates `homepage-hero-h2-desktop.jpg`, `homepage-hero-h3-desktop.jpg`.
- Homepage mobile `homepage-mobile.jpg`, hero `homepage-hero-mobile.jpg`.
- My Week desktop week 12 `my-week-12-desktop.jpg`, week 40 `my-week-40-desktop.jpg`; mobile `my-week-12-mobile.jpg`.
- Baby growth comparison `baby-growth-comparison.jpg` (the five plates) and `my-week-growth-sheet-desktop.jpg` / `-mobile.jpg`.
- Companion desktop `companion-answer-desktop.jpg`, `companion-not-found-desktop.jpg`, `companion-owner-cue-desktop.jpg`; mobile `companion-answer-mobile.jpg`, `companion-seek-help-mobile.jpg`, `companion-owner-cue-mobile.jpg`.
- Contact sheet `contact-sheet.jpg`; 3A against 3B `3a-vs-3b-desktop.jpg`; hero-film frame strips `hero-film-concept-*-frames.jpg`; poster `hero-poster-concept-A.jpg`.

### Homepage: what it shows against section 24 of the brief

A revised desktop cinematic hero; B 390 px hero; C the actual logo; D controlled local readability (two gradients: a left-anchored fade to 72 % width and a light top and bottom grounding; the right half keeps the image rich; on mobile the fade is bottom-anchored); E three headline candidates (below); F ink primary action; G Companion entry in the masthead and a persistent quiet "Ask the Companion" on desktop; H the hero resolves into the chapter spine through a quiet "Your journey has chapters" head; I chapter colours as the five spine bands, the hero chapter dots and the closing ribbon; J purple/mauve proposal (section 16); K the print and screen pair with the dotted rule and real photographs; L the poster fallback (`?poster=1`, reduced motion, or video error) renders the identical composition.

Headline candidates (none final; "Yours to keep." retained as the emotional line under each): 1 "From trying, to family life." 2 "Every chapter of becoming a family, in one place." 3 "Wherever you are in the story." A fourth, not built, for discussion: "Trying, expecting, holding, growing."

### My Week: what it shows against section 25

Desktop and mobile active pregnancy, verified owner. The baby growth system at weeks 8, 12, 20, 30 and 40 with the week strip, chapter title, countdown, plate, scale bar, sections, reflection prompt, asks and appointment all changing from real repository data, while layout, type, colour and rhythm stay fixed, so progression never looks like an unrelated screen. Digital-only, historical and paused/sensitive states keep the 3A logic and are not rebuilt in this pass: the growth plate, the ladder, the countdown and size comparisons appear only while `active`; paused shows the pause control and no celebration; historical is read-only keepsake; the system never infers loss.

### Companion: what it shows against section 26

Desktop editorial answer with the context strip and the collapsible rail; mobile single column with the rail collapsed first; provenance split into what it used and what it did not access; one safe action (answer state only); trusted-source failure that says so plainly; seek-help fixed guidance with no actions; journal-owner cue pointing to the printed page with the real photograph; the negative trust statement in every state; the privacy boundary in the rail and the dock.

## 15. Journey colour tokens

See `journey-colour-tokens.md` for every value, role and measured contrast. In short: deep colours pass 4.5:1 on paper and on their own wash (the one exception, fertile deep on the fertile wash at 4.21:1, is resolved by using the TTC deep for text on that wash); mids are ornament only; washes carry ink text at 12:1 or better.

## 16. Purple / mauve: proposed limited role

Proposal shown in the prototypes: **mauve is the Companion's own accent, "the voice that is not a chapter".** Tokens `--comp-deep #6B5670` (6.1:1 on paper), `--comp-mid #A893AB`, `--comp-wash #EEE8EE`.

- May appear: the Companion mark (ring and dash) wherever the Companion is entered; the "You asked" and "The Companion" eyebrows; the context-strip dot for the Companion; the focused input ring and the listening dot in the dock.
- Must not appear: backgrounds or washes (the dock uses the journey wash), buttons, charts, chapter devices, illustrations, journey headers, My Week sections, or anywhere as a sixth journey colour.
- Coexistence: it sits beside any journey family because it never shares a role with them (journeys orient place; mauve marks the voice). If the founder prefers no mauve, the mark and eyebrows fall back to the master signature ink with no other change.

## 17. Component-rule changes

- Cards and panels only for meaningful objects, actions, memories, tools and safety states: photo memory, voice note, appointment, saved questions, journal page object, mini week object, notice. Editorial content is never boxed; sections are divided by journey-coloured hairlines.
- Depth is tactile only: paper objects carry a 1 px edge and a soft, short shadow; polaroids rotate a degree; no dashboard elevation anywhere.
- Tabs and active states are text underlined in the journey deep colour; no pills except the retained size row, which 3B replaces with a plain line.
- Botanical art is absent from all three surfaces in this pass (punctuation reserved for chapter openings, activation and keepsake moments).
- Motion: calm by default; the only movements are the week change fade, the chapter band hover lift and the hero film, all disabled under reduced motion. Baby-growth, chapter transition, activation, memory reveal and voice motion remain deferred.
- Primary action is ink across the lifecycle; journey deep colours never colour buttons.

## 18. Unresolved founder decisions

1. Approve or amend the three prototypes as the Step 3B system (Homepage, My Week, Companion).
2. Hero film: confirm direction A revised; authorise or decline a Seedance 2.5 draft of the revised shot plan (30 credits per 10 second draft) and, later, a 1080p finalisation (about 192 credits for 12 seconds).
3. Hero poster: the current poster is the bump-first frame (strong, but Pregnancy-led); the alternative wide frame is in `3b/media/hero-poster-alt-wide.jpg`.
4. Headline candidate 1, 2, 3 or the fourth, or new copy.
5. Mauve: accept the Companion-accent role, or reject and fall back to signature ink.
6. Ink primary action: accept as the master CTA.
7. Baby figure language: accept the single-line concept as the brief for a commissioned, reviewed illustration set.
8. Week strip on mobile: keep (as built) or desktop only.
9. The 3A founder-review questions (`../founder-review.md`) remain open; items superseded by this round are the palette rule and the card rule.
10. Content finding: week measurements mix crown-rump and crown-heel bases in `weekData.ts` sizes; a content decision is needed before any production growth system.

## Validation performed

- All views rendered at 1440 and 390 with the Edge channel (so the H.264 draft decodes) and inspected visually; fonts asserted loaded.
- Real supplied logo verified by SHA-256 and used as an image in every header.
- No generated or redrawn journal is presented as the product: journal photographs below the hero are the existing shoot; the hero film shows no cover artwork and is labelled as an AI concept on the page.
- Journey colours scoped from one token file; all deep colours contrast-checked (`journey-colour-tokens.md`).
- Homepage is six sections, none a feature grid; My Week is a product surface with objects and interaction, not a scanned page; Companion is answer-first with no bubbles, avatars or orbs; botanical art absent; every card maps to an object; mobile composed per capture.
- `git status` shows changes under `docs/` only; no file under `src/`, `supabase/`, `scripts/`, `public/` or any config references `docs/design/flagship`.
