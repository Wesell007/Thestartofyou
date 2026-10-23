import { describe, expect, it } from "vitest";
import { assertStagingTarget } from "../../scripts/staging-target-guard";
import { HISTORICAL_PROJECT_REFS, RETIRED_PROJECT_REFS, STAGING_PROJECT_REF } from "../../scripts/backend-environments";

const S = STAGING_PROJECT_REF;
const refuses = (target: string) => expect(() => assertStagingTarget(target)).toThrow(/staging-guard/);

describe("staging target guard", () => {
  it("allows exactly tsoy-staging in every target form", () => {
    for (const target of [S, `https://${S}.supabase.co`, `db.${S}.supabase.co`, `postgres.${S}`, `account_deletion_worker.${S}`, `--project-ref ${S}`]) {
      expect(assertStagingTarget(target)).toBe(true);
    }
  });

  it("denies the historical backend and every retired rehearsal project, alone or alongside staging", () => {
    for (const ref of [...HISTORICAL_PROJECT_REFS, ...RETIRED_PROJECT_REFS]) {
      refuses(ref);
      refuses(`https://${ref}.supabase.co`);
      refuses(`${S} ${ref}`);
      refuses(`${S} ${ref.toUpperCase()}`);
    }
  });

  it("rejects unknown ref-shaped tokens and targets that do not name staging", () => {
    refuses("");
    refuses("https://example.supabase.co");
    refuses(`${S} abcdefghijklmnopqrst`);
    refuses("https://zzzzzzzzzzzzzzzzzzzz.supabase.co");
  });
});
