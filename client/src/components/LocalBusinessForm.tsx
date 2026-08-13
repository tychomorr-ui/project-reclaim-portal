import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { trpc } from "@/lib/trpc";
import { Loader2, Store } from "lucide-react";
import { FormEvent, useState } from "react";
import { toast } from "sonner";

const categories = [
  { value: "equipment_vendor", label: "Equipment dealer, rental, or repair" },
  { value: "contractor", label: "Contractor or construction trade" },
  { value: "arborist_or_forestry", label: "Arborist, tree service, or forestry" },
  { value: "material_supplier", label: "Lumber, building material, nursery, or landscape supply" },
  { value: "trucking_or_hauling", label: "Trucking, hauling, or logistics" },
  { value: "repair_or_fabrication", label: "Repair, fabrication, or shop service" },
  { value: "professional_services", label: "Professional service" },
  { value: "other", label: "Other local business" },
] as const;
const equipmentTypes = [
  { value: "chainsaws_and_handtools", label: "Chainsaws, hand tools, or maintenance" },
  { value: "forestry_and_arborist", label: "Forestry, arborist, or tree-care equipment" },
  { value: "heavy_equipment", label: "Heavy equipment or attachments" },
  { value: "tractors_and_implements", label: "Tractors, implements, or land equipment" },
  { value: "trailers_and_hauling", label: "Trailers, hauling, or fleet equipment" },
  { value: "woodshop_and_milling", label: "Woodshop, milling, or material-processing equipment" },
  { value: "safety_and_ppe", label: "Safety, PPE, or field supplies" },
  { value: "rental_or_repair", label: "Rental, repair, or service support" },
  { value: "other", label: "Other equipment or supplies" },
] as const;
const contractorSpecialties = [
  { value: "carpentry_and_rehabilitation", label: "Carpentry and rehabilitation" },
  { value: "fire_mitigation_and_fuels", label: "Fire mitigation and fuels work" },
  { value: "forestry_and_arborist", label: "Forestry and arborist services" },
  { value: "earthwork_and_sitework", label: "Earthwork and site work" },
  { value: "hauling_and_logistics", label: "Hauling and logistics" },
  { value: "electrical_or_plumbing", label: "Electrical or plumbing" },
  { value: "roofing_or_building_envelope", label: "Roofing or building envelope" },
  { value: "landscape_or_irrigation", label: "Landscape or irrigation" },
  { value: "other", label: "Other contracting specialty" },
] as const;
const blank = { name: "", email: "", organization: "", phone: "", serviceArea: "", businessCategory: "", equipmentType: "", contractorSpecialty: "", message: "" };

export function LocalBusinessForm() {
  const [fields, setFields] = useState(blank);
  const update = (key: keyof typeof blank, value: string) => setFields((current) => ({ ...current, [key]: value }));
  const submit = trpc.inquiries.create.useMutation({ onSuccess: () => { toast.success("Thank you. Your local-business sign-up has been received."); setFields(blank); }, onError: (error) => toast.error(error.message || "We could not send your sign-up. Please try again.") });
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => { event.preventDefault(); submit.mutate({ type: "partnership", name: fields.name, email: fields.email, organization: fields.organization || undefined, phone: fields.phone || undefined, serviceArea: fields.serviceArea || undefined, businessCategory: fields.businessCategory as typeof categories[number]["value"], equipmentType: fields.equipmentType ? fields.equipmentType as typeof equipmentTypes[number]["value"] : undefined, contractorSpecialty: fields.contractorSpecialty ? fields.contractorSpecialty as typeof contractorSpecialties[number]["value"] : undefined, partnerCategory: fields.businessCategory === "arborist_or_forestry" || fields.businessCategory === "contractor" ? "contractor_or_forestry" : "equipment_or_material_partner", focus: "Local business partner sign-up", message: fields.message }); };

  return <form onSubmit={handleSubmit} className="paper-card rounded-2xl border border-[#d8d3c2] bg-[#fffdf7] p-5 sm:p-7"><div className="flex items-start gap-3"><span className="grid size-10 place-items-center rounded-xl bg-[#e7efd9] text-[#456842]"><Store className="size-5" /></span><div><p className="mono-label text-[10px] text-[#597248]">Local business sign-up</p><h2 className="display-type mt-2 text-3xl font-semibold text-[#203023]">Join the local value loop.</h2></div></div><p className="mt-5 text-sm leading-6 text-[#566453]">Tell us what you do and where you work. This creates a prospective contact record only; it is not a contract, preferred-vendor designation, or purchasing commitment.</p><div className="mt-7 grid gap-5 sm:grid-cols-2"><div className="grid gap-2"><Label htmlFor="business-name">Your name</Label><Input id="business-name" required value={fields.name} onChange={(event) => update("name", event.target.value)} /></div><div className="grid gap-2"><Label htmlFor="business-email">Business email</Label><Input id="business-email" type="email" required value={fields.email} onChange={(event) => update("email", event.target.value)} /></div><div className="grid gap-2"><Label htmlFor="business-organization">Business name</Label><Input id="business-organization" required value={fields.organization} onChange={(event) => update("organization", event.target.value)} /></div><div className="grid gap-2"><Label htmlFor="business-phone">Phone (optional)</Label><Input id="business-phone" value={fields.phone} onChange={(event) => update("phone", event.target.value)} /></div><div className="grid gap-2"><Label htmlFor="business-category">Business category</Label><select id="business-category" required value={fields.businessCategory} onChange={(event) => update("businessCategory", event.target.value)} className="h-10 rounded-md border border-[#d8d3c2] bg-white px-3 text-sm text-[#2f3f31] outline-none focus:border-[#66855d] focus:ring-2 focus:ring-[#66855d]/20"><option value="">Select a category</option>{categories.map((category) => <option key={category.value} value={category.value}>{category.label}</option>)}</select></div><div className="grid gap-2"><Label htmlFor="equipment-type">Equipment type offered</Label><select id="equipment-type" value={fields.equipmentType} onChange={(event) => update("equipmentType", event.target.value)} className="h-10 rounded-md border border-[#d8d3c2] bg-white px-3 text-sm text-[#2f3f31] outline-none focus:border-[#66855d] focus:ring-2 focus:ring-[#66855d]/20"><option value="">Select if applicable</option>{equipmentTypes.map((type) => <option key={type.value} value={type.value}>{type.label}</option>)}</select></div><div className="grid gap-2"><Label htmlFor="contractor-specialty">Contractor specialty</Label><select id="contractor-specialty" value={fields.contractorSpecialty} onChange={(event) => update("contractorSpecialty", event.target.value)} className="h-10 rounded-md border border-[#d8d3c2] bg-white px-3 text-sm text-[#2f3f31] outline-none focus:border-[#66855d] focus:ring-2 focus:ring-[#66855d]/20"><option value="">Select if applicable</option>{contractorSpecialties.map((specialty) => <option key={specialty.value} value={specialty.value}>{specialty.label}</option>)}</select></div><div className="grid gap-2"><Label htmlFor="business-area">Service area</Label><Input id="business-area" required value={fields.serviceArea} onChange={(event) => update("serviceArea", event.target.value)} placeholder="County, region, or general area" /></div></div><div className="mt-5 grid gap-2"><Label htmlFor="business-message">How could you contribute?</Label><Textarea id="business-message" required minLength={12} value={fields.message} onChange={(event) => update("message", event.target.value)} className="min-h-32 resize-y" placeholder="Equipment, services, materials, training, repair, project support, or another idea." /></div><p className="mt-4 text-xs leading-5 text-[#687166]">Please do not include pricing, bids, licensing documents, private site details, or sensitive information through this form. Those can be requested later through a documented process.</p><Button type="submit" disabled={submit.isPending} className="mt-6 rounded-full bg-[#294b2c] px-5 text-white hover:bg-[#1e3921]">{submit.isPending ? <><Loader2 className="mr-2 size-4 animate-spin" />Sending</> : "Submit local-business profile"}</Button></form>;
}
