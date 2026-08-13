import { desc, eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { inquiries, InsertUser, opportunities, projects, users } from "../drizzle/schema";
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
    siteContext: input.siteContext || null,
    message: input.message,
  });
  return Number((result as unknown as { insertId?: number }).insertId);
}

export async function listInquiries() { const db = await getDb(); if (!db) throw new Error("Database is unavailable."); return db.select().from(inquiries).orderBy(desc(inquiries.createdAt)); }
export async function updateInquiryStatus(id: number, status: "new" | "reviewing" | "responded" | "archived") { const db = await getDb(); if (!db) throw new Error("Database is unavailable."); await db.update(inquiries).set({ status }).where(eq(inquiries.id, id)); }
export async function updateInquiryAlertStatus(id: number, ownerNotificationSent: boolean) { const db = await getDb(); if (!db) throw new Error("Database is unavailable."); await db.update(inquiries).set({ ownerNotificationSent }).where(eq(inquiries.id, id)); }
