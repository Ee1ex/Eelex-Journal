import { mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

import {
  ContentValidationError,
  loadContentFromDirectory,
} from "../src/content/repository";

const frontmatter = (overrides: Record<string, string> = {}) => `---
slug: ${overrides.slug ?? "first-post"}
title: ${overrides.title ?? "第一篇"}
excerpt: ${overrides.excerpt ?? "摘要"}
publishedAt: ${overrides.publishedAt ?? "2026-07-20"}
category: ${overrides.category ?? "文章"}
tags: [前端, 设计]
---

## 起点

正文。`;

describe("Phase 4 内容仓库", () => {
  it("从单一目录读取、校验并按发布日期倒序返回内容", () => {
    const directory = mkdtempSync(join(tmpdir(), "eelex-content-"));

    try {
      writeFileSync(
        join(directory, "older.mdx"),
        frontmatter({
          slug: "older",
          title: "较早内容",
          publishedAt: "2026-07-01",
        }),
      );
      writeFileSync(
        join(directory, "newer.mdx"),
        frontmatter({
          slug: "newer",
          title: "较新内容",
          publishedAt: "2026-07-20",
        }),
      );

      const collection = loadContentFromDirectory(directory);

      expect(collection.items.map((item) => item.slug)).toEqual([
        "newer",
        "older",
      ]);
      expect(collection.getBySlug("older")?.title).toBe("较早内容");
      expect(collection.getBySlug("missing")).toBeUndefined();
      expect(collection.getTableOfContents("newer")).toEqual([
        { depth: 2, id: "起点", text: "起点" },
      ]);
    } finally {
      rmSync(directory, { force: true, recursive: true });
    }
  });

  it("拒绝文件名与 slug 不一致的内容", () => {
    const directory = mkdtempSync(join(tmpdir(), "eelex-content-"));

    try {
      writeFileSync(join(directory, "different-name.mdx"), frontmatter());

      expect(() => loadContentFromDirectory(directory)).toThrow(
        ContentValidationError,
      );
      expect(() => loadContentFromDirectory(directory)).toThrow(
        /different-name/,
      );
    } finally {
      rmSync(directory, { force: true, recursive: true });
    }
  });
});
