# DEV-20260724-05：Phase 3 页面骨架与模拟内容方案

## 文档信息

- ID：DEV-20260724-05
- 状态：Approved
- 创建日期：2026-07-24
- 更新日期：2026-07-24
- 关联需求：[`REQ-20260724-05-phase-3-page-shells.md`](REQ-20260724-05-phase-3-page-shells.md)
- 关联决策：[`BIZ-20260724-02-phase-2-product-design-decisions.md`](BIZ-20260724-02-phase-2-product-design-decisions.md)
- 架构路线：[`DEV-20260724-01-v1-architecture-roadmap.md`](DEV-20260724-01-v1-architecture-roadmap.md)
- 前置方案：[`DEV-20260724-04-phase-2-design-foundation.md`](DEV-20260724-04-phase-2-design-foundation.md)
- 进度记录：[`PROG-20260724.md`](PROG-20260724.md)

## 目标

以 Next.js App Router 的 Server Component 默认模型建立全部 Phase 3 页面骨架；共享页面框架和内容卡片复用统一模拟来源，且不引入真实内容系统、搜索状态或新增依赖。

## 技术方案

### 路由与渲染边界

| 路由 | 页面职责 | 数据与异常处理 |
| --- | --- | --- |
| `/` | 个人区、静态内容发现区和模拟内容列表 | 读取模拟资料与模拟内容集合 |
| `/content/[slug]` | 模拟内容详情 | 由 slug 查询同一集合；不存在时调用 `notFound()` |
| `/about` | 模拟完整个人资料 | 读取模拟资料；无联系方式时不渲染入口 |
| `/lab` | 独立实验室页面壳 | 不导入内容集合或详情组件 |
| `not-found` | 无效路径恢复 | 链接到 `/#content` |

- 根布局保持 Server Component，负责加载全局样式、页面主框架和全站元数据。
- 导航仅在需要根据当前 pathname 呈现当前页状态时使用一个最小 Client Component；页面、模拟数据、内容卡片和页脚保持 Server Component。
- `/content/[slug]` 通过统一查询函数获取模拟项；不读取文件系统、不解析 MDX、不引入 `generateMetadata`、sitemap 或 SEO 扩展。

### 模拟数据边界

- 创建一个 `MockContentItem` 类型和一个按日期降序的常量集合，最小字段为 `slug`、`title`、`excerpt`、`publishedAt`、`category`、`tags`、`body` 与可选 `cover`。
- 创建 `getMockContentBySlug(slug)`，首页直接消费集合，详情只通过该函数读取单项。
- 分类值固定为文章、学习笔记、工具分享；模拟数据至少覆盖三类内容。
- 模拟个人资料与模拟内容分开保存。它们只服务 Phase 3 的结构验证，不得使用 MDX frontmatter、文件遍历、schema 校验或可迁移的发布抽象。

### 组件边界

| 组件 | 负责 | 不负责 |
| --- | --- | --- |
| `SiteHeader` | 品牌、主导航、当前页语义、跳至主内容链接 | 内容查询、搜索状态 |
| `SiteFooter` | 站点名称与版权 | 虚构外部链接、页面业务逻辑 |
| `ContentCard` | 摘要、日期、分类、标签、可选封面与详情链接 | 排序、筛选、MDX 正文渲染 |
| 模拟数据模块 | 提供唯一模拟来源和最小查询函数 | 真实内容模型、文件读取、校验 |
| 页面组件 | 组合结构和路由恢复 | 跨页面复制内容或本地筛选状态 |

### 静态内容发现控件

- 搜索框使用只读或禁用语义；分类项使用原生禁用按钮或禁用 fieldset。
- 控件必须通过文字、边框和禁用状态表达当前不可用，不依赖分类色。
- 不添加事件处理器、`useState`、URL 参数、字符串规范化、列表过滤或结果计数逻辑。
- Phase 4 替换这些控件时，保留首页内容区锚点、四类结构和无色彩依赖的状态表达。

### 样式与响应式

- 只消费 `src/app/globals.css` 已定义的语义 token 与 `@theme inline` 映射；允许添加基础元素、焦点和页面消费层样式，但不修改既定 token 值、不创建 Tailwind 配置文件。
- 首页宽容器使用 `--eelex-width-wide`，详情正文使用 `--eelex-width-reading`；不提前实现目录栏。
- 首页 PC 个人区使用 Phase 2 规定的视觉比例，手机端单列紧凑呈现；导航在手机端保留三个入口。
- 覆盖不存在时卡片完整使用文本布局；联系方式不存在时整个链接区不渲染。
- 不新增持续动画、滚动绑定动画或视差；现有 `prefers-reduced-motion` 规则是必须保留的全局保护。

## 测试方案

- 更新 `tests/app-shell.test.tsx`，断言根布局的 `lang`、共享主区域、导航、页脚和跳至主内容链接。
- 新增页面骨架测试：首页包含个人区、`#content`、禁用搜索/分类控件和来自统一集合的内容卡片；详情可由 slug 渲染并链接回 `/#content`。
- 新增模拟来源测试：三类分类都有覆盖，内容按日期降序，未知 slug 返回空值并由页面进入 404。
- 新增 404 与关于我/实验室结构断言，确认实验室不依赖内容集合、关于页不生成空联系方式。
- 保留 `tests/design-tokens.test.ts` 和 `tests/engineering-config.test.ts`，不削弱既有 token、质量命令或工程契约。
- 不引入浏览器测试、截图测试或新的测试依赖；桌面与手机视觉、刷新、跳转、键盘和减少动效以人工检查验证。

## 预期文件

### 新增

- `src/app/about/page.tsx`
- `src/app/content/[slug]/page.tsx`
- `src/app/lab/page.tsx`
- `src/app/not-found.tsx`
- `src/components/site-header.tsx`
- `src/components/site-footer.tsx`
- `src/components/content-card.tsx`
- `src/mocks/profile.ts`
- `src/mocks/content.ts`
- `tests/page-shells.test.tsx`

### 修改

- `src/app/layout.tsx`
- `src/app/page.tsx`
- `src/app/globals.css`
- `tests/app-shell.test.tsx`

## 禁止项

- 不添加依赖、Tailwind 配置、外部字体、后端、数据库、CMS 或搜索库。
- 不创建独立“全部文章”页、真实 MDX 读取层、frontmatter 校验或可操作实验。
- 不实现分类筛选、搜索、结果状态计算、URL 查询状态、SEO、部署或远程 CI 操作。
- 不让核心页面导入实验室实现，不让实验室导入模拟内容集合。

## 验证矩阵

1. 定向 Vitest：页面骨架、模拟来源和应用壳测试。
2. 全量质量门禁：`corepack pnpm format:check`、`typecheck`、`lint`、`test`、`build`、`check`。
3. 依赖与差异：`corepack pnpm peers check`、`corepack pnpm audit --prod`、`git diff --check`。
4. 人工检查：桌面与手机首页比例、导航、详情返回、404、刷新、键盘焦点和 `prefers-reduced-motion`。
5. 文档检查：相对链接、状态、索引、REQ/DEV/PROG 引用和 Phase 3 非目标一致。

## 风险与处置

- 为导航当前状态引入 Client Component 的范围应严格限制在导航本身，避免页面和模拟数据无必要地进入客户端包。
- 静态禁用控件必须传达真实状态；如果产品决定提前实现搜索，应先新建或修订 REQ，而不是在本方案中增加临时事件处理。
- 模拟正文仅验证阅读页面层级；真实 MDX 的图片、代码块和目录必须留待 Phase 4 验证。
- 远程 CI、Netlify 与跨地区访问不在本方案范围内，完成记录不得将它们描述为已验证。

## 当前验证证据

- 用户于 2026-07-24 批准本方案的路由表、共享组件边界、模拟数据边界、静态控件策略、测试范围和禁止项。
- 本方案创建前工作树干净，未对应用代码、依赖、远程仓库或部署环境作出修改。

## 批准记录

- 2026-07-24：用户批准本 DEV；下一步应先创建逐任务实施计划，页面代码须按已批准计划执行。
