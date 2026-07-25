# BUG-20260725-01：Netlify 构建产物保留已移除的实验室路由

## 文档信息

- ID：BUG-20260725-01
- 状态：Closed
- 创建日期：2026-07-25
- 更新日期：2026-07-25
- 来源需求：[REQ-20260725-02-visual-refresh.md](REQ-20260725-02-visual-refresh.md)
- 关联方案：[DEV-20260725-03-netlify-static-export.md](DEV-20260725-03-netlify-static-export.md)

## 缺陷摘要

正式源码已移除实验室页面与入口，且本地生产构建的路由树不含 `/lab`；但 Netlify Drop 线上站点仍在 `/lab` 返回旧的“阅读密度实验”页面。

## 复现环境与步骤

- 生产站点：`https://harmonious-sprite-8b742a.netlify.app/`
- 发布方式：Netlify Drop，由 Netlify 执行项目构建。

1. 使用包含提交 `5d0693c` 的干净项目源目录发起 Netlify Drop 部署。
2. 访问首页、关于页、`/robots.txt` 与 `/sitemap.xml`，均能取得新版内容。
3. 访问 `/lab`，包括带任意查询参数的地址，仍返回旧实验室页面和 HTTP 200。
4. 在 Netlify 中执行清除构建缓存后的重新部署，`/lab` 仍保持上述结果。

## 预期与实际结果

- 预期：`/lab` 不存在，并返回 404；发布产物只包含当前路由。
- 实际：`/lab` 返回旧实验室页面，违背视觉刷新需求中“实验室不出现在路由树”的验收标准。

## 根因与修复

- 根因：Netlify 的 Next 运行时构建路径复用 `.next` 增量产物时未可靠移除已删除的 App Router 路由。线上响应在不同查询参数下保持同一旧页面，且本地源码与本地构建均无该路由，排除浏览器缓存和源码遗留。
- 修复：改用 Next.js `output: "export"` 生成独立的 `out` 静态目录；Netlify 明确发布 `out`，并跳过 Next 运行时插件。`robots.txt` 与 `sitemap.xml` 显式固定为构建期静态路由。

## 关闭条件

- 静态 `out` 构建通过，且不含任何 `lab` 文件。
- 用户将 `out` 文件夹上传到 Netlify Drop。
- 线上 `/lab` 返回 404，首页、关于页、`/robots.txt` 与 `/sitemap.xml` 保持可访问。

## 关闭记录

- 2026-07-25：`corepack pnpm check` 通过格式、类型、12 个测试文件共 33 项测试和静态生产构建；`out` 不含任何 `lab` 文件。
- 2026-07-25：用户将 `out` 上传到 Netlify Drop 后，带版本查询参数的线上验收确认 `/`、`/about`、`/robots.txt` 和 `/sitemap.xml` 均返回 200，`/lab` 返回 404，且 sitemap 不含 `/lab`。缺陷关闭。
