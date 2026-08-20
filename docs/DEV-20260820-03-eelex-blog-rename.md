# DEV-20260820-03：Eelex Blog 品牌改名方案

## 文档信息

- ID：DEV-20260820-03
- 状态：Approved
- 创建日期：2026-08-20
- 更新日期：2026-08-20
- 关联需求：[`REQ-20260820-06-eelex-blog-rename.md`](REQ-20260820-06-eelex-blog-rename.md)

## 实现决策

- `src/site/seo.ts` 的 `siteName` 是 SEO 和页面标题的单一品牌常量，改为 `Eelex Blog`，不改变 URL 与描述逻辑。
- 页头和页尾各自存在可见品牌文本，做精确替换，不抽象新组件或重构页面壳。
- `package.json` 只修改 `name` 为 `eelex-blog`，不改版本、脚本、依赖、Node 或 pnpm 版本。
- README 与当前治理文档同步新身份；历史记录中的旧名称不做全局替换。

## 受影响文件

- 应用：`src/site/seo.ts`、`src/components/site-header.tsx`、`src/components/site-footer.tsx`。
- 工程：`package.json`。
- 测试：`tests/seo.test.ts`、`tests/app-shell.test.tsx`、`tests/page-shells.test.tsx`、`tests/engineering-config.test.ts`。
- 文档：`README.md`、`docs/PRD.md`、`docs/README.md`、本 REQ/DEV 与 `docs/PROG-20260820.md`。

## 验证命令

```text
corepack pnpm vitest run tests/seo.test.ts tests/app-shell.test.tsx tests/page-shells.test.tsx tests/engineering-config.test.ts
corepack pnpm check
rg -n "Eelex Code Hub|Eelex Journal|eelex-journal|Eelex-Journal" README.md package.json src tests
git diff origin/main...HEAD --check
```

## GitHub 仓库改名步骤

1. 本地验证完成后提供分支、提交、文件范围、测试、PR、Merge、回滚和未验证项。
2. 用户明确确认远程动作后，使用 GitHub 插件把仓库改名为 `eelex-blog`。
3. 回读新仓库路径、默认分支、Commit、开放 PR、About 和旧 URL 重定向。
4. Push `codex/eelex-blog-rename`，创建 base `main` 的 PR；完成后回读 head/base、提交和检查状态。
5. Merge 与生产部署仍按独立高影响边界确认和验证。

## 回滚

- 本地通过 Revert 提交恢复旧品牌，不 Force Push、不改写历史。
- GitHub 仓库改名后如需回滚，使用仓库设置恢复旧名，并回读默认分支、Commit、PR 与链接。
- 站点发布回滚使用已验证的前一 main Commit；不删除用户未跟踪文件。

## 验证证据

- 改名前基线 `corepack pnpm check`：13 个测试文件、44 项测试通过；类型与 12 个静态页面构建成功，存在 4 条既有 ESLint warning。
- 新品牌定向测试：4 个测试文件、15 项测试通过。
- README 合同更新后：4 个测试文件、16 项测试通过。
- 改名后 `corepack pnpm check`：Prettier、Next typegen、TypeScript、ESLint、Vitest 与 Next build 全部退出 0；13 个测试文件、46 项测试通过，生成 12 个静态页面。
- ESLint 仍报告 `src/content/repository.ts` 的 4 条既有未使用变量 warning；0 error，本次未扩大范围清理。
- 旧正式名称扫描只命中 `tests/app-shell.test.tsx`、`tests/engineering-config.test.ts` 与 `tests/page-shells.test.tsx` 中的负向断言；README、`package.json` 与 `src` 无残留。
- 原工作树复核仍显示 `.codex/` 与 `public/eelex-avatar.png` 为未跟踪路径；隔离分支 `git ls-files` 未包含二者。
- `git diff origin/main...HEAD --check` 无输出，退出码 0。
- PR #11 首次 CI 的格式、类型、Lint、46 项测试、构建和 peer 检查全部通过，但 `pnpm audit --prod` 因 `js-yaml@3.15.0`、`nanoid@3.3.16` 与 `postcss@8.5.22` 的新公告失败。
- 经用户批准追加最小安全修复：定向解析 `gray-matter>js-yaml@3.15.1`、`postcss>nanoid@3.3.18`，并把直接依赖与 `next>postcss` 更新为 `postcss@8.5.24`；未升级其他依赖。
- 安全修复后 `corepack pnpm audit --prod` 输出 `No known vulnerabilities found`；完整 `corepack pnpm check` 再次通过，仍为 13 个测试文件、46 项测试、12 个静态页面和 4 条既有 warning。

## 未验证项

- GitHub 分支与 PR #11 已创建；首次 CI 的生产依赖审计失败，修复提交、复跑 CI、Merge、仓库改名和 Netlify 生产部署尚未完成。
- 线上站点、目标仓库 About 与旧仓库 URL 重定向尚未回读。
- 未单独执行真实浏览器视觉回归；本次只改品牌文本，页面结构、样式、路由与内容未变。
