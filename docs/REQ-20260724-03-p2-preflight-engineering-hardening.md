# REQ-20260724-03：P2 前置工程加固

## 文档信息

- ID：REQ-20260724-03
- 状态：In Progress
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
