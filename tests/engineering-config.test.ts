import { execFileSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const packageJson = JSON.parse(readFileSync("package.json", "utf8"));

describe("工程配置契约", () => {
  it("使用 Eelex Blog 包名", () => {
    expect(packageJson.name).toBe("eelex-blog");
  });

  it("固定与 Node 24 对齐的工具版本和质量命令", () => {
    expect(packageJson.packageManager).toBe("pnpm@11.17.0");
    expect(packageJson.devDependencies["@types/node"]).toBe("24.13.3");
    expect(packageJson.scripts.start).toBe("next start");
    expect(packageJson.scripts.typecheck).toBe("next typegen && tsc --noEmit");
    expect(packageJson.scripts.check).toBe(
      "prettier --check . && next typegen && tsc --noEmit && eslint . && vitest run && next build",
    );
  });

  it("在所有平台统一使用 LF 换行", () => {
    const attributes = existsSync(".gitattributes")
      ? readFileSync(".gitattributes", "utf8").replace(/\r\n/g, "\n")
      : "";

    expect(attributes).toBe("* text=auto eol=lf\n");
  });

  it("不跟踪 Next.js 生成的类型入口", () => {
    const tracked = execFileSync("git", ["ls-files", "next-env.d.ts"], {
      encoding: "utf8",
    }).trim();
    const ignored = execFileSync(
      "git",
      ["check-ignore", "-v", "--no-index", "next-env.d.ts"],
      { encoding: "utf8" },
    );

    expect(tracked).toBe("");
    expect(ignored).toContain(".gitignore");
  });

  it("启用 TypeScript Lint 规则", () => {
    const eslintOutput = execFileSync(
      process.execPath,
      [
        "node_modules/eslint/bin/eslint.js",
        "--print-config",
        "src/app/page.tsx",
      ],
      { encoding: "utf8" },
    );
    const eslintConfig = JSON.parse(eslintOutput);

    const noUnusedVarsRule =
      eslintConfig.rules["@typescript-eslint/no-unused-vars"];
    const noUnusedVarsLevel = Array.isArray(noUnusedVarsRule)
      ? noUnusedVarsRule[0]
      : noUnusedVarsRule;

    expect(noUnusedVarsRule).toBeDefined();
    expect(noUnusedVarsLevel).not.toBe(0);
    expect(noUnusedVarsLevel).not.toBe("off");
  });

  it("提供确定性的格式化、CI 与依赖维护入口", () => {
    expect(packageJson.scripts.format).toBe("prettier --write .");
    expect(packageJson.scripts["format:check"]).toBe("prettier --check .");
    expect(packageJson.scripts.check).toBe(
      "prettier --check . && next typegen && tsc --noEmit && eslint . && vitest run && next build",
    );

    const workflow = readFileSync(".github/workflows/ci.yml", "utf8").replace(
      /\r\n/g,
      "\n",
    );
    expect(workflow).toBe(`name: CI

on:
  push:
    branches: [main]
  pull_request:

permissions:
  contents: read

jobs:
  quality:
    runs-on: ubuntu-latest
    timeout-minutes: 15
    steps:
      - uses: actions/checkout@v6
      - uses: pnpm/action-setup@v6
      - uses: actions/setup-node@v6
        with:
          node-version-file: .nvmrc
          cache: pnpm
      - run: pnpm install --frozen-lockfile
      - run: pnpm check
      - run: pnpm peers check
      - run: pnpm audit --prod
`);
    expect(workflow).not.toMatch(/^\s*\w+:\s*write/m);

    const dependabot = readFileSync(".github/dependabot.yml", "utf8").replace(
      /\r\n/g,
      "\n",
    );
    expect(dependabot).toBe(`version: 2
updates:
  - package-ecosystem: "npm"
    directory: "/"
    schedule:
      interval: weekly
  - package-ecosystem: "github-actions"
    directory: "/"
    schedule:
      interval: weekly
`);
    expect(dependabot).not.toMatch(/auto-merge|automerge/i);

    const prettierIgnore = readFileSync(".prettierignore", "utf8")
      .replace(/\r\n/g, "\n")
      .trim()
      .split("\n");
    expect(prettierIgnore).toEqual([
      ".next/",
      ".worktrees/",
      ".superpowers/",
      "node_modules/",
      "out/",
      "build/",
      "coverage/",
      "test-results/",
      "pnpm-lock.yaml",
      "next-env.d.ts",
      "AGENTS.md",
      "CLAUDE.md",
      "README.md",
      "docs/**/*.md",
    ]);
  });

  it("只允许 TypeScript 与 MDX 页面扩展名", async () => {
    const { default: nextConfig } = await import("../next.config.mjs");

    expect(nextConfig.pageExtensions).toEqual(["ts", "tsx", "md", "mdx"]);
  });
});
