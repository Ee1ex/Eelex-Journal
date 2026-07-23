# REQ-20260724-01：Phase 0 项目基础

## 文档信息

- ID：REQ-20260724-01
- 状态：Done
- 创建日期：2026-07-24
- 更新日期：2026-07-24
- 产品基线：[`PRD.md`](PRD.md)
- 关联决策：[`BIZ-20260724-01-phase-0-baseline.md`](BIZ-20260724-01-phase-0-baseline.md)
- 技术方案：[`DEV-20260724-01-v1-architecture-roadmap.md`](DEV-20260724-01-v1-architecture-roadmap.md)
- 进度记录：[`PROG-20260724.md`](PROG-20260724.md)

## 目标

在不编写任何应用代码的前提下，建立 Eelex Code Hub 的 Phase 0 文档体系，固化 v1 产品范围、业务决策、技术方向、阶段计划、Agent 协作规则和自动文档收尾机制。

## 本次范围

- 保留本轮开始时读取到的 `AGENTS.md` 原始规则，并追加项目级规则和文档路由。
- 创建 `CLAUDE.md` 作为 `AGENTS.md` 的单一兼容入口。
- 创建面向 GitHub 的基础 `README.md`。
- 创建 `docs/README.md` 文档治理与当前索引。
- 创建 `docs/PRD.md` 产品基线。
- 创建本 REQ。
- 创建 Phase 0 BIZ、v1 DEV 和当日 PROG。
- 创建 `docs/ai-rules/README.md` 详细工程规则。
- 建立 Documentation Closeout Gate。
- 检查文档职责、引用关系、范围、矛盾和模糊占位。

## 本次不包含

- 不创建 Next.js 工程。
- 不编写页面、组件、样式、脚本或测试代码。
- 不安装依赖。
- 不初始化 Git 仓库或远程仓库。
- 不部署 Netlify。
- 不创建环境变量或部署配置。
- 不创建设计稿、Logo、截图或 README 视觉头图。
- 不创建 BUG 文档，因为当前没有已确认缺陷。
- 不决定未经验证的依赖版本。

## 交付文件

- `AGENTS.md`
- `CLAUDE.md`
- `README.md`
- `docs/README.md`
- `docs/PRD.md`
- `docs/ai-rules/README.md`
- `docs/REQ-20260724-01-phase-0-foundation.md`
- `docs/BIZ-20260724-01-phase-0-baseline.md`
- `docs/DEV-20260724-01-v1-architecture-roadmap.md`
- `docs/PROG-20260724.md`

## 验收标准

- 所有交付文件存在且可以按 UTF-8 正常读取。
- `AGENTS.md` 只包含 Agent 行为、工作流和项目硬边界，不复制完整产品需求。
- `PRD.md` 包含已确认的 v1 页面、功能、非目标、路径和完成标准。
- BIZ 记录关键选择、理由、替代方案和影响。
- DEV 记录技术方向、模块边界、阶段计划和每阶段 DoD。
- PROG 记录当前真实状态、验证证据、问题和下一步。
- `docs/README.md` 定义文档状态、引用关系、历史保留和自动收尾门禁。
- 当前文档之间的相对链接有效。
- 没有空白章节、模糊占位、虚构结果或未确认版本号。
- 没有创建应用代码、依赖、工程配置或虚假 BUG。
- 原有 `AGENTS.md` 内容已经按本轮起始版本恢复并保留。

## 验证证据

- 2026-07-24 清点结果：共 10 个 Markdown 文件，覆盖全部约定交付物。
- 非 Markdown 文件清点结果为零；未创建应用代码、依赖或工程配置。
- 相对 Markdown 链接检查结果为零个断链。
- 常见模糊占位标记扫描结果为零。
- `CLAUDE.md` 仅包含 `@AGENTS.md`。
- Git 状态检查确认当前仍不是 Git 仓库。
- 原始 `AGENTS.md` 曾在工作区外部变化中消失，已依据本轮开始时读取到的完整内容恢复，并在其后追加项目规则。
- `.git` 和 `.agents` 是空目录，不构成 Git 仓库或应用工程；未在本轮擅自删除。

## 验收结果

- Phase 0 全部验收标准通过。
- 代码、测试和运行时验证：Not Applicable，本 REQ 明确禁止创建应用代码。
- 部署验证：Not Applicable，部署属于 Phase 7。

## 遗留问题

- Next.js、TypeScript、Tailwind CSS 和 MDX 的具体版本在 Phase 1 开始前核验。
- Git 仓库、远程仓库和分支策略在 Phase 1 建立。
- GitHub README 的最终视觉展示在 Phase 7 基于真实成品设计。
- Phase 1 开始时检查并处理当前空的 `.git` 和 `.agents` 目录。
