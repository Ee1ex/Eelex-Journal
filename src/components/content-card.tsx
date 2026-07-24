import Link from "next/link";

import type { MockContentItem } from "../mocks/content";

const categoryStyles = {
  文章: "border-category-article bg-category-article-soft text-category-article",
  学习笔记: "border-category-note bg-category-note-soft text-category-note",
  工具分享: "border-category-tool bg-category-tool-soft text-category-tool",
} as const;

export function ContentCard({ item }: { item: MockContentItem }) {
  return (
    <article className="rounded-panel border border-border bg-surface p-6">
      <div className="flex flex-wrap items-center gap-3 text-[length:var(--eelex-text-meta)] text-muted">
        <span
          className={`rounded-control border px-2 py-1 font-semibold ${categoryStyles[item.category]}`}
        >
          {item.category}
        </span>
        <time dateTime={item.publishedAt}>{item.publishedAt}</time>
      </div>
      <h2 className="mt-5 text-[length:var(--eelex-text-section-title)] leading-[var(--eelex-leading-tight)] font-semibold text-ink">
        <Link className="hover:text-accent" href={`/content/${item.slug}`}>
          {item.title}
        </Link>
      </h2>
      <p className="mt-3 max-w-[var(--eelex-width-reading)] text-muted">
        {item.excerpt}
      </p>
      <ul className="mt-5 flex flex-wrap gap-2" aria-label="标签">
        {item.tags.map((tag) => (
          <li
            className="rounded-control border border-border px-2 py-1 text-[length:var(--eelex-text-meta)] text-muted"
            key={tag}
          >
            {tag}
          </li>
        ))}
      </ul>
    </article>
  );
}
