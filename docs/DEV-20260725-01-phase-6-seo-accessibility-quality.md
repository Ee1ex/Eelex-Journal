# DEV-20260725-01：Phase 6 SEO、可访问性与质量验证方案

## 文档信息

- ID：DEV-20260725-01
- 状态：Approved
- 创建日期：2026-07-25
- 更新日期：2026-07-25
- 关联需求：[REQ-20260725-01-phase-6-seo-accessibility-quality.md](REQ-20260725-01-phase-6-seo-accessibility-quality.md)
- 关联决策：[BIZ-20260724-01-phase-0-baseline.md](BIZ-20260724-01-phase-0-baseline.md)、[BIZ-20260724-02-phase-2-product-design-decisions.md](BIZ-20260724-02-phase-2-product-design-decisions.md)
- 前置方案：[DEV-20260724-04-phase-2-design-foundation.md](DEV-20260724-04-phase-2-design-foundation.md)、[DEV-20260724-06-phase-4-mdx-content-discovery.md](DEV-20260724-06-phase-4-mdx-content-discovery.md)、[DEV-20260724-07-phase-5-profile-lab-responsive.md](DEV-20260724-07-phase-5-profile-lab-responsive.md)

## 当前实现与问题定位

- 根布局只有站点级静态 `metadata`；首页、关于页、实验室、内容详情和 404 尚无各自 metadata，内容详情也未实现 `generateMetadata`。
- App Router 已有全局 `not-found.tsx`，内容详情通过 `dynamicParams = false`、`generateStaticParams` 和 `notFound()` 处理无效 slug；但没有对 404 metadata、空内容、刷新和任意未知路由的完整回归证据。
- `src/content/repository.ts` 是所有内容列表、详情和目录的唯一来源。SEO 必须从它取得 `title`、`excerpt`、`publishedAt` 与 slug，不能另建数据集合。
- 当前 MDX 图片由默认 MDX 输出渲染；frontmatter 只校验可选封面字段，尚不验证正文 Markdown 图片路径和替代文本。
- Phase 2/5 已提供 `:focus-visible`、`prefers-reduced-motion`、跳至主内容、语义化导航和原生 radio；Phase 6 只对审查发现的问题作最小修复。

## 技术方案

### 元数据与站点基址

- 建立唯一站点 SEO 配置模块，集中站点名、默认简介、标题模板和正式 `siteUrl`。
- 首页、关于页和实验室使用静态 metadata；内容详情使用 `generateMetadata` 从 `getContentBySlug(slug)` 生成标题、简介和 canonical 路径；404 使用不进入索引的 metadata。
- 不使用运行时 host 推断、本地地址、占位域名或未确认的 Netlify 子域名。到需要写入 `siteUrl`、sitemap 或 robots 前，必须暂停并提示用户手动创建或提供正式 Netlify URL。
- 用户提供地址后，先在配置层解析为绝对 URL 并在测试中固定，再供 metadata、sitemap 和 robots 共用。

### Sitemap 与 robots

- 使用 Next.js App Router 的 `src/app/sitemap.ts` 和 `src/app/robots.ts`，不创建静态复制文件。
- sitemap 固定包含 `/`、`/about`、`/lab`，并从 `getAllContent()` 追加 `/content/${slug}`；`lastModified` 使用已发布内容日期，静态路由不伪造内容更新时间。
- robots 默认允许抓取公开页面，并通过同一 `siteUrl` 引用 sitemap；404 不列入 sitemap，依靠页面 metadata 标记为 `noindex`。

### 图片、异常路径与可访问性

- 在内容读取或专用校验函数中扫描 MDX 正文的 Markdown 图片引用；只接受 `/content/` 本地绝对路径和非空 alt，并确认目标存在于 `public/content`。不接受远程图片、相对路径或无替代文本。
- 缺失或非法图片必须与 frontmatter 校验一样在构建/测试时给出文件名和明确原因；不增加 Client Component 或图片加载失败状态。
- 针对首页、详情、关于页、实验室、404、导航、内容发现、目录和阅读密度实验执行语义与键盘审查。只有发现违反 REQ 的问题时才修改页面或样式。

### 测试与验证边界

- Vitest 负责 metadata 规则、sitemap/robots 枚举、无效 slug、空内容、图片校验和静态语义契约。
- 浏览器人工检查负责四个视口、Tab/Enter/Space/方向键、焦点可见性、直接刷新、站内跳转、横向溢出和浏览器日志。
- 使用现有 `format:check`、`typecheck`、`lint`、`test`、`build`、`check` 与 `git diff --check`；不引入 Playwright、axe 或新的 CI 服务。

## 预期文件边界

### 新增

- `src/site/seo.ts`：站点名、默认简介、标题组装、正式站点基址与绝对 URL 辅助函数。
- `src/app/sitemap.ts`：从统一内容仓库产生公开 URL。
- `src/app/robots.ts`：生成公开抓取规则与 sitemap 地址。
- `tests/seo.test.ts`：metadata、sitemap 与 robots 契约。
- `tests/content-assets.test.ts`：MDX 本地图片路径与替代文本校验。

### 按审查结果最小修改

- `src/app/layout.tsx`
- `src/app/page.tsx`
- `src/app/about/page.tsx`
- `src/app/lab/page.tsx`
- `src/app/content/[slug]/page.tsx`
- `src/app/not-found.tsx`
- `src/content/repository.ts` 或新增的相邻内容校验模块
- `tests/page-shells.test.tsx`、`tests/content-repository.test.ts`
- `src/app/globals.css`（仅在焦点、溢出或减少动效验收发现实际问题时）

### 不修改

- `src/lab/*`、`src/components/lab/*` 的功能和状态策略。
- 内容搜索规则、分类、内容详情目录、静态路由策略、资料字段、依赖与锁文件。
- `next.config.mjs`，除非 Next.js 路由实现无法满足已批准验收且先更新本方案。
- Netlify、GitHub Actions、远程仓库与任何部署配置。

## 风险与决策

- 用户已确认正式 URL 在手动创建或上线 Netlify 时再提供。因此 Phase 6 可先完成不依赖 URL 的测试和审查；写入最终 `siteUrl` 之前必须向用户索取地址，不能以临时 URL 声称 SEO 完成。
- 通过构建期资源校验解决图片异常的根因：避免静态站点发布后才暴露本地资源丢失，也避免为偶发加载错误引入额外客户端复杂度。
- sitemap 是否包含实验室已由用户确认包含；若日后实验室改为私有或临时演示，必须通过新 REQ/DEV 改变 robots/sitemap 决策。
- 当前 `lint` 的 `src/content/repository.ts` 既有 4 条未使用参数 warning 不等于本期回归；只有新增 warning、error 或行为变化才由 Phase 6 处理。

## 验证策略

- 在 URL 已确认后，先以失败测试锁定标题模板、内容详情 metadata、404 `noindex`、sitemap 路由集、robots sitemap URL 与非法图片错误信息。
- 每个最小实现闭环完成后运行对应 Vitest 文件；收尾运行项目完整质量门禁。
- 启动本地生产预览，逐页检查 `/`、`/about`、`/lab`、一个有效内容页、一个无效 slug 和任意未知地址；对有效内容页和首页进行直接刷新。
- 在 `320px`、`375px`、`768px` 与 `1280px` 检查无横向溢出；使用键盘检查 skip link、导航、分类按钮、内容链接、目录链接、外链、radio 方向键与重置按钮。

## 批准记录

- 2026-07-25：创建方案草案，未修改应用代码、测试、依赖、锁文件、Git 历史、远程或部署配置。
- 2026-07-25：用户批准本方案。实施前仍须遵循 REQ 的正式 URL 前置条件；需要手动创建或上线 Netlify 时先提示用户并等待其提供地址。

## 实施与验证记录

- 2026-07-25：用户提供 `https://harmonious-sprite-8b742a.netlify.app/` 后，方案按既定边界在隔离 worktree 实现。`src/site/seo.ts` 成为站点名称、默认简介、标题规则和绝对 URL 的唯一来源；metadata、sitemap 与 robots 共同消费该配置及既有内容仓库。
- 2026-07-25：图片校验在内容读取边界执行，拒绝空 alt、非 `/content/` 路径与不存在资源；未增加客户端降级状态或新依赖。SEO 与内容资产测试覆盖成功与失败契约。
- 2026-07-25：最终 `corepack pnpm check`、`git diff --check` 通过，12 个测试文件共 33 项测试通过；用户完成约定视口、键盘、刷新与站内跳转人工检查并确认通过。未改变本方案的架构边界；未部署、推送或运行远程 CI。
