import Image from "next/image";
import Link from "next/link";

import type { ContentListItem } from "../content/repository";

export function ContentCard({ item }: { item: ContentListItem }) {
  const cover = item.cover ?? {
    src: "/content/reading-flow.svg",
    alt: `${item.title} 的默认抽象封面`,
  };

  return (
    <article className="eelex-content-row rounded-panel border border-border bg-paper p-3 shadow-[var(--eelex-shadow-panel)] sm:grid sm:grid-cols-[12rem_minmax(0,1fr)] sm:gap-5 sm:p-4">
      <Link
        className="eelex-cover relative block aspect-[16/9] overflow-hidden rounded-[var(--eelex-radius-nested)] bg-surface-alt"
        href={`/content/${item.slug}`}
        tabIndex={-1}
      >
        <Image
          alt={cover.alt}
          className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
          fill
          sizes="(max-width: 640px) 100vw, 192px"
          src={cover.src}
        />
      </Link>
      <div className="min-w-0 pt-4 sm:pt-1">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-xs text-muted">
          <span className="eelex-soft-badge">{item.category}</span>
          <time dateTime={item.publishedAt}>{item.publishedAt}</time>
          <span>{item.wordCount} 字</span>
          <span>{item.readingMinutes} 分钟</span>
        </div>
        <h3 className="mt-3 text-xl leading-tight font-semibold tracking-[-0.035em] text-ink sm:text-2xl">
          <Link className="hover:text-graphite" href={`/content/${item.slug}`}>
            {item.title}
          </Link>
        </h3>
        <p className="mt-3 text-sm leading-6 text-muted">{item.excerpt}</p>
        <ul className="mt-4 flex flex-wrap gap-2" aria-label="标签">
          {item.tags.map((tag) => (
            <li className="eelex-outline-badge" key={tag}>
              #{tag}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}
