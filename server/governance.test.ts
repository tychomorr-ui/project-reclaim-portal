import { describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  createEvidenceAsset: vi.fn(), createFieldEvidencePilot: vi.fn(), createImpactMetric: vi.fn(), createInquiry: vi.fn(), createProvenancePacket: vi.fn(), createReferralResource: vi.fn(), createStory: vi.fn(),
  listInquiries: vi.fn(), listOpportunities: vi.fn(), listOwnerEvidenceAssets: vi.fn(), listOwnerFieldEvidencePilots: vi.fn(), listOwnerImpactMetrics: vi.fn(), listOwnerProvenancePackets: vi.fn(), listOwnerReferralResources: vi.fn(), listOwnerStories: vi.fn(), listProducts: vi.fn(), listProjects: vi.fn(), listPublicFieldEvidencePilots: vi.fn(), listPublicImpactMetrics: vi.fn(), listPublicReferralResources: vi.fn(), listPublishedStories: vi.fn(),
  updateFieldEvidencePilot: vi.fn(), updateImpactMetric: vi.fn(), updateInquiryAlertStatus: vi.fn(), updateInquiryStatus: vi.fn(), updateReferralResource: vi.fn(), updateStory: vi.fn(),
}));
vi.mock("./db", () => mocks);
vi.mock("./_core/notification", () => ({ notifyOwner: vi.fn() }));
vi.mock("./storage", () => ({ storagePut: vi.fn().mockResolvedValue({ key: "project-reclaim/evidence/test.pdf", url: "/manus-storage/project-reclaim/evidence/test.pdf" }) }));

import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

const visitorContext = { user: null, req: {} as TrpcContext["req"], res: {} as TrpcContext["res"] } as TrpcContext;
const ownerContext = { user: { id: 1, openId: process.env.OWNER_OPEN_ID || "owner", name: "Owner", email: "owner@example.org", loginMethod: "manus", role: "admin" as const, createdAt: new Date(), updatedAt: new Date(), lastSignedIn: new Date() }, req: {} as TrpcContext["req"], res: {} as TrpcContext["res"] } as TrpcContext;
const memberContext = { user: { id: 2, openId: "member", name: "Member", email: "member@example.org", loginMethod: "manus", role: "user" as const, createdAt: new Date(), updatedAt: new Date(), lastSignedIn: new Date() }, req: {} as TrpcContext["req"], res: {} as TrpcContext["res"] } as TrpcContext;

describe("Project Reclaim operational governance", () => {
  it("keeps owner workflows inaccessible to visitors and non-owners", async () => {
    await expect(appRouter.createCaller(visitorContext).governance.metrics.list()).rejects.toMatchObject({ code: "FORBIDDEN" });
    await expect(appRouter.createCaller(memberContext).governance.resources.list()).rejects.toMatchObject({ code: "FORBIDDEN" });
  });

  it("rejects a verified metric without evidence, source context, and review fields", async () => {
    const owner = appRouter.createCaller(ownerContext);
    await expect(owner.governance.metrics.create({ metricKey: "participants", value: "10", unit: "people", verificationStatus: "verified", sourceTitle: "", sourceUrl: "", methodologyNote: "", dataAsOf: undefined, verifiedAt: undefined, reviewedBy: "" })).rejects.toMatchObject({ code: "BAD_REQUEST" });
  });

  it("rejects a public story unless consent and review gates are satisfied", async () => {
    const owner = appRouter.createCaller(ownerContext);
    await expect(owner.governance.stories.create({ title: "A draft participant update", excerpt: "This is a sufficiently detailed approved-looking excerpt for validation only.", category: "training", attribution: "", consentStatus: "pending", publicationStatus: "published", consentReviewedAt: undefined, publishedAt: undefined, reviewedBy: "" })).rejects.toMatchObject({ code: "BAD_REQUEST" });
  });

  it("rejects an unverified public directory entry and an unauthorized public field-pilot release", async () => {
    const owner = appRouter.createCaller(ownerContext);
    await expect(owner.governance.resources.create({ organizationName: "Public Resource", serviceType: "care_navigation", publicSummary: "A public description long enough to qualify for validation.", serviceArea: "", publicUrl: "", publicPhone: "", directoryStatus: "verified", lastVerifiedAt: undefined, nextReviewAt: undefined, reviewedBy: "" })).rejects.toMatchObject({ code: "BAD_REQUEST" });
    await expect(owner.governance.fieldPilots.create({ title: "First pilot", overview: "A private operating overview long enough to qualify for validation.", generalArea: "", authorizationReference: "", authorizationStatus: "draft", workOrderStatus: "not_started", crewLabel: "", materialPathway: "", evidenceSummary: "", evidenceUrl: "", reviewStatus: "not_reviewed", publicReleaseStatus: "approved", publicSummary: "", authorizedAt: undefined, reviewedAt: undefined, publicReleasedAt: undefined, reviewedBy: "" })).rejects.toMatchObject({ code: "BAD_REQUEST" });
  });

  it("returns only public-safe verified directory and pilot records from their designated helpers", async () => {
    mocks.listPublicReferralResources.mockResolvedValueOnce([{ id: 1, organizationName: "Public Resource", serviceType: "care_navigation", publicSummary: "Verified public scope.", serviceArea: "Lake County", publicUrl: "https://example.org", publicPhone: null, lastVerifiedAt: new Date(), nextReviewAt: new Date() }]);
    mocks.listPublicFieldEvidencePilots.mockResolvedValueOnce([{ id: 1, title: "Approved public pilot summary", overview: "Public-safe overview.", generalArea: "General service area", workOrderStatus: "planned", materialPathway: "Material recovery review", publicSummary: "Approved public release text.", evidenceUrl: null, publicReleasedAt: new Date() }]);
    const visitor = appRouter.createCaller(visitorContext);
    await expect(visitor.registry.resources()).resolves.toEqual([expect.objectContaining({ organizationName: "Public Resource", publicUrl: "https://example.org", nextReviewAt: expect.any(Date) })]);
    await expect(visitor.registry.fieldPilots()).resolves.toEqual([expect.objectContaining({ title: "Approved public pilot summary", generalArea: "General service area", publicSummary: "Approved public release text." })]);
  });

  it("keeps evidence files and provenance packets owner-only, while preparing a local digest without external verification", async () => {
    await expect(appRouter.createCaller(visitorContext).governance.evidenceAssets.list()).rejects.toMatchObject({ code: "FORBIDDEN" });
    await expect(appRouter.createCaller(memberContext).governance.provenancePackets.list()).rejects.toMatchObject({ code: "FORBIDDEN" });
    const owner = appRouter.createCaller(ownerContext);
    await expect(owner.governance.evidenceAssets.upload({ filename: "evidence.pdf", fileBase64: "aGVsbG8gaGVsbG8gaGVsbG8=", contentType: "application/pdf", title: "Private pilot evidence", publicSummary: "", evidenceType: "document", fieldPilotId: undefined, visibility: "private", capturedAt: undefined, reviewedAt: undefined, reviewedBy: "", publicReleasedAt: undefined })).resolves.toEqual({ success: true, action: "uploaded" });
    const packet = await owner.governance.provenancePackets.prepare({ title: "Approved public summary", publicSummary: "A public-safe summary long enough to prepare a local integrity packet.", fieldPilotId: undefined, reviewedAt: undefined, reviewedBy: "Project Reclaim owner" });
    expect(packet).toMatchObject({ success: true, action: "prepared", contentDigest: expect.stringMatching(/^[a-f0-9]{64}$/) });
    expect(mocks.createProvenancePacket).toHaveBeenCalledWith(expect.objectContaining({ status: "prepared", publicReleaseStatus: "not_approved", digestAlgorithm: "SHA-256" }));
  });
});
