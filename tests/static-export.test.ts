import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

import { describe, expect, it } from "vitest";

const projectRoot = process.cwd();

function readProjectFile(path: string) {
  const filePath = resolve(projectRoot, path);

  return existsSync(filePath) ? readFileSync(filePath, "utf8") : "";
}

describe("静态部署配置", () => {
  it("将 Next.js 构建产物导出为独立的 out 目录", () => {
    expect(readProjectFile("next.config.mjs")).toContain('output: "export"');
  });

  it("要求 Netlify 发布静态 out 目录并跳过 Next 运行时插件", () => {
    const netlifyConfig = readProjectFile("netlify.toml");

    expect(netlifyConfig).toContain('publish = "out"');
    expect(netlifyConfig).toContain('NETLIFY_NEXT_PLUGIN_SKIP = "true"');
  });

  it("将 robots 与 sitemap 固定为构建期生成的静态文件", () => {
    expect(readProjectFile("src/app/robots.ts")).toContain(
      'export const dynamic = "force-static"',
    );
    expect(readProjectFile("src/app/sitemap.ts")).toContain(
      'export const dynamic = "force-static"',
    );
  });
});
