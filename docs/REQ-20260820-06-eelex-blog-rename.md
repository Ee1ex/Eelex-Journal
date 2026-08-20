# REQ-20260820-06：Eelex Blog 品牌改名

## 文档信息

- ID：REQ-20260820-06
- 状态：In Progress
- 创建日期：2026-08-20
- 更新日期：2026-08-20
- 关联产品：[`PRD.md`](PRD.md)
- 关联方案：[`DEV-20260820-03-eelex-blog-rename.md`](DEV-20260820-03-eelex-blog-rename.md)
- 批准来源：用户于 2026-08-20 批准品牌规格和实施。

## 目标

把现有站点正式产品身份统一为 `Eelex Blog`，npm 包名统一为 `eelex-blog`，并准备将 GitHub 仓库改名为 `Ee1ex/eelex-blog`。

## 范围

- 更新 SEO 单一品牌常量及由其生成的页面标题。
- 更新页头、页尾、README 和 npm 包名中的正式站点身份。
- 同步当前 PRD、文档索引、需求、技术方案和进度记录。
- 在隔离分支准备仓库改名、PR、回滚与未验证项。

## 非目标

- 不重做视觉、组件结构、路由、内容模型、域名或部署平台。
- 不修改文章正文中的历史语境或旧治理记录。
- 不执行 GitHub 仓库改名、Push、PR、Merge 或生产部署。
- 不删除、移动或提交原工作树中的 `.codex/` 与 `public/eelex-avatar.png`。

## 保护边界

所有实现只发生在从 `origin/main@ce22d7d77435e803063f415651da8ceb9ef0c620` 创建的 `codex/eelex-blog-rename` 隔离分支。原工作树的用户未跟踪文件必须保持原路径、原状态，不进入本分支 Diff。

## 验收标准

1. 页面、SEO、页头和页尾的正式名称为 `Eelex Blog`。
2. `package.json` 的 `name` 为 `eelex-blog`。
3. README 使用新标题、说明、截图 alt 和 `Ee1ex/eelex-blog` 链接。
4. `corepack pnpm check`、旧正式名称扫描与 Git Diff 检查通过。
5. 原工作树两个未跟踪用户路径保持不变，隔离分支不包含它们。
6. 远程仓库改名、Push 和 PR 在执行前获得单独明确确认，完成后回读验证。

## 当前证据

- 新品牌合同先失败，最小实现后 4 个测试文件、15 项测试通过。
- README 合同已确认旧 README 会失败；文档与完整质量门禁仍在进行。

## 遗留问题

- GitHub 仓库改名、远程分支、PR、CI 和部署尚未执行。
- 真实线上站点品牌将在远程合并及自动部署后另行验证。
