import { z } from "zod";

export const partnerCategoryValues = ["cal_fire", "hud", "terra", "tribal_ecorestoration_alliance", "county_or_local_government", "tribal_government", "contractor_or_forestry", "equipment_or_material_partner", "workforce_or_support_provider", "other"] as const;
export const businessCategoryValues = ["equipment_vendor", "contractor", "arborist_or_forestry", "material_supplier", "trucking_or_hauling", "repair_or_fabrication", "professional_services", "other"] as const;
export const equipmentTypeValues = ["chainsaws_and_handtools", "forestry_and_arborist", "heavy_equipment", "tractors_and_implements", "trailers_and_hauling", "woodshop_and_milling", "safety_and_ppe", "rental_or_repair", "other"] as const;
export const contractorSpecialtyValues = ["carpentry_and_rehabilitation", "fire_mitigation_and_fuels", "forestry_and_arborist", "earthwork_and_sitework", "hauling_and_logistics", "electrical_or_plumbing", "roofing_or_building_envelope", "landscape_or_irrigation", "other"] as const;

export const inquiryInputSchema = z.object({
  type: z.enum(["contact", "partnership"]),
  name: z.string().trim().min(2, "Please enter your name.").max(120),
  email: z.string().trim().email("Please enter a valid email address.").max(320),
  organization: z.string().trim().max(180).optional(),
  phone: z.string().trim().max(40).optional(),
  focus: z.string().trim().max(180).optional(),
  partnerCategory: z.enum(partnerCategoryValues).optional(),
  businessCategory: z.enum(businessCategoryValues).optional(),
  equipmentType: z.enum(equipmentTypeValues).optional(),
  contractorSpecialty: z.enum(contractorSpecialtyValues).optional(),
  siteContext: z.string().trim().max(240).optional(),
  serviceArea: z.string().trim().max(180).optional(),
  message: z.string().trim().min(12, "Please share a little more detail.").max(5000),
});

export type InquiryInput = z.infer<typeof inquiryInputSchema>;
