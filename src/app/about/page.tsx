import type { Metadata } from "next";

import { publicProfile } from "../../site/profile";
import { createPageTitle } from "../../site/seo";

export const metadata: Metadata = {
  title: createPageTitle("关于我"),
  description: "了解 Eelex 的学习方向、技能方向与联系方式。",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <main
      className="mx-auto max-w-[var(--eelex-width-wide)] px-[var(--eelex-space-page-inline)] pt-12 pb-[var(--eelex-space-section)]"
      id="main-content"
      tabIndex={-1}
    >
      <section className="eelex-page-intro-card mb-10 rounded-panel border border-white/80 bg-surface/65 p-7 shadow-[var(--eelex-shadow-panel)] backdrop-blur sm:p-10">
        <p className="text-sm font-semibold tracking-[0.14em] text-accent">
          ABOUT EELEX
        </p>
        <h1 className="eelex-page-heading mt-4 text-[length:var(--eelex-text-page-title)] leading-[1.1] font-normal tracking-[0.01em] text-ink">
          关于我
        </h1>
        <p className="eelex-page-intro mt-6 max-w-2xl text-lg leading-relaxed text-muted">
          {publicProfile.introduction}
        </p>
      </section>
      <section className="grid gap-5 pb-10 sm:grid-cols-[1.1fr_0.9fr]">
        <article className="rounded-panel border border-white/80 bg-surface p-7 shadow-[var(--eelex-shadow-panel)] sm:p-10">
          <div
            aria-label={publicProfile.avatar.alt}
            className="grid size-20 place-items-center rounded-[1.6rem] bg-[linear-gradient(145deg,var(--eelex-color-accent),#8270a8)] text-2xl font-medium text-surface shadow-[13px_16px_30px_rgba(46,51,85,0.22)]"
            role="img"
          >
            {publicProfile.avatar.label}
          </div>
          <h2 className="mt-7 text-2xl font-medium tracking-[-0.05em] text-ink">
            {publicProfile.name}
          </h2>
          <p className="mt-2 text-muted">{publicProfile.role}</p>
          {publicProfile.contacts.map((contact) => (
            <a
              className="mt-5 inline-flex rounded-control bg-ink px-4 py-2.5 text-sm text-surface hover:bg-accent"
              href={contact.href}
              key={contact.href}
              rel={contact.external ? "noreferrer" : undefined}
              target={contact.external ? "_blank" : undefined}
            >
              {contact.label}
            </a>
          ))}
        </article>
        <aside className="rounded-panel border border-white/80 bg-surface p-7 shadow-[var(--eelex-shadow-panel)] sm:p-10">
          <div className="grid gap-5">
            <div className="border-b border-border pb-5">
              <h2 className="text-sm font-semibold tracking-[0.08em] text-accent">
                当前学习方向
              </h2>
              <p className="mt-2 text-muted">
                {publicProfile.learningFocus.join(" · ")}
              </p>
            </div>
            <div className="border-b border-border pb-5">
              <h2 className="text-sm font-semibold tracking-[0.08em] text-accent">
                技能方向
              </h2>
              <p className="mt-2 text-muted">
                {publicProfile.skills.join(" · ")}
              </p>
            </div>
            <div>
              <h2 className="text-sm font-semibold tracking-[0.08em] text-accent">
                联系方式
              </h2>
              <p className="mt-2 text-muted">GitHub · Ee1ex</p>
            </div>
          </div>
        </aside>
      </section>
    </main>
  );
}
