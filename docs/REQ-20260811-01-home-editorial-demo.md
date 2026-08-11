# REQ-20260811-01：首页编辑型视觉 Demo

## 文档信息

- ID：REQ-20260811-01
- 状态：Done
- 创建日期：2026-08-11
- 更新日期：2026-08-11
- 关联产品：[`PRD.md`](PRD.md)
- 关联决策：[`BIZ-20260811-01-home-editorial-demo.md`](BIZ-20260811-01-home-editorial-demo.md)
- 关联方案：[`DEV-20260811-01-home-editorial-demo.md`](DEV-20260811-01-home-editorial-demo.md)
- 局部替代：[`REQ-20260725-02-visual-refresh.md`](REQ-20260725-02-visual-refresh.md) 中关于首页表现层的视觉验收；详情页、关于页和 404 本轮不变

## 目标

在不改变首页内容、路由、搜索匹配、分类行为和真实 MDX 数据的前提下，交付一个可本地验证的编辑型首页视觉 demo，作为后续全站 UI 扩展的视觉基线。

## 范围

- 将首页画布、排版、首屏、内容筛选区和内容列表改为暖白纸张感的编辑目录风格。
- 将共享导航和页脚调整为轻量静态框架，以便首页 demo 与全站外框一致。
- 保留现有首页标题、个人简介、3 篇内容、分类、标签、日期、搜索输入、结果数量、空状态和内容链接。
- 保留键盘焦点、跳至主要内容入口、`aria-pressed`、`aria-live`、减少动效和现有路由。
- 提供本地 Next.js 预览地址供用户验证视觉方向。

## 非目标

- 不修改 `content/*.mdx`、内容 schema、repository、search 实现或详情页正文。
- 不扩展关于页、404 或其他页面的视觉改版。
- 不新增外部字体、图片、依赖、后端、CMS、登录、持久化状态或新路由。
- 不推送远程、不部署生产环境、不修改 Netlify 设置。

## 验收标准与结果

| 验收项 | 结果 | 证据 |
| --- | --- | --- |
| 暖白画布、黑色编辑型排版、细分隔线、行式内容目录 | 通过 | `src/app/globals.css`、`src/app/page.tsx`、`src/components/content-card.tsx` |
| 首页既有标题、简介、3 篇真实内容和链接保留 | 通过 | `tests/page-shells.test.tsx`、`tests/content-repository.test.ts` |
| 搜索、分类叠加、结果数量和空状态保留 | 通过 | `tests/content-search.test.ts`、`tests/page-shells.test.tsx` |
| 共享导航、页脚、跳至主要内容和 `/lab` 移除约束保留 | 通过 | `tests/app-shell.test.tsx`、`tests/page-shells.test.tsx` |
| 类型、Lint、测试和生产构建 | 通过 | `corepack pnpm check`：12 个测试文件、33 项测试通过；Lint 仅有 4 条既有 warning |
| Git 差异卫生 | 通过 | `git diff --check` 无输出 |
| 本地预览可访问 | 通过 | `http://localhost:3101/`、`/content/designing-readable-interfaces`、`/about` 返回 200；无效路由返回 404 |

## 验证限制

当前环境没有可用的浏览器自动化运行时，因此没有生成真实浏览器截图或执行点击级视口验收；源码已检查 `320px` 下的响应式 class、无首页 `whitespace-nowrap` 和固定最小宽度风险。用户可直接打开本地预览验证视觉方向。

## 完成结果

- 分支：`codex/home-editorial-demo`
- 主要实现提交：`f32a80e`
- 设计文档：[`superpowers/specs/2026-08-11-home-editorial-demo-design.md`](superpowers/specs/2026-08-11-home-editorial-demo-design.md)
- 实施计划：[`superpowers/plans/2026-08-11-home-editorial-demo.md`](superpowers/plans/2026-08-11-home-editorial-demo.md)
- 本次未推送、未部署；首页 demo 保持本地可验证状态。

## 后续

待用户完成首页视觉验证后，再为详情页、关于页和 404 另行创建紧密范围的 REQ/BIZ/DEV，不在本需求中顺手扩展。
