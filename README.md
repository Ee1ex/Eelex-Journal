# Eelex Code Hub

> A personal hub for code, design, and learning.

Eelex Code Hub 是一个用于发布学习思考、分享前端实践与工具，并展示个人资料和前端设计能力的个人博客。

## 当前状态

**Phase 1：Git 与工程基础** 已完成本地验证。项目已具备可复现的应用工程、类型检查、Lint、测试和生产构建命令；公开站点尚未部署。

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
- pnpm `11.9.0`
- Next.js `16.2.11`
- TypeScript `6.0.3`
- Tailwind CSS `4.3.3`
- MDX
- ESLint `9.39.5` 与 Vitest `4.1.10`
- Netlify（部署阶段接入）

## 本地运行

```bash
corepack pnpm install
corepack pnpm dev
```

工程检查：

```bash
corepack pnpm typecheck
corepack pnpm lint
corepack pnpm test
corepack pnpm build
```

## 项目文档

- [产品需求](docs/PRD.md)
- [文档治理与当前索引](docs/README.md)
- [Phase 0 需求](docs/REQ-20260724-01-phase-0-foundation.md)
- [Phase 1 需求](docs/REQ-20260724-02-phase-1-git-engineering-foundation.md)
- [Phase 0 决策](docs/BIZ-20260724-01-phase-0-baseline.md)
- [v1 技术方案与路线](docs/DEV-20260724-01-v1-architecture-roadmap.md)
- [Phase 1 工程方案](docs/DEV-20260724-02-phase-1-engineering-foundation.md)
- [当前进度](docs/PROG-20260724.md)

## GitHub 展示

当前 README 负责准确说明项目目标和状态。项目交付阶段将结合真实页面、截图和上线地址，完成专门面向 GitHub 项目首页的视觉设计。
