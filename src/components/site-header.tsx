"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import type { ContentListItem } from "../content/repository";
import { publicProfile } from "../site/profile";
import { DisplaySettings } from "./display-settings";
import { GlobalSearch } from "./global-search";
import { NavIcon } from "./nav-icon";

type OpenMenu = "projects" | "about" | "display" | "mobile" | null;

export function SiteHeader({ items }: { items: readonly ContentListItem[] }) {
  const pathname = usePathname();
  const headerRef = useRef<HTMLDivElement>(null);
  const [openMenu, setOpenMenu] = useState<OpenMenu>(null);

  useEffect(() => {
    function closeFromOutside(event: PointerEvent) {
      if (!headerRef.current?.contains(event.target as Node)) {
        setOpenMenu(null);
      }
    }

    function closeWithEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setOpenMenu(null);
    }

    document.addEventListener("pointerdown", closeFromOutside);
    document.addEventListener("keydown", closeWithEscape);

    return () => {
      document.removeEventListener("pointerdown", closeFromOutside);
      document.removeEventListener("keydown", closeWithEscape);
    };
  }, []);

  function toggleMenu(menu: Exclude<OpenMenu, null>) {
    setOpenMenu((current) => (current === menu ? null : menu));
  }

  function closeWhenLeavingMenuSurface(target: EventTarget | null) {
    if (target instanceof Element && !target.closest("[data-menu-surface]")) {
      setOpenMenu(null);
    }
  }

  return (
    <header className="eelex-site-header sticky top-0 z-40 pt-3">
      <a
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:rounded-control focus:bg-paper focus:px-4 focus:py-3 focus:text-ink"
        href="#main-content"
      >
        跳到主要内容
      </a>
      <div className="mx-auto max-w-[var(--eelex-width-wide)] px-[var(--eelex-space-page-inline)]">
        <div
          className="eelex-site-nav flex items-center gap-4 rounded-panel border border-border bg-paper/95 px-4 py-3 shadow-[var(--eelex-shadow-panel)] backdrop-blur sm:px-5"
          onFocusCapture={(event) => closeWhenLeavingMenuSurface(event.target)}
          onPointerDownCapture={(event) =>
            closeWhenLeavingMenuSurface(event.target)
          }
          ref={headerRef}
        >
          <Link
            className="mr-auto text-sm font-semibold tracking-[-0.03em] text-ink"
            href="/"
          >
            Eelex Blog
          </Link>
          <nav
            aria-label="主导航"
            className="hidden items-center gap-1 md:flex"
          >
            <Link
              aria-current={pathname === "/" ? "page" : undefined}
              className="eelex-nav-link"
              data-active={pathname === "/"}
              href="/"
            >
              <NavIcon name="home" />
              首页
            </Link>
            <div
              className="eelex-popover relative"
              data-menu-surface
              data-open={openMenu === "projects"}
            >
              <button
                aria-controls="projects-menu"
                aria-expanded={openMenu === "projects"}
                className="eelex-nav-link"
                data-active={pathname === "/archive"}
                onClick={() => toggleMenu("projects")}
                type="button"
              >
                <NavIcon name="project" />
                项目
              </button>
              {openMenu === "projects" ? (
                <div
                  className="eelex-popover-panel absolute left-0 z-50 mt-3 w-72 rounded-panel border border-border bg-paper p-3 shadow-[var(--eelex-shadow-panel)]"
                  id="projects-menu"
                >
                  <Link
                    className="block rounded-[var(--eelex-radius-nested)] px-3 py-2 hover:bg-canvas"
                    href="/archive"
                    onClick={() => setOpenMenu(null)}
                  >
                    <span className="flex items-center gap-2 text-sm font-medium text-ink">
                      <NavIcon name="archive" /> 内容归档
                    </span>
                    <span className="mt-1 block text-xs text-muted">
                      按年份、分类与标签浏览全部文章
                    </span>
                  </Link>
                  {publicProfile.projects.map((project) => (
                    <a
                      className="block rounded-[var(--eelex-radius-nested)] px-3 py-2 hover:bg-canvas"
                      href={project.href}
                      key={project.href}
                      onClick={() => setOpenMenu(null)}
                      rel="noreferrer"
                      target="_blank"
                    >
                      <span className="flex items-center gap-2 text-sm font-medium text-ink">
                        <NavIcon name="github" /> {project.label}
                      </span>
                      <span className="mt-1 block text-xs text-muted">
                        {project.description}
                      </span>
                    </a>
                  ))}
                </div>
              ) : null}
            </div>
            <div
              className="eelex-popover relative"
              data-menu-surface
              data-open={openMenu === "about"}
            >
              <button
                aria-controls="about-menu"
                aria-expanded={openMenu === "about"}
                className="eelex-nav-link"
                data-active={pathname === "/about"}
                onClick={() => toggleMenu("about")}
                type="button"
              >
                <NavIcon name="about" />
                关于
              </button>
              {openMenu === "about" ? (
                <div
                  className="eelex-popover-panel absolute left-0 z-50 mt-3 w-64 rounded-panel border border-border bg-paper p-3 shadow-[var(--eelex-shadow-panel)]"
                  id="about-menu"
                >
                  <Link
                    className="block rounded-[var(--eelex-radius-nested)] px-3 py-2 hover:bg-canvas"
                    href="/about"
                    onClick={() => setOpenMenu(null)}
                  >
                    <span className="flex items-center gap-2 text-sm font-medium text-ink">
                      <NavIcon name="about" /> 关于 Eelex
                    </span>
                    <span className="mt-1 block text-xs text-muted">
                      了解学习方向、技能与公开项目
                    </span>
                  </Link>
                  <a
                    className="block rounded-[var(--eelex-radius-nested)] px-3 py-2 hover:bg-canvas"
                    href={publicProfile.feedback.href}
                    onClick={() => setOpenMenu(null)}
                    rel="noreferrer"
                    target="_blank"
                  >
                    <span className="flex items-center gap-2 text-sm font-medium text-ink">
                      <NavIcon name="feedback" /> 反馈与联系
                    </span>
                    <span className="mt-1 block text-xs text-muted">
                      通过 GitHub 提交反馈或建立联系
                    </span>
                  </a>
                </div>
              ) : null}
            </div>
          </nav>
          <div className="hidden w-48 lg:block">
            <GlobalSearch id="global-search-desktop" items={items} />
          </div>
          <DisplaySettings
            onToggle={() => toggleMenu("display")}
            open={openMenu === "display"}
          />
          <div
            className="eelex-mobile-menu relative md:hidden"
            data-menu-surface
            data-open={openMenu === "mobile"}
          >
            <button
              aria-controls="mobile-navigation"
              aria-expanded={openMenu === "mobile"}
              aria-label="打开菜单"
              className="eelex-icon-button"
              onClick={() => toggleMenu("mobile")}
              type="button"
            >
              <NavIcon name="menu" />
              菜单
            </button>
            {openMenu === "mobile" ? (
              <nav
                className="absolute right-0 z-50 mt-3 grid w-72 gap-1 rounded-panel border border-border bg-paper p-3 shadow-[var(--eelex-shadow-panel)]"
                aria-label="移动端导航"
                id="mobile-navigation"
              >
                <Link
                  className="flex items-center gap-2 rounded-[var(--eelex-radius-nested)] px-3 py-2 text-sm text-ink hover:bg-canvas"
                  href="/"
                  onClick={() => setOpenMenu(null)}
                >
                  <NavIcon name="home" />
                  首页
                </Link>
                <p className="px-3 pt-2 text-xs font-medium tracking-[0.06em] text-muted uppercase">
                  项目
                </p>
                <Link
                  className="flex items-center gap-2 rounded-[var(--eelex-radius-nested)] px-3 py-2 text-sm text-ink hover:bg-canvas"
                  href="/archive"
                  onClick={() => setOpenMenu(null)}
                >
                  <NavIcon name="archive" />
                  内容归档
                </Link>
                {publicProfile.projects.map((project) => (
                  <a
                    className="flex items-center gap-2 rounded-[var(--eelex-radius-nested)] px-3 py-2 text-sm text-ink hover:bg-canvas"
                    href={project.href}
                    key={project.href}
                    onClick={() => setOpenMenu(null)}
                    rel="noreferrer"
                    target="_blank"
                  >
                    <NavIcon name="github" /> {project.label}
                  </a>
                ))}
                <p className="px-3 pt-2 text-xs font-medium tracking-[0.06em] text-muted uppercase">
                  关于
                </p>
                <Link
                  className="flex items-center gap-2 rounded-[var(--eelex-radius-nested)] px-3 py-2 text-sm text-ink hover:bg-canvas"
                  href="/about"
                  onClick={() => setOpenMenu(null)}
                >
                  <NavIcon name="about" />
                  关于 Eelex
                </Link>
                <a
                  className="flex items-center gap-2 rounded-[var(--eelex-radius-nested)] px-3 py-2 text-sm text-ink hover:bg-canvas"
                  href={publicProfile.feedback.href}
                  onClick={() => setOpenMenu(null)}
                  rel="noreferrer"
                  target="_blank"
                >
                  <NavIcon name="feedback" />
                  反馈与联系
                </a>
                <div className="mt-2 border-t border-border pt-3">
                  <GlobalSearch id="global-search-mobile" items={items} />
                </div>
              </nav>
            ) : null}
          </div>
        </div>
      </div>
    </header>
  );
}
