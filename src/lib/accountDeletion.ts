// Client-side reading of the delete-account response contract (N10.2A, H2).
// 200 = the account deletion is confirmed committed during the request (media cleanup removed or
// continuing). It never means the durable workflow has completed.
// 202 = request durably accepted; deletion continuing. 410 = already deleted. A known 5xx = failed
// (nothing was deleted); no HTTP status (network failure) = unknown, so no claim is made either way.
// Client sign-out is UX only: the security boundary is Storage RLS plus the deleted Auth user.

export type AccountDeletionOutcome =
  | { kind: "deleted"; cleanup: "removed" | "continuing" }
  | { kind: "accepted" }
  | { kind: "already_deleted" }
  | { kind: "failed" }
  | { kind: "unknown" };

type InvokeError = { context?: { status?: number } } | null | undefined;

export function interpretDeleteAccountResult(data: unknown, error: InvokeError): AccountDeletionOutcome {
  if (error) {
    const status = error.context?.status;
    if (status === 410) return { kind: "already_deleted" };
    // A known 5xx means the server did not delete anything (frozen contract); no status means unknown.
    if (typeof status === "number" && status >= 500) return { kind: "failed" };
    return { kind: "unknown" };
  }
  const body = (data ?? {}) as { status?: unknown; cleanup?: unknown };
  if (body.status === "account_deleted") {
    return { kind: "deleted", cleanup: body.cleanup === "removed" ? "removed" : "continuing" };
  }
  if (body.status === "deletion_in_progress") return { kind: "accepted" };
  if (body.status === "already_deleted") return { kind: "already_deleted" };
  // An unrecognised success body makes no claim either way.
  return { kind: "unknown" };
}

/** True when the client should sign out locally, clear cached state and leave the account area. */
export const shouldLeaveAccount = (outcome: AccountDeletionOutcome): boolean =>
  outcome.kind === "deleted" || outcome.kind === "accepted" || outcome.kind === "already_deleted";

export function accountDeletionMessage(outcome: AccountDeletionOutcome): { title: string; description: string } {
  switch (outcome.kind) {
    case "deleted":
      return outcome.cleanup === "removed"
        ? { title: "Your account has been deleted", description: "Your photos and recordings have been removed." }
        : { title: "Your account has been deleted", description: "We're finishing removing your photos and recordings." };
    case "accepted":
      return { title: "Account deletion requested", description: "We're deleting your account now. You've been signed out." };
    case "already_deleted":
      return { title: "This account has already been deleted", description: "You've been signed out." };
    case "failed":
      return {
        title: "We couldn't delete your account",
        description: "Nothing has been deleted. Please try again later, or contact us if this keeps happening.",
      };
    case "unknown":
      return {
        title: "We couldn't confirm your account deletion",
        description: "Please check your connection and try again in a few minutes.",
      };
  }
}
