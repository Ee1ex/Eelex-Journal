import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";

import RootLayout from "../src/app/layout";
import { useMDXComponents } from "../mdx-components";

vi.mock("next/navigation", () => ({
  usePathname: () => "/",
}));

describe("应用壳", () => {
  it("提供中文根结构、跳至主内容链接、主导航和页脚", () => {
    const markup = renderToStaticMarkup(
      <RootLayout>
        <main id="main-content">内容</main>
      </RootLayout>,
    );

    expect(markup).toContain('<html lang="zh-CN">');
    expect(markup).toContain('href="#main-content"');
    expect(markup).toContain("eelex-site-header");
    expect(markup).toContain("eelex-site-nav");
    expect(markup).toContain("eelex-site-footer");
    expect(markup).toContain("首页</a>");
    expect(markup).not.toContain('href="/lab"');
    expect(markup).toContain("项目</button>");
    expect(markup).toContain("关于</button>");
    expect(markup).toContain('href="/rss.xml">RSS</a>');
    expect(markup).toContain("© 2026 Eelex Blog");
    expect(markup).not.toContain("Eelex Code Hub");
  });

  it("提供空的全局 MDX 组件映射", () => {
    expect(useMDXComponents()).toEqual({});
  });
});
