# Anti-reference board: what TSOY must not become

Each pattern is named with representative examples (from the category files or the current TSOY site), why it conflicts with the physical journal, and the principle it breaks (P1–P10, `design-principles.md`). Current-site measurements are from `journal-audit/digital-gap-analysis.md`.

| # | Anti-pattern | Representative examples | Why it conflicts with TSOY | Principle broken |
|---|---|---|---|---|
| 1 | **Generic SaaS dashboard** (stat tiles, widget grid, sidebar app shell) | Oura's data layer if copied wholesale (G1); the current My Journey composition | The journal is pages and chapters, not panels. Pregnancy is lived, not monitored. | P1 |
| 2 | **Excessive rounded cards** | Current site: `rounded-2xl` 472, `rounded-3xl` 447, `--radius: 2rem`; most baby-tracker app-store screenshots | The journal has almost no containers; the only rounded element is one small pill. Cards fragment a page into equal boxes and flatten hierarchy. | P1, P5 |
| 3 | **Glassmorphism / blur bars** | Current site: `backdrop-blur` 137; the AI-landing default | Paper is opaque. Blur implies layered screens, not a page. | P3, P5 |
| 4 | **AI-purple gradients and glows** | The LLM default aesthetic named in the taste skill (lilac/violet mesh, neon glow) | No gradient exists anywhere in 148 pages. Purple is outside the palette. Glow reads as tech, not keepsake. | P3, P4 |
| 5 | **Bubbly chatbot UI** (bubbles, avatars, typing dots, orbs) | Generic support-widget chat; voice orbs (E4 discussion) | The Companion should read like a letter or a page that answers (E3). Bubbles trivialise health answers and hide provenance. | P1, P9 |
| 6 | **Generic pregnancy stock photography** (white studio, hands-on-bump, glowing backlight) | Category-wide; the opposite of Stokke's candour brief (D4) | Interchangeable, staged, and often exclusionary. The journal has no photography at all; what TSOY adds must be candid and real. | P9 |
| 7 | **Overly childish baby UI** (storks, pastel rainbows, cartoon mascots everywhere) | Mass-market baby apps; the risk inside direction C | The woodland art is naturalistic watercolour, not cartoon; the audience is adults. Childishness undermines health trust and hurts after loss. | P9, P6 |
| 8 | **Cold luxury minimalism** | Aesop's reported 12 px body and low-contrast greys (A4); Kinfolk's detached register (A2) | Restraint without warmth fails the product promise and the accessibility bar. | P9, P3 |
| 9 | **Overly feminine pink cliché** | Flo as critiqued (D1); "pink and butterflies" (Clue founder, C2) | TSOY's blush is a paper tone paired with sage and dusty blue. Pink as identity signals gender, not care, and alienates partners and co-parents. | P4 |
| 10 | **Dense health portals** | What to Expect / BabyCenter week pages (D2); NHS boxes if copied visually (C1) | Ads, modules and feeds destroy the single calm page and mix commerce with guidance. | P1, P8 |
| 11 | **Scrapbook overload** (tape, stickers, rotated frames, textures on every surface) | Direction A taken literally; Canva-style templates | The journal uses one or two keepsake devices per page. Everywhere, they become noise and reduce legibility and performance. | P5, P6 |
| 12 | **Excessive animation** | Current site: `animate-` 141; agency scroll theatre | Print is still. Motion should mark a chapter or confirm an action, not decorate. | P10 |
| 13 | **Illustration everywhere** | Headspace-style ubiquity (D7) | Characters that appear on every screen stop meaning anything and lower seriousness. In the journal, animals sit at the edges and dividers. | P6 |
| 14 | **Pill-heavy actions and navigation** | Current site: `rounded-full` 1,534 | Pills are app chrome. The journal's "action" is a line to write on. | P5 |
| 15 | **Per-stage colour switching** | Current `--stage-*` palettes (TTC green, IVF violet, pregnancy peach…) | One book, one palette. Stages are chapters, not brands. | P4 |
| 16 | **Streaks, badges, completion pressure** | Fitness and habit apps; 1SE daily pressure if gamified (B6) | Pressure contradicts gentleness and is harmful after loss. | P9 |
| 17 | **Eyebrow and micro-label overuse** | Current site: `uppercase` 1,366; the taste skill's "#1 violated rule" | The journal reserves spaced capitals for titles. Labels on everything dilute the announcing voice. | P2 |
| 18 | **Linear, birth-assuming content streams that cannot be stopped** | 72 % of 166 pregnancy apps (C5) | Not a visual pattern, but the gravest failure in this category; every visual direction must carry the pause state. | P9 |

## Use

This board is the negative test for the flagship screens in Step 3: any screen that exhibits a row above is sent back. Rows 2, 3, 12, 14, 15 and 17 describe the **current website** and define what is removed in the rebuild.
