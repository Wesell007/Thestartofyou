# N10.1 — 06 R3: ownership columns after Auth deletion

Read-only SELECT on `storage.objects` after R1 (`raw/04a`): `owner` = `b99b0708-6f47-474e-bab1-c546fe66fd35` and `owner_id` = `b99b0708-6f47-474e-bab1-c546fe66fd35`.

**Result: both ownership columns keep the deleted user's id.** Nothing nulls or reassigns them. The id now refers to no Auth user, so any purge must find objects by folder prefix and/or the retained `owner_id`, never by joining to `auth.users`.
