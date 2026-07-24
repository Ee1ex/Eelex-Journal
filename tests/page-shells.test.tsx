import { readFileSync } from "node:fs";

import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import AboutPage from "../src/app/about/page";
import LabPage from "../src/app/lab/page";
import NotFoundPage from "../src/app/not-found";
import Home from "../src/app/page";
import { SiteFooter } from "../src/components/site-footer";

describe("页面骨架与真实内容链路", () => {
  it("首页展示个人区、已启用的内容发现和真实内容入口", () => {
    const markup = renderToStaticMarkup(<Home />);

    expect(markup).toContain('id="main-content"');
    expect(markup).toContain('id="content"');
    expect(markup).toContain("Eelex");
    expect(markup).toContain("3 篇内容");
    expect(markup).toContain('aria-pressed="true"');
    expect(markup).not.toContain('disabled=""');
    expect(markup).toContain('href="/content/designing-readable-interfaces"');
    expect(markup).toContain('href="/content/weekly-learning-notes-01"');
    expect(markup).toContain('href="/content/spacing-scale-checklist"');
  });

  it("详情路由、关于我、实验室和 404 保持既定边界", () => {
    const about = renderToStaticMarkup(<AboutPage />);
    const footer = renderToStaticMarkup(<SiteFooter />);
    const lab = renderToStaticMarkup(<LabPage />);
    const notFound = renderToStaticMarkup(<NotFoundPage />);
    const detailSource = readFileSync(
      "src/app/content/[slug]/page.tsx",
      "utf8",
    );
    const aboutSource = readFileSync("src/app/about/page.tsx", "utf8");
    const experimentSource = readFileSync(
      "src/components/lab/reading-density-experiment.tsx",
      "utf8",
    );

    expect(detailSource).toContain("getContentBySlug");
    expect(detailSource).toContain("dynamicParams = false");
    expect(detailSource).toContain('href="/#content"');
    expect(about).toContain("当前学习方向");
    expect(about).toContain('aria-label="Eelex 的字母头像"');
    expect(about).toContain('href="https://github.com/Ee1ex"');
    expect(footer).toContain('href="https://github.com/Ee1ex"');
    expect(lab).toContain("实验室");
    expect(lab).toContain('name="reading-density"');
    expect(lab).toContain("重置为舒适密度");
    expect(notFound).toContain('href="/#content"');
    expect(readFileSync("src/app/lab/page.tsx", "utf8")).not.toContain(
      "content/repository",
    );
    expect(aboutSource).toContain("sm:grid-cols-[auto_minmax(0,1fr)]");
    expect(experimentSource).not.toContain("content/");
    expect(experimentSource).not.toContain("localStorage");
    expect(experimentSource).not.toContain("useSearchParams");
  });
});
