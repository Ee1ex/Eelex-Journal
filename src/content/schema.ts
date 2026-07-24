import { z } from "zod";

export const contentCategories = ["文章", "学习笔记", "工具分享"] as const;

export type ContentCategory = (typeof contentCategories)[number];

export type ContentSummary = {
  slug: string;
  title: string;
  excerpt: string;
  publishedAt: string;
  category: ContentCategory;
  tags: readonly string[];
  cover?: {
    src: string;
    alt: string;
  };
};

export class ContentValidationError extends Error {
  constructor(filePath: string, message: string) {
    super(`${filePath}: ${message}`);
    this.name = "ContentValidationError";
  }
}

const datePattern = /^\d{4}-\d{2}-\d{2}$/;

function isValidDate(value: string) {
  if (!datePattern.test(value)) {
    return false;
  }

  const [year, month, day] = value.split("-").map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));

  return (
    date.getUTCFullYear() === year &&
    date.getUTCMonth() === month - 1 &&
    date.getUTCDate() === day
  );
}

const frontmatterSchema = z
  .object({
    slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
    title: z.string().trim().min(1),
    excerpt: z.string().trim().min(1),
    publishedAt: z.string().refine(isValidDate, {
      error: "必须是有效的 YYYY-MM-DD 日期",
    }),
    category: z.enum(contentCategories),
    tags: z.array(z.string().trim().min(1)).min(1),
    cover: z.string().startsWith("/content/").optional(),
    coverAlt: z.string().trim().min(1).optional(),
  })
  .strict()
  .refine(
    (value) =>
      value.tags.length ===
      new Set(value.tags.map((tag) => tag.toLocaleLowerCase("zh-CN"))).size,
    { error: "tags 不能包含重复值", path: ["tags"] },
  )
  .refine((value) => Boolean(value.cover) === Boolean(value.coverAlt), {
    error: "cover 和 coverAlt 必须同时提供",
    path: ["coverAlt"],
  });

export function validateContentFrontmatter(
  frontmatter: unknown,
  filePath: string,
): ContentSummary {
  const record =
    typeof frontmatter === "object" &&
    frontmatter !== null &&
    !Array.isArray(frontmatter)
      ? (frontmatter as Record<string, unknown>)
      : undefined;
  const normalizedFrontmatter = record
    ? {
        ...record,
        publishedAt:
          record.publishedAt instanceof Date
            ? record.publishedAt.toISOString().slice(0, 10)
            : record.publishedAt,
      }
    : frontmatter;
  const parsed = frontmatterSchema.safeParse(normalizedFrontmatter);

  if (!parsed.success) {
    const issue = parsed.error.issues[0];
    const field = issue.path.length > 0 ? `${issue.path.join(".")}: ` : "";
    throw new ContentValidationError(filePath, `${field}${issue.message}`);
  }

  const { cover, coverAlt, ...summary } = parsed.data;

  return cover && coverAlt
    ? { ...summary, cover: { src: cover, alt: coverAlt } }
    : summary;
}
