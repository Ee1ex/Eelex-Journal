import { describe, expect, it } from "vitest";

import { getMockContentBySlug, mockContent } from "../src/mocks/content";

describe("Phase 3 模拟内容", () => {
  it("由单一集合覆盖三类内容并按发布日期降序排列", () => {
    expect(new Set(mockContent.map((item) => item.category))).toEqual(
      new Set(["文章", "学习笔记", "工具分享"]),
    );
    expect(mockContent.map((item) => item.publishedAt)).toEqual([
      "2026-07-20",
      "2026-07-12",
      "2026-07-05",
    ]);
  });

  it("只通过 slug 查询单项，并为未知 slug 返回 undefined", () => {
    expect(getMockContentBySlug("designing-readable-interfaces")?.title).toBe(
      "让界面更易阅读的三个小决定",
    );
    expect(getMockContentBySlug("missing")).toBeUndefined();
  });
});
