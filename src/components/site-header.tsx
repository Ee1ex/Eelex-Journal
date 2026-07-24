"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navigation = [
  { href: "/", label: "首页" },
  { href: "/lab", label: "实验室" },
  { href: "/about", label: "关于我" },
] as const;

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="border-b border-border">
      <a
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:rounded-control focus:bg-surface focus:px-4 focus:py-3 focus:text-ink focus:outline focus:outline-2 focus:outline-focus"
        href="#main-content"
      >
        跳到主要内容
      </a>
      <div className="mx-auto flex max-w-[var(--eelex-width-wide)] flex-col gap-4 px-[var(--eelex-space-page-inline)] py-5 sm:flex-row sm:items-center sm:justify-between">
        <Link className="font-semibold text-ink" href="/">
          Eelex Code Hub
        </Link>
        <nav aria-label="主导航">
          <ul className="flex flex-wrap gap-2">
            {navigation.map((item) => {
              const current = pathname === item.href;

              return (
                <li key={item.href}>
                  <Link
                    aria-current={current ? "page" : undefined}
                    className={
                      current
                        ? "rounded-control border border-ink px-3 py-2 font-semibold text-ink"
                        : "rounded-control border border-transparent px-3 py-2 text-muted hover:border-border hover:text-ink focus-visible:outline-2 focus-visible:outline-focus"
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
