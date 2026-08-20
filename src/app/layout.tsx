import type { Metadata } from "next";
import type { ReactNode } from "react";

import { BannerWallpaper } from "../components/banner-wallpaper";
import { SiteFooter } from "../components/site-footer";
import { SiteHeader } from "../components/site-header";
import { RouteScrollReset } from "../components/route-scroll-reset";
import { getAllContent } from "../content/repository";
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
  const items = getAllContent();

  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html:
              "try{var t=localStorage.getItem('eelex-theme')||'system';var d=t==='dark'||(t==='system'&&matchMedia('(prefers-color-scheme: dark)').matches)?'dark':'light';document.documentElement.dataset.theme=d;document.documentElement.dataset.themePreference=t;document.documentElement.dataset.wallpaper=localStorage.getItem('eelex-wallpaper')||'solid'}catch(e){}",
          }}
        />
      </head>
      <body>
        <RouteScrollReset />
        <BannerWallpaper />
        <SiteHeader items={items} />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
