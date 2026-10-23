# 5. Homepage

Prototype: `prototype-source/homepage.html` · captures `review/homepage-desktop.jpg`, `review/homepage-mobile.jpg`. Designed last, after the four product surfaces fixed the system.

## What it communicates, in order

1. What The Start of You is (hero statement).
2. Where someone is in their journey (six chapters).
3. Trusted guidance (three real article titles and the trust statement).
4. The Companion (a real ask line, not a demo chat).
5. The physical journal (real photography; the connect bridge).
6. Digital journal and memories.
7. The app, in one honest sentence.

Not everything at equal hierarchy: the hero carries one primary intent ("Start your journey"); the journal section carries one product intent ("See the journal"); the Companion section's "Ask" is a try-it, not a CTA; nothing else asks for a click beyond quiet text links.

## Desktop concept (1440)

Masthead as the article. Hero on the blush chapter ground: the real cover artwork's branches masked into the top-left and the rabbit-and-eucalyptus corner into the bottom-right (Rule 2: homepage hero is welcome/product storytelling); left, the journey label, a sentence-case display statement in signature-ink ("From trying to conceive to family life, kept in one place."), a ≤ 20-word deck, the primary button and the quiet owner link; right, the real journal photographed on a table, in a paper frame. Then: WHERE ARE YOU? as a two-column ruled list of six chapters in the display serif with one line each; GUIDANCE YOU CAN TRUST as three ruled rows; A COMPANION THAT ANSWERS CAREFULLY as a split with the ask line; a blush band for the journal with the real writing photograph; MEMORIES, IN YOUR OWN WORDS with the keepsakes-pocket photograph; a ruled one-sentence app note; footer.

## Mobile concept (390)

Hero text first, then the button full width, the quiet link, then the photograph; the top-left art is hidden (it collided with the label) and the bottom-right art is reduced. All lists collapse to one column; split sections stack image over text; the app note remains a single sentence.

## Typography and spacing

Hero statement display serif 52/34 (max 16ch); section titles display-2 spaced caps 30/24 with the dotted rule and a reading-serif deck; chapter names display serif 26; rows UI sans 15; section padding 64 px (48 on mobile); hero 96/48.

## Interaction notes

- Chapter rows are the journey entry points; the signed-in homepage would replace the hero with Today (out of scope here).
- The ask line sends the question to the Companion page with no account required for the public Companion.
- The owner link goes to the activation ceremony.

## Accessibility notes

Headline ≈ 5.4:1 (signature-ink on blush is slightly lower than on paper; verify, and fall back to ink if < 4.5:1); decorative art `aria-hidden`; photographs with descriptive alt; one h1; buttons 44 px; no motion.

## Journal-derived

The cover composition as the hero; chapter titles in spaced capitals; the dotted rule; blush band; real paper frames.

## Digital adaptations

Chapter list as navigation; trust statement with real titles; the Companion try-it; the honest app note.

## Deliberately absent

Card walls; a feature grid; repeated CTAs; gradient sections; fake dashboard or app screenshots; testimonial carousels; logo walls; stock pregnancy imagery; AI-generated journal imagery (the current site's `home-journal-flatlay.jpg` is AI-generated and is not used); app-store badges for an app that does not exist yet.
