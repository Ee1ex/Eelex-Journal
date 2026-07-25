import { existsSync, readFileSync } from "node:fs";

import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import AboutPage from "../src/app/about/page";
import NotFoundPage from "../src/app/not-found";
import Home from "../src/app/page";
import { ContentCard } from "../src/components/content-card";
import { SiteFooter } from "../src/components/site-footer";
import { getAllContent } from "../src/content/repository";

describe("页面骨架与真实内容链路", () => {
  it("首页展示阅读画廊个人区、已启用的内容发现和真实内容入口", () => {
    const markup = renderToStaticMarkup(<Home />);

    expect(markup).toContain('id="main-content"');
    expect(markup).toContain('id="content"');
    expect(markup).toContain("欢迎来到Eelex 的个人博客");
    expect(markup).toContain("eelex-page-heading");
    expect(markup).toContain("eelex-page-intro");
    expect(markup).toContain("eelex-page-intro-card");
    expect(markup).toContain("我的记录与思考");
    expect(markup).toContain("3 篇内容");
    expect(markup).toContain('aria-pressed="true"');
    expect(markup).not.toContain('disabled=""');
    expect(markup).toContain('href="/content/designing-readable-interfaces"');
    expect(markup).toContain('href="/content/weekly-learning-notes-01"');
    expect(markup).toContain('href="/content/spacing-scale-checklist"');
  });

  it("详情路由、关于我和 404 保持阅读画廊边界，实验室已移除", () => {
    const about = renderToStaticMarkup(<AboutPage />);
    const footer = renderToStaticMarkup(<SiteFooter />);
    const notFound = renderToStaticMarkup(<NotFoundPage />);
    const card = renderToStaticMarkup(
      <ContentCard item={getAllContent()[0]} />,
    );
    const detailSource = readFileSync(
      "src/app/content/[slug]/page.tsx",
      "utf8",
    );
    const aboutSource = readFileSync("src/app/about/page.tsx", "utf8");
    const headerSource = readFileSync("src/components/site-header.tsx", "utf8");

    expect(detailSource).toContain("getContentBySlug");
    expect(detailSource).toContain("dynamicParams = false");
    expect(detailSource).toContain('href="/#content"');
    expect(about).toContain("关于我");
    expect(about).toContain("eelex-page-heading");
    expect(about).toContain("eelex-page-intro");
    expect(about).toContain("eelex-page-intro-card");
    expect(about).toContain("当前学习方向");
    expect(about).toContain('aria-label="Eelex 的字母头像"');
    expect(about).toContain('href="https://github.com/Ee1ex"');
    expect(footer).toContain('href="https://github.com/Ee1ex"');
    expect(notFound).toContain('href="/#content"');
    expect(headerSource).not.toContain('href: "/lab"');
    expect(existsSync("src/app/lab/page.tsx")).toBe(false);
    expect(
      existsSync("src/components/lab/reading-density-experiment.tsx"),
    ).toBe(false);
    expect(existsSync("src/lab/reading-density.ts")).toBe(false);
    expect(card).toContain("category-dot");
    expect(card).toContain("category-article");
    expect(aboutSource).toContain("rounded-panel");
  });
});
