import { mockProfile } from "../../mocks/profile";

export default function AboutPage() {
  return (
    <main
      className="mx-auto max-w-[var(--eelex-width-wide)] px-[var(--eelex-space-page-inline)] py-[var(--eelex-space-section)]"
      id="main-content"
      tabIndex={-1}
    >
      <p className="text-sm font-semibold text-accent">关于我</p>
      <h1 className="mt-4 text-[length:var(--eelex-text-page-title)] leading-[var(--eelex-leading-tight)] font-semibold text-ink">
        {mockProfile.name}
      </h1>
      <p className="mt-4 max-w-2xl text-lg text-muted">
        {mockProfile.introduction}
      </p>
      <section className="mt-12 grid gap-8 sm:grid-cols-2">
        <div>
          <h2 className="text-[length:var(--eelex-text-section-title)] font-semibold text-ink">
            当前学习方向
          </h2>
          <ul className="mt-4 grid gap-2 text-muted">
            {mockProfile.learningFocus.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-[length:var(--eelex-text-section-title)] font-semibold text-ink">
            技能方向
          </h2>
          <ul className="mt-4 grid gap-2 text-muted">
            {mockProfile.skills.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
