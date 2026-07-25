# Phase 7 正式发布与 GitHub 收尾 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 在不改变站点功能的前提下，完成真实 GitHub README 展示素材、自动静态发布准备、公开验证证据与 Phase 7 文档收尾。

**Architecture:** 站点继续由 Next.js `output: "export"` 构建为 `out`，GitHub Actions 仅验证质量，Netlify GitHub 集成负责静态托管。仓库内变更只涉及 README、真实截图和记录文档；Netlify 账户操作、推送和发布在明确授权后由用户执行或确认。

**Tech Stack:** Next.js 16、React 19、TypeScript、MDX、pnpm、Vitest、GitHub Actions、Netlify 静态托管。

## Global Constraints

- 严格遵循 `REQ-20260725-03`、`DEV-20260725-04`、`PRD.md` 与 `docs/README.md` 的文档治理规则。
- 不改动 `src/`、`content/`、`next.config.mjs`、`netlify.toml`、`package.json`、锁文件或 GitHub Actions，除非现有自动发布验证证明存在缺陷并先更新 DEV。
- 不恢复 `/lab`；公开 sitemap、README 和截图均不得出现实验室。
- 不加入第三方统计、外链字体、后端、CMS、运行时函数或新依赖。
- `.codex/`、`.next/`、`out/`、`node_modules/` 与密钥不得纳入提交。
- 未获单独授权不得提交、推送、部署、创建 PR 或操作 Netlify/GitHub 账户。
- 所有用户可见 README 文案只面向读者，不出现内部制作流程或验收元叙事。

---

### Task 1: 生成并审查真实 README 展示素材

**Files:**

- Create: `docs/assets/phase-7/home-desktop.png`
- Create: `docs/assets/phase-7/content-mobile.png` 或 `docs/assets/phase-7/about-mobile.png`
- Verify: `https://harmonious-sprite-8b742a.netlify.app/`

**Interfaces:**

- Consumes: 当前生产地址、阅读画廊 UI、现有公开内容和 `REQ-20260725-03` 的截图范围。
- Produces: 可由根目录 `README.md` 以相对路径引用的真实公开素材。

- [ ] **Step 1: 访问生产首页并确认展示基线**

  在 `https://harmonious-sprite-8b742a.netlify.app/` 以桌面视口打开首页，确认地址栏、账户信息、Netlify 控制台和本地路径均不进入截图。

- [ ] **Step 2: 保存桌面首页截图**

  保存 `docs/assets/phase-7/home-desktop.png`。图片必须展示真实阅读画廊首页、导航、介绍卡片和内容发现区域，且不得包含 `/lab`、浏览器界面或个人敏感信息。

- [ ] **Step 3: 保存移动端内容或关于页截图**

  以窄视口打开一个已发布内容页或 `/about`，保存 `docs/assets/phase-7/content-mobile.png` 或 `docs/assets/phase-7/about-mobile.png`。图片必须来自同一正式地址，展示移动端布局且不得包含浏览器界面、控制台或敏感信息。

- [ ] **Step 4: 人工核对素材真实性与可公开性**

  核对每张图片的路径、页面、当前视觉、可公开字段和图片尺寸。若线上内容与当前 `main` 不一致，停止使用该素材并先记录差异。

### Task 2: 将根目录 README 更新为真实项目首页

**Files:**

- Modify: `README.md`
- Consumes: `docs/assets/phase-7/home-desktop.png`、移动端截图、`docs/PRD.md`、`docs/REQ-20260725-03-phase-7-release-github-closure.md`
- Produces: 准确描述当前 v1 成品、可本地运行和可静态发布的 GitHub 首页。

- [ ] **Step 1: 写入最终读者导向的项目摘要和线上入口**

  用中文说明 Eelex Code Hub 的内容阅读、个人资料和设计展示价值；放置生产地址 `https://harmonious-sprite-8b742a.netlify.app/`，不写 Phase 编号、开发过程或未确认承诺。

- [ ] **Step 2: 嵌入两张真实截图**

  使用相对路径 `docs/assets/phase-7/home-desktop.png` 与实际创建的移动端图片。每张图片附有说明性替代文本，不使用外链、占位图或虚假徽章。

- [ ] **Step 3: 写入与当前代码一致的功能和技术说明**

  功能仅列出本地 MDX 内容、分类/轻量搜索、内容详情目录、公开资料、响应式、SEO、404 和静态发布；技术栈从 `package.json` 与配置文件读取。明确实验室已不属于 v1，不把它列为功能。

- [ ] **Step 4: 修正本地开发与发布命令**

  开发使用 `corepack pnpm install --frozen-lockfile` 与 `corepack pnpm dev`；质量检查使用 `corepack pnpm check`；静态发布使用 `corepack pnpm build` 生成 `out`。说明 Netlify 正式流程由 GitHub 集成发布 `out`，不把 `next start` 写成静态发布方式。

- [ ] **Step 5: 保留简洁文档入口**

  保留并更新指向 `docs/PRD.md`、`docs/README.md`、当前 Phase 7 REQ 与 DEV 的链接，不罗列已过期的阶段状态。

- [ ] **Step 6: 运行格式与内容核对**

  Run: `corepack pnpm format:check`

  Expected: `All matched files use Prettier code style!`

  逐项确认 README 地址、截图路径、功能、命令与当前文件一致。

### Task 3: 进行本地静态产物与公开路由发布前验证

**Files:**

- Verify: `next.config.mjs`
- Verify: `netlify.toml`
- Verify: `out/`
- Verify: `tests/static-export.test.ts`

**Interfaces:**

- Consumes: `DEV-20260725-03` 的静态导出契约和现有自动测试。
- Produces: 等待用户连接 Netlify GitHub 集成前的构建、路由与产物证据。

- [ ] **Step 1: 运行完整质量门禁与静态构建**

  Run: `corepack pnpm check`

  Expected: 格式、类型、lint、Vitest 和 `next build` 均完成；已知 `src/content/repository.ts` 的既有 lint warning 单独记录，不接受新的 error 或 warning。

- [ ] **Step 2: 检查静态产物路由集合**

  Run: `Get-ChildItem -Recurse -File out | Select-Object -ExpandProperty FullName`

  Expected: 包含首页、关于页、至少三个内容页、`robots.txt` 和 `sitemap.xml`；路径中不出现 `lab`。

- [ ] **Step 3: 检查差异卫生与提交范围**

  Run: `git diff --check` 和 `git status --short`

  Expected: 无空白错误；仅包含 Phase 7 文档、README、真实截图和必要的测试/配置修复，不包含 `.codex/` 或构建产物。

### Task 4: 请求并记录 Netlify GitHub 自动发布证据

**Files:**

- Modify: `docs/PROG-20260725.md`
- Modify: `docs/REQ-20260725-03-phase-7-release-github-closure.md`

**Interfaces:**

- Consumes: 已获单独授权的 Phase 7 提交/推送、用户在 Netlify 控制台完成的 GitHub 连接结果。
- Produces: GitHub Actions、Netlify 构建、部署提交 SHA 和线上路由的可复核记录。

- [x] **Step 1: 提示并协助用户完成账户侧操作**

  已提示并协助用户在浏览器中完成 Netlify 与 GitHub 的连接；仓库内 `netlify.toml` 仍声明 `corepack pnpm build`、`out` 和 `NETLIFY_NEXT_PLUGIN_SKIP = "true"`。

- [x] **Step 2: 获得提交、推送与发布授权**

  用户已明确授权仅提交 Phase 7 文件并推送 `main`，以触发 Netlify 自动发布。

- [x] **Step 3: 核对同一提交的 CI 与自动发布结果**

  `924ed79` 的 GitHub Actions CI 已成功完成；用户确认同一轮最新 Netlify 部署无异常。正式地址为 `https://harmonious-sprite-8b742a.netlify.app/`。

- [x] **Step 4: 核对生产核心路由**

  线上已核对 `/`、`/about`、`/robots.txt`、`/sitemap.xml` 为 200，`/lab` 为 404；sitemap 不含 `/lab`。内容页的线上核心链路由此前生产验收保持正常。

### Task 5: 收集地区、流量与文档收尾证据

**Files:**

- Modify: `docs/PROG-20260725.md`
- Modify: `docs/REQ-20260725-03-phase-7-release-github-closure.md`
- Modify: `docs/README.md`
- Modify: `docs/PRD.md`

**Interfaces:**

- Consumes: 用户提供的中国大陆/海外网络访问记录、首次发布日和第 7 天的 Netlify 用量快照。
- Produces: 可判定 Phase 7 是否完成的完整 DoD 证据。

- [x] **Step 1: 记录两地访问事实**

  用户确认中国大陆与海外访问验证已完成。用户未提供网络环境与浏览器明细；依据 `BIZ-20260725-04`，本次收尾以用户确认作为验收证据，不扩写未提供的技术细节。

- [x] **Step 2: 记录用量观察豁免**

  用户明确批准不提供 Netlify 当前用量基线或第 7 天快照。该豁免记录在 `BIZ-20260725-04`；未提供的数据不作任何流量结论。

- [x] **Step 3: 对照 REQ 逐项关闭文档**

  已更新 REQ、PROG、PRD 和文档索引。两地访问由用户确认；用量观察已获用户批准豁免，Phase 7 可关闭；遗留风险与后续运营任务已写入 PROG。

## Plan Self-Review

- Spec coverage：Task 1-2 覆盖真实 README 与素材；Task 3 覆盖静态导出与质量验证；Task 4 覆盖 GitHub/Netlify 自动发布和线上路由；Task 5 覆盖地区、流量及文档收尾。
- Placeholder scan：没有 `TODO`、`TBD` 或未定义实现动作；所有外部操作均明确要求用户账户侧确认。
- Scope check：计划不改产品功能，不引入平行部署方案；自动发布、公开验证与 README 收尾共用同一静态产物链路。
