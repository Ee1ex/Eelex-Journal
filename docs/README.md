# 文档治理与当前索引

本文档规定 Eelex Code Hub 的文档分类、权威关系、状态流转、历史保留和自动收尾规则。

## 当前权威文档

| 类型 | 当前文档 | 状态 | 用途 |
| --- | --- | --- | --- |
| PRD | [`PRD.md`](PRD.md) | Approved | 当前有效的产品基线 |
| REQ | [`REQ-20260724-03-p2-preflight-engineering-hardening.md`](REQ-20260724-03-p2-preflight-engineering-hardening.md) | In Progress | Phase 2 前置工程加固合同 |
| BIZ | [`BIZ-20260724-01-phase-0-baseline.md`](BIZ-20260724-01-phase-0-baseline.md) | Approved | Phase 0 产品与技术选择 |
| DEV | [`DEV-20260724-01-v1-architecture-roadmap.md`](DEV-20260724-01-v1-architecture-roadmap.md) | Approved | v1 架构、模块和阶段计划 |
| DEV（Phase 1） | [`DEV-20260724-02-phase-1-engineering-foundation.md`](DEV-20260724-02-phase-1-engineering-foundation.md) | Approved | Phase 1 工程基线与实施方案 |
| DEV（P2 前置） | [`DEV-20260724-03-p2-preflight-engineering-hardening.md`](DEV-20260724-03-p2-preflight-engineering-hardening.md) | Approved | 依赖安全、工具链、CI 与格式化方案 |
| PLAN（P2 前置） | [`superpowers/plans/2026-07-24-p2-preflight-engineering-hardening.md`](superpowers/plans/2026-07-24-p2-preflight-engineering-hardening.md) | Active | P2 前置工程加固逐任务实施计划 |
| PROG | [`PROG-20260724.md`](PROG-20260724.md) | Active | 当前进度、证据和下一步 |
| BUG | 当前无记录 | Not Applicable | 项目尚未进入实现阶段 |

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

当前没有 BUG 文档，因为项目尚无实现代码。只有同时满足以下条件才创建 BUG：

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
