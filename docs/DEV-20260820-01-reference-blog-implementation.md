# DEV-20260820-01：参考博客体验技术方案

## 文档信息

- ID：DEV-20260820-01
- 状态：Approved
- 创建日期：2026-08-20
- 更新日期：2026-08-20
- 关联需求：[`REQ-20260820-01-reference-blog-experience.md`](REQ-20260820-01-reference-blog-experience.md)
- 关联决策：[`BIZ-20260820-01-reference-blog-scope.md`](BIZ-20260820-01-reference-blog-scope.md)

## 现有调用链

`Home → getAllContent() → ContentDiscovery → filterContent()` 继续作为首页内容入口。`ContentSummary` 的 `cover`/`coverAlt` 继续承载封面；repository 继续负责 MDX 排序、正文与目录。详情页仍使用静态参数和本地 MDX 动态导入。

## 实施方案

- 不新增依赖，使用 Next.js App Router、React、Tailwind CSS v4 和系统字体。
- 将公开 profile 扩展为项目链接、反馈联系方式和站点起始日期的唯一配置源。
- 添加静态派生工具，计算分类、标签、年份归档、字数和预计阅读时间。
- 添加共享页面壳与侧栏组件；首页、归档、搜索、关于和详情复用同一视觉结构。
- 搜索与归档筛选使用客户端状态和 URL 查询参数，不引入服务端搜索或数据库。
- 主题/背景偏好仅存于浏览器 localStorage；首屏脚本在 hydration 前恢复，避免闪烁。
- 复制链接使用 Clipboard API，并提供不可用时的明确反馈。
- RSS 由静态 Route Handler 从本地 MDX 生成。
- 默认封面使用项目内真实图片资产，不热链参考站资源。

## 风险与缓解

- 静态导出与查询参数：页面保持静态，筛选在客户端完成并用 Suspense 包裹。
- 主题首屏闪烁：在根布局插入最小同步初始化脚本，并保持无脚本时亮色可读。
- 三栏移动端拥挤：在小于桌面断点时隐藏辅助侧栏，将项目/反馈入口收纳到正文与菜单。
- 功能扩展影响旧测试：先更新需求断言，再实现组件，保留 repository、SEO 和内容校验回归。

## 验证策略

- Vitest：页面壳、内容派生、搜索、归档、主题控件、复制链接结构和删除项断言。
- 静态检查：Prettier、TypeScript、ESLint、Next build、静态导出与 `git diff --check`。
- 浏览器：桌面与 390×844 首页、搜索、归档、详情、关于；验证菜单、主题、搜索、复制链接和返回顶部。
- Product Design QA：参考站与本地实现同视口对照，P0/P1/P2 清零后交付。
