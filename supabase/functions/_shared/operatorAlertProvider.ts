// N10 operator-alert PROVIDER ADAPTER (the only provider-specific file). Deno runtime only.
//
// Contract: export createConfiguredOperatorNotifier(): OperatorNotifier | undefined.
//   - returns undefined when the provider's own backend credential is missing (alerts then stay
//     pending and the worker logs "provider_unconfigured");
//   - the notifier returns { ok: true } or { ok: false, reason } and never throws provider messages.
// To switch provider (Hostinger, Resend, Postmark, SES, ...), replace this file's implementation only.
// Deletion state, the M4 ledger, deduplication, escalation, schema, worker orchestration and the alert
// message contract (accountDeletion.ts) do not change. Provider credentials stay separate backend
// secrets; N10_OPERATOR_ALERT_EMAIL / _FROM / N10_ENVIRONMENT stay provider-neutral.
//
// Current implementation: the project's existing Lovable Email integration (LOVABLE_API_KEY).
import { sendLovableEmail } from "npm:@lovable.dev/email-js@0.3.1";
import type { OperatorNotifier } from "./accountDeletion.ts";

export function createConfiguredOperatorNotifier(): OperatorNotifier | undefined {
  const apiKey = Deno.env.get("LOVABLE_API_KEY");
  if (!apiKey) return undefined;
  return async (m) => {
    try {
      const res = await sendLovableEmail(
        {
          to: m.to,
          from: m.from,
          subject: m.subject,
          text: m.text,
          html: m.html,
          purpose: "transactional",
          label: "n10-operator-alert",
          idempotency_key: m.idempotencyKey,
        },
        { apiKey, sendUrl: Deno.env.get("LOVABLE_SEND_URL"), idempotencyKey: m.idempotencyKey },
      );
      return res.success ? { ok: true } : { ok: false, reason: "provider_unsuccessful" };
    } catch (error) {
      const status = error && typeof error === "object" && "status" in error ? Number((error as { status: unknown }).status) : 0;
      return { ok: false, reason: `provider_error_${Number.isFinite(status) ? status : 0}` };
    }
  };
}
