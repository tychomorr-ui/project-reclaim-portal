import { and, desc, eq, gte, inArray, ne } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { evidenceAssets, fieldEvidencePilots, impactMetrics, inquiries, InsertUser, opportunities, products, projects, provenancePackets, referralResources, stories, users } from "../drizzle/schema";
import type { EvidenceAssetInput, FieldEvidencePilotInput, ImpactMetricInput, ProvenancePacketInput, ReferralResourceInput, StoryInput } from "./governance";
import type { InquiryInput } from "./inquiries";
import { ENV } from "./_core/env";

let _db: ReturnType<typeof drizzle> | null = null;

export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try { _db = drizzle(process.env.DATABASE_URL); } catch (error) { console.warn("[Database] Failed to connect:", error); _db = null; }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) throw new Error("User openId is required for upsert");
  const db = await getDb();
  if (!db) { console.warn("[Database] Cannot upsert user: database not available"); return; }
  try {
    const values: InsertUser = { openId: user.openId };
    const updateSet: Record<string, unknown> = {};
    const textFields = ["name", "email", "loginMethod"] as const;
    textFields.forEach((field) => { const value = user[field]; if (value !== undefined) { const normalized = value ?? null; values[field] = normalized; updateSet[field] = normalized; } });
    if (user.lastSignedIn !== undefined) { values.lastSignedIn = user.lastSignedIn; updateSet.lastSignedIn = user.lastSignedIn; }
    if (user.role !== undefined) { values.role = user.role; updateSet.role = user.role; } else if (user.openId === ENV.ownerOpenId) { values.role = "admin"; updateSet.role = "admin"; }
    if (!values.lastSignedIn) values.lastSignedIn = new Date();
    if (Object.keys(updateSet).length === 0) updateSet.lastSignedIn = new Date();
    await db.insert(users).values(values).onDuplicateKeyUpdate({ set: updateSet });
  } catch (error) { console.error("[Database] Failed to upsert user:", error); throw error; }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) { console.warn("[Database] Cannot get user: database not available"); return undefined; }
  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function listProjects() { const db = await getDb(); if (!db) throw new Error("Database is unavailable."); return db.select().from(projects).orderBy(desc(projects.updatedAt)); }
export async function listOpportunities() { const db = await getDb(); if (!db) throw new Error("Database is unavailable."); return db.select().from(opportunities).orderBy(desc(opportunities.updatedAt)); }
export async function listProducts() {
  const db = await getDb();
  if (!db) throw new Error("Database is unavailable.");
  const rows = await db.select({ product: products, originProjectTitle: projects.title, originProjectCategory: projects.category }).from(products).leftJoin(projects, eq(products.originProjectId, projects.id)).orderBy(desc(products.updatedAt));
  return rows.map(({ product, originProjectTitle, originProjectCategory }) => ({ ...product, originProjectTitle: originProjectTitle ?? null, originProjectCategory: originProjectCategory ?? null }));
}

export async function listPublicImpactMetrics() {
  const db = await getDb();
  if (!db) throw new Error("Database is unavailable.");
  const rows = await db.select().from(impactMetrics).where(ne(impactMetrics.verificationStatus, "superseded")).orderBy(desc(impactMetrics.dataAsOf), desc(impactMetrics.updatedAt));
  const newestByMetric = new Map<string, typeof rows[number]>();
  rows.forEach((row) => { if (!newestByMetric.has(row.metricKey)) newestByMetric.set(row.metricKey, row); });
  return Array.from(newestByMetric.values());
}

export async function listOwnerImpactMetrics() { const db = await getDb(); if (!db) throw new Error("Database is unavailable."); return db.select().from(impactMetrics).orderBy(desc(impactMetrics.updatedAt)); }
export async function createImpactMetric(input: ImpactMetricInput) { const db = await getDb(); if (!db) throw new Error("Database is unavailable."); const result = await db.insert(impactMetrics).values({ ...input, value: input.value || null, sourceTitle: input.sourceTitle || null, sourceUrl: input.sourceUrl || null, methodologyNote: input.methodologyNote || null, dataAsOf: input.dataAsOf || null, verifiedAt: input.verifiedAt || null, reviewedBy: input.reviewedBy || null }); return Number((result as unknown as { insertId?: number }).insertId); }
export async function updateImpactMetric(id: number, input: ImpactMetricInput) { const db = await getDb(); if (!db) throw new Error("Database is unavailable."); await db.update(impactMetrics).set({ ...input, value: input.value || null, sourceTitle: input.sourceTitle || null, sourceUrl: input.sourceUrl || null, methodologyNote: input.methodologyNote || null, dataAsOf: input.dataAsOf || null, verifiedAt: input.verifiedAt || null, reviewedBy: input.reviewedBy || null }).where(eq(impactMetrics.id, id)); }

export async function listPublishedStories() {
  const db = await getDb();
  if (!db) throw new Error("Database is unavailable.");
  return db.select({ id: stories.id, title: stories.title, excerpt: stories.excerpt, category: stories.category, attribution: stories.attribution, publishedAt: stories.publishedAt }).from(stories).where(and(eq(stories.consentStatus, "approved"), eq(stories.publicationStatus, "published"))).orderBy(desc(stories.publishedAt), desc(stories.updatedAt));
}

export async function listOwnerStories() { const db = await getDb(); if (!db) throw new Error("Database is unavailable."); return db.select().from(stories).orderBy(desc(stories.updatedAt)); }
export async function createStory(input: StoryInput) { const db = await getDb(); if (!db) throw new Error("Database is unavailable."); const result = await db.insert(stories).values({ ...input, attribution: input.attribution || null, consentReviewedAt: input.consentReviewedAt || null, publishedAt: input.publishedAt || null, reviewedBy: input.reviewedBy || null }); return Number((result as unknown as { insertId?: number }).insertId); }
export async function updateStory(id: number, input: StoryInput) { const db = await getDb(); if (!db) throw new Error("Database is unavailable."); await db.update(stories).set({ ...input, attribution: input.attribution || null, consentReviewedAt: input.consentReviewedAt || null, publishedAt: input.publishedAt || null, reviewedBy: input.reviewedBy || null }).where(eq(stories.id, id)); }

export async function listPublicReferralResources() { const db = await getDb(); if (!db) throw new Error("Database is unavailable."); return db.select({ id: referralResources.id, organizationName: referralResources.organizationName, serviceType: referralResources.serviceType, publicSummary: referralResources.publicSummary, serviceArea: referralResources.serviceArea, publicUrl: referralResources.publicUrl, publicPhone: referralResources.publicPhone, lastVerifiedAt: referralResources.lastVerifiedAt, nextReviewAt: referralResources.nextReviewAt }).from(referralResources).where(and(eq(referralResources.directoryStatus, "verified"), gte(referralResources.nextReviewAt, new Date()))).orderBy(desc(referralResources.lastVerifiedAt)); }
export async function listOwnerReferralResources() { const db = await getDb(); if (!db) throw new Error("Database is unavailable."); return db.select().from(referralResources).orderBy(desc(referralResources.updatedAt)); }
export async function createReferralResource(input: ReferralResourceInput) { const db = await getDb(); if (!db) throw new Error("Database is unavailable."); const result = await db.insert(referralResources).values({ ...input, serviceArea: input.serviceArea || null, publicUrl: input.publicUrl || null, publicPhone: input.publicPhone || null, lastVerifiedAt: input.lastVerifiedAt || null, nextReviewAt: input.nextReviewAt || null, reviewedBy: input.reviewedBy || null }); return Number((result as unknown as { insertId?: number }).insertId); }
export async function updateReferralResource(id: number, input: ReferralResourceInput) { const db = await getDb(); if (!db) throw new Error("Database is unavailable."); await db.update(referralResources).set({ ...input, serviceArea: input.serviceArea || null, publicUrl: input.publicUrl || null, publicPhone: input.publicPhone || null, lastVerifiedAt: input.lastVerifiedAt || null, nextReviewAt: input.nextReviewAt || null, reviewedBy: input.reviewedBy || null }).where(eq(referralResources.id, id)); }

export async function listPublicFieldEvidencePilots() { const db = await getDb(); if (!db) throw new Error("Database is unavailable."); return db.select({ id: fieldEvidencePilots.id, title: fieldEvidencePilots.title, overview: fieldEvidencePilots.overview, generalArea: fieldEvidencePilots.generalArea, workOrderStatus: fieldEvidencePilots.workOrderStatus, materialPathway: fieldEvidencePilots.materialPathway, publicSummary: fieldEvidencePilots.publicSummary, evidenceUrl: fieldEvidencePilots.evidenceUrl, publicReleasedAt: fieldEvidencePilots.publicReleasedAt }).from(fieldEvidencePilots).where(and(eq(fieldEvidencePilots.publicReleaseStatus, "approved"), inArray(fieldEvidencePilots.authorizationStatus, ["authorized_public_summary", "completed"]), eq(fieldEvidencePilots.reviewStatus, "verified"))).orderBy(desc(fieldEvidencePilots.publicReleasedAt)); }
export async function listOwnerFieldEvidencePilots() { const db = await getDb(); if (!db) throw new Error("Database is unavailable."); return db.select().from(fieldEvidencePilots).orderBy(desc(fieldEvidencePilots.updatedAt)); }
export async function createFieldEvidencePilot(input: FieldEvidencePilotInput) { const db = await getDb(); if (!db) throw new Error("Database is unavailable."); const result = await db.insert(fieldEvidencePilots).values({ ...input, generalArea: input.generalArea || null, authorizationReference: input.authorizationReference || null, crewLabel: input.crewLabel || null, materialPathway: input.materialPathway || null, evidenceSummary: input.evidenceSummary || null, evidenceUrl: input.evidenceUrl || null, publicSummary: input.publicSummary || null, authorizedAt: input.authorizedAt || null, reviewedAt: input.reviewedAt || null, publicReleasedAt: input.publicReleasedAt || null, reviewedBy: input.reviewedBy || null }); return Number((result as unknown as { insertId?: number }).insertId); }
export async function updateFieldEvidencePilot(id: number, input: FieldEvidencePilotInput) { const db = await getDb(); if (!db) throw new Error("Database is unavailable."); await db.update(fieldEvidencePilots).set({ ...input, generalArea: input.generalArea || null, authorizationReference: input.authorizationReference || null, crewLabel: input.crewLabel || null, materialPathway: input.materialPathway || null, evidenceSummary: input.evidenceSummary || null, evidenceUrl: input.evidenceUrl || null, publicSummary: input.publicSummary || null, authorizedAt: input.authorizedAt || null, reviewedAt: input.reviewedAt || null, publicReleasedAt: input.publicReleasedAt || null, reviewedBy: input.reviewedBy || null }).where(eq(fieldEvidencePilots.id, id)); }

export async function listOwnerEvidenceAssets() { const db = await getDb(); if (!db) throw new Error("Database is unavailable."); return db.select().from(evidenceAssets).orderBy(desc(evidenceAssets.updatedAt)); }
export async function createEvidenceAsset(input: EvidenceAssetInput) { const db = await getDb(); if (!db) throw new Error("Database is unavailable."); const result = await db.insert(evidenceAssets).values({ ...input, fieldPilotId: input.fieldPilotId || null, publicSummary: input.publicSummary || null, capturedAt: input.capturedAt || null, reviewedAt: input.reviewedAt || null, reviewedBy: input.reviewedBy || null, publicReleasedAt: input.publicReleasedAt || null }); return Number((result as unknown as { insertId?: number }).insertId); }

export async function listOwnerProvenancePackets() { const db = await getDb(); if (!db) throw new Error("Database is unavailable."); return db.select().from(provenancePackets).orderBy(desc(provenancePackets.updatedAt)); }
export async function createProvenancePacket(input: ProvenancePacketInput) { const db = await getDb(); if (!db) throw new Error("Database is unavailable."); const result = await db.insert(provenancePackets).values({ ...input, fieldPilotId: input.fieldPilotId || null, externalReference: input.externalReference || null, reviewedAt: input.reviewedAt || null, reviewedBy: input.reviewedBy || null, publicReleasedAt: input.publicReleasedAt || null }); return Number((result as unknown as { insertId?: number }).insertId); }

export async function createInquiry(input: InquiryInput) {
  const db = await getDb();
  if (!db) throw new Error("Database is unavailable.");
  const result = await db.insert(inquiries).values({ type: input.type, name: input.name, email: input.email, organization: input.organization || null, phone: input.phone || null, focus: input.focus || null, partnerCategory: input.partnerCategory || null, businessCategory: input.businessCategory || null, equipmentType: input.equipmentType || null, contractorSpecialty: input.contractorSpecialty || null, siteContext: input.siteContext || null, serviceArea: input.serviceArea || null, message: input.message });
  return Number((result as unknown as { insertId?: number }).insertId);
}

export async function listInquiries() { const db = await getDb(); if (!db) throw new Error("Database is unavailable."); return db.select().from(inquiries).orderBy(desc(inquiries.createdAt)); }
export async function updateInquiryStatus(id: number, status: "new" | "reviewing" | "responded" | "archived") { const db = await getDb(); if (!db) throw new Error("Database is unavailable."); await db.update(inquiries).set({ status }).where(eq(inquiries.id, id)); }
export async function updateInquiryAlertStatus(id: number, ownerNotificationSent: boolean) { const db = await getDb(); if (!db) throw new Error("Database is unavailable."); await db.update(inquiries).set({ ownerNotificationSent }).where(eq(inquiries.id, id)); }
