import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";

vi.mock("wouter", () => ({ Link: ({ children, href, ...props }: { children: React.ReactNode; href: string }) => React.createElement("a", { href, ...props }, children), useLocation: () => ["/support-services", vi.fn()] }));

import { ImpactMetricsDashboard } from "../client/src/components/ImpactMetricsDashboard";
import Roadmap from "../client/src/pages/Roadmap";
import { StoriesContent } from "../client/src/pages/Stories";
import SupportServices from "../client/src/pages/SupportServices";

describe("Project Reclaim impact, support, story, and roadmap pages", () => {
  it("renders explicit pending and methodology-aware impact states without public counts", () => {
    const markup = renderToStaticMarkup(React.createElement(ImpactMetricsDashboard, { metrics: [] }));
    expect(markup).toContain("Pending verification");
    expect(markup).toContain("Pending first verified record");
    expect(markup).toContain("Evidence &amp; methodology");
  });

  it("renders qualified-provider boundaries and emergency-routing language", () => {
    const markup = renderToStaticMarkup(React.createElement(SupportServices));
    expect(markup).toContain("No clinical or crisis services are being represented as active.");
    expect(markup).toContain("Project Reclaim is not an emergency or crisis-response service.");
    expect(markup).toContain("Call or text 988");
  });

  it("renders the consent-first empty state rather than a fabricated story", () => {
    const markup = renderToStaticMarkup(React.createElement(StoriesContent, { stories: [] }));
    expect(markup).toContain("Stories will appear here only when participants choose to share them.");
    expect(markup).toContain("No fabricated accounts");
  });

  it("renders roadmap upgrades with release conditions", () => {
    const markup = renderToStaticMarkup(React.createElement(Roadmap));
    expect(markup).toContain("Metric registry &amp; evidence ledger");
    expect(markup).toContain("Partner onboarding &amp; agreement tracker");
    expect(markup).toContain("Release condition:");
  });
});
