# BUG-20260823-01：公开链接仍指向失效的 Netlify 旧域名

## 文档信息

- ID：BUG-20260823-01
- 状态：Confirmed
- 创建日期：2026-08-23
- 更新日期：2026-08-23
- 关联产品：[`PRD.md`](PRD.md)
- 发现来源：[`REQ-20260823-01-remove-demo-articles.md`](REQ-20260823-01-remove-demo-articles.md) 发布后生产验收

## 直接问题

仓库 README、SEO `siteUrl` 与历史验收记录仍把 `https://harmonious-sprite-8b742a.netlify.app/` 作为公开站点地址，但该域名的首页、sitemap 和内容详情均返回 404。

## 复现环境与步骤

1. 读取 `README.md` 与 `src/site/seo.ts` 中的公开地址。
2. 对 `https://harmonious-sprite-8b742a.netlify.app/` 和 `/sitemap.xml` 发起只读 HTTPS 请求。
3. 两个请求均返回 404；两个当前保留文章地址也返回 404。
4. 通过 Netlify 项目只读查询确认当前项目名为 `eelex-journal-hub`，生产域名为 `https://eelex-journal-hub.netlify.app/`。

## 预期结果

README、canonical、sitemap、robots 和 RSS 使用当前有效的正式生产基址，公开链接能够访问站点。

## 实际结果

- 旧域名所有已检查路径返回 404。
- 当前真实生产域名的首页、sitemap 和两篇 ELX 内容均返回 200。
- 本次内容删除部署 `6a89e60e1eecab0008596409` 状态为 `ready`，Commit 为 `5c6c483`。

## 根本原因与设计缺口

站点公开基址以硬编码字符串分散在 README、SEO 与历史验证契约中；Netlify 项目域名发生变化后，没有单一权威配置与发布前有效性检查同步阻止旧地址继续对外展示。

## 本次处理边界

本次只登记已确认缺陷，不修改域名、SEO、README、测试、Netlify 设置或历史记录。修复需要独立 REQ/DEV，统一当前生产基址并验证 canonical、sitemap、robots、RSS、README 与生产路由。

## 验证证据

- 2026-08-23：旧域名首页、sitemap、两个当前内容详情均返回 404。
- 2026-08-23：`https://eelex-journal-hub.netlify.app/`、其 sitemap 与两个当前内容详情均返回 200。
- Netlify 当前生产部署与 GitHub `main@5c6c483` 一致，说明本次文章删除部署成功，404 不是本次构建失败导致。

## 遗留问题

- 尚未批准或实施公开基址修复。
- 修复前 README 的在线阅读链接和生成的 canonical/sitemap/robots/RSS 仍会指向失效域名。
