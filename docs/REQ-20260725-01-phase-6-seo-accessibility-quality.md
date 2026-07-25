# REQ-20260725-01：Phase 6 SEO、可访问性与质量验证

## 文档信息

- ID：REQ-20260725-01
- 状态：Done
- 创建日期：2026-07-25
- 更新日期：2026-07-25
- 关联产品：[PRD.md](PRD.md)
- 前置需求：[REQ-20260724-06-phase-4-mdx-content-discovery.md](REQ-20260724-06-phase-4-mdx-content-discovery.md)、[REQ-20260724-07-phase-5-profile-lab-responsive.md](REQ-20260724-07-phase-5-profile-lab-responsive.md)
- 关联决策：[BIZ-20260724-01-phase-0-baseline.md](BIZ-20260724-01-phase-0-baseline.md)、[BIZ-20260724-02-phase-2-product-design-decisions.md](BIZ-20260724-02-phase-2-product-design-decisions.md)
- 实施方案：[DEV-20260725-01-phase-6-seo-accessibility-quality.md](DEV-20260725-01-phase-6-seo-accessibility-quality.md)

## 目标

基于已完成的静态 MDX 内容链路、页面壳、公开资料和实验室，完成可验证的基础 SEO、可访问性与异常路径质量闭环，为 Phase 7 的 Netlify 部署与公开访问验证准备可靠产物。

## 已确认输入与决策

- 公开索引范围为首页 `/`、关于页 `/about`、实验室 `/lab` 和所有已发布内容页 `/content/[slug]`；404 页面不进入索引。
- 页面标题采用“页面标题 | Eelex Code Hub”规则；内容详情标题使用内容 `title`，页面简介使用同一内容模型中的 `excerpt`。
- v1 只允许项目内 `/content/*` 本地图片；MDX 图片必须提供非空替代文本，缺失资源必须在发布前验证中失败，不新增客户端图片降级 UI。
- 自动验证继续使用现有 Vitest 与项目质量命令；不引入 Playwright、axe 或其他运行时、测试依赖。
- 人工检查沿用 `320px`、`375px`、`768px` 和 `1280px`，并覆盖键盘、刷新、站内跳转、无效地址与核心阅读路径。
- 正式生产基址由用户在需要手动创建或上线 Netlify 时提供。此前不得猜测、硬编码或以本地地址替代正式 canonical、sitemap 或 robots 中的站点 URL。

## 范围

- 为首页、关于页、实验室、内容详情和 404 建立准确 metadata；内容详情 metadata 必须消费既有统一内容仓库，不建立平行 SEO 内容模型。
- 生成并验证 `sitemap` 与 `robots`，枚举已确认可公开索引的静态路由和已发布内容 slug。
- 审查并在必要时最小修复语义标题层级、跳至主内容、可见焦点、导航当前态、内容发现控件、目录和实验室 radio 的键盘操作。
- 验证 404、无效内容 slug、任意无效地址、空内容集合、本地 MDX 图片异常、刷新与站内跳转。
- 为上述行为补充定向自动测试，并完成生产构建和约定视口的人工浏览器检查。

## 非目标

- 不修改内容分类、搜索规则、无 URL 的搜索状态、内容详情目录、静态路由策略、公开资料、实验室功能或阅读密度的状态策略。
- 不增加远程图片、外链字体、第三方统计、RSS、Open Graph 图片、CMS、后端、数据库、登录或任何新依赖。
- 不创建 Netlify 站点、不设置 Netlify 环境变量、不推送、不创建 PR、不运行远程 CI、不部署、不验证公开地区访问或 Netlify 用量。
- 不制作 GitHub README 展示素材或项目复盘；这些内容属于 Phase 7。

## 验收标准

- 首页、关于页、实验室、内容详情和 404 均具有准确、可测试的标题与简介；内容详情标题和简介来自现有 `ContentSummary`。
- 用户提供正式生产基址后，`sitemap` 只列出 `/`、`/about`、`/lab` 与所有有效内容页，且 URL 绝对、无重复；`robots` 允许公开页面抓取并引用该 sitemap，404 为 `noindex`。
- 无效 slug 与任意未知路由呈现可访问的 404；空内容集合和缺失本地图片都有稳定、可测试的结果。
- 本地 MDX 图片引用都存在于允许的本地目录，并具有非空替代文本；当前图片、代码块和目录继续正常渲染。
- 在 `320px`、`375px`、`768px` 和 `1280px` 下，核心页面无横向溢出；跳至主内容、导航、筛选、目录、外链和实验室 radio 可用，键盘焦点始终可见。
- 定向测试及 `corepack pnpm format:check`、`typecheck`、`lint`、`test`、`build`、`check` 和 `git diff --check` 通过；既有 lint warning 与本期新增问题分开记录。
- REQ、DEV、实施计划、PRD、PROG 和文档索引记录范围、验证证据、未执行检查和 Phase 7 边界。

## 依赖与边界

- 依赖 Phase 4 的 `src/content` 统一内容模型、内容校验、静态 slug 路由和详情目录。
- 依赖 Phase 5 的响应式基线、全局焦点样式、减少动效规则、键盘验证和实验室隔离。
- Phase 6 只消费现有内容、资料和实验模块；不得让 SEO、核心阅读页或内容仓库依赖具体实验实现。
- 正式 Netlify 地址、实际部署、远程 CI、地区访问、基础用量和公开展示均留给 Phase 7。

## 风险与处置

- sitemap 与 canonical URL 需要正式生产基址。实现到该步骤时必须先提示用户创建或确认 Netlify 地址；没有地址时不得用推测值继续完成该子任务。
- Vitest 使用 Node 环境，不能独立证明真实浏览器中的焦点可见性、页面刷新和触控布局；这些验收必须保留人工浏览器证据。
- 当前 MDX 图片没有统一组件层。优先增加发布前本地资源校验，避免为了单一异常情形引入客户端状态、外部资源或额外依赖。
- 当前工作区包含用户保留的历史文档、标题微调和 Phase 5 文档改动；实施必须隔离，不能覆盖、自动暂存或混入后续提交。

## 批准记录

- 2026-07-25：基于 PRD、v1 路线、Phase 4/5 REQ、DEV、计划、当前工程与测试完成草案；未修改应用代码、测试、依赖、锁文件、Git 历史、远程或部署配置。
- 2026-07-25：用户批准本需求及全部已列产品与技术决策。正式生产基址保留至需要手动创建或上线 Netlify 时由用户提供；在此之前不得实施依赖该地址的最终 sitemap、canonical 或 robots URL。
- 2026-07-25：用户确认开始实施。metadata、canonical、sitemap、robots 与 MDX 正文图片校验已在隔离 worktree 完成自动验证；最终人工浏览器视口、键盘与刷新检查尚未完成，因此需求保持 `In Progress`。未推送、未部署。

## 完成记录

- 2026-07-25：已在隔离 worktree `codex/phase-6-seo-accessibility-quality` 完成统一 SEO 配置、页面和详情 metadata、canonical、`sitemap.xml`、`robots.txt`、404 `noindex` 与 MDX 本地图片发布前校验；未新增依赖、锁文件或部署配置。
- 2026-07-25：自动验证证据为 `corepack pnpm check`、`git diff --check` 均以退出码 0 完成；`check` 包含格式、类型、lint、12 个测试文件共 33 项测试和生产构建。生产构建已生成 `/robots.txt` 与 `/sitemap.xml`。lint 仅保留 `src/content/repository.ts` 的 4 条既有未使用参数 warning，没有 error 或本期新增 warning。
- 2026-07-25：本地 HTTP 核对确认首页、有效内容详情、`/sitemap.xml` 与 `/robots.txt` 返回 200；无效内容 slug 和未知地址返回 404。用户已完成 `320px`、`375px`、`768px`、`1280px` 的人工浏览器、键盘、刷新和站内跳转检查并确认通过。
- 2026-07-25：为使隔离预览与既有线上页面的标题粗细一致，预览 worktree 临时同步了 main 中既有的 Phase 3 标题微调；用户复测确认字体一致。该组既有改动不属于 Phase 6，未修改 main，也不得混入后续 Phase 6 提交。
- 未执行：未提交、未推送、未创建 PR、未运行远程 CI、未部署，亦未进行 Phase 7 所属的公开地区可访问性与 Netlify 用量验证。
- 后续：Phase 7 负责在用户单独授权后处理实际部署、正式公开地址验收、远程 CI、地区访问和 GitHub 项目首页收尾。
