import { ArrowRight, Building2, Sprout, Trees, UsersRound } from "lucide-react";
import React from "react";
import { Link } from "wouter";
import { StatusPill } from "./PortalChrome";

export type ImpactMetricRecord = {
  metricKey: string;
  value: string | null;
  unit: string;
  verificationStatus: string;
  sourceTitle: string | null;
  sourceUrl: string | null;
  methodologyNote: string | null;
  dataAsOf: Date | null;
};

const definitions = [
  { key: "participants", label: "Participants", description: "People with a documented, voluntary participation record in the reporting period.", icon: UsersRound },
  { key: "acres_restored", label: "Acres restored", description: "Authorized work area with documented restoration activity and a verifiable scope.", icon: Trees },
  { key: "local_business_partnerships", label: "Local-business partnerships", description: "Documented active business relationships using the published partnership definition.", icon: Building2 },
];

function formatDate(value: Date | null) {
  return value ? new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric" }).format(new Date(value)) : "Not yet recorded";
}

export function ImpactMetricsDashboard({ metrics }: { metrics?: ImpactMetricRecord[] }) {
  return <section className="border-y border-[#cad7b7] bg-[#e7eed8]"><div className="container py-16 md:py-24"><div className="flex flex-col justify-between gap-5 md:flex-row md:items-end"><div><p className="mono-label text-[11px] text-[#597248]">Public impact dashboard</p><h2 className="display-type mt-4 max-w-3xl text-4xl font-semibold text-[#203023] md:text-5xl">Measure the work carefully, or do not claim it.</h2></div><div className="flex items-center gap-3"><StatusPill tone="unverified">Verification-led</StatusPill><Sprout className="size-5 text-[#54734e]" /></div></div><p className="mt-5 max-w-3xl text-base leading-7 text-[#526050]">These measures remain pending until a documented source, reporting date, definition, and verification review are available. Project Reclaim does not substitute estimates, inquiries, proposed work areas, or future capacity for verified public results.</p><div className="mt-10 grid gap-4 lg:grid-cols-3">{definitions.map((definition) => {
    const metric = metrics?.find((item) => item.metricKey === definition.key);
    const verified = metric?.verificationStatus === "verified" && metric.value !== null && metric.dataAsOf !== null;
    const Icon = definition.icon;
    return <article key={definition.key} className="rounded-2xl border border-[#c6d1ad] bg-[#fbfcf6] p-6 shadow-[0_14px_30px_rgba(49,83,52,0.06)]"><div className="flex items-start justify-between gap-4"><span className="grid size-10 place-items-center rounded-full bg-[#e4edd6] text-[#496d43]"><Icon className="size-5" /></span><StatusPill tone={verified ? "open" : "planned"}>{verified ? "Verified" : "Pending verification"}</StatusPill></div><p className="mono-label mt-8 text-[10px] text-[#627d59]">{definition.label}</p><p className="display-type mt-3 text-4xl font-semibold text-[#203023]">{verified ? metric.value : "—"}</p><p className="mt-1 text-sm font-medium text-[#486044]">{verified ? metric.unit : "Pending first verified record"}</p><p className="mt-5 min-h-18 text-sm leading-6 text-[#566453]">{definition.description}</p><div className="mt-6 border-t border-[#dde4cf] pt-4 text-xs leading-5 text-[#60705d]">{verified ? <><span className="font-semibold text-[#40583d]">As of {formatDate(metric.dataAsOf)}</span><br />{metric.sourceUrl ? <a href={metric.sourceUrl} target="_blank" rel="noreferrer" className="font-semibold text-[#315334] hover:underline">{metric.sourceTitle || "View source"}</a> : metric.sourceTitle || "Source record on file"}</> : <>The methodology and supporting evidence will be published with the first verified record.</>}</div></article>;
  })}</div><div className="mt-8 grid gap-5 rounded-2xl border border-[#c6d1ad] bg-[#f7faef] p-6 md:grid-cols-[1fr_auto] md:items-center"><div><p className="mono-label text-[10px] text-[#597248]">How to read this dashboard</p><p className="mt-3 max-w-3xl text-sm leading-7 text-[#526050]">A verified record is tied to a published metric definition, source, date, and review context. “Pending verification” is an honest operating state—not a zero and not a promise of a future result.</p></div><Link href="/impact" className="inline-flex items-center gap-2 text-sm font-semibold text-[#315334] hover:underline">Evidence &amp; methodology <ArrowRight className="size-4" /></Link></div></div></section>;
}
