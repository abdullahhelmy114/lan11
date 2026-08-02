import { LANGS, type Lang } from "@/lib/i18n";
import { t } from "@/lib/i18n";
import { ui } from "@/lib/content";




export function Hero({
  lang,
  onPick,
}: {
  lang: Lang;
  onPick: (l: Lang) => void;
}) {
  const tr = t[lang];
  const u = ui[lang];

  return (
    <header className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 left-1/3 h-96 w-96 rounded-full bg-gold/20 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute right-0 top-40 h-96 w-96 rounded-full bg-primary/20 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 80% at 50% 0%, transparent 20%, var(--background) 78%)",
        }}
      />

      <div className="relative mx-auto max-w-6xl px-4 pb-16 pt-5 sm:px-8 sm:pb-28 sm:pt-6">



        <div className="mx-auto mt-16 max-w-3xl text-center sm:mt-24">
          <span className="glass inline-block rounded-full px-4 py-1.5 text-[11px] font-medium tracking-[0.2em] text-primary">
            {lang === "ar"
              ? "إعداد وإشراف: الدكتورة جيهان علي زياد • إهداء مجاني لقافلة فلسطين البرية"
              : tr.hero.eyebrow}
          </span>
          <h1 className="mt-7 text-balance text-3xl font-semibold leading-[1.15] text-gradient-ink sm:text-6xl">
            {tr.hero.title}
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
            {lang === "ar"
              ? "موقع روح القدس يرحب بقافلة فلسطين العالمية البرية، ويقدم بإشراف الدكتورة جيهان علي زياد: برنامج (رفيق السفر) مجاناً بالكامل كهدية تضامن لدعم مسيرتكم الإنسانية."
              : tr.hero.sub}
          </p>
          <button
            type="button"
            onClick={() =>
              document
                .getElementById("register")
                ?.scrollIntoView({ behavior: "smooth", block: "start" })
            }
            className="mt-8 inline-flex rounded-full bg-orange px-8 py-4 text-sm font-medium text-accent-foreground shadow-gold transition-transform hover:scale-[1.03]"
          >
            {u.heroCta}
          </button>
        </div>

        <p className="mt-14 text-center text-sm font-medium tracking-widest text-gold uppercase">
          {tr.hero.pick}
        </p>


        <div className="mx-auto mt-6 grid max-w-4xl gap-4 sm:grid-cols-3">
          {LANGS.map((l) => (
            <button
              key={l.code}
              type="button"
              onClick={() => onPick(l.code)}
              className="glass group rounded-2xl p-5 text-start sm:p-6 transition-all duration-300 hover:-translate-y-1 hover:border-gold/50"
              dir={l.code === "ar" ? "rtl" : "ltr"}
            >
              <div className="flex items-baseline justify-between gap-3">
                <span className="font-serif text-2xl font-semibold text-primary">
                  {l.native}
                </span>
                <span className="rounded-full border border-gold/35 px-2.5 py-0.5 text-[10px] tracking-[0.2em] text-gold">
                  {l.label}
                </span>
              </div>
              <p className="mt-3 text-sm text-muted-foreground">{l.note}</p>
              <span className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-gold">
                {tr.hero.cta}
                <span className="transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1">
                  →
                </span>
              </span>
            </button>
          ))}
        </div>
      </div>
    </header>
  );
}

export function Seal() {
  return (
    <span
      aria-hidden="true"
      className="grid aspect-square h-10 w-10 place-items-center rounded-full gradient-emerald shadow-elegant"
    >
      <span className="font-arabic text-xl leading-none text-primary-foreground select-none">
        ق
      </span>
    </span>
  );
}
