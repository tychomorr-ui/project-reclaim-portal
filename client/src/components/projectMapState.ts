export type MapView = "all" | "active" | "proposed" | "verified";

export type MapSiteState = {
  status: "active" | "planned" | "completed" | "unverified";
  verificationStatus: "verified" | "unverified";
};

export function siteMatchesMapView(site: MapSiteState, view: MapView) {
  if (view === "active") return site.status === "active";
  if (view === "proposed") return site.status === "planned" || site.status === "unverified";
  if (view === "verified") return site.verificationStatus === "verified";
  return true;
}

export function mapSiteState(site: MapSiteState) {
  if (site.verificationStatus === "verified") return "verified" as const;
  if (site.status === "active") return "active" as const;
  return "proposed" as const;
}
