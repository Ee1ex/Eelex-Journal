import type { MetadataRoute } from "next";

import { getAllContent } from "../content/repository";
import { toAbsoluteUrl } from "../site/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: toAbsoluteUrl("/").href },
    { url: toAbsoluteUrl("/about").href },
    ...getAllContent().map((item) => ({
      url: toAbsoluteUrl(`/content/${item.slug}`).href,
      lastModified: item.publishedAt,
    })),
  ];
}
