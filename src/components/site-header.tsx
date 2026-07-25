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
    <header className="sticky top-0 z-20 px-[var(--eelex-space-page-inline)] py-4 backdrop-blur-xl">
      <a
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:rounded-control focus:bg-surface focus:px-4 focus:py-3 focus:text-ink focus:outline focus:outline-2 focus:outline-focus"
        href="#main-content"
      >
        跳到主要内容
      </a>
      <div className="mx-auto flex max-w-[var(--eelex-width-wide)] items-center justify-between gap-4 rounded-full border border-white/75 bg-surface px-5 py-3 shadow-[0_10px_30px_rgba(77,67,55,0.07)] sm:px-8">
        <Link
          className="text-sm font-normal tracking-[-0.04em] text-ink"
          href="/"
        >
          Eelex Code Hub
        </Link>
        <nav aria-label="主导航">
          <ul className="flex items-center gap-1">
            {navigation.map((item) => {
              const current = pathname === item.href;

              return (
                <li key={item.href}>
                  <Link
                    aria-current={current ? "page" : undefined}
                    className={
                      current
                        ? "rounded-control border border-white/70 bg-white/75 px-3 py-1.5 text-sm text-ink"
                        : "rounded-control border border-transparent px-3 py-1.5 text-sm text-muted hover:bg-black/[0.04] hover:text-ink focus-visible:outline-2 focus-visible:outline-focus"
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
