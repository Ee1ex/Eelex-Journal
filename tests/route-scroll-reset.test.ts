import { describe, expect, it, vi } from "vitest";

import { resetScrollPosition } from "../src/components/route-scroll-reset";

describe("路由滚动重置", () => {
  it("在页面路由切换后回到文档顶部", () => {
    const scrollTo = vi.fn();

    resetScrollPosition({ scrollTo });

    expect(scrollTo).toHaveBeenCalledWith(0, 0);
  });
});
