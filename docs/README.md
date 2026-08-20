# 文档治理与当前索引

本文档规定 Eelex Blog 的文档分类、权威关系、状态流转、历史保留和自动收尾规则。

## 当前权威文档

| 类型 | 当前文档 | 状态 | 用途 |
| --- | --- | --- | --- |
| PRD | [`PRD.md`](PRD.md) | Approved | 当前有效的产品基线 |
| REQ（Eelex Blog 改名） | [`REQ-20260820-06-eelex-blog-rename.md`](REQ-20260820-06-eelex-blog-rename.md) | Done | 正式品牌、包名与目标仓库身份统一 |
| REQ（静态滚动横幅） | [`REQ-20260820-05-static-scrolling-banner.md`](REQ-20260820-05-static-scrolling-banner.md) | Done | 取消波浪、底部同色渐隐与随页面滚动消失 |
| REQ（横幅动效与裁切修正） | [`REQ-20260820-04-banner-motion-crop-github-mark.md`](REQ-20260820-04-banner-motion-crop-github-mark.md) | Done | GitHub 官方图标、默认纯色、波浪动效与横幅裁切 |
| REQ（横幅与导航图标） | [`REQ-20260820-03-banner-icons-profile.md`](REQ-20260820-03-banner-icons-profile.md) | Done | 个人简介、弹层方向、导航图标与横幅水波纹 |
| REQ（导航与弹层修正） | [`REQ-20260820-02-navigation-popover-polish.md`](REQ-20260820-02-navigation-popover-polish.md) | Done | 导航对齐、弹层互斥、菜单分组、GitHub 头像与公告行为 |
| REQ（参考博客体验） | [`REQ-20260820-01-reference-blog-experience.md`](REQ-20260820-01-reference-blog-experience.md) | Done | 知识库式全站体验、单列封面与静态扩展能力 |
| REQ | [`REQ-20260724-05-phase-3-page-shells.md`](REQ-20260724-05-phase-3-page-shells.md) | Done | Phase 3 页面骨架与模拟内容 |
| REQ（Phase 4） | [`REQ-20260724-06-phase-4-mdx-content-discovery.md`](REQ-20260724-06-phase-4-mdx-content-discovery.md) | Done | 真实 MDX 内容模型、内容发现与阅读链路 |
| REQ（Phase 5） | [`REQ-20260724-07-phase-5-profile-lab-responsive.md`](REQ-20260724-07-phase-5-profile-lab-responsive.md) | Done | 公开个人资料、独立交互实验与响应式体验 |
| REQ（Phase 6） | [`REQ-20260725-01-phase-6-seo-accessibility-quality.md`](REQ-20260725-01-phase-6-seo-accessibility-quality.md) | Done | 基础 SEO、可访问性、异常路径与质量验证 |
| REQ（视觉刷新） | [`REQ-20260725-02-visual-refresh.md`](REQ-20260725-02-visual-refresh.md) | Done | 阅读画廊正式 UI、实验室移除与页面一致性 |
| REQ（首页 Demo） | [`REQ-20260811-01-home-editorial-demo.md`](REQ-20260811-01-home-editorial-demo.md) | Done | 首页编辑型视觉 Demo、原有内容与交互保留 |
| REQ（Phase 7） | [`REQ-20260725-03-phase-7-release-github-closure.md`](REQ-20260725-03-phase-7-release-github-closure.md) | Done | 自动静态发布、公开验证与 GitHub 项目首页收尾；用量观察已获豁免 |
| BIZ（v1 基线） | [`BIZ-20260724-01-phase-0-baseline.md`](BIZ-20260724-01-phase-0-baseline.md) | Approved | 未被后续决策替代的 Phase 0 产品与技术选择 |
| BIZ（Phase 2） | [`BIZ-20260724-02-phase-2-product-design-decisions.md`](BIZ-20260724-02-phase-2-product-design-decisions.md) | Approved | 首页内容发现、轻量搜索与视觉方向 |
| BIZ（视觉刷新） | [`BIZ-20260725-03-visual-refresh.md`](BIZ-20260725-03-visual-refresh.md) | Approved | 阅读画廊视觉基线、实验室取消与页面层级 |
| BIZ（首页 Demo） | [`BIZ-20260811-01-home-editorial-demo.md`](BIZ-20260811-01-home-editorial-demo.md) | Approved | 首页暖白编辑目录视觉与全站扩展边界 |
| BIZ（参考博客体验） | [`BIZ-20260820-01-reference-blog-scope.md`](BIZ-20260820-01-reference-blog-scope.md) | Approved | 参考站复刻边界、单列封面与商业扩展策略 |
| BIZ（Phase 7） | [`BIZ-20260725-04-phase-7-observability-waiver.md`](BIZ-20260725-04-phase-7-observability-waiver.md) | Approved | 用户批准免除用量观察，完成发布闭环收尾 |
| DEV | [`DEV-20260724-01-v1-architecture-roadmap.md`](DEV-20260724-01-v1-architecture-roadmap.md) | Approved | v1 架构、模块和阶段计划 |
| DEV（Phase 1） | [`DEV-20260724-02-phase-1-engineering-foundation.md`](DEV-20260724-02-phase-1-engineering-foundation.md) | Approved | Phase 1 工程基线与实施方案 |
| DEV（P2 前置） | [`DEV-20260724-03-p2-preflight-engineering-hardening.md`](DEV-20260724-03-p2-preflight-engineering-hardening.md) | Approved | 依赖安全、工具链、CI 与格式化方案 |
| DEV（Phase 2） | [`DEV-20260724-04-phase-2-design-foundation.md`](DEV-20260724-04-phase-2-design-foundation.md) | Approved | 设计 token、低保真结构与验证方案 |
| DEV（Phase 3） | [`DEV-20260724-05-phase-3-page-shells.md`](DEV-20260724-05-phase-3-page-shells.md) | Approved | 页面路由、共享框架、模拟来源与测试方案 |
| DEV（Phase 4） | [`DEV-20260724-06-phase-4-mdx-content-discovery.md`](DEV-20260724-06-phase-4-mdx-content-discovery.md) | Approved | MDX 读取、校验、发现状态、渲染与测试方案 |
| DEV（Phase 5） | [`DEV-20260724-07-phase-5-profile-lab-responsive.md`](DEV-20260724-07-phase-5-profile-lab-responsive.md) | Approved | 公开资料模型、阅读密度实验、响应式与验证方案 |
| DEV（Phase 6） | [`DEV-20260725-01-phase-6-seo-accessibility-quality.md`](DEV-20260725-01-phase-6-seo-accessibility-quality.md) | Approved | metadata、sitemap、robots、内容资产校验与质量验证方案 |
| DEV（视觉刷新） | [`DEV-20260725-02-visual-refresh.md`](DEV-20260725-02-visual-refresh.md) | Approved | 表现层迁移、实验室删除与回归验证方案 |
| DEV（首页 Demo） | [`DEV-20260811-01-home-editorial-demo.md`](DEV-20260811-01-home-editorial-demo.md) | Approved | 首页表现层、token、交互保留与验证方案 |
| DEV（参考博客体验） | [`DEV-20260820-01-reference-blog-implementation.md`](DEV-20260820-01-reference-blog-implementation.md) | Approved | 静态派生页面、全站壳、主题与阅读增强实施方案 |
| DEV（横幅动效与裁切修正） | [`DEV-20260820-02-banner-motion-crop-github-mark.md`](DEV-20260820-02-banner-motion-crop-github-mark.md) | Approved | 官方 GitHub 图标、波浪降级与横幅深度实施方案 |
| DEV（静态发布） | [`DEV-20260725-03-netlify-static-export.md`](DEV-20260725-03-netlify-static-export.md) | Approved | Netlify Drop 静态导出与旧路由清除方案 |
| DEV（Eelex Blog 改名） | [`DEV-20260820-03-eelex-blog-rename.md`](DEV-20260820-03-eelex-blog-rename.md) | Approved | 品牌改名、验证、远程仓库改名与回滚准备 |
| DEV（Phase 7） | [`DEV-20260725-04-phase-7-release-github-closure.md`](DEV-20260725-04-phase-7-release-github-closure.md) | Approved | GitHub 自动发布、公开验收、用量证据与 README 收尾方案 |
| PLAN（P2 前置） | [`superpowers/plans/2026-07-24-p2-preflight-engineering-hardening.md`](superpowers/plans/2026-07-24-p2-preflight-engineering-hardening.md) | Completed | P2 前置工程加固逐任务实施计划 |
| PLAN（Phase 2） | [`superpowers/plans/2026-07-24-phase-2-design-foundation.md`](superpowers/plans/2026-07-24-phase-2-design-foundation.md) | Completed | 设计 token RED/GREEN、质量门禁与收尾计划 |
| PLAN（Phase 3） | [`superpowers/plans/2026-07-24-phase-3-page-shells.md`](superpowers/plans/2026-07-24-phase-3-page-shells.md) | Completed | 页面骨架、模拟来源、路由与收尾计划 |
| PLAN（Phase 4） | [`superpowers/plans/2026-07-24-phase-4-mdx-content-discovery.md`](superpowers/plans/2026-07-24-phase-4-mdx-content-discovery.md) | Completed | 真实 MDX、内容发现、详情和验证 |
| PLAN（Phase 5） | [`superpowers/plans/2026-07-24-phase-5-profile-lab-responsive.md`](superpowers/plans/2026-07-24-phase-5-profile-lab-responsive.md) | Completed | 公开资料、阅读密度实验、响应式与验证 |
| PLAN（Phase 6） | [`superpowers/plans/2026-07-25-phase-6-seo-accessibility-quality.md`](superpowers/plans/2026-07-25-phase-6-seo-accessibility-quality.md) | Completed | SEO、可访问性、异常路径与质量验证逐任务计划 |
| PLAN（视觉刷新） | [`superpowers/plans/2026-07-25-visual-refresh.md`](superpowers/plans/2026-07-25-visual-refresh.md) | Completed | 阅读画廊 UI、实验室移除、验证与文档收尾 |
| PLAN（首页 Demo） | [`superpowers/plans/2026-08-11-home-editorial-demo.md`](superpowers/plans/2026-08-11-home-editorial-demo.md) | Completed | 首页编辑型视觉、交互回归、质量门禁与文档收尾 |
| PLAN（Phase 7） | [`superpowers/plans/2026-07-25-phase-7-release-github-closure.md`](superpowers/plans/2026-07-25-phase-7-release-github-closure.md) | Completed | README、自动静态发布、公开验证与文档收尾 |
| PROG | [`PROG-20260725.md`](PROG-20260725.md) | Active | 当前进度、证据和下一步 |
| PROG（2026-08-11） | [`PROG-20260811.md`](PROG-20260811.md) | Active | 首页编辑型视觉 Demo 进度、验证证据和下一步 |
| PROG（2026-08-20） | [`PROG-20260820.md`](PROG-20260820.md) | Completed | 参考博客体验改造进度与验证证据 |
| BUG | [`BUG-20260724-01-windows-line-endings-break-format-check.md`](BUG-20260724-01-windows-line-endings-break-format-check.md) | Closed | Windows Git checkout 换行缺陷已通过 `.gitattributes` 修复并完成 `main` 根目录终验 |
| BUG | [`BUG-20260725-01-netlify-stale-lab-route.md`](BUG-20260725-01-netlify-stale-lab-route.md) | Closed | Netlify Next 构建产物保留已删除的 `/lab` 路由，已通过静态导出修复 |

## 文档分类

| 类型 | 命名格式 | 唯一职责 | 创建条件 |
| --- | --- | --- | --- |
| PRD | `PRD.md` | 维护当前有效的产品事实和版本范围 | 项目建立产品基线时 |
| REQ | `REQ-YYYYMMDD-XX-slug.md` | 定义一次需求或阶段任务的范围与验收标准 | 新功能、大范围改造或新 Phase 开始前 |
| PROG | `PROG-YYYYMMDD.md` | 记录当日进度、证据、问题和下一步 | 当天有项目工作时 |
| BUG | `BUG-YYYYMMDD-XX-slug.md` | 记录已确认、可复现且违反 REQ 的缺陷 | 缺陷完成复现并确认来源 REQ 后 |
| BIZ | `BIZ-YYYYMMDD-XX-slug.md` | 记录产品、范围和业务决策及理由 | 产品路径或范围需要选择时 |
| DEV | `DEV-YYYYMMDD-XX-slug.md` | 记录技术方案、模块拆解和阶段实施方法 | 复杂模块或阶段需要技术设计时 |

文件名中的 `XX` 从 `01` 开始，按同一日期和文档类型递增；`slug` 使用简短英文小写单词和连字符。

## 必要字段

记录型文档必须明确：

- ID、标题、状态、创建日期和更新日期
- 关联文档
- 目标、范围与非目标
- 决策或方案
- 验收标准与验证证据
- 遗留问题

没有适用内容时写明事实及原因，不使用模糊占位文本。

## 状态流转

- REQ：`Draft → Approved → In Progress → Done → Superseded`
- BIZ / DEV：`Proposed → Approved → Superseded`
- BUG：`Confirmed → Fixing → Verified → Closed`
- PROG：按日期追加记录，不回写过去的事实

`Done`、`Verified` 和 `Closed` 必须附带可检查的验证证据。

## 权威关系

- 用户当前明确要求高于仓库内已有文档。
- `AGENTS.md` 管理 Agent 行为，不定义产品事实。
- `PRD.md` 与当前已批准 REQ 共同定义产品和任务目标；冲突时停止实施并先同步两者。
- BIZ 解释为什么做出产品或范围选择，不得脱离 PRD 或 REQ。
- DEV 解释如何实现，不能擅自改变 PRD、REQ 或 BIZ。
- PROG 只记录状态和证据，不能改变需求或技术决策。
- 现有代码和测试反映当前行为，但不能自动覆盖更高层文档。

## 关联规则

- REQ 必须引用适用的 PRD 范围。
- BIZ 必须引用对应 REQ；项目基础决策可以直接引用 PRD。
- DEV 必须引用对应 REQ，并引用影响方案的 BIZ。
- PROG 必须引用当天处理的 REQ、DEV 或 BUG。
- BUG 必须引用被违反的来源 REQ。
- PRD 因需求变化而更新时，必须关联导致变化的 REQ 或 BIZ。

## 活文档与记录文档

### 活文档

`README.md`、`docs/README.md` 和 `PRD.md` 用于呈现当前事实，可以受控更新，但必须：

- 在变更记录中说明日期、原因和关联文档。
- 不静默移除仍有历史意义的决策。
- 重大版本变化时保留旧版本快照。
- Git 初始化后依靠提交历史保留每次修改前内容。

### 记录文档

REQ、PROG、BUG、BIZ 和 DEV 原则上只追加：

- 已批准正文不静默删除或重写。
- 状态变化、完成证据和补充说明追加到原文。
- 旧结论失效时标记 `Superseded`。
- 新文档通过 `Supersedes` 指向旧文档。
- 错误内容通过“更正记录”说明，不抹除原始记录。

## 按需加载顺序

1. 根目录 `AGENTS.md`
2. 本文件中的当前权威文档索引
3. `PRD.md`
4. 最新 PROG
5. 当前 REQ
6. 当前任务关联的 BIZ、DEV 和 BUG
7. 受影响的代码、配置和测试

不默认读取全部历史记录。历史文档只在追溯决策、处理冲突或验证回归时加载。

## Documentation Closeout Gate

每次任务或 Phase 结束前，Agent 必须自动完成：

1. 更新当前 REQ 的状态、验收结果和验证证据。
2. 在当日 PROG 追加完成内容、问题、阻塞和下一步。
3. 修复缺陷时更新对应 BUG 的状态和验证证据。
4. 产品范围或业务决策变化时创建或更新 BIZ。
5. 架构、模块或实施方案变化时创建或更新 DEV。
6. 产品基线变化时同步 PRD，并追加变更记录。
7. 更新本文件的当前文档索引和状态。
8. 检查新增内容是否正确关联 REQ、BIZ、DEV 或 BUG。
9. 检查是否误删记录、产生矛盾或留下模糊占位。
10. 文档未同步时，不得把任务或 Phase 标记为完成。

Phase 完成时，PROG 还必须追加 Phase 目标、DoD 逐项结果、验证证据、未完成事项、遗留风险、推迟需求、下一 Phase 和下一项任务。

## BUG 创建规则

当前 BUG 以本文件权威索引为准。只有同时满足以下条件才创建 BUG：

- 可以稳定复现实际行为。
- 实际行为违反已批准 REQ 或明确验收标准。
- 已记录复现环境、步骤、预期结果和实际结果。
- 可以关联到来源 REQ。

功能建议、范围外想法和尚未证实的异常不登记为 BUG。

## 变更记录

- 2026-08-20：完成 ELX Level 项目介绍文章、专属封面与两张流程说明图的本地实现和验证；用户要求发布至 `Ee1ex/eelex-blog` `main` 并接受其触发现有 Netlify 自动部署，远端结果待 GitHub 回读确认。
- 2026-08-20：完成 `REQ-20260820-06`。站点、SEO、包名、README 与当前治理文档已统一为 `Eelex Blog`；本地质量门禁通过，远程仓库改名、Push、PR 和部署未执行。
- 2026-08-20：用户批准 `REQ-20260820-06` 与 `DEV-20260820-03`，正式品牌统一为 `Eelex Blog`，目标仓库名为 `eelex-blog`；远程仓库改名、Push 与 PR 仍未授权。
- 2026-08-20：用户明确授权将已验收的新版本提交并快进推送至 `main`，接受其触发现有 Netlify 自动生产部署；发布结果以本轮 GitHub 远程回读为准。
- 2026-08-20：完成 `REQ-20260820-05`。横幅波浪已完整移除，底部改为主题同色渐隐，横幅随页面滚动离开视口；未推送或部署。
- 2026-08-20：用户批准 `REQ-20260820-05`，取消水波纹，保留静态横幅和同色渐隐，并让横幅随页面滚动离开视口；未授权推送或部署。
- 2026-08-20：完成 `REQ-20260820-04`。GitHub 官方图标、默认纯色、新横幅裁切与持续水波纹已通过自动化及桌面/移动端浏览器验证；未推送或部署。
- 2026-08-20：用户批准 `REQ-20260820-04` 与 `DEV-20260820-02`，修正 GitHub 图标、默认背景、波浪静止和横幅裁切；未授权推送或部署。
- 2026-08-20：完成 `REQ-20260820-03`。个人简介、统一向右展开的项目/关于弹层、导航图标、用户横幅与四层 SVG 水波纹已通过自动化及桌面/移动端浏览器验证；未推送或部署。
- 2026-08-20：用户批准 `REQ-20260820-03`，更新个人简介、统一弹层向右展开、增加导航图标，并使用用户上传图片实现横幅壁纸与分层水波纹；未授权推送或部署。
- 2026-08-20：完成 `REQ-20260820-02`。导航与首页内容边缘实现 0px 对齐，项目/关于/显示/移动菜单互斥且支持空白点击、搜索聚焦与 Escape 关闭；归档/反馈完成重组，GitHub 真实头像与常驻公告通过自动化及桌面/移动端浏览器验证。
- 2026-08-20：用户批准 `REQ-20260820-02`，修正导航对齐与弹层互斥，将归档/反馈收进项目/关于菜单，同步 GitHub 公开头像并移除公告关闭入口；未授权推送或部署。
- 2026-08-20：完成 `REQ-20260820-01`。全站知识库式体验、单列封面文章、静态归档/搜索/RSS、显示设置与文章阅读增强通过本地自动化和桌面/移动端设计 QA；发布日期保留、日历移除，未推送或部署。
- 2026-08-20：用户确认 `REQ-20260820-01`、`BIZ-20260820-01` 与 `DEV-20260820-01` 的完整功能范围；按 LEVEL 1 连续实施，未授权推送或部署。

- 2026-07-24：建立 Phase 0 文档治理、权威索引和自动收尾门禁，关联 `REQ-20260724-01`。
- 2026-07-24：Phase 0 验证通过，将当前 REQ 状态更新为 `Done`。
- 2026-07-24：创建并批准 Phase 1 REQ 与工程基线 DEV，关联 `REQ-20260724-02`。
- 2026-07-24：Phase 1 合入 `main` 并完成根目录复验；将 `REQ-20260724-02` 更新为 `Done`，关联 PR #1。
- 2026-07-24：创建并批准 `REQ-20260724-03` 与 `DEV-20260724-03`，开始 Phase 2 前置工程加固；产品范围未变化。
- 2026-07-24：完成 `REQ-20260724-03`，并将其状态更新为 `Done`；验证证据、工程版本、安全 override、CI/Dependabot 的本地配置状态和 Phase 2 交接已记录于 REQ、DEV 与 PROG。下一项任务是创建并批准独立的 Phase 2 REQ。
- 2026-07-24：最终工程审查修正 `check` 为直接串联底层工具，并补强工程契约与文档收尾一致性；Phase 1 应用壳及 P2 前置工程加固均已完成，Phase 2 产品实现仍待独立 REQ 批准。
- 2026-07-24：本地合入验证确认 Windows `core.autocrlf` 可使 Prettier 门禁失败；创建 `BUG-20260724-01`，新增 `.gitattributes` 与工程契约。修复待 `main` 根目录终验后关闭。
- 2026-07-24：`BUG-20260724-01` 已在本地 `main` 根目录完成 LF、完整质量门禁、peer 与生产审计复验，状态更新为 `Closed`。
- 2026-07-24：用户批准 `REQ-20260724-04` 与 `BIZ-20260724-02`。首页改为整合全部内容、分类选择和轻量多字段搜索，取消独立“全部文章”页；视觉方向和关键页面低保真结构已确认。`DEV-20260724-04` 当前为 `Proposed`，未获批准前不实施 CSS 或测试。
- 2026-07-24：用户批准 `DEV-20260724-04` 的精确 token、Tailwind CSS v4 映射、对比度门禁和测试方案；下一步创建逐任务实施计划，仍未开始 CSS 或测试改动。
- 2026-07-24：创建 `PLAN（Phase 2）`，状态为 `Ready`；计划拆分为实施状态启动、token 契约 RED/GREEN 和全量验证收尾三个闭环。按用户约束仅允许当前会话内联执行。
- 2026-07-24：完成 `REQ-20260724-04` 的设计 token、自动契约与本地质量门禁；Phase 2 状态更新为 `Done`。未创建正式页面、组件、内容模型、推送或部署；下一项任务是完成本地分支交付，再创建并批准 Phase 3 REQ。
- 2026-07-24：`codex/phase-2-design-foundation` 已快进合入本地 `main`，根目录冻结安装、统一质量门禁、peer 检查、生产依赖审计和 Git 差异检查全部通过；Phase 2 本地交付完成，下一项任务为创建并批准 Phase 3 REQ。
- 2026-07-24：用户另行授权后，本地 `main` 已通过非强制推送同步到 GitHub `origin/main`，远程分支指针与本地提交一致；尚未核对首次远程 CI，未创建 PR 或部署。
- 2026-07-24：用户批准 `REQ-20260724-05` 与 `DEV-20260724-05`。Phase 3 采用全部 v1 页面骨架、共享框架与统一模拟内容闭环；真实 MDX、搜索与分类行为、可操作实验、SEO、远程 CI 核对和部署仍不实施。
- 2026-07-24：创建 `PLAN（Phase 3）`，状态为 `Ready`。计划按模拟来源、共享框架、首页、其他路由与质量收尾拆分为五个可验证闭环；未开始页面实现。
- 2026-07-24：完成 `REQ-20260724-05`。全部 v1 页面骨架、共享框架与统一模拟内容已在隔离 worktree 完成；5 个测试文件、17 项测试和完整本地质量门禁（含生产依赖审计）均通过。真实 MDX、搜索和分类行为、远程 CI 核对与部署仍未实施。
- 2026-07-24：用户确认 Phase 4 的产品决策，创建 `REQ-20260724-06`（Draft）、`DEV-20260724-06`（Proposed）与对应实施计划（Draft）。本次仅完成需求与方案文档；真实 MDX、搜索、分类、依赖和应用代码仍待 REQ 与 DEV 明确批准后实施。
- 2026-07-24：用户批准 `REQ-20260724-06` 与 `DEV-20260724-06`；实施计划状态更新为 `Ready`。Phase 4 可以按已批准范围开始实施，但推送、部署和远程 CI 操作仍需单独授权。
- 2026-07-24：完成 `REQ-20260724-06`。真实 MDX、统一内容校验、首页搜索/分类、结果状态、详情目录、静态 slug 路由和滚动重置均已完成；8 个测试文件、22 项测试、格式、类型、构建和差异检查通过。审计和人工检查按用户指示未执行。
- 2026-07-24：创建并获批 `REQ-20260724-07` 与 `DEV-20260724-07`。Phase 5 固定公开个人资料、独立阅读密度实验、无 URL/无持久化状态和响应式验收边界；本轮未开始实施。
- 2026-07-24：Phase 5 已在隔离分支开始实现并通过本地自动验证；因 `main` 保留未提交改动，尚未集成、推送或部署。
- 2026-07-25：用户批准 `REQ-20260725-01` 与 `DEV-20260725-01`，并创建 Phase 6 实施计划。正式生产 URL 在需要手动创建或上线 Netlify 时由用户提供；此前不猜测 sitemap、canonical 或 robots URL。本次仅更新文档，不实施、不推送或部署。
- 2026-07-25：完成 `REQ-20260725-01`。Phase 6 的 metadata、canonical、sitemap、robots、MDX 图片校验、自动质量门禁及人工浏览器验收均有记录；未提交、推送、部署或运行远程 CI。实际发布、公开地区验证和 Netlify 用量仍属于 Phase 7。
- 2026-07-25：完成 `REQ-20260725-02`。正式站点采用阅读画廊 UI，首页与关于页标题/简介统一为玻璃卡片，实验室及阅读密度交互已移除；9 个测试文件、23 项测试、格式、类型、构建与差异检查通过。未推送、部署或核对远程 CI。
- 2026-07-25：用户批准 `REQ-20260725-03` 与 `DEV-20260725-04`，将 Phase 7 定义为 Netlify GitHub 自动静态发布、公开地区验证、7 天流量观察和真实 GitHub README 收尾；当前仅建立需求与方案文档，尚未实施、提交、推送或部署。
- 2026-07-25：用户确认开始 Phase 7。README 真实素材和项目首页更新已完成，并通过完整本地质量门禁；Netlify 已由用户在浏览器中连接 GitHub，地区与流量证据仍待补齐。
- 2026-07-25：完成 `REQ-20260725-03`。GitHub—Netlify 自动静态发布、公开路由和两地访问验证已完成；用户通过 `BIZ-20260725-04` 明确豁免 Netlify 用量观察，未将未提供的数据作流量结论。
- 2026-08-11：用户批准首页编辑型视觉 Demo 设计；在独立分支 `codex/home-editorial-demo` 完成暖白编辑目录首页、共享导航/页脚和内容列表表现层迁移。内容模型、MDX、搜索、分类、详情路由、关于页和 404 未改；`corepack pnpm check`、`git diff --check` 和本地 HTTP smoke check 通过。浏览器截图与点击级视口验收留给用户本地预览确认，未推送或部署。
