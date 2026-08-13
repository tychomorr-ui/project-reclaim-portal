import { boolean, decimal, int, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

export const projects = mysqlTable("projects", {
  id: int("id").autoincrement().primaryKey(),
  title: varchar("title", { length: 180 }).notNull(),
  slug: varchar("slug", { length: 200 }).notNull().unique(),
  summary: text("summary").notNull(),
  category: mysqlEnum("category", ["fire_mitigation", "wood_reclamation", "workforce_development", "land_restoration", "community_infrastructure"]).notNull(),
  status: mysqlEnum("status", ["active", "planned", "completed", "unverified"]).notNull().default("unverified"),
  verificationStatus: mysqlEnum("verificationStatus", ["verified", "unverified"]).notNull().default("unverified"),
  locationLabel: varchar("locationLabel", { length: 200 }),
  latitude: decimal("latitude", { precision: 10, scale: 7 }),
  longitude: decimal("longitude", { precision: 10, scale: 7 }),
  impactMetricLabel: varchar("impactMetricLabel", { length: 160 }),
  impactMetricValue: varchar("impactMetricValue", { length: 160 }),
  evidenceUrl: varchar("evidenceUrl", { length: 1024 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export const opportunities = mysqlTable("opportunities", {
  id: int("id").autoincrement().primaryKey(),
  title: varchar("title", { length: 180 }).notNull(),
  summary: text("summary").notNull(),
  type: mysqlEnum("type", ["job", "contract", "training", "internship", "apprenticeship", "volunteer"]).notNull(),
  status: mysqlEnum("status", ["open", "coming_soon", "filled", "completed", "unverified"]).notNull().default("unverified"),
  organization: varchar("organization", { length: 180 }),
  locationLabel: varchar("locationLabel", { length: 200 }),
  applicationMethod: varchar("applicationMethod", { length: 600 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export const inquiries = mysqlTable("inquiries", {
  id: int("id").autoincrement().primaryKey(),
  type: mysqlEnum("type", ["contact", "partnership"]).notNull(),
  name: varchar("name", { length: 120 }).notNull(),
  email: varchar("email", { length: 320 }).notNull(),
  organization: varchar("organization", { length: 180 }),
  phone: varchar("phone", { length: 40 }),
  focus: varchar("focus", { length: 180 }),
  partnerCategory: mysqlEnum("partnerCategory", ["cal_fire", "hud", "terra", "tribal_ecorestoration_alliance", "county_or_local_government", "tribal_government", "contractor_or_forestry", "equipment_or_material_partner", "workforce_or_support_provider", "other"]),
  siteContext: varchar("siteContext", { length: 240 }),
  message: text("message").notNull(),
  status: mysqlEnum("status", ["new", "reviewing", "responded", "archived"]).notNull().default("new"),
  emailNotificationSent: boolean("emailNotificationSent").notNull().default(false),
  ownerNotificationSent: boolean("ownerNotificationSent").notNull().default(false),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Project = typeof projects.$inferSelect;
export type Opportunity = typeof opportunities.$inferSelect;
export type Inquiry = typeof inquiries.$inferSelect;
