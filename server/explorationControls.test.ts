import { describe, expect, it } from "vitest";
import { businessPartnerDetailTokens } from "../client/src/components/businessPartnerDetails";
import { activeMapTooltip, BLM_CA_QUERY, blmContextMessage } from "../client/src/components/ProjectMap";

describe("Project Reclaim exploration controls", () => {
  it("keeps the BLM context message explicit about unavailable and non-legal states", () => {
    expect(BLM_CA_QUERY).toContain("gis.blm.gov/caarcgis/rest/services/lands/BLM_CA_LandStatus_SurfaceManagementAgency");
    expect(blmContextMessage("ready", null)).toContain("not a legal boundary");
    expect(blmContextMessage("unavailable", null)).toContain("No BLM context is being represented");
  });

  it("gives a clicked Project Reclaim site record priority over BLM context and returns to context when the site closes", () => {
    const site = { id: 7, title: "Documented site", category: "fire_mitigation", status: "active" as const, verificationStatus: "verified" as const, locationLabel: "Authorized regional label", latitude: "39.1", longitude: "-122.7" };
    expect(activeMapTooltip(site, true, "ready", null)).toEqual({ kind: "site", title: "Documented site", message: "Authorized regional label · active · verified" });
    expect(activeMapTooltip(null, true, "ready", null)).toMatchObject({ kind: "blm", title: "BLM context layer", message: expect.stringContaining("not a legal boundary") });
  });

  it("formats structured local-business selections for the owner dashboard", () => {
    expect(businessPartnerDetailTokens("heavy_equipment", "earthwork_and_sitework")).toEqual(["Equipment: heavy equipment", "Specialty: earthwork and sitework"]);
  });
});
