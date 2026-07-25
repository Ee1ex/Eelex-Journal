import type { MetadataRoute } from "next";

import { toAbsoluteUrl } from "../site/seo";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: toAbsoluteUrl("/sitemap.xml").href,
  };
}
