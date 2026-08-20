import { getAllContent } from "../../content/repository";
import { defaultDescription, siteName, siteUrl } from "../../site/seo";

export const dynamic = "force-static";

function escapeXml(value: string) {
  return value.replace(
    /[<>&'\"]/g,
    (character) =>
      ({
        "<": "&lt;",
        ">": "&gt;",
        "&": "&amp;",
        "'": "&apos;",
        '\"': "&quot;",
      })[character] ?? character,
  );
}

export function GET() {
  const items = getAllContent();
  const xml = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0"><channel><title>${escapeXml(siteName)}</title><link>${siteUrl.href}</link><description>${escapeXml(defaultDescription)}</description><language>zh-CN</language>${items.map((item) => `<item><title>${escapeXml(item.title)}</title><link>${new URL(`/content/${item.slug}`, siteUrl).href}</link><guid>${new URL(`/content/${item.slug}`, siteUrl).href}</guid><pubDate>${new Date(`${item.publishedAt}T00:00:00Z`).toUTCString()}</pubDate><description>${escapeXml(item.excerpt)}</description></item>`).join("")}</channel></rss>`;

  return new Response(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}
