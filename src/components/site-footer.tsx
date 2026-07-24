import { publicProfile } from "../site/profile";

export function SiteFooter() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-[var(--eelex-width-wide)] flex-col gap-1 px-[var(--eelex-space-page-inline)] py-8 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
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
          <span>© 2026 Eelex Code Hub</span>
        </div>
      </div>
    </footer>
  );
}
