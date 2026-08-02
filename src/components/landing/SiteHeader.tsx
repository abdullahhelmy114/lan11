import { Sparkles } from "lucide-react";
import { t, type Lang } from "@/lib/i18n";
import { LanguageSwitcher } from "./shared";
import { ThemeToggle } from "./theme";

const NAV: { id: string; ar: string; en: string; tr: string }[] = [
  { id: "mission", ar: "الرسالة والعهد", en: "Mission & Pledge", tr: "Misyon ve Ahit" },
  { id: "pillars", ar: "أركان الحقيبة", en: "Toolkit Pillars", tr: "Çanta Sütunları" },
  { id: "wall", ar: "جدارية التضامن", en: "Solidarity Wall", tr: "Dayanışma Duvarı" },
  { id: "feedback", ar: "الآراء والاقتراحات", en: "Feedback", tr: "Görüşler" },
];

function go(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function Seal() {
  return (
    <span className="grid aspect-square h-10 w-10 shrink-0 place-items-center rounded-2xl gradient-emerald ring-2 ring-gold/70 sm:h-11 sm:w-11">
      <span className="font-arabic text-lg leading-none text-on-hero sm:text-xl">ر</span>
    </span>
  );
}

export function SiteHeader({
  lang,
  setLang,
}: {
  lang: Lang;
  setLang: (l: Lang) => void;
}) {
  const tr = t[lang];

  return (
    <div className="sticky top-0 z-40 border-b border-primary/10 bg-background/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-3 px-4 py-3 sm:px-8">
        <div className="flex min-w-0 flex-1 items-center gap-3">
          <Seal />
          <div className="min-w-0 leading-tight">
            <p className="truncate font-serif text-sm font-semibold text-primary sm:text-base rtl:font-arabic">
              {lang === "ar" ? "حقيبة الوعي والمناصرة" : "Awareness & Advocacy Kit"}
            </p>
            <p className="truncate text-[10px] text-muted-foreground sm:text-[11px]">
              {lang === "ar" ? "قافلة فلسطين العالمية البرية" : "Global Palestine Land Caravan"}
            </p>
          </div>
        </div>

        <nav className="order-3 flex w-full items-center gap-1 overflow-x-auto lg:order-none lg:w-auto">
          {NAV.map((n) => (
            <button
              key={n.id}
              type="button"
              onClick={() => go(n.id)}
              className="whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-primary"
            >
              {lang === "ar" ? n.ar : lang === "tr" ? n.tr : n.en}
            </button>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            onClick={() => go("memory-card")}
            className="hidden items-center gap-1.5 rounded-full bg-gold/20 px-3.5 py-2 text-xs font-medium text-primary ring-1 ring-gold/50 transition-colors hover:bg-gold/30 sm:inline-flex"
          >
            <Sparkles className="h-3.5 w-3.5" />
            {lang === "ar" ? "إصدار الكارت التذكاري" : lang === "tr" ? "Kart Oluştur" : "Issue Card"}
          </button>
          <LanguageSwitcher lang={lang} setLang={setLang} />
          <ThemeToggle lang={lang} />
        </div>
      </div>
      <span className="sr-only">{tr.brand}</span>
    </div>
  );
}
