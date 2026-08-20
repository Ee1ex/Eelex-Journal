import type { Metadata } from "next";
import { Suspense } from "react";

import { ArchiveBrowser } from "../../components/archive-browser";
import { getArchiveGroups } from "../../content/repository";
import { createPageTitle } from "../../site/seo";

export const metadata: Metadata = {
  title: createPageTitle("归档"),
  description: "按年份、分类与标签浏览 Eelex 的全部内容。",
  alternates: { canonical: "/archive" },
};

export default function ArchivePage() {
  return (
    <main className="eelex-page-shell" id="main-content" tabIndex={-1}>
      <header className="eelex-panel mb-6 p-6">
        <p className="text-xs font-medium tracking-[0.08em] text-muted uppercase">
          ARCHIVE
        </p>
        <h1 className="mt-3 text-4xl font-semibold tracking-[-0.05em] text-ink">
          文章归档
        </h1>
        <p className="mt-3 text-sm text-muted">
          按年份回看，也可以通过分类与标签收窄范围。
        </p>
      </header>
      <Suspense
        fallback={<p className="eelex-panel p-6 text-muted">正在整理归档…</p>}
      >
        <ArchiveBrowser groups={getArchiveGroups()} />
      </Suspense>
    </main>
  );
}
