import type { Lang } from "@/lib/i18n";
import { ui } from "@/lib/content";

export function DivineMessage({ lang }: { lang: Lang }) {
  const u = ui[lang];
  return (
    <section id="mission" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-14 sm:px-8 sm:py-20">
      <div className="relative">
        <div aria-hidden className="pointer-events-none absolute -inset-6 rounded-[2.5rem] bg-orange/15 blur-2xl" />
        <div className="glass relative overflow-hidden rounded-[2rem] px-5 py-12 text-center sm:rounded-[2.5rem] sm:px-14 sm:py-16">
          <h2 className="text-3xl font-semibold text-primary sm:text-4xl">{u.divineTitle}</h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            {u.divineSub}
          </p>

          <blockquote className="relative mx-auto mt-10 max-w-3xl">
            <span aria-hidden className="font-serif text-5xl leading-none text-orange">«</span>
            <p className="mt-2 font-arabic text-xl leading-[2.1] text-primary sm:text-2xl" dir="rtl">
              يَا عِبَادِي إِنِّي حَرَّمْتُ الظُّلْمَ عَلَى نَفْسِي وَجَعَلْتُهُ بَيْنَكُمْ مُحَرَّماً فَلاَ تَظَالَمُوا
            </p>
            {lang !== "ar" && (
              <p className="mt-4 font-serif text-lg italic leading-relaxed text-foreground">
                {u.divineQuote}
              </p>
            )}
            <span aria-hidden className="mt-2 block font-serif text-5xl leading-none text-orange">»</span>
          </blockquote>

          <p className="mx-auto mt-6 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            {u.divineExplain}
          </p>

          <span className="mx-auto mt-10 block h-px w-28 gold-rule" />

          <div className="mt-10 grid gap-5 text-start sm:grid-cols-2">
            <article className="rounded-2xl border border-orange/30 bg-card p-6">
              <h3 className="text-xl font-semibold text-primary">{u.divineEngineTitle}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{u.divineEngineBody}</p>
            </article>
            <article className="rounded-2xl border border-orange/30 bg-card p-6">
              <h3 className="text-xl font-semibold text-primary">{u.divineShieldTitle}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{u.divineShieldBody}</p>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
