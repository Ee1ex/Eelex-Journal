# Eelex Blog

> A personal hub for code, design, and learning.

Eelex Blog 是一个以中文记录代码、界面设计与持续学习的个人博客。你可以在这里浏览文章、学习笔记与工具分享，也能了解 Eelex 的技术方向与个人资料。

[访问在线站点](https://harmonious-sprite-8b742a.netlify.app/)

[GitHub 仓库](https://github.com/Ee1ex/eelex-blog)

![Eelex Blog 桌面端首页，展示欢迎卡片、内容分类和搜索](docs/assets/phase-7/home-desktop.png)

![Eelex Blog 移动端内容页，展示文章标题、标签和阅读插图](docs/assets/phase-7/content-mobile.png)

## 你可以在这里找到

- 由本地 MDX 维护的文章、学习笔记与工具分享
- 可组合使用的内容分类与轻量搜索
- 带目录、代码块和本地图片的阅读详情页
- 关于 Eelex 的技术方向、学习重点与 GitHub 联系方式
- 面向桌面与移动端的阅读画廊界面、基础 SEO 与清晰的 404 页面

## 技术栈

- Next.js 16、React 19 与 TypeScript
- MDX、Tailwind CSS 4 与 PostCSS
- Zod 内容校验、Vitest 与 ESLint
- pnpm、GitHub Actions 与 Netlify 静态托管

## 本地运行

需要 Node.js `24.18.0` 与 pnpm `11.17.0`。

```bash
corepack pnpm install --frozen-lockfile
corepack pnpm dev
```

运行完整质量检查：

```bash
corepack pnpm check
```

## 静态发布

项目使用 Next.js 静态导出。执行以下命令会生成可直接托管的 `out` 目录：

```bash
corepack pnpm build
```

仓库中的 `netlify.toml` 将构建命令设为 `corepack pnpm build`，并将 `out` 设为发布目录；发布产物不依赖 Next.js 运行时。

## 项目文档

- [产品需求](docs/PRD.md)
- [文档治理与当前索引](docs/README.md)
- [Phase 7 需求](docs/REQ-20260725-03-phase-7-release-github-closure.md)
- [Phase 7 技术方案](docs/DEV-20260725-04-phase-7-release-github-closure.md)

## 联系方式

- [GitHub @Ee1ex](https://github.com/Ee1ex)
