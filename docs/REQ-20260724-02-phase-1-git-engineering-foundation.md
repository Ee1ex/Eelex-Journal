# REQ-20260724-02：Phase 1 Git 与工程基础

## 文档信息

- ID：REQ-20260724-02
- 状态：In Progress
- 创建日期：2026-07-24
- 更新日期：2026-07-24
- 产品基线：[`PRD.md`](PRD.md)
- 关联决策：[`BIZ-20260724-01-phase-0-baseline.md`](BIZ-20260724-01-phase-0-baseline.md)
- 上游方案：[`DEV-20260724-01-v1-architecture-roadmap.md`](DEV-20260724-01-v1-architecture-roadmap.md)
- 进度记录：[`PROG-20260724.md`](PROG-20260724.md)

## 目标

在不实现任何 v1 页面或产品功能的前提下，建立可复现的 Git 与 Next.js 工程基础：本地项目可启动，且类型检查、Lint、测试和生产构建均有可执行且已验证的入口，为后续 Phase 提供稳定起点。

## 本次范围

- 在初始化前复核并保留工作区既有文件；仅在确认 `.git` 仍为空且不含仓库元数据后，将其初始化为本项目 Git 仓库。
- 建立 `main` 默认分支、适合 Node/Next.js 项目的 `.gitignore`，并确认密钥、依赖目录、构建产物和本地缓存不被提交。
- 连接已验证的公开远程仓库 `https://github.com/Ee1ex/Eelex-Journal.git`；不部署，且只在用户已确认的功能分支完成验证后发起推送与 PR。
- 使用 Node.js `24.18.0` 与 pnpm `11.9.0`，通过 `.nvmrc` 和 `package.json` 的 `packageManager` 字段固定本地与 Netlify 构建所需版本。
- 建立 Next.js App Router、TypeScript、Tailwind CSS、MDX 和 ESLint 工程基础；MDX 使用 `@next/mdx`，并提供 App Router 所需的 `mdx-components.tsx`。
- 建立下列 `package.json` 脚本并验证：`dev`、`typecheck`、`lint`、`test`、`build`。
- 使用 Vitest 建立最小 Node 环境测试入口；此测试仅证明测试工具链可运行，不替代后续功能、组件或端到端测试。
- 新建 Phase 1 DEV，记录经核验的依赖版本、目录结构、命令与 Netlify 兼容性依据；同步 README、REQ 与 PROG 的真实状态和验证证据。

## 本次不包含

- 不实现首页、文章列表、内容详情、关于我、实验室、404、导航栏或页脚。
- 不创建真实 MDX 内容、内容模型、筛选、SEO、sitemap、robots 或设计 token。
- 不创建 Netlify 站点、不部署、不创建 `netlify.toml`、不设置环境变量，也不核验地区可访问性或计费。
- 不接入数据库、自建后端、登录、CMS、评论、搜索、订阅、统计脚本或任何范围外服务。
- 不创建视觉稿、Logo、公开截图或最终展示版 GitHub README。
- 不推送远程仓库、不发布版本、不创建任何虚构 BUG 记录。

## 实施基线确认

- 用户已于 2026-07-24 确认采用 Node.js `24.18.0`、pnpm `11.9.0`、ESLint 和 Vitest。
- GitHub 插件账号与本机 Git Credential Manager 均已验证为 `Ee1ex`；该账号对 `Ee1ex/Eelex-Journal` 具有 `admin` 与 `push` 权限，远程默认分支为 `main`。
- 用户已确认以本地已批准的 `README.md` / PRD 为准，替换远程初始 README 的冲突内容；并确认在隔离工作树的 `phase-1-engineering-foundation` 分支实施，通过 PR 合入 `main`。
- Phase 1 的具体版本、目录、命令和兼容性结论由 `DEV-20260724-02-phase-1-engineering-foundation.md` 记录。

## 交付文件

### 新增

- `.gitignore`
- `.nvmrc`
- `package.json`
- `pnpm-lock.yaml`
- `pnpm-workspace.yaml`
- `next.config.mjs`
- `mdx-components.tsx`
- `postcss.config.mjs`
- `eslint.config.mjs`
- `tsconfig.json`
- `next-env.d.ts`
- `vitest.config.ts`
- `tests/engineering-baseline.test.ts`
- `src/app/layout.tsx`
- `src/app/page.tsx`
- `src/app/globals.css`
- `docs/DEV-20260724-02-phase-1-engineering-foundation.md`

### 修改

- `README.md`
- `docs/REQ-20260724-02-phase-1-git-engineering-foundation.md`
- `docs/PROG-20260724.md`
- `docs/README.md`

### 由工具生成且不作为产品功能验收对象

- `.git/` Git 元数据目录。
- `public/` 下由 Next.js 脚手架生成的默认静态资产（如生成器实际创建）。

## 验收标准

- 在初始化前，已记录 `.git` 与 `.agents` 的内容检查结果；不得删除或覆盖既有用户文件。
- Git 仓库可识别，默认分支为 `main`，且 `.gitignore` 覆盖 `.env*`、`node_modules/`、`.next/`、测试覆盖率产物、日志和本地缓存。
- 远程仓库仅在用户授予相应外部操作权限后创建或关联；本 REQ 期间不执行推送、发布或部署。
- `.nvmrc` 为 `24.18.0`，`package.json` 的 `packageManager` 为 `pnpm@11.9.0`，且本地 `node --version` 与 `pnpm --version` 可满足二者。
- 工程采用 Next.js App Router、TypeScript、Tailwind CSS、ESLint 和 MDX；`next.config.mjs` 通过 `@next/mdx` 配置 MDX，根目录 `mdx-components.tsx` 存在。
- `pnpm dev` 能启动本地开发服务器；启动地址、端口和退出方式记录在验证证据中。
- `pnpm typecheck`、`pnpm lint`、`pnpm test` 与 `pnpm build` 均以零退出码完成。
- `pnpm test` 至少执行一个可检查的 Vitest 测试文件；测试仅覆盖工程测试入口，不虚构产品行为覆盖率。
- `pnpm build` 在无真实 MDX 内容的条件下可完成；真实 MDX 内容解析、元数据校验和阅读链路验证明确留给 Phase 4。
- 新建 Phase 1 DEV 写明精确依赖版本、目录结构、全部工程命令、Node/pnpm 固定方式，以及官方 Next.js、Tailwind、MDX、Netlify 兼容性依据。
- README、REQ、PROG、DEV 与文档索引中的状态、文件列表、命令和验证证据一致；文档链接无断链且没有模糊占位或虚构结果。

## 已核验依据

- Next.js 官方安装文档要求 Node.js `20.9` 或更高，并推荐通过 `create-next-app` 建立 TypeScript、Tailwind CSS、ESLint、App Router 和 Turbopack 默认基础。
- Next.js 官方 MDX 文档要求安装 `@next/mdx`、`@mdx-js/loader`、`@mdx-js/react` 和 `@types/mdx`；App Router 需要 `mdx-components.tsx`。
- Tailwind CSS 官方 Next.js 指南采用 `@tailwindcss/postcss` 与 `postcss.config.mjs`，并在全局 CSS 中导入 Tailwind。
- Netlify 当前构建环境默认 Node.js `24`，支持通过 `.nvmrc` 固定版本；支持使用 `packageManager` 和 Corepack 固定 pnpm。Netlify 对 Next.js `13.5` 及以上提供零配置 OpenNext 适配。
- 本机只读检查结果：Node.js `v24.18.0`、pnpm `11.9.0`、Corepack `0.35.0`、Git `2.55.0.windows.3` 可用；`npm.ps1` 受 PowerShell 执行策略阻止，因此本 REQ 统一使用 pnpm。

## 验证证据

- 草案创建前工作区检查：当前不是 Git 仓库；`.git` 和 `.agents` 均为空目录，`.git/config` 不存在。
- 草案创建前工程检查：不存在应用代码、依赖目录、`package.json`、锁文件或工程配置。
- GitHub 访问验证：插件账号为 `Ee1ex`；`Ee1ex/Eelex-Journal` 为公开仓库，默认分支为 `main`，且账号具备 `admin`、`push` 权限。
- 本机 Git 凭据验证：Git Credential Manager 已保存 `Ee1ex` 凭据；`git ls-remote --symref https://github.com/Ee1ex/Eelex-Journal.git HEAD` 成功返回 `refs/heads/main`。
- 仓库基线整合：远程初始 README 与本地 v1 基线发生 add/add 冲突；已按用户明确确认在本地合并提交中保留本地 README，远程尚未被推送修改。
- 依赖安装：`corepack pnpm install` 与 `corepack pnpm install --frozen-lockfile` 成功；Corepack 使用 Node.js `v24.18.0`。`sharp` 与 `unrs-resolver` 的必要构建脚本已在 `pnpm-workspace.yaml` 中显式批准。
- TDD 证据：应用壳测试先因 `src/app/layout.tsx` 缺失而失败；写入最小应用壳后，`corepack pnpm test` 通过 3/3 测试。
- 最终工程验证：`corepack pnpm typecheck`、`corepack pnpm lint`、`corepack pnpm test`、`corepack pnpm build` 和 `corepack pnpm peers check` 均以零退出码完成。
- 本地运行验证：`corepack pnpm dev` 成功启动；请求 `http://localhost:3000` 返回 HTTP 200，响应包含 `<main>`；验证后已停止开发服务器并释放端口 `3000`。
- 实施完成后，在本节追加每条验收标准对应的命令、退出码、关键输出和文档检查结果。

## 遗留问题

- 远程仓库的平台、地址、可见性和创建/关联授权待用户确认；这属于外部状态变更，不作默认假设。
- 若用户不接受推荐工具组合，需在批准前更新本 REQ，并据此调整 Phase 1 DEV、交付文件和验收命令。
- Netlify 的站点配置、计费、地区访问与真实部署不在本 Phase 验证，按 PRD 与 DEV 留待 Phase 7。
