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
    <div className="mt-8">
      <label className="grid gap-2 text-sm font-semibold text-ink">
        搜索内容
        <input
          className="rounded-control border border-border bg-canvas px-4 py-3 text-ink"
          onChange={(event) => setQuery(event.target.value)}
          placeholder="搜索标题、摘要、分类或标签"
          type="search"
          value={query}
        />
      </label>
      <div aria-label="内容分类" className="mt-4 flex flex-wrap gap-2">
        {categories.map((item) => (
          <button
            aria-pressed={category === item}
            className="rounded-control border border-border bg-canvas px-3 py-2 text-sm font-semibold text-ink aria-pressed:border-accent aria-pressed:bg-category-article-soft aria-pressed:text-accent"
            key={item}
            onClick={() => setCategory(item)}
            type="button"
          >
            {item}
          </button>
        ))}
      </div>
      <p aria-live="polite" className="mt-4 text-sm text-muted">
        {results.length} 篇内容
      </p>
      {results.length === 0 ? (
        <p className="mt-8 rounded-panel border border-dashed border-border p-6 text-muted">
          没有找到匹配的内容，试试更短的关键词或切换分类。
        </p>
      ) : (
        <div className="mt-6 grid gap-5">
          {results.map((item) => (
            <ContentCard item={item} key={item.slug} />
          ))}
        </div>
      )}
    </div>
  );
}
