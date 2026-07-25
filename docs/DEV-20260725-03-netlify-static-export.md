# DEV-20260725-03：Netlify 静态导出发布方案

## 文档信息

- ID：DEV-20260725-03
- 状态：Approved
- 创建日期：2026-07-25
- 更新日期：2026-07-25
- 关联需求：[REQ-20260725-02-visual-refresh.md](REQ-20260725-02-visual-refresh.md)
- 关联缺陷：[BUG-20260725-01-netlify-stale-lab-route.md](BUG-20260725-01-netlify-stale-lab-route.md)
- 关联决策：[BIZ-20260725-03-visual-refresh.md](BIZ-20260725-03-visual-refresh.md)

## 目标

为纯静态的 Eelex Code Hub 提供可重复、无旧路由残留的 Netlify Drop 发布产物，确保已移除的实验室路由不会被历史 Next 构建状态带回线上。

## 技术决策

- 在 `next.config.mjs` 设置 `output: "export"`，由 `next build` 直接生成 `out`。
- 新增 `netlify.toml`，使用 `corepack pnpm build` 并发布 `out`；设置 `NETLIFY_NEXT_PLUGIN_SKIP = "true"`，避免 Netlify Next 运行时插件介入静态发布。
- `robots.ts` 与 `sitemap.ts` 导出 `dynamic = "force-static"`，满足 Next.js 静态导出对 metadata 路由的构建期要求。
- 用户部署时优先把生成的 `out` 文件夹直接拖入 Netlify Drop，不上传项目根目录、`.next` 或 `node_modules`。

## 范围与边界

- 不改动页面 UI、MDX 内容、搜索/分类逻辑、内容模型、公开资料、站点 URL 或依赖版本。
- 不新增后端、运行时函数、数据库、CI 或 Netlify 账号配置。
- 站点所有现有路由均为静态页面或由 `generateStaticParams` 生成，因此不需要 Next 服务器运行时。

## 验证策略

1. 测试先行：静态导出配置、Netlify 发布目录和 metadata 静态声明必须有自动化契约。
2. 执行 `corepack pnpm build`，确认 `out` 包含首页、关于页、`robots.txt` 与 `sitemap.xml`，且不包含 `lab` 文件。
3. 执行完整质量门禁与 `git diff --check`。
4. 用户将 `out` 上传后，线上复核 `/`、`/about`、`/lab`、`/robots.txt` 与 `/sitemap.xml`。

## 批准记录

- 2026-07-25：用户确认采用静态导出并直接上传 `out` 的方案。
