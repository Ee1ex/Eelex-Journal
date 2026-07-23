# Eelex Code Hub

> A personal hub for code, design, and learning.

Eelex Code Hub 是一个用于发布学习思考、分享前端实践与工具，并展示个人资料和前端设计能力的个人博客。

## 当前状态

**Phase 1：Git 与工程基础** 已完成并合入 `main`。Phase 2 前置工程加固已完成：依赖安全、类型对齐、格式化、直接串联底层工具的统一质量命令、CI 与 Dependabot 入口均已就绪。下一步是在开始页面或设计工作前创建并批准独立的 Phase 2 REQ；公开站点尚未部署。

## v1 概览

v1 将提供：

- 以最新内容为主体的首页
- 支持分类或标签筛选的全部文章页
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
- [Phase 0 决策](docs/BIZ-20260724-01-phase-0-baseline.md)
- [v1 技术方案与路线](docs/DEV-20260724-01-v1-architecture-roadmap.md)
- [Phase 1 工程方案](docs/DEV-20260724-02-phase-1-engineering-foundation.md)
- [P2 前置工程加固方案](docs/DEV-20260724-03-p2-preflight-engineering-hardening.md)
- [当前进度](docs/PROG-20260724.md)

## GitHub 展示

当前 README 负责准确说明项目目标和状态。项目交付阶段将结合真实页面、截图和上线地址，完成专门面向 GitHub 项目首页的视觉设计。
