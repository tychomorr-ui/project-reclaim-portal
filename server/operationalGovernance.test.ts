import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { commandSchema, credentialSchema, intakePublicSchema, propertySchema } from "./operationalGovernance";

describe("operational governance contracts", () => {
  it("requires core property diligence gates and source-aware planning state", () => {
    const parsed = propertySchema.parse({ propertyName: "3360 Old Highway 53 lead", county: "lake", propertyType: "commercial_hub", listingStatus: "status_unknown", planningRole: "operations_hub", diligenceStatus: "lead", brokerStatus: "not_started", titleStatus: "not_started", codeStatus: "not_started", safetyStatus: "not_started" });
    expect(parsed.planningRole).toBe("operations_hub");
    expect(parsed.diligenceStatus).toBe("lead");
    expect(parsed.titleStatus).toBe("not_started");
  });

  it("rejects verified credentials without approved issuers and review evidence", () => {
    expect(() => credentialSchema.parse({ participantLabel: "PR-001", pathway: "field_stewardship", credentialName: "Field safety work record", issuerStatus: "partner_candidate", recordStatus: "verified" })).toThrow();
  });

  it("requires explicit consent for public intake submission", () => {
    const base = { applicantName: "Applicant", entryPathway: "walk_in" as const, requestedTrack: "not_sure" as const, accessibilityNote: "" };
    expect(() => intakePublicSchema.parse({ ...base, consentToContact: false })).toThrow();
    expect(intakePublicSchema.parse({ ...base, consentToContact: true }).consentToContact).toBe(true);
  });

  it("keeps new operational routes and owner procedure boundaries in the app source", () => {
    const app = readFileSync("client/src/App.tsx", "utf8");
    const router = readFileSync("server/operationalGovernance.ts", "utf8");
    expect(app).toContain('path="/pilot-operations"');
    expect(app).toContain('path="/intake"');
    expect(app).toContain('path="/iwa-sage"');
    expect(app).toContain('path="/compliance-readiness"');
    expect(router).toContain("properties: router({ list: ownerProcedure");
    expect(router).toContain("command: router({ list: ownerProcedure");
    expect(router).toContain("credentials: router({ list: ownerProcedure");
    expect(router).toContain("list: ownerProcedure.query(() => listOwnerResidentIntakes())");
    expect(router).toContain("submit: publicProcedure.input(intakePublicSchema)");
  });
});
