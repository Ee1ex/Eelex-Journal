# DEV-20260724-07：Phase 5 关于我、实验室与响应式体验方案

## 文档信息

- ID：DEV-20260724-07
- 状态：Approved
- 创建日期：2026-07-24
- 更新日期：2026-07-25
- 关联需求：[REQ-20260724-07-phase-5-profile-lab-responsive.md](REQ-20260724-07-phase-5-profile-lab-responsive.md)
- 关联决策：[BIZ-20260724-02-phase-2-product-design-decisions.md](BIZ-20260724-02-phase-2-product-design-decisions.md)
- 前置方案：[DEV-20260724-04-phase-2-design-foundation.md](DEV-20260724-04-phase-2-design-foundation.md)、[DEV-20260724-06-phase-4-mdx-content-discovery.md](DEV-20260724-06-phase-4-mdx-content-discovery.md)

## 方案目标

在不改变内容数据流、全局设计 token 或工程依赖的前提下，建立唯一公开资料模块和独立实验室模块；以原生表单控件实现可测试的阅读密度状态，并用现有 Tailwind CSS v4 工具类完成响应式布局。

## 资料模型与消费边界

- 新增 `src/site/profile.ts`，替代 `src/mocks/profile.ts` 作为公开资料唯一来源。
- 资料模型固定包含昵称、定位、介绍、学习方向、技能方向、字母头像说明和外部联系数组；本期外部联系数组仅含 GitHub `https://github.com/Ee1ex`。
- 首页、关于页和页脚只导入 `src/site/profile.ts`，不得在各页面复制资料字段或手写联系方式。
- 字母头像由语义化文本元素呈现，提供“Eelex 的字母头像”替代文本；不新增图片文件、图片优化配置或外部资源。
- 外部 GitHub 链接使用明确文本、`target="_blank"` 与 `rel="noreferrer"`；邮箱在未配置时不渲染。

## 实验室模块

- 新增 `src/lab/reading-density.ts`，定义 `compact`、`comfortable`、`relaxed` 三个状态、默认状态 `comfortable`、展示文案和对应预览样式映射。该模块不导入 React、内容仓库或页面模块。
- 新增 `src/components/lab/reading-density-experiment.tsx` 作为唯一 Client Component，使用 `useState` 消费上述状态；切换和重置均只更新内存状态。
- 控件使用同一 `name` 的原生 `input type="radio"` 与 `label`，重置使用 `button type="button"`；因此键盘方向键、空格键、触控与鼠标均走浏览器原生语义。
- 状态不读取或写入查询参数、hash、`localStorage`、cookie 或服务器数据；刷新后取默认 `comfortable`。
- `src/app/lab/page.tsx` 保持 Server Component，只组合实验标题、说明、实验组件和 `/#content` 返回入口。
- 任何实验实现不得导入 `src/content/*`、`src/site/profile.ts` 或首页/详情组件；核心页面和共享布局不得导入 `src/components/lab/*`。

## 响应式与动效

- 复用 `--eelex-width-wide`、`--eelex-space-page-inline`、`--eelex-space-section`、圆角和颜色 token；不修改 `globals.css`，除非批准后的实现证明现有 token 无法表达本 REQ 的明确验收项。
- 关于页采用基础单列和 `sm` 双栏；实验控制区采用窄屏单列、宽屏横向排列，触控目标保留现有 `px-4 py-3` 级别。
- 主导航继续使用已有 `sm` 双行到横行布局，三个入口始终显示；不新增断点配置或汉堡菜单。
- 实验不引入持续动画；既有全局 `prefers-reduced-motion` 规则继续覆盖全部过渡。

## 测试与验证

- 新增 `tests/profile.test.ts`，验证公开资料字段、唯一消费边界和未配置联系方式不渲染空入口。
- 新增 `tests/reading-density.test.ts`，验证三种状态、默认状态、重置语义、预览映射，以及实验模块不依赖内容仓库。
- 更新 `tests/page-shells.test.tsx`，验证关于页字母头像、GitHub 链接、实验室原生控件和核心页面不导入实验实现。
- 不新增浏览器测试依赖；使用纯状态模块的 Vitest 单元测试验证状态规则，并在实际浏览器执行 `320px`、`375px`、`768px`、`1280px` 与键盘焦点检查。
- 自动门禁为 `corepack pnpm format:check`、`typecheck`、`lint`、`test`、`build`、`check` 和 `git diff --check`。生产依赖审计不沿用为本期自动前置检查；如用户另行授权，再运行并记录结果。

## 预期文件

### 新增

- `src/site/profile.ts`
- `src/lab/reading-density.ts`
- `src/components/lab/reading-density-experiment.tsx`
- `tests/profile.test.ts`
- `tests/reading-density.test.ts`
- 获批后的 `docs/superpowers/plans/2026-07-24-phase-5-profile-lab-responsive.md`

### 修改

- `src/app/page.tsx`
- `src/app/about/page.tsx`
- `src/app/lab/page.tsx`
- `src/components/site-footer.tsx`
- `tests/page-shells.test.tsx`
- 当前 REQ、DEV、PRD、PROG、文档索引和实施计划

### 不修改

- `src/content/*`
- `src/components/content-discovery.tsx`
- `src/components/table-of-contents.tsx`
- `src/components/route-scroll-reset.tsx`
- `package.json`
- `pnpm-lock.yaml`
- `next.config.mjs`
- `src/app/globals.css`（除非实施证据表明现有 token 无法满足已批准验收项）

## 风险与决策

- 资料中只使用已知的公开 GitHub，避免猜测或泄露未确认邮箱；任何新增联系方式都必须由用户明确给出并确认公开。
- 使用字母头像避免未获授权的人像或外部图片依赖；替换为真实头像将涉及资源来源、替代文本和公开授权的重新确认。
- 原生 radio group 保证最低键盘与触控可用性，避免为单一实验引入自定义按键模型或额外依赖。
- 若需要 URL 可分享状态、持久化偏好或多个实验，应创建新的 REQ，而不是扩展本期模块边界。

## 实施与验证结果

- 方案按既定边界实现：公开资料来源为 `src/site/profile.ts`，实验状态与唯一 Client Component 分别位于 `src/lab/reading-density.ts` 和 `src/components/lab/reading-density-experiment.tsx`；未新增依赖、外部资源或持久化状态。
- 合并后的 `main` 已通过 `format:check`、`typecheck`、`test`（10 个文件、25 项测试）、`build`、`check` 与 `git diff --check`；`lint` 无 error，仅有内容仓库中既有的 4 条 warning。
- 用户已确认原生 radio 组方向键切换与重置操作；四个约定视口的人工浏览器检查无横向溢出。

## 批准记录

- 2026-07-24：创建 Proposed 方案；未获批准，未创建实施计划或修改应用代码、测试、依赖和工程配置。
- 2026-07-24：用户批准本文；本轮未创建实施计划或修改应用代码、测试、依赖和工程配置。
- 2026-07-25：按本文方案完成实现、主分支安全集成与验证；方案保持 `Approved`，无需新增或替代 DEV。
