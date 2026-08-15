import React from "react";
import { ArrowUpRight, Boxes, ClipboardCheck, CloudRain, Compass, Flame, Home, Network, ShieldCheck, Trees } from "lucide-react";
import { Link } from "wouter";
import { PageIntro, PortalChrome, StatusPill } from "@/components/PortalChrome";

const dimensions = [
  { title: "Physical operations", icon: Trees, state: "Foundation in place", copy: "Projects, work orders, crews, materials, completion evidence, and community value connect the field mission to a reviewable record.", href: "/projects" },
  { title: "Residential pathways", icon: Home, state: "Planning pathway", copy: "The vineyard-style campus and future property-reclamation model remain planning candidates until property control, habitability, authorization, and staffing are confirmed.", href: "/residential-readiness" },
  { title: "Workforce and portfolios", icon: Boxes, state: "Foundation in place", copy: "Skills, apprenticeship tracks, credentials from approved issuers, and work portfolios help people build evidence of capability over time.", href: "/skills" },
  { title: "Fire and disaster readiness", icon: Flame, state: "Partner-dependent", copy: "Fire resilience, flood preparation, river and drainage work, and recovery support require qualified supervision and authorization from responsible agencies.", href: "/opportunities" },
  { title: "Evidence and provenance", icon: ClipboardCheck, state: "Local readiness", copy: "Private evidence assets and SHA-256 provenance packets prepare a reviewable record without claiming a live blockchain, Truth Ledger, or external verification service.", href: "/provenance" },
  { title: "Partner coordination", icon: Network, state: "Open for partnership", copy: "NEXINUS, Root, county bodies, CAL FIRE, HUD, Tribal EcoRestoration Alliance, workforce, property, and local-business pathways are connected as explicit relationship surfaces—not assumed integrations.", href: "/partnerships" },
  { title: "Oregon launch readiness", icon: CloudRain, state: "Planning only", copy: "The Oregon-facing layer is prepared as a deployment and partner-readiness context; it does not claim relocation, live Oregon operations, or an authorized Oregon property.", href: "/roadmap" },
  { title: "Navigation and accountability", icon: Compass, state: "Foundation in place", copy: "Explore, operating model, evidence, resources, field pilot, roadmap, and owner governance routes form one navigation plate with explicit empty and pending states.", href: "/explore" },
];

export default function MetaCompound() {
  return <PortalChrome>
    <PageIntro eyebrow="META-COMPOUND UPGRADE" title="One operating map. Many dimensions of capability." description="The compound layer connects Project Reclaim’s physical work, people, places, records, partners, and future launch contexts without collapsing planning assumptions into active claims." />
    <main className="container py-12 md:py-20">
      <section className="grid gap-8 rounded-[2rem] border border-[#d9d6c8] bg-[#f4f2e9] p-6 md:grid-cols-[1.2fr_0.8fr] md:p-10">
        <div>
          <div className="flex items-center gap-3"><ShieldCheck className="size-5 text-[#557147]" /><StatusPill tone="planned">PLANNING + OPERATIONS READINESS</StatusPill></div>
          <h2 className="display-type mt-5 max-w-2xl text-4xl font-semibold leading-tight text-[#1b281d] md:text-5xl">The digital serves the physical.</h2>
          <p className="mt-5 max-w-2xl text-base leading-7 text-[#51604f]">Meta-compound means every dimension has a place to start, a responsible owner, a release condition, and a way to connect to the work. It does not mean every integration, property, credential, emergency capability, or partner relationship is already active.</p>
        </div>
        <div className="rounded-2xl border border-[#d9d6c8] bg-[#fffdf7] p-5"><p className="mono-label text-[10px] text-[#6d795d]">Official operating model</p><p className="mt-3 text-lg font-semibold text-[#243224]">Vineyard-style residential and land-stewardship campus</p><p className="mt-2 text-sm leading-6 text-[#60705d]">plus the 3360 Old Highway 53 operations, materials, and field-school planning hub.</p><p className="mt-4 text-xs leading-5 text-[#6a7167]">Both are planning candidates, not secured properties or active sites.</p></div>
      </section>
      <section className="mt-12 grid gap-4 md:grid-cols-2">
        {dimensions.map((dimension) => { const Icon = dimension.icon; return <article key={dimension.title} className="rounded-2xl border border-[#d9d6c8] bg-[#fffdf7] p-5 transition-transform hover:-translate-y-0.5"><div className="flex items-start justify-between gap-4"><span className="grid size-10 place-items-center rounded-xl bg-[#e6edd6] text-[#557147]"><Icon className="size-5" /></span><StatusPill tone={dimension.state === "Foundation in place" ? "open" : dimension.state === "Planning only" ? "planned" : "unverified"}>{dimension.state}</StatusPill></div><h3 className="mt-5 text-xl font-semibold text-[#243224]">{dimension.title}</h3><p className="mt-2 text-sm leading-6 text-[#60705d]">{dimension.copy}</p><Link href={dimension.href} className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#557147]">Open surface <ArrowUpRight className="size-4" /></Link></article>; })}
      </section>
      <section className="mt-12 rounded-2xl border border-[#d9d6c8] bg-[#132016] p-6 text-[#f7f4ea] md:p-8"><p className="mono-label text-[10px] text-[#c1d698]">Release discipline</p><div className="mt-5 grid gap-6 md:grid-cols-3"><div><p className="font-semibold">Confirmed</p><p className="mt-2 text-sm leading-6 text-[#d6dbc9]/75">Implemented routes, current data contracts, and validated safety boundaries.</p></div><div><p className="font-semibold">Planning</p><p className="mt-2 text-sm leading-6 text-[#d6dbc9]/75">Property models, Oregon launch context, future credentials, and partner pathways.</p></div><div><p className="font-semibold">Pending authorization</p><p className="mt-2 text-sm leading-6 text-[#d6dbc9]/75">External deployments, agency work, emergency response, property use, and ecosystem integrations.</p></div></div></section>
    </main>
  </PortalChrome>;
}
