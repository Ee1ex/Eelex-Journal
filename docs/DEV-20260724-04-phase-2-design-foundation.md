# DEV-20260724-04：Phase 2 设计基础方案

## 文档信息

- ID：DEV-20260724-04
- 状态：Approved
- 创建日期：2026-07-24
- 更新日期：2026-07-24
- 关联需求：[`REQ-20260724-04-phase-2-design-foundation.md`](REQ-20260724-04-phase-2-design-foundation.md)
- 关联决策：[`BIZ-20260724-02-phase-2-product-design-decisions.md`](BIZ-20260724-02-phase-2-product-design-decisions.md)
- 架构路线：[`DEV-20260724-01-v1-architecture-roadmap.md`](DEV-20260724-01-v1-architecture-roadmap.md)
- 工程基线：[`DEV-20260724-03-p2-preflight-engineering-hardening.md`](DEV-20260724-03-p2-preflight-engineering-hardening.md)

## 目标与实施边界

本方案只建立 Phase 2 的设计事实、低保真结构和基础 CSS token。当前 `src/app/page.tsx` 继续输出空的语义化 `<main>`；不创建页面、组件、内容模型、搜索逻辑或模拟内容。

Phase 2 结束时，后续页面可以从同一组语义 token 获取颜色、字体、空间、圆角、宽度和动效约束，但 token 不提前绑定具体页面或组件名称。

## 当前入口与最小改动

- `src/app/globals.css` 当前只包含 `@import "tailwindcss";`，是全局样式和 Tailwind CSS v4 token 的唯一实现入口。
- `src/app/layout.tsx` 只负责中文根文档、元数据和全局 CSS 导入，本阶段不修改。
- `src/app/page.tsx` 只输出空 `<main>`，本阶段不修改。
- `tests/app-shell.test.tsx` 保护上述应用壳行为，本阶段保留。
- 新增 `tests/design-tokens.test.ts`，以 Node 文件读取方式验证 CSS token、Tailwind 映射、分类对比度和减少动效契约。

## Token 架构

### 分层

```text
基础值
→ :root 中的语义变量
→ @theme inline 中的 Tailwind 命名空间映射
→ Phase 3 以后页面和组件消费
```

- 基础色值和语义事实只在 `:root` 定义一次。
- `@theme inline` 只把语义变量暴露为 Tailwind utilities，不复制实际色值。
- 布局和动效中不能稳定映射到 Tailwind 命名空间的值继续作为 CSS 自定义属性消费。
- token 使用职责名称，不使用 `home-*`、`article-card-*` 等页面或组件名称。

### 颜色

| 语义变量 | 建议值 | 用途 |
| --- | --- | --- |
| `--eelex-color-canvas` | `#f7f4ec` | 页面暖纸白背景 |
| `--eelex-color-surface` | `#fffdf8` | 面板与内容表面 |
| `--eelex-color-ink` | `#202522` | 主要正文 |
| `--eelex-color-muted` | `#626a66` | 次要说明与元数据 |
| `--eelex-color-border` | `#d8d4ca` | 分隔线与默认边框 |
| `--eelex-color-accent` | `#3d6078` | 主强调与链接 |
| `--eelex-color-focus` | `#285f8f` | 键盘焦点环 |
| `--eelex-color-category-all` | `#4f5854` | “全部”分类文字 |
| `--eelex-color-category-article` | `#365f7a` | 文章分类文字 |
| `--eelex-color-category-note` | `#835f1f` | 学习笔记分类文字 |
| `--eelex-color-category-tool` | `#2d6a60` | 工具分享分类文字 |
| `--eelex-color-category-article-soft` | `#e5edf2` | 文章分类浅表面 |
| `--eelex-color-category-note-soft` | `#f5ebcf` | 学习笔记分类浅表面 |
| `--eelex-color-category-tool-soft` | `#dcece8` | 工具分享分类浅表面 |

分类按钮必须同时通过文字标签、边框和选中状态表达含义。对比度测试至少验证正文/背景、弱化文字/背景以及三组分类文字/浅表面均达到 WCAG AA 正常文本的 `4.5:1`。

### 字体与排版

```css
--eelex-font-sans:
  ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
  "Microsoft YaHei", "PingFang SC", "Noto Sans CJK SC", sans-serif;
--eelex-font-mono:
  ui-monospace, "Cascadia Code", "SFMono-Regular", Consolas,
  "Liberation Mono", monospace;
```

| token | 建议值 | 用途 |
| --- | --- | --- |
| `--eelex-text-display` | `clamp(2.75rem, 5vw, 4.5rem)` | 首页姓名或核心标题 |
| `--eelex-text-page-title` | `clamp(2rem, 4vw, 3rem)` | 页面标题 |
| `--eelex-text-section-title` | `clamp(1.5rem, 3vw, 2rem)` | 分区标题 |
| `--eelex-text-body` | `1rem` | 默认正文 |
| `--eelex-text-small` | `0.875rem` | 辅助说明 |
| `--eelex-text-meta` | `0.8125rem` | 日期、分类和标签 |
| `--eelex-leading-tight` | `1.15` | 大标题 |
| `--eelex-leading-body` | `1.75` | 中文正文 |

正文默认字重为 `400`，标题优先使用 `600`，不依赖大量字重文件。代码和技术元数据可以使用等宽字体，但长篇中文正文不得使用等宽字体。

### 空间、圆角与宽度

| token | 建议值 |
| --- | --- |
| `--eelex-space-page-inline` | `clamp(1rem, 3vw, 2rem)` |
| `--eelex-space-section` | `clamp(3rem, 7vw, 6rem)` |
| `--eelex-space-stack` | `1.5rem` |
| `--eelex-radius-control` | `0.75rem` |
| `--eelex-radius-panel` | `1.25rem` |
| `--eelex-width-wide` | `72rem` |
| `--eelex-width-reading` | `44rem` |
| `--eelex-width-toc` | `15rem` |

首页个人区、内容列表和实验区域可以使用宽容器；详情正文使用阅读宽度；PC 目录位于正文右侧独立栏。手机统一使用页面内边距和单列结构。

### 动效

| token | 建议值 |
| --- | --- |
| `--eelex-duration-fast` | `120ms` |
| `--eelex-duration-base` | `180ms` |
| `--eelex-duration-slow` | `240ms` |
| `--eelex-ease-standard` | `cubic-bezier(0.2, 0, 0, 1)` |

- 默认只允许悬停、焦点、筛选和状态变化使用过渡。
- 不使用持续背景动画、滚动绑定动画或视差。
- `prefers-reduced-motion: reduce` 下关闭平滑滚动，把非必要 transition 和 animation 压缩到接近即时完成，并把动画迭代限制为一次。

## Tailwind CSS v4 映射

`@theme inline` 至少暴露以下命名空间：

```css
@theme inline {
  --color-canvas: var(--eelex-color-canvas);
  --color-surface: var(--eelex-color-surface);
  --color-ink: var(--eelex-color-ink);
  --color-muted: var(--eelex-color-muted);
  --color-border: var(--eelex-color-border);
  --color-accent: var(--eelex-color-accent);
  --color-focus: var(--eelex-color-focus);
  --color-category-all: var(--eelex-color-category-all);
  --color-category-article: var(--eelex-color-category-article);
  --color-category-note: var(--eelex-color-category-note);
  --color-category-tool: var(--eelex-color-category-tool);
  --color-category-article-soft: var(
    --eelex-color-category-article-soft
  );
  --color-category-note-soft: var(--eelex-color-category-note-soft);
  --color-category-tool-soft: var(--eelex-color-category-tool-soft);
  --font-sans: var(--eelex-font-sans);
  --font-mono: var(--eelex-font-mono);
  --radius-control: var(--eelex-radius-control);
  --radius-panel: var(--eelex-radius-panel);
}
```

具体实现前先用 Tailwind CSS v4 的实际构建验证 `@theme inline` 语法；不创建 `tailwind.config.*`。

## 已确认低保真结构

### 共享框架

- PC：品牌位于左侧，首页、实验室、关于我位于右侧；导航不长期悬浮。
- 手机：品牌与导航分为两行，三个入口始终可见，不使用汉堡菜单。
- 当前页面同时使用文字权重、短下划线或边框以及颜色表达。
- 键盘首次聚焦时显示跳到主要内容入口。
- 页脚只展示站点名称、版权和实际配置的外部联系方式。

### 首页

- PC 顶部个人区高约 `360–420px`，头像约 `144–160px`，允许 `2–3` 行简介，并在首屏下缘露出内容区入口。
- 手机个人区保持单列和适度高度，不机械复制 PC 比例。
- 内容区包含搜索框、四个分类按钮、结果数量、全部内容列表和无结果状态。
- 搜索和分类可以叠加；真实匹配行为留给 Phase 4。
- 内容条目按发布日期倒序。有封面时 PC 位于右侧、手机位于标题上方；无封面时不保留空位。
- 页面末尾提供关于我和实验室入口。

### 内容详情

- 返回入口指向首页内容区。
- 标题区包含分类、标题、日期、标签、可选摘要和可选封面。
- PC 使用窄正文和右侧目录；没有目录时正文自然居中。
- 手机目录位于正文前并默认收起。
- 图片不破坏正文边界，代码块允许横向滚动。
- 不提供预计阅读时间、复制链接、上一篇或下一篇。

### 关于我

- PC 顶部为头像和完整介绍双栏，手机改为单列。
- 后续依次展示当前学习方向、技能方向和实际配置的联系方式。
- 不使用履历时间线、技能百分比、空联系方式或站内联系表单。

### 实验室

- v1 直接展示一个当前实验、操作区域、主要操作、重置、键盘说明和体验步骤。
- 手机实验区域自适应，操作不依赖悬停。
- 页面提供返回内容入口。
- 删除实验室路由、模块和导航入口后，核心页面不需要修改。
- 具体实验主题留给 Phase 5 REQ。

## 后续搜索数据流约束

Phase 2 不实现搜索，但为 Phase 4 固定以下产品语义：

```text
统一内容集合
→ 规范化搜索词（去除首尾空格、统一大小写）
→ 按分类筛选
→ 在标题、摘要、分类和标签中执行包含匹配
→ 按发布日期倒序输出
→ 结果列表、结果数量或无结果状态
```

- 不使用错别字容忍、编辑距离或相关度评分。
- 标签参与匹配，但不提供独立标签筛选器。
- 分类和搜索状态应可由 URL 表达，刷新和站内返回不能产生隐藏状态；具体字段名在 Phase 4 DEV 确认。

## 测试方案

新增 `tests/design-tokens.test.ts`：

1. RED：在 `globals.css` 仍只有 Tailwind import 时，断言关键 `:root` token、`@theme inline` 映射和减少动效规则缺失。
2. GREEN：加入最小 token 后，同一契约通过。
3. 解析十六进制颜色并验证正文、弱化文字和分类色组合至少达到 `4.5:1`。
4. 验证没有 `@font-face`、外链字体 URL 或新增 Tailwind 配置。
5. 保留 `tests/app-shell.test.tsx`，确认首页仍为空 `<main>`。

配置和声明由真实 `corepack pnpm check` 验证 CSS 编译、类型、Lint、Vitest 和生产构建，不引入 Stylelint、浏览器测试或截图基线。

## 验证矩阵

1. RED/GREEN：定向执行 `corepack pnpm exec vitest run tests/design-tokens.test.ts`。
2. 格式：`corepack pnpm format:check`。
3. 类型与 Lint：`corepack pnpm typecheck`、`corepack pnpm lint`。
4. 测试与构建：`corepack pnpm test`、`corepack pnpm build`、`corepack pnpm check`。
5. 依赖：`corepack pnpm peers check`、`corepack pnpm audit --prod`。
6. Git：`git diff --check`，并确认没有页面、组件、字体或依赖变更。
7. 文档：相对 Markdown 链接、状态、引用、产品基线和 Phase 路线一致。

## 预期文件

### 新增

- `tests/design-tokens.test.ts`
- 获批后创建 `docs/superpowers/plans/2026-07-24-phase-2-design-foundation.md`

### 修改

- `src/app/globals.css`
- 当前 REQ、BIZ、DEV、PRD、PROG、README 和文档索引

### 不修改

- `src/app/page.tsx`
- `src/app/layout.tsx`
- `mdx-components.tsx`
- `package.json`
- `pnpm-lock.yaml`
- `next.config.mjs`

## 风险与处置

- 建议颜色必须先通过自动对比度测试；任一组合低于 `4.5:1` 时调整前景色，不降低门槛。
- CSS token 尚无真实页面消费者，Phase 3 必须通过页面骨架和实际中文内容复核字号、阅读宽度和首页个人区比例。
- 全局减少动效规则可能影响未来必要反馈；Phase 3 使用动画前必须验证 reduce 模式，而不是删除全局保护。
- Tailwind `@theme inline` 的映射以真实构建结果为准；若命名空间不被支持，停止并修正 DEV，不创建平行 Tailwind 配置。
- 本方案不使用页面占位稿验证 token，避免为了展示 token 提前进入 Phase 3。

## 验收证据

- 用户于 2026-07-24 批准本文提出的精确 token、Tailwind CSS v4 `@theme inline` 映射、对比度门禁和测试方案。
- 文档阶段实测建议颜色组合的对比度为 `4.88:1–14.16:1`，均达到本文拟定的 `4.5:1` 门槛。
- CSS、自动测试和工程命令证据只有在按实施计划完成代码改动后追加。

## 遗留问题

- GitHub Actions 远程运行和 Netlify 部署不属于本方案。

## 批准记录

- 2026-07-24：用户批准本文，允许下一步创建逐任务实施计划；批准不包含远程推送、PR 或部署授权。

## 实施完成记录

- 语义值只在 `:root` 定义，`@theme inline` 只映射 Tailwind 命名空间；未创建平行配置。
- 自动对比度检查覆盖正文、弱化文字和三组分类色，文档阶段实测范围为 `4.88:1–14.16:1`，全部达到 `4.5:1` 门槛。
- `prefers-reduced-motion: reduce` 下关闭平滑滚动，将非必要动画和过渡压缩为 `0.01ms`，并限制为一次迭代。
- Vitest RED 为 1 项通过、4 项失败；最小 CSS 后首次运行 4/5 通过，定位到测试空白规范化不足后进行单点修正，最终 GREEN 为 5/5。
- 完整套件为 3 个文件、14 个测试通过；生产构建验证 Tailwind CSS v4 接受批准的 `@theme inline` 映射。
- 嵌套 worktree 构建保留已知的多 workspace 根目录推断 warning；构建成功，合入本地 `main` 后仍须根目录复验。
- Phase 3 仍需用真实页面骨架和中文内容复核视觉比例；本方案未提前创建展示页。

## 本地 `main` 根目录复验

- 2026-07-24：实现分支已通过 `fast-forward` 合入本地 `main`。
- 根目录 `corepack pnpm check` 通过，覆盖 Prettier、Next 类型生成、TypeScript、ESLint、3 个测试文件中的 14 个测试和生产构建。
- 根目录 `corepack pnpm peers check`、`corepack pnpm audit --prod` 与 `git diff --check` 全部通过。
- 嵌套 worktree 下的多 workspace 根目录推断 warning 在主工作区复验时消失，不需要修改 `next.config.mjs` 或扩大工程配置范围。
- 当前技术方案已完成验证；Phase 3 消费 token 时仍需针对真实页面、中文内容和 `prefers-reduced-motion` 重新检查视觉与交互表现。
