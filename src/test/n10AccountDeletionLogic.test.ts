import { describe, expect, it } from "vitest";
import {
  classifyAuthDelete,
  finalSweepAfterMs,
  isCanonicalMediaPath,
  isDedicatedRoleUrl,
  isDeletedUserError,
  readRetentionDays,
  readVerifiedTokenWindow,
  RESPONSES,
  RETRY_CAP_MINUTES,
  RETRY_SCHEDULE_MINUTES,
} from "../../supabase/functions/_shared/accountDeletion";
import { accountDeletionMessage, interpretDeleteAccountResult, shouldLeaveAccount } from "@/lib/accountDeletion";

// N10.3A pure logic: configuration fail-closed rules, ownership, classification, response contract.

const env = (vars: Record<string, string>) => (name: string) => vars[name];
const U = "0f0e0d0c-0b0a-4908-8706-050403020100";

describe("token window (H1 / D13, N10-E14) fails closed", () => {
  it("accepts a verified window >= 3600 s with provenance", () => {
    expect(readVerifiedTokenWindow(env({ N10_VERIFIED_TOKEN_WINDOW_SECONDS: "3600", N10_TOKEN_WINDOW_VERIFICATION: "dashboard:2026-10-09" }))).toEqual({ ok: true, seconds: 3600 });
    expect(readVerifiedTokenWindow(env({ N10_VERIFIED_TOKEN_WINDOW_SECONDS: "7200", N10_TOKEN_WINDOW_VERIFICATION: "management-api:2026-10-09" }))).toEqual({ ok: true, seconds: 7200 });
  });
  it.each([
    [{}, "token_window_missing_or_malformed"],
    [{ N10_VERIFIED_TOKEN_WINDOW_SECONDS: "1h", N10_TOKEN_WINDOW_VERIFICATION: "dashboard:2026-10-09" }, "token_window_missing_or_malformed"],
    [{ N10_VERIFIED_TOKEN_WINDOW_SECONDS: "1800", N10_TOKEN_WINDOW_VERIFICATION: "dashboard:2026-10-09" }, "token_window_below_floor"],
    [{ N10_VERIFIED_TOKEN_WINDOW_SECONDS: "604801", N10_TOKEN_WINDOW_VERIFICATION: "dashboard:2026-10-09" }, "token_window_above_maximum"],
    [{ N10_VERIFIED_TOKEN_WINDOW_SECONDS: "3600" }, "token_window_not_verified"],
    [{ N10_VERIFIED_TOKEN_WINDOW_SECONDS: "3600", N10_TOKEN_WINDOW_VERIFICATION: "trust me" }, "token_window_not_verified"],
  ])("rejects %j", (vars, reason) => {
    expect(readVerifiedTokenWindow(env(vars as Record<string, string>))).toEqual({ ok: false, reason });
  });
  it("final sweep = auth_deleted_at + max(W, 3600 s) + 15 min", () => {
    expect(finalSweepAfterMs(0, 3600)).toBe((3600 + 900) * 1000);
    expect(finalSweepAfterMs(0, 7200)).toBe((7200 + 900) * 1000);
    expect(finalSweepAfterMs(1_000, 60)).toBe(1_000 + (3600 + 900) * 1000);
  });
});

describe("dedicated database role (D9, N10-E13)", () => {
  it.each([
    ["postgresql://account_deletion_worker.abcdefghijklmnopqrst:pw@aws-0-eu-west-2.pooler.supabase.com:6543/postgres", true],
    ["postgres://account_deletion_worker:pw@localhost:54322/postgres", true],
    ["postgresql://postgres.abcdefghijklmnopqrst:pw@aws-0-eu-west-2.pooler.supabase.com:6543/postgres", false],
    ["postgresql://postgres:pw@db.abcdefghijklmnopqrst.supabase.co:5432/postgres", false],
    ["https://account_deletion_worker@example.com", false],
    ["", false],
  ])("%s -> %s", (url, ok) => {
    expect(isDedicatedRoleUrl(url || undefined)).toBe(ok);
  });
});

describe("ownership rule A (D12, N10-E18)", () => {
  it.each([
    [`${U}/20.jpg`, true],
    [`${U}/m/a/b/c/d/e/deep.jpg`, true],
    [`${U}x/not-mine.jpg`, false],
    [`x${U}/not-mine.jpg`, false],
    [`other/${U}/nested.jpg`, false],
    [`${U}`, false],
    [`/${U}/lead-slash.jpg`, false],
  ])("%s -> %s", (name, ok) => {
    expect(isCanonicalMediaPath(name, U)).toBe(ok);
  });
  it("rejects a malformed user id outright", () => {
    expect(isCanonicalMediaPath("abc/1.jpg", "abc")).toBe(false);
  });
});

describe("Auth delete classification and caller checks", () => {
  it("classifies outcomes; unknown results are resolved by the database, not the status", () => {
    expect(classifyAuthDelete(null)).toBe("ok");
    expect(classifyAuthDelete({ status: 404 })).toBe("not_found");
    expect(classifyAuthDelete({ status: 500 })).toBe("transient");
    expect(classifyAuthDelete({ status: 429 })).toBe("transient");
    expect(classifyAuthDelete({ name: "AuthRetryableFetchError" })).toBe("transient");
    expect(classifyAuthDelete({ status: 400, name: "AuthApiError" })).toBe("permanent");
  });
  it("recognises the deleted-user caller error observed in N10.1 R4", () => {
    expect(isDeletedUserError({ status: 403, code: "user_not_found", message: "User from sub claim in JWT does not exist" })).toBe(true);
    expect(isDeletedUserError({ status: 401, message: "invalid JWT" })).toBe(false);
  });
  it("retention is optional and bounded (proposed 30 days is D14-gated)", () => {
    expect(readRetentionDays(env({ N10_COMPLETED_ROW_RETENTION_DAYS: "30" }))).toBe(30);
    expect(readRetentionDays(env({}))).toBeNull();
    expect(readRetentionDays(env({ N10_COMPLETED_ROW_RETENTION_DAYS: "0" }))).toBeNull();
  });
  it("documentation mirror of the database retry schedule", () => {
    expect([...RETRY_SCHEDULE_MINUTES, RETRY_CAP_MINUTES]).toEqual([1, 2, 5, 15, 30, 60]);
  });
});

describe("H2 response contract", () => {
  it("200 means Auth deletion confirmed, never workflow completion", () => {
    expect(RESPONSES.deleted("removed")).toEqual({ httpStatus: 200, body: { status: "account_deleted", cleanup: "removed" } });
    expect(RESPONSES.deleted("continuing").body).toEqual({ status: "account_deleted", cleanup: "continuing" });
    expect(JSON.stringify(RESPONSES.deleted("removed"))).not.toMatch(/completed/);
    expect(RESPONSES.accepted()).toEqual({ httpStatus: 202, body: { status: "deletion_in_progress" } });
    expect(RESPONSES.gone().httpStatus).toBe(410);
    expect(RESPONSES.failedPreAuth()).toEqual({ httpStatus: 500, body: { status: "deletion_failed", media: "untouched" } });
    expect(RESPONSES.unavailable().httpStatus).toBe(503);
  });

  it("client reads 200/202/410 as leave-and-sign-out, 5xx as failed, no status as unknown", () => {
    const ok = interpretDeleteAccountResult({ status: "account_deleted", cleanup: "removed" }, null);
    expect(ok).toEqual({ kind: "deleted", cleanup: "removed" });
    expect(interpretDeleteAccountResult({ status: "deletion_in_progress" }, null)).toEqual({ kind: "accepted" });
    expect(interpretDeleteAccountResult(null, { context: { status: 410 } })).toEqual({ kind: "already_deleted" });
    expect(interpretDeleteAccountResult(null, { context: { status: 500 } })).toEqual({ kind: "failed" });
    expect(interpretDeleteAccountResult(null, { context: { status: 503 } })).toEqual({ kind: "failed" });
    expect(interpretDeleteAccountResult(null, {})).toEqual({ kind: "unknown" });
    expect(interpretDeleteAccountResult({ status: "something_else" }, null)).toEqual({ kind: "unknown" });
    for (const kind of ["deleted", "accepted", "already_deleted"] as const) {
      expect(shouldLeaveAccount(kind === "deleted" ? { kind, cleanup: "continuing" } : { kind })).toBe(true);
    }
    expect(shouldLeaveAccount({ kind: "failed" })).toBe(false);
    expect(shouldLeaveAccount({ kind: "unknown" })).toBe(false);
  });

  it("'Nothing has been deleted' appears only for a known server failure", () => {
    expect(accountDeletionMessage({ kind: "failed" }).description).toMatch(/Nothing has been deleted/);
    for (const o of [{ kind: "unknown" }, { kind: "accepted" }, { kind: "already_deleted" }, { kind: "deleted", cleanup: "continuing" }] as const) {
      expect(accountDeletionMessage(o).description).not.toMatch(/Nothing has been deleted/);
    }
  });
});
