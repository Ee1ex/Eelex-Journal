import Link from "next/link";
import { notFound } from "next/navigation";

import { TableOfContents } from "../../../components/table-of-contents";
import {
  getContentBySlug,
  getContentTableOfContents,
  getStaticContentParams,
} from "../../../content/repository";

export const dynamicParams = false;

export function generateStaticParams() {
  return getStaticContentParams();
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
      className="mx-auto max-w-[var(--eelex-width-reading)] px-[var(--eelex-space-page-inline)] py-[var(--eelex-space-section)]"
      id="main-content"
      tabIndex={-1}
    >
      <Link className="text-sm font-semibold text-accent" href="/#content">
        返回内容
      </Link>
      <article className="mt-8">
        <p className="text-sm font-semibold text-accent">{item.category}</p>
        <h1 className="mt-4 text-[length:var(--eelex-text-page-title)] leading-[var(--eelex-leading-tight)] font-semibold text-ink">
          {item.title}
        </h1>
        <p className="mt-4 text-sm text-muted">{item.publishedAt}</p>
        <p className="mt-6 text-lg text-muted">{item.excerpt}</p>
        <ul className="mt-6 flex flex-wrap gap-2" aria-label="标签">
          {item.tags.map((tag) => (
            <li
              className="rounded-control border border-border px-2 py-1 text-sm text-muted"
              key={tag}
            >
              {tag}
            </li>
          ))}
        </ul>
        <div className="mt-10 grid gap-6 text-ink [&_h2]:mt-12 [&_h2]:text-2xl [&_h2]:font-medium [&_h3]:mt-8 [&_h3]:text-xl [&_h3]:font-medium [&_img]:rounded-panel [&_img]:border [&_img]:border-border [&_img]:shadow-sm [&_p]:leading-8 [&_pre]:overflow-x-auto [&_pre]:rounded-panel [&_pre]:bg-ink [&_pre]:p-5 [&_pre]:text-canvas">
          <Content />
        </div>
        <TableOfContents items={tableOfContents} />
      </article>
    </main>
  );
}
