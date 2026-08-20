"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import type { ContentListItem } from "../content/repository";
import { filterContent } from "../content/search";
import { NavIcon } from "./nav-icon";

export function GlobalSearch({
  id,
  items,
}: {
  id: string;
  items: readonly ContentListItem[];
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const results = useMemo(
    () =>
      query.trim()
        ? filterContent(items, { category: "全部", query }).slice(0, 5)
        : [],
    [items, query],
  );

  return (
    <div
      className="eelex-global-search relative"
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false);
      }}
      onFocusCapture={() => setOpen(true)}
    >
      <form action="/search" className="relative" role="search">
        <label className="sr-only" htmlFor={id}>
          搜索文章
        </label>
        <NavIcon
          className="eelex-nav-icon pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-muted"
          name="search"
        />
        <input
          autoComplete="off"
          className="h-10 w-full rounded-control bg-canvas pr-4 pl-10 text-sm text-ink outline-focus placeholder:text-muted"
          id={id}
          name="q"
          onChange={(event) => setQuery(event.target.value)}
          placeholder="搜索"
          type="search"
          value={query}
        />
      </form>
      {open && query.trim() ? (
        <div className="absolute top-12 right-0 z-50 w-[min(28rem,calc(100vw-2rem))] rounded-panel border border-border bg-paper p-3 shadow-[var(--eelex-shadow-panel)]">
          {results.length ? (
            <>
              <ul className="grid gap-1">
                {results.map((item) => (
                  <li key={item.slug}>
                    <Link
                      className="block rounded-[var(--eelex-radius-nested)] px-3 py-2 hover:bg-canvas"
                      href={`/content/${item.slug}`}
                    >
                      <span className="block text-sm font-medium text-ink">
                        {item.title}
                      </span>
                      <span className="mt-1 block truncate text-xs text-muted">
                        {item.excerpt}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
              <Link
                className="mt-2 block border-t border-border px-3 pt-3 text-sm font-medium text-ink"
                href={`/search?q=${encodeURIComponent(query)}`}
              >
                查看全部结果
              </Link>
            </>
          ) : (
            <p className="px-3 py-2 text-sm text-muted">找不到相关结果。</p>
          )}
        </div>
      ) : null}
    </div>
  );
}
