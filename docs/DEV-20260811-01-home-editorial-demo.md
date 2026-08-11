# DEV-20260811-01：首页编辑型视觉 Demo 技术方案

## 文档信息

- ID：DEV-20260811-01
- 状态：Approved
- 创建日期：2026-08-11
- 更新日期：2026-08-11
- 关联需求：[`REQ-20260811-01-home-editorial-demo.md`](REQ-20260811-01-home-editorial-demo.md)
- 关联决策：[`BIZ-20260811-01-home-editorial-demo.md`](BIZ-20260811-01-home-editorial-demo.md)

## 方案

继续使用 Next.js App Router、React、Tailwind CSS v4 和本地系统字体栈，不新增依赖。`src/app/globals.css` 继续作为语义 token 的唯一来源，组件通过 `@theme inline` 映射和页面级 class 消费颜色、字体、圆角、间距与动效值。

首页仍由 Server Component 调用 `getAllContent()`，并将 `ContentSummary[]` 传入 `ContentDiscovery`。`ContentDiscovery` 仍在 Client Component 内维护 `query` 和 `category`，并调用 `filterContent()`；本次只替换 wrapper、控件和 `ContentCard` 的表现层 class，不改状态或搜索函数。

共享 `SiteHeader` 保留 `usePathname()`、导航数组、`aria-current` 和 skip link；`SiteFooter` 保留 `publicProfile.contacts` 和外链属性。内容卡片继续使用 `ContentSummary` 的同一字段和 `/content/[slug]` 目标。

## 受影响文件

- `src/app/globals.css`
- `src/app/page.tsx`
- `src/components/site-header.tsx`
- `src/components/site-footer.tsx`
- `src/components/content-discovery.tsx`
- `src/components/content-card.tsx`
- `tests/design-tokens.test.ts`
- `tests/page-shells.test.tsx`
- `tests/app-shell.test.tsx`

## 验证策略

- 用 token 测试验证暖白、字体、圆角、Tailwind 映射、对比度和减少动效保护。
- 用页面壳测试验证首页结构、真实内容入口、导航、页脚、实验室移除和新编辑型 class。
- 用内容 repository/search 测试验证内容和搜索分类行为没有变化。
- 运行 `corepack pnpm check`、`git diff --check` 和本地 HTTP smoke check。
- 由于当前环境没有浏览器自动化运行时，视口级视觉验收由用户打开本地预览完成。

## 风险与缓解

- 新布局可能造成中文标题或移动端控件溢出：移除首页标题的 `whitespace-nowrap`，使用流式 grid、`min-w-0` 和响应式间距，并做源码检查。
- 新视觉可能误改内容：保留 `getAllContent()`、`ContentDiscovery`、`filterContent()` 和所有既有搜索/内容测试。
- 外部字体不可用：只将 `Waldenburg`、`Inter`、`Geist Mono` 放在本地 fallback 栈，不添加 `@font-face` 或 URL。
