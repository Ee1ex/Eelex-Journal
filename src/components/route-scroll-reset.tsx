"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function resetScrollPosition(target: Pick<Window, "scrollTo">) {
  target.scrollTo(0, 0);
}

export function RouteScrollReset() {
  const pathname = usePathname();

  useEffect(() => {
    resetScrollPosition(window);
  }, [pathname]);

  return null;
}
