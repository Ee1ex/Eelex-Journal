import Link from "next/link";

import { ContentDiscovery } from "../components/content-discovery";
import { getAllContent } from "../content/repository";
import { mockProfile } from "../mocks/profile";

export default function Home() {
  const items = getAllContent();
  return (
    <main id="main-content" tabIndex={-1}>
      <section className="mx-auto flex min-h-[22.5rem] max-w-[var(--eelex-width-wide)] flex-col justify-end px-[var(--eelex-space-page-inline)] py-[var(--eelex-space-section)] sm:min-h-[26.25rem]">
        <p className="text-[length:var(--eelex-text-small)] font-semibold text-accent">
          Eelex Code Hub
        </p>
        <h1 className="mt-4 max-w-4xl text-[length:var(--eelex-text-display)] leading-[var(--eelex-leading-tight)] font-semibold text-ink">
          {mockProfile.name}
        </h1>
        <p className="mt-4 text-lg font-semibold text-ink">
          {mockProfile.role}
        </p>
        <p className="mt-4 max-w-2xl text-muted">{mockProfile.introduction}</p>
      </section>

      <section className="border-y border-border bg-surface" id="content">
        <div className="mx-auto max-w-[var(--eelex-width-wide)] px-[var(--eelex-space-page-inline)] py-[var(--eelex-space-section)]">
          <div className="max-w-2xl">
            <p className="text-[length:var(--eelex-text-small)] font-semibold text-accent">
              内容
            </p>
            <h2 className="mt-3 text-[length:var(--eelex-text-page-title)] leading-[var(--eelex-leading-tight)] font-semibold text-ink">
              从最近的记录开始阅读
            </h2>
          </div>
          <ContentDiscovery items={items} />
          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              className="rounded-control border border-ink px-4 py-3 font-semibold text-ink"
              href="/about"
            >
              了解我
            </Link>
            <Link
              className="rounded-control border border-border px-4 py-3 font-semibold text-ink"
              href="/lab"
            >
              前往实验室
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
