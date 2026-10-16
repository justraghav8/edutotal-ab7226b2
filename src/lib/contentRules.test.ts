import { describe, test, expect } from "bun:test";
import { cleanList, hasContentList } from "./contentRules";

describe("CMS empty sections", () => {
  test("empty profile or content lists do not make a section visible", () => {
    expect(hasContentList([])).toBe(false);
    expect(hasContentList(["", "  "])).toBe(false);
    expect(hasContentList(["Consulting support"])).toBe(true);
  });
  test("blank list entries are removed before saving", () => {
    expect(cleanList([" Benefit one ", "", "  ", "Benefit two"])).toEqual(["Benefit one", "Benefit two"]);
  });
});