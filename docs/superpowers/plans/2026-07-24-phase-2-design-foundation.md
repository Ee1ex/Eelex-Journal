# Phase 2 Design Foundation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Do not dispatch subagents unless the user explicitly changes the current instruction. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement the approved Phase 2 semantic design tokens and their automated contract without creating any public page, component, content model, search behavior, dependency, or deployment configuration.

**Architecture:** `src/app/globals.css` remains the single design-token implementation entry. Semantic values live once under `:root`; Tailwind CSS v4 `@theme inline` exposes only approved utility mappings. A Node-environment Vitest contract reads the CSS source, verifies exact declarations and mappings, calculates WCAG contrast ratios, and protects the reduced-motion and no-font-dependency boundaries.

**Tech Stack:** Node.js `24.18.0`, pnpm `11.17.0`, Next.js `16.2.11`, TypeScript `6.0.3`, Tailwind CSS `4.3.3`, Vitest `4.1.10`, Prettier `3.9.6`.

## Global Constraints

- Implement only [`REQ-20260724-04`](../../REQ-20260724-04-phase-2-design-foundation.md) through the approved [`DEV-20260724-04`](../../DEV-20260724-04-phase-2-design-foundation.md).
- Do not modify `src/app/page.tsx`, `src/app/layout.tsx`, `mdx-components.tsx`, `package.json`, `pnpm-lock.yaml`, `next.config.mjs`, or any route/component file.
- Do not add dependencies, font files, `@font-face`, external font URLs, `tailwind.config.*`, search logic, mock content, pages, components, push, PR, or deployment changes.
- Keep `src/app/page.tsx` rendering exactly `<main></main>` under the existing app-shell test.
- Keep all managed text files LF under `.gitattributes`.
- Use `:root` as the only source of approved semantic values and `@theme inline` only as a Tailwind mapping layer.
- Enforce WCAG AA `4.5:1` for normal text pairs defined by the approved DEV.
- Use exact motion durations `120ms`, `180ms`, and `240ms`; honor `prefers-reduced-motion`.
- Complete the project Documentation Closeout Gate before marking the REQ or Phase 2 `Done`.
- Execute with the current agent only. The user has prohibited proactive subagent use.
- Work on `codex/phase-2-design-foundation` created from a clean local `main`; do not push or deploy.

## File Map

| Path | Responsibility |
| --- | --- |
| `tests/design-tokens.test.ts` | Source contract for exact token values, Tailwind mappings, contrast, reduced motion, and forbidden font/Tailwind config additions. |
| `src/app/globals.css` | Tailwind import, approved `:root` semantic tokens, `@theme inline` mappings, and global reduced-motion protection. |
| `docs/REQ-20260724-04-phase-2-design-foundation.md` | Phase state, acceptance result, and implementation evidence. |
| `docs/DEV-20260724-04-phase-2-design-foundation.md` | Final technical evidence and any verified implementation notes. |
| `docs/PRD.md` | Phase completion change record; no new product behavior. |
| `docs/PROG-20260724.md` | Implementation start, RED/GREEN evidence, closeout, risks, and next task. |
| `docs/README.md` | Current REQ and PLAN status. |
| `README.md` | Accurate public repository status without internal implementation commentary. |

---

### Task 1: Open Phase 2 Implementation

**Files:**

- Modify: `docs/REQ-20260724-04-phase-2-design-foundation.md`
- Modify: `docs/README.md`
- Modify: `docs/PROG-20260724.md`
- Modify: `README.md`

**Interfaces:**

- Consumes: approved `REQ-20260724-04`, `BIZ-20260724-02`, and `DEV-20260724-04`.
- Produces: a clean feature branch and an authoritative `In Progress` state before any CSS or test change.

- [ ] **Step 1: Verify the clean base and create the feature branch**

Run:

```powershell
git switch main
git status --short
git switch -c codex/phase-2-design-foundation
git branch --show-current
```

Expected:

- `git status --short` prints no paths.
- The final command prints `codex/phase-2-design-foundation`.
- No remote command runs.

- [ ] **Step 2: Mark the REQ as in progress**

In `docs/REQ-20260724-04-phase-2-design-foundation.md`, change:

```markdown
- 状态：Approved
```

to:

```markdown
- 状态：In Progress
```

Append:

```markdown
## 实施启动记录

- 2026-07-24：从干净的本地 `main` 创建 `codex/phase-2-design-foundation`，开始基础 token 契约 RED/GREEN；未推送、未部署。
```

- [ ] **Step 3: Synchronize the active index and repository status**

In the current REQ row of `docs/README.md`, replace `Approved` with `In Progress`.

In `README.md`, replace the current-status paragraph with:

```markdown
**Phase 2：设计基础** 已进入实施：当前只建立基础设计 token 和自动契约，不创建正式页面、组件、内容模型或搜索行为。GitHub 远程 CI 和公开站点尚未验证。
```

Append to `docs/PROG-20260724.md`:

```markdown
## 本日记录 12：Phase 2 设计基础实施启动

关联需求：[`REQ-20260724-04-phase-2-design-foundation.md`](REQ-20260724-04-phase-2-design-foundation.md)。关联方案：[`DEV-20260724-04-phase-2-design-foundation.md`](DEV-20260724-04-phase-2-design-foundation.md)。实施计划：[`superpowers/plans/2026-07-24-phase-2-design-foundation.md`](superpowers/plans/2026-07-24-phase-2-design-foundation.md)。

- 从干净的本地 `main` 创建 `codex/phase-2-design-foundation`。
- 当前 REQ 更新为 `In Progress`。
- 下一步先创建 token 契约并观察预期 RED，再写最小 CSS 实现。
- 未修改页面、组件、内容模型或依赖；未推送、未部署。
```

- [ ] **Step 4: Verify the governance-only change**

Run:

```powershell
corepack pnpm format:check
git diff --check
git status --short
```

Expected:

- Prettier reports `All matched files use Prettier code style!`.
- `git diff --check` exits `0` with no output.
- Only the four documentation files from this task are modified.

- [ ] **Step 5: Commit the implementation start**

Run:

```powershell
git add README.md docs/README.md docs/PROG-20260724.md docs/REQ-20260724-04-phase-2-design-foundation.md
git commit -m "docs: start Phase 2 design foundation"
```

Expected: one local commit containing only the Phase 2 status transition.

---

### Task 2: Add the Design Token Contract and Minimal CSS

**Files:**

- Create: `tests/design-tokens.test.ts`
- Modify: `src/app/globals.css`
- Test: `tests/design-tokens.test.ts`
- Regression: `tests/app-shell.test.tsx`
- Regression: `tests/engineering-config.test.ts`

**Interfaces:**

- Consumes: the exact names and values approved in `DEV-20260724-04`.
- Produces: CSS variables under `:root`, Tailwind mappings under `@theme inline`, global reduced-motion protection, and five Vitest contract cases.

- [ ] **Step 1: Write the complete failing token contract**

Create `tests/design-tokens.test.ts`:

```ts
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
  "--eelex-color-canvas": "#f7f4ec",
  "--eelex-color-surface": "#fffdf8",
  "--eelex-color-ink": "#202522",
  "--eelex-color-muted": "#626a66",
  "--eelex-color-border": "#d8d4ca",
  "--eelex-color-accent": "#3d6078",
  "--eelex-color-focus": "#285f8f",
  "--eelex-color-category-all": "#4f5854",
  "--eelex-color-category-article": "#365f7a",
  "--eelex-color-category-note": "#835f1f",
  "--eelex-color-category-tool": "#2d6a60",
  "--eelex-color-category-article-soft": "#e5edf2",
  "--eelex-color-category-note-soft": "#f5ebcf",
  "--eelex-color-category-tool-soft": "#dcece8",
  "--eelex-font-sans":
    'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", "Microsoft YaHei", "PingFang SC", "Noto Sans CJK SC", sans-serif',
  "--eelex-font-mono":
    'ui-monospace, "Cascadia Code", "SFMono-Regular", Consolas, "Liberation Mono", monospace',
  "--eelex-text-display": "clamp(2.75rem, 5vw, 4.5rem)",
  "--eelex-text-page-title": "clamp(2rem, 4vw, 3rem)",
  "--eelex-text-section-title": "clamp(1.5rem, 3vw, 2rem)",
  "--eelex-text-body": "1rem",
  "--eelex-text-small": "0.875rem",
  "--eelex-text-meta": "0.8125rem",
  "--eelex-leading-tight": "1.15",
  "--eelex-leading-body": "1.75",
  "--eelex-space-page-inline": "clamp(1rem, 3vw, 2rem)",
  "--eelex-space-section": "clamp(3rem, 7vw, 6rem)",
  "--eelex-space-stack": "1.5rem",
  "--eelex-radius-control": "0.75rem",
  "--eelex-radius-panel": "1.25rem",
  "--eelex-width-wide": "72rem",
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
  "--color-category-article-soft":
    "var(--eelex-color-category-article-soft)",
  "--color-category-note-soft": "var(--eelex-color-category-note-soft)",
  "--color-category-tool-soft": "var(--eelex-color-category-tool-soft)",
  "--font-sans": "var(--eelex-font-sans)",
  "--font-mono": "var(--eelex-font-mono)",
  "--radius-control": "var(--eelex-radius-control)",
  "--radius-panel": "var(--eelex-radius-panel)",
} as const;

function normalizeValue(value: string): string {
  return value.replace(/\s+/g, " ").trim();
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

  return (
    0.2126 * channels[0] + 0.7152 * channels[1] + 0.0722 * channels[2]
  );
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
      [
        "--eelex-color-category-article",
        "--eelex-color-category-article-soft",
      ],
      ["--eelex-color-category-note", "--eelex-color-category-note-soft"],
      ["--eelex-color-category-tool", "--eelex-color-category-tool-soft"],
    ] as const;

    for (const [foregroundName, backgroundName] of pairs) {
      const ratio = contrastRatio(
        requireHexToken(foregroundName),
        requireHexToken(backgroundName),
      );

      expect(ratio, `${foregroundName} on ${backgroundName}`).toBeGreaterThanOrEqual(
        4.5,
      );
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
```

- [ ] **Step 2: Run the focused test and verify RED**

Run:

```powershell
corepack pnpm exec vitest run tests/design-tokens.test.ts
```

Expected:

- Exit code is non-zero.
- Vitest reports `1` passed and `4` failed tests.
- Failures identify missing `:root`, `@theme inline`, reduced-motion declarations, and hex tokens.
- The no-font/no-Tailwind-config test passes.

- [ ] **Step 3: Implement the minimal approved CSS**

Replace `src/app/globals.css` with:

```css
@import "tailwindcss";

:root {
  --eelex-color-canvas: #f7f4ec;
  --eelex-color-surface: #fffdf8;
  --eelex-color-ink: #202522;
  --eelex-color-muted: #626a66;
  --eelex-color-border: #d8d4ca;
  --eelex-color-accent: #3d6078;
  --eelex-color-focus: #285f8f;
  --eelex-color-category-all: #4f5854;
  --eelex-color-category-article: #365f7a;
  --eelex-color-category-note: #835f1f;
  --eelex-color-category-tool: #2d6a60;
  --eelex-color-category-article-soft: #e5edf2;
  --eelex-color-category-note-soft: #f5ebcf;
  --eelex-color-category-tool-soft: #dcece8;
  --eelex-font-sans:
    ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
    "Microsoft YaHei", "PingFang SC", "Noto Sans CJK SC", sans-serif;
  --eelex-font-mono:
    ui-monospace, "Cascadia Code", "SFMono-Regular", Consolas,
    "Liberation Mono", monospace;
  --eelex-text-display: clamp(2.75rem, 5vw, 4.5rem);
  --eelex-text-page-title: clamp(2rem, 4vw, 3rem);
  --eelex-text-section-title: clamp(1.5rem, 3vw, 2rem);
  --eelex-text-body: 1rem;
  --eelex-text-small: 0.875rem;
  --eelex-text-meta: 0.8125rem;
  --eelex-leading-tight: 1.15;
  --eelex-leading-body: 1.75;
  --eelex-space-page-inline: clamp(1rem, 3vw, 2rem);
  --eelex-space-section: clamp(3rem, 7vw, 6rem);
  --eelex-space-stack: 1.5rem;
  --eelex-radius-control: 0.75rem;
  --eelex-radius-panel: 1.25rem;
  --eelex-width-wide: 72rem;
  --eelex-width-reading: 44rem;
  --eelex-width-toc: 15rem;
  --eelex-duration-fast: 120ms;
  --eelex-duration-base: 180ms;
  --eelex-duration-slow: 240ms;
  --eelex-ease-standard: cubic-bezier(0.2, 0, 0, 1);
}

@theme inline {
  --color-canvas: var(--eelex-color-canvas);
  --color-surface: var(--eelex-color-surface);
  --color-ink: var(--eelex-color-ink);
  --color-muted: var(--eelex-color-muted);
  --color-border: var(--eelex-color-border);
  --color-accent: var(--eelex-color-accent);
  --color-focus: var(--eelex-color-focus);
  --color-category-all: var(--eelex-color-category-all);
  --color-category-article: var(--eelex-color-category-article);
  --color-category-note: var(--eelex-color-category-note);
  --color-category-tool: var(--eelex-color-category-tool);
  --color-category-article-soft: var(
    --eelex-color-category-article-soft
  );
  --color-category-note-soft: var(--eelex-color-category-note-soft);
  --color-category-tool-soft: var(--eelex-color-category-tool-soft);
  --font-sans: var(--eelex-font-sans);
  --font-mono: var(--eelex-font-mono);
  --radius-control: var(--eelex-radius-control);
  --radius-panel: var(--eelex-radius-panel);
}

@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    scroll-behavior: auto !important;
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

- [ ] **Step 4: Run the focused test and verify GREEN**

Run:

```powershell
corepack pnpm exec vitest run tests/design-tokens.test.ts
```

Expected: `1` file and `5` tests pass.

- [ ] **Step 5: Format and run the complete Vitest suite**

Run:

```powershell
corepack pnpm format
corepack pnpm test
```

Expected:

- Prettier formats only the current allowed source/test files and existing checked files without unrelated changes.
- Vitest reports `3` files and `14` tests passed.
- The existing app-shell test still confirms `<main></main>`.

- [ ] **Step 6: Verify the exact implementation scope**

Run:

```powershell
git status --short
git diff -- src/app/globals.css tests/design-tokens.test.ts
git diff --check
```

Expected:

- Only `src/app/globals.css` and `tests/design-tokens.test.ts` are changed in this task.
- No page, component, dependency, lockfile, Next.js config, or Tailwind config appears.
- `git diff --check` exits `0`.

- [ ] **Step 7: Commit the token implementation**

Run:

```powershell
git add src/app/globals.css tests/design-tokens.test.ts
git commit -m "feat: add Phase 2 design tokens"
```

Expected: one local feature commit containing the test and minimal CSS implementation.

---

### Task 3: Run the Full Gate and Close Phase 2

**Files:**

- Modify: `docs/REQ-20260724-04-phase-2-design-foundation.md`
- Modify: `docs/DEV-20260724-04-phase-2-design-foundation.md`
- Modify: `docs/PRD.md`
- Modify: `docs/PROG-20260724.md`
- Modify: `docs/README.md`
- Modify: `README.md`
- Modify: `docs/superpowers/plans/2026-07-24-phase-2-design-foundation.md`

**Interfaces:**

- Consumes: the GREEN token contract and unchanged application shell.
- Produces: local quality evidence, a `Done` REQ, a `Completed` plan record, Phase 2 DoD closure, and a clean next-step handoff to a new Phase 3 REQ.

- [ ] **Step 1: Run the complete local verification matrix**

Run:

```powershell
corepack pnpm install --frozen-lockfile
corepack pnpm check
corepack pnpm peers check
corepack pnpm audit --prod
git diff --check
```

Expected:

- Frozen install succeeds with pnpm `11.17.0`.
- `check` passes Prettier, Next type generation, TypeScript, ESLint, Vitest (`3` files, `14` tests), and the Next.js production build.
- Peer check reports `No peer dependency issues found`.
- Production audit reports `No known vulnerabilities found`.
- `git diff --check` exits `0`.

- [ ] **Step 2: Close the REQ with exact evidence**

Change the REQ status from:

```markdown
- 状态：In Progress
```

to:

```markdown
- 状态：Done
```

Append to `docs/REQ-20260724-04-phase-2-design-foundation.md`:

```markdown
## 完成记录与验收证据

### 状态变更

- 2026-07-24：本 REQ 从 `In Progress` 更新为 `Done`。

### 实施结果

- `src/app/globals.css` 已建立批准的 `:root` 语义 token、Tailwind CSS v4 `@theme inline` 映射和减少动效保护。
- `tests/design-tokens.test.ts` 覆盖精确 token、Tailwind 映射、WCAG 对比度、减少动效以及禁止字体下载和 Tailwind 配置文件。
- RED 阶段为 1 项通过、4 项失败；最小 CSS 实现后 GREEN 为 5/5 通过。
- 完整 Vitest 为 3 个测试文件、14 个测试通过，应用壳继续输出空 `<main>`。
- 未创建页面、组件、内容模型、搜索行为、依赖、字体、Tailwind 配置、推送或部署。

### 工程证据

- `corepack pnpm install --frozen-lockfile`：通过。
- `corepack pnpm check`：通过，包含格式、类型、Lint、14 项测试和生产构建。
- `corepack pnpm peers check`：`No peer dependency issues found`。
- `corepack pnpm audit --prod`：`No known vulnerabilities found`。
- `git diff --check`：通过。

### Phase 2 DoD

- 主视觉、阅读、UI 和动效原则：通过。
- 共享框架、首页、内容详情、关于我和实验室 PC/手机低保真结构：通过。
- 字体、颜色、分类色、间距、圆角、页面宽度和动效 token：通过。
- CSS token 与自动契约：通过。
- 未提前进入正式页面、内容系统或部署：通过。
```

- [ ] **Step 3: Append final technical evidence**

Append to `docs/DEV-20260724-04-phase-2-design-foundation.md`:

```markdown
## 实施完成记录

- 语义值只在 `:root` 定义，`@theme inline` 只映射 Tailwind 命名空间；未创建平行配置。
- 自动对比度检查覆盖正文、弱化文字和三组分类色，最低通过值不低于 `4.5:1`。
- `prefers-reduced-motion: reduce` 下关闭平滑滚动，将非必要动画和过渡压缩为 `0.01ms`，并限制为一次迭代。
- Vitest RED 为 1 项通过、4 项失败；GREEN 为 5/5，通过完整套件后总计 3 个文件、14 个测试。
- 生产构建验证 Tailwind CSS v4 接受批准的 `@theme inline` 映射。
- Phase 3 仍需用真实页面骨架和中文内容复核视觉比例；本方案未提前创建展示页。
```

- [ ] **Step 4: Synchronize PRD, index, plan, progress, and README**

Append to the PRD change record:

```markdown
- 2026-07-24：`REQ-20260724-04` 完成设计基础实施；低保真、视觉原则和基础 token 已验证，产品范围未进一步变化。下一项产品工作须先创建并批准 Phase 3 REQ。
```

In `docs/README.md`:

- Change the current REQ status from `In Progress` to `Done`.
- Add or update the Phase 2 PLAN row to `Completed`.
- Append:

```markdown
- 2026-07-24：完成 `REQ-20260724-04` 的设计 token、自动契约与本地质量门禁；Phase 2 状态更新为 `Done`。未创建正式页面、组件、内容模型、推送或部署；下一项任务是创建并批准 Phase 3 REQ。
```

Append to `docs/PROG-20260724.md`:

```markdown
## 本日记录 13：Phase 2 设计基础完成

关联需求：[`REQ-20260724-04-phase-2-design-foundation.md`](REQ-20260724-04-phase-2-design-foundation.md)。关联方案：[`DEV-20260724-04-phase-2-design-foundation.md`](DEV-20260724-04-phase-2-design-foundation.md)。实施计划：[`superpowers/plans/2026-07-24-phase-2-design-foundation.md`](superpowers/plans/2026-07-24-phase-2-design-foundation.md)。

- token 契约按预期经历 RED（1 项通过、4 项失败）和 GREEN（5/5 通过）。
- 完整 Vitest 为 3 个文件、14 个测试通过；生产构建、peer 和生产审计通过。
- Phase 2 DoD 全部满足，REQ 更新为 `Done`，计划更新为 `Completed`。
- 未创建正式页面、组件、内容模型、搜索实现、远程推送或部署。
- 遗留风险是 token 尚未被真实页面消费；Phase 3 必须用页面骨架复核视觉比例。
- 下一项任务是创建并批准 Phase 3 REQ。
```

Replace the current-status paragraph in `README.md` with:

```markdown
**Phase 2：设计基础** 已完成：主要视觉、低保真结构、基础设计 token 和自动契约均已确认并通过本地质量门禁。正式页面、内容模型、搜索行为、远程 CI 和公开部署尚未实施；下一步是创建并批准 Phase 3 REQ。
```

- [ ] **Step 5: Verify documentation and scope after closeout**

Run:

```powershell
corepack pnpm format:check
git diff --check
git diff --name-only main...HEAD
git diff --name-only
git status --short
```

Expected:

- Formatting and `git diff --check` pass.
- Branch changes contain only the approved Phase 2 CSS, test, plan/status, and closeout documents.
- No `package.json`, lockfile, page, layout, MDX, component, Tailwind config, workflow, or deployment file appears.

Run this PowerShell link check:

```powershell
$broken = @()
$markdownFiles = Get-ChildItem -LiteralPath "docs" -Recurse -File -Filter "*.md"
foreach ($markdownFile in $markdownFiles) {
  $content = Get-Content -Raw -Encoding UTF8 -LiteralPath $markdownFile.FullName
  $contentWithoutCodeFences = [regex]::Replace(
    $content,
    '(?ms)^```.*?^```\s*',
    ''
  )
  $matches = [regex]::Matches(
    $contentWithoutCodeFences,
    '\[[^\]]+\]\((?!https?://|mailto:|#)([^)#]+)(?:#[^)]+)?\)'
  )
  foreach ($match in $matches) {
    $target = Join-Path $markdownFile.DirectoryName $match.Groups[1].Value
    if (-not (Test-Path -LiteralPath $target)) {
      $broken += "$($markdownFile.FullName) -> $($match.Groups[1].Value)"
    }
  }
}
if ($broken.Count -gt 0) {
  $broken
  throw "Broken relative Markdown links: $($broken.Count)"
}
"Broken relative Markdown links: 0"
```

Expected: `Broken relative Markdown links: 0`.

- [ ] **Step 6: Commit the Phase 2 closeout**

Run:

```powershell
git add README.md docs/README.md docs/PRD.md docs/PROG-20260724.md docs/REQ-20260724-04-phase-2-design-foundation.md docs/DEV-20260724-04-phase-2-design-foundation.md docs/superpowers/plans/2026-07-24-phase-2-design-foundation.md
git commit -m "docs: close Phase 2 design foundation"
```

Expected: one local closeout commit. Do not push, create a PR, or deploy.
