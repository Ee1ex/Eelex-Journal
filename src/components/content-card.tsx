import Link from "next/link";

import type { ContentSummary } from "../content/schema";

const categoryDotStyles = {
  文章: "bg-category-article shadow-[0_0_0_5px_rgba(42,84,117,0.11)]",
  学习笔记: "bg-category-note shadow-[0_0_0_5px_rgba(128,87,25,0.11)]",
  工具分享: "bg-category-tool shadow-[0_0_0_5px_rgba(40,105,94,0.11)]",
} as const;

export function ContentCard({ item }: { item: ContentSummary }) {
  return (
    <article className="grid grid-cols-[auto_minmax(0,1fr)] items-start gap-x-4 rounded-[1.15rem] border border-transparent bg-white/40 p-5 transition hover:border-accent/15 hover:bg-white/75 sm:grid-cols-[auto_minmax(0,1fr)_auto] sm:items-center">
      <span
        aria-hidden="true"
        className={`category-dot mt-2 size-3 rounded-full ${categoryDotStyles[item.category]}`}
      />
      <div>
        <h2 className="text-lg leading-tight font-medium tracking-[-0.03em] text-ink">
          <Link className="hover:text-accent" href={`/content/${item.slug}`}>
            {item.title}
          </Link>
        </h2>
        <p className="mt-2 max-w-[var(--eelex-width-reading)] text-sm leading-relaxed text-muted">
          {item.excerpt}
        </p>
        <ul className="mt-3 flex flex-wrap gap-2" aria-label="标签">
          {item.tags.map((tag) => (
            <li
              className="rounded-control border border-border bg-white/40 px-2 py-1 text-[length:var(--eelex-text-meta)] text-muted"
              key={tag}
            >
              {tag}
            </li>
          ))}
        </ul>
      </div>
      <p className="col-start-2 mt-3 text-[length:var(--eelex-text-meta)] text-muted sm:col-auto sm:mt-0 sm:text-right">
        {item.category}
        <br />
        <time dateTime={item.publishedAt}>{item.publishedAt}</time>
      </p>
    </article>
  );
}
