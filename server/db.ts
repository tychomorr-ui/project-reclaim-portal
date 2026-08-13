import { and, desc, eq, ne } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { impactMetrics, inquiries, InsertUser, opportunities, products, projects, stories, users } from "../drizzle/schema";
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

export async function listPublishedStories() {
  const db = await getDb();
  if (!db) throw new Error("Database is unavailable.");
  return db.select().from(stories).where(and(eq(stories.consentStatus, "approved"), eq(stories.publicationStatus, "published"))).orderBy(desc(stories.publishedAt), desc(stories.updatedAt));
}

export async function createInquiry(input: InquiryInput) {
  const db = await getDb();
  if (!db) throw new Error("Database is unavailable.");
  const result = await db.insert(inquiries).values({
    type: input.type,
    name: input.name,
    email: input.email,
    organization: input.organization || null,
    phone: input.phone || null,
    focus: input.focus || null,
    partnerCategory: input.partnerCategory || null,
    businessCategory: input.businessCategory || null,
    equipmentType: input.equipmentType || null,
    contractorSpecialty: input.contractorSpecialty || null,
    siteContext: input.siteContext || null,
    serviceArea: input.serviceArea || null,
    message: input.message,
  });
  return Number((result as unknown as { insertId?: number }).insertId);
}

export async function listInquiries() { const db = await getDb(); if (!db) throw new Error("Database is unavailable."); return db.select().from(inquiries).orderBy(desc(inquiries.createdAt)); }
export async function updateInquiryStatus(id: number, status: "new" | "reviewing" | "responded" | "archived") { const db = await getDb(); if (!db) throw new Error("Database is unavailable."); await db.update(inquiries).set({ status }).where(eq(inquiries.id, id)); }
export async function updateInquiryAlertStatus(id: number, ownerNotificationSent: boolean) { const db = await getDb(); if (!db) throw new Error("Database is unavailable."); await db.update(inquiries).set({ ownerNotificationSent }).where(eq(inquiries.id, id)); }
