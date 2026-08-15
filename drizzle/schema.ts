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

export const impactMetrics = mysqlTable("impact_metrics", {
  id: int("id").autoincrement().primaryKey(),
  metricKey: mysqlEnum("metricKey", ["participants", "acres_restored", "local_business_partnerships"]).notNull(),
  value: decimal("value", { precision: 14, scale: 2 }),
  unit: varchar("unit", { length: 80 }).notNull(),
  verificationStatus: mysqlEnum("verificationStatus", ["pending", "verified", "superseded"]).notNull().default("pending"),
  sourceTitle: varchar("sourceTitle", { length: 240 }),
  sourceUrl: varchar("sourceUrl", { length: 1024 }),
  methodologyNote: text("methodologyNote"),
  dataAsOf: timestamp("dataAsOf"),
  verifiedAt: timestamp("verifiedAt"),
  reviewedBy: varchar("reviewedBy", { length: 180 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export const stories = mysqlTable("stories", {
  id: int("id").autoincrement().primaryKey(),
  title: varchar("title", { length: 220 }).notNull(),
  excerpt: text("excerpt").notNull(),
  category: mysqlEnum("category", ["work_pathway", "training", "stewardship", "community_contribution", "other"]).notNull().default("other"),
  attribution: varchar("attribution", { length: 180 }),
  consentStatus: mysqlEnum("consentStatus", ["pending", "approved", "withdrawn"]).notNull().default("pending"),
  publicationStatus: mysqlEnum("publicationStatus", ["draft", "published", "retired"]).notNull().default("draft"),
  consentReviewedAt: timestamp("consentReviewedAt"),
  reviewedBy: varchar("reviewedBy", { length: 180 }),
  publishedAt: timestamp("publishedAt"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export const referralResources = mysqlTable("referral_resources", {
  id: int("id").autoincrement().primaryKey(),
  organizationName: varchar("organizationName", { length: 220 }).notNull(),
  serviceType: mysqlEnum("serviceType", ["behavioral_health", "substance_use", "life_skills", "care_navigation", "housing_reentry", "workforce_training", "emergency_support", "other"]).notNull(),
  publicSummary: text("publicSummary").notNull(),
  serviceArea: varchar("serviceArea", { length: 200 }),
  publicUrl: varchar("publicUrl", { length: 1024 }),
  publicPhone: varchar("publicPhone", { length: 40 }),
  directoryStatus: mysqlEnum("directoryStatus", ["draft", "verification_pending", "verified", "needs_recheck", "retired"]).notNull().default("draft"),
  lastVerifiedAt: timestamp("lastVerifiedAt"),
  nextReviewAt: timestamp("nextReviewAt"),
  reviewedBy: varchar("reviewedBy", { length: 180 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export const fieldEvidencePilots = mysqlTable("field_evidence_pilots", {
  id: int("id").autoincrement().primaryKey(),
  title: varchar("title", { length: 220 }).notNull(),
  overview: text("overview").notNull(),
  generalArea: varchar("generalArea", { length: 220 }),
  authorizationReference: varchar("authorizationReference", { length: 240 }),
  authorizationStatus: mysqlEnum("authorizationStatus", ["draft", "authorization_pending", "authorized_private_tracking", "authorized_public_summary", "completed"]).notNull().default("draft"),
  workOrderStatus: mysqlEnum("workOrderStatus", ["not_started", "planned", "in_progress", "complete", "on_hold"]).notNull().default("not_started"),
  crewLabel: varchar("crewLabel", { length: 180 }),
  materialPathway: varchar("materialPathway", { length: 240 }),
  evidenceSummary: text("evidenceSummary"),
  evidenceUrl: varchar("evidenceUrl", { length: 1024 }),
  reviewStatus: mysqlEnum("reviewStatus", ["not_reviewed", "pending_review", "verified", "needs_revision"]).notNull().default("not_reviewed"),
  publicReleaseStatus: mysqlEnum("publicReleaseStatus", ["not_approved", "approved", "retired"]).notNull().default("not_approved"),
  publicSummary: text("publicSummary"),
  authorizedAt: timestamp("authorizedAt"),
  reviewedAt: timestamp("reviewedAt"),
  publicReleasedAt: timestamp("publicReleasedAt"),
  reviewedBy: varchar("reviewedBy", { length: 180 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export const evidenceAssets = mysqlTable("evidence_assets", {
  id: int("id").autoincrement().primaryKey(),
  fieldPilotId: int("fieldPilotId"),
  title: varchar("title", { length: 220 }).notNull(),
  publicSummary: text("publicSummary"),
  evidenceType: mysqlEnum("evidenceType", ["photo", "before_after", "document", "work_record", "site_authority", "other"]).notNull().default("other"),
  contentType: varchar("contentType", { length: 160 }).notNull(),
  storageKey: varchar("storageKey", { length: 1024 }).notNull(),
  storageUrl: varchar("storageUrl", { length: 1024 }).notNull(),
  visibility: mysqlEnum("visibility", ["private", "public_approved"]).notNull().default("private"),
  capturedAt: timestamp("capturedAt"),
  reviewedAt: timestamp("reviewedAt"),
  reviewedBy: varchar("reviewedBy", { length: 180 }),
  publicReleasedAt: timestamp("publicReleasedAt"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export const provenancePackets = mysqlTable("provenance_packets", {
  id: int("id").autoincrement().primaryKey(),
  fieldPilotId: int("fieldPilotId"),
  title: varchar("title", { length: 220 }).notNull(),
  publicSummary: text("publicSummary").notNull(),
  contentDigest: varchar("contentDigest", { length: 160 }).notNull(),
  digestAlgorithm: varchar("digestAlgorithm", { length: 60 }).notNull().default("SHA-256"),
  status: mysqlEnum("status", ["prepared", "integration_review", "verified_external", "retired"]).notNull().default("prepared"),
  externalReference: varchar("externalReference", { length: 1024 }),
  reviewedAt: timestamp("reviewedAt"),
  reviewedBy: varchar("reviewedBy", { length: 180 }),
  publicReleaseStatus: mysqlEnum("publicReleaseStatus", ["not_approved", "approved", "retired"]).notNull().default("not_approved"),
  publicReleasedAt: timestamp("publicReleasedAt"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Project = typeof projects.$inferSelect;
export type Opportunity = typeof opportunities.$inferSelect;
export type Product = typeof products.$inferSelect;
export type Inquiry = typeof inquiries.$inferSelect;
export type ImpactMetric = typeof impactMetrics.$inferSelect;
export type Story = typeof stories.$inferSelect;
export type ReferralResource = typeof referralResources.$inferSelect;
export type FieldEvidencePilot = typeof fieldEvidencePilots.$inferSelect;
export type EvidenceAsset = typeof evidenceAssets.$inferSelect;
export const propertyEvaluations = mysqlTable("property_evaluations", {
  id: int("id").autoincrement().primaryKey(),
  propertyName: varchar("propertyName", { length: 240 }).notNull(),
  county: mysqlEnum("county", ["mendocino", "lake", "other"]).notNull(),
  propertyType: mysqlEnum("propertyType", ["vineyard_or_ranch", "motel_or_hotel", "farmhouse_or_lodge", "commercial_hub", "other"]).notNull(),
  sourceUrl: varchar("sourceUrl", { length: 1024 }),
  listingStatus: mysqlEnum("listingStatus", ["active_lead", "not_listed", "status_unknown", "retired_lead"]).notNull().default("status_unknown"),
  planningRole: mysqlEnum("planningRole", ["residential_campus", "operations_hub", "two_site_candidate", "future_branch"]).notNull(),
  diligenceStatus: mysqlEnum("diligenceStatus", ["lead", "broker_contact_pending", "broker_verified", "title_pending", "code_pending", "safety_pending", "board_review", "approved_for_due_diligence", "rejected", "archived"]).notNull().default("lead"),
  brokerStatus: mysqlEnum("brokerStatus", ["not_started", "requested", "received", "verified", "blocked"]).notNull().default("not_started"),
  titleStatus: mysqlEnum("titleStatus", ["not_started", "ordered", "received", "reviewed", "blocked"]).notNull().default("not_started"),
  codeStatus: mysqlEnum("codeStatus", ["not_started", "requested", "received", "reviewed", "blocked"]).notNull().default("not_started"),
  safetyStatus: mysqlEnum("safetyStatus", ["not_started", "screening", "professional_review", "cleared_for_next_step", "blocked"]).notNull().default("not_started"),
  sourceAsOf: timestamp("sourceAsOf"),
  blockerNote: text("blockerNote"),
  nextAction: varchar("nextAction", { length: 600 }),
  reviewedBy: varchar("reviewedBy", { length: 180 }),
  reviewedAt: timestamp("reviewedAt"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export const pilotCommandItems = mysqlTable("pilot_command_items", {
  id: int("id").autoincrement().primaryKey(),
  title: varchar("title", { length: 240 }).notNull(),
  workstream: mysqlEnum("workstream", ["property", "residential", "workforce", "safety", "partner", "procurement", "evidence", "communications"]).notNull(),
  status: mysqlEnum("status", ["backlog", "ready", "in_progress", "blocked", "review", "complete"]).notNull().default("backlog"),
  ownerLabel: varchar("ownerLabel", { length: 180 }),
  dueAt: timestamp("dueAt"),
  dependencyNote: text("dependencyNote"),
  releaseGate: varchar("releaseGate", { length: 500 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export const credentialRecords = mysqlTable("credential_records", {
  id: int("id").autoincrement().primaryKey(),
  participantLabel: varchar("participantLabel", { length: 180 }).notNull(),
  pathway: mysqlEnum("pathway", ["field_stewardship", "fire_resilience", "wood_carpentry", "life_workplace", "disaster_readiness", "equipment_logistics", "community_operations"]).notNull(),
  credentialName: varchar("credentialName", { length: 240 }).notNull(),
  issuerName: varchar("issuerName", { length: 240 }),
  issuerStatus: mysqlEnum("issuerStatus", ["not_selected", "partner_candidate", "approved_issuer", "verification_pending"]).notNull().default("not_selected"),
  recordStatus: mysqlEnum("recordStatus", ["planned", "enrolled", "in_progress", "completed", "verified", "withdrawn"]).notNull().default("planned"),
  evidenceNote: text("evidenceNote"),
  completedAt: timestamp("completedAt"),
  verifiedAt: timestamp("verifiedAt"),
  reviewedBy: varchar("reviewedBy", { length: 180 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export const residentIntakes = mysqlTable("resident_intakes", {
  id: int("id").autoincrement().primaryKey(),
  applicationCode: varchar("applicationCode", { length: 40 }).notNull().unique(),
  applicantName: varchar("applicantName", { length: 180 }).notNull(),
  contactEmail: varchar("contactEmail", { length: 320 }),
  contactPhone: varchar("contactPhone", { length: 40 }),
  entryPathway: mysqlEnum("entryPathway", ["walk_in", "veteran_referral", "housing_referral", "workforce_referral", "reentry_referral", "court_or_supervision_referral", "other"]).notNull(),
  requestedTrack: mysqlEnum("requestedTrack", ["residential", "community_based", "field_school", "not_sure"]).notNull(),
  intakeStatus: mysqlEnum("intakeStatus", ["received", "screening", "eligible_review", "placement_pending", "placed", "waitlist", "declined", "withdrawn"]).notNull().default("received"),
  consentToContact: boolean("consentToContact").notNull().default(false),
  accessibilityNote: varchar("accessibilityNote", { length: 600 }),
  supportPathwayStatus: mysqlEnum("supportPathwayStatus", ["not_assessed", "referral_needed", "provider_pathway_identified", "provider_connected"]).notNull().default("not_assessed"),
  courtAuthorityStatus: mysqlEnum("courtAuthorityStatus", ["not_applicable", "referral_pending", "authority_pending", "authorized", "not_authorized"]).notNull().default("not_applicable"),
  placementNote: text("placementNote"),
  privateReviewNote: text("privateReviewNote"),
  reviewedBy: varchar("reviewedBy", { length: 180 }),
  reviewedAt: timestamp("reviewedAt"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type ProvenancePacket = typeof provenancePackets.$inferSelect;
export type PropertyEvaluation = typeof propertyEvaluations.$inferSelect;
export type PilotCommandItem = typeof pilotCommandItems.$inferSelect;
export type CredentialRecord = typeof credentialRecords.$inferSelect;
export type ResidentIntake = typeof residentIntakes.$inferSelect;
