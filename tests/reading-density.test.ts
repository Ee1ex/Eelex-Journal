import { describe, expect, it } from "vitest";

import {
  defaultDensity,
  densityOptions,
  getDensityPreviewClass,
} from "../src/lab/reading-density";

describe("阅读密度状态", () => {
  it("声明舒适密度为默认状态和三种可选状态", () => {
    expect(defaultDensity).toBe("comfortable");
    expect(densityOptions.map((option) => option.value)).toEqual([
      "compact",
      "comfortable",
      "relaxed",
    ]);
    expect(getDensityPreviewClass("compact")).toContain("leading");
    expect(getDensityPreviewClass("relaxed")).toContain("leading");
  });
});
