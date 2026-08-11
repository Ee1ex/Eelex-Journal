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
      <section className="eelex-home-intro mx-auto max-w-[var(--eelex-width-wide)] px-[var(--eelex-space-page-inline)] pt-[clamp(4.5rem,10vw,9rem)] pb-[clamp(4rem,8vw,7rem)]">
        <p className="mb-5 font-mono text-[length:var(--eelex-text-meta)] tracking-[0.12em] text-muted uppercase">
          EELEX / PERSONAL JOURNAL
        </p>
        <h1 className="eelex-display max-w-4xl text-[length:var(--eelex-text-display)] leading-[var(--eelex-leading-tight)] text-ink">
          欢迎来到Eelex 的个人博客
        </h1>
        <p className="mt-7 max-w-xl text-lg leading-[1.6] text-muted">
          {publicProfile.introduction}
        </p>
      </section>

      <section
        className="eelex-content-section mx-auto max-w-[var(--eelex-width-wide)] px-[var(--eelex-space-page-inline)] pb-[var(--eelex-space-section)]"
        id="content"
      >
        <div className="mb-7 flex flex-col gap-3 border-t border-border pt-5 sm:flex-row sm:items-baseline sm:justify-between">
          <h2 className="eelex-display text-[length:var(--eelex-text-section-title)] leading-tight text-ink">
            我的记录与思考
          </h2>
        </div>
        <ContentDiscovery items={items} />
      </section>
    </main>
  );
}
