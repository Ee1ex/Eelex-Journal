# REQ-20260724-04：Phase 2 设计基础

## 文档信息

- ID：REQ-20260724-04
- 状态：Done
- 创建日期：2026-07-24
- 更新日期：2026-07-24
- 产品基线：[`PRD.md`](PRD.md)
- 前置需求：[`REQ-20260724-03-p2-preflight-engineering-hardening.md`](REQ-20260724-03-p2-preflight-engineering-hardening.md)
- 现有基线决策：[`BIZ-20260724-01-phase-0-baseline.md`](BIZ-20260724-01-phase-0-baseline.md)
- 本次产品决策：[`BIZ-20260724-02-phase-2-product-design-decisions.md`](BIZ-20260724-02-phase-2-product-design-decisions.md)
- 架构路线：[`DEV-20260724-01-v1-architecture-roadmap.md`](DEV-20260724-01-v1-architecture-roadmap.md)
- 工程基线：[`DEV-20260724-03-p2-preflight-engineering-hardening.md`](DEV-20260724-03-p2-preflight-engineering-hardening.md)
- 本次技术方案：[`DEV-20260724-04-phase-2-design-foundation.md`](DEV-20260724-04-phase-2-design-foundation.md)
- 进度记录：[`PROG-20260724.md`](PROG-20260724.md)

## 背景与已确认事实

- Phase 1 应用壳和 P2 前置工程加固已在本地 `main` 完成。
- 当前应用只有空的语义化 `<main>`、根布局和 Tailwind CSS 入口。
- 当前没有正式页面、组件、设计 token、低保真结构或真实 MDX。
- v1 继续采用中文、单一主题、静态内容优先架构。
- 文章、学习笔记和工具分享继续共用统一内容模型。
- 实验室继续与核心阅读链路解耦。
- GitHub Actions、Dependabot 和 Netlify 均无远程验证记录。

## 本次产品基线变更

用户于 2026-07-24 确认以下调整：

- 不再建设独立的“全部文章”页面。
- 首页个人介绍区下方直接展示全部已发布内容。
- 首页内容区提供分类筛选和轻量多字段搜索。
- 全站导航调整为：首页、实验室、关于我。
- 404 和详情页的内容返回入口统一指向首页内容区。
- v1 允许对标题、摘要、分类和标签执行包含匹配。
- 搜索忽略大小写和首尾空格，不处理错别字或相似度评分。
- 分类与搜索条件可以叠加。
- v1 不提供分页、加载更多或用户可配置排序。
- “文章”“学习笔记”“工具分享”使用不同的低饱和分类色，但不能只依赖颜色表达状态。

上述变更取代 `BIZ-20260724-01` 中“首页与列表”和“内容发现”两项旧决策；其他已批准决定继续有效。

## 目标

确定 Eelex Code Hub v1 的视觉方向、阅读原则、UI 与动效原则，建立可供后续页面共同消费的基础设计 token，并确认首页、内容详情、关于我、实验室及共享页面框架在 PC 与手机端的信息层级和低保真结构。

## 本次范围

### 产品与设计决策

- 记录首页整合全部内容及轻量搜索的产品变更。
- 确定主视觉、字体、色彩、页面宽度、阅读和动效原则。
- 明确响应式、键盘焦点、减少动效和自然降级原则。
- 更新 PRD、BIZ 和阶段路线中的相关旧结论。

### 低保真结构

- 确认共享导航、页脚和主要内容容器。
- 确认首页较大的个人介绍区。
- 确认首页搜索、分类按钮、结果数量、内容列表和无结果状态。
- 确认内容详情的标题区、正文、图片、代码块和文章目录。
- 确认关于我的个人资料、学习方向、技能方向和联系方式。
- 确认实验室的单个实验展示、操作说明和返回内容路径。
- 明确 PC 与手机端的信息顺序和结构变化。

### 基础设计 token

- 定义背景、表面、正文、弱化文字、边框、焦点和强调色。
- 定义文章、学习笔记、工具分享的分类色。
- 定义字体族、字号、行高和字重。
- 定义间距、圆角、边框、页面容器和正文阅读宽度。
- 定义 `120–240ms` 的反馈型动效和减少动效规则。
- 使用 `:root` 保存基础与语义变量。
- 使用 Tailwind CSS v4 `@theme` 映射可消费的设计 token。
- 增加 token 工程契约测试。

### 文档收尾

- 更新 REQ、BIZ、DEV、PRD、PROG、README 和当前文档索引。
- 记录验证证据、未验证事项、遗留风险和下一阶段任务。

## 本次不包含

- 不创建或实现首页、详情页、关于我、实验室或 404 的正式页面结构。
- 不创建导航栏、页脚、搜索框、筛选器、内容卡片或实验组件。
- 不实现搜索、分类筛选或 URL 查询状态。
- 不实现 MDX 内容模型、frontmatter 校验、内容读取或正文渲染。
- 不选择或实现具体实验主题。
- 不实现 SEO、sitemap、robots 或部署配置。
- 不引入搜索库、字体资源、组件库、数据库、后端或 CMS。
- 不推送远程、不创建 PR、不部署。

搜索、分类筛选和完整内容集合的实际行为归入 Phase 4；Phase 2 只确认公开体验、状态结构和所需 token。

## 交付文件

### 新增

- `docs/REQ-20260724-04-phase-2-design-foundation.md`
- `docs/BIZ-20260724-02-phase-2-product-design-decisions.md`
- `docs/DEV-20260724-04-phase-2-design-foundation.md`
- `tests/design-tokens.test.ts`
- REQ 与 DEV 获批后创建对应的逐任务实施计划

### 修改

- `src/app/globals.css`
- `docs/PRD.md`
- `docs/BIZ-20260724-01-phase-0-baseline.md`
- `docs/DEV-20260724-01-v1-architecture-roadmap.md`
- `docs/README.md`
- `docs/PROG-20260724.md`
- `README.md`

### 明确不修改

- `src/app/page.tsx`
- `src/app/layout.tsx`
- `mdx-components.tsx`
- 任何正式页面路由或页面组件

## 验收标准

### 产品与路线一致性

- PRD 不再要求独立的“全部文章”页面。
- PRD 明确首页展示全部内容并提供分类筛选和轻量搜索。
- PRD 的导航、核心访问路径、404 返回入口、明确非目标和 v1 完成标准与新决定一致。
- 新 BIZ 明确取代旧 BIZ 中受影响的两项决策，不覆盖其他决定。
- v1 DEV 的模块和阶段 DoD 不再要求“全部文章”页面。
- Phase 4 明确承担真实搜索、分类筛选和内容集合实现。

### 设计系统

- 主视觉被记录为安静的编辑阅读感与轻量代码气质。
- 字体只使用系统字体栈。
- 基础色为暖纸白、炭黑和低饱和墨蓝。
- 三类内容拥有不同且可访问的低饱和分类色。
- token 具有明确语义，不以页面名称绑定底层变量。
- `:root` 与 `@theme` 分层清晰，无重复事实源。
- 不引入新依赖或字体文件。

### 低保真结构

- 共享框架、首页、详情、关于我和实验室均有 PC 与手机结构。
- 首页个人介绍区在 PC 上具有明显更大的视觉占比，但不使用全屏 Hero。
- 首页搜索、分类、结果数量、内容列表和无结果状态完整。
- 分类颜色不是分类或选中状态的唯一表达方式。
- 详情页无预计阅读时间、复制链接、上一篇或下一篇。
- 关于页无履历时间线、技能百分比或站内联系表单。
- 实验室与核心阅读链路保持隔离。
- 缺少封面、目录或联系方式时不存在空白占位。

### 工程与验证

- token 契约测试先在缺少 token 时失败，再随最小实现通过。
- `corepack pnpm format:check`、`typecheck`、`lint`、`test`、`build` 和统一 `check` 均以零退出码完成。
- `corepack pnpm peers check` 和 `audit --prod` 通过。
- `git diff --check` 通过。
- Markdown 相对链接无断链。
- `src/app/page.tsx` 继续保持空的语义化 `<main>`。
- 未创建正式页面、组件、内容模型、远程推送或部署。

## 风险与处置

- 首页同时承担个人介绍和全部内容，未来内容量显著增加后可能过长。v1 先保持完整静态列表，达到实际规模后通过新 REQ 评估分页或归档。
- token 尚无真实页面消费者，只能验证契约、CSS 编译和构建。Phase 3 必须使用真实页面骨架重新验证视觉比例。
- 系统字体跨平台外观可能不同，以中文可读性、稳定加载和地区访问为优先。
- 多种分类色可能破坏单一视觉基调，因此只用于小面积按钮、徽标和状态，不扩展为整页背景色。
- 搜索的实际数据流在 Phase 4 实现；Phase 2 不提前创建模拟搜索逻辑。
- 远程 CI 和 Netlify 不作为本需求完成证据。

## 当前验证证据

- 本轮已完成只读文档、应用壳和 Git 状态核对。
- 用户于 2026-07-24 逐项确认产品范围、视觉方向、字体、色彩、布局、动效和关键页面低保真结构。
- 用户于 2026-07-24 明确批准本 REQ。
- 当前只进入文档同步阶段，没有应用代码、CSS、测试、推送或部署改动。

## 遗留问题

- 具体 token 数值、变量名称和测试契约由关联 DEV 固化并另行审批。
- 真实首页、内容模型、分类筛选和搜索行为按后续 Phase 实施。
- GitHub Actions 首次远程运行和 Netlify 验证继续等待授权及对应阶段。

## 批准记录

- 2026-07-24：用户批准方案 A，确认 Phase 2 包含设计决策、低保真结构和基础 CSS token，但不包含正式页面或组件实现。
- 2026-07-24：用户逐项确认主视觉、系统字体、色彩、分层宽度、反馈型动效、共享框架、首页、详情、关于我和实验室结构。
- 2026-07-24：用户批准取消独立“全部文章”页，将完整内容、分类选择和轻量搜索整合到首页，并批准本 REQ。

## 实施启动记录

- 2026-07-24：从干净的本地 `main` 创建隔离 worktree `.worktrees/phase-2-design-foundation` 和分支 `codex/phase-2-design-foundation`，开始基础 token 契约 RED/GREEN；未推送、未部署。

## 完成记录与验收证据

### 状态变更

- 2026-07-24：本 REQ 从 `In Progress` 更新为 `Done`。

### 实施结果

- `src/app/globals.css` 已建立批准的 `:root` 语义 token、Tailwind CSS v4 `@theme inline` 映射和减少动效保护。
- `tests/design-tokens.test.ts` 覆盖精确 token、Tailwind 映射、WCAG 对比度、减少动效以及禁止字体下载和 Tailwind 配置文件。
- RED 阶段为 1 项通过、4 项失败，失败准确指向缺少 token 实现。
- 最小 CSS 后首次运行有 4/5 通过；剩余失败来自测试只折叠空白、未规范化 Prettier 在多行 `var(...)` 括号内加入的空格。测试 helper 最小修正为只移除括号内侧格式空白并保留字体名称中的空格，随后 GREEN 为 5/5 通过。
- 完整 Vitest 为 3 个测试文件、14 个测试通过，应用壳继续输出空 `<main>`。
- 未创建页面、组件、内容模型、搜索行为、依赖、字体、Tailwind 配置、推送或部署。

### 工程证据

- `corepack pnpm install --frozen-lockfile`：通过，使用 pnpm `11.17.0`。
- `corepack pnpm check`：通过，包含格式、类型生成与检查、Lint、14 项测试和生产构建。
- `corepack pnpm peers check`：`No peer dependency issues found`。
- `corepack pnpm audit --prod`：`No known vulnerabilities found`。
- `git diff --check`：通过。
- 嵌套 worktree 构建出现已知的 Next.js 多 `pnpm-workspace.yaml` 根目录推断 warning，但生产构建成功；本地合入 `main` 后必须从仓库根目录重新执行最终门禁。

### Phase 2 DoD

- 主视觉、阅读、UI 和动效原则：通过。
- 共享框架、首页、内容详情、关于我和实验室 PC/手机低保真结构：通过。
- 字体、颜色、分类色、间距、圆角、页面宽度和动效 token：通过。
- CSS token 与自动契约：通过。
- 未提前进入正式页面、内容系统或部署：通过。

## 本地交付与最终验证补充

- 2026-07-24：用户选择本地合并，`codex/phase-2-design-foundation` 已通过 `fast-forward` 合入本地 `main`，无冲突。
- 在 `main` 根目录重新执行 `corepack pnpm install --frozen-lockfile` 与统一 `corepack pnpm check`，格式、类型生成与检查、Lint、3 个测试文件中的 14 个测试以及生产构建全部通过。
- `corepack pnpm peers check` 返回 `No peer dependency issues found`。
- `corepack pnpm audit --prod` 返回 `No known vulnerabilities found`。
- `git diff --check` 通过。
- 根目录生产构建未出现隔离 worktree 中的多 workspace 根目录推断 warning，该提示已确认属于嵌套工作树环境，不是产品或构建缺陷。
- 本 REQ 的 Phase 2 DoD 已在目标分支与本地 `main` 根目录双重验证。
- 未执行远程推送、PR、远程 CI 或部署；GitHub Actions 首次远程运行和 Netlify 验证仍按后续授权与对应 Phase 处理。

## 远程交付补充

- 2026-07-24：用户另行授权推送，本地 `main` 已通过普通非强制推送同步到 GitHub `origin/main`。
- 远程 `refs/heads/main` 与本地 `HEAD` 已核对为同一提交 `d6bf1c6411799897dfe5b44b7062c19e71344060`。
- 未创建 PR，未部署；GitHub Actions 首次远程运行结果尚未核对。
