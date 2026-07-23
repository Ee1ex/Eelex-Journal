import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import RootLayout from "../src/app/layout";
import Home from "../src/app/page";
import { useMDXComponents } from "../mdx-components";

describe("应用壳", () => {
  it("提供语义化主内容区域", () => {
    expect(renderToStaticMarkup(<Home />)).toBe("<main></main>");
  });

  it("以中文文档根结构包裹内容", () => {
    const markup = renderToStaticMarkup(
      <RootLayout>
        <p>内容</p>
      </RootLayout>
    );

    expect(markup).toContain('<html lang="zh-CN">');
    expect(markup).toContain("<body><p>内容</p></body>");
  });

  it("提供空的全局 MDX 组件映射", () => {
    expect(useMDXComponents()).toEqual({});
  });
});
