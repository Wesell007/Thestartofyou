import { describe, it, expect, vi } from "vitest";
import { render, screen, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { readFileSync } from "fs";
import path from "path";

vi.mock("@/components/layout/Navbar", () => ({ default: () => null }));
vi.mock("@/components/layout/Footer", () => ({ default: () => null }));
vi.mock("@/components/seo/SeoHead", () => ({ default: () => null }));

import About from "@/pages/About";

const renderAbout = () =>
  render(
    <MemoryRouter>
      <About />
    </MemoryRouter>,
  );

// Claims, not keywords: each pattern is a specific unsupported present-tense claim.
const PROHIBITED_CLAIMS: RegExp[] = [
  /remembers you across (every|each|all) stages?/i,
  /context (automatically )?follows you (automatically )?(between|across|from)/i,
  /we remember what matters to you/i,
  /previous conversations follow you/i,
  /journal and (the )?companion remember/i,
  /(our )?ai (answers )?(is|are) grounded in nhs/i,
  /every answer is based on nhs/i,
  /(physical and digital|digital and physical) journals? work together/i,
  /first ai parenting companion/i,
  /everything parents need/i,
  /\b7 journey stages\b/i,
  /\b50\+ (structured )?guides\b/i,
];

describe("Phase 40B About claims governance", () => {
  it("contains none of the prohibited current-capability claims", () => {
    const { container } = renderAbout();
    const text = container.textContent ?? "";
    for (const claim of PROHIBITED_CLAIMS) expect(text).not.toMatch(claim);
  });

  it("allows valid belief and problem-framing language", () => {
    renderAbout();
    expect(screen.getByRole("heading", { name: /short of continuity/i })).toBeInTheDocument();
  });

  it("keeps future capabilities inside the labelled future section with explicit framing", () => {
    renderAbout();
    const future = screen.getByTestId("about-future-direction");
    const f = within(future);
    expect(f.getByText(/what we're building toward/i)).toBeInTheDocument();
    expect(f.getByText(/we are building toward a product that can carry the context you choose/i)).toBeInTheDocument();
    expect(f.getByRole("heading", { name: "Memory that belongs to you" })).toBeInTheDocument();
    expect(f.getByRole("heading", { name: "Continuity with permission" })).toBeInTheDocument();
    expect(f.getByText(/not all of this is live today/i)).toBeInTheDocument();
  });

  it("describes the physical journal as separate today", () => {
    renderAbout();
    expect(screen.getByText(/physical and digital experiences are separate today/i)).toBeInTheDocument();
  });

  it("does not imply Toddler, Family or IVF are saved journeys", () => {
    const { container } = renderAbout();
    expect(container.textContent).not.toMatch(/save (your )?(toddler|family|ivf) journey/i);
    expect(container.textContent).not.toMatch(/(toddler|family|ivf) (saved )?journey tracker/i);
  });

  it("uses canonical destinations", () => {
    renderAbout();
    const hrefs = screen.getAllByRole("link").map((a) => a.getAttribute("href"));
    expect(hrefs.filter((h) => h === "/start-your-journey")).toHaveLength(2);
    expect(hrefs).toContain("/journal");
    expect(hrefs).toContain("#why-we-exist");
    expect(hrefs).not.toContain("/product");
  });

  it("keeps the /about route registered", () => {
    const app = readFileSync(path.resolve(__dirname, "../App.tsx"), "utf8");
    expect(app).toMatch(/path="\/about" element={<About \/>}/);
  });
});
