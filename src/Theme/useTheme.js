import { useEffect, useState } from "react";

const storageKey = "focus-article-theme";
const themes = ["dark", "light", "system"];
const systemTheme = window.matchMedia("(prefers-color-scheme: dark)");
let transitionTimeout;

function readTheme() {
  try {
    const saved = localStorage.getItem(storageKey);
    return themes.includes(saved) ? saved : "system";
  } catch {
    return "system";
  }
}

function applyTheme(theme, animate = true) {
  const root = document.documentElement;
  const nextTheme =
    theme === "system" ? (systemTheme.matches ? "dark" : "light") : theme;
  if (root.dataset.theme === nextTheme) return;

  if (animate && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    clearTimeout(transitionTimeout);
    root.classList.add("theme-transition");
    // Register the transition styles before changing the palette.
    void root.offsetWidth;
    transitionTimeout = setTimeout(() => root.classList.remove("theme-transition"), 400);
  }
  root.dataset.theme = nextTheme;
}

// Apply the saved preference before React renders the first screen.
applyTheme(readTheme(), false);

export function useTheme() {
  const [theme, setTheme] = useState(readTheme);

  useEffect(() => {
    applyTheme(theme);
    const handleSystemChange = () => applyTheme(theme);
    if (theme === "system") {
      systemTheme.addEventListener("change", handleSystemChange);
    }
    return () => systemTheme.removeEventListener("change", handleSystemChange);
  }, [theme]);

  useEffect(() => {
    const handleStorage = (event) => {
      if (event.key === storageKey || event.key === null) setTheme(readTheme());
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  function changeTheme(value) {
    if (!themes.includes(value)) return;
    applyTheme(value);
    setTheme(value);
    try {
      localStorage.setItem(storageKey, value);
    } catch {
      // Keep the selection for this session if browser storage is unavailable.
    }
  }

  return [theme, changeTheme];
}
