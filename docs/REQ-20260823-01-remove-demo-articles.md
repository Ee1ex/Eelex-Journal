# REQ-20260823-01：移除初始示范文章

## 文档信息

- ID：REQ-20260823-01
- 状态：Done
- 创建日期：2026-08-23
- 更新日期：2026-08-23
- 关联产品：[`PRD.md`](PRD.md)
- 批准来源：用户于 2026-08-23 确认删除下列 3 篇示范文章，并以 GitHub `main@bef6d3a` 为实施基线。

## 目标

清理博客最初用于验证内容模型的 3 篇示范文章，使公开内容只保留 ELX Level 与 ELX-CNCOLOR 两篇正式介绍文章。

## 范围

- 删除 `content/designing-readable-interfaces.mdx`。
- 删除 `content/weekly-learning-notes-01.mdx`。
- 删除 `content/spacing-scale-checklist.mdx`。
- 更新依赖具体文章 slug 的页面与 SEO 测试。
- 同步当前需求、文档索引和当日进度记录。

## 非目标

- 不修改 ELX Level 或 ELX-CNCOLOR 的正文与图片。
- 不删除任何图片、历史治理记录或旧计划中的历史证据。
- 不改变内容模型、页面组件、路由结构、视觉、依赖或部署配置。
- 不提交原工作树中的 `.codex/` 与 `public/eelex-avatar.png`。
- 未获得执行前确认时，不 Push、不触发 Netlify 自动生产部署。

## 保护边界

实现只发生在从 GitHub 当前 `main@bef6d3a0a6f058665cae410224e3fadd00f2137b` 创建的 `codex/remove-demo-articles` 隔离分支。3 篇被删除文章仍可从 Git 历史恢复；原工作树及其未跟踪文件保持不变。

## 验收标准

1. `content/` 只保留 `elx-level-project-workflow.mdx` 与 `elx-cncolor.mdx` 两篇 MDX。
2. 首页、搜索、归档、RSS、sitemap 和静态详情路由只包含两个保留 slug。
3. 3 个被删除 slug 不再出现在当前内容集合和生成页面中。
4. `corepack pnpm check` 与 `git diff --check` 通过。
5. Diff 不包含无关文件、原工作树未跟踪文件或历史记录清理。
6. 远程 Push 在本地提交与验证完成后再次获得明确确认，并在执行后回读 GitHub `main`。

## 当前证据

- 已通过 GitHub 插件确认仓库 `Ee1ex/eelex-blog` 默认分支为 `main`，当前提交为 `bef6d3a0a6f058665cae410224e3fadd00f2137b`。
- 当前 `main` 的 `content/` 共有 5 篇 MDX；待删除 3 篇，保留 2 篇。
- 用户已确认删除路径、数量、公开路由影响与 Git 历史可恢复性。
- 已删除 3 个确认的 MDX；`content/` 当前只包含 `elx-cncolor.mdx` 与 `elx-level-project-workflow.mdx`。
- 修改前定向测试为 5/6 通过，唯一失败来自既有 sitemap 契约漏记 ELX-CNCOLOR；更新契约后定向测试 6/6 通过。
- `corepack pnpm check` 通过：13 个测试文件、46 项测试，Prettier、类型、ESLint 和 Next.js 静态构建成功；4 条既有 ESLint warning 未新增 error。
- 构建只生成 `/content/elx-cncolor` 与 `/content/elx-level-project-workflow` 两个详情路由；3 个被删除 slug 在 `out/` 中无命中，RSS 与 sitemap 只包含两篇保留内容。
- `git diff --check` 退出码为 0；ELX-CNCOLOR 只进行了 Prettier 表格和 JSON 空格规范化，无标题、正文语义、frontmatter、链接或图片变化。

## 遗留问题

- 远程 Push、GitHub CI 回读与线上部署核对尚未完成。
- Push 至 `main` 将触发现有 Netlify 自动生产部署，执行前必须再次确认。
