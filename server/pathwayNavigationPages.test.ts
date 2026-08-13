import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";

vi.mock("wouter", () => ({ Link: ({ children, href, ...props }: { children: React.ReactNode; href: string }) => React.createElement("a", { href, ...props }, children), useLocation: () => ["/skills", vi.fn()] }));

import { resetWindowScroll } from "../client/src/components/PortalChrome";
import Provenance from "../client/src/pages/Provenance";
import ResidentialReadiness from "../client/src/pages/ResidentialReadiness";
import Roadmap from "../client/src/pages/Roadmap";
import Skills from "../client/src/pages/Skills";

describe("Project Reclaim pathway navigation and readiness pages", () => {
  it("resets internal navigation to the top of the destination page", () => {
    const scrollTo = vi.fn();
    resetWindowScroll({ scrollTo } as unknown as Pick<Window, "scrollTo">);
    expect(scrollTo).toHaveBeenCalledWith(0, 0);
  });

  it("renders detailed skills, residential, provenance, and roadmap boundaries without active-program claims", () => {
    const skills = renderToStaticMarkup(React.createElement(Skills));
    const residential = renderToStaticMarkup(React.createElement(ResidentialReadiness));
    const provenance = renderToStaticMarkup(React.createElement(Provenance));
    const roadmap = renderToStaticMarkup(React.createElement(Roadmap));
    expect(skills).toContain("Click a pathway to explore it");
    expect(skills).toContain("A portfolio is not automatically a degree");
    expect(residential).toContain("This is a readiness pathway—not active housing or a licensed residential program.");
    expect(residential).toContain("all adults");
    expect(provenance).toContain("It is not currently connected to UniversalTruth");
    expect(provenance).toContain("Local readiness is active. External verification is not.");
    expect(roadmap).toContain("Foundation in place");
    expect(roadmap).toContain("Non-custodial provenance bridge");
  });
});
