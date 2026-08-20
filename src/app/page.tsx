import type { Metadata } from "next";

import { ContentDiscovery } from "../components/content-discovery";
import { ProfileSidebar, SiteStats } from "../components/knowledge-sidebars";
import { getAllContent } from "../content/repository";
import { defaultDescription, siteName } from "../site/seo";

export const metadata: Metadata = {
  title: siteName,
  description: defaultDescription,
  alternates: { canonical: "/" },
};

export default function Home() {
  const items = getAllContent();

  return (
    <main
      className="eelex-home-shell mx-auto max-w-[var(--eelex-width-wide)] px-[var(--eelex-space-page-inline)] py-5"
      id="main-content"
      tabIndex={-1}
    >
      <h1 className="sr-only">Eelex 的个人知识库</h1>
      <div className="eelex-knowledge-layout grid gap-4 lg:grid-cols-[15.5rem_minmax(0,1fr)_14rem] lg:items-start">
        <ProfileSidebar items={items} />
        <section className="min-w-0" id="content">
          <ContentDiscovery items={items} />
        </section>
        <SiteStats />
      </div>
    </main>
  );
}
