import { describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  createInquiry: vi.fn(),
  updateInquiryAlertStatus: vi.fn(),
  notifyOwner: vi.fn(),
  listProjects: vi.fn(),
  listOpportunities: vi.fn(),
}));

vi.mock("./db", () => ({
  createInquiry: mocks.createInquiry,
  listInquiries: vi.fn(),
  listOpportunities: mocks.listOpportunities,
  listProjects: mocks.listProjects,
  updateInquiryAlertStatus: mocks.updateInquiryAlertStatus,
  updateInquiryStatus: vi.fn(),
}));

vi.mock("./_core/notification", () => ({
  notifyOwner: mocks.notifyOwner,
}));

import { appRouter } from "./routers";
import { inquiryInputSchema } from "./inquiries";
import type { TrpcContext } from "./_core/context";

const visitorContext = {
  user: null,
  req: {} as TrpcContext["req"],
  res: {} as TrpcContext["res"],
} as TrpcContext;

const memberContext = {
  user: {
    id: 2,
    openId: "community-member",
    name: "Community Member",
    email: "member@example.com",
    loginMethod: "manus",
    role: "user" as const,
    createdAt: new Date(),
    updatedAt: new Date(),
    lastSignedIn: new Date(),
  },
  req: {} as TrpcContext["req"],
  res: {} as TrpcContext["res"],
} as TrpcContext;

describe("Project Reclaim inquiries", () => {
  it("requires a valid contact address and meaningful message", () => {
    expect(() => inquiryInputSchema.parse({
      type: "contact",
      name: "A",
      email: "not-an-email",
      message: "Too short",
    })).toThrow();
  });

  it("stores a valid public inquiry and triggers an owner alert", async () => {
    mocks.createInquiry.mockResolvedValueOnce(11);
    mocks.notifyOwner.mockResolvedValueOnce(true);
    mocks.updateInquiryAlertStatus.mockResolvedValueOnce(undefined);
    const caller = appRouter.createCaller(visitorContext);

    const result = await caller.inquiries.create({
      type: "partnership",
      name: "Lake County Partner",
      email: "partner@example.org",
      organization: "Community Organization",
      focus: "Workforce development",
      message: "We would like to discuss a future workforce development collaboration.",
    });

    expect(mocks.createInquiry).toHaveBeenCalledTimes(1);
    expect(mocks.notifyOwner).toHaveBeenCalledWith(expect.objectContaining({
      title: "Project Reclaim: partnership inquiry",
    }));
    expect(mocks.updateInquiryAlertStatus).toHaveBeenCalledWith(11, true);
    expect(result).toEqual({ success: true, ownerNotificationSent: true });
  });

  it("returns public project and opportunity registry data without authentication", async () => {
    const project = {
      id: 1,
      title: "Verified project",
      slug: "verified-project",
      summary: "A documented future project record.",
      category: "fire_mitigation",
      status: "planned",
      verificationStatus: "verified",
      locationLabel: "Lake County, California",
      impactMetricLabel: "Assessment area",
      impactMetricValue: "Pending verification",
      evidenceUrl: "https://example.org/evidence",
      createdAt: new Date("2026-01-01T00:00:00.000Z"),
      updatedAt: new Date("2026-01-02T00:00:00.000Z"),
    };
    const opportunity = {
      id: 1,
      title: "Crew pathway",
      summary: "A future training pathway.",
      type: "training",
      status: "coming_soon",
      organization: "Project Reclaim",
      locationLabel: "Lake County, California",
      applicationMethod: "Contact Project Reclaim",
      createdAt: new Date("2026-01-01T00:00:00.000Z"),
      updatedAt: new Date("2026-01-02T00:00:00.000Z"),
    };
    mocks.listProjects.mockResolvedValueOnce([project]);
    mocks.listOpportunities.mockResolvedValueOnce([opportunity]);
    const caller = appRouter.createCaller(visitorContext);

    await expect(caller.registry.projects()).resolves.toEqual([
      expect.objectContaining({
        id: expect.any(Number),
        title: expect.any(String),
        slug: expect.any(String),
        category: "fire_mitigation",
        status: "planned",
        verificationStatus: "verified",
        locationLabel: expect.any(String),
        createdAt: expect.any(Date),
      }),
    ]);
    await expect(caller.registry.opportunities()).resolves.toEqual([
      expect.objectContaining({
        id: expect.any(Number),
        title: expect.any(String),
        type: "training",
        status: "coming_soon",
        organization: expect.any(String),
        locationLabel: expect.any(String),
        applicationMethod: expect.any(String),
        createdAt: expect.any(Date),
      }),
    ]);
  });

  it("prevents a non-owner from viewing incoming inquiries", async () => {
    const caller = appRouter.createCaller(memberContext);
    await expect(caller.inquiries.list()).rejects.toMatchObject({ code: "FORBIDDEN" });
  });
});
