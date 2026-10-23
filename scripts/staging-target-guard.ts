// Staging target guard for operational tooling (CLI wrappers, rehearsal harnesses, scripts).
//
// Allows exactly the permanent staging project. Denies the historical backend and every retired
// rehearsal project, and rejects any other ref-shaped token, so a typo or a pasted URL cannot
// redirect a remote operation. A future production guard is deliberately separate (Gate 7+).
import { FORBIDDEN_PROJECT_REFS, STAGING_PROJECT_REF } from "./backend-environments";

const REF_TOKEN = /(?<![a-z])[a-z]{20}(?![a-z])/g;

/** Throws unless `target` (a ref, URL, host, pooler user or connection description) names only staging. */
export function assertStagingTarget(target: string): true {
  const text = String(target ?? "");
  const lower = text.toLowerCase();
  for (const forbidden of FORBIDDEN_PROJECT_REFS) {
    if (lower.includes(forbidden)) throw new Error(`[staging-guard] refused: ${forbidden} is historical or retired`);
  }
  if (!lower.includes(STAGING_PROJECT_REF)) {
    throw new Error("[staging-guard] refused: target does not name the tsoy-staging project");
  }
  for (const token of lower.match(REF_TOKEN) ?? []) {
    if (token !== STAGING_PROJECT_REF) throw new Error(`[staging-guard] refused: unexpected ref-shaped token ${token}`);
  }
  return true;
}
