import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "npm:@supabase/supabase-js@2.49.4";
import {
  isDeletedUserError,
  readVerifiedTokenWindow,
  RESPONSES,
  runDeleteAccount,
  type DeleteAccountResponse,
} from "../_shared/accountDeletion.ts";
import { createN10Runtime, n10Log } from "../_shared/accountDeletionRuntime.ts";

// N10 Candidate E (frozen contract: docs/strategy/n10-candidate-e-account-first-deletion-architecture.md).
// Account first, media second. This function never removes Storage objects before the database has
// confirmed the Auth user is gone; the durable request row, not this HTTP request, owns correctness.

const allowedOrigins = new Set([
  "https://thestartofyou.com",
  "https://www.thestartofyou.com",
  "http://localhost:8080",
  ...(Deno.env.get("ALLOWED_ORIGINS") ?? "").split(",").map((value) => value.trim()).filter(Boolean),
]);

const headersFor = (req: Request) => {
  const origin = req.headers.get("origin");
  const headers: Record<string, string> = {
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Cache-Control": "no-store",
    "X-Content-Type-Options": "nosniff",
    Vary: "Origin",
  };
  if (origin && allowedOrigins.has(origin)) headers["Access-Control-Allow-Origin"] = origin;
  return headers;
};

const json = (req: Request, body: Record<string, unknown>, status: number) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...headersFor(req), "Content-Type": "application/json" },
  });

const respond = (req: Request, r: DeleteAccountResponse) => json(req, { ...r.body }, r.httpStatus);

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { status: 204, headers: headersFor(req) });
  if (req.method !== "POST") return json(req, { error: "Method not allowed." }, 405);

  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const anonKey = Deno.env.get("SUPABASE_ANON_KEY");
  const authorization = req.headers.get("authorization");
  if (!supabaseUrl || !anonKey) return respond(req, RESPONSES.unavailable());
  if (!authorization?.startsWith("Bearer ")) return json(req, { error: "Authentication required." }, 401);

  const body = await req.json().catch(() => null);
  if (!body || typeof body !== "object" || (body as { confirmed?: unknown }).confirmed !== true) {
    return json(req, { error: "Deletion must be explicitly confirmed." }, 400);
  }

  // Fail closed before anything durable happens: the verified token window and the dedicated
  // database role are both required to run the account-first workflow.
  const tokenWindow = readVerifiedTokenWindow((name) => Deno.env.get(name));
  if (!tokenWindow.ok) {
    n10Log.error("n10_config_invalid", { reason: tokenWindow.reason });
    return respond(req, RESPONSES.unavailable());
  }
  const runtime = createN10Runtime();
  if (!runtime) {
    n10Log.error("n10_config_invalid", { reason: "runtime_unavailable" });
    return respond(req, RESPONSES.unavailable());
  }

  try {
    // Caller identity from the caller's own token (this client is never used for admin work).
    const caller = createClient(supabaseUrl, anonKey, {
      global: { headers: { Authorization: authorization } },
      auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false },
    });
    const { data: userData, error: userError } = await caller.auth.getUser();
    if (userError || !userData.user) {
      if (isDeletedUserError(userError as { status?: number; code?: string; message?: string } | null)) {
        return respond(req, RESPONSES.gone());
      }
      return json(req, { error: "Authentication required." }, 401);
    }

    const result = await runDeleteAccount(runtime.deps, {
      userId: userData.user.id,
      tokenWindowSeconds: tokenWindow.seconds,
    });
    return respond(req, result);
  } finally {
    await runtime.close();
  }
});
