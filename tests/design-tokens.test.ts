import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { describe, expect, it } from "vitest";

const projectRoot = fileURLToPath(new URL("../", import.meta.url));
const globalStylesPath = fileURLToPath(
  new URL("../src/app/globals.css", import.meta.url),
);
const globalStyles = readFileSync(globalStylesPath, "utf8");

const semanticTokens = {
  "--eelex-color-canvas": "#f5f0e8",
  "--eelex-color-surface": "rgba(255, 253, 248, 0.78)",
  "--eelex-color-ink": "#20211f",
  "--eelex-color-muted": "#716d66",
  "--eelex-color-border": "rgba(32, 33, 31, 0.12)",
  "--eelex-color-accent": "#365d7d",
  "--eelex-color-focus": "#285f8f",
  "--eelex-color-category-all": "#5e4f81",
  "--eelex-color-category-article": "#2a5475",
  "--eelex-color-category-note": "#805719",
  "--eelex-color-category-tool": "#28695e",
  "--eelex-color-category-article-soft": "#e2edf6",
  "--eelex-color-category-note-soft": "#f6ead6",
  "--eelex-color-category-tool-soft": "#dfeee8",
  "--eelex-font-sans":
    'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", "Microsoft YaHei", "PingFang SC", "Noto Sans CJK SC", sans-serif',
  "--eelex-font-mono":
    'ui-monospace, "Cascadia Code", "SFMono-Regular", Consolas, "Liberation Mono", monospace',
  "--eelex-text-display": "clamp(1.7rem, 3.4vw, 3.2rem)",
  "--eelex-text-page-title": "clamp(1.7rem, 3.4vw, 3.2rem)",
  "--eelex-text-section-title": "clamp(1.1rem, 1.85vw, 1.45rem)",
  "--eelex-text-body": "1rem",
  "--eelex-text-small": "0.875rem",
  "--eelex-text-meta": "0.8125rem",
  "--eelex-leading-tight": "1.15",
  "--eelex-leading-body": "1.75",
  "--eelex-space-page-inline": "clamp(1rem, 3vw, 2rem)",
  "--eelex-space-section": "clamp(2.5rem, 5vw, 4.625rem)",
  "--eelex-space-stack": "1.5rem",
  "--eelex-radius-control": "999px",
  "--eelex-radius-panel": "2rem",
  "--eelex-width-wide": "70rem",
  "--eelex-width-reading": "44rem",
  "--eelex-width-toc": "15rem",
  "--eelex-duration-fast": "120ms",
  "--eelex-duration-base": "180ms",
  "--eelex-duration-slow": "240ms",
  "--eelex-ease-standard": "cubic-bezier(0.2, 0, 0, 1)",
} as const;

const tailwindMappings = {
  "--color-canvas": "var(--eelex-color-canvas)",
  "--color-surface": "var(--eelex-color-surface)",
  "--color-ink": "var(--eelex-color-ink)",
  "--color-muted": "var(--eelex-color-muted)",
  "--color-border": "var(--eelex-color-border)",
  "--color-accent": "var(--eelex-color-accent)",
  "--color-focus": "var(--eelex-color-focus)",
  "--color-category-all": "var(--eelex-color-category-all)",
  "--color-category-article": "var(--eelex-color-category-article)",
  "--color-category-note": "var(--eelex-color-category-note)",
  "--color-category-tool": "var(--eelex-color-category-tool)",
  "--color-category-article-soft": "var(--eelex-color-category-article-soft)",
  "--color-category-note-soft": "var(--eelex-color-category-note-soft)",
  "--color-category-tool-soft": "var(--eelex-color-category-tool-soft)",
  "--font-sans": "var(--eelex-font-sans)",
  "--font-mono": "var(--eelex-font-mono)",
  "--radius-control": "var(--eelex-radius-control)",
  "--radius-panel": "var(--eelex-radius-panel)",
} as const;

function normalizeValue(value: string): string {
  return value
    .replace(/\s+/g, " ")
    .replace(/\(\s+/g, "(")
    .replace(/\s+\)/g, ")")
    .trim();
}

function readDeclaration(name: string): string | undefined {
  const escapedName = name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const match = globalStyles.match(
    new RegExp(`${escapedName}\\s*:\\s*([^;]+);`),
  );

  return match?.[1]?.trim();
}

function requireHexToken(name: keyof typeof semanticTokens): string {
  const value = readDeclaration(name);

  if (!value || !/^#[\da-f]{6}$/i.test(value)) {
    throw new Error(`Missing six-digit hex token: ${name}`);
  }

  return value;
}

function relativeLuminance(hex: string): number {
  const channels = [1, 3, 5].map((start) => {
    const channel = Number.parseInt(hex.slice(start, start + 2), 16) / 255;

    return channel <= 0.03928
      ? channel / 12.92
      : ((channel + 0.055) / 1.055) ** 2.4;
  });

  return 0.2126 * channels[0] + 0.7152 * channels[1] + 0.0722 * channels[2];
}

function contrastRatio(foreground: string, background: string): number {
  const foregroundLuminance = relativeLuminance(foreground);
  const backgroundLuminance = relativeLuminance(background);
  const lighter = Math.max(foregroundLuminance, backgroundLuminance);
  const darker = Math.min(foregroundLuminance, backgroundLuminance);

  return (lighter + 0.05) / (darker + 0.05);
}

describe("Phase 2 设计 token", () => {
  it("在 :root 中定义唯一的语义值", () => {
    expect(globalStyles).toContain('@import "tailwindcss";');
    expect(globalStyles).toMatch(/:root\s*{/);

    for (const [name, expectedValue] of Object.entries(semanticTokens)) {
      expect(normalizeValue(readDeclaration(name) ?? "")).toBe(
        normalizeValue(expectedValue),
      );
    }
  });

  it("通过 @theme inline 暴露 Tailwind 映射", () => {
    expect(globalStyles).toMatch(/@theme\s+inline\s*{/);

    for (const [name, expectedValue] of Object.entries(tailwindMappings)) {
      expect(normalizeValue(readDeclaration(name) ?? "")).toBe(
        normalizeValue(expectedValue),
      );
    }
  });

  it("为减少动效偏好提供全局保护", () => {
    expect(globalStyles).toMatch(
      /@media\s*\(prefers-reduced-motion:\s*reduce\)/,
    );
    expect(globalStyles).toContain("scroll-behavior: auto !important;");
    expect(globalStyles).toContain("animation-duration: 0.01ms !important;");
    expect(globalStyles).toContain("animation-iteration-count: 1 !important;");
    expect(globalStyles).toContain("transition-duration: 0.01ms !important;");
  });

  it("使正文、弱化文字和分类色达到 WCAG AA 对比度", () => {
    const pairs = [
      ["--eelex-color-ink", "--eelex-color-canvas"],
      ["--eelex-color-muted", "--eelex-color-canvas"],
      ["--eelex-color-category-article", "--eelex-color-category-article-soft"],
      ["--eelex-color-category-note", "--eelex-color-category-note-soft"],
      ["--eelex-color-category-tool", "--eelex-color-category-tool-soft"],
    ] as const;

    for (const [foregroundName, backgroundName] of pairs) {
      const ratio = contrastRatio(
        requireHexToken(foregroundName),
        requireHexToken(backgroundName),
      );

      expect(
        ratio,
        `${foregroundName} on ${backgroundName}`,
      ).toBeGreaterThanOrEqual(4.5);
    }
  });

  it("不引入字体下载或 Tailwind 配置文件", () => {
    expect(globalStyles).not.toMatch(/@font-face/i);
    expect(globalStyles).not.toMatch(/url\(\s*["']?https?:\/\//i);

    for (const candidate of [
      "tailwind.config.js",
      "tailwind.config.cjs",
      "tailwind.config.mjs",
      "tailwind.config.ts",
    ]) {
      expect(existsSync(resolve(projectRoot, candidate))).toBe(false);
    }
  });
});
