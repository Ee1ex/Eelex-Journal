import type { Metadata } from "next";

import { ContentDiscovery } from "../components/content-discovery";
import { getAllContent } from "../content/repository";
import { publicProfile } from "../site/profile";
import { defaultDescription, siteName } from "../site/seo";

export const metadata: Metadata = {
  title: siteName,
  description: defaultDescription,
  alternates: { canonical: "/" },
};

export default function Home() {
  const items = getAllContent();
  return (
    <main id="main-content" tabIndex={-1}>
      <section className="mx-auto max-w-[var(--eelex-width-wide)] px-[var(--eelex-space-page-inline)] pt-[clamp(3.625rem,5vw,4.625rem)] pb-12 sm:pb-14">
        <div className="eelex-page-intro-card rounded-panel border border-white/80 bg-surface/65 p-7 shadow-[var(--eelex-shadow-panel)] backdrop-blur sm:p-10">
          <h1 className="eelex-page-heading text-[length:var(--eelex-text-page-title)] leading-[1.1] font-normal tracking-[0.01em] whitespace-nowrap text-ink">
            欢迎来到Eelex 的个人博客
          </h1>
          <p className="eelex-page-intro mt-6 max-w-2xl text-lg leading-relaxed text-muted">
            {publicProfile.introduction}
          </p>
        </div>
      </section>

      <section id="content">
        <div className="mx-auto max-w-[var(--eelex-width-wide)] px-[var(--eelex-space-page-inline)] pt-12 pb-[var(--eelex-space-section)]">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <h2 className="text-[length:var(--eelex-text-section-title)] leading-[1.65] font-semibold tracking-[0.01em] text-ink">
              我的记录与思考
            </h2>
            <p className="shrink-0 text-[length:var(--eelex-text-body)] text-muted sm:whitespace-nowrap">
              内容、分类与搜索保持原有逻辑，只是换成更有节奏的呈现方式。
            </p>
          </div>
          <ContentDiscovery items={items} />
        </div>
      </section>
    </main>
  );
}
