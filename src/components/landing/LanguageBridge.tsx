import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, Volume2, Search } from "lucide-react";
import type { Lang } from "@/lib/i18n";
import { ui, PHRASES } from "@/lib/content";
import { SectionLabel } from "./shared";

const SHARE = [
  { label: "WhatsApp", url: (t: string) => `https://wa.me/?text=${encodeURIComponent(t)}` },
  { label: "X", url: (t: string) => `https://twitter.com/intent/tweet?text=${encodeURIComponent(t)}` },
  { label: "Telegram", url: (t: string) => `https://t.me/share/url?url=${encodeURIComponent("https://ruhulqudus.org")}&text=${encodeURIComponent(t)}` },
  { label: "Facebook", url: () => `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent("https://ruhulqudus.org")}` },
];

export function LanguageBridge({ lang }: { lang: Lang }) {
  const u = ui[lang];
  const [query, setQuery] = useState("");
  const [index, setIndex] = useState(0);

  const list = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return PHRASES;
    return PHRASES.filter((p) =>
      [p.ar, p.en, p.tr].some((s) => s.toLowerCase().includes(q)),
    );
  }, [query]);

  const safeIndex = list.length ? Math.min(index, list.length - 1) : 0;
  const phrase = list[safeIndex];

  const speak = () => {
    if (typeof window === "undefined" || !("speechSynthesis" in window) || !phrase) return;
    const utter = new SpeechSynthesisUtterance(phrase.ar);
    utter.lang = "ar";
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utter);
  };

  return (
    <section id="bridge" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-14 sm:px-8 sm:py-20">
      <SectionLabel>{u.bridgeTitle}</SectionLabel>
      <h2 className="text-3xl font-semibold text-primary sm:text-4xl">{u.bridgeTitle}</h2>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">{u.bridgeSub}</p>

      <div className="glass mt-8 flex items-center gap-3 rounded-full px-5 py-3">
        <Search className="h-4 w-4 shrink-0 text-orange" />
        <input
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIndex(0);
          }}
          placeholder={u.bridgeSearch}
          aria-label={u.bridgeSearch}
          className="w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
        />
      </div>

      {phrase ? (
        <>
          <div className="mt-6 flex items-stretch gap-3">
            <button
              type="button"
              aria-label={u.prev}
              onClick={() => setIndex((i) => (i - 1 + list.length) % list.length)}
              className="grid w-11 shrink-0 place-items-center rounded-2xl border border-orange/40 text-orange transition-colors hover:bg-orange/10"
            >
              <ChevronLeft className="h-5 w-5 rtl:rotate-180" />
            </button>

            <article className="glass flex-1 rounded-2xl p-5 sm:p-8">
              <p className="text-xs font-medium tracking-[0.2em] text-orange">
                روح القدس | Ruh Al-Quds
              </p>
              <p className="mt-5 font-arabic text-2xl leading-[2] text-primary sm:text-3xl" dir="rtl">
                {phrase.ar}
              </p>
              <p className="mt-4 text-base leading-relaxed text-foreground" dir="ltr">
                {phrase.en}
              </p>
              <p className="mt-2 text-base leading-relaxed text-muted-foreground" dir="ltr">
                {phrase.tr}
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={speak}
                  className="inline-flex items-center gap-2 rounded-full bg-orange px-4 py-2 text-xs font-medium text-accent-foreground shadow-gold"
                >
                  <Volume2 className="h-4 w-4" />
                  {u.listen}
                </button>
                {SHARE.map((s) => (
                  <a
                    key={s.label}
                    href={s.url(`${phrase.ar}\n${phrase.en}\n${phrase.tr}`)}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-full border border-primary/40 px-4 py-2 text-xs font-medium text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
                  >
                    {s.label}
                  </a>
                ))}
              </div>
            </article>

            <button
              type="button"
              aria-label={u.next}
              onClick={() => setIndex((i) => (i + 1) % list.length)}
              className="grid w-11 shrink-0 place-items-center rounded-2xl border border-orange/40 text-orange transition-colors hover:bg-orange/10"
            >
              <ChevronRight className="h-5 w-5 rtl:rotate-180" />
            </button>
          </div>

          <div className="mt-5 flex flex-col items-center gap-3">
            <div className="flex gap-2">
              {list.map((p, i) => (
                <button
                  key={p.id}
                  type="button"
                  aria-label={`${i + 1}`}
                  onClick={() => setIndex(i)}
                  className={`h-2 rounded-full transition-all ${
                    i === safeIndex ? "w-6 bg-orange" : "w-2 bg-primary/25"
                  }`}
                />
              ))}
            </div>
            <p className="text-xs text-muted-foreground">
              {u.bridgeCounter(safeIndex + 1, list.length)}
            </p>
          </div>
        </>
      ) : (
        <p className="mt-8 text-sm text-muted-foreground">—</p>
      )}
    </section>
  );
}
