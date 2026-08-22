import { describe, it, expect } from "vitest";
import { splitTTCLogsByCycle, type TTCLog } from "@/lib/ttcLogs";

const log = (date: string): TTCLog => ({
  id: date,
  journey_id: "j",
  user_id: "u",
  log_date: date,
  log_type: "note",
  value: null,
  notes: null,
  created_at: date,
  updated_at: date,
});

describe("splitTTCLogsByCycle", () => {
  it("keeps logs on or after the cycle start in this cycle", () => {
    const logs = [log("2026-08-20"), log("2026-08-10"), log("2026-07-30")];
    const { thisCycle, earlier } = splitTTCLogsByCycle(logs, "2026-08-10");
    expect(thisCycle.map((l) => l.log_date)).toEqual(["2026-08-20", "2026-08-10"]);
    expect(earlier.map((l) => l.log_date)).toEqual(["2026-07-30"]);
  });

  it("treats every log as current when no cycle start is known", () => {
    const logs = [log("2026-08-20")];
    expect(splitTTCLogsByCycle(logs, null)).toEqual({ thisCycle: logs, earlier: [] });
  });

  it("handles an empty history", () => {
    expect(splitTTCLogsByCycle([], "2026-08-10")).toEqual({ thisCycle: [], earlier: [] });
  });
});
