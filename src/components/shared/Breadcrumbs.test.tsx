import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Breadcrumbs from "./Breadcrumbs";
import type { BreadcrumbItem } from "@/lib/seo/breadcrumbs";

const items: BreadcrumbItem[] = [
  { label: "Home", href: "/" },
  { label: "Pregnancy", href: "/pregnancy" },
  { label: "Your body", href: "/pregnancy/body" },
];

const renderCrumbs = (props: Partial<React.ComponentProps<typeof Breadcrumbs>> = {}) =>
  render(
    <MemoryRouter>
      <Breadcrumbs items={items} {...props} />
    </MemoryRouter>,
  );

describe("Breadcrumbs", () => {
  it("renders a labelled navigation landmark with an ordered list", () => {
    const { container } = renderCrumbs();
    expect(screen.getByRole("navigation", { name: "Breadcrumb" })).toBeTruthy();
    expect(container.querySelector("ol")).toBeTruthy();
  });

  it("links earlier items and does not link the current page", () => {
    renderCrumbs();
    expect(screen.getByRole("link", { name: "Home" })).toBeTruthy();
    expect(screen.getByRole("link", { name: "Pregnancy" })).toBeTruthy();
    expect(screen.queryByRole("link", { name: "Your body" })).toBeNull();
  });

  it("marks the current page with aria-current", () => {
    renderCrumbs();
    expect(screen.getByText("Your body").getAttribute("aria-current")).toBe("page");
  });

  it("hides separators from assistive technology", () => {
    const { container } = renderCrumbs();
    const separators = container.querySelectorAll('li[aria-hidden="true"]');
    expect(separators.length).toBe(items.length - 1);
  });

  it("renders both tones", () => {
    renderCrumbs({ tone: "section" });
    expect(screen.getByRole("navigation", { name: "Breadcrumb" })).toBeTruthy();
  });

  it("handles a single item and empty input safely", () => {
    const single = render(
      <MemoryRouter>
        <Breadcrumbs items={[{ label: "Only", href: "/only" }]} />
      </MemoryRouter>,
    );
    expect(single.queryByRole("link")).toBeNull();

    const empty = render(
      <MemoryRouter>
        <Breadcrumbs items={[]} />
      </MemoryRouter>,
    );
    expect(empty.queryByRole("navigation")).toBeNull();
  });
});
