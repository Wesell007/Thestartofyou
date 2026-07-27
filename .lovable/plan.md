## Phase 13.7f: Account Settings Visual Preference UI

### Files

- Create `src/components/settings/BabyIllustrationStyleField.tsx` — self-contained radiogroup section.
- Edit `src/pages/AccountSettings.tsx` — import the component and mount `<BabyIllustrationStyleField userId={userId} />` between the Companion section and Download-your-data section.

### Component behaviour

- Reads `profiles.baby_illustration_style` on mount; NULL → `default` selected. Load failure shows a calm inline note and does not block the page.
- Save upserts `{ user_id, baby_illustration_style: selected === "default" ? null : selected }` using the existing profile upsert pattern (`onConflict: "user_id"`). Toast: `Illustration style updated.`
- Reset link "Use the default illustrations" upserts `null`, resets selection to `default`. Toast: `Reset to default`.
- Error toasts (destructive): `Could not save illustration style` / `Could not reset illustration style`.

### UI + a11y

- `role="radiogroup"` with `aria-label="Illustration style"` containing four `role="radio"` buttons.
- Roving `tabIndex` (0 on checked, -1 otherwise); ArrowLeft/Right/Up/Down cycles selection and moves focus.
- `aria-checked` reflects selected; visible selected state via terracotta border + tinted bg tokens.
- Focus-visible ring via `focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2`.
- Previews use `resolveBabyIllustration(style, "mid")` and `babyIllustrationAlt(style)`.
- Responsive grid: 2 cols mobile, 4 cols `sm+`.

### Copy (exact)

- Title: `Illustration style`
- Prompt: `Would you like your journey illustrations to feel more personalised?`
- Subline: `A gentle visual preference for the baby illustrations shown on your weekly page.`
- Disclaimer (approved verbatim, "exactly" is allowed here only): `These illustrations are symbolic and may not reflect exactly how your baby will look.`
- Options: `Use the default illustrations`, `Lighter skin tone style`, `Medium skin tone style`, `Deeper skin tone style`.
- Save toast: `Illustration style updated.` Reset link: `Use the default illustrations`.
- No banned wording anywhere else in the file (no accurate/exact/predicted/ethnicity/race/looks like your baby/match your family/real baby colour in comments, helper names, labels, alt text, or copy outside the approved disclaimer).

### Out of scope

No changes to MyWeek, SectionBabyThisWeek, Setup, Journey Support, Weekly Reads, article images, routes, sitemap, analytics, AI. No migration. No `varied`. No free text. No identity.

### Verification

- `bunx tsgo --noEmit`
- Manual check: load reflects saved value, each option saves the correct enum value, reset returns NULL.
