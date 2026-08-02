import { useEffect, useState, type ReactNode } from "react";
import { LANGS, dirOf, t, type Lang } from "@/lib/i18n";

export function useLang() {
  const [lang, setLangState] = useState<Lang>("ar");

  useEffect(() => {
    let stored: Lang | null = null;
    try {
      stored = window.localStorage.getItem("rq_lang") as Lang | null;
    } catch {
      /* ignore */
    }
    if (stored && LANGS.some((l) => l.code === stored)) {
      setLangState(stored);
      return;
    }
    // Auto-detect from the device/browser languages
    const candidates = [...(navigator.languages ?? []), navigator.language].filter(Boolean);
    for (const c of candidates) {
      const base = c.toLowerCase().split("-")[0];
      const match = LANGS.find((l) => l.code === base);
      if (match) {
        setLangState(match.code);
        return;
      }
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = dirOf(lang);
  }, [lang]);

  const setLang = (l: Lang) => {
    setLangState(l);
    try {
      window.localStorage.setItem("rq_lang", l);
    } catch {
      /* ignore */
    }
  };

  return { lang, setLang, tr: t[lang], dir: dirOf(lang) };
}

export function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <div className="mb-4 flex items-center gap-3">
      <span className="h-px w-10 bg-gold" />
      <span className="text-xs font-medium uppercase tracking-[0.28em] text-gold">{children}</span>
      <span className="h-px w-10 bg-gold" />
    </div>
  );
}

export function LanguageSwitcher({
  lang,
  setLang,
}: {
  lang: Lang;
  setLang: (l: Lang) => void;
}) {
  return (
    <div className="glass inline-flex items-center gap-1 rounded-full p-1">
      {LANGS.map((l) => (
        <button
          key={l.code}
          type="button"
          onClick={() => setLang(l.code)}
          aria-pressed={lang === l.code}
          className={`rounded-full px-2.5 py-1.5 text-[11px] sm:px-3.5 sm:text-xs font-medium tracking-wide transition-colors ${
            lang === l.code
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          {l.label}
        </button>
      ))}
    </div>
  );
}
