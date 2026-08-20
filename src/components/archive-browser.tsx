"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

import type { ArchiveGroup } from "../content/repository";

export function ArchiveBrowser({
  groups,
}: {
  groups: readonly ArchiveGroup[];
}) {
  const params = useSearchParams();
  const category = params.get("category") ?? "";
  const tag = params.get("tag") ?? "";
  const filtered = groups
    .map((group) => ({
      ...group,
      items: group.items.filter(
        (item) =>
          (!category || item.category === category) &&
          (!tag || item.tags.includes(tag)),
      ),
    }))
    .filter((group) => group.items.length > 0);

  return (
    <div>
      {(category || tag) && (
        <div className="mb-5 flex flex-wrap items-center gap-3 text-sm text-muted">
          <span>当前筛选：{category || `#${tag}`}</span>
          <Link className="eelex-outline-button" href="/archive">
            清除筛选
          </Link>
        </div>
      )}
      {filtered.length ? (
        filtered.map((group) => (
          <section className="mb-8" key={group.year}>
            <div className="mb-3 flex items-end justify-between border-b border-border pb-3">
              <h2 className="text-3xl font-semibold tracking-[-0.04em] text-ink">
                {group.year}
              </h2>
              <span className="text-sm text-muted">
                {group.items.length} 篇文章
              </span>
            </div>
            <div className="eelex-panel divide-y divide-border px-5">
              {group.items.map((item) => (
                <article
                  className="grid gap-2 py-4 sm:grid-cols-[4rem_minmax(0,1fr)] sm:items-baseline"
                  key={item.slug}
                >
                  <time
                    className="text-xs text-muted"
                    dateTime={item.publishedAt}
                  >
                    {item.publishedAt.slice(5)}
                  </time>
                  <div>
                    <Link
                      className="font-medium text-ink hover:text-graphite"
                      href={`/content/${item.slug}`}
                    >
                      {item.title}
                    </Link>
                    <div className="mt-2 flex flex-wrap gap-2">
                      <Link
                        className="eelex-soft-badge"
                        href={`/archive?category=${encodeURIComponent(item.category)}`}
                      >
                        {item.category}
                      </Link>
                      {item.tags.map((itemTag) => (
                        <Link
                          className="eelex-outline-badge"
                          href={`/archive?tag=${encodeURIComponent(itemTag)}`}
                          key={itemTag}
                        >
                          #{itemTag}
                        </Link>
                      ))}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        ))
      ) : (
        <p className="eelex-panel p-6 text-sm text-muted">
          没有找到匹配的归档内容。
        </p>
      )}
    </div>
  );
}
