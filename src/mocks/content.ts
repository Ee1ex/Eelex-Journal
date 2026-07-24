export const contentCategories = ["文章", "学习笔记", "工具分享"] as const;

export type ContentCategory = (typeof contentCategories)[number];

export type MockContentItem = {
  slug: string;
  title: string;
  excerpt: string;
  publishedAt: string;
  category: ContentCategory;
  tags: readonly string[];
  body: readonly string[];
  cover?: {
    src: string;
    alt: string;
  };
};

export const mockContent: readonly MockContentItem[] = [
  {
    slug: "designing-readable-interfaces",
    title: "让界面更易阅读的三个小决定",
    excerpt: "从信息层级、留白和文字密度出发，让阅读路径更自然。",
    publishedAt: "2026-07-20",
    category: "文章",
    tags: ["界面设计", "阅读体验"],
    body: [
      "阅读型页面最重要的不是堆叠装饰，而是让读者知道下一步该看哪里。",
      "当标题、摘要和正文拥有稳定层级时，内容本身会获得更清晰的节奏。",
    ],
  },
  {
    slug: "weekly-learning-notes-01",
    title: "本周学习笔记：把复杂问题拆成可验证的小步",
    excerpt: "记录一次从模糊想法到明确验证路径的练习。",
    publishedAt: "2026-07-12",
    category: "学习笔记",
    tags: ["学习方法", "前端"],
    body: [
      "先明确目标和约束，再把每一步缩小到可以独立验证的范围。",
      "这种节奏能减少返工，也能让结论拥有更可靠的证据。",
    ],
  },
  {
    slug: "spacing-scale-checklist",
    title: "间距检查清单：让页面呼吸得更自然",
    excerpt: "一份用于观察内容分组、容器宽度和移动端留白的简短清单。",
    publishedAt: "2026-07-05",
    category: "工具分享",
    tags: ["设计系统", "CSS"],
    body: [
      "间距不是装饰，它帮助读者识别哪些信息属于同一层级。",
      "在移动端复核时，优先保证点击区域、行长和区块之间的呼吸感。",
    ],
  },
];

export function getMockContentBySlug(
  slug: string,
): MockContentItem | undefined {
  return mockContent.find((item) => item.slug === slug);
}
