"use client";

import { useMemo, useState } from "react";

import type { ContentListItem } from "../content/repository";
import type { ContentCategory } from "../content/schema";
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
  items: readonly ContentListItem[];
}) {
  const [category, setCategory] = useState<(typeof categories)[number]>("全部");
  const results = useMemo(
    () => filterContent(items, { category, query: "" }),
    [category, items],
  );

  return (
    <div className="eelex-content-discovery">
      <div className="eelex-category-strip eelex-panel overflow-x-auto p-3">
        <div
          aria-label="内容分类"
          className="flex min-w-max items-center gap-2"
        >
          {categories.map((item) => {
            const selected = category === item;

            return (
              <button
                aria-pressed={selected}
                className={`rounded-control border px-3 py-2 text-sm transition-colors ${selected ? `${categoryClasses[item]} bg-canvas font-medium` : "border-transparent text-muted hover:bg-canvas hover:text-ink"}`}
                key={item}
                onClick={() => setCategory(item)}
                type="button"
              >
                {item}
              </button>
            );
          })}
        </div>
      </div>
      <p aria-live="polite" className="sr-only">
        {results.length} 篇内容
      </p>
      {results.length === 0 ? (
        <p className="mt-8 border-y border-dashed border-border py-8 text-sm text-muted">
          没有找到匹配的内容，试试更短的关键词或切换分类。
        </p>
      ) : (
        <div className="mt-4 grid gap-4">
          {results.map((item) => (
            <ContentCard item={item} key={item.slug} />
          ))}
        </div>
      )}
    </div>
  );
}
