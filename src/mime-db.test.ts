import { describe, it, expect } from "bun:test";
import { MIME_DB, search, POPULAR } from "./mime-db";

const VALID_CATEGORIES = ["image", "video", "audio", "text", "application", "font", "multipart"] as const;

describe("MIME_DB data integrity", () => {
  it("has entries for all categories", () => {
    for (const cat of VALID_CATEGORIES) {
      const found = MIME_DB.filter((e) => e.category === cat);
      expect(found.length, `No entries for category ${cat}`).toBeGreaterThan(0);
    }
  });

  it("every entry has required fields", () => {
    for (const entry of MIME_DB) {
      expect(entry.type, "missing type").toBeTruthy();
      expect(entry.name, `missing name for ${entry.type}`).toBeTruthy();
      expect(entry.category, `missing category for ${entry.type}`).toBeTruthy();
      expect(entry.extensions, `missing extensions for ${entry.type}`).toBeDefined();
      expect(entry.description, `missing description for ${entry.type}`).toBeTruthy();
    }
  });

  it("every entry has a valid category", () => {
    for (const entry of MIME_DB) {
      expect(VALID_CATEGORIES).toContain(entry.category as any);
    }
  });

  it("every type follows mime/subtype format", () => {
    for (const entry of MIME_DB) {
      expect(entry.type, `invalid format: ${entry.type}`).toMatch(/^[a-z]+\/[a-z0-9.+\-]+$/);
    }
  });

  it("extensions start with a dot", () => {
    for (const entry of MIME_DB) {
      for (const ext of entry.extensions) {
        expect(ext, `extension missing dot: ${ext} in ${entry.type}`).toMatch(/^\./);
      }
    }
  });

  it("has no duplicate types", () => {
    const types = MIME_DB.map((e) => e.type);
    const unique = new Set(types);
    expect(unique.size).toBe(types.length);
  });

  it("includes commonly expected MIME types", () => {
    const types = MIME_DB.map((e) => e.type);
    expect(types).toContain("image/jpeg");
    expect(types).toContain("image/png");
    expect(types).toContain("application/json");
    expect(types).toContain("text/html");
    expect(types).toContain("video/mp4");
  });
});

describe("search()", () => {
  it("returns empty for empty query", () => {
    expect(search("")).toHaveLength(0);
    expect(search("   ")).toHaveLength(0);
  });

  it("finds by exact MIME type", () => {
    const results = search("image/jpeg");
    expect(results.length).toBeGreaterThan(0);
    expect(results[0].type).toBe("image/jpeg");
  });

  it("finds by file extension", () => {
    const results = search(".png");
    expect(results.length).toBeGreaterThan(0);
    expect(results[0].type).toBe("image/png");
  });

  it("finds by extension without dot", () => {
    const results = search("mp4");
    expect(results.length).toBeGreaterThan(0);
    expect(results[0].type).toBe("video/mp4");
  });

  it("finds by partial type name", () => {
    const results = search("json");
    expect(results.length).toBeGreaterThan(0);
    const types = results.map((r) => r.type);
    expect(types).toContain("application/json");
  });

  it("returns no results for unknown query", () => {
    expect(search("zzzunknownzzz")).toHaveLength(0);
  });

  it("exact match ranks first", () => {
    const results = search("image/png");
    expect(results[0].type).toBe("image/png");
  });
});

describe("POPULAR", () => {
  it("contains only valid MIME types from MIME_DB", () => {
    const allTypes = new Set(MIME_DB.map((e) => e.type));
    for (const type of POPULAR) {
      expect(allTypes.has(type), `POPULAR contains unknown type: ${type}`).toBe(true);
    }
  });

  it("has no duplicates", () => {
    const unique = new Set(POPULAR);
    expect(unique.size).toBe(POPULAR.length);
  });
});
