import { existsSync } from "node:fs";
import { resolve } from "node:path";

import { describe, expect, it } from "vitest";

import * as AboutPage from "../src/app/about/page";
import * as ContentPage from "../src/app/content/[slug]/page";
import * as NotFoundPage from "../src/app/not-found";
import * as HomePage from "../src/app/page";

async function loadSeoModule() {
  const modulePath = resolve(process.cwd(), "src/site/seo.ts");

  return existsSync(modulePath) ? import("../src/site/seo") : undefined;
}

async function loadSeoRoutes() {
  const sitemapPath = resolve(process.cwd(), "src/app/sitemap.ts");
  const robotsPath = resolve(process.cwd(), "src/app/robots.ts");

  return existsSync(sitemapPath) && existsSync(robotsPath)
    ? {
        robots: await import("../src/app/robots"),
        sitemap: await import("../src/app/sitemap"),
      }
    : undefined;
}

describe("Phase 6 SEO metadata", () => {
  it("提供统一的站点名称、默认简介和标题规则", async () => {
    const seo = await loadSeoModule();

    expect(seo?.siteName).toBe("Eelex Code Hub");
    expect(seo?.defaultDescription).toBe(
      "一个关于代码、设计与学习的个人空间。",
    );
    expect(seo?.createPageTitle("关于我")).toBe("关于我 | Eelex Code Hub");
  });

  it("为公开静态页面、详情页和 404 声明页面级 metadata", async () => {
    expect(HomePage.metadata).toMatchObject({
      title: "Eelex Code Hub",
      description: "一个关于代码、设计与学习的个人空间。",
    });
    expect(AboutPage.metadata).toMatchObject({
      title: "关于我 | Eelex Code Hub",
      alternates: { canonical: "/about" },
    });
    expect(NotFoundPage.metadata).toMatchObject({
      robots: { follow: false, index: false },
    });

    const metadata = ContentPage.generateMetadata
      ? await ContentPage.generateMetadata({
          params: Promise.resolve({ slug: "designing-readable-interfaces" }),
        })
      : undefined;

    expect(metadata).toMatchObject({
      description: "从信息层级、留白和文字密度出发，让阅读路径更自然。",
      title: "让界面更易阅读的三个小决定 | Eelex Code Hub",
    });
  });

  it("生成不含已取消实验室的 canonical、sitemap 与 robots", async () => {
    const seo = await loadSeoModule();
    const routes = await loadSeoRoutes();
    const sitemap = routes?.sitemap.default?.();
    const robots = routes?.robots.default?.();

    expect(seo?.siteUrl?.href).toBe(
      "https://harmonious-sprite-8b742a.netlify.app/",
    );
    expect(sitemap?.map((entry) => entry.url)).toEqual([
      "https://harmonious-sprite-8b742a.netlify.app/",
      "https://harmonious-sprite-8b742a.netlify.app/about",
      "https://harmonious-sprite-8b742a.netlify.app/content/designing-readable-interfaces",
      "https://harmonious-sprite-8b742a.netlify.app/content/weekly-learning-notes-01",
      "https://harmonious-sprite-8b742a.netlify.app/content/spacing-scale-checklist",
    ]);
    expect(robots).toMatchObject({
      rules: { allow: "/", userAgent: "*" },
      sitemap: "https://harmonious-sprite-8b742a.netlify.app/sitemap.xml",
    });
  });
});
