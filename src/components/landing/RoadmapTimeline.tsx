import { useEffect, useState } from "react";
import { Copy, Check, Share2 } from "lucide-react";
import type { Lang } from "@/lib/i18n";
import { ui } from "@/lib/content";
import { SectionLabel } from "./shared";

const LAUNCH = new Date("2026-09-15T09:00:00Z").getTime();
const DISCOUNT_CODE = "RQ-PALESTINE-2026";

function useCountdown(target: number) {
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => {
    setNow(Date.now());
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, []);
  if (now === null) return null;
  const diff = Math.max(0, target - now);
  return {
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor((diff / 3_600_000) % 24),
    minutes: Math.floor((diff / 60_000) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

export function RoadmapTimeline({ lang }: { lang: Lang }) {
  const u = ui[lang];
  const cd = useCountdown(LAUNCH);
  const [revealed, setRevealed] = useState(false);
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(DISCOUNT_CODE);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      /* ignore */
    }
  };

  const shareUrl = `https://wa.me/?text=${encodeURIComponent(
    `روح القدس رفيق السفر — هدية مجانية لقافلة فلسطين البرية. https://ruhulqudus.org`,
  )}`;

  const units = cd
    ? [
        { v: cd.days, l: u.days },
        { v: cd.hours, l: u.hours },
        { v: cd.minutes, l: u.minutes },
        { v: cd.seconds, l: u.seconds },
      ]
    : [];

  return (
    <section id="roadmap" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-14 sm:px-8 sm:py-20">
      <SectionLabel>{u.roadTitle}</SectionLabel>
      <h2 className="text-3xl font-semibold text-primary sm:text-4xl">{u.roadTitle}</h2>

      <div className="relative mt-12">
        <span className="absolute inset-x-0 top-5 hidden h-0.5 bg-orange/40 sm:block" />
        <ol className="grid gap-8 sm:grid-cols-3">
          {u.roadItems.map((item, i) => (
            <li key={item.title} className="relative">
              <span className="relative z-10 grid h-10 w-10 place-items-center rounded-full bg-primary font-serif text-sm text-primary-foreground shadow-elegant">
                {i + 1}
              </span>
              <h3 className="mt-5 text-xl font-semibold text-primary">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
            </li>
          ))}
        </ol>
      </div>

      <div className="mx-auto mt-10 flex w-fit max-w-full flex-wrap items-center justify-center gap-x-4 gap-y-2 rounded-full bg-primary px-5 py-3 shadow-elegant">
        <p className="text-[10px] uppercase tracking-[0.22em] text-orange">{u.countdown}</p>
        <div className="flex items-center gap-2">
          {units.map((unit) => (
            <div
              key={unit.l}
              className="flex items-baseline gap-1 rounded-full border border-orange/30 px-2.5 py-1"
            >
              <span className="font-serif text-base leading-none text-on-hero">
                {String(unit.v).padStart(2, "0")}
              </span>
              <span className="text-[9px] tracking-wide text-on-hero/60">{unit.l}</span>
            </div>
          ))}
        </div>
      </div>


      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        <div className="glass rounded-2xl p-6">
          <p className="text-[11px] uppercase tracking-[0.24em] text-orange">{u.discountTitle}</p>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{u.discountNote}</p>
          {revealed ? (
            <button
              type="button"
              onClick={copy}
              className="mt-5 inline-flex items-center gap-2 rounded-full border-2 border-dashed border-orange px-6 py-3 font-mono text-sm text-primary"
            >
              {DISCOUNT_CODE}
              {copied ? <Check className="h-4 w-4 text-orange" /> : <Copy className="h-4 w-4 text-orange" />}
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setRevealed(true)}
              className="mt-5 rounded-full bg-orange px-6 py-3 text-sm font-medium text-accent-foreground shadow-gold"
            >
              {u.discountReveal}
            </button>
          )}
        </div>

        <div className="glass flex flex-col justify-center rounded-2xl p-6">
          <p className="text-[11px] uppercase tracking-[0.24em] text-orange">{u.share}</p>
          <a
            href={shareUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-5 inline-flex w-fit items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-elegant"
          >
            <Share2 className="h-4 w-4" />
            {u.shareWhatsapp}
          </a>
        </div>
      </div>
    </section>
  );
}
