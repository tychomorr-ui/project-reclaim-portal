import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { readFileSync } from "node:fs";
import { describe, expect, it, vi } from "vitest";

vi.mock("wouter", () => ({
  Link: ({
    children,
    href,
    ...props
  }: {
    children: React.ReactNode;
    href: string;
  }) => React.createElement("a", { href, ...props }, children),
  useLocation: () => ["/pharo-lapse", vi.fn()],
}));

import PharoLapse from "../client/src/pages/PharoLapse";

const appSource = readFileSync(
  new URL("../client/src/App.tsx", import.meta.url),
  "utf8"
);
const nexusSource = readFileSync(
  new URL("../client/src/pages/Nexus.tsx", import.meta.url),
  "utf8"
);
const homeSource = readFileSync(
  new URL("../client/src/pages/Home.tsx", import.meta.url),
  "utf8"
);
const charterAsset =
  "/manus-storage/NEXINUS_ECOSYSTEM_CANONICAL_OPERATING_CHARTER_031b5f6b.pdf";

describe("Pharo-Lapse public positioning route", () => {
  it("renders the evidence-bound public positioning page", () => {
    const markup = renderToStaticMarkup(React.createElement(PharoLapse));

    expect(markup).toContain(
      "Pharo-Lapse keeps messages moving when ordinary connectivity cannot."
    );
    expect(markup).toContain("Development &amp; testing");
    expect(markup).toContain("This is not a claimed public-safety deployment.");
    expect(markup).toContain(
      "not a completed countywide public-safety network"
    );
    expect(markup).toContain(
      "Local-first is the verified baseline. Connected operations are a target state."
    );
    expect(markup).toContain(
      "Configured peers and authorized operating scope."
    );
  });

  it("keeps the route and ecosystem entry point wired", () => {
    expect(appSource).toContain('path="/pharo-lapse" component={PharoLapse}');
    expect(nexusSource).toContain('href="/pharo-lapse"');
    expect(nexusSource).toContain("Read the full public positioning");
    expect(nexusSource).toContain(
      'aria-label="Read the Pharo-Lapse public positioning document"'
    );
    expect(nexusSource).toMatch(/>\s*Document\s*<\/span>/);
    expect(nexusSource).toContain("hover:-translate-y-0.5");
    expect(nexusSource).toContain("hover:shadow-md");
    expect(nexusSource).toContain("group-hover:translate-x-0.5");
  });

  it("keeps the homepage charter download CTA pointed at the canonical PDF asset", () => {
    expect(homeSource).toContain("Download the charter PDF");
    expect(homeSource).toContain(charterAsset);
  });

  it("keeps the Pharo-Lapse page charter download pointed at the same asset", () => {
    const markup = renderToStaticMarkup(React.createElement(PharoLapse));
    expect(markup).toContain(`href="${charterAsset}"`);
    expect(markup).toContain("Download charter PDF");
  });
});
