import { z } from "zod";

export const partnerCategoryValues = ["cal_fire", "hud", "terra", "tribal_ecorestoration_alliance", "county_or_local_government", "tribal_government", "contractor_or_forestry", "equipment_or_material_partner", "workforce_or_support_provider", "other"] as const;
export const businessCategoryValues = ["equipment_vendor", "contractor", "arborist_or_forestry", "material_supplier", "trucking_or_hauling", "repair_or_fabrication", "professional_services", "other"] as const;

export const inquiryInputSchema = z.object({
  type: z.enum(["contact", "partnership"]),
  name: z.string().trim().min(2, "Please enter your name.").max(120),
  email: z.string().trim().email("Please enter a valid email address.").max(320),
  organization: z.string().trim().max(180).optional(),
  phone: z.string().trim().max(40).optional(),
  focus: z.string().trim().max(180).optional(),
  partnerCategory: z.enum(partnerCategoryValues).optional(),
  businessCategory: z.enum(businessCategoryValues).optional(),
  siteContext: z.string().trim().max(240).optional(),
  serviceArea: z.string().trim().max(180).optional(),
  message: z.string().trim().min(12, "Please share a little more detail.").max(5000),
});

export type InquiryInput = z.infer<typeof inquiryInputSchema>;
