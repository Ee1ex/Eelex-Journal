# Eelex Code Hub

> A personal hub for code, design, and learning.

Eelex Code Hub 是一个用于发布学习思考、分享前端实践与工具，并展示个人资料和前端设计能力的个人博客。

## 当前状态

**Phase 3：页面骨架与模拟内容** 的 REQ、DEV 与实施计划已就绪：将建立共享导航、页脚、全部 v1 页面骨架和统一模拟内容。页面代码、真实内容系统、搜索行为、远程 CI 核对和公开部署尚未实施；下一步是按计划实施。

## v1 概览

v1 将提供：

- 整合个人介绍、全部内容、分类选择和轻量搜索的首页
- 支持图片、代码块和文章目录的内容详情页
- 展示个人资料、技能方向和联系方式的关于页
- 与博客核心功能解耦的实验室
- 响应式布局、基础 SEO、404 页面和自动部署

文章、学习笔记和工具分享使用统一内容模型，并由本地 MDX 文件维护。

## 技术方向

- Node.js `24.18.0`
- pnpm `11.17.0`
- Next.js `16.2.11`
- TypeScript `6.0.3`
- Tailwind CSS `4.3.3`
- MDX
- ESLint `9.39.5` 与 Vitest `4.1.10`
- `@types/node` `24.13.3`，与 Node.js 24 运行时对齐
- Prettier `3.9.6`
- Netlify（部署阶段接入）

## 本地运行

```bash
corepack pnpm install --frozen-lockfile
corepack pnpm dev
```

生产构建与本地启动：

```bash
corepack pnpm build
corepack pnpm start
```

工程检查：

```bash
corepack pnpm format:check
corepack pnpm typecheck
corepack pnpm lint
corepack pnpm test
corepack pnpm build
corepack pnpm check
corepack pnpm peers check
corepack pnpm audit --prod
```

GitHub Actions 已配置为在 `main` 推送和 Pull Request 上执行冻结安装、`check`、peer 检查与生产依赖审计；Dependabot 每周检查 npm 依赖与 GitHub Actions。首次远程运行结果需在获得推送授权后确认。

## 项目文档

- [产品需求](docs/PRD.md)
- [文档治理与当前索引](docs/README.md)
- [Phase 0 需求](docs/REQ-20260724-01-phase-0-foundation.md)
- [Phase 1 需求](docs/REQ-20260724-02-phase-1-git-engineering-foundation.md)
- [P2 前置工程加固需求](docs/REQ-20260724-03-p2-preflight-engineering-hardening.md)
- [Phase 2 设计基础需求](docs/REQ-20260724-04-phase-2-design-foundation.md)
- [Phase 3 页面骨架与模拟内容需求](docs/REQ-20260724-05-phase-3-page-shells.md)
- [Phase 0 决策](docs/BIZ-20260724-01-phase-0-baseline.md)
- [Phase 2 产品与设计决策](docs/BIZ-20260724-02-phase-2-product-design-decisions.md)
- [v1 技术方案与路线](docs/DEV-20260724-01-v1-architecture-roadmap.md)
- [Phase 1 工程方案](docs/DEV-20260724-02-phase-1-engineering-foundation.md)
- [P2 前置工程加固方案](docs/DEV-20260724-03-p2-preflight-engineering-hardening.md)
- [Phase 2 设计基础方案](docs/DEV-20260724-04-phase-2-design-foundation.md)
- [Phase 3 页面骨架与模拟内容方案](docs/DEV-20260724-05-phase-3-page-shells.md)
- [当前进度](docs/PROG-20260724.md)

## GitHub 展示

当前 README 负责准确说明项目目标和状态。项目交付阶段将结合真实页面、截图和上线地址，完成专门面向 GitHub 项目首页的视觉设计。
