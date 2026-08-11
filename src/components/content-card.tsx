import Link from "next/link";

import type { ContentSummary } from "../content/schema";

const categoryDotStyles = {
  文章: "bg-category-article",
  学习笔记: "bg-category-note",
  工具分享: "bg-category-tool",
} as const;

export function ContentCard({ item }: { item: ContentSummary }) {
  return (
    <article className="eelex-content-row grid gap-4 py-6 sm:grid-cols-[minmax(0,1fr)_10rem] sm:gap-8 sm:py-7">
      <div className="min-w-0">
        <div className="flex items-center gap-3 text-[length:var(--eelex-text-meta)] text-muted">
          <span
            aria-hidden="true"
            className={`category-dot size-2 rounded-full ${categoryDotStyles[item.category]}`}
          />
          <span>{item.category}</span>
        </div>
        <h3 className="mt-3 text-xl leading-tight font-medium tracking-[-0.03em] text-ink sm:text-2xl">
          <Link className="hover:text-accent" href={`/content/${item.slug}`}>
            {item.title}
          </Link>
        </h3>
        <p className="mt-3 max-w-[var(--eelex-width-reading)] text-sm leading-7 text-muted">
          {item.excerpt}
        </p>
        <ul className="mt-4 flex flex-wrap gap-x-3 gap-y-2" aria-label="标签">
          {item.tags.map((tag) => (
            <li
              className="font-mono text-[length:var(--eelex-text-meta)] text-ash"
              key={tag}
            >
              {tag}
            </li>
          ))}
        </ul>
      </div>
      <p className="font-mono text-[length:var(--eelex-text-meta)] leading-relaxed text-muted sm:pt-1 sm:text-right">
        <time dateTime={item.publishedAt}>{item.publishedAt}</time>
      </p>
    </article>
  );
}
