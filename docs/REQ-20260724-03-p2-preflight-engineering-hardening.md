# REQ-20260724-03：P2 前置工程加固

## 文档信息

- ID：REQ-20260724-03
- 状态：Done
- 创建日期：2026-07-24
- 更新日期：2026-07-24
- 产品基线：[`PRD.md`](PRD.md)
- 前置需求：[`REQ-20260724-02-phase-1-git-engineering-foundation.md`](REQ-20260724-02-phase-1-git-engineering-foundation.md)
- 关联决策：[`BIZ-20260724-01-phase-0-baseline.md`](BIZ-20260724-01-phase-0-baseline.md)
- 技术方案：[`DEV-20260724-03-p2-preflight-engineering-hardening.md`](DEV-20260724-03-p2-preflight-engineering-hardening.md)
- 实施计划：[`superpowers/plans/2026-07-24-p2-preflight-engineering-hardening.md`](superpowers/plans/2026-07-24-p2-preflight-engineering-hardening.md)
- 进度记录：[`PROG-20260724.md`](PROG-20260724.md)

## 背景与已确认事实

- Phase 1 已完成并合入 `main`，工程可安装、启动、类型检查、Lint、测试和构建。
- 2026-07-24 复核 npm 注册表后，除 ESLint 10、TypeScript 7 和 pnpm 外，现有直接依赖均为当前版本；ESLint 10 仍受 `eslint-plugin-react` peer 范围限制，TypeScript 7 仍超出 `typescript-eslint` 的正式支持范围。
- Node.js `24.18.0` 是当前 LTS，继续作为本地和 Netlify 运行时；`@types/node@26.1.1` 与该运行时不一致。
- pnpm 当前锁定 `11.9.0`，同一主版本的当前版本为 `11.17.0`。
- `pnpm audit --prod` 发现 3 条来自 `next@16.2.11` 传递依赖的公告：`sharp@0.34.5` 一条 High，以及 `postcss@8.4.31` 一条 High、一条 Moderate。项目直接依赖的 `postcss@8.5.22` 不受影响。
- Next.js 16 会在 `next dev`、`next build` 和 `next typegen` 时重新生成 `next-env.d.ts`，官方当前建议忽略该文件；Phase 1 已实际观察到它在开发与构建命令之间发生内容切换。
- 当前 ESLint 配置加载了 TypeScript parser，但未启用 `eslint-config-next/typescript` 的 TypeScript 推荐规则。
- 仓库当前没有 GitHub Actions、Dependabot、统一 `check` 命令或格式化策略。

## 目标

在开始 Phase 2 页面或设计 token 实施前，修复已确认的依赖安全与类型对齐问题，消除生成文件造成的工作区漂移，补齐 TypeScript Lint、格式化、统一质量命令、CI 和依赖维护入口，使后续对话可从仓库文档直接恢复真实工程基线。

## 本次范围

- 保持 Node.js `24.18.0`、Next.js `16.2.11`、React `19.2.8`、TypeScript `6.0.3`、ESLint `9.39.5`、Tailwind CSS `4.3.3` 和 Vitest `4.1.10`。
- 将 pnpm 升级到 `11.17.0`，并更新 Corepack 固定值和锁文件。
- 将 `@types/node` 调整为与 Node 24 对齐的 `24.13.3`。
- 使用 pnpm 的定向 override 将 `next` 的 `postcss` 解析到 `8.5.22`、`sharp` 解析到 `0.35.3`；通过安装、审计、构建和依赖链检查验证。
- 将 `next-env.d.ts` 加入 `.gitignore` 并取消 Git 跟踪；`typecheck` 在 `tsc --noEmit` 前执行 `next typegen`。
- 为 ESLint 增加 `eslint-config-next/typescript` 和 `eslint-config-prettier`，补齐官方生成目录忽略项。
- 将 Next.js 页面扩展名收紧为 TypeScript 和 MDX：`ts`、`tsx`、`md`、`mdx`。
- 增加 `start`、`format`、`format:check` 和统一 `check` 命令。
- 增加 EditorConfig、Prettier 与 Tailwind CSS v4 class 排序配置。
- 增加 GitHub Actions CI；在 `main` 推送和 PR 上执行冻结安装、统一检查、peer 检查和生产依赖审计。
- 增加 Dependabot 的 npm 与 GitHub Actions 周期检查。
- 新增工程契约测试，验证关键版本、脚本、忽略规则、TypeScript ESLint、Next 扩展名和 CI 文件。
- 更新 README、PRD 当前需求指针、文档索引、DEV 和当日 PROG。

## 本次不包含

- 不创建或修改 Phase 2 页面、组件、设计 token、低保真结构或公开文案。
- 不创建真实 MDX 内容、内容模型、frontmatter 校验、筛选或阅读链路。
- 不引入 Testing Library、jsdom、Playwright、覆盖率阈值或端到端测试；这些在出现真实交互和页面后按 Phase 3～6 引入。
- 不创建 Netlify 站点、`netlify.toml`、部署配置、环境变量或生产发布。
- 不升级 Node.js 26、TypeScript 7 或 ESLint 10。
- 不引入数据库、后端、CMS、登录或任何 PRD 范围外能力。
- 未经用户另行明确授权，不推送远程、不创建 PR、不部署。

## 交付文件

### 新增

- `.editorconfig`
- `.gitattributes`
- `.prettierignore`
- `prettier.config.mjs`
- `.github/workflows/ci.yml`
- `.github/dependabot.yml`
- `tests/engineering-config.test.ts`
- `docs/REQ-20260724-03-p2-preflight-engineering-hardening.md`
- `docs/DEV-20260724-03-p2-preflight-engineering-hardening.md`
- `docs/superpowers/plans/2026-07-24-p2-preflight-engineering-hardening.md`

### 修改

- `.gitignore`
- `package.json`
- `pnpm-lock.yaml`
- `pnpm-workspace.yaml`
- `next.config.mjs`
- `eslint.config.mjs`
- `README.md`
- `docs/PRD.md`
- `docs/README.md`
- `docs/PROG-20260724.md`

### 取消跟踪

- `next-env.d.ts`：由 Next.js 按命令生成，继续被 `tsconfig.json` 的 `include` 引用但不再提交。

## 验收标准

- `packageManager` 为 `pnpm@11.17.0`，本地 `corepack pnpm --version` 返回 `11.17.0`。
- Node.js 保持 `24.18.0`，`@types/node` 为 `24.13.3`。
- `pnpm why sharp` 只解析 `sharp@0.35.3`；`pnpm why postcss` 中 `next` 使用已修复的 `postcss@8.5.22`。
- `pnpm audit --prod` 以零退出码完成且无已知生产依赖漏洞。
- `next-env.d.ts` 不在 Git 索引中、被 `.gitignore` 命中，并能由 `pnpm typecheck` 自动生成。
- TypeScript 文件实际启用 `@typescript-eslint` 推荐规则；ESLint 忽略 `.next/**`、`.worktrees/**`、`out/**`、`build/**`、`coverage/**`、`test-results/**`、`node_modules/**` 和 `next-env.d.ts`。
- Next 页面扩展名只允许 `ts`、`tsx`、`md`、`mdx`。
- `pnpm format:check`、`pnpm typecheck`、`pnpm lint`、`pnpm test`、`pnpm build`、`pnpm check` 和 `pnpm peers check` 均以零退出码完成。
- Vitest 至少执行现有应用壳测试和新增工程契约测试，且不会扫描 `.worktrees/**`。
- GitHub Actions CI 使用 `.nvmrc`、`packageManager` 和冻结锁文件，且只授予 `contents: read`。
- Dependabot 覆盖 pnpm/npm 依赖和 GitHub Actions。
- 本地开发服务器和 `next start` 生产服务器均返回 HTTP 200；验证后进程与端口被释放。
- README、PRD、REQ、DEV、PROG 与文档索引中的版本、命令、状态和下一步一致；Markdown 相对链接无断链。
- 未创建 Phase 2 产品实现、Netlify 配置或部署。

## 风险与验证

- `sharp@0.35.3` 超出 Next.js `^0.34.5` 的声明范围；必须通过锁文件解析、生产构建、依赖审计和运行时启动检查验证，并在 DEV 中记录这是等待上游修复前的定向安全 override。
- Next.js 固定 `postcss@8.4.31`；同主版本 override 到 `8.5.22` 由 Tailwind 编译和生产构建验证。
- Prettier 首次接入可能产生大范围无关格式化；治理文档、生成文件和依赖产物必须通过 `.prettierignore` 排除，本次只格式化工程源文件与配置。
- CI 尚未在 GitHub 运行前，只能本地验证 YAML 结构和等价命令；远程运行结果需要推送授权后确认。
- Dependabot 仅创建更新入口，不自动合并依赖。

## 验证证据

- 实施前基线：隔离 worktree 冻结安装成功，Vitest 1 个测试文件、3 个测试通过。
- 实施前版本检查：pnpm 最新同主版本 `11.17.0`；`@types/node@24` 当前版本 `24.13.3`。
- 实施前安全检查：`pnpm audit --prod` 返回 1 Moderate、2 High；来源为 `next>sharp@0.34.5` 与 `next>postcss@8.4.31`。
- 实施完成后追加 RED/GREEN、安装、审计、类型检查、Lint、格式化、测试、构建、运行时和文档验证证据。

## 遗留问题

- CI 的真实 GitHub 运行状态只有在用户授权推送后才能确认。
- Netlify OpenNext、地区访问、计费和生产部署仍按 Phase 7 验证。
- Phase 2 仍需单独创建并批准 REQ；本任务完成不会自动开始 Phase 2 产品实施。

## 完成记录与验收证据

### 状态变更

- 2026-07-24：本 REQ 从 `In Progress` 更新为 `Done`。产品范围、页面、内容模型、Netlify 配置和部署状态均未改变。

### 最终工程状态

- Node.js 固定并实测为 `24.18.0`；`packageManager` 与 `corepack pnpm --version` 均为 `pnpm@11.17.0`；`@types/node` 为 `24.13.3`。
- `pnpm why sharp` 只解析 `next@16.2.11 > sharp@0.35.3`；`pnpm why postcss` 中包含 `next@16.2.11 > postcss@8.5.22`，且仅发现该版本。
- `pnpm-workspace.yaml` 的定向安全 override 保持为 `next>sharp: 0.35.3` 与 `next>postcss: 8.5.22`。它们是等待 Next.js 上游原生修复的临时安全边界，不能通过降低审计等级或忽略公告替代。
- `next-env.d.ts` 的 `git ls-files next-env.d.ts` 无输出；`git check-ignore -v --no-index next-env.d.ts` 命中 `.gitignore:14:next-env.d.ts`。
- GitHub Actions CI 与 Dependabot 配置文件已由工程契约测试覆盖；由于未经授权推送，当前没有 GitHub Actions 远程运行记录，首次远程结果仍待验证。

### 命令与运行时证据

以下命令均以零退出码完成：

- `corepack pnpm install --frozen-lockfile`：依赖已是最新锁定状态，使用 pnpm `11.17.0`。
- `corepack pnpm format:check`：`All matched files use Prettier code style!`。
- `corepack pnpm typecheck`：`next typegen` 成功生成路由类型，随后 `tsc --noEmit` 通过。
- `corepack pnpm lint`：通过。
- `corepack pnpm test`：Vitest `2` 个测试文件、`8` 个测试全部通过。
- `corepack pnpm build`：Next.js `16.2.11` 生产构建通过，`/` 与 `/_not-found` 均为静态路由。
- `corepack pnpm check`：格式、类型、Lint、测试和构建全部通过。最终审查已将该脚本改为直接串联底层工具，消除了内部裸 `pnpm` 在嵌套 worktree 中继承父目录工具链并产生 engine warning 的风险；嵌套 worktree 的 Next 多锁文件 warning 仍单独保留。
- `corepack pnpm peers check`：`No peer dependency issues found`。
- `corepack pnpm audit --prod`：`No known vulnerabilities found`。
- `git diff --check`：无输出、零退出码。

运行时验证在本机回环地址完成：

- 开发服务器 `127.0.0.1:3101`：`GET /` 返回 HTTP `200`，响应包含 `<main>`；停止监听 PID `36728` 后确认端口已释放。
- 生产服务器 `127.0.0.1:3102`：构建后以 `next start` 启动，`GET /` 返回 HTTP `200`，响应包含 `<main>`；停止监听 PID `21024` 后确认端口已释放。

### 验收结论

- 依赖、安全 override、生成类型、TypeScript Lint、格式化、统一质量命令、CI、Dependabot 和工程契约测试：通过。
- 开发与生产 HTTP 验证及端口释放：通过。
- 文档索引、PRD、README、DEV、PROG 与本 REQ 的状态和下一步：已同步。
- 未创建 Phase 2 产品实现、Netlify 配置、部署、远程推送或 Pull Request：符合范围。

### 后续与风险

- 本地嵌套 `.worktrees/` 会使 Next.js 在构建时检测到父目录和 worktree 的两个锁文件，并提示 `turbopack.root` 推断风险；该提示未阻止构建或 HTTP 验证。不要将 `.worktrees/` 纳入提交、CI 或部署上下文；在目标分支根目录再次执行构建后再决定是否需要显式配置 `turbopack.root`。
- GitHub Actions 与 Dependabot 已配置，但其真实远程执行、Netlify OpenNext、跨地区访问、计费和生产部署均仍待相应阶段和授权验证。
- 下一项任务：创建并批准独立的 Phase 2 REQ；在此之前不得开始页面、组件或设计 token 实施。

### 最终审查修正（2026-07-24）

- `check` 的最终契约为 `prettier --check . && next typegen && tsc --noEmit && eslint . && vitest run && next build`，保持既有格式、类型、Lint、测试与构建顺序，同时不再从脚本内部调用裸 `pnpm`。
- 工程契约测试已收紧为上述精确命令，并验证 `@typescript-eslint/no-unused-vars` 的规则级别不是 `0` 或 `off`。
- 内部裸 `pnpm` 的 engine warning 风险已消除；仍需在目标分支根目录复验嵌套 `.worktrees/` 引发的 Next 多锁文件 `turbopack.root` warning，且 GitHub Actions 的真实远程运行仍待推送授权后验证。

### 合入验证补充（2026-07-24）

- 本地 `main` fast-forward 后首次完整检查稳定复现 Windows CRLF 格式失败，已登记为 [`BUG-20260724-01`](BUG-20260724-01-windows-line-endings-break-format-check.md)。
- 根因是仓库缺少 Git checkout 级换行约束，系统 `core.autocrlf=true` 将索引 LF 转为工作区 CRLF；`.editorconfig` 不能覆盖该环节。
- 修复分支已新增 `.gitattributes` 的 `* text=auto eol=lf` 契约，并先观察到工程配置测试 RED，再验证 6/6 GREEN 与 `format:check` 通过。
- 本 REQ 的最终关闭状态保持 `Done`；BUG 在重新合入 `main` 并完成根目录验证后由 `Verified` 更新为 `Closed`。
- 关闭结果：修复提交 `c72d854` 已合入本地 `main`；关键文件确认为 `w/lf`，完整 `check`（9 项测试）、peer 检查、生产审计和 `git diff --check` 均通过，`BUG-20260724-01` 已更新为 `Closed`。
