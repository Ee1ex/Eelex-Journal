import type { ContentCategory, ContentSummary } from "./schema";

export type ContentFilter = {
  category: "全部" | ContentCategory;
  query: string;
};

export function filterContent(
  items: readonly ContentSummary[],
  filter: ContentFilter,
): readonly ContentSummary[] {
  const query = filter.query.trim().toLocaleLowerCase("zh-CN");

  return items.filter((item) => {
    const matchesCategory =
      filter.category === "全部" || item.category === filter.category;
    const searchable = [item.title, item.excerpt, item.category, ...item.tags]
      .join(" ")
      .toLocaleLowerCase("zh-CN");

    return matchesCategory && searchable.includes(query);
  });
}
