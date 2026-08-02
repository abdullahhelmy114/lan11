import { useCallback, useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { t, type Lang } from "@/lib/i18n";

type Theme = "light" | "dark";

const STORAGE_KEY = "rq_theme";

function apply(theme: Theme) {
  document.documentElement.classList.toggle("dark", theme === "dark");
  document.documentElement.style.colorScheme = theme;
}

export function useTheme() {
  const [theme, setThemeState] = useState<Theme>("light");

  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    let manual = false;
    let initial: Theme = mq.matches ? "dark" : "light";
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored === "dark" || stored === "light") {
        initial = stored;
        manual = true;
      }
    } catch {
      /* ignore */
    }
    setThemeState(initial);
    apply(initial);

    if (manual) return;
    const onChange = (e: MediaQueryListEvent) => {
      const next: Theme = e.matches ? "dark" : "light";
      setThemeState(next);
      apply(next);
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const setTheme = useCallback((next: Theme) => {
    setThemeState(next);
    apply(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* ignore */
    }
  }, []);

  const toggle = useCallback(
    () => setTheme(theme === "dark" ? "light" : "dark"),
    [theme, setTheme],
  );

  return { theme, setTheme, toggle };
}

export function ThemeToggle({ lang }: { lang: Lang }) {
  const { theme, toggle } = useTheme();
  const tr = t[lang];
  const label = theme === "dark" ? tr.theme.light : tr.theme.dark;

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      title={label}
      className="glass grid h-9 w-9 shrink-0 place-items-center rounded-full text-primary transition-transform duration-300 hover:scale-105 sm:h-10 sm:w-10"
    >
      {theme === "dark" ? (
        <Sun className="h-4 w-4" strokeWidth={1.6} />
      ) : (
        <Moon className="h-4 w-4" strokeWidth={1.6} />
      )}
    </button>
  );
}
