"use client";

import { useEffect, useState } from "react";

import { NavIcon } from "./nav-icon";

type Theme = "light" | "dark" | "system";
type Wallpaper = "banner" | "solid";

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  const resolved =
    theme === "system"
      ? window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light"
      : theme;

  root.dataset.theme = resolved;
  root.dataset.themePreference = theme;
}

export function DisplaySettings({
  onToggle,
  open,
}: {
  onToggle: () => void;
  open: boolean;
}) {
  const [theme, setTheme] = useState<Theme>("system");
  const [wallpaper, setWallpaper] = useState<Wallpaper>("solid");

  useEffect(() => {
    const savedTheme = (localStorage.getItem("eelex-theme") ??
      "system") as Theme;
    const savedWallpaper = (localStorage.getItem("eelex-wallpaper") ??
      "solid") as Wallpaper;
    applyTheme(savedTheme);
    document.documentElement.dataset.wallpaper = savedWallpaper;
    queueMicrotask(() => {
      setTheme(savedTheme);
      setWallpaper(savedWallpaper);
    });
  }, []);

  function chooseTheme(value: Theme) {
    setTheme(value);
    localStorage.setItem("eelex-theme", value);
    applyTheme(value);
  }

  function chooseWallpaper(value: Wallpaper) {
    setWallpaper(value);
    localStorage.setItem("eelex-wallpaper", value);
    document.documentElement.dataset.wallpaper = value;
  }

  function reset() {
    chooseTheme("system");
    chooseWallpaper("solid");
  }

  return (
    <div className="eelex-popover relative" data-menu-surface data-open={open}>
      <button
        aria-controls="display-settings-panel"
        aria-expanded={open}
        aria-label="显示设置"
        className="eelex-icon-button"
        onClick={onToggle}
        type="button"
      >
        <NavIcon name="display" />
        显示
      </button>
      {open ? (
        <div
          className="eelex-popover-panel absolute right-0 z-50 mt-3 w-72 rounded-panel border border-border bg-paper p-5 shadow-[var(--eelex-shadow-panel)]"
          id="display-settings-panel"
        >
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-sm font-semibold text-ink">显示设置</h2>
            <button
              className="text-xs text-muted hover:text-ink"
              onClick={reset}
              type="button"
            >
              恢复默认
            </button>
          </div>
          <fieldset className="mt-5">
            <legend className="text-xs font-medium tracking-[0.06em] text-muted uppercase">
              主题
            </legend>
            <div className="mt-2 grid grid-cols-3 gap-2">
              {(["light", "dark", "system"] as const).map((value) => (
                <button
                  aria-pressed={theme === value}
                  className="eelex-setting-option"
                  key={value}
                  onClick={() => chooseTheme(value)}
                  type="button"
                >
                  {{ light: "亮色", dark: "暗色", system: "跟随系统" }[value]}
                </button>
              ))}
            </div>
          </fieldset>
          <fieldset className="mt-5">
            <legend className="text-xs font-medium tracking-[0.06em] text-muted uppercase">
              背景
            </legend>
            <div className="mt-2 grid grid-cols-2 gap-2">
              {(["banner", "solid"] as const).map((value) => (
                <button
                  aria-pressed={wallpaper === value}
                  className="eelex-setting-option"
                  key={value}
                  onClick={() => chooseWallpaper(value)}
                  type="button"
                >
                  {value === "banner" ? "横幅壁纸" : "纯色背景"}
                </button>
              ))}
            </div>
          </fieldset>
        </div>
      ) : null}
    </div>
  );
}
