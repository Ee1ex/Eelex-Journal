import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { TableOfContents } from "../../../components/table-of-contents";
import {
  getContentBySlug,
  getContentTableOfContents,
  getStaticContentParams,
} from "../../../content/repository";
import { createPageTitle } from "../../../site/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return getStaticContentParams();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = getContentBySlug(slug);

  if (!item) {
    notFound();
  }

  return {
    title: createPageTitle(item.title),
    description: item.excerpt,
    alternates: { canonical: `/content/${item.slug}` },
  };
}

export default async function ContentPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = getContentBySlug(slug);

  if (!item) {
    notFound();
  }

  const { default: Content } = await import(`../../../../content/${slug}.mdx`);
  const tableOfContents = getContentTableOfContents(slug);

  return (
    <main
      className="mx-auto max-w-[var(--eelex-width-reading)] px-[var(--eelex-space-page-inline)] pt-12 pb-[var(--eelex-space-section)]"
      id="main-content"
      tabIndex={-1}
    >
      <Link className="text-sm text-accent hover:text-ink" href="/#content">
        返回内容
      </Link>
      <article className="mt-8">
        <p className="text-sm font-semibold tracking-[0.14em] text-accent">
          {item.category} · {item.publishedAt}
        </p>
        <h1 className="mt-4 text-[length:var(--eelex-text-page-title)] leading-[1.1] font-medium tracking-[-0.06em] text-ink">
          {item.title}
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-muted">
          {item.excerpt}
        </p>
        <ul className="mt-6 flex flex-wrap gap-2" aria-label="标签">
          {item.tags.map((tag) => (
            <li
              className="rounded-control border border-border bg-white/40 px-2 py-1 text-sm text-muted"
              key={tag}
            >
              {tag}
            </li>
          ))}
        </ul>
        <div className="mt-10 grid gap-6 rounded-panel border border-white/80 bg-surface p-6 text-ink shadow-[var(--eelex-shadow-panel)] sm:p-10 [&_h2]:mt-12 [&_h2]:text-2xl [&_h2]:font-medium [&_h2]:tracking-[-0.04em] [&_h3]:mt-8 [&_h3]:text-xl [&_h3]:font-medium [&_img]:rounded-[1.15rem] [&_img]:border [&_img]:border-border [&_img]:shadow-sm [&_p]:leading-8 [&_pre]:overflow-x-auto [&_pre]:rounded-[1rem] [&_pre]:bg-ink [&_pre]:p-5 [&_pre]:text-canvas">
          <Content />
        </div>
        <TableOfContents items={tableOfContents} />
      </article>
    </main>
  );
}
