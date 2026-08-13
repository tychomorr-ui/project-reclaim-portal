export type CatalogRecord = {
  id: number;
  title: string;
  summary: string;
  category: string;
  status: string;
  materialLabel: string | null;
  originProjectTitle: string | null;
  originProjectCategory: string | null;
  availabilityNote: string | null;
  updatedAt: Date;
};

export type CatalogSort = "updated" | "title" | "category" | "available";

export function catalogMaterialOptions(records: CatalogRecord[]) {
  return Array.from(new Set(records.flatMap((item) => item.materialLabel ? [item.materialLabel] : []))).sort();
}

export function catalogProjectTypeOptions(records: CatalogRecord[]) {
  return Array.from(new Set(records.flatMap((item) => item.originProjectCategory ? [item.originProjectCategory] : []))).sort();
}

export function filterAndSortCatalog(records: CatalogRecord[], material: string, projectType: string, sort: CatalogSort) {
  return records.filter((item) => (material === "all" || item.materialLabel === material) && (projectType === "all" || item.originProjectCategory === projectType)).toSorted((a, b) => {
    if (sort === "title") return a.title.localeCompare(b.title);
    if (sort === "category") return a.category.localeCompare(b.category);
    if (sort === "available") return Number(a.status !== "available") - Number(b.status !== "available");
    return Number(b.updatedAt) - Number(a.updatedAt);
  });
}
