import { describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({ listProjects: vi.fn(), listOpportunities: vi.fn(), listProducts: vi.fn(), listPublicImpactMetrics: vi.fn(), listPublishedStories: vi.fn() }));
vi.mock("./db", () => ({ createInquiry: vi.fn(), listInquiries: vi.fn(), listOpportunities: mocks.listOpportunities, listProducts: mocks.listProducts, listProjects: mocks.listProjects, listPublicImpactMetrics: mocks.listPublicImpactMetrics, listPublishedStories: mocks.listPublishedStories, updateInquiryAlertStatus: vi.fn(), updateInquiryStatus: vi.fn() }));
vi.mock("./_core/notification", () => ({ notifyOwner: vi.fn() }));

import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

const visitorContext = { user: null, req: {} as TrpcContext["req"], res: {} as TrpcContext["res"] } as TrpcContext;

describe("Project Reclaim public impact and story records", () => {
  it("returns public metric records with a verification state and source context", async () => {
    mocks.listPublicImpactMetrics.mockResolvedValueOnce([{ id: 1, metricKey: "participants", value: null, unit: "people", verificationStatus: "pending", sourceTitle: null, sourceUrl: null, methodologyNote: "Awaiting first source record.", dataAsOf: null, verifiedAt: null, createdAt: new Date(), updatedAt: new Date() }]);
    const caller = appRouter.createCaller(visitorContext);
    await expect(caller.registry.impactMetrics()).resolves.toEqual([expect.objectContaining({ metricKey: "participants", value: null, unit: "people", verificationStatus: "pending", methodologyNote: expect.any(String) })]);
  });

  it("returns only consent-approved stories supplied by the public story helper", async () => {
    mocks.listPublishedStories.mockResolvedValueOnce([{ id: 1, title: "A participant-approved progress update", excerpt: "A real approved excerpt.", category: "training", attribution: "Participant", consentStatus: "approved", publicationStatus: "published", consentReviewedAt: new Date(), publishedAt: new Date(), createdAt: new Date(), updatedAt: new Date() }]);
    const caller = appRouter.createCaller(visitorContext);
    await expect(caller.registry.stories()).resolves.toEqual([expect.objectContaining({ title: expect.any(String), excerpt: expect.any(String), consentStatus: "approved", publicationStatus: "published" })]);
  });
});
