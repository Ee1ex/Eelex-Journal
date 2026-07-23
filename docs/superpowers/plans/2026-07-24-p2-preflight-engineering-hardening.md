# P2 Preflight Engineering Hardening Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Harden the Phase 1 Next.js baseline so Phase 2 starts with aligned versions, clean security audit, deterministic generated types, typed linting, formatting, CI, and durable documentation.

**Architecture:** Keep the existing static Next.js/MDX architecture unchanged. Apply narrowly scoped dependency overrides and configuration contracts, then make the same local quality pipeline executable in GitHub Actions. Record all decisions and evidence in the repository governance documents.

**Tech Stack:** Node.js 24.18.0, pnpm 11.17.0, Next.js 16.2.11, React 19.2.8, TypeScript 6.0.3, ESLint 9.39.5, Tailwind CSS 4.3.3, Vitest 4.1.10, Prettier 3.9.6, GitHub Actions.

## Global Constraints

- Do not implement Phase 2 pages, components, design tokens, MDX content, Netlify configuration, or deployment.
- Keep Node.js `24.18.0`, Next.js `16.2.11`, React `19.2.8`, TypeScript `6.0.3`, ESLint `9.39.5`, Tailwind CSS `4.3.3`, and Vitest `4.1.10`.
- Set pnpm to `11.17.0` and `@types/node` to `24.13.3`.
- Resolve `next>postcss` to `8.5.22` and `next>sharp` to `0.35.3`; do not suppress security advisories.
- `next-env.d.ts` must be generated, ignored, and untracked; `typecheck` must run `next typegen` before `tsc --noEmit`.
- CI must use frozen installation, read-only repository permissions, and no deployment secrets.
- Preserve the existing application shell output and the separation of the laboratory from the future core content path.
- Do not push, create a PR, deploy, or alter remote settings without separate user authorization.
- Use `apply_patch` for file edits and keep commits scoped to the task.

---

### Task 1: Core dependency and configuration hardening

**Files:**
- Create: `tests/engineering-config.test.ts`
- Modify: `package.json`
- Modify: `pnpm-workspace.yaml`
- Modify: `pnpm-lock.yaml`
- Modify: `.gitignore`
- Modify: `eslint.config.mjs`
- Modify: `next.config.mjs`
- Delete from Git tracking: `next-env.d.ts`

**Interfaces:**
- Consumes: existing Phase 1 package/config files and `tests/app-shell.test.tsx`.
- Produces: secure dependency graph, deterministic `typecheck`, TypeScript-aware ESLint, TS/MDX-only Next extensions, and an engineering contract test used by Task 2.

- [x] **Step 1: Write the failing engineering contract tests**

Create `tests/engineering-config.test.ts` with tests that:

```typescript
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
    expect(packageJson.scripts.check).toBe(
      "prettier --check . && next typegen && tsc --noEmit && eslint . && vitest run && next build",
    );
  });

  it("不跟踪 Next.js 生成的类型入口", () => {
    const tracked = execFileSync("git", ["ls-files", "next-env.d.ts"], {
      encoding: "utf8"
    }).trim();
    const ignored = execFileSync(
      "git",
      ["check-ignore", "-v", "--no-index", "next-env.d.ts"],
      { encoding: "utf8" }
    );

    expect(tracked).toBe("");
    expect(ignored).toContain(".gitignore");
  });

  it("启用 TypeScript Lint 规则", () => {
    const eslintOutput = execFileSync(
      process.execPath,
      ["node_modules/eslint/bin/eslint.js", "--print-config", "src/app/page.tsx"],
      { encoding: "utf8" }
    );
    const eslintConfig = JSON.parse(eslintOutput);

    expect(eslintConfig.rules["@typescript-eslint/no-unused-vars"]).toBeDefined();
  });

  it("只允许 TypeScript 与 MDX 页面扩展名", async () => {
    const { default: nextConfig } = await import("../next.config.mjs");

    expect(nextConfig.pageExtensions).toEqual(["ts", "tsx", "md", "mdx"]);
  });
});
```

- [x] **Step 2: Run RED**

Run:

```bash
corepack pnpm test tests/engineering-config.test.ts
```

Expected: FAIL because pnpm is `11.9.0`, `@types/node` is `26.1.1`, scripts are missing, `next-env.d.ts` is tracked, TypeScript rules are absent, and JavaScript extensions remain.

- [x] **Step 3: Apply the minimal hardening**

Update `package.json` to:

```json
{
  "packageManager": "pnpm@11.17.0",
  "scripts": {
    "dev": "next dev",
    "start": "next start",
    "typecheck": "next typegen && tsc --noEmit",
    "lint": "eslint .",
    "test": "vitest run",
    "build": "next build",
    "check": "prettier --check . && next typegen && tsc --noEmit && eslint . && vitest run && next build"
  },
  "devDependencies": {
    "@types/node": "24.13.3"
  }
}
```

Preserve every dependency not shown above. Add to `pnpm-workspace.yaml`:

```yaml
overrides:
  "next>postcss": "8.5.22"
  "next>sharp": "0.35.3"
```

Add `.superpowers/`, `build/`, and `next-env.d.ts` to `.gitignore`. Remove `next-env.d.ts` from Git tracking.

Update `eslint.config.mjs` to import `nextTs` from `eslint-config-next/typescript` and load `...nextVitals` followed by `...nextTs`. Task 1 must not add `eslint-config-prettier`; defer that import and config entry to Task 2. Ignore:

```javascript
[
  ".next/**",
  ".worktrees/**",
  "out/**",
  "build/**",
  "coverage/**",
  "test-results/**",
  "node_modules/**",
  "next-env.d.ts"
]
```

Update `next.config.mjs`:

```javascript
pageExtensions: ["ts", "tsx", "md", "mdx"]
```

Run `corepack pnpm install` to regenerate `pnpm-lock.yaml`.

- [x] **Step 4: Run GREEN and dependency validation**

Run:

```bash
corepack pnpm test tests/engineering-config.test.ts
corepack pnpm why sharp
corepack pnpm why postcss
corepack pnpm audit --prod
corepack pnpm peers check
corepack pnpm typecheck
corepack pnpm lint
corepack pnpm build
```

Expected: contract tests pass; `sharp@0.35.3`; Next resolves `postcss@8.5.22`; audit and all engineering commands exit zero.

- [x] **Step 5: Commit**

```bash
git add .gitignore package.json pnpm-workspace.yaml pnpm-lock.yaml eslint.config.mjs next.config.mjs tests/engineering-config.test.ts next-env.d.ts
git commit -m "chore: harden core engineering configuration"
```

### Task 2: Formatting, CI, and dependency maintenance

**Files:**
- Create: `.editorconfig`
- Create: `.prettierignore`
- Create: `prettier.config.mjs`
- Create: `.github/workflows/ci.yml`
- Create: `.github/dependabot.yml`
- Modify: `package.json`
- Modify: `pnpm-lock.yaml`
- Modify: `eslint.config.mjs`
- Modify: `tests/engineering-config.test.ts`

**Interfaces:**
- Consumes: Task 1 `check` script and engineering contract test.
- Produces: deterministic formatting, one-step quality gate, GitHub CI, and automated dependency update entry points.

- [x] **Step 1: Extend the contract test and run RED**

Add tests asserting:

```typescript
it("提供格式化与 CI 入口", () => {
  expect(packageJson.scripts.format).toBe("prettier --write .");
  expect(packageJson.scripts["format:check"]).toBe("prettier --check .");
  expect(packageJson.scripts.check).toBe(
    "prettier --check . && next typegen && tsc --noEmit && eslint . && vitest run && next build",
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
```

Run `corepack pnpm test tests/engineering-config.test.ts`.

Expected: FAIL because formatting and GitHub files do not exist.

- [x] **Step 2: Add formatting dependencies and configuration**

Add exact dev dependencies:

```json
"eslint-config-prettier": "10.1.8",
"prettier": "3.9.6",
"prettier-plugin-tailwindcss": "0.8.1"
```

Add scripts:

```json
"format": "prettier --write .",
"format:check": "prettier --check .",
"check": "prettier --check . && next typegen && tsc --noEmit && eslint . && vitest run && next build"
```

Create `prettier.config.mjs`:

```javascript
/** @type {import("prettier").Config & import("prettier-plugin-tailwindcss").PluginOptions} */
const config = {
  plugins: ["prettier-plugin-tailwindcss"],
  tailwindStylesheet: "./src/app/globals.css"
};

export default config;
```

Create `.editorconfig` for UTF-8, LF, 2-space indentation, final newline, and trimmed trailing whitespace; allow Markdown trailing whitespace.

Create `.prettierignore` excluding `.next/`, `.worktrees/`, `.superpowers/`, `node_modules/`, `out/`, `build/`, `coverage/`, `test-results/`, `pnpm-lock.yaml`, `next-env.d.ts`, `AGENTS.md`, `CLAUDE.md`, `README.md`, and `docs/**/*.md`.

Load `eslint-config-prettier/flat` after `nextTs` and before `globalIgnores`.

- [x] **Step 3: Add GitHub automation**

Create `.github/workflows/ci.yml` with:

```yaml
name: CI

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
```

Create `.github/dependabot.yml` with weekly npm and GitHub Actions checks rooted at `/`, without auto-merge configuration.

- [x] **Step 4: Format, run GREEN, and verify**

Run:

```bash
corepack pnpm install
corepack pnpm format
corepack pnpm test tests/engineering-config.test.ts
corepack pnpm format:check
corepack pnpm check
corepack pnpm peers check
corepack pnpm audit --prod
```

Expected: all commands exit zero, both test files pass, and formatting creates no governance-document rewrite.

- [x] **Step 5: Commit**

```bash
git add .editorconfig .prettierignore prettier.config.mjs .github package.json pnpm-lock.yaml eslint.config.mjs tests/engineering-config.test.ts
git commit -m "ci: add deterministic quality gates"
```

### Task 3: Documentation closeout and runtime verification

**Files:**
- Modify: `README.md`
- Modify: `docs/PRD.md`
- Modify: `docs/README.md`
- Modify: `docs/PROG-20260724.md`
- Modify: `docs/REQ-20260724-03-p2-preflight-engineering-hardening.md`
- Modify: `docs/DEV-20260724-03-p2-preflight-engineering-hardening.md`

**Interfaces:**
- Consumes: verified versions, commands, security results, CI files, and Task 1–2 commits.
- Produces: durable current-state documentation and the Phase 2 handoff.

- [x] **Step 1: Update live documentation**

Update README versions and commands to pnpm `11.17.0`, aligned Node types, `format:check`, `check`, `start`, CI, and the new REQ/DEV links.

Update PRD current requirement to `REQ-20260724-03` and append a change record stating that product scope did not change.

Update `docs/README.md` current REQ and add the new DEV and implementation plan references.

- [x] **Step 2: Run runtime checks**

Start development mode on `127.0.0.1:3101`, request `/`, assert HTTP 200 and `<main>`, then stop the exact listener and confirm port release.

Build, start production mode on `127.0.0.1:3102`, request `/`, assert HTTP 200 and `<main>`, then stop the exact listener and confirm port release.

- [x] **Step 3: Execute final verification**

Run:

```bash
corepack pnpm install --frozen-lockfile
corepack pnpm format:check
corepack pnpm typecheck
corepack pnpm lint
corepack pnpm test
corepack pnpm build
corepack pnpm check
corepack pnpm peers check
corepack pnpm audit --prod
```

Also verify:

```bash
git ls-files next-env.d.ts
git check-ignore -v --no-index next-env.d.ts
git diff --check
```

Expected: all commands exit zero; `next-env.d.ts` has no tracked output and is ignored.

- [x] **Step 4: Close documentation**

Set `REQ-20260724-03` to `Done` and append exact command outputs, test counts, audit result, runtime evidence, CI local-only limitation, remaining risks, and the next task: create Phase 2 REQ.

Append a new PROG record with completed work, DoD results, evidence, no deployment, remaining remote CI verification, and Phase 2 handoff.

Record exact final dependency resolutions and override-removal condition in DEV.

Validate all project Markdown relative links.

- [x] **Step 5: Commit**

```bash
git add README.md docs
git commit -m "docs: close P2 preflight hardening"
```
