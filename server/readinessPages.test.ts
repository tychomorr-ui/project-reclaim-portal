import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";

vi.mock("wouter", () => ({ Link: ({ children, href, ...props }: { children: React.ReactNode; href: string }) => React.createElement("a", { href, ...props }, children), useLocation: () => ["/skills", vi.fn()] }));

import Readiness from "../client/src/pages/Readiness";
import Skills from "../client/src/pages/Skills";

describe("Project Reclaim skills and readiness pages", () => {
  it("renders the carpentry, life-skills, and transparent enterprise pathways", () => {
    const markup = renderToStaticMarkup(React.createElement(Skills));
    expect(markup).toContain("Hand-tool carpentry apprenticeship");
    expect(markup).toContain("Life and workplace skills");
    expect(markup).toContain("Independent contracts");
    expect(markup).toContain("Future enterprise lanes");
  });

  it("renders clinical, privacy, justice, and professional-review boundaries", () => {
    const markup = renderToStaticMarkup(React.createElement(Readiness));
    expect(markup).toContain("Clinical scope &amp; licensure");
    expect(markup).toContain("Privacy &amp; consent");
    expect(markup).toContain("Justice and corrections agreements");
    expect(markup).toContain("Project Reclaim is not currently presenting itself as a treatment provider.");
  });
});
