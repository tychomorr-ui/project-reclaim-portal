import { Menu, Sprout, X } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";

const navItems = [
  { label: "Initiative", href: "/initiative" },
  { label: "Projects", href: "/projects" },
  { label: "Opportunities", href: "/opportunities" },
  { label: "Evidence", href: "/impact" },
  { label: "NEXINUS", href: "/nexus" },
];

export function PortalChrome({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const [open, setOpen] = useState(false);

  return <div className="min-h-screen overflow-x-clip">
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#132016]/92 text-[#f7f4ea] backdrop-blur-xl">
      <div className="container flex min-h-18 items-center justify-between gap-4 py-3">
        <Link href="/" className="group flex items-center gap-3" onClick={() => setOpen(false)}>
          <span className="grid size-9 place-items-center rounded-full border border-[#b8c797]/40 bg-[#8da86a]/15 text-[#c9d7a8]"><Sprout className="size-4" /></span>
          <span><span className="block text-[11px] font-medium tracking-[0.2em] text-[#b8c797] uppercase">Project</span><span className="-mt-1 block font-semibold tracking-tight">Reclaim</span></span>
        </Link>
        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary navigation">
          {navItems.map((item) => <Link key={item.href} href={item.href} className={`rounded-md px-3 py-2 text-sm transition-colors hover:bg-white/10 ${location === item.href ? "text-[#d9e9b4]" : "text-[#e6e7de]/80"}`}>{item.label}</Link>)}
        </nav>
        <div className="hidden items-center gap-2 lg:flex">
          <Link href="/contact" className="rounded-md px-3 py-2 text-sm text-[#e6e7de]/90 hover:bg-white/10">Get involved</Link>
          <Link href="/partnerships"><Button className="rounded-full bg-[#c1d698] px-4 text-[#1b291b] hover:bg-[#dae9bb]">Partner with us</Button></Link>
        </div>
        <button className="grid size-10 place-items-center rounded-md border border-white/15 lg:hidden" aria-label={open ? "Close navigation" : "Open navigation"} aria-expanded={open} onClick={() => setOpen(!open)}>{open ? <X className="size-5" /> : <Menu className="size-5" />}</button>
      </div>
      {open ? <nav className="border-t border-white/10 px-4 py-3 lg:hidden" aria-label="Mobile navigation"><div className="container grid gap-1">{navItems.map((item) => <Link key={item.href} href={item.href} className="rounded-md px-3 py-2.5 text-sm text-[#e6e7de] hover:bg-white/10" onClick={() => setOpen(false)}>{item.label}</Link>)}<Link href="/contact" className="rounded-md px-3 py-2.5 text-sm text-[#e6e7de]" onClick={() => setOpen(false)}>Get involved</Link><Link href="/partnerships" className="mt-1 rounded-md bg-[#c1d698] px-3 py-2.5 text-sm font-semibold text-[#1b291b]" onClick={() => setOpen(false)}>Partner with us</Link></div></nav> : null}
    </header>
    {children}
    <footer className="bg-[#132016] text-[#f3f1e8]"><div className="container grid gap-10 py-12 md:grid-cols-[1.4fr_0.7fr_0.8fr]"><div><div className="flex items-center gap-2"><Sprout className="size-4 text-[#c1d698]" /><span className="font-semibold">Project Reclaim</span></div><p className="mt-4 max-w-sm text-sm leading-6 text-[#d6dbc9]/75">A living portal for community-centered fire mitigation, resource recovery, workforce pathways, and land restoration.</p><p className="mt-5 text-xs text-[#d6dbc9]/50">The digital serves the physical. The physical proves the digital.</p></div><div><p className="mono-label text-[10px] text-[#b8c797]">Explore</p><div className="mt-4 grid gap-2 text-sm text-[#d6dbc9]/80"><Link href="/projects">Project registry</Link><Link href="/opportunities">Work & training</Link><Link href="/impact">Evidence & impact</Link><Link href="/contact">Get involved</Link></div></div><div><p className="mono-label text-[10px] text-[#b8c797]">Connect</p><div className="mt-4 grid gap-2 text-sm text-[#d6dbc9]/80"><a href="https://github.com/tychomorr-ui" target="_blank" rel="noreferrer">GitHub</a><Link href="/privacy">Privacy</Link><Link href="/terms">Terms</Link><Link href="/contact">Contact</Link></div></div></div><div className="border-t border-white/10"><div className="container flex flex-col gap-2 py-5 text-xs text-[#d6dbc9]/45 sm:flex-row sm:justify-between"><span>© {new Date().getFullYear()} Project Reclaim.</span><span>Built for visible, accountable stewardship.</span></div></div></footer>
  </div>;
}

export function PageIntro({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return <section className="border-b border-[#d6d3c5] bg-[#f4f2e9]"><div className="container py-16 md:py-24"><p className="mono-label text-[11px] text-[#597248]">{eyebrow}</p><h1 className="display-type mt-5 max-w-4xl text-5xl font-semibold leading-[0.98] text-[#1b281d] md:text-7xl">{title}</h1><p className="mt-7 max-w-2xl text-lg leading-8 text-[#51604f]">{description}</p></div></section>;
}

export function StatusPill({ children, tone = "neutral" }: { children: React.ReactNode; tone?: "neutral" | "open" | "planned" | "unverified" }) {
  const tones = { neutral: "bg-[#e7e5da] text-[#4b594b]", open: "bg-[#dcebc4] text-[#385329]", planned: "bg-[#e9e1c9] text-[#6c5728]", unverified: "bg-[#ebe7de] text-[#6e665a]" };
  return <span className={`mono-label inline-flex rounded-full px-2.5 py-1 text-[9px] ${tones[tone]}`}>{children}</span>;
}
