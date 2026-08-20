import Image from "next/image";
import Link from "next/link";

import type { ContentListItem } from "../content/repository";
import { getSiteStats } from "../content/repository";
import { publicProfile } from "../site/profile";
import { AnnouncementCard } from "./announcement-card";

function countsFor(items: readonly ContentListItem[]) {
  const categories = new Map<string, number>();
  const tags = new Map<string, number>();

  for (const item of items) {
    categories.set(item.category, (categories.get(item.category) ?? 0) + 1);
    for (const tag of item.tags) tags.set(tag, (tags.get(tag) ?? 0) + 1);
  }

  return { categories: [...categories], tags: [...tags] };
}

export function ProfileSidebar({
  items,
}: {
  items: readonly ContentListItem[];
}) {
  const counts = countsFor(items);

  return (
    <aside
      className="eelex-profile-sidebar grid content-start gap-4"
      aria-label="个人资料与内容导航"
    >
      <section className="eelex-panel p-5 text-center">
        <Image
          alt={publicProfile.avatar.alt}
          className="mx-auto aspect-square w-full rounded-[var(--eelex-radius-nested)] object-cover"
          height={512}
          priority
          src={publicProfile.avatar.src}
          width={512}
        />
        <h2 className="mt-4 text-xl font-semibold tracking-[-0.03em] text-ink">
          {publicProfile.name}
        </h2>
        <p className="mt-1 text-sm text-muted">{publicProfile.role}</p>
        <div className="mt-4 grid gap-2">
          {publicProfile.projects.map((project) => (
            <a
              className="eelex-outline-button justify-center"
              href={project.href}
              key={project.href}
              rel="noreferrer"
              target="_blank"
            >
              {project.label}
            </a>
          ))}
          <a
            className="eelex-dark-button justify-center"
            href={publicProfile.feedback.href}
            rel="noreferrer"
            target="_blank"
          >
            反馈与联系
          </a>
        </div>
      </section>
      <AnnouncementCard />
      <section className="eelex-panel p-5">
        <h2 className="text-sm font-semibold text-ink">分类</h2>
        <ul className="mt-3 grid gap-2">
          {counts.categories.map(([category, count]) => (
            <li key={category}>
              <Link
                className="flex justify-between text-sm text-muted hover:text-ink"
                href={`/archive?category=${encodeURIComponent(category)}`}
              >
                <span>{category}</span>
                <span>{count}</span>
              </Link>
            </li>
          ))}
        </ul>
        <h2 className="mt-6 text-sm font-semibold text-ink">标签</h2>
        <div className="mt-3 flex flex-wrap gap-2">
          {counts.tags.map(([tag]) => (
            <Link
              className="eelex-soft-badge"
              href={`/archive?tag=${encodeURIComponent(tag)}`}
              key={tag}
            >
              {tag}
            </Link>
          ))}
        </div>
      </section>
    </aside>
  );
}

export function SiteStats() {
  const stats = getSiteStats();

  return (
    <aside className="eelex-site-stats" aria-label="站点统计">
      <section className="eelex-panel sticky top-24 p-5">
        <h2 className="text-sm font-semibold text-ink">站点统计</h2>
        <dl className="mt-4 grid gap-4">
          <div className="flex items-baseline justify-between gap-4">
            <dt className="text-sm text-muted">文章</dt>
            <dd className="font-semibold text-ink">{stats.posts}</dd>
          </div>
          <div className="flex items-baseline justify-between gap-4">
            <dt className="text-sm text-muted">分类</dt>
            <dd className="font-semibold text-ink">{stats.categories}</dd>
          </div>
          <div className="flex items-baseline justify-between gap-4">
            <dt className="text-sm text-muted">标签</dt>
            <dd className="font-semibold text-ink">{stats.tags}</dd>
          </div>
          <div className="flex items-baseline justify-between gap-4">
            <dt className="text-sm text-muted">总字数</dt>
            <dd className="font-semibold text-ink">
              {stats.totalWords.toLocaleString("zh-CN")}
            </dd>
          </div>
          <div className="border-t border-border pt-4">
            <dt className="text-xs text-muted">最近更新</dt>
            <dd className="mt-1 text-sm font-medium text-ink">
              {stats.lastPublishedAt ?? "暂无"}
            </dd>
          </div>
        </dl>
      </section>
    </aside>
  );
}
