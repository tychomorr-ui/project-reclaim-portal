import { MapView } from "@/components/Map";
import { StatusPill } from "@/components/PortalChrome";
import { Button } from "@/components/ui/button";
import { MapPin, Navigation, Radio } from "lucide-react";
import { mapSiteState, siteMatchesMapView, type MapView as MapViewFilter } from "./projectMapState";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

type MapProject = {
  id: number;
  title: string;
  category: string;
  status: "active" | "planned" | "completed" | "unverified";
  verificationStatus: "verified" | "unverified";
  locationLabel: string | null;
  latitude: string | null;
  longitude: string | null;
};

const viewLabels: Record<MapViewFilter, string> = {
  all: "All records",
  active: "Active work",
  proposed: "Proposed sites",
  verified: "Verified records",
};

function mapTone(project: MapProject) {
  const state = mapSiteState(project);
  if (state === "verified") return "#496f80";
  if (state === "active") return "#5d7d52";
  return "#b28d4a";
}

function mapGlyph(project: MapProject) {
  const state = mapSiteState(project);
  if (state === "verified") return "✓";
  if (state === "active") return "•";
  return "?";
}

export function ProjectMap({ sites }: { sites: MapProject[] }) {
  const [view, setView] = useState<MapViewFilter>("all");
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [mapUnavailable, setMapUnavailable] = useState(false);
  const markers = useRef<google.maps.marker.AdvancedMarkerElement[]>([]);
  const visibleSites = useMemo(() => sites.filter((site) => siteMatchesMapView(site, view)), [sites, view]);
  const mappedSites = useMemo(() => visibleSites.filter((site) => Number.isFinite(Number(site.latitude)) && Number.isFinite(Number(site.longitude))), [visibleSites]);

  const refreshMarkers = useCallback(() => {
    if (!map || !window.google?.maps?.marker) return;
    markers.current.forEach((marker) => { marker.map = null; });
    markers.current = mappedSites.map((site) => {
      const pin = new window.google.maps.marker.PinElement({
        background: mapTone(site),
        borderColor: "#fffdf7",
        glyphColor: "#fffdf7",
        glyph: mapGlyph(site),
      });
      return new window.google.maps.marker.AdvancedMarkerElement({
        map,
        position: { lat: Number(site.latitude), lng: Number(site.longitude) },
        title: `${site.title} — ${site.status}`,
        content: pin.element,
      });
    });
  }, [map, mappedSites]);

  useEffect(() => {
    refreshMarkers();
    return () => { markers.current.forEach((marker) => { marker.map = null; }); };
  }, [refreshMarkers]);

  return <section aria-labelledby="site-map-title" className="mt-12 overflow-hidden rounded-2xl border border-[#c8d4ae] bg-[#eef4e2]">
    <div className="grid gap-8 p-6 md:p-8 lg:grid-cols-[0.8fr_1.2fr]">
      <div className="flex flex-col">
        <div className="flex items-center gap-3"><MapPin className="size-5 text-[#456842]" /><p className="mono-label text-[10px] text-[#58704c]">Spatial workboard</p></div>
        <h2 id="site-map-title" className="display-type mt-5 text-4xl font-semibold text-[#203023]">See where a project is becoming real.</h2>
        <p className="mt-4 text-sm leading-7 text-[#526050]">This map is ready to distinguish verified current work from proposed or unverified site records. No locations are shown until Project Reclaim has authorization to publish them.</p>
        <div className="mt-7 flex flex-wrap gap-2" aria-label="Project map filters">{(Object.keys(viewLabels) as MapViewFilter[]).map((item) => <Button key={item} size="sm" variant={view === item ? "default" : "outline"} onClick={() => setView(item)} className={`rounded-full ${view === item ? "bg-[#294b2c] text-white hover:bg-[#1e3921]" : "border-[#9bac8b] bg-white text-[#315334] hover:bg-[#f7f9ef]"}`}>{viewLabels[item]}</Button>)}</div>
        <div className="mt-8 grid gap-3 text-sm text-[#50604d]"><div className="flex items-center gap-3"><span className="size-2.5 rounded-full bg-[#5d7d52]" />Active work</div><div className="flex items-center gap-3"><span className="size-2.5 rounded-full bg-[#b28d4a]" />Proposed or unverified site</div><div className="flex items-center gap-3"><span className="size-2.5 rounded-full bg-[#496f80]" />Verified record</div></div>
        <div className="mt-auto border-t border-[#c8d4ae] pt-6"><div className="flex items-center gap-2"><Radio className="size-4 text-[#597248]" /><StatusPill tone="unverified">Publication-safe</StatusPill></div><p className="mt-3 text-xs leading-5 text-[#667064]">Current records with approved coordinates: {mappedSites.length}. Public site data remains separate from private property assessments and incoming leads.</p></div>
      </div>
      <div className="relative overflow-hidden rounded-xl border border-[#b7c6a4] bg-[#d8e0c8]">
        <MapView initialCenter={{ lat: 39.0483, lng: -122.7786 }} initialZoom={9} onMapReady={setMap} onMapError={() => setMapUnavailable(true)} className="h-[430px]" />
        {mappedSites.length === 0 || mapUnavailable ? <div className="pointer-events-none absolute inset-x-5 bottom-5 rounded-xl border border-[#dde6cc] bg-[#f8faef]/95 p-4 shadow-sm"><div className="flex gap-3"><Navigation className="mt-0.5 size-4 shrink-0 text-[#58704c]" /><div><p className="text-sm font-semibold text-[#294b2c]">{mapUnavailable ? "Regional map service is temporarily unavailable." : "No public coordinates are published in this view."}</p><p className="mt-1 text-xs leading-5 text-[#5a6657]">{mapUnavailable ? "The registry filters remain active. Public site pins will appear here when the map service and approved coordinates are available." : "The map is centered for regional orientation only. Proposed, active, and verified pins will appear after a project record is authorized for public display."}</p></div></div></div> : null}
      </div>
    </div>
  </section>;
}
