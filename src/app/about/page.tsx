import { publicProfile } from "../../site/profile";

export default function AboutPage() {
  return (
    <main
      className="mx-auto max-w-[var(--eelex-width-wide)] px-[var(--eelex-space-page-inline)] py-[var(--eelex-space-section)]"
      id="main-content"
      tabIndex={-1}
    >
      <section className="grid gap-8 sm:grid-cols-[auto_minmax(0,1fr)] sm:items-start">
        <div
          aria-label={publicProfile.avatar.alt}
          className="grid size-24 place-items-center rounded-full bg-accent text-3xl font-semibold text-surface"
          role="img"
        >
          {publicProfile.avatar.label}
        </div>
        <div>
          <p className="text-sm font-semibold text-accent">关于我</p>
          <h1 className="mt-4 text-[length:var(--eelex-text-page-title)] leading-[var(--eelex-leading-tight)] font-semibold text-ink">
            {publicProfile.name}
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-muted">
            {publicProfile.introduction}
          </p>
        </div>
      </section>
      <section className="mt-12 grid gap-8 sm:grid-cols-2">
        <div>
          <h2 className="text-[length:var(--eelex-text-section-title)] font-semibold text-ink">
            当前学习方向
          </h2>
          <ul className="mt-4 grid gap-2 text-muted">
            {publicProfile.learningFocus.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-[length:var(--eelex-text-section-title)] font-semibold text-ink">
            技能方向
          </h2>
          <ul className="mt-4 grid gap-2 text-muted">
            {publicProfile.skills.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>
      <section className="mt-12">
        <h2 className="text-[length:var(--eelex-text-section-title)] font-semibold text-ink">
          联系方式
        </h2>
        <ul className="mt-4 flex flex-wrap gap-3">
          {publicProfile.contacts.map((contact) => (
            <li key={contact.href}>
              <a
                className="rounded-control border border-border px-4 py-3 font-semibold text-ink hover:border-accent hover:text-accent"
                href={contact.href}
                rel={contact.external ? "noreferrer" : undefined}
                target={contact.external ? "_blank" : undefined}
              >
                {contact.label}
              </a>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
