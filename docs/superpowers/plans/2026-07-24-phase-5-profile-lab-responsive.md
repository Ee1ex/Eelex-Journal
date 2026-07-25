# Phase 5 关于我、实验室与响应式体验 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use `executing-plans` to implement this plan task-by-task. All steps below are complete.

**Goal:** 完成统一公开资料、可访问的阅读密度实验和关键页面响应式体验。

**Architecture:** 资料和密度状态均为无 React 依赖的纯模块；页面和唯一 Client Component 消费它们。实验状态只在内存中，实验室不依赖内容仓库，复用既有 token 和 Tailwind v4 工具类。

**Tech Stack:** Next.js 16、React 19、TypeScript、Tailwind CSS v4、Vitest。

**Execution status (2026-07-24):** Tasks 1–3 and Task 4 的自动质量与浏览器响应式验证已在隔离分支完成。主工作区仍保留用户未提交改动，因此 Phase 5 文档收尾与安全集成待单独处理；不得将本计划视为已集成到 `main`。

## Global Constraints

- 只实现获批 Phase 5 范围；不改 `src/content/*`、搜索、URL 状态、依赖或锁文件。
- 使用字母头像、GitHub `https://github.com/Ee1ex` 和三种密度；默认与重置都是 `comfortable`。
- 不使用 URL、hash、cookie、`localStorage`、外部资源或新增运行时依赖。
- 仅修改 `codex/phase-5-profile-lab-responsive`；不推送、部署或覆盖 `main` 未提交改动。

---

### Task 1: 建立公开资料来源

**Files:**
- Create: `src/site/profile.ts`
- Create: `tests/profile.test.ts`
- Modify: `src/app/page.tsx`

**Interfaces:** Produces `publicProfile`，包含昵称、定位、介绍、方向、字母头像和 GitHub 联系方式；迁移当前 `src/mocks/profile.ts` 的公开文案。

- [x] **Step 1: 写入失败的资料契约测试**

```ts
import { mockProfile } from "../src/mocks/profile";

it("提供字母头像与唯一的 GitHub 联系方式", () => {
  expect(mockProfile.avatar).toEqual({ label: "E", alt: "Eelex 的字母头像" });
  expect(mockProfile.contacts).toEqual([{ label: "GitHub", href: "https://github.com/Ee1ex", external: true }]);
});
```

- [x] **Step 2: 运行 `corepack pnpm exec vitest run tests/profile.test.ts`，确认因为现有资料缺少头像和联系方式而 RED。**

- [x] **Step 3: 写入最小实现**

```ts
export const publicProfile = {
  name: "Eelex", role: "Web 开发与前端设计学习者",
  introduction: "在代码、界面与持续学习之间，记录那些值得反复推敲的小发现。",
  learningFocus: ["前端工程", "界面设计", "内容表达"], skills: ["TypeScript", "React", "CSS", "设计系统"],
  avatar: { label: "E", alt: "Eelex 的字母头像" },
  contacts: [{ label: "GitHub", href: "https://github.com/Ee1ex", external: true }],
} as const;
```

- [x] **Step 4: 令 `mockProfile` 兼容地重导出 `publicProfile`，迁移首页至 `publicProfile`，重新运行定向测试并确认 GREEN。**
- [x] **Step 5: 提交任务：`git add src/site/profile.ts src/app/page.tsx tests/profile.test.ts && git commit -m "feat: add public profile source"`。**

### Task 2: 完成关于页和页脚

**Files:**
- Modify: `src/app/about/page.tsx`
- Modify: `src/components/site-footer.tsx`
- Modify: `tests/page-shells.test.tsx`

**Interfaces:** Consumes `publicProfile` and produces mobile single-column / `sm` two-column about layout plus explicit external GitHub link in the footer.

- [x] **Step 1: 写入失败的页面契约测试**

```ts
expect(about).toContain('aria-label="Eelex 的字母头像"');
expect(about).toContain('href="https://github.com/Ee1ex"');
expect(footer).toContain('href="https://github.com/Ee1ex"');
```

- [x] **Step 2: 运行 `corepack pnpm exec vitest run tests/page-shells.test.tsx`，确认 RED。**
- [x] **Step 3: 以最小实现渲染头像和联系方式。**

```tsx
<div aria-label={publicProfile.avatar.alt} className="grid size-24 place-items-center rounded-full bg-accent text-3xl font-semibold text-surface">
  {publicProfile.avatar.label}
</div>
```

关于页使用 `sm:grid-cols-[auto_minmax(0,1fr)]`；页脚遍历 contacts，外链设置 `target="_blank" rel="noreferrer"`。

- [x] **Step 4: 重跑定向测试，确认 GREEN。**
- [x] **Step 5: 提交任务：`git add src/app/about/page.tsx src/components/site-footer.tsx tests/page-shells.test.tsx && git commit -m "feat: complete public profile presentation"`。**

### Task 3: 交付阅读密度实验

**Files:**
- Create: `src/lab/reading-density.ts`
- Create: `src/components/lab/reading-density-experiment.tsx`
- Create: `tests/reading-density.test.ts`
- Modify: `src/app/lab/page.tsx`
- Modify: `tests/page-shells.test.tsx`

**Interfaces:** Produces `defaultDensity`、`densityOptions`、`getDensityPreviewClass` 和唯一 Client Component；不导入内容仓库、资料模块或页面组件。

- [x] **Step 1: 写入失败的状态测试**

```ts
import { defaultDensity, densityOptions, getDensityPreviewClass } from "../src/lab/reading-density";

it("以舒适密度为默认值并为每种状态提供预览样式", () => {
  expect(defaultDensity).toBe("comfortable");
  expect(densityOptions.map((option) => option.value)).toEqual(["compact", "comfortable", "relaxed"]);
  expect(getDensityPreviewClass("relaxed")).toContain("leading");
});
```

- [x] **Step 2: 运行 `corepack pnpm exec vitest run tests/reading-density.test.ts`，确认 RED。**
- [x] **Step 3: 实现纯状态模块和原生 radio group。**

```tsx
<fieldset><legend>选择阅读密度</legend>{densityOptions.map((option) => <label key={option.value}><input checked={density === option.value} name="reading-density" onChange={() => setDensity(option.value)} type="radio" value={option.value} />{option.label}</label>)}</fieldset>
<button onClick={() => setDensity(defaultDensity)} type="button">重置为舒适密度</button>
```

- [x] **Step 4: 重跑密度和页面测试，确认 GREEN，且源码不含 `content/repository`、`localStorage`、`useSearchParams`。**
- [x] **Step 5: 提交任务：`git add src/lab/reading-density.ts src/components/lab/reading-density-experiment.tsx src/app/lab/page.tsx tests/reading-density.test.ts tests/page-shells.test.tsx && git commit -m "feat: add reading density lab experiment"`。**

### Task 4: 响应式验证与文档收尾

**Files:**
- Modify: `tests/page-shells.test.tsx`
- Modify: Phase 5 REQ、DEV、PRD、PROG、文档索引和实施计划

- [x] **Step 1: 写入失败的隔离与响应式结构测试。**

```ts
expect(readFileSync("src/app/lab/page.tsx", "utf8")).not.toContain("content/");
expect(readFileSync("src/components/lab/reading-density-experiment.tsx", "utf8")).toContain('type="radio"');
expect(readFileSync("src/app/about/page.tsx", "utf8")).toContain("sm:grid-cols");
```

- [x] **Step 2: 运行页面测试确认 RED，补足最小 Tailwind 类后确认 GREEN，不修改全局 token。**
- [x] **Step 3: 在 `320px`、`375px`、`768px`、`1280px` 检查首页、详情、关于页、实验室、导航、页脚、键盘焦点和减少动效。**
- [x] **Step 4: 运行 `corepack pnpm check && git diff --check`，确认 PASS。**
- [x] **Step 5: 同步文档并提交任务：`git add docs tests/page-shells.test.tsx && git commit -m "docs: close Phase 5 verification"`。**
