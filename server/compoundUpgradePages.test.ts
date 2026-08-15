import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";

vi.mock("wouter", () => ({ Link: ({ children, href, ...props }: { children: React.ReactNode; href: string }) => React.createElement("a", { href, ...props }, children), useLocation: () => ["/explore", vi.fn()] }));

import Explore from "../client/src/pages/Explore";
import OperatingModel from "../client/src/pages/OperatingModel";

describe("compound upgrade public pages", () => {
  it("renders the central Explore operating map with real destinations", () => {
    const html = renderToStaticMarkup(React.createElement(Explore));
    expect(html).toContain("One operating map for the work, the people, the land, and the proof.");
    expect(html).toContain("/operating-model");
    expect(html).toContain("/projects");
    expect(html).toContain("/provenance");
    expect(html).toContain("Operating map in progress");
  });

  it("keeps the two-site model planning-only and source-safe", () => {
    const html = renderToStaticMarkup(React.createElement(OperatingModel));
    expect(html).toContain("Vineyard-style residential campus");
    expect(html).toContain("3360 Old Highway 53, Clearlake");
    expect(html).toContain("Planning candidate");
    expect(html).toContain("not a claim that either candidate is secured");
    expect(html).toContain("Property control or written access");
    expect(html).toContain("/field-pilot");
  });
});
