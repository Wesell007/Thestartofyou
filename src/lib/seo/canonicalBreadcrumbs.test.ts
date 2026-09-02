import { describe, expect, it } from "vitest";
import { createHash } from "node:crypto";
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const read = (p: string) => readFileSync(join(root, p), "utf8");

const TRIMESTER_FOR_HREF: Record<string, string> = {
  "/pregnancy/first-trimester": "First trimester",
  "/pregnancy/second-trimester": "Second trimester",
  "/pregnancy/third-trimester": "Third trimester",
};

describe("WC-3c canonical breadcrumb hierarchies", () => {
  const weekFiles = readdirSync(join(root, "src/pages")).filter((f) =>
    /^Week\d+Page\.tsx$/.test(f),
  );

  it("covers all 42 live week pages", () => {
    expect(weekFiles.length).toBe(42);
  });

  it("gives every live week page Home → Pregnancy → Trimester → Week N", () => {
    for (const f of weekFiles) {
      const src = read(join("src/pages", f));
      expect(src).toContain('{ label: "Home", href: "/" }');
      expect(src).toContain('{ label: "Pregnancy", href: "/pregnancy" }');
      expect(src).not.toContain('label: "Week by week"');
      const m = src.match(/\{ label: "(\w+ trimester)", href: "([^"]+)" \}/i);
      expect(m).toBeTruthy();
      expect(TRIMESTER_FOR_HREF[m![2]]).toBe(m![1]);
    }
  });

  it("uses the canonical TTC journey label", () => {
    for (const f of [
      "src/components/ttc/TTCTopicPage.tsx",
      "src/components/ttc/TTCSubtopicPage.tsx",
    ]) {
      const src = read(f);
      expect(src).not.toContain("The TTC Guide");
      expect(src).toContain('{ label: "Trying to conceive", href: "/trying-to-conceive" }');
      expect(src).toContain('{ label: "Home", href: "/" }');
    }
  });

  it("starts every migrated journey family from Home", () => {
    for (const f of [
      "src/components/ivf/IVFTopicPage.tsx",
      "src/components/toddler/topic/ToddlerTopicPage.tsx",
      "src/components/toddler/age/ToddlerAgePage.tsx",
      "src/components/family/topic/FamilyTopicPage.tsx",
      "src/components/shared/HubArticleView.tsx",
      "src/components/trimester/TrimesterHero.tsx",
      "src/components/firsttri/FirstTriHero.tsx",
      "src/components/secondtri/SecondTriHero.tsx",
      "src/components/thirdtri/ThirdTriHero.tsx",
    ]) {
      expect(read(f)).toContain('{ label: "Home", href: "/" }');
    }
  });

  it("adds breadcrumbs to the newly covered families", () => {
    for (const f of [
      "src/components/pregnancy/PregnancyTopicPage.tsx",
      "src/components/firstyear/topic/FirstYearTopicPage.tsx",
      "src/components/firstyear/phase/FirstYearPhasePage.tsx",
      "src/components/firstyear/month/FirstYearMonthPage.tsx",
      "src/pages/IVFTimeline.tsx",
      "src/pages/StagePage.tsx",
    ]) {
      const src = read(f);
      expect(src).toContain("HOME_CRUMB");
      expect(src).toContain("<Breadcrumbs");
    }
  });

  it("keeps StagePage breadcrumbs limited to the confirmed TTC allowlist", () => {
    const src = read("src/pages/StagePage.tsx");
    expect(src).toContain("trying-to-conceive/understanding-your-cycle");
    expect(src).toContain("trying-to-conceive/timing-and-tracking");
    expect(src).toContain("trying-to-conceive/waiting-and-testing");
    expect(src).toContain("showBreadcrumbs &&");
  });

  it("emits no BreadcrumbList structured data yet", () => {
    for (const f of [
      "src/components/pregnancy/PregnancyTopicPage.tsx",
      "src/pages/StagePage.tsx",
      "src/components/shared/HubArticleView.tsx",
    ]) {
      expect(read(f)).not.toContain("buildBreadcrumbJsonLd");
    }
  });

  it("leaves the deferred legacy article headers byte-identical", () => {
    const hash = (p: string) => createHash("md5").update(readFileSync(join(root, p))).digest("hex");
    expect(hash("src/components/article/ArticleHeader.tsx")).toBe(
      "b5c8afcfbe2b55d1904f814b3a33ca13",
    );
    expect(hash("src/components/article/flagship/FlagshipHero.tsx")).toBe(
      "70b785b2bd292243587c431229afa7c5",
    );
  });
});
