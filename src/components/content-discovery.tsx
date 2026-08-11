"use client";

import { useMemo, useState } from "react";

import type { ContentCategory, ContentSummary } from "../content/schema";
import { filterContent } from "../content/search";
import { ContentCard } from "./content-card";

const categories: readonly ("全部" | ContentCategory)[] = [
  "全部",
  "文章",
  "学习笔记",
  "工具分享",
];

const categoryClasses = {
  全部: "border-ink text-ink",
  文章: "border-category-article text-category-article",
  学习笔记: "border-category-note text-category-note",
  工具分享: "border-category-tool text-category-tool",
} as const;

export function ContentDiscovery({
  items,
}: {
  items: readonly ContentSummary[];
}) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<(typeof categories)[number]>("全部");
  const results = useMemo(
    () => filterContent(items, { category, query }),
    [category, items, query],
  );

  return (
    <div className="eelex-content-discovery">
      <div className="grid gap-5 border-b border-border pb-6 sm:grid-cols-[1fr_minmax(16rem,22rem)] sm:items-end">
        <div aria-label="内容分类" className="flex flex-wrap gap-x-5 gap-y-3">
          {categories.map((item) => {
            const selected = category === item;

            return (
              <button
                aria-pressed={selected}
                className={`border-b pb-1 text-sm transition-colors ${selected ? `${categoryClasses[item]} font-medium` : "border-transparent text-muted hover:text-ink"}`}
                key={item}
                onClick={() => setCategory(item)}
                type="button"
              >
                {item}
              </button>
            );
          })}
        </div>
        <label className="sr-only" htmlFor="content-search">
          搜索内容
        </label>
        <input
          className="w-full rounded-[var(--eelex-radius-input)] border border-border bg-transparent px-3 py-2.5 text-sm text-ink outline-focus placeholder:text-ash"
          id="content-search"
          onChange={(event) => setQuery(event.target.value)}
          placeholder="搜索标题、摘要、分类或标签"
          type="search"
          value={query}
        />
      </div>
      <p
        aria-live="polite"
        className="mt-4 font-mono text-[length:var(--eelex-text-meta)] text-muted"
      >
        {results.length} 篇内容
      </p>
      {results.length === 0 ? (
        <p className="mt-8 border-y border-dashed border-border py-8 text-sm text-muted">
          没有找到匹配的内容，试试更短的关键词或切换分类。
        </p>
      ) : (
        <div className="mt-6">
          {results.map((item) => (
            <ContentCard item={item} key={item.slug} />
          ))}
        </div>
      )}
    </div>
  );
}
