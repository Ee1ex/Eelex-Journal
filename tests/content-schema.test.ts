import { describe, expect, it } from "vitest";

import {
  ContentValidationError,
  contentCategories,
  validateContentFrontmatter,
} from "../src/content/schema";

describe("Phase 4 内容元数据", () => {
  const validFrontmatter = {
    slug: "designing-readable-interfaces",
    title: "让界面更易阅读的三个小决定",
    excerpt: "从信息层级、留白和文字密度出发，让阅读路径更自然。",
    publishedAt: "2026-07-20",
    category: "文章",
    tags: ["界面设计", "阅读体验"],
  };

  it("接受完整且受支持的内容元数据", () => {
    expect(contentCategories).toEqual(["文章", "学习笔记", "工具分享"]);
    expect(
      validateContentFrontmatter(
        validFrontmatter,
        "content/designing-readable-interfaces.mdx",
      ),
    ).toEqual(validFrontmatter);
  });

  it("规范化 YAML 解析出的日期对象", () => {
    expect(
      validateContentFrontmatter(
        { ...validFrontmatter, publishedAt: new Date("2026-07-20T00:00:00Z") },
        "content/date-value.mdx",
      ),
    ).toMatchObject({ publishedAt: "2026-07-20" });
  });

  it("拒绝缺失字段、非法日期、非法分类、空标签与不成对封面", () => {
    const filePath = "content/invalid.mdx";

    expect(() =>
      validateContentFrontmatter({ ...validFrontmatter, title: "" }, filePath),
    ).toThrow(ContentValidationError);
    expect(() =>
      validateContentFrontmatter(
        { ...validFrontmatter, publishedAt: "2026/07/20" },
        filePath,
      ),
    ).toThrow(/publishedAt/);
    expect(() =>
      validateContentFrontmatter(
        { ...validFrontmatter, category: "随笔" },
        filePath,
      ),
    ).toThrow(/category/);
    expect(() =>
      validateContentFrontmatter({ ...validFrontmatter, tags: [] }, filePath),
    ).toThrow(/tags/);
    expect(() =>
      validateContentFrontmatter(
        { ...validFrontmatter, cover: "/content/cover.svg" },
        filePath,
      ),
    ).toThrow(/coverAlt/);
  });
});
