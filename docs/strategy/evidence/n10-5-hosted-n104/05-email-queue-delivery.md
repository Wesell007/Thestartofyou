# 05 — E-mail queue delivery

**Result: HOLD — LOVABLE MANAGED PROJECT CREDENTIAL UNAVAILABLE IN DISPOSABLE PROJECT.**

`LOVABLE_API_KEY` is a Lovable-managed project secret created automatically by Lovable for the production project; it is not an owner-managed value that can be copied into a disposable Supabase project. By owner instruction it was not exposed, not retrieved from production, and not substituted with a generic workspace key. No delivery was attempted or claimed.

What **was** proven on hosted Supabase (04): the e-mail cron sends only the URL, `Content-Type`, `X-Email-Queue-Token` and `{}`; `process-email-queue` rejects every request without the invocation token and accepts the correct token (it then stops at the missing provider key with a generic 500). Delivery through the provider must be proven at controlled activation (production smoke test) or in a rehearsal with an owner-approved Lovable-provisioned project.

Later option (not pursued; needs owner approval): a fresh disposable **Lovable** project would receive its own Lovable-managed `LOVABLE_API_KEY` and could run this proof without reusing production credentials.
