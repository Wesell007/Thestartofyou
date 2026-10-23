# Gate 2 Step 3B: Higgsfield visual-exploration round

**Status: EXPLORATION COMPLETE, AWAITING FOUNDER SELECTION (23 October 2026). No HTML/CSS has been rewritten. No runtime code, Supabase, 41B.1B or Lovable change.**

This round sits between the founder's Step 3B brief (journey colour families, baby-growth system, richer My Week / Companion / Homepage, revised card and motion rules) and the Step 3B prototype pass. Higgsfield was used as the visual-exploration and art-direction engine only. Fable remains the product-design lead, creative director, accessibility judge and the implementer of the eventual prototypes. Nothing below is implemented because it "looks attractive"; each study is critiqued against the physical journal, the founder boards, the TSOY design principles and the product requirements.

Founder gallery (local, offline): `http://localhost:4310/explorations/` after `tools\serve.cmd`. Compressed copies of every study are in `explorations/` beside this file; the full-size files stay outside Git in `C:\Users\Administrator\.tsoy-design\higgsfield-explorations\`.

## 1. Higgsfield MCP availability and tools used

The Higgsfield MCP server was connected in this Claude Code session (tools under `mcp__claude_ai_Higgsfield__*`). Tools used: `list_workspaces`, `balance`, `get_preferences`, `models_explore` (list, search, get), `media_upload` + `media_confirm` (sixteen reference images uploaded with curl PUT), `generate_image` (cost preflights only, `get_cost: true`), `generate_image_batch`, `jobs_wait`. No video, motion, Soul-training or Marketing Studio tools were used. No project or folder was created (`auto_create_project` is false).

Account facts that shaped the round:

- At the start the single private workspace was on the **free plan with 10 credits**. GPT Image 2.5 was rejected with "Requires basic plan or higher", so the first six non-Nano-Banana submissions failed and were re-run on Seedream 5.0 Flash (0.5 credits each, rate-limited to roughly one submission per minute).
- Part-way through, the workspace changed to the **Plus plan** (balance read 1,201 credits), which made GPT Image 2.5, Seedream 5.0 Pro and Soul available. Round 2 used them.
- Credits spent for the whole round: **about 23** (10 in round 1, 13.1 in round 2; balance 1,186.88 at the end).
- `nano_banana_pro` requests were **served by the `nano_banana_2` backend** (visible in `jobs_wait`). The results are reported as "Nano Banana Pro request, served as nano_banana_2"; Higgsfield routes the Pro ID that way on this account.

Model costs observed (per image): nano_banana_pro 2.0 · nano_banana_2 1.5 · nano_banana 1.0 · gpt_image_2_5 medium 0.5 / high 1.5 · seedream_5_0_flash 0.5 · seedream_v5_pro 2.5 · seedream_v4_5 1.0 · flux_2 1.0 · soul_2 0.12.

## 2. References supplied to the models

Uploaded once and reused (Higgsfield media IDs in `C:\...\scratchpad` only; not needed again): the founder boards `nano-pregnancy-direction-1/2`, `Pregnancy Jouney Inspo 1`, `Nanno Bannana - First year inspo`, `ttc-handover`, `ttc-28f ask board`, `ttc-28e support board`, `ttc-28h1 calendar direction`; the real journal (`cover-front`, `journal-writing`, `journal-flatlay`, `journal-keepsakes`, the printed weekly page render `page_038`); and the Step 3A captures of My Week A, the homepage and the Companion answer state. The founder board folder itself was found in `Downloads\CUsersAdministrator.tsoy-designfounder-references` (a flattened path) and copied unchanged to `C:\Users\Administrator\.tsoy-design\founder-references\`.

Prompt rules applied to every study: cream paper, near-black ink, the pregnancy family (muted peach, blush, warm dusty pink, eucalyptus support), hairline display serif in spaced capitals, humanist sans, reading serif; cards only for meaningful objects; no shadows, gradients, glass, chat bubbles, avatars, orbs, purple, persona names or made-up brands; British English; no Nano Banana text or names from the boards.

## 3. Studies generated (18)

| # | Surface · approach | Model (as served) | Size | Job ID |
|---|---|---|---|---|
| 01 | My Week A · the journal spread, digitised and enriched | nano_banana_pro → nano_banana_2, 2k | 2752×1536 | `9903106c-7f9a-41e7-9bd4-f86d1a3fc4a3` |
| 02 | My Week B · chapter opener and vertical story | seedream_5_0_flash | 1424×800 | `f8f3ae4e-b913-406d-95ba-9f28b0357c6c` |
| 03 | My Week C · mobile-first premium app (390) | seedream_5_0_flash | 800×1424 | `85e2053c-79d4-4f56-a31c-ae2a44ab58df` |
| 101 | My Week D · digital week progression (week strip + peach rail) | gpt_image_2_5 high | 1344×752 | `e43af6ff-deec-4428-b24d-b6456ba27b46` |
| 103 | My Week C2 · mobile, typography-precise | gpt_image_2_5 high | 752×1344 | `0f02d177-a413-46c5-88b9-a1382362ede2` |
| 201 | My Week · full page, book-spread rhythm | seedream_v5_pro 2k | 1760×2352 | `e9d33fa0-8c77-49c6-a558-2a961f91c7ce` |
| 04 | Homepage A · premium brand with a chapter spine | nano_banana_pro → nano_banana_2, 2k | 2752×1536 | `9bee079f-ae87-41a8-8adc-ebc513845c60` |
| 05 | Homepage B · editorial cover, immersive photo, chapter rail | seedream_5_0_flash | 1424×800 | `ed0e28bd-7e87-4330-a68f-36c703adf8e0` |
| 06 | Homepage C · mobile brand page | seedream_5_0_flash | 800×1424 | `c3f8096b-db10-4ba6-9e6f-1b8f35c88b0a` |
| 104 | Homepage D · one ecosystem, honestly told | gpt_image_2_5 high | 1344×752 | `8a210525-9109-422c-a52e-dacf2236886d` |
| 106 | Homepage C2 · mobile, typography-precise | gpt_image_2_5 high | 752×1344 | `2a7aa8df-2956-4ee8-b3fb-57742f6dc467` |
| 204 | Homepage · full page, section rhythm | seedream_v5_pro 2k | 1760×2352 | `14bdb5a4-8a06-41c5-bff9-f5d417543f50` |
| 07 | Companion A · letter page with journey context | nano_banana_pro → nano_banana_2, 2k | 2752×1536 | `df64197f-e932-4747-8271-0b41d1104d43` |
| 08 | Companion B · two-column study ("what the Companion knows") | seedream_5_0_flash | 1424×800 | `695d4b9b-3339-4a9c-82a9-baa6f480acfb` |
| 09 | Companion C · mobile answer page | seedream_5_0_flash | 800×1424 | `fe419d7a-185b-4e07-9431-c8fb2f4a9479` |
| 107 | Companion D · journal-owner answer | gpt_image_2_5 high | 1344×752 | `4665051d-427f-49f1-af7a-acd7a325a2d5` |
| 109 | Companion C2 · mobile, typography-precise | gpt_image_2_5 high | 752×1344 | `0bd8c2f2-c326-4e05-9440-8dd3650385e8` |
| 301 | Lifestyle direction · writing at the table (art direction only) | soul_2 (text2image_soul_v2) 2k | 2016×1344 | `fb9d655c-43b5-4667-852b-498ce67ca6ef` |

Files: `explorations/<##>-<surface>-<approach>-<model>.jpg` (≤ 1000 px, JPEG) and `explorations/contact-sheet.jpg`.

## 4. Fable's critique, study by study

Scoring is against the Step 3B brief: journal DNA, journey colour discipline (15–25 %), baby-growth signature, digital richness without SaaS, information clarity, honesty of claims, accessibility.

### Pregnancy My Week

- **01 (A, journal spread).** The strongest single composition of the round. The left page as a *baby growth plate* with a five-disc ladder (6, 12, 20, 30, 40) and "About 55 mm · about the size of a lime" beneath, the right page as prompts and objects, a peach chapter band, botanical art confined to one corner: this is the spread the printed journal would become on screen. Faults: the body/emotional copy is invented and one line ("the risk of miscarriage significantly decreases") breaks the health-content rules outright; the baby has a drawn face in profile (too specific; the system should stay at a quieter level of detail); bracketed pseudo-links; the object cards carry filled icons.
- **02 (B, chapter opener).** Good idea: the growth disc straddling the lower edge of the peach band so the hero belongs to both the chapter and the page; the memory objects rendered as paper (frame, waveform card, note). The real week-12 sentence survived intact. Faults: most text is garbled, a section is duplicated, the timeline runs off the layout.
- **03 (C, mobile).** Useful hero treatment (disc breaking out of the header) and a compact object row. Faults: rendered inside a device frame with decorative background (ignored instruction), filled tab icons, invented copy, "hide" placed on the journal band.
- **101 (D, week progression).** The most *digital* of the set without becoming a dashboard: a ruled week strip (10 · 11 · **12** · 13 · 14) under the app bar makes moving between weeks feel like turning pages; a peach left rail carries chapter title, growth disc and measurement; prompts sit two-up; objects are a quiet ruled list. The single-line baby with a pale wash is closest to the intended level of detail. Faults: invented paragraphs, filled icons on object rows, chevrons.
- **103 (C2, mobile, GPT).** The best mobile study and nearly a build spec: header with eucalyptus corners, disc, progression line, four short sections with peach rules, an object trio (appointment, photo frame, voice note), a sage prompt wash, journal band, ask line, text tab bar with the current tab underlined in peach. Faults: a pill "Ask", bordered icon badges, invented one-line copy ("Your body is doing something extraordinary"), an upside-down logic on the voice-note card colour.
- **201 (full page, Seedream Pro).** Valuable for rhythm only: it proves the whole page can read as band → spread → sections → journal band → ask without dead space. The "plate" became a literal ceramic plate and the baby a newborn; all body text is illegible or invented. Not a visual to follow.

### Homepage

- **04 (A, chapter spine).** The *chapter spine*, five colour bands reading like dividers in one printed book, is the idea the brief was asking for and passes the "one premium book" test at a glance. The peach "Week by week" moment and the polaroid memories work. Faults that must not be inherited: the model redrew the journal cover (wrong title lettering, added "watercolor journal"); a cabbage in the week-30 disc (fruit as hero, exactly what the founder rejected); a fabricated provenance line ("NHS, Royal College of Midwives, reviewed by Jenny Jones"); a tablet device.
- **05 (B, editorial cover).** The stacked book-spine rail with colour tabs is a second good expression of the lifecycle. Faults: a translucent glass panel over the hero photo (banned), garbled copy, a cartoon baby medallion, redrawn cover.
- **06 (C, mobile, Seedream Flash).** Weak: watercolour applied to everything, a pill button, a garbled rail and illegible week labels. Rejected except as a warning about over-decoration.
- **104 (D, ecosystem).** Two useful devices: the lifecycle as five chapter *plates* in journey colours, and the honest "In print, on the web, and soon in your pocket" row. The animal-per-chapter idea is tempting but is invented illustration (not journal artwork) and would need commissioning. Faults: redrawn cover, fabricated NICE / RCOG provenance, a sleeping-position answer with a medical claim, a pill button, laptop and phone device art.
- **106 (C2, mobile, GPT).** Clear and composed: hero order, colour-tab chapter rail, week band. Faults: a deck that reduces the brand to "a beautiful pregnancy journal for every chapter", a folic-acid answer with a clinical claim, redrawn cover with the journal's title set differently.
- **204 (full page, Seedream Pro).** Confirms the full-page rhythm (hero, spine, week moment, same page, Companion, memories, app line) and shows the spine colours can be slightly deeper on the homepage than in-product. Faults: a textured pink hero ground that drifts from paper, garbled copy, redrawn cover.

### Companion

- **07 (A, letter page).** The target. The peach context strip ("PREGNANCY · WEEK 12 · Answered using your saved week · Guidance, not diagnosis"), the question as a true heading, the quietly bordered provenance panel with "It did not read your journal", the composed dock on a light peach ground with Speak and Ask. Faults: a stray "Secondary" button label, garbled follow-ups, botanical art slightly too large.
- **08 (B, two-column).** The "What the Companion knows" rail (week, due date, journal ownership, "it has not read your entries", "Change what it may use") is the clearest expression of permissioned context in the round, and margin footnotes are an elegant provenance option for desktop. Faults: doubled text, the rail's botanicals at that scale compete with the content.
- **09 (C, mobile, Seedream Flash).** The order is right and the light-peach dock reads well; the typography is the Flash model's weakest point.
- **107 (D, journal-owner answer).** The blush brush-wash "In your journal" object with the *real* writing photograph beside it, and a three-item provenance row, show how ownership context should look. Faults: invented answer copy, tick glyphs and arrows (not in the system).
- **109 (C2, mobile, GPT).** Almost a build spec: strip, question, answer, provenance panel, next asks, action row, dock, text tabs with Companion underlined. Faults: numbered paragraph badges (the markers should stay superscript), a shield glyph, filled tab icons.

### Lifestyle

- **301 (Soul 2.0).** Good brief for a future real shoot (overhead, window light, linen, tea, eucalyptus, open pages). As an image it shows a red portrait notebook with fake handwriting; it must never stand in for the product. Kept as art direction only.

## 5. Strongest elements, by surface

**My Week:** the baby growth plate on a cream disc with a single fine line and a pale wash (01, 101, 103); the five-disc / five-mark progression under it (01, 103); the peach chapter band (all); the week strip for digital progression (101); four short sections with peach rules (103); objects as paper (02); the whole-page rhythm (201).

**Homepage:** the chapter spine as book dividers (04, 204) or stacked spines with colour tabs (05, 106); the peach "Week by week" moment with the ink-line ladder (04, 106); "The same page, in print and on screen" with a dotted rule (04, 204); the honest print / web / pocket row (104); polaroid memories on cream (04); mobile hero order (106).

**Companion:** the journey context strip (07, 09, 109); the provenance panel with the negative statement "It did not read your journal" (07, 109); the "What the Companion knows" rail as a desktop option (08); the "In your journal" wash with the real photo (107); the composed dock on light peach (07, 09, 109); text tabs underlined in the journey colour (103, 109).

**What is rejected everywhere:** redrawn journal covers; fruit or vegetables as the hero; fabricated reviewers, institutions and clinical claims; chat bubbles (none appeared); filled icon sets, shields, ticks, chevrons; pill buttons; glass panels; device mock-ups; watercolour as a background texture; any copy not from the repository.

## 6. Recommended synthesis for the Step 3B prototypes

### Pregnancy My Week (desktop 1440)

1. App bar, then the **week strip** from 101 (previous two and next two weeks, the current week on a peach wash with a small mark), sticky in the real product.
2. **Peach chapter band**, full width: chapter label, WEEK TWELVE with dotted rule, the chapter title from `myWeekContent.ts` ("The first turning"), due date and weeks to go, eucalyptus crop from the real cover in one corner.
3. The spread from 01: **left** the baby growth plate (disc, single-line figure, pale peach wash; weight of line and absence of facial detail as in 101), the five-mark progression, "About 55 mm" from `what.baby.size`, the optional "about the size of a lime" line with hide; then YOUR BABY / YOUR BODY / EMOTIONALLY / ONE THING WORTH KNOWING with peach rules, all copy from `weekData.ts`. **Right** the journal prompts on washes, the paper photo frame and voice-note object, the two meaningful objects (scan appointment, midwife questions) as a ruled list, not cards.
4. Blush **In your journal this week** band; the Companion ask line with Speak and Ask.
5. Mobile: 103's order almost verbatim, with the pill Ask and icon badges removed.

### Homepage (desktop 1440)

1. Hero: the **real** photograph (never a redrawn cover), larger than 3A, on blush; statement, deck, one primary button, the owner link.
2. **Chapter spine** (04/204): five bands, journey colours at the "book divider" depth, names in spaced capitals; on mobile, 106's stacked rail with colour tabs.
3. Peach **Week by week** moment with the five-disc ladder (no fruit).
4. **The same page, in print and on screen** (04/204) using the real writing photograph and a quiet rendering of the week header joined by a dotted rule; the honest print / web / pocket line from 104 in words, without device art.
5. Companion sample with a provenance note that names only real sources (the repository article and the NHS page used in 3A).
6. Memories as paper-framed real photographs; the app line; footer.

### Companion (desktop 1440)

07 as the base, with 08's "What the Companion knows" rail offered as the desktop variant for signed-in users (the rail collapses into the context strip on mobile), 107's "In your journal" wash for the owner-cue state, superscript markers retained, the action row as a thin-bordered row with a secondary button, the dock composed on light peach. Mobile follows 109 minus badges and glyphs. The escalation state stays exactly as 3A (fixed guidance, no action).

### Cross-cutting

- Journey colour stays at 15–25 %: the chapter band, the week strip mark, the context strip, the active tab underline, washes and the growth plate; primary buttons remain the master signature colour.
- The baby growth system: single-line figure, pale journey-wash disc, five canonical stages (6, 12, 20, 30, 40) interpolated for other weeks, suppressed in historical, paused and loss-aware states; final drawings to be commissioned from an illustrator, the prototypes will carry placeholder line studies.
- Cards only for the appointment, the memory objects and safety states; everything editorial on rules and washes.

## 7. Founder decisions needed before the HTML/CSS pass

1. **Approve the synthesis** above for the three surfaces (or name the study whose direction should lead instead).
2. **Baby figure level of detail:** the quiet single line of 101/103 (recommended) or the more rendered profile of 01.
3. **Homepage lifecycle device:** chapter spine bands (04/204, recommended) or stacked spines with tabs (05/106); and whether an illustrated plate per chapter (104) should be commissioned later or dropped.
4. **Desktop Companion variant:** context strip only (07) or strip plus "What the Companion knows" rail (08) for signed-in users.
5. **Week strip** (101) as the digital progression device: approve for desktop, and whether it should also appear on mobile under the header.
6. **Higgsfield budget:** the round used about 23 credits; authorise or cap any further exploration (TTC calendar, First Year / postpartum, Toddler, Family, activation) before the prototype pass, and confirm whether motion studies (baby growth, chapter transition, activation confirmation, memory reveal) may be generated later with Seedance or similar. Not started.
7. **Real photography:** confirm the Step 3B homepage may use the existing shoot only and that a new shoot (brief as in 301) is a future item, not a blocker.

Gate 2 Step 3B prototypes remain **not started** until these are answered. Nothing from this round is to be used as the real journal or as reviewed health copy.
