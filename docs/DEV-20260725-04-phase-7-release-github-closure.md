# DEV-20260725-04：Phase 7 正式发布与 GitHub 收尾方案

## 文档信息

- ID：DEV-20260725-04
- 状态：Approved
- 创建日期：2026-07-25
- 更新日期：2026-07-25
- 关联需求：[REQ-20260725-03-phase-7-release-github-closure.md](REQ-20260725-03-phase-7-release-github-closure.md)
- 关联产品：[PRD.md](PRD.md)
- 关联决策：[BIZ-20260725-03-visual-refresh.md](BIZ-20260725-03-visual-refresh.md)
- 前置方案：[DEV-20260725-03-netlify-static-export.md](DEV-20260725-03-netlify-static-export.md)
- 关联缺陷：[BUG-20260725-01-netlify-stale-lab-route.md](BUG-20260725-01-netlify-stale-lab-route.md)（Closed）

## 目标

在不改变现有应用行为的条件下，定义 GitHub 与 Netlify 的静态发布契约、外部操作边界、公开验证顺序、README 真实素材规则及文档收尾方式，使 v1 的发布与公开展示具备可复核证据。

## 当前技术事实

- `next.config.mjs` 已设置 `output: "export"`；`next build` 生成 `out`。
- `netlify.toml` 已设置构建命令 `corepack pnpm build`、发布目录 `out`，并以 `NETLIFY_NEXT_PLUGIN_SKIP = "true"` 禁用 Next 运行时插件。
- `src/app/robots.ts` 与 `src/app/sitemap.ts` 均声明 `dynamic = "force-static"`，现有自动测试保护该契约。
- `.github/workflows/ci.yml` 在 `main` 推送和 Pull Request 上执行安装、`pnpm check`、peer 检查与生产依赖审计；它不承担部署职责。
- `out/`、`.next/`、依赖目录和 `.codex/` 都不得进入 Phase 7 提交。

## 技术方案

### 发布链路

```text
已授权 main 推送
→ GitHub Actions 运行质量检查
→ Netlify GitHub 集成检出同一提交
→ corepack pnpm build
→ 生成 out
→ Netlify 发布 out
→ 线上路由、SEO、地区与用量验收
```

- GitHub Actions 与 Netlify 分工明确：前者提供仓库质量证据，后者负责静态托管与发布。
- Netlify 使用现有仓库配置，不新增运行时函数、Next 插件、环境变量、构建脚本或 GitHub Actions 部署密钥。
- 手动拖放 `out` 仅作为自动发布故障时的短期恢复路径；恢复后必须记录原因，并回到 GitHub 自动发布作为默认流程。

### README 与展示素材

- README 只陈述已核实的最终产品事实：阅读画廊 UI、内容发现、MDX 详情、公开资料、响应式、SEO、静态发布和在线地址。
- 截图保存为仓库内可公开访问的静态素材；至少包含桌面首页与移动端内容页或关于页，均来自真实成品。
- 本地说明区分开发与发布：开发使用 `corepack pnpm dev`；静态发布使用 `corepack pnpm build` 生成 `out`。不再把 `next start` 作为静态导出站点的正式发布方式。

### 外部操作与授权边界

1. Agent 完成仓库内文档、README、素材和验证准备后，提示用户在 Netlify 控制台连接 GitHub 仓库并确认构建/发布设置。
2. 用户单独授权提交与推送后，Agent 才能将仅限 Phase 7 的文件推送至 `main`。
3. 用户确认 Netlify 自动发布完成后，Agent 记录发布提交 SHA、构建状态、线上地址与路由验收结果。
4. 地区验证和用量查看由具备相应网络或账户访问权限的用户提供事实记录；Agent 负责将证据整理入文档。

## 预期变更范围

- 新增：Phase 7 REQ、DEV，真实 README 展示素材。
- 更新：根目录 `README.md`、`docs/PRD.md`、`docs/README.md`、`docs/PROG-20260725.md`，以及必要的自动化契约测试。
- 默认不改：`src/`、`content/`、`next.config.mjs`、`netlify.toml`、`package.json`、依赖锁文件和 GitHub Actions。
- 若现有静态配置无法通过实际自动发布验收，先记录日志和最小复现；任何配置变更必须先更新本方案并等待用户批准。

## 验证策略

1. 在不包含用户本地文件的范围内运行定向测试与 `corepack pnpm check`、`git diff --check`。
2. 确认静态产物含首页、关于页、内容页、`robots.txt`、`sitemap.xml`，不含 `lab` 文件。
3. 用户完成 Netlify GitHub 连接和一次自动发布后，核对 GitHub Actions、Netlify 构建日志、发布提交 SHA 和生产地址一致。
4. 线上核对 `/`、`/about`、有效内容页、`/robots.txt`、`/sitemap.xml`、未知路由和 `/lab`。
5. 记录中国大陆与海外真实访问结果，以及首次发布后与第 7 天的 Netlify 用量快照。
6. 审查 README 中的地址、截图、功能、命令与发布说明均能由当前代码或线上事实支持。

## 风险与回退

- 自动发布失败时，保留 Netlify 构建日志、提交 SHA 和 `out` 产物检查结果；不得通过删除缓存、改写历史或覆盖用户文件来掩盖问题。
- 若临时使用 Netlify Drop 恢复公开站点，应只上传同一已验证提交生成的 `out`，并在问题解决后重新验证 GitHub 自动发布。
- 若地区验收失败，不得声称 v1 已完成；应记录地区、网络条件、URL、时间和实际结果，交由用户决定平台或产品范围后续调整。

## 批准记录

- 2026-07-25：用户批准本方案及其关联 REQ。当前仅建立 Phase 7 文档；未执行代码、配置、README、素材、测试、GitHub、Netlify、推送或部署操作。
- 2026-07-25：用户确认开始实施。README 真实素材与内容更新已完成；`corepack pnpm check` 通过 12 个测试文件、33 项测试及静态生产构建，静态 `out` 不含 `lab`。用户已在浏览器完成 Netlify 与 GitHub 连接；首次自动发布状态、地区验收和流量观察仍待记录。
