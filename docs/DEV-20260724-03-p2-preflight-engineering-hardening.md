# DEV-20260724-03：P2 前置工程加固方案

## 文档信息

- ID：DEV-20260724-03
- 状态：Approved
- 创建日期：2026-07-24
- 更新日期：2026-07-24
- 关联需求：[`REQ-20260724-03-p2-preflight-engineering-hardening.md`](REQ-20260724-03-p2-preflight-engineering-hardening.md)
- 前置方案：[`DEV-20260724-02-phase-1-engineering-foundation.md`](DEV-20260724-02-phase-1-engineering-foundation.md)
- 架构路线：[`DEV-20260724-01-v1-architecture-roadmap.md`](DEV-20260724-01-v1-architecture-roadmap.md)
- 关联决策：[`BIZ-20260724-01-phase-0-baseline.md`](BIZ-20260724-01-phase-0-baseline.md)
- 实施计划：[`superpowers/plans/2026-07-24-p2-preflight-engineering-hardening.md`](superpowers/plans/2026-07-24-p2-preflight-engineering-hardening.md)

## 目标与边界

本方案只加固 Phase 1 工程基线，不改变 v1 产品范围、页面架构、MDX 内容方向或 Phase 顺序。所有改动必须在独立分支完成，并保持应用壳的公开输出不变。

## 版本决策

| 类别 | 当前 | 目标 | 决策 |
| --- | --- | --- | --- |
| Node.js | `24.18.0` | `24.18.0` | 当前 LTS，与 Netlify 默认主版本一致。 |
| pnpm | `11.9.0` | `11.17.0` | 同主版本更新，保持 Corepack 精确锁定。 |
| Next.js | `16.2.11` | `16.2.11` | 当前版本不迁移；定向修复其传递依赖。 |
| React | `19.2.8` | `19.2.8` | 与 Next.js peer 范围一致。 |
| TypeScript | `6.0.3` | `6.0.3` | `typescript-eslint@8.65.0` 正式支持范围上限为 `<6.1.0`。 |
| ESLint | `9.39.5` | `9.39.5` | `eslint-plugin-react@7.37.5` 未声明 ESLint 10 支持。 |
| `@types/node` | `26.1.1` | `24.13.3` | 类型能力与 Node 24 运行时对齐。 |
| Prettier | 未安装 | `3.9.6` | 建立可重复格式化入口。 |
| `eslint-config-prettier` | 未安装 | `10.1.8` | 关闭与 Prettier 冲突的 ESLint 格式规则。 |
| `prettier-plugin-tailwindcss` | 未安装 | `0.8.1` | 按 Tailwind CSS v4 样式入口排序 class。 |

## 安全依赖策略

- `next@16.2.11` 固定 `postcss@8.4.31`，受 GHSA-6g55-p6wh-862q 与 GHSA-qx2v-qp2m-jg93 影响；在 `pnpm-workspace.yaml` 中仅对 `next>postcss` override 为 `8.5.22`。
- `next@16.2.11` 声明可选依赖 `sharp@^0.34.5`，受 GHSA-f88m-g3jw-g9cj 影响；仅对 `next>sharp` override 为 `0.35.3`。
- 不使用 `auditConfig.ignoreGhsas`、`--audit-level` 降级或关闭审计来隐藏风险。
- override 是临时上游边界适配。后续 Next.js 发布原生修复版本时，应移除 override、重新生成锁文件并执行同一验证矩阵。

## 工程配置

### 生成类型

- `next-env.d.ts` 加入 `.gitignore` 并取消跟踪。
- `tsconfig.json` 继续包含 `next-env.d.ts`、`.next/types/**/*.ts` 和 `.next/dev/types/**/*.ts`。
- `typecheck` 改为 `next typegen && tsc --noEmit`，确保全新检出无需先启动开发服务器。

### ESLint

- 加载顺序为 `core-web-vitals`、`typescript`、`eslint-config-prettier/flat`、全局忽略。
- 不禁用 Next.js、React、React Hooks 或 TypeScript 推荐规则。
- 全局忽略覆盖 Next.js/测试/本地 worktree 生成目录和 `next-env.d.ts`。

### Next.js

- 继续使用 App Router、Turbopack 和 `@next/mdx`。
- `pageExtensions` 收紧为 `["ts", "tsx", "md", "mdx"]`，与 `allowJs: false` 一致。
- 不创建 `netlify.toml`，不增加运行时动态能力。

### 格式化

- `.editorconfig` 统一 UTF-8、LF、2 空格、末尾换行和去除行尾空白；Markdown 保留必要尾随空格。
- Prettier 使用 `src/app/globals.css` 作为 Tailwind CSS v4 `tailwindStylesheet`。
- `.prettierignore` 排除依赖、生成目录、worktree、锁文件和治理文档，避免首次接入产生无关重写。
- `format` 只负责写入格式化；`format:check` 用于 CI 和统一 `check`。

### CI 与依赖维护

- `.github/workflows/ci.yml` 在 `push` 到 `main` 与 `pull_request` 触发。
- 使用 `actions/checkout@v6`、`pnpm/action-setup@v6` 和 `actions/setup-node@v6`。
- pnpm/action-setup 从 `packageManager` 读取版本；setup-node 从 `.nvmrc` 读取 Node 并缓存 pnpm store。
- CI 权限只包含 `contents: read`，设置合理超时，不接触部署密钥。
- Dependabot 每周检查 npm/pnpm 依赖和 GitHub Actions；不启用自动合并。

## 工程命令

| 命令 | 作用 |
| --- | --- |
| `corepack pnpm dev` | 启动开发服务器。 |
| `corepack pnpm start` | 启动生产构建服务器。 |
| `corepack pnpm format` | 写入工程源文件和配置格式化。 |
| `corepack pnpm format:check` | 检查格式，不写入。 |
| `corepack pnpm typecheck` | 生成 Next.js 类型并执行 TypeScript 检查。 |
| `corepack pnpm lint` | 执行 Next.js、React、TypeScript Lint。 |
| `corepack pnpm test` | 执行 Vitest。 |
| `corepack pnpm build` | 生成生产构建。 |
| `corepack pnpm check` | 顺序执行格式、类型、Lint、测试和构建。 |
| `corepack pnpm peers check` | 检查 peer 依赖。 |
| `corepack pnpm audit --prod` | 检查生产依赖安全公告。 |

## 测试策略

- 先新增 `tests/engineering-config.test.ts`，让版本、脚本、生成文件、Next 扩展名、TypeScript ESLint 和 CI 契约在旧配置上按预期失败。
- 完成配置后运行同一测试形成 GREEN，并保留现有应用壳测试。
- 锁文件、原生依赖、GitHub Actions 和安全公告不通过模拟验证；使用真实安装、`pnpm why`、`pnpm audit`、`pnpm check`、开发/生产 HTTP 检查验证。
- CI YAML 本地只验证结构和等价命令；真实 GitHub 运行结果在获得推送授权后补录。

## 风险处置

- 若 `sharp@0.35.3` override 导致安装、构建或运行失败，不降低版本或忽略公告；停止并记录上游阻塞。
- 若 Prettier 产生范围外文档变更，调整 `.prettierignore`，不提交批量治理文档格式化。
- 若 TypeScript 推荐规则揭示现有源码错误，只修复当前最小应用壳，不扩大重构范围。
- 若 GitHub Actions 需要 Netlify 或其他密钥，视为方案偏离并删除该需求；本 CI 只做无密钥质量检查。

## 验证矩阵

1. 冻结安装与版本：`install --frozen-lockfile`、Node/pnpm 版本。
2. 依赖链：`pnpm why sharp`、`pnpm why postcss`、`pnpm peers check`。
3. 安全：`pnpm audit --prod`。
4. 静态质量：`format:check`、`typecheck`、`lint`。
5. 行为与构建：`test`、`build`、`check`。
6. 运行：开发服务器与生产服务器 HTTP 200，并确认端口释放。
7. Git：`next-env.d.ts` 未跟踪且被忽略；工作树只包含当前任务文件。
8. 文档：相对 Markdown 链接、状态、版本和命令一致。

## 遗留问题

- GitHub Actions 首次远程结果待推送后验证。
- Next.js 上游原生依赖升级需要后续周期检查。
- Phase 2 设计 token 应使用 Tailwind CSS v4 `@theme` 与 `:root` 分层，但不在本方案实施。

## 实施完成记录

- 2026-07-24：`packageManager`、Corepack 实测版本和冻结安装均确认使用 `pnpm@11.17.0`；Node.js 为 `24.18.0`，`@types/node` 为 `24.13.3`。
- 最终解析图中，`next@16.2.11` 的 `sharp` 唯一解析为 `0.35.3`，`postcss`（含 Next.js 边）唯一解析为 `8.5.22`；`pnpm audit --prod` 返回 `No known vulnerabilities found`。
- `next>sharp: 0.35.3` 与 `next>postcss: 8.5.22` 仍是仅作用于 Next.js 依赖边的安全 override。Next.js 发布声明安全版本并原生解析这些依赖后，移除两条 override、重新生成锁文件，并重新执行冻结安装、`pnpm why`、生产审计、`pnpm check`、开发/生产 HTTP 验证；在此之前不得静默删除或用审计忽略规则替代。
- GitHub Actions CI 已配置为只读权限、冻结安装、`check`、peer 检查和生产审计；Dependabot 已配置为每周检查 npm 与 GitHub Actions。二者尚无 GitHub 远程运行记录，因为本任务未获推送授权。
- 在嵌套 `.worktrees/` 内执行构建时，Next.js 会检测到父目录与 worktree 的两个 `pnpm-workspace.yaml`，并发出 `turbopack.root` 推断 warning；生产构建、开发/生产 HTTP 验证均已通过。该 warning 是本地隔离 worktree 风险，后续应从目标分支根目录复验，避免把 `.worktrees/` 引入 CI 或部署上下文。
- 最终审查将 `check` 固定为直接串联 `prettier --check .`、`next typegen`、`tsc --noEmit`、`eslint .`、`vitest run` 与 `next build`。因此脚本内部不再调用裸 `pnpm`，嵌套 worktree 中父级工具链继承导致的 engine warning 风险已消除；保留 Next 多锁文件 warning 与远程 CI 未验证两项风险。
