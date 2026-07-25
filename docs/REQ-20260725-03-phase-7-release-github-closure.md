# REQ-20260725-03：Phase 7 正式发布、公开验证与 GitHub 项目首页收尾

## 文档信息

- ID：REQ-20260725-03
- 状态：Done
- 创建日期：2026-07-25
- 更新日期：2026-07-25
- 关联产品：[PRD.md](PRD.md)
- 前置需求：[REQ-20260725-01-phase-6-seo-accessibility-quality.md](REQ-20260725-01-phase-6-seo-accessibility-quality.md)、[REQ-20260725-02-visual-refresh.md](REQ-20260725-02-visual-refresh.md)
- 关联决策：[BIZ-20260725-03-visual-refresh.md](BIZ-20260725-03-visual-refresh.md)
- 前置方案：[DEV-20260725-03-netlify-static-export.md](DEV-20260725-03-netlify-static-export.md)
- 实施方案：[DEV-20260725-04-phase-7-release-github-closure.md](DEV-20260725-04-phase-7-release-github-closure.md)
- 关联缺陷：[BUG-20260725-01-netlify-stale-lab-route.md](BUG-20260725-01-netlify-stale-lab-route.md)（Closed）

## 目标

在保持现有静态站点、阅读画廊 UI、内容和 SEO 行为不变的前提下，完成可重复的 Netlify 自动发布、公开地址与地区可访问性验证、Netlify 基础用量与短期流量核对，以及基于真实成品的 GitHub 项目首页收尾。

## 已确认输入与决策

- 正式生产地址为 `https://harmonious-sprite-8b742a.netlify.app/`。
- 站点继续使用 Next.js `output: "export"`；`next build` 生成独立的 `out` 静态目录。
- Netlify 必须使用现有 `netlify.toml`，以 `corepack pnpm build` 构建并发布 `out`，且保留 `NETLIFY_NEXT_PLUGIN_SKIP = "true"`。
- GitHub `main` 推送后由 Netlify 的 GitHub 集成自动执行静态构建和发布；现有 GitHub Actions 继续只负责质量检查，不新增重复部署工作流。
- `/lab` 已取消，必须持续返回 404，且不得出现在 sitemap、导航、首页、README 或公开展示素材中。
- 地区验收采用至少一份中国大陆真实网络记录和至少一份海外真实网络记录。
- Netlify 用量在首次自动发布后记录基线，并在 7 天后补充短期流量快照。
- GitHub README 使用真实线上截图；最低包含桌面首页和移动端内容页或关于页各一张。

## 范围

- 连接 GitHub 仓库与 Netlify，使已授权的 `main` 推送触发静态构建和发布。
- 复核 GitHub Actions 质量检查、Netlify 构建日志和已发布提交之间的一致性。
- 验收首页、关于页、至少一个有效内容页、`/robots.txt`、`/sitemap.xml`、未知路由和已移除的 `/lab`。
- 收集并记录中国大陆和海外对核心访问路径、SEO 文件和 404 路由的真实访问证据。
- 查看并记录 Netlify 基础用量与 7 天短期流量数据，不接入第三方统计脚本。
- 用真实项目状态、功能、技术栈、线上地址、截图、本地运行方式和静态发布方式更新根目录 README。
- 同步 REQ、DEV、PROG、PRD、文档索引和验证证据。

## 非目标

- 不修改页面 UI、MDX 内容、内容模型、搜索/分类规则、公开资料、路由、metadata、canonical、robots 或 sitemap 实现。
- 不恢复实验室，不新增后端、运行时函数、数据库、CMS、登录、评论、RSS、订阅、第三方统计脚本或依赖。
- 不创建 Pull Request；未获单独授权时不提交、不推送、不部署。
- 手动 Netlify Drop 仅可作为自动发布故障时的临时恢复手段，不能作为本需求的正式默认发布流程。

## 验收标准

1. 一次已授权的 `main` 推送触发 GitHub Actions 质量检查，并由 Netlify 自动发布同一提交生成的静态 `out`。
2. Netlify 构建使用 `corepack pnpm build`，发布目录为 `out`，且不启用 Next 运行时插件；构建产物不含任何 `lab` 文件。
3. 线上 `/`、`/about`、至少一个有效 `/content/[slug]`、`/robots.txt` 和 `/sitemap.xml` 返回预期成功响应；未知路由和 `/lab` 返回 404。
4. sitemap 只列出现行公开路由与内容页，robots 正确引用 sitemap，页面 canonical 指向正式生产地址。
5. 中国大陆和海外各有可检查的真实访问记录，覆盖首页、有效内容页、`/robots.txt`、`/sitemap.xml` 与 `/lab`；记录访问日期、地区、网络环境、浏览器和结果。
6. Netlify 基础用量可查看；首次自动发布后记录基线，并在 7 天后记录短期流量快照和数据查看日期。
7. README 准确呈现项目定位、已完成的 v1 功能、技术栈、线上地址、真实截图、本地开发与静态发布说明；不得保留 Phase 3、实验室、占位素材或失实部署描述。
8. `corepack pnpm check`、`git diff --check` 和相关线上人工验收通过；既有 lint warning 与新增问题分开记录。
9. 文档收尾门禁完成，且提交不包含 `.codex/`、`.next/`、`out/`、`node_modules/`、密钥或无关改动。

## 依赖与边界

- 依赖 Phase 4 的本地 MDX 内容模型、内容发现和静态内容路由。
- 依赖视觉刷新后已取消实验室的阅读画廊 UI 与现有公开资料。
- 依赖 Phase 6 的统一 SEO 配置、内容图片校验、metadata、robots、sitemap 和 404 行为。
- 依赖已关闭缺陷 `BUG-20260725-01` 的静态导出修复；不得回退到会复现旧 `/lab` 路由的 Next 运行时发布路径。
- Netlify GitHub 连接、首次自动发布和用量查看需要用户在 Netlify 控制台完成相应操作；Agent 只能在需要时提示，不能代替用户操作账户。

## 风险与处置

- Netlify GitHub 集成的权限、构建失败或发布状态属于外部系统风险。出现问题时先保留构建日志、提交 SHA 和发布 URL，再定位配置或环境差异。
- 中国大陆与海外网络表现可能不同。任何不可访问或明显异常都必须如实记录，并由用户决定是否调整平台或产品基线，不能用未验证结论替代实际证据。
- 若不采用自动发布，现行 PRD 的“Git 推送后自动部署”完成标准无法满足；必须先通过新的产品决策和 PRD 更正，再改变本需求。
- README 截图必须来自实际线上或同提交的本地成品，且不得泄露账户、控制台、密钥或用户隐私信息。

## 批准记录

- 2026-07-25：用户批准本需求、独立 Phase 7 DEV，以及 Netlify GitHub 自动发布、7 天流量观察和真实截图范围。当前仅完成需求与方案文档建立；尚未修改应用代码、README、测试、配置、Git 历史、远程仓库或 Netlify 设置，亦未部署。
- 2026-07-25：用户确认开始实施。已生成并审查真实线上截图、更新根目录 README，并通过 `corepack pnpm check`、`git diff --check` 与静态产物路由核对；用户已在浏览器完成 Netlify 与 GitHub 连接。应用代码和发布配置未改动；同一提交的自动发布、地区和第 7 天流量证据仍待记录。
- 2026-07-25：Phase 7 的 README、截图和进度记录已推送至 `main`（`924ed79`）；同一提交的 GitHub Actions CI 成功，用户确认最新 Netlify 部署无异常。线上首页、关于页、`robots.txt` 与 `sitemap.xml` 为 200，`/lab` 为 404；中国大陆与海外访问证据及第 7 天用量观察尚未完成，REQ 保持 `In Progress`。
- 2026-07-25：用户确认中国大陆与海外访问验证已完成，并明确批准不提供 Netlify 用量基线或第 7 天快照。依据 [BIZ-20260725-04-phase-7-observability-waiver.md](BIZ-20260725-04-phase-7-observability-waiver.md)，用量观察不再阻塞关闭；`main@8633351` 的 Netlify 生产部署为 `Published`，对应 CI 成功，REQ 状态更新为 `Done`。未提供的用量数据不作任何流量结论。

## 遗留问题

- 无产品或技术范围遗留问题。实施到 Netlify GitHub 连接、首次自动发布、地区验收和用量查看时，必须提示用户完成其账户侧操作，并在取得对应证据后再推进下一步。
