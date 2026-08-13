import { describe, expect, it } from "vitest";
import { mapSiteState, siteMatchesMapView } from "../client/src/components/projectMapState";

describe("Project Reclaim map states", () => {
  const activeUnverified = { status: "active" as const, verificationStatus: "unverified" as const };
  const plannedUnverified = { status: "planned" as const, verificationStatus: "unverified" as const };
  const completedVerified = { status: "completed" as const, verificationStatus: "verified" as const };

  it("filters active, proposed, and verified records independently", () => {
    expect(siteMatchesMapView(activeUnverified, "active")).toBe(true);
    expect(siteMatchesMapView(activeUnverified, "verified")).toBe(false);
    expect(siteMatchesMapView(plannedUnverified, "proposed")).toBe(true);
    expect(siteMatchesMapView(completedVerified, "verified")).toBe(true);
    expect(siteMatchesMapView(completedVerified, "active")).toBe(false);
  });

  it("prioritizes independent verified styling before active or proposed styling", () => {
    expect(mapSiteState(activeUnverified)).toBe("active");
    expect(mapSiteState(plannedUnverified)).toBe("proposed");
    expect(mapSiteState(completedVerified)).toBe("verified");
  });
});
