import { describe, test, expect } from "bun:test";
import { cleanList, hasContentList } from "./contentRules";
import { servicesInCategory, categoryAnchor } from "./serviceCategories";

describe("Dynamic service categories", () => {
  test("services can be assigned to an arbitrary category rather than a fixed enum", () => {
    const services = [{id: "one", category_id: "custom-category", published: true}, {id: "two", category_id: "original-category", published: true}];
    expect(servicesInCategory(services, "custom-category").map(s => s.id)).toEqual(["one"]);
    services[1].category_id = "custom-category";
    expect(servicesInCategory(services, "custom-category").map(s => s.id)).toEqual(["one", "two"]);
  });
  test("empty categories and draft services have no public items", () => {
    expect(servicesInCategory([{category_id: "new", published: false}], "new", true)).toEqual([]);
    expect(servicesInCategory([], "new", true)).toEqual([]);
  });
  test("category links preserve digits and punctuation without collisions", () => {
    expect(categoryAnchor("category-1")).not.toBe(categoryAnchor("category-2"));
  });
});

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