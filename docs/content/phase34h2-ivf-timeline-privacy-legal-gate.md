# Phase 34H.2 — IVF timeline save: privacy and legal review pack

Status: HUMAN REVIEW BLOCKER OPEN. No approval exists. Nothing in this document is an approval, and
no field below has been inferred.

## What the feature does

**Data stored** (two values only, on the person's existing TTC journey row):

- `ivf_transfer_date` — embryo transfer date.
- `ivf_transfer_type` — `3day` or `5day`.

**Data not stored**: calculated timeline milestones, predicted milestone dates, derived timeline
cards, or any other calculator output beyond the two source values.

**Purpose**: to let a signed-in person with a Trying to Conceive journey return to their IVF timeline
without re-entering the source information each time.

| Aspect | Position |
| --- | --- |
| Collection | Explicit Save action only; never collected automatically from calculator use; no persistence before authentication |
| Storage owner | `public.ttc_journeys` (existing table, existing user-owned access model) |
| Access model | Authenticated, user-owned row |
| AI access | NO |
| Companion access | NO |
| Grounding use | NO |
| Analytics | NO treatment values |
| Browser storage | NO treatment values |
| URL / query / hash | NO treatment values |
| Auth metadata | NO treatment values |
| Automatic expiry | NO |
| User control | Save, Update, Remove saved timeline. Removal clears only the two values and does not delete the wider TTC journey |
| Lifecycle rule | Save and Update only while the active lifecycle is `ttc`; historical context is viewable and removable during pregnancy and first year |

## Retention and deletion facts for the reviewer

- Remove saved timeline clears only the two columns; the TTC journey and all other answers remain.
- Deleting the TTC journey deletes the row, so the two values go with it.
- Deleting the account deletes the auth user; the TTC journey row cascades (`ON DELETE CASCADE`), so
  the two values are removed.
- No automated IVF expiry and no automated retention job exist.
- Backup retention is not established by repository truth and no promise is made about it.

## Privacy notice

| Item | Status |
| --- | --- |
| PRIVACY NOTICE COVERAGE GAP IDENTIFIED | YES — `/privacy` describes saved journey information, AI, analytics, choices and general retention, but does not specifically describe the two IVF treatment values or this persistence behaviour |
| PRIVACY NOTICE CHANGE REQUIRED | PENDING HUMAN PRIVACY/LEGAL REVIEW |
| PRIVACY NOTICE WORDING APPROVED | NOT PROVIDED |

The coverage gap is a factual observation, not a legal conclusion. No speculative legal wording has
been drafted or published.

## Decisions required from the human reviewer

| Decision | Status |
| --- | --- |
| Privacy/legal reviewer | NOT PROVIDED |
| Review date | NOT PROVIDED |
| Privacy/legal approval | NO |
| Privacy notice change decision | PENDING REVIEW |
| Privacy notice wording approved | NOT PROVIDED |
| Save copy approved | NOT PROVIDED |
| Retention wording approved | NOT PROVIDED |
| Deletion wording approved | NOT PROVIDED |
| Lawful processing position | NOT PROVIDED |
| Special-category / health-data requirements | NOT PROVIDED |
| Explicit consent required | NOT PROVIDED |
| Additional privacy-impact documentation required | NOT PROVIDED |

If the reviewer requires explicit consent, that is new implementation work and activation stays
blocked until it is built and tested. No consent UX has been added by assumption.

## Proposed visitor copy — PROPOSED / NOT HUMAN-APPROVED

**Signed out**
- Heading: `Want to keep this timeline?`
- Body: `Sign in to save your IVF timeline to your Trying to Conceive journey. You'll return here after signing in and can re-enter your transfer details to save them.`
- CTA: `Sign in to save`

**First save (active TTC)**
- CTA: `Save my timeline`
- Body: `Save your embryo transfer date and transfer type to your Trying to Conceive journey so you can return to this timeline later.`
- Supporting line: `Calculated milestones are not stored.`
- Proposed optional line (reviewer to accept or reject): `You can remove these saved details from your timeline later.`

**Saved**: `Timeline saved` (no save timestamp)

**Update**
- CTA: `Update saved timeline`
- Helper: `This will replace the transfer details currently saved to your TTC journey.`

**Remove**
- CTA: `Remove saved timeline`
- Confirmation heading: `Remove your saved IVF timeline?`
- Confirmation body: `This removes your saved embryo transfer date and transfer type from your Trying to Conceive journey. It won't delete your TTC journey or your other answers.`
- Buttons: `Cancel` / `Remove saved timeline`

All of the above remains PROPOSED COPY, not human-approved copy.
