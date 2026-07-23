# DEV-20260724-02：Phase 1 工程基础实施方案

## 文档信息

- ID：DEV-20260724-02
- 状态：Approved
- 创建日期：2026-07-24
- 更新日期：2026-07-24
- 关联需求：[`REQ-20260724-02-phase-1-git-engineering-foundation.md`](REQ-20260724-02-phase-1-git-engineering-foundation.md)
- 关联决策：[`BIZ-20260724-01-phase-0-baseline.md`](BIZ-20260724-01-phase-0-baseline.md)
- 上游方案：[`DEV-20260724-01-v1-architecture-roadmap.md`](DEV-20260724-01-v1-architecture-roadmap.md)
- 进度记录：[`PROG-20260724.md`](PROG-20260724.md)

## 目标

在独立功能分支上建立可复现的 Next.js 工程基础，并验证本地开发、类型检查、Lint、测试和生产构建；不实现任何 v1 页面功能或部署配置。

## 方案与边界

- 使用 App Router，源文件位于 `src/`，导入别名为 `@/*`。
- 采用 pnpm，`packageManager` 固定为 `pnpm@11.9.0`；`.nvmrc` 固定为 `24.18.0`，使本机与 Netlify 构建使用同一 Node.js 版本。
- 使用 Tailwind CSS 4 的 PostCSS 集成；不创建 Tailwind 配置文件，基础样式只在 `src/app/globals.css` 导入 Tailwind。
- 使用 `@next/mdx` 配置 MDX，并在根目录提供 App Router 必需的 `mdx-components.tsx`；不在本 Phase 创建真实 MDX 内容或内容读取逻辑。
- 使用 ESLint 9 与 `eslint-config-next`，通过 ESLint CLI 执行 Lint；不使用已移除的 `next lint`。不采用 ESLint 10，因为 `eslint-config-next` 的传递插件当前仅声明支持至 ESLint 9。
- 使用 Vitest 4 的 Node 环境、Vite 8 OXC automatic JSX transform 和 `react-dom/server` 建立最小应用壳测试；测试先于 `src/app/page.tsx`、`src/app/layout.tsx` 与 `mdx-components.tsx` 写入。
- 不创建 `netlify.toml`。Netlify 对 Next.js `13.5` 及更高版本提供零配置 OpenNext 适配；真实站点配置与部署属于 Phase 7。

## 依赖锁定

| 类别 | 包 | 版本 |
| --- | --- | --- |
| runtime | `next` | `16.2.11` |
| runtime | `react`、`react-dom` | `19.2.8` |
| runtime | `@next/mdx` | `16.2.11` |
| runtime | `@mdx-js/loader`、`@mdx-js/react` | `3.1.1` |
| dev | `@types/mdx` | `2.0.14` |
| dev | `typescript` | `6.0.3` |
| dev | `@types/node` | `26.1.1` |
| dev | `@types/react` | `19.2.17` |
| dev | `@types/react-dom` | `19.2.3` |
| dev | `tailwindcss`、`@tailwindcss/postcss` | `4.3.3` |
| dev | `postcss` | `8.5.22` |
| dev | `eslint` | `9.39.5` |
| dev | `eslint-config-next` | `16.2.11` |
| dev | `vitest` | `4.1.10` |

所有版本均于 2026-07-24 通过 npm 注册表查询；TypeScript 选用 `6.0.3`，因为当前 `typescript-eslint@8.65.0` 的兼容范围为 `>=4.8.4 <6.1.0`。pnpm 锁文件是唯一安装解析记录。

## 目录与文件职责

| 路径 | 职责 |
| --- | --- |
| `.nvmrc` | 固定 Node.js `24.18.0`。 |
| `.gitignore` | 排除凭据、依赖、构建产物、缓存与本地工作树。 |
| `package.json` | 声明依赖、pnpm 版本和全部工程命令。 |
| `pnpm-workspace.yaml` | 显式批准 `sharp` 与 `unrs-resolver` 的必要安装脚本。 |
| `next.config.mjs` | 启用 MDX 文件扩展名。 |
| `mdx-components.tsx` | 提供 App Router 的全局 MDX 组件映射。 |
| `postcss.config.mjs` | 启用 `@tailwindcss/postcss`。 |
| `eslint.config.mjs` | 采用 Next.js Core Web Vitals 规则。 |
| `vitest.config.ts` | 配置 Node 测试环境与 Vite 8 OXC 的 automatic JSX transform。 |
| `tests/app-shell.test.tsx` | 验证页面壳、根布局和 MDX 映射的最小行为。 |
| `src/app/layout.tsx` | 仅提供中文文档根结构和全局 CSS 入口。 |
| `src/app/page.tsx` | 提供空的语义化 `<main>`，不预置任何面向访客的占位文案。 |
| `src/app/globals.css` | 导入 Tailwind CSS。 |

## 工程命令

| 命令 | 用途 | 通过条件 |
| --- | --- | --- |
| `corepack pnpm dev` | 启动本地开发服务器。 | 本地 `http://localhost:3000` 返回 HTTP 200。 |
| `corepack pnpm typecheck` | 执行 `tsc --noEmit`。 | 零退出码。 |
| `corepack pnpm lint` | 执行 `eslint .`。 | 零退出码。 |
| `corepack pnpm test` | 执行 `vitest run`。 | 所有测试通过。 |
| `corepack pnpm build` | 执行 `next build`。 | 零退出码。 |

## 验证与风险

- 每个新增的 TypeScript 应用源文件先由 Vitest 测试覆盖并观察到预期失败，再写最小实现。
- 配置文件、锁文件和 Git 元数据属于工具生成或声明性配置，不作为产品逻辑测试对象；它们由四条工程命令和 `.gitignore` 规则共同验证。
- PowerShell 会阻止 `npm.ps1`，因此所有项目命令统一使用 `pnpm`，避免依赖终端执行策略。
- 在当前环境中必须通过 `corepack pnpm` 执行命令：环境提供的 `pnpm.cmd` 固定使用 Node `24.14.0`，而 Corepack 使用 `.nvmrc` 要求的系统 Node `24.18.0`。
- pnpm 的供应链策略默认拦截 `sharp` 与 `unrs-resolver` 构建脚本；二者分别来自 Next.js 和 `eslint-config-next`，已核验来源后仅在 `pnpm-workspace.yaml` 中显式批准。
- 当前仅验证 MDX 适配器和构建配置可用；真实 MDX 文件、frontmatter 校验、内容数据流和渲染回归留给 Phase 4。
- 后续推送前复核目标分支和待推送提交；部署、Netlify 站点创建和生产环境变更仍需用户明确授权。

## 验证证据

- Next.js 官方安装文档：Node.js 最低版本为 `20.9`，支持 App Router、TypeScript、Tailwind CSS 和 ESLint 基础。
- Next.js 官方 MDX 文档：`@next/mdx`、MDX 依赖与 App Router 的 `mdx-components.tsx` 为所需配置。
- Tailwind CSS 官方 Next.js 指南：使用 `@tailwindcss/postcss` 与 `postcss.config.mjs`。
- Netlify 官方文档：默认 Node.js `24`，支持 `.nvmrc` 与 `packageManager`；Next.js `13.5` 及以上由 OpenNext 零配置适配。
- `corepack pnpm install --frozen-lockfile`：通过，使用 Node.js `v24.18.0` 与 pnpm `11.9.0`。
- `corepack pnpm typecheck`、`corepack pnpm lint`、`corepack pnpm test`、`corepack pnpm build`：通过；Vitest 结果为 1 个测试文件、3 个测试通过。
- `corepack pnpm peers check`：通过，未发现 peer 依赖问题。
- `corepack pnpm dev`：通过；`http://localhost:3000` 返回 HTTP 200，验证后已停止。

## 遗留问题

- Netlify 生产配置、计费和地域访问不在本 Phase 处理。
- 视觉 token、真实页面内容、MDX 内容模型和元数据校验按既定路线留待后续 Phase。
