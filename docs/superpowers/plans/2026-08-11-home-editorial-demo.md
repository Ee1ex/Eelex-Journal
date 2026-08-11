# Home Editorial Demo Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 在不改变 Eelex Code Hub 首页内容、路由、搜索和分类行为的前提下，将首页实现为暖白纸张感、编辑目录式的视觉 demo。

**Architecture:** 保留现有 Next.js App Router、Server Component 首页数据流和 `ContentDiscovery` Client Component 状态流；只更新共享视觉 token、首页页面壳、导航/页脚和内容发现表现层。所有新视觉值集中在 `src/app/globals.css`，组件通过语义 token 或局部 class 消费，不新增依赖、路由或数据模型。

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript 6, Tailwind CSS v4, Vitest, Prettier, ESLint。

## Global Constraints

- 保留首页标题、简介、3 篇真实 MDX 内容、分类、标签、日期和原有链接。
- 保留 `filterContent()`、搜索字段、大小写/首尾空格规则、分类叠加、结果数量、无结果状态和 `aria-live`。
- 不修改 `content/*.mdx`、`src/content/schema.ts`、`src/content/repository.ts`、`src/content/search.ts`、详情页、关于页、404 和 SEO 路由。
- 不新增外部字体、`@font-face`、图片、依赖、后端、CMS、持久化状态或新路由。
- 页面底色使用 `#fdfcfc`，辅助面使用 `#f5f3f1`，边界使用 `#ebe8e4`，正文使用 `#000000` / `#44403b` / `#777169`。
- 显示排版模拟 Waldenburg 轻字重；正文模拟 Inter；技术元信息可使用 Geist Mono fallback；字体只使用本地系统栈。
- 交互必须支持键盘焦点、`prefers-reduced-motion: reduce`，并在 `320px`、`768px`、`1280px` 下无横向溢出。
- 不提交用户已有的未跟踪 `.codex/`。

---

## 文件地图

| 文件 | 责任 | 本次动作 |
| --- | --- | --- |
| `src/app/globals.css` | 全局语义 token、基础排版、焦点和减少动效 | 修改为暖白编辑型基础 |
| `src/app/page.tsx` | 首页首屏和内容区的语义结构 | 修改首屏/内容区布局 class，不改数据调用 |
| `src/components/site-header.tsx` | 全站顶部导航 | 修改为轻量静态导航，保留链接与 `aria-current` |
| `src/components/site-footer.tsx` | 全站页脚 | 修改为同一编辑型分隔线与排版 |
| `src/components/content-discovery.tsx` | 首页搜索、分类、结果状态 | 修改控件布局与状态表现，不改过滤逻辑 |
| `src/components/content-card.tsx` | 单条内容列表项 | 修改为编辑目录式行布局，不改字段和链接 |
| `tests/design-tokens.test.ts` | 视觉 token 合约和对比度 | 先更新为新语义值，再让实现通过 |
| `tests/page-shells.test.tsx` | 页面壳和首页入口回归 | 增加编辑型 class、结果链路和移动安全断言 |
| `docs/REQ-20260811-01-home-editorial-demo.md` | 当前任务范围、验收和验证证据 | 收尾时创建并更新为 Done |
| `docs/BIZ-20260811-01-home-editorial-demo.md` | 新首页视觉决策 | 收尾时创建并标记 Approved |
| `docs/DEV-20260811-01-home-editorial-demo.md` | 实施结构和验证策略 | 收尾时创建并标记 Approved |
| `docs/PROG-20260811.md` | 当日进度与验证证据 | 收尾时追加本次闭环 |
| `docs/README.md` | 当前权威文档索引 | 收尾时增加本次 REQ/BIZ/DEV/PROG 条目 |

---

### Task 1: 将视觉 token 合约切换到编辑型基线

**Files:**

- Modify: `tests/design-tokens.test.ts`
- Modify: `src/app/globals.css`

**Interfaces:**

- Produces: `--eelex-color-*`、`--eelex-font-*`、`--eelex-text-*`、布局和圆角语义 token，供所有页面组件消费。
- Preserves: Tailwind `@theme inline` 的 `bg-canvas`、`bg-surface`、`text-ink`、`text-muted`、`border-border`、`text-accent`、分类色、`font-sans`、`font-mono` 和 `rounded-panel` 映射。

- [ ] **Step 1: 先更新 token 测试中的期望值**

将 `tests/design-tokens.test.ts` 的 `semanticTokens` 期望更新为：

```ts
const semanticTokens = {
  "--eelex-color-canvas": "#fdfcfc",
  "--eelex-color-surface": "#f5f3f1",
  "--eelex-color-ink": "#000000",
  "--eelex-color-muted": "#777169",
  "--eelex-color-border": "#ebe8e4",
  "--eelex-color-accent": "#000000",
  "--eelex-color-focus": "#0447ff",
  "--eelex-color-category-all": "#000000",
  "--eelex-color-category-article": "#2a5475",
  "--eelex-color-category-note": "#805719",
  "--eelex-color-category-tool": "#28695e",
  "--eelex-color-category-article-soft": "#e2edf6",
  "--eelex-color-category-note-soft": "#f6ead6",
  "--eelex-color-category-tool-soft": "#dfeee8",
  "--eelex-font-sans":
    '"Inter", ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", "Microsoft YaHei", "PingFang SC", "Noto Sans CJK SC", sans-serif',
  "--eelex-font-display":
    '"Waldenburg", "Inter", ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", "Microsoft YaHei", "PingFang SC", "Noto Sans CJK SC", sans-serif',
  "--eelex-font-mono":
    '"Geist Mono", ui-monospace, "Cascadia Code", "SFMono-Regular", Consolas, "Liberation Mono", monospace',
  "--eelex-text-display": "clamp(2.25rem, 5.6vw, 3rem)",
  "--eelex-text-page-title": "clamp(2rem, 5vw, 3rem)",
  "--eelex-text-section-title": "clamp(1.125rem, 1.8vw, 1.25rem)",
  "--eelex-text-body": "0.9375rem",
  "--eelex-text-small": "0.875rem",
  "--eelex-text-meta": "0.8125rem",
  "--eelex-leading-tight": "1.08",
  "--eelex-leading-body": "1.5",
  "--eelex-space-page-inline": "clamp(1.25rem, 4vw, 2rem)",
  "--eelex-space-section": "clamp(4rem, 8vw, 6rem)",
  "--eelex-space-stack": "2rem",
  "--eelex-radius-control": "9999px",
  "--eelex-radius-input": "4px",
  "--eelex-radius-panel": "20px",
  "--eelex-width-wide": "80rem",
  "--eelex-width-reading": "44rem",
  "--eelex-width-toc": "15rem",
  "--eelex-duration-fast": "120ms",
  "--eelex-duration-base": "180ms",
  "--eelex-duration-slow": "240ms",
  "--eelex-ease-standard": "cubic-bezier(0.2, 0, 0, 1)",
} as const;
```

同时在 `tailwindMappings` 中增加：

```ts
"--font-display": "var(--eelex-font-display)",
```

- [ ] **Step 2: 运行 token 测试确认 RED**

Run: `corepack pnpm vitest run tests/design-tokens.test.ts`

Expected: FAIL，失败原因是 `src/app/globals.css` 仍声明旧 token 值；不得通过放宽断言或删除对比度测试来让测试通过。

- [ ] **Step 3: 更新 `src/app/globals.css` 的 `:root` 与 `@theme inline`**

保留现有分类色，替换基础 token，并新增 display font 映射。核心声明必须等价于：

```css
:root {
  --eelex-color-canvas: #fdfcfc;
  --eelex-color-surface: #f5f3f1;
  --eelex-color-ink: #000000;
  --eelex-color-muted: #777169;
  --eelex-color-border: #ebe8e4;
  --eelex-color-accent: #000000;
  --eelex-color-focus: #0447ff;
  --eelex-color-category-all: #000000;
  --eelex-color-category-article: #2a5475;
  --eelex-color-category-note: #805719;
  --eelex-color-category-tool: #28695e;
  --eelex-color-category-article-soft: #e2edf6;
  --eelex-color-category-note-soft: #f6ead6;
  --eelex-color-category-tool-soft: #dfeee8;
  --eelex-font-display:
    "Waldenburg", "Inter", ui-sans-serif, system-ui, -apple-system,
    BlinkMacSystemFont, "Segoe UI", "Microsoft YaHei", "PingFang SC",
    "Noto Sans CJK SC", sans-serif;
  --eelex-font-sans:
    "Inter", ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont,
    "Segoe UI", "Microsoft YaHei", "PingFang SC", "Noto Sans CJK SC",
    sans-serif;
  --eelex-font-mono:
    "Geist Mono", ui-monospace, "Cascadia Code", "SFMono-Regular", Consolas,
    "Liberation Mono", monospace;
  --eelex-text-display: clamp(2.25rem, 5.6vw, 3rem);
  --eelex-text-page-title: clamp(2rem, 5vw, 3rem);
  --eelex-text-section-title: clamp(1.125rem, 1.8vw, 1.25rem);
  --eelex-text-body: 0.9375rem;
  --eelex-text-small: 0.875rem;
  --eelex-text-meta: 0.8125rem;
  --eelex-leading-tight: 1.08;
  --eelex-leading-body: 1.5;
  --eelex-space-page-inline: clamp(1.25rem, 4vw, 2rem);
  --eelex-space-section: clamp(4rem, 8vw, 6rem);
  --eelex-space-stack: 2rem;
  --eelex-radius-control: 9999px;
  --eelex-radius-input: 4px;
  --eelex-radius-panel: 20px;
  --eelex-width-wide: 80rem;
  --eelex-width-reading: 44rem;
  --eelex-width-toc: 15rem;
  --eelex-shadow-panel: 0 0 0 1px rgb(0 0 0 / 0.04);
  --eelex-duration-fast: 120ms;
  --eelex-duration-base: 180ms;
  --eelex-duration-slow: 240ms;
  --eelex-ease-standard: cubic-bezier(0.2, 0, 0, 1);
}
```

Add the matching `--font-display: var(--eelex-font-display);` to `@theme inline`; leave the existing Tailwind color and radius aliases intact.

- [ ] **Step 4: Replace global body chrome with flat editorial foundation**

Update the existing `html` and `body` rules so the page uses the eggshell canvas without the old purple/blue radial gradients:

```css
html {
  background: var(--eelex-color-canvas);
  scroll-behavior: smooth;
}

body {
  min-width: 20rem;
  background: var(--eelex-color-canvas);
  color: var(--eelex-color-ink);
  font-family: var(--eelex-font-sans);
  font-size: var(--eelex-text-body);
  line-height: var(--eelex-leading-body);
}
```

Add focused reusable classes below the global interaction rules:

```css
.eelex-display {
  font-family: var(--eelex-font-display);
  font-weight: 300;
  letter-spacing: -0.02em;
}

.eelex-editorial-rule {
  border-color: var(--eelex-color-border);
}

.eelex-content-row {
  border-top: 1px solid var(--eelex-color-border);
  transition:
    background-color var(--eelex-duration-fast) var(--eelex-ease-standard),
    border-color var(--eelex-duration-fast) var(--eelex-ease-standard);
}

.eelex-content-row:last-child {
  border-bottom: 1px solid var(--eelex-color-border);
}

.eelex-content-row:hover {
  background: var(--eelex-color-surface);
}

@media (prefers-reduced-motion: reduce) {
  .eelex-content-row {
    transition: none;
  }
}
```

- [ ] **Step 5: Run token tests and formatting**

Run: `corepack pnpm vitest run tests/design-tokens.test.ts`

Expected: PASS for token values, Tailwind mappings, reduced motion and contrast ratios.

Run: `corepack pnpm prettier --check src/app/globals.css tests/design-tokens.test.ts`

Expected: PASS.

- [ ] **Step 6: Commit the token checkpoint**

```bash
git add src/app/globals.css tests/design-tokens.test.ts
git commit -m "feat: establish editorial home tokens"
```

---

### Task 2: Rebuild the shared header and footer as a quiet top-level frame

**Files:**

- Modify: `src/components/site-header.tsx`
- Modify: `src/components/site-footer.tsx`
- Test: `tests/app-shell.test.tsx`

**Interfaces:**

- Consumes: existing `usePathname()`, `navigation`, `publicProfile.contacts` and `#main-content` target.
- Produces: unchanged navigation URLs and accessible current-page state with new editorial classes.

- [ ] **Step 1: Add shell assertions before the implementation**

In `tests/app-shell.test.tsx`, keep the existing link assertions and add:

```ts
expect(markup).toContain("eelex-site-header");
expect(markup).toContain("eelex-site-nav");
expect(markup).toContain("eelex-site-footer");
expect(markup).toContain('href="#main-content"');
```

The test must continue to assert that `/lab` is absent and both `/` and `/about` links exist.

- [ ] **Step 2: Run the shell test to confirm RED**

Run: `corepack pnpm vitest run tests/app-shell.test.tsx`

Expected: FAIL because the new semantic classes are not present yet.

- [ ] **Step 3: Update `SiteHeader` without changing navigation behavior**

Keep the `navigation` array, `usePathname()`, `aria-current`, and skip link. Replace the outer classes with a static, minimal frame:

```tsx
<header className="eelex-site-header px-[var(--eelex-space-page-inline)] pt-6 sm:pt-8">
  <a
    className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:rounded-control focus:bg-surface focus:px-4 focus:py-3 focus:text-ink focus:outline focus:outline-2 focus:outline-focus"
    href="#main-content"
  >
    跳到主要内容
  </a>
  <div className="eelex-site-nav mx-auto flex max-w-[var(--eelex-width-wide)] items-center justify-between gap-6 border-b border-border pb-5">
    <Link className="text-sm font-medium tracking-[-0.03em] text-ink" href="/">
      Eelex Code Hub
    </Link>
    <nav aria-label="主导航">
      <ul className="flex items-center gap-5">
        {navigation.map((item) => (
          <li key={item.href}>
            <Link
              aria-current={pathname === item.href ? "page" : undefined}
              className={pathname === item.href
                ? "border-b border-ink pb-1 text-sm font-medium text-ink"
                : "pb-1 text-sm text-muted hover:text-ink focus-visible:outline-2 focus-visible:outline-focus"}
              href={item.href}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  </div>
</header>
```

Retain the existing skip-link class string rather than introducing a new focus implementation.

- [ ] **Step 4: Update `SiteFooter` as a matching editorial rule**

Keep the contact mapping and external-link attributes. Add `eelex-site-footer`, use `border-t border-border`, and let the content wrap at mobile widths:

```tsx
<footer className="eelex-site-footer px-[var(--eelex-space-page-inline)] pt-10 pb-12">
  <div className="mx-auto flex max-w-[var(--eelex-width-wide)] flex-col gap-4 border-t border-border pt-5 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
    <span>Eelex Code Hub</span>
    <div className="flex flex-wrap gap-x-4 gap-y-1">
      {publicProfile.contacts.map((contact) => (
        <a
          className="hover:text-ink"
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
```

- [ ] **Step 5: Run shell tests and formatting**

Run: `corepack pnpm vitest run tests/app-shell.test.tsx`

Expected: PASS with `/lab` absent and all existing shell links intact.

Run: `corepack pnpm prettier --check src/components/site-header.tsx src/components/site-footer.tsx tests/app-shell.test.tsx`

Expected: PASS.

- [ ] **Step 6: Commit the shell checkpoint**

```bash
git add src/components/site-header.tsx src/components/site-footer.tsx tests/app-shell.test.tsx
git commit -m "feat: restyle editorial site frame"
```

---

### Task 3: Make the homepage intro and discovery section editorial

**Files:**

- Modify: `src/app/page.tsx`
- Modify: `src/components/content-discovery.tsx`
- Modify: `tests/page-shells.test.tsx`

**Interfaces:**

- Consumes: `getAllContent()`, `publicProfile.introduction`, `ContentDiscovery` props and existing category/search behavior.
- Produces: same rendered content and filter interaction with a new semantic layout.

- [ ] **Step 1: Extend homepage assertions before the implementation**

In the existing homepage test, keep all current expectations and add:

```ts
expect(markup).toContain("eelex-home-intro");
expect(markup).toContain("eelex-content-section");
expect(markup).toContain("eelex-content-discovery");
expect(markup).toContain("搜索标题、摘要、分类或标签");
expect(markup).toContain("3 篇内容");
```

Add a static source assertion that the `Home` component still calls `getAllContent()` and passes `items` to `<ContentDiscovery items={items} />`.

- [ ] **Step 2: Run the homepage shell test to confirm RED**

Run: `corepack pnpm vitest run tests/page-shells.test.tsx`

Expected: FAIL only on the new semantic class assertions; existing content and link assertions must remain green.

- [ ] **Step 3: Update `Home` with the approved structure**

Keep the existing metadata, `getAllContent()`, title, introduction and `ContentDiscovery`. Replace only layout classes/containers with:

```tsx
<main id="main-content" tabIndex={-1}>
  <section className="eelex-home-intro mx-auto max-w-[var(--eelex-width-wide)] px-[var(--eelex-space-page-inline)] pt-[clamp(4.5rem,10vw,9rem)] pb-[clamp(4rem,8vw,7rem)]">
    <p className="mb-5 font-mono text-[length:var(--eelex-text-meta)] uppercase tracking-[0.12em] text-muted">
      EELEX / PERSONAL JOURNAL
    </p>
    <h1 className="eelex-display max-w-4xl text-[length:var(--eelex-text-display)] leading-[var(--eelex-leading-tight)] text-ink">
      欢迎来到Eelex 的个人博客
    </h1>
    <p className="mt-7 max-w-xl text-lg leading-[1.6] text-muted">
      {publicProfile.introduction}
    </p>
  </section>

  <section className="eelex-content-section mx-auto max-w-[var(--eelex-width-wide)] px-[var(--eelex-space-page-inline)] pb-[var(--eelex-space-section)]" id="content">
    <div className="mb-7 flex flex-col gap-3 border-t border-border pt-5 sm:flex-row sm:items-baseline sm:justify-between">
      <h2 className="eelex-display text-[length:var(--eelex-text-section-title)] leading-tight text-ink">
        我的记录与思考
      </h2>
      <p className="text-sm text-muted">
        内容、分类与搜索保持原有逻辑，只是换成更有节奏的呈现方式。
      </p>
    </div>
    <ContentDiscovery items={items} />
  </section>
</main>
```

The `EELEX / PERSONAL JOURNAL` eyebrow is a visual label only; it must not change existing content data or route behavior.

- [ ] **Step 4: Update `ContentDiscovery` layout without touching filter state**

Keep these declarations unchanged:

```tsx
const [query, setQuery] = useState("");
const [category, setCategory] = useState<(typeof categories)[number]>("全部");
const results = useMemo(
  () => filterContent(items, { category, query }),
  [category, items, query],
);
```

Replace only the wrapper and controls with an unboxed editorial layout:

```tsx
<div className="eelex-content-discovery">
  <div className="grid gap-5 border-b border-border pb-6 sm:grid-cols-[1fr_minmax(16rem,22rem)] sm:items-end">
    <div aria-label="内容分类" className="flex flex-wrap gap-x-5 gap-y-3">
      {categories.map((item) => {
        const selected = category === item;

        return (
          <button
            aria-pressed={selected}
            className={`border-b pb-1 text-sm transition-colors ${selected ? `${categoryClasses[item]} font-medium` : "border-transparent text-muted hover:text-ink"}`}
            key={item}
            onClick={() => setCategory(item)}
            type="button"
          >
            {item}
          </button>
        );
      })}
    </div>
    <label className="sr-only" htmlFor="content-search">
      搜索内容
    </label>
    <input
      className="w-full rounded-[var(--eelex-radius-input)] border border-border bg-transparent px-3 py-2.5 text-sm text-ink placeholder:text-ash outline-focus"
      id="content-search"
      onChange={(event) => setQuery(event.target.value)}
      placeholder="搜索标题、摘要、分类或标签"
      type="search"
      value={query}
    />
  </div>
  <p aria-live="polite" className="mt-4 font-mono text-[length:var(--eelex-text-meta)] text-muted">
    {results.length} 篇内容
  </p>
  {results.length === 0 ? (
    <p className="mt-8 border-y border-dashed border-border py-8 text-sm text-muted">
      没有找到匹配的内容，试试更短的关键词或切换分类。
    </p>
  ) : (
    <div className="mt-6">
      {results.map((item) => (
        <ContentCard item={item} key={item.slug} />
      ))}
    </div>
  )}
</div>
```

Replace the old category class map with selected-state-only underline/text classes so the controls stay flat while retaining category affordance:

```tsx
const categoryClasses = {
  全部: "border-ink text-ink",
  文章: "border-category-article text-category-article",
  学习笔记: "border-category-note text-category-note",
  工具分享: "border-category-tool text-category-tool",
} as const;
```

Remove only the old panel background/border classes from the wrapper; do not remove `aria-pressed`, the label, `aria-live`, or the empty state.

- [ ] **Step 5: Run homepage tests and format**

Run: `corepack pnpm vitest run tests/page-shells.test.tsx tests/content-search.test.ts`

Expected: PASS for the homepage shell, search matching, category filtering and existing content links.

Run: `corepack pnpm prettier --check src/app/page.tsx src/components/content-discovery.tsx tests/page-shells.test.tsx`

Expected: PASS.

- [ ] **Step 6: Commit the homepage shell checkpoint**

```bash
git add src/app/page.tsx src/components/content-discovery.tsx tests/page-shells.test.tsx
git commit -m "feat: introduce editorial homepage layout"
```

---

### Task 4: Convert content cards into an editorial directory list

**Files:**

- Modify: `src/components/content-card.tsx`
- Modify: `tests/page-shells.test.tsx`

**Interfaces:**

- Consumes: unchanged `ContentSummary` fields `slug`, `title`, `excerpt`, `publishedAt`, `category`, and `tags`.
- Produces: an accessible `article` whose title still links to `/content/${item.slug}` and whose metadata remains visible.

- [ ] **Step 1: Add content-row assertions**

In the existing `ContentCard` render test, add:

```ts
expect(card).toContain("eelex-content-row");
expect(card).toContain("category-dot");
expect(card).toContain("category-article");
expect(card).toContain('href="/content/');
```

Keep the existing assertions for the category dot, category token and article link. In the heading hierarchy test, update the card source assertion from `text-lg` to `text-xl` while retaining the `font-medium` requirement:

```ts
expect(cardSource).toMatch(/text-xl[^\n]*font-medium/);
```

- [ ] **Step 2: Run the focused test to confirm RED**

Run: `corepack pnpm vitest run tests/page-shells.test.tsx`

Expected: FAIL only on the missing `eelex-content-row` class.

- [ ] **Step 3: Replace the card wrapper with the editorial row**

Implement this structure while keeping all field expressions unchanged:

```tsx
<article className="eelex-content-row grid gap-4 py-6 sm:grid-cols-[minmax(0,1fr)_10rem] sm:gap-8 sm:py-7">
  <div className="min-w-0">
    <div className="flex items-center gap-3 text-[length:var(--eelex-text-meta)] text-muted">
      <span aria-hidden="true" className={`category-dot size-2 rounded-full ${categoryDotStyles[item.category]}`} />
      <span>{item.category}</span>
    </div>
    <h3 className="mt-3 text-xl leading-tight font-medium tracking-[-0.03em] text-ink sm:text-2xl">
      <Link className="hover:text-muted" href={`/content/${item.slug}`}>
        {item.title}
      </Link>
    </h3>
    <p className="mt-3 max-w-[var(--eelex-width-reading)] text-sm leading-7 text-muted">
      {item.excerpt}
    </p>
    <ul className="mt-4 flex flex-wrap gap-x-3 gap-y-2" aria-label="标签">
      {item.tags.map((tag) => (
        <li className="font-mono text-[length:var(--eelex-text-meta)] text-ash" key={tag}>
          #{tag}
        </li>
      ))}
    </ul>
  </div>
  <p className="font-mono text-[length:var(--eelex-text-meta)] leading-relaxed text-muted sm:pt-1 sm:text-right">
    <time dateTime={item.publishedAt}>{item.publishedAt}</time>
  </p>
</article>
```

The category dot classes must retain the existing accessible colors and only use a small visual area. The `h3` element is a structural improvement from the previous nested `h2`; it does not change the visible title or link target.

- [ ] **Step 4: Run content and format checks**

Run: `corepack pnpm vitest run tests/page-shells.test.tsx tests/content-repository.test.ts tests/content-search.test.ts`

Expected: PASS; all 3 content summaries still render with their original metadata and links.

Run: `corepack pnpm prettier --check src/components/content-card.tsx tests/page-shells.test.tsx`

Expected: PASS.

- [ ] **Step 5: Commit the content-list checkpoint**

```bash
git add src/components/content-card.tsx tests/page-shells.test.tsx
git commit -m "feat: render content as editorial directory"
```

---

### Task 5: Run the full quality gate and inspect the demo at target viewports

**Files:**

- Modify: any files required only to fix formatter, type, lint or test failures from Tasks 1–4.
- Do not modify: `content/*.mdx`, content model/search implementation, user `.codex/`.

**Interfaces:**

- Consumes: completed token, shell, homepage and content-list checkpoints.
- Produces: a locally runnable homepage demo with evidence for behavior, build and responsive safety.

- [ ] **Step 1: Run the complete automated quality gate**

Run: `corepack pnpm check`

Expected: Prettier check, Next type generation, TypeScript, ESLint, all Vitest tests and `next build` pass. Existing `src/content/repository.ts` unused-parameter warnings may remain as warnings only; no new lint error is acceptable.

- [ ] **Step 2: Check repository diff hygiene**

Run: `git diff --check`

Expected: no output and exit code 0.

Run: `git status --short`

Expected: only the intended source/test/documentation files are modified or untracked; `.codex/` must not be staged.

- [ ] **Step 3: Start the local demo server**

Run: `corepack pnpm dev`

Expected: Next development server reports a local URL such as `http://localhost:3000` and the homepage renders without a runtime exception.

- [ ] **Step 4: Inspect the homepage at the required viewport matrix**

Check these states in the local preview:

| Viewport | Required evidence |
| --- | --- |
| `320px` wide | no horizontal scrollbar; nav, title, search and rows wrap; all controls remain reachable |
| `768px` wide | intro and content section have intentional breathing room; controls remain readable |
| `1280px` wide | wide editorial spacing; rows use the two-column metadata layout; no card overflow |

Also verify:

- Click each category and combine it with a search query; result count and rows match the existing behavior.
- Submit/clear the search input; the empty state appears for a non-match and recovers for a matching query.
- Tab through skip link, navigation, category buttons, search and content links; visible focus remains present.
- Enable `prefers-reduced-motion`; no content-row transition or smooth scroll is required for correctness.
- Open one existing content link and confirm the original `/content/[slug]` route remains reachable.

- [ ] **Step 5: Commit any final fixes and record the final source diff**

```bash
git add src/app/globals.css src/app/page.tsx src/components/site-header.tsx src/components/site-footer.tsx src/components/content-discovery.tsx src/components/content-card.tsx tests/design-tokens.test.ts tests/page-shells.test.tsx
git commit -m "test: verify editorial homepage demo"
```

Do not stage `.codex/`, build output, logs or dependency directories.

---

### Task 6: Complete the documentation closeout gate

**Files:**

- Create: `docs/REQ-20260811-01-home-editorial-demo.md`
- Create: `docs/BIZ-20260811-01-home-editorial-demo.md`
- Create: `docs/DEV-20260811-01-home-editorial-demo.md`
- Create or append: `docs/PROG-20260811.md`
- Modify: `docs/README.md`

**Interfaces:**

- Consumes: the approved design spec, final diff, `corepack pnpm check` output, `git diff --check` output and local viewport evidence.
- Produces: synchronized authoritative records proving scope, decision, implementation and verification.

- [ ] **Step 1: Create the task REQ with concrete acceptance evidence**

Record `REQ-20260811-01` as `Done`, linked to `PRD.md`, the new BIZ and DEV, with scope limited to the homepage visual demo. Include the final commit(s), `corepack pnpm check`, `git diff --check`, viewport matrix and explicit statement that contents, routes, search and category behavior were unchanged.

- [ ] **Step 2: Create the visual BIZ decision**

Record `BIZ-20260811-01` as `Approved`, linked to the REQ and the superseded parts of `BIZ-20260725-03`. State that the user-provided ElevenLabs-style reference is translated into an Eelex editorial directory, not copied as a product marketing page.

- [ ] **Step 3: Create the implementation DEV record**

Record `DEV-20260811-01` as `Approved`, linked to the REQ/BIZ. Document the unchanged data flow, modified files, no-dependency constraint, token source and validation strategy.

- [ ] **Step 4: Append the dated progress record**

In `docs/PROG-20260811.md`, record completed work, automated checks, manual viewport checks, known lint warnings if still present, no deployment/push, and the next step of extending the visual language to other pages only after a separate user decision.

- [ ] **Step 5: Update `docs/README.md` current index**

Add the new REQ, BIZ and DEV entries to the current authoritative index and add the new `PROG-20260811.md` entry. Preserve all prior records and mark any directly superseded visual statement through explicit linkage rather than deletion.

- [ ] **Step 6: Run the final documentation and repository checks**

Run: `corepack pnpm check`

Expected: PASS after documentation changes.

Run: `git diff --check`

Expected: no output.

Run: `git status --short`

Expected: no unintended files staged; `.codex/` remains untouched.

- [ ] **Step 7: Commit documentation closeout**

```bash
git add docs/REQ-20260811-01-home-editorial-demo.md docs/BIZ-20260811-01-home-editorial-demo.md docs/DEV-20260811-01-home-editorial-demo.md docs/PROG-20260811.md docs/README.md
git commit -m "docs: close homepage editorial demo"
```
