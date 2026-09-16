# IVF timeline saving — privacy and legal review pack

Prepared for a human privacy/legal reviewer. Nothing in this document constitutes
legal advice, a legal conclusion or an approval. **The feature described here is
currently switched off and has never been available to the public.**

No human review has taken place. All reviewer fields in section 12 are blank.

---

## 1. Feature being reviewed

The Start of You has built an optional IVF timeline saving feature.

A signed-in person with an active Trying to Conceive journey may explicitly
choose to save:

1. embryo transfer date
2. embryo transfer type (`3day` or `5day`)

The purpose is to allow the person to return to their IVF timeline later without
repeatedly entering the source details.

The feature is currently OFF and has not been activated publicly.

The IVF timeline calculator itself already exists and works for everyone, signed
in or signed out, without saving anything. This review concerns only the optional
saving of the two values above.

---

## 2. Exact data stored

Stored:

| Value | Type |
| --- | --- |
| `ivf_transfer_date` | calendar date |
| `ivf_transfer_type` | `3day` or `5day` |

Not stored:

- calculated milestones
- calculated timeline dates
- timeline cards
- free-text health information
- treatment notes
- clinic information
- embryo grading
- medication information
- IVF cycle history

All derived timeline information is recalculated from the two stored source
values each time the page is opened. Nothing derived is written to the database.

---

## 3. How data is collected

| Action | Saves data? |
| --- | --- |
| Automatic collection | NO |
| Using the calculator | NO |
| Choosing a transfer date | NO |
| Choosing a transfer type | NO |
| Signing in / authenticating | NO |
| Loading or viewing the timeline | NO |

Data is written only after an explicit user action:

- first save requires `Save my timeline`
- changes require `Update saved timeline`
- removal requires `Remove saved timeline`

---

## 4. Who can save

Save and Update are available only when all of the following are true:

- the person is authenticated
- their active journey is Trying to Conceive
- an existing Trying to Conceive journey record already exists

The save feature does **not** create a Trying to Conceive journey automatically,
and does **not** create an IVF journey type. The saved journey types remain
exactly: `ttc`, `pregnancy`, `first_year`.

---

## 5. Storage and access model

- Storage owner: the existing Trying to Conceive journey record
  (`public.ttc_journeys`), one row per authenticated person.
- The two IVF values sit on that existing record as two additional optional
  fields.
- Existing user-scoped database access controls apply unchanged; a person can
  only reach their own row.
- No additional public access was added.
- No separate IVF table exists.
- The two values are always written and cleared together; a partial state (a
  date without a type, or a type without a date) is rejected by the database.

---

## 6. User control

The person can explicitly:

- SAVE
- UPDATE
- REMOVE SAVED TIMELINE

Removing the saved timeline clears only `ivf_transfer_date` and
`ivf_transfer_type`. It does not delete:

- the Trying to Conceive journey
- other Trying to Conceive answers
- a Pregnancy journey
- a First Year journey
- the account
- journal content
- AI history

---

## 7. Deletion behaviour (verified technical behaviour)

**Remove saved timeline.** Clears the transfer date and transfer type. The
Trying to Conceive record and all other answers remain intact.

**Trying to Conceive journey deletion.** The existing journey deletion flow
removes the `ttc_journeys` row, so the two IVF values disappear with it.

**Account deletion.** The verified account deletion flow deletes the
authentication user. `ttc_journeys.user_id` uses `ON DELETE CASCADE`, so the
Trying to Conceive record and the two IVF values are removed.

**Automated expiry.** None. A saved timeline is never automatically aged out,
cleared or rewritten, however old it is.

**Automated retention job.** None.

**Database/platform backups.** Retention behaviour is NOT ESTABLISHED BY
REPOSITORY TRUTH. This must not be described to users without separate
verification with the hosting/database platform.

---

## 8. Data not exposed elsewhere (verified boundaries)

IVF transfer values added to:

| Surface | Present? |
| --- | --- |
| URL | NO |
| Query parameters | NO |
| URL hash | NO |
| localStorage | NO |
| sessionStorage | NO |
| Cookies | NO |
| Authentication metadata | NO |
| Analytics | NO |
| General application logs | NO |
| Companion context | NO |
| AI context | NO |
| AI grounding | NO |

---

## 9. Authentication handoff

The app signs people in with Google OAuth and magic-link email through a
full-page `/auth` flow.

Values entered before signing in cannot safely survive that redirect without
placing treatment data into browser storage or a URL, which is prohibited by the
boundaries in section 8.

Accepted product decision: **signed-out re-entry**.

1. the person calculates their timeline
2. they choose `Sign in to save`
3. they sign in
4. they return to `/ivf-timeline`
5. they re-enter transfer date and type
6. they explicitly save

No hidden temporary storage of treatment data is used at any point.

---

## 10. Current privacy notice finding

The current `/privacy` page covers saved journey information, AI, analytics,
user choices and general retention.

A repository audit found that it does not specifically describe:

- embryo transfer date
- embryo transfer type
- IVF timeline persistence

PRIVACY NOTICE COVERAGE GAP IDENTIFIED = YES

PRIVACY NOTICE CHANGE REQUIRED = FOR HUMAN REVIEWER TO DECIDE

No claim is made here that a change is legally required.

---

## 11. Proposed visitor copy

**PROPOSED / NOT YET HUMAN-APPROVED.** Every line below is built but unreleased
and may be changed or rejected by the reviewer.

### Signed out

- Heading: `Want to keep this timeline?`
- Body: `Sign in to save your IVF timeline to your Trying to Conceive journey. You'll return here after signing in and can re-enter your transfer details to save them.`
- Action: `Sign in to save`

### First save

- Action: `Save my timeline`
- Body: `Save your embryo transfer date and transfer type to your Trying to Conceive journey so you can return to this timeline later.`
- Supporting line: `Calculated milestones are not stored.`
- Optional supporting line, for reviewer decision: `You can remove these saved details from your timeline later.`

### Saved

- Heading: `Timeline saved`

### Update

- Action: `Update saved timeline`
- Body: `This will replace the transfer details currently saved to your TTC journey.`

### Remove

- Action: `Remove saved timeline`
- Confirmation heading: `Remove your saved IVF timeline?`
- Confirmation body: `This removes your saved embryo transfer date and transfer type from your Trying to Conceive journey. It won't delete your TTC journey or your other answers.`
- Confirmation actions: `Cancel` / `Remove saved timeline`

---

## 12. Reviewer decisions

Reviewer name: ________________________

Role / organisation: ________________________

Review date: ________________________

### A. Privacy notice

Does the privacy notice need amendment before activation? YES / NO

If YES, approved wording:

________________________________________

### B. Save experience copy

Is the proposed Save / Update / Remove wording approved?
YES / NO / APPROVED WITH CHANGES

Required changes:

________________________________________

### C. Lawful processing position

Please confirm the appropriate lawful processing basis/position for this feature:

________________________________________

### D. Health / special-category considerations

Does storing embryo transfer date and type require any additional requirements
because of the nature of the information? YES / NO

If YES, required controls:

________________________________________

### E. Explicit consent

Is explicit consent required before storing these values? YES / NO

If YES, required wording/interaction:

________________________________________

If YES, activation remains blocked and a new implementation phase is required.

### F. Retention

Is the current model acceptable — values remain until explicitly removed, the
Trying to Conceive journey is deleted, or the account is deleted?
YES / NO / CHANGE REQUIRED

Approved user-facing retention wording:

________________________________________

### G. Deletion

Is the documented removal/deletion behaviour and proposed wording acceptable?
YES / NO / CHANGE REQUIRED

Approved wording:

________________________________________

### H. Backup retention

Does backup retention need to be disclosed or otherwise addressed before
activation? YES / NO / PLATFORM INFORMATION REQUIRED

Notes:

________________________________________

### I. Additional privacy documentation

Is any additional assessment or documentation required before launch
(for example a privacy-impact assessment, if the reviewer considers one
necessary)? YES / NO

Required item:

________________________________________

### J. Final approval

IVF timeline saving may be activated: YES / NO

Conditions:

________________________________________

---

## 13. Status of this pack

| Field | Value |
| --- | --- |
| Human reviewer | NOT PROVIDED |
| Human review date | NOT PROVIDED |
| Privacy/legal approval | NO |
| Lawful processing position | NOT PROVIDED |
| Special-category requirements | NOT PROVIDED |
| Explicit consent requirement | NOT PROVIDED |
| Retention wording approved | NOT PROVIDED |
| Deletion wording approved | NOT PROVIDED |
| Save copy approved | NOT PROVIDED |
| Additional privacy-impact requirement | NOT PROVIDED |
| Feature activated | NO |
| READY TO ACTIVATE | NO |
