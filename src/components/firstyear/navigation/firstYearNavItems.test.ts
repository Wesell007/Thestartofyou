import { describe, expect, it } from "vitest";
import {
  FIRST_YEAR_NAV_ITEMS,
  isNavItemActive,
} from "@/components/firstyear/navigation/firstYearNavItems";

describe("First Year navigation items", () => {
  it("lists only the signed-in First Year routes that already exist", () => {
    expect(FIRST_YEAR_NAV_ITEMS.map((item) => item.href)).toEqual([
      "/my-first-year",
      "/my-first-year/today",
      "/my-first-year/memories",
    ]);
    expect(FIRST_YEAR_NAV_ITEMS.map((item) => item.label)).toEqual([
      "Home",
      "Today",
      "Memories",
    ]);
  });

  it("does not offer a guidance or companion destination", () => {
    const ids = FIRST_YEAR_NAV_ITEMS.map((item) => item.id);
    expect(ids).not.toContain("guidance");
    expect(ids).not.toContain("ask");
    expect(FIRST_YEAR_NAV_ITEMS).toHaveLength(3);
  });

  const activeId = (pathname: string) =>
    FIRST_YEAR_NAV_ITEMS.filter((item) => isNavItemActive(pathname, item)).map((i) => i.id);

  it("marks exactly one item active per First Year route", () => {
    expect(activeId("/my-first-year")).toEqual(["home"]);
    expect(activeId("/my-first-year/today")).toEqual(["today"]);
    expect(activeId("/my-first-year/memories")).toEqual(["memories"]);
    expect(activeId("/my-first-year/memories/")).toEqual(["memories"]);
  });

  it("keeps home quiet on the deeper routes", () => {
    expect(activeId("/my-first-year/today")).not.toContain("home");
  });

  it("marks nothing active on unrelated routes", () => {
    expect(activeId("/my-week")).toEqual([]);
    expect(activeId("/first-year/sleep")).toEqual([]);
    expect(activeId("/my-pregnancy-chapter")).toEqual([]);
  });
});
