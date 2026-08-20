import { describe, expect, it } from "vitest";

import { mockProfile } from "../src/mocks/profile";

describe("公开个人资料", () => {
  it("提供真实头像资产、项目与 GitHub 反馈入口", () => {
    expect(mockProfile.role).toBe("兴趣使然的个人开发者");
    expect(mockProfile.avatar).toEqual({
      src: "/ee1ex-github-avatar.png",
      alt: "Eelex 的 GitHub 头像",
    });
    expect(mockProfile.contacts).toEqual([
      {
        label: "GitHub",
        href: "https://github.com/Ee1ex",
        external: true,
      },
    ]);
    expect(mockProfile.projects[0]?.href).toBe("https://github.com/Ee1ex");
    expect(mockProfile.feedback.href).toBe("https://github.com/Ee1ex");
  });
});
