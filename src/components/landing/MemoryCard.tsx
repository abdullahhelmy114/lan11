import { useState } from "react";
import { X, Printer, Sparkles } from "lucide-react";
import type { Lang } from "@/lib/i18n";
import { ui, VERSES } from "@/lib/content";
import { addCard, type MemoryCard as MemoryCardRow } from "@/lib/local-store";
import { SectionLabel } from "./shared";

const SAMPLE = {
  code: "RQ-2026-4675",
  name: "أحمد بن سالم",
  country: "تونس · صفاقس",
  verseId: "v1",
};

function verseOf(id: string) {
  return VERSES.find((v) => v.id === id) ?? VERSES[0]!;
}

function CardFace({
  lang,
  name,
  country,
  verseId,
  code,
  large,
}: {
  lang: Lang;
  name: string;
  country: string;
  verseId: string;
  code: string;
  large?: boolean;
}) {
  const u = ui[lang];
  const v = verseOf(verseId);
  return (
    <div
      className={`relative overflow-hidden rounded-2xl gradient-hero p-6 shadow-elegant ${
        large ? "sm:p-10" : "sm:p-8"
      }`}
    >
      <div className="pointer-events-none absolute inset-3 rounded-xl border border-orange/45" />
      <div className="pointer-events-none absolute inset-5 rounded-xl border border-orange/20" />
      <div className="relative">
        <p className="text-[10px] uppercase tracking-[0.3em] text-orange">{u.memoryTitle}</p>
        <p className="mt-2 font-serif text-xl text-on-hero rtl:font-arabic sm:text-2xl">
          روح القدس رفيق السفر
        </p>
        <p className="mt-5 font-arabic text-lg leading-[2] text-on-hero" dir="rtl">
          {v.arabic}
        </p>
        <p className="mt-2 text-[11px] text-orange">
          {v.surah} · {v.ref}
        </p>
        <p className="mt-2 text-xs italic leading-relaxed text-on-hero/70" dir="ltr">
          {lang === "tr" ? v.tr : v.en}
        </p>
        <span className="mt-6 block h-px w-full gold-rule" />
        <div className="mt-5 flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="font-serif text-lg text-on-hero rtl:font-arabic">{name}</p>
            <p className="text-xs text-on-hero/60">{country}</p>
          </div>
          <div className="text-end">
            <p className="text-[10px] uppercase tracking-[0.2em] text-orange">{u.memoryCode}</p>
            <p className="font-mono text-sm text-on-hero">{code}</p>
          </div>
        </div>
        <p className="mt-6 text-[11px] text-on-hero/55">{u.memorySupervision}</p>
      </div>
    </div>
  );
}

export function MemoryCardSection({ lang }: { lang: Lang }) {
  const u = ui[lang];
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [country, setCountry] = useState("");
  const [verseId, setVerseId] = useState(VERSES[0]!.id);
  const [issued, setIssued] = useState<MemoryCardRow | null>(null);

  const inputClass =
    "mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-orange";

  const generate = (e: React.FormEvent) => {
    e.preventDefault();
    const row = addCard({
      name: name.trim() || SAMPLE.name,
      country: country.trim() || SAMPLE.country,
      verseId,
    });
    setIssued(row);
  };

  const closeAll = () => {
    setOpen(false);
    setIssued(null);
  };

  return (
    <section id="memory-card" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-14 sm:px-8 sm:py-20">
      <SectionLabel>{u.memoryLabel}</SectionLabel>
      <div className="grid items-center gap-8 lg:grid-cols-2">
        <div>
          <h2 className="text-3xl font-semibold text-primary sm:text-4xl">{u.memoryTitle}</h2>
          <p className="mt-4 max-w-lg text-sm leading-relaxed text-muted-foreground">
            {u.memorySupervision}
          </p>
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-orange px-6 py-3.5 text-sm font-medium text-accent-foreground shadow-gold transition-transform hover:scale-[1.02]"
          >
            <Sparkles className="h-4 w-4" />
            {u.memoryCustomize}
          </button>
        </div>
        <div className="rounded-[1.6rem] border-2 border-primary/60 p-3">
          <CardFace lang={lang} {...SAMPLE} />
        </div>
      </div>

      {open && !issued && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-primary/90 p-4 backdrop-blur-md">
          <div className="mx-auto my-6 max-w-4xl rounded-2xl bg-background p-5 shadow-elegant sm:p-8">
            <div className="flex items-center justify-between gap-3">
              <h3 className="text-2xl font-semibold text-primary">{u.memoryCustomize}</h3>
              <button
                type="button"
                onClick={closeAll}
                aria-label={u.memoryClose}
                className="grid h-9 w-9 place-items-center rounded-full border border-border text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-6 grid gap-8 lg:grid-cols-2">
              <form onSubmit={generate} className="space-y-4">
                <div>
                  <label className="text-xs text-muted-foreground" htmlFor="mc-name">
                    {u.memoryName}
                  </label>
                  <input id="mc-name" maxLength={60} value={name} onChange={(e) => setName(e.target.value)} className={inputClass} />
                </div>
                <div>
                  <label className="text-xs text-muted-foreground" htmlFor="mc-country">
                    {u.memoryCountry}
                  </label>
                  <input id="mc-country" maxLength={60} value={country} onChange={(e) => setCountry(e.target.value)} className={inputClass} />
                </div>
                <div>
                  <label className="text-xs text-muted-foreground" htmlFor="mc-verse">
                    {u.memoryVerse}
                  </label>
                  <select id="mc-verse" value={verseId} onChange={(e) => setVerseId(e.target.value)} className={inputClass}>
                    {VERSES.map((v) => (
                      <option key={v.id} value={v.id}>
                        {v.surah} · {v.ref}
                      </option>
                    ))}
                  </select>
                </div>
                <button
                  type="submit"
                  className="w-full rounded-full bg-orange px-6 py-3.5 text-sm font-medium text-accent-foreground shadow-gold"
                >
                  {u.memoryGenerate}
                </button>
              </form>

              <CardFace
                lang={lang}
                name={name.trim() || SAMPLE.name}
                country={country.trim() || SAMPLE.country}
                verseId={verseId}
                code="RQ-2026-••••"
              />
            </div>
          </div>
        </div>
      )}

      {issued && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-primary p-4">
          <div className="print-card mx-auto my-8 max-w-2xl">
            <CardFace
              lang={lang}
              name={issued.name}
              country={issued.country}
              verseId={issued.verseId}
              code={issued.code}
              large
            />
          </div>
          <div className="no-print mx-auto flex max-w-2xl flex-wrap justify-center gap-3 pb-10">
            <button
              type="button"
              onClick={() => window.print()}
              className="inline-flex items-center gap-2 rounded-full bg-orange px-6 py-3.5 text-sm font-medium text-accent-foreground shadow-gold"
            >
              <Printer className="h-4 w-4" />
              {u.memoryPrint}
            </button>
            <button
              type="button"
              onClick={closeAll}
              className="rounded-full bg-background px-6 py-3.5 text-sm font-medium text-primary"
            >
              {u.memoryClose}
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
