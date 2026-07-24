# 文档治理与当前索引

本文档规定 Eelex Code Hub 的文档分类、权威关系、状态流转、历史保留和自动收尾规则。

## 当前权威文档

| 类型 | 当前文档 | 状态 | 用途 |
| --- | --- | --- | --- |
| PRD | [`PRD.md`](PRD.md) | Approved | 当前有效的产品基线 |
| REQ | [`REQ-20260724-05-phase-3-page-shells.md`](REQ-20260724-05-phase-3-page-shells.md) | Done | Phase 3 页面骨架与模拟内容 |
| REQ（Phase 4） | [`REQ-20260724-06-phase-4-mdx-content-discovery.md`](REQ-20260724-06-phase-4-mdx-content-discovery.md) | Done | 真实 MDX 内容模型、内容发现与阅读链路 |
| BIZ（v1 基线） | [`BIZ-20260724-01-phase-0-baseline.md`](BIZ-20260724-01-phase-0-baseline.md) | Approved | 未被后续决策替代的 Phase 0 产品与技术选择 |
| BIZ（Phase 2） | [`BIZ-20260724-02-phase-2-product-design-decisions.md`](BIZ-20260724-02-phase-2-product-design-decisions.md) | Approved | 首页内容发现、轻量搜索与视觉方向 |
| DEV | [`DEV-20260724-01-v1-architecture-roadmap.md`](DEV-20260724-01-v1-architecture-roadmap.md) | Approved | v1 架构、模块和阶段计划 |
| DEV（Phase 1） | [`DEV-20260724-02-phase-1-engineering-foundation.md`](DEV-20260724-02-phase-1-engineering-foundation.md) | Approved | Phase 1 工程基线与实施方案 |
| DEV（P2 前置） | [`DEV-20260724-03-p2-preflight-engineering-hardening.md`](DEV-20260724-03-p2-preflight-engineering-hardening.md) | Approved | 依赖安全、工具链、CI 与格式化方案 |
| DEV（Phase 2） | [`DEV-20260724-04-phase-2-design-foundation.md`](DEV-20260724-04-phase-2-design-foundation.md) | Approved | 设计 token、低保真结构与验证方案 |
| DEV（Phase 3） | [`DEV-20260724-05-phase-3-page-shells.md`](DEV-20260724-05-phase-3-page-shells.md) | Approved | 页面路由、共享框架、模拟来源与测试方案 |
| DEV（Phase 4） | [`DEV-20260724-06-phase-4-mdx-content-discovery.md`](DEV-20260724-06-phase-4-mdx-content-discovery.md) | Approved | MDX 读取、校验、发现状态、渲染与测试方案 |
| PLAN（P2 前置） | [`superpowers/plans/2026-07-24-p2-preflight-engineering-hardening.md`](superpowers/plans/2026-07-24-p2-preflight-engineering-hardening.md) | Completed | P2 前置工程加固逐任务实施计划 |
| PLAN（Phase 2） | [`superpowers/plans/2026-07-24-phase-2-design-foundation.md`](superpowers/plans/2026-07-24-phase-2-design-foundation.md) | Completed | 设计 token RED/GREEN、质量门禁与收尾计划 |
| PLAN（Phase 3） | [`superpowers/plans/2026-07-24-phase-3-page-shells.md`](superpowers/plans/2026-07-24-phase-3-page-shells.md) | Completed | 页面骨架、模拟来源、路由与收尾计划 |
| PLAN（Phase 4） | [`superpowers/plans/2026-07-24-phase-4-mdx-content-discovery.md`](superpowers/plans/2026-07-24-phase-4-mdx-content-discovery.md) | Completed | 真实 MDX、内容发现、详情和验证 |
| PROG | [`PROG-20260724.md`](PROG-20260724.md) | Active | 当前进度、证据和下一步 |
| BUG | [`BUG-20260724-01-windows-line-endings-break-format-check.md`](BUG-20260724-01-windows-line-endings-break-format-check.md) | Closed | Windows Git checkout 换行缺陷已通过 `.gitattributes` 修复并完成 `main` 根目录终验 |

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
- 2026-07-24：完成 `REQ-20260724-06`。真实 MDX、统一内容校验、首页搜索/分类、结果状态、详情目录、静态 slug 路由和滚动重置均已完成；8 个测试文件、22 项测试、格式、类型、构建和差异检查通过。审计和人工检查按用户指示未执行。
