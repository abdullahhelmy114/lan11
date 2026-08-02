import { useEffect, useState } from "react";
import { z } from "zod";
import { t, type Lang } from "@/lib/i18n";
import { addMessage, getMessages, SEED_MESSAGES, type SolidarityMessage } from "@/lib/local-store";
import { ui } from "@/lib/content";
import { SectionLabel } from "./shared";

export function SolidarityWall({ lang }: { lang: Lang }) {
  const tr = t[lang];
  const u = ui[lang];
  const [translated, setTranslated] = useState<Record<string, string>>({});
  const [pending, setPending] = useState<string | null>(null);

  const translate = async (row: SolidarityMessage) => {
    if (translated[row.id]) {
      setTranslated((prev) => {
        const next = { ...prev };
        delete next[row.id];
        return next;
      });
      return;
    }
    setPending(row.id);
    try {
      const res = await fetch(
        `https://api.mymemory.translated.net/get?q=${encodeURIComponent(row.message)}&langpair=auto|${lang}`,
      );
      const data = (await res.json()) as { responseData?: { translatedText?: string } };
      const text = data.responseData?.translatedText;
      if (text) setTranslated((prev) => ({ ...prev, [row.id]: text }));
    } catch {
      /* translation unavailable */
    } finally {
      setPending(null);
    }
  };
  const [rows, setRows] = useState<SolidarityMessage[]>(SEED_MESSAGES);
  const [name, setName] = useState("");
  const [country, setCountry] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [posted, setPosted] = useState(false);

  useEffect(() => {
    setRows([...getMessages(), ...SEED_MESSAGES]);
  }, []);

  const schema = z.object({
    name: z.string().trim().min(2, tr.form.errName).max(60),
    country: z.string().trim().min(2).max(60),
    message: z.string().trim().min(4).max(400),
  });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse({ name, country, message });
    if (!parsed.success) {
      const next: Record<string, string> = {};
      for (const issue of parsed.error.issues) next[String(issue.path[0])] = issue.message;
      setErrors(next);
      return;
    }
    setErrors({});
    const row = addMessage(parsed.data);
    setRows((prev) => [row, ...prev]);
    setName("");
    setCountry("");
    setMessage("");
    setPosted(true);
    setTimeout(() => setPosted(false), 3000);
  };

  const inputClass =
    "w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-orange";

  return (
    <section id="wall" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-14 sm:px-8 sm:py-24">
      <SectionLabel>{tr.wall.label}</SectionLabel>
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <h2 className="text-3xl font-semibold text-primary sm:text-4xl">{u.wallTitle}</h2>
          <p className="mt-3 max-w-lg text-sm leading-relaxed text-muted-foreground">
            {u.wallSub}
          </p>
        </div>
      </div>

      <form onSubmit={submit} className="glass mt-8 grid gap-4 rounded-2xl p-5 sm:p-6 md:grid-cols-[1fr_1fr_2fr_auto] md:items-end">
        <div>
          <label className="text-xs text-muted-foreground" htmlFor="w-name">
            {tr.wall.name}
          </label>
          <input id="w-name" maxLength={60} className={`mt-2 ${inputClass}`} value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          <label className="text-xs text-muted-foreground" htmlFor="w-country">
            {tr.wall.country}
          </label>
          <input id="w-country" maxLength={60} className={`mt-2 ${inputClass}`} value={country} onChange={(e) => setCountry(e.target.value)} />
        </div>
        <div>
          <label className="text-xs text-muted-foreground" htmlFor="w-msg">
            {tr.wall.message}
          </label>
          <input id="w-msg" maxLength={400} className={`mt-2 ${inputClass}`} value={message} onChange={(e) => setMessage(e.target.value)} />
        </div>
        <button
          type="submit"
          className="rounded-full bg-orange px-6 py-3.5 text-sm font-medium text-accent-foreground shadow-gold transition-transform hover:scale-[1.02]"
        >
          {tr.wall.submit}
        </button>
        {Object.keys(errors).length > 0 && (
          <p className="text-xs text-destructive md:col-span-4">
            {errors["name"] ?? errors["country"] ?? errors["message"]}
          </p>
        )}
        {posted && <p className="text-xs text-orange md:col-span-4">{tr.wall.posted}</p>}
      </form>

      {rows.length === 0 ? (
        <p className="mt-10 text-sm text-muted-foreground">{tr.wall.empty}</p>
      ) : (
        <div className="mt-10 columns-1 gap-5 sm:columns-2 lg:columns-3 [&>*]:mb-5">
          {rows.map((row) => (
            <figure
              key={row.id}
              className="break-inside-avoid rounded-2xl border border-orange/30 bg-card p-5 sm:p-6"
            >
              <blockquote className="text-sm leading-relaxed text-foreground">
                “{row.message}”
              </blockquote>
              {translated[row.id] && (
                <p className="mt-3 border-t border-orange/25 pt-3 text-sm leading-relaxed text-muted-foreground">
                  {translated[row.id]}
                </p>
              )}
              <figcaption className="mt-4 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                <span className="font-medium text-primary">{row.name}</span>
                <span className="h-1 w-1 rounded-full bg-orange" />
                <span>{row.country}</span>
                <button
                  type="button"
                  onClick={() => translate(row)}
                  className="ms-auto rounded-full border border-orange/45 px-3 py-1 text-[11px] text-orange transition-colors hover:bg-orange/10"
                >
                  {pending === row.id ? "…" : u.translate}
                </button>
              </figcaption>
            </figure>
          ))}
        </div>
      )}
    </section>
  );
}
