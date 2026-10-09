import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import {
  isServiceRoleBearer,
  readRetentionDays,
  readVerifiedTokenWindow,
  runWorker,
} from "../_shared/accountDeletion.ts";
import { createN10Runtime, n10Log } from "../_shared/accountDeletionRuntime.ts";

// N10 Candidate E durable worker (frozen D4/D10/D12/D13). Invoked every minute by pg_cron + pg_net
// (migration n10_account_deletion_worker_schedule) with the service-role JWT held in Vault.
// verify_jwt = true at the gateway plus an explicit service_role claim check, as for process-email-queue.
// Claims due requests with SKIP LOCKED and a lease; the database is authoritative for every transition.

const jsonResponse = (body: Record<string, unknown>, status: number) =>
  new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json", "Cache-Control": "no-store" } });

serve(async (req) => {
  if (req.method !== "POST") return jsonResponse({ error: "Method not allowed" }, 405);
  if (!isServiceRoleBearer(req.headers.get("Authorization"))) return jsonResponse({ error: "Forbidden" }, 403);

  const runtime = createN10Runtime();
  if (!runtime) {
    n10Log.error("n10_config_invalid", { reason: "runtime_unavailable" });
    return jsonResponse({ error: "Server configuration error" }, 503);
  }
  try {
    const tokenWindow = readVerifiedTokenWindow((name) => Deno.env.get(name));
    const retentionDays = readRetentionDays((name) => Deno.env.get(name));
    const { processed, results } = await runWorker(runtime.deps, { tokenWindow, retentionDays });
    n10Log.info("n10_worker_run", { processed, token_window_ok: tokenWindow.ok, retention_configured: retentionDays !== null });
    return jsonResponse({ processed, states: results }, 200);
  } catch {
    n10Log.error("n10_worker_run_failed", { phase: "run" });
    return jsonResponse({ error: "Worker run failed" }, 500);
  } finally {
    await runtime.close();
  }
});
