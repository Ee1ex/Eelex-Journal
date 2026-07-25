import { mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

import {
  ContentValidationError,
  loadContentFromDirectory,
} from "../src/content/repository";

function contentFile(slug: string, body: string) {
  return `---
slug: ${slug}
title: 图片检查
excerpt: 用于验证正文图片。
publishedAt: 2026-07-20
category: 文章
tags: [测试]
---

${body}
`;
}

function withContentFile(
  filename: string,
  body: string,
  run: (directory: string) => void,
) {
  const directory = mkdtempSync(join(tmpdir(), "eelex-content-assets-"));
  const slug = filename.replace(/\.mdx$/, "");

  try {
    writeFileSync(join(directory, filename), contentFile(slug, body));
    run(directory);
  } finally {
    rmSync(directory, { force: true, recursive: true });
  }
}

describe("Phase 6 MDX 图片资源", () => {
  it("接受存在且带替代文本的本地内容图片", () => {
    withContentFile(
      "image-check.mdx",
      "![阅读层级示意](/content/reading-flow.svg)",
      (directory) => {
        expect(loadContentFromDirectory(directory).items).toHaveLength(1);
      },
    );
  });

  it("拒绝指向缺失本地资源的正文图片", () => {
    withContentFile(
      "missing-image.mdx",
      "![缺失资源](/content/missing.svg)",
      (directory) => {
        expect(() => loadContentFromDirectory(directory)).toThrow(
          ContentValidationError,
        );
      },
    );
  });

  it("拒绝没有替代文本或使用远程地址的正文图片", () => {
    withContentFile(
      "empty-alt.mdx",
      "![](/content/reading-flow.svg)",
      (directory) => {
        expect(() => loadContentFromDirectory(directory)).toThrow(/替代文本/);
      },
    );
    withContentFile(
      "remote-image.mdx",
      "![远程图片](https://example.com/reading-flow.svg)",
      (directory) => {
        expect(() => loadContentFromDirectory(directory)).toThrow(
          /\/content\//,
        );
      },
    );
  });
});
