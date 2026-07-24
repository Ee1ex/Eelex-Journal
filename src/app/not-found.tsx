import Link from "next/link";

export default function NotFoundPage() {
  return (
    <main
      className="mx-auto max-w-[var(--eelex-width-reading)] px-[var(--eelex-space-page-inline)] py-[var(--eelex-space-section)]"
      id="main-content"
      tabIndex={-1}
    >
      <p className="text-sm font-semibold text-accent">404</p>
      <h1 className="mt-4 text-[length:var(--eelex-text-page-title)] leading-[var(--eelex-leading-tight)] font-semibold text-ink">
        没有找到这页内容
      </h1>
      <p className="mt-4 text-muted">
        你可以回到首页，继续浏览已经整理好的内容。
      </p>
      <Link
        className="mt-8 inline-flex rounded-control border border-ink px-4 py-3 font-semibold text-ink"
        href="/#content"
      >
        返回内容
      </Link>
    </main>
  );
}
