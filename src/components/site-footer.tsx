import { publicProfile } from "../site/profile";

export function SiteFooter() {
  return (
    <footer className="eelex-site-footer px-[var(--eelex-space-page-inline)] pt-10 pb-12">
      <div className="mx-auto flex max-w-[var(--eelex-width-wide)] flex-col gap-3 border-t border-border pt-5 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
        <span>Eelex Code Hub</span>
        <div className="flex flex-wrap gap-x-4 gap-y-1">
          {publicProfile.contacts.map((contact) => (
            <a
              className="hover:text-accent"
              href={contact.href}
              key={contact.href}
              rel={contact.external ? "noreferrer" : undefined}
              target={contact.external ? "_blank" : undefined}
            >
              {contact.label}
            </a>
          ))}
          <a className="hover:text-ink" href="/rss.xml">
            RSS
          </a>
          <a className="hover:text-ink" href="/sitemap.xml">
            Sitemap
          </a>
          <span>© 2026 Eelex Code Hub</span>
        </div>
      </div>
    </footer>
  );
}
