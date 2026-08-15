import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";

vi.mock("wouter", () => ({ Link: ({ children, href, ...props }: { children: React.ReactNode; href: string }) => React.createElement("a", { href, ...props }, children), useLocation: () => ["/explore", vi.fn()] }));

import Explore from "../client/src/pages/Explore";
import OperatingModel from "../client/src/pages/OperatingModel";
import MetaCompound from "../client/src/pages/MetaCompound";

describe("compound upgrade public pages", () => {
  it("renders the central Explore operating map with real destinations", () => {
    const html = renderToStaticMarkup(React.createElement(Explore));
    expect(html).toContain("One operating map for the work, the people, the land, and the proof.");
    expect(html).toContain("/operating-model");
    expect(html).toContain("/projects");
    expect(html).toContain("/provenance");
    expect(html).toContain("/meta-compound");
    expect(html).toContain("Operating map in progress");
  });

  it("renders the meta-compound dimensions with real destinations and release discipline", () => {
    const html = renderToStaticMarkup(React.createElement(MetaCompound));
    expect(html).toContain("One operating map. Many dimensions of capability.");
    expect(html).toContain("Vineyard-style residential and land-stewardship campus");
    expect(html).toContain("3360 Old Highway 53 operations");
    expect(html).toContain("Oregon launch readiness");
    expect(html).toContain("Pending authorization");
    expect(html).toContain("/provenance");
    expect(html).toContain("/partnerships");
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
