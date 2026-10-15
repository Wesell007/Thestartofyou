// N10 runtime wiring for Deno Edge Functions (not imported by Vitest or the app build).
// - Database: dedicated least-privilege role through N10_DB_URL only (D9 / N10-E13). No fallback to
//   SUPABASE_DB_URL. Transaction-pooler compatible: prepared statements off, one short-lived connection.
// - Auth and Storage admin clients use the service-role key with no user session (N10-E17).
// - Operator alerts (N10.4) go through the provider-neutral OperatorNotifier; the provider adapter is
//   isolated in operatorAlertProvider.ts and is called directly from this runtime — never through
//   pg_net or the e-mail queue.
// - Analytics-identity erasure (D14.1 / M7) goes through the provider-neutral AnalyticsEraser; the
//   provider adapter is isolated in analyticsErasureProvider.ts, reads its backend-only secrets here and
//   is called directly from this runtime — never through pg_net. Missing secrets fail closed (null).
import postgres from "npm:postgres@3.4.5";
import { createClient } from "npm:@supabase/supabase-js@2.49.4";
import {
  createLoggingAlertHook,
  createN10Db,
  isDedicatedRoleUrl,
  type AnalyticsEraser,
  type N10Deps,
  type N10Logger,
  type OperatorNotifier,
} from "./accountDeletion.ts";
import { createConfiguredOperatorNotifier } from "./operatorAlertProvider.ts";
import { createAnalyticsEraserFromEnv } from "./analyticsErasureProvider.ts";

export const n10Log: N10Logger = {
  info: (event, fields) => console.log(JSON.stringify({ event, ...fields })),
  error: (event, fields) => console.error(JSON.stringify({ event, ...fields })),
};

export type N10Runtime = { deps: N10Deps; close: () => Promise<void>; notifier?: OperatorNotifier; analyticsEraser: AnalyticsEraser | null };

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
  return {
    deps,
    close: () => sql.end({ timeout: 5 }),
    notifier: createConfiguredOperatorNotifier(),
    analyticsEraser: createAnalyticsEraserFromEnv((name) => Deno.env.get(name), fetch),
  };
}
