# DEV-20260724-06：Phase 4 MDX 内容模型与内容发现方案

## 文档信息

- ID：DEV-20260724-06
- 状态：Approved
- 创建日期：2026-07-24
- 更新日期：2026-07-24
- 关联需求：[REQ-20260724-06-phase-4-mdx-content-discovery.md](REQ-20260724-06-phase-4-mdx-content-discovery.md)
- 关联决策：[BIZ-20260724-02-phase-2-product-design-decisions.md](BIZ-20260724-02-phase-2-product-design-decisions.md)

## 方案

`content/*.mdx` 与 `public/content/*` 是唯一真实内容来源。`src/content/schema.ts` 以 `zod` 校验元数据；`src/content/repository.ts` 使用 `gray-matter` 读取并排序、生成目录与静态参数；`src/content/search.ts` 保持为纯筛选函数。首页只将摘要传入 `ContentDiscovery` Client Component，MDX 文件读取和详情渲染保持 Server 端。

保持既有 `@next/mdx`，通过 `remark-frontmatter` 去除 frontmatter 正文输出、`rehype-slug` 生成标题锚点；不引入远程 MDX、CMS、后端、搜索服务或语法高亮依赖。

## 实施与验证记录

- 新增 `gray-matter@4.0.3`、`zod@4.4.3`、`remark-frontmatter@5.0.0`、`rehype-slug@6.0.0` 与 `github-slugger@2.0.0`。
- YAML 未加引号日期会解析为 `Date`；内容 schema 在解析边界规范化为 `YYYY-MM-DD`，并有回归测试。
- 动态 MDX 路由使用 `generateStaticParams` 与 `dynamicParams = false`；Vitest 不编译 Next MDX loader，因此真实 MDX 端到端渲染由生产构建验证。
- 新增路由滚动重置组件，以 pathname 为边界执行 `window.scrollTo(0, 0)`。
- 格式、全量测试、类型检查、生产构建和差异检查均通过；生产依赖审计与人工视觉检查按用户指示未执行。

## 风险与遗留项

- MDX 只接受仓库内受信任内容；若未来引入外部或用户输入，必须重新设计安全边界。
- worktree 下的生产构建仍显示多 lockfile 的已知根目录推断 warning，但构建和静态页面生成均成功；不在本 Phase 修改无关 Turbopack 配置。
