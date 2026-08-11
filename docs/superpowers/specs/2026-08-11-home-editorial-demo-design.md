# 首页编辑型视觉 Demo 设计

## 文档信息

- 日期：2026-08-11
- 状态：待用户审阅
- 目标分支：`codex/home-editorial-demo`
- 关联产品：[`docs/PRD.md`](../../PRD.md)
- 关联现状：[`docs/REQ-20260725-02-visual-refresh.md`](../../REQ-20260725-02-visual-refresh.md)
- 视觉输入：`DESIGN (1).md`、`tokens (1).json`、`variables (1).css`、`theme (1).css`

## 目标

在不修改文章、内容模型、路由、搜索匹配规则、分类规则和外部链接的前提下，只将首页改造成一个可交互的编辑型视觉 demo，用于验证新的视觉方向。详情页、关于页和 404 本轮不改。

## 已确认事实与设计假设

### 已确认事实

- 当前站点使用 Next.js App Router、React、Tailwind CSS v4 和本地 MDX 内容。
- 首页由 Server Component 提供 `getAllContent()`，由 `ContentDiscovery` 负责搜索与分类状态。
- 当前共有 3 篇真实内容；现有测试保护内容入口、分类、搜索结果数量、跳转和无障碍骨架。
- 项目禁止外部字体下载、新增依赖、后端、CMS、登录和部署操作。
- 用户本轮选择“直接重做首页表现层”，不要求暂时保留旧首页或新增 `/demo` 路由。

### 设计假设

- 提供的 `DESIGN (1).md` 是视觉参考而不是 Eelex 首页线框，因此将其转译为“个人博客编辑目录”，不复制 ElevenLabs 的产品营销结构。
- `Waldenburg`、`Inter` 和 `Geist Mono` 不作为远程资源加载；使用现有系统字体栈模拟显示、正文和技术元信息的层次。
- “原有内容不变”意味着保留现有可见文案、文章、标签、分类、日期和链接；允许新增纯界面性标记，但不增加新的业务内容。

## 方案与选择

采用 A：直接在首页表现层上重做。

- `ContentDiscovery` 继续消费现有 `ContentSummary[]` 并调用现有 `filterContent()`。
- 不新增路由、不复制数据、不引入 UI 依赖。
- 通过共享 token 和页面级 class 调整结构与样式，后续可以将同一视觉语言扩展到详情页、关于页和 404。

不采用 B（新增 `/demo`）是因为它会复制或重新接入首页交互，且不能直接验证正式首页的改版结果；不采用 C（只换 token）是因为当前玻璃卡片和首页布局节奏仍会保留，无法充分验证新方向。

## 页面结构

```text
RootLayout
├── SiteHeader
├── Home
│   ├── intro/editorial masthead
│   └── content section
│       └── ContentDiscovery
│           ├── category controls
│           ├── search input
│           ├── result count / empty state
│           └── ContentCard[]
└── SiteFooter
```

### 顶部导航

- 保留 `Eelex Code Hub`、`内容`、`关于` 和跳至主要内容入口。
- 从粘性玻璃导航改为轻量静态顶部栏，用留白和细分隔线建立层次。
- 不改变导航目标、当前页语义和键盘焦点表现。

### 首页首屏

- 使用 `#fdfcfc` 作为纸张感画布。
- 保留标题“欢迎来到Eelex 的个人博客”和 `publicProfile.introduction` 原文。
- 标题采用轻字重、紧字距、响应式字号；简介采用较小的暖灰正文。
- 首屏不增加全屏 hero、图片、装饰性插画或虚构的业务数据。

### 内容区与筛选

- 保留“我的记录与思考”、搜索输入、四个分类按钮和结果数量。
- 桌面端将标题、结果信息和控件组织成清晰的编辑目录节奏；移动端自然单列堆叠。
- 搜索仍匹配标题、摘要、分类和标签，仍忽略大小写与首尾空格；分类与搜索仍可叠加。
- 无结果时保留明确的空状态，不显示空白区域。

### 内容列表

- 将当前大面积玻璃卡片转为行式内容目录，以细分隔线、标题、摘要、标签、分类和日期建立层次。
- 3 篇真实内容全部保留；每个标题仍链接到原有 `/content/[slug]`。
- 分类色只作为小面积圆点或状态文字使用；不让紫色或橙色成为主要按钮或导航色。
- 不添加封面、阅读时长、点赞、收藏或其他超出 v1 的字段。

## 视觉 token

在 `src/app/globals.css` 中将视觉 token 统一为以下语义值；页面组件不直接散落新的颜色值。

| 语义 | 值 | 用途 |
| --- | --- | --- |
| eggshell | `#fdfcfc` | 页面画布与浅色表面 |
| warm taupe | `#f5f3f1` | 内容区、辅助面和弱化层次 |
| stone | `#ebe8e4` | 细边框、分隔线、图标底 |
| ink | `#000000` | 标题、正文强调、主操作 |
| graphite | `#44403b` | 次级强调文字 |
| smoke | `#777169` | 摘要、说明和元信息 |
| ash | `#a59f97` | 最弱辅助文字 |

- 显示字号遵循 32/36/48px、`font-weight: 300`、约 `-0.02em` 字距。
- 正文使用 14–20px 的现有系统字体层次，默认行高约 1.5。
- 卡片圆角使用 20px，输入框使用 4px，按钮与标签使用全胶囊圆角。
- 阴影只保留极细的边界或内描边，不再依赖大面积漂浮阴影。
- 不添加 `@font-face`、外部 URL 或新的 Tailwind 配置文件。

## 交互与状态

- `ContentDiscovery` 的 `query`、`category`、`useMemo` 和 `filterContent()` 保持不变。
- 分类按钮继续使用 `aria-pressed`；搜索输入继续有可访问名称；结果数量继续使用 `aria-live="polite"`。
- 内容标题、外链、跳至主要内容链接和焦点可见性保持可用。
- 仅保留轻量 hover/focus 反馈；`prefers-reduced-motion: reduce` 继续关闭过渡和滚动动画。
- 不引入新的交互状态，不改变 URL，不增加持久化。

## 实施边界

预计只修改以下首页相关文件：

- `src/app/globals.css`
- `src/app/page.tsx`
- `src/components/site-header.tsx`
- `src/components/site-footer.tsx`
- `src/components/content-discovery.tsx`
- `src/components/content-card.tsx`
- 与页面断言直接相关的测试文件

不会修改：

- `content/*.mdx`
- `src/content/schema.ts`
- `src/content/repository.ts`
- `src/content/search.ts`
- 详情页、关于页、404 和 SEO 路由
- `package.json`、依赖版本和部署配置

## 验收标准

1. 首页视觉体现暖白画布、黑色编辑型排版、细边界、克制层次和行式内容目录。
2. 现有首页标题、简介、内容数量、分类、标签、日期和内容链接全部保留。
3. 搜索、分类叠加、空状态、结果数量和键盘操作行为与当前一致。
4. `320px`、`768px`、`1280px` 视口下无横向溢出，控件和正文可读可操作。
5. 页面不新增外部字体、依赖、图片、后端能力或超出 v1 的功能。
6. `corepack pnpm check`、`git diff --check` 和针对首页的测试全部通过。
7. demo 可在本地开发服务器中直接打开首页验证；不执行推送、部署或远程设置变更。

## 验证计划

- 先更新/补充首页壳和交互断言，确保内容链路、分类按钮、搜索输入和无结果状态保持。
- 运行格式检查、类型检查、Lint、Vitest 和生产构建。
- 使用本地预览检查桌面与移动布局、搜索与分类组合、内容跳转、焦点状态和减少动效偏好。
- 若发现新视觉与原有内容或行为冲突，优先回退表现层改动，不修改内容数据或搜索实现。

## 后续扩展

本 demo 仅验证首页视觉方向。只有用户确认首页视觉后，才在新的紧密范围内设计详情页、关于页和 404 的视觉迁移，并另行同步对应 REQ/BIZ/DEV 与进度记录。
