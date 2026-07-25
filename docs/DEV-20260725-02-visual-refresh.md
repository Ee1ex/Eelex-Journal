# DEV-20260725-02：阅读画廊视觉刷新技术方案

## 文档信息

- ID：DEV-20260725-02
- 状态：Approved
- 创建日期：2026-07-25
- 更新日期：2026-07-25
- 关联需求：[`REQ-20260725-02-visual-refresh.md`](REQ-20260725-02-visual-refresh.md)
- 关联决策：[`BIZ-20260725-03-visual-refresh.md`](BIZ-20260725-03-visual-refresh.md)

## 方案

继续使用 Next.js App Router、React、Tailwind CSS v4 和现有系统字体栈，不新增依赖。`globals.css` 作为视觉 token 的唯一来源；页面与组件仅消费 token 和 Tailwind utility class，避免把颜色、圆角和间距散落为多套值。

共享导航和页脚负责全局外框。首页继续由 Server Component 提供 `getAllContent()` 结果，`ContentDiscovery` 保持 Client Component 的搜索/分类状态；只替换布局与 class，不触碰 `filterContent()`、内容 schema 或 repository。

详情页继续从 repository 读取文章和目录，关于页继续消费 `publicProfile`。删除 `/lab`、`ReadingDensityExperiment`、`reading-density` 状态模块及其测试，并从导航与首页删除所有引用。

首页和关于页各自用同名 `eelex-page-intro-card` class 标记标题/简介容器，复用 `rounded-panel`、半透明 `bg-surface/65`、白色细边框、既有阴影与 `backdrop-blur`；标题和简介继续分别使用 `eelex-page-heading`、`eelex-page-intro`，以测试保护两页一致性。

## 受影响模块

- `src/app/globals.css`：设计 token、背景、焦点和减少动效基线。
- `src/components/site-header.tsx`、`site-footer.tsx`：圆角导航及简洁页脚。
- `src/app/page.tsx`、`src/components/content-discovery.tsx`、`src/components/content-card.tsx`：首页、控件与内容卡片。
- `src/app/content/[slug]/page.tsx`、`src/components/table-of-contents.tsx`、`src/app/about/page.tsx`、`src/app/not-found.tsx`：阅读页与次级页面视觉一致性。
- `src/app/lab/page.tsx`、`src/components/lab/reading-density-experiment.tsx`、`src/lab/reading-density.ts`、`tests/reading-density.test.ts`：删除。

## 验证策略

- 首先扩展 `tests/page-shells.test.tsx`，验证新页面文案、共享导航、搜索/分类结构、分类圆点和实验室移除；先运行并确认 RED。
- 视觉实现后运行该测试确认 GREEN，再执行 `corepack pnpm check`、`git diff --check`。
- 人工在至少 `320px`、`768px`、`1280px` 检查首页、筛选、详情、关于、404、焦点和减少动效；不检查或发布线上环境。

## 风险与缓解

- 视觉迁移可能意外改变语义或搜索交互：用现有内容测试及新增页面壳断言保护。
- 删除实验室可能留下死链：从导航、首页和测试中同步删除，并确认 `/lab` 落入 404。
- 当前 `main` 有未提交 Phase 5/6 修改：所有本次工作仅在 `codex/visual-refresh` worktree 中完成，未来集成前需针对重叠页面重新核对差异。
