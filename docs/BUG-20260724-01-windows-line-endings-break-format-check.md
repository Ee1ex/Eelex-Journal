# BUG-20260724-01：Windows 检出换行导致格式门禁失败

## 文档信息

- ID：BUG-20260724-01
- 状态：Verified
- 创建日期：2026-07-24
- 更新日期：2026-07-24
- 来源需求：[`REQ-20260724-03-p2-preflight-engineering-hardening.md`](REQ-20260724-03-p2-preflight-engineering-hardening.md)
- 关联方案：[`DEV-20260724-03-p2-preflight-engineering-hardening.md`](DEV-20260724-03-p2-preflight-engineering-hardening.md)

## 缺陷摘要

P2 前置工程加固分支在隔离 worktree 内通过 `format:check`，但 fast-forward 合入 Windows 的 `main` 根工作区后，`corepack pnpm check` 在 Prettier 阶段失败。仓库只通过 `.editorconfig` 声明 LF，没有约束 Git checkout 的换行转换，因此质量门禁不能跨工作区稳定复现。

## 复现环境

- Windows
- Git 系统配置：`core.autocrlf=true`
- Node.js：`24.18.0`
- Corepack pnpm：`11.17.0`
- 基线提交：`e25782d`

## 复现步骤

1. 在 `main` 根工作区 fast-forward 合入 `p2-preflight-engineering-hardening`。
2. 执行 `corepack pnpm install --frozen-lockfile`。
3. 执行 `corepack pnpm check`。
4. 使用 `git ls-files --eol package.json eslint.config.mjs .github/workflows/ci.yml` 对比根工作区与隔离 worktree。

## 预期结果

- `corepack pnpm check` 在受支持的开发环境中通过。
- Git 工作区中的受管文本文件统一使用 LF，不受用户级 `core.autocrlf` 影响。

## 实际结果

- Prettier 报告 16 个源码、配置、测试或 workflow 文件格式不合规并以退出码 `1` 结束。
- 根工作区显示 `i/lf w/crlf`，隔离 worktree 显示 `i/lf w/lf`。
- 仓库不存在 `.gitattributes`，因此 `.editorconfig` 无法阻止 Git 在 checkout 时转换换行。

## 根因

`.editorconfig` 只约束支持它的编辑器和工具，不控制 Git 的 checkout/commit 文本规范化。仓库缺少 `.gitattributes`，使系统级 `core.autocrlf=true` 可以把索引中的 LF 转换为工作区 CRLF，导致 Prettier 的 LF 基线在不同工作区产生不一致结果。

## 修复

- 新增 `.gitattributes`，以 `* text=auto eol=lf` 固定受管文本文件的工作区换行为 LF。
- 扩展 `tests/engineering-config.test.ts`，精确断言该仓库级换行契约。
- 合入 `main` 后仅刷新已确认无内容差异的受影响文件，再从仓库根目录重跑完整验证。

## 验证证据

- RED：缺少 `.gitattributes` 时，工程配置契约为 6 项中 1 项失败，实际值为空、预期为 `* text=auto eol=lf`。
- GREEN：新增 `.gitattributes` 后，同一工程配置契约 6/6 通过。
- `corepack pnpm format:check` 在修复分支通过。
- `git ls-files --eol` 在修复分支显示 `attr/text=auto eol=lf`。

## 关闭条件

- 修复提交 fast-forward 合入本地 `main`。
- `main` 根工作区的受管文件显示 `w/lf`。
- `corepack pnpm check`、`peers check`、`audit --prod` 与 `git diff --check` 全部通过。
- 完成后将状态从 `Verified` 更新为 `Closed`，并在当日 PROG 追加证据。
