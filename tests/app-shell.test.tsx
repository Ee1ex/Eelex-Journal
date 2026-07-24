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
    expect(markup).toContain('href="/">首页</a>');
    expect(markup).toContain('href="/lab">实验室</a>');
    expect(markup).toContain('href="/about">关于我</a>');
    expect(markup).toContain("© 2026 Eelex Code Hub");
  });

  it("提供空的全局 MDX 组件映射", () => {
    expect(useMDXComponents()).toEqual({});
  });
});
