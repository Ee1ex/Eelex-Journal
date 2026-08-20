"use client";

export function BackToTop() {
  return (
    <button
      aria-label="返回顶部"
      className="eelex-floating-action"
      onClick={() => window.scrollTo({ behavior: "smooth", top: 0 })}
      type="button"
    >
      顶部
    </button>
  );
}
