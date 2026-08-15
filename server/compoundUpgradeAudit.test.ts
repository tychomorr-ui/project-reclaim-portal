import { readdirSync, readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const app = readFileSync(new URL("../client/src/App.tsx", import.meta.url), "utf8");
const chrome = readFileSync(new URL("../client/src/components/PortalChrome.tsx", import.meta.url), "utf8");
const projects = readFileSync(new URL("../client/src/pages/Projects.tsx", import.meta.url), "utf8");
const routers = readFileSync(new URL("./routers.ts", import.meta.url), "utf8");
const governance = readFileSync(new URL("./governance.ts", import.meta.url), "utf8");
const configTest = readFileSync(new URL("./compoundUpgradeConfig.test.ts", import.meta.url), "utf8");
const pageDirectory = new URL("../client/src/pages/", import.meta.url);
const pageSources = readdirSync(pageDirectory).filter(file => file.endsWith(".tsx") && file !== "ComponentShowcase.tsx").map(file => readFileSync(new URL(`../client/src/pages/${file}`, import.meta.url), "utf8"));

describe("compound upgrade audit surface", () => {
  it("keeps every public operating destination represented in the route table", () => {
    const expectedRoutes = [
      "/explore", "/operating-model", "/projects", "/opportunities", "/skills", "/residential-readiness",
      "/resources", "/field-pilot", "/evidence", "/provenance", "/partnerships", "/impact", "/roadmap",
      "/support-services", "/stories", "/contact",
    ];
    for (const route of expectedRoutes) expect(app).toContain(route);
  });

  it("keeps every internal href mapped to a real route and every page-level form labeled", () => {
    const routePaths = [...app.matchAll(/<Route path=\"([^\"]+)\"/g)].map(match => match[1]);
    const internalHrefs = pageSources.flatMap(source => [...source.matchAll(/href="(\/[^\"]*)"/g)].map(match => match[1])).filter(href => !href.startsWith("/manus-storage/") && !href.startsWith("/api/"));
    for (const href of internalHrefs) expect(routePaths).toContain(href);
    for (const source of pageSources.filter(source => source.includes("<form"))) {
      expect(source).toMatch(/onSubmit|action=/);
      expect(source).toMatch(/<label|aria-label=|aria-labelledby=/);
    }
  });

  it("keeps public-facing data pages explicit about empty or pending states", () => {
    const dataPageNames = ["Projects.tsx", "Products.tsx", "Resources.tsx", "FieldPilot.tsx", "Stories.tsx", "Impact.tsx"];
    const dataPageSources = dataPageNames.map(file => readFileSync(new URL(`../client/src/pages/${file}`, import.meta.url), "utf8"));
    for (const source of dataPageSources) expect(source).toMatch(/empty|pending|No |Nothing|not active|not currently/i);
  });

  it("keeps compound destinations visible in the shared navigation and registry", () => {
    expect(chrome).toContain("/explore");
    expect(chrome).toContain("/operating-model");
    expect(projects).toContain("Two-site planning context");
    expect(projects).toContain("not public project records, map pins, secured properties, or active work claims");
    expect(projects).toContain("<ProjectMap sites={registry.data || []} />");
  });

  it("keeps public endpoint coverage separate from owner governance", () => {
    for (const endpoint of ["projects", "opportunities", "products", "impactMetrics", "stories", "resources", "fieldPilots"]) {
      expect(routers).toContain(`${endpoint}: publicProcedure`);
    }
    for (const endpoint of ["auth", "owner", "registry", "governance", "inquiries"]) expect(routers).toContain(`${endpoint}:`);
    for (const ownerSurface of ["metrics", "stories", "resources", "fieldPilots", "evidenceAssets", "provenancePackets"]) {
      expect(governance).toContain(`${ownerSurface}: router`);
      expect(governance).toContain("ownerProcedure");
    }
    expect(routers).toContain("governance: governanceRouter");
    expect(routers).toContain("list: ownerProcedure");
    expect(governance).toContain("ownerProcedure");
    expect(configTest).toContain("PROJECT_RECLAIM_COMPOUND_UPGRADE_MODE");
    expect(configTest).toContain("planning-only");
  });
});
