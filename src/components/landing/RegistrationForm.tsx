import { useState } from "react";
import { z } from "zod";
import { Check, Copy, Share2 } from "lucide-react";
import { LANGS, t, type Lang } from "@/lib/i18n";
import { addRegistration } from "@/lib/local-store";
import { SectionLabel } from "./shared";

const COUNTRY_CODES = ["+970", "+962", "+90", "+20", "+212", "+966", "+971", "+44", "+1", "+33", "+49", "+60"];

export function RegistrationForm({
  lang,
  selected,
  setSelected,
}: {
  lang: Lang;
  selected: Lang;
  setSelected: (l: Lang) => void;
}) {
  const tr = t[lang];
  const [step, setStep] = useState(0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("+970");
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [copied, setCopied] = useState(false);

  const schema = z.object({
    name: z.string().trim().min(2, tr.form.errName).max(100),
    email: z.string().trim().email(tr.form.errEmail).max(255),
    phone: z.string().trim().regex(/^[0-9]{6,15}$/, tr.form.errPhone),
  });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse({ name, email, phone });
    if (!parsed.success) {
      const next: Record<string, string> = {};
      for (const issue of parsed.error.issues) next[String(issue.path[0])] = issue.message;
      setErrors(next);
      return;
    }
    setErrors({});
    addRegistration({
      lang: selected,
      name: parsed.data.name,
      email: parsed.data.email,
      phone: `${code}${parsed.data.phone}`,
    });
    setStep(2);
  };

  const shareUrl = typeof window !== "undefined" ? window.location.href : "";
  const shareText = `${tr.brand} — ${tr.tagline}`;

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* ignore */
    }
  };

  const inputClass =
    "w-full rounded-xl border border-gold/25 bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-gold";

  return (
    <section id="register" className="mx-auto max-w-3xl scroll-mt-20 px-4 py-14 sm:px-8 sm:py-24">
      <div className="text-center">
        <div className="flex justify-center">
          <SectionLabel>{tr.form.label}</SectionLabel>
        </div>
        <h2 className="text-3xl font-semibold text-primary sm:text-4xl">{tr.form.title}</h2>
      </div>

      <ol className="mt-8 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
        {tr.form.steps.map((s, i) => (
          <li key={s} className="flex items-center gap-3">
            <span
              className={`grid h-8 w-8 place-items-center rounded-full text-xs transition-colors ${
                i <= step
                  ? "bg-primary text-primary-foreground"
                  : "border border-gold/30 text-muted-foreground"
              }`}
            >
              {i < step ? <Check className="h-4 w-4" /> : i + 1}
            </span>
            <span className="hidden text-xs tracking-wide text-muted-foreground sm:inline">{s}</span>
            {i < tr.form.steps.length - 1 && <span className="h-px w-5 gold-rule sm:w-8" />}
          </li>
        ))}
      </ol>

      <div className="glass mt-8 rounded-2xl p-5 sm:p-9">
        {step === 0 && (
          <div>
            <p className="text-sm text-muted-foreground">{tr.form.lang}</p>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              {LANGS.map((l) => (
                <button
                  key={l.code}
                  type="button"
                  onClick={() => setSelected(l.code)}
                  className={`rounded-2xl border px-4 py-5 text-center transition-colors ${
                    selected === l.code
                      ? "border-gold bg-secondary text-primary"
                      : "border-gold/25 text-muted-foreground hover:text-primary"
                  }`}
                >
                  <span className="block font-serif text-xl">{l.native}</span>
                  <span className="mt-1 block text-[10px] tracking-[0.2em]">{l.label}</span>
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={() => setStep(1)}
              className="mt-7 w-full rounded-full bg-primary px-6 py-3.5 text-sm font-medium text-primary-foreground shadow-elegant transition-transform hover:scale-[1.02]"
            >
              {tr.form.next}
            </button>
          </div>
        )}

        {step === 1 && (
          <form onSubmit={submit} className="space-y-5">
            <div>
              <label className="text-xs tracking-wide text-muted-foreground" htmlFor="rq-name">
                {tr.form.name}
              </label>
              <input
                id="rq-name"
                className={`mt-2 ${inputClass}`}
                value={name}
                maxLength={100}
                onChange={(e) => setName(e.target.value)}
              />
              {errors["name"] && <p className="mt-1 text-xs text-destructive">{errors["name"]}</p>}
            </div>
            <div>
              <label className="text-xs tracking-wide text-muted-foreground" htmlFor="rq-email">
                {tr.form.email}
              </label>
              <input
                id="rq-email"
                type="email"
                dir="ltr"
                className={`mt-2 ${inputClass}`}
                value={email}
                maxLength={255}
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors["email"] && <p className="mt-1 text-xs text-destructive">{errors["email"]}</p>}
            </div>
            <div>
              <label className="text-xs tracking-wide text-muted-foreground" htmlFor="rq-phone">
                {tr.form.whatsapp}
              </label>
              <div className="mt-2 flex gap-2" dir="ltr">
                <select
                  aria-label={tr.form.country}
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className={`${inputClass} w-28 shrink-0`}
                >
                  {COUNTRY_CODES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
                <input
                  id="rq-phone"
                  inputMode="numeric"
                  className={inputClass}
                  value={phone}
                  maxLength={15}
                  onChange={(e) => setPhone(e.target.value.replace(/[^0-9]/g, ""))}
                />
              </div>
              {errors["phone"] && <p className="mt-1 text-xs text-destructive">{errors["phone"]}</p>}
            </div>
            <div className="flex flex-wrap gap-3 pt-2">
              <button
                type="submit"
                className="flex-1 rounded-full bg-primary px-6 py-3.5 text-sm font-medium text-primary-foreground shadow-elegant transition-transform hover:scale-[1.02]"
              >
                {tr.form.submit}
              </button>
              <button
                type="button"
                onClick={() => setStep(0)}
                className="rounded-full border border-gold/30 px-6 py-3.5 text-sm text-muted-foreground transition-colors hover:text-primary"
              >
                {tr.form.back}
              </button>
            </div>
          </form>
        )}

        {step === 2 && (
          <div className="text-center">
            <span className="mx-auto grid h-14 w-14 place-items-center rounded-full gradient-emerald shadow-elegant">
              <Check className="h-6 w-6 text-primary-foreground" />
            </span>
            <h3 className="mt-5 text-2xl font-semibold text-primary">{tr.form.successTitle}</h3>
            <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
              {tr.form.successBody}
            </p>
            <span className="mx-auto mt-7 block h-px w-24 gold-rule" />
            <p className="mt-6 text-xs uppercase tracking-[0.22em] text-gold">{tr.form.share}</p>
            <div className="mt-4 flex flex-wrap justify-center gap-3">
              <a
                href={`https://wa.me/?text=${encodeURIComponent(`${shareText} ${shareUrl}`)}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm text-primary-foreground"
              >
                <Share2 className="h-4 w-4" /> WhatsApp
              </a>
              <a
                href={`https://telegram.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-gold/30 px-5 py-2.5 text-sm text-primary"
              >
                <Share2 className="h-4 w-4" /> Telegram
              </a>
              <button
                type="button"
                onClick={copyLink}
                className="inline-flex items-center gap-2 rounded-full border border-gold/30 px-5 py-2.5 text-sm text-primary"
              >
                <Copy className="h-4 w-4" /> {copied ? tr.form.copied : tr.form.copy}
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
