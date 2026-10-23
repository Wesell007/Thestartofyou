# 2. My Week: where the Journal, Digitised is strongest

Prototype: `prototype-source/my-week.html` (five states stacked, `#state-a-owner-active` … `#state-e-paused`) · captures `review/my-week-*.jpg`. Week-12 development and reminder text is the real copy from `src/data/weekData.ts`; the user "Amara", dates and appointments are synthetic.

## The structural reference

The printed weekly page (journal pp. 38–89): week title with dotted rule; BABY UPDATE; a photo space; bump measurement; REMINDER or TOP TIP; prompts ("Memories and milestones…", "Exciting events…", "How I feel about my appearance…"); the Highlights / Challenges / Cravings / Dislikes table; the "Your baby is the size of" pill. The digital page keeps that order and voice. It is not a dashboard: no tiles, no progress rings, no streaks.

## Desktop concept (1440), state A (active pregnancy, verified owner)

Signed-in app bar (64 px): wordmark, section crumbs with My Week current, account name. Week header: label "Pregnancy · First trimester · Due 14 April", display title WEEK TWELVE, dotted rule, meta "28 weeks to go". Two columns like the printed spread: left, Baby update (real copy), the optional size row ("about the size of a lime (~55 mm)") with "Hide size comparisons" beneath it, an empty photo frame ("Add this week's photo"), the bump-measurement ruled line, Reminder (real copy). Right, three prompts on alternating sage/blush washes with ruled writing fields, then the four-row table. Below, the blush **"In your journal this week"** band (owner bridge) with two quiet actions. Then a two-column foot: This week (questions for midwife, scan appointment, one read) and Ask the Companion with the real week-12 suggestion "What does the 12-week scan check for?".

## Mobile concept (390)

One column in document order: header, baby update, size row, photo frame, bump line, reminder, prompts as full-width bands, table, owner band, this week, Companion, then a five-tab bar (Today, Journey, Companion, Journal, You). In a real single-state page the tab bar is sticky at the bottom; in the stacked review file it is static.

## State variants

| State | What changes | Why |
|---|---|---|
| **B** active, digital-only | Same page; the owner band is replaced by one quiet line "Have the printed journal? Connect it." No other difference: nothing essential is withheld from non-owners. | Rule: ownership enhances, never gates. One quiet line, no repeated selling. |
| **C** TTC / IVF | Editorial page "THIS WEEK" with cycle context ("Cycle 4 · Day 18 · Two-week wait"): What is helpful now; reading rows; one reflection prompt on a wash; tools (Cycle notes, Fertile window estimate); Companion ask. **No baby language, no size row, no photo frame, no illustration.** For IVF the label and copy follow the treatment stage; the composition is identical. | Founder decision: TTC, IVF and sensitive states default to the editorial system; no invented woodland art. |
| **D** historical pregnancy | "Looking back · Pregnancy, 2025 · Week twelve". Read-only keepsake: a photo frame holding the user's photo of the printed page, saved entries set in the reading serif with dates, "The week in a line". Quiet actions only: add a reflection, export this chapter. **No prompts to fill, no size row, no celebration.** | Memories are kept exactly as they were; the page is a chapter, not a task list. |
| **E** paused | "Your journey is paused" · TAKE YOUR TIME. A ruled statement of what is switched off (weekly updates, size comparisons, reminders, anniversaries) and that everything written is kept; actions "Resume when you are ready", "Change what stays paused"; support and journal rows; one open writing space with no prompt; the Companion present. **The system never infers loss; the user paused it.** | Research finding (72 % of pregnancy apps ignore loss; recurring "size of" updates were the reported harm). |

Size comparisons are **optional contextual content for an active pregnancy only**: present in A and B with a one-tap hide, absent in C, D and E. They are not part of the structural identity of the page.

## Typography roles and spacing

Week title display-1 44/30 spaced caps; labels brown small caps; prompts UI sans 17 in sentence case ending "…"; writing fields reading serif on 36 px ruled lines; table rows 44 px minimum; column gap 64 px; washes 24/26 px padding with a soft brush-like radius; owner band 26/28 px.

## Interaction notes

- Writing fields save on blur; the printed journal is never written to; "I wrote in my journal this week" simply records that for the user's own timeline.
- "Add a photo of the page" opens the camera (app) or upload (web) and files the image against the week.
- "Hide size comparisons" is one tap, remembered, reversible in settings; pausing the journey (state E) switches off every recurring stream in one action.
- The Companion ask carries the week as context only if the user has allowed it.

## Accessibility notes

Prompts are real `<label>`s for their fields; the table rows are labelled inputs; washes keep text at ink on sage/blush (≈ 12:1); ink-soft on sage ≈ 5.3:1; the size row's green dot is decorative (`aria-hidden`) with the comparison in text; the photo slot is a labelled drop/upload target ≥ 44 px; mobile body 17 px; headings h1 (week) → h2 (sections implied by labels; implementation should use real h2s); reduced motion: none used.

## Journal-derived patterns

The entire template; alternating sage/blush washes; ruled lines; the paper-bordered photo frame; the "size of" pill as the only rounded element; prompt voice; the brown small-caps BABY UPDATE / REMINDER labels.

## Digital adaptations

State gating (A–E); the owner band; the one-tap hide for size comparisons; the pause model; saved entries rendered in the reading serif (D); the Companion ask; the app tab bar.

## Deliberately absent

Dashboard tiles, rings and percentages; streaks and completion pressure; countdown theatre; confetti or celebration animation; woodland characters on the week page itself (chapter openers at trimester transitions are a separate, state-gated moment); fruit imagery as the page identity; any Mother/Father wording (prompts are first person; relationship names are user-personalisable later).
