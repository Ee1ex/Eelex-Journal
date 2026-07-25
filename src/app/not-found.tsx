import Link from "next/link";

export default function NotFoundPage() {
  return (
    <main
      className="mx-auto grid min-h-[70vh] max-w-[var(--eelex-width-reading)] place-items-center px-[var(--eelex-space-page-inline)] py-[var(--eelex-space-section)] text-center"
      id="main-content"
      tabIndex={-1}
    >
      <section>
        <p className="text-sm font-semibold tracking-[0.14em] text-accent">
          404
        </p>
        <h1 className="mt-4 text-[length:var(--eelex-text-page-title)] leading-[1.1] font-medium tracking-[-0.06em] text-ink">
          这一页，还没有被收藏。
        </h1>
        <p className="mt-5 text-muted">
          你可以回到内容区，继续浏览已经整理好的记录。
        </p>
        <Link
          className="mt-8 inline-flex rounded-control bg-ink px-4 py-3 text-surface hover:bg-accent"
          href="/#content"
        >
          返回内容
        </Link>
      </section>
    </main>
  );
}
