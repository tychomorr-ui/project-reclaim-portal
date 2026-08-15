import { COOKIE_NAME } from "@shared/const";
import { z } from "zod";
import { getSessionCookieOptions } from "./_core/cookies";
import { notifyOwner } from "./_core/notification";
import { systemRouter } from "./_core/systemRouter";
import { ownerProcedure, protectedProcedure, publicProcedure, router } from "./_core/trpc";
import { createInquiry, listInquiries, listOpportunities, listProducts, listProjects, listPublicFieldEvidencePilots, listPublicImpactMetrics, listPublicReferralResources, listPublishedStories, updateInquiryAlertStatus, updateInquiryStatus } from "./db";
import { governanceRouter } from "./governance";
import { inquiryInputSchema } from "./inquiries";
import { operationalGovernanceRouter } from "./operationalGovernance";

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => { const cookieOptions = getSessionCookieOptions(ctx.req); ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 }); return { success: true } as const; }),
  }),
  owner: router({ access: protectedProcedure.query(({ ctx }) => ({ isOwner: ctx.user.openId === process.env.OWNER_OPEN_ID })) }),
  registry: router({
    projects: publicProcedure.query(() => listProjects()),
    opportunities: publicProcedure.query(() => listOpportunities()),
    products: publicProcedure.query(() => listProducts()),
    impactMetrics: publicProcedure.query(() => listPublicImpactMetrics()),
    stories: publicProcedure.query(() => listPublishedStories()),
    resources: publicProcedure.query(() => listPublicReferralResources()),
    fieldPilots: publicProcedure.query(() => listPublicFieldEvidencePilots()),
  }),
  governance: governanceRouter,
  operations: operationalGovernanceRouter,
  inquiries: router({
    create: publicProcedure.input(inquiryInputSchema).mutation(async ({ input }) => {
      const inquiryId = await createInquiry(input);
      const ownerContent = [
        `${input.type === "partnership" ? "Partnership inquiry" : "Community contact"} from ${input.name}`,
        `Email: ${input.email}`,
        input.organization ? `Organization: ${input.organization}` : null,
        input.partnerCategory ? `Partner route: ${input.partnerCategory.replaceAll("_", " ")}` : null,
        input.businessCategory ? `Business role: ${input.businessCategory.replaceAll("_", " ")}` : null,
        input.equipmentType ? `Equipment category: ${input.equipmentType.replaceAll("_", " ")}` : null,
        input.contractorSpecialty ? `Contractor specialty: ${input.contractorSpecialty.replaceAll("_", " ")}` : null,
        input.siteContext ? `Site context: ${input.siteContext}` : null,
        input.serviceArea ? `Service area: ${input.serviceArea}` : null,
        input.focus ? `Interest: ${input.focus}` : null,
        `Message: ${input.message}`,
      ].filter(Boolean).join("\n");
      const ownerNotificationSent = await notifyOwner({ title: `Project Reclaim: ${input.type === "partnership" ? "partnership inquiry" : "community contact"}`, content: ownerContent });
      await updateInquiryAlertStatus(inquiryId, ownerNotificationSent);
      return { success: true, ownerNotificationSent };
    }),
    list: ownerProcedure.query(() => listInquiries()),
    updateStatus: ownerProcedure.input(z.object({ id: z.number().int().positive(), status: z.enum(["new", "reviewing", "responded", "archived"]) })).mutation(async ({ input }) => { await updateInquiryStatus(input.id, input.status); return { success: true }; }),
  }),
});

export type AppRouter = typeof appRouter;
