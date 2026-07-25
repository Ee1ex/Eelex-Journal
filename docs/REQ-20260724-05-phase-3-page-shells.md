# REQ-20260724-05：Phase 3 页面骨架与模拟内容

## 文档信息

- ID：REQ-20260724-05
- 状态：Done
- 创建日期：2026-07-24
- 更新日期：2026-07-24
- 产品基线：[`PRD.md`](PRD.md)
- 前置需求：[`REQ-20260724-04-phase-2-design-foundation.md`](REQ-20260724-04-phase-2-design-foundation.md)
- 关联决策：[`BIZ-20260724-02-phase-2-product-design-decisions.md`](BIZ-20260724-02-phase-2-product-design-decisions.md)
- 架构路线：[`DEV-20260724-01-v1-architecture-roadmap.md`](DEV-20260724-01-v1-architecture-roadmap.md)
- 前置方案：[`DEV-20260724-04-phase-2-design-foundation.md`](DEV-20260724-04-phase-2-design-foundation.md)
- 本次方案：[`DEV-20260724-05-phase-3-page-shells.md`](DEV-20260724-05-phase-3-page-shells.md)
- 进度记录：[`PROG-20260724.md`](PROG-20260724.md)

## 背景与已确认事实

- Phase 1、P2 前置工程加固和 Phase 2 设计基础均已完成；本地 `main` 与 `origin/main` 当前均指向 `1c22fa7dc5fa5832ada7b0e53544fe7e773ab775`。
- 当前工程已有根布局、空首页、语义化 CSS token、Tailwind CSS v4 映射与三个测试文件；正式页面、共享组件、内容模型和搜索行为均未实现。
- Phase 2 已固定首页信息结构、PC/手机布局、系统字体、颜色、宽度、圆角和减少动效规则。Phase 3 的职责是以真实页面骨架消费这些契约，而不是重新定义它们。
- GitHub Actions 首次远程运行和 Netlify 部署尚未核对，不属于本需求的完成证据。

## 目标

在不接入真实 MDX、不过早实现分类或搜索行为的前提下，建立当前 PRD 所需的全部 v1 页面路由、共享导航和页脚，并以统一模拟内容走通“首页浏览 → 内容详情阅读 → 返回首页内容区”的核心路径。

## 本次范围

### 路由与共享框架

- 建立首页、`/content/[slug]`、`/about`、`/lab` 和 404 页面。
- 建立共享品牌导航、页脚、页面容器和键盘首次聚焦可见的“跳到主要内容”入口。
- 主导航只包含首页、实验室和关于我；站点名称返回首页。
- 内容详情和 404 的恢复入口均指向首页内容区稳定锚点 `/#content`。

### 模拟资料与页面结构

- 建立仅供 Phase 3 使用的模拟个人资料和统一模拟内容集合，覆盖文章、学习笔记和工具分享。
- 首页展示较大的个人资料区、内容发现区和模拟内容卡片；卡片与详情页必须消费同一模拟集合。
- 首页的搜索框和四类分类控件只作为结构性、语义化禁用控件呈现，不实现筛选、搜索、URL 状态、结果数量计算或无结果业务逻辑。
- 内容详情展示分类、标题、日期、标签、摘要与模拟正文；未知 slug 进入 404。
- 关于我页面展示模拟介绍、学习方向和技能方向；没有真实配置的外部联系方式时不渲染虚构链接或空占位。
- 实验室完成独立页面壳和返回内容入口，不实现可操作实验。

### 视觉、响应式与可访问性

- 直接消费 Phase 2 已批准的 token，不新建颜色、字体、Tailwind 配置或组件库。
- 首页 PC 个人区保持明显大于单条内容的视觉体量，但不使用全屏 Hero；手机端改为紧凑单列。
- 导航在 PC 为品牌左、入口右，在手机为两行且不使用汉堡菜单。
- 分类状态不只依赖颜色；可选封面、联系方式等缺失时自然降级且不留空白占位。
- 保留键盘导航、焦点可见性和 `prefers-reduced-motion` 保护。

### 测试与文档

- 更新应用壳测试，并新增页面骨架、共享导航、模拟内容来源、404 与静态控件边界的自动测试。
- 完成 REQ、DEV、PROG、文档索引和项目 README 的状态同步；产品基线不变，不修改 PRD 或 BIZ。

## 本次不包含

- 真实 MDX、frontmatter、内容读取、元数据校验、真实内容发布、图片/代码块/目录渲染。
- 分类筛选、搜索匹配、查询参数、结果数量或无结果状态计算。
- 真实个人联系方式、可操作实验、SEO、`sitemap`、`robots.txt`、部署、远程 CI 核对。
- 独立“全部文章”页面、分页、加载更多、排序、数据库、后端、CMS 或新增依赖。

## 已确认决策

- 内容详情采用 `/content/[slug]`，避免与固定页面路由冲突。
- Phase 3 的搜索与分类控件使用清晰的禁用语义，避免呈现看似可用但无行为的假交互；Phase 4 负责以真实内容和逻辑替换。
- 模拟资料与模拟内容仅用于页面、路由和视觉验证，不是 Phase 4 的内容模型或发布格式。
- 实验室本阶段只建立读者可见的独立页面结构，实际实验留给 Phase 5。
- 本阶段创建独立 DEV，固定路由、组件边界、模拟数据接口、测试方案和禁止提前实现的边界。

## 预期文件

### 新增

- `docs/REQ-20260724-05-phase-3-page-shells.md`
- `docs/DEV-20260724-05-phase-3-page-shells.md`
- `src/app/about/page.tsx`
- `src/app/content/[slug]/page.tsx`
- `src/app/lab/page.tsx`
- `src/app/not-found.tsx`
- 共享站点组件、内容卡片组件、模拟资料与模拟内容源、页面骨架测试

### 修改

- `src/app/layout.tsx`
- `src/app/page.tsx`
- `src/app/globals.css`
- `tests/app-shell.test.tsx`
- `docs/README.md`
- `docs/PROG-20260724.md`
- `README.md`

## 验收标准

- 首页、内容详情、关于我、实验室和 404 页面均可访问；未知地址与未知模拟 slug 正确进入 404。
- 首页和内容详情只消费同一模拟内容集合，不存在页面专属的平行内容数据。
- 首页个人区、内容发现区、静态搜索与分类控件、内容列表以及详情/404 返回路径符合 Phase 2 结构。
- 搜索与分类没有任何筛选、匹配、URL 状态或结果计算实现，并以禁用语义避免假交互。
- 共享导航和页脚在 PC 与手机端可用；键盘可跳至主内容，当前页面状态不只由颜色表达。
- 缺少封面或联系方式时不显示空白占位或虚构外链。
- 现有 token 自动契约继续通过；新增测试覆盖共享框架、核心路由、统一模拟来源和静态控件边界。
- `corepack pnpm format:check`、`typecheck`、`lint`、`test`、`build`、`check`、`peers check`、`audit --prod` 与 `git diff --check` 均通过。
- 从桌面与手机尺寸人工复核首页比例、导航、主路径、刷新、站内跳转、键盘访问和减少动效模式。
- 不新增真实内容系统、搜索逻辑、可操作实验、SEO、远程推送或部署。

## 风险与处置

- 禁用控件若缺乏语义与视觉提示，可能被误解为失效功能；实施时必须同时使用原生禁用属性、文案与非颜色状态。
- 模拟内容若被扩展为解析器或发布格式，会与 Phase 4 的真实 MDX 方案重复；本阶段只保留可删除的 TypeScript 常量与最小读取函数。
- token 首次用于中文页面可能暴露字号、宽度或个人区比例问题；以人工桌面/手机复核作为验收，不擅自修改 token。
- 远程 CI 与 Netlify 未验证仍是项目级风险，但不阻塞本地页面骨架实现。

## 当前验证证据

- 用户于 2026-07-24 批准本 REQ 的范围、非目标、路由约定、静态控件边界和模拟内容策略。
- 本 REQ 创建前已核对工作树干净；未修改应用代码、未提交、未推送、未部署。

## 遗留问题

- 真实 MDX 内容模型、搜索/分类和 URL 查询状态由 Phase 4 REQ 与 DEV 决定。
- 可操作实验、真实个人资料和联系方式由 Phase 5 决定。
- 远程 CI、SEO 与部署按既定后续 Phase 验证。

## 批准记录

- 2026-07-24：用户批准本 REQ，并批准创建独立 `DEV-20260724-05`；批准不包含页面代码、提交、推送或部署授权。

## 实施启动记录

- 2026-07-24：在 `codex/phase-3-page-shells` 隔离 worktree 开始实施；用户已授权当前会话内联执行，未使用子代理。
- 模拟内容、共享框架、首页、内容详情、关于我、实验室和 404 已按 TDD 完成定向 RED/GREEN。
- 当前本地验证已通过格式、类型、Lint、5 个测试文件中的 17 项测试、生产构建、peer 检查、桌面与手机人工检查和 Git 差异检查。
- `corepack pnpm audit --prod` 曾因会向外部公告服务发送依赖元数据而被环境策略拦截；用户于当日明确授权后复跑，输出 `No known vulnerabilities found`。

## 完成记录

- 2026-07-24：本 REQ 的全部范围已在 `codex/phase-3-page-shells` 隔离 worktree 完成。首页、`/content/[slug]`、`/about`、`/lab`、404、共享导航、页脚、跳至主内容入口、统一模拟资料与内容卡片均已落地；首页及详情只读取同一份模拟内容集合。
- TDD 证据：模拟来源、应用壳、首页与其他路由均先观察预期 RED，再完成最小实现并转为 GREEN；最终 Vitest 为 5 个测试文件、17 项测试通过。
- 质量证据：`corepack pnpm install --frozen-lockfile`、`corepack pnpm format:check`、`corepack pnpm typecheck`、`corepack pnpm lint`、`corepack pnpm test`、`corepack pnpm build`、`corepack pnpm check`、`corepack pnpm peers check`、`corepack pnpm audit --prod` 与 `git diff --check` 均以零退出码完成；生产审计输出 `No known vulnerabilities found`。
- 人工证据：在 `127.0.0.1:3103` 的 1280px 与 375px 视口检查首页比例、导航、禁用控件、详情与 404 返回路径；Tab 首次聚焦显示“跳到主要内容”，浏览器日志无 warning 或 error。验证后开发服务器已停止，端口 3103 已释放。
- 实施中发现 Vitest 未配置 `@/*` 路径别名；这是测试解析配置与 TypeScript 路径配置不一致，而非页面设计缺陷。为维持最小范围，所有新增模块改用相对导入，未添加依赖或修改 Vite 配置。
- 未执行远程推送、GitHub Actions 远程结果核对、PR、Netlify 部署或公开发布；真实 MDX、搜索与分类行为、URL 状态、SEO、可操作实验和真实联系方式仍按已批准的后续 Phase 推迟。

## 完成后视觉微调记录

- 2026-07-24：用户在本地预览中确认标题视觉过大、过粗。保持 Phase 2 的全局排版 token 值不变，仅调整页面消费层：首页姓名从 display 降为 page title，内容区和其他页面标题降为 section title，内容卡片与关于页二级标题使用更紧凑的 `text-xl`/`sm:text-2xl`，所有标题改为 `font-medium`。导航、按钮、正文和 token 定义未受影响。
- 新增页面骨架回归断言并先观察预期 RED；调整后 `tests/page-shells.test.tsx`、格式、类型和 Lint 检查通过。该微调不改变产品范围、路由、内容模型或后续 Phase 边界。
