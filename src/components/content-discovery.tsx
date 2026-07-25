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
  全部: "border-[#8270a8]/30 bg-[#ede8f6] text-[#5e4f81]",
  文章: "border-category-article/30 bg-category-article-soft text-category-article",
  学习笔记: "border-category-note/30 bg-category-note-soft text-category-note",
  工具分享: "border-category-tool/30 bg-category-tool-soft text-category-tool",
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
    <div className="mt-6 rounded-panel border border-white/80 bg-surface p-4 shadow-[var(--eelex-shadow-panel)] backdrop-blur sm:p-6">
      <div className="grid gap-4 sm:grid-cols-[auto_minmax(0,1fr)] sm:items-center">
        <div aria-label="内容分类" className="flex flex-wrap gap-2">
          {categories.map((item) => {
            const selected = category === item;

            return (
              <button
                aria-pressed={selected}
                className={`rounded-control border px-3 py-2 text-sm font-medium transition-colors hover:border-black/10 hover:bg-black/[0.04] hover:text-ink ${selected ? categoryClasses[item] : "border-transparent bg-transparent text-muted"}`}
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
          className="w-full rounded-[0.9rem] border border-border bg-white/70 px-4 py-3 text-ink outline-accent"
          id="content-search"
          onChange={(event) => setQuery(event.target.value)}
          placeholder="搜索标题、摘要、分类或标签"
          type="search"
          value={query}
        />
      </div>
      <p aria-live="polite" className="mt-4 text-sm text-muted">
        {results.length} 篇内容
      </p>
      {results.length === 0 ? (
        <p className="mt-8 rounded-[1.2rem] border border-dashed border-border p-6 text-muted">
          没有找到匹配的内容，试试更短的关键词或切换分类。
        </p>
      ) : (
        <div className="mt-5 grid gap-3">
          {results.map((item) => (
            <ContentCard item={item} key={item.slug} />
          ))}
        </div>
      )}
    </div>
  );
}
