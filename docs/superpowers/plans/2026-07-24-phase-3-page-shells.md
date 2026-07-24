# Phase 3 Page Shells Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use `executing-plans` to implement this plan task-by-task. Do not use subagents; this is an explicit user constraint. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 在不接入真实 MDX 或搜索逻辑的前提下，交付全部 v1 页面骨架、共享框架和统一模拟内容阅读路径。

**Architecture:** 页面默认保持 Server Component。根布局组合共享导航、各路由页面和页脚；仅导航因当前路由语义使用最小 Client Component。`src/mocks/content.ts` 是首页与详情的唯一模拟内容来源，Phase 4 将以真实 MDX 读取层替换它，而不复用本阶段的发布抽象。

**Tech Stack:** Next.js 16.2.11 App Router、React 19.2.8、TypeScript 6.0.3、Tailwind CSS 4.3.3、Vitest 4.1.10。

## Global Constraints

- 只在 `codex/phase-3-page-shells` 隔离 worktree 中实施；开始前先确认当前工作树及已批准文档已提交或被安全带入该 worktree。
- 不新增依赖、Tailwind 配置、字体、数据库、后端、CMS、搜索库或浏览器测试工具。
- 保持 `:root` token 与 `@theme inline` 映射的精确值；只添加 token 消费层样式。
- 仅建立 `/`、`/content/[slug]`、`/about`、`/lab` 和 `not-found`；不创建独立“全部文章”页。
- 搜索与分类必须使用禁用语义；不得添加 `useState`、事件处理器、查询参数、筛选、排序、匹配或结果计算逻辑。
- 模拟数据只服务 Phase 3，不读取文件系统、不解析 MDX、不校验 frontmatter、不形成可发布内容模型。
- 不渲染虚构联系方式，不实现可操作实验、SEO、部署、远程 CI、提交或推送。
- 所有公开文案面向读者，不出现开发说明、阶段说明或内部验收文字。

## 文件结构

| 文件 | 职责 |
| --- | --- |
| `src/mocks/content.ts` | 唯一模拟内容集合、类型和 slug 查询函数 |
| `src/mocks/profile.ts` | 模拟个人资料；不含虚构联系方式 |
| `src/components/site-header.tsx` | 跳至主内容、品牌、主导航、当前页语义 |
| `src/components/site-footer.tsx` | 站点名称与版权 |
| `src/components/content-card.tsx` | 内容卡片与可选封面的自然降级 |
| `src/app/layout.tsx` | 全站样式、共享框架与静态元数据 |
| `src/app/page.tsx` | 首页个人区、禁用发现控件、模拟列表与次要入口 |
| `src/app/content/[slug]/page.tsx` | 模拟详情和未知 slug 恢复 |
| `src/app/about/page.tsx` | 模拟资料结构 |
| `src/app/lab/page.tsx` | 独立实验室页面壳 |
| `src/app/not-found.tsx` | 无效路由恢复 |
| `tests/mock-content.test.ts` | 模拟数据和查询函数契约 |
| `tests/page-shells.test.tsx` | 页面、路由恢复、静态控件和隔离边界 |
| `tests/app-shell.test.tsx` | 根布局和共享框架契约 |

---

### Task 1: 建立模拟内容与个人资料的唯一来源

**Files:**

- Create: `src/mocks/content.ts`
- Create: `src/mocks/profile.ts`
- Create: `tests/mock-content.test.ts`

**Interfaces:**

- Produces: `ContentCategory`、`MockContentItem`、`mockContent`、`getMockContentBySlug(slug: string): MockContentItem | undefined`。
- Produces: `mockProfile`，供首页和关于我页读取。

- [ ] **Step 1: 写入失败的模拟来源测试**

```tsx
import { describe, expect, it } from "vitest";

import {
  getMockContentBySlug,
  mockContent,
} from "../src/mocks/content";

describe("Phase 3 模拟内容", () => {
  it("由单一集合覆盖三类内容并按发布日期降序排列", () => {
    expect(new Set(mockContent.map((item) => item.category))).toEqual(
      new Set(["文章", "学习笔记", "工具分享"]),
    );
    expect(mockContent.map((item) => item.publishedAt)).toEqual([
      "2026-07-20",
      "2026-07-12",
      "2026-07-05",
    ]);
  });

  it("只通过 slug 查询单项，并为未知 slug 返回 undefined", () => {
    expect(getMockContentBySlug("designing-readable-interfaces")?.title).toBe(
      "让界面更易阅读的三个小决定",
    );
    expect(getMockContentBySlug("missing")).toBeUndefined();
  });
});
```

- [ ] **Step 2: 运行测试，确认因缺少模块失败**

Run: `corepack pnpm exec vitest run tests/mock-content.test.ts`

Expected: FAIL，错误包含 `Cannot find module '../src/mocks/content'`。

- [ ] **Step 3: 写入最小模拟来源实现**

`src/mocks/content.ts`：

```ts
export const contentCategories = ["文章", "学习笔记", "工具分享"] as const;

export type ContentCategory = (typeof contentCategories)[number];

export type MockContentItem = {
  slug: string;
  title: string;
  excerpt: string;
  publishedAt: string;
  category: ContentCategory;
  tags: readonly string[];
  body: readonly string[];
  cover?: {
    src: string;
    alt: string;
  };
};

export const mockContent: readonly MockContentItem[] = [
  {
    slug: "designing-readable-interfaces",
    title: "让界面更易阅读的三个小决定",
    excerpt: "从信息层级、留白和文字密度出发，让阅读路径更自然。",
    publishedAt: "2026-07-20",
    category: "文章",
    tags: ["界面设计", "阅读体验"],
    body: [
      "阅读型页面最重要的不是堆叠装饰，而是让读者知道下一步该看哪里。",
      "当标题、摘要和正文拥有稳定层级时，内容本身会获得更清晰的节奏。",
    ],
  },
  {
    slug: "weekly-learning-notes-01",
    title: "本周学习笔记：把复杂问题拆成可验证的小步",
    excerpt: "记录一次从模糊想法到明确验证路径的练习。",
    publishedAt: "2026-07-12",
    category: "学习笔记",
    tags: ["学习方法", "前端"],
    body: [
      "先明确目标和约束，再把每一步缩小到可以独立验证的范围。",
      "这种节奏能减少返工，也能让结论拥有更可靠的证据。",
    ],
  },
  {
    slug: "spacing-scale-checklist",
    title: "间距检查清单：让页面呼吸得更自然",
    excerpt: "一份用于观察内容分组、容器宽度和移动端留白的简短清单。",
    publishedAt: "2026-07-05",
    category: "工具分享",
    tags: ["设计系统", "CSS"],
    body: [
      "间距不是装饰，它帮助读者识别哪些信息属于同一层级。",
      "在移动端复核时，优先保证点击区域、行长和区块之间的呼吸感。",
    ],
  },
];

export function getMockContentBySlug(
  slug: string,
): MockContentItem | undefined {
  return mockContent.find((item) => item.slug === slug);
}
```

`src/mocks/profile.ts`：

```ts
export const mockProfile = {
  name: "Eelex",
  role: "Web 开发与前端设计学习者",
  introduction:
    "在代码、界面与持续学习之间，记录那些值得反复推敲的小发现。",
  learningFocus: ["前端工程", "界面设计", "内容表达"],
  skills: ["TypeScript", "React", "CSS", "设计系统"],
} as const;
```

- [ ] **Step 4: 运行定向测试，确认通过**

Run: `corepack pnpm exec vitest run tests/mock-content.test.ts`

Expected: PASS，2 项测试通过。

### Task 2: 建立共享框架与全局 token 消费层

**Files:**

- Create: `src/components/site-header.tsx`
- Create: `src/components/site-footer.tsx`
- Modify: `src/app/layout.tsx`
- Modify: `src/app/globals.css`
- Modify: `tests/app-shell.test.tsx`

**Interfaces:**

- Consumes: 无内容数据。
- Produces: 所有页面可使用的 `SiteHeader`、`SiteFooter`，跳转锚点为 `#main-content`。

- [ ] **Step 1: 用共享框架断言替换空应用壳断言**

```tsx
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import RootLayout from "../src/app/layout";
import { useMDXComponents } from "../mdx-components";

describe("应用壳", () => {
  it("提供中文根结构、跳至主内容链接、主导航和页脚", () => {
    const markup = renderToStaticMarkup(
      <RootLayout>
        <main id="main-content">内容</main>
      </RootLayout>,
    );

    expect(markup).toContain('<html lang="zh-CN">');
    expect(markup).toContain('href="#main-content"');
    expect(markup).toContain('href="/">首页</a>');
    expect(markup).toContain('href="/lab">实验室</a>');
    expect(markup).toContain('href="/about">关于我</a>');
    expect(markup).toContain("© 2026 Eelex Code Hub");
  });

  it("提供空的全局 MDX 组件映射", () => {
    expect(useMDXComponents()).toEqual({});
  });
});
```

- [ ] **Step 2: 运行测试，确认缺少共享组件导致失败**

Run: `corepack pnpm exec vitest run tests/app-shell.test.tsx`

Expected: FAIL，断言未找到 `href="#main-content"`。

- [ ] **Step 3: 实现共享组件和布局**

`src/components/site-header.tsx`：

```tsx
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
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-control focus:bg-surface focus:px-4 focus:py-3 focus:text-ink focus:outline focus:outline-2 focus:outline-focus"
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
                    className={current ? "rounded-control border border-ink px-3 py-2 font-semibold text-ink" : "rounded-control border border-transparent px-3 py-2 text-muted hover:border-border hover:text-ink focus-visible:outline-2 focus-visible:outline-focus"}
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
```

`src/components/site-footer.tsx`：

```tsx
export function SiteFooter() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-[var(--eelex-width-wide)] flex-col gap-1 px-[var(--eelex-space-page-inline)] py-8 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
        <span>Eelex Code Hub</span>
        <span>© 2026 Eelex Code Hub</span>
      </div>
    </footer>
  );
}
```

`src/app/layout.tsx`：

```tsx
import type { Metadata } from "next";
import type { ReactNode } from "react";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

import "./globals.css";

export const metadata: Metadata = {
  title: "Eelex Code Hub",
  description: "一个关于代码、设计与学习的个人空间。",
};

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="zh-CN">
      <body>
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
```

在 `src/app/globals.css` 的 `@theme inline` 后、减少动效媒体查询前追加：

```css
html {
  background: var(--eelex-color-canvas);
}

body {
  min-width: 20rem;
  background: var(--eelex-color-canvas);
  color: var(--eelex-color-ink);
  font-family: var(--eelex-font-sans);
  font-size: var(--eelex-text-body);
  line-height: var(--eelex-leading-body);
}

a,
button,
input {
  transition:
    color var(--eelex-duration-fast) var(--eelex-ease-standard),
    border-color var(--eelex-duration-fast) var(--eelex-ease-standard),
    background-color var(--eelex-duration-fast) var(--eelex-ease-standard);
}

:focus-visible {
  outline: 2px solid var(--eelex-color-focus);
  outline-offset: 3px;
}
```

- [ ] **Step 4: 运行定向测试和类型检查**

Run: `corepack pnpm exec vitest run tests/app-shell.test.tsx && corepack pnpm typecheck`

Expected: PASS，应用壳测试通过且 TypeScript 零错误。

### Task 3: 实现首页、内容卡片和静态发现结构

**Files:**

- Create: `src/components/content-card.tsx`
- Modify: `src/app/page.tsx`
- Create: `tests/page-shells.test.tsx`

**Interfaces:**

- Consumes: `MockContentItem`、`mockContent`、`mockProfile`。
- Produces: 首页 `#main-content`、内容区 `#content` 和每项 `/content/[slug]` 链接。

- [ ] **Step 1: 写入首页失败测试**

```tsx
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import Home from "../src/app/page";

describe("Phase 3 页面骨架", () => {
  it("首页展示个人区、禁用发现控件与统一模拟内容入口", () => {
    const markup = renderToStaticMarkup(<Home />);

    expect(markup).toContain('id="main-content"');
    expect(markup).toContain('id="content"');
    expect(markup).toContain("Eelex");
    expect(markup).toContain("搜索将在内容发布后开放");
    expect(markup).toContain('disabled=""');
    expect(markup).toContain('href="/content/designing-readable-interfaces"');
    expect(markup).toContain('href="/content/weekly-learning-notes-01"');
    expect(markup).toContain('href="/content/spacing-scale-checklist"');
  });
});
```

- [ ] **Step 2: 运行测试，确认空首页导致失败**

Run: `corepack pnpm exec vitest run tests/page-shells.test.tsx`

Expected: FAIL，断言未找到 `id="content"`。

- [ ] **Step 3: 实现内容卡片和首页**

`src/components/content-card.tsx`：

```tsx
import Link from "next/link";

import type { MockContentItem } from "@/mocks/content";

const categoryStyles = {
  文章: "border-category-article bg-category-article-soft text-category-article",
  学习笔记: "border-category-note bg-category-note-soft text-category-note",
  工具分享: "border-category-tool bg-category-tool-soft text-category-tool",
} as const;

export function ContentCard({ item }: { item: MockContentItem }) {
  return (
    <article className="rounded-panel border border-border bg-surface p-6">
      <div className="flex flex-wrap items-center gap-3 text-[length:var(--eelex-text-meta)] text-muted">
        <span className={`rounded-control border px-2 py-1 font-semibold ${categoryStyles[item.category]}`}>
          {item.category}
        </span>
        <time dateTime={item.publishedAt}>{item.publishedAt}</time>
      </div>
      <h2 className="mt-5 text-[length:var(--eelex-text-section-title)] font-semibold leading-[var(--eelex-leading-tight)] text-ink">
        <Link className="hover:text-accent" href={`/content/${item.slug}`}>
          {item.title}
        </Link>
      </h2>
      <p className="mt-3 max-w-[var(--eelex-width-reading)] text-muted">
        {item.excerpt}
      </p>
      <ul className="mt-5 flex flex-wrap gap-2" aria-label="标签">
        {item.tags.map((tag) => (
          <li className="rounded-control border border-border px-2 py-1 text-[length:var(--eelex-text-meta)] text-muted" key={tag}>
            {tag}
          </li>
        ))}
      </ul>
    </article>
  );
}
```

`src/app/page.tsx`：

```tsx
import Link from "next/link";

import { ContentCard } from "@/components/content-card";
import { mockContent } from "@/mocks/content";
import { mockProfile } from "@/mocks/profile";

const categories = ["全部", "文章", "学习笔记", "工具分享"] as const;

export default function Home() {
  return (
    <main id="main-content" tabIndex={-1}>
      <section className="mx-auto flex min-h-[22.5rem] max-w-[var(--eelex-width-wide)] flex-col justify-end px-[var(--eelex-space-page-inline)] py-[var(--eelex-space-section)] sm:min-h-[26.25rem]">
        <p className="text-[length:var(--eelex-text-small)] font-semibold text-accent">
          Eelex Code Hub
        </p>
        <h1 className="mt-4 max-w-4xl text-[length:var(--eelex-text-display)] font-semibold leading-[var(--eelex-leading-tight)] text-ink">
          {mockProfile.name}
        </h1>
        <p className="mt-4 text-lg font-semibold text-ink">{mockProfile.role}</p>
        <p className="mt-4 max-w-2xl text-muted">{mockProfile.introduction}</p>
      </section>

      <section className="border-y border-border bg-surface" id="content">
        <div className="mx-auto max-w-[var(--eelex-width-wide)] px-[var(--eelex-space-page-inline)] py-[var(--eelex-space-section)]">
          <div className="max-w-2xl">
            <p className="text-[length:var(--eelex-text-small)] font-semibold text-accent">
              内容
            </p>
            <h2 className="mt-3 text-[length:var(--eelex-text-page-title)] font-semibold leading-[var(--eelex-leading-tight)] text-ink">
              从最近的记录开始阅读
            </h2>
          </div>
          <fieldset className="mt-8 grid gap-4" disabled>
            <legend className="sr-only">内容发现</legend>
            <label className="grid gap-2 text-sm font-semibold text-ink">
              搜索内容
              <input
                className="rounded-control border border-border bg-canvas px-4 py-3 text-muted"
                placeholder="搜索标题、摘要、分类或标签"
                type="search"
              />
            </label>
            <div className="flex flex-wrap gap-2" aria-label="内容分类">
              {categories.map((category, index) => (
                <button
                  className="rounded-control border border-border bg-canvas px-3 py-2 text-sm font-semibold text-muted disabled:cursor-not-allowed disabled:opacity-70"
                  key={category}
                  type="button"
                >
                  {index === 0 ? "全部" : category}
                </button>
              ))}
            </div>
          </fieldset>
          <p className="mt-4 text-sm text-muted" role="status">
            搜索将在内容发布后开放
          </p>
          <div className="mt-8 grid gap-5">
            {mockContent.map((item) => (
              <ContentCard item={item} key={item.slug} />
            ))}
          </div>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link className="rounded-control border border-ink px-4 py-3 font-semibold text-ink" href="/about">
              了解我
            </Link>
            <Link className="rounded-control border border-border px-4 py-3 font-semibold text-ink" href="/lab">
              前往实验室
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
```

- [ ] **Step 4: 运行首页测试，确认通过**

Run: `corepack pnpm exec vitest run tests/page-shells.test.tsx`

Expected: PASS，首页结构测试通过。

### Task 4: 实现详情、关于我、实验室与 404 路由

**Files:**

- Create: `src/app/content/[slug]/page.tsx`
- Create: `src/app/about/page.tsx`
- Create: `src/app/lab/page.tsx`
- Create: `src/app/not-found.tsx`
- Modify: `tests/page-shells.test.tsx`

**Interfaces:**

- Consumes: `getMockContentBySlug`、`mockProfile`。
- Produces: 详情返回 `/#content`；未知 slug 使用 `notFound()`。

- [ ] **Step 1: 扩展路由失败测试**

在 `tests/page-shells.test.tsx` 追加：

```tsx
import AboutPage from "../src/app/about/page";
import ContentPage from "../src/app/content/[slug]/page";
import LabPage from "../src/app/lab/page";
import NotFoundPage from "../src/app/not-found";

it("详情、关于我、实验室和 404 提供既定结构与恢复路径", async () => {
  const detail = renderToStaticMarkup(
    await ContentPage({
      params: Promise.resolve({ slug: "designing-readable-interfaces" }),
    }),
  );

  expect(detail).toContain("让界面更易阅读的三个小决定");
  expect(detail).toContain('href="/#content"');
  expect(renderToStaticMarkup(<AboutPage />)).toContain("当前学习方向");
  expect(renderToStaticMarkup(<LabPage />)).toContain("实验室");
  expect(renderToStaticMarkup(<NotFoundPage />)).toContain('href="/#content"');
});
```

- [ ] **Step 2: 运行测试，确认因缺少路由模块失败**

Run: `corepack pnpm exec vitest run tests/page-shells.test.tsx`

Expected: FAIL，错误包含 `Cannot find module '../src/app/about/page'`。

- [ ] **Step 3: 实现四个路由模块**

`src/app/content/[slug]/page.tsx`：

```tsx
import Link from "next/link";
import { notFound } from "next/navigation";

import { getMockContentBySlug } from "@/mocks/content";

export default async function ContentPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = getMockContentBySlug(slug);

  if (!item) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-[var(--eelex-width-reading)] px-[var(--eelex-space-page-inline)] py-[var(--eelex-space-section)]" id="main-content" tabIndex={-1}>
      <Link className="text-sm font-semibold text-accent" href="/#content">
        返回内容
      </Link>
      <article className="mt-8">
        <p className="text-sm font-semibold text-accent">{item.category}</p>
        <h1 className="mt-4 text-[length:var(--eelex-text-page-title)] font-semibold leading-[var(--eelex-leading-tight)] text-ink">
          {item.title}
        </h1>
        <p className="mt-4 text-sm text-muted">{item.publishedAt}</p>
        <p className="mt-6 text-lg text-muted">{item.excerpt}</p>
        <ul className="mt-6 flex flex-wrap gap-2" aria-label="标签">
          {item.tags.map((tag) => (
            <li className="rounded-control border border-border px-2 py-1 text-sm text-muted" key={tag}>
              {tag}
            </li>
          ))}
        </ul>
        <div className="mt-10 grid gap-6 text-ink">
          {item.body.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </article>
    </main>
  );
}
```

`src/app/about/page.tsx`：

```tsx
import { mockProfile } from "@/mocks/profile";

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-[var(--eelex-width-wide)] px-[var(--eelex-space-page-inline)] py-[var(--eelex-space-section)]" id="main-content" tabIndex={-1}>
      <p className="text-sm font-semibold text-accent">关于我</p>
      <h1 className="mt-4 text-[length:var(--eelex-text-page-title)] font-semibold leading-[var(--eelex-leading-tight)] text-ink">
        {mockProfile.name}
      </h1>
      <p className="mt-4 max-w-2xl text-lg text-muted">{mockProfile.introduction}</p>
      <section className="mt-12 grid gap-8 sm:grid-cols-2">
        <div>
          <h2 className="text-[length:var(--eelex-text-section-title)] font-semibold text-ink">当前学习方向</h2>
          <ul className="mt-4 grid gap-2 text-muted">
            {mockProfile.learningFocus.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </div>
        <div>
          <h2 className="text-[length:var(--eelex-text-section-title)] font-semibold text-ink">技能方向</h2>
          <ul className="mt-4 grid gap-2 text-muted">
            {mockProfile.skills.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </div>
      </section>
    </main>
  );
}
```

`src/app/lab/page.tsx`：

```tsx
import Link from "next/link";

export default function LabPage() {
  return (
    <main className="mx-auto max-w-[var(--eelex-width-wide)] px-[var(--eelex-space-page-inline)] py-[var(--eelex-space-section)]" id="main-content" tabIndex={-1}>
      <p className="text-sm font-semibold text-accent">实验室</p>
      <h1 className="mt-4 text-[length:var(--eelex-text-page-title)] font-semibold leading-[var(--eelex-leading-tight)] text-ink">为好奇心留一块空间</h1>
      <p className="mt-4 max-w-2xl text-muted">这里会收录关于界面、动效与交互的独立小实验。</p>
      <Link className="mt-10 inline-flex rounded-control border border-ink px-4 py-3 font-semibold text-ink" href="/#content">
        返回内容
      </Link>
    </main>
  );
}
```

`src/app/not-found.tsx`：

```tsx
import Link from "next/link";

export default function NotFoundPage() {
  return (
    <main className="mx-auto max-w-[var(--eelex-width-reading)] px-[var(--eelex-space-page-inline)] py-[var(--eelex-space-section)]" id="main-content" tabIndex={-1}>
      <p className="text-sm font-semibold text-accent">404</p>
      <h1 className="mt-4 text-[length:var(--eelex-text-page-title)] font-semibold leading-[var(--eelex-leading-tight)] text-ink">没有找到这页内容</h1>
      <p className="mt-4 text-muted">你可以回到首页，继续浏览已经整理好的内容。</p>
      <Link className="mt-8 inline-flex rounded-control border border-ink px-4 py-3 font-semibold text-ink" href="/#content">
        返回内容
      </Link>
    </main>
  );
}
```

- [ ] **Step 4: 运行全部页面骨架测试和类型检查**

Run: `corepack pnpm exec vitest run tests/page-shells.test.tsx tests/app-shell.test.tsx tests/mock-content.test.ts && corepack pnpm typecheck`

Expected: PASS，所有定向测试通过，TypeScript 零错误。

### Task 5: 全量验证、人工检查与文档收尾

**Files:**

- Modify: `docs/REQ-20260724-05-phase-3-page-shells.md`
- Modify: `docs/DEV-20260724-05-phase-3-page-shells.md`
- Modify: `docs/PROG-20260724.md`
- Modify: `docs/README.md`
- Modify: `README.md`

**Interfaces:**

- Consumes: Tasks 1–4 的命令输出、人工检查结果与 git 状态。
- Produces: `REQ-20260724-05` 的 `Done` 状态、可检查验证证据和下一阶段交接记录。

- [ ] **Step 1: 运行完整自动验证**

Run:

```bash
corepack pnpm install --frozen-lockfile
corepack pnpm format:check
corepack pnpm typecheck
corepack pnpm lint
corepack pnpm test
corepack pnpm build
corepack pnpm check
corepack pnpm peers check
corepack pnpm audit --prod
git diff --check
```

Expected: 全部零退出码；既有 token 和工程测试继续通过；新增页面骨架测试通过；生产审计输出 `No known vulnerabilities found`。

- [ ] **Step 2: 进行人工页面验证**

Run: `corepack pnpm dev -- --hostname 127.0.0.1 --port 3103`

Expected: 本地服务器启动后，在 `1280px` 与 `375px` 宽度逐项确认：

1. 首页个人区明显大于内容卡片，且不是全屏 Hero。
2. 导航在桌面单行、手机两行，三个入口始终可见。
3. 键盘 Tab 首次聚焦显示“跳到主要内容”，Enter 后进入 `#main-content`。
4. 首页的搜索框和四个分类控件不可操作，并清楚表达不可用状态。
5. 三张卡片均可打开详情；详情、实验室与 404 均可返回 `/#content`。
6. 刷新详情页和无效 slug 后，分别保持详情和进入 404。
7. 在浏览器减少动效偏好下，页面没有平滑滚动或持续动效。

验证结束后停止开发服务器并确认端口 `3103` 已释放。

- [ ] **Step 3: 追加准确的完成记录**

在 REQ 中追加实际通过的命令、测试文件与测试数量、人工检查结果、未执行项和未实现的后续 Phase 边界；将状态改为 `Done`。在 DEV 中追加实现与验证证据。在 PROG 中追加 Phase 3 目标、DoD 逐项结果、风险、推迟事项和 Phase 4 交接。将 `docs/README.md` 的当前 REQ 状态和 README 的项目状态同步为实际完成事实。

- [ ] **Step 4: 文档与变更自审**

Run:

```bash
rg -n "T[O]DO|T[B]D|implement[ ]later|fill[ ]in[ ]details" docs/REQ-20260724-05-phase-3-page-shells.md docs/DEV-20260724-05-phase-3-page-shells.md docs/PROG-20260724.md docs/superpowers/plans/2026-07-24-phase-3-page-shells.md
git diff --check
git status --short
```

Expected: `rg` 无命中；`git diff --check` 零退出码；状态只列出本 Phase 文件。不要提交、推送或部署，除非用户另行授权。

## Plan Self-Review

- Spec coverage：Tasks 1–4 覆盖全部路由、共享框架、模拟来源、静态发现结构、响应式 token 消费和 404；Task 5 覆盖质量、人工检查与 Documentation Closeout Gate。
- Placeholder scan：本计划不使用待办占位词、未定义接口或“类似前一任务”的指令。
- Type consistency：`MockContentItem`、`mockContent`、`getMockContentBySlug`、`mockProfile`、`#main-content` 和 `#content` 在所有任务中使用同一名称。
