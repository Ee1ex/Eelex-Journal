"use client";

import { useState } from "react";

export function CopyLinkButton() {
  const [status, setStatus] = useState("复制链接");

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setStatus("链接已复制");
    } catch {
      setStatus("复制失败，请从地址栏复制");
    }
  }

  return (
    <button className="eelex-outline-button" onClick={copyLink} type="button">
      {status}
    </button>
  );
}
