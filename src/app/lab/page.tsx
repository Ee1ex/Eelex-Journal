import Link from "next/link";

import { ReadingDensityExperiment } from "../../components/lab/reading-density-experiment";

export default function LabPage() {
  return (
    <main
      className="mx-auto max-w-[var(--eelex-width-wide)] px-[var(--eelex-space-page-inline)] py-[var(--eelex-space-section)]"
      id="main-content"
      tabIndex={-1}
    >
      <p className="text-sm font-semibold text-accent">实验室</p>
      <h1 className="mt-4 text-[length:var(--eelex-text-page-title)] leading-[var(--eelex-leading-tight)] font-semibold text-ink">
        为好奇心留一块空间
      </h1>
      <p className="mt-4 max-w-2xl text-muted">
        这里会收录关于界面、动效与交互的独立小实验。
      </p>
      <ReadingDensityExperiment />
      <Link
        className="mt-10 inline-flex rounded-control border border-ink px-4 py-3 font-semibold text-ink"
        href="/#content"
      >
        返回内容
      </Link>
    </main>
  );
}
