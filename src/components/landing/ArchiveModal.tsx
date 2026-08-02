import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { type Lang } from "@/lib/i18n";
import { ui, VERSES, FILMS, SEERAH, DUAS } from "@/lib/content";

export type ArchiveTab = 0 | 1 | 2 | 3;

export function ArchiveModal({
  lang,
  tab,
  setTab,
  onClose,
}: {
  lang: Lang;
  tab: ArchiveTab;
  setTab: (t: ArchiveTab) => void;
  onClose: () => void;
}) {
  const u = ui[lang];

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={u.archiveFooter}
      className="fixed inset-0 z-50 flex flex-col bg-primary/95 backdrop-blur-xl"
    >
      <div className="flex items-center justify-between gap-3 border-b border-orange/25 px-4 py-4 sm:px-8">
        <p className="truncate font-serif text-lg text-on-hero">{u.archiveFooter}</p>
        <button
          type="button"
          onClick={onClose}
          aria-label={u.archiveClose}
          className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-orange/40 text-on-hero transition-colors hover:bg-orange/20"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      <div className="flex gap-1 overflow-x-auto border-b border-orange/20 px-3 sm:px-8">
        {u.archiveTabs.map((label, i) => (
          <button
            key={label}
            type="button"
            onClick={() => setTab(i as ArchiveTab)}
            aria-current={tab === i}
            className={`whitespace-nowrap border-b-2 px-3 py-3 text-xs font-medium transition-colors sm:text-sm ${
              tab === i
                ? "border-orange text-orange"
                : "border-transparent text-on-hero/60 hover:text-on-hero"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-8 sm:px-8">
        <div className="mx-auto max-w-4xl space-y-5">
          {tab === 0 &&
            VERSES.map((v) => (
              <article key={v.id} className="rounded-2xl border border-orange/25 bg-background/95 p-5 sm:p-7">
                <p className="text-xs tracking-[0.2em] text-primary">
                  {v.surah} · {v.ref}
                </p>
                <p className="mt-4 font-arabic text-2xl leading-[2.1] text-foreground" dir="rtl">
                  {v.arabic}
                </p>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  <span className="font-medium text-orange">{u.meaning}: </span>
                  {v.meaning}
                </p>
                <p className="mt-3 text-sm italic leading-relaxed text-muted-foreground" dir="ltr">
                  {lang === "tr" ? v.tr : v.en}
                </p>
              </article>
            ))}

          {tab === 1 &&
            FILMS.map((f) => (
              <article key={f.id} className="rounded-2xl border border-orange/25 bg-background/95 p-5 sm:p-7">
                <div className="flex flex-wrap items-center gap-3">
                  <h3 className="text-xl font-semibold text-primary">{f.title}</h3>
                  <span className="rounded-full bg-secondary px-3 py-1 text-[11px] text-orange">
                    {f.duration}
                  </span>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{f.body}</p>
                <a
                  href={f.href}
                  className="mt-5 inline-flex rounded-full bg-orange px-5 py-2.5 text-sm font-medium text-accent-foreground shadow-gold"
                >
                  {u.watch}
                </a>
              </article>
            ))}

          {tab === 2 &&
            SEERAH.map((s) => (
              <article key={s.id} className="rounded-2xl border border-orange/25 bg-background/95 p-5 sm:p-7">
                <h3 className="text-xl font-semibold text-primary">{s.title}</h3>
                <dl className="mt-4 space-y-3 text-sm leading-relaxed">
                  <div>
                    <dt className="text-[11px] uppercase tracking-[0.18em] text-orange">{u.lessonHistory}</dt>
                    <dd className="mt-1 text-muted-foreground">{s.context}</dd>
                  </div>
                  <div>
                    <dt className="text-[11px] uppercase tracking-[0.18em] text-orange">{u.lessonPoint}</dt>
                    <dd className="mt-1 text-foreground">{s.lesson}</dd>
                  </div>
                  <div>
                    <dt className="text-[11px] uppercase tracking-[0.18em] text-orange">{u.lessonModern}</dt>
                    <dd className="mt-1 text-muted-foreground">{s.modern}</dd>
                  </div>
                </dl>
              </article>
            ))}

          {tab === 3 &&
            DUAS.map((d) => (
              <article key={d.id} className="rounded-2xl border border-orange/25 bg-background/95 p-5 sm:p-7">
                <p className="font-arabic text-2xl leading-[2.1] text-foreground" dir="rtl">
                  {d.arabic}
                </p>
                <p className="mt-4 text-sm italic text-muted-foreground" dir="ltr">
                  {d.translit}
                </p>
                <p className="mt-3 text-xs tracking-[0.16em] text-orange">{d.source}</p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{d.meaning}</p>
              </article>
            ))}
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-orange/25 bg-primary px-4 py-4 sm:px-8">
        <p className="text-xs text-on-hero/70">{u.archiveFooter}</p>
        <button
          type="button"
          onClick={onClose}
          className="rounded-full bg-background px-5 py-2.5 text-sm font-medium text-primary shadow-elegant"
        >
          {u.archiveClose}
        </button>
      </div>
    </div>
  );
}

export function useArchive() {
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState<ArchiveTab>(0);
  return {
    open,
    tab,
    setTab,
    openAt: (t: ArchiveTab) => {
      setTab(t);
      setOpen(true);
    },
    close: () => setOpen(false),
  };
}
