import { PageIntro, PortalChrome, StatusPill } from "@/components/PortalChrome";
import {
  ArrowRight,
  ArrowUpRight,
  Compass,
  Network,
  Route,
  Sprout,
  UsersRound,
} from "lucide-react";
import React from "react";
import { Link } from "wouter";

const nodes = [
  {
    title: "Root",
    text: "A grounding layer for deeper connection and shared interfaces.",
    icon: Compass,
    tone: "bg-[#f4f2e9] border-[#d8d3c2] text-[#203023]",
  },
  {
    title: "Site work",
    text: "Land, properties, mitigation, restoration, and material recovery.",
    icon: Sprout,
    tone: "bg-[#eef4e2] border-[#c8d4ae] text-[#203023]",
  },
  {
    title: "People & pathways",
    text: "Voluntary paid work, learning, local support, and advancement.",
    icon: UsersRound,
    tone: "bg-[#f4f2e9] border-[#d8d3c2] text-[#203023]",
  },
  {
    title: "Partners & evidence",
    text: "Shared scopes, materials, local value, and visible proof of completion.",
    icon: Route,
    tone: "bg-[#eef4e2] border-[#c8d4ae] text-[#203023]",
  },
];

export default function Nexus() {
  return (
    <PortalChrome>
      <main>
        <PageIntro
          eyebrow="NEXINUS ecosystem"
          title="Project Reclaim is a physical doorway into a wider network of coordination."
          description="The portal recognizes that local stewardship, public evidence, practical work, and durable community relationships can be strengthened by clear connections across the broader NEXINUS ecosystem."
        />
        <section className="bg-[#fffdf7]">
          <div className="container py-16 md:py-24">
            <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
              <div>
                <p className="mono-label text-[11px] text-[#597248]">
                  Systems view
                </p>
                <h2 className="display-type mt-4 max-w-3xl text-4xl font-semibold text-[#203023]">
                  A visible loop from root systems to site-level work.
                </h2>
              </div>
              <StatusPill tone="planned">Relationship map</StatusPill>
            </div>
            <div className="relative mt-12 grid gap-4 lg:grid-cols-[0.82fr_1.2fr_0.82fr] lg:items-center">
              <div className="grid gap-4">
                {nodes.slice(0, 2).map(node => (
                  <article
                    key={node.title}
                    className={`rounded-2xl border p-6 ${node.tone}`}
                  >
                    <node.icon className="size-5 text-[#55764d]" />
                    <h3 className="display-type mt-8 text-3xl font-semibold">
                      {node.title}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-[#566453]">
                      {node.text}
                    </p>
                  </article>
                ))}
              </div>
              <div className="relative rounded-2xl bg-[#1b2b1d] p-8 text-[#f2f3e9] sm:p-10">
                <div className="absolute inset-x-6 top-1/2 hidden border-t border-dashed border-[#c7d99c]/50 lg:block" />
                <Network className="size-6 text-[#c7d99c]" />
                <p className="mono-label mt-10 text-[11px] text-[#c7d99c]">
                  Project Reclaim
                </p>
                <h3 className="display-type mt-4 text-5xl font-semibold">
                  The physical work layer.
                </h3>
                <p className="mt-5 leading-7 text-[#dce2d1]/80">
                  Project Reclaim turns conditions on land into accountable
                  work, recoverable materials, practical capability, local
                  economic activity, and evidence that can be followed.
                </p>
                <div className="mt-8 grid gap-2 border-t border-white/10 pt-6 text-xs text-[#dce2d1]/70">
                  <span>
                    Condition → scope → crew → material → outcome → evidence
                  </span>
                  <span>Root → NEXINUS → connected initiatives and sites</span>
                </div>
              </div>
              <div className="grid gap-4">
                {nodes.slice(2).map(node => (
                  <article
                    key={node.title}
                    className={`rounded-2xl border p-6 ${node.tone}`}
                  >
                    <node.icon className="size-5 text-[#55764d]" />
                    <h3 className="display-type mt-8 text-3xl font-semibold">
                      {node.title}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-[#566453]">
                      {node.text}
                    </p>
                  </article>
                ))}
              </div>
            </div>
            <p className="mt-7 max-w-3xl text-sm leading-7 text-[#586756]">
              This diagram explains an intended information architecture. It
              does not claim that every listed relationship, site, partner, or
              initiative is currently connected through an operating agreement.
            </p>
          </div>
        </section>
        <section className="bg-[#f4f2e9]">
          <div className="container grid gap-5 py-16 md:grid-cols-2 md:py-24">
            <article className="rounded-2xl bg-[#1b2b1d] p-8 text-[#f2f3e9] sm:p-10">
              <Network className="size-6 text-[#c7d99c]" />
              <p className="mono-label mt-12 text-[11px] text-[#c7d99c]">
                NEXINUS
              </p>
              <h2 className="display-type mt-4 text-4xl font-semibold">
                A shared network of connected initiatives.
              </h2>
              <p className="mt-5 leading-7 text-[#dce2d1]/80">
                NEXINUS is the broader ecosystem context. Project Reclaim’s role
                is to translate connective capacity into grounded, place-based
                work.
              </p>
              <a
                href="https://github.com/tychomorr-ui/nexinus-net"
                target="_blank"
                rel="noreferrer"
                className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-[#d9e9b4] hover:underline"
              >
                View NEXINUS reference <ArrowUpRight className="size-4" />
              </a>
            </article>
            <article className="rounded-2xl border border-[#d8d3c2] bg-[#fffdf7] p-8 sm:p-10">
              <Compass className="size-6 text-[#55764d]" />
              <p className="mono-label mt-12 text-[11px] text-[#597248]">
                Root
              </p>
              <h2 className="display-type mt-4 text-4xl font-semibold text-[#203023]">
                The grounding layer for deeper connection.
              </h2>
              <p className="mt-5 leading-7 text-[#566453]">
                Root is named as a connected initiative within the NEXINUS
                context. Its public relationship to Project Reclaim can expand
                as project governance and shared interfaces are confirmed.
              </p>
              <a
                href="https://github.com/tychomorr-ui/root-sovereign-gateway-staging"
                target="_blank"
                rel="noreferrer"
                className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-[#315334] hover:underline"
              >
                View Root reference <ArrowUpRight className="size-4" />
              </a>
            </article>
          </div>
          <div className="container pb-16 md:pb-24">
            <article className="rounded-2xl border border-[#c8d4ae] bg-[#eef4e2] p-8 sm:p-10">
              <p className="mono-label text-[11px] text-[#597248]">
                Pharo-Lapse public boundary
              </p>
              <h2 className="display-type mt-4 text-3xl font-semibold text-[#203023]">
                Development and testing—not a claimed public-safety deployment.
              </h2>
              <p className="mt-4 max-w-4xl text-base leading-7 text-[#526050]">
                Pharo-Lapse is a development and testing program for
                offline-capable, signed, store-and-forward communications. It is
                not a completed countywide public-safety network, replacement
                for emergency communications, or live government system without
                formal testing, safety review, authorization, and agency
                acceptance.
              </p>
              <Link
                href="/pharo-lapse"
                aria-label="Read the Pharo-Lapse public positioning document"
                className="group mt-6 inline-flex items-center gap-3 rounded-xl border border-[#b8c99d] bg-[#f7f9ef] px-4 py-3 text-sm font-semibold text-[#315334] shadow-sm transition-all duration-200 ease-out hover:-translate-y-0.5 hover:border-[#7c9a63] hover:bg-[#dce9bc] hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#55764d] focus-visible:ring-offset-2"
              >
                <span className="rounded-full bg-[#c7d99c] px-2 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-[#203023]">
                  Document
                </span>
                <span>Read the full public positioning</span>
                <ArrowRight className="size-4 transition-transform duration-200 ease-out group-hover:translate-x-0.5" />
              </Link>
            </article>
          </div>
        </section>
      </main>
    </PortalChrome>
  );
}
