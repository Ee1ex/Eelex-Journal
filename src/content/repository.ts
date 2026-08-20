import { existsSync, readFileSync, readdirSync } from "node:fs";
import { basename, join, resolve, sep } from "node:path";

import GithubSlugger from "github-slugger";
import matter from "gray-matter";

import {
  ContentValidationError,
  type ContentSummary,
  validateContentFrontmatter,
} from "./schema";

export { ContentValidationError } from "./schema";

export type TableOfContentsItem = {
  depth: 2 | 3;
  id: string;
  text: string;
};

type ContentRecord = ContentSummary & {
  wordCount: number;
  readingMinutes: number;
  source: string;
  tableOfContents: readonly TableOfContentsItem[];
};

export type ContentCollection = {
  items: readonly ContentListItem[];
  getBySlug(slug: string): ContentListItem | undefined;
  getSource(slug: string): string | undefined;
  getTableOfContents(slug: string): readonly TableOfContentsItem[];
};

export type ContentListItem = ContentSummary & {
  wordCount: number;
  readingMinutes: number;
};

export type ArchiveGroup = {
  year: string;
  items: readonly ContentListItem[];
};

function countReadableWords(source: string) {
  const plainText = source
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/[#>*_`\-[\]()]/g, " ");

  return plainText.match(/[\p{Script=Han}]|[A-Za-z0-9]+/gu)?.length ?? 0;
}

function getTableOfContents(source: string): readonly TableOfContentsItem[] {
  const slugger = new GithubSlugger();
  const headings = source.matchAll(/^(##|###)\s+(.+?)\s*#*\s*$/gm);

  return Array.from(headings, ([, marker, rawText]) => {
    const text = rawText.trim();

    return {
      depth: marker.length as 2 | 3,
      id: slugger.slug(text),
      text,
    };
  });
}

function validateBody(source: string, filePath: string) {
  if (/^#\s+/m.test(source)) {
    throw new ContentValidationError(filePath, "正文不能包含 h1");
  }

  if (/^(?:import|export)\s/m.test(source)) {
    throw new ContentValidationError(filePath, "正文不能包含 MDX 模块语法");
  }

  validateContentImages(source, filePath);
}

function validateContentImages(source: string, filePath: string) {
  const contentDirectory = resolve(process.cwd(), "public", "content");
  const images = source.matchAll(/!\[([^\]]*)\]\(([^)\s]+)\)/g);

  for (const [, rawAlt, rawSource] of images) {
    const alt = rawAlt.trim();
    const imageSource = rawSource.trim();

    if (!alt) {
      throw new ContentValidationError(filePath, "正文图片必须提供替代文本");
    }

    if (!imageSource.startsWith("/content/")) {
      throw new ContentValidationError(
        filePath,
        "正文图片必须使用 /content/ 本地资源",
      );
    }

    const imagePath = resolve(process.cwd(), "public", `.${imageSource}`);

    if (
      !imagePath.startsWith(`${contentDirectory}${sep}`) ||
      !existsSync(imagePath)
    ) {
      throw new ContentValidationError(
        filePath,
        `正文图片资源不存在：${imageSource}`,
      );
    }
  }
}

function readRecord(directory: string, filename: string): ContentRecord {
  const filePath = join(directory, filename);
  const parsed = matter(readFileSync(filePath, "utf8"));
  const summary = validateContentFrontmatter(parsed.data, filePath);
  const filenameSlug = basename(filename, ".mdx");

  if (summary.slug !== filenameSlug) {
    throw new ContentValidationError(filePath, "文件名必须与 slug 一致");
  }

  validateBody(parsed.content, filePath);
  const wordCount = countReadableWords(parsed.content);

  return {
    ...summary,
    wordCount,
    readingMinutes: Math.max(1, Math.ceil(wordCount / 300)),
    source: parsed.content,
    tableOfContents: getTableOfContents(parsed.content),
  };
}

export function loadContentFromDirectory(directory: string): ContentCollection {
  const records = readdirSync(directory)
    .filter((filename) => filename.endsWith(".mdx"))
    .map((filename) => readRecord(directory, filename))
    .sort((left, right) => right.publishedAt.localeCompare(left.publishedAt));
  const bySlug = new Map(records.map((record) => [record.slug, record]));

  if (bySlug.size !== records.length) {
    throw new ContentValidationError(directory, "slug 不能重复");
  }

  return {
    items: records.map(
      ({ source: _source, tableOfContents: _toc, ...item }) => item,
    ),
    getBySlug: (slug) => {
      const record = bySlug.get(slug);
      return (
        record &&
        (({ source: _source, tableOfContents: _toc, ...item }) => item)(record)
      );
    },
    getSource: (slug) => bySlug.get(slug)?.source,
    getTableOfContents: (slug) => bySlug.get(slug)?.tableOfContents ?? [],
  };
}

const contentDirectory = join(process.cwd(), "content");

export function getAllContent() {
  return loadContentFromDirectory(contentDirectory).items;
}

export function getContentBySlug(slug: string) {
  return loadContentFromDirectory(contentDirectory).getBySlug(slug);
}

export function getContentSourceBySlug(slug: string) {
  return loadContentFromDirectory(contentDirectory).getSource(slug);
}

export function getContentTableOfContents(slug: string) {
  return loadContentFromDirectory(contentDirectory).getTableOfContents(slug);
}

export function getStaticContentParams() {
  return getAllContent().map(({ slug }) => ({ slug }));
}

export function getArchiveGroups(): readonly ArchiveGroup[] {
  const groups = new Map<string, ContentListItem[]>();

  for (const item of getAllContent()) {
    const year = item.publishedAt.slice(0, 4);
    groups.set(year, [...(groups.get(year) ?? []), item]);
  }

  return Array.from(groups, ([year, items]) => ({ year, items }));
}

export function getAdjacentContent(slug: string) {
  const items = getAllContent();
  const index = items.findIndex((item) => item.slug === slug);

  return {
    newer: index > 0 ? items[index - 1] : undefined,
    older:
      index >= 0 && index < items.length - 1 ? items[index + 1] : undefined,
  };
}

export function getSiteStats() {
  const items = getAllContent();
  const categories = new Set(items.map((item) => item.category));
  const tags = new Set(items.flatMap((item) => item.tags));

  return {
    posts: items.length,
    categories: categories.size,
    tags: tags.size,
    totalWords: items.reduce((total, item) => total + item.wordCount, 0),
    lastPublishedAt: items[0]?.publishedAt,
  };
}
