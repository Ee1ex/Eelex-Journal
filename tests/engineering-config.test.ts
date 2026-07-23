import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const packageJson = JSON.parse(readFileSync("package.json", "utf8"));

describe("工程配置契约", () => {
  it("固定与 Node 24 对齐的工具版本和质量命令", () => {
    expect(packageJson.packageManager).toBe("pnpm@11.17.0");
    expect(packageJson.devDependencies["@types/node"]).toBe("24.13.3");
    expect(packageJson.scripts.start).toBe("next start");
    expect(packageJson.scripts.typecheck).toBe("next typegen && tsc --noEmit");
    expect(packageJson.scripts.check).toContain("pnpm typecheck");
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

    expect(
      eslintConfig.rules["@typescript-eslint/no-unused-vars"],
    ).toBeDefined();
  });

  it("提供格式化与 CI 入口", () => {
    expect(packageJson.scripts.format).toBe("prettier --write .");
    expect(packageJson.scripts["format:check"]).toBe("prettier --check .");
    expect(packageJson.scripts.check.startsWith("pnpm format:check")).toBe(
      true,
    );

    const workflow = readFileSync(".github/workflows/ci.yml", "utf8");
    expect(workflow).toContain("permissions:");
    expect(workflow).toContain("contents: read");
    expect(workflow).toContain("pnpm install --frozen-lockfile");
    expect(workflow).toContain("pnpm check");
    expect(workflow).toContain("pnpm audit --prod");

    const dependabot = readFileSync(".github/dependabot.yml", "utf8");
    expect(dependabot).toContain('package-ecosystem: "npm"');
    expect(dependabot).toContain('package-ecosystem: "github-actions"');
  });

  it("只允许 TypeScript 与 MDX 页面扩展名", async () => {
    const { default: nextConfig } = await import("../next.config.mjs");

    expect(nextConfig.pageExtensions).toEqual(["ts", "tsx", "md", "mdx"]);
  });
});
