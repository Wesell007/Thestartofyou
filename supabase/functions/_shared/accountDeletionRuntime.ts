// N10 runtime wiring for Deno Edge Functions (not imported by Vitest or the app build).
// - Database: dedicated least-privilege role through N10_DB_URL only (D9 / N10-E13). No fallback to
//   SUPABASE_DB_URL. Transaction-pooler compatible: prepared statements off, one short-lived connection.
// - Auth and Storage admin clients use the service-role key with no user session (N10-E17).
// - Operator alerts (N10.4) reuse the project's existing Lovable Email integration (LOVABLE_API_KEY,
//   backend-only), sent directly from this runtime — never through pg_net or the e-mail queue.
import postgres from "npm:postgres@3.4.5";
import { createClient } from "npm:@supabase/supabase-js@2.49.4";
import { sendLovableEmail } from "npm:@lovable.dev/email-js@0.3.1";
import {
  createLoggingAlertHook,
  createN10Db,
  isDedicatedRoleUrl,
  type N10Deps,
  type N10Logger,
  type OperatorNotifier,
} from "./accountDeletion.ts";

export const n10Log: N10Logger = {
  info: (event, fields) => console.log(JSON.stringify({ event, ...fields })),
  error: (event, fields) => console.error(JSON.stringify({ event, ...fields })),
};

export type N10Runtime = { deps: N10Deps; close: () => Promise<void>; notifier?: OperatorNotifier };

/** Provider adapter: structured result only; provider messages are not propagated (no secret leakage). */
export function createLovableOperatorNotifier(apiKey: string): OperatorNotifier {
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

/** Returns null (fail closed) when the dedicated database URL or admin credentials are missing. */
export function createN10Runtime(): N10Runtime | null {
  const dbUrl = Deno.env.get("N10_DB_URL");
  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  if (!dbUrl || !isDedicatedRoleUrl(dbUrl) || !supabaseUrl || !serviceKey) return null;

  const sql = postgres(dbUrl, { prepare: false, max: 1, idle_timeout: 5, connect_timeout: 10 });
  const exec = async (text: string, params: unknown[]) =>
    (await sql.unsafe(text, params as never[])) as unknown as Record<string, unknown>[];

  const admin = createClient(supabaseUrl, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false },
  });

  const deps: N10Deps = {
    db: createN10Db(exec),
    auth: {
      async deleteUser(userId) {
        const { error } = await admin.auth.admin.deleteUser(userId, false);
        return { error: error ? { status: error.status, name: error.name, message: error.message } : null };
      },
    },
    storage: {
      async remove(bucket, names) {
        const { error } = await admin.storage.from(bucket).remove(names);
        return { error: error ? { message: error.message } : null };
      },
    },
    alert: createLoggingAlertHook(n10Log),
    log: n10Log,
    now: () => Date.now(),
  };
  const lovableKey = Deno.env.get("LOVABLE_API_KEY");
  return { deps, close: () => sql.end({ timeout: 5 }), notifier: lovableKey ? createLovableOperatorNotifier(lovableKey) : undefined };
}
