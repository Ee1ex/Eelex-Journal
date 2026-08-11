"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navigation = [
  { href: "/", label: "内容" },
  { href: "/about", label: "关于" },
] as const;

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="eelex-site-header px-[var(--eelex-space-page-inline)] pt-6 sm:pt-8">
      <a
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:rounded-control focus:bg-surface focus:px-4 focus:py-3 focus:text-ink focus:outline focus:outline-2 focus:outline-focus"
        href="#main-content"
      >
        跳到主要内容
      </a>
      <div className="eelex-site-nav mx-auto flex max-w-[var(--eelex-width-wide)] items-center justify-between gap-6 border-b border-border pb-5">
        <Link
          className="text-sm font-medium tracking-[-0.03em] text-ink"
          href="/"
        >
          Eelex Code Hub
        </Link>
        <nav aria-label="主导航">
          <ul className="flex items-center gap-5">
            {navigation.map((item) => {
              const current = pathname === item.href;

              return (
                <li key={item.href}>
                  <Link
                    aria-current={current ? "page" : undefined}
                    className={
                      current
                        ? "border-b border-ink pb-1 text-sm font-medium text-ink"
                        : "border-b border-transparent pb-1 text-sm text-muted hover:border-border hover:text-ink focus-visible:outline-2 focus-visible:outline-focus"
                    }
                    href={item.href}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </header>
  );
}
