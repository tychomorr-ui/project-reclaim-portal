import { describe, expect, it } from "vitest";

describe("compound upgrade configuration", () => {
  it("keeps the compound-upgrade mode planning-only", () => {
    expect(process.env.PROJECT_RECLAIM_COMPOUND_UPGRADE_MODE).toBe("planning-only");
  });
});
