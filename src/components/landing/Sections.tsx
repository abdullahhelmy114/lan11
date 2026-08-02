import { Film, BookOpen, Compass, HandHeart } from "lucide-react";
import type { Lang } from "@/lib/i18n";
import { t } from "@/lib/i18n";
import { ui, PILLAR_DETAILS } from "@/lib/content";
import { SectionLabel } from "./shared";
import { Seal } from "./Hero";


export function SacredWelcome({ lang }: { lang: Lang }) {
  const tr = t[lang];
  return (
    <section className="mx-auto max-w-6xl px-4 sm:px-5 py-16 sm:px-8 sm:py-24">
      <div className="relative">
        <div aria-hidden className="pointer-events-none absolute -inset-6 rounded-[2.5rem] bg-gold/20 blur-2xl" />
        <div className="relative overflow-hidden rounded-[2rem] gradient-hero px-5 py-12 sm:rounded-[2.5rem] text-center shadow-elegant sm:px-16 sm:py-20">
        <div className="pointer-events-none absolute inset-4 rounded-2xl border border-gold/30" />
        <div className="pointer-events-none absolute inset-6 rounded-2xl border border-gold/20" />
        <div className="relative">
          <p className="text-[11px] uppercase tracking-[0.3em] text-gold">{tr.welcome.label}</p>
          <p className="mx-auto mt-8 max-w-3xl font-arabic text-xl leading-[2] sm:text-2xl text-on-hero sm:text-3xl" dir="rtl">
            يا عبادي إني حرّمتُ الظلمَ على نفسي وجعلتُه بينكم محرَّمًا، فلا تظالموا.
          </p>
          {lang !== "ar" && (
            <p className="mx-auto mt-6 max-w-2xl font-serif text-lg italic leading-relaxed text-on-hero/80">
              “{tr.welcome.hadith}”
            </p>
          )}
          <p className="mt-6 text-xs tracking-[0.2em] text-gold uppercase">{tr.welcome.source}</p>
          <span className="mx-auto mt-8 block h-px w-24 gold-rule" />
          <p className="mx-auto mt-8 max-w-xl text-sm leading-relaxed text-on-hero/65">
            {tr.welcome.note}
          </p>
          </div>
        </div>
      </div>
    </section>
  );
}

const PILLAR_ICONS = [BookOpen, Film, Compass, HandHeart];

export function Pillars({ lang, onBrowse }: { lang: Lang; onBrowse: (i: 0 | 1 | 2 | 3) => void }) {
  const tr = t[lang];
  const u = ui[lang];
  const items = PILLAR_DETAILS[lang];
  return (
    <section id="pillars" className="mx-auto max-w-6xl scroll-mt-20 px-4 sm:px-5 py-10 sm:px-8 sm:py-16">
      <SectionLabel>{tr.pillars.label}</SectionLabel>
      <h2 className="max-w-3xl text-3xl font-semibold text-primary sm:text-4xl">
        {u.pillarsTitle}
      </h2>
      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item, i) => {
          const Icon = PILLAR_ICONS[i % PILLAR_ICONS.length]!;
          return (
            <article
              key={item.title}
              className="glass flex flex-col rounded-2xl p-6 transition-transform duration-300 hover:-translate-y-1"
            >
              <span className="grid h-11 w-11 place-items-center rounded-full bg-orange/15">
                <Icon className="h-5 w-5 text-orange" strokeWidth={1.5} />
              </span>
              <h3 className="mt-5 text-xl font-semibold text-primary">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
              <p className="mt-3 text-xs text-orange">
                {u.example}: {item.example}
              </p>
              <button
                type="button"
                onClick={() => onBrowse(i as 0 | 1 | 2 | 3)}
                className="mt-6 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-elegant transition-transform hover:scale-[1.02]"
              >
                {u.browse}
              </button>
            </article>
          );
        })}
      </div>
    </section>
  );
}


export function LinguisticBridge({ lang }: { lang: Lang }) {
  const tr = t[lang];
  return (
    <section className="mx-auto max-w-6xl px-4 sm:px-5 py-16 sm:px-8 sm:py-24">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <div>
          <SectionLabel>{tr.bridge.label}</SectionLabel>
          <h2 className="text-3xl font-semibold text-primary sm:text-4xl">{tr.bridge.title}</h2>
          <p className="mt-5 max-w-lg text-base leading-relaxed text-muted-foreground">
            {tr.bridge.body}
          </p>
          <p className="mt-6 text-xs uppercase tracking-[0.24em] text-gold">
            {tr.bridge.caption}
          </p>
        </div>

        <div className="relative mx-auto grid h-64 w-full max-w-md place-items-center sm:h-80">
          <span
            aria-hidden
            className="absolute h-52 w-52 rounded-full bg-gold/25 blur-3xl"
          />
          {[
            { label: "AR", pos: "left-1/2 top-2 -translate-x-1/2" },
            { label: "EN", pos: "bottom-4 left-2 sm:bottom-6 sm:left-6" },
            { label: "TR", pos: "bottom-4 right-2 sm:bottom-6 sm:right-6" },
          ].map((c) => (
            <span
              key={c.label}
              className={`absolute grid h-32 w-32 place-items-center rounded-full border border-gold/40 bg-background/55 font-serif text-base tracking-[0.2em] text-primary backdrop-blur-sm sm:h-44 sm:w-44 sm:text-lg ${c.pos}`}
            >
              {c.label}
            </span>
          ))}
          <span className="relative grid h-14 w-14 place-items-center rounded-full bg-primary">
            <Seal />
          </span>
        </div>
      </div>
    </section>
  );
}

export function Roadmap({ lang }: { lang: Lang }) {
  const tr = t[lang];
  return (
    <section className="mx-auto max-w-6xl px-4 sm:px-5 py-16 sm:px-8 sm:py-24">
      <SectionLabel>{tr.roadmap.label}</SectionLabel>
      <h2 className="text-3xl font-semibold text-primary sm:text-4xl">{tr.roadmap.title}</h2>

      <div className="relative mt-12">
        <span className="absolute inset-x-0 top-5 hidden h-px gold-rule sm:block" />
        <ol className="grid gap-8 sm:grid-cols-3">
          {tr.roadmap.items.map((item, i) => (
            <li key={item.title} className="relative">
              <span className="relative z-10 grid h-10 w-10 place-items-center rounded-full border border-gold/40 bg-background font-serif text-sm text-primary">
                {i + 1}
              </span>
              <span className="mt-5 inline-block rounded-full bg-secondary px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-gold">
                {item.tag}
              </span>
              <h3 className="mt-3 text-xl font-semibold text-primary">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function Footer({ lang }: { lang: Lang }) {
  const tr = t[lang];
  return (
    <footer className="relative mt-10 overflow-hidden gradient-hero">
      <div className="relative mx-auto max-w-6xl px-4 sm:px-5 py-14 sm:px-8">
        <div aria-hidden className="pointer-events-none absolute -top-24 left-1/3 h-96 w-96 rounded-full bg-gold/10 blur-3xl" />
        <div className="grid gap-10 sm:grid-cols-3">
          <div>
            <div className="flex items-center gap-3">
              <Seal />
              <p className="font-serif text-lg text-on-hero">{tr.brand}</p>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-on-hero/60">
              {tr.footer.about}
            </p>
          </div>
          <div>
            <p className="text-[11px] uppercase tracking-[0.24em] text-gold">{tr.footer.links}</p>
            <ul className="mt-4 space-y-2 text-sm text-on-hero/70">
              <li>
                <a className="hover:text-gold" href="#pillars">
                  {tr.pillars.label}
                </a>
              </li>
              <li>
                <a className="hover:text-gold" href="#register">
                  {tr.form.label}
                </a>
              </li>
              <li>
                <a className="hover:text-gold" href="#wall">
                  {tr.wall.label}
                </a>
              </li>
            </ul>
          </div>
          <div>
            <p className="text-[11px] uppercase tracking-[0.24em] text-gold">{tr.footer.contact}</p>
            <div className="mt-4 flex gap-3">
              {[
                { label: "WhatsApp", href: "https://wa.me/" },
                { label: "Instagram", href: "https://instagram.com/" },
                { label: "Email", href: "mailto:hello@ruhulqudus.org" },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="rounded-full border border-gold/30 px-3 py-1.5 text-xs text-on-hero/75 transition-colors hover:text-gold"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>
        </div>
        <p className="mt-12 text-xs text-on-hero/50">
          © 2026 {tr.brand} · {tr.footer.rights}
        </p>
      </div>
    </footer>
  );
}
