# 阅读画廊视觉刷新 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use `executing-plans` inline. 用户明确要求不使用 subagent。

**Goal:** 将确认的阅读画廊 UI 迁移到正式站点，保留内容链路并移除实验室。

**Architecture:** 保持现有 App Router 和 MDX repository 不变；用 `globals.css` 的 token 和既有页面/组件 class 完成表现层替换。内容发现仍是唯一 Client Component 交互点，实验室相关路由与状态模块整体删除。

**Tech Stack:** Next.js 16、React 19、TypeScript、Tailwind CSS v4、Vitest。

## Global Constraints

- 不改动 `content/*.mdx`、schema、repository、search 算法、slug 和公开资料数据。
- 不新增依赖、字体、图片、后端或线上操作。
- 删除实验室是用户明确的产品决定；其余公开内容与交互必须保留。
- 每个实现任务先完成对应失败测试，再写最小实现并运行定向测试。

---

### Task 1: 建立视觉与移除实验室的回归契约（Completed）

**Files:**
- Modify: `tests/page-shells.test.tsx`
- Delete: `tests/reading-density.test.ts`

- [ ] 写入失败断言：首页包含“欢迎来到Eelex 的个人博客”“我的记录与思考”、分类控件和搜索控件；共享导航不含“实验室”；关于页包含“关于我”；内容卡片使用分类圆点。
- [ ] 运行 `corepack pnpm exec vitest run tests/page-shells.test.tsx`，预期因当前页面尚未迁移且仍有实验室入口而失败。
- [ ] 删除实验室专用测试，待路由和模块删除后再由完整测试确认无遗留导入。

### Task 2: 迁移全局外框和首页发现区（Completed）

**Files:**
- Modify: `src/app/globals.css`
- Modify: `src/components/site-header.tsx`
- Modify: `src/components/site-footer.tsx`
- Modify: `src/app/page.tsx`
- Modify: `src/components/content-discovery.tsx`
- Modify: `src/components/content-card.tsx`

- [ ] 实现暖骨白画布、柔和环境层、圆角半透明导航、等距焦点样式和减少动效规则。
- [ ] 让首页按已确认文案与间距渲染；筛选在左、搜索在右，移动端堆叠。
- [ ] 为四类筛选实现中性悬停和分类选中态；内容卡片圆点按实际分类使用同一色系。
- [ ] 运行 `corepack pnpm exec vitest run tests/page-shells.test.tsx`，预期通过。

### Task 3: 迁移阅读页、关于页和 404（Completed）

**Files:**
- Modify: `src/app/content/[slug]/page.tsx`
- Modify: `src/components/table-of-contents.tsx`
- Modify: `src/app/about/page.tsx`
- Modify: `src/app/not-found.tsx`

- [ ] 使用与首页一致的纸感 panel、标题比例、元数据、标签和目录布局；不改变文章数据或锚点。
- [ ] 关于页展示“关于我”、原有公开资料和 GitHub 链接；404 保留返回首页内容区的恢复路径。
- [ ] 运行 `corepack pnpm exec vitest run tests/page-shells.test.tsx`，预期通过。

### Task 4: 删除实验室并执行质量收尾（Completed）

**Files:**
- Modify: `src/components/site-header.tsx`
- Modify: `src/app/page.tsx`
- Delete: `src/app/lab/page.tsx`
- Delete: `src/components/lab/reading-density-experiment.tsx`
- Delete: `src/lab/reading-density.ts`
- Delete: `tests/reading-density.test.ts`

- [ ] 删除实验室入口、页面、状态模块与测试，不删除文章/笔记/工具内容。
- [ ] 运行 `corepack pnpm check` 和 `git diff --check`，预期全部通过。
- [ ] 在 320px、768px、1280px 人工检查首页、详情、关于、404、分类、搜索与键盘焦点。

### Task 5: 文档收尾（Completed）

**Files:**
- Modify: `docs/PRD.md`
- Modify: `docs/README.md`
- Modify: `docs/PROG-20260725.md`
- Modify: `docs/REQ-20260725-02-visual-refresh.md`

- [ ] 将当前视觉刷新 REQ 标记为 Done，记录自动和人工验证证据、删除实验室的范围结论与未执行的线上操作。
- [ ] 同步 PRD 与索引，追加进度记录；不改写历史记录。
