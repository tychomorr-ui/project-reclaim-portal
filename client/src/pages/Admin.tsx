import { useAuth } from "@/_core/hooks/useAuth";
import DashboardLayout from "@/components/DashboardLayout";
import { StatusPill } from "@/components/PortalChrome";
import { Button } from "@/components/ui/button";
import { trpc } from "@/lib/trpc";
import { businessPartnerDetailTokens, humanizeBusinessDetail } from "@/components/businessPartnerDetails";
import { ChevronDown, Inbox, Mail, MapPin, Search, ShieldCheck } from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";

type InquiryStatus = "new" | "reviewing" | "responded" | "archived";

const statusTone: Record<InquiryStatus, "open" | "planned" | "neutral" | "unverified"> = {
  new: "open", reviewing: "planned", responded: "neutral", archived: "unverified",
};

const partnerCategoryLabels: Record<string, string> = {
  cal_fire: "CAL FIRE", hud: "HUD", terra: "TERRA", tribal_ecorestoration_alliance: "Tribal EcoRestoration Alliance", county_or_local_government: "County or local government", tribal_government: "Tribal government", contractor_or_forestry: "Contractor, arborist, or forestry", equipment_or_material_partner: "Equipment, materials, or local supplier", workforce_or_support_provider: "Workforce or support provider", other: "Other partner",
};

export default function Admin() {
  const { user, loading } = useAuth();
  const ownerAccess = trpc.owner.access.useQuery(undefined, { enabled: Boolean(user), retry: false });
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | InquiryStatus>("all");
  const inquiries = trpc.inquiries.list.useQuery(undefined, { enabled: Boolean(ownerAccess.data?.isOwner), retry: false });
  const utils = trpc.useUtils();
  const update = trpc.inquiries.updateStatus.useMutation({
    onSuccess: async () => { await utils.inquiries.list.invalidate(); toast.success("Inquiry status updated."); },
    onError: (error) => toast.error(error.message || "Status could not be updated."),
  });
  const displayed = useMemo(() => (inquiries.data || []).filter((item) => {
    const haystack = `${item.name} ${item.email} ${item.organization || ""} ${item.focus || ""} ${item.partnerCategory || ""} ${item.businessCategory || ""} ${item.equipmentType || ""} ${item.contractorSpecialty || ""} ${item.serviceArea || ""} ${item.siteContext || ""} ${item.message}`.toLowerCase();
    return (filter === "all" || item.status === filter) && haystack.includes(search.toLowerCase());
  }), [filter, inquiries.data, search]);
  const newCount = inquiries.data?.filter((item) => item.status === "new").length || 0;

  return <DashboardLayout>{loading ? null : <div className="mx-auto max-w-6xl">
    <header className="flex flex-col justify-between gap-5 border-b border-[#d7d1bf] pb-7 md:flex-row md:items-end">
      <div><p className="mono-label text-[10px] text-[#597248]">Owner workspace</p><h1 className="display-type mt-3 text-4xl font-semibold text-[#203023]">Inquiry desk</h1><p className="mt-2 text-sm text-[#5a6657]">Review all contact and partnership submissions in one protected place.</p></div>
      <div className="flex items-center gap-3 rounded-full border border-[#cad7b7] bg-[#eef4e2] px-4 py-2 text-sm text-[#40533f]"><ShieldCheck className="size-4" />Owner access verified</div>
    </header>
    <section className="mt-7 grid gap-4 sm:grid-cols-3">
      <article className="rounded-xl border border-[#d8d3c2] bg-[#fffdf7] p-5"><p className="mono-label text-[10px] text-[#6c8062]">All submissions</p><p className="display-type mt-4 text-4xl font-semibold text-[#203023]">{inquiries.data?.length ?? "—"}</p></article>
      <article className="rounded-xl border border-[#c8d4ae] bg-[#eef4e2] p-5"><p className="mono-label text-[10px] text-[#58704c]">Needs review</p><p className="display-type mt-4 text-4xl font-semibold text-[#203023]">{inquiries.isLoading ? "—" : newCount}</p></article>
      <article className="rounded-xl border border-[#d8d3c2] bg-[#fffdf7] p-5"><p className="mono-label text-[10px] text-[#6c8062]">Notice channel</p><p className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#315334]"><Mail className="size-4" />In-app owner alert</p></article>
    </section>
    <section className="mt-7 rounded-xl border border-[#d8d3c2] bg-[#fffdf7] p-4 sm:p-6">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div className="relative max-w-md flex-1"><Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[#788273]" /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search inquiries" className="h-10 w-full rounded-lg border border-[#d8d3c2] bg-white pl-10 pr-3 text-sm outline-none focus:border-[#66855d] focus:ring-2 focus:ring-[#66855d]/20" /></div>
        <div className="flex flex-wrap gap-2">{(["all", "new", "reviewing", "responded", "archived"] as const).map((item) => <Button key={item} onClick={() => setFilter(item)} variant={filter === item ? "default" : "outline"} size="sm" className={`rounded-full capitalize ${filter === item ? "bg-[#294b2c] text-white hover:bg-[#1e3921]" : "border-[#d8d3c2] bg-white text-[#50604d] hover:bg-[#f1f4e8]"}`}>{item}</Button>)}</div>
      </div>
      <div className="mt-6 grid gap-4">
        {inquiries.isLoading ? <div className="h-52 animate-pulse rounded-xl bg-[#eceae1]" /> : inquiries.error ? <div className="rounded-xl border border-[#e8c8bd] bg-[#fff0ec] p-5 text-sm text-[#8a4432]">The inquiry data could not be loaded. Please refresh and try again.</div> : displayed.length ? displayed.map((item) => <article key={item.id} className="rounded-xl border border-[#ded9c9] bg-[#fcfbf6] p-5">
          <div className="flex flex-col justify-between gap-4 sm:flex-row"><div><div className="flex flex-wrap items-center gap-2"><StatusPill tone={statusTone[item.status]}>{item.status}</StatusPill><span className="mono-label text-[9px] text-[#71806b]">{item.type === "partnership" ? "Partnership" : "Contact"}</span>{item.partnerCategory ? <StatusPill tone="planned">{partnerCategoryLabels[item.partnerCategory] || humanizeBusinessDetail(item.partnerCategory)}</StatusPill> : null}{item.businessCategory ? <StatusPill tone="neutral">{humanizeBusinessDetail(item.businessCategory)}</StatusPill> : null}<StatusPill tone={item.ownerNotificationSent ? "open" : "unverified"}>{item.ownerNotificationSent ? "Alert sent" : "Alert pending"}</StatusPill></div><h2 className="mt-4 text-lg font-semibold text-[#263a28]">{item.name}</h2><p className="mt-1 text-sm text-[#667064]">{item.email}{item.organization ? ` · ${item.organization}` : ""}</p></div><label className="relative inline-flex w-full items-center sm:w-44"><span className="sr-only">Set inquiry status</span><select value={item.status} disabled={update.isPending} onChange={(event) => update.mutate({ id: item.id, status: event.target.value as InquiryStatus })} className="h-10 w-full appearance-none rounded-lg border border-[#d8d3c2] bg-white px-3 pr-9 text-sm text-[#465544] outline-none focus:border-[#66855d]">{(["new", "reviewing", "responded", "archived"] as InquiryStatus[]).map((status) => <option key={status} value={status}>{status}</option>)}</select><ChevronDown className="pointer-events-none absolute right-3 size-4 text-[#74806f]" /></label></div>
          {item.focus ? <p className="mt-5 text-xs font-semibold uppercase tracking-wide text-[#58704c]">{item.focus}</p> : null}
          {(item.equipmentType || item.contractorSpecialty) ? <div className="mt-4 flex flex-wrap gap-2">{businessPartnerDetailTokens(item.equipmentType, item.contractorSpecialty).map((detail, index) => <StatusPill key={detail} tone={index === 0 ? "planned" : "neutral"}>{detail}</StatusPill>)}</div> : null}
          {item.serviceArea ? <p className="mt-2 inline-flex items-center gap-2 text-xs text-[#5b7057]"><MapPin className="size-3" />{item.serviceArea}</p> : null}{item.siteContext ? <p className="mt-2 inline-flex items-center gap-2 text-xs text-[#5b7057]"><MapPin className="size-3" />{item.siteContext}</p> : null}<p className="mt-3 whitespace-pre-wrap text-sm leading-6 text-[#526050]">{item.message}</p><p className="mt-5 text-xs text-[#7a8376]">Received {new Date(item.createdAt).toLocaleString()}</p>
        </article>) : <div className="grid place-items-center rounded-xl border border-dashed border-[#c4ccba] bg-[#f5f7ee] px-5 py-16 text-center"><Inbox className="size-6 text-[#5d7955]" /><h2 className="display-type mt-5 text-3xl font-semibold text-[#203023]">No matching inquiries</h2><p className="mt-2 max-w-md text-sm leading-6 text-[#566453]">New contact and partnership submissions will appear here as soon as they are received.</p></div>}
      </div>
    </section>
  </div>}</DashboardLayout>;
}
