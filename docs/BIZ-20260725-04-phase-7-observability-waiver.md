# BIZ-20260725-04：Phase 7 用量观察豁免与验收收尾

## 文档信息

- ID：BIZ-20260725-04
- 状态：Approved
- 创建日期：2026-07-25
- 更新日期：2026-07-25
- 关联产品：[PRD.md](PRD.md)
- 关联需求：[REQ-20260725-03-phase-7-release-github-closure.md](REQ-20260725-03-phase-7-release-github-closure.md)
- 关联方案：[DEV-20260725-04-phase-7-release-github-closure.md](DEV-20260725-04-phase-7-release-github-closure.md)

## 决策

用户确认中国大陆与海外访问验证已完成，并明确批准不提供 Netlify 当前用量基线或第 7 天用量快照。Phase 7 不再以用量观察作为关闭前置条件；REQ 可在记录该豁免及其残余风险后关闭。

## 理由

Phase 7 的核心发布闭环已具备可复核证据：GitHub `main` 已连接 Netlify，生产部署 `main@8633351` 为 `Published`，GitHub Actions CI 成功，公开核心路由可访问且已移除的 `/lab` 返回 404。用量数据属于发布后的运营观察，不影响当前静态站点的功能、SEO 文件或发布链路正确性。

## 影响与边界

- 不新增统计脚本、第三方服务、后端、运行时函数或依赖。
- 不修改 `next.config.mjs`、`netlify.toml`、GitHub Actions 或应用代码。
- 不得将“未提供用量数据”写成“无流量”或“流量达标”。
- 后续如需分析流量，应作为独立运营任务重新记录 Netlify 数据，不追溯伪造 Phase 7 数据。

## 验收调整

以下事项作为 Phase 7 关闭证据：

1. 用户确认中国大陆与海外访问验证完成。
2. Netlify 生产部署 `main@8633351` 显示 `Published`。
3. GitHub Actions 对 `8633351` 的 CI 成功。
4. 首页、关于页、`robots.txt`、`sitemap.xml` 为 200，`/lab` 为 404。
5. Netlify 用量基线与第 7 天快照经用户明确豁免，不再阻塞关闭。

## 批准记录

- 2026-07-25：用户明确表示“访问验证已完成，用量我暂时不给，就这样对 P7 收尾”，批准本决策及其对 `REQ-20260725-03` 的验收调整。
