import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";

vi.mock("wouter", () => ({ Link: ({ children, href, ...props }: { children: React.ReactNode; href: string }) => React.createElement("a", { href, ...props }, children), useLocation: () => ["/resources", vi.fn()] }));
vi.mock("../client/src/lib/trpc", () => ({ trpc: { registry: { resources: { useQuery: () => ({ data: [], isLoading: false }) }, fieldPilots: { useQuery: () => ({ data: [], isLoading: false }) } } } }));

import FieldPilot from "../client/src/pages/FieldPilot";
import Resources from "../client/src/pages/Resources";

describe("Project Reclaim public operations pages", () => {
  it("renders an intentionally empty verified-resource directory with crisis boundary language", () => {
    const markup = renderToStaticMarkup(React.createElement(Resources));
    expect(markup).toContain("No verified public resource listings have been published yet.");
    expect(markup).toContain("Project Reclaim is not an emergency or crisis-response service.");
    expect(markup).toContain("Call or text 988");
  });

  it("renders an authorization-gated public field-pilot empty state", () => {
    const markup = renderToStaticMarkup(React.createElement(FieldPilot));
    expect(markup).toContain("No field pilot has been released publicly.");
    expect(markup).toContain("Authorization first");
    expect(markup).toContain("The public record follows the real work—not the other way around.");
  });
});
