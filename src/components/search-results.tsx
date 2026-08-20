"use client";

import { useSearchParams } from "next/navigation";

import type { ContentListItem } from "../content/repository";
import { filterContent } from "../content/search";
import { ContentCard } from "./content-card";

export function SearchResults({
  items,
}: {
  items: readonly ContentListItem[];
}) {
  const params = useSearchParams();
  const query = params.get("q")?.trim() ?? "";
  const results = query
    ? filterContent(items, { category: "全部", query })
    : [];

  return (
    <div>
      <form
        action="/search"
        className="eelex-panel flex gap-2 p-3"
        role="search"
      >
        <label className="sr-only" htmlFor="search-page-query">
          搜索文章
        </label>
        <input
          className="min-w-0 flex-1 rounded-control bg-canvas px-4 py-3 text-sm text-ink outline-focus"
          defaultValue={query}
          id="search-page-query"
          name="q"
          placeholder="搜索标题、摘要、分类或标签"
          type="search"
        />
        <button className="eelex-dark-button" type="submit">
          搜索
        </button>
      </form>
      <p aria-live="polite" className="my-5 text-sm text-muted">
        {query
          ? `“${query}”找到 ${results.length} 篇内容`
          : "输入关键词开始搜索"}
      </p>
      <div className="grid gap-4">
        {results.map((item) => (
          <ContentCard item={item} key={item.slug} />
        ))}
      </div>
    </div>
  );
}
