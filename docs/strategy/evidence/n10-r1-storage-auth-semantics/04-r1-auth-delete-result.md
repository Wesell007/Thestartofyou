# N10.1 — 04 R1: hard Auth deletion while the user owns a Storage object

**Single attempt (`raw/04a`):**

- Call: `DELETE /auth/v1/admin/users/b99b0708-…` with the service-role key and body `{"should_soft_delete": false}`, which is how `auth.admin.deleteUser(userId)` sends it.
- Started 2026-10-09T05:07:18.401Z; took 0.144 s. A's object was left untouched beforehand.

| Observation | Result |
|---|---|
| HTTP | **200**, body `{}` |
| A in Auth | **absent**: admin GET returns 404; `auth.users` now holds only C |
| A's object | still present (see `05`) |
| Control C | unchanged (see `09`) |

**Result: R1 SUCCEEDS.** A user who owns a Storage object (`owner_id` = their id, uploaded with their own token) can be hard-deleted on hosted Supabase. **H2 is confirmed.** H1, the guide's statement that the user cannot be deleted while owning objects, does not hold on this hosted project. That matches the catalogue: there is no foreign key from Storage to `auth.users`, and Storage migration `drop-owner-foreign-key` is applied.
