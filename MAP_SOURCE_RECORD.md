# Project Reclaim Map Source Record

## BLM California Surface Management Agency

**Verified source:** [BLM CA Land Status and Surface Management Agency FeatureServer](https://gis.blm.gov/caarcgis/rest/services/lands/BLM_CA_LandStatus_SurfaceManagementAgency/FeatureServer/0)  
**Verified August 12, 2026 (Pacific Time)**

The official Bureau of Land Management California feature service identifies itself as a polygon feature layer, supports `Query` and `Extract`, and advertises JSON, GeoJSON, and PBF query formats. A one-record GeoJSON query returned a valid `FeatureCollection` with polygon geometry. The public map may therefore request the official service only as an **attributed context layer**.

> **Interpretation boundary:** This layer depicts BLM land-status/surface-management context. It is not a title opinion, survey, legal property boundary, access authorization, cultural clearance, work permit, or Project Reclaim site approval.

## Integration Control

The portal must keep the BLM layer optional, visually distinct from Project Reclaim site records, limited to the current view extent, source-attributed, and paired with the interpretation boundary above. Parcel overlays and any OnX Hunt data remain outside this implementation until Project Reclaim has separately confirmed data rights, applicable terms, and appropriate public-display controls.

## Reference

[1]: https://gis.blm.gov/caarcgis/rest/services/lands/BLM_CA_LandStatus_SurfaceManagementAgency/FeatureServer/0 "BLM California Surface Management Agency Feature Service"
