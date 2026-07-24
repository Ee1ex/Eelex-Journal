import type { Metadata } from "next";
import type { ReactNode } from "react";

import { SiteFooter } from "../components/site-footer";
import { SiteHeader } from "../components/site-header";
import { RouteScrollReset } from "../components/route-scroll-reset";

import "./globals.css";

export const metadata: Metadata = {
  title: "Eelex Code Hub",
  description: "一个关于代码、设计与学习的个人空间。",
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
