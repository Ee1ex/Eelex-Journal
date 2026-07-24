import { readFileSync, readdirSync } from "node:fs";
import { basename, join } from "node:path";

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
  source: string;
  tableOfContents: readonly TableOfContentsItem[];
};

export type ContentCollection = {
  items: readonly ContentSummary[];
  getBySlug(slug: string): ContentSummary | undefined;
  getSource(slug: string): string | undefined;
  getTableOfContents(slug: string): readonly TableOfContentsItem[];
};

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

  return {
    ...summary,
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
