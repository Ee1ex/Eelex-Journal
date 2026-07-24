import { readFileSync } from "node:fs";

import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import AboutPage from "../src/app/about/page";
import ContentPage from "../src/app/content/[slug]/page";
import LabPage from "../src/app/lab/page";
import NotFoundPage from "../src/app/not-found";
import Home from "../src/app/page";

describe("Phase 3 页面骨架", () => {
  it("首页展示个人区、禁用发现控件与统一模拟内容入口", () => {
    const markup = renderToStaticMarkup(<Home />);

    expect(markup).toContain('id="main-content"');
    expect(markup).toContain('id="content"');
    expect(markup).toContain("Eelex");
    expect(markup).toContain("搜索将在内容发布后开放");
    expect(markup).toContain('disabled=""');
    expect(markup).toContain('href="/content/designing-readable-interfaces"');
    expect(markup).toContain('href="/content/weekly-learning-notes-01"');
    expect(markup).toContain('href="/content/spacing-scale-checklist"');
  });

  it("详情、关于我、实验室和 404 提供既定结构与恢复路径", async () => {
    const detail = renderToStaticMarkup(
      await ContentPage({
        params: Promise.resolve({ slug: "designing-readable-interfaces" }),
      }),
    );
    const about = renderToStaticMarkup(<AboutPage />);
    const lab = renderToStaticMarkup(<LabPage />);
    const notFound = renderToStaticMarkup(<NotFoundPage />);

    expect(detail).toContain("让界面更易阅读的三个小决定");
    expect(detail).toContain('href="/#content"');
    expect(about).toContain("当前学习方向");
    expect(about).not.toContain("<a");
    expect(lab).toContain("实验室");
    expect(notFound).toContain('href="/#content"');
    expect(readFileSync("src/app/lab/page.tsx", "utf8")).not.toContain(
      "mocks/content",
    );
  });
});
