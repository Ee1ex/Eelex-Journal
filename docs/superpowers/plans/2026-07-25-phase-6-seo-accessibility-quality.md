# Phase 6 SEO、可访问性与质量验证 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use `executing-plans` to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking. 用户明确禁止本任务使用子代理。

**Goal:** 为现有静态 MDX 博客建立可验证的页面 metadata、sitemap、robots、图片发布前校验、异常路径回归和可访问性质量闭环。

**Architecture:** `src/site/seo.ts` 作为唯一站点 SEO 配置，内容详情、sitemap 与 robots 都消费它和既有内容仓库。正文图片在服务端内容读取阶段验证，避免引入客户端降级状态；浏览器体验继续以现有页面语义和最小修复为主。

**Tech Stack:** Next.js 16 App Router、React 19、TypeScript、MDX、Zod、Vitest、Tailwind CSS v4。

**Execution status (2026-07-25):** Task 1 至 Task 4 均已完成。最终在隔离 worktree 执行 `corepack pnpm check` 与 `git diff --check` 通过，12 个测试文件、33 项测试、类型检查与生产构建通过；用户已完成四个视口、物理键盘、刷新和站内跳转检查，并确认字体与既有线上页面一致。本计划已 Completed；未提交、推送、部署或运行远程 CI。

## Global Constraints

- 只实施 `REQ-20260725-01` 与 `DEV-20260725-01` 的获批范围；不修改搜索、分类、URL 状态、资料、实验室功能或内容详情目录。
- 正式 `siteUrl` 必须由用户在手动创建或上线 Netlify 时提供；不得使用猜测地址、本地地址或占位域名。
- 只允许 `/content/*` 本地 MDX 图片，且必须有非空替代文本；不新增远程图片或客户端图片错误 UI。
- 不新增依赖、锁文件、Netlify 配置、远程 CI、推送、PR 或部署。
- 实施前先核对并保护现有工作区的暂存、未暂存和未跟踪改动；不得自动暂存、覆盖或混入后续提交。
- 人工验收固定覆盖 `320px`、`375px`、`768px` 和 `1280px`，以及刷新、站内跳转和键盘路径。
- 本计划不执行 Git 提交；任何后续提交均须由用户单独授权，且只能包含本期文件。

---

## 文件职责

| 文件 | 职责 |
| --- | --- |
| `src/site/seo.ts` | 站点名、默认简介、标题模板、经用户确认的正式基址和绝对 URL 辅助函数。 |
| `src/app/layout.tsx` | 消费默认 metadata，不再内联重复站点文案。 |
| `src/app/*/page.tsx` | 为公开静态页面提供页面级 metadata；详情页提供动态 metadata，404 标为不索引。 |
| `src/app/sitemap.ts` | 从 `getAllContent()` 生成唯一公开路由集合。 |
| `src/app/robots.ts` | 从同一基址生成允许抓取规则和 sitemap 入口。 |
| `src/content/repository.ts` | 在读取 MDX 时验证正文本地图片引用。 |
| `tests/seo.test.ts` | SEO 元数据、sitemap、robots 和 URL 契约。 |
| `tests/content-assets.test.ts` | 正文图片的路径、存在性、替代文本和错误消息契约。 |
| `tests/page-shells.test.tsx` | 只在语义或可访问性标记发生实际变化时更新页面契约。 |

## Task 1：建立不依赖正式 URL 的 SEO 标题与页面 metadata 契约

**Files:**

- Create: `src/site/seo.ts`
- Modify: `src/app/layout.tsx`
- Modify: `src/app/page.tsx`
- Modify: `src/app/about/page.tsx`
- Modify: `src/app/lab/page.tsx`
- Modify: `src/app/content/[slug]/page.tsx`
- Modify: `src/app/not-found.tsx`
- Create: `tests/seo.test.ts`

**Interfaces:**

- Produces `siteName`、`defaultDescription` 与 `createPageTitle(title: string)`。
- Content route consumes `getContentBySlug(slug)` and produces `generateMetadata` using `title` and `excerpt`.

- [x] **Step 1: 写入失败的 metadata 契约测试。**

```ts
expect(createPageTitle("关于我")).toBe("关于我 | Eelex Code Hub");
expect(createPageTitle(siteName)).toBe("Eelex Code Hub");
expect(contentMetadata.title).toBe("让界面更易阅读的三个小决定 | Eelex Code Hub");
expect(contentMetadata.description).toBe("从阅读层级、留白和结构三个角度，整理让界面更容易被理解的实践。");
expect(notFoundMetadata.robots).toEqual({ index: false, follow: false });
```

- [x] **Step 2: 运行定向测试确认 RED。**

Run: `corepack pnpm test -- tests/seo.test.ts`

Expected: FAIL，因为 SEO 配置模块和页面级 metadata 尚不存在。

- [x] **Step 3: 写入最小 SEO 配置和页面 metadata。**

```ts
export const siteName = "Eelex Code Hub";
export const defaultDescription = "一个关于代码、设计与学习的个人空间。";

export function createPageTitle(title: string) {
  return title === siteName ? siteName : `${title} | ${siteName}`;
}
```

内容详情的 `generateMetadata` 必须先调用 `getContentBySlug(slug)`；找不到内容时调用 `notFound()`，找到后只使用 `item.title` 和 `item.excerpt`。404 metadata 必须设置 `robots: { index: false, follow: false }`。

- [x] **Step 4: 运行定向测试确认 GREEN。**

Run: `corepack pnpm test -- tests/seo.test.ts`

Expected: PASS。

- [x] **Step 5: 不提交，核对本任务差异。**

Run: `git diff -- src/site/seo.ts src/app/layout.tsx src/app/page.tsx src/app/about/page.tsx src/app/lab/page.tsx src/app/content/[slug]/page.tsx src/app/not-found.tsx tests/seo.test.ts`

Expected: 仅包含 metadata 与对应测试，无内容模型或实验室状态改动。

## Task 2：在用户提供正式 Netlify URL 后生成 sitemap 与 robots

**Files:**

- Modify: `src/site/seo.ts`
- Create: `src/app/sitemap.ts`
- Create: `src/app/robots.ts`
- Modify: `tests/seo.test.ts`

**Interfaces:**

- Consumes user-provided absolute production URL and `getAllContent()`.
- Produces `siteUrl`、`toAbsoluteUrl(pathname)`、App Router `sitemap()` and `robots()`.

- [x] **Step 1: 暂停并向用户索取正式 URL。**

只有在用户已手动创建或明确确认 Netlify 地址后继续。不得从 Git 远程名、项目名、浏览器本地地址或猜测的 `*.netlify.app` 名称推导 URL。

- [x] **Step 2: 写入失败的 URL、sitemap 与 robots 契约测试。**

```ts
expect(toAbsoluteUrl("/about").pathname).toBe("/about");
expect(new URL(toAbsoluteUrl("/about")).origin).toBe(siteUrl.origin);
expect(entries.map((entry) => new URL(entry.url).pathname)).toEqual([
  "/",
  "/about",
  "/lab",
  "/content/designing-readable-interfaces",
  "/content/weekly-learning-notes-01",
  "/content/spacing-scale-checklist",
]);
expect(new URL(robots().sitemap as string).pathname).toBe("/sitemap.xml");
expect(new URL(robots().sitemap as string).origin).toBe(siteUrl.origin);
```

收到用户提供的正式 HTTPS 基址后，在测试中增加该地址的精确断言，并将同一地址写入唯一配置源；不得保留未确认地址或替代值。

- [x] **Step 3: 运行定向测试确认 RED。**

Run: `corepack pnpm test -- tests/seo.test.ts`

Expected: FAIL，因为 `siteUrl`、sitemap 和 robots 尚未实现。

- [x] **Step 4: 写入唯一基址和路由枚举实现。**

在 `src/site/seo.ts` 中把用户确认的正式 HTTPS 基址写为唯一的 `siteUrl` 常量，并导出 `toAbsoluteUrl(pathname: string): URL`，其实现只能使用 `new URL(pathname, siteUrl)`。不得在任一页面、sitemap 或 robots 文件重复该 URL 字面量。

`sitemap()` 固定返回 `/`、`/about`、`/lab`，再按 `getAllContent()` 返回顺序追加内容详情 URL；`lastModified` 只使用内容项的 `publishedAt`。`robots()` 允许 `/`，并使用 `toAbsoluteUrl("/sitemap.xml").href`。

- [x] **Step 5: 运行定向测试确认 GREEN。**

Run: `corepack pnpm test -- tests/seo.test.ts`

Expected: PASS，所有 URL 均使用用户提供的正式 HTTPS 基址。

## Task 3：校验 MDX 正文图片并覆盖空内容与无效路径

**Files:**

- Modify: `src/content/repository.ts`
- Create: `tests/content-assets.test.ts`
- Modify: `tests/content-repository.test.ts`

**Interfaces:**

- Produces `validateContentImages(source: string, filePath: string): void` 或等价的私有读取期校验。
- Accepts only Markdown image references with non-empty alt and `/content/` absolute source whose target exists in `public/content`.

- [x] **Step 1: 写入失败的资源和异常路径测试。**

```ts
expect(() => loadContentFromDirectory(brokenDirectory)).toThrow(
  /broken\.mdx.*missing\.svg/,
);
expect(() => loadContentFromDirectory(emptyAltDirectory)).toThrow(/替代文本/);
expect(() => loadContentFromDirectory(remoteImageDirectory)).toThrow(/\/content\//);
expect(loadContentFromDirectory(emptyDirectory).items).toEqual([]);
```

每个临时目录由 `mkdtempSync` 创建并在 `finally` 中通过 `rmSync(..., { force: true, recursive: true })` 清理；MDX fixture 使用现有 frontmatter helper，合法图片固定引用仓库已有的 `/content/reading-flow.svg`。

- [x] **Step 2: 运行定向测试确认 RED。**

Run: `corepack pnpm test -- tests/content-assets.test.ts tests/content-repository.test.ts`

Expected: FAIL，因为正文图片尚未校验。

- [x] **Step 3: 在内容读取边界增加最小校验。**

使用 Markdown 图片正则提取 `![alt](src)`。对每个匹配项：拒绝空白 alt、拒绝不以 `/content/` 开头的 `src`，并将 URL 路径解析到 `public/content` 后用同步文件存在性检查确认资源存在。错误必须包括 MDX 文件名与具体原因。

- [x] **Step 4: 运行定向测试确认 GREEN。**

Run: `corepack pnpm test -- tests/content-assets.test.ts tests/content-repository.test.ts`

Expected: PASS；现有 `reading-flow.svg` 通过，空内容集合仍返回空数组。

- [x] **Step 5: 覆盖无效地址和 404 语义。**

在 `tests/seo.test.ts` 或 `tests/page-shells.test.tsx` 验证无效 slug 触发 `notFound()`、404 页面保留主内容地标与返回内容入口，以及其 metadata 不进入索引。

## Task 4：最小可访问性修复与完整验证收尾

**Files:**

- Modify: 仅审查中实际违反 REQ 的 `src/app/*`、`src/components/*` 或 `src/app/globals.css`
- Modify: `tests/page-shells.test.tsx`
- Modify: Phase 6 REQ、DEV、PLAN、PRD、PROG 和 `docs/README.md`

**Interfaces:**

- Consumes现有 skip link、`main#main-content`、`aria-current`、分类按钮、目录与原生 radio。
- Produces可复核的自动测试、浏览器人工证据和文档收尾记录。

- [x] **Step 1: 先添加针对实际发现问题的失败测试。**

不得预防性重写布局。若检查发现标题跳级、不可见焦点、缺少名称或键盘不可达，测试必须精确断言该元素的语义、属性或类名；没有问题则不改页面源码。

- [x] **Step 2: 运行受影响的定向测试确认 RED，再进行最小修复。**

Run: `corepack pnpm test -- tests/page-shells.test.tsx tests/seo.test.ts`

Expected: 修复前 FAIL，修复后 PASS；若没有源码问题，仅运行 PASS 回归并记录“未发现需要修复的项”。

- [x] **Step 3: 运行完整自动质量门禁。**

Run: `corepack pnpm format:check; corepack pnpm typecheck; corepack pnpm lint; corepack pnpm test; corepack pnpm build; corepack pnpm check; git diff --check`

Expected: 所有命令成功；既有 `src/content/repository.ts` warning 单独记录，不新增 warning 或 error。

- [x] **Step 4: 完成人工浏览器检查。**

在 `320px`、`375px`、`768px`、`1280px` 检查首页、一个内容详情、关于页、实验室、无效 slug 与任意未知地址。验证直接刷新、站内跳转、无横向滚动、skip link、导航、搜索/分类按钮、目录、外链、radio 方向键、Space/Enter 与重置按钮，并记录浏览器控制台结果。

- [x] **Step 5: 完成文档收尾，但不提交。**

将 REQ 更新为 `Done`，在 DEV 追加实现与验证结果，在 PRD 和文档索引更新当前需求，在当日 PROG 追加 DoD 逐项结果、未执行检查、遗留风险和 Phase 7 交接。任何提交、推送或部署均等待用户另行授权。

## 计划自检

- 覆盖性：metadata、正式 URL、sitemap、robots、图片、404、空内容、无效地址、刷新、键盘、四个视口、自动门禁、人工检查和文档收尾均有独立任务。
- 一致性：SEO 只读取 `src/content` 现有内容模型；正式 URL 只有 `src/site/seo.ts` 一个来源；实验室仍不被核心阅读或 SEO 逻辑依赖。
- 范围：未加入 Open Graph 图片、RSS、统计、部署、远程 CI、外部测试工具或内容功能变更。
