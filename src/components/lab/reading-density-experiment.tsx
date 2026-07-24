"use client";

import { useState } from "react";

import {
  defaultDensity,
  densityOptions,
  getDensityPreviewClass,
  type ReadingDensity,
} from "../../lab/reading-density";

export function ReadingDensityExperiment() {
  const [density, setDensity] = useState<ReadingDensity>(defaultDensity);

  return (
    <section
      aria-labelledby="reading-density-title"
      className="mt-10 rounded-panel border border-border bg-surface p-5 sm:p-8"
    >
      <p className="text-sm font-semibold text-accent">当前实验</p>
      <h2
        className="mt-3 text-[length:var(--eelex-text-section-title)] font-semibold text-ink"
        id="reading-density-title"
      >
        阅读密度实验
      </h2>
      <p className="mt-3 max-w-2xl text-muted">
        选择一种信息密度，观察相同内容在间距和行距变化下的阅读节奏。
      </p>

      <fieldset aria-describedby="density-hint" className="mt-6 grid gap-3">
        <legend className="font-semibold text-ink">选择阅读密度</legend>
        <p className="text-sm text-muted" id="density-hint">
          可使用方向键切换选项，按空格键确认选择。
        </p>
        <div className="grid gap-3 sm:grid-cols-3">
          {densityOptions.map((option) => (
            <label
              className="grid cursor-pointer gap-1 rounded-control border border-border bg-canvas p-4 has-checked:border-accent has-checked:bg-category-article-soft"
              key={option.value}
            >
              <span className="flex items-center gap-2 font-semibold text-ink">
                <input
                  checked={density === option.value}
                  name="reading-density"
                  onChange={() => setDensity(option.value)}
                  type="radio"
                  value={option.value}
                />
                {option.label}
              </span>
              <span className="text-sm text-muted">{option.description}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <article
        className={`mt-8 rounded-control border border-border bg-canvas p-5 text-muted ${getDensityPreviewClass(density)}`}
      >
        <p className="font-semibold text-ink">把界面留给内容，也留给停顿。</p>
        <p>
          文字之间的距离会影响注意力的停靠方式。相同的内容，在不同密度下会呈现不同的呼吸感。
        </p>
        <p>这个实验不保存偏好；刷新页面或使用重置按钮，都能回到舒适密度。</p>
      </article>

      <button
        className="mt-6 rounded-control border border-ink px-4 py-3 font-semibold text-ink hover:border-accent hover:text-accent"
        onClick={() => setDensity(defaultDensity)}
        type="button"
      >
        重置为舒适密度
      </button>
    </section>
  );
}
