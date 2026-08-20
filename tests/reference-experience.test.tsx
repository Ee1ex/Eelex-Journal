import { existsSync, readFileSync } from "node:fs";

import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import Home from "../src/app/page";
import { ContentCard } from "../src/components/content-card";
import { getAllContent } from "../src/content/repository";

function readJpegDimensions(path: string) {
  const bytes = readFileSync(path);
  let offset = 2;

  while (offset < bytes.length) {
    if (bytes[offset] !== 0xff) {
      offset += 1;
      continue;
    }
    const marker = bytes[offset + 1];
    const length = bytes.readUInt16BE(offset + 2);
    if (marker >= 0xc0 && marker <= 0xc3) {
      return {
        height: bytes.readUInt16BE(offset + 5),
        width: bytes.readUInt16BE(offset + 7),
      };
    }
    offset += 2 + length;
  }

  throw new Error(`无法读取 JPEG 尺寸：${path}`);
}

describe("REQ-20260820-01 参考博客体验", () => {
  it("首页使用三栏知识库壳与固定单列封面内容流", () => {
    const markup = renderToStaticMarkup(<Home />);
    const card = renderToStaticMarkup(
      <ContentCard item={getAllContent()[0]} />,
    );

    expect(markup).toContain("eelex-knowledge-layout");
    expect(markup).toContain("eelex-profile-sidebar");
    expect(markup).toContain("eelex-site-stats");
    expect(markup).not.toContain("日历");
    expect(card).toContain("eelex-cover");
    expect(card).toContain(getAllContent()[0].publishedAt);
  });

  it("公开导航包含归档、项目、反馈、搜索和显示设置", () => {
    const header = [
      "src/components/site-header.tsx",
      "src/components/global-search.tsx",
      "src/components/display-settings.tsx",
    ]
      .map((file) => readFileSync(file, "utf8"))
      .join("\n");

    expect(header).toContain('href="/archive"');
    expect(header).toContain("项目");
    expect(header).toContain("反馈");
    expect(header).toContain("搜索");
    expect(header).toContain("显示设置");
    expect(header).not.toContain("API 中转");
    expect(header).not.toContain("商店");
  });

  it("导航弹层共享互斥状态并支持空白点击和 Escape 关闭", () => {
    const source = readFileSync("src/components/site-header.tsx", "utf8");

    expect(source).toContain('type OpenMenu = "projects" | "about"');
    expect(source).toContain('document.addEventListener("pointerdown"');
    expect(source).toContain('event.key === "Escape"');
    expect(source).toContain("setOpenMenu(null)");
    expect(source).toContain('href="/archive"');
    expect(source).toContain("publicProfile.feedback.href");
  });

  it("公告保持显示且不提供关闭入口", () => {
    const source = readFileSync("src/components/announcement-card.tsx", "utf8");

    expect(source).not.toContain("关闭公告");
    expect(source).not.toContain("setVisible");
  });

  it("导航提供语义图标且项目与关于弹层都向右展开", () => {
    const source = readFileSync("src/components/site-header.tsx", "utf8");

    expect(source).toContain("NavIcon");
    expect(source).toContain('<NavIcon name="home"');
    expect(source).toContain('<NavIcon name="project"');
    expect(source).toContain('<NavIcon name="about"');
    expect(source).toContain('id="projects-menu"');
    expect(source).toContain('id="about-menu"');
    expect(source).not.toContain(
      'className="eelex-popover-panel absolute right-0',
    );
  });

  it("GitHub 入口使用 GitHub.com 官方 Invertocat 图标路径", () => {
    const source = readFileSync("src/components/nav-icon.tsx", "utf8");

    expect(source).toContain("M16 0C7.16 0 0 7.16 0 16");
    expect(source).toContain('viewBox="0 0 32 32"');
    expect(source).not.toContain("M9 19c-4.5 1.4-4.5-2.5-6-3");
  });

  it("横幅壁纸使用用户图片、同色渐隐并随页面滚动消失", () => {
    const layout = readFileSync("src/app/layout.tsx", "utf8");
    const banner = readFileSync("src/components/banner-wallpaper.tsx", "utf8");
    const styles = readFileSync("src/app/globals.css", "utf8");

    expect(existsSync("public/eelex-banner-wallpaper.jpg")).toBe(true);
    expect(layout).toContain("BannerWallpaper");
    expect(banner).not.toContain("<svg");
    expect(banner).not.toContain("<use");
    expect(styles).toContain('url("/eelex-banner-wallpaper.jpg")');
    expect(styles).not.toContain("eelex-banner-waves");
    expect(styles).not.toContain("@keyframes eelex-wave-shift");
    expect(styles).not.toContain("eelex-wave-layer");
    expect(styles).toMatch(
      /\.eelex-banner-wallpaper\s*\{[\s\S]*?position:\s*absolute;/,
    );
    expect(styles).toMatch(
      /\.eelex-banner-scrim\s*\{[\s\S]*?var\(--eelex-color-canvas\)\s*100%/,
    );
    expect(styles).toContain("height: 36rem");
    expect(styles).toContain("padding-top: 29rem");
    expect(readJpegDimensions("public/eelex-banner-wallpaper.jpg")).toEqual({
      height: 521,
      width: 1200,
    });
  });

  it("背景缺省值与恢复默认均为纯色", () => {
    const layout = readFileSync("src/app/layout.tsx", "utf8");
    const settings = readFileSync(
      "src/components/display-settings.tsx",
      "utf8",
    );

    expect(layout).toContain(
      "localStorage.getItem('eelex-wallpaper')||'solid'",
    );
    expect(settings).toContain('useState<Wallpaper>("solid")');
    expect(settings).toContain('chooseWallpaper("solid")');
  });

  it("提供归档、搜索结果与 RSS 静态入口", () => {
    expect(existsSync("src/app/archive/page.tsx")).toBe(true);
    expect(existsSync("src/app/search/page.tsx")).toBe(true);
    expect(existsSync("src/app/rss.xml/route.ts")).toBe(true);
  });

  it("文章详情保留日期并提供复制链接与相邻文章", () => {
    const detail = readFileSync("src/app/content/[slug]/page.tsx", "utf8");

    expect(detail).toContain("publishedAt");
    expect(detail).toContain("CopyLinkButton");
    expect(detail).toContain("getAdjacentContent");
    expect(detail).not.toContain("分享海报");
    expect(detail).not.toContain("日历");
  });

  it("删除评论、布局切换与全屏透明壁纸", () => {
    const source = [
      "src/components/site-header.tsx",
      "src/components/display-settings.tsx",
    ]
      .filter(existsSync)
      .map((file) => readFileSync(file, "utf8"))
      .join("\n");

    expect(source).not.toContain("评论系统");
    expect(source).not.toContain("全屏透明");
    expect(source).not.toContain("文章布局");
    expect(source).not.toContain("网格");
  });
});
