/**
 * Test stub for the Deno std http `serve` import used by the edge functions.
 * Importing an edge function under Vitest captures its handler here so the
 * request flow can be exercised without a Deno runtime.
 */
export type EdgeHandler = (req: Request) => Response | Promise<Response>;

let captured: EdgeHandler | null = null;

export const serve = (handler: EdgeHandler) => {
  captured = handler;
};

export const capturedHandler = (): EdgeHandler => {
  if (!captured) throw new Error("No edge function handler was registered.");
  return captured;
};
