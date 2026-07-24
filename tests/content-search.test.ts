import { describe, expect, it } from "vitest";

import { filterContent } from "../src/content/search";

const items = [
  {
    slug: "a",
    title: "阅读界面",
    excerpt: "留白",
    publishedAt: "2026-07-20",
    category: "文章" as const,
    tags: ["设计"],
  },
  {
    slug: "b",
    title: "学习记录",
    excerpt: "前端实践",
    publishedAt: "2026-07-12",
    category: "学习笔记" as const,
    tags: ["React"],
  },
];

describe("Phase 4 内容发现", () => {
  it("将规范化查询和分类叠加，且保持原有日期顺序", () => {
    expect(
      filterContent(items, { category: "全部", query: " react " }).map(
        (item) => item.slug,
      ),
    ).toEqual(["b"]);
    expect(
      filterContent(items, { category: "文章", query: "" }).map(
        (item) => item.slug,
      ),
    ).toEqual(["a"]);
  });
});
