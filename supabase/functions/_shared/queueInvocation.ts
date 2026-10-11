// Invocation-only authentication for pg_net-scheduled internal functions (N10.4, M5).
// Hosted pg_net exposes queued request headers to every database login role, so schedulers must never
// send a privileged credential. They send a narrow invocation secret instead; the function compares it
// (timing-resistant) before doing anything else. Self-contained so it can be shared without coupling.

export const EMAIL_QUEUE_TOKEN_HEADER = "x-email-queue-token";
const SECRET_RE = /^[A-Za-z0-9_-]{43,512}$/;

/** Constant-time comparison: no early exit; runtime depends only on the longer input's length. */
export function timingSafeEqualStrings(a: string, b: string): boolean {
  const x = new TextEncoder().encode(a);
  const y = new TextEncoder().encode(b);
  let diff = x.length ^ y.length;
  const n = Math.max(x.length, y.length);
  for (let i = 0; i < n; i++) diff |= (x[i] ?? 0) ^ (y[i] ?? 0);
  return diff === 0;
}

export type InvocationCheck = "ok" | "method_not_allowed" | "misconfigured" | "unauthorized";

/**
 * POST only; the configured secret must be at least 32 random bytes (43 base64url chars) or the check
 * fails closed as "misconfigured"; a missing or different token is "unauthorized" (generic 401).
 */
export function checkQueueInvocation(method: string, token: string | null, configuredSecret: string | undefined): InvocationCheck {
  if (method !== "POST") return "method_not_allowed";
  if (!configuredSecret || !SECRET_RE.test(configuredSecret)) return "misconfigured";
  const match = timingSafeEqualStrings(token ?? "", configuredSecret);
  return token && match ? "ok" : "unauthorized";
}
