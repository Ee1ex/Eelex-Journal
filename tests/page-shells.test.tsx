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
    const homeSource = readFileSync("src/app/page.tsx", "utf8");

    expect(markup).toContain('id="main-content"');
    expect(markup).toContain('id="content"');
    expect(markup).toContain("eelex-knowledge-layout");
    expect(markup).toContain("eelex-profile-sidebar");
    expect(markup).toContain("eelex-content-discovery");
    expect(markup).toContain("Eelex 的个人知识库");
    expect(markup).toContain("站点统计");
    expect(markup).toContain('aria-label="内容分类"');
    expect(markup).toContain(`${getAllContent().length} 篇内容`);
    expect(markup).toContain('aria-pressed="true"');
    expect(markup).not.toContain('disabled=""');
    expect(markup).toContain('href="/content/designing-readable-interfaces"');
    expect(homeSource).toContain("getAllContent()");
    expect(homeSource).toContain("<ContentDiscovery items={items} />");
  });

  it("首页、关于和阅读页保持各自的标题层级", () => {
    const home = renderToStaticMarkup(<Home />);
    const about = renderToStaticMarkup(<AboutPage />);
    const detailSource = readFileSync(
      "src/app/content/[slug]/page.tsx",
      "utf8",
    );
    const cardSource = readFileSync("src/components/content-card.tsx", "utf8");

    expect(home).toContain('<h1 class="sr-only">Eelex 的个人知识库</h1>');
    expect(about).toMatch(/eelex-page-heading[^>]*font-semibold/);
    expect(detailSource).toMatch(/eelex-text-page-title[^\n]*font-semibold/);
    expect(cardSource).toMatch(/text-xl[^\n]*font-semibold/);
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
    expect(about).toContain('alt="Eelex 的 GitHub 头像"');
    expect(about).toContain('href="https://github.com/Ee1ex"');
    expect(footer).toContain('href="https://github.com/Ee1ex"');
    expect(notFound).toContain('href="/#content"');
    expect(headerSource).not.toContain('href: "/lab"');
    expect(headerSource).toContain("Eelex Blog");
    expect(headerSource).not.toContain("Eelex Code Hub");
    expect(existsSync("src/app/lab/page.tsx")).toBe(false);
    expect(
      existsSync("src/components/lab/reading-density-experiment.tsx"),
    ).toBe(false);
    expect(existsSync("src/lab/reading-density.ts")).toBe(false);
    expect(card).toContain("eelex-content-row");
    expect(card).toContain("eelex-cover");
    expect(card).toContain(getAllContent()[0].publishedAt);
    expect(aboutSource).toContain("eelex-panel");
  });
});
