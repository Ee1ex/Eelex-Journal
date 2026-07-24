import type { TableOfContentsItem } from "../content/repository";

export function TableOfContents({
  items,
}: {
  items: readonly TableOfContentsItem[];
}) {
  if (items.length === 0) return null;
  const links = (
    <ol className="grid gap-2 text-sm text-muted">
      {items.map((item) => (
        <li className={item.depth === 3 ? "pl-4" : ""} key={item.id}>
          <a className="hover:text-accent" href={`#${item.id}`}>
            {item.text}
          </a>
        </li>
      ))}
    </ol>
  );
  return (
    <>
      <aside
        aria-label="文章目录"
        className="hidden lg:fixed lg:top-36 lg:right-8 lg:block lg:w-48"
      >
        <p className="mb-3 text-sm font-semibold text-ink">目录</p>
        {links}
      </aside>
      <details className="mt-10 rounded-panel border border-border p-4 lg:hidden">
        <summary className="cursor-pointer font-semibold text-ink">
          文章目录
        </summary>
        <div className="mt-4">{links}</div>
      </details>
    </>
  );
}
