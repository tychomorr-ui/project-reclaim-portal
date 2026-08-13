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

export const products = mysqlTable("products", {
  id: int("id").autoincrement().primaryKey(),
  title: varchar("title", { length: 180 }).notNull(),
  summary: text("summary").notNull(),
  category: mysqlEnum("category", ["furniture", "lumber", "architectural_stock", "repair", "firewood", "chips_biomass", "other"]).notNull(),
  status: mysqlEnum("status", ["available", "coming_soon", "reserved", "sold", "unverified"]).notNull().default("unverified"),
  materialLabel: varchar("materialLabel", { length: 180 }),
  originProjectId: int("originProjectId"),
  imageUrl: varchar("imageUrl", { length: 1024 }),
  availabilityNote: varchar("availabilityNote", { length: 600 }),
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
  businessCategory: mysqlEnum("businessCategory", ["equipment_vendor", "contractor", "arborist_or_forestry", "material_supplier", "trucking_or_hauling", "repair_or_fabrication", "professional_services", "other"]),
  equipmentType: mysqlEnum("equipmentType", ["chainsaws_and_handtools", "forestry_and_arborist", "heavy_equipment", "tractors_and_implements", "trailers_and_hauling", "woodshop_and_milling", "safety_and_ppe", "rental_or_repair", "other"]),
  contractorSpecialty: mysqlEnum("contractorSpecialty", ["carpentry_and_rehabilitation", "fire_mitigation_and_fuels", "forestry_and_arborist", "earthwork_and_sitework", "hauling_and_logistics", "electrical_or_plumbing", "roofing_or_building_envelope", "landscape_or_irrigation", "other"]),
  siteContext: varchar("siteContext", { length: 240 }),
  serviceArea: varchar("serviceArea", { length: 180 }),
  message: text("message").notNull(),
  status: mysqlEnum("status", ["new", "reviewing", "responded", "archived"]).notNull().default("new"),
  emailNotificationSent: boolean("emailNotificationSent").notNull().default(false),
  ownerNotificationSent: boolean("ownerNotificationSent").notNull().default(false),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Project = typeof projects.$inferSelect;
export type Opportunity = typeof opportunities.$inferSelect;
export type Product = typeof products.$inferSelect;
export type Inquiry = typeof inquiries.$inferSelect;
