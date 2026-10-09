import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { handleWorkerInvocation, WORKER_TOKEN_HEADER } from "../_shared/accountDeletion.ts";
import { createN10Runtime, n10Log } from "../_shared/accountDeletionRuntime.ts";

// N10 Candidate E durable worker (frozen D4/D10/D12/D13; N10.3A security patch M3). Invoked every
// minute by pg_cron + pg_net with ONLY an invocation-only secret in the X-N10-Worker-Token header.
// verify_jwt = false: hosted pg_net exposes queued request headers to every database login role, so
// no JWT or other privileged credential may travel that way. handleWorkerInvocation authenticates the
// token (timing-resistant) before the dedicated database connection or any privileged client opens,
// accepts no caller-selected target, and returns only {"ok":true} or a generic error.
// Due work is chosen exclusively by the database claim/lease functions.

serve(async (req) => {
  const result = await handleWorkerInvocation(
    { method: req.method, token: req.headers.get(WORKER_TOKEN_HEADER), bodyText: () => req.text() },
    (name) => Deno.env.get(name),
    createN10Runtime,
    n10Log,
  );
  return new Response(JSON.stringify(result.body), {
    status: result.httpStatus,
    headers: { "Content-Type": "application/json", "Cache-Control": "no-store" },
  });
});
