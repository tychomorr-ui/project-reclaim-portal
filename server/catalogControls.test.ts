import { describe, expect, it } from "vitest";
import { catalogMaterialOptions, catalogProjectTypeOptions, filterAndSortCatalog } from "../client/src/components/catalogControls";

const records = [
  { id: 1, title: "Cedar bench", summary: "Documented item", category: "furniture", status: "available", materialLabel: "Cedar", originProjectTitle: "Creek fuels project", originProjectCategory: "fire_mitigation", availabilityNote: null, updatedAt: new Date("2026-08-01") },
  { id: 2, title: "Oak board", summary: "Documented item", category: "lumber", status: "coming_soon", materialLabel: "Oak", originProjectTitle: "Wood recovery project", originProjectCategory: "wood_reclamation", availabilityNote: null, updatedAt: new Date("2026-08-02") },
  { id: 3, title: "Unlinked chips", summary: "Documented item", category: "chips_biomass", status: "unverified", materialLabel: null, originProjectTitle: null, originProjectCategory: null, availabilityNote: null, updatedAt: new Date("2026-08-03") },
];

describe("Project Reclaim catalog controls", () => {
  it("derives only documented material and origin-project options", () => {
    expect(catalogMaterialOptions(records)).toEqual(["Cedar", "Oak"]);
    expect(catalogProjectTypeOptions(records)).toEqual(["fire_mitigation", "wood_reclamation"]);
  });

  it("filters by material and project type, then gives available goods priority", () => {
    expect(filterAndSortCatalog(records, "Cedar", "fire_mitigation", "title").map((item) => item.title)).toEqual(["Cedar bench"]);
    expect(filterAndSortCatalog(records, "all", "all", "available").map((item) => item.title)).toEqual(["Cedar bench", "Oak board", "Unlinked chips"]);
  });
});
