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

    expect(seo?.siteName).toBe("Eelex Blog");
    expect(seo?.defaultDescription).toBe(
      "一个关于代码、设计与学习的个人空间。",
    );
    expect(seo?.createPageTitle("关于我")).toBe("关于我 | Eelex Blog");
  });

  it("为公开静态页面、详情页和 404 声明页面级 metadata", async () => {
    expect(HomePage.metadata).toMatchObject({
      title: "Eelex Blog",
      description: "一个关于代码、设计与学习的个人空间。",
    });
    expect(AboutPage.metadata).toMatchObject({
      title: "关于我 | Eelex Blog",
      alternates: { canonical: "/about" },
    });
    expect(NotFoundPage.metadata).toMatchObject({
      robots: { follow: false, index: false },
    });

    const metadata = ContentPage.generateMetadata
      ? await ContentPage.generateMetadata({
          params: Promise.resolve({ slug: "elx-cncolor" }),
        })
      : undefined;

    expect(metadata).toMatchObject({
      description:
        "从色卡图片抽取中国传统色名与 HEX/RGB，按色系智能选配国风配色——内置 111 色库与可维护校验工具链的 Agent Skill。",
      title:
        "用 elx-cncolor 为设计注入中国风灵魂：一个传统色卡识别与配色 Skill | Eelex Blog",
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
      "https://harmonious-sprite-8b742a.netlify.app/content/elx-cncolor",
      "https://harmonious-sprite-8b742a.netlify.app/content/elx-level-project-workflow",
    ]);
    expect(robots).toMatchObject({
      rules: { allow: "/", userAgent: "*" },
      sitemap: "https://harmonious-sprite-8b742a.netlify.app/sitemap.xml",
    });
  });
});
