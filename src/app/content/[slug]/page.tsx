import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { BackToTop } from "../../../components/back-to-top";
import { CopyLinkButton } from "../../../components/copy-link-button";
import { TableOfContents } from "../../../components/table-of-contents";
import {
  getAdjacentContent,
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
  if (!item) notFound();
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
  if (!item) notFound();

  const { default: Content } = await import(`../../../../content/${slug}.mdx`);
  const tableOfContents = getContentTableOfContents(slug);
  const adjacent = getAdjacentContent(slug);

  return (
    <main className="eelex-article-shell" id="main-content" tabIndex={-1}>
      <article>
        <Link className="eelex-outline-button" href="/#content">
          返回内容
        </Link>
        <header className="eelex-panel mt-4 p-6 sm:p-8">
          <div className="flex flex-wrap items-center gap-3 text-xs text-muted">
            <span className="eelex-soft-badge">{item.category}</span>
            <time dateTime={item.publishedAt}>{item.publishedAt}</time>
            <span>{item.wordCount} 字</span>
            <span>约 {item.readingMinutes} 分钟</span>
          </div>
          <h1 className="mt-5 text-[length:var(--eelex-text-page-title)] leading-[1.1] font-semibold tracking-[-0.055em] text-ink">
            {item.title}
          </h1>
          <p className="mt-5 text-base leading-7 text-muted">{item.excerpt}</p>
          <ul className="mt-5 flex flex-wrap gap-2" aria-label="标签">
            {item.tags.map((tag) => (
              <li className="eelex-outline-badge" key={tag}>
                #{tag}
              </li>
            ))}
          </ul>
        </header>
        <div className="eelex-prose mt-4 rounded-panel border border-border bg-paper p-6 shadow-[var(--eelex-shadow-panel)] sm:p-10">
          <Content />
        </div>
        <TableOfContents items={tableOfContents} />
        <footer className="eelex-panel mt-4 p-6">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-5">
            <div>
              <p className="text-xs text-muted">作者</p>
              <p className="mt-1 font-semibold text-ink">Eelex</p>
            </div>
            <CopyLinkButton />
          </div>
          <nav className="mt-5 grid gap-3 sm:grid-cols-2" aria-label="相邻文章">
            {adjacent.newer ? (
              <Link
                className="eelex-adjacent-link"
                href={`/content/${adjacent.newer.slug}`}
              >
                <span>上一篇</span>
                <strong>{adjacent.newer.title}</strong>
              </Link>
            ) : (
              <span />
            )}
            {adjacent.older ? (
              <Link
                className="eelex-adjacent-link sm:text-right"
                href={`/content/${adjacent.older.slug}`}
              >
                <span>下一篇</span>
                <strong>{adjacent.older.title}</strong>
              </Link>
            ) : null}
          </nav>
        </footer>
      </article>
      <BackToTop />
    </main>
  );
}
