import { describe, expect, it } from "vitest";

import { mockProfile } from "../src/mocks/profile";

describe("公开个人资料", () => {
  it("提供字母头像与唯一的 GitHub 联系方式", () => {
    expect(mockProfile.avatar).toEqual({
      label: "E",
      alt: "Eelex 的字母头像",
    });
    expect(mockProfile.contacts).toEqual([
      {
        label: "GitHub",
        href: "https://github.com/Ee1ex",
        external: true,
      },
    ]);
  });
});
