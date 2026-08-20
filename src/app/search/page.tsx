import type { Metadata } from "next";
import { Suspense } from "react";

import { SearchResults } from "../../components/search-results";
import { getAllContent } from "../../content/repository";
import { createPageTitle } from "../../site/seo";

export const metadata: Metadata = {
  title: createPageTitle("搜索"),
  description: "搜索 Eelex 的文章、学习笔记和工具分享。",
  robots: { index: false, follow: true },
};

export default function SearchPage() {
  return (
    <main className="eelex-page-shell" id="main-content" tabIndex={-1}>
      <header className="mb-6">
        <h1 className="text-4xl font-semibold tracking-[-0.05em] text-ink">
          搜索内容
        </h1>
      </header>
      <Suspense
        fallback={<p className="eelex-panel p-6 text-muted">正在准备搜索…</p>}
      >
        <SearchResults items={getAllContent()} />
      </Suspense>
    </main>
  );
}
