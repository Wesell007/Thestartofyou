import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { MAX_BABIES, MIN_BABIES } from "@/components/firstyear/setup/firstYearSetupSchema";

const read = (p: string) => readFileSync(p, "utf8");
const types = read("src/integrations/supabase/types.ts");

const rowOf = (table: string): string => {
  const start = types.indexOf(`      ${table}: {`);
  const rowStart = types.indexOf("Row: {", start);
  return types.slice(rowStart, types.indexOf("}", rowStart));
};

describe("Phase 41A objective facts (read-only)", () => {
  it("pregnancy journey has no plurality field", () => {
    const row = rowOf("pregnancy_journeys");
    expect(row).toContain("lmp_date");
    expect(row).toContain("status");
    expect(row).not.toMatch(/baby_count|multiple|plurality|fetus/);
  });

  it("babies are user-owned with birth order and primary flag, no pregnancy link", () => {
    const row = rowOf("babies");
    for (const f of ["user_id", "birth_order", "is_primary", "date_of_birth"]) expect(row).toContain(f);
    expect(row).not.toMatch(/pregnancy/);
  });

  it("First Year UI allows one to four babies", () => {
    expect(MIN_BABIES).toBe(1);
    expect(MAX_BABIES).toBe(4);
  });

  it("reflections have no pregnancy key", () => {
    expect(rowOf("reflections")).not.toMatch(/pregnancy/);
  });

  it("Companion baby selection keeps its ambiguity rule", () => {
    const src = read("src/lib/companion/journeyPersonalSource.ts");
    expect(src).toContain("primaries.length === 1");
    expect(src).toContain('!== "active"');
  });

  it("setup routes present", () => {
    const app = read("src/App.tsx");
    for (const p of ["/setup/pregnancy", "/setup/first-year", "/due-date-calculator", "/due-date-results"]) {
      expect(app).toContain(`path="${p}"`);
    }
  });
});
