import type { Metadata } from "next";
import type { ReactNode } from "react";

import { SiteFooter } from "../components/site-footer";
import { SiteHeader } from "../components/site-header";
import { RouteScrollReset } from "../components/route-scroll-reset";
import { defaultDescription, siteName, siteUrl } from "../site/seo";

import "./globals.css";

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: siteName,
  description: defaultDescription,
};

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="zh-CN">
      <body>
        <RouteScrollReset />
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
