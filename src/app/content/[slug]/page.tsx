import Link from "next/link";
import { notFound } from "next/navigation";

import { getMockContentBySlug } from "../../../mocks/content";

export default async function ContentPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = getMockContentBySlug(slug);

  if (!item) {
    notFound();
  }

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
        <div className="mt-10 grid gap-6 text-ink">
          {item.body.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </article>
    </main>
  );
}
