import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";

vi.mock("wouter", () => ({
  Link: ({ children, href, ...props }: { children: React.ReactNode; href: string }) => React.createElement("a", { href, ...props }, children),
  useLocation: () => ["/nexus", vi.fn()],
}));

import MetaMata from "../client/src/pages/MetaMata";
import Nexus from "../client/src/pages/Nexus";

describe("Project Reclaim ecosystem pages", () => {
  it("renders the NEXINUS systems diagram with its required relationship layers", () => {
    const markup = renderToStaticMarkup(React.createElement(Nexus));

    expect(markup).toContain("Project Reclaim");
    expect(markup).toContain("Root");
    expect(markup).toContain("Site work");
    expect(markup).toContain("People &amp; pathways");
    expect(markup).toContain("Partners &amp; evidence");
    expect(markup).toContain("NEXINUS");
  });

  it("renders META-MATA safeguards, the value loop, and the source watchboard", () => {
    const markup = renderToStaticMarkup(React.createElement(MetaMata));

    expect(markup).toContain("META-MATA");
    expect(markup).toContain("People are not inputs. Capability is the point.");
    expect(markup).toContain("First value loop");
    expect(markup).toContain("Signals worth tracking—not promises being made.");
    expect(markup).toContain("CAL FIRE workforce and wood-products routes");
    expect(markup).toContain("Employment and housing coordination");
  });
});
