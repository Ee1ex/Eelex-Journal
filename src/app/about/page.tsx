import Image from "next/image";
import type { Metadata } from "next";

import { publicProfile } from "../../site/profile";
import { createPageTitle } from "../../site/seo";

export const metadata: Metadata = {
  title: createPageTitle("关于我"),
  description: "了解 Eelex 的学习方向、技能方向、项目与联系方式。",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <main className="eelex-page-shell" id="main-content" tabIndex={-1}>
      <section className="eelex-page-intro-card eelex-panel p-6 sm:p-8">
        <p className="text-xs font-medium tracking-[0.08em] text-muted uppercase">
          ABOUT EELEX
        </p>
        <h1 className="eelex-page-heading mt-3 text-[length:var(--eelex-text-page-title)] leading-[1.1] font-semibold tracking-[-0.055em] text-ink">
          关于我
        </h1>
        <p className="eelex-page-intro mt-5 max-w-2xl text-base leading-7 text-muted">
          {publicProfile.introduction}
        </p>
      </section>
      <section className="mt-4 grid gap-4 md:grid-cols-[18rem_minmax(0,1fr)]">
        <article className="eelex-panel p-5">
          <Image
            alt={publicProfile.avatar.alt}
            className="aspect-square w-full rounded-[var(--eelex-radius-nested)] object-cover"
            height={512}
            src={publicProfile.avatar.src}
            width={512}
          />
          <h2 className="mt-5 text-2xl font-semibold tracking-[-0.04em] text-ink">
            {publicProfile.name}
          </h2>
          <p className="mt-2 text-sm text-muted">{publicProfile.role}</p>
          <a
            className="eelex-dark-button mt-5 justify-center"
            href={publicProfile.feedback.href}
            rel="noreferrer"
            target="_blank"
          >
            反馈与联系
          </a>
        </article>
        <div className="grid gap-4">
          <section className="eelex-panel p-6">
            <h2 className="text-xl font-semibold text-ink">当前学习方向</h2>
            <p className="mt-3 leading-7 text-muted">
              {publicProfile.learningFocus.join(" · ")}
            </p>
          </section>
          <section className="eelex-panel p-6">
            <h2 className="text-xl font-semibold text-ink">技能方向</h2>
            <p className="mt-3 leading-7 text-muted">
              {publicProfile.skills.join(" · ")}
            </p>
          </section>
          <section className="eelex-panel p-6">
            <h2 className="text-xl font-semibold text-ink">项目与产品</h2>
            <div className="mt-3 grid gap-2">
              {publicProfile.projects.map((project) => (
                <a
                  className="eelex-outline-button justify-between"
                  href={project.href}
                  key={project.href}
                  rel="noreferrer"
                  target="_blank"
                >
                  <span>{project.label}</span>
                  <span className="text-muted">访问</span>
                </a>
              ))}
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}
